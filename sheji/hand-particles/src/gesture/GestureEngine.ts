/**
 * Gesture classification pipeline — rewritten for tight hand tracking.
 *
 * Key improvements:
 * 1. Palm center = average of wrist(0), index MCP(5), middle MCP(9), ring MCP(13)
 *    → much more stable than wrist-only tracking
 * 2. Gesture smoothing: hold current gesture for N frames before switching
 *    → no flickering between gestures
 * 3. Continuous position update: every hand:data emits gesture:update with latest position
 *    → force origin always follows hand, even during gesture transitions
 * 4. Interpolated position between detection frames via lerp
 */
import type { GestureEvent, GestureType, HandData, FrameEntry, Vec3 } from '../core/types';
import { bus } from '../core/Bus';
import { classifyStatic } from './gestures/staticGestures';
import { classifyDynamic } from './gestures/dynamicGestures';
import { classifyTwoHand } from './gestures/twoHandGestures';

const HISTORY_LENGTH = 10;
const SCENE_WIDTH = 35;
const SCENE_HEIGHT = 25;
const DEPTH_SCALE = 12;

// Gesture smoothing: require N consecutive consistent detections before switching
const SMOOTH_FRAMES = 2;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Compute stable palm center from multiple landmarks */
function palmCenter(landmarks: Vec3[]): Vec3 {
  // Average of wrist(0), index MCP(5), middle MCP(9), ring MCP(13), pinky MCP(17)
  const indices = [0, 5, 9, 13, 17];
  let x = 0, y = 0, z = 0;
  for (const idx of indices) {
    const p = landmarks[idx];
    x += p.x;
    y += p.y;
    z += p.z;
  }
  const n = indices.length;
  return { x: x / n, y: y / n, z: z / n };
}

/** Map normalized hand coords to scene coords */
function toScene(p: Vec3): Vec3 {
  return {
    x: (p.x - 0.5) * SCENE_WIDTH,
    y: -(p.y - 0.5) * SCENE_HEIGHT,
    z: p.z * DEPTH_SCALE,
  };
}

class GestureEngineClass {
  private handHistory = new Map<string, FrameEntry[]>();
  private currentGesture: GestureType = 'none';
  private pendingGesture: GestureType = 'none';
  private pendingCount = 0;
  private gestureStartTime = 0;

  // Smoothed position (lerps toward target each frame)
  private smoothOrigin: Vec3 = { x: 0, y: 0, z: 0 };
  private targetOrigin: Vec3 = { x: 0, y: 0, z: 0 };
  private hasTarget = false;

  init(): void {
    bus.on('hand:data', (hands) => this.onHandData(hands));
    // Emit smoothed position every render frame for continuous tracking
    bus.on('frame', () => this.emitSmoothed());
  }

  private onHandData(hands: HandData[]): void {
    const now = performance.now();

    if (hands.length === 0) {
      this.hasTarget = false;
      // Don't immediately switch to 'none' — hold last gesture briefly
      // so releasing hand doesn't kill the effect instantly
      if (this.currentGesture !== 'none') {
        this.pendingCount++;
        if (this.pendingCount > 15) {
          // Lost hand for too long, switch to none
          this.emitGesture({
            type: 'none',
            confidence: 0,
            origin: this.smoothOrigin,
            intensity: 0,
            handedness: 'right',
            timestamp: now,
          });
        }
      }
      return;
    }

    // Update history
    for (const hand of hands) {
      const key = hand.handedness;
      if (!this.handHistory.has(key)) {
        this.handHistory.set(key, []);
      }
      const history = this.handHistory.get(key)!;
      history.push({
        landmarks: hand.landmarks,
        worldLandmarks: hand.worldLandmarks,
        timestamp: now,
      });
      if (history.length > HISTORY_LENGTH) {
        history.shift();
      }
    }

    // Update target origin from palm center
    const primary = hands[0];
    const palm = palmCenter(primary.landmarks);

    if (hands.length >= 2) {
      const palm2 = palmCenter(hands[1].landmarks);
      this.targetOrigin = toScene({
        x: (palm.x + palm2.x) / 2,
        y: (palm.y + palm2.y) / 2,
        z: (palm.z + palm2.z) / 2,
      });
    } else {
      this.targetOrigin = toScene(palm);
    }
    this.hasTarget = true;

    // Snap smooth origin on first detection (avoid lerp from origin)
    if (this.currentGesture === 'none') {
      this.smoothOrigin = { ...this.targetOrigin };
    }

    // Classify gesture
    let bestGesture: { type: GestureType; confidence: number } = { type: 'none', confidence: 0 };
    let direction: Vec3 | undefined;

    if (hands.length >= 2) {
      const h1 = hands[0];
      const h2 = hands[1];
      const history1 = this.handHistory.get(h1.handedness) || [];
      const history2 = this.handHistory.get(h2.handedness) || [];
      const result = classifyTwoHand(h1, h2, history1, history2);
      if (result && result.confidence > bestGesture.confidence) {
        bestGesture = result;
        direction = result.direction;
      }
    }

    for (const hand of hands) {
      const history = this.handHistory.get(hand.handedness) || [];

      const staticResult = classifyStatic(hand);
      if (staticResult && staticResult.confidence > bestGesture.confidence) {
        bestGesture = staticResult;
      }

      const dynamicResult = classifyDynamic(hand, history);
      if (dynamicResult && dynamicResult.confidence > bestGesture.confidence) {
        bestGesture = dynamicResult;
        direction = dynamicResult.direction;
      }
    }

    // Gesture smoothing: require consistent detection before switching
    if (bestGesture.type !== this.currentGesture) {
      if (bestGesture.type === this.pendingGesture) {
        this.pendingCount++;
      } else {
        this.pendingGesture = bestGesture.type;
        this.pendingCount = 1;
      }

      if (this.pendingCount >= SMOOTH_FRAMES) {
        this.emitGesture({
          type: bestGesture.type,
          confidence: bestGesture.confidence,
          origin: this.smoothOrigin,
          direction,
          intensity: bestGesture.confidence,
          handedness: hands.length >= 2 ? 'both' : hands[0].handedness,
          timestamp: now,
        });
      } else {
        // Still emitting current gesture while pending
        this.emitGesture({
          type: this.currentGesture,
          confidence: bestGesture.confidence,
          origin: this.smoothOrigin,
          direction,
          intensity: bestGesture.confidence,
          handedness: hands.length >= 2 ? 'both' : hands[0].handedness,
          timestamp: now,
        });
      }
    } else {
      // Same gesture — reset pending
      this.pendingCount = 0;
      this.pendingGesture = bestGesture.type;

      this.emitGesture({
        type: bestGesture.type,
        confidence: bestGesture.confidence,
        origin: this.smoothOrigin,
        direction,
        intensity: bestGesture.confidence,
        handedness: hands.length >= 2 ? 'both' : hands[0].handedness,
        timestamp: now,
      });
    }
  }

  /** Smoothly interpolate origin toward target every render frame */
  private emitSmoothed(): void {
    if (!this.hasTarget) return;
    // Fast lerp: 0.3 means ~90% of the way in 6 frames (~100ms at 60fps)
    this.smoothOrigin.x = lerp(this.smoothOrigin.x, this.targetOrigin.x, 0.3);
    this.smoothOrigin.y = lerp(this.smoothOrigin.y, this.targetOrigin.y, 0.3);
    this.smoothOrigin.z = lerp(this.smoothOrigin.z, this.targetOrigin.z, 0.3);
  }

  private emitGesture(event: GestureEvent): void {
    bus.emit('gesture:update', event);

    if (event.type !== this.currentGesture) {
      this.currentGesture = event.type;
      this.gestureStartTime = event.timestamp;
      bus.emit('gesture:changed', event);
    }
  }
}

export const GestureEngine = new GestureEngineClass();
