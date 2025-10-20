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
            case 0: // Grass - 더 디테일한 픽셀 아트
                const baseGrass = this.getGrassColor(x, y);
                this.ctx.fillStyle = baseGrass;
                this.ctx.fillRect(x, y, size, size);

                // 풀 디테일
                const grassSeed = (x * 7 + y * 13) % 100;
                if (grassSeed < 30) {
                    this.ctx.fillStyle = '#2d5016';
                    this.ctx.fillRect(x + (grassSeed % 8) * 4, y + (grassSeed % 6) * 4, 2, 2);
                    this.ctx.fillRect(x + ((grassSeed + 3) % 8) * 4, y + ((grassSeed + 2) % 6) * 4, 2, 2);
                }

                // 꽃 (가끔)
                if (grassSeed > 90) {
                    const flowerColor = ['#ff69b4', '#ffff00', '#ffffff'][grassSeed % 3];
                    this.ctx.fillStyle = flowerColor;
                    this.ctx.fillRect(x + 10, y + 10, 3, 3);
                    this.ctx.fillStyle = '#228b22';
                    this.ctx.fillRect(x + 11, y + 13, 1, 3);
                }
                break;

            case 1: // Wall - 돌벽 텍스처
                // 베이스
                this.ctx.fillStyle = '#5a5a5a';
                this.ctx.fillRect(x, y, size, size);

                // 돌 블록
                this.ctx.fillStyle = '#6a6a6a';
                this.ctx.fillRect(x + 2, y + 2, 12, 12);
                this.ctx.fillRect(x + 18, y + 2, 12, 12);
                this.ctx.fillRect(x + 2, y + 18, 12, 12);
                this.ctx.fillRect(x + 18, y + 18, 12, 12);

                // 하이라이트
                this.ctx.fillStyle = '#7a7a7a';
                this.ctx.fillRect(x + 3, y + 3, 4, 4);
                this.ctx.fillRect(x + 19, y + 3, 4, 4);

                // 그림자
                this.ctx.fillStyle = '#3a3a3a';
                this.ctx.fillRect(x + 10, y + 10, 4, 4);
                this.ctx.fillRect(x + 26, y + 26, 4, 4);

                // 테두리
                this.ctx.strokeStyle = '#2a2a2a';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x, y, size, size);

                // 균열 (랜덤)
                const crackSeed = (x * 11 + y * 17) % 100;
                if (crackSeed < 40) {
                    this.ctx.strokeStyle = '#4a4a4a';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 8, y + 8);
                    this.ctx.lineTo(x + 12, y + 10);
                    this.ctx.stroke();
                }
                break;

            case 2: // Tree - 더 디테일한 나무
                // 잔디 배경
                this.ctx.fillStyle = this.getGrassColor(x, y);
                this.ctx.fillRect(x, y, size, size);

                // 나무 그림자
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                this.ctx.fillRect(x + 14, y + 26, 10, 4);

                // 나무 줄기
                this.ctx.fillStyle = '#654321';
                this.ctx.fillRect(x + 13, y + 18, 6, 10);

                // 줄기 하이라이트
                this.ctx.fillStyle = '#8b6914';
                this.ctx.fillRect(x + 13, y + 18, 2, 8);

                // 줄기 그림자
                this.ctx.fillStyle = '#4a2f0f';
                this.ctx.fillRect(x + 17, y + 20, 2, 6);

                // 잎사귀 (여러 레이어)
                // 뒷면
                this.ctx.fillStyle = '#1a5016';
                this.ctx.fillRect(x + 4, y + 8, 24, 18);

                // 중간
                this.ctx.fillStyle = '#228b22';
                this.ctx.fillRect(x + 6, y + 6, 20, 16);

                // 하이라이트
                this.ctx.fillStyle = '#32cd32';
                this.ctx.fillRect(x + 8, y + 8, 6, 6);
                this.ctx.fillRect(x + 18, y + 10, 4, 4);

                // 그림자
                this.ctx.fillStyle = '#1a5016';
                this.ctx.fillRect(x + 7, y + 18, 8, 4);
                this.ctx.fillRect(x + 20, y + 16, 4, 4);

                // 열매 (가끔)
                const fruitSeed = (x * 13 + y * 19) % 100;
                if (fruitSeed > 80) {
                    this.ctx.fillStyle = '#ff4444';
                    this.ctx.fillRect(x + 10, y + 14, 3, 3);
                    this.ctx.fillRect(x + 20, y + 12, 3, 3);
                }
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
