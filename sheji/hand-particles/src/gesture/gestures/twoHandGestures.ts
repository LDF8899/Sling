/**
 * Two-hand gesture classification.
 * Detects spread, clap, pull, push, orbit, mirror, and scale gestures
 * using the relative positions and motions of two hands.
 */
import type { GestureType, HandData, FrameEntry, Vec3 } from '../../core/types';

interface ClassifyResult {
  type: GestureType;
  confidence: number;
  direction?: Vec3;
}

function dist(a: Vec3, b: Vec3): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

function midpoint(a: Vec3, b: Vec3): Vec3 {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: (a.z + b.z) / 2 };
}

/** Check if a hand is in open palm pose (simplified: all fingers extended) */
function isOpenPalm(hand: HandData): boolean {
  const lm = hand.landmarks;
  if (lm.length < 21) return false;
  const wrist = lm[0];
  let extended = 0;
  for (const tipIdx of [8, 12, 16, 20]) {
    const mcpIdx = tipIdx - 3;
    if (dist(lm[tipIdx], wrist) > dist(lm[mcpIdx], wrist)) extended++;
  }
  // Thumb
  if (dist(lm[4], lm[5]) > dist(lm[3], lm[5]) * 0.8) extended++;
  return extended >= 4;
}

/** Check if hand is in fist pose (simplified: no fingers extended) */
function isClosedFist(hand: HandData): boolean {
  const lm = hand.landmarks;
  if (lm.length < 21) return false;
  const wrist = lm[0];
  let extended = 0;
  for (const tipIdx of [8, 12, 16, 20]) {
    const mcpIdx = tipIdx - 3;
    if (dist(lm[tipIdx], wrist) > dist(lm[mcpIdx], wrist)) extended++;
  }
  return extended <= 1;
}

export function classifyTwoHand(
  hand1: HandData,
  hand2: HandData,
  history1: FrameEntry[],
  history2: FrameEntry[]
): ClassifyResult | null {
  const w1 = hand1.landmarks[0];
  const w2 = hand2.landmarks[0];
  const currentDist = dist(w1, w2);
  const mid = midpoint(w1, w2);

  const candidates: ClassifyResult[] = [];

  const open1 = isOpenPalm(hand1);
  const open2 = isOpenPalm(hand2);
  const fist1 = isClosedFist(hand1);
  const fist2 = isClosedFist(hand2);

  // Compute distance change over recent history
  let distDelta = 0;
  if (history1.length >= 4 && history2.length >= 4) {
    const past1 = history1[Math.max(0, history1.length - 5)];
    const past2 = history2[Math.max(0, history2.length - 5)];
    const pastDist = dist(past1.landmarks[0], past2.landmarks[0]);
    distDelta = currentDist - pastDist;
  }

  // 1. two_spread: both palms open, distance increasing
  if (open1 && open2 && distDelta > 0.03) {
    candidates.push({ type: 'two_spread', confidence: 0.8 });
  }

  // 2. two_clap: both palms open, distance decreasing rapidly, currently close
  if (open1 && open2 && distDelta < -0.05 && currentDist < 0.3) {
    candidates.push({ type: 'two_clap', confidence: 0.9 });
  }

  // 3. two_pull: both fists, distance increasing
  if (fist1 && fist2 && distDelta > 0.03) {
    const dir: Vec3 = {
      x: w2.x - w1.x,
      y: w2.y - w1.y,
      z: w2.z - w1.z,
    };
    const len = Math.sqrt(dir.x ** 2 + dir.y ** 2 + dir.z ** 2) || 1;
    dir.x /= len;
    dir.y /= len;
    dir.z /= len;
    candidates.push({ type: 'two_pull', confidence: 0.75, direction: dir });
  }

  // 4. two_push: both fists, distance decreasing
  if (fist1 && fist2 && distDelta < -0.03) {
    candidates.push({ type: 'two_push', confidence: 0.75 });
  }

  // 5. two_mirror: both palms, similar Y, mirrored X
  if (open1 && open2) {
    const yDiff = Math.abs(w1.y - w2.y);
    const xDiff = Math.abs(w1.x - w2.x);
    if (yDiff < 0.1 && xDiff > 0.15) {
      candidates.push({ type: 'two_mirror', confidence: 0.7 });
    }
  }

  // 6. two_orbit: one hand stationary, other traces circular path
  if (history1.length >= 6 && history2.length >= 6) {
    // Check if hand2 moves in a circle while hand1 is roughly still
    const hand1Motion = computeMotion(history1);
    const hand2Motion = computeMotion(history2);

    if (hand1Motion < 0.02 && hand2Motion > 0.05) {
      const circularity = computeCircularity(history2);
      if (circularity > 0.5) {
        candidates.push({ type: 'two_orbit', confidence: circularity * 0.8 });
      }
    } else if (hand2Motion < 0.02 && hand1Motion > 0.05) {
      const circularity = computeCircularity(history1);
      if (circularity > 0.5) {
        candidates.push({ type: 'two_orbit', confidence: circularity * 0.8 });
      }
    }
  }

  // 7. two_scale: both pinches, distance changing
  // Simplified: check if both hands have thumb+index close
  const pinch1 = dist(hand1.landmarks[4], hand1.landmarks[8]) < 0.08;
  const pinch2 = dist(hand2.landmarks[4], hand2.landmarks[8]) < 0.08;
  if (pinch1 && pinch2 && Math.abs(distDelta) > 0.02) {
    candidates.push({ type: 'two_scale', confidence: 0.7 });
  }

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => b.confidence - a.confidence);
  return candidates[0];
}

/** Total wrist displacement over history window */
function computeMotion(history: FrameEntry[]): number {
  if (history.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < history.length; i++) {
    total += dist(history[i].landmarks[0], history[i - 1].landmarks[0]);
  }
  return total;
}

/** Heuristic circularity: ratio of total path length to endpoint distance */
function computeCircularity(history: FrameEntry[]): number {
  if (history.length < 4) return 0;

  const wristPositions = history.map((h) => h.landmarks[0]);

  // Compute total path length
  let pathLength = 0;
  for (let i = 1; i < wristPositions.length; i++) {
    pathLength += dist(wristPositions[i], wristPositions[i - 1]);
  }

  // Compute net displacement
  const netDisp = dist(wristPositions[0], wristPositions[wristPositions.length - 1]);

  // High circularity = high path length relative to net displacement
  if (netDisp < 0.01) return pathLength > 0.05 ? 1 : 0;
  const ratio = pathLength / (netDisp * 3); // 3x because a circle has ~pi ratio
  return Math.min(ratio, 1);
}
