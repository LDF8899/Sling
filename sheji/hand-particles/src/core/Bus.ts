/**
 * Typed event bus for inter-module communication.
 * All modules emit and listen through this single channel.
 */
import type { BusEvents } from './types';

type Handler<T> = (detail: T) => void;

class EventBus extends EventTarget {
  emit<K extends keyof BusEvents>(type: K, detail: BusEvents[K]): void {
    this.dispatchEvent(new CustomEvent(type as string, { detail }));
  }

  on<K extends keyof BusEvents>(type: K, handler: Handler<BusEvents[K]>): void {
    this.addEventListener(type as string, ((e: CustomEvent) => handler(e.detail)) as EventListener);
  }

  off<K extends keyof BusEvents>(type: K, handler: Handler<BusEvents[K]>): void {
    this.removeEventListener(type as string, ((e: CustomEvent) => handler(e.detail)) as EventListener);
  }
}

export const bus = new EventBus();
