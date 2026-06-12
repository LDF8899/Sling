/**
 * Maps GestureEvent → ParticleSystem force calls.
 * Runs every frame, applies continuous forces based on latest gesture state.
 * Force origin is the smoothed palm position from GestureEngine.
 */
import type { GestureEvent, Vec3 } from '../core/types';
import { bus } from '../core/Bus';
import { ParticleSystem } from './ParticleSystem';

class ForceFieldClass {
  private current: GestureEvent | null = null;
  private transitionProgress = 1;
  private transitionSpeed = 8; // very fast transitions
  private lastElapsed = 0;

  init(): void {
    bus.on('gesture:update', (e) => this.onGesture(e));
    bus.on('gesture:changed', (e) => this.onGestureChanged(e));
    bus.on('keyboard:gesture', (e) => this.onGesture(e));
    bus.on('frame', ({ elapsed }) => this.onFrame(elapsed));
  }

  private onGesture(event: GestureEvent): void {
    this.current = event;
  }

  private onGestureChanged(event: GestureEvent): void {
    if (event.type !== 'none') {
      // Punchy burst on gesture switch
      ParticleSystem.triggerBurst(event.origin, 20);
    }
    this.transitionProgress = 0;
  }

  private onFrame(elapsed: number): void {
    if (!this.current) return;

    const dt = elapsed - this.lastElapsed;
    this.lastElapsed = elapsed;

    this.transitionProgress = Math.min(1, this.transitionProgress + this.transitionSpeed * dt);
    const intensity = this.current.intensity * this.transitionProgress;

    const g = this.current;
    const o = g.origin; // smoothed palm position from GestureEngine

    switch (g.type) {
      // ── Static gestures ──────────────────────────────
      case 'open_palm':
        // Strong repulsion from palm
        ParticleSystem.applyRadialForce(o, intensity * 40, 25);
        break;

      case 'closed_fist':
        // Spring attraction — particles converge tightly on hand
        ParticleSystem.applySpringForce(o, intensity * 15, 30, 0.4);
        break;

      case 'pinch':
        // Fast vortex at pinch point
        ParticleSystem.applyVortex(o, { x: 0, y: 0, z: 1 }, intensity * 60, 15);
        break;

      case 'pointing': {
        // Directional beam from hand
        const dir = g.direction || { x: 0, y: 0, z: -1 };
        ParticleSystem.applyDirectionalForce(dir, intensity * 50);
        // Also slight repulsion from fingertip
        ParticleSystem.applyRadialForce(o, intensity * 10, 8);
        break;
      }

      case 'peace':
        // Repel + vertical spin
        ParticleSystem.applyRadialForce(o, intensity * 25, 22);
        ParticleSystem.applyVortex(o, { x: 0, y: 1, z: 0 }, intensity * 35, 18);
        break;

      case 'rock':
        // Wild shaking within palm radius
        ParticleSystem.applyTurbulence(o, intensity * 12, 15, elapsed);
        break;

      case 'thumbs_up':
        // Strong upward with turbulence
        ParticleSystem.applyDirectionalForce({ x: 0, y: 1, z: 0 }, intensity * 35);
        ParticleSystem.applyTurbulence(o, intensity * 5, 6, elapsed);
        break;

      // ── Swipe gestures ───────────────────────────────
      case 'swipe_left':
        ParticleSystem.applyDirectionalForce({ x: -1, y: 0, z: 0 }, intensity * 80);
        ParticleSystem.applyRadialForce(o, intensity * 15, 20);
        break;

      case 'swipe_right':
        ParticleSystem.applyDirectionalForce({ x: 1, y: 0, z: 0 }, intensity * 80);
        ParticleSystem.applyRadialForce(o, intensity * 15, 20);
        break;

      case 'swipe_up':
        ParticleSystem.applyDirectionalForce({ x: 0, y: 1, z: 0 }, intensity * 80);
        ParticleSystem.applyRadialForce(o, intensity * 15, 20);
        break;

      case 'swipe_down':
        ParticleSystem.applyDirectionalForce({ x: 0, y: -1, z: 0 }, intensity * 90);
        ParticleSystem.applySpringForce(o, intensity * 10, 25, 0.3);
        break;

      // ── Two-hand gestures ────────────────────────────
      case 'two_spread':
        ParticleSystem.triggerBurst(o, intensity * 40);
        ParticleSystem.applyRadialForce(o, intensity * 35, 40);
        break;

      case 'two_clap':
        ParticleSystem.triggerBurst(o, intensity * 60);
        ParticleSystem.applySpringForce(o, intensity * 20, 20, 0.5);
        break;

      case 'two_pull': {
        const dir = g.direction || { x: 1, y: 0, z: 0 };
        ParticleSystem.applyDirectionalForce(dir, intensity * 35);
        ParticleSystem.applyDirectionalForce({ x: -dir.x, y: -dir.y, z: -dir.z }, intensity * 35);
        break;
      }

      case 'two_push':
        ParticleSystem.applySpringForce(o, intensity * 25, 35, 0.5);
        break;

      case 'two_orbit':
        ParticleSystem.applyVortex(o, { x: 0, y: 1, z: 0 }, intensity * 40, 30);
        break;

      case 'two_mirror':
        ParticleSystem.applyRadialForce(o, intensity * 30, 30);
        break;

      case 'two_scale':
        ParticleSystem.applyRadialForce(o, intensity * (g.direction?.x || 1) * 35, 35);
        break;

      // ── No gesture but hand detected ─────────────────
      case 'none':
        // Gentle spring follow — particles slowly drift toward hand
        ParticleSystem.applySpringForce(o, 3, 25, 0.1);
        break;
    }
  }
}

export const ForceField = new ForceFieldClass();
