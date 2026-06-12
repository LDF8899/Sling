/**
 * Main entry point: orchestrates initialization sequence.
 *
 * CRITICAL: Particles render FIRST, then MediaPipe loads asynchronously.
 * This guarantees the user sees particles immediately and can use keyboard controls
 * before the camera/WASM finishes loading.
 */
import { bus } from './core/Bus';
import { SceneManager } from './renderer/SceneManager';
import { BackgroundLayer } from './renderer/BackgroundLayer';
import { ParticleSystem } from './particles/ParticleSystem';
import { ForceField } from './particles/ForceField';
import { KeyboardInput } from './input/KeyboardInput';
import { HandTracker } from './gesture/HandTracker';
import { GestureEngine } from './gesture/GestureEngine';
import { DebugOverlay } from './renderer/DebugOverlay';
import type { GestureEvent } from './core/types';

// HUD elements
const gestureDisplay = document.getElementById('gesture-display')!;
const statusDisplay = document.getElementById('status-display')!;

function updateHud(event: GestureEvent): void {
  const names: Record<string, string> = {
    open_palm: '🖐️ Open Palm',
    closed_fist: '✊ Closed Fist',
    pinch: '🤏 Pinch',
    pointing: '👉 Pointing',
    peace: '✌️ Peace',
    rock: '🤘 Rock',
    thumbs_up: '👍 Thumbs Up',
    swipe_left: '👈 Swipe Left',
    swipe_right: '👉 Swipe Right',
    swipe_up: '👆 Swipe Up',
    swipe_down: '👇 Swipe Down',
    two_spread: '🙌 Two Spread',
    two_clap: '👏 Two Clap',
    two_pull: '↔️ Two Pull',
    two_push: '🤜 Two Push',
    two_orbit: '🔄 Two Orbit',
    two_mirror: '🪞 Two Mirror',
    two_scale: '🔍 Two Scale',
    none: '—',
  };
  gestureDisplay.textContent = names[event.type] || event.type;
}

function init(): void {
  const canvas = document.getElementById('scene') as HTMLCanvasElement;
  const videoEl = document.getElementById('camera-feed') as HTMLVideoElement;

  // ── Phase 1: Synchronous setup (particles visible immediately) ──

  // 1. Renderer + camera + orbit controls
  SceneManager.init(canvas);

  // 2. Background: starfield + nebula
  BackgroundLayer.init(SceneManager.scene);

  // 3. Particle system (10000 particles)
  ParticleSystem.init(SceneManager.scene);

  // 4. Force field (gesture → physics bridge)
  ForceField.init();

  // 5. Keyboard input (immediate debug control)
  KeyboardInput.init();

  // 5b. Debug overlay — draws hand landmarks on screen
  DebugOverlay.init();

  // 6. HUD updates
  bus.on('gesture:update', updateHud);

  // 7. Start render loop — particles are now visible!
  SceneManager.startLoop();

  statusDisplay.textContent = 'particles ready · keyboard active · loading camera…';

  // ── Phase 2: Async MediaPipe loading (does not block rendering) ──

  HandTracker.init(videoEl)
    .then(() => {
      GestureEngine.init();
      statusDisplay.textContent = 'camera active · hand tracking ready';
    })
    .catch(() => {
      statusDisplay.textContent = 'camera unavailable · keyboard-only mode (1-0 keys)';
    });
}

// Wait for DOM, then initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
