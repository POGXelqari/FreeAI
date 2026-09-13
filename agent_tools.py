#!/usr/bin/env python3
"""
FreeAI Agent Tools Suite
------------------------
Comprehensive local execution and intelligence toolset for Agentic Autonomous AI:
- Shell & PowerShell Runner: Full root/admin command execution with timeout and output protection.
- Background Task Manager: Start daemons, tail task logs, send stdin input, check status, kill tasks.
- Filesystem & Coding Tools: Read with line slicing, write with auto-dirs, surgical content replacement,
  recursive directory listing, ripgrep / regex search, and file deletion.
- Web Intelligence: Live web search querying, clean HTML-to-markdown reader.
- Media & Vision: Autonomous image synthesis, deep forensic image inspection.
"""

import os
import sys
import re
import time
import json
import uuid
import shutil
import signal
import datetime
import subprocess
import threading
from typing import Dict, Any, List, Optional, Tuple, Union
from pathlib import Path
from html.parser import HTMLParser

# Ensure clean UTF-8 console output across Windows and Unix
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

try:
    import requests
except ImportError:
    requests = None


class ToolResult:
    """Encapsulates the outcome of an agent tool execution."""

    def __init__(
        self,
        success: bool,
        output: str,
        error: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ):
        self.success = success
        self.output = output.strip() if output else ""
        self.error = error.strip() if error else None
        self.metadata = metadata or {}

    def to_dict(self) -> Dict[str, Any]:
        return {
            "success": self.success,
            "output": self.output,
            "error": self.error,
            "metadata": self.metadata,
        }

    def to_str(self) -> str:
        if not self.success and self.error:
            if self.output:
                return f"ERROR: {self.error}\n\nOutput:\n{self.output}"
            return f"ERROR: {self.error}"
        return self.output if self.output else "(No output returned)"


# =====================================================================
# 1. Shell & PowerShell Execution Manager
# =====================================================================

class BackgroundTaskManager:
    """Manages asynchronous long-running background tasks and daemons."""

    def __init__(self, log_dir: str = ".agent_tasks"):
        self.log_dir = os.path.abspath(log_dir)
        os.makedirs(self.log_dir, exist_ok=True)
        self.tasks: Dict[str, Dict[str, Any]] = {}
        self._lock = threading.Lock()
        self._counter = 1

    def start_task(
        self,
        command: str,
        cwd: Optional[str] = None,
        task_name: Optional[str] = None,
        shell: str = "powershell",
    ) -> Dict[str, Any]:
        """Start a background process and track its output in a log file."""
        with self._lock:
            task_id = f"task_{self._counter}"
            self._counter += 1

        work_dir = os.path.abspath(cwd) if cwd else os.getcwd()
        log_file = os.path.join(self.log_dir, f"{task_id}.log")

        cmd_args, executable = _resolve_shell_command(command, shell)

        # Open log file for stdout and stderr
        out_f = open(log_file, "w", encoding="utf-8", errors="replace")

        creationflags = 0
        if sys.platform == "win32":
            creationflags = subprocess.CREATE_NEW_PROCESS_GROUP

        try:
            proc = subprocess.Popen(
                cmd_args,
                cwd=work_dir,
                stdout=out_f,
                stderr=subprocess.STDOUT,
                stdin=subprocess.PIPE,
                creationflags=creationflags,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
        except Exception as e:
            out_f.close()
            return {
                "success": False,
                "error": f"Failed to spawn background task: {e}",
            }

        task_info = {
            "task_id": task_id,
            "name": task_name or command[:40],
            "command": command,
            "cwd": work_dir,
            "pid": proc.pid,
            "process": proc,
            "log_file": log_file,
            "log_handle": out_f,
            "start_time": time.time(),
            "status": "running",
            "exit_code": None,
        }

        with self._lock:
            self.tasks[task_id] = task_info

        return {
            "success": True,
            "task_id": task_id,
            "pid": proc.pid,
            "command": command,
            "log_file": log_file,
            "message": f"Background task '{task_id}' started with PID {proc.pid}.",
        }

    def list_tasks(self) -> List[Dict[str, Any]]:
        """List all background tasks and their current states."""
        with self._lock:
            res = []
            for tid, t in self.tasks.items():
                self._update_task_status(t)
                uptime = time.time() - t["start_time"]
                res.append({
                    "task_id": tid,
                    "name": t["name"],
                    "command": t["command"],
                    "pid": t["pid"],
                    "status": t["status"],
                    "exit_code": t["exit_code"],
                    "uptime_seconds": round(uptime, 1),
                    "log_file": t["log_file"],
                })
            return res

    def get_task_status(self, task_id: str) -> Dict[str, Any]:
        """Get status and recent log snippet for a specific task."""
        with self._lock:
            t = self.tasks.get(task_id)
            if not t:
                return {"success": False, "error": f"Task '{task_id}' not found."}
            self._update_task_status(t)

        logs = self.get_task_logs(task_id, tail_lines=25)
        uptime = time.time() - t["start_time"]
        return {
            "success": True,
            "task_id": task_id,
            "name": t["name"],
            "command": t["command"],
            "pid": t["pid"],
            "status": t["status"],
            "exit_code": t["exit_code"],
            "uptime_seconds": round(uptime, 1),
            "recent_logs": logs,
        }

    def get_task_logs(self, task_id: str, tail_lines: int = 50) -> str:
        """Read the last N lines from the task's log file."""
        with self._lock:
            t = self.tasks.get(task_id)
            if not t:
                return f"Error: Task '{task_id}' not found."
            log_file = t["log_file"]

        if not os.path.exists(log_file):
            return "(Log file empty or not created yet)"

        try:
            with open(log_file, "r", encoding="utf-8", errors="replace") as f:
                lines = f.readlines()
                if not lines:
                    return "(No output recorded yet)"
                tail = lines[-tail_lines:]
                return "".join(tail).strip()
        except Exception as e:
            return f"Error reading log file: {e}"

    def send_input(self, task_id: str, text: str) -> Dict[str, Any]:
        """Send input string to the stdin of a running task."""
        with self._lock:
            t = self.tasks.get(task_id)
            if not t:
                return {"success": False, "error": f"Task '{task_id}' not found."}
            self._update_task_status(t)
            if t["status"] != "running":
                return {"success": False, "error": f"Task '{task_id}' is not running (status: {t['status']})."}

            proc = t["process"]
            if proc.stdin:
                try:
                    proc.stdin.write(text + "\n")
                    proc.stdin.flush()
                    return {"success": True, "message": f"Sent input to task '{task_id}'."}
                except Exception as e:
                    return {"success": False, "error": f"Failed to write to stdin: {e}"}
            else:
                return {"success": False, "error": "Task stdin is not open."}

    def kill_task(self, task_id: str) -> Dict[str, Any]:
        """Terminate a running background task process tree."""
        with self._lock:
            t = self.tasks.get(task_id)
            if not t:
                return {"success": False, "error": f"Task '{task_id}' not found."}
            self._update_task_status(t)
            if t["status"] != "running":
                return {"success": True, "message": f"Task '{task_id}' is already {t['status']}."}

            proc = t["process"]

        # Kill process
        try:
            if sys.platform == "win32":
                # Use taskkill to kill process tree cleanly
                subprocess.run(
                    ["taskkill", "/F", "/T", "/PID", str(proc.pid)],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                    timeout=5,
                )
            else:
                proc.terminate()
                try:
                    proc.wait(timeout=2)
                except subprocess.TimeoutExpired:
                    proc.kill()
        except Exception as e:
            pass

        with self._lock:
            t["status"] = "killed"
            t["exit_code"] = -9
            if "log_handle" in t and not t["log_handle"].closed:
                try:
                    t["log_handle"].close()
                except Exception:
                    pass

        return {"success": True, "message": f"Task '{task_id}' (PID {t['pid']}) terminated."}

    def _update_task_status(self, task_info: Dict[str, Any]):
        """Check if process has terminated and update status dict."""
        proc = task_info.get("process")
        if proc and task_info["status"] == "running":
            ret = proc.poll()
            if ret is not None:
                task_info["exit_code"] = ret
                task_info["status"] = "completed" if ret == 0 else f"failed (code {ret})"
                if "log_handle" in task_info and not task_info["log_handle"].closed:
                    try:
                        task_info["log_handle"].close()
                    except Exception:
                        pass


# Singleton background task manager
_task_manager = BackgroundTaskManager()


def _resolve_shell_command(command: str, shell_preference: str = "powershell") -> Tuple[List[str], Optional[str]]:
    """Resolve executable and command line flags based on OS and shell preference."""
    pref = shell_preference.lower()

    if sys.platform == "win32":
        if pref in ("pwsh", "powershell", "ps"):
            # Check for pwsh first, then powershell.exe
            pwsh_bin = shutil.which("pwsh") or shutil.which("pwsh.exe")
            if pwsh_bin:
                return [pwsh_bin, "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-Command", command], pwsh_bin
            ps_bin = shutil.which("powershell") or shutil.which("powershell.exe") or "powershell.exe"
            return [ps_bin, "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-Command", command], ps_bin
        elif pref == "cmd":
            cmd_bin = shutil.which("cmd") or shutil.which("cmd.exe") or "cmd.exe"
            return [cmd_bin, "/c", command], cmd_bin
        elif pref == "bash":
            bash_bin = shutil.which("bash") or shutil.which("bash.exe")
            if bash_bin:
                return [bash_bin, "-c", command], bash_bin
            # Fallback to powershell
            return _resolve_shell_command(command, "powershell")
        else:
            return _resolve_shell_command(command, "powershell")
    else:
        # Unix / Linux / macOS
        bash_bin = shutil.which("bash") or "/bin/bash"
        if os.path.exists(bash_bin):
            return [bash_bin, "-c", command], bash_bin
        sh_bin = shutil.which("sh") or "/bin/sh"
        return [sh_bin, "-c", command], sh_bin


def run_command(
    command: str,
    cwd: Optional[str] = None,
    timeout: int = 60,
    shell: str = "powershell",
    max_output_chars: int = 32000,
) -> ToolResult:
    """
    Execute arbitrary terminal command with full root / administrative permissions.
    Captures stdout, stderr, exit code, and execution time.
    """
    work_dir = os.path.abspath(cwd) if cwd else os.getcwd()
    if not os.path.isdir(work_dir):
        return ToolResult(
            success=False,
            output="",
            error=f"Working directory does not exist: {work_dir}",
        )

    cmd_args, executable = _resolve_shell_command(command, shell)
    start_t = time.time()

    try:
        proc = subprocess.run(
            cmd_args,
            cwd=work_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=timeout,
            encoding="utf-8",
            errors="replace",
        )
        duration_ms = round((time.time() - start_t) * 1000, 1)

        combined_output = (proc.stdout or "") + (proc.stderr or "")
        truncated = False
        original_length = len(combined_output)

        if original_length > max_output_chars:
            half = max_output_chars // 2
            combined_output = (
                combined_output[:half]
                + f"\n\n[... Truncated {original_length - max_output_chars} characters ...]\n\n"
                + combined_output[-half:]
            )
            truncated = True

        success = proc.returncode == 0
        error_msg = None if success else f"Command failed with exit code {proc.returncode}"

        return ToolResult(
            success=success,
            output=combined_output,
            error=error_msg,
            metadata={
                "exit_code": proc.returncode,
                "duration_ms": duration_ms,
                "truncated": truncated,
                "cwd": work_dir,
                "shell": shell,
            },
        )
    except subprocess.TimeoutExpired:
        duration_ms = round((time.time() - start_t) * 1000, 1)
        return ToolResult(
            success=False,
            output=f"Command timed out after {timeout} seconds.",
            error=f"TimeoutExpired ({timeout}s)",
            metadata={"duration_ms": duration_ms, "cwd": work_dir},
        )
    except Exception as e:
        duration_ms = round((time.time() - start_t) * 1000, 1)
        return ToolResult(
            success=False,
            output="",
            error=f"Failed to execute command: {e}",
            metadata={"duration_ms": duration_ms, "cwd": work_dir},
        )


def manage_task(
    action: str,
    task_id: Optional[str] = None,
    command: Optional[str] = None,
    name: Optional[str] = None,
    cwd: Optional[str] = None,
    input_text: Optional[str] = None,
    tail_lines: int = 50,
) -> ToolResult:
    """
    Manage background tasks and daemons.
    Actions: 'start', 'list', 'status', 'logs', 'send_input', 'kill'
    """
    act = action.lower().strip()

    if act == "start":
        if not command:
            return ToolResult(success=False, output="", error="'command' argument is required for 'start' action.")
        res = _task_manager.start_task(command=command, cwd=cwd, task_name=name)
        if res.get("success"):
            return ToolResult(
                success=True,
                output=f"Background task '{res['task_id']}' launched (PID: {res['pid']}). Log: {res['log_file']}",
                metadata=res,
            )
        return ToolResult(success=False, output="", error=res.get("error"))

    elif act == "list":
        tasks = _task_manager.list_tasks()
        if not tasks:
            return ToolResult(success=True, output="No active or tracked background tasks.")
        lines = [f"{'TASK ID':<10} | {'PID':<8} | {'STATUS':<12} | {'UPTIME':<10} | {'COMMAND'}"]
        lines.append("-" * 75)
        for t in tasks:
            lines.append(
                f"{t['task_id']:<10} | {t['pid']:<8} | {t['status']:<12} | {t['uptime_seconds']}s{' ':<5} | {t['command']}"
            )
        return ToolResult(success=True, output="\n".join(lines), metadata={"tasks": tasks})

    elif act in ("status", "info"):
        if not task_id:
            return ToolResult(success=False, output="", error="'task_id' is required for 'status' action.")
        res = _task_manager.get_task_status(task_id)
        if res.get("success"):
            txt = (
                f"Task ID     : {res['task_id']}\n"
                f"Name        : {res['name']}\n"
                f"Status      : {res['status']}\n"
                f"PID         : {res['pid']}\n"
                f"Exit Code   : {res['exit_code']}\n"
                f"Uptime      : {res['uptime_seconds']}s\n"
                f"Recent Logs :\n{res['recent_logs']}"
            )
            return ToolResult(success=True, output=txt, metadata=res)
        return ToolResult(success=False, output="", error=res.get("error"))

    elif act == "logs":
        if not task_id:
            return ToolResult(success=False, output="", error="'task_id' is required for 'logs' action.")
        logs = _task_manager.get_task_logs(task_id, tail_lines=tail_lines)
        return ToolResult(success=True, output=logs, metadata={"task_id": task_id})

    elif act == "send_input":
        if not task_id or input_text is None:
            return ToolResult(success=False, output="", error="'task_id' and 'input_text' are required for 'send_input'.")
        res = _task_manager.send_input(task_id, input_text)
        return ToolResult(success=res.get("success", False), output=res.get("message", ""), error=res.get("error"))

    elif act in ("kill", "stop", "terminate"):
        if not task_id:
            return ToolResult(success=False, output="", error="'task_id' is required for 'kill' action.")
        res = _task_manager.kill_task(task_id)
        return ToolResult(success=res.get("success", False), output=res.get("message", ""), error=res.get("error"))

    else:
        return ToolResult(
            success=False,
            output="",
            error=f"Unknown action '{action}'. Valid actions: start, list, status, logs, send_input, kill",
        )


# =====================================================================
# 2. Filesystem & Coding Tools
# =====================================================================

def is_binary_file(filepath: str) -> bool:
    """Check if a file appears to be binary by scanning first 8KB for null bytes."""
    try:
        with open(filepath, "rb") as f:
            chunk = f.read(8192)
            return b"\x00" in chunk
    except Exception:
        return False


def read_file(
    path: str,
    start_line: Optional[int] = None,
    end_line: Optional[int] = None,
    max_lines: int = 1000,
) -> ToolResult:
    """
    Read contents of a file with line numbers and optional line-range slicing (1-indexed).
    """
    target = os.path.abspath(path)
    if not os.path.exists(target):
        return ToolResult(success=False, output="", error=f"File not found: {path}")

    if os.path.isdir(target):
        return ToolResult(success=False, output="", error=f"Path is a directory, not a file: {path}. Use list_dir instead.")

    if is_binary_file(target):
        size = os.path.getsize(target)
        return ToolResult(
            success=True,
            output=f"(Binary file detected: {os.path.basename(target)}, size: {size} bytes)",
            metadata={"is_binary": True, "size_bytes": size},
        )

    try:
        with open(target, "r", encoding="utf-8", errors="replace") as f:
            all_lines = f.readlines()

        total_lines = len(all_lines)
        s_line = max(1, start_line) if start_line else 1
        e_line = min(total_lines, end_line) if end_line else min(total_lines, s_line + max_lines - 1)

        if s_line > total_lines:
            return ToolResult(
                success=True,
                output=f"(File has {total_lines} lines. Requested start_line {s_line} is beyond EOF)",
                metadata={"total_lines": total_lines},
            )

        formatted = []
        for idx in range(s_line - 1, e_line):
            formatted.append(f"{idx + 1:4d}: {all_lines[idx].rstrip(chr(13) + chr(10))}")

        output_text = "\n".join(formatted)
        if e_line < total_lines and not end_line:
            output_text += f"\n\n[... {total_lines - e_line} more lines in file ...]"

        return ToolResult(
            success=True,
            output=output_text,
            metadata={"total_lines": total_lines, "start_line": s_line, "end_line": e_line},
        )
    except Exception as e:
        return ToolResult(success=False, output="", error=f"Error reading file '{path}': {e}")


def write_file(path: str, content: str, overwrite: bool = True) -> ToolResult:
    """
    Create or overwrite a file with given text content.
    Automatically creates missing parent directories.
    """
    target = os.path.abspath(path)
    if os.path.exists(target) and not overwrite:
        return ToolResult(
            success=False,
            output="",
            error=f"File already exists and overwrite=False: {path}",
        )

    try:
        os.makedirs(os.path.dirname(target), exist_ok=True)
        with open(target, "w", encoding="utf-8", errors="replace") as f:
            f.write(content)

        size = os.path.getsize(target)
        line_count = len(content.splitlines())
        return ToolResult(
            success=True,
            output=f"Successfully wrote {size} bytes ({line_count} lines) to '{path}'.",
            metadata={"path": target, "size_bytes": size, "line_count": line_count},
        )
    except Exception as e:
        return ToolResult(success=False, output="", error=f"Error writing to file '{path}': {e}")


def replace_file_content(
    path: str,
    target_content: str,
    replacement_content: str,
    allow_multiple: bool = False,
) -> ToolResult:
    """
    Surgically replace occurrences of target_content with replacement_content in a file.
    Assures exact match uniqueness to prevent accidental corruption.
    """
    target = os.path.abspath(path)
    if not os.path.isfile(target):
        return ToolResult(success=False, output="", error=f"File not found: {path}")

    try:
        with open(target, "r", encoding="utf-8", errors="replace") as f:
            full_text = f.read()

        # Normalize line endings for reliable matching
        target_norm = target_content.replace("\r\n", "\n")
        full_norm = full_text.replace("\r\n", "\n")
        replacement_norm = replacement_content.replace("\r\n", "\n")

        count = full_norm.count(target_norm)
        if count == 0:
            return ToolResult(
                success=False,
                output="",
                error=f"Target content not found in '{path}'. Ensure exact character and whitespace match.",
            )

        if count > 1 and not allow_multiple:
            return ToolResult(
                success=False,
                output="",
                error=(
                    f"Found {count} occurrences of target content in '{path}'. "
                    "Provide more surrounding context to disambiguate, or set allow_multiple=True."
                ),
            )

        new_text = full_norm.replace(target_norm, replacement_norm, -1 if allow_multiple else 1)

        with open(target, "w", encoding="utf-8", errors="replace") as f:
            f.write(new_text)

        return ToolResult(
            success=True,
            output=f"Successfully replaced {count if allow_multiple else 1} occurrence(s) in '{path}'.",
            metadata={"path": target, "replaced_count": count if allow_multiple else 1},
        )
    except Exception as e:
        return ToolResult(success=False, output="", error=f"Error replacing content in '{path}': {e}")


def list_dir(
    path: str = ".",
    recursive: bool = False,
    max_depth: int = 2,
    show_hidden: bool = False,
) -> ToolResult:
    """
    List contents of a directory with file sizes, directory indicators, and item counts.
    """
    target = os.path.abspath(path)
    if not os.path.exists(target):
        return ToolResult(success=False, output="", error=f"Path not found: {path}")

    if not os.path.isdir(target):
        return ToolResult(success=False, output="", error=f"Path is not a directory: {path}")

    entries = []

    def _scan(curr_dir: str, depth: int):
        if depth > max_depth:
            return
        try:
            items = os.listdir(curr_dir)
        except Exception as e:
            entries.append(f"{'  ' * depth}[Permission Denied: {e}]")
            return

        items.sort(key=lambda x: (not os.path.isdir(os.path.join(curr_dir, x)), x.lower()))

        for item in items:
            if not show_hidden and item.startswith("."):
                continue
            item_path = os.path.join(curr_dir, item)
            rel = os.path.relpath(item_path, target)
            indent = "  " * depth

            if os.path.isdir(item_path):
                try:
                    child_count = len(os.listdir(item_path))
                    entries.append(f"{indent}📁 {item}/ ({child_count} items)")
                except Exception:
                    entries.append(f"{indent}📁 {item}/")
                if recursive:
                    _scan(item_path, depth + 1)
            else:
                size = os.path.getsize(item_path)
                entries.append(f"{indent}📄 {item} ({_format_size(size)})")

    _scan(target, 0)
    output = f"Contents of '{path}':\n" + ("\n".join(entries) if entries else "(Empty directory)")
    return ToolResult(success=True, output=output, metadata={"path": target, "count": len(entries)})


def _format_size(size_bytes: int) -> str:
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} KB"
    else:
        return f"{size_bytes / (1024 * 1024):.1f} MB"


def grep_search(
    query: str,
    search_path: str = ".",
    is_regex: bool = False,
    case_insensitive: bool = True,
    glob_pattern: Optional[str] = None,
    max_matches: int = 100,
) -> ToolResult:
    """
    Search file contents across directories for query pattern with line numbers and snippets.
    Skips noisy directories (.git, node_modules, __pycache__).
    """
    root = os.path.abspath(search_path)
    if not os.path.exists(root):
        return ToolResult(success=False, output="", error=f"Search path does not exist: {search_path}")

    # Compile regex pattern
    flags = re.IGNORECASE if case_insensitive else 0
    try:
        if is_regex:
            pattern = re.compile(query, flags)
        else:
            pattern = re.compile(re.escape(query), flags)
    except Exception as e:
        return ToolResult(success=False, output="", error=f"Invalid regex query '{query}': {e}")

    ignored_dirs = {".git", "node_modules", "__pycache__", ".agent_tasks", "dist", "build", ".venv"}
    matches = []

    def _matches_glob(filename: str) -> bool:
        if not glob_pattern:
            return True
        import fnmatch
        return fnmatch.fnmatch(filename, glob_pattern)

    if os.path.isfile(root):
        files_to_search = [root]
    else:
        files_to_search = []
        for dirpath, dirnames, filenames in os.walk(root):
            # Prune ignored directories
            dirnames[:] = [d for d in dirnames if d not in ignored_dirs and not d.startswith(".")]
            for fn in filenames:
                if _matches_glob(fn):
                    files_to_search.append(os.path.join(dirpath, fn))

    total_hits = 0
    formatted_results = []

    for fpath in files_to_search:
        if is_binary_file(fpath):
            continue
        try:
            with open(fpath, "r", encoding="utf-8", errors="replace") as f:
                for line_idx, line in enumerate(f, start=1):
                    if pattern.search(line):
                        total_hits += 1
                        try:
                            rel_path = os.path.relpath(fpath, os.getcwd())
                        except ValueError:
                            rel_path = fpath
                        formatted_results.append(f"{rel_path}:{line_idx}: {line.strip()}")
                        if total_hits >= max_matches:
                            break
        except Exception:
            continue

        if total_hits >= max_matches:
            formatted_results.append(f"\n[... Max matches ({max_matches}) reached ...]")
            break

    output_text = "\n".join(formatted_results) if formatted_results else f"No matches found for '{query}'."
    return ToolResult(
        success=True,
        output=output_text,
        metadata={"matches_count": total_hits, "query": query},
    )


def delete_file(path: str) -> ToolResult:
    """Delete a file or directory tree."""
    target = os.path.abspath(path)
    if not os.path.exists(target):
        return ToolResult(success=False, output="", error=f"Path not found: {path}")

    try:
        if os.path.isdir(target):
            shutil.rmtree(target)
            return ToolResult(success=True, output=f"Deleted directory tree '{path}'.")
        else:
            os.remove(target)
            return ToolResult(success=True, output=f"Deleted file '{path}'.")
    except Exception as e:
        return ToolResult(success=False, output="", error=f"Failed to delete '{path}': {e}")


# =====================================================================
# 3. Web Intelligence & Browsing Tools
# =====================================================================

class _HTMLTextExtractor(HTMLParser):
    """Clean HTML to markdown/text parser."""

    def __init__(self):
        super().__init__()
        self.text_parts: List[str] = []
        self.in_script = False
        self.in_style = False
        self.current_link = None

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "noscript", "svg", "header", "footer", "nav"):
            self.in_script = True
        elif tag == "a":
            for k, v in attrs:
                if k == "href" and v.startswith("http"):
                    self.current_link = v
        elif tag in ("h1", "h2", "h3", "h4", "p", "li", "tr"):
            self.text_parts.append("\n")

    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg", "header", "footer", "nav"):
            self.in_script = False
        elif tag == "a":
            self.current_link = None
        elif tag in ("p", "div", "h1", "h2", "h3", "h4", "br"):
            self.text_parts.append("\n")

    def handle_data(self, data):
        if not self.in_script:
            clean = data.strip()
            if clean:
                if self.current_link:
                    self.text_parts.append(f"[{clean}]({self.current_link}) ")
                else:
                    self.text_parts.append(clean + " ")

    def get_text(self) -> str:
        raw = "".join(self.text_parts)
        # Collapse excessive newlines
        return re.sub(r"\n{3,}", "\n\n", raw).strip()


def read_url(url: str, max_length: int = 12000) -> ToolResult:
    """Fetch URL and extract clean, readable markdown content."""
    if not requests:
        return ToolResult(success=False, output="", error="'requests' package required.")

    if not url.startswith("http://") and not url.startswith("https://"):
        url = "https://" + url

    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        }
        resp = requests.get(url, headers=headers, timeout=15)
        if resp.status_code != 200:
            return ToolResult(
                success=False,
                output="",
                error=f"HTTP {resp.status_code} error fetching {url}",
            )

        parser = _HTMLTextExtractor()
        parser.feed(resp.text)
        content = parser.get_text()

        if len(content) > max_length:
            content = content[:max_length] + f"\n\n[... Truncated ({len(content) - max_length} chars remaining) ...]"

        return ToolResult(
            success=True,
            output=content if content else "(Page returned empty text)",
            metadata={"url": url, "status_code": resp.status_code},
        )
    except Exception as e:
        return ToolResult(success=False, output="", error=f"Error fetching URL '{url}': {e}")


def web_search(query: str, count: int = 5) -> ToolResult:
    """
    Search the live web for a query and return top results with titles, snippets, and URLs.
    Uses Wikipedia / public search engine APIs.
    """
    if not requests:
        return ToolResult(success=False, output="", error="'requests' package required.")

    results = []

    # 1. Wikipedia OpenSearch API
    try:
        wiki_url = "https://en.wikipedia.org/w/api.php"
        wiki_params = {
            "action": "opensearch",
            "search": query,
            "limit": count,
            "namespace": 0,
            "format": "json",
        }
        r = requests.get(wiki_url, params=wiki_params, headers={"User-Agent": "FreeAI-Agent/1.0"}, timeout=10)
        if r.status_code == 200:
            data = r.json()
            # data format: [query, [titles], [descriptions], [urls]]
            if len(data) >= 4:
                titles = data[1]
                descs = data[2]
                urls = data[3]
                for i in range(len(titles)):
                    results.append({
                        "title": titles[i],
                        "snippet": descs[i] if i < len(descs) and descs[i] else f"Wikipedia article for {titles[i]}",
                        "url": urls[i] if i < len(urls) else "",
                    })
    except Exception:
        pass

    # 2. If fewer than count results, query Wikipedia search extracts
    if len(results) < count:
        try:
            query_url = "https://en.wikipedia.org/w/api.php"
            q_params = {
                "action": "query",
                "list": "search",
                "srsearch": query,
                "format": "json",
                "srlimit": count,
            }
            rq = requests.get(query_url, params=q_params, headers={"User-Agent": "FreeAI-Agent/1.0"}, timeout=10)
            if rq.status_code == 200:
                s_data = rq.json().get("query", {}).get("search", [])
                for item in s_data:
                    title = item.get("title", "")
                    clean_snippet = re.sub(r"<[^>]+>", "", item.get("snippet", ""))
                    page_url = f"https://en.wikipedia.org/wiki/{title.replace(' ', '_')}"
                    if not any(r["url"] == page_url for r in results):
                        results.append({
                            "title": title,
                            "snippet": clean_snippet,
                            "url": page_url,
                        })
        except Exception:
            pass

    if not results:
        return ToolResult(
            success=True,
            output=f"No direct web search results found for '{query}'. Tip: Try rephrasing query or check read_url.",
            metadata={"query": query, "results": []},
        )

    formatted = [f"Web Search Results for: '{query}'\n"]
    for i, res in enumerate(results[:count], 1):
        formatted.append(f"{i}. **{res['title']}**\n   URL: {res['url']}\n   Snippet: {res['snippet']}\n")

    return ToolResult(
        success=True,
        output="\n".join(formatted).strip(),
        metadata={"query": query, "results": results[:count]},
    )


# =====================================================================
# 4. Media & Vision Tools
# =====================================================================

def generate_image(
    prompt: str,
    style: str = "realistic",
    ratio: str = "1:1",
    output_dir: str = "artifacts/images",
) -> ToolResult:
    """
    Synthesize image via Use.ai image generation engine or local API server.
    Saves image artifact to local output directory.
    """
    os.makedirs(output_dir, exist_ok=True)

    # 1. Try local API server if active on port 8000
    try:
        api_url = "http://localhost:8000/v1/images/generations"
        payload = {
            "prompt": prompt,
            "style": style,
            "ratio": ratio,
            "model": "imagen-3",
        }
        resp = requests.post(api_url, json=payload, timeout=45)
        if resp.status_code == 200:
            data = resp.json()
            img_list = data.get("data", [])
            if img_list:
                img_url = img_list[0].get("url")
                # Download local copy
                filename = f"image_{int(time.time())}_{uuid.uuid4().hex[:6]}.png"
                local_path = os.path.join(output_dir, filename)
                try:
                    r_img = requests.get(img_url, timeout=20)
                    if r_img.status_code == 200:
                        with open(local_path, "wb") as f:
                            f.write(r_img.content)
                except Exception:
                    local_path = img_url

                out_str = (
                    f"Generated Image for prompt: \"{prompt}\"\n"
                    f"URL       : {img_url}\n"
                    f"Local File: {local_path}\n"
                    f"Style     : {style} | Ratio: {ratio}\n\n"
                    f"![{prompt}]({local_path})"
                )
                return ToolResult(
                    success=True,
                    output=out_str,
                    metadata={"url": img_url, "local_path": local_path, "prompt": prompt},
                )
    except Exception:
        pass

    return ToolResult(
        success=False,
        output="",
        error="Image generation service unavailable. Ensure local API server or Use.ai pool is active.",
    )


def inspect_image(path_or_url: str) -> ToolResult:
    """
    Forensically inspect an image (PNG chunks, IDAT zlib, Shannon entropy, scanline filters).
    """
    try:
        from image_inspector import ImageInspector
    except ImportError:
        return ToolResult(success=False, output="", error="'image_inspector.py' not found.")

    try:
        if path_or_url.startswith("http://") or path_or_url.startswith("https://"):
            rep = ImageInspector.inspect_url(path_or_url)
        else:
            rep = ImageInspector.inspect_file(path_or_url)

        summary = ImageInspector.format_markdown_summary(rep)
        return ToolResult(
            success=True,
            output=summary,
            metadata={"target": path_or_url, "format": rep.get("format")},
        )
    except Exception as e:
        return ToolResult(success=False, output="", error=f"Error inspecting image '{path_or_url}': {e}")


# =====================================================================
# 5. Agent Tool Registry & Schema Exporter
# =====================================================================

class AgentToolRegistry:
    """
    Central registry for agent tools, schemas, and dynamic execution.
    """

    TOOLS: Dict[str, Dict[str, Any]] = {
        "run_command": {
            "func": run_command,
            "description": "Execute terminal / PowerShell / Bash commands with full root/system access. Returns stdout, stderr, and exit code.",
            "parameters": {
                "type": "object",
                "properties": {
                    "command": {
                        "type": "string",
                        "description": "The command line string to execute in the shell.",
                    },
                    "cwd": {
                        "type": "string",
                        "description": "Optional working directory path (defaults to current project directory).",
                    },
                    "timeout": {
                        "type": "integer",
                        "description": "Timeout in seconds (default: 60).",
                    },
                    "shell": {
                        "type": "string",
                        "enum": ["powershell", "pwsh", "cmd", "bash"],
                        "description": "Shell environment (default: powershell).",
                    },
                },
                "required": ["command"],
            },
        },
        "manage_task": {
            "func": manage_task,
            "description": "Manage asynchronous long-running background tasks and daemons (servers, watchers, tests).",
            "parameters": {
                "type": "object",
                "properties": {
                    "action": {
                        "type": "string",
                        "enum": ["start", "list", "status", "logs", "send_input", "kill"],
                        "description": "Action to perform on background task.",
                    },
                    "task_id": {
                        "type": "string",
                        "description": "Task identifier (e.g. 'task_1') for status/logs/kill/send_input.",
                    },
                    "command": {
                        "type": "string",
                        "description": "Command string to start (required when action='start').",
                    },
                    "name": {
                        "type": "string",
                        "description": "Friendly name/description for the background task.",
                    },
                    "input_text": {
                        "type": "string",
                        "description": "Text input to send to stdin (required when action='send_input').",
                    },
                    "tail_lines": {
                        "type": "integer",
                        "description": "Number of log lines to retrieve (default: 50).",
                    },
                },
                "required": ["action"],
            },
        },
        "read_file": {
            "func": read_file,
            "description": "Read file contents with 1-indexed line numbers and optional line-range slicing.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Path to file (relative or absolute).",
                    },
                    "start_line": {
                        "type": "integer",
                        "description": "1-indexed starting line number.",
                    },
                    "end_line": {
                        "type": "integer",
                        "description": "1-indexed ending line number.",
                    },
                },
                "required": ["path"],
            },
        },
        "write_file": {
            "func": write_file,
            "description": "Create a new file or completely overwrite an existing file. Automatically creates parent directories.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Path to target file to create or overwrite.",
                    },
                    "content": {
                        "type": "string",
                        "description": "Full text content to write into the file.",
                    },
                    "overwrite": {
                        "type": "boolean",
                        "description": "Set to true to overwrite if file already exists (default: true).",
                    },
                },
                "required": ["path", "content"],
            },
        },
        "replace_file_content": {
            "func": replace_file_content,
            "description": "Surgically find and replace a block of code or text in a file. Requires exact character and whitespace match.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Path to the file to modify.",
                    },
                    "target_content": {
                        "type": "string",
                        "description": "The exact existing text chunk to replace (must match uniquely).",
                    },
                    "replacement_content": {
                        "type": "string",
                        "description": "The new replacement text to insert.",
                    },
                    "allow_multiple": {
                        "type": "boolean",
                        "description": "If true, replaces all occurrences instead of requiring unique match.",
                    },
                },
                "required": ["path", "target_content", "replacement_content"],
            },
        },
        "list_dir": {
            "func": list_dir,
            "description": "List contents of a directory with file sizes, directory flags, and child item counts.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Directory path to list (default: '.').",
                    },
                    "recursive": {
                        "type": "boolean",
                        "description": "Whether to list recursively (default: false).",
                    },
                    "max_depth": {
                        "type": "integer",
                        "description": "Maximum recursive traversal depth (default: 2).",
                    },
                },
            },
        },
        "grep_search": {
            "func": grep_search,
            "description": "Search file contents across directories using regex or literal text pattern.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Text pattern or regular expression to search for.",
                    },
                    "search_path": {
                        "type": "string",
                        "description": "Directory or file path to search within (default: '.').",
                    },
                    "is_regex": {
                        "type": "boolean",
                        "description": "Treat query as regular expression (default: false).",
                    },
                    "case_insensitive": {
                        "type": "boolean",
                        "description": "Case insensitive search (default: true).",
                    },
                    "glob_pattern": {
                        "type": "string",
                        "description": "Optional file glob filter (e.g. '*.py', '*.js').",
                    },
                },
                "required": ["query"],
            },
        },
        "delete_file": {
            "func": delete_file,
            "description": "Delete a file or recursively remove a directory tree.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Path to file or directory to delete.",
                    },
                },
                "required": ["path"],
            },
        },
        "web_search": {
            "func": web_search,
            "description": "Search the live web for facts, documentation, or news. Returns top URLs and summaries.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search query string.",
                    },
                    "count": {
                        "type": "integer",
                        "description": "Number of results to return (default: 5).",
                    },
                },
                "required": ["query"],
            },
        },
        "read_url": {
            "func": read_url,
            "description": "Fetch a web page URL and convert HTML into clean, readable Markdown text.",
            "parameters": {
                "type": "object",
                "properties": {
                    "url": {
                        "type": "string",
                        "description": "Web page URL to fetch.",
                    },
                },
                "required": ["url"],
            },
        },
        "generate_image": {
            "func": generate_image,
            "description": "Synthesize an AI image from a text prompt and save to local artifacts/images/.",
            "parameters": {
                "type": "object",
                "properties": {
                    "prompt": {
                        "type": "string",
                        "description": "Description of image to synthesize.",
                    },
                    "style": {
                        "type": "string",
                        "enum": ["realistic", "anime", "digital-art", "cinematic"],
                        "description": "Visual style (default: realistic).",
                    },
                    "ratio": {
                        "type": "string",
                        "enum": ["1:1", "16:9", "9:16", "4:3", "3:4"],
                        "description": "Aspect ratio (default: 1:1).",
                    },
                },
                "required": ["prompt"],
            },
        },
        "inspect_image": {
            "func": inspect_image,
            "description": "Forensically inspect an image (PNG chunks, IDAT zlib, Shannon entropy, scanline filters).",
            "parameters": {
                "type": "object",
                "properties": {
                    "path_or_url": {
                        "type": "string",
                        "description": "Path to local image file or remote image URL.",
                    },
                },
                "required": ["path_or_url"],
            },
        },
    }

    @classmethod
    def execute(cls, tool_name: str, arguments: Dict[str, Any]) -> ToolResult:
        """Execute registered tool by name with provided arguments."""
        clean_name = tool_name.strip()
        if clean_name not in cls.TOOLS:
            return ToolResult(
                success=False,
                output="",
                error=f"Unknown tool '{clean_name}'. Available tools: {', '.join(cls.TOOLS.keys())}",
            )

        tool_meta = cls.TOOLS[clean_name]
        func = tool_meta["func"]

        try:
            return func(**arguments)
        except TypeError as te:
            return ToolResult(
                success=False,
                output="",
                error=f"Invalid arguments for tool '{clean_name}': {te}",
            )
        except Exception as e:
            return ToolResult(
                success=False,
                output="",
                error=f"Tool '{clean_name}' raised an unhandled exception: {e}",
            )

    @classmethod
    def get_system_prompt_spec(cls) -> str:
        """Format tools specification for system prompt injection."""
        lines = [
            "### AVAILABLE AGENT TOOLS",
            "You have full autonomous access to the local machine and execution environment via the following tools:",
            "",
        ]
        for name, data in cls.TOOLS.items():
            lines.append(f"#### Tool: `{name}`")
            lines.append(f"**Description**: {data['description']}")
            params = data.get("parameters", {}).get("properties", {})
            required = data.get("parameters", {}).get("required", [])
            lines.append("**Parameters**:")
            for p_name, p_data in params.items():
                req_str = "*(required)*" if p_name in required else "*(optional)*"
                p_type = p_data.get("type", "any")
                p_desc = p_data.get("description", "")
                enum_str = f" [Options: {', '.join(p_data['enum'])}]" if "enum" in p_data else ""
                lines.append(f"- `{p_name}` ({p_type}) {req_str}: {p_desc}{enum_str}")
            lines.append("")

        lines.extend([
            "### TOOL CALLING FORMAT",
            "To invoke a tool, output a clean tool call block using either XML format:",
            "<tool_call>",
            '{"name": "run_command", "arguments": {"command": "powershell command here"}}',
            "</tool_call>",
            "",
            "Or Markdown JSON format:",
            "```tool_call",
            '{"name": "run_command", "arguments": {"command": "powershell command here"}}',
            "```",
            "",
            "Guidelines:",
            "1. You can call tools one at a time or multiple tools in sequence.",
            "2. When a tool is executed, you will receive its output in a `<tool_result>` block.",
            "3. Inspect the tool output, adapt your reasoning, and proceed until the objective is finished.",
            "4. When the user's task is fully accomplished, provide your comprehensive final response without tool calls.",
        ])
        return "\n".join(lines)


if __name__ == "__main__":
    print("=== Testing Agent Tool Registry ===")
    print(f"Registered Tools: {len(AgentToolRegistry.TOOLS)}")
    for t in AgentToolRegistry.TOOLS:
        print(f"  - {t}")
    # Quick sanity check on run_command
    res = AgentToolRegistry.execute("run_command", {"command": "echo FreeAI Agent Ready"})
    print(f"\nSanity run_command: success={res.success}, output={res.output.strip()}")
