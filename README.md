# Publy Dinner Worldcup

![pdw_thumbnail](https://github.com/minr2kb/publy-dinner-worldcup/assets/77144827/45458717-d967-457e-9431-71fa427a3805)
퍼블리 사내 챕터 / 스쿼드 회식 장소 결정을 위한 소형 웹프로젝트입니다.

[Live Demo](https://publy-dinner-worldcup.web.app)

## 주요 기능 🎯

### 1. 월드컵 방식의 투표 시스템

- 토너먼트 형식으로 1:1 대결을 통해 최종 우승 식당을 선정
- 실제 회식 참여자와 비참여자를 구분하여 투표 결과 집계
- 각 라운드별 애니메이션 효과로 재미 요소 향상

### 2. 실시간 결과 집계

- Firebase를 활용한 실시간 투표 결과 반영
- 장소별/유저별 투표 결과 테이블 제공
- 포인트 시스템을 통한 순위 산정

### 3. 인터랙티브 UI/UX

- 음식 이모지가 내리는 애니메이션 효과 - `src/components/EmojiRain.tsx`
- 귀여운 개미 캐릭터의 말풍선 인터랙션
- 상황에 맞는 다양한 개미 멘트로 사용자 흥미 유발
- 데스크톱 환경에 최적화된 UI 제공 -> 모바일 접속 시 친근한 메시지로 안내

## 기술 스택 🛠️

### Frontend

- React
- TypeScript
- Vite
- Material UI
- React-Query
- Jotai (상태관리)

### Backend & Deployment

- Firebase (Hosting, Firestore)

## ✨ 특징 및 장점

### 1. 최신 기술 스택 활용

- Vite를 통한 빠른 개발 환경 및 빌드 최적화
- TypeScript를 활용한 타입 안정성 확보
- Jotai를 통한 경량화된 상태관리
- React Query를 활용한 효율적인 데이터 페칭

### 2. 사용자 경험 중심 설계

- Material UI를 활용한 모던한 디자인
- 애니메이션과 인터랙션을 통한 즐거운 사용자 경험
- 실시간 데이터 반영으로 즉각적인 피드백
- 친근한 캐릭터와 멘트로 재미요소 추가

## 👨‍💻 개발자

Kyungbae Min (kyungbae@publy.co)
