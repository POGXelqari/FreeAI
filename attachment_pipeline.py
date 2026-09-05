#!/usr/bin/env python3
"""
FreeAI File & Codebase Attachment Pipeline (attachment_pipeline.py)
-------------------------------------------------------------------
Ingests local files, source code snippets, and directory trees directly into LLM prompts.
Features:
  - Multi-encoding text reading with binary file detection and protection.
  - Recursive directory crawling respecting .gitignore and default exclusion filters.
  - Visual ASCII directory tree generation.
  - Automatic language fence mapping for markdown code blocks.
  - In-prompt '@path/to/file' mention extraction and inline context expansion.
  - Token and byte budget monitoring to prevent prompt overflow.
"""

import os
import re
import sys
import fnmatch
from typing import List, Dict, Any, Optional, Set, Tuple

# Ensure clean UTF-8 console output across Windows and Unix
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# Binary file signatures & common binary extensions to reject
BINARY_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".ico", ".tiff",
    ".mp3", ".wav", ".ogg", ".mp4", ".mov", ".avi", ".mkv", ".webm",
    ".zip", ".tar", ".gz", ".bz2", ".7z", ".rar", ".iso",
    ".exe", ".dll", ".so", ".dylib", ".bin", ".obj", ".o", ".a",
    ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx",
    ".pyc", ".pyd", ".class", ".wasm", ".db", ".sqlite", ".sqlite3"
}

# Default directory & file patterns to ignore during codebase crawls
DEFAULT_IGNORE_PATTERNS = [
    ".git", ".git/**",
    ".agents", ".agents/**",
    "node_modules", "node_modules/**",
    "__pycache__", "__pycache__/**",
    "*.pyc", "*.pyo", "*.pyd",
    ".venv", "venv", "env", ".env",
    "dist", "build", "out",
    "accounts.json", "account.json", "chat_cache.json",
    "sessions", "sessions/**",
    ".DS_Store", "Thumbs.db"
]

# Language fence mapping for syntax highlighting
EXT_TO_LANG = {
    ".py": "python",
    ".js": "javascript",
    ".jsx": "jsx",
    ".ts": "typescript",
    ".tsx": "tsx",
    ".html": "html",
    ".htm": "html",
    ".css": "css",
    ".scss": "scss",
    ".sass": "sass",
    ".json": "json",
    ".md": "markdown",
    ".yaml": "yaml",
    ".yml": "yaml",
    ".xml": "xml",
    ".sql": "sql",
    ".sh": "bash",
    ".bash": "bash",
    ".ps1": "powershell",
    ".rs": "rust",
    ".go": "go",
    ".java": "java",
    ".c": "c",
    ".cpp": "cpp",
    ".h": "c",
    ".hpp": "cpp",
    ".cs": "csharp",
    ".rb": "ruby",
    ".php": "php",
    ".toml": "toml",
    ".ini": "ini",
    ".cfg": "ini",
    ".txt": "text",
}


class AttachmentIngestor:
    """
    Core engine for reading, filtering, and formatting files and directories
    into rich structured LLM prompt context.
    """

    def __init__(
        self,
        base_dir: str = ".",
        max_file_bytes: int = 500_000,       # 500 KB per file
        max_total_bytes: int = 2_000_000,    # 2 MB total bundle
        max_dir_files: int = 50,             # Max files per directory crawl
    ):
        self.base_dir = os.path.abspath(base_dir)
        self.max_file_bytes = max_file_bytes
        self.max_total_bytes = max_total_bytes
        self.max_dir_files = max_dir_files
        self.ignore_patterns = list(DEFAULT_IGNORE_PATTERNS)
        self._load_gitignore()

    def _load_gitignore(self) -> None:
        """Parse workspace .gitignore if present and append to ignore rules."""
        gi_path = os.path.join(self.base_dir, ".gitignore")
        if os.path.isfile(gi_path):
            try:
                with open(gi_path, "r", encoding="utf-8", errors="ignore") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#"):
                            self.ignore_patterns.append(line)
                            # Support directory prefix match
                            if not line.endswith("/**"):
                                self.ignore_patterns.append(f"{line}/**")
            except Exception:
                pass

    def is_ignored(self, relative_path: str) -> bool:
        """Check if relative path matches any ignore patterns."""
        normalized = relative_path.replace("\\", "/")
        parts = normalized.split("/")

        for pattern in self.ignore_patterns:
            pattern = pattern.replace("\\", "/")
            # Direct match
            if fnmatch.fnmatch(normalized, pattern):
                return True
            # Substring / Directory component match
            if any(fnmatch.fnmatch(part, pattern.rstrip("/*")) for part in parts):
                return True
        return False

    @staticmethod
    def is_binary_file(filepath: str) -> bool:
        """Determine if a file is binary by extension and byte inspection."""
        _, ext = os.path.splitext(filepath.lower())
        if ext in BINARY_EXTENSIONS:
            return True

        if not os.path.isfile(filepath):
            return False

        try:
            with open(filepath, "rb") as f:
                chunk = f.read(8192)
                # Null byte indicates binary content
                if b"\x00" in chunk:
                    return True
        except Exception:
            return True

        return False

    @staticmethod
    def get_language_fence(filepath: str) -> str:
        """Get markdown code fence language identifier."""
        _, ext = os.path.splitext(filepath.lower())
        return EXT_TO_LANG.get(ext, "")

    def read_file(self, filepath: str) -> Dict[str, Any]:
        """
        Safely read a file's text content with size limits and encoding fallbacks.
        Returns a dict with 'success', 'path', 'content', 'size', 'lang', 'error'.
        """
        abs_path = os.path.abspath(os.path.join(self.base_dir, filepath)) if not os.path.isabs(filepath) else filepath
        rel_path = os.path.relpath(abs_path, self.base_dir).replace("\\", "/")

        if not os.path.isfile(abs_path):
            return {
                "success": False,
                "path": rel_path,
                "error": f"File not found: {rel_path}",
            }

        if self.is_binary_file(abs_path):
            return {
                "success": False,
                "path": rel_path,
                "error": f"Skipped binary file: {rel_path}",
            }

        size = os.path.getsize(abs_path)
        if size > self.max_file_bytes:
            return {
                "success": False,
                "path": rel_path,
                "error": f"File exceeds maximum allowed size ({round(size / 1024, 1)} KB > {round(self.max_file_bytes / 1024, 1)} KB): {rel_path}",
            }

        # Multi-encoding read
        encodings = ["utf-8", "latin-1", "cp1252"]
        content = None
        for enc in encodings:
            try:
                with open(abs_path, "r", encoding=enc) as f:
                    content = f.read()
                break
            except (UnicodeDecodeError, Exception):
                continue

        if content is None:
            return {
                "success": False,
                "path": rel_path,
                "error": f"Unable to decode text content for {rel_path}",
            }

        return {
            "success": True,
            "path": rel_path,
            "content": content,
            "size": size,
            "lang": self.get_language_fence(abs_path),
            "lines": content.count("\n") + 1,
        }

    def crawl_directory(self, dirpath: str) -> Tuple[List[Dict[str, Any]], str, List[str]]:
        """
        Recursively crawl a directory and gather text files within budget.
        Returns:
          (files_list, visual_tree_string, errors_or_warnings_list)
        """
        abs_dir = os.path.abspath(os.path.join(self.base_dir, dirpath)) if not os.path.isabs(dirpath) else dirpath
        rel_dir = os.path.relpath(abs_dir, self.base_dir).replace("\\", "/")
        if rel_dir == ".":
            rel_dir = ""

        if not os.path.isdir(abs_dir):
            return [], "", [f"Directory not found: {dirpath}"]

        gathered_files: List[Dict[str, Any]] = []
        warnings: List[str] = []
        total_bytes = 0

        # Build visual tree & collect files
        tree_lines = [f"{os.path.basename(abs_dir) or 'root'}/"]

        for root, dirs, files in os.walk(abs_dir):
            rel_root = os.path.relpath(root, self.base_dir).replace("\\", "/")
            if rel_root == ".":
                rel_root = ""

            # Filter ignored directories in-place to avoid descending into them
            dirs[:] = [
                d for d in dirs
                if not self.is_ignored(f"{rel_root}/{d}" if rel_root else d)
            ]

            for file in sorted(files):
                file_rel = f"{rel_root}/{file}" if rel_root else file
                if self.is_ignored(file_rel):
                    continue

                full_path = os.path.join(root, file)

                # Skip binary files
                if self.is_binary_file(full_path):
                    continue

                if len(gathered_files) >= self.max_dir_files:
                    warnings.append(f"Reached maximum file count limit ({self.max_dir_files} files). Remaining files omitted.")
                    break

                res = self.read_file(full_path)
                if res["success"]:
                    if total_bytes + res["size"] > self.max_total_bytes:
                        warnings.append(f"Reached maximum total byte limit ({round(self.max_total_bytes / (1024*1024), 1)} MB). Remaining files omitted.")
                        break
                    total_bytes += res["size"]
                    gathered_files.append(res)
                else:
                    warnings.append(res["error"])

            if len(gathered_files) >= self.max_dir_files or total_bytes >= self.max_total_bytes:
                break

        tree_str = self.generate_tree(abs_dir)
        return gathered_files, tree_str, warnings

    def generate_tree(self, dirpath: str, max_depth: int = 4) -> str:
        """Generate an ASCII visual hierarchy tree for a directory."""
        abs_dir = os.path.abspath(os.path.join(self.base_dir, dirpath)) if not os.path.isabs(dirpath) else dirpath
        if not os.path.isdir(abs_dir):
            return ""

        lines: List[str] = [f"📂 {os.path.basename(abs_dir) or '.'}/"]

        def _walk(current_dir: str, prefix: str, depth: int):
            if depth > max_depth:
                lines.append(f"{prefix}└── ...")
                return

            try:
                entries = sorted(os.listdir(current_dir))
            except Exception:
                return

            # Filter entries
            filtered = []
            for e in entries:
                rel = os.path.relpath(os.path.join(current_dir, e), self.base_dir).replace("\\", "/")
                if not self.is_ignored(rel):
                    filtered.append(e)

            count = len(filtered)
            for i, entry in enumerate(filtered):
                is_last = (i == count - 1)
                connector = "└── " if is_last else "├── "
                sub_path = os.path.join(current_dir, entry)

                if os.path.isdir(sub_path):
                    lines.append(f"{prefix}{connector}📁 {entry}/")
                    new_prefix = prefix + ("    " if is_last else "│   ")
                    _walk(sub_path, new_prefix, depth + 1)
                else:
                    lines.append(f"{prefix}{connector}📄 {entry}")

        _walk(abs_dir, "", 1)
        return "\n".join(lines[:100])  # Cap at 100 lines for readability

    def expand_prompt_mentions(self, prompt: str) -> Tuple[str, List[Dict[str, Any]]]:
        """
        Scans prompt for '@path/to/file' mentions (e.g. '@chat_streamer.py' or '@/src/main.py').
        Resolves each file, attaches its content, and returns the expanded prompt.
        """
        # Match pattern: @filepath.ext (ignoring email addresses like user@domain.com)
        # Email has alphanumeric on both sides of @; @file has whitespace, start of line, or punctuation before @
        mention_pattern = re.compile(r'(?:^|[\s\(\[\{])@([a-zA-Z0-9_\.\-\\/]+(?:\.[a-zA-Z0-9_]+)+)')
        matches = mention_pattern.findall(prompt)

        if not matches:
            return prompt, []

        attached_files: List[Dict[str, Any]] = []
        seen_paths: Set[str] = set()

        for match in matches:
            candidate_path = match.strip().lstrip("@/\\")
            if candidate_path in seen_paths:
                continue

            # Check if file exists relative to base_dir
            res = self.read_file(candidate_path)
            if res["success"]:
                seen_paths.add(candidate_path)
                attached_files.append(res)

        if not attached_files:
            return prompt, []

        # Bundle attached files at bottom of prompt
        attachment_blocks = []
        for f in attached_files:
            lang = f["lang"]
            attachment_blocks.append(
                f"[Attached File: {f['path']} ({f['lines']} lines)]\n"
                f"```{lang}\n"
                f"{f['content']}\n"
                f"```"
            )

        expanded_prompt = (
            f"{prompt.strip()}\n\n"
            f"--- Attached Context ({len(attached_files)} files) ---\n"
            + "\n\n".join(attachment_blocks)
        )

        return expanded_prompt, attached_files

    def bundle_context(
        self,
        prompt: str,
        files: Optional[List[str]] = None,
        dirs: Optional[List[str]] = None,
    ) -> Tuple[str, List[Dict[str, Any]], List[str]]:
        """
        Comprehensive bundler: combines user prompt, explicit files, directories,
        and '@file' mentions into a single prompt payload.
        """
        all_files: List[Dict[str, Any]] = []
        warnings: List[str] = []
        seen_paths: Set[str] = set()

        # 1. Expand in-prompt @mentions
        expanded_prompt, mentioned_files = self.expand_prompt_mentions(prompt)
        for mf in mentioned_files:
            if mf["path"] not in seen_paths:
                seen_paths.add(mf["path"])
                all_files.append(mf)

        # 2. Add explicit files
        if files:
            for fpath in files:
                fpath_clean = fpath.strip()
                if not fpath_clean:
                    continue
                res = self.read_file(fpath_clean)
                if res["success"]:
                    if res["path"] not in seen_paths:
                        seen_paths.add(res["path"])
                        all_files.append(res)
                else:
                    warnings.append(res["error"])

        # 3. Add explicit directories
        tree_blocks: List[str] = []
        if dirs:
            for dpath in dirs:
                dpath_clean = dpath.strip()
                if not dpath_clean:
                    continue
                c_files, c_tree, c_warnings = self.crawl_directory(dpath_clean)
                warnings.extend(c_warnings)
                if c_tree:
                    tree_blocks.append(f"### Directory Structure ({dpath_clean}):\n```text\n{c_tree}\n```")
                for cf in c_files:
                    if cf["path"] not in seen_paths:
                        seen_paths.add(cf["path"])
                        all_files.append(cf)

        # If no explicit attachments or trees were added, return expanded prompt directly
        if not files and not dirs and not tree_blocks:
            return expanded_prompt, all_files, warnings

        # Build final bundled markdown prompt
        sections: List[str] = []

        if tree_blocks:
            sections.append("\n\n".join(tree_blocks))

        if all_files:
            file_blocks = []
            for f in all_files:
                file_blocks.append(
                    f"### File: {f['path']} ({f['lines']} lines, {round(f['size'] / 1024, 1)} KB)\n"
                    f"```{f['lang']}\n"
                    f"{f['content']}\n"
                    f"```"
                )
            sections.append(f"## Codebase Context ({len(all_files)} files):\n" + "\n\n".join(file_blocks))

        sections.append(f"## User Instruction:\n{prompt.strip()}")

        final_prompt = "\n\n---\n\n".join(sections)
        return final_prompt, all_files, warnings


# ---------------------------------------------------------------------------
# CLI Test & Inspection Runner
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="FreeAI File & Codebase Attachment Pipeline")
    parser.add_argument("--file", "-f", action="append", help="Attach a specific file")
    parser.add_argument("--dir", "-d", action="append", help="Attach a directory tree")
    parser.add_argument("--tree", "-t", type=str, help="Print visual directory tree")
    parser.add_argument("--prompt", "-p", type=str, default="Review the attached code.", help="User prompt to bundle")
    parser.add_argument("--expand", "-e", type=str, help="Test @path mention expansion in a string")

    args = parser.parse_args()
    ingestor = AttachmentIngestor()

    if args.tree:
        tree = ingestor.generate_tree(args.tree)
        print(tree)
        sys.exit(0)

    if args.expand:
        expanded, attachments = ingestor.expand_prompt_mentions(args.expand)
        print(f"[+] Found {len(attachments)} attachments:")
        for a in attachments:
            print(f"    - {a['path']} ({a['lines']} lines, {a['size']} bytes)")
        print("\n[+] Expanded Prompt Preview:")
        print(expanded[:600] + ("..." if len(expanded) > 600 else ""))
        sys.exit(0)

    if args.file or args.dir:
        bundled, files, warns = ingestor.bundle_context(args.prompt, files=args.file, dirs=args.dir)
        print(f"[+] Bundled {len(files)} files into prompt ({len(bundled)} chars).")
        for w in warns:
            print(f"    [!] Warning: {w}")
        print("\n--- Preview (First 800 chars) ---")
        print(bundled[:800])
