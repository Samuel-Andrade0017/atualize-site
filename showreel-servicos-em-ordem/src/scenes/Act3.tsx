import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, F, brl} from '../theme';
import {clamp, ease, easeInOut, lerp, prog, spr} from '../util';
import {Bg, Flash, Glass, Letters, MaskWord, useCount} from '../ui/base';
import {CashFlow, Dashboard, DESPESA, Kpi, LogoMark, RECEITA, SALDO, TX, TxRow, Wordmark} from '../ui/finance';

/* =========================================================================
   M1 · RAJADA (636 → 680): RECEITAS / DESPESAS / SALDO / FLUXO DE CAIXA
   ========================================================================= */
const RAPID = [
  {t: 'RECEITAS', v: RECEITA, c: C.mint, sign: '+', hue: '39,224,160'},
  {t: 'DESPESAS', v: DESPESA, c: C.red, sign: '−', hue: '255,92,121'},
  {t: 'SALDO', v: SALDO, c: C.blue2, sign: '', hue: '61,123,255'},
];
export const Rapid: React.FC = () => {
  const lf = useCurrentFrame();
  const seg = 16.5; // 1 tempo da trilha (110 BPM)
  const i = Math.min(3, Math.floor(lf / seg));
  const l = lf - i * seg;
  if (i < 3) {
    const r = RAPID[i];
    const v = useCount(l, 0, 12, r.v, r.v * 0.6);
    const p = spr(l, 0, {damping: 14, stiffness: 320});
    return (
      <AbsoluteFill style={{background: C.ink}}>
        <AbsoluteFill style={{background: `radial-gradient(900px 900px at 50% 50%, rgba(${r.hue},0.35), transparent 65%)`}} />
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', transform: `scale(${lerp(1.3, 1, p)})`}}>
          <div style={{fontFamily: F.display, fontWeight: 900, fontSize: 196, letterSpacing: '-0.05em', color: r.c, lineHeight: 1, filter: `blur(${(1 - p) * 10}px)`}}>{r.t}</div>
          <div style={{fontFamily: F.display, fontWeight: 700, fontSize: 92, color: C.text, marginTop: 30, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.03em'}}>
            {r.sign} {brl(v)}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <AbsoluteFill style={{background: `radial-gradient(900px 900px at 50% 50%, rgba(134,168,255,0.3), transparent 65%)`}} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <Letters text="FLUXO DE CAIXA" at={0} f={l} size={112} stagger={0.5} weight={900} />
        <div style={{marginTop: 40}}>
          <CashFlow f={l} at={0} w={900} h={360} labels={false} line={prog(l, 2, 12)} showBars={0.35} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* =========================================================================
   M2–M3 · HERO DASHBOARD (680 → 828)
   Montagem completa da tela em 3D + "Saiba para onde seu dinheiro está indo"
   → pull-back com cards flutuando + "Visualize e controle".
   ========================================================================= */
export const Hero: React.FC = () => {
  const lf = useCurrentFrame();
  const inP = spr(lf, 0, {damping: 22, stiffness: 70});
  const settle = prog(lf, 58, 36, easeInOut); // pull-back
  const rx = lerp(lerp(55, 20, inP), 0, settle);
  const ry = lerp(-14, 0, settle) * (1 - settle * 0);
  const scale = lerp(lerp(1.35, 1.0, inP), 0.62, settle);
  const y = lerp(lerp(1000, 650, inP), 640, settle);
  const float = (k: number, d: number) => Math.sin((lf + d) / 18) * k;
  const cards = prog(lf, 70, 16);
  const title2 = lf >= 66;
  return (
    <AbsoluteFill>
      <Bg glow={1.2} grid={0.6} />
      <AbsoluteFill style={{perspective: 2400, perspectiveOrigin: '50% 20%'}}>
        <div
          style={{
            position: 'absolute',
            left: 60,
            top: y,
            transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`,
            transformOrigin: '50% 0%',
          }}
        >
          <Dashboard f={lf} at={4} w={960} />
        </div>
      </AbsoluteFill>
      {/* cards orbitando após o pull-back */}
      {cards > 0 && (
        <>
          <div style={{position: 'absolute', left: 40, top: 1220 + float(10, 0), opacity: cards, transform: `translateX(${(1 - cards) * -200}px) rotate(-4deg) scale(0.78)`, transformOrigin: 'left top'}}>
            <Kpi f={lf} at={70} label="Receitas" value={RECEITA} color={C.mint} dir="up" delta="+12,4%" w={400} />
          </div>
          <div style={{position: 'absolute', right: 40, top: 1300 + float(12, 20), opacity: cards, transform: `translateX(${(1 - cards) * 200}px) rotate(4deg) scale(0.78)`, transformOrigin: 'right top'}}>
            <Kpi f={lf} at={74} label="Despesas" value={DESPESA} color={C.red} dir="down" delta="−3,1%" w={400} />
          </div>
          <div style={{position: 'absolute', left: 150, top: 1510 + float(8, 40), opacity: cards, transform: `translateY(${(1 - cards) * 200}px) scale(0.85)`, transformOrigin: 'left top'}}>
            <TxRow tx={TX[0]} f={lf} at={78} w={900} />
          </div>
        </>
      )}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(5,7,13,0.96) 0%, rgba(5,7,13,0.75) 20%, transparent 32%)'}} />
      <div style={{position: 'absolute', left: 80, top: 210}}>
        {!title2 ? (
          <div style={{opacity: 1 - prog(lf, 60, 6)}}>
            <MaskWord text="SAIBA PARA ONDE" at={6} f={lf} size={104} weight={800} color="rgba(244,246,251,0.85)" />
            <MaskWord text="SEU DINHEIRO" at={12} f={lf} size={132} weight={900} />
            <MaskWord text="ESTÁ INDO" at={18} f={lf} size={132} weight={900} color={C.blue} />
          </div>
        ) : (
          <div>
            <MaskWord text="VISUALIZE." at={66} f={lf} size={132} weight={900} />
            <MaskWord text="CONTROLE." at={72} f={lf} size={132} weight={900} color={C.blue} />
          </div>
        )}
      </div>
      <Flash at={0} f={lf} dur={8} max={0.35} color="134,168,255" />
    </AbsoluteFill>
  );
};

/* =========================================================================
   OUTRO (828 → 1125): taglines → marca → CTA → sound logo
   ========================================================================= */
const TAG = [
  {t: 'Sua operação.', at: 10},
  {t: 'Seus clientes.', at: 30},
  {t: 'Seu financeiro.', at: 50},
];
export const Outro: React.FC = () => {
  const lf = useCurrentFrame();
  const tagOut = prog(lf, 106, 14, easeInOut);
  const logoAt = 118;
  const mark = spr(lf, logoAt, {damping: 16, stiffness: 120});
  const order = spr(lf, logoAt + 10, {damping: 13, stiffness: 150});
  const wm = prog(lf, logoAt + 16, 16);
  const cta = spr(lf, logoAt + 40, {damping: 15});
  const url = prog(lf, logoAt + 52, 14);
  const sweep = interpolate(lf, [logoAt + 70, logoAt + 100], [-40, 140], clamp);
  const fadeOut = prog(lf, 280, 17, easeInOut);
  return (
    <AbsoluteFill style={{opacity: 1 - fadeOut}}>
      <Bg glow={0.8 + mark * 0.5} grid={0.35} />
      {/* taglines */}
      <AbsoluteFill style={{opacity: 1 - tagOut, transform: `translateY(${-tagOut * 120}px)`, filter: `blur(${tagOut * 10}px)`}}>
        <div style={{position: 'absolute', left: 100, top: 560}}>
          {TAG.map((t, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 26, marginBottom: 18}}>
              <div style={{width: 18, height: 18, borderRadius: 6, background: [C.blue2, C.amber, C.mint][i], transform: `scale(${spr(lf, t.at)})`}} />
              <MaskWord text={t.t} at={t.at} f={lf} size={104} weight={700} tracking={-0.035} />
            </div>
          ))}
          <div style={{height: 40}} />
          <MaskWord text="Tudo em um" at={74} f={lf} size={132} weight={900} />
          <MaskWord text="só lugar." at={79} f={lf} size={132} weight={900} color={C.blue} />
        </div>
      </AbsoluteFill>
      {/* marca */}
      {lf >= logoAt - 2 && (
        <AbsoluteFill style={{alignItems: 'center', transform: `scale(${interpolate(lf, [logoAt, 297], [0.96, 1.04], clamp)})`}}>
          <div style={{position: 'absolute', top: 560, transform: `scale(${lerp(0.5, 1, mark)})`, opacity: Math.min(1, mark * 2)}}>
            <LogoMark p={order} size={210} sheen={sweep} />
          </div>
          <div style={{position: 'absolute', top: 850, opacity: wm, transform: `translateY(${(1 - wm) * 30}px)`, filter: `blur(${(1 - wm) * 8}px)`, overflow: 'hidden', padding: '0 20px'}}>
            <Wordmark size={100} />
          </div>
          <div
            style={{
              position: 'absolute',
              top: 1040,
              padding: '30px 60px',
              borderRadius: 99,
              background: `linear-gradient(180deg, #5A8FFF, ${C.blue})`,
              boxShadow: `0 20px 60px rgba(61,123,255,0.5), inset 0 1px 0 rgba(255,255,255,0.4)`,
              fontFamily: F.display,
              fontWeight: 800,
              fontSize: 52,
              letterSpacing: '-0.02em',
              color: '#fff',
              transform: `scale(${cta}) translateY(${(1 - cta) * 40}px)`,
              opacity: Math.min(1, cta * 2),
              whiteSpace: 'nowrap',
            }}
          >
            Teste grátis por 7 dias
          </div>
          <div style={{position: 'absolute', top: 1210, fontFamily: F.ui, fontWeight: 600, fontSize: 44, color: C.muted, letterSpacing: '0.01em', opacity: url, transform: `translateY(${(1 - url) * 20}px)`}}>
            servicoemordem.com.br
          </div>
        </AbsoluteFill>
      )}
      <Flash at={logoAt + 10} f={lf} dur={10} max={0.25} color="134,168,255" />
    </AbsoluteFill>
  );
};
