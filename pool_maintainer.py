#!/usr/bin/env python3
"""
FreeAI Background Account Pool Maintainer & Auditor (pool_maintainer.py)
-----------------------------------------------------------------------
Provides autonomous health auditing, session validity verification, and automated
replenishment for the FreeAI rotating account pool (accounts.json).

Features:
  - Zero-Quota Non-Intrusive Auditing: Validates sessions via GET /v1/auth/get-session
    without consuming chat message quotas.
  - Automated Pruning: Identifies and atomically removes expired, revoked, or dead sessions.
  - Autonomous Replenishment: Spawns account creation routines with randomized email patterns,
    Client Hints emulation, and backoff when pool depth drops below a configured threshold.
  - Daemon Mode & API Gateway Integration: Can run standalone or as an in-process async background
    task within the API server.
"""

import os
import sys
import json
import time
import random
import argparse
import threading
from typing import List, Dict, Any, Optional, Tuple

# Ensure local imports work
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

# Ensure clean UTF-8 console output with immediate flushing
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace", line_buffering=True)
        sys.stderr.reconfigure(encoding="utf-8", errors="replace", line_buffering=True)
    except Exception:
        pass

try:
    import requests
except ImportError:
    print("Error: The 'requests' package is required. Install with: pip install requests")
    sys.exit(1)

from account_creator import UseAIAuthClient


class AccountAuditor:
    """
    Non-intrusive auditor that tests account session health without consuming chat quota.
    """
    SESSION_ENDPOINT = "https://use.ai/v1/auth/get-session"
    BASE_HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Origin": "https://use.ai",
        "Referer": "https://use.ai/",
        "Sec-CH-UA": '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        "Sec-CH-UA-Mobile": "?0",
        "Sec-CH-UA-Platform": '"Windows"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
    }

    def __init__(self, timeout: int = 10):
        self.timeout = timeout

    def check_account(self, account: Dict[str, Any]) -> Dict[str, Any]:
        """
        Tests session validity of a single account record.
        Returns:
          status: 'VALID' | 'EXPIRED' | 'BLOCKED' | 'ERROR'
          details: reason, HTTP status code, or session info
        """
        email = account.get("email", "unknown")
        cookies = account.get("cookies", {})

        if not cookies:
            return {
                "email": email,
                "status": "EXPIRED",
                "reason": "Missing session cookies in account record.",
                "valid": False,
            }

        session = requests.Session()
        session.headers.update(self.BASE_HEADERS)
        session.cookies.update(cookies)

        try:
            res = session.get(self.SESSION_ENDPOINT, timeout=self.timeout)
        except requests.RequestException as e:
            return {
                "email": email,
                "status": "ERROR",
                "reason": f"Network request failed: {e}",
                "valid": False,
            }

        if res.status_code == 200:
            try:
                data = res.json()
                sess = data.get("session")
                user = data.get("user")
                if sess and user:
                    return {
                        "email": email,
                        "userId": user.get("id"),
                        "status": "VALID",
                        "expiresAt": sess.get("expiresAt"),
                        "planType": sess.get("planType", "free"),
                        "valid": True,
                    }
                else:
                    return {
                        "email": email,
                        "status": "EXPIRED",
                        "reason": "Session endpoint returned 200 OK but session object was null.",
                        "valid": False,
                    }
            except json.JSONDecodeError:
                return {
                    "email": email,
                    "status": "ERROR",
                    "reason": f"Malformed JSON: {res.text[:100]}",
                    "valid": False,
                }
        elif res.status_code == 401:
            return {
                "email": email,
                "status": "EXPIRED",
                "reason": "HTTP 401 Unauthorized (Session revoked or expired)",
                "valid": False,
            }
        elif res.status_code == 403:
            return {
                "email": email,
                "status": "BLOCKED",
                "reason": "HTTP 403 Forbidden (Cloudflare Challenge or IP block)",
                "valid": False,
            }
        else:
            return {
                "email": email,
                "status": "ERROR",
                "reason": f"HTTP {res.status_code}: {res.text[:100]}",
                "valid": False,
            }

    def audit_pool(
        self,
        accounts_file: str = "accounts.json",
        prune_dead: bool = True,
        delay: float = 0.3,
        verbose: bool = True,
    ) -> Dict[str, Any]:
        """
        Audit all accounts in accounts_file.
        Optionally prunes expired/dead accounts and atomically saves the updated list.
        """
        file_path = os.path.abspath(accounts_file)
        if not os.path.isfile(file_path):
            return {
                "success": False,
                "error": f"Accounts file not found: {file_path}",
                "total": 0,
                "valid": 0,
                "expired": 0,
            }

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                accounts = json.load(f)
        except Exception as e:
            return {
                "success": False,
                "error": f"Failed to read {file_path}: {e}",
                "total": 0,
                "valid": 0,
                "expired": 0,
            }

        if not isinstance(accounts, list):
            accounts = []

        total = len(accounts)
        if verbose:
            print(f"[Auditor] Starting non-intrusive audit of {total} accounts in {os.path.basename(file_path)}...")

        valid_accounts: List[Dict[str, Any]] = []
        dead_accounts: List[Dict[str, Any]] = []
        results: List[Dict[str, Any]] = []

        for i, acc in enumerate(accounts):
            res = self.check_account(acc)
            results.append(res)

            if res["valid"]:
                valid_accounts.append(acc)
                if verbose:
                    print(f"  [{i+1}/{total}] [✓ VALID] {res['email']} (Expires: {res.get('expiresAt', 'N/A')})")
            else:
                dead_accounts.append(acc)
                if verbose:
                    print(f"  [{i+1}/{total}] [✗ {res['status']}] {res['email']} - {res['reason']}")

            if delay > 0 and i < total - 1:
                time.sleep(delay)

        pruned_count = 0
        if prune_dead and dead_accounts:
            temp_file = f"{file_path}.tmp"
            try:
                with open(temp_file, "w", encoding="utf-8") as f:
                    json.dump(valid_accounts, f, indent=2)
                os.replace(temp_file, file_path)
                pruned_count = len(dead_accounts)
                if verbose:
                    print(f"[Auditor] Atomically pruned {pruned_count} dead accounts. Remaining valid: {len(valid_accounts)}")
            except Exception as e:
                print(f"[Auditor] Error saving pruned accounts: {e}")

        return {
            "success": True,
            "timestamp": time.time(),
            "date": time.strftime("%Y-%m-%d %H:%M:%S"),
            "file": file_path,
            "total_checked": total,
            "valid_count": len(valid_accounts),
            "dead_count": len(dead_accounts),
            "pruned_count": pruned_count,
            "remaining_count": len(valid_accounts),
            "results": results,
        }


class PoolMaintainer:
    """
    Autonomous background worker that manages account reserve depth and periodic audits.
    """

    def __init__(
        self,
        accounts_file: str = "accounts.json",
        min_reserve: int = 50,
        target_reserve: int = 60,
        auditor: Optional[AccountAuditor] = None,
    ):
        self.accounts_file = os.path.abspath(accounts_file)
        self.min_reserve = min_reserve
        self.target_reserve = target_reserve
        self.auditor = auditor or AccountAuditor()
        self._stop_event = threading.Event()
        self._thread: Optional[threading.Thread] = None
        self.last_audit_report: Optional[Dict[str, Any]] = None
        self.last_replenish_time: Optional[float] = None

    def get_pool_count(self) -> int:
        """Returns the current number of accounts in the pool file."""
        if not os.path.isfile(self.accounts_file):
            return 0
        try:
            with open(self.accounts_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                return len(data) if isinstance(data, list) else 0
        except Exception:
            return 0

    def replenish(
        self,
        target_count: Optional[int] = None,
        max_batch: int = 15,
        delay: float = 2.0,
        verbose: bool = True,
    ) -> Dict[str, Any]:
        """
        Creates new accounts until the pool reaches target_count or max_batch is met.
        """
        target = target_count or self.target_reserve
        current = self.get_pool_count()
        needed = max(0, target - current)

        if needed == 0:
            if verbose:
                print(f"[Maintainer] Pool is currently healthy ({current} >= {target} accounts). No replenishment needed.")
            return {"needed": 0, "created": 0, "failed": 0, "final_count": current}

        to_create = min(needed, max_batch)
        if verbose:
            print(f"[Maintainer] Pool below target ({current}/{target}). Initiating creation of {to_create} accounts...")

        created = 0
        failed = 0
        backoff = 2.0

        for i in range(to_create):
            client = UseAIAuthClient()
            res = client.create_account()

            if res.get("success"):
                new_acc = {
                    "email": res["email"],
                    "userId": res["userId"],
                    "sessionToken": res["sessionToken"],
                    "accessToken": res["accessToken"],
                    "expiresAt": res["expiresAt"],
                    "planType": res["planType"],
                    "cookies": res["cookies"],
                    "cookieHeader": res["cookieHeader"],
                    "createdAt": time.strftime("%Y-%m-%d %H:%M:%S"),
                }

                # Load current and append atomically
                try:
                    current_accounts = []
                    if os.path.isfile(self.accounts_file):
                        with open(self.accounts_file, "r", encoding="utf-8") as f:
                            current_accounts = json.load(f)
                    current_accounts.append(new_acc)

                    temp_file = f"{self.accounts_file}.tmp"
                    with open(temp_file, "w", encoding="utf-8") as f:
                        json.dump(current_accounts, f, indent=2)
                    os.replace(temp_file, self.accounts_file)

                    created += 1
                    if verbose:
                        print(f"  [{i+1}/{to_create}] [✓ CREATED] {new_acc['email']} (Pool now: {len(current_accounts)})")
                except Exception as e:
                    if verbose:
                        print(f"  [{i+1}/{to_create}] [!] Error saving account: {e}")
                    failed += 1
            else:
                failed += 1
                err = res.get("error") or res.get("response")
                if verbose:
                    print(f"  [{i+1}/{to_create}] [✗ FAILED] {res.get('email')} - {err}")

                # If rate-limited or challenged, back off
                if res.get("is_challenge"):
                    if verbose:
                        print(f"[Maintainer] Cloudflare challenge detected. Backing off for {backoff:.1f}s...")
                    time.sleep(backoff)
                    backoff = min(backoff * 1.5, 15.0)

            # Jitter delay
            time.sleep(delay + random.uniform(0.2, 0.8))

        self.last_replenish_time = time.time()
        final_count = self.get_pool_count()
        if verbose:
            print(f"[Maintainer] Replenishment run completed. Created: {created}, Failed: {failed}, Final Pool: {final_count}")

        return {
            "needed": needed,
            "created": created,
            "failed": failed,
            "final_count": final_count,
        }

    def run_daemon(
        self,
        check_interval: int = 60,
        audit_interval_cycles: int = 10,
        verbose: bool = True,
    ) -> None:
        """
        Continuous background loop checking pool depth and conducting periodic audits.
        """
        if verbose:
            print(f"[Maintainer Daemon] Started. Min reserve: {self.min_reserve}, Target: {self.target_reserve}, Interval: {check_interval}s")

        cycle = 0
        while not self._stop_event.is_set():
            cycle += 1
            current = self.get_pool_count()

            # 1. Periodic full audit (or first cycle)
            if cycle == 1 or cycle % audit_interval_cycles == 0:
                if verbose:
                    print(f"\n[Maintainer Daemon] Running scheduled pool health audit (Cycle {cycle})...")
                self.last_audit_report = self.auditor.audit_pool(
                    accounts_file=self.accounts_file,
                    prune_dead=True,
                    delay=0.2,
                    verbose=verbose,
                )
                current = self.last_audit_report["remaining_count"]

            # 2. Check if replenishment is needed
            if current < self.min_reserve:
                if verbose:
                    print(f"[Maintainer Daemon] Pool level ({current}) fell below minimum reserve ({self.min_reserve})!")
                self.replenish(
                    target_count=self.target_reserve,
                    max_batch=15,
                    delay=2.0,
                    verbose=verbose,
                )

            # Sleep in small increments to respond quickly to stop event
            for _ in range(check_interval):
                if self._stop_event.is_set():
                    break
                time.sleep(1)

        if verbose:
            print("[Maintainer Daemon] Stopped gracefully.")

    def start_background_thread(self, check_interval: int = 60) -> threading.Thread:
        """Launch daemon loop inside a non-blocking background thread."""
        self._stop_event.clear()
        self._thread = threading.Thread(
            target=self.run_daemon,
            kwargs={"check_interval": check_interval, "verbose": True},
            daemon=True,
            name="FreeAIPoolMaintainer",
        )
        self._thread.start()
        return self._thread

    def stop(self) -> None:
        """Signal background thread to stop."""
        self._stop_event.set()
        if self._thread and self._thread.is_alive():
            self._thread.join(timeout=5)


# ---------------------------------------------------------------------------
# CLI Command Runner
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(description="FreeAI Background Account Pool Maintainer & Auditor")
    parser.add_argument("--accounts", "-a", type=str, default="accounts.json", help="Path to accounts.json")
    parser.add_argument("--audit", action="store_true", help="Perform a non-intrusive session validity audit")
    parser.add_argument("--no-prune", action="store_true", help="Do not prune expired accounts during audit")
    parser.add_argument("--replenish", action="store_true", help="Top up the account pool to target depth")
    parser.add_argument("--count", "-c", type=int, default=None, help="Number of accounts to create during replenishment")
    parser.add_argument("--target", "-t", type=int, default=60, help="Target total reserve depth (default: 60)")
    parser.add_argument("--min", "-m", type=int, default=50, help="Minimum reserve before replenishment triggers (default: 50)")
    parser.add_argument("--daemon", "-d", action="store_true", help="Run as standing background maintenance daemon")
    parser.add_argument("--interval", "-i", type=int, default=60, help="Daemon check interval in seconds (default: 60)")

    args = parser.parse_args()

    auditor = AccountAuditor()
    maintainer = PoolMaintainer(
        accounts_file=args.accounts,
        min_reserve=args.min,
        target_reserve=args.target,
        auditor=auditor,
    )

    if args.audit:
        report = auditor.audit_pool(
            accounts_file=args.accounts,
            prune_dead=(not args.no_prune),
            verbose=True,
        )
        print("\n" + "=" * 60)
        print("                 AUDIT REPORT SUMMARY")
        print("=" * 60)
        print(f"Total Checked    : {report['total_checked']}")
        print(f"Valid Sessions   : {report['valid_count']}")
        print(f"Dead / Expired   : {report['dead_count']}")
        print(f"Pruned from Pool : {report['pruned_count']}")
        print(f"Current Pool     : {report['remaining_count']}")
        print("=" * 60)
        sys.exit(0)

    if args.replenish:
        maintainer.replenish(
            target_count=args.target if args.count is None else (maintainer.get_pool_count() + args.count),
            verbose=True,
        )
        sys.exit(0)

    if args.daemon:
        try:
            maintainer.run_daemon(check_interval=args.interval, verbose=True)
        except KeyboardInterrupt:
            print("\n[!] Keyboard interrupt received. Exiting...")
            maintainer.stop()
        sys.exit(0)

    # If no flags passed, display status
    count = maintainer.get_pool_count()
    print(f"[FreeAI Pool Status] Current accounts in '{args.accounts}': {count}")
    print("Run with --audit to verify session health, --replenish to add accounts, or --daemon for automated maintenance.")


if __name__ == "__main__":
    main()
