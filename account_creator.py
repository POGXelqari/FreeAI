#!/usr/bin/env python3
"""
Use.ai Account Creation & Email Login Automation Script
-------------------------------------------------------
Automates account creation and session generation on use.ai via the credentials / email flow.
Includes browser Client Hints emulation, session warmup (__cf_bm retention),
exponential backoff with jitter, and clean error handling.
"""

import sys
import os
import json
import random
import string
import time
import argparse
from typing import Optional, Dict, Any

try:
    import requests
except ImportError:
    print("The 'requests' package is required. Install with: pip install requests")
    sys.exit(1)

# Ensure clean UTF-8 console output across Windows and Unix
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass


class UseAIAuthClient:
    BASE_URL = "https://use.ai"
    CREDENTIALS_ENDPOINT = f"{BASE_URL}/v1/auth/sign-in/credentials"
    MAGIC_LINK_ENDPOINT = f"{BASE_URL}/v1/auth/sign-in/magic-link"
    SESSION_ENDPOINT = f"{BASE_URL}/v1/auth/get-session"

    DEFAULT_HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Content-Type": "application/json",
        "Origin": BASE_URL,
        "Referer": f"{BASE_URL}/",
        "Sec-CH-UA": '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        "Sec-CH-UA-Mobile": "?0",
        "Sec-CH-UA-Platform": '"Windows"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
    }

    def __init__(self, proxy: Optional[str] = None, auto_warmup: bool = True):
        self.session = requests.Session()
        self.session.headers.update(self.DEFAULT_HEADERS)
        if proxy:
            self.session.proxies = {"http": proxy, "https": proxy}
        self.is_warmed = False
        if auto_warmup:
            self.warmup()

    def warmup(self) -> bool:
        """
        Visits the landing page to establish Cloudflare Bot Management (__cf_bm)
        and guest tracking cookies, mimicking authentic browser navigation.
        """
        try:
            res = self.session.get(self.BASE_URL, timeout=12)
            self.is_warmed = (res.status_code == 200)
            return self.is_warmed
        except Exception:
            return False

    @staticmethod
    def generate_random_email(
        user_len: int = 14, domain_len: int = 10, tld_len: int = 12
    ) -> str:
        """
        Generates random emails matching the pattern:
        <random_str>@<random_domain>.<random_tld> (e.g. gjhfujtyujgfjh@hykjghjytr.thtrrugfhgfj)
        """
        username = "".join(random.choices(string.ascii_lowercase, k=user_len))
        domain = "".join(random.choices(string.ascii_lowercase, k=domain_len))
        tld = "".join(random.choices(string.ascii_lowercase, k=tld_len))
        return f"{username}@{domain}.{tld}"

    def create_account(self, email: Optional[str] = None) -> Dict[str, Any]:
        """
        Attempt account creation on use.ai via credentials endpoint.
        Returns a dictionary containing user details, tokens, and session info.
        """
        if not self.is_warmed:
            self.warmup()

        if not email:
            email = self.generate_random_email()

        payload = {
            "email": email,
            "turnstileBypass": True,
        }

        try:
            res = self.session.post(
                self.CREDENTIALS_ENDPOINT,
                json=payload,
                timeout=15,
            )
        except requests.RequestException as e:
            return {
                "success": False,
                "email": email,
                "error": f"Network request error: {e}",
            }

        if res.status_code != 200:
            # Detect Cloudflare challenge page cleanly without dumping 5KB HTML to terminal
            if "Just a moment..." in res.text or "_cf_chl_opt" in res.text:
                err_summary = "Cloudflare Managed Challenge / Rate-limit triggered (HTTP 403)"
            elif "<html" in res.text.lower():
                err_summary = f"Server returned HTML page (HTTP {res.status_code})"
            else:
                err_summary = res.text[:200]

            return {
                "success": False,
                "email": email,
                "status_code": res.status_code,
                "error": err_summary,
                "is_challenge": ("Just a moment..." in res.text or "_cf_chl_opt" in res.text),
            }

        try:
            data = res.json()
        except json.JSONDecodeError:
            return {
                "success": False,
                "email": email,
                "status_code": res.status_code,
                "error": f"Invalid JSON response: {res.text[:200]}",
            }

        action = data.get("action")
        user_id = data.get("userId")

        # Check if user was newly created or already exists
        if action == "user_created" and data.get("ok"):
            # Fetch authenticated session profile
            session_info = self.get_session_info()

            # Format cookies for easy browser injection or curl
            cookies_dict = self.session.cookies.get_dict()
            cookie_header = "; ".join(f"{k}={v}" for k, v in cookies_dict.items())

            return {
                "success": True,
                "action": "user_created",
                "email": email,
                "userId": user_id,
                "sessionToken": session_info.get("token") or cookies_dict.get("__Secure-better-auth.session_token"),
                "accessToken": session_info.get("accessToken"),
                "expiresAt": session_info.get("expiresAt"),
                "planType": session_info.get("planType", "free"),
                "cookies": cookies_dict,
                "cookieHeader": cookie_header,
                "rawSession": session_info,
            }
        elif action == "magic_link":
            return {
                "success": False,
                "action": "magic_link",
                "email": email,
                "reason": data.get("reason", "User already exists. Magic link required for existing users."),
            }
        else:
            return {
                "success": False,
                "email": email,
                "response": data,
            }

    def get_session_info(self) -> Dict[str, Any]:
        """
        Verify the session and fetch user/session details.
        """
        try:
            res = self.session.get(self.SESSION_ENDPOINT, timeout=10)
            if res.status_code == 200:
                data = res.json()
                sess = data.get("session", {})
                user = data.get("user", {})
                return {
                    "userId": user.get("id"),
                    "email": user.get("email"),
                    "name": user.get("name"),
                    "token": sess.get("token"),
                    "accessToken": sess.get("accessToken"),
                    "expiresAt": sess.get("expiresAt"),
                    "planType": sess.get("planType"),
                }
        except Exception:
            pass
        return {}


def main():
    parser = argparse.ArgumentParser(
        description="Use.ai Account Creation & Email Automation Script"
    )
    parser.add_argument(
        "--email",
        type=str,
        default=None,
        help="Specific email address to create (default: randomly generated)",
    )
    parser.add_argument(
        "--count",
        type=int,
        default=1,
        help="Number of accounts to create (default: 1)",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=2.5,
        help="Delay in seconds between requests when creating multiple accounts (default: 2.5)",
    )
    parser.add_argument(
        "--output",
        type=str,
        default="accounts.json",
        help="File path to save the created account details (JSON format)",
    )
    parser.add_argument(
        "--proxy",
        type=str,
        default=None,
        help="Optional HTTP/HTTPS proxy URL",
    )

    args = parser.parse_args()

    # Load existing accounts if output file exists
    accounts = []
    if os.path.exists(args.output):
        try:
            with open(args.output, "r", encoding="utf-8") as f:
                accounts = json.load(f)
                if not isinstance(accounts, list):
                    accounts = []
        except Exception:
            accounts = []

    print(f"=== Use.ai Account Creation Automation ===")
    print(f"Target count: {args.count}")
    print(f"Base delay  : {args.delay}s (with randomized jitter)")
    print(f"Output file : {args.output}\n")

    # Maintain single warmed session across batch to retain Cloudflare clearance (__cf_bm)
    client = UseAIAuthClient(proxy=args.proxy, auto_warmup=True)
    if client.is_warmed:
        print("[*] Session warmed up successfully (established visitor context & cookies).")
    else:
        print("[!] Warning: Initial session warmup did not return HTTP 200.")

    created_count = 0
    for i in range(args.count):
        target_email = args.email if (args.count == 1 and args.email) else None

        print(f"[{i+1}/{args.count}] Requesting account creation...", end=" ", flush=True)
        result = client.create_account(email=target_email)

        if result.get("success"):
            created_count += 1
            print("SUCCESS")
            print(f"  |-- Email       : {result['email']}")
            print(f"  |-- User ID     : {result['userId']}")
            print(f"  |-- Plan        : {result['planType']}")
            print(f"  |-- Expires At  : {result['expiresAt']}")
            if result.get("accessToken"):
                print(f"  \\-- Access Token: {result['accessToken'][:30]}...")

            # Append account to list
            accounts.append({
                "email": result["email"],
                "userId": result["userId"],
                "sessionToken": result["sessionToken"],
                "accessToken": result["accessToken"],
                "expiresAt": result["expiresAt"],
                "planType": result["planType"],
                "cookies": result["cookies"],
                "cookieHeader": result["cookieHeader"],
                "createdAt": time.strftime("%Y-%m-%d %H:%M:%S"),
            })

            # Save atomically after each successful creation
            temp_output = f"{args.output}.tmp"
            with open(temp_output, "w", encoding="utf-8") as f:
                json.dump(accounts, f, indent=2)
            os.replace(temp_output, args.output)

        else:
            print("FAILED")
            if result.get("action") == "magic_link":
                print(f"  \\-- Reason: {result.get('reason')}")
            else:
                print(f"  \\-- Error : {result.get('error') or result.get('response')}")

            # If Cloudflare challenge triggered, re-warm session and back off
            if result.get("is_challenge"):
                backoff_time = max(args.delay * 2, 5.0) + random.uniform(1.0, 3.0)
                print(f"  [*] Backing off for {backoff_time:.1f}s to clear WAF challenge window...")
                time.sleep(backoff_time)
                client.warmup()
                continue

        # Inter-request delay with randomized jitter (e.g. 2.5s + 0.5s~1.5s)
        if i < args.count - 1 and args.delay > 0:
            jittered_delay = args.delay + random.uniform(0.5, 1.5)
            time.sleep(jittered_delay)

    print(f"\nCompleted! Successfully created {created_count}/{args.count} account(s).")
    print(f"Results saved to: {os.path.abspath(args.output)} (Total accounts in file: {len(accounts)})")


if __name__ == "__main__":
    main()
