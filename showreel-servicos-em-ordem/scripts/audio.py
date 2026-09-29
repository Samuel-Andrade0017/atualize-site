"""Trilha original + sound design sintetizados + mix com a voz tratada.
Saída: public/mix.wav (48 kHz, estéreo). Uso: python3 scripts/audio.py
Todos os cues estão em FRAMES (30 fps) e batem com a timeline de src/Showreel.tsx.
"""
import os
import numpy as np
import soundfile as sf
from scipy import signal

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 48000
DUR = 37.5
N = int(SR * DUR)
rng = np.random.default_rng(7)


def t_(d):
    return np.arange(int(SR * d)) / SR


def midi(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def env_ad(n, a, d, curve=4.0):
    a_n = max(1, int(a * SR))
    e = np.ones(n)
    e[:a_n] = np.linspace(0, 1, a_n)
    rest = n - a_n
    if rest > 0:
        e[a_n:] = np.exp(-curve * np.arange(rest) / max(1, int(d * SR)))
    return e


def bp(x, lo, hi, order=2):
    sos = signal.butter(order, [lo, hi], btype='band', fs=SR, output='sos')
    return signal.sosfilt(sos, x)


def lp(x, f, order=2):
    return signal.sosfilt(signal.butter(order, f, btype='low', fs=SR, output='sos'), x)


def hp(x, f, order=2):
    return signal.sosfilt(signal.butter(order, f, btype='high', fs=SR, output='sos'), x)


def reverb_ir(dur=2.2, decay=3.0, bright=6000):
    n = int(SR * dur)
    ir = rng.standard_normal((n, 2)) * np.exp(-decay * np.arange(n) / SR)[:, None]
    ir = np.stack([lp(ir[:, 0], bright), lp(ir[:, 1], bright)], 1)
    ir[: int(0.012 * SR)] = 0
    return ir / np.sqrt((ir ** 2).sum(0)).max()


IR_S = reverb_ir(1.4, 4.0, 7000)
IR_L = reverb_ir(3.2, 1.8, 5000)


def verb(x, ir, wet=0.3):
    """x mono ou estéreo -> estéreo"""
    if x.ndim == 1:
        x = np.stack([x, x], 1)
    y = np.stack([signal.fftconvolve(x[:, c], ir[:, c])[: len(x) + len(ir)] for c in range(2)], 1)
    out = np.zeros_like(y)
    out[: len(x)] += x * (1 - wet)
    out += y * wet
    return out


def pan(x, p):
    """p -1..1 (constante ou array)"""
    l = np.cos((p + 1) * np.pi / 4)
    r = np.sin((p + 1) * np.pi / 4)
    return np.stack([x * l, x * r], 1)


def add(bus, x, at_s, gain=1.0):
    if x.ndim == 1:
        x = np.stack([x, x], 1)
    i = int(at_s * SR)
    if i >= len(bus):
        return
    j = min(len(bus), i + len(x))
    bus[i:j] += x[: j - i] * gain


# ---------------------------------------------------------------- SFX
def whoosh(d=0.6, f0=300, f1=4000, peak=0.6, width=1.0, pan_sweep=(-0.6, 0.6)):
    n = int(SR * d)
    x = rng.standard_normal(n)
    # filtro passa-banda varrendo (processado em blocos)
    out = np.zeros(n)
    blk = 512
    fc = np.geomspace(f0, f1, n // blk + 1)
    zi = None
    for k in range(0, n, blk):
        c = fc[k // blk]
        sos = signal.butter(2, [max(40, c / (1.6 * width)), min(SR / 2 - 100, c * 1.6 * width)], btype='band', fs=SR, output='sos')
        if zi is None:
            zi = signal.sosfilt_zi(sos) * 0
        seg, zi = signal.sosfilt(sos, x[k:k + blk], zi=zi)
        out[k:k + blk] = seg
    tt = np.linspace(0, 1, n)
    e = np.where(tt < peak, (tt / peak) ** 2.2, ((1 - tt) / (1 - peak)) ** 1.6)
    out *= e
    out /= np.abs(out).max() + 1e-9
    p = np.linspace(pan_sweep[0], pan_sweep[1], n)
    return verb(pan(out, p), IR_S, 0.25)


def thump(f0=110, f1=42, d=0.5, click=0.3):
    tt = t_(d)
    f = f1 + (f0 - f1) * np.exp(-tt * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    x = np.sin(ph) * env_ad(len(tt), 0.002, d * 0.35, 3)
    c = hp(rng.standard_normal(len(tt)), 1500) * env_ad(len(tt), 0.0005, 0.01, 6) * click
    return x + c


def impact(big=1.0):
    d = 1.6 + big
    x = thump(95, 32, d, 0.5) * 1.0
    noise = lp(rng.standard_normal(int(SR * d)), 2500) * env_ad(int(SR * d), 0.001, 0.25, 5) * 0.45
    body = bp(rng.standard_normal(int(SR * d)), 120, 600) * env_ad(int(SR * d), 0.001, 0.12, 5) * 0.7
    y = x + noise + body
    return verb(y / np.abs(y).max(), IR_L, 0.28 * big)


def thock(pitch=180, g=1.0):
    d = 0.18
    tt = t_(d)
    x = np.sin(2 * np.pi * pitch * tt * (1 - 0.3 * tt)) * env_ad(len(tt), 0.001, 0.04, 5)
    n = bp(rng.standard_normal(len(tt)), 800, 5000) * env_ad(len(tt), 0.0005, 0.008, 6) * 0.5
    return verb((x + n) * g, IR_S, 0.18)


def click(f=3200, g=0.6):
    d = 0.05
    tt = t_(d)
    x = np.sin(2 * np.pi * f * tt) * env_ad(len(tt), 0.0003, 0.006, 5)
    n = hp(rng.standard_normal(len(tt)), 4000) * env_ad(len(tt), 0.0002, 0.003, 6) * 0.6
    return (x + n) * g


def pop(f0=900, f1=380, g=0.7):
    d = 0.12
    tt = t_(d)
    f = f1 + (f0 - f1) * np.exp(-tt * 45)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_ad(len(tt), 0.001, 0.03, 4)
    return verb(x * g, IR_S, 0.2)


def ding(m=84, g=0.5, d=0.9):
    tt = t_(d)
    f = midi(m)
    x = (np.sin(2 * np.pi * f * tt) + 0.35 * np.sin(2 * np.pi * f * 2.01 * tt) + 0.12 * np.sin(2 * np.pi * f * 3.02 * tt))
    x *= env_ad(len(tt), 0.002, 0.18, 4)
    return verb(x * g, IR_L, 0.3)


def riser(d=1.0, g=1.0):
    n = int(SR * d)
    tt = np.linspace(0, 1, n)
    nz = whoosh(d, 400, 9000, 0.98, 0.8, (-0.2, 0.2))[:n]
    f = 180 * (2 ** (tt * 3.3))
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.25 * tt ** 2
    tone2 = np.sin(2 * np.pi * np.cumsum(f * 1.5) / SR) * 0.12 * tt ** 2
    out = nz * (tt ** 1.5)[:, None] + pan(tone + tone2, 0)
    return out * g


def glitch(d=0.35, g=0.5):
    n = int(SR * d)
    x = np.zeros(n)
    k = 0
    while k < n:
        L = int(rng.integers(200, 1600))
        seg = np.sign(np.sin(2 * np.pi * rng.uniform(200, 2400) * np.arange(L) / SR)) * rng.uniform(0.2, 1)
        if rng.random() < 0.35:
            seg = rng.standard_normal(L) * 0.6
        if rng.random() < 0.2:
            seg *= 0
        x[k:k + L] = seg[: n - k]
        k += L
    x = bp(x, 300, 7000) * env_ad(n, 0.002, d * 0.6, 2)
    return pan(x * g, 0.2)


def count_ticks(d, g=0.25, f=4200, rate0=40, rate1=6):
    """contador numérico: tiques que desaceleram"""
    out = np.zeros(int(SR * d))
    tt = 0.0
    k = 0
    while tt < d:
        c = click(f * (1 + 0.04 * (k % 3)), g)
        i = int(tt * SR)
        j = min(len(out), i + len(c))
        out[i:j] += c[: j - i]
        rate = rate0 + (rate1 - rate0) * (tt / d)
        tt += 1 / rate
        k += 1
    return out


def shimmer(d=1.2, g=0.3, base=84):
    tt = t_(d)
    x = sum(np.sin(2 * np.pi * midi(base + iv) * tt + i) * (0.5 ** i) for i, iv in enumerate([0, 7, 12, 19]))
    x *= env_ad(len(tt), 0.05, d * 0.5, 2.5)
    return verb(x * g, IR_L, 0.5)


def sound_logo():
    """Assinatura sonora: arpejo em Láb maior (Ab–C–Eb–Ab) + sub + brilho"""
    d = 3.2
    out = np.zeros((int(SR * d), 2))
    notes = [68, 72, 75, 80]
    for i, m in enumerate(notes):
        tt = t_(d - i * 0.09)
        f = midi(m)
        x = (np.sin(2 * np.pi * f * tt) + 0.5 * np.sin(2 * np.pi * f * 2 * tt) * np.exp(-tt * 6) + 0.2 * np.sin(2 * np.pi * f * 3.01 * tt) * np.exp(-tt * 10))
        x *= env_ad(len(tt), 0.003, 0.9 if i == 3 else 0.5, 3)
        st = pan(x * (0.55 if i < 3 else 0.8), (-0.4, -0.1, 0.1, 0.0)[i])
        k = int(i * 0.09 * SR)
        out[k:k + len(st)] += st
    sub = thump(70, 44, 1.6, 0.0) * 0.8
    out[: len(sub)] += np.stack([sub, sub], 1)
    pad = sum(np.sin(2 * np.pi * midi(m) * t_(d)) for m in [44, 56, 60, 63]) * env_ad(int(SR * d), 0.08, 1.4, 2.2) * 0.12
    out += np.stack([pad, pad], 1)
    out = verb(out, IR_L, 0.35)
    return out / np.abs(out).max() * 0.9


# ---------------------------------------------------------------- MÚSICA
P = 0.55  # tempo (s) ~109 BPM
OFF = 0.30  # fase: 9.1 s e 21.2 s caem em tempos fortes
CHORDS = [[53, 56, 60, 63, 67], [49, 53, 56, 60, 65], [56, 60, 63, 70], [51, 55, 58, 65]]
ROOTS = [41, 37, 44, 39]


def section(t):
    if t < 8.1:
        return 'intro'
    if t < 9.1:
        return 'build'
    if t < 21.2:
        return 'groove'
    if t < 27.6:
        return 'peak'
    return 'outro'


def music():
    L = np.zeros((N, 2))
    D = np.zeros((N, 2))  # bateria (sidechain não se aplica)
    # PAD (supersaw suave filtrado)
    tt = np.arange(N) / SR
    bar = ((tt - OFF) // (4 * P)).astype(int) % 4
    pad = np.zeros(N)
    for ci, ch in enumerate(CHORDS):
        mask = (bar == ci).astype(float)
        mask = np.convolve(mask, np.ones(2400) / 2400, mode='same')  # crossfade
        for m in ch:
            for det in (-0.08, 0.0, 0.07):
                f = midi(m + det)
                pad += mask * signal.sawtooth(2 * np.pi * f * tt + rng.uniform(0, 6)) * 0.03
    lvl = np.interp(tt, [0, 1.5, 8.0, 8.9, 9.1, 21.2, 27.6, 30, 35.5, 37.5], [0, 1.3, 1.6, 0.4, 0.7, 0.85, 1.0, 0.9, 0.7, 0])
    cut = np.interp(tt, [0, 8.0, 9.1, 21.2, 27.6, 31, 37.5], [900, 1600, 2600, 3800, 1800, 2600, 1200])
    # filtro variável aproximado: duas versões misturadas
    lo = lp(pad, 900)
    hi = lp(pad, 4200)
    k = (cut - 900) / (4200 - 900)
    padf = lo * (1 - k) + hi * k
    L += pan(padf * lvl, 0) * 0.9
    # ARPEJO pluck (16ths no groove, 8ths no intro/outro)
    arp = np.zeros(N)
    beat = 0
    t0 = OFF
    while t0 < DUR:
        sec = section(t0)
        div = 4 if sec in ('groove', 'peak') else 2
        for s16 in range(div):
            ts = t0 + s16 * P / div
            if ts >= DUR or sec == 'build' and ts > 8.95:
                continue
            if ts < 2.0:
                continue
            ci = int(((ts - OFF) // (4 * P)) % 4)
            ch = CHORDS[ci]
            idx = (beat * div + s16)
            m = ch[(idx * 3) % len(ch)] + (12 if (idx % 8) in (3, 6) else 0)
            d = 0.28
            n = int(SR * d)
            x = signal.square(2 * np.pi * midi(m) * np.arange(n) / SR, 0.3) * env_ad(n, 0.002, 0.07, 4)
            x = lp(x, 2600 if sec != 'peak' else 4200)
            g = {'intro': 0.075, 'build': 0.06, 'groove': 0.07, 'peak': 0.085, 'outro': 0.045}[sec]
            i = int(ts * SR)
            j = min(N, i + n)
            arp[i:j] += x[: j - i] * g
        beat += 1
        t0 += P
    arpst = verb(pan(arp, 0.15), IR_L, 0.35)[:N]
    # eco ping-pong
    dl = int(P * 0.75 * SR)
    arpst[dl:, 0] += arpst[:-dl, 1] * 0.35
    arpst[2 * dl:, 1] += arpst[:-2 * dl, 0] * 0.22
    L += arpst
    # BAIXO (pluck no 8th, sidechain)
    bass = np.zeros(N)
    t0 = OFF
    while t0 < DUR:
        sec = section(t0)
        if sec in ('groove', 'peak') or (sec == 'intro' and t0 > 4.0):
            ci = int(((t0 - OFF) // (4 * P)) % 4)
            for e8 in range(2):
                ts = t0 + e8 * P / 2
                n = int(SR * 0.26)
                f = midi(ROOTS[ci] + (12 if e8 else 0) - 12 + 12)
                x = (np.sin(2 * np.pi * f * np.arange(n) / SR) + 0.3 * signal.sawtooth(2 * np.pi * f * np.arange(n) / SR)) * env_ad(n, 0.004, 0.12, 3)
                x = lp(x, 700)
                i = int(ts * SR)
                j = min(N, i + n)
                bass[i:j] += x[: j - i] * (0.16 if sec != 'intro' else 0.09)
        t0 += P
    # sidechain: bomba nos tempos
    sc = np.ones(N)
    t0 = OFF
    while t0 < DUR:
        if section(t0) in ('groove', 'peak'):
            i = int(t0 * SR)
            n = int(0.32 * SR)
            j = min(N, i + n)
            sc[i:j] = np.minimum(sc[i:j], 1 - 0.55 * np.exp(-np.arange(j - i) / (0.07 * SR)))
        t0 += P
    L[:, 0] *= sc
    L[:, 1] *= sc
    L += pan(bass * sc, 0)
    # BATERIA
    t0 = OFF
    beat = 0
    while t0 < DUR:
        sec = section(t0)
        if sec in ('groove', 'peak'):
            add(D, pan(thump(120, 46, 0.45, 0.25) * 0.55, 0), t0)
            if beat % 2 == 1:  # clap no 2 e 4
                n = int(0.25 * SR)
                c = bp(rng.standard_normal(n), 900, 5000) * env_ad(n, 0.001, 0.06, 4)
                add(D, verb(c * (0.22 if sec == 'peak' else 0.14), IR_S, 0.3), t0)
            for h in (0.5,) if sec == 'groove' else (0.25, 0.5, 0.75):
                n = int(0.08 * SR)
                hh = hp(rng.standard_normal(n), 8000) * env_ad(n, 0.0005, 0.02 if h != 0.5 else 0.05, 5)
                add(D, pan(hh * (0.10 if h == 0.5 else 0.05), 0.35), t0 + h * P)
        elif sec == 'intro' and t0 > 1.0:
            n = int(0.05 * SR)
            hh = hp(rng.standard_normal(n), 9000) * env_ad(n, 0.0005, 0.015, 5)
            add(D, pan(hh * 0.05, -0.3), t0 + P / 2)
            add(D, pan(thump(80, 40, 0.5, 0) * 0.18, 0), t0)  # pulso grave suave
        beat += 1
        t0 += P
    return L, D


# ---------------------------------------------------------------- CUES (frames)
def fr(f):
    return f / 30.0


def cubic_bezier(x1, y1, x2, y2):
    def f(x):
        # resolve t para x via bisseção
        lo, hi = 0.0, 1.0
        for _ in range(40):
            t = (lo + hi) / 2
            xt = 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3
            lo, hi = (t, hi) if xt < x else (lo, t)
        t = (lo + hi) / 2
        return 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3
    return f


def sfx_bus():
    B = np.zeros((N, 2))
    A = lambda x, f, g=1.0: add(B, x, fr(f), g)
    # --- Hook
    A(impact(0.6), 0, 0.55)
    A(whoosh(0.5, 200, 3000, 0.3), 0, 0.35)
    for f, p in [(12, 200), (25, 170), (40, 190), (56, 150)]:
        A(thock(p), f, 0.55)
    A(whoosh(0.45, 500, 6000, 0.6, 1, (0.3, -0.5)), 63, 0.5)
    # --- Mês: tiques do calendário acompanhando o speed-ramp
    ez = cubic_bezier(0.83, 0, 0.17, 1)
    prev = 0
    for lf in np.arange(4, 40.01, 0.25):
        run = ez((lf - 4) / 36) * 30
        if int(run) > prev:
            prev = int(run)
            A(click(2600 + prev * 30, 0.28), 72 + lf)
    A(pop(1200, 500, 0.8), 112)
    A(shimmer(1.0, 0.18, 79), 112)
    A(thock(220, 0.6), 78)
    # --- Receitas x Despesas
    A(thump(160, 60, 0.4, 0.4), 132, 0.6)
    A(whoosh(0.3, 800, 7000, 0.3), 130, 0.35)
    A(thock(200), 141, 0.45)
    A(whoosh(0.45, 300, 3000, 0.6), 152, 0.45)
    A(pop(800, 400, 0.6), 162)
    add(B, pan(count_ticks(1.1, 0.2, 4200), 0.2), fr(165))
    A(impact(0.4), 176, 0.5)
    A(ding(84, 0.25), 176)
    A(whoosh(0.4, 300, 4000, 0.55, 1, (0.5, -0.5)), 196, 0.4)
    A(pop(700, 350, 0.6), 199)
    add(B, pan(count_ticks(1.0, 0.2, 3600), -0.2), fr(201))
    A(impact(0.7), 227, 0.7)
    A(glitch(0.18, 0.3), 227)
    # --- Caos -> ordem
    A(glitch(0.4, 0.35), 242)
    for i in range(10):
        A(pop(600 + i * 60, 300, 0.25), 242 + i * 1.2)
    A(riser(1.0, 0.7), 243)
    A(impact(1.2), 273, 0.95)
    for k, f in enumerate([273, 274.5, 276, 277.5]):
        A(click(1800 + k * 300, 0.5), f)
    A(whoosh(0.4, 200, 5000, 0.8), 305, 0.55)
    # --- Controle financeiro
    A(whoosh(0.5, 3000, 300, 0.2), 316, 0.45)
    A(thump(130, 50, 0.4, 0.3), 318, 0.5)
    A(thock(190), 318, 0.5)
    A(thock(170), 324, 0.5)
    for f in (324, 327, 330):
        A(pop(900, 500, 0.35), f)
    for i in range(9):
        A(click(2200 + i * 120, 0.18), 334 + i * 2.2)
    for f in (340, 343, 346):
        A(click(3000, 0.3), f)
    A(whoosh(0.4, 400, 5000, 0.7), 360, 0.35)
    # --- Marca
    A(whoosh(0.45, 6000, 400, 0.85, 1, (0, 0)), 366, 0.4)
    A(impact(0.8), 379, 0.6)
    A(shimmer(1.4, 0.28, 80), 379)
    # --- Ficar por dentro
    A(whoosh(0.35, 400, 5000, 0.3), 398, 0.35)
    A(pop(1000, 500, 0.45), 403)
    A(pop(800, 420, 0.45), 408)
    add(B, pan(count_ticks(0.8, 0.12, 4600), 0.4), fr(405))
    # --- Operação
    A(whoosh(0.4, 300, 4000, 0.4), 434, 0.4)
    A(thock(200), 441, 0.5)
    for f in (438, 441, 444):
        A(pop(700, 380, 0.35), f)
    A(whoosh(0.35, 800, 8000, 0.5, 1.2, (0.7, -0.7)), 460, 0.55)
    # --- Mês a mês
    for k in range(9):
        A(click(2500 + k * 90, 0.35), 466 + 6 + k * 4.75)
    A(thock(190), 480, 0.5)
    A(thock(160), 496, 0.45)
    A(impact(0.3), 522, 0.35)
    A(whoosh(0.7, 400, 6000, 0.9, 0.8), 524, 0.3)
    # --- Final do mês
    A(thump(150, 55, 0.4, 0.4), 551, 0.55)
    A(whoosh(0.3, 900, 6000, 0.3), 549, 0.3)
    A(pop(1100, 500, 0.6), 565)
    A(ding(88, 0.28), 571)
    # --- Não ficar perdido / contas
    A(glitch(0.45, 0.35), 581)
    A(thock(180), 581, 0.4)
    A(impact(0.4), 595, 0.45)
    A(whoosh(0.45, 300, 4000, 0.6), 603, 0.4)
    for i in range(6):
        A(ding(84 + [0, 2, 4, 7, 9, 12][i], 0.14, 0.5), 615 + i * 3)
    # --- Rajada (nos tempos da trilha)
    for f in (636, 652.5, 669, 685.5):
        A(impact(0.5), f, 0.6)
        A(thock(140, 0.8), f)
    add(B, pan(count_ticks(1.4, 0.12, 4400, 50, 30), 0), fr(637))
    # --- Hero
    A(whoosh(0.7, 200, 5000, 0.85, 1.0, (0, 0)), 681, 0.5)
    A(impact(0.9), 702, 0.7)
    for f in (708, 714, 720):
        A(thock(190), f, 0.45)
    for f in (710, 713, 716):
        A(pop(900, 480, 0.3), f)
    for i in range(9):
        A(click(2200 + i * 120, 0.15), 720 + i * 2.2)
    A(whoosh(1.0, 3000, 250, 0.4, 0.8), 756, 0.45)
    A(thock(200), 768, 0.5)
    A(thock(170), 774, 0.5)
    for f in (772, 776, 780):
        A(pop(800, 420, 0.35), f)
    # --- Encerramento
    A(whoosh(1.2, 4000, 200, 0.3, 0.8, (0, 0)), 824, 0.35)
    for i, f in enumerate((838, 858, 878)):
        A(ding(72 + [0, 3, 7][i], 0.16, 0.8), f)
    A(thock(160, 0.8), 902, 0.5)
    A(thock(140, 0.8), 907, 0.5)
    A(whoosh(0.6, 300, 5000, 0.8, 1, (0, 0)), 928, 0.35)
    A(riser(0.35, 0.25), 934)
    A(sound_logo(), 956, 0.85)
    A(pop(900, 450, 0.45), 986)
    A(click(2800, 0.25), 998)
    return B


def envelope(x, att=0.02, rel=0.3):
    a = np.abs(x)
    out = np.zeros_like(a)
    ca = np.exp(-1 / (att * SR))
    cr = np.exp(-1 / (rel * SR))
    v = 0.0
    # rápido o bastante em blocos
    blk = 480
    peaks = np.array([a[i:i + blk].max() for i in range(0, len(a), blk)])
    env = np.zeros_like(peaks)
    ca = np.exp(-blk / (att * SR))
    cr = np.exp(-blk / (rel * SR))
    for i, p in enumerate(peaks):
        v = ca * v + (1 - ca) * p if p > v else cr * v + (1 - cr) * p
        env[i] = v
    return np.repeat(env, blk)[: len(a)]


def main():
    voice, sr = sf.read(os.path.join(ROOT, 'public', 'voice.wav'))
    assert sr == SR
    if voice.ndim > 1:
        voice = voice.mean(1)
    voice = np.pad(voice, (0, max(0, N - len(voice))))[:N]
    L, D = music()
    fx = sfx_bus()
    # ducking da trilha sob a voz (~ -8 dB)
    ve = envelope(voice, 0.03, 0.35)
    duck = 1 - 0.68 * np.clip(ve / (np.percentile(ve[ve > 1e-4], 60) + 1e-9), 0, 1)
    mus = (L + D) * duck[:, None]
    # nível: voz em destaque, trilha baixa
    v = np.stack([voice, voice], 1)
    mix = v * 1.0 + mus * 1.25 + fx * 0.5
    # fade final
    fo = int(0.6 * SR)
    mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
    mix /= np.abs(mix).max() / 0.95
    sf.write(os.path.join(ROOT, 'public', 'mix_pre.wav'), mix.astype(np.float32), SR, subtype='FLOAT')
    sf.write(os.path.join(ROOT, 'public', 'stem_music.wav'), (mus * 1.25).astype(np.float32), SR, subtype='FLOAT')
    sf.write(os.path.join(ROOT, 'public', 'stem_sfx.wav'), (fx * 0.5).astype(np.float32), SR, subtype='FLOAT')
    print('ok')


if __name__ == '__main__':
    main()
