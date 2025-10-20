class SkillSystem {
    constructor(game) {
        this.game = game;
        this.activeSkills = [];
    }

    update(dt) {
        if (!this.game.player) return;

        // 활성화된 스킬 업데이트
        for (let skill of this.activeSkills) {
            skill.cooldownTimer -= dt;

            if (skill.cooldownTimer <= 0) {
                this.activateSkill(skill);
                skill.cooldownTimer = skill.data.cooldown / (1 + this.game.player.stats.cooldownReduction);
            }
        }
    }

    activateSkill(skill) {
        const player = this.game.player;
        const data = skill.data;

        switch (data.type) {
            case 'projectile':
                this.activateProjectileSkill(skill);
                break;
            case 'melee':
                this.activateMeleeSkill(skill);
                break;
            case 'orbit':
                this.activateOrbitSkill(skill);
                break;
            case 'aura':
                this.activateAuraSkill(skill);
                break;
            case 'area':
                this.activateAreaSkill(skill);
                break;
            case 'summon':
                this.activateSummonSkill(skill);
                break;
            case 'buff':
                this.activateBuffSkill(skill);
                break;
            case 'utility':
                this.activateUtilitySkill(skill);
                break;
        }
    }

    activateProjectileSkill(skill) {
        const player = this.game.player;
        const data = skill.data;
        const count = (data.count || 1) + (skill.level - 1) * (SKILL_UPGRADES.count?.value || 0);
        const spread = data.spread || 0;

        // 가장 가까운 적 찾기
        let targetEnemy = this.findNearestEnemy();

        for (let i = 0; i < count; i++) {
            const angle = targetEnemy
                ? Math.atan2(targetEnemy.y - player.y, targetEnemy.x - player.x)
                : (Math.PI * 2 * i / count);

            const spreadAngle = angle + (spread * Math.PI / 180) * ((i - count / 2) / count);

            const projectile = new Projectile(
                this.game,
                player.x,
                player.y,
                spreadAngle,
                {
                    ...data,
                    damage: data.damage * (1 + (skill.level - 1) * SKILL_UPGRADES.damage.value) * player.getDamageMultiplier(),
                    speed: data.speed * (1 + (skill.level - 1) * SKILL_UPGRADES.speed.value),
                    size: data.size * (1 + (skill.level - 1) * SKILL_UPGRADES.size.value),
                    owner: 'player'
                }
            );

            this.game.addProjectile(projectile);
        }
    }

    activateMeleeSkill(skill) {
        const player = this.game.player;
        const data = skill.data;

        // 근접 공격은 적들에게 즉시 피해
        const range = data.range * (1 + (skill.level - 1) * SKILL_UPGRADES.range.value);
        const damage = data.damage * (1 + (skill.level - 1) * SKILL_UPGRADES.damage.value) * player.getDamageMultiplier();

        for (const enemy of this.game.enemies) {
            const distance = Math.sqrt((enemy.x - player.x) ** 2 + (enemy.y - player.y) ** 2);
            if (distance <= range) {
                enemy.takeDamage(damage);
            }
        }
    }

    activateOrbitSkill(skill) {
        // 궤도 스킬은 지속적으로 회전하므로 여기서는 초기화만
        // 실제 렌더링과 충돌은 플레이어 클래스에서 처리
    }

    activateAuraSkill(skill) {
        // 오라 스킬도 지속적으로 작동
        const player = this.game.player;
        const data = skill.data;
        const range = data.range * (1 + (skill.level - 1) * SKILL_UPGRADES.size.value);
        const damage = data.damage * (1 + (skill.level - 1) * SKILL_UPGRADES.damage.value) * player.getDamageMultiplier();

        for (const enemy of this.game.enemies) {
            const distance = Math.sqrt((enemy.x - player.x) ** 2 + (enemy.y - player.y) ** 2);
            if (distance <= range) {
                enemy.takeDamage(damage * 0.016); // 프레임당 피해
            }
        }
    }

    activateAreaSkill(skill) {
        const player = this.game.player;
        const data = skill.data;
        const target = this.findNearestEnemy();

        if (!target && data.range > 0) return;

        const targetX = target ? target.x : player.x;
        const targetY = target ? target.y : player.y;
        const radius = data.radius * (1 + (skill.level - 1) * SKILL_UPGRADES.size.value);
        const damage = data.damage * (1 + (skill.level - 1) * SKILL_UPGRADES.damage.value) * player.getDamageMultiplier();

        // 범위 내 모든 적에게 피해
        for (const enemy of this.game.enemies) {
            const distance = Math.sqrt((enemy.x - targetX) ** 2 + (enemy.y - targetY) ** 2);
            if (distance <= radius) {
                enemy.takeDamage(damage);

                if (data.slow) {
                    enemy.applySlowDebuff(data.slow, 2);
                }
            }
        }
    }

    activateSummonSkill(skill) {
        // 소환 스킬 (간략화)
        // 실제로는 새로운 아군 엔티티를 생성
    }

    activateBuffSkill(skill) {
        const player = this.game.player;
        const data = skill.data;

        player.applyBuff(data, data.duration);
    }

    activateUtilitySkill(skill) {
        // 유틸리티 스킬 (텔레포트 등)
    }

    findNearestEnemy() {
        if (this.game.enemies.length === 0) return null;

        const player = this.game.player;
        let nearest = null;
        let minDist = Infinity;

        for (const enemy of this.game.enemies) {
            const dist = Math.sqrt((enemy.x - player.x) ** 2 + (enemy.y - player.y) ** 2);
            if (dist < minDist) {
                minDist = dist;
                nearest = enemy;
            }
        }

        return nearest;
    }

    addSkill(skillId) {
        const skillData = SKILLS.find(s => s.id === skillId);
        if (!skillData) return;

        const existingSkill = this.activeSkills.find(s => s.data.id === skillId);
        if (existingSkill) {
            existingSkill.level++;
            return;
        }

        this.activeSkills.push({
            data: skillData,
            level: 1,
            cooldownTimer: 0
        });
    }
}
