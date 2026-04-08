"use strict";

AFRAME.registerComponent("game-loop", {
  tick(time, delta) {
    if (window.GameManager) {
      window.GameManager.tick(time, delta);
    }
  }
});

AFRAME.registerComponent("menu-button", {
  schema: {
    action: { type: "string" },
    baseColor: { type: "color", default: "#14314d" },
    hoverColor: { type: "color", default: "#1d5f8c" }
  },

  init() {
    this.activationLocked = false;

    this.triggerAction = () => {
      if (this.activationLocked) {
        return;
      }

      this.activationLocked = true;

      if (window.GameManager) {
        window.GameManager.handleAction(this.data.action);
      }

      window.setTimeout(() => {
        this.activationLocked = false;
      }, 250);
    };

    this.onEnter = () => {
      const buttonRoot = this.el._buttonRootEl || this.el;
      buttonRoot.object3D.scale.set(1.03, 1.03, 1.03);
      this.el.setAttribute("material", "color", this.data.hoverColor);
    };

    this.onLeave = () => {
      const buttonRoot = this.el._buttonRootEl || this.el;
      buttonRoot.object3D.scale.set(1, 1, 1);
      this.el.setAttribute("material", "color", this.data.baseColor);
    };

    this.onClick = () => {
      console.log("[Sky Ring Flyer] Button clicked:", this.el.id || this.data.action);
      this.triggerAction();
    };

    this.el.addEventListener("mouseenter", this.onEnter);
    this.el.addEventListener("mouseleave", this.onLeave);
    this.el.addEventListener("click", this.onClick);
  },

  remove() {
    this.el.removeEventListener("mouseenter", this.onEnter);
    this.el.removeEventListener("mouseleave", this.onLeave);
    this.el.removeEventListener("click", this.onClick);
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
      { x: 0.0, y: 2.2, z: -14 },
      { x: 0.8, y: 2.4, z: -26 },
      { x: -0.9, y: 2.7, z: -38 },
      { x: 1.1, y: 2.5, z: -50 },
      { x: -1.2, y: 2.9, z: -62 },
      { x: 0.2, y: 3.1, z: -74 },
      { x: 1.4, y: 2.7, z: -86 },
      { x: -1.0, y: 2.3, z: -98 },
      { x: 0.7, y: 3.3, z: -110 },
      { x: 0.0, y: 2.8, z: -122 }
    ],
    obstacles: [
      { x: -2.4, y: 2.5, z: -20, radius: 1.1 },
      { x: 2.6, y: 3.2, z: -44, radius: 1.15 },
      { x: -2.2, y: 3.5, z: -68, radius: 1.2 },
      { x: 2.5, y: 2.2, z: -92, radius: 1.15 },
      { x: -2.5, y: 3.0, z: -116, radius: 1.2 }
    ],
    bonusRings: []
  },
  2: {
    label: "LEVEL 2",
    state: "LEVEL_2",
    speed: 8.6,
    lateralSpeed: 3.5,
    verticalSpeed: 3.2,
    rings: [
      { x: 0.0, y: 2.2, z: -14 },
      { x: 1.4, y: 2.5, z: -26 },
      { x: -1.6, y: 3.0, z: -38 },
      { x: 2.2, y: 3.7, z: -50 },
      { x: -2.3, y: 2.4, z: -62 },
      { x: 0.8, y: 3.5, z: -74 },
      { x: 2.5, y: 2.2, z: -86 },
      { x: -1.8, y: 4.0, z: -98 },
      { x: 0.2, y: 2.6, z: -110 },
      { x: 1.9, y: 3.8, z: -122 },
      { x: -2.4, y: 2.5, z: -134 },
      { x: 0.9, y: 4.1, z: -146 },
      { x: 2.6, y: 2.8, z: -158 },
      { x: -1.2, y: 3.9, z: -170 },
      { x: 0.0, y: 3.1, z: -182 }
    ],
    obstacles: [
      { x: -2.6, y: 2.3, z: -20, radius: 1.1, motion: { axis: "x", amplitude: 0.8, speed: 1.25, phase: 0.1 } },
      { x: 2.4, y: 3.4, z: -42, radius: 1.18, motion: { axis: "y", amplitude: 0.55, speed: 1.55, phase: 0.7 } },
      { x: -1.4, y: 3.9, z: -66, radius: 1.2, motion: { axis: "x", amplitude: 1.05, speed: 1.45, phase: 1.2 } },
      { x: 2.7, y: 2.2, z: -88, radius: 1.15, motion: { axis: "x", amplitude: 0.7, speed: 1.85, phase: 2.1 } },
      { x: -2.5, y: 3.0, z: -112, radius: 1.2, motion: { axis: "y", amplitude: 0.6, speed: 1.35, phase: 1.8 } },
      { x: 0.6, y: 4.2, z: -136, radius: 1.28, motion: { axis: "x", amplitude: 1.15, speed: 1.5, phase: 0.5 } },
      { x: -2.2, y: 2.2, z: -160, radius: 1.18, motion: { axis: "x", amplitude: 0.95, speed: 1.9, phase: 2.8 } },
      { x: 2.5, y: 3.2, z: -176, radius: 1.2, motion: { axis: "y", amplitude: 0.55, speed: 1.7, phase: 1.1 } }
    ],
    bonusRings: [
      { x: -2.9, y: 3.8, z: -56 },
      { x: 2.9, y: 2.1, z: -118 },
      { x: -2.7, y: 4.2, z: -166 }
    ]
  }
};

const GameManager = {
  STATES: {
    SPLASH: "SPLASH",
    MENU: "MENU",
    LEVEL_1: "LEVEL_1",
    LEVEL_2: "LEVEL_2",
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
      speedMultiplier: 1.15,
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
  textures: {},

  init() {
    this.sceneEl = document.getElementById("scene");
    this.worldRoot = document.getElementById("worldRoot");
    this.rigEl = document.getElementById("rig");
    this.cameraEl = document.getElementById("camera");
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
    const panel = this.createPanel(this.splashUI, 2.55, 1.82);

    this.createText(panel, "Sky Ring Flyer", "0 0.58 0.02", 2.3, "#f8fafc", 46);
    this.createText(panel, "Mobile VR Flight Game", "0 0.28 0.02", 2.0, "#7dd3fc", 28);
    this.createText(panel, `Student: ${this.STUDENT_INFO.name}`, "0 0.02 0.02", 2.2, "#ffffff", 26);
    this.createText(panel, `ID: ${this.STUDENT_INFO.id}`, "0 -0.19 0.02", 2.2, "#ffffff", 26);
    this.createText(panel, this.STUDENT_INFO.course, "0 -0.4 0.02", 2.2, "#cbd5e1", 24);

    this.createButton(panel, {
      id: "splashContinueButton",
      label: "Continue",
      action: "continue",
      width: 1.08,
      height: 0.24,
      position: "0 -0.7 0.03",
      color: "#0f4c5c",
      hoverColor: "#0f766e"
    });
  },

  buildMenuUI() {
    const panel = this.createPanel(this.menuUI, 2.78, 2.78);

    this.createText(panel, "Setup Menu", "0 1.0 0.02", 2.35, "#f8fafc", 42);
    this.createText(panel, "Use gaze or mouse click to select an option.", "0 0.68 0.02", 2.3, "#bfdbfe", 24);
    this.createText(panel, "Tap the goggles icon on mobile for stereoscopic VR.", "0 0.4 0.02", 2.3, "#7dd3fc", 22);

    this.menuMusicButton = this.createButton(panel, {
      id: "musicButton",
      label: "Music: OFF",
      action: "toggle-music",
      width: 1.66,
      height: 0.26,
      position: "0 -0.04 0.03"
    });

    this.menuDifficultyButton = this.createButton(panel, {
      id: "difficultyButton",
      label: "Difficulty: EASY",
      action: "toggle-difficulty",
      width: 1.66,
      height: 0.26,
      position: "0 -0.5 0.03",
      color: "#3b1d6e",
      hoverColor: "#5b21b6"
    });

    this.startGameButton = this.createButton(panel, {
      id: "startButton",
      label: "Start Game",
      action: "start-game",
      width: 1.66,
      height: 0.28,
      position: "0 -0.96 0.03",
      color: "#0f4c5c",
      hoverColor: "#0f766e"
    });

    this.createText(panel, "Rings score points. Clouds cost lives.", "0 -1.28 0.02", 2.24, "#dbeafe", 22);
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
      case "restart-game":
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

  setState(nextState) {
    if (this.state === nextState) {
      return;
    }

    this.state = nextState;
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
    const visibility = {
      splashUI: this.state === this.STATES.SPLASH,
      menuUI: this.state === this.STATES.MENU,
      hudUI: this.state === this.STATES.LEVEL_1 || this.state === this.STATES.LEVEL_2,
      pauseUI: this.state === this.STATES.PAUSED,
      winUI: this.state === this.STATES.WIN,
      gameOverUI: this.state === this.STATES.GAME_OVER
    };

    Object.entries(visibility).forEach(([key, isVisible]) => {
      const root = this[key];
      root.setAttribute("visible", isVisible);
      this.setButtonsEnabled(root, isVisible);
    });
  },

  setButtonsEnabled(root, enabled) {
    root.querySelectorAll("[data-ui-button]").forEach((button) => {
      if (enabled) {
        button.classList.add("clickable");
      } else {
        button.classList.remove("clickable");
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

    this.positionPlayerAtStart();
    this.buildLevelEntities();
    this.refreshHud();
    this.setState(this.currentLevel.state);
    console.log("[Sky Ring Flyer] Gameplay started in state:", this.state);
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
  },

  createRingEntity(ringData, isBonus, index) {
    const ringEl = this.createElement("a-entity", this.worldRoot, {
      position: `${ringData.x} ${ringData.y} ${ringData.z}`,
      geometry: `primitive: torus; radius: ${isBonus ? 0.85 : 0.95}; radiusTubular: ${isBonus ? 0.12 : 0.13}; segmentsRadial: 18; segmentsTubular: 36`,
      material: `src: ${isBonus ? this.textures.bonus : this.textures.ring}; metalness: 0.05; roughness: 0.45; emissive: ${isBonus ? "#f59e0b" : "#38bdf8"}; emissiveIntensity: ${isBonus ? 0.65 : 0.42}`,
      rotation: "0 0 0"
    });

    this.createElement("a-entity", ringEl, {
      geometry: `primitive: torus; radius: ${isBonus ? 0.98 : 1.08}; radiusTubular: 0.03; segmentsRadial: 10; segmentsTubular: 28`,
      material: `color: ${isBonus ? "#fde68a" : "#bfdbfe"}; opacity: 0.35; transparent: true; shader: flat`,
      rotation: "0 0 0"
    });

    return {
      id: `${isBonus ? "bonus" : "ring"}-${index}`,
      el: ringEl,
      x: ringData.x,
      y: ringData.y,
      z: ringData.z,
      radius: isBonus ? this.collision.bonusRingRadius : this.collision.ringRadius,
      openingRadius: isBonus ? 0.6 : 0.7,
      depthThreshold: 0.85,
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
    return this.state === this.STATES.LEVEL_1 || this.state === this.STATES.LEVEL_2;
  },

  tick(time, delta) {
    if (!this.currentLevel || !this.isGameplayState() || this.gameplayFrozen) {
      return;
    }

    const deltaSeconds = Math.min(delta, 50) / 1000;
    const direction = this.updatePlayerMotion(deltaSeconds);
    this.updateMovingObstacles(time / 1000);
    this.processRingChecks();
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
    const playerWorldPosition = this.playerWorldPosition;
    this.cameraEl.object3D.getWorldPosition(playerWorldPosition);
    const allRings = this.rings.concat(this.bonusRings);

    allRings.forEach((ring) => {
      if (ring.removed || ring.resolved) {
        return;
      }

      const localPosition = this.getPlayerPositionInRingSpace(ring, playerWorldPosition);
      const crossingData = this.getRingCrossingData(ring, localPosition);
      const radialDistance = crossingData
        ? Math.hypot(crossingData.x, crossingData.y)
        : Math.hypot(localPosition.x, localPosition.y);
      const withinGate = radialDistance <= ring.openingRadius;
      const closeToPlane = Math.abs(localPosition.z) <= ring.depthThreshold;
      const crossedPlane = Boolean(crossingData);

      if ((closeToPlane || crossedPlane) && withinGate) {
        this.collectRing(ring, localPosition, crossingData);
        return;
      }

      if (localPosition.z < -ring.depthThreshold) {
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

  getPlayerPositionInRingSpace(ring, playerWorldPosition) {
    const localPosition = this.ringLocalPosition.copy(playerWorldPosition);
    ring.el.object3D.worldToLocal(localPosition);
    return {
      x: localPosition.x,
      y: localPosition.y,
      z: localPosition.z
    };
  },

  getRingCrossingData(ring, localPosition) {
    if (!ring.lastLocalPosition) {
      return null;
    }

    const previous = ring.lastLocalPosition;
    const crossedForward = previous.z > 0 && localPosition.z <= 0;
    const crossedWithinBand = Math.abs(localPosition.z) <= ring.depthThreshold;

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
      playerLocalPosition: {
        x: Number(localPosition.x.toFixed(2)),
        y: Number(localPosition.y.toFixed(2)),
        z: Number(localPosition.z.toFixed(2))
      },
      planeCrossPosition: crossingData
        ? {
            x: Number(crossingData.x.toFixed(2)),
            y: Number(crossingData.y.toFixed(2)),
            z: Number(crossingData.z.toFixed(2))
          }
        : null,
      scored,
      missed,
      openingRadius: ring.openingRadius,
      depthThreshold: ring.depthThreshold
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

    this.transitionLocked = true;
    this.gameplayFrozen = true;
    this.clearScheduledActions();
    this.persistHighScoreIfNeeded();

    if (this.levelNumber === 1) {
      this.scheduleAction(() => {
        this.startLevel(2);
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
    this.playerHitCooldownUntil = 0;

    while (this.worldRoot.firstChild) {
      this.worldRoot.removeChild(this.worldRoot.firstChild);
    }
  },

  positionPlayerAtStart() {
    const position = this.rigEl.object3D.position;
    const firstRing = this.currentLevel && this.currentLevel.rings.length > 0
      ? this.currentLevel.rings[0]
      : { x: 0, y: 2.2 };

    position.set(firstRing.x, firstRing.y, 0);
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
      class: "ui-button clickable",
      "data-ui-button": "true",
      width: options.width,
      height: options.height,
      material: `color: ${options.color || "#14314d"}; opacity: 0.96; shader: flat`,
      "menu-button": `action: ${options.action}; baseColor: ${options.color || "#14314d"}; hoverColor: ${options.hoverColor || "#1d5f8c"}`
    });

    const label = this.createElement("a-entity", buttonRoot, {
      position: "0 0 0.02"
    });

    button._buttonRootEl = buttonRoot;
    button._labelEl = label;

    this.setButtonLabel(button, options.label);
    return button;
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
