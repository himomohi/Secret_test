---
description: HTML5 Canvas 기반 게임 프로젝트 생성
---

새로운 HTML5 Canvas 기반 게임 프로젝트를 만들어주세요.

다음 구조를 포함해야 합니다:

## 프로젝트 구조
```
/
├── index.html              # 메인 HTML (Canvas 포함)
├── src/
│   ├── main.js            # 게임 진입점
│   ├── engine/            # 게임 엔진
│   │   ├── GameEngine.js  # 메인 게임 루프
│   │   ├── Renderer.js    # 렌더링 시스템
│   │   ├── InputManager.js # 입력 처리
│   │   └── Camera.js      # 카메라 시스템
│   ├── entities/          # 게임 오브젝트
│   │   └── Entity.js      # 기본 엔티티 클래스
│   ├── systems/           # 게임 시스템
│   └── data/              # 게임 데이터
└── README.md
```

## 요구사항
- 픽셀 퍼펙트 렌더링 (imageSmoothingEnabled = false)
- 60 FPS 게임 루프
- Delta time 기반 업데이트
- 깔끔한 코드 구조
- ES6+ 문법 사용
- 프레임워크 없이 순수 JavaScript로 구현

## 기본 기능
- 게임 상태 관리 (메뉴, 플레이중, 일시정지, 게임오버)
- 키보드/마우스 입력 처리
- 카메라 시스템
- 기본 렌더링 시스템
- 엔티티 시스템

사용자가 지정한 게임 타입에 맞게 커스터마이징하세요.
