"""Gera public/cut/NNNN.png (RGBA 1080x1920) para os frames da timeline em que a
pessoa aparece recortada. RGB vem de public/talent.mp4 (já alinhado/gradado) e o
alpha vem das mattes BiRefNet (uma por frame do vídeo original, 24 fps)."""
import os, subprocess, sys, numpy as np
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MATTES = sys.argv[1]
OUT = os.path.join(ROOT, 'public', 'cut'); os.makedirs(OUT, exist_ok=True)
# blocos da fala: (inicio_src, fim_src, deslocamento)
SEGS = [(0.0, 7.66, 0.40), (8.85, 14.20, 0.25), (19.28, 22.52, -4.73), (30.48, 33.33, -12.13)]
RANGES = [(0, 76), (436, 472), (581, 616)]  # frames de saída com recorte

def src_time(t):
    for s, e, o in SEGS:
        if s + o - 1e-6 <= t <= e + o + 0.6:
            return min(max(t - o, s), e)
    return 0.0

avail = sorted(int(f[:4]) for f in os.listdir(MATTES) if f.endswith('.png'))
tmp = os.path.join(OUT, '_rgb'); os.makedirs(tmp, exist_ok=True)
for a, b in RANGES:
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(ROOT, 'public', 'talent.mp4'), '-vf',
                    f'select=between(n\\,{a}\\,{b - 1})', '-vsync', '0', '-start_number', str(a),
                    os.path.join(tmp, '%04d.png')], check=True)
for a, b in RANGES:
    for f in range(a, b):
        st = src_time(f / 30)
        n = int(st * 24 + 0.5) + 1
        m = min(avail, key=lambda k: abs(k - n))
        rgb = Image.open(os.path.join(tmp, f'{f:04d}.png')).convert('RGB')
        al = Image.open(os.path.join(MATTES, f'{m:04d}.png')).convert('L').resize((1080, 1920), Image.BICUBIC)
        # leve contração + suavização da borda (evita halo do fundo)
        al = al.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
        a_np = np.asarray(al).astype(np.float32) / 255
        a_np = np.clip((a_np - 0.08) / 0.84, 0, 1)
        im = rgb.copy(); im.putalpha(Image.fromarray((a_np * 255).astype(np.uint8)))
        im.save(os.path.join(OUT, f'{f:04d}.png'), optimize=False, compress_level=3)
print('ok', len(avail), 'mattes')
