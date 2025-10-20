class SpawnSystem {
    constructor(game) {
        this.game = game;
        this.spawnTimer = 0;
        this.spawnInterval = 2.0; // 2초마다 스폰
        this.spawnCount = 5; // 한 번에 5마리
        this.difficultyMultiplier = 1.0;
        this.maxEnemies = 100; // 최대 적 수
    }

    init() {
        this.spawnTimer = 0;
        this.difficultyMultiplier = 1.0;

        // 모바일 성능 최적화
        if (this.game.isMobile) {
            this.spawnCount = 3; // 모바일에서는 적게 스폰
            this.maxEnemies = 50; // 최대 적 수 제한
        } else {
            this.spawnCount = 5;
            this.maxEnemies = 100;
        }
    }

    update(dt) {
        this.spawnTimer += dt;

        // 난이도 증가 (시간에 따라)
        this.difficultyMultiplier = 1 + (this.game.gameTime / 120); // 2분마다 2배

        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;
            this.spawnEnemies();
        }

        // 시간에 따라 스폰 간격 감소
        this.spawnInterval = Math.max(0.5, 2.0 - this.game.gameTime / 300);
    }

    spawnEnemies() {
        const player = this.game.player;
        if (!player) return;

        // 적 수 제한 체크
        if (this.game.enemies.length >= this.maxEnemies) {
            return;
        }

        const spawnCount = Math.floor(this.spawnCount * this.difficultyMultiplier);

        for (let i = 0; i < spawnCount; i++) {
            // 최대 적 수 체크
            if (this.game.enemies.length >= this.maxEnemies) {
                break;
            }

            const enemyData = this.selectEnemyType();
            const pos = this.getSpawnPosition();

            const enemy = new Enemy(this.game, pos.x, pos.y, enemyData, this.difficultyMultiplier);
            this.game.addEnemy(enemy);
        }
    }

    selectEnemyType() {
        const gameTime = this.game.gameTime;
        let availableEnemies = [];

        if (gameTime < 60) {
            // 첫 1분: 기본 적들만
            availableEnemies = ENEMIES.slice(0, 5);
        } else if (gameTime < 180) {
            // 1-3분: 중급 적 포함
            availableEnemies = ENEMIES.slice(0, 10);
        } else if (gameTime < 300) {
            // 3-5분: 상급 적 포함
            availableEnemies = ENEMIES.slice(0, 15);
        } else {
            // 5분 이후: 모든 적 (보스 제외)
            availableEnemies = ENEMIES.filter(e => !e.boss);
        }

        // 보스는 특정 시간에 스폰
        if (gameTime >= 300 && gameTime % 120 < 1) {
            availableEnemies = ENEMIES.filter(e => e.boss);
        }

        return availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
    }

    getSpawnPosition() {
        const player = this.game.player;
        const spawnDistance = 400 + Math.random() * 200;
        const angle = Math.random() * Math.PI * 2;

        const x = player.x + Math.cos(angle) * spawnDistance;
        const y = player.y + Math.sin(angle) * spawnDistance;

        return { x, y };
    }
}
