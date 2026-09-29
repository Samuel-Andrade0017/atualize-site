// Fala editada: tempos (s) no vídeo ORIGINAL + deslocamento de cada bloco no vídeo final.
// A: 0.00–7.66 (+0.40) | B: 8.85–14.20 (+0.25) | C: 19.28–22.52 (−4.73) | D: 30.48–33.33 (−12.13)
type W = [string, number, number];
const A: W[] = [
  ['Você', 0.02, 0.3], ['que', 0.3, 0.45], ['trabalha', 0.45, 0.8], ['com', 0.8, 0.95], ['prestação', 0.95, 1.45],
  ['de', 1.45, 1.55], ['serviço,', 1.55, 2.0], ['trabalha', 2.0, 2.45], ['o', 2.45, 2.55], ['mês', 2.55, 2.8],
  ['inteiro,', 2.8, 3.1], ['você', 3.1, 3.3], ['no', 3.3, 3.45], ['final', 3.45, 3.7], ['do', 3.7, 3.8], ['mês', 3.8, 4.0],
  ['sabe', 4.0, 4.35], ['realmente', 4.35, 4.85], ['quanto', 4.85, 5.05], ['que', 5.05, 5.15], ['entrou', 5.15, 5.35],
  ['de', 5.35, 5.45], ['receita,', 5.45, 6.0], ['quanto', 6.3, 6.55], ['que', 6.55, 6.75], ['teve', 6.75, 7.0],
  ['de', 7.0, 7.15], ['despesa?', 7.15, 7.62],
];
const B: W[] = [
  ['Vou', 8.87, 9.1], ['te', 9.1, 9.2], ['mostrar', 9.2, 9.5], ['como', 9.5, 9.7], ['funciona', 9.7, 10.1],
  ['o', 10.4, 10.6], ['controle', 10.6, 11.1], ['financeiro', 11.1, 11.6], ['da', 11.6, 11.75], ['plataforma', 11.75, 12.1],
  ['Serviços', 12.4, 12.75], ['em', 12.75, 12.85], ['Ordem,', 12.85, 13.1], ['para', 13.1, 13.3], ['você', 13.3, 13.6],
  ['ficar', 13.6, 13.85], ['por', 13.85, 13.95], ['dentro', 13.95, 14.15],
];
const Cw: W[] = [
  ['de', 19.3, 19.5], ['toda', 19.5, 19.7], ['a', 19.7, 19.8], ['sua', 19.8, 20.0], ['operação,', 20.0, 20.5],
  ['mês', 20.95, 21.2], ['a', 21.2, 21.3], ['mês,', 21.3, 21.5], ['do', 21.55, 21.7], ['financeiro,', 21.7, 22.3],
];
const D: W[] = [
  ['e', 30.5, 30.65], ['chegar', 30.65, 31.0], ['no', 31.0, 31.1], ['final', 31.1, 31.3], ['do', 31.3, 31.35],
  ['mês', 31.35, 31.5], ['e', 31.5, 31.65], ['não', 31.65, 31.8], ['ficar', 31.8, 32.0], ['perdido', 32.0, 32.35],
  ['com', 32.35, 32.5], ['as', 32.5, 32.6], ['suas', 32.6, 32.85], ['contas.', 32.85, 33.25],
];
const shift = (ws: W[], o: number) => ws.map(([w, a, b]) => ({w, a: a + o, b: b + o}));
export const WORDS = [...shift(A, 0.4), ...shift(B, 0.25), ...shift(Cw, -4.73), ...shift(D, -12.13)];

// Frases de legenda (índices de palavras) — blocos curtos, 2 a 4 palavras
export const PHRASES: number[][] = (() => {
  const breaks = [3, 7, 11, 16, 18, 23, 28, 33, 36, 38, 41, 46, 51, 54, 56, 62, 66];
  const out: number[][] = [];
  let st = 0;
  for (const b of [...breaks, WORDS.length]) {
    const arr = [];
    for (let i = st; i < b; i++) arr.push(i);
    if (arr.length) out.push(arr);
    st = b;
  }
  return out;
})();
