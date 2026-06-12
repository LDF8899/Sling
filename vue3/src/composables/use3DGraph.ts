/**
 * use3DGraph — Three.js 3D 力导向知识图谱
 *
 * 替代 Cytoscape.js，用 Three.js 渲染可交互的 3D 知识图谱。
 * 节点 = 发光粒子球体，边 = 发光线条，布局由力导向物理引擎驱动。
 */
import { ref, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OneEuroFilter } from './oneEuroFilter'

/* ── 类型 ── */
interface GraphNodeData {
  id: string
  label: string
  type: 'family' | 'snake' | 'toxin' | 'symptom' | 'serum' | 'danger'
  family?: string
  toxin?: string
  danger?: string
  latin?: string
  [key: string]: any
}

interface GraphEdgeData {
  source: string
  target: string
  label?: string
}

interface GraphData {
  nodes: Array<{ data: GraphNodeData }>
  edges: Array<{ data: GraphEdgeData }>
  stats?: any
}

interface NodeObject {
  mesh: THREE.Mesh
  glow: THREE.Mesh
  label: THREE.Sprite
  data: GraphNodeData
  vx: number
  vy: number
  vz: number
}

/* ── 视觉常量 ── */
const NODE_STYLES: Record<string, { color: number; size: number; emissive: number }> = {
  family:  { color: 0x409EFF, size: 18, emissive: 0x2060CC },
  snake:   { color: 0x50b8f0, size: 6,  emissive: 0x2a6090 },
  toxin:   { color: 0xF56C6C, size: 14, emissive: 0xCC3030 },
  symptom: { color: 0xE6A23C, size: 8,  emissive: 0xB07010 },
  serum:   { color: 0x67C23A, size: 12, emissive: 0x308010 },
  danger:  { color: 0xFF3333, size: 14, emissive: 0xCC0000 },
}

const EDGE_COLORS: Record<string, number> = {
  toxin: 0xF56C6C,
  serum: 0x67C23A,
  symptom: 0xE6A23C,
  danger: 0xFF3333,
}

const DAMPING = 0.92
const SETTLE_FRAMES = 300
const MAX_SPEED = 15

/* ── 纹理工厂 ── */
function makeGlowTexture(size = 64): THREE.Texture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.2, 'rgba(255,255,255,0.7)')
  g.addColorStop(0.5, 'rgba(255,255,255,0.15)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

function makeLabelTexture(text: string, color = '#c8e6d7'): THREE.Texture {
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')!
  ctx.font = '20px "PingFang SC", "Microsoft YaHei", sans-serif'
  const m = ctx.measureText(text)
  const w = Math.ceil(m.width) + 16
  const h = 30
  c.width = w; c.height = h
  ctx.font = '20px "PingFang SC", "Microsoft YaHei", sans-serif'
  ctx.fillStyle = color
  ctx.textBaseline = 'middle'
  ctx.shadowColor = 'rgba(0,0,0,0.8)'
  ctx.shadowBlur = 4
  ctx.fillText(text, 8, h / 2)
  const tex = new THREE.CanvasTexture(c)
  tex.minFilter = THREE.LinearFilter
  return tex
}

function makeNebulaTexture(): THREE.Texture {
  const c = document.createElement('canvas')
  c.width = 512; c.height = 256
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#060a06'
  ctx.fillRect(0, 0, 512, 256)
  const cols = ['rgba(15,60,40,', 'rgba(10,40,60,', 'rgba(30,15,45,', 'rgba(8,35,30,']
  for (let i = 0; i < 14; i++) {
    const x = Math.random() * 512, y = Math.random() * 256, r = 30 + Math.random() * 70
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, cols[i % cols.length] + '0.18)')
    g.addColorStop(1, cols[i % cols.length] + '0)')
    ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 256)
  }
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * 512, y = Math.random() * 256
    const g = ctx.createRadialGradient(x, y, 0, x, y, 2 + Math.random() * 4)
    g.addColorStop(0, 'rgba(80,160,120,0.35)')
    g.addColorStop(1, 'rgba(80,160,120,0)')
    ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 256)
  }
  return new THREE.CanvasTexture(c)
}

/* ── 主 composable ── */
export function use3DGraph() {
  const isReady = ref(false)
  const fps = ref(60)
  const hoveredNode = ref<GraphNodeData | null>(null)

  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let controls: OrbitControls | null = null
  let composer: EffectComposer | null = null
  let animId: number | null = null

  // 节点 / 边
  const nodeMap = new Map<string, NodeObject>()
  const allEdges: Array<{ src: string; tgt: string; type: string }> = []
  const edgeMeshes: THREE.Line[] = []
  let edgeGroup: THREE.Group | null = null

  // 力导向
  let simFrame = 0
  let simAlpha = 1.0

  // 展开状态
  const expandedFamilies = new Set<string>()
  let allSnakeNodeIds: string[] = []

  // 射线拾取 + 拖拽
  const raycaster = new THREE.Raycaster()
  raycaster.params.Mesh = { threshold: 2 }
  const mouse = new THREE.Vector2()
  let currentHovered: NodeObject | null = null
  let containerEl: HTMLElement | null = null

  // 拖拽状态
  let draggedNode: NodeObject | null = null
  const dragPlane = new THREE.Plane()
  const dragOffset = new THREE.Vector3()
  const dragIntersection = new THREE.Vector3()
  let isDragging = false
  let dragStartTime = 0

  // 点击回调
  let clickCallback: ((data: GraphNodeData) => void) | null = null

  // 发光纹理（共享）
  let glowTex: THREE.Texture | null = null

  // 帧率
  let frameCount = 0
  let lastFpsTime = 0

  /* ── 初始化场景 ── */
  function initScene(container: HTMLElement) {
    containerEl = container
    const w = container.clientWidth, h = container.clientHeight

    scene = new THREE.Scene()

    // 相机
    camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 5000)
    camera.position.set(0, 0, 600)

    // 渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    container.appendChild(renderer.domElement)

    // 控制器
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.minDistance = 50
    controls.maxDistance = 2000
    controls.enablePan = true

    // Bloom 后处理
    composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(w, h),
      0.8,   // strength — 辉光强度
      0.4,   // radius — 辉光扩散半径
      0.85   // threshold — 亮度阈值
    )
    composer.addPass(bloomPass)

    // 星云背景
    const bgGeo = new THREE.SphereGeometry(2000, 32, 16)
    const bgMat = new THREE.MeshBasicMaterial({
      map: makeNebulaTexture(), side: THREE.BackSide,
      transparent: true, opacity: 0.5, depthWrite: false,
    })
    scene.add(new THREE.Mesh(bgGeo, bgMat))

    // 星点
    const starCount = 1500
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1800 + Math.random() * 200
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPos[i * 3 + 2] = r * Math.cos(phi)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0xffffff, size: 1.5, sizeAttenuation: false,
      transparent: true, opacity: 0.6, depthWrite: false,
    })))

    // 环境粒子
    const dustCount = 200
    const dustPos = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 1000
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 1000
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 500
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.Float32BufferAttribute(dustPos, 3))
    const dustPts = new THREE.Points(dustGeo, new THREE.PointsMaterial({
      map: makeGlowTexture(), size: 4, sizeAttenuation: false,
      transparent: true, blending: THREE.AdditiveBlending,
      depthWrite: false, vertexColors: false, color: 0x1a4a2a,
    }))
    scene.add(dustPts)

    edgeGroup = new THREE.Group()
    scene.add(edgeGroup)

    glowTex = makeGlowTexture()

    // 交互 — 拖拽 + 悬浮
    renderer.domElement.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('mousedown', onMouseDown)
    renderer.domElement.addEventListener('mouseup', onMouseUp)
    renderer.domElement.addEventListener('mouseleave', onMouseUp)
    renderer.domElement.style.cursor = 'default'

    // 动画
    lastFpsTime = performance.now()
    animate()

    isReady.value = true
  }

  /* ── Fresnel 发光 Shader ── */
  const fresnelVertexShader = `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
      vViewDir = normalize(-mvPos.xyz);
      gl_Position = projectionMatrix * mvPos;
    }
  `
  const fresnelFragmentShader = `
    uniform vec3 uColor;
    uniform vec3 uEmissive;
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      // Fresnel 边缘发光
      float fresnel = pow(1.0 - dot(vNormal, vViewDir), 2.5);
      // 内部发光 + Fresnel 边缘光
      vec3 inner = uEmissive * 0.6;
      vec3 rim = uColor * fresnel * 1.5;
      // 呼吸脉冲
      float pulse = 0.85 + 0.15 * sin(uTime * 2.0);
      vec3 final = (inner + rim) * pulse;
      gl_FragColor = vec4(final, 0.95 - fresnel * 0.3);
    }
  `

  /* ── 创建节点 ── */
  function addNode(data: GraphNodeData) {
    if (!scene || nodeMap.has(data.id)) return

    const style = NODE_STYLES[data.type] ?? NODE_STYLES.snake
    const col = new THREE.Color(style.color)
    const emCol = new THREE.Color(style.emissive)

    // 主球体 — Fresnel 发光 shader
    const geo = new THREE.SphereGeometry(style.size, 64, 48)
    const mat = new THREE.ShaderMaterial({
      vertexShader: fresnelVertexShader,
      fragmentShader: fresnelFragmentShader,
      uniforms: {
        uColor: { value: col },
        uEmissive: { value: emCol },
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(
      (Math.random() - 0.5) * 400,
      (Math.random() - 0.5) * 400,
      (Math.random() - 0.5) * 200,
    )
    mesh.userData = { nodeId: data.id }
    scene.add(mesh)

    // 外层光晕 — 更大更亮
    const glowGeo = new THREE.SphereGeometry(style.size * 2.5, 48, 36)
    const glowMat = new THREE.MeshBasicMaterial({
      color: style.color,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    mesh.add(glow)

    // 核心亮点 — 小而亮的白色内核
    const coreGeo = new THREE.SphereGeometry(style.size * 0.3, 32, 24)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    mesh.add(core)

    // 文字标签
    const labelTex = makeLabelTexture(data.label)
    const labelMat = new THREE.SpriteMaterial({
      map: labelTex, transparent: true, depthWrite: false,
      sizeAttenuation: true,
    })
    const label = new THREE.Sprite(labelMat)
    label.position.y = style.size + 8
    const aspect = labelTex.image.width / labelTex.image.height
    label.scale.set(aspect * 14, 14, 1)
    mesh.add(label)

    if (data.type === 'snake') {
      mesh.visible = false
      allSnakeNodeIds.push(data.id)
    }

    nodeMap.set(data.id, { mesh, glow, label, data, vx: 0, vy: 0, vz: 0 })
  }

  /* ── 创建边 ── */
  function addEdge(source: string, target: string, label?: string) {
    allEdges.push({
      src: source,
      tgt: target,
      type: guessEdgeType(source, target),
    })
  }

  function guessEdgeType(src: string, tgt: string): string {
    const srcType = src.split(':')[0]
    const tgtType = tgt.split(':')[0]
    if (srcType === 'toxin' || tgtType === 'toxin') return 'toxin'
    if (srcType === 'serum' || tgtType === 'serum') return 'serum'
    if (srcType === 'symptom' || tgtType === 'symptom') return 'symptom'
    if (srcType === 'danger' || tgtType === 'danger') return 'danger'
    return 'default'
  }

  /* ── 构建边线 ── */
  function buildEdgeMeshes() {
    if (!scene || !edgeGroup) return
    // 清除旧边
    edgeMeshes.forEach(l => { edgeGroup!.remove(l); l.geometry.dispose(); (l.material as any).dispose() })
    edgeMeshes.length = 0

    for (const edge of allEdges) {
      const srcNode = nodeMap.get(edge.src)
      const tgtNode = nodeMap.get(edge.tgt)
      if (!srcNode || !tgtNode) continue

      const geo = new THREE.BufferGeometry()
      const positions = new Float32Array(6) // 2 vertices × 3
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

      const baseColor = EDGE_COLORS[edge.type] ?? 0x3a6a4a
      const mat = new THREE.LineBasicMaterial({
        color: baseColor,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        linewidth: 1,
      })
      const line = new THREE.Line(geo, mat)
      line.userData = { src: edge.src, tgt: edge.tgt, type: edge.type }
      edgeGroup.add(line)
      edgeMeshes.push(line)
    }
  }

  /* ── 展开/折叠 ── */
  function expandFamily(familyName: string) {
    expandedFamilies.add(familyName)
    nodeMap.forEach(n => {
      if (n.data.type === 'snake' && n.data.family === familyName) {
        n.mesh.visible = true
      }
    })
    updateEdgeVisibility()
  }

  function collapseFamily(familyName: string) {
    expandedFamilies.delete(familyName)
    nodeMap.forEach(n => {
      if (n.data.type === 'snake' && n.data.family === familyName) {
        n.mesh.visible = false
      }
    })
    updateEdgeVisibility()
  }

  function toggleFamily(familyName: string) {
    if (expandedFamilies.has(familyName)) {
      collapseFamily(familyName)
    } else {
      expandFamily(familyName)
    }
  }

  function expandAll() {
    nodeMap.forEach(n => {
      if (n.data.family) expandedFamilies.add(n.data.family)
      if (n.data.type === 'snake') n.mesh.visible = true
    })
    updateEdgeVisibility()
  }

  function collapseAll() {
    expandedFamilies.clear()
    nodeMap.forEach(n => {
      if (n.data.type === 'snake') n.mesh.visible = false
    })
    updateEdgeVisibility()
  }

  function updateEdgeVisibility() {
    edgeMeshes.forEach(line => {
      const { src, tgt } = line.userData
      const srcNode = nodeMap.get(src)
      const tgtNode = nodeMap.get(tgt)
      if (!srcNode || !tgtNode) { line.visible = false; return }

      // 边可见当且仅当两端都可见
      const bothVisible = srcNode.mesh.visible && tgtNode.mesh.visible
      // 或者至少一端不是 snake 类型
      const isSnakeEdge = srcNode.data.type === 'snake' || tgtNode.data.type === 'snake'
      line.visible = isSnakeEdge ? bothVisible : true
    })
  }

  /* ── 力导向模拟（含碰撞检测） ── */
  function simulate(dt: number) {
    // 拖拽时保持最低 alpha 让物理不完全冻结
    const effectiveAlpha = isDragging ? Math.max(simAlpha, 0.3) : simAlpha
    if (effectiveAlpha < 0.005 && !isDragging) return

    const alpha = effectiveAlpha * 0.3
    const repulsionStrength = 3000
    const springLength = 120
    const springStrength = 0.06
    const gravity = 0.02
    const collisionBounce = 1.5 // 碰撞回弹强度

    const nodes = Array.from(nodeMap.values())
    const n = nodes.length

    // 斥力 + 碰撞检测 — 所有节点之间
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const a = nodes[i], b = nodes[j]
        if (!a.mesh.visible && !b.mesh.visible) continue

        const dx = a.mesh.position.x - b.mesh.position.x
        const dy = a.mesh.position.y - b.mesh.position.y
        const dz = a.mesh.position.z - b.mesh.position.z
        const distSq = dx * dx + dy * dy + dz * dz + 1
        const dist = Math.sqrt(distSq)

        // 节点半径之和（碰撞最小距离）
        const styleA = NODE_STYLES[a.data.type] ?? NODE_STYLES.snake
        const styleB = NODE_STYLES[b.data.type] ?? NODE_STYLES.snake
        const minDist = (styleA.size + styleB.size) * 1.5 // 留一些间隙

        let fx = 0, fy = 0, fz = 0

        // 硬碰撞 — 重叠时强排斥
        if (dist < minDist && dist > 0.01) {
          const overlap = minDist - dist
          const pushForce = overlap * collisionBounce
          fx = (dx / dist) * pushForce
          fy = (dy / dist) * pushForce
          fz = (dz / dist) * pushForce
        } else {
          // 常规斥力
          const force = repulsionStrength / distSq * alpha
          fx = (dx / dist) * force
          fy = (dy / dist) * force
          fz = (dz / dist) * force
        }

        // 被拖拽的节点不受反作用力
        if (a !== draggedNode) { a.vx += fx; a.vy += fy; a.vz += fz }
        if (b !== draggedNode) { b.vx -= fx; b.vy -= fy; b.vz -= fz }
      }
    }

    // 弹簧力 — 沿边
    for (const edge of allEdges) {
      const src = nodeMap.get(edge.src)
      const tgt = nodeMap.get(edge.tgt)
      if (!src || !tgt) continue
      if (!src.mesh.visible || !tgt.mesh.visible) continue

      const dx = tgt.mesh.position.x - src.mesh.position.x
      const dy = tgt.mesh.position.y - src.mesh.position.y
      const dz = tgt.mesh.position.z - src.mesh.position.z
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1
      const displacement = dist - springLength
      const force = displacement * springStrength * alpha

      const fx = (dx / dist) * force
      const fy = (dy / dist) * force
      const fz = (dz / dist) * force

      // 拖拽一端时，另一端受更强的拉力
      const dragBoost = isDragging ? 2.5 : 1
      if (src !== draggedNode) { src.vx += fx * dragBoost; src.vy += fy * dragBoost; src.vz += fz * dragBoost }
      if (tgt !== draggedNode) { tgt.vx -= fx * dragBoost; tgt.vy -= fy * dragBoost; tgt.vz -= fz * dragBoost }
    }

    // 中心引力（拖拽节点不受引力）
    for (const node of nodes) {
      if (!node.mesh.visible || node === draggedNode) continue
      node.vx -= node.mesh.position.x * gravity * alpha
      node.vy -= node.mesh.position.y * gravity * alpha
      node.vz -= node.mesh.position.z * gravity * alpha
    }

    // 积分 + 阻尼
    for (const node of nodes) {
      if (!node.mesh.visible) continue
      // 被拖拽的节点跳过积分
      if (node === draggedNode) { node.vx = 0; node.vy = 0; node.vz = 0; continue }

      node.vx *= DAMPING
      node.vy *= DAMPING
      node.vz *= DAMPING

      // 限速
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy + node.vz * node.vz)
      if (speed > MAX_SPEED) {
        const s = MAX_SPEED / speed
        node.vx *= s; node.vy *= s; node.vz *= s
      }

      node.mesh.position.x += node.vx * dt * 60
      node.mesh.position.y += node.vy * dt * 60
      node.mesh.position.z += node.vz * dt * 60
    }

    // 更新边位置
    for (const line of edgeMeshes) {
      const src = nodeMap.get(line.userData.src)
      const tgt = nodeMap.get(line.userData.tgt)
      if (!src || !tgt) continue
      const pos = line.geometry.getAttribute('position') as THREE.Float32BufferAttribute
      pos.array[0] = src.mesh.position.x
      pos.array[1] = src.mesh.position.y
      pos.array[2] = src.mesh.position.z
      pos.array[3] = tgt.mesh.position.x
      pos.array[4] = tgt.mesh.position.y
      pos.array[5] = tgt.mesh.position.z
      pos.needsUpdate = true
    }

    // 退火
    simFrame++
    if (simFrame > SETTLE_FRAMES) {
      simAlpha *= 0.995
    }
  }

  /* ── 动画循环 ── */
  let prevTime = 0

  function animate() {
    animId = requestAnimationFrame(animate)
    if (!renderer || !scene || !camera || !controls) return

    const now = performance.now()
    const dt = prevTime ? Math.min((now - prevTime) / 1000, 0.05) : 0.016
    prevTime = now
    const elapsed = now / 1000

    // FPS
    frameCount++
    if (now - lastFpsTime > 1000) {
      fps.value = Math.round(frameCount * 1000 / (now - lastFpsTime))
      frameCount = 0
      lastFpsTime = now
    }

    // 力导向
    simulate(dt)

    // 节点动画 — Fresnel shader + 光晕呼吸 + 拖拽/悬浮
    nodeMap.forEach(n => {
      if (!n.mesh.visible) return
      // 传时间给 shader
      const mat = n.mesh.material as THREE.ShaderMaterial
      if (mat.uniforms?.uTime) mat.uniforms.uTime.value = elapsed
      // 光晕呼吸
      const pulse = 1 + Math.sin(elapsed * 2 + n.mesh.position.x * 0.01) * 0.2
      n.glow.scale.setScalar(pulse)
      n.glow.material.opacity = 0.12 + Math.sin(elapsed * 1.5 + n.mesh.position.y * 0.01) * 0.06

      if (n === draggedNode) {
        n.mesh.scale.lerp(new THREE.Vector3(1.6, 1.6, 1.6), 0.2)
        n.glow.material.opacity = 0.3
        n.glow.scale.setScalar(2.0)
      } else if (n === currentHovered) {
        n.mesh.scale.lerp(new THREE.Vector3(1.4, 1.4, 1.4), 0.15)
      } else {
        n.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    })

    // 手势控制由 applyGesture 直接修改相机，animate 无需额外处理

    controls.update()
    composer.render()
  }

  /* ── 鼠标交互（拖拽 + 悬浮 + 点击） ── */

  /** 将鼠标坐标转为射线，找节点 */
  function raycastNodes(e: MouseEvent): NodeObject | null {
    if (!renderer || !camera) return null
    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const meshes = Array.from(nodeMap.values())
      .filter(n => n.mesh.visible)
      .map(n => n.mesh)
    const intersects = raycaster.intersectObjects(meshes, false)
    if (intersects.length > 0) {
      const hit = intersects[0].object as THREE.Mesh
      return nodeMap.get(hit.userData.nodeId) ?? null
    }
    return null
  }

  function onMouseMove(e: MouseEvent) {
    // 正在拖拽 → 更新拖拽节点位置
    if (isDragging && draggedNode && camera && renderer) {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)

      if (raycaster.ray.intersectPlane(dragPlane, dragIntersection)) {
        const newPos = dragIntersection.clone().add(dragOffset)
        // 计算拖拽速度（用于释放时的抛出效果）
        draggedNode.vx = (newPos.x - draggedNode.mesh.position.x) * 0.5
        draggedNode.vy = (newPos.y - draggedNode.mesh.position.y) * 0.5
        draggedNode.vz = (newPos.z - draggedNode.mesh.position.z) * 0.5
        draggedNode.mesh.position.copy(newPos)
      }
      return
    }

    // 没在拖拽 → 悬浮检测
    const hit = raycastNodes(e)
    if (hit) {
      if (hit !== currentHovered) {
        currentHovered = hit
        hoveredNode.value = hit.data
        renderer!.domElement.style.cursor = 'grab'
        highlightEdges(hit.data.id)
      }
    } else {
      if (currentHovered) {
        currentHovered = null
        hoveredNode.value = null
        renderer!.domElement.style.cursor = 'default'
        resetEdgeHighlight()
      }
    }
  }

  function onMouseDown(e: MouseEvent) {
    if (e.button !== 0) return // 只响应左键
    const hit = raycastNodes(e)
    if (!hit || !camera || !renderer) return

    // 开始拖拽
    draggedNode = hit
    isDragging = true
    dragStartTime = performance.now()
    renderer.domElement.style.cursor = 'grabbing'

    // 暂停 OrbitControls
    if (controls) controls.enabled = false

    // 创建拖拽平面（垂直于相机方向，穿过节点位置）
    const cameraDir = new THREE.Vector3()
    camera.getWorldDirection(cameraDir)
    dragPlane.setFromNormalAndCoplanarPoint(cameraDir, hit.mesh.position)

    // 计算鼠标在平面上的偏移
    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersection = new THREE.Vector3()
    raycaster.ray.intersectPlane(dragPlane, intersection)
    dragOffset.copy(hit.mesh.position).sub(intersection)

    // 重力热 — 拖拽时周围节点恢复物理活性
    simAlpha = Math.max(simAlpha, 0.5)
  }

  function onMouseUp(_e: MouseEvent) {
    if (!isDragging || !draggedNode) return

    // 拖拽时间短 = 点击（触发回调）
    const dragDuration = performance.now() - dragStartTime
    const dragDist = Math.sqrt(
      draggedNode.vx * draggedNode.vx +
      draggedNode.vy * draggedNode.vy +
      draggedNode.vz * draggedNode.vz,
    )

    if (dragDuration < 200 && dragDist < 0.5 && clickCallback) {
      // 短按 + 没怎么移动 = 点击
      clickCallback(draggedNode.data)
    } else if (dragDist > 0.5) {
      // 有拖拽速度 → 抛出效果，给节点保留惯性
      // vx/vy/vz 已经在 onMouseMove 中计算好了
      // 额外加一点力让关联节点也被带动
      for (const edge of allEdges) {
        if (edge.src === draggedNode!.data.id || edge.tgt === draggedNode!.data.id) {
          const otherId = edge.src === draggedNode!.data.id ? edge.tgt : edge.src
          const other = nodeMap.get(otherId)
          if (other) {
            other.vx += draggedNode!.vx * 0.3
            other.vy += draggedNode!.vy * 0.3
            other.vz += draggedNode!.vz * 0.3
          }
        }
      }
      // 拖拽后重新激活模拟
      simAlpha = Math.max(simAlpha, 0.4)
    }

    draggedNode = null
    isDragging = false

    // 恢复 OrbitControls
    if (controls) controls.enabled = true
    if (renderer) renderer.domElement.style.cursor = currentHovered ? 'grab' : 'default'
  }

  function onNodeClick(cb: (data: GraphNodeData) => void) {
    clickCallback = cb
  }

  function highlightEdges(nodeId: string) {
    edgeMeshes.forEach(line => {
      const { src, tgt } = line.userData
      if (src === nodeId || tgt === nodeId) {
        ;(line.material as THREE.LineBasicMaterial).opacity = 0.8
        ;(line.material as THREE.LineBasicMaterial).color.set(
          EDGE_COLORS[line.userData.type] ?? 0x66ddaa,
        )
      } else {
        ;(line.material as THREE.LineBasicMaterial).opacity = 0.08
      }
    })
  }

  function resetEdgeHighlight() {
    edgeMeshes.forEach(line => {
      ;(line.material as THREE.LineBasicMaterial).opacity = 0.25
      ;(line.material as THREE.LineBasicMaterial).color.set(
        EDGE_COLORS[line.userData.type] ?? 0x3a6a4a,
      )
    })
  }

  /* ── 搜索 ── */
  function focusNode(nodeId: string) {
    const node = nodeMap.get(nodeId)
    if (!node || !camera || !controls) return
    // 确保可见
    if (node.data.type === 'snake' && node.data.family && !expandedFamilies.has(node.data.family)) {
      expandFamily(node.data.family)
    }
    node.mesh.visible = true
    // 相机飞向节点
    const target = node.mesh.position.clone()
    const cameraOffset = new THREE.Vector3(80, 50, 120)
    const newCamPos = target.clone().add(cameraOffset)
    animateCamera(newCamPos, target)
    // 高亮
    highlightEdges(nodeId)
    setTimeout(() => resetEdgeHighlight(), 3000)
  }

  function animateCamera(targetPos: THREE.Vector3, lookAt: THREE.Vector3, duration = 800) {
    if (!camera || !controls) return
    const startPos = camera.position.clone()
    const startTarget = controls.target.clone()
    const startTime = performance.now()

    function step() {
      const elapsed = performance.now() - startTime
      const t = Math.min(elapsed / duration, 1)
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

      camera!.position.lerpVectors(startPos, targetPos, ease)
      controls!.target.lerpVectors(startTarget, lookAt, ease)
      controls!.update()

      if (t < 1) requestAnimationFrame(step)
    }
    step()
  }

  /* ── resize ── */
  function resize(container: HTMLElement) {
    if (!renderer || !camera || !composer) return
    const w = container.clientWidth, h = container.clientHeight
    renderer.setSize(w, h)
    composer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  /* ── 绑定 ── */
  function bind(container: HTMLElement) {
    initScene(container)

    const ro = new ResizeObserver(() => resize(container))
    ro.observe(container)
    return { ro }
  }

  /* ── 加载图数据 ── */
  function loadGraphData(graphData: GraphData) {
    // 创建节点
    graphData.nodes.forEach(n => addNode(n.data))
    // 创建边
    graphData.edges.forEach(e => addEdge(e.data.source, e.data.target, e.data.label))
    // 构建边线
    buildEdgeMeshes()
    // 初始折叠
    collapseAll()

    // 添加场景灯光（给 MeshStandardMaterial 用）
    if (scene) {
      const amb = new THREE.AmbientLight(0xffffff, 0.4)
      scene.add(amb)
      const dir = new THREE.DirectionalLight(0xffffff, 0.8)
      dir.position.set(200, 300, 400)
      scene.add(dir)
    }
  }

  /* ── 销毁 ── */
  function destroy() {
    if (animId !== null) cancelAnimationFrame(animId)
    renderer?.domElement.removeEventListener('mousemove', onMouseMove)
    renderer?.domElement.removeEventListener('mousedown', onMouseDown)
    renderer?.domElement.removeEventListener('mouseup', onMouseUp)
    renderer?.domElement.removeEventListener('mouseleave', onMouseUp)
    controls?.dispose()

    nodeMap.forEach(n => {
      n.mesh.geometry.dispose()
      ;(n.mesh.material as THREE.Material).dispose()
      n.glow.geometry.dispose()
      ;(n.glow.material as THREE.Material).dispose()
      ;(n.label.material as THREE.SpriteMaterial).map?.dispose()
      ;(n.label.material as THREE.SpriteMaterial).dispose()
    })
    edgeMeshes.forEach(l => {
      l.geometry.dispose()
      ;(l.material as THREE.Material).dispose()
    })

    composer?.dispose()
    renderer?.domElement.remove()
    renderer?.dispose()
    renderer = null; scene = null; camera = null; controls = null; composer = null
    nodeMap.clear(); allEdges.length = 0; edgeMeshes.length = 0
    allSnakeNodeIds.length = 0
    expandedFamilies.clear()
    isReady.value = false
  }

  /* ── 手势控制 ── */
  const filterDx = new OneEuroFilter(30, 1.0, 0.12)
  const filterDy = new OneEuroFilter(30, 1.0, 0.12)

  let prevIndexX = 0.5
  let prevIndexY = 0.5
  let hasPrevIndex = false

  let gestureRotSpeed = 1.5
  let gestureZoomSpeed = 3

  function setGestureSpeed(zoom: number, rotation: number) {
    gestureZoomSpeed = zoom
    gestureRotSpeed = rotation * 1.5
  }

  function applyGesture(gesture: string, palmX?: number, palmY?: number,
    indexTipX?: number, indexTipY?: number) {
    if (!camera || !controls) return

    // ── ☝️ 食指 → 只旋转，不缩放 ──
    if (gesture === 'pointing' && indexTipX !== undefined && indexTipY !== undefined) {
      if (!hasPrevIndex) {
        prevIndexX = indexTipX
        prevIndexY = indexTipY
        hasPrevIndex = true
      }

      const dx = indexTipX - prevIndexX
      const dy = indexTipY - prevIndexY
      prevIndexX = indexTipX
      prevIndexY = indexTipY

      const sDx = filterDx.filter(dx, performance.now())
      const sDy = filterDy.filter(dy, performance.now())

      const spherical = new THREE.Spherical()
      spherical.setFromVector3(camera.position.clone().sub(controls.target))
      spherical.theta -= sDx * gestureRotSpeed * 20
      spherical.phi += sDy * gestureRotSpeed * 15
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi))
      camera.position.copy(controls.target).add(
        new THREE.Vector3().setFromSpherical(spherical)
      )
      return // 旋转模式，跳过缩放
    } else {
      hasPrevIndex = false
    }

    // ── 🖐 张掌 → 只放大 ──
    if (gesture === 'open_palm') {
      zoomBy(gestureZoomSpeed * 5)
    }
    // ── ✊ 握拳 → 只缩小 ──
    else if (gesture === 'closed_fist') {
      zoomBy(-gestureZoomSpeed * 5)
    }
  }

  function zoomBy(delta: number) {
    if (!camera || !controls) return
    const dir = camera.position.clone().sub(controls.target).normalize()
    const dist = camera.position.distanceTo(controls.target)
    const newDist = Math.max(controls.minDistance, Math.min(controls.maxDistance, dist - delta))
    camera.position.copy(controls.target).add(dir.multiplyScalar(newDist))
  }

  onUnmounted(() => destroy())

  return {
    isReady,
    fps,
    hoveredNode,
    bind,
    destroy,
    loadGraphData,
    toggleFamily,
    expandFamily,
    collapseFamily,
    expandAll,
    collapseAll,
    focusNode,
    onNodeClick,
    applyGesture,
    setGestureSpeed,
    nodeMap,
    expandedFamilies,
  }
}
