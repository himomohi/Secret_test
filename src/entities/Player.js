class Player extends Entity {
    constructor(game, x, y, characterData) {
        super(game, x, y);

        this.characterData = characterData;
        this.size = 24;

        // 기본 스탯
        this.maxHealth = characterData.baseHealth;
        this.health = this.maxHealth;
        this.color = characterData.color;

        // 레벨 시스템
        this.level = 1;
        this.exp = 0;
        this.expToNextLevel = 100;

        // 스탯
        this.stats = {
            damage: characterData.baseDamage,
            speed: characterData.baseSpeed,
            armor: characterData.baseArmor,
            maxHealth: characterData.baseHealth,
            attackSpeed: 0,
            critChance: 0.05,
            critDamage: 0.5,
            lifesteal: 0,
            healthRegen: 1,
            cooldownReduction: 0,
            projectileSpeed: 0,
            projectileCount: 0,
            pierce: 0,
            areaSize: 0,
            speedMultiplier: 0,
            expMultiplier: 0,
            dropRateMultiplier: 0,
            pickupRange: 0,
            elements: []
        };

        // 인벤토리
        this.inventory = [];

        // 버프
        this.activeBuffs = [];

        // 초기 스킬 추가
        this.game.skillSystem.addSkill(characterData.startingSkill);
    }

    update(dt) {
        // 입력 처리
        const input = this.game.inputManager.getMovementInput();
        const speed = this.stats.speed * (1 + this.stats.speedMultiplier);

        this.vx = input.x * speed;
        this.vy = input.y * speed;

        super.update(dt);

        // 체력 재생
        this.health = Math.min(this.maxHealth, this.health + this.stats.healthRegen * dt);

        // 버프 업데이트
        this.updateBuffs(dt);
    }

    render(ctx) {
        // 플레이어 몸체 (픽셀 아트 스타일)
        const x = Math.floor(this.x - this.size / 2);
        const y = Math.floor(this.y - this.size / 2);

        // 외곽선
        ctx.fillStyle = '#000000';
        ctx.fillRect(x - 1, y - 1, this.size + 2, this.size + 2);

        // 몸체
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, this.size, this.size);

        // 눈
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 6, y + 8, 4, 4);
        ctx.fillRect(x + 14, y + 8, 4, 4);

        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 8, y + 9, 2, 2);
        ctx.fillRect(x + 16, y + 9, 2, 2);

        // 체력바
        this.renderHealthBar(ctx);

        // 레벨 표시
        ctx.fillStyle = '#ffff00';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Lv.${this.level}`, this.x, this.y - this.size / 2 - 16);
    }

    addExp(amount) {
        const multiplier = 1 + this.stats.expMultiplier;
        this.exp += amount * multiplier;

        if (this.exp >= this.expToNextLevel) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.exp -= this.expToNextLevel;
        this.expToNextLevel = Math.floor(this.expToNextLevel * 1.2);

        // 체력 회복
        this.health = this.maxHealth;

        // 레벨업 메뉴 표시
        this.game.uiManager.showLevelUpMenu();
    }

    addItem(item) {
        this.inventory.push(item);
        this.game.itemSystem.applyItemEffects(this, item);
    }

    getDamageMultiplier() {
        let multiplier = 1.0;

        // 캐릭터 보너스
        if (this.characterData.bonuses && this.characterData.bonuses.damage) {
            multiplier *= this.characterData.bonuses.damage;
        }

        // 크리티컬
        if (Math.random() < this.stats.critChance) {
            multiplier *= (1 + this.stats.critDamage);
        }

        return multiplier;
    }

    applyBuff(buffData, duration) {
        this.activeBuffs.push({
            data: buffData,
            timer: duration
        });
    }

    updateBuffs(dt) {
        for (let i = this.activeBuffs.length - 1; i >= 0; i--) {
            const buff = this.activeBuffs[i];
            buff.timer -= dt;

            if (buff.timer <= 0) {
                this.activeBuffs.splice(i, 1);
            }
        }
    }

    takeDamage(amount) {
        // 방어력 적용
        const reduction = this.stats.armor / (this.stats.armor + 100);
        const actualDamage = amount * (1 - reduction);

        super.takeDamage(actualDamage);
    }
}
