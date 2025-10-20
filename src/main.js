// 게임 초기화
let game;

window.addEventListener('load', () => {
    game = new GameEngine();

    // 픽셀 아트 렌더러 초기화
    window.pixelArtRenderer = new PixelArtRenderer(game.ctx);

    game.init();
});

// 디버깅용
window.game = game;
