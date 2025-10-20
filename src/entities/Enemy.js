class Enemy extends Entity {
    constructor(game, x, y, enemyData, difficultyMultiplier = 1) {
        super(game, x, y);

        this.enemyData = enemyData;
        this.size = enemyData.size;
        this.color = enemyData.color;
        this.speed = enemyData.speed;
        this.damage = enemyData.damage * difficultyMultiplier;

        this.maxHealth = enemyData.health * difficultyMultiplier;
        this.health = this.maxHealth;

        this.scoreValue = enemyData.scoreValue;
        this.expValue = enemyData.expValue;

        this.slowDebuff = 1.0;
        this.slowTimer = 0;
    }

    update(dt) {
        if (!this.game.player) return;

        // 플레이어를 향해 이동
        const dx = this.game.player.x - this.x;
        const dy = this.game.player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            const speed = this.speed * this.slowDebuff;
            this.vx = (dx / distance) * speed;
            this.vy = (dy / distance) * speed;
        }

        super.update(dt);

        // 슬로우 디버프 업데이트
        if (this.slowTimer > 0) {
            this.slowTimer -= dt;
            if (this.slowTimer <= 0) {
                this.slowDebuff = 1.0;
            }
        }
    }

    render(ctx) {
        const x = Math.floor(this.x - this.size / 2);
        const y = Math.floor(this.y - this.size / 2);

        // 외곽선
        ctx.fillStyle = '#000000';
        ctx.fillRect(x - 1, y - 1, this.size + 2, this.size + 2);

        // 몸체
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, this.size, this.size);

        // 간단한 얼굴 (적대적)
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(x + this.size * 0.25, y + this.size * 0.3, 3, 3);
        ctx.fillRect(x + this.size * 0.65, y + this.size * 0.3, 3, 3);

        // 보스는 크라운 표시
        if (this.enemyData.boss) {
            ctx.fillStyle = '#ffaa00';
            ctx.fillRect(x + this.size / 2 - 6, y - 8, 12, 6);
        }

        this.renderHealthBar(ctx);
    }

    applySlowDebuff(slowAmount, duration) {
        this.slowDebuff = 1 - slowAmount;
        this.slowTimer = duration;
    }

    takeDamage(amount) {
        super.takeDamage(amount);

        if (this.isDead && this.game.player) {
            this.game.player.addExp(this.expValue);
        }
    }
}
