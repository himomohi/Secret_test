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

        // 글로우 효과
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(x - 2, y - 2, this.size + 4, this.size + 4);
        ctx.globalAlpha = 1.0;

        // 아이템 본체
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, this.size, this.size);

        // 내부 하이라이트
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 2, y + 2, 4, 4);

        // 희귀도별 파티클 효과
        if (this.itemData.rarity === 'legendary') {
            ctx.strokeStyle = '#ffaa00';
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.6;
            ctx.strokeRect(x - 3, y - 3, this.size + 6, this.size + 6);
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
