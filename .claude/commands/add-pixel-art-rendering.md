---
description: 픽셀 아트 렌더링 시스템 추가
---

현재 프로젝트에 픽셀 아트 스타일 렌더링을 추가하거나 개선해주세요.

## 요구사항

### 1. 픽셀 퍼펙트 렌더링
- imageSmoothingEnabled = false
- 정수 좌표로 렌더링 (Math.floor 사용)
- 픽셀 단위 정렬

### 2. 렌더링 유틸리티
- `drawPixelRect(x, y, width, height, color)` - 픽셀 사각형
- `drawPixelCircle(x, y, radius, color)` - 픽셀 원
- `drawPixelSprite(x, y, spriteData)` - 스프라이트 렌더링
- `drawPixelText(x, y, text, size, color)` - 픽셀 폰트

### 3. 색상 팔레트 시스템
- 제한된 색상 팔레트 정의
- 색상 치환 기능
- 그라디언트 효과

### 4. 레이어 시스템
- 배경, 게임 오브젝트, UI 레이어 분리
- 레이어별 렌더링 순서
- 레이어 숨김/표시

### 5. 카메라 효과
- 카메라 셰이크
- 줌 인/아웃
- 화면 전환 효과

## 스타일 가이드
- 8x8 또는 16x16 픽셀 그리드
- 제한된 색상 팔레트 (예: 16색, 32색)
- 깔끔한 외곽선
- 일관된 픽셀 크기

구현 후 예제를 보여주세요.
