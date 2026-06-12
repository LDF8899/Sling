/**
 * 2D canvas overlay: hand skeleton, palm center, finger states, gesture info.
 * Press 'd' to toggle visibility.
 */
import type { HandData, GestureEvent, Vec3 } from '../core/types';
import { bus } from '../core/Bus';

const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],     // thumb
  [0, 5], [5, 6], [6, 7], [7, 8],     // index
  [0, 9], [9, 10], [10, 11], [11, 12], // middle
  [0, 13], [13, 14], [14, 15], [15, 16], // ring
  [0, 17], [17, 18], [18, 19], [19, 20], // pinky
  [5, 9], [9, 13], [13, 17],           // palm
];

const TIPS = [4, 8, 12, 16, 20];
const PIPS = [3, 6, 10, 14, 18];
const MCPS = [2, 5, 9, 13, 17];
const FINGER_NAMES = ['thumb', 'index', 'middle', 'ring', 'pinky'];

function palmCenter(lm: Vec3[]): Vec3 {
  const ids = [0, 5, 9, 13, 17];
  let x = 0, y = 0, z = 0;
  for (const i of ids) { x += lm[i].x; y += lm[i].y; z += lm[i].z; }
  return { x: x / 5, y: y / 5, z: z / 5 };
}

function dist(a: Vec3, b: Vec3): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

class DebugOverlayClass {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private gesture: GestureEvent | null = null;
  private hands: HandData[] = [];
  private visible = true;

  init(): void {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'debug-overlay';
    this.canvas.style.cssText = 'position:fixed;inset:0;z-index:5;pointer-events:none;';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    window.addEventListener('resize', () => this.resize());

    bus.on('hand:data', (hands) => { this.hands = hands; this.draw(); });
    bus.on('gesture:update', (e) => { this.gesture = e; });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'd') {
        this.visible = !this.visible;
        this.canvas.style.display = this.visible ? 'block' : 'none';
      }
    });
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private draw(): void {
    if (!this.visible) return;
    const { ctx, canvas: { width: w, height: h } } = this;
    ctx.clearRect(0, 0, w, h);

    for (const hand of this.hands) {
      const lm = hand.landmarks;
      if (lm.length < 21) continue;
      const pts = lm.map((p) => ({ x: p.x * w, y: p.y * h }));

      // Connections
      ctx.strokeStyle = 'rgba(0,255,200,0.35)';
      ctx.lineWidth = 2;
      for (const [a, b] of CONNECTIONS) {
        ctx.beginPath();
        ctx.moveTo(pts[a].x, pts[a].y);
        ctx.lineTo(pts[b].x, pts[b].y);
        ctx.stroke();
      }

      // Joints
      for (let i = 0; i < pts.length; i++) {
        const isTip = TIPS.includes(i);
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, isTip ? 5 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isTip ? '#ff6464' : 'rgba(0,255,200,0.6)';
        ctx.fill();
      }

      // Palm center — yellow crosshair
      const palm = palmCenter(lm);
      const px = palm.x * w, py = palm.y * h;
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(px - 8, py); ctx.lineTo(px + 8, py); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(px, py - 8); ctx.lineTo(px, py + 8); ctx.stroke();
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,0,0.3)';
      ctx.fill();

      // Finger state indicators — green=extended, red=curled
      const palmPt = palm;
      const names = FINGER_NAMES;
      for (let f = 0; f < 5; f++) {
        const tipD = dist(lm[TIPS[f]], palmPt);
        const pipD = dist(lm[PIPS[f]], palmPt);
        const extended = f === 0
          ? dist(lm[4], lm[5]) > dist(lm[3], lm[5]) * 1.05
          : tipD > pipD * 0.9;

        const tx = pts[TIPS[f]].x + 10;
        const ty = pts[TIPS[f]].y - 5;
        ctx.font = '10px monospace';
        ctx.fillStyle = extended ? '#00ff88' : '#ff4444';
        ctx.fillText(extended ? '✓' : '✗', tx, ty);
      }

      // Hand label
      ctx.font = '13px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fillText(`${hand.handedness} ${(hand.confidence * 100).toFixed(0)}%`, pts[0].x + 15, pts[0].y - 10);
    }

    // Gesture info bar at bottom
    if (this.gesture) {
      const g = this.gesture;
      const barY = h - 50;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, barY - 5, w, 40);

      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = g.type === 'none' ? 'rgba(255,255,255,0.3)' : '#ffff44';
      ctx.fillText(
        g.type === 'none' ? '— no gesture —' : `${g.type}`,
        w / 2, barY + 15
      );

      ctx.font = '12px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText(
        `conf:${g.confidence.toFixed(2)}  int:${g.intensity.toFixed(2)}  pos:${g.origin.x.toFixed(1)},${g.origin.y.toFixed(1)},${g.origin.z.toFixed(1)}`,
        w / 2, barY + 30
      );
      ctx.textAlign = 'start';
    }

    // Bottom-left status
    ctx.font = '11px monospace';
    ctx.fillStyle = 'rgba(0,255,100,0.5)';
    ctx.fillText(`hands:${this.hands.length}  [d]debug  [1-7]keyboard gestures`, 10, h - 8);
  }
}

export const DebugOverlay = new DebugOverlayClass();
