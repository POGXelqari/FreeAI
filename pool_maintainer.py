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
    from curl_cffi import requests as curl_requests
except ImportError:
    curl_requests = None

try:
    import requests
except ImportError:
    print("Error: The 'requests' package is required. Install with: pip install requests")
    sys.exit(1)

from account_creator import UseAIAuthClient, GmailImapClient, load_env_file

load_env_file()

try:
    from proxy_manager import ProxyPool, ProxyRecord
except ImportError:
    ProxyPool = None
    ProxyRecord = None


class AccountAuditor:
    """
    Non-intrusive auditor that tests account session health without consuming chat quota.
    Uses browser TLS impersonation (curl_cffi) to bypass Cloudflare Bot Management challenges.
    Provides multi-tier fallback: Preferred Proxy -> Alternative Proxy -> Direct Host Connection.
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

    def __init__(
        self,
        timeout: int = 5,
        proxy_pool: Optional[Any] = None,
        proxy: Optional[str] = None,
    ):
        self.timeout = timeout
        if proxy_pool is None and ProxyPool is not None and not proxy:
            src = os.environ.get("FREEAI_PROXIES")
            if src:
                proxy_pool = ProxyPool(src)
        self.proxy_pool = proxy_pool
        self.single_proxy = proxy

    def check_account(self, account: Dict[str, Any], max_retries: int = 2) -> Dict[str, Any]:
        """
        Tests session validity of a single account record non-destructively.
        Features 3-tier automatic failover:
          Tier 1: Preferred Proxy
          Tier 2: Alternative Healthy Proxy
          Tier 3: Direct Host Egress (via curl_cffi Chrome impersonation)
        Returns:
          status: 'VALID' | 'EXPIRED' | 'IP_CHALLENGED' | 'RATE_LIMITED' | 'NETWORK_ERROR'
          valid: bool (True for VALID and temporary blocks/errors; False ONLY for confirmed EXPIRED)
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

        tried_proxies: List[str] = []
        last_error_status = "NETWORK_ERROR"
        last_error_reason = "All egress routes failed"

        for attempt in range(max_retries + 1):
            p_rec: Optional[Any] = None
            proxies_dict: Optional[Dict[str, str]] = None
            route_label = "Direct"

            # Determine egress route for this attempt
            if self.proxy_pool:
                p_rec = self.proxy_pool.get_proxy(exclude_urls=tried_proxies, allow_direct_fallback=True)
                if p_rec:
                    proxies_dict = p_rec.to_dict()
                    tried_proxies.append(p_rec.url)
                    route_label = f"Proxy {p_rec.ip}"
                else:
                    route_label = "Direct (Proxy Fallback)"
            elif self.single_proxy and attempt == 0:
                proxies_dict = {"http": self.single_proxy, "https": self.single_proxy}
                route_label = "Proxy"
            else:
                route_label = "Direct"

            # Build session: prefer curl_cffi with Chrome impersonation to eliminate Cloudflare 403 challenges
            if curl_requests is not None:
                session = curl_requests.Session(impersonate="chrome124")
            else:
                session = requests.Session()
                session.headers.update(self.BASE_HEADERS)

            session.cookies.update(cookies)
            if proxies_dict:
                session.proxies = proxies_dict

            try:
                res = session.get(self.SESSION_ENDPOINT, timeout=self.timeout)
            except Exception as e:
                err_msg = str(e)
                if p_rec and self.proxy_pool:
                    self.proxy_pool.mark_failure(p_rec.url, error=err_msg)
                last_error_status = "NETWORK_ERROR"
                last_error_reason = f"Network request failed via {route_label}: {err_msg}"

                # If proxies failed, fallback to next proxy or direct connection
                if attempt < max_retries:
                    continue
                return {
                    "email": email,
                    "status": "NETWORK_ERROR",
                    "reason": last_error_reason,
                    "valid": True,  # Non-destructive: transient network errors must not prune account!
                }

            # HTTP 200 OK: Valid session response
            if res.status_code == 200:
                try:
                    data = res.json()
                    sess = data.get("session")
                    user = data.get("user")
                    if sess and user:
                        if p_rec and self.proxy_pool:
                            self.proxy_pool.mark_success(p_rec.url)
                        recovered = (attempt > 0 and len(tried_proxies) > 0)
                        return {
                            "email": email,
                            "userId": user.get("id"),
                            "status": "VALID",
                            "expiresAt": sess.get("expiresAt"),
                            "planType": sess.get("planType", "free"),
                            "valid": True,
                            "route": route_label,
                            "recovered": recovered,
                        }
                    else:
                        return {
                            "email": email,
                            "status": "EXPIRED",
                            "reason": "Session endpoint returned 200 OK but session object was null.",
                            "valid": False,
                        }
                except (json.JSONDecodeError, ValueError):
                    return {
                        "email": email,
                        "status": "PARSE_ERROR",
                        "reason": f"Malformed JSON response (HTTP 200): {res.text[:100]}",
                        "valid": True,  # Keep account safe on unexpected payload
                    }

            # HTTP 401 Unauthorized: Session definitively revoked or expired
            elif res.status_code == 401:
                return {
                    "email": email,
                    "status": "EXPIRED",
                    "reason": "HTTP 401 Unauthorized (Session revoked or expired)",
                    "valid": False,
                }

            # HTTP 403 Forbidden: Cloudflare Challenge on current proxy/egress
            elif res.status_code == 403:
                if p_rec and self.proxy_pool:
                    self.proxy_pool.mark_failure(p_rec.url, status_code=403, error="Cloudflare Challenge")
                last_error_status = "IP_CHALLENGED"
                last_error_reason = f"HTTP 403 Forbidden (Cloudflare Challenge on {route_label})"

                # If proxy was challenged, fallback immediately to next proxy or direct host egress!
                if attempt < max_retries:
                    continue
                return {
                    "email": email,
                    "status": "IP_CHALLENGED",
                    "reason": last_error_reason,
                    "valid": True,  # NON-DESTRUCTIVE: Never prune on IP challenges!
                }

            # HTTP 429 Too Many Requests: Rate limited egress
            elif res.status_code == 429:
                if p_rec and self.proxy_pool:
                    self.proxy_pool.mark_failure(p_rec.url, status_code=429, error="Rate Limited")
                last_error_status = "RATE_LIMITED"
                last_error_reason = f"HTTP 429 Too Many Requests on {route_label}"

                if attempt < max_retries:
                    continue
                return {
                    "email": email,
                    "status": "RATE_LIMITED",
                    "reason": last_error_reason,
                    "valid": True,  # Non-destructive
                }
            else:
                last_error_status = "HTTP_ERROR"
                last_error_reason = f"HTTP {res.status_code}: {res.text[:100]}"
                if attempt < max_retries:
                    continue
                return {
                    "email": email,
                    "status": "HTTP_ERROR",
                    "reason": last_error_reason,
                    "valid": True,
                }

        return {
            "email": email,
            "status": last_error_status,
            "reason": last_error_reason,
            "valid": True,
        }

    def audit_pool(
        self,
        accounts_file: str = "accounts.json",
        prune_dead: bool = True,
        delay: float = 1.2,
        verbose: bool = True,
    ) -> Dict[str, Any]:
        """
        Audit all accounts in accounts_file non-destructively.
        Only prunes confirmed EXPIRED accounts (HTTP 401 / null session).
        Never deletes accounts when Cloudflare challenges (HTTP 403) or rate-limits (HTTP 429).
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
            print(f"[Auditor] Starting non-destructive audit of {total} accounts in {os.path.basename(file_path)}...")
            if self.proxy_pool:
                print(f"[Auditor] Proxy Pool active: {self.proxy_pool.available_count()} proxies available for audit.")

        valid_accounts: List[Dict[str, Any]] = []
        expired_accounts: List[Dict[str, Any]] = []
        challenged_accounts: List[Dict[str, Any]] = []
        results: List[Dict[str, Any]] = []
        consecutive_failures = 0

        for i, acc in enumerate(accounts):
            res = self.check_account(acc)
            results.append(res)

            if res["status"] == "VALID":
                consecutive_failures = 0
                valid_accounts.append(acc)
                rec_note = " (Recovered via direct fallback)" if res.get("recovered") else ""
                if verbose:
                    print(f"  [{i+1}/{total}] [+ VALID] {res['email']} (Expires: {res.get('expiresAt', 'N/A')}){rec_note}")
            elif res["status"] in ("IP_CHALLENGED", "RATE_LIMITED", "NETWORK_ERROR", "PARSE_ERROR", "HTTP_ERROR"):
                consecutive_failures += 1
                valid_accounts.append(acc)  # Safely retain in pool!
                challenged_accounts.append(acc)
                if verbose:
                    print(f"  [{i+1}/{total}] [! {res['status']}] {res['email']} - {res['reason']} (Retained in pool)")
            else:
                consecutive_failures += 1
                expired_accounts.append(acc)
                if verbose:
                    print(f"  [{i+1}/{total}] [- {res['status']}] {res['email']} - {res['reason']}")

            # Auditor Circuit Breaker: Halt early if 4 consecutive failures across all egress routes
            if consecutive_failures >= 4 and (i + 1) < total:
                if verbose:
                    print(f"\n[Auditor Circuit Breaker] 4 consecutive accounts failed across all routes.")
                    print(f"[Auditor Circuit Breaker] Pausing audit cycle early to protect IP health. Retaining 100% of remaining accounts.")
                # Safely retain all remaining unaudited accounts in the valid pool
                for rem in accounts[i+1:]:
                    valid_accounts.append(rem)
                break

            if delay > 0 and i < total - 1:
                time.sleep(delay + random.uniform(0.3, 0.8))

        pruned_count = 0
        if prune_dead and expired_accounts:
            temp_file = f"{file_path}.tmp"
            try:
                with open(temp_file, "w", encoding="utf-8") as f:
                    json.dump(valid_accounts, f, indent=2)
                os.replace(temp_file, file_path)
                pruned_count = len(expired_accounts)
                if verbose:
                    print(f"[Auditor] Atomically pruned {pruned_count} confirmed expired accounts. Remaining in pool: {len(valid_accounts)}")
            except Exception as e:
                print(f"[Auditor] Error saving pruned accounts: {e}")

        return {
            "success": True,
            "timestamp": time.time(),
            "date": time.strftime("%Y-%m-%d %H:%M:%S"),
            "file": file_path,
            "total_checked": len(results),
            "valid_count": sum(1 for r in results if r["status"] == "VALID"),
            "challenged_count": len(challenged_accounts),
            "expired_count": len(expired_accounts),
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
        min_reserve: int = 15,
        target_reserve: int = 20,
        auditor: Optional[AccountAuditor] = None,
        proxy_pool: Optional[Any] = None,
        proxy_source: Optional[str] = None,
        gmail_address: Optional[str] = None,
        gmail_password: Optional[str] = None,
        gmail_client: Optional[Any] = None,
    ):
        self.accounts_file = os.path.abspath(accounts_file)
        self.min_reserve = min_reserve
        self.target_reserve = target_reserve
        if proxy_pool is None and ProxyPool is not None:
            src = proxy_source or os.environ.get("FREEAI_PROXIES")
            if src:
                proxy_pool = ProxyPool(src)
                proxy_source = src
        self.proxy_pool = proxy_pool
        self.proxy_source = proxy_source
        self.auditor = auditor or AccountAuditor(proxy_pool=proxy_pool)
        self.gmail_address = gmail_address or os.environ.get("GMAIL_ADDRESS", "your_email@gmail.com")
        self.gmail_password = gmail_password or os.environ.get("GMAIL_APP_PASSWORD", "")
        if gmail_client:
            self.gmail_client = gmail_client
        elif self.gmail_address:
            self.gmail_client = GmailImapClient(email_address=self.gmail_address, app_password=self.gmail_password)
        else:
            self.gmail_client = None
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
        delay: float = 12.0,
        verbose: bool = True,
    ) -> Dict[str, Any]:
        """
        Creates new accounts until the pool reaches target_count or max_batch is met.
        Rotates through proxies and obeys circuit breaker to prevent IP bans.
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
            if self.proxy_pool:
                print(f"[Maintainer] Proxy Pool: {self.proxy_pool.available_count()} active proxies available.")

        created = 0
        failed = 0
        backoff = 3.0

        for i in range(to_create):
            success = False
            tried_proxy_urls: List[str] = []
            res: Dict[str, Any] = {}
            proxy_rec = None
            egress_info = ""

            # Attempt up to 3 times (Preferred Proxy -> Alternative Proxy -> Direct Host Fallback)
            for attempt in range(3):
                proxy_rec = None
                proxy_url = None
                if self.proxy_pool:
                    proxy_rec = self.proxy_pool.get_proxy(exclude_urls=tried_proxy_urls, allow_direct_fallback=True)
                    if proxy_rec:
                        proxy_url = proxy_rec.url
                        tried_proxy_urls.append(proxy_url)
                        egress_info = f" via {proxy_rec.ip}"
                    else:
                        egress_info = " (Direct Fallback)" if tried_proxy_urls else ""
                elif self.proxy_source and attempt == 0:
                    proxy_url = self.proxy_source
                    egress_info = " via Proxy"
                else:
                    egress_info = ""

                client = UseAIAuthClient(proxy=proxy_url, auto_warmup=True)
                res = client.create_account(gmail_client=self.gmail_client)

                if res.get("success"):
                    success = True
                    if proxy_rec and self.proxy_pool:
                        self.proxy_pool.mark_success(proxy_rec.url)
                    break
                else:
                    # Mark proxy failure and determine if fallback should proceed
                    err = res.get("error") or res.get("response")
                    if proxy_rec and self.proxy_pool:
                        if res.get("is_rate_limited"):
                            self.proxy_pool.mark_failure(proxy_rec.url, status_code=429, error="SIGNUP_RATE_LIMITED")
                        elif res.get("is_challenge"):
                            self.proxy_pool.mark_failure(proxy_rec.url, status_code=403, error="Cloudflare Challenge")
                        else:
                            self.proxy_pool.mark_failure(proxy_rec.url, error=str(err))

                    # If rate limited on direct IP (no proxy), break early
                    if res.get("is_rate_limited") and not proxy_rec:
                        if verbose:
                            print(f"[Maintainer CIRCUIT BREAKER] Direct host IP rate-limited. Halting replenishment.")
                        break

            if success:
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
                        print(f"  [{i+1}/{to_create}] [+ CREATED] {new_acc['email']}{egress_info} (Pool now: {len(current_accounts)})")
                except Exception as e:
                    if verbose:
                        print(f"  [{i+1}/{to_create}] [!] Error saving account: {e}")
                    failed += 1
            else:
                failed += 1
                err = res.get("error") or res.get("response")
                if verbose:
                    print(f"  [{i+1}/{to_create}] [- FAILED] {res.get('email', 'unknown')}{egress_info} - {err}")

                if res.get("is_rate_limited"):
                    if verbose:
                        print(f"  [*] Egress IP cooldown active (SIGNUP_RATE_LIMITED). Pausing replenishment until next cycle.")
                    break

                if res.get("is_challenge"):
                    backoff = min(backoff * 1.5, 20.0)
                    time.sleep(backoff)

            # Inter-request delay with randomized jitter
            if i < to_create - 1 and delay > 0:
                time.sleep(delay + random.uniform(2.0, 5.0))

        self.last_replenish_time = time.time()
        final_count = self.get_pool_count()
        if verbose:
            print(f"[Maintainer] Replenishment completed. Created: {created}, Failed: {failed}, Final Pool: {final_count}")

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
        delay: float = 1.2,
        verbose: bool = True,
    ) -> None:
        """
        Continuous background loop checking pool depth and conducting periodic audits.
        """
        if verbose:
            print(f"[Maintainer Daemon] Started. Min reserve: {self.min_reserve}, Target: {self.target_reserve}, Interval: {check_interval}s")
            if self.proxy_pool:
                print(f"[Maintainer Daemon] Proxy source: {self.proxy_source} ({self.proxy_pool.count()} proxies)")

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
                    delay=delay,
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
                    delay=12.0,
                    verbose=verbose,
                )

            # Sleep in small increments to respond quickly to stop event
            for _ in range(check_interval):
                if self._stop_event.is_set():
                    break
                time.sleep(1)

        if verbose:
            print("[Maintainer Daemon] Stopped gracefully.")

    def start_background_thread(self, check_interval: int = 60, delay: float = 1.2) -> threading.Thread:
        """Launch daemon loop inside a non-blocking background thread."""
        self._stop_event.clear()
        self._thread = threading.Thread(
            target=self.run_daemon,
            kwargs={"check_interval": check_interval, "delay": delay, "verbose": True},
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
    parser.add_argument("--audit", action="store_true", help="Perform a non-destructive session validity audit")
    parser.add_argument("--no-prune", action="store_true", help="Do not prune confirmed expired accounts during audit")
    parser.add_argument("--replenish", action="store_true", help="Top up the account pool to target depth")
    parser.add_argument("--count", "-c", type=int, default=None, help="Number of accounts to create during replenishment")
    parser.add_argument("--target", "-t", type=int, default=60, help="Target total reserve depth (default: 60)")
    parser.add_argument("--min", "-m", type=int, default=50, help="Minimum reserve before replenishment triggers (default: 50)")
    parser.add_argument("--delay", type=float, default=1.2, help="Delay in seconds between audit requests (default: 1.2)")
    parser.add_argument("--proxy", type=str, default=None, help="Optional single proxy URL (e.g. http://user:pass@host:port)")
    parser.add_argument("--proxy-file", type=str, default=None, help="Optional path to proxy list file (e.g. 'Webshare 10 proxies.txt')")
    parser.add_argument("--daemon", "-d", action="store_true", help="Run as standing background maintenance daemon")
    parser.add_argument("--interval", "-i", type=int, default=60, help="Daemon check interval in seconds (default: 60)")
    parser.add_argument(
        "--gmail",
        type=str,
        default=os.environ.get("GMAIL_ADDRESS", "your_email@gmail.com"),
        help="Base Gmail address for autonomous replenishment (default: env GMAIL_ADDRESS or your_email@gmail.com)",
    )
    parser.add_argument(
        "--gmail-password",
        type=str,
        default=os.environ.get("GMAIL_APP_PASSWORD", ""),
        help="16-character Google App Password for IMAP access (default: env GMAIL_APP_PASSWORD)",
    )

    args = parser.parse_args()

    # Proxy source: CLI flag -> FREEAI_PROXIES env var (Direct host connection is default)
    proxy_source = args.proxy_file or (args.proxy if args.proxy else None) or os.environ.get("FREEAI_PROXIES")

    proxy_pool = None
    if proxy_source and ProxyPool is not None:
        proxy_pool = ProxyPool(proxy_source)
        stats = proxy_pool.get_stats()
        print(f"[*] Proxy Pool active: {stats['ready']} available proxies loaded from '{proxy_source}'.")

    auditor = AccountAuditor(proxy_pool=proxy_pool, proxy=args.proxy)
    maintainer = PoolMaintainer(
        accounts_file=args.accounts,
        min_reserve=args.min,
        target_reserve=args.target,
        auditor=auditor,
        proxy_pool=proxy_pool,
        proxy_source=proxy_source,
        gmail_address=args.gmail,
        gmail_password=args.gmail_password,
    )

    if args.audit:
        report = auditor.audit_pool(
            accounts_file=args.accounts,
            prune_dead=(not args.no_prune),
            delay=args.delay,
            verbose=True,
        )
        print("\n" + "=" * 60)
        print("                 AUDIT REPORT SUMMARY")
        print("=" * 60)
        print(f"Total Checked       : {report['total_checked']}")
        print(f"Valid Sessions      : {report['valid_count']}")
        print(f"Challenged / Shield : {report['challenged_count']}")
        print(f"Confirmed Expired   : {report['expired_count']}")
        print(f"Pruned from Pool    : {report['pruned_count']}")
        print(f"Retained in Pool    : {report['remaining_count']}")
        print("=" * 60)
        sys.exit(0)

    if args.replenish:
        maintainer.replenish(
            target_count=args.target if args.count is None else (maintainer.get_pool_count() + args.count),
            delay=12.0,
            verbose=True,
        )
        sys.exit(0)

    if args.daemon:
        try:
            maintainer.run_daemon(check_interval=args.interval, delay=args.delay, verbose=True)
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
