# Game Developer Skill

이 스킬은 게임 개발 프로젝트를 효율적으로 진행하기 위한 템플릿과 가이드라인을 제공합니다.

## 사용 방법

이 스킬을 활성화하면 다음 작업을 수행할 수 있습니다:

### 1. 새 게임 프로젝트 생성
```
/create-html5-game
```

### 2. 게임 시스템 추가
```
/add-game-system
```

### 3. 게임 데이터 생성
```
/create-game-data
```

### 4. 픽셀 아트 렌더링
```
/add-pixel-art-rendering
```

### 5. 성능 최적화
```
/optimize-game-performance
```

### 6. GitHub Pages 배포
```
/deploy-github-pages
```

## 프로젝트 구조 템플릿

```
game-project/
├── index.html
├── README.md
├── src/
│   ├── main.js
│   ├── engine/
│   │   ├── GameEngine.js
│   │   ├── Renderer.js
│   │   ├── InputManager.js
│   │   └── Camera.js
│   ├── entities/
│   │   ├── Entity.js
│   │   ├── Player.js
│   │   └── Enemy.js
│   ├── systems/
│   │   ├── CollisionSystem.js
│   │   ├── ParticleSystem.js
│   │   └── SaveSystem.js
│   ├── data/
│   │   ├── characters.js
│   │   ├── skills.js
│   │   └── items.js
│   └── ui/
│       ├── UIManager.js
│       └── Menu.js
└── assets/
    ├── sprites/
    └── audio/
```

## 베스트 프랙티스

### 코드 구조
- ES6+ 클래스 사용
- 모듈화된 설계
- 관심사의 분리
- DRY 원칙

### 성능
- 60 FPS 목표
- 오브젝트 풀링
- 공간 분할
- 뷰포트 컬링

### 게임 디자인
- 명확한 게임 루프
- 상태 관리
- 이벤트 시스템
- 데이터 기반 설계

## 체크리스트

### 기본 기능
- [ ] 게임 루프 (update, render)
- [ ] 입력 처리 (키보드, 마우스)
- [ ] 상태 관리 (메뉴, 플레이, 일시정지)
- [ ] 카메라 시스템
- [ ] 충돌 감지

### UI
- [ ] 메인 메뉴
- [ ] HUD (체력, 점수 등)
- [ ] 일시정지 메뉴
- [ ] 게임 오버 화면

### 데이터
- [ ] 플레이어 데이터
- [ ] 적 데이터
- [ ] 아이템 데이터
- [ ] 레벨 데이터

### 시스템
- [ ] 스폰 시스템
- [ ] 레벨 시스템
- [ ] 저장/로드
- [ ] 사운드 시스템

### 배포
- [ ] README 작성
- [ ] GitHub Pages 설정
- [ ] 브라우저 테스트
- [ ] 모바일 테스트
