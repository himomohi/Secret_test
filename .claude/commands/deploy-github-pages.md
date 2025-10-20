---
description: GitHub Pages로 게임 배포
---

현재 게임 프로젝트를 GitHub Pages로 배포해주세요.

## 배포 단계

### 1. 프로젝트 준비
- [ ] index.html이 루트 디렉토리에 있는지 확인
- [ ] 모든 리소스 경로가 상대 경로인지 확인
- [ ] README.md에 게임 설명 추가
- [ ] 라이선스 파일 추가

### 2. GitHub Pages 설정
다음 방법 중 하나를 선택:

#### 옵션 A: main 브랜치 사용
```bash
git checkout -b main
git add .
git commit -m "Initial commit"
git push -u origin main
```
Settings → Pages → Source: main branch

#### 옵션 B: gh-pages 브랜치 사용
```bash
git checkout -b gh-pages
git add .
git commit -m "Deploy to GitHub Pages"
git push -u origin gh-pages
```
Settings → Pages → Source: gh-pages branch

#### 옵션 C: docs 폴더 사용
프로젝트를 docs/ 폴더로 이동
Settings → Pages → Source: main branch /docs

### 3. 배포 후 확인
- [ ] https://username.github.io/repository-name 접속
- [ ] 게임이 정상 작동하는지 확인
- [ ] 모바일에서 테스트
- [ ] 다양한 브라우저에서 테스트

### 4. README 업데이트
```markdown
# 게임 이름

[🎮 Play Now](https://username.github.io/repository-name)

## 스크린샷
...

## 특징
...

## 조작법
...
```

### 5. 최적화 (선택사항)
- [ ] 코드 압축 (Minify)
- [ ] 이미지 최적화
- [ ] 로딩 화면 추가
- [ ] PWA 설정 (manifest.json, service worker)

배포가 완료되면 URL을 알려주세요!
