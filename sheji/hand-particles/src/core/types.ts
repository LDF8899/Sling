/**
 * Central type definitions for the hand particle interaction system.
 */

/** All recognized gesture identifiers */
export type GestureType =
  | 'open_palm' | 'closed_fist' | 'pinch' | 'pointing'
  | 'peace' | 'rock' | 'thumbs_up'
  | 'swipe_left' | 'swipe_right' | 'swipe_up' | 'swipe_down'
  | 'two_spread' | 'two_clap' | 'two_pull' | 'two_push'
  | 'two_orbit' | 'two_mirror' | 'two_scale'
  | 'none';

/** 3D vector */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Emitted by GestureEngine on every classification */
export interface GestureEvent {
  type: GestureType;
  confidence: number;
  origin: Vec3;
  direction?: Vec3;
  intensity: number;
  handedness: 'left' | 'right' | 'both';
  timestamp: number;
}

/** Raw hand data from MediaPipe */
export interface HandData {
  landmarks: Vec3[];
  worldLandmarks: Vec3[];
  handedness: 'left' | 'right';
  confidence: number;
}

/** Particle system configuration */
export interface ParticleConfig {
  count: number;
  baseSize: number;
  spread: number;
  colorCycleSpeed: number;
}

/** Frame history entry for gesture smoothing */
export interface FrameEntry {
  landmarks: Vec3[];
  worldLandmarks: Vec3[];
  timestamp: number;
}

/** EventBus event map for type-safe emit/on */
export interface BusEvents {
  'gesture:update': GestureEvent;
  'gesture:changed': GestureEvent;
  'handtracker:ready': void;
  'handtracker:error': Error;
  'hand:data': HandData[];
  'keyboard:gesture': GestureEvent;
  'frame': { delta: number; elapsed: number };
}
