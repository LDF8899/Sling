/**
 * Two-layer background: distant static starfield + procedural nebula panorama.
 * Both added to scene before particles so they render behind everything.
 */
import * as THREE from 'three';

class BackgroundLayerClass {
  init(scene: THREE.Scene): void {
    this.createStarfield(scene);
    this.createNebula(scene);
  }

  /** ~2000 static white dots on a distant sphere shell */
  private createStarfield(scene: THREE.Scene): void {
    const count = 2000;
    const radius = 200;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random point on unit sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + (Math.random() - 0.5) * 20;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      sizeAttenuation: true,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
    });

    scene.add(new THREE.Points(geometry, material));
  }

  /** Inward-facing sphere with procedural nebula canvas texture */
  private createNebula(scene: THREE.Scene): void {
    const texture = this.generateNebulaTexture();

    const geometry = new THREE.SphereGeometry(300, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.4,
    });

    scene.add(new THREE.Mesh(geometry, material));
  }

  /** 512x256 canvas with overlapping translucent blue-purple-pink cloud shapes */
  private generateNebulaTexture(): THREE.CanvasTexture {
    const w = 512;
    const h = 256;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;

    // Dark base
    ctx.fillStyle = '#000008';
    ctx.fillRect(0, 0, w, h);

    // Paint overlapping nebula clouds
    const clouds = [
      { cx: 128, cy: 80, rx: 150, ry: 80, color: [40, 20, 100] },
      { cx: 300, cy: 120, rx: 120, ry: 90, color: [80, 20, 90] },
      { cx: 200, cy: 200, rx: 180, ry: 60, color: [30, 30, 120] },
      { cx: 400, cy: 60, rx: 100, ry: 70, color: [100, 30, 80] },
      { cx: 80, cy: 180, rx: 130, ry: 50, color: [20, 40, 100] },
      { cx: 450, cy: 200, rx: 90, ry: 60, color: [60, 10, 90] },
    ];

    for (const cloud of clouds) {
      const gradient = ctx.createRadialGradient(
        cloud.cx, cloud.cy, 0,
        cloud.cx, cloud.cy, Math.max(cloud.rx, cloud.ry)
      );
      const [r, g, b] = cloud.color;
      gradient.addColorStop(0, `rgba(${r},${g},${b},0.25)`);
      gradient.addColorStop(0.5, `rgba(${r},${g},${b},0.1)`);
      gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(cloud.cx, cloud.cy, cloud.rx, cloud.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add a few brighter accent spots
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 10 + Math.random() * 30;
      const hue = 220 + Math.random() * 100;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `hsla(${hue},80%,60%,0.15)`);
      grad.addColorStop(1, `hsla(${hue},80%,60%,0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
}

export const BackgroundLayer = new BackgroundLayerClass();
