# 🎨 최예진 (Jean Choi) 웹퍼블리셔·웹디자이너 포트폴리오 가이드

본 문서는 PC Claude(Claude Desktop / Claude Code / Claude Projects / Web)에서 최예진 님의 개인 웹 포트폴리오 사이트를 유지보수하고 추가 작업할 때 참고할 수 있는 프로젝트 구조 및 코딩 가이드라인입니다.

---

## 1. 프로젝트 개요

- **작업자**: 최예진 (Jean Choi)
- **전문 분야**: 웹퍼블리싱, 웹디자인, UI/UX 디자인, 브랜드·콘텐츠 디자인 (약 6년 차 실무 경력)
- **라이브 사이트**: [https://jeanychoi.com](https://jeanychoi.com) (www.jeanychoi.com)
- **호스팅 및 인프라**:
  - GitHub Pages 저장소: `yeijinchoi/yeijinchoi.github.io` (master 브랜치)
  - CNAME 설정: `jeanychoi.com`
  - 닷홈 DNS: 4중 A 레코드 (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) + www CNAME (`yeijinchoi.github.io`)
  - SSL/TLS: Let's Encrypt 무료 인증서 적용 (HTTPS Enforced)
- **기술 스택**: 순수 HTML5, CSS3, JavaScript (jQuery 3.2.1 기반). 빌드 도구 없는 정적 웹사이트.

---

## 2. 디렉토리 및 주요 파일 구조

```
yeijinchoi.github.io/
├── CLAUDE.md               # PC 클로드용 프로젝트 가이드 문서 (본 파일)
├── index.html              # 인트로/로딩 페이지 (3초 카운트다운 후 main.html 자동 이동)
├── main.html               # 포트폴리오 메인 페이지
├── web_work.html           # Works 상세 페이지 (웹퍼블리싱 & 웹디자인 지그재그 목업)
├── webDesign_work.html     # Works 상세 페이지 (웹디자인 전용 프로젝트)
├── contentDisign_work.html # 그래픽/콘텐츠 디자인 페이지
├── CNAME                   # jeanychoi.com
├── css/
│   ├── reset.css           # 브라우저 기본 스타일 초기화
│   ├── common.css          # 공통 스타일, 그리드, 반응형 미디어쿼리, 햄버거 메뉴, 슬라이더
│   ├── index.css           # 메인 비주얼 전용 애니메이션/키프레임
│   ├── loading.css         # 로딩 인트로 화면 플렉스 중앙정렬
│   └── work.css            # Works 페이지 지그재그 카드 목업 호버 스크롤
├── js/
│   ├── career-slider.js    # 경력 카드 슬라이더 (손가락 버튼 👈/👉, 스와이프, 인디케이터)
│   ├── mobile-nav.js       # 모바일 3줄 햄버거 메뉴 및 아코디언 드로어 토글
│   ├── work.js             # 탑버튼 및 보조 스크립트
│   └── jquery-3.2.1.min.js # jQuery 라이브러리
└── images/
    ├── og-image.png        # 링크 공유용 OpenGraph 썸네일 (1200x630)
    └── 2024최예진포트폴리오.pdf # PDF 포트폴리오 다운로드 원본
```

---

## 3. 핵심 디자인 시스템 및 배색 가이드 (2026-11 최신 시안 기준)

### 3.1 레이아웃 및 여백 구조
- **바깥 배경 (`body`)**: `#F5F6F8` (세련된 쿨그레이). 화면 좌우 여백을 자연스럽게 채웁니다.
- **중앙 고정 컨테이너 (`.site_wrap`)**:
  - 너비: `1100px` (최대 폭 100%)
  - 배경: `#FAFAFC` (쨍한 순백색 `#fff` 대신 명도가 살짝 있는 눈이 편안한 오프화이트)
  - 보더: 좌우 `1px solid #ECEEF1`, 미세 그림자 `box-shadow: 0 0 30px rgba(0,0,0,0.03);`
- **내부 콘텐츠 너비 (`nav`, `.profile_wrapper`, `.carrer_wrapper`, `.work_wrap` 등)**:
  - 데스크톱 기준 너비: **`940px`**
  - 고정 컨테이너(`1100px`) 안에서 좌우 **80px의 넉넉한 패딩(여백)**을 유지하여 시안 특유의 여유로운 여백감 형성.

### 3.2 주요 컴포넌트 스타일
1. **프로필 카드 (`.profile_wrapper`)**:
   - 배경: `#EEF0F4`, 테두리: `1px solid #E2E5EA`, 둥근 모서리: `border-radius: 20px;`
   - 내부 텍스트 영역(`profile_section_wrap`): `background: transparent !important;` (글자 박스만 하얗게 쪼개지지 않고 단일 카드로 매끄럽게 연결)
2. **경력 카드 (`.career_card`)**:
   - **현재 재직 중인 회사 (`(주)이고진`)**: 화이트 하이라이트(`background: #FFFFFF !important;`), 테두리 `#D5D9E0`, 그림자 부여, 초록색 포인트 배지(`.badge_current`, `#10B981`, '재직중')
   - **이전 경력 (`한국딥러닝`, `KTN114`)**: 연그레이 카드(`background: #EEF0F4;`), 테두리 `#E2E5EA`
   - **슬라이더 버튼 (`.career_nav`)**: 좌우 손가락 이모지(`👈` 이전 / `👉` 다음), 터치 시 스케일 인터랙션
3. **Works 프로젝트 목업 (`.p_mockup`)**:
   - 가로 배치: 좌우 지그재그 (홀수: 목업 좌 / 정보 우, 짝수: 목업 우 / 정보 좌)
   - 마우스오버 시: `transform: translateY(calc(-100% + 520px));`로 5초간 풀페이지 캡처 스크롤 및 `Mouse over` 라벨 페이드아웃.

---

## 4. 실무 경력 및 데이터 원칙

1. **커리어 순서 (최신순)**:
   - 1) **(주)이고진** (2024.10 ~ 현재 재직중, 사원급)
     - AI 활용 상세페이지 웹표준화 및 제품 이미지 생성
     - 자사 제품 상세페이지 디자인 및 웹퍼블리싱
     - Figma 활용 타부서 협업
     - 온라인몰 배너 등 마케팅 콘텐츠 제작
   - 2) **한국딥러닝** (2021.10 ~ 2024.03, 대리급)
     - 3D 애셋 마켓 플레이스 ‘POLYGROUND’ UI 디자인
     - 딥러닝 OCR, 3D DX 관련 발표자료 (PPT) 30여 건 작성
     - ChatGPT 3.5 기반 애플리케이션 UI/UX 디자인
     - 자사 홈페이지 v.2 ~ v.3 디자인, 개발, 유지보수
   - 3) **KTN114(OK114)** (2019.06 ~ 2020.12, 사원급)
     - 자체 발행 전화번호부 편집 업무, 고객사 홈페이지 제작, 배너/팝업 광고 편집
2. **과제성 프로젝트 제외 원칙**:
   - 6년 차 탄탄한 실무 경력을 보유하고 있으므로, 과거 수료 과제(경기산업기술교육센터, SGSG 소극소극 등)는 사이트에서 제외된 상태를 유지합니다.

---

## 5. 코딩 시 유의사항 (Claude 프롬프트 팁)

1. **캐시 버스팅 (Cache Busting)**:
   - CSS나 JS 수정 시 각 HTML의 링크 태그 쿼리스트링을 올려주세요 (예: `common.css?v=YYYYMMDDx`).
2. **모바일 반응형 (<1025px)**:
   - 데스크톱 가로 메뉴는 숨겨지고 3줄 햄버거 버튼과 우측 슬라이드 드로어가 작동합니다.
   - 드로어 내 Works 클릭 시 Web Design / Web Publishing 아코디언이 펼쳐집니다.
   - 단어 단위 줄바꿈: `word-break: keep-all; overflow-wrap: break-word;` 유지 필수.
3. **로딩 화면 안내 문구**:
   - "이 포트폴리오는 작업자가 직접 마크업·퍼블리싱한 후, AI를 활용하여 업데이트하고 있습니다."
4. **한글 파일명**:
   - PDF 포트폴리오 링크는 Mac/Windows 유니코드 차이를 고려해 NFC 형식(`2024최예진포트폴리오.pdf`)을 사용합니다.
