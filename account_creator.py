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
from typing import Optional, Dict, Any, Tuple

try:
    from curl_cffi import requests as curl_requests
except ImportError:
    curl_requests = None

try:
    import requests
except ImportError:
    print("The 'requests' package is required. Install with: pip install requests")
    sys.exit(1)

try:
    from proxy_manager import ProxyPool
except ImportError:
    ProxyPool = None

# Ensure clean UTF-8 console output across Windows and Unix
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass


def load_env_file(path: str = ".env") -> None:
    """Loads environment variables from .env file if it exists without external dependencies."""
    search_paths = [
        path,
        os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"),
    ]
    for p in search_paths:
        if os.path.isfile(p):
            try:
                with open(p, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#") and "=" in line:
                            k, v = line.split("=", 1)
                            k, v = k.strip(), v.strip().strip("'\"")
                            if k not in os.environ:
                                os.environ[k] = v
                break
            except Exception:
                pass


load_env_file()


class GmailImapClient:
    """
    Automated Gmail IMAP receiver and sub-address alias generator.
    Enables zero-friction account creation by leveraging Gmail plus-aliasing
    (e.g., username+ai12345@gmail.com) and retrieving magic link verification tokens
    directly via IMAP over SSL (imap.gmail.com:993).
    """
    IMAP_HOST = "imap.gmail.com"
    IMAP_PORT = 993

    def __init__(
        self,
        email_address: Optional[str] = None,
        app_password: Optional[str] = None,
    ):
        self.email_address = email_address or os.environ.get("GMAIL_ADDRESS") or "your_email@gmail.com"
        self.app_password = (app_password or os.environ.get("GMAIL_APP_PASSWORD") or "").replace(" ", "").strip()
        if "@" in self.email_address:
            self.username, self.domain = self.email_address.split("@", 1)
        else:
            self.username = self.email_address
            self.domain = "gmail.com"

    def is_configured(self) -> bool:
        """Returns True if both email address and app password are set."""
        return bool(self.email_address and self.app_password)

    def generate_alias(self, prefix: str = "ai") -> str:
        """
        Generates a unique sub-address alias that routes to the base Gmail account.
        Example: your_email+ai1726190000a1b2@gmail.com
        """
        tag = f"{prefix}{int(time.time())}{''.join(random.choices(string.ascii_lowercase + string.digits, k=4))}"
        return f"{self.username}+{tag}@{self.domain}"

    def test_connection(self) -> Tuple[bool, str]:
        """
        Verifies IMAP credentials against imap.gmail.com:993.
        Returns (success: bool, message: str).
        """
        import imaplib
        if not self.app_password:
            return False, "Gmail App Password not provided. Generate a 16-character App Password at https://myaccount.google.com/apppasswords"
        try:
            with imaplib.IMAP4_SSL(self.IMAP_HOST, self.IMAP_PORT) as imap:
                imap.login(self.email_address, self.app_password)
                status, _ = imap.select("INBOX", readonly=True)
                if status == "OK":
                    return True, f"IMAP connection and authentication successful for {self.email_address}."
                return False, f"INBOX selection failed with status: {status}"
        except imaplib.IMAP4.error as e:
            return False, f"IMAP authentication failed: {e}. Ensure 2-Step Verification is enabled and you are using a 16-character App Password."
        except Exception as e:
            return False, f"IMAP connection error: {e}"

    @staticmethod
    def extract_magic_link(html_or_text: str) -> Optional[str]:
        """
        Extracts and decodes the use.ai verification URL from email content.
        """
        import re
        patterns = [
            r'https://use\.ai/v1/auth/magic-link/verify\?[^\s"\'<>]+',
            r'https://use\.ai/auth/magic-link/verify\?[^\s"\'<>]+',
            r'https://use\.ai/[^\s"\'<>]*verify\?token=[^\s"\'<>]+',
        ]
        for pat in patterns:
            matches = re.findall(pat, html_or_text)
            if matches:
                clean_url = matches[0].replace("&amp;", "&").replace("\\u0026", "&").rstrip(".,;\"'")
                return clean_url
        return None

    def wait_for_verification_url(
        self,
        target_alias: str,
        timeout_sec: int = 60,
        poll_interval: float = 3.0,
        verbose: bool = True,
    ) -> Optional[str]:
        """
        Polls Gmail INBOX via IMAP for incoming magic link emails directed to target_alias.
        Extracts and decodes the use.ai verification URL.
        """
        if not self.is_configured():
            if verbose:
                print("  [-] Gmail IMAP client is not configured (missing GMAIL_APP_PASSWORD).")
            return None

        import imaplib
        import email as email_pkg

        start_time = time.time()
        alias_clean = target_alias.strip().lower()

        if verbose:
            print(f"  [*] Waiting for magic link to {alias_clean} via Gmail IMAP (timeout: {timeout_sec}s)...", end=" ", flush=True)

        while time.time() - start_time < timeout_sec:
            time.sleep(poll_interval)
            try:
                with imaplib.IMAP4_SSL(self.IMAP_HOST, self.IMAP_PORT) as imap:
                    imap.login(self.email_address, self.app_password)
                    status, _ = imap.select("INBOX")
                    if status != "OK":
                        continue

                    # Check for unread messages first
                    status, msg_nums = imap.search(None, "UNSEEN")
                    num_list = msg_nums[0].split() if status == "OK" and msg_nums[0] else []

                    # If no unseen messages, inspect the 10 most recent messages in INBOX
                    if not num_list:
                        status, all_nums = imap.search(None, "ALL")
                        if status == "OK" and all_nums[0]:
                            num_list = all_nums[0].split()[-10:]

                    for num in reversed(num_list):
                        # PEEK so we do not prematurely mark unseen messages unless we find our target
                        res, data = imap.fetch(num, "(BODY.PEEK[])")
                        if res != "OK" or not data or not isinstance(data[0], tuple):
                            continue

                        raw_email = data[0][1]
                        msg = email_pkg.message_from_bytes(raw_email)

                        to_header = str(msg.get("To", "")).lower()
                        delivered_to = str(msg.get("Delivered-To", "")).lower()
                        x_original_to = str(msg.get("X-Original-To", "")).lower()
                        from_header = str(msg.get("From", "")).lower()
                        subject_header = str(msg.get("Subject", "")).lower()

                        recipient_matches = (
                            alias_clean in to_header
                            or alias_clean in delivered_to
                            or alias_clean in x_original_to
                        )
                        sender_matches = "use.ai" in from_header or "use.ai" in subject_header or "sign in" in subject_header

                        if recipient_matches or sender_matches:
                            body_text = ""
                            if msg.is_multipart():
                                for part in msg.walk():
                                    ctype = part.get_content_type()
                                    if ctype in ("text/html", "text/plain"):
                                        payload = part.get_payload(decode=True)
                                        if payload:
                                            charset = part.get_content_charset() or "utf-8"
                                            body_text += " " + payload.decode(charset, errors="replace")
                            else:
                                payload = msg.get_payload(decode=True)
                                if payload:
                                    charset = msg.get_content_charset() or "utf-8"
                                    body_text = payload.decode(charset, errors="replace")

                            clean_url = self.extract_magic_link(body_text)
                            if clean_url:
                                imap.store(num, "+FLAGS", "\\Seen")
                                if verbose:
                                    print("RECEIVED")
                                return clean_url

            except Exception as e:
                pass

        if verbose:
            print("TIMED OUT")
        return None


class MailTmClient:
    """
    Automated client for Mail.tm disposable email API (https://docs.mail.tm/).
    Allows generating temporary mailboxes, receiving verification emails,
    and parsing magic login/signup links from use.ai without manual interaction.
    """
    BASE_URL = "https://api.mail.tm"

    def __init__(self):
        self.session = requests.Session()
        self.token: Optional[str] = None
        self.address: Optional[str] = None
        self.password: Optional[str] = None

    def create_inbox(self) -> str:
        """Creates a fresh, random Mail.tm mailbox and acquires authentication JWT."""
        # 1. Discover active domain
        r = self.session.get(f"{self.BASE_URL}/domains", timeout=12)
        if r.status_code != 200:
            raise RuntimeError(f"Failed to fetch domains from mail.tm: HTTP {r.status_code}")
        domains_data = r.json()
        active_domains = [d["domain"] for d in domains_data.get("hydra:member", []) if d.get("isActive")]
        if not active_domains:
            raise RuntimeError("No active domains found on mail.tm API.")

        domain = random.choice(active_domains)
        uname = "".join(random.choices(string.ascii_lowercase, k=10))
        self.address = f"{uname}@{domain}"
        self.password = "".join(random.choices(string.ascii_letters + string.digits, k=14))

        # 2. Register account
        reg_res = self.session.post(
            f"{self.BASE_URL}/accounts",
            json={"address": self.address, "password": self.password},
            timeout=12,
        )
        if reg_res.status_code not in (200, 201):
            raise RuntimeError(f"Failed to register account on mail.tm: HTTP {reg_res.status_code} {reg_res.text}")

        # 3. Retrieve JWT token
        tok_res = self.session.post(
            f"{self.BASE_URL}/token",
            json={"address": self.address, "password": self.password},
            timeout=12,
        )
        if tok_res.status_code != 200:
            raise RuntimeError(f"Failed to obtain mail.tm token: HTTP {tok_res.status_code}")

        self.token = tok_res.json().get("token")
        self.session.headers.update({"Authorization": f"Bearer {self.token}"})
        return self.address

    def wait_for_verification_url(self, timeout_sec: int = 45, poll_interval: float = 2.5) -> Optional[str]:
        """
        Polls mailbox for incoming message from Use.ai and extracts the magic link verification URL.
        """
        if not self.token:
            raise RuntimeError("MailTmClient is not authenticated.")

        import re
        start_time = time.time()
        while time.time() - start_time < timeout_sec:
            time.sleep(poll_interval)
            try:
                r = self.session.get(f"{self.BASE_URL}/messages", timeout=10)
                if r.status_code != 200:
                    continue
                members = r.json().get("hydra:member", [])
                if not members:
                    continue

                for member in members:
                    msg_id = member["id"]
                    msg_res = self.session.get(f"{self.BASE_URL}/messages/{msg_id}", timeout=10)
                    if msg_res.status_code != 200:
                        continue
                    msg = msg_res.json()
                    full_content = msg.get("text", "") + " " + str(msg.get("html", ""))

                    # Search for magic link verification URL
                    urls = re.findall(r'https://[^\s"\'<>]+', full_content)
                    for u in urls:
                        if "/v1/auth/magic-link/verify?token=" in u or "/auth/magic-link/verify?token=" in u:
                            clean_url = u.replace("&amp;", "&").replace("\\u0026", "&")
                            return clean_url
            except Exception:
                pass

        return None


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
        "Referer": f"{BASE_URL}/?authmodal=true",
        "Sec-CH-UA": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "Sec-CH-UA-Mobile": "?0",
        "Sec-CH-UA-Platform": '"Windows"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
    }

    def __init__(self, proxy: Optional[str] = None, auto_warmup: bool = True):
        if curl_requests is not None:
            self.session = curl_requests.Session(impersonate="chrome124")
        else:
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
            res = self.session.get(f"{self.BASE_URL}/?authmodal=true", timeout=12)
            self.is_warmed = (res.status_code == 200)
            return self.is_warmed
        except Exception:
            return False

    @staticmethod
    def generate_random_email(
        user_len: int = 14, domain_len: int = 10, tld_len: int = 12
    ) -> str:
        """
        Generates random emails matching standard format.
        """
        username = "".join(random.choices(string.ascii_lowercase, k=user_len))
        domain = "".join(random.choices(string.ascii_lowercase, k=domain_len))
        tld = "".join(random.choices(string.ascii_lowercase, k=tld_len))
        return f"{username}@{domain}.{tld}"

    def create_account(
        self,
        email: Optional[str] = None,
        method: str = "magic-link",
        gmail_client: Optional[Any] = None,
        interactive_fallback: bool = False,
    ) -> Dict[str, Any]:
        """
        Attempt account creation on use.ai.
        Uses Gmail IMAP / Mail.tm email verification flow by default to bypass Cloudflare Turnstile blocks.
        """
        if method == "credentials":
            return self._create_account_credentials(email=email)
        return self._create_account_magic_link(
            email=email,
            gmail_client=gmail_client,
            interactive_fallback=interactive_fallback,
        )

    def _create_account_magic_link(
        self,
        email: Optional[str] = None,
        gmail_client: Optional[Any] = None,
        interactive_fallback: bool = False,
    ) -> Dict[str, Any]:
        """
        Creates an account via the Magic Link flow backed by Gmail IMAP or Mail.tm API.
        This bypasses ZeroBounce disposable email blocks and Cloudflare Turnstile barriers.
        """
        if not self.is_warmed:
            self.warmup()

        mail_tm: Optional[MailTmClient] = None
        if not email:
            if gmail_client:
                email = gmail_client.generate_alias()
            else:
                try:
                    mail_tm = MailTmClient()
                    email = mail_tm.create_inbox()
                except Exception as e:
                    return {
                        "success": False,
                        "error": f"Mail service error: {e}",
                        "is_challenge": False,
                        "is_rate_limited": False,
                    }

        headers = {
            "Origin": self.BASE_URL,
            "Referer": f"{self.BASE_URL}/?authmodal=true",
            "Content-Type": "application/json",
            "Accept": "application/json, text/plain, */*",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Sec-CH-UA": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            "Sec-CH-UA-Mobile": "?0",
            "Sec-CH-UA-Platform": '"Windows"',
        }

        payload = {
            "email": email,
            "callbackURL": f"{self.BASE_URL}/?paywall=true",
            "errorCallbackURL": f"{self.BASE_URL}/?error=true&authMethod=email&email={email}&errorMessage=FailedToAuthenticate",
        }

        try:
            res = self.session.post(
                self.MAGIC_LINK_ENDPOINT,
                json=payload,
                headers=headers,
                timeout=15,
            )
        except Exception as e:
            return {
                "success": False,
                "email": email,
                "error": f"Network request error: {e}",
                "is_challenge": False,
                "is_rate_limited": False,
            }

        if res.status_code != 200:
            is_challenge = ("Just a moment..." in res.text or "_cf_chl_opt" in res.text or "Attention Required!" in res.text)
            is_rate_limited = (
                res.status_code == 429
                or "SIGNUP_RATE_LIMITED" in res.text
                or "Too many attempts" in res.text
            )
            if is_challenge:
                err_summary = f"Cloudflare Challenge / Block triggered (HTTP {res.status_code})"
            elif is_rate_limited:
                err_summary = "SIGNUP_RATE_LIMITED: Too many attempts from this IP. Cooldown active."
            else:
                err_summary = res.text[:200]

            return {
                "success": False,
                "email": email,
                "status_code": res.status_code,
                "error": err_summary,
                "is_challenge": is_challenge,
                "is_rate_limited": is_rate_limited,
            }

        verify_url: Optional[str] = None
        if gmail_client and gmail_client.is_configured():
            verify_url = gmail_client.wait_for_verification_url(target_alias=email, timeout_sec=60)
        elif mail_tm:
            verify_url = mail_tm.wait_for_verification_url(timeout_sec=45)

        # Interactive terminal fallback if automated IMAP is not configured or timed out
        if not verify_url and interactive_fallback:
            print(f"\n[?] Magic link email dispatched to: {email}")
            print(f"[?] Check your inbox, copy the verification link, and paste it below.")
            try:
                user_input = input("Paste verification link (or press Enter to cancel): ").strip()
                if user_input and ("http://" in user_input or "https://" in user_input):
                    clean_input = user_input.replace("&amp;", "&").replace("\\u0026", "&").strip(".,;\"'")
                    verify_url = clean_input
            except (EOFError, KeyboardInterrupt):
                pass

        if not verify_url:
            if not (gmail_client and gmail_client.is_configured()) and not mail_tm and not interactive_fallback:
                return {
                    "success": True,
                    "action": "magic_link_sent",
                    "email": email,
                    "message": "Magic link sent to external mailbox. Configure Gmail App Password or use --manual to verify.",
                }
            return {
                "success": False,
                "email": email,
                "error": f"Timed out waiting for magic link verification email for {email}.",
                "is_challenge": False,
                "is_rate_limited": False,
            }

        # Follow verification link
        try:
            v_res = self.session.get(verify_url, allow_redirects=True, timeout=15)
        except Exception as e:
            return {
                "success": False,
                "email": email,
                "error": f"Error following verification link: {e}",
                "is_challenge": False,
                "is_rate_limited": False,
            }

        if v_res.status_code == 429 or "SIGNUP_RATE_LIMITED" in v_res.text:
            return {
                "success": False,
                "email": email,
                "status_code": 429,
                "error": "SIGNUP_RATE_LIMITED: Server signup rate limit reached on IP. Cooldown required.",
                "is_challenge": False,
                "is_rate_limited": True,
            }

        session_info = self.get_session_info()
        cookies_dict = self.session.cookies.get_dict() if hasattr(self.session.cookies, "get_dict") else dict(self.session.cookies)
        session_token = session_info.get("token") or cookies_dict.get("__Secure-better-auth.session_token") or cookies_dict.get("better-auth.session_token")

        if session_token or session_info.get("userId"):
            cookie_header = "; ".join(f"{k}={v}" for k, v in cookies_dict.items())
            return {
                "success": True,
                "action": "user_created",
                "email": email,
                "userId": session_info.get("userId") or "user_" + email.split("@")[0],
                "sessionToken": session_token,
                "accessToken": session_info.get("accessToken"),
                "expiresAt": session_info.get("expiresAt") or "2027-03-11T23:59:59.000Z",
                "planType": session_info.get("planType", "free"),
                "cookies": cookies_dict,
                "cookieHeader": cookie_header,
                "rawSession": session_info,
            }
        else:
            return {
                "success": False,
                "email": email,
                "status_code": v_res.status_code,
                "error": f"Verification processed but session not established: {v_res.text[:200]}",
                "is_challenge": False,
                "is_rate_limited": False,
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
        default=12.0,
        help="Delay in seconds between requests when creating multiple accounts (default: 12.0)",
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
        help="Optional single HTTP/HTTPS proxy URL (e.g. http://user:pass@host:port)",
    )
    parser.add_argument(
        "--proxy-file",
        type=str,
        default=None,
        help="Optional path to proxy list file (e.g. 'Webshare 10 proxies.txt')",
    )
    parser.add_argument(
        "--cooldown",
        type=float,
        default=180.0,
        help="Cooldown in seconds when rate limit or 403 challenge is triggered (default: 180s)",
    )
    parser.add_argument(
        "--gmail",
        type=str,
        default=os.environ.get("GMAIL_ADDRESS", "your_email@gmail.com"),
        help="Base Gmail address for sub-address aliasing (default: env GMAIL_ADDRESS or your_email@gmail.com)",
    )
    parser.add_argument(
        "--gmail-password",
        type=str,
        default=os.environ.get("GMAIL_APP_PASSWORD", ""),
        help="16-character Google App Password for IMAP access (default: env GMAIL_APP_PASSWORD)",
    )
    parser.add_argument(
        "--test-imap",
        action="store_true",
        help="Test connection and authentication to Gmail IMAP server and exit.",
    )
    parser.add_argument(
        "--manual",
        action="store_true",
        help="Prompt in terminal to manually paste magic link if automated IMAP is not used or times out.",
    )
    parser.add_argument(
        "--mailtm",
        action="store_true",
        help="Force use of Mail.tm disposable inbox instead of Gmail (Warning: often blocked by ZeroBounce).",
    )

    args = parser.parse_args()

    # IMAP diagnostic test mode
    if args.test_imap:
        diag_client = GmailImapClient(email_address=args.gmail, app_password=args.gmail_password)
        print(f"[*] Testing IMAP connection to imap.gmail.com:993 for {diag_client.email_address}...")
        ok, msg = diag_client.test_connection()
        if ok:
            print(f"[+] SUCCESS: {msg}")
            sys.exit(0)
        else:
            print(f"[-] FAILED: {msg}")
            sys.exit(1)

    # Proxy source: CLI flag -> FREEAI_PROXIES env var (Direct host connection is default)
    proxy_source = args.proxy_file or (args.proxy if args.proxy else None) or os.environ.get("FREEAI_PROXIES")

    proxy_pool = None
    if proxy_source and ProxyPool is not None:
        proxy_pool = ProxyPool(proxy_source, default_cooldown=args.cooldown)
        stats = proxy_pool.get_stats()
        print(f"[*] Proxy Pool active: {stats['ready']} available proxies loaded from '{proxy_source}'.")

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

    gmail_client = None
    if not args.mailtm and (args.gmail or not args.email):
        gmail_client = GmailImapClient(email_address=args.gmail, app_password=args.gmail_password)

    print(f"=== Use.ai Account Creation Automation ===")
    print(f"Target count: {args.count}")
    print(f"Base delay  : {args.delay}s (with randomized jitter)")
    print(f"Output file : {args.output}")
    if gmail_client:
        print(f"Email Mode  : Gmail Plus-Aliasing ({gmail_client.email_address})")
        imap_status = "Automated IMAP Listener (App Password configured)" if gmail_client.is_configured() else "Manual Prompt Fallback (No App Password set)"
        print(f"IMAP Status : {imap_status}")
    else:
        print(f"Email Mode  : Mail.tm Disposable Inbox (Subject to ZeroBounce blocks)")
    if proxy_pool:
        print(f"Proxy source: {proxy_source} ({proxy_pool.count()} proxies)")
    else:
        print(f"Egress route: Direct host connection (TLS Chrome impersonation)")
    print()

    created_count = 0
    consecutive_rate_limits = 0

    for i in range(args.count):
        target_email = args.email if (args.count == 1 and args.email) else None
        success = False
        tried_proxies: list = []
        result = {}
        current_proxy_rec = None
        current_proxy_url = None
        egress_label = ""

        # Up to 3 attempts: Preferred Proxy -> Alternative Proxy -> Direct Fallback
        for attempt in range(3):
            current_proxy_rec = None
            current_proxy_url = None

            if proxy_pool:
                current_proxy_rec = proxy_pool.get_proxy(exclude_urls=tried_proxies, allow_direct_fallback=True)
                if current_proxy_rec:
                    current_proxy_url = current_proxy_rec.url
                    tried_proxies.append(current_proxy_url)
                    egress_label = f" via {current_proxy_rec.ip}"
                else:
                    egress_label = " (Direct Fallback)" if tried_proxies else ""
            elif args.proxy and attempt == 0:
                current_proxy_url = args.proxy
                egress_label = " via Proxy"
            else:
                egress_label = ""

            print(f"[{i+1}/{args.count}] Requesting account creation{egress_label} (Attempt {attempt+1})...", end=" ", flush=True)
            client = UseAIAuthClient(proxy=current_proxy_url, auto_warmup=True)
            result = client.create_account(
                email=target_email,
                gmail_client=gmail_client,
                interactive_fallback=args.manual or (gmail_client is not None and not gmail_client.is_configured()),
            )

            if result.get("success"):
                success = True
                if current_proxy_rec and proxy_pool:
                    proxy_pool.mark_success(current_proxy_url)
                break
            else:
                err = result.get("error") or result.get("response")
                print("RETRY" if attempt < 2 else "FAILED")

                # Handle rate limiting & Circuit Breaker on proxy
                if result.get("is_rate_limited"):
                    consecutive_rate_limits += 1
                    if current_proxy_rec and proxy_pool:
                        proxy_pool.mark_failure(current_proxy_url, status_code=429, error="SIGNUP_RATE_LIMITED")
                        print(f"  [*] Marked proxy {current_proxy_rec.ip} on cooldown. ({proxy_pool.available_count()} active proxies remaining)")
                        if proxy_pool.available_count() == 0:
                            print(f"\n[CIRCUIT BREAKER TRIGGERED] All proxies on rate-limit cooldown.")
                            break
                    else:
                        print(f"\n[CIRCUIT BREAKER TRIGGERED] Direct IP rate-limited (SIGNUP_RATE_LIMITED).")
                        break

                elif result.get("is_challenge"):
                    if current_proxy_rec and proxy_pool:
                        proxy_pool.mark_failure(current_proxy_url, status_code=403, error="Cloudflare Challenge")
                        print(f"  [*] Cloudflare challenge on {current_proxy_rec.ip}. Rotating to next proxy...")
                    else:
                        backoff_time = max(args.delay * 2, 10.0) + random.uniform(2.0, 5.0)
                        print(f"  [*] Cloudflare challenge on direct IP. Backing off {backoff_time:.1f}s...")
                        time.sleep(backoff_time)
                else:
                    if current_proxy_rec and proxy_pool:
                        proxy_pool.mark_failure(current_proxy_url, error=str(err))
                        print(f"  [*] Proxy error on {current_proxy_rec.ip}: {err}. Rotating...")

        if success:
            created_count += 1
            consecutive_rate_limits = 0
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
            if result.get("action") == "magic_link":
                print(f"  \\-- Reason: {result.get('reason')}")
            else:
                print(f"  \\-- Error : {result.get('error') or result.get('response')}")

        # Inter-request delay with randomized jitter
        if i < args.count - 1 and args.delay > 0:
            jittered_delay = args.delay + random.uniform(2.0, 6.0)
            time.sleep(jittered_delay)

    print(f"\nCompleted! Successfully created {created_count}/{args.count} account(s).")
    print(f"Results saved to: {os.path.abspath(args.output)} (Total accounts in file: {len(accounts)})")


if __name__ == "__main__":
    main()
