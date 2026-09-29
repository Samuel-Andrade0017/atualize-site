"""Completa as mattes entre keyframes BiRefNet usando optical flow (Farneback).
uso: python3 interp_mattes.py <src_frames_dir> <mattes_keyframes_dir> <saida_dir>"""
import os, sys, cv2, numpy as np
SRC, KEY, OUT = sys.argv[1:4]
os.makedirs(OUT, exist_ok=True)
RANGES = [(0.0, 2.45), (19.25, 20.75), (31.4, 32.55)]
keys = sorted(int(f[:4]) for f in os.listdir(KEY) if f.endswith('.png'))
gray = lambda n: cv2.cvtColor(cv2.imread(f'{SRC}/{n:04d}.png'), cv2.COLOR_BGR2GRAY)
mask = lambda n: cv2.imread(f'{KEY}/{n:04d}.png', cv2.IMREAD_GRAYSCALE).astype(np.float32)

def warp(n, k):
    fl = cv2.calcOpticalFlowFarneback(gray(n), gray(k), None, 0.5, 4, 21, 5, 7, 1.5, 0)
    h, w = fl.shape[:2]
    gx, gy = np.meshgrid(np.arange(w), np.arange(h))
    return cv2.remap(mask(k), (gx + fl[..., 0]).astype(np.float32), (gy + fl[..., 1]).astype(np.float32), cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)

for s, e in RANGES:
    a, b = int(s * 24) + 1, int(e * 24) + 1
    ks = [k for k in keys if a <= k <= b]
    for n in range(a, b + 1):
        if n in ks:
            m = mask(n)
        else:
            k0 = max([k for k in ks if k < n], default=None)
            k1 = min([k for k in ks if k > n], default=None)
            if k0 is None or k1 is None:
                m = warp(n, k0 if k1 is None else k1)
            else:
                w1 = (n - k0) / (k1 - k0)
                m = warp(n, k0) * (1 - w1) + warp(n, k1) * w1
        cv2.imwrite(f'{OUT}/{n:04d}.png', np.clip(m, 0, 255).astype(np.uint8))
print('ok')
