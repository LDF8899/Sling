/**
 * postinstall script: copies MediaPipe WASM files to public/mediapipe/
 * and downloads the hand_landmarker model if not present locally.
 */
import { cpSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const src = join(root, 'node_modules', '@mediapipe', 'tasks-vision', 'wasm');
const dest = join(root, 'public', 'mediapipe');

if (!existsSync(src)) {
  console.warn('[copy-mp-wasm] Source not found, skipping:', src);
  process.exit(0);
}

mkdirSync(dest, { recursive: true });

const files = readdirSync(src);
for (const f of files) {
  cpSync(join(src, f), join(dest, f), { recursive: true });
}
console.log(`[copy-mp-wasm] Copied ${files.length} WASM files to public/mediapipe/`);

// Download model file if not present
const modelDest = join(dest, 'hand_landmarker.task');
if (!existsSync(modelDest)) {
  const modelUrl = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
  console.log('[copy-mp-wasm] Downloading hand_landmarker.task (~8MB)...');
  try {
    execSync(`curl -L -o "${modelDest}" "${modelUrl}"`, { stdio: 'inherit' });
    console.log('[copy-mp-wasm] Model downloaded successfully');
  } catch {
    console.warn('[copy-mp-wasm] Failed to download model. It will be loaded from CDN at runtime.');
  }
} else {
  console.log('[copy-mp-wasm] hand_landmarker.task already exists, skipping download');
}
