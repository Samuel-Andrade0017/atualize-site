import React from 'react';
import {AbsoluteFill, interpolate, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {C, F, brl} from '../theme';
import {clamp, ease, easeInOut, lerp, prog, rnd, spr} from '../util';
import {Bg, Check, CutoutAt, Flash, Glass, Letters, MaskWord, useCount} from '../ui/base';
import {CashFlow, Dashboard, Kpi, LogoMark, MONTHS, IN, OUT, SALDO, TX, TxRow, Wordmark} from '../ui/finance';

/* =========================================================================
   S8 · CONTROLE FINANCEIRO (318 → 370)
   Dashboard entra em perspectiva 3D, câmera desliza sobre a interface.
   ========================================================================= */
export const FinanceUI: React.FC = () => {
  const lf = useCurrentFrame();
  const inP = spr(lf, 0, {damping: 20, stiffness: 90});
  const rx = lerp(38, 14, inP);
  const rz = lerp(-12, -4, inP);
  const drift = interpolate(lf, [0, 60], [0, -160], clamp);
  const exit = prog(lf, 44, 8, easeInOut);
  return (
    <AbsoluteFill>
      <Bg glow={1.1} grid={0.5} />
      <AbsoluteFill style={{perspective: 2200, perspectiveOrigin: '50% 30%'}}>
        <div
          style={{
            position: 'absolute',
            left: 60,
            top: 520 + (1 - inP) * 700 + drift,
            transform: `rotateX(${rx}deg) rotateZ(${rz}deg) scale(${lerp(1.05, 0.55, exit)})`,
            transformOrigin: '50% 0%',
            filter: `blur(${exit * 16}px)`,
            opacity: 1 - exit * 0.7,
          }}
        >
          <Dashboard f={lf} at={2} w={960} />
        </div>
      </AbsoluteFill>
      {/* título */}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(5,7,13,0.95) 0%, rgba(5,7,13,0.7) 22%, transparent 36%)'}} />
      <div style={{position: 'absolute', left: 80, top: 200, opacity: 1 - exit}}>
        <div style={{fontFamily: F.mono, fontSize: 26, color: C.blue2, letterSpacing: '0.18em', opacity: prog(lf, 0, 8), marginBottom: 12}}>
          ● SERVIÇOS EM ORDEM / FINANCEIRO
        </div>
        <MaskWord text="CONTROLE" at={0} f={lf} size={150} weight={900} />
        <MaskWord text="FINANCEIRO" at={6} f={lf} size={150} weight={900} color={C.blue} />
      </div>
      <Flash at={1} f={lf} dur={6} max={0.3} color="134,168,255" />
    </AbsoluteFill>
  );
};

/* =========================================================================
   S9 · MARCA (370 → 400) "Serviços em Ordem"
   ========================================================================= */
export const BrandHit: React.FC = () => {
  const lf = useCurrentFrame();
  const markP = spr(lf, 2, {damping: 12, stiffness: 140});
  const orderP = spr(lf, 8, {damping: 14, stiffness: 160});
  const wm = prog(lf, 9, 12);
  const ring = prog(lf, 8, 18);
  return (
    <AbsoluteFill>
      <Bg glow={1.4} grid={0.6} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div
          style={{
            position: 'absolute',
            width: 520 + ring * 600,
            height: 520 + ring * 600,
            borderRadius: 999,
            border: `2px solid rgba(134,168,255,${0.6 * (1 - ring)})`,
          }}
        />
        <div style={{transform: `scale(${lerp(0.4, 1, markP)}) translateY(-80px)`}}>
          <LogoMark p={orderP} size={230} />
        </div>
        <div style={{position: 'absolute', top: 1060, opacity: wm, transform: `translateY(${(1 - wm) * 40}px)`, filter: `blur(${(1 - wm) * 10}px)`}}>
          <Wordmark size={104} />
        </div>
      </AbsoluteFill>
      <Flash at={9} f={lf} dur={8} max={0.35} color="134,168,255" />
    </AbsoluteFill>
  );
};

/* =========================================================================
   S10 · FICAR POR DENTRO (400 → 436)
   Pessoa + interface ao mesmo tempo: cards de vidro em parallax.
   ========================================================================= */
export const Inside: React.FC = () => {
  const lf = useCurrentFrame();
  const z = interpolate(lf, [0, 36], [1.22, 1.08], {...clamp, easing: ease});
  const inP = prog(lf, 0, 8);
  const c1 = spr(lf, 3);
  const c2 = spr(lf, 8);
  const sal = useCount(lf, 5, 24, SALDO);
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <AbsoluteFill style={{transform: `scale(${z})`, transformOrigin: '50% 45%', filter: `blur(${(1 - inP) * 12}px)`}}>
        <OffthreadVideo src={staticFile('talent.mp4')} startFrom={400} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(5,7,13,0.55), transparent 30%, transparent 55%, rgba(5,7,13,0.85))'}} />
      {/* card saldo (frente, parallax rápido) */}
      <Glass
        style={{
          left: 560,
          top: 260 - lf * 1.4,
          width: 440,
          padding: 30,
          opacity: c1,
          transform: `translateX(${(1 - c1) * 300}px) rotate(${(1 - c1) * 8 + 3}deg)`,
          background: 'linear-gradient(180deg, rgba(20,28,50,0.72), rgba(10,15,30,0.72))',
        }}
      >
        <div style={{fontFamily: F.ui, fontWeight: 500, fontSize: 24, color: C.muted}}>Saldo do mês</div>
        <div style={{fontFamily: F.display, fontWeight: 700, fontSize: 56, color: C.text, letterSpacing: '-0.03em', marginTop: 8, fontVariantNumeric: 'tabular-nums'}}>{brl(sal)}</div>
        <div style={{fontFamily: F.ui, fontWeight: 600, fontSize: 20, color: C.mint, marginTop: 8}}>▲ positivo</div>
      </Glass>
      {/* card gráfico (trás, parallax lento, levemente desfocado = profundidade) */}
      <Glass
        style={{
          left: 70,
          top: 460 - lf * 0.6,
          width: 420,
          padding: 24,
          opacity: c2,
          transform: `translateX(${(1 - c2) * -300}px) rotate(${-3 - (1 - c2) * 8}deg)`,
          filter: 'blur(1.5px)',
          background: 'linear-gradient(180deg, rgba(20,28,50,0.65), rgba(10,15,30,0.65))',
        }}
      >
        <div style={{fontFamily: F.ui, fontWeight: 600, fontSize: 22, color: C.text, marginBottom: 10}}>Fluxo de caixa</div>
        <CashFlow f={lf} at={8} w={372} h={170} labels={false} line={prog(lf, 12, 20)} />
      </Glass>
    </AbsoluteFill>
  );
};

/* =========================================================================
   S11 · TODA A SUA OPERAÇÃO (436 → 470) — pessoa recortada + módulos em órbita
   ========================================================================= */
const MODS = [
  {t: 'Operação', i: '⚙', c: C.blue2},
  {t: 'Clientes', i: '◉', c: C.amber},
  {t: 'Financeiro', i: '$', c: C.mint},
];
export const Operation: React.FC = () => {
  const lf = useCurrentFrame();
  const g = 436 + lf;
  const push = interpolate(lf, [0, 34], [1.0, 1.08], clamp);
  const exit = prog(lf, 26, 5, easeInOut);
  return (
    <AbsoluteFill style={{transform: `translateX(${-exit * 1080}px)`, filter: `blur(${exit * 10}px)`}}>
      <Bg glow={1.2} grid={0.6} />
      <div style={{position: 'absolute', left: 80, top: 220}}>
        <MaskWord text="TODA A SUA" at={0} f={lf} size={96} weight={800} color="rgba(244,246,251,0.8)" />
        <MaskWord text="OPERAÇÃO" at={5} f={lf} size={180} weight={900} />
      </div>
      {/* órbita 3D atrás da pessoa */}
      <AbsoluteFill style={{perspective: 1600}}>
        {MODS.map((m, i) => {
          const ang = (i / 3) * Math.PI * 2 + lf * 0.045 - 0.6;
          const x = 540 + Math.sin(ang) * 380 - 170;
          const zz = Math.cos(ang);
          const y = 900 + zz * 60;
          const p = spr(lf, 2 + i * 3);
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: 340,
                padding: '26px 28px',
                borderRadius: 30,
                background: 'linear-gradient(180deg, rgba(24,32,58,0.92), rgba(12,17,32,0.92))',
                border: `1.5px solid ${C.line}`,
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                transform: `scale(${(0.75 + zz * 0.18) * p})`,
                zIndex: zz < 0 ? 1 : 3,
                filter: `blur(${zz < 0 ? 3 : 0}px)`,
                opacity: p * (zz < 0 ? 0.7 : 1),
                display: 'flex',
                alignItems: 'center',
                gap: 18,
              }}
            >
              <div style={{width: 64, height: 64, borderRadius: 18, background: `${m.c}26`, color: m.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, fontWeight: 800, fontFamily: F.display}}>{m.i}</div>
              <div style={{fontFamily: F.display, fontWeight: 700, fontSize: 40, color: C.text, letterSpacing: '-0.02em'}}>{m.t}</div>
            </div>
          );
        })}
        <div style={{position: 'absolute', inset: 0, zIndex: 2, transform: `scale(${push})`, transformOrigin: '50% 70%'}}>
          <CutoutAt global={g} style={{top: 230}} />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 78%, #05070D 96%)'}} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* =========================================================================
   S12–S13 · MÊS A MÊS → FLUXO DE CAIXA (470 → 551)
   ========================================================================= */
export const MonthByMonth: React.FC = () => {
  const lf = useCurrentFrame();
  const inP = prog(lf, 0, 6);
  const hi = Math.min(8, Math.floor(interpolate(lf, [6, 44], [0, 8.99], clamp)));
  const trackX = interpolate(lf, [6, 44], [0, -8 * 200], {...clamp, easing: easeInOut});
  const flow = prog(lf, 56, 10, easeInOut); // vira "FLUXO DE CAIXA"
  const line = prog(lf, 60, 18);
  const val = useCount(lf, 6, 40, IN[8] - OUT[8], IN[0] - OUT[0]);
  return (
    <AbsoluteFill style={{transform: `translateX(${(1 - inP) * 1080}px)`, filter: `blur(${(1 - inP) * 10}px)`}}>
      <Bg glow={1} grid={0.5} />
      {/* título troca */}
      <div style={{position: 'absolute', left: 80, top: 220, height: 380}}>
        {flow < 0.5 ? (
          <div style={{opacity: 1 - flow * 2}}>
            <MaskWord text="MÊS A MÊS" at={14} f={lf} size={170} weight={900} />
            <MaskWord text="DO FINANCEIRO" at={30} f={lf} size={96} weight={800} color={C.blue} />
          </div>
        ) : (
          <div>
            <MaskWord text="FLUXO" at={57} f={lf} size={170} weight={900} />
            <MaskWord text="DE CAIXA" at={61} f={lf} size={170} weight={900} color={C.blue} />
          </div>
        )}
      </div>
      {/* trilho de meses (tracking) */}
      <div style={{position: 'absolute', left: 440, top: 640, display: 'flex', gap: 20, transform: `translateX(${trackX}px)`, opacity: 1 - flow}}>
        {MONTHS.map((m, i) => (
          <div
            key={m}
            style={{
              width: 180,
              padding: '18px 0',
              textAlign: 'center',
              borderRadius: 99,
              fontFamily: F.display,
              fontWeight: 700,
              fontSize: 40,
              background: i === hi ? C.blue : 'rgba(255,255,255,0.05)',
              color: i === hi ? '#fff' : C.muted,
              border: `1.5px solid ${i === hi ? C.blue : C.line}`,
              boxShadow: i === hi ? `0 0 40px ${C.blue}88` : 'none',
              transform: `scale(${i === hi ? 1.08 : 1})`,
            }}
          >
            {m}
          </div>
        ))}
      </div>
      {/* painel do gráfico */}
      <Glass
        strong
        style={{
          left: 60,
          top: lerp(790, 660, flow),
          width: 960,
          padding: 34,
          transform: `scale(${lerp(1, 1.0, flow)})`,
        }}
      >
        <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
          <div>
            <div style={{fontFamily: F.ui, fontWeight: 500, fontSize: 26, color: C.muted}}>Saldo · {MONTHS[hi]} 2026</div>
            <div style={{fontFamily: F.display, fontWeight: 700, fontSize: 72, color: C.text, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums', marginTop: 6}}>
              {brl(val * 1000)}
            </div>
          </div>
          <div style={{fontFamily: F.mono, fontSize: 22, color: C.mint, paddingBottom: 14}}>▲ ENTRADAS &gt; SAÍDAS</div>
        </div>
        <div style={{marginTop: 30}}>
          <CashFlow f={lf} at={4} w={892} h={520} highlight={flow > 0.5 ? -1 : hi} line={line} />
        </div>
      </Glass>
      <Flash at={56} f={lf} dur={6} max={0.2} color="134,168,255" />
    </AbsoluteFill>
  );
};

/* =========================================================================
   S14 · NO FINAL DO MÊS (551 → 581) — retorno à pessoa + callback do dia 30
   ========================================================================= */
export const EndOfMonth: React.FC = () => {
  const lf = useCurrentFrame();
  const z = interpolate(lf, [0, 6, 30], [1.5, 1.28, 1.22], {...clamp, easing: ease});
  const chip = spr(lf, 14, {damping: 11, stiffness: 200});
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <AbsoluteFill style={{transform: `scale(${z})`, transformOrigin: '50% 44%'}}>
        <OffthreadVideo src={staticFile('talent.mp4')} startFrom={551} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(5,7,13,0.5), transparent 25%, transparent 60%, rgba(5,7,13,0.8))'}} />
      <div
        style={{
          position: 'absolute',
          left: 90,
          top: 250,
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          padding: '18px 30px 18px 18px',
          borderRadius: 34,
          background: 'rgba(12,17,32,0.8)',
          border: `1.5px solid ${C.line}`,
          backdropFilter: 'blur(20px)',
          transform: `scale(${chip}) rotate(${(1 - chip) * -10}deg)`,
          transformOrigin: 'left center',
        }}
      >
        <div style={{width: 96, height: 96, borderRadius: 24, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontWeight: 800, fontSize: 52, color: '#fff', boxShadow: `0 0 40px ${C.blue}88`}}>30</div>
        <div>
          <div style={{fontFamily: F.ui, fontWeight: 500, fontSize: 24, color: C.muted}}>Setembro</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, fontFamily: F.display, fontWeight: 700, fontSize: 38, color: C.text}}>
            Saldo {brl(SALDO)} <Check p={prog(lf, 20, 10)} size={40} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================================
   S15 · NÃO FICAR PERDIDO COM AS SUAS CONTAS (581 → 636)
   Letras de "PERDIDO" espalhadas → entram em ordem; lista de contas com checks.
   ========================================================================= */
export const NotLost: React.FC = () => {
  const lf = useCurrentFrame();
  const g = 581 + lf;
  const order = spr(lf, 14, {damping: 13, stiffness: 150});
  const toList = prog(lf, 25, 9, easeInOut);
  const word = 'PERDIDO';
  return (
    <AbsoluteFill>
      <Bg glow={1} grid={0.5} hue={toList > 0.5 ? 'mint' : 'blue'} />
      {/* Parte 1: "não ficar perdido" */}
      <AbsoluteFill style={{opacity: 1 - toList, transform: `scale(${1 - toList * 0.2})`, filter: `blur(${toList * 12}px)`}}>
        <div style={{position: 'absolute', left: 80, top: 230}}>
          <MaskWord text="NÃO FICAR" at={0} f={lf} size={110} weight={800} color="rgba(244,246,251,0.85)" />
        </div>
        <div style={{position: 'absolute', left: 70, top: 380, display: 'flex'}}>
          {word.split('').map((ch, i) => {
            const k = 1 - order;
            const dx = (rnd(i + 1) - 0.5) * 520 * k;
            const dy = (rnd(i + 7) - 0.5) * 700 * k;
            const r = (rnd(i + 3) - 0.5) * 120 * k;
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  fontFamily: F.display,
                  fontWeight: 900,
                  fontSize: 200,
                  letterSpacing: '-0.04em',
                  color: order > 0.9 ? C.text : 'transparent',
                  WebkitTextStroke: order > 0.9 ? undefined : '3px rgba(255,92,121,0.9)',
                  transform: `translate(${dx}px, ${dy}px) rotate(${r}deg)`,
                  opacity: prog(lf, i * 0.8, 6),
                  lineHeight: 1,
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
        <AbsoluteFill style={{zIndex: 2}}>
          {toList < 1 && <CutoutAt global={g} style={{top: 260}} />}
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 80%, #05070D 97%)'}} />
        </AbsoluteFill>
      </AbsoluteFill>
      {/* Parte 2: "com as suas contas" */}
      {toList > 0 && (
        <AbsoluteFill style={{opacity: toList}}>
          <div style={{position: 'absolute', left: 80, top: 230}}>
            <MaskWord text="SUAS" at={26} f={lf} size={120} weight={800} color="rgba(244,246,251,0.85)" />
            <MaskWord text="CONTAS" at={30} f={lf} size={190} weight={900} color={C.mint} />
          </div>
          <div style={{position: 'absolute', left: 90, top: 690, display: 'flex', flexDirection: 'column', gap: 16}}>
            {TX.map((t, i) => (
              <TxRow key={i} tx={t} f={lf} at={28 + i * 2} checkAt={34 + i * 3} w={900} />
            ))}
          </div>
        </AbsoluteFill>
      )}
      <Flash at={14} f={lf} dur={6} max={0.2} color="134,168,255" />
    </AbsoluteFill>
  );
};
