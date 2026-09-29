import React from 'react';
import {AbsoluteFill, interpolate, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {C, F, s} from '../theme';
import {clamp, ease, easeInOut, lerp, prog, rnd, spr} from '../util';
import {Bg, CutoutAt, Flash, Glass, MaskWord, useCount} from '../ui/base';
import {Kpi, RECEITA, DESPESA, IN, OUT} from '../ui/finance';

/* =========================================================================
   S1 · HOOK (0 → 72)  "Você que trabalha com prestação de serviço"
   Pessoa recortada à frente de tipografia gigante sincronizada com a fala.
   ========================================================================= */
export const Hook: React.FC = () => {
  const f = useCurrentFrame(); // global == local (from 0)
  const iris = prog(f, 0, 14, ease);
  const push = interpolate(f, [0, 80], [1.12, 1.0], {...clamp, easing: ease});
  const textPar = interpolate(f, [0, 80], [0, -40], clamp);
  const lines: {t: string; at: number; style: 'solid' | 'outline' | 'blue'}[] = [
    {t: 'VOCÊ QUE', at: 12, style: 'outline'},
    {t: 'TRABALHA', at: 25, style: 'solid'},
    {t: 'COM PRESTAÇÃO', at: 40, style: 'outline'},
    {t: 'DE SERVIÇO', at: 56, style: 'blue'},
  ];
  // Saída: tudo sobe e desfoca (whip) para a cena do calendário
  const out = prog(f, 66, 8, easeInOut);
  return (
    <AbsoluteFill style={{transform: `translateY(${-out * 300}px)`, filter: `blur(${out * 14}px)`, opacity: 1 - out * 0.6}}>
      <Bg glow={1.2} grid={0.6} />
      {/* luz de fundo atrás da cabeça */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(520px 520px at 50% 50%, rgba(61,123,255,${0.45 * iris}), transparent 70%)`,
        }}
      />
      <AbsoluteFill style={{transform: `translateY(${textPar}px)`}}>
        <div style={{position: 'absolute', left: 70, top: 190}}>
          {lines.map((l, i) => (
            <MaskWord
              key={i}
              text={l.t}
              at={l.at}
              f={f}
              size={i === 2 ? 110 : 156}
              weight={900}
              tracking={-0.045}
              color={l.style === 'blue' ? C.blue : l.style === 'solid' ? C.text : 'transparent'}
              style={{
                marginBottom: 6,
                WebkitTextStroke: l.style === 'outline' ? '2.5px rgba(244,246,251,0.85)' : undefined,
              }}
            />
          ))}
        </div>
      </AbsoluteFill>
      {/* pessoa recortada */}
      <AbsoluteFill style={{transform: `scale(${push}) translateY(${(1 - iris) * 120}px)`, transformOrigin: '50% 60%', opacity: iris}}>
        <CutoutAt global={f} style={{top: 140}} />
      </AbsoluteFill>
      {/* chão escuro para o corte inferior do recorte */}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, transparent 64%, rgba(5,7,13,0.85) 86%, #05070D 97%)'}} />
      {/* abertura em íris horizontal */}
      <AbsoluteFill
        style={{
          background: C.ink,
          clipPath: `inset(${50 * iris}% 0 ${50 * iris}% 0)`,
          opacity: iris < 1 ? 1 : 0,
          mixBlendMode: 'normal',
          transform: 'scaleY(-1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 959,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${C.blue2}, transparent)`,
          opacity: interpolate(f, [0, 4, 14], [0, 1, 0], clamp),
          transform: `scaleX(${prog(f, 0, 8)})`,
          boxShadow: `0 0 30px ${C.blue}`,
        }}
      />
    </AbsoluteFill>
  );
};

/* =========================================================================
   S2 · MÊS (72 → 132)  "trabalha o mês inteiro, você no final do mês"
   Card de vídeo + calendário correndo em speed-ramp até o dia 30.
   ========================================================================= */
export const Month: React.FC = () => {
  const lf = useCurrentFrame();
  const g = 72 + lf;
  const inP = prog(lf, 0, 12);
  const days = 30;
  // speed-ramp: acelera no meio e desacelera no dia 30
  const run = interpolate(lf, [4, 40], [0, days], {...clamp, easing: easeInOut});
  const final = prog(lf, 40, 12);
  const cardY = lerp(260, 0, inP);
  return (
    <AbsoluteFill>
      <Bg glow={0.9} grid={0.4} />
      {/* vídeo em card */}
      <div
        style={{
          position: 'absolute',
          left: 90,
          top: 190 + cardY,
          width: 900,
          height: 760,
          borderRadius: 44,
          overflow: 'hidden',
          border: `1.5px solid ${C.line}`,
          boxShadow: '0 60px 120px rgba(0,0,0,0.55)',
          transform: `scale(${lerp(1.25, 1, inP)})`,
          filter: `blur(${(1 - inP) * 10}px)`,
        }}
      >
        <OffthreadVideo
          src={staticFile('talent.mp4')}
          startFrom={72}
          muted
          style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 46%', transform: `scale(${lerp(1.18, 1.05, lf / 60)})`}}
        />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(5,7,13,0.75))'}} />
        <div style={{position: 'absolute', left: 44, bottom: 34}}>
          <MaskWord text="O MÊS INTEIRO" at={6} f={lf} size={84} weight={900} />
        </div>
      </div>
      {/* calendário */}
      <Glass
        strong
        style={{
          left: 90,
          top: 1000 + (1 - prog(lf, 4, 14)) * 400,
          width: 900,
          height: 560,
          padding: 36,
        }}
      >
        <div style={{display: 'flex', alignItems: 'baseline', fontFamily: F.display}}>
          <div style={{fontWeight: 700, fontSize: 40, color: C.text, letterSpacing: '-0.02em'}}>Setembro</div>
          <div style={{fontWeight: 500, fontSize: 30, color: C.muted, marginLeft: 12}}>2026</div>
          <div style={{flex: 1}} />
          <div style={{fontFamily: F.mono, fontSize: 24, color: C.blue2}}>DIA {String(Math.max(1, Math.ceil(run))).padStart(2, '0')}</div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12, marginTop: 28}}>
          {Array.from({length: 35}).map((_, i) => {
            const d = i - 1; // setembro/2026 começa numa terça
            const valid = d >= 0 && d < days;
            const lit = valid && run > d;
            const isLast = d === days - 1;
            const litP = valid ? interpolate(run, [d, d + 1], [0, 1], clamp) : 0;
            const pop = isLast ? spr(lf, 40, {damping: 9, stiffness: 220}) : 0;
            return (
              <div
                key={i}
                style={{
                  height: 70,
                  borderRadius: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: F.ui,
                  fontWeight: 600,
                  fontSize: 26,
                  color: !valid ? 'transparent' : lit ? '#fff' : C.dim,
                  background: !valid
                    ? 'transparent'
                    : isLast && final > 0
                    ? C.blue
                    : `rgba(61,123,255,${0.08 + 0.32 * litP * (1 - final * 0.6)})`,
                  border: valid ? `1.5px solid rgba(255,255,255,${0.05 + 0.1 * litP})` : 'none',
                  transform: `scale(${1 + pop * 0.25})`,
                  boxShadow: isLast && final > 0 ? `0 0 ${40 * final}px ${C.blue}` : 'none',
                  position: 'relative',
                  zIndex: isLast ? 2 : 1,
                }}
              >
                {valid ? d + 1 : ''}
              </div>
            );
          })}
        </div>
      </Glass>
      {/* etiqueta "final do mês" */}
      <div
        style={{
          position: 'absolute',
          right: 110,
          top: 1500,
          opacity: final,
          transform: `translateY(${(1 - final) * 30}px)`,
          padding: '14px 26px',
          borderRadius: 99,
          background: C.text,
          color: C.ink,
          fontFamily: F.display,
          fontWeight: 800,
          fontSize: 34,
          letterSpacing: '-0.02em',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        FINAL DO MÊS
      </div>
      <Flash at={40} f={lf} dur={6} max={0.18} color="61,123,255" />
    </AbsoluteFill>
  );
};

/* =========================================================================
   S3–S5 · PERGUNTA DO DINHEIRO (132 → 242)
   "sabe realmente quanto que entrou de receita, quanto que teve de despesa?"
   Punch-in no rosto → vídeo encolhe (FLIP) para o topo → Receitas → Despesas.
   ========================================================================= */
export const MoneyQuestion: React.FC = () => {
  const lf = useCurrentFrame();
  const g = 132 + lf;
  // caixa do vídeo: tela cheia (punch-in) -> card no topo
  const k = prog(lf, 22, 12, easeInOut);
  const box = {
    x: lerp(0, 90, k),
    y: lerp(0, 170, k),
    w: lerp(1080, 900, k),
    h: lerp(1920, 620, k),
    r: lerp(0, 44, k),
  };
  const punch = interpolate(lf, [0, 5, 22], [1.55, 1.34, 1.3], {...clamp, easing: ease});
  const vidScale = lerp(punch, 1.1, k);
  const isDesp = lf >= 66; // 198
  const recP = spr(lf, 30);
  const despP = spr(lf, 66);
  const recWord = 44; // "receita" 5.85s → 176 - 132
  const despWord = 95; // "despesa" 7.55s → 227 - 132
  const shake = lf >= despWord && lf < despWord + 8 ? Math.sin(lf * 3) * (despWord + 8 - lf) * 1.4 : 0;
  return (
    <AbsoluteFill>
      <Bg glow={1} grid={0.4} hue={isDesp ? 'red' : 'mint'} />
      <div
        style={{
          position: 'absolute',
          left: box.x,
          top: box.y,
          width: box.w,
          height: box.h,
          borderRadius: box.r,
          overflow: 'hidden',
          boxShadow: k > 0 ? '0 60px 120px rgba(0,0,0,0.55)' : 'none',
          border: k > 0.5 ? `1.5px solid ${C.line}` : 'none',
          transform: `translateX(${shake}px)`,
        }}
      >
        <OffthreadVideo
          src={staticFile('talent.mp4')}
          startFrom={132}
          muted
          style={{
            position: 'absolute',
            width: 1080,
            height: 1920,
            left: (box.w - 1080) / 2,
            top: lerp(0, (box.h - 1920) / 2 + 60, k),
            transform: `scale(${vidScale})`,
            transformOrigin: '50% 47%',
          }}
        />
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 55%, rgba(5,7,13,${0.35 + 0.4 * k}))`}} />
      </div>

      {/* "VOCÊ SABE REALMENTE?" durante o punch-in */}
      {lf < 34 && (
        <AbsoluteFill style={{opacity: 1 - prog(lf, 24, 8)}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 1240, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <MaskWord text="VOCÊ SABE" at={0} f={lf} size={72} weight={700} color="rgba(244,246,251,0.85)" />
            <MaskWord text="REALMENTE?" at={9} f={lf} size={150} weight={900} />
          </div>
        </AbsoluteFill>
      )}

      {/* pergunta pequena */}
      {lf >= 26 && lf < 66 && (
        <div style={{position: 'absolute', left: 90, top: 840, fontFamily: F.mono, fontSize: 26, color: C.muted, letterSpacing: '0.12em', opacity: prog(lf, 26, 8)}}>
          {isDesp ? 'QUANTO SAIU?' : 'QUANTO ENTROU?'}
        </div>
      )}

      {/* RECEITAS */}
      {lf >= 28 && (
        <div
          style={{
            position: 'absolute',
            left: 90,
            top: lerp(900, 700, despP),
            transform: `scale(${lerp(1, 0.55, despP)})`,
            transformOrigin: 'left top',
            opacity: lerp(1, 0.55, despP),
          }}
        >
          <div style={{height: 180, marginBottom: 10, marginTop: 20}}>
            {lf >= recWord - 2 && despP < 0.5 && (
              <MaskWord text="RECEITAS" at={recWord - 2} f={lf} size={170} weight={900} color={C.mint} dur={8} />
            )}
          </div>
          <Kpi f={lf} at={30} label="Receitas do mês" value={RECEITA} color={C.mint} dir="up" delta="Entradas · Setembro" w={900} big countDur={34} />
          <MiniBars f={lf} at={36} data={IN} color={C.mint} />
        </div>
      )}

      {/* DESPESAS */}
      {lf >= 66 && (
        <div style={{position: 'absolute', left: 90, top: 1290, opacity: Math.min(1, despP * 1.5), transform: `translateY(${(1 - despP) * 200}px)`}}>
          <div style={{position: 'absolute', top: -196}}>
            {lf >= despWord - 2 && <MaskWord text="DESPESAS" at={despWord - 2} f={lf} size={170} weight={900} color={C.red} dur={8} />}
          </div>
          <Kpi f={lf} at={66} label="Despesas do mês" value={DESPESA} color={C.red} dir="down" delta="Saídas · Setembro" w={900} big countDur={30} />
          <MiniBars f={lf} at={70} data={OUT} color={C.red} />
        </div>
      )}
      <Flash at={recWord} f={lf} dur={6} max={0.16} color="39,224,160" />
      <Flash at={despWord} f={lf} dur={6} max={0.2} color="255,92,121" />
    </AbsoluteFill>
  );
};

const MiniBars: React.FC<{f: number; at: number; data: number[]; color: string}> = ({f, at, data, color}) => (
  <div style={{display: 'flex', alignItems: 'flex-end', gap: 14, height: 120, marginTop: 22, paddingLeft: 6}}>
    {data.map((v, i) => {
      const p = spr(f, at + i * 1.6, {damping: 13});
      return (
        <div
          key={i}
          style={{
            width: 80,
            height: (v / 50) * 120 * p,
            borderRadius: 12,
            background: i === data.length - 1 ? color : `${color}44`,
            boxShadow: i === data.length - 1 ? `0 0 30px ${color}88` : 'none',
          }}
        />
      );
    })}
  </div>
);

/* =========================================================================
   S6–S7 · CAOS → ORDEM (242 → 318)
   Cartões de valores flutuando sem controle; no impacto (273) tudo se alinha
   num grid — "em ordem" — com a pessoa no centro. "Vou te mostrar como funciona"
   ========================================================================= */
const CHIPS = [
  {t: '+ R$ 1.850', c: C.mint},
  {t: '− R$ 640', c: C.red},
  {t: '+ R$ 3.200', c: C.mint},
  {t: '− R$ 380', c: C.red},
  {t: '− R$ 2.100', c: C.red},
  {t: '+ R$ 950', c: C.mint},
  {t: '− R$ 1.120', c: C.red},
  {t: '+ R$ 2.740', c: C.mint},
  {t: '− R$ 415', c: C.red},
  {t: '+ R$ 1.300', c: C.mint},
];
export const ChaosToOrder: React.FC = () => {
  const lf = useCurrentFrame();
  const snapAt = 31; // global 273
  const snap = spr(lf, snapAt, {damping: 15, stiffness: 190});
  const riser = interpolate(lf, [0, snapAt], [0, 1], clamp);
  // grid alvo: 2 colunas de cada lado + faixa inferior
  const targets = [
    [90, 250], [560, 250], [90, 400], [560, 400],
    [90, 1290], [560, 1290], [90, 1440], [560, 1440], [90, 1590], [560, 1590],
  ];
  const zoomOut = prog(lf, 66, 10, easeInOut); // mergulho para o dashboard
  return (
    <AbsoluteFill style={{transform: `scale(${1 + zoomOut * 1.6})`, transformOrigin: '50% 48%', filter: `blur(${zoomOut * 18}px)`, opacity: 1 - zoomOut}}>
      <Bg glow={0.8 + riser * 0.6} grid={0.3 + snap * 0.5} />
      {/* ponto de interrogação gigante */}
      {lf < snapAt + 4 && (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: 1 - prog(lf, snapAt, 4)}}>
          <div
            style={{
              fontFamily: F.display,
              fontWeight: 900,
              fontSize: 900,
              color: 'transparent',
              WebkitTextStroke: `4px rgba(244,246,251,${0.25 + riser * 0.5})`,
              transform: `scale(${0.8 + riser * 0.35}) rotate(${(1 - riser) * -8}deg)`,
              lineHeight: 1,
            }}
          >
            ?
          </div>
        </AbsoluteFill>
      )}
      {CHIPS.map((c, i) => {
        const a = lf / (14 + rnd(i) * 10) + i;
        const cx = 540 + Math.cos(a) * (220 + rnd(i + 5) * 260) - 215;
        const cy = 960 + Math.sin(a * 1.3) * (380 + rnd(i + 9) * 380) - 60;
        const rot = Math.sin(a * 2) * 25;
        const tx = targets[i][0];
        const ty = targets[i][1];
        const x = lerp(cx, tx, snap);
        const y = lerp(cy, ty, snap);
        const appear = prog(lf, i * 1.2, 8);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 430,
              height: 120,
              borderRadius: 28,
              display: 'flex',
              alignItems: 'center',
              padding: '0 30px',
              gap: 18,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))',
              border: `1.5px solid ${C.line}`,
              boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
              transform: `rotate(${rot * (1 - snap)}deg) scale(${appear})`,
              filter: `blur(${(1 - snap) * (rnd(i + 3) > 0.6 ? 5 : 0)}px)`,
              fontFamily: F.display,
              fontWeight: 700,
              fontSize: 44,
              color: C.text,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <div style={{width: 16, height: 16, borderRadius: 9, background: c.c, boxShadow: `0 0 18px ${c.c}`}} />
            {c.t}
          </div>
        );
      })}
      {/* pessoa ao centro após o impacto */}
      <div
        style={{
          position: 'absolute',
          left: 90,
          top: 560,
          width: 900,
          height: 700,
          borderRadius: 44,
          overflow: 'hidden',
          border: `1.5px solid rgba(255,255,255,0.14)`,
          boxShadow: `0 0 0 ${10 * snap}px rgba(61,123,255,0.12), 0 60px 120px rgba(0,0,0,0.6)`,
          transform: `scale(${lerp(0.3, 1, snap)})`,
          opacity: Math.min(1, snap * 1.4),
        }}
      >
        <OffthreadVideo
          src={staticFile('talent.mp4')}
          startFrom={242}
          muted
          style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 45%', transform: `scale(${1.05 + lf * 0.001})`}}
        />
      </div>
      <Flash at={snapAt} f={lf} dur={7} max={0.45} color="134,168,255" />
    </AbsoluteFill>
  );
};
