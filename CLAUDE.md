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
│   ├── blob-interactive.js # 3D 슬라임 그래픽 물리 연산, 눈 깜빡임, 감으며 미소 모프, 패럴랙스
│   ├── career-slider.js    # 경력 카드 슬라이더 (손가락 버튼 👈/👉, 스와이프, 인디케이터)
│   ├── slime-talk.js       # 슬라임 클릭 시 아래에 말풍선으로 경력/일하는 방식을 타이핑 효과로 이야기 (대사 배열 SLIME_LINES)
│   ├── career-years.js     # 히어로 "경력 n년 차" 배지: 경력 근무기간(CAREER_PERIODS) 합산 자동 계산·카운트업, window.CAREER_YEARS 로 슬라임 대사에도 공유
│   ├── graphic-slider.js   # Graphic Design Works 코버플로우 슬라이드 (순환, 스와이프, 자동재생)
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
   - **모바일(≤767px)**: 카카오톡 대화창처럼 — 왼쪽 위 44px 원형 프로필 사진 + 이름 + 흰색 소개 말풍선(첫 말풍선은 왼쪽 위 모서리 4px) + 흰색 스킬 태그 말풍선. 태블릿·데스크톱은 가로 레이아웃 유지.
   - 내부 텍스트 영역(`profile_section_wrap`): `background: transparent !important;` (글자 박스만 하얗게 쪼개지지 않고 단일 카드로 매끄럽게 연결)

2. **경력 카드 (`.career_card`)**:
   - **기본 경력 카드**: 테두리 완전 삭제(`border: none;`), 깔끔한 소프트 서피스(`background: #EEF0F4;`)
   - **현재 재직 중인 회사 (`(주)이고진`)**: 화이트 바탕(`background: #FFFFFF;`) + 4px 포인트 컬러 회전 그라데이션 보더(`conic-gradient` + `@property --career-angle`, 4초 순환 `careerBorderSpin` + 글로우 펄스 `careerGlowPulse`, `prefers-reduced-motion` 시 정지), 블루 포인트 배지(`.badge_current`, `#5383F6`, '재직중'), 블루 섀도우
   - **슬라이더 버튼 (`.career_nav`)**: 좌우 손가락 이모지(`👈` 이전 / `👉` 다음), 터치 시 스케일 인터랙션

3. **스킬 섹션 (`.skill_wrapper`, `.skillset`)**:
   - 데스크톱: 2열 CSS Grid (`grid-template-columns: repeat(2, 450px); column-gap: 40px; row-gap: 16px;`)
   - 테두리 전면 삭제(`border: none !important;`) 및 부드러운 소프트 섀도우(`box-shadow: 0 4px 16px rgba(0, 0, 0, 0.035);`).
   - **배지 스타일 (`.skill_icon_badge`)**: 복잡한 구형 로고를 직접 그리지 않고, 각 브랜드 고유 대표 컬러를 머금은 **추상적인 3D 원형 그라데이션 구슬(Marble/Orb) 배지**를 **스킬 이름 왼쪽에 18px 크기로 작게 붙임**(`.skill_header > .skill_title` 안에 구슬 + 이름, 아래엔 전폭 프로그레스 바) (`border-radius: 50% !important;`, 전 구간 원형 고정; HTML5 웜오렌지, Ps 딥네이비/시안, CSS3 스카이블루, Ai 앰버/버건디, JS 비비드옐로우, Figma 멀티스톱 스펙트럼, jQuery 오션블루, Communication 시그니처블루).
   - 호버 인터랙션: 미세 회전 및 스케일업(`transform: scale(1.08) rotate(3deg);`)

4. **히어로 슬라임 그래픽 & 타이포그래피 (`.visualT`, `#blobCore`)**:
   - 데스크톱: 좌측 텍스트 컬럼(`.visual_text_col`, `padding-left: 36px`), 우측 인터랙티브 3D 푸딩 슬라임 그래픽.
   - **모바일·태블릿 중앙정렬 (≤1024px, ≤767px)**: PC용 좌측 패딩(36px)을 0으로 초기화하고, 슬라임 캐릭터·헤딩 텍스트·배지 행을 하나의 완벽한 수직 중앙축(`text-align: center`, `margin: 0 auto`, `align-items: center`)으로 일치시킴.
   - **독립 시선 추적**: 마우스 커서를 따라 눈동자가 3D 구면 위를 미끄러지듯 이동하는 패럴랙스 인터랙션.
   - **자연스러운 눈 깜빡임**: 2.5~5.5초 주기로 불규칙하게 눈을 감았다 뜨며, 간혹 귀여운 더블 블링크(연속 깜빡임) 수행.
   - **슬라임 토크 (`#slimeTalk`)**: 슬라임을 클릭할 때마다 슬라임 아래 빈 공간에 게임 대화창처럼 프로필 카드(`#EEF0F4`)보다 살짝 옅은 소프트 그레이(`#F4F5F9`) 말풍선 + 블랙 이름표(`Jean`)가 팝업으로 뜨고 타이핑 효과로 경력·일하는 방식을 순서대로 이야기(9개 대사 순환, 타이핑 중 클릭 시 즉시 완성, 키보드 Enter/Space 지원, 가장 긴 대사 기준 높이 고정). 첫 화면엔 "저를 눌러서 인사해 주세요" 글래스모피즘(반투명 블러) 말풍선 안내(이모지 없음). 모바일·태블릿은 슬라임 바로 아래 흐름 안에 배치.
   - **자연스러운 눈 감으며 미소 반응 (`^ ^`)**: 입을 과하게 그리지 않고, 마우스를 슬라임에 올리거나 터치하면 눈이 스르륵 자연스럽게 감기면서 포근한 반달눈(`^ ^`)으로 방긋 웃으며 볼이 퐁신하게 반응.

5. **AI & Creative Works 섹션 (`.Ai_section`, `#ai-works`)**:
   - **블랙 단일 컨테이너 카드 (`.ai_work_card`)**: 상하로 흰색/검은색 칸을 나누지 않고, 카드 전체를 하나의 일체형 딥블랙 컨테이너(`background: #0D0E12`, `min-height: 280px`, `border-radius: 16px`)로 통합.
   - **배경 썸네일 준비 구조**: 추후 관련 프로젝트 썸네일 이미지를 배경(`background-image`)으로 바로 적용할 수 있도록 `.ai_card_bg` 전용 레이어와 반투명 다크 그라데이션 오버레이(`::after`) 배치. 이미지가 들어가도 타이포그래피가 또렷하게 가독성을 유지함.
   - **내부 콘텐츠 배치 (`.ai_card_inner`)**:
     - 상단: 영문 카테고리 배지 (`.ai_card_keyword`, `E-COMMERCE DETAIL PAGE` / `ARG PROJECT · IN PROGRESS`)
     - 하단: 한글 메인 타이틀 (`.ai_card_title`, 20px Bold White `#FFFFFF`) + 반투명 글래스 다크 태그 (`.ai_card_tags span`, Higgsfield AI, Claude Code, VS Code, 상세페이지 퍼블리싱 등)

6. **Web Design Works (`.work_wrap`, CSS Grid)**:
   - 9개 실무 프로젝트를 940px 컨테이너에 딱 맞춘 현대적인 3열 벤토 그리드(Bento Grid) 구성.
   - 1~2행: 좌측 KDL v3 (2열 2행 대형), 우측 KDL v2·v1 (각 1열 1행)
   - 3~4행: 좌측 DEEP OCR 홈페이지·뷰어 (각 1열 1행), 우측 POLYGROUND (2열 2행 대형)
   - 5행: DEEP INVOICE, POLYGROUND 사전예약, 포트폴리오 (각 1열 1행 3개 균등 배치)
   - 태블릿: 2열 반응형 그리드, 모바일: 1열 수직 스택 자동 전환

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
- 카드: 보더 없이 소프트 서피스 + 아주 옅은 그림자(`rgba(0,0,0,0.03~0.08)`), **모서리 라운드는 8px로 통일**(2026-11-06 16px→8px로 축소)(프로필·경력·스킬·Works·AI·그래픽·상세 목업/정보 카드 전부). 알약형 배지·버튼만 `50px`/`30px`, 작은 태그는 6px.
- 호버: 살짝 상승(`translateY(-4~5px)`) 또는 미세 스케일/회전. 이징은 기존 `cubic-bezier(0.16,1,0.3,1)` / 스프링 `cubic-bezier(0.34,1.56,0.64,1)` 재사용.
- 폰트: **SUIT Variable** 단일 폰트 (`font/SUIT-Variable.woff2`, `common.css` 상단 `@font-face`, 굵기 100~900). 항상 `font-family: "SUIT", sans-serif` + 숫자 `font-weight`(Light 300 / Regular 400 / Medium 500 / Bold 700 / Black 900)로 지정. 다른 폰트 추가 금지.
- **배지·알약 안에는 이모지를 넣지 않습니다** (텍스트만. 아이콘이 필요하면 기존 `first-icon` 이미지 방식 사용).
- 말풍선(`.chat_L`, `.chat_R`, `.last_wrapper div`): 텍스트는 **항상 말풍선 영역 정중앙**(flex 중앙정렬, `common.css` 맨 아래 "말풍선" 블록). 말풍선 요소 폭은 이미지 폭(328 / 736px)과 맞춰야 중앙이 어긋나지 않음.
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
| 스킬 추가/수정 | `main.html` `.skillset` + `common.css` 스킬 섹션 (`.skill_icon_badge` 색, 바 채움 % 는 `#html` 등 id별 규칙) |
| 경력 추가 | `main.html` `.career_track` 안에 `.carrer_wrap.career_card` 복제 (현재 재직 카드만 `badge_current`) |
| Web Design 카드 추가/교체 | `main.html` `.Works_wrap` (`card-big`/`card-small` + 클래스명) → 벤토 배치는 `common.css`에서 클래스별 `grid-area` |
| 상세 페이지 "홈으로" 뒤로가기 버튼 | `web_work.html` / `webDesign_work.html` `.work_wrap` 맨 위 `.back_home` (스타일 `work.css` 맨 아래) — 새 상세 페이지를 만들면 같은 마크업을 복사 |
| 상세 작업물 추가 | `web_work.html` (`#work_01~06` 지그재그) / `webDesign_work.html`, 스타일 `css/work.css` |
| AI 카드 썸네일 | `common.css` `.ai_card_commerce .ai_card_bg` / `.ai_card_arg .ai_card_bg` 에 `background-image` |
| 그래픽 슬라이드 이미지 교체/추가 | `images/grapic-1~9.png` 덮어쓰기 (4:3 비율 권장) / 추가는 `.gs_viewport`에 `.gs_item` 복제 |
| Mobile UI/UX 섹션 (이미지 없이 "PDF 포트폴리오에서 확인" 안내 카드 + 다운로드 버튼) | `main.html` `.Mobile_section` `.pdf_card` / 스타일 `common.css` 맨 아래 |
| PDF 교체 | `images/240723최예진포트폴리오.pdf` |
| 메뉴 항목 | `main.html` `<nav>` + 모바일 드로어는 `js/mobile-nav.js`가 `nav`를 복제해 생성 → 두 곳 확인 |
| 슬라임 동작 | `js/blob-interactive.js` + `common.css` 히어로 구간 |
| 경력 n년 차 배지 | `main.html` `.career_year_badge` + `js/career-years.js` 맨 위 `CAREER_PERIODS`(경력 근무기간, 합산 개월÷12 = n년 차, 슬라임 첫 대사 `{years}`도 같이 갱신) / 스타일 `common.css` 맨 아래 |
| 슬라임 말풍선 대사 수정 | `js/slime-talk.js` 맨 위 `SLIME_LINES` 배열 (경력이 바뀌면 같이 수정, 마지막 줄 다음엔 처음으로 순환) / 스타일은 `common.css` 맨 아래 "슬라임 토크" 블록 |

### 작업 체크리스트
1. 수정 후 해당 CSS/JS의 `?v=` 캐시버스터 갱신 (**모든 HTML**에서 동일 파일은 같은 버전으로 — 현재 `main.html`만 최신이고 `web_work.html`/`webDesign_work.html`은 `common.css?v=20261106g`, `contentDisign_work.html`/`index.html`은 `20261105m`로 뒤처져 있음).
2. 데스크톱(1100) / 태블릿 / 모바일 3구간 모두 확인.
3. 새 색상이 필요하면 5.1 팔레트 안에서 해결, 불가피하면 사용자에게 먼저 확인.

---

## 7. 🚀 배포 규칙

- 사용자가 수정 결과를 라이브에서 바로 확인할 수 있도록, **수정 후 `master` 브랜치에 바로 푸시**합니다 (사용자 허락 완료, 2026-11-06).
- 푸시 전 반드시 5장 디자인 연속성 원칙과 `?v=` 캐시버스터 갱신을 확인합니다.
