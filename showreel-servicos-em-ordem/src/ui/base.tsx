import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {C, F} from '../theme';
import {clamp, prog, rnd} from '../util';
import {interpolate} from 'remotion';

/* ---------- Fundo da marca: ink + brilhos + grid ---------- */
export const Bg: React.FC<{glow?: number; grid?: number; hue?: 'blue' | 'mint' | 'red'}> = ({
  glow = 1,
  grid = 0.5,
  hue = 'blue',
}) => {
  const f = useCurrentFrame();
  const g = hue === 'mint' ? '39,224,160' : hue === 'red' ? '255,92,121' : '61,123,255';
  const x1 = 30 + Math.sin(f / 70) * 12;
  const y1 = 22 + Math.cos(f / 90) * 8;
  const x2 = 75 + Math.cos(f / 80) * 10;
  return (
    <AbsoluteFill style={{background: C.ink, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 900px at ${x1}% ${y1}%, rgba(${g},${0.28 * glow}), transparent 60%),
                       radial-gradient(800px 800px at ${x2}% 88%, rgba(122,92,255,${0.16 * glow}), transparent 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: grid,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '90px 90px',
          backgroundPosition: `${-f * 0.6}px ${-f * 0.9}px`,
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)',
        }}
      />
    </AbsoluteFill>
  );
};

/* ---------- Grão de filme + vinheta (acabamento premium) ---------- */
export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.07}) => {
  const f = useCurrentFrame();
  const ox = Math.floor(rnd(f) * 256);
  const oy = Math.floor(rnd(f + 99) * 256);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill
        style={{
          backgroundImage: `url(${staticFile('noise.png')})`,
          backgroundPosition: `${ox}px ${oy}px`,
          opacity,
          mixBlendMode: 'overlay',
        }}
      />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)'}} />
    </AbsoluteFill>
  );
};

/* ---------- Vídeo do apresentador (talent.mp4 já está alinhado à timeline final) ---------- */
export const Talent: React.FC<{
  from: number;
  dur: number;
  style?: React.CSSProperties;
  videoStyle?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({from, dur, style, videoStyle, children}) => (
  <Sequence from={from} durationInFrames={dur} layout="none">
    <div style={{position: 'absolute', overflow: 'hidden', ...style}}>
      <OffthreadVideo
        src={staticFile('talent.mp4')}
        startFrom={from}
        muted
        style={{width: '100%', height: '100%', objectFit: 'cover', ...videoStyle}}
      />
      {children}
    </div>
  </Sequence>
);

/* ---------- Pessoa recortada (sequência PNG com alpha, indexada pelo frame global) ---------- */
export const CutoutAt: React.FC<{global: number; style?: React.CSSProperties; rim?: string}> = ({
  global,
  style,
  rim = C.blue,
}) => (
  <Img
    src={staticFile(`cut/${String(global).padStart(4, '0')}.png`)}
    style={{
      position: 'absolute',
      width: 1080,
      height: 1920,
      left: 0,
      top: 0,
      filter: `drop-shadow(0 0 30px ${rim}55) drop-shadow(0 30px 60px rgba(0,0,0,0.6))`,
      ...style,
    }}
  />
);

/* ---------- Glass card ---------- */
export const Glass: React.FC<{style?: React.CSSProperties; children?: React.ReactNode; strong?: boolean}> = ({
  style,
  children,
  strong,
}) => (
  <div
    style={{
      position: 'absolute',
      borderRadius: 36,
      background: strong
        ? 'linear-gradient(180deg, rgba(22,30,52,0.92), rgba(12,17,32,0.92))'
        : 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
      border: `1.5px solid ${C.line}`,
      boxShadow: '0 40px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
      backdropFilter: 'blur(24px)',
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);

/* ---------- Palavra com revelação por máscara ---------- */
export const MaskWord: React.FC<{
  text: string;
  at: number;
  f: number;
  size: number;
  color?: string;
  weight?: number;
  style?: React.CSSProperties;
  dur?: number;
  from?: 'bottom' | 'top';
  tracking?: number;
}> = ({text, at, f, size, color = C.text, weight = 800, style, dur = 12, from = 'bottom', tracking = -0.04}) => {
  const p = prog(f, at, dur);
  const y = (1 - p) * (from === 'bottom' ? 1.3 : -1.3) * size;
  return (
    <div style={{overflow: 'hidden', lineHeight: 1, paddingBottom: size * 0.08, ...style}}>
      <div
        style={{
          fontFamily: F.display,
          fontWeight: weight,
          fontSize: size,
          letterSpacing: `${tracking}em`,
          color,
          transform: `translateY(${y}px) skewY(${(1 - p) * 6}deg)`,
          whiteSpace: 'nowrap',
          filter: p < 1 ? `blur(${(1 - p) * 5}px)` : undefined,
        }}
      >
        {text}
      </div>
    </div>
  );
};

/* ---------- Letras entrando uma a uma ---------- */
export const Letters: React.FC<{
  text: string;
  at: number;
  f: number;
  size: number;
  color?: string;
  stagger?: number;
  weight?: number;
  style?: React.CSSProperties;
  tracking?: number;
}> = ({text, at, f, size, color = C.text, stagger = 1.2, weight = 800, style, tracking = -0.03}) => (
  <div style={{display: 'flex', fontFamily: F.display, fontWeight: weight, fontSize: size, lineHeight: 1, color, letterSpacing: `${tracking}em`, ...style}}>
    {text.split('').map((ch, i) => {
      const p = prog(f, at + i * stagger, 14);
      return (
        <span
          key={i}
          style={{
            display: 'inline-block',
            whiteSpace: 'pre',
            opacity: p,
            transform: `translateY(${(1 - p) * size * 0.5}px) scale(${0.6 + 0.4 * p})`,
            filter: `blur(${(1 - p) * 8}px)`,
          }}
        >
          {ch}
        </span>
      );
    })}
  </div>
);

/* ---------- Contador animado ---------- */
export const useCount = (f: number, at: number, dur: number, to: number, fromV = 0) => {
  const p = interpolate(f, [at, at + dur], [0, 1], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 4)});
  return fromV + (to - fromV) * p;
};

/* ---------- Flash de luz (transições) ---------- */
export const Flash: React.FC<{at: number; f: number; dur?: number; color?: string; max?: number}> = ({
  at,
  f,
  dur = 8,
  color = '255,255,255',
  max = 0.55,
}) => {
  const o = interpolate(f, [at - 2, at, at + dur], [0, max, 0], clamp);
  if (o <= 0) return null;
  return <AbsoluteFill style={{background: `rgba(${color},${o})`, mixBlendMode: 'screen', pointerEvents: 'none'}} />;
};

/* ---------- Ícone seta ---------- */
export const Arrow: React.FC<{dir: 'up' | 'down'; color: string; size?: number}> = ({dir, color, size = 40}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{transform: dir === 'down' ? 'rotate(180deg)' : undefined}}>
    <path d="M12 4 L20 13 H15 V20 H9 V13 H4 Z" fill={color} />
  </svg>
);

export const Check: React.FC<{p: number; size?: number; color?: string}> = ({p, size = 36, color = C.mint}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill={color} opacity={0.18 * p} />
    <path
      d="M6.5 12.5 L10.5 16.5 L17.5 8.5"
      fill="none"
      stroke={color}
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={20}
      strokeDashoffset={20 * (1 - p)}
    />
  </svg>
);
