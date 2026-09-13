#!/usr/bin/env python3
"""
FreeAI Autonomous Agent Engine & ReAct Loop Controller
------------------------------------------------------
Executes autonomous, multi-step agentic workflows:
- System instruction synthesis with full local tool specs & root environment context.
- Robust XML / JSON tool-call extraction from streaming LLM output.
- Interactive permission gate (YOLO hands-free vs interactive confirmation).
- Live execution visualization with status cards, execution timers, and formatted output.
- Seamless account quota rotation: if an account quota runs out mid-task, the engine
  rotates to the next healthy account in accounts.json without losing progress.
- Human-in-the-loop interrupt management (Ctrl+C pause, skip, abort).
"""

import os
import sys
import re
import json
import time
import asyncio
from typing import Dict, Any, List, Optional, Tuple, Callable

# Ensure clean UTF-8 console output
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

from agent_tools import AgentToolRegistry, ToolResult


class ToolCallParser:
    """Extracts tool calls from LLM responses supporting XML, Markdown JSON, raw JSON, and implicit shell blocks."""

    XML_PATTERN = re.compile(
        r"<tool_call>\s*(.*?)\s*</tool_call>",
        re.DOTALL | re.IGNORECASE,
    )
    CODEBLOCK_PATTERN = re.compile(
        r"```(?:tool_call|json|tool:[a-zA-Z0-9_-]+)?\s*(\{.*?\})\s*```",
        re.DOTALL | re.IGNORECASE,
    )
    RAW_JSON_PATTERN = re.compile(
        r'\{\s*"(?:name|tool|function)"\s*:\s*"([a-zA-Z0-9_-]+)"\s*,\s*"(?:arguments|args|parameters)"\s*:\s*(\{.*?\})\s*\}',
        re.DOTALL,
    )
    SHELL_CODEBLOCK_PATTERN = re.compile(
        r"```(?:powershell|pwsh|bash|sh|cmd|shell|terminal)[^\n]*\n(.*?)\n\s*```",
        re.DOTALL | re.IGNORECASE,
    )

    @classmethod
    def clean_json_str(cls, s: str) -> str:
        """Fix common JSON formatting glitches like trailing commas and unescaped Windows paths."""
        # Fix unescaped backslashes in paths like G:\FreeAI -> G:\\FreeAI
        # but avoid touching already escaped backslashes or valid escape sequences
        s = re.sub(r'\\(?![/u"bfnrt\\])', r"\\\\", s)
        # Remove trailing commas in JSON objects/arrays
        s = re.sub(r",\s*([\]}])", r"\1", s)
        return s.strip()

    @classmethod
    def parse_calls(cls, text: str) -> List[Dict[str, Any]]:
        """Parse all tool calls present in the generated text."""
        calls: List[Dict[str, Any]] = []

        # 1. Look for XML <tool_call>...</tool_call>
        xml_matches = cls.XML_PATTERN.findall(text)
        for block in xml_matches:
            call = cls._try_parse_block(block)
            if call:
                calls.append(call)

        if calls:
            return calls

        # 2. Look for codeblock ```tool_call ... ``` or ```json ... ```
        code_matches = cls.CODEBLOCK_PATTERN.findall(text)
        for block in code_matches:
            call = cls._try_parse_block(block)
            if call and ("name" in call or "tool" in call):
                calls.append(call)

        if calls:
            return calls

        # 3. Look for raw unadorned JSON in text
        for match in cls.RAW_JSON_PATTERN.finditer(text):
            tool_name = match.group(1).strip()
            raw_args = match.group(2)
            try:
                args = json.loads(cls.clean_json_str(raw_args))
                if isinstance(args, dict):
                    calls.append({"name": tool_name, "arguments": args})
            except Exception:
                pass

        if calls:
            return calls

        # 4. Fallback: Parse implicit shell code blocks (powershell, bash, cmd, sh)
        shell_matches = cls.SHELL_CODEBLOCK_PATTERN.findall(text)
        for cmd_block in shell_matches:
            clean_cmd = cmd_block.strip()
            if clean_cmd and not clean_cmd.startswith("#"):
                calls.append({
                    "name": "run_command",
                    "arguments": {"command": clean_cmd}
                })

        return calls

    @classmethod
    def _try_parse_block(cls, block_str: str) -> Optional[Dict[str, Any]]:
        clean = cls.clean_json_str(block_str)
        try:
            data = json.loads(clean)
            if isinstance(data, dict):
                # Standardize format to {"name": ..., "arguments": ...}
                tool_name = data.get("name") or data.get("tool") or data.get("function")
                tool_args = data.get("arguments") or data.get("args") or data.get("parameters") or {}
                if not isinstance(tool_args, dict):
                    tool_args = {}
                if tool_name:
                    return {"name": str(tool_name).strip(), "arguments": tool_args}
        except Exception:
            pass

        # Fallback: XML child tags <name>...</name><arguments>...</arguments>
        name_match = re.search(r"<name>\s*([a-zA-Z0-9_-]+)\s*</name>", block_str, re.IGNORECASE)
        args_match = re.search(r"<arguments>\s*(\{.*?\})\s*</arguments>", block_str, re.DOTALL | re.IGNORECASE)
        if name_match:
            tool_name = name_match.group(1).strip()
            args = {}
            if args_match:
                try:
                    args = json.loads(cls.clean_json_str(args_match.group(1)))
                except Exception:
                    pass
            return {"name": tool_name, "arguments": args}

        return None

    @classmethod
    def strip_tool_calls(cls, text: str) -> str:
        """Remove tool call blocks from text to leave only reasoning/explanations."""
        cleaned = cls.XML_PATTERN.sub("", text)
        cleaned = re.sub(r"```(?:tool_call)\s*(\{.*?\})\s*```", "", cleaned, flags=re.DOTALL | re.IGNORECASE)
        cleaned = cls.RAW_JSON_PATTERN.sub("", cleaned)
        return cleaned.strip()


class AgentEngine:
    """
    Autonomous ReAct (Reasoning + Acting) Agent Engine.
    Executes tasks, detects tool calls, verifies permissions, runs tools locally,
    and feeds observations back into the dialogue until the goal is finished.
    """

    def __init__(
        self,
        accounts_file: str = "accounts.json",
        default_model: str = "gateway-gpt-5-6",
        max_steps: int = 25,
        yolo: bool = False,
    ):
        self.accounts_file = accounts_file
        self.default_model = default_model
        self.max_steps = max_steps
        self.yolo = yolo
        self.always_approve = yolo

    def build_system_prompt(self) -> str:
        """Construct instructions with tool specifications and environment facts."""
        shell_name = "powershell" if sys.platform == "win32" else "bash"
        system_instructions = (
            f"You are an autonomous AI software engineer and terminal execution engine on a {'Windows' if sys.platform == 'win32' else 'Unix'} system.\n"
            f"Working Directory: {os.getcwd()}\n"
            f"Default Shell: {shell_name}\n\n"
            "You have direct execution capability via our local runner. When you output commands or tool actions, our runner executes them locally and returns the real output in a <tool_result> block.\n\n"
            "HOW TO EXECUTE ACTIONS:\n"
            f"1. To run terminal/shell commands, you can simply output a ```{shell_name} code block:\n"
            f"```{shell_name}\n"
            "Get-ChildItem -Filter *.py\n"
            "```\n"
            "2. Or to invoke any tool (including file editing, search, image gen), output a ```tool_call block:\n"
            "```tool_call\n"
            '{"name": "read_file", "arguments": {"path": "agent_tools.py", "start_line": 1, "end_line": 30}}\n'
            "```\n\n"
            "OPERATIONAL PROTOCOL:\n"
            "- Do NOT ask the user to run commands or inspect files manually. Take action yourself using code blocks or tool calls.\n"
            "- After each execution, inspect the returned <tool_result>, adapt your plan, and continue.\n"
            "- When the task is completely finished, provide your final answer without code blocks or tool calls.\n\n"
            + AgentToolRegistry.get_system_prompt_spec()
        )
        return system_instructions

    def run_autonomous_task(
        self,
        goal: str,
        model_name: Optional[str] = None,
        auto_create: bool = True,
        max_steps: Optional[int] = None,
        yolo: Optional[bool] = None,
        memory: Optional[Any] = None,
        session_name: Optional[str] = None,
    ) -> Tuple[bool, str]:
        """
        Execute an autonomous agentic goal.
        Returns (success, final_response_text).
        """
        from chat_streamer import AccountPool, UseAIChatClient, ModelCatalog

        target_model = ModelCatalog.resolve(model_name or self.default_model)
        model_info = ModelCatalog.get_info(target_model)
        pool = AccountPool(self.accounts_file)
        steps_limit = max_steps or self.max_steps

        if yolo is not None:
            self.yolo = yolo
            self.always_approve = yolo

        print("\n" + "=" * 70)
        print("         🚀 FreeAI Autonomous Agentic Task Runner")
        print("=" * 70)
        print(f"Goal          : {goal}")
        print(f"Active Model  : {model_info['name']} ({target_model})")
        print(f"Autonomy Mode : {'YOLO (Hands-Free Full Access)' if self.always_approve else 'Supervised (Interactive Approval)'}")
        print(f"Max Steps     : {steps_limit}")
        print(f"Accounts Pool : {pool.count()} available")
        print("=" * 70 + "\n")

        # Prepare active account
        account = pool.get_account(auto_create=auto_create)
        if not account:
            print("[!] No accounts available in pool and auto-create failed.")
            return False, "No accounts available in pool."

        system_prompt = self.build_system_prompt()
        history: List[Dict[str, str]] = []

        # Initial prompt framing
        current_user_message = (
            f"Task: {goal}\n\n"
            "If you need to inspect the environment, run commands, or read files, output your first command or tool call now."
        )
        step = 0
        final_answer = ""

        while step < steps_limit:
            step += 1
            print(f"\n[Step {step}/{steps_limit}] 🧠 Thinking...", flush=True)

            # Build full dialogue for LLM
            full_prompt = self._format_conversation_prompt(system_prompt, history, current_user_message)

            client = UseAIChatClient(account)
            response_text, is_exhausted, error_msg = self._stream_with_rotation(
                client, full_prompt, target_model, pool, auto_create
            )

            if error_msg and not response_text:
                print(f"\n[!] LLM query failed: {error_msg}")
                # Try account rotation
                account = pool.get_account(auto_create=auto_create)
                if account:
                    print(f"[*] Rotated to fresh account {account.get('email')}, retrying step {step}...")
                    continue
                else:
                    return False, f"LLM execution error: {error_msg}"

            # Parse tool calls
            tool_calls = ToolCallParser.parse_calls(response_text)
            reasoning = ToolCallParser.strip_tool_calls(response_text)

            if reasoning:
                print(f"\n{reasoning}\n")

            # If no tool calls, the model has delivered its final conclusion
            if not tool_calls:
                final_answer = reasoning or response_text
                print(f"\n🎯 [Task Completed Successfully in {step} step(s)]")
                if memory:
                    memory.add_turn(goal, final_answer)
                    if session_name:
                        memory.save_session(session_name)
                return True, final_answer

            # Record turn in dialogue
            history.append({"role": "user", "content": current_user_message})
            history.append({"role": "assistant", "content": response_text})

            # Execute tool calls
            tool_results_blocks = []
            for tc in tool_calls:
                tool_name = tc.get("name", "unknown")
                tool_args = tc.get("arguments", {})

                # Render tool invocation card
                print("\n" + "╭" + "─" * 68)
                print(f"│ ⚡ TOOL INVOCATION: {tool_name}")
                args_preview = json.dumps(tool_args, indent=2)
                for line in args_preview.splitlines():
                    print(f"│    {line}")
                print("╰" + "─" * 68)

                # Check approval
                if not self.always_approve:
                    action_allowed, always = self._prompt_user_approval(tool_name, tool_args)
                    if always:
                        self.always_approve = True
                    if not action_allowed:
                        print("  [X] Tool execution declined by user.")
                        res = ToolResult(
                            success=False,
                            output="Tool execution declined by user.",
                            error="User rejected execution.",
                        )
                        tool_results_blocks.append(f'<tool_result name="{tool_name}">\n{res.to_str()}\n</tool_result>')
                        continue

                # Execute tool
                print(f"  [>] Executing '{tool_name}' locally...", flush=True)
                start_t = time.time()
                res = AgentToolRegistry.execute(tool_name, tool_args)
                elapsed_ms = round((time.time() - start_t) * 1000, 1)

                # Render observation card
                status_symbol = "✔" if res.success else "✖"
                print("\n" + "╭" + "─" * 68)
                print(f"│ 📋 OBSERVATION [{tool_name}] ({status_symbol} {elapsed_ms}ms)")
                obs_preview = res.to_str()
                preview_lines = obs_preview.splitlines()[:15]
                for line in preview_lines:
                    print(f"│   {line}")
                if len(obs_preview.splitlines()) > 15:
                    print(f"│   [... {len(obs_preview.splitlines()) - 15} more lines omitted from console ...]")
                print("╰" + "─" * 68 + "\n")

                tool_results_blocks.append(f'<tool_result name="{tool_name}">\n{res.to_str()}\n</tool_result>')

            # Next user prompt contains the tool results
            current_user_message = (
                "Tool Execution Results:\n"
                + "\n\n".join(tool_results_blocks)
                + "\n\nPlease analyze these results and take the next action or finish."
            )

        print(f"\n[!] Reached maximum autonomous step limit ({steps_limit}).")
        return False, "Reached maximum step limit without task completion."

    def _format_conversation_prompt(
        self,
        system_prompt: str,
        history: List[Dict[str, str]],
        new_message: str,
    ) -> str:
        """Format dialogue history into structured prompt for LLM."""
        parts = [system_prompt]
        if history:
            parts.append("--- Conversation History ---")
            for msg in history:
                role = "User" if msg.get("role") == "user" else "Assistant"
                content = msg.get("content", "")
                parts.append(f"{role}:\n{content}")

        parts.append(f"--- Action Request / System Updates ---\n{new_message}")
        return "\n\n".join(parts)

    def _stream_with_rotation(
        self,
        client: Any,
        prompt: str,
        model_slug: str,
        pool: Any,
        auto_create: bool,
    ) -> Tuple[str, bool, Optional[str]]:
        """Stream chat from LLM, handling account quota rotation transparently if exhausted."""
        try:
            res = asyncio.run(client.stream_chat(prompt, model_slug=model_slug, agentic=True, timeout=90))
            if res.get("exhausted"):
                pool.retire_account(client.email)
            if res.get("success") and res.get("response"):
                return res["response"], res.get("exhausted", False), None
            error = res.get("error") or "Unknown streaming error"
            return res.get("response", ""), res.get("exhausted", False), error
        except Exception as e:
            return "", False, str(e)

    def _prompt_user_approval(self, tool_name: str, args: Dict[str, Any]) -> Tuple[bool, bool]:
        """Prompt user for interactive confirmation before executing a tool."""
        prompt_txt = f"\n[?] Execute tool '{tool_name}'? ([Y]es / [n]o / [a]lways approve for session): "
        try:
            ans = input(prompt_txt).strip().lower()
            if ans in ("a", "always", "yolo"):
                return True, True
            elif ans in ("n", "no", "skip"):
                return False, False
            else:
                return True, False
        except (KeyboardInterrupt, EOFError):
            print("\n[!] User canceled prompt.")
            return False, False


if __name__ == "__main__":
    print("=== Testing AgentEngine ===")
    engine = AgentEngine()
    print("System prompt generated:")
    print(engine.build_system_prompt()[:300] + "...\n")
    # Test tool parser
    sample = '<tool_call>{"name": "run_command", "arguments": {"command": "dir"}}</tool_call>'
    parsed = ToolCallParser.parse_calls(sample)
    print(f"Parsed sample call: {parsed}")
