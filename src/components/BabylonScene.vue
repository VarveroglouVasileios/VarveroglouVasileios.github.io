<script setup lang="ts">
import {
  ActionManager,
  Animation,
  ArcRotateCamera,
  Color3,
  CubicEase,
  DefaultRenderingPipeline,
  DynamicTexture,
  Engine,
  EasingFunction,
  ExecuteCodeAction,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  MirrorTexture,
  PBRMaterial,
  Plane,
  Scene,
  Texture,
  SpotLight,
  StandardMaterial,
  Vector2,
  Vector3,
} from '@babylonjs/core'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { PORTFOLIO_PROJECTS, type ProjectId } from '../data/projects'

const props = defineProps<{
  projectOpen: boolean
}>()

const emit = defineEmits<{
  (event: 'project-focused', projectId: ProjectId): void
  (event: 'project-nearby', projectId: ProjectId | null): void
  (event: 'project-locked-nearby', projectId: ProjectId | null): void
  (event: 'progress-updated', payload: { visited: number; total: number }): void
  (event: 'player-position', payload: { x: number; z: number }): void
  (event: 'audio-level', payload: number): void
  (event: 'audio-booted', payload: boolean): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

let engine: Engine | null = null
let scene: Scene | null = null
let camera: ArcRotateCamera | null = null
let monolithMeshes: Mesh[] = []
let monolithHitboxes: Mesh[] = []
let monolithBeacons: Mesh[] = []
let monolithHalos: Mesh[] = []
let pulseRings: Mesh[] = []
let sectorLabels: Mesh[] = []
let lockRings: Mesh[] = []
let transitPods: Mesh[] = []
let transitRoutes: { start: Vector3; end: Vector3; speed: number; phase: number }[] = []
let monolithBaseYPositions: number[] = []
let playerAnchor: Mesh | null = null
let previousNearbyProject: ProjectId | null = null
let previousLockedNearbyProject: ProjectId | null = null
let lastHudEmit = 0
let discoveredProjects = new Set<ProjectId>()
let unlockedProjects = new Set<ProjectId>([PORTFOLIO_PROJECTS[0]?.id ?? 'atlas-runtime'])
const monolithById = new Map<ProjectId, Mesh>()
let isAnimating = false
let audioBooted = false
let audioLevel = 0
let audioContext: AudioContext | null = null
let audioAnalyser: AnalyserNode | null = null
let audioData: Float32Array | null = null
let audioMasterGain: GainNode | null = null
let ambientOscillators: OscillatorNode[] = []
const playerVelocity = new Vector3(0, 0, 0)
const activeKeys: Record<string, boolean> = {
  KeyW: false,
  KeyA: false,
  KeyS: false,
  KeyD: false,
}

const initialCameraState = {
  alpha: -Math.PI / 2,
  beta: 1.12,
  radius: 18,
  target: new Vector3(0, 1.5, 0),
}
const introCameraState = {
  alpha: -Math.PI / 1.75,
  beta: 1.28,
  radius: 56,
  target: new Vector3(0, 6, 0),
}

const setupScene = (targetCanvas: HTMLCanvasElement) => {
  engine = new Engine(targetCanvas, true, { preserveDrawingBuffer: true, stencil: true })
  scene = new Scene(engine)
  scene.clearColor.set(0.01, 0.013, 0.022, 1)
  scene.fogMode = Scene.FOGMODE_EXP2
  scene.fogDensity = 0.0082
  scene.fogColor = new Color3(0.012, 0.016, 0.028)
  scene.createDefaultEnvironment({ createSkybox: false, createGround: false })
  scene.environmentIntensity = 0.75

  camera = new ArcRotateCamera(
    'cinematicCamera',
    introCameraState.alpha,
    introCameraState.beta,
    introCameraState.radius,
    introCameraState.target.clone(),
    scene,
  )
  camera.attachControl(targetCanvas, true)
  camera.lowerRadiusLimit = 9
  camera.upperRadiusLimit = 30
  camera.wheelDeltaPercentage = 0.01
  camera.panningSensibility = 90
  camera.upperBetaLimit = 1.35
  camera.lowerBetaLimit = 0.85

  const renderingPipeline = new DefaultRenderingPipeline('cinematicPipeline', true, scene, [camera])
  renderingPipeline.samples = 4
  renderingPipeline.fxaaEnabled = true
  renderingPipeline.imageProcessingEnabled = true
  renderingPipeline.bloomEnabled = true
  renderingPipeline.bloomWeight = 0.5
  renderingPipeline.bloomThreshold = 0.82
  renderingPipeline.bloomKernel = 64
  renderingPipeline.chromaticAberrationEnabled = true
  renderingPipeline.chromaticAberration.aberrationAmount = 6
  renderingPipeline.imageProcessing.contrast = 1.08
  renderingPipeline.imageProcessing.exposure = 0.84

  const ambientLight = new HemisphericLight('ambientLight', new Vector3(0, 1, 0), scene)
  ambientLight.intensity = 0.1
  ambientLight.groundColor = new Color3(0.01, 0.01, 0.02)

  const monolithLightA = new SpotLight(
    'monolithLightA',
    new Vector3(-20, 22, 16),
    new Vector3(1, -1.4, -0.6),
    Math.PI / 2.8,
    14,
    scene,
  )
  monolithLightA.intensity = 48
  monolithLightA.diffuse = new Color3(0.64, 0.72, 0.92)

  const monolithLightB = new SpotLight(
    'monolithLightB',
    new Vector3(0, 24, -14),
    new Vector3(0, -1.3, 0.8),
    Math.PI / 2.5,
    16,
    scene,
  )
  monolithLightB.intensity = 52
  monolithLightB.diffuse = new Color3(0.78, 0.72, 0.94)

  const monolithLightC = new SpotLight(
    'monolithLightC',
    new Vector3(20, 24, 18),
    new Vector3(-1, -1.2, -0.7),
    Math.PI / 2.6,
    15,
    scene,
  )
  monolithLightC.intensity = 46
  monolithLightC.diffuse = new Color3(0.64, 0.86, 0.78)

  const floor = MeshBuilder.CreateDisc(
    'exhibitionFloor',
    { radius: 92, tessellation: 192, sideOrientation: Mesh.DOUBLESIDE },
    scene,
  )
  floor.rotation.x = Math.PI / 2
  floor.position.y = 0
  floor.receiveShadows = true
  floor.isPickable = false
  floor.isPickable = false

  const floorMaterial = new PBRMaterial('floorMaterial', scene)
  floorMaterial.albedoColor = new Color3(0.01, 0.012, 0.018)
  floorMaterial.metallic = 1
  floorMaterial.roughness = 0.06
  floorMaterial.reflectivityColor = new Color3(0.68, 0.74, 0.92)
  floorMaterial.environmentIntensity = 1.8

  const floorMirror = new MirrorTexture('floorMirror', 2048, scene, true)
  floorMirror.mirrorPlane = new Plane(0, -1, 0, 0.02)
  floorMirror.level = 0.2
  floorMaterial.reflectionTexture = floorMirror
  floor.material = floorMaterial

  const floorGrid = MeshBuilder.CreateDisc(
    'exhibitionFloorGrid',
    { radius: 91.8, tessellation: 192, sideOrientation: Mesh.DOUBLESIDE },
    scene,
  )
  floorGrid.rotation.x = Math.PI / 2
  floorGrid.position.y = 0.04
  floorGrid.isPickable = false
  floorGrid.isPickable = false

  const gridTexture = new DynamicTexture('floorGridTexture', { width: 2048, height: 2048 }, scene, true)
  const gridContext = gridTexture.getContext()
  const gridSize = 64
  gridContext.fillStyle = '#02030a'
  gridContext.fillRect(0, 0, 2048, 2048)
  gridContext.strokeStyle = 'rgba(92, 236, 255, 0.2)'
  gridContext.lineWidth = 2
  for (let i = 0; i <= 2048; i += gridSize) {
    gridContext.beginPath()
    gridContext.moveTo(i, 0)
    gridContext.lineTo(i, 2048)
    gridContext.stroke()

    gridContext.beginPath()
    gridContext.moveTo(0, i)
    gridContext.lineTo(2048, i)
    gridContext.stroke()
  }
  gridTexture.update()
  gridTexture.wrapU = Texture.WRAP_ADDRESSMODE
  gridTexture.wrapV = Texture.WRAP_ADDRESSMODE

  const gridMaterial = new PBRMaterial('floorGridMaterial', scene)
  gridMaterial.albedoColor = new Color3(0.01, 0.02, 0.03)
  gridMaterial.emissiveTexture = gridTexture
  gridMaterial.emissiveColor = new Color3(0.04, 0.2, 0.26)
  gridMaterial.alpha = 0.36
  gridMaterial.roughness = 0.4
  gridMaterial.metallic = 0.22
  gridMaterial.unlit = false
  floorGrid.material = gridMaterial

  const perimeterRing = MeshBuilder.CreateTorus(
    'perimeterRing',
    { diameter: 124, thickness: 0.35, tessellation: 180 },
    scene,
  )
  perimeterRing.rotation.x = Math.PI / 2
  perimeterRing.position.y = 0.16
  perimeterRing.isPickable = false
  perimeterRing.isPickable = false
  const perimeterMaterial = new StandardMaterial('perimeterMaterial', scene)
  perimeterMaterial.emissiveColor = new Color3(0.05, 0.32, 0.42)
  perimeterMaterial.diffuseColor = new Color3(0, 0, 0)
  perimeterRing.material = perimeterMaterial

  const transitProjectPoints = PORTFOLIO_PROJECTS.map(
    (project) => new Vector3(project.position[0], 1.2, project.position[2]),
  )
  const transitSegments: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 0],
  ]
  transitSegments.forEach(([startIndex, endIndex], index) => {
    const start = transitProjectPoints[startIndex]
    const end = transitProjectPoints[endIndex]
    if (!start || !end || !scene) return
    const midpoint = Vector3.Center(start, end).add(new Vector3(0, 0.35, 0))
    const railPath = [start, midpoint, end]

    const rail = MeshBuilder.CreateTube(
      `transit-rail-${index}`,
      { path: railPath, radius: 0.1, tessellation: 16, cap: Mesh.CAP_ALL },
      scene,
    )
    const railMaterial = new StandardMaterial(`transit-rail-material-${index}`, scene)
    railMaterial.emissiveColor = new Color3(0.06, 0.15, 0.22)
    railMaterial.diffuseColor = new Color3(0.01, 0.01, 0.01)
    rail.material = railMaterial
    rail.isPickable = false

    const pod = MeshBuilder.CreateSphere(`transit-pod-${index}`, { diameter: 0.42, segments: 24 }, scene)
    const podMaterial = new StandardMaterial(`transit-pod-material-${index}`, scene)
    podMaterial.emissiveColor = new Color3(0.08, 0.22, 0.34)
    podMaterial.diffuseColor = new Color3(0.02, 0.06, 0.08)
    pod.material = podMaterial
    pod.isPickable = false
    pod.isPickable = false
    transitPods.push(pod)
    transitRoutes.push({
      start: railPath[0]!,
      end: railPath[2]!,
      speed: 0.08 + index * 0.016,
      phase: index * 0.33,
    })
  })

  playerAnchor = MeshBuilder.CreateSphere('playerAnchor', { diameter: 0.8 }, scene)
  playerAnchor.isVisible = false
  playerAnchor.position = new Vector3(0, 1.5, 14)
  camera.lockedTarget = playerAnchor

  monolithMeshes = PORTFOLIO_PROJECTS.map((project, index) => {
    const isUnlocked = unlockedProjects.has(project.id)
    const pedestal = MeshBuilder.CreateCylinder(
      `pedestal-${project.id}`,
      { height: 0.7, diameterTop: 8.5, diameterBottom: 9.8, tessellation: 96 },
      scene!,
    )
    pedestal.position = new Vector3(project.position[0], 0.36, project.position[2])
    pedestal.isPickable = false
    pedestal.isPickable = false
    const pedestalMaterial = new PBRMaterial(`pedestal-material-${project.id}`, scene!)
    pedestalMaterial.albedoColor = new Color3(0.015, 0.018, 0.028)
    pedestalMaterial.emissiveColor = Color3.FromHexString(project.accentHex).scale(0.06)
    pedestalMaterial.metallic = 0.94
    pedestalMaterial.roughness = 0.24
    pedestal.material = pedestalMaterial

    const halo = MeshBuilder.CreateTorus(
      `halo-${project.id}`,
      { diameter: 8.8, thickness: 0.08, tessellation: 120 },
      scene!,
    )
    halo.position = new Vector3(project.position[0], 0.78, project.position[2])
    halo.rotation.x = Math.PI / 2
    halo.isPickable = false
    halo.isPickable = false
    const haloMaterial = new StandardMaterial(`halo-material-${project.id}`, scene!)
    haloMaterial.emissiveColor = Color3.FromHexString(project.accentHex).scale(isUnlocked ? 0.34 : 0.08)
    haloMaterial.diffuseColor = new Color3(0, 0, 0)
    halo.material = haloMaterial
    monolithHalos.push(halo)

    const pulseRing = MeshBuilder.CreateTorus(
      `pulse-ring-${project.id}`,
      { diameter: 6.4, thickness: 0.06, tessellation: 92 },
      scene!,
    )
    pulseRing.rotation.x = Math.PI / 2
    pulseRing.position = new Vector3(project.position[0], 0.9, project.position[2])
    pulseRing.isPickable = false
    pulseRing.isPickable = false
    const pulseMaterial = new StandardMaterial(`pulse-material-${project.id}`, scene!)
    pulseMaterial.emissiveColor = Color3.FromHexString(project.accentHex).scale(isUnlocked ? 0.24 : 0.06)
    pulseMaterial.diffuseColor = new Color3(0, 0, 0)
    pulseMaterial.alpha = isUnlocked ? 0.65 : 0.16
    pulseRing.material = pulseMaterial
    pulseRing.metadata = { pulseOffset: index * 0.67 }
    pulseRings.push(pulseRing)

    const lockRing = MeshBuilder.CreateTorus(
      `lock-ring-${project.id}`,
      { diameter: 9.4, thickness: 0.08, tessellation: 120 },
      scene!,
    )
    lockRing.rotation.x = Math.PI / 2
    lockRing.position = new Vector3(project.position[0], 1.05, project.position[2])
    lockRing.isPickable = false
    lockRing.isPickable = false
    const lockMaterial = new StandardMaterial(`lock-material-${project.id}`, scene!)
    lockMaterial.emissiveColor = new Color3(0.3, 0.08, 0.12)
    lockMaterial.diffuseColor = new Color3(0, 0, 0)
    lockMaterial.alpha = isUnlocked ? 0 : 0.48
    lockRing.isVisible = !isUnlocked
    lockRing.material = lockMaterial
    lockRings.push(lockRing)

    const labelPlane = MeshBuilder.CreatePlane(`sector-label-${project.id}`, { width: 8.2, height: 1.4 }, scene!)
    labelPlane.position = new Vector3(project.position[0], project.position[1] + 6.6, project.position[2])
    labelPlane.billboardMode = Mesh.BILLBOARDMODE_ALL
    labelPlane.isPickable = false
    labelPlane.isPickable = false
    const labelTexture = new DynamicTexture(`label-texture-${project.id}`, { width: 1024, height: 160 }, scene!, true)
    const labelContext = labelTexture.getContext()
    labelContext.clearRect(0, 0, 1024, 160)
    labelContext.fillStyle = 'rgba(4, 10, 18, 0.76)'
    labelContext.fillRect(0, 0, 1024, 160)
    labelContext.strokeStyle = 'rgba(117, 226, 255, 0.45)'
    labelContext.lineWidth = 3
    labelContext.strokeRect(4, 4, 1016, 152)
    labelContext.font = '700 44px "Segoe UI", sans-serif'
    labelContext.fillStyle = '#98d7e8'
    labelContext.fillText(project.title.toUpperCase(), 34, 68)
    labelContext.font = '500 28px "Segoe UI", sans-serif'
    if (isUnlocked) {
      labelContext.fillStyle = 'rgba(137, 205, 230, 0.8)'
      labelContext.fillText(project.sector.toUpperCase(), 34, 122)
    } else {
      labelContext.fillStyle = 'rgba(230, 110, 110, 0.8)'
      labelContext.fillText('LOCKED // COMPLETE PRIOR SECTOR', 34, 122)
    }
    labelTexture.update()
    const labelMaterial = new StandardMaterial(`label-material-${project.id}`, scene!)
    labelMaterial.diffuseTexture = labelTexture
    labelMaterial.emissiveColor = Color3.FromHexString(project.accentHex).scale(isUnlocked ? 0.05 : 0.02)
    labelMaterial.opacityTexture = labelTexture
    labelMaterial.disableLighting = true
    labelMaterial.backFaceCulling = false
    labelPlane.material = labelMaterial
    sectorLabels.push(labelPlane)

    const mesh = MeshBuilder.CreateBox(
      `monolith-${project.id}`,
      {
        width: 2.6,
        depth: 2.6,
        height: project.position[1] * 2,
      },
      scene!,
    )
    mesh.position = new Vector3(project.position[0], project.position[1], project.position[2])
    mesh.metadata = { projectId: project.id, accentHex: project.accentHex }

    const monolithMaterial = new PBRMaterial(`material-${project.id}`, scene!)
    monolithMaterial.albedoColor = new Color3(0.04, 0.09, 0.14)
    monolithMaterial.metallic = 1
    monolithMaterial.roughness = 0.15
    monolithMaterial.alpha = isUnlocked ? 0.8 : 0.6
    monolithMaterial.environmentIntensity = 2
    monolithMaterial.clearCoat.isEnabled = true
    monolithMaterial.clearCoat.intensity = 0.82
    monolithMaterial.clearCoat.roughness = 0.08
    monolithMaterial.emissiveColor = Color3.FromHexString(project.accentHex).scale(isUnlocked ? 0.05 : 0.02)
    mesh.material = monolithMaterial
    mesh.isPickable = false

    const interactionHitbox = MeshBuilder.CreateBox(
      `monolith-hitbox-${project.id}`,
      { width: 7, depth: 7, height: 16 },
      scene!,
    )
    interactionHitbox.position = mesh.position.clone()
    interactionHitbox.isVisible = true
    interactionHitbox.visibility = 0.001
    interactionHitbox.isPickable = true
    interactionHitbox.alwaysSelectAsActiveMesh = true
    interactionHitbox.actionManager = new ActionManager(scene!)
    interactionHitbox.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => {
        if (isAnimating || !unlockedProjects.has(project.id)) return
        monolithMaterial.emissiveColor = Color3.FromHexString(project.accentHex).scale(0.34)
      }),
    )
    interactionHitbox.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () => {
        const intensity = unlockedProjects.has(project.id) ? 0.05 : 0.02
        monolithMaterial.emissiveColor = Color3.FromHexString(project.accentHex).scale(intensity)
      }),
    )
    interactionHitbox.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
        if (isAnimating || !camera) return

        focusProject(project.id)
      }),
    )
    monolithHitboxes.push(interactionHitbox)

    const beacon = MeshBuilder.CreateSphere(`monolith-beacon-${project.id}`, { diameter: 0.55, segments: 20 }, scene!)
    beacon.position = mesh.position.add(new Vector3(0, project.position[1] + 1.6, 0))
    const beaconMaterial = new StandardMaterial(`monolith-beacon-material-${project.id}`, scene!)
    beaconMaterial.emissiveColor = Color3.FromHexString(project.accentHex).scale(isUnlocked ? 0.5 : 0.08)
    beaconMaterial.diffuseColor = new Color3(0, 0, 0)
    beacon.material = beaconMaterial
    beacon.isPickable = true
    beacon.actionManager = new ActionManager(scene!)
    beacon.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
        if (isAnimating || !camera) return
        focusProject(project.id)
      }),
    )
    monolithBeacons.push(beacon)
    monolithById.set(project.id, mesh)

    return mesh
  })
  monolithBaseYPositions = monolithMeshes.map((mesh) => mesh.position.y)
  emit('progress-updated', { visited: discoveredProjects.size, total: PORTFOLIO_PROJECTS.length })

  floorMirror.renderList = [...monolithMeshes, floorGrid, perimeterRing, ...pulseRings]

  animateCamera(
    initialCameraState,
    () => {
      isAnimating = false
    },
  )

  engine.runRenderLoop(() => {
    const time = performance.now() * 0.001
    monolithMeshes.forEach((mesh, index) => {
      const baseY = monolithBaseYPositions[index] ?? mesh.position.y
      mesh.position.y = baseY + Math.sin(time + index) * 0.1
      mesh.rotation.y += 0.0025 + index * 0.0002
      const hitbox = monolithHitboxes[index]
      if (hitbox) {
        hitbox.position = mesh.position.clone()
      }
      const beacon = monolithBeacons[index]
      if (beacon) {
        beacon.position = mesh.position.add(new Vector3(0, 6.2 + Math.sin(time * 2 + index) * 0.24, 0))
        beacon.rotation.y += 0.014
      }
    })
    monolithHalos.forEach((halo, index) => {
      halo.rotation.z += 0.0016 + index * 0.00015
      halo.position.y = 0.78 + Math.sin(time * 1.8 + index) * 0.03
    })
    pulseRings.forEach((ring) => {
      const pulseOffset = Number(ring.metadata?.pulseOffset ?? 0)
      const pulseFactor = 1 + (Math.sin(time * 3.2 + pulseOffset) + 1) * (0.09 + audioLevel * 0.18)
      ring.scaling.set(pulseFactor, pulseFactor, pulseFactor)
      const material = ring.material
      if (material instanceof StandardMaterial) {
        material.alpha = 0.2 + (Math.sin(time * 3.2 + pulseOffset) + 1) * (0.16 + audioLevel * 0.2)
      }
    })
    lockRings.forEach((ring, index) => {
      ring.rotation.z += 0.008 + index * 0.0008
      ring.position.y = 1.02 + Math.sin(time * 2.2 + index) * 0.03
    })
    transitPods.forEach((pod, index) => {
      const route = transitRoutes[index]
      if (!route) return
      const travel = (Math.sin(time * route.speed + route.phase) + 1) * 0.5
      pod.position = Vector3.Lerp(route.start, route.end, travel)
      pod.position.y += Math.sin(time * 4 + index) * 0.08
      const podScale = 0.82 + audioLevel * 0.36
      pod.scaling.set(podScale, podScale, podScale)
    })
    sectorLabels.forEach((label, index) => {
      const sourceMesh = monolithMeshes[index]
      if (!sourceMesh) return
      label.position.y = sourceMesh.position.y + 6.4
    })

    updatePlayerMotion()
    updateNearbyProject(time)
    updateAudioLevel()
    emitHudPosition(time)

    if (playerAnchor && camera && !isAnimating && !props.projectOpen) {
      const targetAlpha = Math.atan2(playerAnchor.position.z, playerAnchor.position.x + 0.01) + Math.PI / 2
      camera.alpha += (targetAlpha - camera.alpha) * 0.006
    }

    scene?.render()
  })
}

const updatePlayerMotion = () => {
  if (!playerAnchor || !camera || isAnimating || props.projectOpen) return

  const direction = new Vector3(0, 0, 0)
  if (activeKeys.KeyW) direction.z += 1
  if (activeKeys.KeyS) direction.z -= 1
  if (activeKeys.KeyA) direction.x -= 1
  if (activeKeys.KeyD) direction.x += 1

  const forward = new Vector3(Math.sin(camera.alpha), 0, Math.cos(camera.alpha)).normalize()
  const right = new Vector3(forward.z, 0, -forward.x).normalize()
  const targetVelocity =
    direction.lengthSquared() > 0
      ? right.scale(direction.x).add(forward.scale(direction.z)).normalize().scale(0.28)
      : Vector3.Zero()
  playerVelocity.x += (targetVelocity.x - playerVelocity.x) * 0.14
  playerVelocity.z += (targetVelocity.z - playerVelocity.z) * 0.14
  playerAnchor.position.addInPlace(playerVelocity)

  const radialDistance = Vector2.Distance(new Vector2(playerAnchor.position.x, playerAnchor.position.z), Vector2.Zero())
  if (radialDistance > 70) {
    const clampRatio = 70 / radialDistance
    playerAnchor.position.x *= clampRatio
    playerAnchor.position.z *= clampRatio
  }
}

const updateNearbyProject = (time: number) => {
  if (!playerAnchor) return
  const anchor = playerAnchor

  let nearestId: ProjectId | null = null
  let nearestLockedId: ProjectId | null = null
  let nearestDistance = Number.POSITIVE_INFINITY
  let nearestLockedDistance = Number.POSITIVE_INFINITY
  PORTFOLIO_PROJECTS.forEach((project) => {
    const distance = Vector2.Distance(
      new Vector2(anchor.position.x, anchor.position.z),
      new Vector2(project.position[0], project.position[2]),
    )
    if (unlockedProjects.has(project.id) && distance < nearestDistance) {
      nearestDistance = distance
      nearestId = project.id
    }
    if (!unlockedProjects.has(project.id) && distance < nearestLockedDistance) {
      nearestLockedDistance = distance
      nearestLockedId = project.id
    }
  })

  const canInteract = nearestDistance < 8
  const resolvedNearby = canInteract ? nearestId : null
  if (resolvedNearby !== previousNearbyProject) {
    previousNearbyProject = resolvedNearby
    emit('project-nearby', resolvedNearby)
  }
  const canInteractLocked = nearestLockedDistance < 8
  const resolvedLockedNearby = canInteractLocked ? nearestLockedId : null
  if (resolvedLockedNearby !== previousLockedNearbyProject) {
    previousLockedNearbyProject = resolvedLockedNearby
    emit('project-locked-nearby', resolvedLockedNearby)
  }

  monolithMeshes.forEach((mesh, index) => {
    const project = PORTFOLIO_PROJECTS[index]
    if (!project) return
    const distance = Vector2.Distance(
      new Vector2(anchor.position.x, anchor.position.z),
      new Vector2(project.position[0], project.position[2]),
    )
    const minIntensity = unlockedProjects.has(project.id) ? 0.08 : 0.02
    const maxIntensity = unlockedProjects.has(project.id) ? 0.28 : 0.08
    const intensity = Math.max(minIntensity, maxIntensity - distance * 0.02) + Math.sin(time * 3 + index) * 0.01
    const material = mesh.material
    if (material instanceof PBRMaterial && !isAnimating) {
      material.emissiveColor = Color3.FromHexString(project.accentHex).scale(Math.max(minIntensity, intensity))
    }
  })
}

const updateAudioLevel = () => {
  if (!audioAnalyser || !audioData) return
  audioAnalyser.getFloatFrequencyData(audioData as unknown as Float32Array<ArrayBuffer>)
  let sum = 0
  for (let i = 0; i < 18; i += 1) {
    const normalized = Math.max(0, Math.min(1, ((audioData[i] ?? -160) + 140) / 140))
    sum += normalized
  }
  audioLevel = sum / 18
  emit('audio-level', audioLevel)
}

const emitHudPosition = (time: number) => {
  if (!playerAnchor) return
  if (time - lastHudEmit < 0.08) return
  lastHudEmit = time
  emit('player-position', { x: playerAnchor.position.x, z: playerAnchor.position.z })
}

const animateCamera = (
  nextState: { alpha: number; beta: number; radius: number; target: Vector3 },
  onComplete?: () => void,
) => {
  if (!scene || !camera) return

  isAnimating = true
  const fps = 60
  const duration = 72

  const targetAnimation = new Animation(
    'cameraTargetAnimation',
    'target',
    fps,
    Animation.ANIMATIONTYPE_VECTOR3,
    Animation.ANIMATIONLOOPMODE_CONSTANT,
  )
  targetAnimation.setKeys([
    { frame: 0, value: camera.target.clone() },
    { frame: duration, value: nextState.target },
  ])

  const radiusAnimation = new Animation(
    'cameraRadiusAnimation',
    'radius',
    fps,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT,
  )
  radiusAnimation.setKeys([
    { frame: 0, value: camera.radius },
    { frame: duration, value: nextState.radius },
  ])

  const alphaAnimation = new Animation(
    'cameraAlphaAnimation',
    'alpha',
    fps,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT,
  )
  alphaAnimation.setKeys([
    { frame: 0, value: camera.alpha },
    { frame: duration, value: nextState.alpha },
  ])

  const betaAnimation = new Animation(
    'cameraBetaAnimation',
    'beta',
    fps,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT,
  )
  betaAnimation.setKeys([
    { frame: 0, value: camera.beta },
    { frame: duration, value: nextState.beta },
  ])

  const easing = new CubicEase()
  easing.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT)
  targetAnimation.setEasingFunction(easing)
  radiusAnimation.setEasingFunction(easing)
  alphaAnimation.setEasingFunction(easing)
  betaAnimation.setEasingFunction(easing)

  scene.beginDirectAnimation(
    camera,
    [targetAnimation, radiusAnimation, alphaAnimation, betaAnimation],
    0,
    duration,
    false,
    1,
    () => {
      isAnimating = false
      onComplete?.()
    },
  )
}

const focusProject = (projectId: ProjectId) => {
  const project = PORTFOLIO_PROJECTS.find((item) => item.id === projectId)
  const mesh = monolithById.get(projectId)
  if (!project || !mesh || !camera || !unlockedProjects.has(projectId)) return

  const focusTarget = mesh.position.add(new Vector3(0, 3.1, 0))
  const desiredAlpha = Math.atan2(mesh.position.z, mesh.position.x + 0.001)
  camera.lockedTarget = null
  animateCamera(
    {
      alpha: desiredAlpha,
      beta: 1.06,
      radius: 9.8,
      target: focusTarget,
    },
    () => {
      discoveredProjects.add(project.id)
      unlockNextProject()
      emit('progress-updated', { visited: discoveredProjects.size, total: PORTFOLIO_PROJECTS.length })
      emit('project-focused', project.id)
    },
  )
}

const unlockNextProject = () => {
  const orderedIds = PORTFOLIO_PROJECTS.map((project) => project.id)
  for (const id of orderedIds) {
    if (!unlockedProjects.has(id)) {
      unlockedProjects.add(id)
      applyUnlockVisualState(id)
      playUnlockReveal(id)
      break
    }
  }
}

const applyUnlockVisualState = (projectId: ProjectId) => {
  const index = PORTFOLIO_PROJECTS.findIndex((project) => project.id === projectId)
  if (index < 0) return
  const project = PORTFOLIO_PROJECTS[index]
  if (!project) return
  const monolith = monolithMeshes[index]
  if (monolith?.material instanceof PBRMaterial) {
    monolith.material.alpha = 0.8
    monolith.material.emissiveColor = Color3.FromHexString(project.accentHex).scale(0.06)
  }
  const pulseRing = pulseRings[index]
  if (pulseRing?.material instanceof StandardMaterial) {
    pulseRing.material.emissiveColor = Color3.FromHexString(project.accentHex).scale(0.58)
    pulseRing.material.alpha = 0.65
  }
  const halo = monolithHalos[index]
  if (halo?.material instanceof StandardMaterial) {
    halo.material.emissiveColor = Color3.FromHexString(project.accentHex).scale(0.34)
  }
  const lockRing = lockRings[index]
  if (lockRing?.material instanceof StandardMaterial) {
    lockRing.material.alpha = 0
  }
  lockRing?.setEnabled(false)
  const beacon = monolithBeacons[index]
  if (beacon?.material instanceof StandardMaterial) {
    beacon.material.emissiveColor = Color3.FromHexString(project.accentHex).scale(0.5)
  }
}

const playUnlockReveal = (projectId: ProjectId) => {
  if (!camera || isAnimating || props.projectOpen) return
  const unlockedMesh = monolithById.get(projectId)
  if (!unlockedMesh) return

  const currentState = {
    alpha: camera.alpha,
    beta: camera.beta,
    radius: camera.radius,
    target: camera.target.clone(),
  }
  const revealState = {
    alpha: Math.atan2(unlockedMesh.position.z, unlockedMesh.position.x + 0.001),
    beta: 1.0,
    radius: 14.5,
    target: unlockedMesh.position.add(new Vector3(0, 3, 0)),
  }

  animateCamera(revealState, () => {
    animateCamera(currentState)
  })
}

const bootAmbientAudio = async () => {
  if (audioBooted) return
  const Context = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Context) return

  audioContext = new Context()
  audioAnalyser = audioContext.createAnalyser()
  audioAnalyser.fftSize = 128
  audioData = new Float32Array(new ArrayBuffer(audioAnalyser.frequencyBinCount * Float32Array.BYTES_PER_ELEMENT))
  audioMasterGain = audioContext.createGain()
  audioMasterGain.gain.value = 0.03

  const oscillatorA = audioContext.createOscillator()
  oscillatorA.type = 'sine'
  oscillatorA.frequency.value = 58
  const oscillatorB = audioContext.createOscillator()
  oscillatorB.type = 'triangle'
  oscillatorB.frequency.value = 84

  const gainA = audioContext.createGain()
  gainA.gain.value = 0.55
  const gainB = audioContext.createGain()
  gainB.gain.value = 0.3

  oscillatorA.connect(gainA)
  oscillatorB.connect(gainB)
  gainA.connect(audioMasterGain)
  gainB.connect(audioMasterGain)
  audioMasterGain.connect(audioAnalyser)
  audioAnalyser.connect(audioContext.destination)

  oscillatorA.start()
  oscillatorB.start()
  ambientOscillators = [oscillatorA, oscillatorB]
  audioBooted = true
  emit('audio-booted', true)
}

const resetCamera = () => {
  const target = playerAnchor?.position.clone() ?? initialCameraState.target.clone()
  if (camera && playerAnchor) {
    camera.lockedTarget = null
  }
  animateCamera({
    alpha: initialCameraState.alpha,
    beta: initialCameraState.beta,
    radius: initialCameraState.radius,
    target,
  }, () => {
    if (camera && playerAnchor) {
      camera.lockedTarget = playerAnchor
    }
  })
}

defineExpose({ resetCamera })

const onKeydown = (event: KeyboardEvent) => {
  if (event.code in activeKeys) {
    activeKeys[event.code] = true
  }
  if (!audioBooted) {
    void bootAmbientAudio()
  }

  if (event.code === 'KeyE' && previousNearbyProject && !props.projectOpen) {
    focusProject(previousNearbyProject)
  }
}

const onKeyup = (event: KeyboardEvent) => {
  if (event.code in activeKeys) {
    activeKeys[event.code] = false
  }
}

const onResize = () => {
  engine?.resize()
}

onMounted(() => {
  if (!canvasRef.value) return
  setupScene(canvasRef.value)
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('keyup', onKeyup)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('keyup', onKeyup)
  monolithMeshes = []
  monolithHitboxes = []
  monolithBeacons = []
  monolithHalos = []
  pulseRings = []
  sectorLabels = []
  lockRings = []
  monolithById.clear()
  discoveredProjects = new Set<ProjectId>()
  unlockedProjects = new Set<ProjectId>([PORTFOLIO_PROJECTS[0]?.id ?? 'atlas-runtime'])
  transitPods = []
  transitRoutes = []
  ambientOscillators.forEach((oscillator) => oscillator.stop())
  ambientOscillators = []
  if (audioContext) {
    void audioContext.close()
  }
  audioContext = null
  audioAnalyser = null
  audioData = null
  audioMasterGain = null
  audioBooted = false
  audioLevel = 0
  scene?.dispose()
  engine?.dispose()
})
</script>

<template>
  <canvas ref="canvasRef" class="h-screen w-screen" />
</template>
