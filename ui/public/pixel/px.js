// Tiny pixel-buffer library: every mark is a whole pixel, so the art stays crisp
// when the canvas is scaled up with image-rendering: pixelated.
(function (root) {
  "use strict";
  const hex = (h) => {
    const n = parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const pack = (r, g, b, a = 255) => ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;
  const C = (h) => { const [r, g, b] = hex(h); return pack(r, g, b); };
  const unpack = (c) => [c & 255, (c >>> 8) & 255, (c >>> 16) & 255, c >>> 24];
  const mix = (c1, c2, t) => {
    const a = unpack(c1), b = unpack(c2);
    return pack(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, 255);
  };
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
  const bayer = (x, y) => BAYER[(y & 3) * 4 + (x & 3)];

  class PX {
    constructor(w, h) { this.w = w; this.h = h; this.d = new Uint32Array(w * h); }
    set(x, y, c) { x = Math.floor(x); y = Math.floor(y); if (x >= 0 && y >= 0 && x < this.w && y < this.h && c) this.d[y * this.w + x] = c; }
    get(x, y) { x = Math.floor(x); y = Math.floor(y); return x >= 0 && y >= 0 && x < this.w && y < this.h ? this.d[y * this.w + x] : 0; }
    rect(x, y, w, h, c) { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.set(x + i, y + j, c); }
    hline(x0, x1, y, c) { for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) this.set(x, y, c); }
    vline(x, y0, y1, c) { for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) this.set(x, y, c); }
    line(x0, y0, x1, y1, c) {
      x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
      const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
      let err = dx + dy;
      for (;;) {
        this.set(x0, y0, c);
        if (x0 === x1 && y0 === y1) break;
        const e2 = 2 * err;
        if (e2 >= dy) { err += dy; x0 += sx; }
        if (e2 <= dx) { err += dx; y0 += sy; }
      }
    }
    // scanline polygon fill, sampled at pixel centres; c may be a function (x,y)→colour
    poly(pts, c) {
      const ys = pts.map((p) => p[1]);
      const y0 = Math.floor(Math.min(...ys)), y1 = Math.ceil(Math.max(...ys));
      for (let y = y0; y <= y1; y++) {
        const yc = y + 0.5, xs = [];
        for (let i = 0; i < pts.length; i++) {
          const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length];
          if ((ay <= yc && by > yc) || (by <= yc && ay > yc)) xs.push(ax + ((yc - ay) / (by - ay)) * (bx - ax));
        }
        xs.sort((a, b) => a - b);
        for (let k = 0; k + 1 < xs.length; k += 2)
          for (let x = Math.ceil(xs[k] - 0.5); x <= Math.floor(xs[k + 1] - 0.5); x++) this.set(x, y, typeof c === "function" ? c(x, y) : c);
      }
    }
    ellipse(cx, cy, rx, ry, c) {
      for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
        for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
          const u = (x + 0.5 - cx) / rx, v = (y + 0.5 - cy) / ry;
          if (u * u + v * v <= 1) this.set(x, y, typeof c === "function" ? c(x, y, u, v) : c);
        }
    }
    // ordered-dither fill: density 0..1
    dither(x, y, w, h, c, density) {
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (bayer(x + i, y + j) < density) this.set(x + i, y + j, c);
    }
    // screen-blend a light source, banded + dithered so it reads as pixel light
    glow(cx, cy, r, colour, strength, bands = 4, clip) {
      const [lr, lg, lb] = unpack(colour);
      for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++)
        for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
          if (x < 0 || y < 0 || x >= this.w || y >= this.h) continue;
          if (clip && !clip(x, y)) continue;
          const d = Math.hypot(x + 0.5 - cx, (y + 0.5 - cy) * 1.1) / r;
          if (d >= 1) continue;
          let t = (1 - d) * (1 - d) * bands + bayer(x, y) - 0.5;
          t = Math.max(0, Math.min(bands, Math.round(t))) / bands;
          if (!t) continue;
          const a = t * strength, i = y * this.w + x, p = unpack(this.d[i]);
          this.d[i] = pack(255 - ((255 - p[0]) * (255 - lr * a)) / 255, 255 - ((255 - p[1]) * (255 - lg * a)) / 255, 255 - ((255 - p[2]) * (255 - lb * a)) / 255);
        }
    }
    // alpha-mix a colour over a region (for sheer curtains, shadows)
    tint(x, y, w, h, colour, a, mask) {
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
        const X = x + i, Y = y + j;
        if (X < 0 || Y < 0 || X >= this.w || Y >= this.h) continue;
        if (mask && !mask(X, Y)) continue;
        const k = Y * this.w + X;
        this.d[k] = mix(this.d[k], colour, a);
      }
    }
    // copy a sprite buffer in; 0 = transparent. lean shears rows (for leaning instruments)
    blit(src, dx, dy, lean = 0) {
      for (let y = 0; y < src.h; y++) {
        const shift = Math.round((src.h - 1 - y) * lean);
        for (let x = 0; x < src.w; x++) { const c = src.d[y * src.w + x]; if (c) this.set(dx + x + shift, dy + y, c); }
      }
    }
    copy(o) { this.d.set(o.d); return this; }
    toCanvas(cv) {
      cv.width = this.w; cv.height = this.h;
      const ctx = cv.getContext("2d");
      ctx.putImageData(new ImageData(new Uint8ClampedArray(this.d.buffer.slice(0)), this.w, this.h), 0, 0);
      return cv;
    }
  }
  // deterministic random
  function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

  root.PXL = { PX, C, mix, pack, unpack, bayer, rng };
})(window);
