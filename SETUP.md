# 🎮 게임 실행 및 배포 가이드

## 로컬에서 실행하기

### 방법 1: 파일 직접 열기 (가장 간단)
1. `index.html` 파일을 더블클릭
2. 기본 브라우저에서 자동으로 열림
3. 게임 시작!

### 방법 2: 로컬 서버 사용 (권장)
일부 브라우저 보안 정책으로 인해 로컬 서버 사용을 권장합니다.

#### Python이 설치된 경우:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

그 다음 브라우저에서 `http://localhost:8000` 접속

#### Node.js가 설치된 경우:
```bash
# http-server 설치 (한 번만)
npm install -g http-server

# 서버 실행
http-server -p 8000
```

#### VS Code 사용자:
1. "Live Server" 확장 설치
2. `index.html` 우클릭
3. "Open with Live Server" 선택

## GitHub Pages로 배포하기

### 준비사항
- GitHub 계정
- Git 설치

### 배포 단계

#### 1. 저장소 생성 (이미 되어있다면 스킵)
GitHub에서 새 저장소 생성

#### 2. 코드 푸시
```bash
git add .
git commit -m "Deploy game"
git push origin main
```

#### 3. GitHub Pages 활성화
1. GitHub 저장소 페이지 접속
2. Settings → Pages
3. Source: main branch 선택
4. Save 클릭

#### 4. 배포 완료!
5분 후 `https://username.github.io/repository-name` 에서 게임 플레이 가능

## 재사용 가능한 Claude Code 스킬 사용하기

이 프로젝트에는 게임 개발을 위한 재사용 가능한 스킬들이 포함되어 있습니다.

### 사용 가능한 커맨드

#### `/create-html5-game`
새로운 HTML5 게임 프로젝트 생성

#### `/add-game-system`
게임에 새로운 시스템 추가 (충돌, 파티클, 사운드 등)

#### `/create-game-data`
캐릭터, 스킬, 아이템 등 게임 데이터 생성

#### `/add-pixel-art-rendering`
픽셀 아트 렌더링 시스템 추가

#### `/optimize-game-performance`
게임 성능 분석 및 최적화

#### `/deploy-github-pages`
GitHub Pages 배포 자동화

### 사용 가능한 스킬

#### `game-developer`
게임 개발 전반에 대한 가이드와 템플릿

#### `pixel-artist`
픽셀 아트 디자인 원칙과 구현 방법

#### `game-balancer`
게임 밸런싱과 수치 설계

## 트러블슈팅

### 게임이 실행되지 않는 경우
1. 브라우저 콘솔 확인 (F12)
2. JavaScript 에러 메시지 확인
3. 파일 경로가 올바른지 확인

### 성능이 느린 경우
1. `/optimize-game-performance` 커맨드 실행
2. 브라우저 캐시 삭제
3. 하드웨어 가속 활성화

### GitHub Pages에서 작동하지 않는 경우
1. 모든 파일 경로가 상대 경로인지 확인
2. index.html이 루트에 있는지 확인
3. 배포 후 5분 정도 대기

## 다음 프로젝트에서 사용하기

### 1. 스킬 복사
`.claude/` 폴더를 새 프로젝트로 복사

### 2. 커맨드 사용
Claude Code에서 위의 커맨드들 사용

### 3. 템플릿 활용
이 프로젝트를 템플릿으로 사용하여 새 게임 시작

## 추가 리소스

- [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [JavaScript 게임 개발](https://developer.mozilla.org/en-US/docs/Games)
- [Pixel Art 튜토리얼](https://lospec.com/pixel-art-tutorials)

---

즐거운 게임 개발 되세요! 🎮
