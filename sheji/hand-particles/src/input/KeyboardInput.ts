/**
 * Keyboard shortcut handler for debug/testing without a camera.
 * Keys 1-0/q/w/e map to gesture types, emitting synthetic GestureEvents.
 */
import type { GestureEvent, GestureType } from '../core/types';
import { bus } from '../core/Bus';

const KEY_MAP: Record<string, GestureType> = {
  '1': 'open_palm',
  '2': 'closed_fist',
  '3': 'pinch',
  '4': 'pointing',
  '5': 'peace',
  '6': 'rock',
  '7': 'thumbs_up',
  '8': 'swipe_left',
  '9': 'swipe_right',
  '0': 'swipe_up',
  'q': 'swipe_down',
  'w': 'two_spread',
  'e': 'two_clap',
};

class KeyboardInputClass {
  private active = false;

  init(): void {
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    this.active = true;
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (!this.active) return;

    const gestureType = KEY_MAP[e.key];
    if (!gestureType) return;

    // Prevent default for mapped keys (e.g., 'q' might trigger search in some browsers)
    e.preventDefault();

    const event: GestureEvent = {
      type: gestureType,
      confidence: 1.0,
      origin: { x: 0, y: 0, z: 0 },
      intensity: 0.8,
      handedness: 'right',
      timestamp: performance.now(),
    };

    // Add direction for swipe gestures
    if (gestureType === 'swipe_left') event.direction = { x: -1, y: 0, z: 0 };
    if (gestureType === 'swipe_right') event.direction = { x: 1, y: 0, z: 0 };
    if (gestureType === 'swipe_up') event.direction = { x: 0, y: 1, z: 0 };
    if (gestureType === 'swipe_down') event.direction = { x: 0, y: -1, z: 0 };

    bus.emit('keyboard:gesture', event);
    bus.emit('gesture:changed', event);
  }
}

export const KeyboardInput = new KeyboardInputClass();
