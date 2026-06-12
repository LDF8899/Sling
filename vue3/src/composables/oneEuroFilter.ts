/**
 * One-Euro Filter — 自适应低通滤波器
 *
 * 论文: https://cristal.univ-lille.fr/~casiez/1euro/
 *
 * 核心特性：静止时强平滑（消除抖动），运动时快响应（低延迟）。
 * 比简单 EMA 好得多 — EMA 要么太抖要么太迟钝。
 *
 * @param freq  采样频率 (Hz)，匹配你的检测帧率
 * @param minCutoff  最小截止频率，越小静止时越平滑（默认 1.0）
 * @param beta  速度系数，越大运动时越灵敏（默认 0.007）
 * @param dCutoff  速度滤波截止频率（默认 1.0）
 */
export class OneEuroFilter {
  private freq: number
  private minCutoff: number
  private beta: number
  private dCutoff: number
  private xPrev: number | null = null
  private dxPrev = 0
  private lastTime = 0

  constructor(freq = 30, minCutoff = 1.0, beta = 0.007, dCutoff = 1.0) {
    this.freq = freq
    this.minCutoff = minCutoff
    this.beta = beta
    this.dCutoff = dCutoff
  }

  private alpha(cutoff: number): number {
    const te = 1.0 / this.freq
    const tau = 1.0 / (2 * Math.PI * cutoff)
    return 1.0 / (1.0 + tau / te)
  }

  filter(x: number, timestamp?: number): number {
    // 自动计算频率
    if (timestamp !== undefined && this.lastTime > 0) {
      const dt = (timestamp - this.lastTime) / 1000
      if (dt > 0) this.freq = 1.0 / dt
    }
    if (timestamp !== undefined) this.lastTime = timestamp

    if (this.xPrev === null) {
      this.xPrev = x
      this.dxPrev = 0
      return x
    }

    // 速度估算
    const dx = (x - this.xPrev) * this.freq
    const edx = this.alpha(this.dCutoff) * dx + (1 - this.alpha(this.dCutoff)) * this.dxPrev

    // 自适应截止频率：速度快 → 截止频率高 → 少平滑
    const cutoff = this.minCutoff + this.beta * Math.abs(edx)
    const a = this.alpha(cutoff)
    const result = a * x + (1 - a) * this.xPrev

    this.xPrev = result
    this.dxPrev = edx
    return result
  }

  reset(): void {
    this.xPrev = null
    this.dxPrev = 0
    this.lastTime = 0
  }
}
