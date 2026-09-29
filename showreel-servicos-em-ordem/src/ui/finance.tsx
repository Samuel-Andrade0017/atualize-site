import React from 'react';
import {interpolate} from 'remotion';
import {C, F, brl} from '../theme';
import {clamp, prog, spr} from '../util';
import {Arrow, Check, useCount} from './base';

/* Dados ilustrativos (fictícios) para a representação da tela financeira */
export const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'];
export const IN = [32.4, 35.8, 34.1, 40.6, 38.9, 43.7, 42.2, 46.3, 48.75];
export const OUT = [27.1, 28.9, 30.2, 31.4, 32.8, 30.1, 31.9, 30.6, 31.42];
export const RECEITA = 48750;
export const DESPESA = 31420;
export const SALDO = RECEITA - DESPESA;

export const TX = [
  {t: 'Manutenção preventiva', c: 'Cliente · Serviço #1482', v: 1850, k: 'Recebido'},
  {t: 'Compra de materiais', c: 'Fornecedor', v: -640, k: 'Pago'},
  {t: 'Instalação completa', c: 'Cliente · Serviço #1479', v: 3200, k: 'Recebido'},
  {t: 'Combustível da equipe', c: 'Operação', v: -380, k: 'Pago'},
  {t: 'Aluguel do escritório', c: 'Despesa fixa', v: -2100, k: 'Pago'},
  {t: 'Visita técnica', c: 'Cliente · Serviço #1476', v: 950, k: 'Recebido'},
];

/* ---------- Logo (marca ilustrativa): três barras que entram em ordem ---------- */
export const LogoMark: React.FC<{p: number; size?: number; chaos?: number; sheen?: number}> = ({p, size = 120, chaos = 1, sheen}) => {
  const bars = [
    {w: 1, rot: -38, dx: -0.6, dy: -0.5},
    {w: 0.74, rot: 52, dx: 0.7, dy: 0.1},
    {w: 0.5, rot: -24, dx: -0.2, dy: 0.7},
  ];
  const k = (1 - p) * chaos;
  return (
    <div style={{width: size, height: size, position: 'relative'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: size * 0.28,
          background: `linear-gradient(145deg, ${C.blue}, #2447C9)`,
          boxShadow: `0 ${size * 0.15}px ${size * 0.4}px rgba(61,123,255,0.45), inset 0 1px 0 rgba(255,255,255,0.35)`,
          transform: `scale(${0.6 + 0.4 * Math.min(1, p * 1.3)})`,
          opacity: Math.min(1, p * 2),
          overflow: 'hidden',
        }}
      >
        {sheen !== undefined && (
          <div style={{position: 'absolute', inset: 0, background: `linear-gradient(110deg, transparent ${sheen - 25}%, rgba(255,255,255,0.45) ${sheen}%, transparent ${sheen + 25}%)`}} />
        )}
      </div>
      {bars.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: size * 0.22,
            top: size * (0.27 + i * 0.18),
            width: size * 0.56 * b.w,
            height: size * 0.1,
            borderRadius: size,
            background: i === 2 ? C.mint : '#fff',
            transform: `translate(${b.dx * k * size}px, ${b.dy * k * size}px) rotate(${b.rot * k}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export const Wordmark: React.FC<{size?: number; color?: string}> = ({size = 64, color = C.text}) => (
  <div style={{fontFamily: F.display, fontWeight: 700, fontSize: size, letterSpacing: '-0.035em', color, lineHeight: 1, whiteSpace: 'nowrap'}}>
    Serviços <span style={{color: C.blue2, fontWeight: 600}}>em Ordem</span>
  </div>
);

/* ---------- KPI card ---------- */
export const Kpi: React.FC<{
  f: number;
  at: number;
  label: string;
  value: number;
  color: string;
  dir?: 'up' | 'down';
  delta?: string;
  w?: number;
  big?: boolean;
  countDur?: number;
}> = ({f, at, label, value, color, dir, delta, w = 300, big, countDur = 30}) => {
  const v = useCount(f, at + 3, countDur, value);
  const p = spr(f, at);
  return (
    <div
      style={{
        width: w,
        padding: big ? '34px 38px' : '24px 26px',
        borderRadius: big ? 34 : 24,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))',
        border: `1.5px solid ${C.line}`,
        boxShadow: '0 30px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)',
        opacity: Math.min(1, p * 1.5),
        transform: `translateY(${(1 - p) * 60}px) scale(${0.9 + 0.1 * p})`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: color, opacity: 0.9, transform: `scaleX(${prog(f, at + 2, 20)})`, transformOrigin: 'left'}} />
      <div style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: F.ui, fontWeight: 500, fontSize: big ? 30 : 21, color: C.muted}}>
        <div style={{width: big ? 14 : 10, height: big ? 14 : 10, borderRadius: 99, background: color, boxShadow: `0 0 16px ${color}`}} />
        {label}
      </div>
      <div
        style={{
          fontFamily: F.display,
          fontWeight: 700,
          fontSize: big ? 76 : 40,
          letterSpacing: '-0.03em',
          color: C.text,
          marginTop: big ? 18 : 10,
          fontVariantNumeric: 'tabular-nums',
          whiteSpace: 'nowrap',
        }}
      >
        {brl(v)}
      </div>
      {delta && (
        <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: big ? 16 : 8, fontFamily: F.ui, fontWeight: 600, fontSize: big ? 26 : 18, color}}>
          {dir && <Arrow dir={dir} color={color} size={big ? 24 : 16} />}
          {delta}
        </div>
      )}
    </div>
  );
};

/* ---------- Gráfico de fluxo de caixa ---------- */
export const CashFlow: React.FC<{
  f: number;
  at: number;
  w: number;
  h: number;
  months?: number;
  line?: number; // 0..1 progresso da linha de saldo
  showBars?: number; // 0..1
  highlight?: number; // índice destacado
  labels?: boolean;
}> = ({f, at, w, h, months = 9, line = 1, showBars = 1, highlight = -1, labels = true}) => {
  const n = months;
  const pad = 20;
  const bw = (w - pad * 2) / n;
  const max = 52;
  const ch = h - (labels ? 44 : 10);
  const pts = IN.slice(0, n).map((v, i) => {
    const sal = v - OUT[i];
    return [pad + bw * i + bw / 2, ch - (sal / 20) * ch * 0.8 - ch * 0.08];
  });
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
  const lenApprox = w * 1.4;
  return (
    <svg width={w} height={h} style={{overflow: 'visible'}}>
      <defs>
        <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.mint} stopOpacity="1" />
          <stop offset="1" stopColor={C.mint} stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.red} stopOpacity="0.95" />
          <stop offset="1" stopColor={C.red} stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={0} x2={w} y1={ch * g} y2={ch * g} stroke="rgba(255,255,255,0.06)" strokeWidth={1.5} strokeDasharray="4 8" />
      ))}
      {IN.slice(0, n).map((v, i) => {
        const p = spr(f, at + i * 2.2, {damping: 14, stiffness: 150}) * showBars;
        const hi = (v / max) * ch * p;
        const ho = (OUT[i] / max) * ch * p;
        const x = pad + bw * i;
        const bwi = bw * 0.28;
        const dim = highlight >= 0 && highlight !== i ? 0.35 : 1;
        return (
          <g key={i} opacity={dim}>
            <rect x={x + bw * 0.18} y={ch - hi} width={bwi} height={hi} rx={bwi / 2.5} fill="url(#gIn)" />
            <rect x={x + bw * 0.18 + bwi + 6} y={ch - ho} width={bwi} height={ho} rx={bwi / 2.5} fill="url(#gOut)" />
            {labels && (
              <text x={x + bw / 2} y={h - 8} textAnchor="middle" fill={highlight === i ? C.text : C.muted} fontFamily="Inter" fontWeight={highlight === i ? 700 : 500} fontSize={20}>
                {MONTHS[i]}
              </text>
            )}
          </g>
        );
      })}
      {line > 0 && (
        <g filter="url(#glow)">
          <path d={path} fill="none" stroke={C.blue2} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={lenApprox} strokeDashoffset={lenApprox * (1 - line)} />
          {pts.map((p, i) => {
            const vis = interpolate(line, [i / (n - 1) - 0.02, i / (n - 1) + 0.04], [0, 1], clamp);
            return <circle key={i} cx={p[0]} cy={p[1]} r={i === n - 1 ? 11 * vis : 6 * vis} fill={i === n - 1 ? '#fff' : C.blue2} />;
          })}
        </g>
      )}
    </svg>
  );
};

/* ---------- Linha de movimentação ---------- */
export const TxRow: React.FC<{tx: (typeof TX)[number]; f: number; at: number; checkAt?: number; w?: number}> = ({tx, f, at, checkAt, w = 900}) => {
  const p = spr(f, at);
  const pos = tx.v > 0;
  const col = pos ? C.mint : C.red;
  const ck = checkAt !== undefined ? prog(f, checkAt, 10) : 1;
  return (
    <div
      style={{
        width: w,
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        padding: '20px 24px',
        borderRadius: 22,
        background: 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${C.line}`,
        opacity: Math.min(1, p * 1.4),
        transform: `translateX(${(1 - p) * 120}px)`,
      }}
    >
      <div style={{width: 56, height: 56, borderRadius: 16, background: `${col}22`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Arrow dir={pos ? 'up' : 'down'} color={col} size={26} />
      </div>
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{fontFamily: F.ui, fontWeight: 600, fontSize: 26, color: C.text, whiteSpace: 'nowrap'}}>{tx.t}</div>
        <div style={{fontFamily: F.ui, fontWeight: 500, fontSize: 19, color: C.muted, marginTop: 4}}>{tx.c}</div>
      </div>
      <div style={{textAlign: 'right'}}>
        <div style={{fontFamily: F.display, fontWeight: 700, fontSize: 28, color: pos ? C.mint : C.text, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap'}}>{brl(tx.v, true)}</div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, marginTop: 4, fontFamily: F.ui, fontWeight: 600, fontSize: 17, color: ck > 0.5 ? C.mint : C.muted}}>
          <Check p={ck} size={22} />
          {ck > 0.5 ? tx.k : 'Pendente'}
        </div>
      </div>
    </div>
  );
};

/* ---------- Dashboard completo (representação da tela financeira) ---------- */
export const Dashboard: React.FC<{f: number; at: number; w?: number; assemble?: number}> = ({f, at, w = 960}) => {
  const p = (d: number) => spr(f, at + d);
  const inner = w - 64;
  return (
    <div
      style={{
        width: w,
        borderRadius: 44,
        padding: 32,
        background: 'linear-gradient(180deg, #111830, #0A0F1E)',
        border: `1.5px solid rgba(255,255,255,0.1)`,
        boxShadow: '0 80px 160px rgba(0,0,0,0.6), 0 0 0 1px rgba(61,123,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
        overflow: 'hidden',
      }}
    >
      {/* top bar */}
      <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: p(0), transform: `translateY(${(1 - p(0)) * -30}px)`}}>
        <LogoMark p={1} size={54} />
        <div style={{fontFamily: F.display, fontWeight: 700, fontSize: 32, color: C.text, letterSpacing: '-0.02em'}}>Financeiro</div>
        <div style={{flex: 1}} />
        <div style={{padding: '12px 20px', borderRadius: 99, border: `1.5px solid ${C.line}`, fontFamily: F.ui, fontWeight: 600, fontSize: 20, color: C.text, background: 'rgba(255,255,255,0.04)'}}>
          ‹ &nbsp;Setembro 2026&nbsp; ›
        </div>
      </div>
      {/* KPIs */}
      <div style={{display: 'flex', gap: 16, marginTop: 28}}>
        <Kpi f={f} at={at + 4} label="Receitas" value={RECEITA} color={C.mint} dir="up" delta="+12,4%" w={(inner - 32) / 3} />
        <Kpi f={f} at={at + 7} label="Despesas" value={DESPESA} color={C.red} dir="down" delta="−3,1%" w={(inner - 32) / 3} />
        <Kpi f={f} at={at + 10} label="Saldo" value={SALDO} color={C.blue2} dir="up" delta="+38,9%" w={(inner - 32) / 3} />
      </div>
      {/* chart */}
      <div
        style={{
          marginTop: 20,
          padding: '24px 24px 16px',
          borderRadius: 26,
          background: 'rgba(255,255,255,0.03)',
          border: `1.5px solid ${C.line}`,
          opacity: p(12),
          transform: `translateY(${(1 - p(12)) * 50}px)`,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', fontFamily: F.ui}}>
          <div style={{fontWeight: 600, fontSize: 24, color: C.text}}>Fluxo de caixa</div>
          <div style={{flex: 1}} />
          <Legend color={C.mint} t="Entradas" />
          <Legend color={C.red} t="Saídas" />
          <Legend color={C.blue2} t="Saldo" />
        </div>
        <div style={{marginTop: 18}}>
          <CashFlow f={f} at={at + 14} w={inner - 48} h={300} line={prog(f, at + 30, 34)} />
        </div>
      </div>
      {/* movimentações */}
      <div style={{marginTop: 20, fontFamily: F.ui, fontWeight: 600, fontSize: 24, color: C.text, opacity: p(18)}}>Movimentações recentes</div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14}}>
        {TX.slice(0, 3).map((t, i) => (
          <TxRow key={i} tx={t} f={f} at={at + 20 + i * 3} w={inner} />
        ))}
      </div>
    </div>
  );
};

const Legend: React.FC<{color: string; t: string}> = ({color, t}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 8, marginLeft: 20, fontSize: 18, fontWeight: 500, color: C.muted}}>
    <div style={{width: 12, height: 12, borderRadius: 4, background: color}} />
    {t}
  </div>
);
