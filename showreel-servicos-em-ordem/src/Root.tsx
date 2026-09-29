import React from 'react';
import {Composition} from 'remotion';
import {Showreel} from './Showreel';
import {FPS, TOTAL} from './theme';

export const Root: React.FC = () => (
  <Composition id="Showreel" component={Showreel} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
);
