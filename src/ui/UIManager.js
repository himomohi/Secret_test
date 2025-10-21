class UIManager {
    constructor(game) {
        this.game = game;
        this.container = document.getElementById('uiOverlay');

        this.mainMenu = new MainMenu(this);
        this.characterSelect = new CharacterSelect(this);
        this.gameHUD = new GameHUD(this);
        this.levelUpMenu = new LevelUpMenu(this);

        this.currentScreen = null;
    }

    init() {
        // 초기화
    }

    showMainMenu() {
        this.hideAll();
        this.mainMenu.show();
        this.currentScreen = 'main_menu';

        if (this.game.isMobile) {
            this.game.inputManager.showMobileControls();
        }
    }

    showCharacterSelect() {
        this.hideAll();
        this.characterSelect.show();
        this.currentScreen = 'character_select';
    }

    showGameHUD() {
        this.hideAll();
        this.gameHUD.show();
        this.currentScreen = 'game_hud';

        // 모바일에서 조이스틱 표시
        if (this.game.isMobile) {
            this.game.inputManager.showMobileControls();
        }
    }

    onResize() {
        // HUD 업데이트
        if (this.gameHUD && this.currentScreen === 'game_hud') {
            this.gameHUD.update();
        }
    }

    showLevelUpMenu() {
        this.levelUpMenu.show();
    }

    showPauseMenu() {
        this.createPauseMenu();
    }

    hidePauseMenu() {
        const pauseMenu = document.getElementById('pauseMenu');
        if (pauseMenu) {
            pauseMenu.remove();
        }
    }

    showGameOver() {
        this.createGameOverScreen();
    }

    hideAll() {
        this.mainMenu.hide();
        this.characterSelect.hide();
        this.gameHUD.hide();
        this.levelUpMenu.hide();
        this.hidePauseMenu();
    }

    createPauseMenu() {
        const div = document.createElement('div');
        div.id = 'pauseMenu';

        const isMobile = this.game.isMobile;
        const buttonWidth = isMobile ? '80%' : '200px';
        const fontSize = isMobile ? '18px' : '16px';

        div.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            padding: ${isMobile ? '20px' : '30px'};
            border: 3px solid #44ff44;
            color: #ffffff;
            font-family: 'Courier New', monospace;
            text-align: center;
            max-width: ${isMobile ? '90%' : '400px'};
            z-index: 1000;
        `;

        div.innerHTML = `
            <h2 style="color: #44ff44; margin-bottom: 20px; font-size: ${isMobile ? '24px' : '20px'};">일시 정지</h2>
            <button id="resumeBtn" style="display: block; width: ${buttonWidth}; margin: 10px auto; padding: 15px; font-size: ${fontSize}; background: #44ff44; border: 2px solid #000; color: #000; cursor: pointer; font-family: 'Courier New', monospace; font-weight: bold;">계속하기${isMobile ? '' : ' (ESC)'}</button>
            <button id="saveBtn" style="display: block; width: ${buttonWidth}; margin: 10px auto; padding: 15px; font-size: ${fontSize}; background: #4444ff; border: 2px solid #000; color: #fff; cursor: pointer; font-family: 'Courier New', monospace; font-weight: bold;">저장하기</button>
            <button id="mainMenuBtn" style="display: block; width: ${buttonWidth}; margin: 10px auto; padding: 15px; font-size: ${fontSize}; background: #ff4444; border: 2px solid #000; color: #fff; cursor: pointer; font-family: 'Courier New', monospace; font-weight: bold;">메인 메뉴</button>
        `;

        this.container.appendChild(div);

        document.getElementById('resumeBtn').onclick = () => this.game.resume();
        document.getElementById('saveBtn').onclick = () => {
            this.game.saveSystem.saveGame();
            alert('게임이 저장되었습니다!');
        };
        document.getElementById('mainMenuBtn').onclick = () => {
            this.game.showMainMenu();
        };
    }

    createGameOverScreen() {
        const div = document.createElement('div');
        div.id = 'gameOverScreen';

        const isMobile = this.game.isMobile;
        const buttonWidth = isMobile ? '80%' : '200px';
        const fontSize = isMobile ? '18px' : '16px';

        div.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            padding: ${isMobile ? '20px' : '40px'};
            border: 4px solid #ff4444;
            color: #ffffff;
            font-family: 'Courier New', monospace;
            text-align: center;
            max-width: ${isMobile ? '90%' : '500px'};
            z-index: 1000;
        `;

        const highScore = this.game.saveSystem.getHighScore();
        const isNewHighScore = this.game.score > highScore;

        div.innerHTML = `
            <h1 style="color: #ff4444; margin-bottom: 20px; font-size: ${isMobile ? '28px' : '32px'};">게임 오버</h1>
            ${isNewHighScore ? '<p style="color: #ffaa00; font-size: ' + (isMobile ? '18px' : '20px') + ';">🎉 신기록!</p>' : ''}
            <p style="font-size: ${isMobile ? '16px' : '18px'}; margin: 10px 0;">점수: ${this.game.score}</p>
            <p style="font-size: ${isMobile ? '14px' : '16px'}; margin: 5px 0;">킬 수: ${this.game.killCount}</p>
            <p style="font-size: ${isMobile ? '14px' : '16px'}; margin: 5px 0;">생존 시간: ${Math.floor(this.game.gameTime)}초</p>
            <p style="font-size: ${isMobile ? '14px' : '16px'}; margin: 5px 0;">최고 기록: ${isNewHighScore ? this.game.score : highScore}</p>
            <button id="restartBtn" style="display: block; width: ${buttonWidth}; margin: 20px auto 10px; padding: 15px; font-size: ${fontSize}; background: #44ff44; border: 2px solid #000; color: #000; cursor: pointer; font-family: 'Courier New', monospace; font-weight: bold;">다시 시작</button>
            <button id="menuBtn" style="display: block; width: ${buttonWidth}; margin: 10px auto; padding: 15px; font-size: ${fontSize}; background: #4444ff; border: 2px solid #000; color: #fff; cursor: pointer; font-family: 'Courier New', monospace; font-weight: bold;">메인 메뉴</button>
        `;

        this.container.appendChild(div);

        document.getElementById('restartBtn').onclick = () => {
            div.remove();
            this.game.showCharacterSelect();
        };
        document.getElementById('menuBtn').onclick = () => {
            div.remove();
            this.game.showMainMenu();
        };
    }
}
