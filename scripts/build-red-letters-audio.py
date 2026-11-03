#!/usr/bin/env python3
"""Build a fixed-voice, word-synchronized red-letter audio library.

Audio is produced with libespeak at deploy time, not in a visitor's browser.
Each word offset originates in a synthesis engine WORD boundary event.
"""
import argparse
import bisect
import ctypes as ct
import json
import re
import subprocess
import tempfile
import wave
from pathlib import Path


class Event(ct.Structure):
    _fields_ = [
        ("type", ct.c_int), ("unique_identifier", ct.c_uint),
        ("text_position", ct.c_int), ("length", ct.c_int),
        ("audio_position", ct.c_int), ("sample", ct.c_int),
        ("user_data", ct.c_void_p), ("id", ct.c_uint64),
    ]


Callback = ct.CFUNCTYPE(ct.c_int, ct.POINTER(ct.c_short), ct.c_int, ct.POINTER(Event))


class Synthesizer:
    def __init__(self, voice="english_rp", rate=154):
        self.lib = ct.CDLL("libespeak.so.1")
        lib = self.lib
        lib.espeak_Initialize.argtypes = [ct.c_int, ct.c_int, ct.c_char_p, ct.c_int]
        lib.espeak_Initialize.restype = ct.c_int
        lib.espeak_SetSynthCallback.argtypes = [Callback]
        lib.espeak_SetVoiceByName.argtypes = [ct.c_char_p]
        lib.espeak_SetVoiceByName.restype = ct.c_int
        lib.espeak_SetParameter.argtypes = [ct.c_int, ct.c_int, ct.c_int]
        lib.espeak_Synth.argtypes = [ct.c_void_p, ct.c_size_t, ct.c_uint,
                                     ct.c_int, ct.c_uint, ct.c_uint,
                                     ct.c_void_p, ct.c_void_p]
        lib.espeak_Synth.restype = ct.c_int
        lib.espeak_Synchronize.restype = ct.c_int
        self.audio, self.events = [], []

        def on_audio(wav, count, events):
            if wav and count > 0:
                self.audio.append(ct.string_at(wav, count * 2))
            if events:
                i = 0
                while i < 5000 and events[i].type:
                    e = events[i]
                    if e.type == 1:  # espeakEVENT_WORD
                        self.events.append((e.text_position, e.audio_position))
                    i += 1
            return 0

        self.callback = Callback(on_audio)
        self.sample_rate = lib.espeak_Initialize(2, 0, None, 0)
        if self.sample_rate <= 0:
            raise RuntimeError("Could not initialize libespeak")
        lib.espeak_SetSynthCallback(self.callback)
        if lib.espeak_SetVoiceByName(voice.encode("ascii")) != 0:
            raise RuntimeError("Missing eSpeak voice: " + voice)
        if lib.espeak_SetParameter(1, rate, 0) != 0:
            raise RuntimeError("Could not set speech rate")

    def say(self, text):
        self.audio, self.events = [], []
        payload = text.encode("utf-8")
        status = self.lib.espeak_Synth(ct.c_char_p(payload), len(payload) + 1,
                                      0, 1, 0, 1, None, None)
        if status != 0 or self.lib.espeak_Synchronize() != 0:
            raise RuntimeError("eSpeak failed on: " + text[:80])
        return b"".join(self.audio), self.events


def word_offsets(text, events, duration_ms):
    spans = list(re.finditer(r"\S+", text))
    if not spans:
        return []
    observed = {}
    for text_pos, audio_ms in events:
        pos = max(0, text_pos - 1)  # eSpeak text positions are one-based
        for i, span in enumerate(spans):
            if span.start() <= pos < span.end():
                observed.setdefault(i, round(audio_ms))
                break

    observed.setdefault(0, 0)
    keys = sorted(observed)
    out = []
    for i in range(len(spans)):
        if i in observed:
            time = observed[i]
        else:
            spot = bisect.bisect_left(keys, i)
            left = keys[spot - 1] if spot else 0
            right = keys[spot] if spot < len(keys) else len(spans)
            a, b = observed.get(left, 0), observed.get(right, duration_ms)
            time = a + (b - a) * (i - left) / max(1, right - left)
        out.append(max(0, min(round(time), duration_ms)))
    for i in range(1, len(out)):
        out[i] = max(out[i - 1], out[i])
    return out


def build(source, output, voice="english_rp", rate=154, limit=None):
    data = json.loads(Path(source).read_text(encoding="utf8"))
    output = Path(output)
    output.mkdir(parents=True, exist_ok=True)
    engine = Synthesizer(voice, rate)
    hz = engine.sample_rate
    silence = b"\x00\x00" * round(hz * .15)
    chapters = {}
    count = 0

    for book in data["books"]:
        for chapter in book["chapters"]:
            if limit is not None and count >= limit:
                break
            count += 1
            slug = f"{book['name'].lower()}-{chapter['c']:02d}"
            mp3 = output / f"{slug}.mp3"
            frames_written = 0
            all_timings = []

            with tempfile.TemporaryDirectory(prefix="redletters-") as tmp:
                wav_path = Path(tmp) / "chapter.wav"
                with wave.open(str(wav_path), "wb") as wav:
                    wav.setnchannels(1)
                    wav.setsampwidth(2)
                    wav.setframerate(hz)
                    for saying in chapter["e"]:
                        pcm, events = engine.say(saying["t"])
                        frames = len(pcm) // 2
                        duration = round(frames * 1000 / hz)
                        origin = round(frames_written * 1000 / hz)
                        all_timings.append([origin + v for v in word_offsets(
                            saying["t"], events, duration)])
                        wav.writeframesraw(pcm)
                        wav.writeframesraw(silence)
                        frames_written += frames + len(silence) // 2
                    wav.writeframes(b"")

                subprocess.run([
                    "ffmpeg", "-hide_banner", "-loglevel", "error",
                    "-nostdin", "-y", "-i", str(wav_path),
                    "-ac", "1", "-ar", str(hz), "-c:a", "libmp3lame",
                    "-b:a", "48k", str(mp3)
                ], check=True)

            assert len(all_timings) == len(chapter["e"]), slug
            for saying, times in zip(chapter["e"], all_timings):
                assert len(times) == len(saying["t"].split()), (slug, saying["v"])
            chapters[f"{book['name']}:{chapter['c']}"] = {
                "file": f"{slug}.mp3",
                "duration_ms": round(frames_written * 1000 / hz),
                "words": all_timings,
            }
            print(f"[audio] {count:02d} {slug}: {len(all_timings)} sayings; "
                  f"{mp3.stat().st_size // 1024} KiB", flush=True)
        if limit is not None and count >= limit:
            break

    index = {
        "voice": voice, "rate_wpm": rate, "sample_rate": hz,
        "timing_source": "libespeak WORD events (milliseconds)",
        "chapters": chapters,
    }
    (output / "index.json").write_text(
        json.dumps(index, separators=(",", ":")), encoding="utf8")
    print(f"[audio] Built {count} chapters with fixed-voice word timings", flush=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", default="public/words-of-christ/data.json")
    parser.add_argument("--out", default="public/words-of-christ/audio")
    parser.add_argument("--voice", default="english_rp")
    parser.add_argument("--rate", type=int, default=154)
    parser.add_argument("--limit", type=int)
    args = parser.parse_args()
    build(args.data, args.out, args.voice, args.rate, args.limit)
