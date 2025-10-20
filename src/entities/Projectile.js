class Projectile extends Entity {
    constructor(game, x, y, angle, data) {
        super(game, x, y);

        this.angle = angle;
        this.speed = data.speed || 200;
        this.damage = data.damage || 10;
        this.size = data.size || 8;
        this.color = data.color || '#ffffff';
        this.owner = data.owner || 'player';

        this.pierceCount = data.pierce || 0;
        this.maxPierce = this.pierceCount;
        this.lifetime = 3.0; // 3초 후 소멸
        this.hitEnemies = new Set();

        // 속도 설정
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
    }

    update(dt) {
        super.update(dt);

        this.lifetime -= dt;
        if (this.lifetime <= 0) {
            this.isDead = true;
        }

        // 맵 경계 확인
        if (!this.game.map) return;

        const tileX = Math.floor(this.x / this.game.tileSize);
        const tileY = Math.floor(this.y / this.game.tileSize);
        const tile = this.game.map.getTile(tileX, tileY);

        if (tile === 1) { // 벽
            this.isDead = true;
        }
    }

    render(ctx) {
        ctx.fillStyle = this.color;

        // 원형 투사체
        ctx.beginPath();
        ctx.arc(Math.floor(this.x), Math.floor(this.y), this.size / 2, 0, Math.PI * 2);
        ctx.fill();

        // 외곽 글로우 효과
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
    }

    hit() {
        this.pierceCount--;
        if (this.pierceCount < 0) {
            this.isDead = true;
        }
    }
}
