# Pixel Artist Skill

픽셀 아트 게임을 위한 시각적 요소 생성 가이드

## 픽셀 아트 원칙

### 1. 제한된 해상도
- 8x8, 16x16, 32x32 그리드 사용
- 명확한 실루엣
- 간결한 디자인

### 2. 색상 팔레트
```javascript
// 기본 16색 팔레트 예시
const PALETTE = {
    BLACK: '#000000',
    DARK_GRAY: '#444444',
    GRAY: '#888888',
    LIGHT_GRAY: '#cccccc',
    WHITE: '#ffffff',

    DARK_RED: '#880000',
    RED: '#ff4444',
    ORANGE: '#ff8844',
    YELLOW: '#ffff00',

    DARK_GREEN: '#004400',
    GREEN: '#44ff44',

    DARK_BLUE: '#000088',
    BLUE: '#4444ff',
    CYAN: '#44ffff',

    PURPLE: '#8844ff',
    PINK: '#ff44ff'
};
```

### 3. 안티앨리어싱 피하기
```javascript
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
```

### 4. 정수 좌표 사용
```javascript
// 항상 Math.floor 사용
ctx.fillRect(
    Math.floor(x),
    Math.floor(y),
    width,
    height
);
```

## 캐릭터 디자인

### 기본 구조 (16x16)
```javascript
function drawCharacter(ctx, x, y, color) {
    // 외곽선
    ctx.fillStyle = '#000000';
    ctx.fillRect(x, y, 16, 16);

    // 몸체
    ctx.fillStyle = color;
    ctx.fillRect(x+1, y+1, 14, 14);

    // 눈
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x+4, y+6, 3, 3);
    ctx.fillRect(x+9, y+6, 3, 3);

    // 동공
    ctx.fillStyle = '#000000';
    ctx.fillRect(x+5, y+7, 2, 2);
    ctx.fillRect(x+10, y+7, 2, 2);
}
```

## 애니메이션

### 프레임 기반 애니메이션
```javascript
class PixelSprite {
    constructor() {
        this.frames = [];
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.frameDelay = 0.1; // 초
    }

    update(dt) {
        this.frameTimer += dt;
        if (this.frameTimer >= this.frameDelay) {
            this.frameTimer = 0;
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }
    }

    addFrame(frameData) {
        this.frames.push(frameData);
    }
}
```

## 이펙트

### 픽셀 파티클
```javascript
class PixelParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 100;
        this.vy = (Math.random() - 0.5) * 100;
        this.life = 1.0;
        this.color = color;
        this.size = 2;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.life -= dt;
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.fillRect(
            Math.floor(this.x),
            Math.floor(this.y),
            this.size,
            this.size
        );
        ctx.globalAlpha = 1.0;
    }
}
```

## 유틸리티 함수

### 픽셀 드로잉 헬퍼
```javascript
const PixelArt = {
    drawRect(ctx, x, y, w, h, color) {
        ctx.fillStyle = color;
        ctx.fillRect(Math.floor(x), Math.floor(y), w, h);
    },

    drawCircle(ctx, x, y, r, color) {
        ctx.fillStyle = color;
        // 픽셀 원 그리기 (정사각형 근사)
        const size = r * 2;
        ctx.fillRect(
            Math.floor(x - r),
            Math.floor(y - r),
            size,
            size
        );
    },

    drawOutline(ctx, x, y, w, h, color, thickness = 1) {
        ctx.fillStyle = color;
        // 위
        ctx.fillRect(x, y, w, thickness);
        // 아래
        ctx.fillRect(x, y + h - thickness, w, thickness);
        // 왼쪽
        ctx.fillRect(x, y, thickness, h);
        // 오른쪽
        ctx.fillRect(x + w - thickness, y, thickness, h);
    }
};
```

## 색상 팔레트 생성

### 그라디언트 팔레트
```javascript
function generatePalette(baseColor, steps = 5) {
    const palette = [];
    const rgb = hexToRgb(baseColor);

    for (let i = 0; i < steps; i++) {
        const factor = i / (steps - 1);
        palette.push({
            r: Math.floor(rgb.r * factor),
            g: Math.floor(rgb.g * factor),
            b: Math.floor(rgb.b * factor)
        });
    }

    return palette;
}
```

## 체크리스트

- [ ] 일관된 픽셀 크기
- [ ] 제한된 색상 팔레트
- [ ] 명확한 외곽선
- [ ] 픽셀 퍼펙트 렌더링
- [ ] 간결한 애니메이션
- [ ] 읽기 쉬운 UI
