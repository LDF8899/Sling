/**
 * MediaPipe HandLandmarker wrapper.
 * Handles async WASM loading, camera access, and the detection loop.
 * Emits 'hand:data' events with raw landmark data.
 * Gracefully degrades: if camera/WASM fails, emits 'handtracker:error' and does not throw.
 */
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import type { HandData } from '../core/types';
import { bus } from '../core/Bus';

const DETECTION_INTERVAL_MS = 33; // ~30fps for detection (render runs at display rate)

class HandTrackerClass {
  private handLandmarker: HandLandmarker | null = null;
  private video: HTMLVideoElement | null = null;
  private ready = false;
  private lastDetectionTime = 0;
  private frameId: number | null = null;

  /** Returns true if camera + model are loaded and detection is running */
  isReady(): boolean {
    return this.ready;
  }

  /**
   * Initialize MediaPipe: request camera, load WASM + model, start detection loop.
   * Does NOT block rendering — particles are already visible when this runs.
   */
  async init(videoEl: HTMLVideoElement): Promise<void> {
    this.video = videoEl;

    try {
      // Step 1: Request camera
      // Prefer built-in camera by enumerating devices and picking one
      // that isn't a phone/remote camera
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((d) => d.kind === 'videoinput');
      // Pick the first device that looks like a built-in webcam
      // (labels like "Integrated Camera", "HD Webcam", "FaceTime" etc.)
      // Fallback to the first available device
      const preferred = videoDevices.find((d) => {
        const label = d.label.toLowerCase();
        return label.includes('integrated') || label.includes('hd webcam')
          || label.includes('facetime') || label.includes('usb')
          || label.includes('webcam');
      });
      const deviceId = preferred?.deviceId || videoDevices[0]?.deviceId;
      const constraints: MediaStreamConstraints = {
        video: deviceId
          ? { width: 640, height: 480, deviceId: { exact: deviceId } }
          : { width: 640, height: 480 },
      };
      console.log(`[HandTracker] Available cameras: ${videoDevices.map((d) => d.label || d.deviceId).join(', ')}`);
      console.log(`[HandTracker] Selected: ${preferred?.label || 'default'}`);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoEl.srcObject = stream;
      await videoEl.play();

      // Step 2: Load WASM (local-first, CDN fallback)
      let vision;
      try {
        vision = await FilesetResolver.forVisionTasks('/mediapipe/');
      } catch {
        console.warn('[HandTracker] Local WASM not found, falling back to CDN');
        vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm'
        );
      }

      // Step 3: Create HandLandmarker
      this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/mediapipe/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 2,
        minHandDetectionConfidence: 0.3,
        minTrackingConfidence: 0.3,
      });

      // Step 4: Start detection loop
      this.ready = true;
      bus.emit('handtracker:ready', undefined);
      this.detectionLoop();
    } catch (err) {
      console.warn('[HandTracker] Initialization failed:', err);
      bus.emit('handtracker:error', err instanceof Error ? err : new Error(String(err)));
    }
  }

  /** rAF-driven detection loop, throttled to ~30fps */
  private detectionLoop(): void {
    this.frameId = requestAnimationFrame((now) => {
      if (!this.ready || !this.handLandmarker || !this.video) return;

      // Throttle detection to avoid choking the render loop
      if (now - this.lastDetectionTime >= DETECTION_INTERVAL_MS) {
        this.lastDetectionTime = now;

        // Guard: only detect if video has frames ready
        if (this.video.readyState >= 2) {
          try {
            const result = this.handLandmarker.detectForVideo(this.video, now);
            const hands: HandData[] = [];

            for (let i = 0; i < result.landmarks.length; i++) {
              const lm = result.landmarks[i];
              const wl = result.worldLandmarks?.[i];
              hands.push({
                landmarks: lm.map((p) => ({ x: p.x, y: p.y, z: p.z })),
                worldLandmarks: wl
                  ? wl.map((p) => ({ x: p.x, y: p.y, z: p.z }))
                  : lm.map((p) => ({ x: p.x, y: p.y, z: p.z })),
                handedness: (result.handednesses?.[i]?.[0]?.categoryName === 'Left') ? 'left' : 'right',
                confidence: result.handednesses?.[i]?.[0]?.score ?? 0.5,
              });
            }

            bus.emit('hand:data', hands);
          } catch {
            // Silently ignore detection errors (e.g., during video startup)
          }
        }
      }

      this.detectionLoop();
    });
  }

  /** Clean up: stop camera, close hand landmarker */
  dispose(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    if (this.video?.srcObject) {
      const stream = this.video.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
      this.video.srcObject = null;
    }
    this.handLandmarker?.close();
    this.handLandmarker = null;
    this.ready = false;
  }
}

export const HandTracker = new HandTrackerClass();
