class GameEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // 반응형 캔버스 크기 설정
        this.baseWidth = 1280;
        this.baseHeight = 720;
        this.updateCanvasSize();

        this.state = 'MAIN_MENU'; // MAIN_MENU, CHARACTER_SELECT, PLAYING, PAUSED, GAME_OVER
        this.lastTime = 0;
        this.deltaTime = 0;
        this.running = false;

        // 모바일 감지
        this.isMobile = this.detectMobile();

        // Game objects
        this.player = null;
        this.enemies = [];
        this.projectiles = [];
        this.items = [];
        this.particles = [];

        // Systems
        this.renderer = new Renderer(this);
        this.inputManager = new InputManager(this);
        this.camera = new Camera(this);
        this.mapGenerator = new MapGenerator(this);
        this.skillSystem = new SkillSystem(this);
        this.itemSystem = new ItemSystem(this);
        this.spawnSystem = new SpawnSystem(this);
        this.saveSystem = new SaveSystem(this);
        this.collisionSystem = new CollisionSystem(this);

        // UI
        this.uiManager = new UIManager(this);

        // Game data
        this.gameTime = 0;
        this.score = 0;
        this.killCount = 0;

        // Map
        this.map = null;
        this.tileSize = 32;

        // 리사이즈 이벤트 리스너
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.onResize(), 100);
        });
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (window.innerWidth <= 768) ||
               ('ontouchstart' in window);
    }

    updateCanvasSize() {
        const container = document.getElementById('gameContainer');
        const dpr = window.devicePixelRatio || 1;

        // 컨테이너 크기 가져오기
        const rect = container.getBoundingClientRect();
        let width = rect.width;
        let height = rect.height;

        // 모바일에서는 화면 크기에 맞춤
        if (this.isMobile || window.innerWidth <= 768) {
            width = window.innerWidth;
            height = window.innerHeight;
        }

        // 16:9 비율 유지
        const targetRatio = 16 / 9;
        const currentRatio = width / height;

        if (currentRatio > targetRatio) {
            width = height * targetRatio;
        } else {
            height = width / targetRatio;
        }

        // 캔버스 내부 해상도 설정 (픽셀 퍼펙트를 위해)
        this.canvas.width = Math.floor(width / 2); // 모바일 성능 최적화
        this.canvas.height = Math.floor(height / 2);

        // 캔버스 표시 크기
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // 스케일 팩터 저장
        this.scale = this.width / this.baseWidth;
    }

    onResize() {
        this.updateCanvasSize();

        // 렌더러 재초기화
        if (this.renderer) {
            this.renderer.init();
        }

        // UI 재조정
        if (this.uiManager && this.state === 'PLAYING') {
            this.uiManager.onResize();
        }
    }

    init() {
        this.renderer.init();
        this.inputManager.init();
        this.uiManager.init();

        // 모바일 컨트롤 표시
        if (this.isMobile) {
            this.inputManager.showMobileControls();
        }

        this.showMainMenu();
    }

    showMainMenu() {
        this.state = 'MAIN_MENU';
        this.uiManager.showMainMenu();
    }

    showCharacterSelect() {
        this.state = 'CHARACTER_SELECT';
        this.uiManager.showCharacterSelect();
    }

    startGame(characterId) {
        this.state = 'PLAYING';
        this.gameTime = 0;
        this.score = 0;
        this.killCount = 0;

        // Clear arrays
        this.enemies = [];
        this.projectiles = [];
        this.items = [];
        this.particles = [];

        // Generate map
        this.map = this.mapGenerator.generate(200, 200);

        // Create player
        const characterData = CHARACTERS.find(c => c.id === characterId);
        this.player = new Player(this, this.width / 2, this.height / 2, characterData);

        // Initialize camera
        this.camera.follow(this.player);

        // Initialize spawn system
        this.spawnSystem.init();

        // Show game HUD
        this.uiManager.showGameHUD();

        // Start game loop if not running
        if (!this.running) {
            this.running = true;
            this.gameLoop(0);
        }
    }

    gameLoop(currentTime) {
        if (!this.running) return;

        this.deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // Cap delta time to prevent large jumps
        if (this.deltaTime > 0.1) this.deltaTime = 0.1;

        this.update(this.deltaTime);
        this.render();

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(dt) {
        if (this.state !== 'PLAYING') return;

        this.gameTime += dt;

        // Update player
        if (this.player) {
            this.player.update(dt);
        }

        // Update enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.update(dt);

            if (enemy.isDead) {
                this.enemies.splice(i, 1);
                this.killCount++;
                this.score += enemy.scoreValue;

                // Drop items
                if (Math.random() < 0.3) {
                    this.itemSystem.spawnRandomItem(enemy.x, enemy.y);
                }
            }
        }

        // Update projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const proj = this.projectiles[i];
            proj.update(dt);

            if (proj.isDead) {
                this.projectiles.splice(i, 1);
            }
        }

        // Update items
        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            item.update(dt);

            if (item.collected) {
                this.items.splice(i, 1);
            }
        }

        // Update systems
        this.spawnSystem.update(dt);
        this.skillSystem.update(dt);
        this.collisionSystem.update(dt);
        this.camera.update(dt);

        // Check game over
        if (this.player && this.player.isDead) {
            this.gameOver();
        }
    }

    render() {
        this.renderer.render();
    }

    pause() {
        if (this.state === 'PLAYING') {
            this.state = 'PAUSED';
            this.uiManager.showPauseMenu();
        }
    }

    resume() {
        if (this.state === 'PAUSED') {
            this.state = 'PLAYING';
            this.uiManager.hidePauseMenu();
        }
    }

    gameOver() {
        this.state = 'GAME_OVER';
        this.uiManager.showGameOver();
        this.saveSystem.saveHighScore(this.score);
    }

    addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }

    addItem(item) {
        this.items.push(item);
    }
}
