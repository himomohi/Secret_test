class Entity {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.size = 20;
        this.health = 100;
        this.maxHealth = 100;
        this.isDead = false;
        this.color = '#ffffff';
    }

    update(dt) {
        // 기본 이동
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }

    render(ctx) {
        // 픽셀 아트 스타일 렌더링
        ctx.fillStyle = this.color;
        ctx.fillRect(
            Math.floor(this.x - this.size / 2),
            Math.floor(this.y - this.size / 2),
            this.size,
            this.size
        );

        // 체력바
        if (this.health < this.maxHealth) {
            this.renderHealthBar(ctx);
        }
    }

    renderHealthBar(ctx) {
        const barWidth = this.size;
        const barHeight = 4;
        const x = Math.floor(this.x - barWidth / 2);
        const y = Math.floor(this.y - this.size / 2 - 8);

        // 배경
        ctx.fillStyle = '#333333';
        ctx.fillRect(x, y, barWidth, barHeight);

        // 체력
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = healthPercent > 0.5 ? '#44ff44' : (healthPercent > 0.25 ? '#ffaa00' : '#ff4444');
        ctx.fillRect(x, y, barWidth * healthPercent, barHeight);
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
        }
    }

    distanceTo(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
