class Renderer {
    constructor(game) {
        this.game = game;
        this.ctx = game.ctx;
    }

    init() {
        // Disable image smoothing for pixel-perfect rendering
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
    }

    render() {
        // Clear screen
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.game.width, this.game.height);

        if (this.game.state === 'PLAYING' || this.game.state === 'PAUSED') {
            this.ctx.save();

            // Apply camera transformation
            this.ctx.translate(-this.game.camera.x, -this.game.camera.y);

            // Render map
            this.renderMap();

            // Render items
            for (const item of this.game.items) {
                item.render(this.ctx);
            }

            // Render player
            if (this.game.player) {
                this.game.player.render(this.ctx);
            }

            // Render enemies
            for (const enemy of this.game.enemies) {
                enemy.render(this.ctx);
            }

            // Render projectiles
            for (const projectile of this.game.projectiles) {
                projectile.render(this.ctx);
            }

            this.ctx.restore();
        }
    }

    renderMap() {
        if (!this.game.map) return;

        const camera = this.game.camera;
        const tileSize = this.game.tileSize;

        // Calculate visible tile range
        const startX = Math.floor(camera.x / tileSize);
        const startY = Math.floor(camera.y / tileSize);
        const endX = Math.ceil((camera.x + this.game.width) / tileSize);
        const endY = Math.ceil((camera.y + this.game.height) / tileSize);

        for (let y = Math.max(0, startY); y < Math.min(this.game.map.height, endY); y++) {
            for (let x = Math.max(0, startX); x < Math.min(this.game.map.width, endX); x++) {
                const tile = this.game.map.getTile(x, y);
                this.renderTile(x * tileSize, y * tileSize, tile);
            }
        }
    }

    renderTile(x, y, tile) {
        const size = this.game.tileSize;

        switch (tile) {
            case 0: // Grass
                this.ctx.fillStyle = this.getGrassColor(x, y);
                this.ctx.fillRect(x, y, size, size);
                // Add some detail
                if ((x + y) % 64 === 0) {
                    this.ctx.fillStyle = 'rgba(0, 100, 0, 0.3)';
                    this.ctx.fillRect(x + 4, y + 4, 2, 2);
                }
                break;
            case 1: // Wall
                this.ctx.fillStyle = '#4a4a4a';
                this.ctx.fillRect(x, y, size, size);
                this.ctx.strokeStyle = '#2a2a2a';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x, y, size, size);
                break;
            case 2: // Tree
                this.ctx.fillStyle = this.getGrassColor(x, y);
                this.ctx.fillRect(x, y, size, size);
                // Tree trunk
                this.ctx.fillStyle = '#654321';
                this.ctx.fillRect(x + 12, y + 16, 8, 12);
                // Tree foliage
                this.ctx.fillStyle = '#228b22';
                this.ctx.fillRect(x + 6, y + 6, 20, 20);
                this.ctx.fillStyle = '#2d5016';
                this.ctx.fillRect(x + 8, y + 8, 4, 4);
                this.ctx.fillRect(x + 18, y + 8, 4, 4);
                break;
        }
    }

    getGrassColor(x, y) {
        // Slight variation in grass color
        const variation = ((x * 7 + y * 13) % 5) * 3;
        const baseGreen = 80 + variation;
        return `rgb(34, ${baseGreen}, 34)`;
    }

    // Pixel drawing utilities
    drawPixelRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(Math.floor(x), Math.floor(y), width, height);
    }

    drawPixelCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(Math.floor(x), Math.floor(y), radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
