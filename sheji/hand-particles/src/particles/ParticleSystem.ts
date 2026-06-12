/**
 * Core particle engine: 8000-13000 particles with HSL coloring,
 * physics simulation (Euler integration), and force-field APIs.
 * Uses PointsMaterial + Canvas texture — no custom shaders.
 */
import * as THREE from 'three';
import type { Vec3, ParticleConfig } from '../core/types';
import { bus } from '../core/Bus';
import { createParticleTexture } from '../renderer/createParticleTexture';

const DEFAULT_CONFIG: ParticleConfig = {
  count: 10000,
  baseSize: 0.3,
  spread: 14,
  colorCycleSpeed: 0.3,
};

class ParticleSystemClass {
  points!: THREE.Points;
  private geometry!: THREE.BufferGeometry;
  private positionAttr!: THREE.Float32BufferAttribute;
  private colorAttr!: THREE.Float32BufferAttribute;

  // Internal physics state (not sent to GPU)
  private velocity!: Float32Array;
  private acceleration!: Float32Array;
  private baseHue!: Float32Array;

  private count = 0;
  private spread = 20;
  private colorCycleSpeed = 0.3;

  init(scene: THREE.Scene, config: Partial<ParticleConfig> = {}): void {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    this.count = cfg.count;
    this.spread = cfg.spread;
    this.colorCycleSpeed = cfg.colorCycleSpeed;

    const n = this.count;

    // Allocate arrays
    const positions = new Float32Array(n * 3);
    const colors = new Float32Array(n * 3);
    this.velocity = new Float32Array(n * 3);
    this.acceleration = new Float32Array(n * 3);
    this.baseHue = new Float32Array(n);

    // Initialize particles in a flat disk distribution — wider XY, shallow Z
    // so they fill the camera view nicely and stay in the interaction plane
    for (let i = 0; i < n; i++) {
      const i3 = i * 3;

      // Random point in disk (polar coordinates)
      const angle = Math.random() * Math.PI * 2;
      const r = this.spread * Math.sqrt(Math.random()); // sqrt for uniform area distribution
      const zSpread = 4; // shallow depth

      positions[i3] = Math.cos(angle) * r;
      positions[i3 + 1] = Math.sin(angle) * r;
      positions[i3 + 2] = (Math.random() - 0.5) * zSpread;

      // HSL color: random hue, high saturation, medium lightness
      const hue = Math.random();
      this.baseHue[i] = hue;
      const color = new THREE.Color();
      color.setHSL(hue, 0.7, 0.6);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Small random initial velocity
      this.velocity[i3] = (Math.random() - 0.5) * 0.5;
      this.velocity[i3 + 1] = (Math.random() - 0.5) * 0.5;
      this.velocity[i3 + 2] = (Math.random() - 0.5) * 0.5;
    }

    // Create geometry
    this.geometry = new THREE.BufferGeometry();
    this.positionAttr = new THREE.Float32BufferAttribute(positions, 3);
    this.colorAttr = new THREE.Float32BufferAttribute(colors, 3);
    this.geometry.setAttribute('position', this.positionAttr);
    this.geometry.setAttribute('color', this.colorAttr);

    // Material: additive blending for glow effect
    const texture = createParticleTexture();
    const material = new THREE.PointsMaterial({
      size: cfg.baseSize,
      sizeAttenuation: true,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    this.points = new THREE.Points(this.geometry, material);
    scene.add(this.points);

    // Subscribe to frame updates
    bus.on('frame', ({ delta, elapsed }) => this.update(delta, elapsed));
  }

  /** Per-frame physics step */
  private update(dt: number, elapsed: number): void {
    const pos = this.positionAttr.array as Float32Array;
    const col = this.colorAttr.array as Float32Array;
    const vel = this.velocity;
    const acc = this.acceleration;
    const n = this.count;
    const maxDist = this.spread * 2;

    // Clamp dt to avoid physics explosion on tab-switch
    dt = Math.min(dt, 0.05);

    for (let i = 0; i < n; i++) {
      const i3 = i * 3;

      // Euler integration
      vel[i3] += acc[i3] * dt;
      vel[i3 + 1] += acc[i3 + 1] * dt;
      vel[i3 + 2] += acc[i3 + 2] * dt;

      pos[i3] += vel[i3] * dt;
      pos[i3 + 1] += vel[i3 + 1] * dt;
      pos[i3 + 2] += vel[i3 + 2] * dt;

      // Damping — lighter so forces have visible effect
      vel[i3] *= 0.995;
      vel[i3 + 1] *= 0.995;
      vel[i3 + 2] *= 0.995;

      // Boundary: reflect if too far from origin
      const dist = Math.sqrt(pos[i3] ** 2 + pos[i3 + 1] ** 2 + pos[i3 + 2] ** 2);
      if (dist > maxDist) {
        const scale = maxDist / dist;
        pos[i3] *= scale;
        pos[i3 + 1] *= scale;
        pos[i3 + 2] *= scale;
        vel[i3] *= -0.5;
        vel[i3 + 1] *= -0.5;
        vel[i3 + 2] *= -0.5;
      }

      // Reset acceleration for next frame
      acc[i3] = 0;
      acc[i3 + 1] = 0;
      acc[i3 + 2] = 0;

      // HSL twinkling: visible hue cycling + brightness pulse
      const hue = (this.baseHue[i] + Math.sin(elapsed * this.colorCycleSpeed + i * 0.1) * 0.15 + 1) % 1;
      // Brighter base + more visible flicker
      const speed = Math.sqrt(vel[i3] ** 2 + vel[i3 + 1] ** 2 + vel[i3 + 2] ** 2);
      const lightBoost = Math.min(speed * 0.1, 0.3); // faster particles glow brighter
      const lightness = 0.55 + Math.sin(elapsed * 2 + i * 0.3) * 0.15 + lightBoost;
      const saturation = 0.8 + Math.sin(elapsed * 1.2 + i * 0.5) * 0.1;
      const c = new THREE.Color();
      c.setHSL(hue, saturation, Math.min(lightness, 0.95));
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    this.positionAttr.needsUpdate = true;
    this.colorAttr.needsUpdate = true;
  }

  // ─── Force APIs ──────────────────────────────────────────────

  /** Radial repulsion (positive) or attraction (negative) */
  applyRadialForce(origin: Vec3, strength: number, radius: number): void {
    const pos = this.positionAttr.array as Float32Array;
    const acc = this.acceleration;
    const n = this.count;
    const r2 = radius * radius;

    for (let i = 0; i < n; i++) {
      const i3 = i * 3;
      const dx = pos[i3] - origin.x;
      const dy = pos[i3 + 1] - origin.y;
      const dz = pos[i3 + 2] - origin.z;
      const d2 = dx * dx + dy * dy + dz * dz;

      if (d2 < r2 && d2 > 0.001) {
        const d = Math.sqrt(d2);
        const falloff = 1 - d / radius;
        const f = strength * falloff / d;
        acc[i3] += dx * f;
        acc[i3 + 1] += dy * f;
        acc[i3 + 2] += dz * f;
      }
    }
  }

  /**
   * Spring attraction: pulls particles TOWARD target position.
   * Unlike radialForce which pushes away from origin, this directly
   * computes (target - position) and applies acceleration toward target.
   * Particles converge tightly on the moving hand.
   */
  applySpringForce(target: Vec3, strength: number, radius: number, damping: number): void {
    const pos = this.positionAttr.array as Float32Array;
    const vel = this.velocity;
    const acc = this.acceleration;
    const n = this.count;
    const r2 = radius * radius;

    for (let i = 0; i < n; i++) {
      const i3 = i * 3;
      const dx = target.x - pos[i3];
      const dy = target.y - pos[i3 + 1];
      const dz = target.z - pos[i3 + 2];
      const d2 = dx * dx + dy * dy + dz * dz;

      if (d2 < r2) {
        // Spring force: proportional to distance
        const d = Math.sqrt(d2) || 0.01;
        const springF = strength * d;
        acc[i3] += (dx / d) * springF;
        acc[i3 + 1] += (dy / d) * springF;
        acc[i3 + 2] += (dz / d) * springF;

        // Kill velocity toward target to prevent overshoot
        if (d < 2) {
          vel[i3] *= 1 - damping;
          vel[i3 + 1] *= 1 - damping;
          vel[i3 + 2] *= 1 - damping;
        }
      }
    }
  }

  /** Uniform directional wind */
  applyDirectionalForce(direction: Vec3, strength: number): void {
    const acc = this.acceleration;
    const n = this.count;
    const fx = direction.x * strength;
    const fy = direction.y * strength;
    const fz = direction.z * strength;

    for (let i = 0; i < n; i++) {
      const i3 = i * 3;
      acc[i3] += fx;
      acc[i3 + 1] += fy;
      acc[i3 + 2] += fz;
    }
  }

  /** Spiral vortex force */
  applyVortex(center: Vec3, axis: Vec3, strength: number, radius: number): void {
    const pos = this.positionAttr.array as Float32Array;
    const acc = this.acceleration;
    const n = this.count;
    const r2 = radius * radius;

    // Normalize axis
    const aLen = Math.sqrt(axis.x ** 2 + axis.y ** 2 + axis.z ** 2) || 1;
    const ax = axis.x / aLen;
    const ay = axis.y / aLen;
    const az = axis.z / aLen;

    for (let i = 0; i < n; i++) {
      const i3 = i * 3;
      const dx = pos[i3] - center.x;
      const dy = pos[i3 + 1] - center.y;
      const dz = pos[i3 + 2] - center.z;
      const d2 = dx * dx + dy * dy + dz * dz;

      if (d2 < r2 && d2 > 0.001) {
        const d = Math.sqrt(d2);
        const falloff = 1 - d / radius;
        // Cross product: axis × displacement = tangential direction
        const tx = ay * dz - az * dy;
        const ty = az * dx - ax * dz;
        const tz = ax * dy - ay * dx;
        const f = strength * falloff / d;
        acc[i3] += tx * f;
        acc[i3 + 1] += ty * f;
        acc[i3 + 2] += tz * f;
      }
    }
  }

  /** Instant velocity burst outward from a point */
  triggerBurst(origin: Vec3, strength: number): void {
    const pos = this.positionAttr.array as Float32Array;
    const vel = this.velocity;
    const n = this.count;

    for (let i = 0; i < n; i++) {
      const i3 = i * 3;
      const dx = pos[i3] - origin.x;
      const dy = pos[i3 + 1] - origin.y;
      const dz = pos[i3 + 2] - origin.z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
      // Stronger burst: cap minimum distance so far particles still get hit
      const effectiveD = Math.max(d, 2);
      const f = strength / effectiveD;
      vel[i3] += dx * f;
      vel[i3 + 1] += dy * f;
      vel[i3 + 2] += dz * f;
    }
  }

  /** Expanding ring of force */
  triggerPulse(origin: Vec3, waveSpeed: number, elapsed: number): void {
    const pos = this.positionAttr.array as Float32Array;
    const acc = this.acceleration;
    const n = this.count;
    const waveRadius = (elapsed % 10) * waveSpeed;
    const waveWidth = 3;

    for (let i = 0; i < n; i++) {
      const i3 = i * 3;
      const dx = pos[i3] - origin.x;
      const dy = pos[i3 + 1] - origin.y;
      const dz = pos[i3 + 2] - origin.z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const diff = Math.abs(d - waveRadius);

      if (diff < waveWidth) {
        const falloff = 1 - diff / waveWidth;
        const f = falloff * 2 / (d || 1);
        acc[i3] += dx * f;
        acc[i3 + 1] += dy * f;
        acc[i3 + 2] += dz * f;
      }
    }
  }

  /** Chaotic turbulence jitter */
  applyTurbulence(origin: Vec3, jitter: number, frequency: number, elapsed: number): void {
    const pos = this.positionAttr.array as Float32Array;
    const acc = this.acceleration;
    const n = this.count;
    const radius = 25;
    const r2 = radius * radius;

    for (let i = 0; i < n; i++) {
      const i3 = i * 3;
      const dx = pos[i3] - origin.x;
      const dy = pos[i3 + 1] - origin.y;
      const dz = pos[i3 + 2] - origin.z;
      const d2 = dx * dx + dy * dy + dz * dz;

      if (d2 < r2) {
        const t = elapsed * frequency + i * 0.7;
        const falloff = 1 - Math.sqrt(d2) / radius;
        acc[i3] += Math.sin(t * 1.1) * jitter * falloff;
        acc[i3 + 1] += Math.cos(t * 0.9) * jitter * falloff;
        acc[i3 + 2] += Math.sin(t * 1.3) * jitter * falloff;
      }
    }
  }

  /** Shift all particle hues by a delta */
  setGlobalColorShift(hueOffset: number): void {
    for (let i = 0; i < this.count; i++) {
      this.baseHue[i] = (this.baseHue[i] + hueOffset) % 1;
    }
  }

  getCount(): number {
    return this.count;
  }
}

export const ParticleSystem = new ParticleSystemClass();
