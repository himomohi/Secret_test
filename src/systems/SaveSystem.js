class SaveSystem {
    constructor(game) {
        this.game = game;
        this.saveKey = 'vampireSurvivalSave';
        this.highScoreKey = 'vampireSurvivalHighScore';
    }

    saveGame() {
        if (!this.game.player) return;

        const saveData = {
            character: this.game.player.characterData.id,
            level: this.game.player.level,
            exp: this.game.player.exp,
            health: this.game.player.health,
            stats: this.game.player.stats,
            inventory: this.game.player.inventory,
            skills: this.game.skillSystem.activeSkills.map(s => ({
                id: s.data.id,
                level: s.level
            })),
            gameTime: this.game.gameTime,
            score: this.game.score,
            killCount: this.game.killCount,
            position: {
                x: this.game.player.x,
                y: this.game.player.y
            },
            timestamp: Date.now()
        };

        try {
            localStorage.setItem(this.saveKey, JSON.stringify(saveData));
            return true;
        } catch (e) {
            console.error('Failed to save game:', e);
            return false;
        }
    }

    loadGame() {
        try {
            const saveData = localStorage.getItem(this.saveKey);
            if (!saveData) return null;

            return JSON.parse(saveData);
        } catch (e) {
            console.error('Failed to load game:', e);
            return null;
        }
    }

    deleteSave() {
        try {
            localStorage.removeItem(this.saveKey);
            return true;
        } catch (e) {
            console.error('Failed to delete save:', e);
            return false;
        }
    }

    saveHighScore(score) {
        try {
            const currentHighScore = this.getHighScore();
            if (score > currentHighScore) {
                localStorage.setItem(this.highScoreKey, score.toString());
                return true;
            }
            return false;
        } catch (e) {
            console.error('Failed to save high score:', e);
            return false;
        }
    }

    getHighScore() {
        try {
            const score = localStorage.getItem(this.highScoreKey);
            return score ? parseInt(score) : 0;
        } catch (e) {
            console.error('Failed to get high score:', e);
            return 0;
        }
    }

    hasSavedGame() {
        return localStorage.getItem(this.saveKey) !== null;
    }
}
