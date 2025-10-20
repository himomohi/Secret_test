class CollisionSystem {
    constructor(game) {
        this.game = game;
    }

    update(dt) {
        // 투사체 vs 적 충돌
        this.checkProjectileEnemyCollisions();

        // 플레이어 vs 적 충돌
        this.checkPlayerEnemyCollisions();

        // 플레이어 vs 아이템 충돌
        this.checkPlayerItemCollisions();

        // 엔티티 vs 맵 충돌
        this.checkMapCollisions();
    }

    checkProjectileEnemyCollisions() {
        for (const projectile of this.game.projectiles) {
            if (projectile.owner !== 'player') continue;

            for (const enemy of this.game.enemies) {
                if (enemy.isDead) continue;

                if (this.checkCircleCollision(projectile, enemy)) {
                    enemy.takeDamage(projectile.damage);
                    projectile.hit();

                    if (projectile.pierceCount <= 0) {
                        break;
                    }
                }
            }
        }
    }

    checkPlayerEnemyCollisions() {
        const player = this.game.player;
        if (!player || player.isDead) return;

        for (const enemy of this.game.enemies) {
            if (enemy.isDead) continue;

            if (this.checkCircleCollision(player, enemy)) {
                player.takeDamage(enemy.damage * 0.5); // 초당 피해를 프레임당으로 변환
            }
        }
    }

    checkPlayerItemCollisions() {
        const player = this.game.player;
        if (!player || player.isDead) return;

        const pickupRange = 30 * (1 + (player.stats.pickupRange || 0));

        for (const item of this.game.items) {
            if (item.collected) continue;

            const distance = Math.sqrt((item.x - player.x) ** 2 + (item.y - player.y) ** 2);

            if (distance <= pickupRange) {
                item.collect(player);
            }
        }
    }

    checkMapCollisions() {
        if (!this.game.map) return;

        // 플레이어 충돌
        if (this.game.player) {
            this.resolveMapCollision(this.game.player);
        }

        // 적 충돌
        for (const enemy of this.game.enemies) {
            this.resolveMapCollision(enemy);
        }
    }

    resolveMapCollision(entity) {
        const tileSize = this.game.tileSize;
        const halfSize = entity.size / 2;

        const left = Math.floor((entity.x - halfSize) / tileSize);
        const right = Math.floor((entity.x + halfSize) / tileSize);
        const top = Math.floor((entity.y - halfSize) / tileSize);
        const bottom = Math.floor((entity.y + halfSize) / tileSize);

        // 주변 타일 확인
        for (let y = top; y <= bottom; y++) {
            for (let x = left; x <= right; x++) {
                const tile = this.game.map.getTile(x, y);

                // 벽(1) 또는 나무(2)와 충돌
                if (tile === 1 || tile === 2) {
                    this.pushOutOfTile(entity, x, y, tileSize);
                }
            }
        }
    }

    pushOutOfTile(entity, tileX, tileY, tileSize) {
        const tileCenterX = tileX * tileSize + tileSize / 2;
        const tileCenterY = tileY * tileSize + tileSize / 2;

        const dx = entity.x - tileCenterX;
        const dy = entity.y - tileCenterY;

        const halfSize = entity.size / 2;
        const halfTile = tileSize / 2;

        const overlapX = (halfSize + halfTile) - Math.abs(dx);
        const overlapY = (halfSize + halfTile) - Math.abs(dy);

        if (overlapX > 0 && overlapY > 0) {
            if (overlapX < overlapY) {
                entity.x += overlapX * Math.sign(dx);
            } else {
                entity.y += overlapY * Math.sign(dy);
            }
        }
    }

    checkCircleCollision(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (a.size || 0) / 2 + (b.size || 0) / 2;

        return distance < minDistance;
    }
}
