class InputManager {
    constructor(game) {
        this.game = game;
        this.keys = {};
        this.mousePos = { x: 0, y: 0 };
        this.mouseButtons = {};
    }

    init() {
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('mousedown', (e) => this.onMouseDown(e));
        window.addEventListener('mouseup', (e) => this.onMouseUp(e));
    }

    onKeyDown(e) {
        this.keys[e.code] = true;

        // Pause game with ESC
        if (e.code === 'Escape' && this.game.state === 'PLAYING') {
            this.game.pause();
        } else if (e.code === 'Escape' && this.game.state === 'PAUSED') {
            this.game.resume();
        }
    }

    onKeyUp(e) {
        this.keys[e.code] = false;
    }

    onMouseMove(e) {
        const rect = this.game.canvas.getBoundingClientRect();
        this.mousePos.x = e.clientX - rect.left;
        this.mousePos.y = e.clientY - rect.top;
    }

    onMouseDown(e) {
        this.mouseButtons[e.button] = true;
    }

    onMouseUp(e) {
        this.mouseButtons[e.button] = false;
    }

    isKeyPressed(keyCode) {
        return !!this.keys[keyCode];
    }

    getMovementInput() {
        let dx = 0;
        let dy = 0;

        if (this.isKeyPressed('KeyW') || this.isKeyPressed('ArrowUp')) dy -= 1;
        if (this.isKeyPressed('KeyS') || this.isKeyPressed('ArrowDown')) dy += 1;
        if (this.isKeyPressed('KeyA') || this.isKeyPressed('ArrowLeft')) dx -= 1;
        if (this.isKeyPressed('KeyD') || this.isKeyPressed('ArrowRight')) dx += 1;

        // Normalize diagonal movement
        if (dx !== 0 && dy !== 0) {
            const length = Math.sqrt(dx * dx + dy * dy);
            dx /= length;
            dy /= length;
        }

        return { x: dx, y: dy };
    }
}
