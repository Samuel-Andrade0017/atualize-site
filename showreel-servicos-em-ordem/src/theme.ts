import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter-tight/500.css';
import '@fontsource/inter-tight/600.css';
import '@fontsource/inter-tight/700.css';
import '@fontsource/inter-tight/800.css';
import '@fontsource/inter-tight/900.css';
import '@fontsource/jetbrains-mono/500.css';

export const FPS = 30;
export const TOTAL = 1125; // 37.5s
export const s = (sec: number) => Math.round(sec * FPS);

export const C = {
  ink: '#05070D',
  ink2: '#0A0F1C',
  panel: 'rgba(255,255,255,0.045)',
  panelSolid: '#0E1424',
  line: 'rgba(255,255,255,0.09)',
  text: '#F4F6FB',
  muted: '#8A93A8',
  dim: '#5B6478',
  blue: '#3D7BFF',
  blue2: '#86A8FF',
  mint: '#27E0A0',
  red: '#FF5C79',
  amber: '#FFB547',
};

export const F = {
  display: '"Inter Tight", Inter, sans-serif',
  ui: 'Inter, sans-serif',
  mono: '"JetBrains Mono", monospace',
};

export const brl = (v: number, sign = false) => {
  const str = Math.abs(v).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  return `${sign ? (v < 0 ? '− ' : '+ ') : v < 0 ? '− ' : ''}R$ ${str}`;
};
