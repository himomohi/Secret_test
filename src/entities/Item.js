class Item extends Entity {
    constructor(game, x, y, itemData) {
        super(game, x, y);

        this.itemData = itemData;
        this.size = 12;
        this.color = RARITY_COLORS[itemData.rarity] || '#ffffff';
        this.collected = false;

        // 아이템 애니메이션
        this.bobOffset = 0;
        this.bobSpeed = 2;
    }

    update(dt) {
        // 위아래로 흔들리는 애니메이션
        this.bobOffset = Math.sin(Date.now() / 1000 * this.bobSpeed) * 4;
    }

    render(ctx) {
        const x = Math.floor(this.x - this.size / 2);
        const y = Math.floor(this.y - this.size / 2 + this.bobOffset);

        // 희귀도별 글로우 (레이어드)
        const rarityGlow = {
            common: 1,
            uncommon: 2,
            rare: 3,
            epic: 4,
            legendary: 5
        }[this.itemData.rarity] || 1;

        for (let i = rarityGlow; i > 0; i--) {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.15 / i;
            const glowSize = i * 2;
            ctx.fillRect(x - glowSize, y - glowSize, this.size + glowSize * 2, this.size + glowSize * 2);
        }
        ctx.globalAlpha = 1.0;

        // 외곽선
        ctx.fillStyle = '#000000';
        ctx.fillRect(x - 1, y - 1, this.size + 2, this.size + 2);

        // 아이템 본체
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, this.size, this.size);

        // 아이템 타입별 아이콘
        if (this.itemData.type === 'weapon') {
            // 검 아이콘
            ctx.fillStyle = '#c0c0c0';
            ctx.fillRect(x + 4, y + 2, 4, 8);
            ctx.fillRect(x + 3, y + 8, 6, 2);
        } else if (this.itemData.type === 'armor') {
            // 방패 아이콘
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(x + 3, y + 3, 6, 6);
        } else if (this.itemData.type === 'accessory') {
            // 보석 아이콘
            ctx.fillStyle = '#ff00ff';
            ctx.fillRect(x + 4, y + 4, 4, 4);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x + 5, y + 5, 2, 2);
        }

        // 내부 하이라이트 (모든 타입)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillRect(x + 1, y + 1, 3, 3);

        // 희귀도별 특수 효과
        if (this.itemData.rarity === 'legendary' || this.itemData.rarity === 'epic') {
            // 회전하는 별 효과
            const time = Date.now() / 500;
            const starAngle = time % (Math.PI * 2);

            for (let i = 0; i < 4; i++) {
                const angle = starAngle + (i * Math.PI / 2);
                const starX = x + this.size / 2 + Math.cos(angle) * (this.size + 4);
                const starY = y + this.size / 2 + Math.sin(angle) * (this.size + 4);

                ctx.fillStyle = this.color;
                ctx.globalAlpha = 0.7;
                ctx.fillRect(Math.floor(starX), Math.floor(starY), 2, 2);
            }
            ctx.globalAlpha = 1.0;
        }

        // 레전더리는 추가 외곽선
        if (this.itemData.rarity === 'legendary') {
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 1;
            ctx.globalAlpha = Math.abs(Math.sin(Date.now() / 300));
            ctx.strokeRect(x - 2, y - 2, this.size + 4, this.size + 4);
            ctx.globalAlpha = 1.0;
        }
    }

    collect(player) {
        if (this.collected) return;

        this.collected = true;
        player.addItem(this.itemData);

        // 수집 효과음 (나중에 추가 가능)
    }
}
