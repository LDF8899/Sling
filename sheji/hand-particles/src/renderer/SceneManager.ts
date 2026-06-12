/**
 * Three.js rendering pipeline: renderer, camera, orbit controls, animation loop.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { bus } from '../core/Bus';

class SceneManagerClass {
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  controls!: OrbitControls;
  private clock!: THREE.Clock;

  init(canvas: HTMLCanvasElement): void {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000005);

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
    this.camera.position.set(0, 0, 22);

    // Orbit controls — always active for mouse-driven camera
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.target.set(0, 0, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enablePan = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 50;

    // Clock for delta time
    this.clock = new THREE.Clock();

    // Resize handler
    window.addEventListener('resize', () => this.onResize());
  }

  startLoop(): void {
    this.renderer.setAnimationLoop(() => {
      const delta = this.clock.getDelta();
      const elapsed = this.clock.getElapsedTime();
      this.controls.update();
      bus.emit('frame', { delta, elapsed });
      this.renderer.render(this.scene, this.camera);
    });
  }

  private onResize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }
}

export const SceneManager = new SceneManagerClass();
