"use strict";

AFRAME.registerComponent("game-loop", {
  tick(time, delta) {
    if (window.GameManager) {
      window.GameManager.tick(time, delta);
    }
  }
});

AFRAME.registerComponent("float-drift", {
  schema: {
    xAmp: { type: "number", default: 0 },
    yAmp: { type: "number", default: 0 },
    zAmp: { type: "number", default: 0 },
    speed: { type: "number", default: 0.2 },
    phase: { type: "number", default: 0 }
  },

  init() {
    this.basePosition = this.el.object3D.position.clone();
  },

  tick(time) {
    const t = time / 1000;
    const position = this.el.object3D.position;
    position.x = this.basePosition.x + Math.sin(t * this.data.speed + this.data.phase) * this.data.xAmp;
    position.y = this.basePosition.y + Math.cos(t * this.data.speed * 0.85 + this.data.phase) * this.data.yAmp;
    position.z = this.basePosition.z + Math.sin(t * this.data.speed * 0.55 + this.data.phase) * this.data.zAmp;
  }
});

const LEVEL_DATA = {
  1: {
    label: "LEVEL 1",
    state: "LEVEL_1",
    speed: 7.4,
    lateralSpeed: 3.1,
    verticalSpeed: 2.8,
    rings: [
      { x: 0.0, y: 2.2, z: -20 },
      { x: 0.8, y: 2.4, z: -32 },
      { x: -0.9, y: 2.7, z: -44 },
      { x: 1.1, y: 2.5, z: -56 },
      { x: -1.2, y: 2.9, z: -68 },
      { x: 0.2, y: 3.1, z: -80 },
      { x: 1.4, y: 2.7, z: -92 },
      { x: -1.0, y: 2.3, z: -104 },
      { x: 0.7, y: 3.3, z: -116 },
      { x: 0.0, y: 2.8, z: -128 }
    ],
    obstacles: [
      { x: -2.4, y: 2.5, z: -26, radius: 1.1 },
      { x: 2.6, y: 3.2, z: -50, radius: 1.15 },
      { x: -2.2, y: 3.5, z: -74, radius: 1.2 },
      { x: 2.5, y: 2.2, z: -98, radius: 1.15 },
      { x: -2.5, y: 3.0, z: -122, radius: 1.2 }
    ],
    bonusRings: [],
    startGate: {
      x: 0.0,
      y: 2.2,
      z: -10,
      label: "Level 1 Start",
      subLabel: "Paper Run",
      frameColor: "#7dd3fc",
      accentColor: "#e0f2fe",
      bannerColor: "#dbeafe",
      textColor: "#f8fafc"
    },
    finishGate: {
      x: 0.0,
      y: 2.8,
      z: -144,
      label: "Finish",
      subLabel: "Level Complete",
      frameColor: "#22d3ee",
      accentColor: "#fde68a",
      bannerColor: "#fef3c7",
      textColor: "#ffffff"
    }
  },
  2: {
    label: "LEVEL 2",
    state: "LEVEL_2",
    speed: 8.6,
    lateralSpeed: 3.5,
    verticalSpeed: 3.2,
    rings: [
      { x: 0.0, y: 2.2, z: -20 },
      { x: 1.4, y: 2.5, z: -32 },
      { x: -1.6, y: 3.0, z: -44 },
      { x: 2.2, y: 3.7, z: -56 },
      { x: -2.3, y: 2.4, z: -68 },
      { x: 0.8, y: 3.5, z: -80 },
      { x: 2.5, y: 2.2, z: -92 },
      { x: -1.8, y: 4.0, z: -104 },
      { x: 0.2, y: 2.6, z: -116 },
      { x: 1.9, y: 3.8, z: -128 },
      { x: -2.4, y: 2.5, z: -140 },
      { x: 0.9, y: 4.1, z: -152 },
      { x: 2.6, y: 2.8, z: -164 },
      { x: -1.2, y: 3.9, z: -176 },
      { x: 0.0, y: 3.1, z: -188 }
    ],
    obstacles: [
      { x: -2.6, y: 2.3, z: -26, radius: 1.1, motion: { axis: "x", amplitude: 0.8, speed: 1.25, phase: 0.1 } },
      { x: 2.4, y: 3.4, z: -48, radius: 1.18, motion: { axis: "y", amplitude: 0.55, speed: 1.55, phase: 0.7 } },
      { x: -1.4, y: 3.9, z: -72, radius: 1.2, motion: { axis: "x", amplitude: 1.05, speed: 1.45, phase: 1.2 } },
      { x: 2.7, y: 2.2, z: -94, radius: 1.15, motion: { axis: "x", amplitude: 0.7, speed: 1.85, phase: 2.1 } },
      { x: -2.5, y: 3.0, z: -118, radius: 1.2, motion: { axis: "y", amplitude: 0.6, speed: 1.35, phase: 1.8 } },
      { x: 0.6, y: 4.2, z: -142, radius: 1.28, motion: { axis: "x", amplitude: 1.15, speed: 1.5, phase: 0.5 } },
      { x: -2.2, y: 2.2, z: -166, radius: 1.18, motion: { axis: "x", amplitude: 0.95, speed: 1.9, phase: 2.8 } },
      { x: 2.5, y: 3.2, z: -182, radius: 1.2, motion: { axis: "y", amplitude: 0.55, speed: 1.7, phase: 1.1 } }
    ],
    bonusRings: [
      { x: -2.9, y: 3.8, z: -62 },
      { x: 2.9, y: 2.1, z: -124 },
      { x: -2.7, y: 4.2, z: -172 }
    ],
    startGate: {
      x: 0.0,
      y: 2.2,
      z: -10,
      label: "Level 2 Start",
      subLabel: "Storm Glide",
      frameColor: "#a78bfa",
      accentColor: "#fbbf24",
      bannerColor: "#c4b5fd",
      textColor: "#f8fafc"
    },
    finishGate: {
      x: 0.0,
      y: 3.1,
      z: -204,
      label: "Finish",
      subLabel: "Level Complete",
      frameColor: "#f97316",
      accentColor: "#c4b5fd",
      bannerColor: "#fed7aa",
      textColor: "#fff7ed"
    }
  },
  3: {
    label: "LEVEL 3",
    state: "LEVEL_3",
    speed: 9.4,
    lateralSpeed: 3.8,
    verticalSpeed: 3.6,
    rings: [
      { x: 0.0, y: 2.3, z: -22 },
      { x: 1.2, y: 2.8, z: -34 },
      { x: -1.6, y: 3.4, z: -46 },
      { x: 2.1, y: 4.0, z: -58 },
      { x: -2.4, y: 2.6, z: -70 },
      { x: 0.4, y: 4.4, z: -82 },
      { x: 2.7, y: 3.0, z: -94 },
      { x: -2.0, y: 4.6, z: -106 },
      { x: 0.9, y: 2.4, z: -118 },
      { x: 2.8, y: 4.2, z: -130 },
      { x: -2.9, y: 2.7, z: -142 },
      { x: 0.0, y: 4.8, z: -154 },
      { x: 2.4, y: 3.2, z: -166 },
      { x: -2.1, y: 4.4, z: -178 },
      { x: 1.1, y: 2.5, z: -190 },
      { x: 2.9, y: 4.1, z: -202 },
      { x: -2.7, y: 3.0, z: -214 },
      { x: 0.6, y: 4.5, z: -226 },
      { x: 0.0, y: 3.3, z: -238 }
    ],
    obstacles: [
      { x: -2.7, y: 2.5, z: -30, radius: 1.12, motion: { axis: "x", amplitude: 0.9, speed: 1.35, phase: 0.2 } },
      { x: 2.5, y: 3.8, z: -52, radius: 1.18, motion: { axis: "y", amplitude: 0.65, speed: 1.55, phase: 0.8 } },
      { x: -1.9, y: 4.4, z: -76, radius: 1.22, motion: { axis: "x", amplitude: 1.1, speed: 1.5, phase: 1.4 } },
      { x: 2.9, y: 2.6, z: -98, radius: 1.18, motion: { axis: "x", amplitude: 0.85, speed: 1.9, phase: 2.1 } },
      { x: -2.8, y: 3.2, z: -122, radius: 1.24, motion: { axis: "y", amplitude: 0.7, speed: 1.45, phase: 1.7 } },
      { x: 0.7, y: 4.7, z: -146, radius: 1.3, motion: { axis: "x", amplitude: 1.2, speed: 1.6, phase: 0.4 } },
      { x: -2.4, y: 2.4, z: -170, radius: 1.2, motion: { axis: "x", amplitude: 1.0, speed: 1.85, phase: 2.8 } },
      { x: 2.6, y: 3.6, z: -188, radius: 1.22, motion: { axis: "y", amplitude: 0.65, speed: 1.75, phase: 1.2 } },
      { x: -0.6, y: 4.5, z: -206, radius: 1.28, motion: { axis: "x", amplitude: 1.1, speed: 1.55, phase: 2.4 } },
      { x: 2.8, y: 2.9, z: -222, radius: 1.18, motion: { axis: "x", amplitude: 0.8, speed: 1.95, phase: 0.9 } },
      { x: -2.5, y: 3.7, z: -236, radius: 1.24, motion: { axis: "y", amplitude: 0.6, speed: 1.7, phase: 1.6 } }
    ],
    bonusRings: [
      { x: -3.0, y: 4.3, z: -64 },
      { x: 3.0, y: 2.2, z: -124 },
      { x: -3.0, y: 4.8, z: -184 },
      { x: 2.8, y: 3.6, z: -220 }
    ],
    startGate: {
      x: 0.0,
      y: 2.2,
      z: -10,
      label: "Level 3 Start",
      subLabel: "Starry Night Dream Run",
      frameColor: "#8b5cf6",
      accentColor: "#93c5fd",
      bannerColor: "#c4b5fd",
      textColor: "#f8fafc"
    },
    finishGate: {
      x: 0.0,
      y: 3.5,
      z: -254,
      label: "Dream Finish",
      subLabel: "Final Night Glide",
      frameColor: "#f472b6",
      accentColor: "#bfdbfe",
      bannerColor: "#ddd6fe",
      textColor: "#f8fafc",
      sizeScale: 1.28,
      specialStyle: "dream"
    }
  }
};

const GameManager = {
  STATES: {
    SPLASH: "SPLASH",
    MENU: "MENU",
    LEVEL_1: "LEVEL_1",
    LEVEL_2: "LEVEL_2",
    LEVEL_3: "LEVEL_3",
    WIN: "WIN",
    GAME_OVER: "GAME_OVER",
    PAUSED: "PAUSED"
  },

  STUDENT_INFO: {
    name: "Your Name",
    id: "Your Student ID",
    course: "Sky Ring Flyer VR Assignment"
  },

  DIFFICULTY: {
    EASY: {
      label: "EASY",
      speedMultiplier: 1,
      obstacleScale: 1,
      lives: 3
    },
    HARD: {
      label: "HARD",
      speedMultiplier: 1.45,
      obstacleScale: 1.08,
      lives: 2
    }
  },

  bounds: {
    xMin: -5.2,
    xMax: 5.2,
    yMin: 1.35,
    yMax: 5.2
  },

  collision: {
    ringPlaneTolerance: 1.0,
    ringRadius: 1.1,
    bonusRingRadius: 1.05,
    obstaclePlaneTolerance: 1.5,
    playerRadius: 0.75,
    cleanupBehindDistance: 2.2
  },

  state: null,
  pausedFromState: null,
  difficulty: "EASY",
  gameplayFrozen: true,
  transitionLocked: false,
  musicEnabled: false,
  audioUnlocked: false,
  audioContext: null,
  musicNodes: null,
  timers: [],
  rings: [],
  bonusRings: [],
  obstacles: [],
  currentLevel: null,
  score: 0,
  highScore: 0,
  lives: 3,
  levelNumber: 0,
  collectedRings: 0,
  resolvedRings: 0,
  totalRings: 0,
  playerHitCooldownUntil: 0,
  debugLastLogTime: 0,
  forwardVector: null,
  movementVector: null,
  playerWorldPosition: null,
  ringLocalPosition: null,
  planeNoseProbeEl: null,
  startGateEntity: null,
  finishGateEntity: null,
  currentEnvironment: null,
  textures: {},

  init() {
    this.sceneEl = document.getElementById("scene");
    this.skyEl = document.getElementById("skyDome");
    this.ambientLightEl = document.getElementById("ambientLight");
    this.sunLightEl = document.getElementById("sunLight");
    this.fillLightEl = document.getElementById("fillLight");
    this.environmentRoot = document.getElementById("environmentRoot");
    this.worldRoot = document.getElementById("worldRoot");
    this.rigEl = document.getElementById("rig");
    this.cameraEl = document.getElementById("camera");
    this.cockpitRoot = document.getElementById("cockpitRoot");
    this.mouseCursorEl = document.getElementById("mouseCursor");
    this.vrCursorEl = document.getElementById("vrCursor");

    this.splashUI = document.getElementById("splashUI");
    this.menuUI = document.getElementById("menuUI");
    this.hudUI = document.getElementById("hudUI");
    this.pauseUI = document.getElementById("pauseUI");
    this.winUI = document.getElementById("winUI");
    this.gameOverUI = document.getElementById("gameOverUI");
    this.forwardVector = new THREE.Vector3();
    this.movementVector = new THREE.Vector3();
    this.playerWorldPosition = new THREE.Vector3();
    this.ringLocalPosition = new THREE.Vector3();

    this.loadHighScore();
    this.prepareTextures();
    this.buildCockpitModel();
    this.applyEnvironment("menu");
    this.buildUI();
    this.bindPersistentListeners();
    this.updateCursorMode();
    this.refreshMenu();
    this.refreshHud();
    this.setState(this.STATES.SPLASH);
  },

  prepareTextures() {
    this.paintRingTexture("ringTextureCanvas", ["#7c3aed", "#22d3ee", "#f472b6"]);
    this.paintRingTexture("bonusTextureCanvas", ["#f59e0b", "#fde047", "#fb923c"]);
    this.paintCloudTexture("cloudTextureCanvas");

    this.textures.ring = "#ringTextureCanvas";
    this.textures.bonus = "#bonusTextureCanvas";
    this.textures.cloud = "#cloudTextureCanvas";
  },

  paintRingTexture(canvasId, colors) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, colors[2]);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 10;
    for (let y = 18; y < canvas.height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  },

  paintCloudTexture(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(128, 96, 20, 128, 128, 120);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.55, "rgba(226, 242, 255, 0.92)");
    gradient.addColorStop(1, "rgba(121, 167, 207, 0.9)");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
    for (let i = 0; i < 16; i += 1) {
      const x = 24 + Math.random() * 208;
      const y = 24 + Math.random() * 180;
      const radius = 10 + Math.random() * 18;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  buildCockpitModel() {
    this.clearEntity(this.cockpitRoot);
    this.planeNoseProbeEl = null;

    const craftRoot = this.createElement("a-entity", this.cockpitRoot, {
      id: "paperPlaneCockpit"
    });

    this.createElement("a-triangle", craftRoot, {
      "vertex-a": "0 0.22 0",
      "vertex-b": "-0.24 -0.1 0",
      "vertex-c": "0.24 -0.1 0",
      position: "0 -0.05 -0.46",
      material: "color: #f8fafc; side: double; roughness: 1; metalness: 0; opacity: 0.98; transparent: true"
    });

    this.createElement("a-triangle", craftRoot, {
      "vertex-a": "0 0.14 0",
      "vertex-b": "-0.12 -0.06 0",
      "vertex-c": "0.12 -0.06 0",
      position: "0 -0.1 -0.26",
      material: "color: #f1f5f9; side: double; roughness: 1; metalness: 0"
    });

    this.createElement("a-triangle", craftRoot, {
      "vertex-a": "0.62 0.13 0",
      "vertex-b": "-0.04 0.02 0",
      "vertex-c": "0.7 -0.16 0",
      position: "-0.56 -0.18 -0.18",
      rotation: "-6 0 8",
      material: "color: #fefcf7; side: double; roughness: 1; metalness: 0; opacity: 0.97; transparent: true"
    });

    this.createElement("a-triangle", craftRoot, {
      "vertex-a": "-0.62 0.13 0",
      "vertex-b": "0.04 0.02 0",
      "vertex-c": "-0.7 -0.16 0",
      position: "0.56 -0.18 -0.18",
      rotation: "-6 0 -8",
      material: "color: #fefcf7; side: double; roughness: 1; metalness: 0; opacity: 0.97; transparent: true"
    });

    this.createElement("a-box", craftRoot, {
      width: 0.02,
      height: 0.42,
      depth: 0.01,
      position: "0 -0.02 -0.36",
      material: "color: #cbd5e1; opacity: 0.85; transparent: true; shader: flat"
    });

    this.createElement("a-box", craftRoot, {
      width: 0.02,
      height: 0.22,
      depth: 0.01,
      position: "-0.45 -0.12 -0.2",
      rotation: "0 0 66",
      material: "color: #d1d5db; opacity: 0.76; transparent: true; shader: flat"
    });

    this.createElement("a-box", craftRoot, {
      width: 0.02,
      height: 0.22,
      depth: 0.01,
      position: "0.45 -0.12 -0.2",
      rotation: "0 0 -66",
      material: "color: #d1d5db; opacity: 0.76; transparent: true; shader: flat"
    });

    this.createElement("a-box", craftRoot, {
      width: 0.16,
      height: 0.012,
      depth: 0.012,
      position: "0 -0.12 -0.18",
      material: "color: #93c5fd; opacity: 0.72; transparent: true; shader: flat"
    });

    this.createElement("a-triangle", craftRoot, {
      "vertex-a": "0 0.08 0",
      "vertex-b": "-0.06 -0.02 0",
      "vertex-c": "0.06 -0.02 0",
      position: "0 -0.02 -0.6",
      material: "color: #ffffff; side: double; roughness: 1; metalness: 0"
    });

    this.planeNoseProbeEl = this.createElement("a-entity", craftRoot, {
      id: "planeNoseProbe",
      position: "0 -0.02 -0.64",
      visible: false
    });
  },

  createUiCloudDecor(parent, options) {
    const root = this.createElement("a-entity", parent, {
      position: options.position,
      scale: `${options.scale} ${options.scale * 0.68} ${options.scale}`
    });

    [
      { x: 0, y: 0, z: 0, radius: 0.28 },
      { x: -0.28, y: 0.04, z: 0.02, radius: 0.22 },
      { x: 0.3, y: 0.03, z: -0.02, radius: 0.24 },
      { x: 0.06, y: 0.15, z: 0.01, radius: 0.18 }
    ].forEach((puff) => {
      this.createElement("a-sphere", root, {
        radius: puff.radius,
        position: `${puff.x} ${puff.y} ${puff.z}`,
        material: `color: ${options.color || "#ffffff"}; opacity: ${options.opacity}; transparent: true; shader: flat`
      });
    });
  },

  createUiPaperPlaneDecor(parent, options) {
    const root = this.createElement("a-entity", parent, {
      position: options.position,
      rotation: options.rotation || "0 0 0",
      scale: `${options.scale} ${options.scale} ${options.scale}`
    });

    this.createElement("a-triangle", root, {
      "vertex-a": "0 0.16 0",
      "vertex-b": "-0.22 -0.08 0",
      "vertex-c": "0.22 -0.08 0",
      material: "color: #f8fafc; side: double; opacity: 0.94; transparent: true; shader: flat"
    });

    this.createElement("a-triangle", root, {
      "vertex-a": "0 0.08 0.01",
      "vertex-b": "-0.1 -0.04 0.01",
      "vertex-c": "0.1 -0.04 0.01",
      material: "color: #e5e7eb; side: double; opacity: 0.96; transparent: true; shader: flat"
    });

    this.createElement("a-box", root, {
      width: 0.014,
      height: 0.2,
      depth: 0.01,
      position: "0 -0.02 0.02",
      material: "color: #cbd5e1; opacity: 0.75; transparent: true; shader: flat"
    });

    this.createElement("a-box", root, {
      width: 0.12,
      height: 0.01,
      depth: 0.01,
      position: "0 -0.06 0.03",
      material: `color: ${options.accentColor || "#93c5fd"}; opacity: 0.7; transparent: true; shader: flat`
    });

    return root;
  },

  createFloatingStar(parent, options) {
    const root = this.createElement("a-entity", parent, {
      position: options.position,
      scale: `${options.scale} ${options.scale} ${options.scale}`,
      "float-drift": `xAmp: ${options.drift.xAmp}; yAmp: ${options.drift.yAmp}; zAmp: ${options.drift.zAmp}; speed: ${options.drift.speed}; phase: ${options.drift.phase}`
    });

    this.createElement("a-sphere", root, {
      radius: 0.08,
      material: `color: ${options.coreColor}; emissive: ${options.coreColor}; emissiveIntensity: 1.3; shader: flat`
    });

    this.createElement("a-box", root, {
      width: 0.03,
      height: 0.28,
      depth: 0.03,
      material: `color: ${options.sparkColor}; emissive: ${options.sparkColor}; emissiveIntensity: 0.9; shader: flat; opacity: 0.9; transparent: true`
    });

    this.createElement("a-box", root, {
      width: 0.28,
      height: 0.03,
      depth: 0.03,
      material: `color: ${options.sparkColor}; emissive: ${options.sparkColor}; emissiveIntensity: 0.9; shader: flat; opacity: 0.9; transparent: true`
    });

    this.createElement("a-sphere", root, {
      radius: 0.22,
      material: `color: ${options.glowColor}; opacity: 0.12; transparent: true; shader: flat`
    });

    return root;
  },

  createDreamLantern(parent, options) {
    const root = this.createElement("a-entity", parent, {
      position: options.position,
      scale: `${options.scale} ${options.scale} ${options.scale}`,
      "float-drift": `xAmp: ${options.drift.xAmp}; yAmp: ${options.drift.yAmp}; zAmp: ${options.drift.zAmp}; speed: ${options.drift.speed}; phase: ${options.drift.phase}`
    });

    this.createElement("a-sphere", root, {
      radius: 0.28,
      scale: "1.25 1.45 1.25",
      material: `color: ${options.glowColor}; opacity: 0.14; transparent: true; shader: flat`
    });

    this.createElement("a-entity", root, {
      geometry: `primitive: octahedron; radius: 0.22`,
      material: `color: ${options.coreColor}; emissive: ${options.coreColor}; emissiveIntensity: 1.05; roughness: 0.24; metalness: 0.08`
    });

    this.createElement("a-cylinder", root, {
      radius: 0.03,
      height: 0.22,
      position: "0 0.26 0",
      material: `color: ${options.sparkColor}; emissive: ${options.sparkColor}; emissiveIntensity: 0.8; shader: flat`
    });

    return root;
  },

  applyEnvironment(theme) {
    if (this.currentEnvironment === theme) {
      return;
    }

    this.currentEnvironment = theme;
    this.clearEntity(this.environmentRoot);

    if (theme === "level3") {
      this.buildLevel3Environment();
      return;
    }

    if (theme === "level2") {
      this.buildLevel2Environment();
      return;
    }

    this.buildLevel1Environment();
  },

  buildLevel1Environment() {
    this.sceneEl.setAttribute("background", "color", "#9dd7ff");
    this.sceneEl.setAttribute("fog", "type: linear; color: #d8efff; near: 55; far: 220");
    this.skyEl.setAttribute("color", "#88d8ff");
    this.ambientLightEl.setAttribute("light", "type: ambient; intensity: 0.92; color: #f0f9ff");
    this.sunLightEl.setAttribute("light", "type: directional; intensity: 0.95; color: #fff5d6");
    this.sunLightEl.setAttribute("position", "-5 8 3");
    this.fillLightEl.setAttribute("light", "type: directional; intensity: 0.35; color: #7dd3fc");
    this.fillLightEl.setAttribute("position", "4 3 -3");

    this.createCelestialBody({
      position: "-22 16 -78",
      innerRadius: 3.2,
      outerRadius: 5.5,
      innerColor: "#fff8cf",
      outerColor: "#fde68a"
    });

    [
      { x: -16, y: 9, z: -36, scale: 2.4, opacity: 0.92, drift: { xAmp: 1.8, yAmp: 0.35, zAmp: 1.2, speed: 0.18, phase: 0.4 } },
      { x: 14, y: 7.2, z: -58, scale: 3.1, opacity: 0.9, drift: { xAmp: 1.5, yAmp: 0.28, zAmp: 1.4, speed: 0.14, phase: 1.1 } },
      { x: -5, y: 10.6, z: -82, scale: 2.8, opacity: 0.86, drift: { xAmp: 1.2, yAmp: 0.3, zAmp: 1.1, speed: 0.12, phase: 2.2 } },
      { x: 18, y: 8.8, z: -104, scale: 2.6, opacity: 0.84, drift: { xAmp: 1.7, yAmp: 0.32, zAmp: 1.0, speed: 0.16, phase: 0.8 } },
      { x: -18, y: 6.4, z: -132, scale: 3.4, opacity: 0.9, drift: { xAmp: 1.4, yAmp: 0.22, zAmp: 1.3, speed: 0.13, phase: 1.9 } },
      { x: 6, y: 11.8, z: -158, scale: 2.3, opacity: 0.82, drift: { xAmp: 1.1, yAmp: 0.25, zAmp: 1.0, speed: 0.2, phase: 2.9 } },
      { x: 0, y: 5.7, z: -188, scale: 4.2, opacity: 0.76, drift: { xAmp: 1.9, yAmp: 0.35, zAmp: 1.4, speed: 0.1, phase: 0.2 } }
    ].forEach((cloud) => {
      this.createDecorCloud(this.environmentRoot, cloud, {
        tint: "#ffffff",
        glow: "#dbeafe"
      });
    });

    [
      { x: -20, y: -1.8, z: -72, scale: 1.5 },
      { x: 18, y: -2.2, z: -116, scale: 1.75 },
      { x: -8, y: -3.5, z: -164, scale: 1.9 },
      { x: 22, y: -4.2, z: -210, scale: 2.15 }
    ].forEach((island) => {
      this.createFloatingIsland(this.environmentRoot, island, {
        topColor: "#8ccf72",
        sideColor: "#7f6b4d",
        rockColor: "#cbd5e1",
        accentColor: "#22c55e"
      });
    });
  },

  buildLevel2Environment() {
    this.sceneEl.setAttribute("background", "color", "#21132f");
    this.sceneEl.setAttribute("fog", "type: linear; color: #3a2852; near: 42; far: 180");
    this.skyEl.setAttribute("color", "#29163c");
    this.ambientLightEl.setAttribute("light", "type: ambient; intensity: 0.72; color: #ddd6fe");
    this.sunLightEl.setAttribute("light", "type: directional; intensity: 0.55; color: #fbbf24");
    this.sunLightEl.setAttribute("position", "4 7 2");
    this.fillLightEl.setAttribute("light", "type: directional; intensity: 0.46; color: #818cf8");
    this.fillLightEl.setAttribute("position", "-4 3 -4");

    this.createCelestialBody({
      position: "18 13 -72",
      innerRadius: 2.6,
      outerRadius: 4.8,
      innerColor: "#fbbf24",
      outerColor: "#a78bfa"
    });

    [
      { x: -18, y: 8.8, z: -30, scale: 2.8, opacity: 0.9, drift: { xAmp: 1.4, yAmp: 0.3, zAmp: 1.1, speed: 0.2, phase: 0.6 } },
      { x: 16, y: 7.5, z: -52, scale: 3.4, opacity: 0.9, drift: { xAmp: 1.5, yAmp: 0.35, zAmp: 1.3, speed: 0.17, phase: 1.4 } },
      { x: -4, y: 10.1, z: -78, scale: 3.2, opacity: 0.85, drift: { xAmp: 1.1, yAmp: 0.28, zAmp: 1.0, speed: 0.14, phase: 2.3 } },
      { x: 19, y: 9.2, z: -108, scale: 2.8, opacity: 0.82, drift: { xAmp: 1.2, yAmp: 0.22, zAmp: 1.2, speed: 0.16, phase: 0.9 } },
      { x: -20, y: 6.8, z: -136, scale: 3.7, opacity: 0.88, drift: { xAmp: 1.7, yAmp: 0.26, zAmp: 1.1, speed: 0.13, phase: 1.9 } },
      { x: 7, y: 11.2, z: -164, scale: 2.7, opacity: 0.8, drift: { xAmp: 1.0, yAmp: 0.22, zAmp: 1.0, speed: 0.18, phase: 2.8 } },
      { x: 0, y: 6.0, z: -196, scale: 4.3, opacity: 0.74, drift: { xAmp: 1.8, yAmp: 0.3, zAmp: 1.3, speed: 0.12, phase: 0.3 } }
    ].forEach((cloud) => {
      this.createDecorCloud(this.environmentRoot, cloud, {
        tint: "#c4b5fd",
        glow: "#f97316"
      });
    });

    [
      { x: -22, y: -2.0, z: -66, scale: 1.6 },
      { x: 17, y: -1.6, z: -114, scale: 1.82 },
      { x: -10, y: -3.6, z: -156, scale: 2.0 },
      { x: 20, y: -4.4, z: -208, scale: 2.25 }
    ].forEach((island) => {
      this.createFloatingIsland(this.environmentRoot, island, {
        topColor: "#6d5c8b",
        sideColor: "#3a2948",
        rockColor: "#a78bfa",
        accentColor: "#f97316"
      });
    });
  },

  buildLevel3Environment() {
    this.sceneEl.setAttribute("background", "color", "#090d26");
    this.sceneEl.setAttribute("fog", "type: linear; color: #1a1842; near: 38; far: 220");
    this.skyEl.setAttribute("color", "#0b1234");
    this.ambientLightEl.setAttribute("light", "type: ambient; intensity: 0.68; color: #dbeafe");
    this.sunLightEl.setAttribute("light", "type: directional; intensity: 0.38; color: #c4b5fd");
    this.sunLightEl.setAttribute("position", "-3 9 2");
    this.fillLightEl.setAttribute("light", "type: directional; intensity: 0.52; color: #60a5fa");
    this.fillLightEl.setAttribute("position", "4 4 -5");

    this.createCelestialBody({
      position: "-18 15 -94",
      innerRadius: 2.9,
      outerRadius: 5.4,
      innerColor: "#f8fafc",
      outerColor: "#93c5fd"
    });

    [
      { position: "-18 14 -44", scale: 0.95, drift: { xAmp: 0.45, yAmp: 0.18, zAmp: 0.24, speed: 0.16, phase: 0.2 } },
      { position: "-8 11 -60", scale: 0.78, drift: { xAmp: 0.4, yAmp: 0.16, zAmp: 0.22, speed: 0.14, phase: 1.4 } },
      { position: "4 13 -52", scale: 0.88, drift: { xAmp: 0.38, yAmp: 0.14, zAmp: 0.2, speed: 0.17, phase: 2.2 } },
      { position: "14 12 -74", scale: 0.82, drift: { xAmp: 0.42, yAmp: 0.15, zAmp: 0.2, speed: 0.15, phase: 0.8 } },
      { position: "20 10 -96", scale: 1.02, drift: { xAmp: 0.46, yAmp: 0.16, zAmp: 0.22, speed: 0.13, phase: 1.9 } },
      { position: "-16 9 -116", scale: 0.92, drift: { xAmp: 0.36, yAmp: 0.12, zAmp: 0.18, speed: 0.18, phase: 2.7 } },
      { position: "-4 15 -128", scale: 0.84, drift: { xAmp: 0.44, yAmp: 0.18, zAmp: 0.22, speed: 0.14, phase: 0.5 } },
      { position: "10 13 -144", scale: 0.76, drift: { xAmp: 0.35, yAmp: 0.12, zAmp: 0.18, speed: 0.16, phase: 1.1 } },
      { position: "18 11 -168", scale: 0.94, drift: { xAmp: 0.42, yAmp: 0.16, zAmp: 0.24, speed: 0.15, phase: 2.4 } },
      { position: "-20 12 -186", scale: 0.86, drift: { xAmp: 0.38, yAmp: 0.15, zAmp: 0.2, speed: 0.17, phase: 0.9 } },
      { position: "-6 10 -212", scale: 0.8, drift: { xAmp: 0.34, yAmp: 0.12, zAmp: 0.18, speed: 0.14, phase: 1.8 } },
      { position: "12 14 -228", scale: 0.98, drift: { xAmp: 0.45, yAmp: 0.16, zAmp: 0.24, speed: 0.12, phase: 2.9 } }
    ].forEach((star) => {
      this.createFloatingStar(this.environmentRoot, {
        ...star,
        coreColor: "#ffffff",
        sparkColor: "#e9d5ff",
        glowColor: "#93c5fd"
      });
    });

    [
      { x: -18, y: 8.2, z: -38, scale: 2.4, opacity: 0.72, drift: { xAmp: 1.2, yAmp: 0.28, zAmp: 1.0, speed: 0.12, phase: 0.5 } },
      { x: 16, y: 7.3, z: -66, scale: 2.9, opacity: 0.68, drift: { xAmp: 1.1, yAmp: 0.25, zAmp: 1.1, speed: 0.1, phase: 1.2 } },
      { x: -4, y: 10.8, z: -92, scale: 3.1, opacity: 0.64, drift: { xAmp: 0.95, yAmp: 0.2, zAmp: 0.9, speed: 0.11, phase: 2.1 } },
      { x: 18, y: 9.1, z: -124, scale: 2.7, opacity: 0.62, drift: { xAmp: 1.0, yAmp: 0.24, zAmp: 0.9, speed: 0.13, phase: 0.7 } },
      { x: -19, y: 6.5, z: -154, scale: 3.4, opacity: 0.7, drift: { xAmp: 1.25, yAmp: 0.22, zAmp: 1.0, speed: 0.1, phase: 1.7 } },
      { x: 7, y: 11.6, z: -182, scale: 2.6, opacity: 0.58, drift: { xAmp: 0.9, yAmp: 0.2, zAmp: 0.85, speed: 0.14, phase: 2.6 } },
      { x: -2, y: 8.7, z: -214, scale: 3.2, opacity: 0.62, drift: { xAmp: 1.15, yAmp: 0.24, zAmp: 0.95, speed: 0.12, phase: 1.0 } },
      { x: 20, y: 7.8, z: -242, scale: 2.8, opacity: 0.56, drift: { xAmp: 0.85, yAmp: 0.18, zAmp: 0.78, speed: 0.11, phase: 2.8 } }
    ].forEach((cloud) => {
      this.createDecorCloud(this.environmentRoot, cloud, {
        tint: "#ddd6fe",
        glow: "#93c5fd"
      });
    });

    [
      { position: "-14 7.6 -48", rotation: "0 0 -14", scale: 1.8, accentColor: "#c4b5fd", drift: { xAmp: 0.6, yAmp: 0.2, zAmp: 0.36, speed: 0.14, phase: 0.2 } },
      { position: "12 9.4 -88", rotation: "0 0 18", scale: 1.55, accentColor: "#93c5fd", drift: { xAmp: 0.54, yAmp: 0.18, zAmp: 0.34, speed: 0.12, phase: 1.3 } },
      { position: "-8 10.6 -136", rotation: "0 0 -10", scale: 1.72, accentColor: "#f9a8d4", drift: { xAmp: 0.58, yAmp: 0.2, zAmp: 0.32, speed: 0.13, phase: 2.1 } },
      { position: "16 8.8 -186", rotation: "0 0 16", scale: 1.62, accentColor: "#bfdbfe", drift: { xAmp: 0.56, yAmp: 0.18, zAmp: 0.3, speed: 0.11, phase: 0.9 } },
      { position: "0 11.2 -228", rotation: "0 0 -12", scale: 1.88, accentColor: "#c4b5fd", drift: { xAmp: 0.6, yAmp: 0.22, zAmp: 0.34, speed: 0.1, phase: 2.7 } }
    ].forEach((paperShape) => {
      const shapeEl = this.createUiPaperPlaneDecor(this.environmentRoot, paperShape);
      shapeEl.setAttribute(
        "float-drift",
        `xAmp: ${paperShape.drift.xAmp}; yAmp: ${paperShape.drift.yAmp}; zAmp: ${paperShape.drift.zAmp}; speed: ${paperShape.drift.speed}; phase: ${paperShape.drift.phase}`
      );
    });

    [
      { position: "-20 4.6 -74", scale: 0.92, drift: { xAmp: 0.48, yAmp: 0.16, zAmp: 0.22, speed: 0.12, phase: 0.6 } },
      { position: "18 5.3 -118", scale: 0.84, drift: { xAmp: 0.42, yAmp: 0.14, zAmp: 0.18, speed: 0.11, phase: 1.4 } },
      { position: "-16 6.0 -170", scale: 0.9, drift: { xAmp: 0.44, yAmp: 0.16, zAmp: 0.2, speed: 0.13, phase: 2.0 } },
      { position: "20 5.8 -224", scale: 0.96, drift: { xAmp: 0.46, yAmp: 0.18, zAmp: 0.22, speed: 0.1, phase: 2.8 } }
    ].forEach((lantern) => {
      this.createDreamLantern(this.environmentRoot, {
        ...lantern,
        coreColor: "#f9a8d4",
        sparkColor: "#bfdbfe",
        glowColor: "#93c5fd"
      });
    });

    [
      { x: -22, y: -2.2, z: -82, scale: 1.55 },
      { x: 18, y: -1.8, z: -128, scale: 1.82 },
      { x: -10, y: -3.9, z: -172, scale: 2.02 },
      { x: 22, y: -4.4, z: -214, scale: 2.22 },
      { x: -2, y: -5.0, z: -258, scale: 2.4 }
    ].forEach((island) => {
      this.createFloatingIsland(this.environmentRoot, island, {
        topColor: "#6c4ea3",
        sideColor: "#2c234f",
        rockColor: "#c4b5fd",
        accentColor: "#f472b6"
      });
    });
  },

  createCelestialBody(options) {
    const root = this.createElement("a-entity", this.environmentRoot, {
      position: options.position
    });

    this.createElement("a-sphere", root, {
      radius: options.outerRadius,
      material: `color: ${options.outerColor}; opacity: 0.2; transparent: true; shader: flat`
    });

    this.createElement("a-sphere", root, {
      radius: options.innerRadius,
      material: `color: ${options.innerColor}; emissive: ${options.innerColor}; emissiveIntensity: 1.45; shader: flat`
    });
  },

  createDecorCloud(parent, cloud, palette) {
    const root = this.createElement("a-entity", parent, {
      position: `${cloud.x} ${cloud.y} ${cloud.z}`,
      scale: `${cloud.scale} ${cloud.scale * 0.72} ${cloud.scale}`,
      "float-drift": `xAmp: ${cloud.drift.xAmp}; yAmp: ${cloud.drift.yAmp}; zAmp: ${cloud.drift.zAmp}; speed: ${cloud.drift.speed}; phase: ${cloud.drift.phase}`
    });

    [
      { x: 0, y: 0, z: 0, radius: 0.88 },
      { x: -0.78, y: 0.08, z: 0.06, radius: 0.66 },
      { x: 0.86, y: 0.05, z: -0.08, radius: 0.72 },
      { x: 0.12, y: 0.36, z: 0.02, radius: 0.58 },
      { x: -0.16, y: -0.02, z: 0.42, radius: 0.6 }
    ].forEach((puff) => {
      this.createElement("a-sphere", root, {
        position: `${puff.x} ${puff.y} ${puff.z}`,
        geometry: `primitive: sphere; radius: ${puff.radius}; segmentsHeight: 10; segmentsWidth: 12`,
        material: `src: ${this.textures.cloud}; color: ${palette.tint}; opacity: ${cloud.opacity}; transparent: true; roughness: 1; metalness: 0.0`
      });
    });

    this.createElement("a-sphere", root, {
      radius: 0.95,
      scale: "1.7 0.7 1.4",
      position: "0 0.02 -0.1",
      material: `color: ${palette.glow}; opacity: 0.08; transparent: true; shader: flat`
    });
  },

  createFloatingIsland(parent, island, palette) {
    const root = this.createElement("a-entity", parent, {
      position: `${island.x} ${island.y} ${island.z}`,
      scale: `${island.scale} ${island.scale} ${island.scale}`,
      "float-drift": `xAmp: 0.45; yAmp: 0.25; zAmp: 0.3; speed: 0.16; phase: ${(island.x + island.z) * 0.01}`
    });

    this.createElement("a-cylinder", root, {
      radius: 1.8,
      height: 0.48,
      position: "0 0 0",
      material: `color: ${palette.topColor}; roughness: 0.92; metalness: 0.02`
    });

    this.createElement("a-cone", root, {
      "radius-bottom": 1.62,
      "radius-top": 0.18,
      height: 2.0,
      position: "0 -1.18 0",
      material: `color: ${palette.sideColor}; roughness: 0.96; metalness: 0.0`
    });

    this.createElement("a-box", root, {
      width: 0.36,
      height: 0.32,
      depth: 0.36,
      position: "-0.55 0.32 -0.18",
      rotation: "0 20 0",
      material: `color: ${palette.rockColor}; roughness: 0.88; metalness: 0.04`
    });

    this.createElement("a-box", root, {
      width: 0.28,
      height: 0.25,
      depth: 0.28,
      position: "0.42 0.28 0.08",
      rotation: "0 -18 0",
      material: `color: ${palette.rockColor}; roughness: 0.88; metalness: 0.04`
    });

    this.createElement("a-cone", root, {
      "radius-bottom": 0.2,
      "radius-top": 0.02,
      height: 0.48,
      position: "0.2 0.46 -0.28",
      material: `color: ${palette.accentColor}; emissive: ${palette.accentColor}; emissiveIntensity: 0.35; roughness: 0.5`
    });
  },

  createCheckpointGate(gateData, type) {
    const root = this.createElement("a-entity", this.worldRoot, {
      position: `${gateData.x} ${gateData.y} ${gateData.z}`
    });

    const sizeScale = gateData.sizeScale || 1;
    const frameRadius = (type === "finish" ? 2.0 : 1.6) * sizeScale;
    const tubeRadius = (type === "finish" ? 0.16 : 0.12) * sizeScale;
    const pillarHeight = (type === "finish" ? 3.8 : 3.0) * sizeScale;
    const pillarOffset = frameRadius + 1.0;

    const glowEl = this.createElement("a-torus", root, {
      radius: frameRadius + 0.18,
      "radius-tubular": tubeRadius * 0.48,
      rotation: "0 0 0",
      material: `color: ${gateData.accentColor}; opacity: ${type === "finish" ? 0.22 : 0.16}; transparent: true; shader: flat`
    });

    const frameEl = this.createElement("a-torus", root, {
      radius: frameRadius,
      "radius-tubular": tubeRadius,
      rotation: "0 0 0",
      material: `color: ${gateData.frameColor}; emissive: ${gateData.frameColor}; emissiveIntensity: ${type === "finish" ? 1.0 : 0.72}; metalness: 0.08; roughness: 0.35`
    });

    this.createElement("a-box", root, {
      width: 0.34,
      height: pillarHeight,
      depth: 0.3,
      position: `${-pillarOffset} ${-0.3 * sizeScale} 0`,
      material: `color: ${gateData.bannerColor}; roughness: 0.82; metalness: 0.04`
    });

    this.createElement("a-box", root, {
      width: 0.34,
      height: pillarHeight,
      depth: 0.3,
      position: `${pillarOffset} ${-0.3 * sizeScale} 0`,
      material: `color: ${gateData.bannerColor}; roughness: 0.82; metalness: 0.04`
    });

    this.createElement("a-box", root, {
      width: pillarOffset * 2.0,
      height: 0.26 * sizeScale,
      depth: 0.24 * sizeScale,
      position: `0 ${frameRadius + 1.15 * sizeScale} 0`,
      material: `color: ${gateData.accentColor}; roughness: 0.72; metalness: 0.04`
    });

    this.createElement("a-plane", root, {
      width: pillarOffset * 1.65,
      height: 0.56 * sizeScale,
      position: `0 ${frameRadius + 0.72 * sizeScale} ${0.18 * sizeScale}`,
      material: `color: #082032; opacity: 0.56; transparent: true; shader: flat`
    });

    this.createText(root, gateData.label, `0 ${frameRadius + 0.8 * sizeScale} ${0.2 * sizeScale}`, 3.1 * sizeScale, gateData.textColor, 28);
    this.createText(root, gateData.subLabel, `0 ${frameRadius + 0.42 * sizeScale} ${0.2 * sizeScale}`, 2.9 * sizeScale, gateData.accentColor, 26);

    this.createUiCloudDecor(root, {
      position: `${-pillarOffset - 0.4 * sizeScale} ${-1.1 * sizeScale} -0.08`,
      scale: 0.9 * sizeScale,
      opacity: 0.28,
      color: gateData.bannerColor
    });

    this.createUiCloudDecor(root, {
      position: `${pillarOffset + 0.4 * sizeScale} ${-1.1 * sizeScale} -0.08`,
      scale: 0.9 * sizeScale,
      opacity: 0.28,
      color: gateData.bannerColor
    });

    if (gateData.specialStyle === "dream") {
      this.createElement("a-torus", root, {
        radius: frameRadius + 0.58,
        "radius-tubular": tubeRadius * 0.26,
        rotation: "0 0 0",
        material: `color: ${gateData.textColor}; opacity: 0.18; transparent: true; shader: flat`
      });

      this.createElement("a-sphere", root, {
        radius: 0.28 * sizeScale,
        position: `0 ${frameRadius + 1.55 * sizeScale} 0`,
        material: `color: ${gateData.accentColor}; emissive: ${gateData.accentColor}; emissiveIntensity: 1.2; shader: flat`
      });

      [
        { position: `${-0.92 * sizeScale} ${frameRadius + 1.28 * sizeScale} 0`, scale: 0.58 * sizeScale, phase: 0.4 },
        { position: `${0.92 * sizeScale} ${frameRadius + 1.28 * sizeScale} 0`, scale: 0.58 * sizeScale, phase: 1.2 },
        { position: `0 ${frameRadius + 1.92 * sizeScale} 0`, scale: 0.66 * sizeScale, phase: 2.0 }
      ].forEach((star) => {
        this.createFloatingStar(root, {
          position: star.position,
          scale: star.scale,
          coreColor: gateData.textColor,
          sparkColor: gateData.accentColor,
          glowColor: gateData.bannerColor,
          drift: { xAmp: 0.08, yAmp: 0.08, zAmp: 0.04, speed: 0.22, phase: star.phase }
        });
      });

      [
        { position: `${-pillarOffset - 0.58 * sizeScale} ${0.65 * sizeScale} -0.18`, phase: 0.8 },
        { position: `${pillarOffset + 0.58 * sizeScale} ${0.65 * sizeScale} -0.18`, phase: 1.7 }
      ].forEach((lantern) => {
        this.createDreamLantern(root, {
          position: lantern.position,
          scale: 0.66 * sizeScale,
          coreColor: gateData.frameColor,
          sparkColor: gateData.accentColor,
          glowColor: gateData.bannerColor,
          drift: { xAmp: 0.1, yAmp: 0.09, zAmp: 0.05, speed: 0.2, phase: lantern.phase }
        });
      });
    }

    return {
      el: root,
      glowEl,
      frameEl,
      x: gateData.x,
      y: gateData.y,
      z: gateData.z,
      openingRadius: (type === "finish" ? 1.55 : 1.25) * sizeScale,
      depthThreshold: (type === "finish" ? 1.35 : 1.0) * Math.min(sizeScale, 1.2),
      passed: false,
      missed: false,
      resolved: false,
      ready: type === "start",
      removed: false,
      lastLocalPosition: null,
      type
    };
  },

  buildUI() {
    this.clearEntity(this.splashUI);
    this.clearEntity(this.menuUI);
    this.clearEntity(this.hudUI);
    this.clearEntity(this.pauseUI);
    this.clearEntity(this.winUI);
    this.clearEntity(this.gameOverUI);

    this.buildSplashUI();
    this.buildMenuUI();
    this.buildHudUI();
    this.buildPauseUI();
    this.buildWinUI();
    this.buildGameOverUI();
  },

  buildSplashUI() {
    this.createUiCloudDecor(this.splashUI, {
      position: "-1.6 0.9 -0.1",
      scale: 0.85,
      opacity: 0.24,
      color: "#ffffff"
    });
    this.createUiCloudDecor(this.splashUI, {
      position: "1.55 -0.75 -0.1",
      scale: 0.78,
      opacity: 0.2,
      color: "#e0f2fe"
    });
    this.createUiPaperPlaneDecor(this.splashUI, {
      position: "1.25 0.98 -0.08",
      rotation: "0 0 -18",
      scale: 0.72,
      accentColor: "#7dd3fc"
    });
    this.createUiPaperPlaneDecor(this.splashUI, {
      position: "-1.18 -0.88 -0.08",
      rotation: "0 0 22",
      scale: 0.58,
      accentColor: "#c4b5fd"
    });

    const panel = this.createPanel(this.splashUI, 2.92, 2.22, "#07263b", 0.9);

    this.createText(panel, "Sky Ring Flyer", "0 0.82 0.02", 2.5, "#f8fafc", 48);
    this.createText(panel, "Fly your paper plane through the clouds", "0 0.5 0.02", 2.45, "#bae6fd", 30);
    this.createText(panel, `Student: ${this.STUDENT_INFO.name}`, "0 0.14 0.02", 2.28, "#ffffff", 26);
    this.createText(panel, `ID: ${this.STUDENT_INFO.id}`, "0 -0.1 0.02", 2.28, "#ffffff", 26);
    this.createText(panel, this.STUDENT_INFO.course, "0 -0.34 0.02", 2.35, "#cbd5e1", 24);
    this.createText(panel, "A whimsical stereoscopic VR sky run", "0 -0.62 0.02", 2.32, "#93c5fd", 24);

    this.createButton(panel, {
      id: "splashContinueButton",
      label: "Continue",
      action: "continue",
      width: 1.24,
      height: 0.28,
      position: "0 -0.94 0.03",
      color: "#0284c7",
      hoverColor: "#0ea5e9"
    });
  },

  buildMenuUI() {
    this.createUiCloudDecor(this.menuUI, {
      position: "-1.72 0.98 -0.1",
      scale: 0.92,
      opacity: 0.22,
      color: "#ffffff"
    });
    this.createUiCloudDecor(this.menuUI, {
      position: "1.7 -0.98 -0.1",
      scale: 0.88,
      opacity: 0.2,
      color: "#dbeafe"
    });
    this.createUiPaperPlaneDecor(this.menuUI, {
      position: "1.36 1.08 -0.08",
      rotation: "0 0 -16",
      scale: 0.66,
      accentColor: "#7dd3fc"
    });
    this.createUiPaperPlaneDecor(this.menuUI, {
      position: "-1.28 -1.12 -0.08",
      rotation: "0 0 18",
      scale: 0.54,
      accentColor: "#f9a8d4"
    });

    const panel = this.createPanel(this.menuUI, 3.02, 3.48, "#07263b", 0.9);

    this.createText(panel, "Paper Flight Setup", "0 1.18 0.02", 2.52, "#f8fafc", 42);
    this.createText(panel, "Tune your sky run before takeoff.", "0 0.88 0.02", 2.45, "#bae6fd", 26);
    this.createText(panel, "Use gaze or mouse click to select an option.", "0 0.62 0.02", 2.42, "#bfdbfe", 24);
    this.createText(panel, "Tap the goggles icon on mobile for stereoscopic VR.", "0 0.34 0.02", 2.45, "#7dd3fc", 22);

    this.menuMusicButton = this.createButton(panel, {
      id: "musicButton",
      label: "Music: OFF",
      action: "toggle-music",
      width: 1.82,
      height: 0.28,
      position: "0 -0.12 0.03",
      color: "#0f4c5c",
      hoverColor: "#0f766e"
    });

    this.menuDifficultyButton = this.createButton(panel, {
      id: "difficultyButton",
      label: "Difficulty: EASY",
      action: "toggle-difficulty",
      width: 1.82,
      height: 0.28,
      position: "0 -0.62 0.03",
      color: "#3b1d6e",
      hoverColor: "#5b21b6"
    });

    this.startGameButton = this.createButton(panel, {
      id: "startButton",
      label: "Start Game",
      action: "start-game",
      width: 1.82,
      height: 0.3,
      position: "0 -1.12 0.03",
      color: "#0f4c5c",
      hoverColor: "#0f766e"
    });

    this.createText(panel, "Rings score points. Clouds cost lives.", "0 -1.48 0.02", 2.42, "#dbeafe", 22);
    this.createText(panel, "Glide cleanly from the start gate to the finish gate.", "0 -1.68 0.02", 2.5, "#c4b5fd", 22);
  },

  buildHudUI() {
    const panel = this.createPanel(this.hudUI, 2.38, 0.42, "#051626", 0.8);

    this.hudRefs = {
      score: this.createText(panel, "Score\n0", "-0.84 0 0.02", 0.58, "#ffffff", 18),
      lives: this.createText(panel, "Lives\n3", "-0.28 0 0.02", 0.58, "#ffffff", 18),
      level: this.createText(panel, "Level\n1", "0.28 0 0.02", 0.58, "#93c5fd", 18),
      rings: this.createText(panel, "Rings\n0/0", "0.86 0 0.02", 0.72, "#fef3c7", 18)
    };
  },

  buildPauseUI() {
    const panel = this.createPanel(this.pauseUI, 2.42, 1.68);

    this.createText(panel, "Paused", "0 0.48 0.02", 2.1, "#f8fafc", 40);
    this.createText(panel, "Gameplay is frozen in this state.", "0 0.16 0.02", 2.05, "#bfdbfe", 24);

    this.createButton(panel, {
      id: "pauseResumeButton",
      label: "Resume",
      action: "resume-game",
      width: 1.28,
      height: 0.24,
      position: "0 -0.24 0.03"
    });

    this.createButton(panel, {
      id: "pauseMenuButton",
      label: "Back To Menu",
      action: "back-to-menu",
      width: 1.5,
      height: 0.24,
      position: "0 -0.6 0.03",
      color: "#4c1d95",
      hoverColor: "#6d28d9"
    });
  },

  buildWinUI() {
    const panel = this.createPanel(this.winUI, 2.55, 1.96);

    this.createText(panel, "You Win", "0 0.64 0.02", 2.15, "#bbf7d0", 42);
    this.winSummaryText = this.createText(panel, "", "0 0.08 0.02", 2.15, "#ffffff", 24);

    this.createButton(panel, {
      id: "winReplayButton",
      label: "Play Again",
      action: "restart-game",
      width: 1.32,
      height: 0.24,
      position: "0 -0.52 0.03"
    });

    this.createButton(panel, {
      id: "winMenuButton",
      label: "Back To Menu",
      action: "back-to-menu",
      width: 1.5,
      height: 0.24,
      position: "0 -0.84 0.03",
      color: "#4c1d95",
      hoverColor: "#6d28d9"
    });
  },

  buildGameOverUI() {
    const panel = this.createPanel(this.gameOverUI, 2.55, 1.96);

    this.createText(panel, "Game Over", "0 0.64 0.02", 2.15, "#fecaca", 42);
    this.gameOverSummaryText = this.createText(panel, "", "0 0.08 0.02", 2.15, "#ffffff", 24);

    this.createButton(panel, {
      id: "gameOverReplayButton",
      label: "Play Again",
      action: "restart-game",
      width: 1.32,
      height: 0.24,
      position: "0 -0.52 0.03"
    });

    this.createButton(panel, {
      id: "gameOverMenuButton",
      label: "Back To Menu",
      action: "back-to-menu",
      width: 1.5,
      height: 0.24,
      position: "0 -0.84 0.03",
      color: "#4c1d95",
      hoverColor: "#6d28d9"
    });
  },

  bindPersistentListeners() {
    this.sceneEl.addEventListener("loaded", () => {
      this.updateCursorMode();
      this.refreshCursorTargets();
    }, { once: true });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.isGameplayState()) {
        this.pauseGame();
      }
    });

    this.sceneEl.addEventListener("enter-vr", () => {
      this.updateCursorMode();
    });

    this.sceneEl.addEventListener("exit-vr", () => {
      this.updateCursorMode();
    });

    window.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "p") {
        this.handleAction("toggle-pause");
      }
    });
  },

  handleAction(action) {
    if (!this.isActionAllowed(action)) {
      console.log("[Sky Ring Flyer] Ignored action", {
        action,
        state: this.state
      });
      return;
    }

    this.ensureAudioReady();

    switch (action) {
      case "continue":
        this.goToMenu();
        break;
      case "toggle-music":
        this.toggleMusic();
        break;
      case "toggle-difficulty":
        this.toggleDifficulty();
        break;
      case "start-game":
        console.log("[Sky Ring Flyer] Start Game clicked");
        this.startNewGame();
        break;
      case "restart-game":
        console.log("[Sky Ring Flyer] Restart Game clicked");
        this.startNewGame();
        break;
      case "toggle-pause":
        if (this.state === this.STATES.PAUSED) {
          this.resumeGame();
        } else {
          this.pauseGame();
        }
        break;
      case "resume-game":
        this.resumeGame();
        break;
      case "back-to-menu":
        this.goToMenu();
        break;
      default:
        break;
    }
  },

  isActionAllowed(action) {
    switch (action) {
      case "continue":
        return this.state === this.STATES.SPLASH;
      case "toggle-music":
      case "toggle-difficulty":
      case "start-game":
        return this.state === this.STATES.MENU;
      case "restart-game":
        return this.state === this.STATES.WIN || this.state === this.STATES.GAME_OVER;
      case "toggle-pause":
        return this.isGameplayState() || this.state === this.STATES.PAUSED;
      case "resume-game":
        return this.state === this.STATES.PAUSED;
      case "back-to-menu":
        return this.state === this.STATES.PAUSED || this.state === this.STATES.WIN || this.state === this.STATES.GAME_OVER;
      default:
        return false;
    }
  },

  setState(nextState) {
    if (this.state === nextState) {
      return;
    }

    this.state = nextState;
    console.log("[Sky Ring Flyer] Current game state:", this.state);
    this.applyUIVisibility();
    this.refreshCursorTargets();

    if (this.state === this.STATES.MENU) {
      this.refreshMenu();
    }

    if (this.isGameplayState()) {
      this.refreshHud();
    }
  },

  applyUIVisibility() {
    const gameplayVisible = this.isGameplayState();
    const visibility = {
      splashUI: this.state === this.STATES.SPLASH,
      menuUI: this.state === this.STATES.MENU,
      hudUI: gameplayVisible,
      pauseUI: this.state === this.STATES.PAUSED,
      winUI: this.state === this.STATES.WIN,
      gameOverUI: this.state === this.STATES.GAME_OVER
    };

    Object.entries(visibility).forEach(([key, isVisible]) => {
      const root = this[key];
      root.setAttribute("visible", isVisible);
      this.setButtonsEnabled(root, isVisible);
    });

    this.cockpitRoot.setAttribute("visible", gameplayVisible);
  },

  setButtonsEnabled(root, enabled) {
    root.querySelectorAll("[data-ui-button]").forEach((button) => {
      button._isEnabled = enabled;
      button.setAttribute("class", enabled ? "ui-button clickable" : "ui-button");

      if (!enabled) {
        const buttonRoot = button._buttonRootEl || button;
        buttonRoot.object3D.scale.set(1, 1, 1);
        button.setAttribute("material", "color", button._baseColor || "#14314d");
      }
    });
  },

  refreshCursorTargets() {
    window.requestAnimationFrame(() => {
      [this.mouseCursorEl, this.vrCursorEl].forEach((cursorEl) => {
        if (cursorEl && cursorEl.components && cursorEl.components.raycaster) {
          cursorEl.components.raycaster.refreshObjects();
        }
      });
    });
  },

  updateCursorMode() {
    const inVr = this.sceneEl && this.sceneEl.is("vr-mode");

    if (this.mouseCursorEl) {
      this.mouseCursorEl.setAttribute("raycaster", "enabled", !inVr);
    }

    if (this.vrCursorEl) {
      this.vrCursorEl.setAttribute("visible", inVr);
      this.vrCursorEl.setAttribute("raycaster", "enabled", inVr);
    }

    this.refreshCursorTargets();
  },

  toggleDifficulty() {
    this.difficulty = this.difficulty === "EASY" ? "HARD" : "EASY";
    this.refreshMenu();
  },

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;

    if (this.musicEnabled) {
      this.startMusic();
    } else {
      this.stopMusic();
    }

    this.refreshMenu();
  },

  startNewGame() {
    const difficultySettings = this.DIFFICULTY[this.difficulty];
    this.score = 0;
    this.levelNumber = 0;
    this.lives = difficultySettings.lives;
    this.collectedRings = 0;
    this.resolvedRings = 0;
    this.totalRings = 0;
    this.startLevel(1);
  },

  startLevel(levelNumber) {
    const baseLevel = LEVEL_DATA[levelNumber];
    if (!baseLevel) {
      return;
    }

    const difficultySettings = this.DIFFICULTY[this.difficulty];

    this.clearScheduledActions();
    this.clearWorld();

    this.levelNumber = levelNumber;
    this.currentLevel = {
      label: baseLevel.label,
      state: baseLevel.state,
      speed: baseLevel.speed * difficultySettings.speedMultiplier,
      lateralSpeed: baseLevel.lateralSpeed,
      verticalSpeed: baseLevel.verticalSpeed,
      rings: baseLevel.rings.map((ring) => ({ ...ring })),
      bonusRings: baseLevel.bonusRings.map((ring) => ({ ...ring })),
      startGate: { ...baseLevel.startGate },
      finishGate: { ...baseLevel.finishGate },
      obstacles: baseLevel.obstacles.map((obstacle) => ({
        ...obstacle,
        radius: obstacle.radius * difficultySettings.obstacleScale,
        motion: obstacle.motion ? { ...obstacle.motion } : null
      }))
    };

    this.collectedRings = 0;
    this.resolvedRings = 0;
    this.totalRings = this.currentLevel.rings.length;
    this.transitionLocked = false;
    this.playerHitCooldownUntil = 0;
    this.debugLastLogTime = 0;
    this.pausedFromState = null;
    this.gameplayFrozen = false;

    this.applyEnvironment(levelNumber === 3 ? "level3" : levelNumber === 2 ? "level2" : "level1");

    this.positionPlayerAtStart();
    this.buildLevelEntities();
    this.refreshHud();
    this.setState(this.currentLevel.state);

    if (levelNumber === 1) {
      console.log("[Sky Ring Flyer] Level 1 started");
    } else if (levelNumber === 2) {
      console.log("[Sky Ring Flyer] Level 2 started");
    } else if (levelNumber === 3) {
      console.log("[Sky Ring Flyer] Level 3 started");
    }

    this.logStartAlignment();
  },

  buildLevelEntities() {
    this.currentLevel.rings.forEach((ringData, index) => {
      this.rings.push(this.createRingEntity(ringData, false, index + 1));
    });

    this.currentLevel.bonusRings.forEach((ringData, index) => {
      this.bonusRings.push(this.createRingEntity(ringData, true, index + 1));
    });

    this.currentLevel.obstacles.forEach((obstacleData, index) => {
      this.obstacles.push(this.createCloudEntity(obstacleData, index + 1));
    });

    this.startGateEntity = this.createCheckpointGate(this.currentLevel.startGate, "start");
    this.finishGateEntity = this.createCheckpointGate(this.currentLevel.finishGate, "finish");
  },

  createRingEntity(ringData, isBonus, index) {
    const ringEl = this.createElement("a-entity", this.worldRoot, {
      position: `${ringData.x} ${ringData.y} ${ringData.z}`,
      rotation: "0 0 0"
    });

    const triggerRadius = isBonus ? 0.62 : 0.72;
    const triggerDepth = 0.6;

    this.createElement("a-entity", ringEl, {
      geometry: `primitive: torus; radius: ${isBonus ? 0.85 : 0.95}; radiusTubular: ${isBonus ? 0.12 : 0.13}; segmentsRadial: 18; segmentsTubular: 36`,
      material: `src: ${isBonus ? this.textures.bonus : this.textures.ring}; metalness: 0.05; roughness: 0.45; emissive: ${isBonus ? "#f59e0b" : "#38bdf8"}; emissiveIntensity: ${isBonus ? 0.65 : 0.42}`
    });

    this.createElement("a-entity", ringEl, {
      geometry: `primitive: torus; radius: ${isBonus ? 0.98 : 1.08}; radiusTubular: 0.03; segmentsRadial: 10; segmentsTubular: 28`,
      material: `color: ${isBonus ? "#fde68a" : "#bfdbfe"}; opacity: 0.35; transparent: true; shader: flat`
    });

    const triggerEl = this.createElement("a-circle", ringEl, {
      radius: triggerRadius,
      segments: 32,
      material: `color: ${isBonus ? "#fde68a" : "#93c5fd"}; opacity: ${isBonus ? 0.3 : 0.24}; transparent: true; shader: flat; side: double`
    });

    return {
      id: `${isBonus ? "bonus" : "ring"}-${index}`,
      el: ringEl,
      triggerEl,
      x: ringData.x,
      y: ringData.y,
      z: ringData.z,
      radius: isBonus ? this.collision.bonusRingRadius : this.collision.ringRadius,
      triggerRadius,
      triggerDepth,
      isBonus,
      passed: false,
      missed: false,
      resolved: false,
      removed: false,
      lastLocalPosition: null
    };
  },

  createCloudEntity(obstacleData, index) {
    const cloudEl = this.createElement("a-entity", this.worldRoot, {
      position: `${obstacleData.x} ${obstacleData.y} ${obstacleData.z}`
    });

    const puffPositions = [
      { x: 0, y: 0, z: 0, radius: 0.72 },
      { x: -0.58, y: 0.08, z: 0.08, radius: 0.56 },
      { x: 0.6, y: 0.04, z: -0.05, radius: 0.62 },
      { x: 0.08, y: 0.34, z: 0.06, radius: 0.48 }
    ];

    puffPositions.forEach((puff) => {
      this.createElement("a-sphere", cloudEl, {
        position: `${puff.x} ${puff.y} ${puff.z}`,
        geometry: `primitive: sphere; radius: ${puff.radius}; segmentsHeight: 10; segmentsWidth: 12`,
        material: `src: ${this.textures.cloud}; roughness: 0.95; metalness: 0.0; opacity: 0.96; transparent: true`
      });
    });

    return {
      id: `obstacle-${index}`,
      el: cloudEl,
      baseX: obstacleData.x,
      baseY: obstacleData.y,
      z: obstacleData.z,
      radius: obstacleData.radius,
      motion: obstacleData.motion || null,
      hit: false,
      cooldownUntil: 0,
      removed: false
    };
  },

  goToMenu() {
    this.clearScheduledActions();
    this.clearWorld();
    this.currentLevel = null;
    this.levelNumber = 0;
    this.pausedFromState = null;
    this.transitionLocked = false;
    this.gameplayFrozen = true;
    this.positionPlayerAtStart();
    this.applyEnvironment("menu");
    this.setState(this.STATES.MENU);
  },

  pauseGame() {
    if (!this.isGameplayState() || this.transitionLocked) {
      return;
    }

    this.pausedFromState = this.state;
    this.gameplayFrozen = true;
    this.setState(this.STATES.PAUSED);
  },

  resumeGame() {
    if (this.state !== this.STATES.PAUSED || !this.pausedFromState) {
      return;
    }

    const restoreState = this.pausedFromState;
    this.pausedFromState = null;
    this.gameplayFrozen = false;
    this.setState(restoreState);
  },

  isGameplayState() {
    return this.state === this.STATES.LEVEL_1 || this.state === this.STATES.LEVEL_2 || this.state === this.STATES.LEVEL_3;
  },

  tick(time, delta) {
    if (!this.currentLevel || !this.isGameplayState() || this.gameplayFrozen) {
      return;
    }

    const deltaSeconds = Math.min(delta, 50) / 1000;
    const direction = this.updatePlayerMotion(deltaSeconds);
    this.updateMovingObstacles(time / 1000);
    this.processRingChecks();
    this.processFinishGateCheck();
    this.processObstacleChecks(time);
    this.cleanupPassedEntities();
    this.debugFlightState(time, direction);
  },

  updatePlayerMotion(deltaSeconds) {
    const position = this.rigEl.object3D.position;
    const forwardVector = this.getFlightDirection();
    const movementVector = this.movementVector
      .copy(forwardVector)
      .multiplyScalar(this.currentLevel.speed * deltaSeconds);

    position.add(movementVector);

    position.x = THREE.MathUtils.clamp(position.x, this.bounds.xMin, this.bounds.xMax);
    position.y = THREE.MathUtils.clamp(position.y, this.bounds.yMin, this.bounds.yMax);

    return {
      forward: {
        x: forwardVector.x,
        y: forwardVector.y,
        z: forwardVector.z
      },
      movement: {
        x: movementVector.x,
        y: movementVector.y,
        z: movementVector.z
      }
    };
  },

  getFlightDirection() {
    const direction = this.forwardVector;
    const cameraObject = this.cameraEl.getObject3D("camera") || this.cameraEl.object3D;

    cameraObject.getWorldDirection(direction);
    direction.normalize();

    return direction;
  },

  updateMovingObstacles(timeSeconds) {
    this.obstacles.forEach((obstacle) => {
      if (obstacle.removed || !obstacle.motion) {
        return;
      }

      const position = obstacle.el.object3D.position;

      if (obstacle.motion.axis === "x") {
        position.x = obstacle.baseX + Math.sin(timeSeconds * obstacle.motion.speed + obstacle.motion.phase) * obstacle.motion.amplitude;
      }

      if (obstacle.motion.axis === "y") {
        position.y = obstacle.baseY + Math.sin(timeSeconds * obstacle.motion.speed + obstacle.motion.phase) * obstacle.motion.amplitude;
      }
    });
  },

  processRingChecks() {
    // Score rings from the paper-plane nose against the center checkpoint disk.
    const playerWorldPosition = this.playerWorldPosition;
    const checkpointSource = this.planeNoseProbeEl || this.rigEl;
    checkpointSource.object3D.getWorldPosition(playerWorldPosition);
    const allRings = this.rings.concat(this.bonusRings);

    allRings.forEach((ring) => {
      if (ring.removed || ring.resolved) {
        return;
      }

      const localPosition = this.getPlayerPositionInRingSpace(ring, playerWorldPosition);
      const crossingData = this.getRingCrossingData(ring, localPosition);
      const triggerTestPosition = crossingData || localPosition;
      const radialDistance = Math.hypot(triggerTestPosition.x, triggerTestPosition.y);
      const withinTrigger = radialDistance <= ring.triggerRadius;
      const closeToTriggerPlane = Math.abs(localPosition.z) <= ring.triggerDepth;
      const crossedTriggerPlane = Boolean(crossingData);

      if ((closeToTriggerPlane || crossedTriggerPlane) && withinTrigger) {
        this.collectRing(ring, localPosition, crossingData);
        return;
      }

      if (localPosition.z < -ring.triggerDepth) {
        this.resolveMissedRing(ring, localPosition);
        return;
      }

      ring.lastLocalPosition = {
        x: localPosition.x,
        y: localPosition.y,
        z: localPosition.z
      };
    });
  },

  processFinishGateCheck() {
    if (!this.finishGateEntity || this.finishGateEntity.resolved) {
      return;
    }

    const localPosition = this.getPlayerPositionInTargetSpace(this.finishGateEntity, this.playerWorldPosition);
    const crossingData = this.getGateCrossingData(this.finishGateEntity, localPosition);
    const gateTestPosition = crossingData || localPosition;
    const radialDistance = Math.hypot(gateTestPosition.x, gateTestPosition.y);
    const withinGate = radialDistance <= this.finishGateEntity.openingRadius;
    const closeToPlane = Math.abs(localPosition.z) <= this.finishGateEntity.depthThreshold;
    const gateReady = this.finishGateEntity.ready && this.resolvedRings >= this.totalRings;

    if ((closeToPlane || crossingData) && withinGate && gateReady) {
      this.finishGateEntity.passed = true;
      this.finishGateEntity.resolved = true;
      console.log("[Sky Ring Flyer] Finish gate reached", {
        ringLikeLocalPosition: localPosition,
        crossingData
      });
      this.handleFinishGatePass();
      return;
    }

    this.finishGateEntity.lastLocalPosition = {
      x: localPosition.x,
      y: localPosition.y,
      z: localPosition.z
    };
  },

  getPlayerPositionInTargetSpace(target, playerWorldPosition) {
    const localPosition = this.ringLocalPosition.copy(playerWorldPosition);
    target.el.object3D.worldToLocal(localPosition);
    return {
      x: localPosition.x,
      y: localPosition.y,
      z: localPosition.z
    };
  },

  getPlayerPositionInRingSpace(ring, playerWorldPosition) {
    return this.getPlayerPositionInTargetSpace(ring, playerWorldPosition);
  },

  getGateCrossingData(gate, localPosition) {
    if (!gate.lastLocalPosition) {
      return null;
    }

    const previous = gate.lastLocalPosition;
    const crossedForward = previous.z > 0 && localPosition.z <= 0;
    const crossedWithinBand = Math.abs(localPosition.z) <= gate.depthThreshold;

    if (!crossedForward && !crossedWithinBand) {
      return null;
    }

    if (Math.abs(previous.z - localPosition.z) < 0.0001) {
      return {
        x: localPosition.x,
        y: localPosition.y,
        z: localPosition.z
      };
    }

    const t = THREE.MathUtils.clamp(previous.z / (previous.z - localPosition.z), 0, 1);
    return {
      x: THREE.MathUtils.lerp(previous.x, localPosition.x, t),
      y: THREE.MathUtils.lerp(previous.y, localPosition.y, t),
      z: THREE.MathUtils.lerp(previous.z, localPosition.z, t)
    };
  },

  getRingCrossingData(ring, localPosition) {
    if (!ring.lastLocalPosition) {
      return null;
    }

    const previous = ring.lastLocalPosition;
    const crossedForward = previous.z > 0 && localPosition.z <= 0;
    const crossedWithinBand = Math.abs(localPosition.z) <= ring.triggerDepth;

    if (!crossedForward && !crossedWithinBand) {
      return null;
    }

    if (Math.abs(previous.z - localPosition.z) < 0.0001) {
      return {
        x: localPosition.x,
        y: localPosition.y,
        z: localPosition.z
      };
    }

    const t = THREE.MathUtils.clamp(previous.z / (previous.z - localPosition.z), 0, 1);
    return {
      x: THREE.MathUtils.lerp(previous.x, localPosition.x, t),
      y: THREE.MathUtils.lerp(previous.y, localPosition.y, t),
      z: THREE.MathUtils.lerp(previous.z, localPosition.z, t)
    };
  },

  collectRing(ring, localPosition, crossingData) {
    if (ring.passed || ring.removed) {
      return;
    }

    ring.passed = true;
    ring.resolved = true;
    ring.missed = false;

    if (ring.isBonus) {
      this.score += 25;
    } else {
      this.score += 10;
      this.collectedRings += 1;
      this.resolvedRings += 1;
    }

    this.persistHighScoreIfNeeded();
    this.playSfx(ring.isBonus ? "bonus" : "ring");
    this.logRingEvent(ring, localPosition, crossingData, true, false);
    this.removeRingEntity(ring);
    this.refreshHud();

    if (!ring.isBonus) {
      this.checkLevelCompletion();
    }
  },

  resolveMissedRing(ring, localPosition) {
    if (ring.removed || ring.resolved) {
      return;
    }

    ring.passed = false;
    ring.missed = true;
    ring.resolved = true;

    if (!ring.isBonus) {
      this.resolvedRings += 1;
    }

    this.logRingEvent(ring, localPosition, null, false, true);
    this.removeRingEntity(ring);

    if (!ring.isBonus) {
      this.checkLevelCompletion();
    }
  },

  removeRingEntity(ring) {
    if (ring.removed) {
      return;
    }

    ring.removed = true;
    ring.lastLocalPosition = null;
    this.destroyEntity(ring.el);
  },

  logRingEvent(ring, localPosition, crossingData, scored, missed) {
    console.log("[Sky Ring Flyer] Ring gate check", {
      ringId: ring.id,
      noseLocalPosition: {
        x: Number(localPosition.x.toFixed(2)),
        y: Number(localPosition.y.toFixed(2)),
        z: Number(localPosition.z.toFixed(2))
      },
      triggerPlanePosition: crossingData
        ? {
            x: Number(crossingData.x.toFixed(2)),
            y: Number(crossingData.y.toFixed(2)),
            z: Number(crossingData.z.toFixed(2))
          }
        : null,
      scored,
      missed,
      triggerRadius: ring.triggerRadius,
      triggerDepth: ring.triggerDepth
    });
  },

  processObstacleChecks(time) {
    const player = this.rigEl.object3D.position;

    this.obstacles.forEach((obstacle) => {
      if (obstacle.removed || obstacle.hit) {
        return;
      }

      const obstaclePosition = obstacle.el.object3D.position;
      const planeOffset = Math.abs(player.z - obstaclePosition.z);
      if (planeOffset > this.collision.obstaclePlaneTolerance) {
        return;
      }

      const distance = Math.hypot(player.x - obstaclePosition.x, player.y - obstaclePosition.y);
      const hitRadius = obstacle.radius + this.collision.playerRadius;
      if (distance > hitRadius) {
        return;
      }

      if (time < this.playerHitCooldownUntil || time < obstacle.cooldownUntil) {
        return;
      }

      obstacle.hit = true;
      obstacle.cooldownUntil = time + 1000;
      this.playerHitCooldownUntil = time + 1000;
      this.lives -= 1;
      this.tintObstacleAfterHit(obstacle.el);
      this.playSfx("hit");
      this.refreshHud();

      if (this.lives <= 0) {
        this.triggerGameOver();
      }
    });
  },

  tintObstacleAfterHit(obstacleEl) {
    Array.from(obstacleEl.children).forEach((child) => {
      child.setAttribute("material", "color", "#fca5a5");
      child.setAttribute("material", "opacity", 0.7);
    });
  },

  cleanupPassedEntities() {
    const playerZ = this.rigEl.object3D.position.z;

    this.obstacles.forEach((obstacle) => {
      if (obstacle.removed) {
        return;
      }

      const obstacleZ = obstacle.el.object3D.position.z;
      if (playerZ < obstacleZ - this.collision.cleanupBehindDistance) {
        obstacle.removed = true;
        this.destroyEntity(obstacle.el);
      }
    });
  },

  checkLevelCompletion() {
    if (!this.currentLevel || this.transitionLocked) {
      return;
    }

    if (this.resolvedRings < this.totalRings) {
      return;
    }

    if (this.finishGateEntity) {
      this.finishGateEntity.ready = true;
      this.finishGateEntity.frameEl.setAttribute(
        "material",
        `color: ${this.currentLevel.finishGate.frameColor}; emissive: ${this.currentLevel.finishGate.frameColor}; emissiveIntensity: 1.35; metalness: 0.08; roughness: 0.28`
      );
      this.finishGateEntity.glowEl.setAttribute(
        "material",
        `color: ${this.currentLevel.finishGate.accentColor}; opacity: 0.32; transparent: true; shader: flat`
      );
    }
  },

  handleFinishGatePass() {
    if (this.transitionLocked) {
      return;
    }

    this.transitionLocked = true;
    this.gameplayFrozen = true;
    this.clearScheduledActions();
    this.persistHighScoreIfNeeded();
    console.log("[Sky Ring Flyer] Finish gate reached for level", this.levelNumber);

    if (this.levelNumber === 1) {
      this.scheduleAction(() => {
        this.startLevel(2);
      }, 1200);
      return;
    }

    if (this.levelNumber === 2) {
      this.scheduleAction(() => {
        this.startLevel(3);
      }, 1200);
      return;
    }

    this.triggerWin();
  },

  triggerWin() {
    this.clearScheduledActions();
    this.gameplayFrozen = true;
    this.clearWorld();
    this.currentLevel = null;
    this.persistHighScoreIfNeeded();
    this.playSfx("win");
    console.log("[Sky Ring Flyer] Win triggered");
    this.setText(
      this.winSummaryText,
      `Score ${this.score}\nHigh Score ${this.highScore}\nDifficulty ${this.difficulty}`,
      2.15,
      "#ffffff",
      24
    );
    this.setState(this.STATES.WIN);
  },

  triggerGameOver() {
    if (this.state === this.STATES.GAME_OVER) {
      return;
    }

    this.clearScheduledActions();
    this.gameplayFrozen = true;
    this.clearWorld();
    this.currentLevel = null;
    this.persistHighScoreIfNeeded();
    this.playSfx("lose");
    console.log("[Sky Ring Flyer] Game over triggered");
    this.setText(
      this.gameOverSummaryText,
      `Score ${this.score}\nHigh Score ${this.highScore}\nDifficulty ${this.difficulty}`,
      2.15,
      "#ffffff",
      24
    );
    this.setState(this.STATES.GAME_OVER);
  },

  clearWorld() {
    this.rings.forEach((ring) => this.destroyEntity(ring.el));
    this.bonusRings.forEach((ring) => this.destroyEntity(ring.el));
    this.obstacles.forEach((obstacle) => this.destroyEntity(obstacle.el));

    this.rings = [];
    this.bonusRings = [];
    this.obstacles = [];
    this.startGateEntity = null;
    this.finishGateEntity = null;
    this.playerHitCooldownUntil = 0;

    while (this.worldRoot.firstChild) {
      this.worldRoot.removeChild(this.worldRoot.firstChild);
    }
  },

  positionPlayerAtStart() {
    const position = this.rigEl.object3D.position;
    const startLane = this.currentLevel && this.currentLevel.startGate
      ? this.currentLevel.startGate
      : this.currentLevel && this.currentLevel.rings.length > 0
        ? this.currentLevel.rings[0]
        : { x: 0, y: 2.2 };

    position.set(startLane.x, startLane.y, 0);
  },

  logStartAlignment() {
    if (!this.rings.length) {
      return;
    }

    const firstRing = this.rings[0];
    const playerPosition = this.rigEl.object3D.position;
    console.log("[Sky Ring Flyer] Start alignment", {
      playerStart: {
        x: Number(playerPosition.x.toFixed(2)),
        y: Number(playerPosition.y.toFixed(2)),
        z: Number(playerPosition.z.toFixed(2))
      },
      firstRing: {
        x: Number(firstRing.x.toFixed(2)),
        y: Number(firstRing.y.toFixed(2)),
        z: Number(firstRing.z.toFixed(2))
      },
      ringRotation: firstRing.el.getAttribute("rotation")
    });
  },

  debugFlightState(time, flight) {
    if (time - this.debugLastLogTime < 500) {
      return;
    }

    this.debugLastLogTime = time;
    const position = this.rigEl.object3D.position;
    console.log(
      "[Sky Ring Flyer] Flight",
      {
        state: this.state,
        position: {
          x: Number(position.x.toFixed(2)),
          y: Number(position.y.toFixed(2)),
          z: Number(position.z.toFixed(2))
        },
        forwardVector: {
          x: Number(flight.forward.x.toFixed(2)),
          y: Number(flight.forward.y.toFixed(2)),
          z: Number(flight.forward.z.toFixed(2))
        },
        movementVector: {
          x: Number(flight.movement.x.toFixed(3)),
          y: Number(flight.movement.y.toFixed(3)),
          z: Number(flight.movement.z.toFixed(3))
        }
      }
    );
  },

  scheduleAction(callback, delay) {
    const id = window.setTimeout(() => {
      this.timers = this.timers.filter((timerId) => timerId !== id);
      callback();
    }, delay);

    this.timers.push(id);
  },

  clearScheduledActions() {
    this.timers.forEach((timerId) => window.clearTimeout(timerId));
    this.timers = [];
  },

  refreshMenu() {
    if (this.menuMusicButton) {
      this.setButtonLabel(this.menuMusicButton, `Music: ${this.musicEnabled ? "ON" : "OFF"}`);
    }

    if (this.menuDifficultyButton) {
      this.setButtonLabel(this.menuDifficultyButton, `Difficulty: ${this.DIFFICULTY[this.difficulty].label}`);
    }
  },

  refreshHud() {
    if (!this.hudRefs) {
      return;
    }

    this.setText(this.hudRefs.score, `Score\n${this.score}`, 0.58, "#ffffff", 18);
    this.setText(this.hudRefs.lives, `Lives\n${this.lives}`, 0.58, "#ffffff", 18);
    this.setText(this.hudRefs.level, `Level\n${this.levelNumber || "-"}`, 0.58, "#93c5fd", 18);
    this.setText(this.hudRefs.rings, `Rings\n${this.collectedRings}/${this.totalRings}`, 0.72, "#fef3c7", 18);
  },

  ensureAudioReady() {
    if (!this.audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        return;
      }

      this.audioContext = new AudioContextClass();
    }

    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }

    this.audioUnlocked = true;

    if (this.musicEnabled) {
      this.startMusic();
    }
  },

  startMusic() {
    if (!this.audioUnlocked || !this.audioContext || this.musicNodes) {
      return;
    }

    const ctx = this.audioContext;
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.03;

    const oscA = ctx.createOscillator();
    oscA.type = "triangle";
    oscA.frequency.value = 196;

    const oscB = ctx.createOscillator();
    oscB.type = "sine";
    oscB.frequency.value = 261.63;

    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.18;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.015;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 650;

    oscA.connect(filter);
    oscB.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);
    lfo.connect(lfoGain);
    lfoGain.connect(masterGain.gain);

    oscA.start();
    oscB.start();
    lfo.start();

    this.musicNodes = { oscA, oscB, lfo, lfoGain, filter, masterGain };
  },

  stopMusic() {
    if (!this.musicNodes) {
      return;
    }

    Object.values(this.musicNodes).forEach((node) => {
      if (node.stop) {
        try {
          node.stop();
        } catch (error) {
          // Ignore stop errors from already closed nodes.
        }
      }

      if (node.disconnect) {
        node.disconnect();
      }
    });

    this.musicNodes = null;
  },

  playSfx(kind) {
    if (!this.audioUnlocked || !this.audioContext) {
      return;
    }

    switch (kind) {
      case "ring":
        this.playTone(660, 0.14, "triangle", 0.06, 0);
        this.playTone(880, 0.12, "sine", 0.05, 0.05);
        break;
      case "bonus":
        this.playTone(740, 0.14, "triangle", 0.06, 0);
        this.playTone(988, 0.18, "sine", 0.05, 0.05);
        this.playTone(1318, 0.2, "sine", 0.04, 0.11);
        break;
      case "hit":
        this.playTone(180, 0.2, "sawtooth", 0.07, 0);
        this.playTone(130, 0.22, "square", 0.06, 0.04);
        break;
      case "win":
        this.playTone(523.25, 0.14, "triangle", 0.06, 0);
        this.playTone(659.25, 0.14, "triangle", 0.06, 0.08);
        this.playTone(783.99, 0.14, "triangle", 0.06, 0.16);
        this.playTone(1046.5, 0.25, "sine", 0.05, 0.24);
        break;
      case "lose":
        this.playTone(261.63, 0.18, "square", 0.06, 0);
        this.playTone(196, 0.22, "square", 0.055, 0.08);
        this.playTone(146.83, 0.28, "sawtooth", 0.05, 0.18);
        break;
      default:
        break;
    }
  },

  playTone(frequency, duration, type, volume, offset) {
    const ctx = this.audioContext;
    const startTime = ctx.currentTime + offset;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(volume, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.04);
  },

  loadHighScore() {
    try {
      const stored = window.localStorage.getItem("sky-ring-flyer-high-score");
      this.highScore = stored ? Number.parseInt(stored, 10) || 0 : 0;
    } catch (error) {
      this.highScore = 0;
    }
  },

  persistHighScoreIfNeeded() {
    if (this.score <= this.highScore) {
      return;
    }

    this.highScore = this.score;

    try {
      window.localStorage.setItem("sky-ring-flyer-high-score", String(this.highScore));
    } catch (error) {
      // Ignore storage failures.
    }
  },

  createPanel(parent, width, height, color = "#061525", opacity = 0.9) {
    const panel = this.createElement("a-entity", parent, {});

    this.createElement("a-plane", panel, {
      width: width + 0.12,
      height: height + 0.12,
      material: "color: #7dd3fc; opacity: 0.12; transparent: true; shader: flat"
    });

    this.createElement("a-plane", panel, {
      width,
      height,
      material: `color: ${color}; opacity: ${opacity}; shader: flat`
    });

    this.createElement("a-plane", panel, {
      width: width - 0.08,
      height: height - 0.08,
      position: "0 0 0.01",
      material: "color: #0c2538; opacity: 0.28; shader: flat"
    });

    this.createElement("a-plane", panel, {
      width: width - 0.16,
      height: 0.06,
      position: `0 ${height / 2 - 0.18} 0.02`,
      material: "color: #7dd3fc; opacity: 0.24; transparent: true; shader: flat"
    });

    return panel;
  },

  createText(parent, value, position, width, color, wrapCount) {
    const textEl = this.createElement("a-entity", parent, { position });
    this.setText(textEl, value, width, color, wrapCount);
    return textEl;
  },

  createButton(parent, options) {
    const buttonRoot = this.createElement("a-entity", parent, {
      id: `${options.id}Root`,
      position: options.position
    });

    const button = this.createElement("a-plane", buttonRoot, {
      id: options.id,
      class: "ui-button",
      "data-ui-button": "true",
      width: options.width,
      height: options.height,
      material: `color: ${options.color || "#14314d"}; opacity: 0.96; shader: flat`
    });

    const label = this.createElement("a-entity", buttonRoot, {
      position: "0 0 0.02"
    });

    button._action = options.action;
    button._buttonRootEl = buttonRoot;
    button._labelEl = label;
    button._baseColor = options.color || "#14314d";
    button._hoverColor = options.hoverColor || "#1d5f8c";
    button._isEnabled = false;
    button._activationLocked = false;

    this.bindButtonEvents(button);
    this.setButtonLabel(button, options.label);
    return button;
  },

  bindButtonEvents(button) {
    button._onEnter = () => {
      if (!button._isEnabled) {
        return;
      }

      const buttonRoot = button._buttonRootEl || button;
      buttonRoot.object3D.scale.set(1.03, 1.03, 1.03);
      button.setAttribute("material", "color", button._hoverColor);
    };

    button._onLeave = () => {
      const buttonRoot = button._buttonRootEl || button;
      buttonRoot.object3D.scale.set(1, 1, 1);
      button.setAttribute("material", "color", button._baseColor);
    };

    button._onClick = () => {
      if (!button._isEnabled || button._activationLocked) {
        return;
      }

      button._activationLocked = true;
      console.log("[Sky Ring Flyer] Button clicked:", button.id || button._action);
      this.handleAction(button._action);

      window.setTimeout(() => {
        button._activationLocked = false;
      }, 250);
    };

    button.addEventListener("mouseenter", button._onEnter);
    button.addEventListener("mouseleave", button._onLeave);
    button.addEventListener("click", button._onClick);
  },

  setButtonLabel(button, value) {
    const labelTarget = button._labelEl || button;
    this.setText(labelTarget, value, 2.1, "#f8fafc", 20);
  },

  setText(element, value, width, color, wrapCount, align = "center") {
    element.setAttribute(
      "text",
      `value: ${value}; align: ${align}; width: ${width}; color: ${color}; wrapCount: ${wrapCount}; baseline: center; anchor: center;`
    );
  },

  createElement(tagName, parent, attributes) {
    const element = document.createElement(tagName);

    Object.entries(attributes).forEach(([name, value]) => {
      element.setAttribute(name, value);
    });

    if (parent) {
      parent.appendChild(element);
    }

    return element;
  },

  clearEntity(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  },

  destroyEntity(entity) {
    if (entity && entity.parentNode) {
      entity.parentNode.removeChild(entity);
    }
  }
};

window.GameManager = GameManager;

window.addEventListener("DOMContentLoaded", () => {
  GameManager.init();
});
