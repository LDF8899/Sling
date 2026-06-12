/**
 * Dynamic gesture classification: detects swipe gestures from wrist velocity.
 * Uses a rolling window of recent frames to compute motion direction.
 */
import type { GestureType, HandData, FrameEntry, Vec3 } from '../../core/types';

interface ClassifyResult {
  type: GestureType;
  confidence: number;
  direction: Vec3;
}

const SWIPE_THRESHOLD = 0.3;
const MIN_FRAMES = 4;

export function classifyDynamic(hand: HandData, history: FrameEntry[]): ClassifyResult | null {
  if (history.length < MIN_FRAMES) return null;

  // Compare current wrist position to position N frames ago
  const current = history[history.length - 1];
  const past = history[Math.max(0, history.length - 6)];
  const dt = (current.timestamp - past.timestamp) / 1000; // seconds

  if (dt < 0.05) return null; // Too short time window

  const wristNow = current.landmarks[0];
  const wristPast = past.landmarks[0];

  const vx = (wristNow.x - wristPast.x) / dt;
  const vy = (wristNow.y - wristPast.y) / dt;

  const speed = Math.sqrt(vx * vx + vy * vy);

  if (speed < SWIPE_THRESHOLD) return null;

  // Determine dominant direction
  const absVx = Math.abs(vx);
  const absVy = Math.abs(vy);
  const confidence = Math.min(speed / 2.0, 1.0);
  const maxSpeed = 5;
  const normConfidence = Math.min(speed / maxSpeed, 1.0);

  let type: GestureType;
  let direction: Vec3;

  if (absVx > absVy) {
    // Horizontal swipe
    if (vx < 0) {
      type = 'swipe_left';
      direction = { x: -1, y: 0, z: 0 };
    } else {
      type = 'swipe_right';
      direction = { x: 1, y: 0, z: 0 };
    }
  } else {
    // Vertical swipe (screen Y is inverted: negative Y = upward)
    if (vy < 0) {
      type = 'swipe_up';
      direction = { x: 0, y: 1, z: 0 };
    } else {
      type = 'swipe_down';
      direction = { x: 0, y: -1, z: 0 };
    }
  }

  return { type, confidence: normConfidence, direction };
}
