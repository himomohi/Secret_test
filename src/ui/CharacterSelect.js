class CharacterSelect {
    constructor(uiManager) {
        this.uiManager = uiManager;
        this.game = uiManager.game;
        this.element = null;
    }

    show() {
        this.element = document.createElement('div');
        this.element.id = 'characterSelect';
        this.element.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 1000px;
            max-height: 80vh;
            overflow-y: auto;
            background: rgba(0, 0, 0, 0.95);
            padding: 30px;
            border: 3px solid #44ff44;
            color: #ffffff;
            font-family: 'Courier New', monospace;
        `;

        let html = '<h2 style="color: #44ff44; text-align: center; margin-bottom: 30px;">캐릭터 선택</h2>';
        html += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">';

        for (const char of CHARACTERS) {
            html += `
                <div class="character-card" data-id="${char.id}" style="
                    background: rgba(${this.hexToRgb(char.color)}, 0.2);
                    border: 2px solid ${char.color};
                    padding: 15px;
                    cursor: pointer;
                    transition: transform 0.2s;
                ">
                    <div style="width: 60px; height: 60px; background: ${char.color}; margin: 0 auto 10px; border: 2px solid #000;"></div>
                    <h3 style="color: ${char.color}; text-align: center; margin-bottom: 5px;">${char.name}</h3>
                    <p style="font-size: 12px; text-align: center; margin-bottom: 10px; color: #aaa;">${char.description}</p>
                    <div style="font-size: 11px; line-height: 1.6;">
                        <p>❤️ 체력: ${char.baseHealth}</p>
                        <p>⚔️ 공격력: ${char.baseDamage}</p>
                        <p>🏃 속도: ${char.baseSpeed}</p>
                        <p>🛡️ 방어력: ${char.baseArmor}</p>
                    </div>
                </div>
            `;
        }

        html += '</div>';
        html += '<button id="backBtn" style="display: block; margin: 30px auto 0; padding: 10px 30px; font-size: 16px; background: #ff4444; border: none; color: #fff; cursor: pointer;">뒤로 가기</button>';

        this.element.innerHTML = html;
        this.uiManager.container.appendChild(this.element);

        // 이벤트 리스너
        const cards = this.element.querySelectorAll('.character-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            card.addEventListener('click', () => {
                const charId = card.getAttribute('data-id');
                this.game.startGame(charId);
            });
        });

        document.getElementById('backBtn').onclick = () => {
            this.game.showMainMenu();
        };
    }

    hide() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ?
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
            '255, 255, 255';
    }
}
