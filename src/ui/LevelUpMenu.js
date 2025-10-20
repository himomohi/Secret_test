class LevelUpMenu {
    constructor(uiManager) {
        this.uiManager = uiManager;
        this.game = uiManager.game;
        this.element = null;
    }

    show() {
        // 게임 일시 정지
        const previousState = this.game.state;
        this.game.state = 'PAUSED';

        this.element = document.createElement('div');
        this.element.id = 'levelUpMenu';
        this.element.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            padding: 30px;
            border: 3px solid #ffaa00;
            color: #ffffff;
            font-family: 'Courier New', monospace;
            max-width: 600px;
        `;

        // 랜덤 스킬 3개 선택
        const options = this.getSkillOptions();

        let html = '<h2 style="color: #ffaa00; text-align: center; margin-bottom: 20px;">레벨 업!</h2>';
        html += '<p style="text-align: center; margin-bottom: 30px;">스킬을 선택하세요:</p>';

        for (const option of options) {
            const isUpgrade = this.game.skillSystem.activeSkills.some(s => s.data.id === option.id);
            html += `
                <div class="skill-option" data-id="${option.id}" style="
                    background: rgba(68, 68, 255, 0.2);
                    border: 2px solid #4444ff;
                    padding: 15px;
                    margin-bottom: 10px;
                    cursor: pointer;
                    transition: all 0.2s;
                ">
                    <h3 style="color: #44aaff; margin-bottom: 5px;">${option.name} ${isUpgrade ? '⬆️' : '🆕'}</h3>
                    <p style="font-size: 12px; color: #aaa; margin-bottom: 8px;">${option.type === 'projectile' ? '투사체' : option.type === 'melee' ? '근접' : option.type === 'aura' ? '오라' : '특수'}</p>
                    <p style="font-size: 13px;">피해: ${option.damage || 0} | 쿨다운: ${option.cooldown || 0}s</p>
                </div>
            `;
        }

        this.element.innerHTML = html;
        this.uiManager.container.appendChild(this.element);

        // 이벤트 리스너
        const optionElements = this.element.querySelectorAll('.skill-option');
        optionElements.forEach(elem => {
            elem.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.borderColor = '#ffaa00';
            });
            elem.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.borderColor = '#4444ff';
            });
            elem.addEventListener('click', () => {
                const skillId = elem.getAttribute('data-id');
                this.selectSkill(skillId);
                this.game.state = previousState;
            });
        });
    }

    hide() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }

    getSkillOptions() {
        // 랜덤하게 3개의 스킬 선택
        const options = [];
        const availableSkills = [...SKILLS];

        for (let i = 0; i < 3 && availableSkills.length > 0; i++) {
            const index = Math.floor(Math.random() * availableSkills.length);
            options.push(availableSkills[index]);
            availableSkills.splice(index, 1);
        }

        return options;
    }

    selectSkill(skillId) {
        this.game.skillSystem.addSkill(skillId);
        this.hide();
    }
}
