/**
 * Static gesture classification — robust palm-center-based detection.
 *
 * Uses palm center (average of wrist + MCP joints) as reference point.
 * Finger is "extended" if its tip is far from palm center relative to its PIP joint.
 * This works across hand orientations (palm up, sideways, etc).
 */
import type { GestureType, HandData, Vec3 } from '../../core/types';

interface ClassifyResult {
  type: GestureType;
  confidence: number;
}

function dist(a: Vec3, b: Vec3): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

/** Palm center: average of wrist(0), index MCP(5), middle MCP(9), ring MCP(13), pinky MCP(17) */
function get_palm(lm: Vec3[]): Vec3 {
  const ids = [0, 5, 9, 13, 17];
  let x = 0, y = 0, z = 0;
  for (const i of ids) { x += lm[i].x; y += lm[i].y; z += lm[i].z; }
  const n = ids.length;
  return { x: x / n, y: y / n, z: z / n };
}

/**
 * Finger extended check:
 * tip is farther from palm than PIP, AND tip-to-palm > PIP-to-palm * ratio.
 * Lower ratio = more forgiving.
 */
function fingerExtended(lm: Vec3[], tipIdx: number, pipIdx: number, ratio: number): boolean {
  const palm = get_palm(lm);
  const tipD = dist(lm[tipIdx], palm);
  const pipD = dist(lm[pipIdx], palm);
  return tipD > pipD * ratio;
}

/**
 * Thumb extended: tip is far from the index MCP (5) base.
 * Thumb moves differently from other fingers.
 */
function thumbExtended(lm: Vec3[]): boolean {
  const tip = lm[4];
  const ip = lm[3];
  const indexMcp = lm[5];
  const tipD = dist(tip, indexMcp);
  const ipD = dist(ip, indexMcp);
  return tipD > ipD * 1.05;
}

/** Count how many fingers match expected state */
function matchCount(
  lm: Vec3[],
  expected: { thumb: boolean; index: boolean; middle: boolean; ring: boolean; pinky: boolean }
): number {
  let count = 0;
  if (thumbExtended(lm) === expected.thumb) count++;
  if (fingerExtended(lm, 8, 6, 0.9) === expected.index) count++;
  if (fingerExtended(lm, 12, 10, 0.9) === expected.middle) count++;
  if (fingerExtended(lm, 16, 14, 0.9) === expected.ring) count++;
  if (fingerExtended(lm, 20, 18, 0.9) === expected.pinky) count++;
  return count;
}

export function classifyStatic(hand: HandData): ClassifyResult | null {
  const lm = hand.landmarks;
  if (lm.length < 21) return null;

  const candidates: ClassifyResult[] = [];

  // Helper: need at least 4/5 fingers matching for a gesture
  const THRESHOLD = 4;

  // 1. Open palm: all 5 extended
  const open = matchCount(lm, { thumb: true, index: true, middle: true, ring: true, pinky: true });
  if (open >= THRESHOLD) {
    candidates.push({ type: 'open_palm', confidence: open / 5 });
  }

  // 2. Closed fist: none extended
  const fist = matchCount(lm, { thumb: false, index: false, middle: false, ring: false, pinky: false });
  if (fist >= THRESHOLD) {
    candidates.push({ type: 'closed_fist', confidence: fist / 5 });
  }

  // 3. Pinch: thumb+index tips close, others relaxed
  const pinchDist = dist(lm[4], lm[8]);
  if (pinchDist < 0.1) {
    // Check other 3 fingers are curled
    const otherCurled = matchCount(lm, { thumb: true, index: true, middle: false, ring: false, pinky: false });
    candidates.push({ type: 'pinch', confidence: Math.max(0.8, otherCurled / 5) });
  }

  // 4. Pointing: index only
  const point = matchCount(lm, { thumb: false, index: true, middle: false, ring: false, pinky: false });
  if (point >= THRESHOLD) {
    candidates.push({ type: 'pointing', confidence: point / 5 });
  }

  // 5. Peace: index + middle
  const peace = matchCount(lm, { thumb: false, index: true, middle: true, ring: false, pinky: false });
  if (peace >= THRESHOLD) {
    candidates.push({ type: 'peace', confidence: peace / 5 });
  }

  // 6. Rock: index + pinky
  const rock = matchCount(lm, { thumb: false, index: true, middle: false, ring: false, pinky: true });
  if (rock >= THRESHOLD) {
    candidates.push({ type: 'rock', confidence: rock / 5 });
  }

  // 7. Thumbs up: thumb up, others curled
  const thumbUp = matchCount(lm, { thumb: true, index: false, middle: false, ring: false, pinky: false });
  // Thumb tip above wrist (lower y = higher on screen)
  const pointingUp = lm[4].y < lm[2].y;
  if (thumbUp >= THRESHOLD && pointingUp) {
    candidates.push({ type: 'thumbs_up', confidence: thumbUp / 5 });
  }

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => b.confidence - a.confidence);
  return candidates[0];
}
