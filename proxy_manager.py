#!/usr/bin/env python3
"""
FreeAI Intelligent Proxy Pool & Rotation Manager (proxy_manager.py)
------------------------------------------------------------------
Manages, tests, health-checks, and rotates egress proxies for FreeAI
account creation, pool auditing, and chat streaming.

Supports formats:
  - IP:PORT:USERNAME:PASSWORD (Standard Webshare export)
  - USERNAME:PASSWORD@IP:PORT
  - http://USERNAME:PASSWORD@IP:PORT
  - socks5://USERNAME:PASSWORD@IP:PORT

Features:
  - Multi-source loading: File path, proxy list, or environment variable.
  - Health tracking: Automatically detects 403 / 429 / timeouts and puts
    failed proxies into a temporary cooldown (default: 300s).
  - Rotation strategies: 'round_robin' and 'random'.
  - Dead-proxy pruning and automatic failover to the next healthy proxy.
"""

import os
import sys
import time
import random
import threading
from typing import List, Dict, Any, Optional, Tuple

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass


class ProxyRecord:
    """Represents a single proxy endpoint with health and rate-limit metadata."""

    def __init__(self, raw: str):
        self.raw = raw.strip()
        self.url = self._parse_to_url(self.raw)
        self.ip = self._extract_ip(self.raw)
        self.success_count = 0
        self.fail_count = 0
        self.last_status: Optional[int] = None
        self.last_error: Optional[str] = None
        self.cooldown_until: float = 0.0
        self.is_dead: bool = False

    @staticmethod
    def _parse_to_url(raw: str) -> str:
        """Standardize raw proxy string into a complete URL format."""
        s = raw.strip()
        if s.startswith("http://") or s.startswith("https://") or s.startswith("socks5://"):
            return s

        # Format: IP:PORT:USER:PASS
        parts = s.split(":")
        if len(parts) == 4:
            ip, port, user, pwd = parts
            return f"http://{user}:{pwd}@{ip}:{port}"
        # Format: USER:PASS@IP:PORT
        elif "@" in s:
            return f"http://{s}"
        # Format: IP:PORT
        elif len(parts) == 2:
            return f"http://{s}"

        return f"http://{s}"

    @staticmethod
    def _extract_ip(raw: str) -> str:
        s = raw.strip()
        for prefix in ["http://", "https://", "socks5://"]:
            if s.startswith(prefix):
                s = s[len(prefix):]
        if "@" in s:
            s = s.split("@")[-1]
        if ":" in s:
            return s.split(":")[0]
        return s

    def is_available(self) -> bool:
        """Returns True if the proxy is active and not cooling down."""
        if self.is_dead:
            return False
        return time.time() >= self.cooldown_until

    def mark_success(self) -> None:
        self.success_count += 1
        self.cooldown_until = 0.0
        self.last_error = None

    def mark_failure(self, status_code: Optional[int] = None, error: Optional[str] = None, cooldown_seconds: float = 180.0) -> None:
        self.fail_count += 1
        self.last_status = status_code
        self.last_error = error or f"HTTP {status_code}"

        # If network timeout or connection refused, penalize with longer cooldown (300s)
        is_timeout = error and any(w in error.lower() for w in ("timeout", "timed out", "connect", "connection", "reset"))
        if is_timeout:
            self.cooldown_until = time.time() + max(cooldown_seconds, 300.0)
            if self.fail_count >= 3:
                self.is_dead = True
        elif status_code in (403, 429) or (error and "rate" in error.lower()):
            self.cooldown_until = time.time() + cooldown_seconds
        elif self.fail_count >= 5:
            # 5 consecutive hard failures (connection refused / dead host)
            self.is_dead = True
        else:
            self.cooldown_until = time.time() + min(30.0 * self.fail_count, 120.0)

    def to_dict(self) -> Dict[str, str]:
        """Returns standard requests / httpx proxies dictionary."""
        return {
            "http": self.url,
            "https": self.url,
        }

    def __repr__(self) -> str:
        status = "DEAD" if self.is_dead else ("COOLING" if not self.is_available() else "READY")
        return f"<Proxy {self.ip} [{status}] ok={self.success_count} fail={self.fail_count}>"


class ProxyPool:
    """Thread-safe pool of egress proxies with automatic rotation and health filtering."""

    def __init__(self, proxy_source: Optional[str] = None, default_cooldown: float = 180.0):
        self.proxies: List[ProxyRecord] = []
        self.default_cooldown = default_cooldown
        self._index = 0
        self._lock = threading.Lock()

        if proxy_source:
            self.load(proxy_source)

    def load(self, source: str) -> int:
        """Load proxies from a file path, newline/comma-separated text, or directory."""
        with self._lock:
            loaded_records = []
            if os.path.isfile(source):
                try:
                    with open(source, "r", encoding="utf-8", errors="replace") as f:
                        for line in f:
                            clean = line.strip()
                            if clean and not clean.startswith("#"):
                                loaded_records.append(ProxyRecord(clean))
                except Exception as e:
                    print(f"[ProxyPool] Error reading {source}: {e}")
            else:
                # Treat as comma/whitespace-separated string
                for item in source.replace(",", " ").split():
                    clean = item.strip()
                    if clean:
                        loaded_records.append(ProxyRecord(clean))

            self.proxies = loaded_records
            return len(self.proxies)

    def get_proxy(
        self,
        strategy: str = "round_robin",
        allow_direct_fallback: bool = True,
        exclude_urls: Optional[List[str]] = None,
    ) -> Optional[ProxyRecord]:
        """
        Returns the next available healthy proxy.
        Prioritizes healthy proxies with lowest failure counts and higher success records.
        If exclude_urls is provided, skips any proxies in that list.
        If all eligible proxies are cooling down or dead, returns None when allow_direct_fallback=True,
        signaling the caller to fall back to direct host connection.
        """
        excluded = set(exclude_urls or [])
        with self._lock:
            if not self.proxies:
                return None

            available = [p for p in self.proxies if p.is_available() and p.url not in excluded]
            if available:
                # Prioritize healthy, responsive proxies (fewer failures, higher successes)
                available.sort(key=lambda p: (p.fail_count, -p.success_count))
                if strategy == "random":
                    top_pool = available[:max(1, len(available) // 2)]
                    return random.choice(top_pool)
                else:
                    self._index = (self._index + 1) % len(available)
                    return available[self._index]

            if allow_direct_fallback:
                return None

            # Fallback: All are cooling down or dead, find the one with lowest cooldown_until
            living = [p for p in self.proxies if not p.is_dead and p.url not in excluded]
            if living:
                living.sort(key=lambda p: p.cooldown_until)
                return living[0]

            return None

    def get_fallback_proxy(
        self,
        failed_url: str,
        status_code: Optional[int] = None,
        error: Optional[str] = None,
        strategy: str = "round_robin",
    ) -> Optional[ProxyRecord]:
        """
        Convenience method: marks the failed proxy and returns the next best healthy alternative,
        or None if no alternative proxies remain (triggering direct connection fallback).
        """
        self.mark_failure(failed_url, status_code=status_code, error=error)
        return self.get_proxy(strategy=strategy, allow_direct_fallback=True, exclude_urls=[failed_url])

    def mark_success(self, proxy_url: str) -> None:
        with self._lock:
            for p in self.proxies:
                if p.url == proxy_url:
                    p.mark_success()
                    break

    def mark_failure(self, proxy_url: str, status_code: Optional[int] = None, error: Optional[str] = None) -> None:
        with self._lock:
            for p in self.proxies:
                if p.url == proxy_url:
                    p.mark_failure(status_code=status_code, error=error, cooldown_seconds=self.default_cooldown)
                    break

    def count(self) -> int:
        return len(self.proxies)

    def available_count(self) -> int:
        return sum(1 for p in self.proxies if p.is_available())

    def get_stats(self) -> Dict[str, Any]:
        with self._lock:
            total = len(self.proxies)
            ready = sum(1 for p in self.proxies if p.is_available())
            cooling = sum(1 for p in self.proxies if not p.is_dead and not p.is_available())
            dead = sum(1 for p in self.proxies if p.is_dead)
            return {
                "total": total,
                "ready": ready,
                "cooling": cooling,
                "dead": dead,
            }


if __name__ == "__main__":
    print("=== Testing ProxyPool ===")
    sample_file = "Webshare 10 proxies.txt"
    if os.path.exists(sample_file):
        pool = ProxyPool(sample_file)
        print(f"Loaded {pool.count()} proxies from {sample_file}")
        stats = pool.get_stats()
        print(f"Stats: {stats}")
        p = pool.get_proxy()
        print(f"Selected proxy: {p}")
        if p:
            print(f"URL: {p.url}")
            print(f"Dict: {p.to_dict()}")
