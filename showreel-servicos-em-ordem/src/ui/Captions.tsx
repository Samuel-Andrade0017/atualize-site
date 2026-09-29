import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, F, FPS} from '../theme';
import {prog, spr} from '../util';
import {PHRASES, WORDS} from '../words';

/**
 * Legenda palavra-a-palavra. `hide` = intervalos (frames) em que a tipografia cinética
 * já está dizendo a mesma coisa em tela — evitamos texto duplicado.
 */
export const Captions: React.FC<{hide: [number, number][]; y?: (f: number) => number}> = ({hide, y}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (hide.some(([a, b]) => f >= a && f < b)) return null;
  const idx = PHRASES.findIndex((ph) => {
    const a = WORDS[ph[0]].a - 0.08;
    const b = WORDS[ph[ph.length - 1]].b + 0.25;
    return t >= a && t < b;
  });
  if (idx < 0) return null;
  const ph = PHRASES[idx];
  const start = Math.round((WORDS[ph[0]].a - 0.08) * FPS);
  const top = y ? y(f) : 1290;
  return (
    <div
      style={{
        position: 'absolute',
        left: 90,
        right: 150,
        top,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0 16px',
        transform: `translateY(${(1 - prog(f, start, 6)) * 20}px)`,
      }}
    >
      {ph.map((wi) => {
        const w = WORDS[wi];
        const on = t >= w.a - 0.04;
        const active = t >= w.a - 0.04 && t < w.b + 0.05;
        const p = spr(f, Math.round((w.a - 0.04) * FPS), {damping: 12, stiffness: 260});
        return (
          <span
            key={wi}
            style={{
              fontFamily: F.display,
              fontWeight: 800,
              fontSize: 62,
              letterSpacing: '-0.025em',
              lineHeight: 1.18,
              color: active ? '#fff' : on ? 'rgba(244,246,251,0.92)' : 'rgba(244,246,251,0.0)',
              textShadow: '0 4px 30px rgba(0,0,0,0.65), 0 2px 6px rgba(0,0,0,0.5)',
              transform: `translateY(${(1 - p) * 18}px) scale(${0.85 + 0.15 * p})`,
              display: 'inline-block',
              position: 'relative',
              isolation: 'isolate',
              padding: '0 6px',
            }}
          >
            {active && (
              <span
                style={{
                  position: 'absolute',
                  inset: '6px -2px 2px',
                  borderRadius: 14,
                  background: C.blue,
                  zIndex: -1,
                  boxShadow: `0 10px 30px ${C.blue}88`,
                }}
              />
            )}
            {w.w}
          </span>
        );
      })}
    </div>
  );
};
