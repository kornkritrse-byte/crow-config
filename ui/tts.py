#!/usr/bin/env python3
"""Crow Room's speaking voice: Kokoro (kokoro-onnx), local, on this Mac.

server.mjs starts this on the first spoken reply, keeps it running so the
model stays loaded, and kills it with the Room. It listens on 127.0.0.1 only.

    POST /tts  {"text": "...", "voice": "bm_fable", "speed": 1.0}  ->  audio/wav
    GET  /     ->  "ok" once the model is loaded

Runs in its own venv (~/.kokoro-venv, kokoro-onnx + soundfile); the int8 model
measured fastest on this Mac's CPU (CoreML and fp32 were both slower, 24 Oct).
"""
import io
import json
import os
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

import onnxruntime as ort
import soundfile as sf
from kokoro_onnx import Kokoro

HOME = os.path.expanduser("~")
MODEL = os.path.join(HOME, "kokoro-v1.0.int8.onnx")
VOICES = os.path.join(HOME, "voices-v1.0.bin")
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4713
DEFAULT_VOICE = "bm_fable"   # his pick, 24 Oct ("fable for now"; af_heart was the other favourite)

opts = ort.SessionOptions()
opts.intra_op_num_threads = os.cpu_count() or 4
kokoro = Kokoro.from_session(ort.InferenceSession(MODEL, opts, providers=["CPUExecutionProvider"]), VOICES)
known = set(kokoro.get_voices())
lock = threading.Lock()   # one synthesis at a time: they'd only fight over the CPU

# kokoro-onnx phonemizes through phonemizer.phonemize(), which builds a new espeak
# backend on every call: 0.65 s of a one-word sentence's 1 s. One backend per
# accent, built once, gives the same phonemes in under a millisecond.
# (Import after Kokoro(): constructing it is what points phonemizer at espeak.)
from phonemizer.backend import EspeakBackend  # noqa: E402
backends = {lang: EspeakBackend(lang, preserve_punctuation=True, with_stress=True) for lang in ("en-us", "en-gb")}


def phonemes(text, lang):
    raw = backends[lang].phonemize([kokoro.tokenizer.normalize_text(text)], strip=True)[0]
    return "".join(p for p in raw if p in kokoro.tokenizer.vocab).strip()


# The pause after a full stop, his ask 24 Oct ("make the pause half shorter"):
# Kokoro's own trim still leaves ~40 ms of silence before each sentence and
# ~120 ms after it, and the Room plays sentences back to back, so that silence
# is the pause. Halve it, for full stops only: the Room also cuts long openers
# at a comma, and those pauses stay as Kokoro makes them (his correction, 16:09).
# Still "a little bit too long" at 80 ms (16:15): halved again.
QUIET = 0.01                  # below this the fade of the last word is inaudible
LEAD_KEEP, TAIL_KEEP = 0.0, 0.02   # seconds: 20 ms in all, from ~160 (halved a third time, 16:17)


def tighten(audio, rate):
    loud = (abs(audio) > QUIET).nonzero()[0]
    if not len(loud):
        return audio
    return audio[max(loud[0] - int(LEAD_KEEP * rate), 0):loud[-1] + int(TAIL_KEEP * rate)]


def speak(text, voice, speed):
    lang = "en-gb" if voice[0] == "b" else "en-us"
    audio, rate = kokoro.create(phonemes(text, lang), voice=voice, speed=speed, is_phonemes=True)
    return (tighten(audio, rate) if text.rstrip("\"')]").endswith((".", "!", "?", "…")) else audio), rate


speak("Ready.", DEFAULT_VOICE, 1.0)   # the first call is slow; pay it now


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.reply(200, b"ok", "text/plain")

    def do_POST(self):
        if self.path != "/tts":
            return self.reply(404, b"not found", "text/plain")
        try:
            body = json.loads(self.rfile.read(int(self.headers.get("content-length") or 0)) or b"{}")
            text = str(body.get("text", "")).strip()[:1000]
            voice = body.get("voice") if body.get("voice") in known else DEFAULT_VOICE
            speed = min(max(float(body.get("speed") or 1.0), 0.5), 2.0)
        except (ValueError, TypeError):
            return self.reply(400, b"bad request", "text/plain")
        if not text:
            return self.reply(400, b"no text", "text/plain")
        with lock:
            audio, rate = speak(text, voice, speed)
        buf = io.BytesIO()
        sf.write(buf, audio, rate, format="WAV", subtype="PCM_16")
        self.reply(200, buf.getvalue(), "audio/wav")

    def reply(self, code, data, kind):
        self.send_response(code)
        self.send_header("content-type", kind)
        self.send_header("content-length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, *args):
        pass


ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
