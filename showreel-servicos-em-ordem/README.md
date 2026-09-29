# Showreel · Serviços em Ordem (Reels 9:16)

Peça de ~37,5 s (1080×1920, 30 fps) feita em **Remotion** a partir da gravação bruta do apresentador.

Render final: `out/showreel-servicos-em-ordem.mp4`

## Edição da fala (o que foi cortado)

| Trecho original | Mantido | Motivo |
|---|---|---|
| 0,00–7,66 s | ✅ "Você que trabalha com prestação de serviço… quanto que teve de despesa?" | gancho / problema |
| 7,66–8,85 s | ✂️ "acompanhe esse vídeo que eu…" | chamada para um tutorial que não existe no anúncio |
| 8,85–14,20 s | ✅ "vou te mostrar como funciona o controle financeiro da plataforma Serviços em Ordem para você ficar por dentro" | |
| 14,20–19,28 s | ✂️ "de todo o teu…" + pausa longa | falso começo, reformulado logo depois |
| 19,28–22,52 s | ✅ "de toda a sua operação, mês a mês, do financeiro" | |
| 22,52–30,48 s | ✂️ "E…" + hesitação | pausa / vício |
| 30,48–33,33 s | ✅ "e chegar no final do mês e não ficar perdido com as suas contas." | benefício |
| 33,33–fim | ✂️ "Acompanhe o vídeo que eu vou estar te mostrando passo a passo" + tela do CapCut | repetição do convite |

Nenhuma fala foi criada; só cortes. Tempos palavra a palavra em `src/words.ts`.

## Estrutura

- `src/Showreel.tsx` — timeline (cenas + legendas + grão + áudio)
- `src/scenes/Act1..3.tsx` — cenas (hook, calendário, receitas×despesas, caos→ordem, dashboard, marca, mês a mês, fluxo de caixa, contas, montagem, encerramento)
- `src/ui/finance.tsx` — interface financeira (KPIs, fluxo de caixa, movimentações, logo)
- `scripts/audio.py` — trilha original + SFX sintetizados + ducking + mix → `public/mix.wav`
- `scripts/interp_mattes.py`, `scripts/build_cutouts.py` — recorte da pessoa (BiRefNet-portrait + optical flow)

## Importante — substituir por material real

A interface financeira é uma **representação** (valores fictícios) construída em código, porque
não havia gravações/screenshots do sistema nem acesso ao site. O logo/cores também são
propostos. Para usar telas reais: exporte os prints para `public/ui/` e troque o componente
`<Dashboard/>` (e `Kpi`, `CashFlow`, `TxRow`) por `<Img src={staticFile('ui/…')}/>` nas cenas.

## Reproduzir

```bash
npm i
# mídia derivada (não versionada): talent.mp4, cut/, mix.wav — ver scripts/
python3 scripts/audio.py && ffmpeg -i public/mix_pre.wav -af loudnorm=I=-14:TP=-1.2 -c:a pcm_s16le public/mix.wav
npx remotion render src/index.ts Showreel out/showreel-servicos-em-ordem.mp4 --crf=16
```
