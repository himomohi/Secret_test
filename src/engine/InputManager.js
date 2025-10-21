class InputManager {
    constructor(game) {
        this.game = game;
        this.keys = {};
        this.mousePos = { x: 0, y: 0 };
        this.mouseButtons = {};

        // 터치 입력
        this.touches = {};
        this.joystickActive = false;
        this.joystickVector = { x: 0, y: 0 };

        // 조이스틱 요소
        this.joystickBase = null;
        this.joystickKnob = null;
        this.joystickCenter = { x: 0, y: 0 };
        this.joystickRadius = 75;

        // 터치 ID 추적
        this.joystickTouchId = null;
    }

    init() {
        // 키보드 입력
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));

        // 마우스 입력
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('mousedown', (e) => this.onMouseDown(e));
        window.addEventListener('mouseup', (e) => this.onMouseUp(e));

        // 터치 입력
        window.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
        window.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
        window.addEventListener('touchend', (e) => this.onTouchEnd(e), { passive: false });
        window.addEventListener('touchcancel', (e) => this.onTouchEnd(e), { passive: false });

        // 조이스틱 요소 가져오기
        this.joystickBase = document.getElementById('virtualJoystick');
        this.joystickKnob = document.getElementById('joystickKnob');

        // 일시정지 버튼
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                if (this.game.state === 'PLAYING') {
                    this.game.pause();
                } else if (this.game.state === 'PAUSED') {
                    this.game.resume();
                }
            });
        }
    }

    showMobileControls() {
        if (this.joystickBase) {
            this.joystickBase.style.display = 'block';
        }
        const mobileButtons = document.getElementById('mobileButtons');
        if (mobileButtons) {
            mobileButtons.style.display = 'flex';
        }
    }

    hideMobileControls() {
        if (this.joystickBase) {
            this.joystickBase.style.display = 'none';
        }
        const mobileButtons = document.getElementById('mobileButtons');
        if (mobileButtons) {
            mobileButtons.style.display = 'none';
        }
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

    onTouchStart(e) {
        // 터치된 요소가 버튼이 아니면 기본 동작을 막습니다.
        if (e.target.tagName !== 'BUTTON') {
            e.preventDefault();
        }

        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            const touchX = touch.clientX;
            const touchY = touch.clientY;

            // 조이스틱 영역 확인 (화면 왼쪽 절반)
            if (touchX < window.innerWidth / 2 && this.game.state === 'PLAYING') {
                this.startJoystick(touch.identifier, touchX, touchY);
            }
        }
    }

    onTouchMove(e) {
        e.preventDefault();

        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];

            if (touch.identifier === this.joystickTouchId) {
                this.updateJoystick(touch.clientX, touch.clientY);
            }
        }
    }

    onTouchEnd(e) {
        e.preventDefault();

        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];

            if (touch.identifier === this.joystickTouchId) {
                this.endJoystick();
            }
        }
    }

    startJoystick(touchId, x, y) {
        this.joystickTouchId = touchId;
        this.joystickActive = true;

        // 조이스틱 위치 설정
        if (this.joystickBase) {
            this.joystickCenter.x = x;
            this.joystickCenter.y = y;
        }

        this.updateJoystick(x, y);
    }

    updateJoystick(x, y) {
        if (!this.joystickActive) return;

        const dx = x - this.joystickCenter.x;
        const dy = y - this.joystickCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            // 정규화
            this.joystickVector.x = dx / distance;
            this.joystickVector.y = dy / distance;

            // 최대 거리 제한
            const maxDistance = this.joystickRadius;
            const clampedDistance = Math.min(distance, maxDistance);

            // 노브 위치 업데이트
            if (this.joystickKnob) {
                const knobX = (dx / distance) * clampedDistance;
                const knobY = (dy / distance) * clampedDistance;

                this.joystickKnob.style.transform = `translate(calc(-50% + ${knobX}px), calc(-50% + ${knobY}px))`;
            }
        }
    }

    endJoystick() {
        this.joystickActive = false;
        this.joystickTouchId = null;
        this.joystickVector.x = 0;
        this.joystickVector.y = 0;

        // 노브 위치 리셋
        if (this.joystickKnob) {
            this.joystickKnob.style.transform = 'translate(-50%, -50%)';
        }
    }

    isKeyPressed(keyCode) {
        return !!this.keys[keyCode];
    }

    getMovementInput() {
        let dx = 0;
        let dy = 0;

        // 키보드 입력
        if (this.isKeyPressed('KeyW') || this.isKeyPressed('ArrowUp')) dy -= 1;
        if (this.isKeyPressed('KeyS') || this.isKeyPressed('ArrowDown')) dy += 1;
        if (this.isKeyPressed('KeyA') || this.isKeyPressed('ArrowLeft')) dx -= 1;
        if (this.isKeyPressed('KeyD') || this.isKeyPressed('ArrowRight')) dx += 1;

        // 터치 조이스틱 입력 (키보드 입력이 없을 때만)
        if (dx === 0 && dy === 0 && this.joystickActive) {
            dx = this.joystickVector.x;
            dy = this.joystickVector.y;
        }

        // Normalize diagonal movement
        if (dx !== 0 && dy !== 0) {
            const length = Math.sqrt(dx * dx + dy * dy);
            dx /= length;
            dy /= length;
        }

        return { x: dx, y: dy };
    }
}
