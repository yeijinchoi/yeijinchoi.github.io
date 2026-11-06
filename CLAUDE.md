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
├── ai_work.html            # AI & Creative Works 상세 페이지 (커머스 상세페이지 AI 파이프라인 / ARG 프로젝트)
├── contentDisign_work.html # 그래픽/콘텐츠 디자인 페이지
├── CNAME                   # jeanychoi.com
├── css/
│   ├── reset.css           # 브라우저 기본 스타일 초기화
│   ├── common.css          # 공통 스타일, 그리드, 반응형 미디어쿼리, 햄버거 메뉴, 슬라이더
│   ├── index.css           # 메인 비주얼 전용 애니메이션/키프레임
│   ├── loading.css         # 로딩 인트로 화면 플렉스 중앙정렬
│   └── work.css            # Works 페이지 지그재그 카드 목업 호버 스크롤
├── js/
│   ├── blob-interactive.js # 3D 슬라임 그래픽 물리 연산, 눈 깜빡임, 감으며 미소 모프, 패럴랙스
│   ├── career-slider.js    # 경력 카드 슬라이더 (손가락 버튼 👈/👉, 스와이프, 인디케이터)
│   ├── slime-talk.js       # 슬라임 클릭 시 아래에 말풍선으로 경력/일하는 방식을 타이핑 효과로 이야기 (대사 배열 SLIME_LINES)
│   ├── career-years.js     # 히어로 "경력 n년 차" 배지: 경력 근무기간(CAREER_PERIODS) 합산 자동 계산·카운트업, window.CAREER_YEARS 로 슬라임 대사에도 공유
│   ├── glass-bubble.js     # 말풍선의 말칸+꼬리를 하나의 윤곽선(clip-path)으로 그림 (크기가 변해도 ResizeObserver로 자동 갱신)
│   ├── chat-typing.js      # 본문 채팅 말풍선(마음가짐 Q&A, 마지막 다짐)이 스크롤 시 톡 떠오르고 타이핑과 함께 말풍선이 늘어나는 효과
│   ├── skill-gauge.js      # 스킬 게이지가 스크롤로 화면에 들어오면 0 → 목표치로 차오르는 효과
│   ├── graphic-slider.js   # Graphic Design Works 코버플로우 슬라이드 (순환, 스와이프, 자동재생)
│   ├── gallery-slider.js   # AI 상세 페이지 화보 슬라이드(.ag_slider): 버튼·점·스와이프, 자동재생
│   ├── mobile-nav.js       # 모바일 3줄 햄버거 메뉴 및 아코디언 드로어 토글, 스크롤 플로팅
│   ├── work.js             # 탑버튼 및 보조 스크립트
│   └── jquery-3.2.1.min.js # jQuery 라이브러리
├── font/
│   └── SUIT-Variable.woff2 # 사이트 전체 웹폰트 (OFL 라이선스: SUIT-LICENSE.txt)
└── images/
    ├── og-image.png        # 링크 공유용 OpenGraph 썸네일 (1200x630)
    └── 240723최예진포트폴리오.pdf # PDF 포트폴리오 다운로드 원본
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
   - **전 화면 카카오톡 대화창 스타일**: 왼쪽 위 원형 프로필 사진(PC·태블릿 56px / 모바일 44px) + 이름 + 흰색 소개 말풍선(첫 말풍선은 왼쪽 위 모서리 4px) + 흰색 스킬 태그 말풍선. 사진 아래 빈 공간이 생기지 않도록 사진을 작게 두고 내용을 말풍선으로 쌓음 (`common.css` 맨 아래 "프로필 카드" 블록).
   - 내부 텍스트 영역(`profile_section_wrap`): `background: transparent !important;` (글자 박스만 하얗게 쪼개지지 않고 단일 카드로 매끄럽게 연결)

2. **경력 카드 (`.career_card`)**:
   - **기본 경력 카드**: 테두리 완전 삭제(`border: none;`), 깔끔한 소프트 서피스(`background: #EEF0F4;`)
   - **현재 재직 중인 회사 (`(주)이고진`)**: 화이트 바탕(`background: #FFFFFF;`) + 4px 포인트 컬러 회전 그라데이션 보더(`conic-gradient` + `@property --career-angle`, 4초 순환 `careerBorderSpin`, `prefers-reduced-motion` 시 정지, 그림자 없음), 블루 포인트 배지(`.badge_current`, `#5383F6`, '재직중')
   - **슬라이더 버튼 (`.career_nav`)**: 좌우 손가락 이모지(`👈` 이전 / `👉` 다음)를 `.career_nav_icon`의 색조 회전 필터(`hue-rotate(190deg) saturate(2.4) brightness(0.88)`)로 포인트 블루 톤으로 표시, 터치 시 스케일 인터랙션

3. **스킬 섹션 (`.skill_wrapper`, `.skillset`)**:
   - 태블릿·데스크톱: 한 줄에 3개 (flex-wrap, 카드 폭 `calc((100% - 32px) / 3)`, 간격 16px, 마지막 줄은 가운데 정렬) / 모바일: 1열. 스킬 7개 — 순서: HTML5, CSS3, JavaScript / Photoshop, Illustrator, Figma / jQuery. (Communication은 삭제)
   - 테두리 전면 삭제(`border: none !important;`), 그림자 없음(흰 카드 + 배경 대비).
   - **배지 스타일 (`.skill_icon_badge`)**: 복잡한 구형 로고를 직접 그리지 않고, 각 브랜드 고유 대표 컬러를 머금은 **추상적인 3D 원형 그라데이션 구슬(Marble/Orb) 배지**를 **스킬 이름 왼쪽에 18px 크기로 작게 붙임**(`.skill_header > .skill_title` 안에 구슬 + 이름, 아래엔 전폭 프로그레스 바) (`border-radius: 50% !important;`, 전 구간 원형 고정; HTML5 웜오렌지, Ps 딥네이비/시안, CSS3 스카이블루, Ai 앰버/버건디, JS 비비드옐로우, Figma 멀티스톱 스펙트럼, jQuery 오션블루).
   - **게이지(프로그레스 바)**: 트랙 `#E2E5EA` + 다크 그레이 채움(`#555`), 퍼센트 숫자도 `#555`. 스크롤로 카드가 화면에 들어오면(`js/skill-gauge.js`, IntersectionObserver) 0에서 목표치까지 1.2초 동안 차오름(같은 줄은 120ms 시차, 동작 줄이기 설정 시 처음부터 채워짐). 목표치는 `common.css`의 `#html { --fill: 100%; }` 같은 스킬별 변수.
   - 호버 인터랙션: 미세 회전 및 스케일업(`transform: scale(1.08) rotate(3deg);`)

4. **히어로 슬라임 그래픽 & 타이포그래피 (`.visualT`, `#blobCore`)**:
   - 데스크톱: 좌측 텍스트 컬럼(`.visual_text_col`, `padding-left: 36px`), 우측 인터랙티브 3D 푸딩 슬라임 그래픽.
   - **모바일·태블릿 중앙정렬 (≤1024px, ≤767px)**: PC용 좌측 패딩(36px)을 0으로 초기화하고, 슬라임 캐릭터·헤딩 텍스트·배지 행을 하나의 완벽한 수직 중앙축(`text-align: center`, `margin: 0 auto`, `align-items: center`)으로 일치시킴.
   - **독립 시선 추적**: 마우스 커서를 따라 눈동자가 3D 구면 위를 미끄러지듯 이동하는 패럴랙스 인터랙션.
   - **자연스러운 눈 깜빡임**: 2.5~5.5초 주기로 불규칙하게 눈을 감았다 뜨며, 간혹 귀여운 더블 블링크(연속 깜빡임) 수행.
   - **슬라임 토크 (`#slimeTalk`)**: 슬라임을 클릭할 때마다 슬라임 아래 빈 공간에 게임 대화창처럼 보더 없는 글래스모피즘(반투명 소프트 그레이 + 왼쪽 위 반사광 + 상단 하이라이트 선 + 배경 블러 20px, 위쪽 꼬리가 말칸과 하나의 윤곽선) 말풍선(이름표·진행 숫자 없음, 대사만)이 팝업으로 뜨고 타이핑 효과로 경력·일하는 방식을 순서대로 이야기(11개 대사 순환(이력서 내용에서 발췌), 타이핑 중 클릭 시 즉시 완성, 키보드 Enter/Space 지원, 가장 긴 대사 기준 높이 고정). 첫 화면엔 "저를 눌러서 인사해 주세요" 보더 없는 글래스 말풍선 안내(같은 윤곽선 방식, 이모지 없음). 모바일·태블릿은 슬라임 바로 아래 흐름 안에 배치.
   - **자연스러운 눈 감으며 미소 반응 (`^ ^`)**: 입을 과하게 그리지 않고, 마우스를 슬라임에 올리거나 터치하면 눈이 스르륵 자연스럽게 감기면서 포근한 반달눈(`^ ^`)으로 방긋 웃으며 볼이 퐁신하게 반응.

5. **AI & Creative Works 섹션 (`.Ai_section`, `#ai-works`)**:
   - **블랙 단일 컨테이너 카드 (`.ai_work_card`)**: 상하로 흰색/검은색 칸을 나누지 않고, 카드 전체를 하나의 일체형 딥블랙 컨테이너(`background: #0D0E12`, `min-height: 280px`, `border-radius: 16px`)로 통합.
   - **배경 썸네일 준비 구조**: 추후 관련 프로젝트 썸네일 이미지를 배경(`background-image`)으로 바로 적용할 수 있도록 `.ai_card_bg` 전용 레이어와 반투명 다크 그라데이션 오버레이(`::after`) 배치. 이미지가 들어가도 타이포그래피가 또렷하게 가독성을 유지함.
   - **상세 페이지 연결**: 카드 전체가 `ai_work.html#ai_01` / `#ai_02` 링크(`<a class="ai_work_card">`), 오른쪽 위 원형 화살표(`.ai_card_arrow`). 상세 페이지는 `web_work.html`과 같은 구조(`.project` / `.p_info`)이고 이미지가 없는 동안엔 같은 딥블랙 톤의 `.ai_mock` 카드 + "상세 이미지 준비 중" 표시.
   - **내부 콘텐츠 배치 (`.ai_card_inner`)**:
     - 상단: 영문 카테고리 배지 (`.ai_card_keyword`, `E-COMMERCE DETAIL PAGE` / `ARG PROJECT · IN PROGRESS`)
     - 하단: 한글 메인 타이틀 (`.ai_card_title`, 20px Bold White `#FFFFFF`) + 반투명 글래스 다크 태그 (`.ai_card_tags span`, Higgsfield AI, Claude Code, VS Code, 상세페이지 퍼블리싱 등)

6. **Web Design Works (`.work_wrap`, CSS Grid)**:
   - 7개 실무 프로젝트를 940px 컨테이너에 딱 맞춘 현대적인 3열 벤토 그리드(Bento Grid) 구성.
   - 1~2행: 좌측 DEEP OCR 홈페이지·뷰어 (각 1열 1행), 우측 POLYGROUND (2열 2행 대형)
   - 3행: DEEP INVOICE, POLYGROUND 사전예약, 포트폴리오 (각 1열 1행 3개 균등 배치)
   - 4행: KDL 브랜드페이지 1개를 3열 전체 폭(940px)으로 배치 (v1·v2·v3를 하나로 합침, 2026-11-06)
   - 태블릿: 2열 반응형 그리드(마지막 KDL은 2칸 폭), 모바일: 1열 수직 스택 자동 전환
   - 카드 배치는 `common.css` 데스크톱 블록의 "Bento Grid Placements" 클래스별 `grid-column/grid-row`로 관리, `main.html` 카드 순서는 데스크톱 배치 순서와 맞춰 둠

7. **Graphic Design Works (`.gs`, `#graphicSlider`, `js/graphic-slider.js`)**:
   - 한 줄 코버플로우 슬라이드: 가운데 작업물이 가장 크게(데스크톱 480px, 4:3), 좌우 한 장씩은 74% 크기 + 블러(3px) + 반투명, 나머지는 숨김. 9장 순환.
   - 조작: 좌우 원형 글래스 버튼, 점(활성 점은 알약으로 늘어남), 옆 이미지 클릭, 스와이프/드래그, 키보드 ←→. 화면에 보일 때만 4.5초 자동 재생(호버·직접 조작 시 멈춤, `prefers-reduced-motion` 시 정지).
   - 이미지 추가: `main.html` `.gs_viewport` 안에 `.gs_item`(img) 복제. 크기 변수는 `.gs`의 `--gs-w`, `--gs-off`, `--gs-side`.

8. **무신사 스타일 쫀득한 플로팅 알약 네비게이션**:
   - 데스크톱(≥1025px)에서 스크롤(scrollY ≥ 90px) 시 상단 고정 플로팅 알약 캡슐(`nav.nav-floating`)로 자연스럽게 변환.
   - 레이아웃: 좌측 Logo(`h1`), 중앙 절대 정렬 메뉴(`nav > ul`: `left: 50%; transform: translateX(-50%)`), 우측 끝단 밀착 Contact 버튼(`margin-left: auto;`)
   - 스타일: `width: 880px; height: 56px; border-radius: 50px; background: rgba(250, 250, 252, 0.88); backdrop-filter: blur(20px); border: 1px solid rgba(220, 224, 230, 0.85); box-shadow: 0 12px 36px rgba(0,0,0,0.09);`
   - 변형 애니메이션: `animation: floatPillSpring 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;` 쫀득한 스프링 모션 적용.
   - 플로팅 전(상단 휴지 상태): Logo 좌측 / Profile·Works 메뉴 중앙 절대 정렬(`left: 50%; transform: translateX(-50%)`, gap 40px) / Contact 버튼 우측 밀착으로 플로팅 전후의 3단 레이아웃 일관성 100% 유지.
   - 서브 네비 알약(`.blind-subnav ul`): `Works` 텍스트와 정확히 일치하는 가로 절대 중앙정렬(`left: 50%; transform: translateX(-50%)`), 투명 호버 브리지 완비로 끊김 없는 마우스 이동 지원.
   - 모바일(≤1024px): 네비 앞 `Jean` 로고 숨김(`display: none;`), 햄버거 버튼은 PC 플로팅 알약과 동일한 글래스모피즘 톤(`48×48px`, `border-radius: 50%`, 반투명 블러·그림자)으로 우측 상단(`top: 16px; right: 16px; fixed`)에 고정 플로팅.

---

## 4. 깃 배포 및 캐시 주의사항

- master 브랜치에 푸시하면 GitHub Actions의 `pages build and deployment` 워크플로우를 통해 수십 초 내에 `jeanychoi.com` 라이브에 배포됩니다.
- 브라우저 및 CDN 캐시로 인해 수정 사항이 즉시 보이지 않을 수 있으므로, CSS/JS 변경 시 `main.html` 상단의 캐시버스터 쿼리스트링(`v=...`)을 함께 갱신해야 합니다.
- 수정 시 기존 레이아웃 규격(데스크톱 내부 폭 940px, 고정 컨테이너 1100px)과 벤토 그리드 규칙을 엄격히 준수합니다.

---

## 5. 🔒 디자인 연속성 원칙 (모든 업데이트 필수 준수)

**앞으로의 모든 포트폴리오 업데이트는 기존 색상·분위기를 그대로 이어가야 합니다.** 새 섹션/컴포넌트를 만들 때 새로운 팔레트나 스타일 언어를 도입하지 않습니다.

### 5.1 허용 팔레트 (새 색 추가 금지, 아래에서만 조합)
| 용도 | 값 |
|---|---|
| 포인트 블루 (CTA·링크·강조, 사용 빈도 1위) | `#5383F6` (보조: `#38BDF8`, `#2554D7`, `#1D4ED8`, `#93C5FD`, `#A6D4FF`) |
| 바깥 배경 / 컨테이너 | `#F5F6F8` / `#FAFAFC` (보더 `#ECEEF1`) |
| 소프트 서피스 (카드) | `#EEF0F4` (보더 `#E2E5EA`) |
| 텍스트 | `#111` `#222` `#333` `#555` `#666` |
| 다크 카드 (AI 섹션) | `#0D0E12` + 흰 텍스트 |
| 재직중 배지 | `#5383F6` (포인트 블루와 동일) |
| 스킬 구슬 배지 | 브랜드별 고유 그라데이션 (3.2-3 참고) |

### 5.2 분위기 규칙
- 쿨그레이 + 오프화이트 + 블루 포인트의 **깔끔하고 여백 넉넉한 톤**. 순백 `#fff` 큰 면, 강한 보더, 원색 대면적은 지양.
- 카드: 보더 없이 소프트 서피스, **박스(카드)에는 그림자를 넣지 않습니다**(2026-11-06 사용자 지시 — 호버도 그림자 대신 `translateY` 상승만). **버튼에도 그림자를 넣지 않습니다**(2026-11-06 일단 전체 제거: Contact·햄버거·경력 화살표·슬라이드 버튼·홈으로·상세 보기·PDF 다운로드·TOP; `common.css` 맨 아래 블록). 그림자가 남아 있는 곳은 상단 네비 플로팅 알약, 슬라임 안내 글래스 말풍선, 스킬 외 장식 요소 정도. **모서리 라운드는 8px로 통일**(2026-11-06 16px→8px로 축소)(프로필·경력·스킬·Works·AI·그래픽·상세 목업/정보 카드 전부). 알약형 배지·버튼만 `50px`/`30px`, 작은 태그는 6px.
- 호버: 살짝 상승(`translateY(-4~5px)`) 또는 미세 스케일/회전. 이징은 기존 `cubic-bezier(0.16,1,0.3,1)` / 스프링 `cubic-bezier(0.34,1.56,0.64,1)` 재사용.
- 폰트: **SUIT Variable** 단일 폰트 (`font/SUIT-Variable.woff2`, `common.css` 상단 `@font-face`, 굵기 100~900). 항상 `font-family: "SUIT", sans-serif` + 숫자 `font-weight`(Light 300 / Regular 400 / Medium 500 / Bold 700 / Black 900)로 지정. 다른 폰트 추가 금지.
- **AI 카드**: 상단 영문 라벨은 배경·보더 없이 글자만(왼쪽을 제목과 정렬), 하단 툴 태그는 보더 없이 어두운 반투명 면 + 완전 둥근 알약(`50px`), 화살표 원형 버튼도 보더 없음 (`ai_work.html`의 `.ai_mock`도 동일).
- **배지·알약 안에는 이모지를 넣지 않습니다** (텍스트만. 아이콘이 필요하면 기존 `first-icon` 이미지 방식 사용).
- **본문 채팅 말풍선**(`.chat_L` 질문=회색 유리·왼쪽, `.chat_R` 답변=블루 유리·오른쪽, `.last_wrapper > div` 다짐=블루 유리·왼쪽): 이미지 말풍선이 아니라 **CSS 글래스모피즘 말풍선**(반투명 + 배경 블러 + 왼쪽 위 반사광 + 상단 하이라이트 선, 보더·그림자 없음 크기 + 마스크로 가장자리가 부드럽게 사라져 일직선으로 잘리지 않음, 좁은 화면에선 좌우 0으로 가로 스크롤 방지). 스크롤로 들어오면 톡 떠오르고 "..." 입력 중 표시 후 **글자가 타이핑되는 만큼 말풍선이 함께 커짐**(`js/chat-typing.js`, 질문→답변 순서, 1회 재생, 동작 줄이기 시 즉시 표시). 완성 크기를 미리 재서 줄 높이를 잡아 두므로 아래가 밀리지 않음. 텍스트는 항상 말풍선 안 가운데 정렬. PC·태블릿은 최대 폭 720px로 답변·다짐이 한 줄에 들어가고, 줄이 바뀌는 좁은 화면에선 `text-wrap: balance`로 줄 길이를 고르게 나눠 짧은 말 한 줄만 남지 않게 함. 문구는 `main.html` 원문만 고치면 자동 처리.
- **말풍선 말칸+꼬리 연결 원칙**: 꼬리를 `::before` 삼각형으로 따로 붙이지 않고(반투명 면이 겹쳐 이음새 생김), `js/glass-bubble.js`의 `GlassBubble.attach(요소, 'bl'|'br'|'top')`로 말칸과 꼬리를 **하나의 clip-path 윤곽선**으로 그립니다. 꼬리 영역만큼 요소 padding을 늘려 두고(`--gb-t: 10px`), 모서리 반지름은 `--gb-r`. 새 말풍선도 같은 방식으로 만듭니다.
- **섹션 간격은 `common.css` 맨 아래 "섹션 간격 시스템" 블록의 변수로만 관리**: `--sec-gap`(큰 섹션 사이: 데스크톱 120 / 태블릿 96 / 모바일 80px), `--sec-gap-sm`(경력→채팅 묶음 64/56/48px), `--title-gap`(섹션 타이틀→콘텐츠 48/48/40px), 프로필→스킬 32px 고정. 새 섹션은 `margin-top: var(--sec-gap)`만 주고, 섹션 안 padding/margin/구분선으로 간격을 만들지 않습니다.
- 섹션 타이틀은 기존 `h2.wrap_title`, 내부 폭 940px, 컨테이너 1100px 규격 유지.
- 반응형 3구간 고정: 모바일 `≤767px` / 태블릿 `768~1024px` / 데스크톱 `≥1025px` (`common.css` 안에 구간별 블록 존재).

### 5.3 폰트 크기 스케일 (새 요소도 이 값만 사용)
| 역할 | 크기 |
|---|---|
| 배지·태그·pill·퍼센트·캡션·푸터 | 12px |
| 본문·네비 메뉴·서브메뉴·버튼·카드 캡션·스킬명·말풍선 | 14px |
| 로고(`nav h1`), AI 카드 타이틀(모바일), 보조 제목 | 16~20px |
| 이름·카드 대제목 | 20~24px |
| 섹션 타이틀 `.wrap_title` | 26px(모바일) / 36px |
| 히어로 | 별도 유지 (`.visual_text_col h2`) |
13 / 13.5 / 14.5 / 15 같은 애매한 중간값은 쓰지 않습니다.

---

## 6. ⚡ 빠른 수정 치트시트 (어디를 고치면 되는가)

| 하고 싶은 일 | 파일 / 위치 |
|---|---|
| 소개 문구·태그 수정 | `main.html` `.profile_wrapper` (`.intro`, `.Tag`) |
| 스킬 추가/수정 | `main.html` `.skillset` + `common.css` 스킬 섹션 (`.skill_icon_badge` 색, 게이지 목표치 % 는 `#html { --fill: 100%; }` 등 id별 변수) |
| 경력 추가 | `main.html` `.career_track` 안에 `.carrer_wrap.career_card` 복제 (현재 재직 카드만 `badge_current`) |
| Web Design 카드 추가/교체 | `main.html` `.Works_wrap` (`card-big`/`card-small` + 클래스명) → 벤토 배치는 `common.css`에서 클래스별 `grid-area` |
| 상세 페이지 "홈으로" 뒤로가기 버튼 | `web_work.html` / `webDesign_work.html` `.work_wrap` 맨 위 `.back_home` (스타일 `work.css` 맨 아래) — 새 상세 페이지를 만들면 같은 마크업을 복사 |
| 상세 작업물 추가 | `web_work.html` (`#work_01~06` 지그재그) / `webDesign_work.html`, 스타일 `css/work.css` |
| AI 상세 페이지 내용·이미지 채우기 | `ai_work.html` 각 `.project`: 커머스는 **모델별로 구역을 분리**하고 구역마다 "화보(크게)"와 "재료 컷(작게)"을 나눔. ① 립틴트 화보(모자 쓴 웨이브 머리 모델): 화보 `ai-model-6·7·8`(상세 페이지 첫 슬라이드는 6번을 Higgsfield 2K 업스케일 후 **모자까지 나오되 입술·틴트가 중앙 근처에 오게 크롭한 `ai-model-6-close.webp`**를 사용하고, 메인 카드는 원본 6번 `ai-model-6.webp` 사용)은 **슬라이드**(`.ag_slider`, `js/gallery-slider.js`: 좌우 버튼·점·스와이프·키보드, 화면에 보일 때만 4.5초 자동 재생, 동작 줄이기 시 정지), 재료 컷 룩북 `1` + 뷰티 `2`. **화보 6번은 배경을 같은 스튜디오의 은은한 회백색 콘크리트 벽으로 바꾼 버전**(Higgsfield `gpt_image_2_6` 편집, 이후 입술만 글로시하게 틴트 색(더스티 로즈브라운)에 맞춰 재편집 후 2K 업스케일. 매끈한 회백색 벽·거친 콘크리트 벽 버전은 합성 티가 나서 폐기. 자연스럽게 하려면 프롬프트에 "사람과 같은 창 빛·색온도·그레인, 뒤는 살짝 아웃포커스, 머리·어깨 뒤 은은한 그림자, 의자 접지 그림자"를 명시. 원본은 git 이력의 `ai-model-6.webp`) ② 운동기구 화보(가르마 머리 운동복 모델): 재료 컷 룩북 `3` + 뷰티 `4`(화보 컷이 생기면 같은 `.ag_slider`로 추가). 마크업 `.ai_gallery > .ag_group`(제목 `.ag_title`, 슬라이드 `.ag_slider > .ag_slides > img`, 재료 컷 `.ag_mat`, 캡션 `.ag_caption`). 새 모델 컷은 해당 구역에 추가하고 다른 모델과 섞지 않음(5번 컷은 삭제됨). ARG는 이스크라 구동 GIF(`.ai_shot`, 동작 줄이기 시 정지 이미지). 개요 `.p_overview`, 기간 `.p_period`, 작업참여 `.pill`, 툴 `.tool_chip`. **AI 모델 작업(커머스)은 개인 작업물이라 회사명을 쓰지 않습니다**(배지·About 모두 "개인 작업") |
| AI 카드 썸네일 | 커머스 카드(`.ai_card_commerce`)는 AI 모델 컷 7장 슬라이드: `images/ai-model-1·2·3·4·6·7·8.webp`(5번 삭제; 룩북 그레이 후디 → 뷰티 컷 → 룩북 화이트 후디 → 뷰티 컷 → 립틴트 화보 6 → 7 → 8, 각 30~60KB), `main.html` `.ai_card_bg` 안 `.ai_slide_1·2·3·4·6·7·8`(순서는 `common.css`의 `animation-delay`로 결정), 4초마다 교차(28초 순환, 동작 줄이기 시 1번만 정지 표시), 이미지 위치는 `common.css` 맨 아래 `.ai_slide_N`의 `background-position`. ARG 카드는 `images/arg-thumb.gif`(이스크라 구동 화면 7장면 반복: 메일 알림→받은메일함→메일→검색 첫 화면→검색어 입력→검색 결과, 868×520, 약 110KB) + 동작 줄이기용 정지 이미지 `images/arg-thumb.jpg`. 원본 게임은 GitHub `yeijinchoi/iskra-arg`(`index.html`)이고, 게임이 바뀌면 같은 장면으로 다시 캡처해 GIF만 교체 |
| 그래픽 슬라이드 이미지 교체/추가 | `images/grapic-1~9.png` 덮어쓰기 (4:3 비율 권장) / 추가는 `.gs_viewport`에 `.gs_item` 복제 |
| Mobile UI/UX 섹션 (이미지 없이 "PDF 포트폴리오에서 확인" 안내 카드 + 다운로드 버튼) | `main.html` `.Mobile_section` `.pdf_card` / 스타일 `common.css` 맨 아래 |
| PDF 교체 | `images/240723최예진포트폴리오.pdf` |
| 메뉴 항목 (Works 드롭다운: Web Design / Web Publishing / AI & Creative — 메인·상세 3개 페이지 모두 동일하게 유지, 모바일 드로어 목록도 같이) / 본문 Works 하단 "상세 보기" 알약 링크 `.works_more` | `main.html` `<nav>` + 모바일 드로어는 `js/mobile-nav.js`가 `nav`를 복제해 생성 → 두 곳 확인 |
| 슬라임 동작 | `js/blob-interactive.js` + `common.css` 히어로 구간 |
| 경력 n년 차 배지 | `main.html` `.career_year_badge` + `js/career-years.js` 맨 위 `CAREER_PERIODS`(경력 근무기간, 합산 개월÷12 = n년 차, 슬라임 첫 대사 `{years}`도 같이 갱신) / 스타일 `common.css` 맨 아래 |
| 슬라임 말풍선 대사 수정 | `js/slime-talk.js` 맨 위 `SLIME_LINES` 배열 (경력이 바뀌면 같이 수정, 마지막 줄 다음엔 처음으로 순환) / 스타일은 `common.css` 맨 아래 "슬라임 토크" 블록 |

### 작업 체크리스트
1. 수정 후 해당 CSS/JS의 `?v=` 캐시버스터 갱신 (**모든 HTML**에서 동일 파일은 같은 버전으로 맞출 것: `sed -i -E 's#(css/common\.css\?v=)[0-9a-z]+#\1새버전#' *.html` 처럼 한 번에 갱신).
2. 데스크톱(1100) / 태블릿 / 모바일 3구간 모두 확인.
3. 새 색상이 필요하면 5.1 팔레트 안에서 해결, 불가피하면 사용자에게 먼저 확인.

---

## 7. 🚀 배포 규칙

- 배포가 실패 메일로 올 때: Actions 로그에서 `build`는 성공하고 `deploy`의 `syncing_files`가 10분 넘게 멈춰 타임아웃이면 GitHub Pages 쪽 일시 장애이므로, 코드 수정 없이 같은 커밋을 다시 배포(재실행 또는 새 커밋)하면 됩니다.
- 사용자가 수정 결과를 라이브에서 바로 확인할 수 있도록, **수정 후 `master` 브랜치에 바로 푸시**합니다 (사용자 허락 완료, 2026-11-06).
- 푸시 전 반드시 5장 디자인 연속성 원칙과 `?v=` 캐시버스터 갱신을 확인합니다.
