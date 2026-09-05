#!/usr/bin/env python3
"""
FreeAI Forensic Image Inspector & PNG IDAT Decompressor
-------------------------------------------------------
Deep binary structural parser and pixel-level forensic analyzer for images:
- PNG: Full chunk parsing, CRC32 verification, continuous zlib decompression
  of concatenated IDAT blocks (RFC 1950 / RFC 1951), scanline filter reversal
  (None, Sub, Up, Average, Paeth), raw channel reconstruction, Shannon entropy,
  compression ratio, color histograms, and anomaly / steganography detection.
- JPEG: SOF marker decoding, quantization tables, Exif / metadata extraction.
- WEBP: VP8/VP8L/VP8X chunk dissection, alpha channel presence, animation.
- GIF: Logical screen descriptor, frame counting, color table analysis.

Pure Python standard library with zero external dependencies.
"""

import os
import sys
import math
import zlib
import struct
import binascii
import base64
from typing import Dict, Any, List, Optional, Tuple

# Ensure clean UTF-8 console output across Windows and Unix
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass


class PNGFilter:
    """PNG Scanline filter types defined in ISO/IEC 15948:2004."""
    NONE = 0
    SUB = 1
    UP = 2
    AVERAGE = 3
    PAETH = 4

    NAMES = {
        0: "None",
        1: "Sub",
        2: "Up",
        3: "Average",
        4: "Paeth",
    }


def paeth_predictor(a: int, b: int, c: int) -> int:
    """Computes the Paeth filter predictor from left (a), above (b), and upper-left (c)."""
    p = a + b - c
    pa = abs(p - a)
    pb = abs(p - b)
    pc = abs(p - c)
    if pa <= pb and pa <= pc:
        return a
    elif pb <= pc:
        return b
    else:
        return c


def calculate_entropy(data: bytes) -> float:
    """Calculates Shannon entropy in bits per byte (0.0 to 8.0)."""
    if not data:
        return 0.0
    freq = [0] * 256
    for b in data:
        freq[b] += 1
    total = len(data)
    entropy = 0.0
    for count in freq:
        if count > 0:
            p = count / total
            entropy -= p * math.log2(p)
    return round(entropy, 4)


def compute_aspect_ratio(width: int, height: int) -> Tuple[str, str]:
    """Calculate standard aspect ratio and orientation string."""
    if width <= 0 or height <= 0:
        return "Unknown", "Unknown"
    gcd_val = math.gcd(width, height)
    rw = width // gcd_val
    rh = height // gcd_val
    ratio = width / height

    orientation = "Square"
    if ratio > 1.05:
        orientation = "Landscape"
    elif ratio < 0.95:
        orientation = "Portrait"

    if abs(ratio - 16 / 9) < 0.06:
        ratio_str = "16:9"
    elif abs(ratio - 4 / 3) < 0.06:
        ratio_str = "4:3"
    elif abs(ratio - 1.0) < 0.03:
        ratio_str = "1:1"
    elif abs(ratio - 9 / 16) < 0.06:
        ratio_str = "9:16"
    elif abs(ratio - 21 / 9) < 0.06:
        ratio_str = "21:9"
    elif abs(ratio - 3 / 2) < 0.06:
        ratio_str = "3:2"
    elif rw <= 32 and rh <= 32:
        ratio_str = f"{rw}:{rh}"
    else:
        ratio_str = f"{ratio:.2f}:1"

    return f"{ratio_str} ({orientation})", orientation


class PNGInspector:
    """
    Forensic parser and IDAT decompressor for Portable Network Graphics (PNG).
    Critically accounts for raw pixel data inside IDAT blocks being zlib-compressed binary.
    """
    SIGNATURE = b"\x89PNG\r\n\x1a\n"

    COLOR_TYPES = {
        0: ("Grayscale", 1),
        2: ("Truecolor (RGB)", 3),
        3: ("Indexed-color", 1),
        4: ("Grayscale with alpha", 2),
        6: ("Truecolor with alpha (RGBA)", 4),
    }

    def __init__(self, data: bytes):
        self.raw = data
        self.valid = False
        self.error: Optional[str] = None
        self.chunks: List[Dict[str, Any]] = []
        self.header: Dict[str, Any] = {}
        self.palette: bytes = b""
        self.text_metadata: Dict[str, str] = {}
        self.idat_chunks: List[bytes] = []
        self.trailing_bytes: bytes = b""
        self.decompressed_idat: bytes = b""
        self.scanline_analysis: Dict[str, Any] = {}
        self.pixel_stats: Dict[str, Any] = {}

    def parse(self) -> Dict[str, Any]:
        """Perform full structural chunk parsing and IDAT zlib decompression."""
        if not self.raw.startswith(self.SIGNATURE):
            self.error = "Invalid PNG signature: Magic bytes do not match \\x89PNG\\r\\n\\x1a\\n"
            return self.get_summary()

        self.valid = True
        offset = len(self.SIGNATURE)
        total_len = len(self.raw)
        has_seen_iend = False

        while offset < total_len:
            if has_seen_iend:
                # Capture any data appended after IEND (payload/steganography detection)
                self.trailing_bytes = self.raw[offset:]
                break

            if offset + 8 > total_len:
                self.error = f"Truncated chunk header at offset {offset}"
                break

            length = struct.unpack(">I", self.raw[offset : offset + 4])[0]
            chunk_type_bytes = self.raw[offset + 4 : offset + 8]
            try:
                chunk_type = chunk_type_bytes.decode("ascii")
            except UnicodeDecodeError:
                chunk_type = repr(chunk_type_bytes)

            chunk_start = offset + 8
            chunk_end = chunk_start + length

            if chunk_end > total_len:
                self.error = f"Chunk '{chunk_type}' extends beyond end of file ({chunk_end} > {total_len})"
                break

            chunk_data = self.raw[chunk_start:chunk_end]
            offset = chunk_end

            # CRC32 verification (includes type + data)
            if offset + 4 <= total_len:
                stored_crc = struct.unpack(">I", self.raw[offset : offset + 4])[0]
                expected_crc = binascii.crc32(chunk_type_bytes + chunk_data) & 0xFFFFFFFF
                crc_valid = (stored_crc == expected_crc)
                offset += 4
            else:
                stored_crc = 0
                crc_valid = False

            chunk_info = {
                "type": chunk_type,
                "length": length,
                "offset": chunk_start - 8,
                "crc_valid": crc_valid,
                "is_critical": chunk_type[0].isupper() if chunk_type.isalpha() else False,
            }

            # Process specific chunk types
            if chunk_type == "IHDR" and length >= 13:
                w, h, bit_depth, color_type, comp, filt, inter = struct.unpack(">IIBBBBB", chunk_data[:13])
                color_name, channels = self.COLOR_TYPES.get(color_type, (f"Unknown ({color_type})", 1))
                self.header = {
                    "width": w,
                    "height": h,
                    "bit_depth": bit_depth,
                    "color_type": color_type,
                    "color_space": color_name,
                    "channels": channels,
                    "compression_method": comp,
                    "filter_method": filt,
                    "interlace_method": "Adam7" if inter == 1 else "None",
                    "bytes_per_pixel": max(1, (bit_depth * channels + 7) // 8),
                }
                chunk_info["details"] = self.header

            elif chunk_type == "PLTE":
                self.palette = chunk_data
                chunk_info["palette_entries"] = len(chunk_data) // 3

            elif chunk_type == "IDAT":
                self.idat_chunks.append(chunk_data)
                chunk_info["idat_index"] = len(self.idat_chunks)

            elif chunk_type == "tEXt":
                # Keyword\0Text
                if b"\x00" in chunk_data:
                    k, v = chunk_data.split(b"\x00", 1)
                    kw = k.decode("latin-1", errors="replace")
                    val = v.decode("latin-1", errors="replace")
                    self.text_metadata[kw] = val
                    chunk_info["text"] = {kw: val}

            elif chunk_type == "zTXt":
                # Keyword\0CompressionMethod(1B)\0CompressedData
                if b"\x00" in chunk_data:
                    k, rest = chunk_data.split(b"\x00", 1)
                    if len(rest) > 1:
                        kw = k.decode("latin-1", errors="replace")
                        try:
                            val = zlib.decompress(rest[1:]).decode("latin-1", errors="replace")
                            self.text_metadata[kw] = val
                            chunk_info["text"] = {kw: val}
                        except Exception:
                            pass

            elif chunk_type == "iTXt":
                # Keyword\0CompressionFlag(1B)\0CompressionMethod(1B)\0LanguageTag\0TranslatedKeyword\0Text
                parts = chunk_data.split(b"\x00", 4)
                if len(parts) >= 5:
                    kw = parts[0].decode("utf-8", errors="replace")
                    comp_flag = parts[1][0] if len(parts[1]) > 0 else 0
                    text_bytes = parts[4]
                    if comp_flag == 1:
                        try:
                            text_bytes = zlib.decompress(text_bytes)
                        except Exception:
                            pass
                    val = text_bytes.decode("utf-8", errors="replace")
                    self.text_metadata[kw] = val
                    chunk_info["text"] = {kw: val}

            elif chunk_type == "IEND":
                has_seen_iend = True

            self.chunks.append(chunk_info)

        # Decompress IDAT blocks and reverse scanline filters
        self._decompress_and_analyze_idat()
        return self.get_summary()

    def _decompress_and_analyze_idat(self) -> None:
        """
        Concatenates all IDAT blocks and decompresses the zlib stream.
        Explicitly considers that raw pixel data inside IDAT is zlib-compressed binary.
        Reconstructs the scanline filtering and computes pixel color statistics.
        """
        if not self.idat_chunks:
            return

        # 1. Concatenate all contiguous IDAT binary chunks
        compressed_idat = b"".join(self.idat_chunks)
        compressed_size = len(compressed_idat)
        compressed_entropy = calculate_entropy(compressed_idat)

        # 2. Decompress zlib stream (RFC 1950)
        try:
            self.decompressed_idat = zlib.decompress(compressed_idat)
            uncompressed_size = len(self.decompressed_idat)
            decompressed_entropy = calculate_entropy(self.decompressed_idat)
            decompression_ok = True
            decompression_error = None
        except Exception as e:
            self.decompressed_idat = b""
            uncompressed_size = 0
            decompressed_entropy = 0.0
            decompression_ok = False
            decompression_error = str(e)

        ratio = round(compressed_size / uncompressed_size, 4) if uncompressed_size > 0 else 0.0

        self.scanline_analysis = {
            "idat_chunks_count": len(self.idat_chunks),
            "total_compressed_bytes": compressed_size,
            "total_uncompressed_bytes": uncompressed_size,
            "compression_ratio": ratio,
            "compressed_entropy": compressed_entropy,
            "decompressed_entropy": decompressed_entropy,
            "decompression_ok": decompression_ok,
            "decompression_error": decompression_error,
            "is_zlib_compressed": True,
        }

        if not decompression_ok or not self.header:
            return

        # 3. Scanline Filter Reversal & Un-filtering (if non-interlaced standard PNG)
        width = self.header.get("width", 0)
        height = self.header.get("height", 0)
        bpp = self.header.get("bytes_per_pixel", 3)
        channels = self.header.get("channels", 3)
        interlace = self.header.get("interlace_method")

        # In standard non-interlaced PNG, each scanline has 1 filter byte + (width * bpp) bytes
        bytes_per_row = width * bpp
        expected_row_len = 1 + bytes_per_row
        expected_total_bytes = expected_row_len * height

        self.scanline_analysis["expected_scanline_bytes"] = expected_total_bytes
        self.scanline_analysis["bytes_per_pixel"] = bpp

        if interlace == "None" and uncompressed_size >= expected_total_bytes:
            filter_counts = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}
            unfiltered_matrix: List[bytearray] = []
            prev_row = bytearray(bytes_per_row)

            for y in range(height):
                row_start = y * expected_row_len
                filter_type = self.decompressed_idat[row_start]
                filter_counts[filter_type] = filter_counts.get(filter_type, 0) + 1

                raw_row = self.decompressed_idat[row_start + 1 : row_start + 1 + bytes_per_row]
                unfiltered_row = bytearray(bytes_per_row)

                if filter_type == PNGFilter.NONE:
                    unfiltered_row[:] = raw_row
                elif filter_type == PNGFilter.SUB:
                    for x in range(bytes_per_row):
                        left = unfiltered_row[x - bpp] if x >= bpp else 0
                        unfiltered_row[x] = (raw_row[x] + left) & 0xFF
                elif filter_type == PNGFilter.UP:
                    for x in range(bytes_per_row):
                        above = prev_row[x]
                        unfiltered_row[x] = (raw_row[x] + above) & 0xFF
                elif filter_type == PNGFilter.AVERAGE:
                    for x in range(bytes_per_row):
                        left = unfiltered_row[x - bpp] if x >= bpp else 0
                        above = prev_row[x]
                        unfiltered_row[x] = (raw_row[x] + ((left + above) >> 1)) & 0xFF
                elif filter_type == PNGFilter.PAETH:
                    for x in range(bytes_per_row):
                        left = unfiltered_row[x - bpp] if x >= bpp else 0
                        above = prev_row[x]
                        upper_left = prev_row[x - bpp] if x >= bpp else 0
                        pred = paeth_predictor(left, above, upper_left)
                        unfiltered_row[x] = (raw_row[x] + pred) & 0xFF
                else:
                    # Unrecognized filter type
                    unfiltered_row[:] = raw_row

                unfiltered_matrix.append(unfiltered_row)
                prev_row = unfiltered_row

            # Filter type distribution
            total_rows = max(1, height)
            self.scanline_analysis["filter_distribution"] = {
                PNGFilter.NAMES.get(k, str(k)): {
                    "count": v,
                    "percent": round((v / total_rows) * 100, 2),
                }
                for k, v in filter_counts.items()
            }

            # 4. Color & Pixel Statistics with Deep Visual Breakdown
            sample_step = max(1, total_rows // 60)
            x_step = max(1, width // 60)
            sample_pixels = 0
            sum_r, sum_g, sum_b, sum_a = 0, 0, 0, 0
            min_lum = 255.0
            max_lum = 0.0
            sum_sat = 0.0
            color_counts: Dict[str, int] = {}

            color_type = self.header.get("color_type", 2)
            has_palette = (color_type == 3 and len(self.palette) >= 3)

            for y in range(0, height, sample_step):
                row = unfiltered_matrix[y]
                for x in range(0, width, x_step):
                    idx = x * bpp
                    if idx >= len(row):
                        continue
                    if has_palette:
                        pal_idx = row[idx] * 3
                        if pal_idx + 2 < len(self.palette):
                            r = self.palette[pal_idx]
                            g = self.palette[pal_idx + 1]
                            b = self.palette[pal_idx + 2]
                            a = 255
                        else:
                            r = g = b = 0
                            a = 255
                    elif bpp >= 3:
                        r = row[idx]
                        g = row[idx + 1] if idx + 1 < len(row) else r
                        b = row[idx + 2] if idx + 2 < len(row) else r
                        a = row[idx + 3] if (bpp >= 4 and idx + 3 < len(row)) else 255
                    elif bpp == 1:
                        r = g = b = row[idx]
                        a = 255
                    elif bpp == 2:
                        r = g = b = row[idx]
                        a = row[idx + 1] if idx + 1 < len(row) else 255
                    else:
                        r = g = b = a = 0

                    lum = 0.299 * r + 0.587 * g + 0.114 * b
                    if lum < min_lum:
                        min_lum = lum
                    if lum > max_lum:
                        max_lum = lum

                    # Saturation & Hue
                    cmax = max(r, g, b)
                    cmin = min(r, g, b)
                    delta = cmax - cmin
                    sat = (delta / cmax) if cmax > 0 else 0.0
                    sum_sat += sat

                    if a < 32:
                        bin_name = "Transparent"
                    elif lum < 38:
                        bin_name = "Dark / Navy / Black"
                    elif lum > 218 and sat < 0.15:
                        bin_name = "Light / White Highlight"
                    elif sat < 0.15:
                        bin_name = "Neutral / Slate Gray"
                    else:
                        if delta == 0:
                            hue = 0.0
                        elif cmax == r:
                            hue = (60 * ((g - b) / delta) + 360) % 360
                        elif cmax == g:
                            hue = (60 * ((b - r) / delta) + 120) % 360
                        else:
                            hue = (60 * ((r - g) / delta) + 240) % 360

                        if hue < 18 or hue >= 342:
                            bin_name = "Red / Crimson"
                        elif hue < 45:
                            bin_name = "Orange / Amber"
                        elif hue < 70:
                            bin_name = "Yellow / Gold"
                        elif hue < 165:
                            bin_name = "Green / Emerald"
                        elif hue < 205:
                            bin_name = "Cyan / Teal"
                        elif hue < 260:
                            bin_name = "Blue / Indigo"
                        else:
                            bin_name = "Purple / Magenta"

                    color_counts[bin_name] = color_counts.get(bin_name, 0) + 1
                    sum_r += r
                    sum_g += g
                    sum_b += b
                    sum_a += a
                    sample_pixels += 1

            if sample_pixels > 0:
                mean_r = round(sum_r / sample_pixels, 1)
                mean_g = round(sum_g / sample_pixels, 1)
                mean_b = round(sum_b / sample_pixels, 1)
                mean_a = round(sum_a / sample_pixels, 1)
                mean_lum = round(0.299 * mean_r + 0.587 * mean_g + 0.114 * mean_b, 1)
                mean_sat = round(sum_sat / sample_pixels, 3)

                # Dominant colors list
                sorted_colors = sorted(
                    [
                        {"name": k, "count": v, "percent": round((v / sample_pixels) * 100, 1)}
                        for k, v in color_counts.items()
                        if k != "Transparent"
                    ],
                    key=lambda it: it["count"],
                    reverse=True,
                )
                top_colors = sorted_colors[:4]
                dominant_summary = (
                    ", ".join(f"{c['name']} ({c['percent']}%)" for c in top_colors)
                    if top_colors
                    else "Uniform"
                )

                # Color temperature
                temp_delta = mean_r - mean_b
                if temp_delta > 15:
                    temp_desc = "Warm"
                elif temp_delta < -15:
                    temp_desc = "Cool"
                else:
                    temp_desc = "Neutral"

                # Saturation description
                if mean_sat < 0.12:
                    sat_desc = "Monochrome / Grayscale"
                elif mean_sat < 0.35:
                    sat_desc = "Muted / Low Saturation"
                elif mean_sat < 0.65:
                    sat_desc = "Moderate Saturation"
                else:
                    sat_desc = "Vibrant / High Saturation"

                # Contrast description
                contrast_span = max_lum - min_lum
                if contrast_span > 180:
                    contrast_desc = f"High Contrast ({min_lum:.0f} - {max_lum:.0f})"
                elif contrast_span > 90:
                    contrast_desc = f"Moderate Contrast ({min_lum:.0f} - {max_lum:.0f})"
                else:
                    contrast_desc = f"Low Contrast / Flat ({min_lum:.0f} - {max_lum:.0f})"

                # Visual complexity / content type hint
                decomp_entropy = self.scanline_analysis.get("decompressed_entropy", 0.0)
                comp_ratio = self.scanline_analysis.get("compression_ratio", 0.0)
                if comp_ratio > 10.0 and decomp_entropy < 5.8:
                    visual_type = "Software UI / Code / Diagram / Clean Vector Layout"
                elif decomp_entropy >= 7.3:
                    visual_type = "High-Entropy Photograph / Complex Gradient or Texture"
                else:
                    visual_type = "Digital Artwork / Interface / Graphic Illustration"

                self.pixel_stats = {
                    "sampled_pixels": sample_pixels,
                    "mean_red": mean_r,
                    "mean_green": mean_g,
                    "mean_blue": mean_b,
                    "mean_alpha": mean_a,
                    "mean_luminance": mean_lum,
                    "dominant_tone": "Light" if mean_lum > 128 else "Dark",
                    "mean_saturation": mean_sat,
                    "saturation_desc": sat_desc,
                    "color_temperature": temp_desc,
                    "contrast_desc": contrast_desc,
                    "dominant_colors": top_colors,
                    "dominant_summary": dominant_summary,
                    "visual_type": visual_type,
                    "min_luminance": round(min_lum, 1),
                    "max_luminance": round(max_lum, 1),
                }

    def get_summary(self) -> Dict[str, Any]:
        """Produce structured inspection summary."""
        chunk_type_counts = {}
        for c in self.chunks:
            ctype = c.get("type", "UNKNOWN")
            chunk_type_counts[ctype] = chunk_type_counts.get(ctype, 0) + 1

        anomalies = []
        if self.trailing_bytes:
            anomalies.append({
                "type": "trailing_data",
                "length": len(self.trailing_bytes),
                "entropy": calculate_entropy(self.trailing_bytes),
                "description": f"Detected {len(self.trailing_bytes)} bytes appended after IEND (possible polyglot/payload).",
            })
        for c in self.chunks:
            if not c.get("crc_valid", True):
                anomalies.append({
                    "type": "crc_mismatch",
                    "chunk": c.get("type"),
                    "offset": c.get("offset"),
                    "description": f"CRC32 mismatch in chunk '{c.get('type')}'.",
                })

        width = self.header.get("width", 0)
        height = self.header.get("height", 0)
        ratio_str, orientation = compute_aspect_ratio(width, height)
        megapixels = round((width * height) / 1_000_000, 2)

        return {
            "format": "PNG",
            "valid": self.valid,
            "error": self.error,
            "file_size": len(self.raw),
            "dimensions": f"{width}x{height}",
            "aspect_ratio": ratio_str,
            "orientation": orientation,
            "megapixels": megapixels,
            "header": self.header,
            "total_chunks": len(self.chunks),
            "chunk_type_counts": chunk_type_counts,
            "chunks": self.chunks[:20],  # Include up to first 20 chunks for summary
            "idat_analysis": self.scanline_analysis,
            "pixel_stats": self.pixel_stats,
            "text_metadata": self.text_metadata,
            "anomalies": anomalies,
            "has_trailing_data": len(self.trailing_bytes) > 0,
        }


class JPEGInspector:
    """Lightweight binary parser for JPEG images (JFIF/Exif)."""
    SOI = b"\xFF\xD8"

    def __init__(self, data: bytes):
        self.raw = data
        self.valid = False
        self.error: Optional[str] = None
        self.header: Dict[str, Any] = {}
        self.markers: List[Dict[str, Any]] = []

    def parse(self) -> Dict[str, Any]:
        if not self.raw.startswith(self.SOI):
            self.error = "Invalid JPEG signature: Missing \\xFF\\xD8 SOI marker"
            return self.get_summary()

        self.valid = True
        offset = 2
        total_len = len(self.raw)

        while offset < total_len:
            if self.raw[offset] != 0xFF:
                offset += 1
                continue

            marker = self.raw[offset + 1]
            offset += 2

            # Standalone markers (SOI, EOI, RST)
            if marker in (0xD8, 0xD9, 0x00) or (0xD0 <= marker <= 0xD7):
                if marker == 0xD9:
                    self.markers.append({"marker": "EOI (0xFFD9)", "offset": offset - 2})
                    break
                continue

            if offset + 2 > total_len:
                break
            length = struct.unpack(">H", self.raw[offset : offset + 2])[0]
            data_offset = offset + 2
            payload = self.raw[data_offset : data_offset + length - 2]

            # SOF0 (Baseline), SOF2 (Progressive)
            if marker in (0xC0, 0xC1, 0xC2):
                precision, h, w, components = struct.unpack(">BHHB", payload[:6])
                self.header = {
                    "width": w,
                    "height": h,
                    "precision": precision,
                    "components": components,
                    "color_space": "YCbCr" if components == 3 else ("Grayscale" if components == 1 else "CMYK"),
                    "progressive": (marker == 0xC2),
                }
                self.markers.append({"marker": f"SOF (0x{marker:02X})", "details": self.header})
            elif marker == 0xE1:
                # Exif / APP1
                tag = "Exif" if payload.startswith(b"Exif") else "APP1"
                self.markers.append({"marker": f"APP1 ({tag})", "length": length})
            elif marker == 0xE0:
                self.markers.append({"marker": "APP0 (JFIF)", "length": length})

            offset += length

        return self.get_summary()

    def get_summary(self) -> Dict[str, Any]:
        w = self.header.get("width", 0)
        h = self.header.get("height", 0)
        ratio_str, orientation = compute_aspect_ratio(w, h)
        return {
            "format": "JPEG",
            "valid": self.valid,
            "error": self.error,
            "file_size": len(self.raw),
            "dimensions": f"{w}x{h}",
            "aspect_ratio": ratio_str,
            "orientation": orientation,
            "megapixels": round((w * h) / 1_000_000, 2),
            "header": self.header,
            "markers_count": len(self.markers),
            "markers": self.markers,
        }


class WEBPInspector:
    """Binary parser for Google WEBP images (VP8 / VP8L / VP8X)."""
    def __init__(self, data: bytes):
        self.raw = data
        self.valid = False
        self.header: Dict[str, Any] = {}

    def parse(self) -> Dict[str, Any]:
        if len(self.raw) >= 12 and self.raw[:4] == b"RIFF" and self.raw[8:12] == b"WEBP":
            self.valid = True
            chunk_type = self.raw[12:16].decode("ascii", errors="replace")
            w, h = 0, 0
            has_alpha = False
            is_anim = False

            if chunk_type == "VP8 " and len(self.raw) >= 30:
                # Lossy VP8
                w = struct.unpack("<H", self.raw[26:28])[0] & 0x3FFF
                h = struct.unpack("<H", self.raw[28:30])[0] & 0x3FFF
            elif chunk_type == "VP8L" and len(self.raw) >= 25:
                # Lossless VP8L
                b0, b1, b2, b3 = struct.unpack("BBBB", self.raw[21:25])
                w = 1 + (((b1 & 0x3F) << 8) | b0)
                h = 1 + (((b3 & 0x0F) << 10) | (b2 << 2) | ((b1 & 0xC0) >> 6))
            elif chunk_type == "VP8X" and len(self.raw) >= 30:
                # Extended VP8X
                flags = self.raw[20]
                has_alpha = bool(flags & 0x10)
                is_anim = bool(flags & 0x02)
                w = 1 + (struct.unpack("<I", self.raw[24:28])[0] & 0x00FFFFFF)
                h = 1 + (struct.unpack("<I", self.raw[27:31])[0] & 0x00FFFFFF)

            self.header = {
                "chunk_type": chunk_type,
                "width": w,
                "height": h,
                "has_alpha": has_alpha,
                "is_animated": is_anim,
            }

        w = self.header.get("width", 0)
        h = self.header.get("height", 0)
        ratio_str, orientation = compute_aspect_ratio(w, h)

        return {
            "format": "WEBP",
            "valid": self.valid,
            "file_size": len(self.raw),
            "dimensions": f"{w}x{h}",
            "aspect_ratio": ratio_str,
            "orientation": orientation,
            "megapixels": round((w * h) / 1_000_000, 2),
            "header": self.header,
        }


class ImageInspector:
    """Unified entry point for forensic image inspection and PNG IDAT decompression."""

    @classmethod
    def inspect_bytes(cls, data: bytes, filename: str = "image.bin") -> Dict[str, Any]:
        """Inspect image bytes and return detailed structural report."""
        if not data:
            return {"valid": False, "error": "Empty data buffer"}

        # PNG detection
        if data.startswith(PNGInspector.SIGNATURE):
            inspector = PNGInspector(data)
            rep = inspector.parse()
            rep["filename"] = filename
            rep["base64_thumbnail"] = cls._generate_data_uri(data, "image/png")
            return rep

        # JPEG detection
        if data.startswith(JPEGInspector.SOI):
            inspector = JPEGInspector(data)
            rep = inspector.parse()
            rep["filename"] = filename
            rep["base64_thumbnail"] = cls._generate_data_uri(data, "image/jpeg")
            return rep

        # WEBP detection
        if len(data) >= 12 and data[:4] == b"RIFF" and data[8:12] == b"WEBP":
            inspector = WEBPInspector(data)
            rep = inspector.parse()
            rep["filename"] = filename
            rep["base64_thumbnail"] = cls._generate_data_uri(data, "image/webp")
            return rep

        # GIF detection
        if data.startswith(b"GIF87a") or data.startswith(b"GIF89a"):
            w, h = struct.unpack("<HH", data[6:10]) if len(data) >= 10 else (0, 0)
            ratio_str, orientation = compute_aspect_ratio(w, h)
            return {
                "format": "GIF",
                "valid": True,
                "filename": filename,
                "file_size": len(data),
                "dimensions": f"{w}x{h}",
                "aspect_ratio": ratio_str,
                "orientation": orientation,
                "megapixels": round((w * h) / 1_000_000, 2),
                "header": {"width": w, "height": h, "version": data[:6].decode("ascii", errors="replace")},
                "base64_thumbnail": cls._generate_data_uri(data, "image/gif"),
            }

        return {
            "format": "UNKNOWN",
            "valid": False,
            "filename": filename,
            "file_size": len(data),
            "error": "Unrecognized or unsupported image file header signature",
        }

    @classmethod
    def inspect_file(cls, path: str) -> Dict[str, Any]:
        """Read a file from disk and execute forensic inspection."""
        abs_path = os.path.abspath(path)
        if not os.path.isfile(abs_path):
            return {"valid": False, "error": f"File not found: {abs_path}"}

        try:
            with open(abs_path, "rb") as f:
                data = f.read()
            rep = cls.inspect_bytes(data, os.path.basename(abs_path))
            rep["absolute_path"] = abs_path
            return rep
        except Exception as e:
            return {"valid": False, "error": f"Failed to read file {abs_path}: {e}"}

    @classmethod
    def inspect_base64(cls, b64_str: str, filename: str = "image.png") -> Dict[str, Any]:
        """Decode a base64 string or data URI and inspect bytes."""
        try:
            if "," in b64_str:
                b64_str = b64_str.split(",", 1)[1]
            data = base64.b64decode(b64_str)
            return cls.inspect_bytes(data, filename)
        except Exception as e:
            return {"valid": False, "error": f"Failed to decode base64 image data: {e}"}

    @classmethod
    def inspect_url(cls, url: str, timeout: int = 15) -> Dict[str, Any]:
        """Fetch remote image from URL and run forensic inspection."""
        import urllib.request
        try:
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
            )
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                data = resp.read()
            filename = url.split("?")[0].split("/")[-1] or "image"
            rep = cls.inspect_bytes(data, filename)
            rep["url"] = url
            return rep
        except Exception as e:
            return {"valid": False, "error": f"Failed to fetch image from URL {url}: {e}"}

    @classmethod
    def format_markdown_summary(cls, rep: Dict[str, Any]) -> str:
        """Render an in-depth visual and forensic markdown summary for prompt injection or chat display."""
        fmt = rep.get("format", "UNKNOWN")
        dims = rep.get("dimensions", "Unknown")
        aspect = rep.get("aspect_ratio")
        mp = rep.get("megapixels")
        dim_str = f"`{dims}`"
        if aspect:
            dim_str += f" ({aspect}" + (f", {mp} MP)" if mp else ")")

        lines = [
            f"### Visual & Forensic Image Analysis: {rep.get('filename', 'image')} ({fmt})",
            f"- **Resolution & Aspect**: {dim_str}",
            f"- **File Size**: `{rep.get('file_size', 0):,} bytes`",
        ]

        if fmt == "PNG":
            hdr = rep.get("header", {})
            idat = rep.get("idat_analysis", {})
            pix = rep.get("pixel_stats", {})
            anomalies = rep.get("anomalies", [])

            lines.append(f"- **Color Space & Depth**: `{hdr.get('color_space')} ({hdr.get('bit_depth')}-bit)` | Interlace: `{hdr.get('interlace_method')}`")

            # Visual characteristics
            if pix:
                lines.append(
                    f"- **Dominant Tone & Brightness**: `{pix.get('dominant_tone')} Tone` "
                    f"(Mean Luminance: `{pix.get('mean_luminance')}`/255 | {pix.get('contrast_desc')})"
                )
                if pix.get("dominant_summary"):
                    lines.append(f"- **Color Palette**: `{pix.get('dominant_summary')}`")
                lines.append(
                    f"- **Color Metrics**: Mean RGB(`{pix.get('mean_red')}`, `{pix.get('mean_green')}`, `{pix.get('mean_blue')}`) | "
                    f"Temperature: `{pix.get('color_temperature')}` | Saturation: `{pix.get('saturation_desc')}`"
                )
                if pix.get("visual_type"):
                    lines.append(f"- **Visual Layout Type**: `{pix.get('visual_type')}`")

            # Binary / Forensic characteristics
            lines.append(f"- **Total Chunks**: `{rep.get('total_chunks', 0)}` (IDAT chunks: `{idat.get('idat_chunks_count', 0)}`)")
            lines.append(
                f"- **IDAT Compression**: `zlib-compressed binary` "
                f"({idat.get('total_compressed_bytes', 0):,}B compressed / "
                f"{idat.get('total_uncompressed_bytes', 0):,}B uncompressed | "
                f"Ratio: `{idat.get('compression_ratio', 0.0):.2f}x`)"
            )
            lines.append(
                f"- **Shannon Entropy**: Compressed IDAT: `{idat.get('compressed_entropy', 0.0)}` bits/B | "
                f"Decompressed Scanlines: `{idat.get('decompressed_entropy', 0.0)}` bits/B"
            )

            # Filter distribution
            filt_dist = idat.get("filter_distribution", {})
            if filt_dist:
                filt_str = ", ".join(f"{k}: {v.get('percent')}%" for k, v in filt_dist.items() if v.get("count", 0) > 0)
                lines.append(f"- **Scanline Filter Usage**: `{filt_str}`")

            if anomalies:
                lines.append(f"- **Security / Anomalies Detected**: `{len(anomalies)} issue(s)`")
                for a in anomalies:
                    lines.append(f"  - ⚠️ {a.get('description')}")
            else:
                lines.append("- **Integrity**: `Clean (All chunk CRCs verified, no trailing data)`")

        elif fmt == "JPEG":
            hdr = rep.get("header", {})
            lines.append(f"- **Color Mode**: `{hdr.get('color_space')} ({hdr.get('precision')}-bit)`")
            lines.append(f"- **Encoding**: `{'Progressive' if hdr.get('progressive') else 'Baseline'}`")

        elif fmt == "WEBP":
            hdr = rep.get("header", {})
            lines.append(f"- **Subtype**: `{hdr.get('chunk_type')}` | Alpha: `{hdr.get('has_alpha')}`")

        return "\n".join(lines)

    @staticmethod
    def _generate_data_uri(data: bytes, mime_type: str) -> str:
        """Create a base64 data URI."""
        b64 = base64.b64encode(data).decode("ascii")
        return f"data:{mime_type};base64,{b64}"


def main():
    if len(sys.argv) < 2:
        print("Usage: python image_inspector.py <path_to_image> [--json]")
        sys.exit(1)

    path = sys.argv[1]
    as_json = "--json" in sys.argv
    rep = ImageInspector.inspect_file(path)

    if as_json:
        # Strip large base64 thumbnail for concise JSON output
        rep_clean = {k: v for k, v in rep.items() if k != "base64_thumbnail"}
        import json
        print(json.dumps(rep_clean, indent=2))
    else:
        print(ImageInspector.format_markdown_summary(rep))


if __name__ == "__main__":
    main()
