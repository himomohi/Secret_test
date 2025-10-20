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
        const x = Math.floor(this.x);
        const y = Math.floor(this.y);
        const halfSize = Math.floor(this.size / 2);

        // 픽셀 아트 스타일 투사체
        // 트레일 효과
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = this.color;
        ctx.fillRect(x - halfSize - 4, y - halfSize / 2, 4, halfSize);
        ctx.globalAlpha = 1.0;

        // 외곽선
        ctx.fillStyle = '#000000';
        ctx.fillRect(x - halfSize - 1, y - halfSize - 1, this.size + 2, this.size + 2);

        // 본체
        ctx.fillStyle = this.color;
        ctx.fillRect(x - halfSize, y - halfSize, this.size, this.size);

        // 하이라이트
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillRect(x - halfSize + 1, y - halfSize + 1, halfSize, halfSize);

        // 글로우 효과 (더 픽셀화된)
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = this.color;
        ctx.fillRect(x - halfSize - 2, y - halfSize - 2, this.size + 4, this.size + 4);
        ctx.globalAlpha = 1.0;

        // 회전 효과 (작은 투사체용)
        if (this.size <= 8) {
            const rotation = (Date.now() / 100) % 4;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            if (rotation < 1) {
                ctx.fillRect(x - halfSize, y - halfSize, 2, 2);
            } else if (rotation < 2) {
                ctx.fillRect(x + halfSize - 2, y - halfSize, 2, 2);
            } else if (rotation < 3) {
                ctx.fillRect(x + halfSize - 2, y + halfSize - 2, 2, 2);
            } else {
                ctx.fillRect(x - halfSize, y + halfSize - 2, 2, 2);
            }
        }
    }

    hit() {
        this.pierceCount--;
        if (this.pierceCount < 0) {
            this.isDead = true;
        }
    }
}
