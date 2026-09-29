import {Easing, interpolate, spring} from 'remotion';
import {FPS} from './theme';

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ease = Easing.bezier(0.16, 1, 0.3, 1); // expo-out
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);
export const easeInOut = Easing.bezier(0.83, 0, 0.17, 1);

export const prog = (f: number, start: number, dur: number, e = ease) =>
  interpolate(f, [start, start + dur], [0, 1], {...clamp, easing: e});

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const spr = (f: number, delay = 0, cfg: {damping?: number; stiffness?: number; mass?: number} = {}) =>
  spring({frame: f - delay, fps: FPS, config: {damping: 16, stiffness: 170, mass: 0.8, ...cfg}});

// deterministic pseudo random
export const rnd = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
