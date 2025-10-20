class MainMenu {
    constructor(uiManager) {
        this.uiManager = uiManager;
        this.game = uiManager.game;
        this.element = null;
    }

    show() {
        this.element = document.createElement('div');
        this.element.id = 'mainMenu';
        this.element.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #ffffff;
            font-family: 'Courier New', monospace;
        `;

        const hasSave = this.game.saveSystem.hasSavedGame();

        this.element.innerHTML = `
            <h1 style="font-size: 48px; color: #44ff44; text-shadow: 3px 3px #000; margin-bottom: 10px;">VAMPIRE SURVIVORS</h1>
            <h2 style="font-size: 24px; color: #aaaaaa; margin-bottom: 40px;">픽셀 에디션</h2>
            <button id="newGameBtn" style="display: block; width: 300px; margin: 15px auto; padding: 15px; font-size: 20px; background: #44ff44; border: 3px solid #000; color: #000; cursor: pointer; font-family: 'Courier New', monospace;">새 게임</button>
            ${hasSave ? '<button id="loadGameBtn" style="display: block; width: 300px; margin: 15px auto; padding: 15px; font-size: 20px; background: #4444ff; border: 3px solid #000; color: #fff; cursor: pointer; font-family: \'Courier New\', monospace;">이어하기</button>' : ''}
            <button id="howToPlayBtn" style="display: block; width: 300px; margin: 15px auto; padding: 15px; font-size: 20px; background: #ff8844; border: 3px solid #000; color: #fff; cursor: pointer; font-family: 'Courier New', monospace;">게임 방법</button>
            <p style="margin-top: 40px; font-size: 14px; color: #888;">최고 기록: ${this.game.saveSystem.getHighScore()}</p>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">WASD 또는 방향키로 이동 | ESC로 일시정지</p>
        `;

        this.uiManager.container.appendChild(this.element);

        document.getElementById('newGameBtn').onclick = () => {
            this.game.showCharacterSelect();
        };

        if (hasSave) {
            document.getElementById('loadGameBtn').onclick = () => {
                const saveData = this.game.saveSystem.loadGame();
                if (saveData) {
                    // 저장된 게임 로드 (간략화)
                    this.game.startGame(saveData.character);
                }
            };
        }

        document.getElementById('howToPlayBtn').onclick = () => {
            this.showHowToPlay();
        };
    }

    hide() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }

    showHowToPlay() {
        const div = document.createElement('div');
        div.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            padding: 30px;
            border: 3px solid #44ff44;
            color: #ffffff;
            max-width: 600px;
            font-family: 'Courier New', monospace;
        `;

        div.innerHTML = `
            <h2 style="color: #44ff44; margin-bottom: 20px;">게임 방법</h2>
            <p style="margin-bottom: 10px;">🎮 <strong>이동:</strong> WASD 또는 방향키</p>
            <p style="margin-bottom: 10px;">⚔️ <strong>공격:</strong> 자동 공격 (스킬에 따라 다름)</p>
            <p style="margin-bottom: 10px;">📈 <strong>레벨업:</strong> 경험치를 모아 레벨업하고 새로운 스킬 획득</p>
            <p style="margin-bottom: 10px;">💎 <strong>아이템:</strong> 적을 처치하면 아이템 드롭</p>
            <p style="margin-bottom: 10px;">🎯 <strong>목표:</strong> 최대한 오래 생존하며 높은 점수 획득</p>
            <p style="margin-bottom: 10px;">⏸️ <strong>일시정지:</strong> ESC 키</p>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">시간이 지날수록 적이 강해집니다. 스킬과 아이템을 잘 조합하여 생존하세요!</p>
            <button id="closeBtn" style="display: block; margin: 20px auto 0; padding: 10px 30px; font-size: 16px; background: #44ff44; border: none; color: #000; cursor: pointer;">닫기</button>
        `;

        this.uiManager.container.appendChild(div);

        document.getElementById('closeBtn').onclick = () => {
            div.remove();
        };
    }
}
