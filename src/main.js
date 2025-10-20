// 게임 초기화
let game;

window.addEventListener('load', () => {
    game = new GameEngine();
    game.init();
});

// 디버깅용
window.game = game;
