class ItemSystem {
    constructor(game) {
        this.game = game;
    }

    spawnRandomItem(x, y) {
        const roll = Math.random();
        let rarity = 'common';

        if (roll < DROP_RATES.legendary) {
            rarity = 'legendary';
        } else if (roll < DROP_RATES.legendary + DROP_RATES.epic) {
            rarity = 'epic';
        } else if (roll < DROP_RATES.legendary + DROP_RATES.epic + DROP_RATES.rare) {
            rarity = 'rare';
        } else if (roll < DROP_RATES.legendary + DROP_RATES.epic + DROP_RATES.rare + DROP_RATES.uncommon) {
            rarity = 'uncommon';
        }

        const availableItems = ITEMS.filter(item => item.rarity === rarity);
        if (availableItems.length === 0) return;

        const itemData = availableItems[Math.floor(Math.random() * availableItems.length)];
        const item = new Item(this.game, x, y, itemData);
        this.game.addItem(item);
    }

    applyItemEffects(player, item) {
        const stats = player.stats;

        // 기본 스탯 적용
        if (item.damage) stats.damage += item.damage;
        if (item.health) {
            stats.maxHealth += item.health;
            player.health += item.health;
        }
        if (item.armor) stats.armor += item.armor;
        if (item.speed) stats.speedMultiplier += item.speed;
        if (item.attackSpeed) stats.attackSpeed += item.attackSpeed;
        if (item.critChance) stats.critChance += item.critChance;
        if (item.critDamage) stats.critDamage += item.critDamage;
        if (item.lifesteal) stats.lifesteal += item.lifesteal;
        if (item.healthRegen) stats.healthRegen += item.healthRegen;
        if (item.cooldownReduction) stats.cooldownReduction += item.cooldownReduction;
        if (item.projectileSpeed) stats.projectileSpeed += item.projectileSpeed;
        if (item.projectileCount) stats.projectileCount += item.projectileCount;
        if (item.pierce) stats.pierce += item.pierce;
        if (item.areaSize) stats.areaSize += item.areaSize;
        if (item.expGain) stats.expMultiplier += item.expGain;
        if (item.dropRate) stats.dropRateMultiplier += item.dropRate;
        if (item.pickupRange) stats.pickupRange += item.pickupRange;

        // 특수 효과
        if (item.allStats) {
            stats.damage *= (1 + item.allStats);
            stats.speedMultiplier += item.allStats;
            stats.attackSpeed += item.allStats;
        }

        // 원소 속성
        if (item.element) {
            if (!stats.elements) stats.elements = [];
            if (!stats.elements.includes(item.element)) {
                stats.elements.push(item.element);
            }
        }

        if (item.allElements) {
            stats.elements = ['fire', 'ice', 'lightning', 'poison', 'void'];
        }
    }
}
