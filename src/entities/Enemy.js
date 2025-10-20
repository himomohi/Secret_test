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

        // 픽셀 아트 렌더러 사용
        if (window.pixelArtRenderer && ENEMY_SPRITES[this.enemyData.id]) {
            // 그림자
            window.pixelArtRenderer.drawShadow(x, y, this.size, this.size);

            // 스프라이트 그리기
            const sprite = ENEMY_SPRITES[this.enemyData.id];
            const scale = this.enemyData.boss ? 2.0 : 1.2;
            window.pixelArtRenderer.drawSprite(x, y, sprite, scale);

            // 보스 크라운
            if (this.enemyData.boss) {
                ctx.fillStyle = '#ffd700';
                ctx.fillRect(x + this.size / 2 - 8, y - 12, 4, 4);
                ctx.fillRect(x + this.size / 2 - 4, y - 14, 4, 4);
                ctx.fillRect(x + this.size / 2, y - 12, 4, 4);
                ctx.fillRect(x + this.size / 2 + 4, y - 12, 4, 4);
            }

            // 체력바
            if (this.health < this.maxHealth || this.enemyData.boss) {
                window.pixelArtRenderer.drawHealthBar(
                    x - 2,
                    y - 4,
                    this.size + 4,
                    this.health,
                    this.maxHealth
                );
            }
        } else {
            // 폴백: 기본 렌더링
            ctx.fillStyle = '#000000';
            ctx.fillRect(x - 1, y - 1, this.size + 2, this.size + 2);
            ctx.fillStyle = this.color;
            ctx.fillRect(x, y, this.size, this.size);
            this.renderHealthBar(ctx);
        }
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
