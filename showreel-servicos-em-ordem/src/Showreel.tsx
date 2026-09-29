import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {C} from './theme';
import {Grain} from './ui/base';
import {Captions} from './ui/Captions';
import {ChaosToOrder, Hook, MoneyQuestion, Month} from './scenes/Act1';
import {BrandHit, EndOfMonth, FinanceUI, Inside, MonthByMonth, NotLost, Operation} from './scenes/Act2';
import {Hero, Outro, Rapid} from './scenes/Act3';

/**
 * Timeline (30 fps · 1125 frames · 37,5 s)
 * A fala editada dirige o ritmo — ver src/words.ts para os tempos de cada palavra.
 */
export const SCENES: {from: number; to: number; C: React.FC; name: string}[] = [
  {from: 0, to: 72, C: Hook, name: 'Hook · prestação de serviço'},
  {from: 72, to: 132, C: Month, name: 'Mês inteiro / final do mês'},
  {from: 132, to: 242, C: MoneyQuestion, name: 'Receitas × Despesas'},
  {from: 242, to: 318, C: ChaosToOrder, name: 'Caos → ordem'},
  {from: 318, to: 370, C: FinanceUI, name: 'Controle financeiro'},
  {from: 370, to: 400, C: BrandHit, name: 'Serviços em Ordem'},
  {from: 400, to: 436, C: Inside, name: 'Ficar por dentro'},
  {from: 436, to: 466, C: Operation, name: 'Toda a sua operação'},
  {from: 466, to: 551, C: MonthByMonth, name: 'Mês a mês → fluxo de caixa'},
  {from: 551, to: 581, C: EndOfMonth, name: 'Final do mês'},
  {from: 581, to: 636, C: NotLost, name: 'Não ficar perdido / contas'},
  {from: 636, to: 702, C: Rapid, name: 'Rajada de indicadores'},
  {from: 702, to: 828, C: Hero, name: 'Dashboard hero'},
  {from: 828, to: 1125, C: Outro, name: 'Encerramento + CTA'},
];

const CAPTION_HIDE: [number, number][] = [
  [0, 273],
  [318, 400],
  [436, 551],
  [581, 1125],
];

export const Showreel: React.FC = () => (
  <AbsoluteFill style={{background: C.ink}}>
    {SCENES.map(({from, to, C: Scene, name}) => (
      <Sequence key={name} name={name} from={from} durationInFrames={to - from}>
        <Scene />
      </Sequence>
    ))}
    <Captions hide={CAPTION_HIDE} y={(f) => (f >= 273 && f < 318 ? 1150 : 1300)} />
    <Grain opacity={0.06} />
    <Audio src={staticFile('mix.wav')} />
  </AbsoluteFill>
);
