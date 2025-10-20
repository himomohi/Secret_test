class Camera {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.target = null;
        this.smoothness = 0.1;
    }

    follow(entity) {
        this.target = entity;
    }

    update(dt) {
        if (this.target) {
            const targetX = this.target.x - this.game.width / 2;
            const targetY = this.target.y - this.game.height / 2;

            this.x += (targetX - this.x) * this.smoothness;
            this.y += (targetY - this.y) * this.smoothness;
        }
    }

    worldToScreen(x, y) {
        return {
            x: x - this.x,
            y: y - this.y
        };
    }

    screenToWorld(x, y) {
        return {
            x: x + this.x,
            y: y + this.y
        };
    }
}
