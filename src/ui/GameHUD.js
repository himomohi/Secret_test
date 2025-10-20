class GameHUD {
    constructor(uiManager) {
        this.uiManager = uiManager;
        this.game = uiManager.game;
        this.element = null;
    }

    show() {
        this.element = document.createElement('div');
        this.element.id = 'gameHUD';
        this.element.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 15px;
            color: #ffffff;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            pointer-events: none;
        `;

        this.element.innerHTML = `
            <div style="background: rgba(0, 0, 0, 0.7); padding: 10px; border: 2px solid #44ff44; display: inline-block;">
                <div id="hudHealth" style="margin-bottom: 5px;">❤️ HP: 100/100</div>
                <div id="hudLevel">⭐ Lv.1 | EXP: 0/100</div>
                <div id="hudTime" style="margin-top: 5px;">⏱️ 시간: 0:00</div>
                <div id="hudKills">💀 킬: 0</div>
                <div id="hudScore">🏆 점수: 0</div>
            </div>
            <div id="hudSkills" style="position: absolute; bottom: 15px; left: 15px; background: rgba(0, 0, 0, 0.7); padding: 10px; border: 2px solid #4444ff;">
                <div style="margin-bottom: 5px; color: #aaaaff;">활성 스킬:</div>
            </div>
        `;

        this.uiManager.container.appendChild(this.element);

        // 주기적으로 업데이트
        this.updateInterval = setInterval(() => this.update(), 100);
    }

    hide() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }

    update() {
        if (!this.game.player) return;

        const player = this.game.player;

        // 체력
        document.getElementById('hudHealth').textContent =
            `❤️ HP: ${Math.ceil(player.health)}/${player.maxHealth}`;

        // 레벨 & 경험치
        document.getElementById('hudLevel').textContent =
            `⭐ Lv.${player.level} | EXP: ${Math.floor(player.exp)}/${player.expToNextLevel}`;

        // 시간
        const minutes = Math.floor(this.game.gameTime / 60);
        const seconds = Math.floor(this.game.gameTime % 60);
        document.getElementById('hudTime').textContent =
            `⏱️ 시간: ${minutes}:${seconds.toString().padStart(2, '0')}`;

        // 킬 수
        document.getElementById('hudKills').textContent =
            `💀 킬: ${this.game.killCount}`;

        // 점수
        document.getElementById('hudScore').textContent =
            `🏆 점수: ${this.game.score}`;

        // 스킬 목록
        const skillsDiv = document.getElementById('hudSkills');
        let skillsHtml = '<div style="margin-bottom: 5px; color: #aaaaff;">활성 스킬:</div>';

        for (const skill of this.game.skillSystem.activeSkills) {
            skillsHtml += `<div style="font-size: 11px; color: #ffffff;">• ${skill.data.name} Lv.${skill.level}</div>`;
        }

        skillsDiv.innerHTML = skillsHtml;
    }
}
