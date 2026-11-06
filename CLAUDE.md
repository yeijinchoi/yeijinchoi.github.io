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
   - **기본 경력 카드**: 테두리 완전 삭제(`border: none;`), 깔끔한 소프트 서피스(`background: #EEF0F4;`)
   - **현재 재직 중인 회사 (`(주)이고진`)**: 화이트 바탕(`background: #FFFFFF;`) + 2.5px 포인트 컬러 그라데이션 보더(`linear-gradient(135deg, #5383F6 0%, #38BDF8 100%)`), 초록색 포인트 배지(`.badge_current`, `#10B981`, '재직중'), 블루 섀도우
   - **슬라이더 버튼 (`.career_nav`)**: 좌우 손가락 이모지(`👈` 이전 / `👉` 다음), 터치 시 스케일 인터랙션
3. **Works 프로젝트 목업 (`.p_mockup`)**:
   - 가로 배치: 좌우 지그재그 (홀수: 목업 좌 / 정보 우, 짝수: 목업 우 / 정보 좌)
   - 마우스오버 시: `transform: translateY(calc(-100% + 520px));`로 5초간 풀페이지 캡처 스크롤 및 `Mouse over` 라벨 페이드아웃.
5. **스킬 섹션 (`.skill_wrapper`)**:
   - 데스크톱: 2열 CSS Grid (`grid-template-columns: repeat(2, 450px); column-gap: 40px; row-gap: 16px;`)
   - **배지 스타일 (`.skill_icon_badge`)**: 복잡한 구형 로고를 직접 그리지 않고, 각 브랜드 고유 대표 컬러를 머금은 **추상적인 3D 그라데이션 페블 배지**로 감각적 표현 (HTML5 웜오렌지, Ps 딥네이비/시안, CSS3 스카이블루, Ai 앰버/버건디, JS 비비드옐로우, Figma 멀티스톱 스펙트럼, jQuery 오션블루, Communication 시그니처블루).
   - 호버 인터랙션: 미세 회전 및 스케일업(`transform: scale(1.08) rotate(3deg);`)

7. **히어로 슬라임 그래픽 (`#blobCore`)**:
   - 3D 메인 슬라임 바디(푸딩 형태의 도톰하고 부드러운 유기형 구체, `#477AEF` 리치 블루 그라데이션)와 흰색 눈동자 레이어를 SVG 상에서 완전히 독립 분리.
   - 몸체는 3D 원근 틸트 및 유기적 브리딩 모션을 수행하고, 흰색 눈동자는 마우스 커서의 위치를 입체적으로 쫓아가는 독립 패럴랙스 시선 추적 인터랙션 적용.
   - 1~2행: 좌측 KDL v3 (2열 2행 대형), 우측 KDL v2·v1 (각 1열 1행)
   - 3~4행: 좌측 DEEP OCR 홈페이지·뷰어 (각 1열 1행), 우측 POLYGROUND (2열 2행 대형)
   - 5행: DEEP INVOICE, POLYGROUND 사전예약, 포트폴리오 (각 1열 1행 3개 균등 배치)
   - 태블릿: 2열 반응형 그리드, 모바일: 1열 수직 스택 자동 전환
5. **Graphic Design Works (`.Graphic_wrapper`)**:
   - 데스크톱: 3열 × 3행 CSS Grid (`grid-template-columns: repeat(3, 300px); gap: 20px;`) 940px 정돈
   - 각 카드(`.Graphic_L`): `height: 240px; border-radius: 8px;`, 이미지 `object-fit: cover;`
   - 호버 시 은은한 상승 애니메이션(`translateY(-4px)` 및 부드러운 그림자)
6. **데스크톱 네비게이션 서브메뉴 호버 브리지 및 대칭 정렬**:
   - `li.work`에 `padding-bottom: 25px; margin-bottom: -25px;` 및 `.blind-subnav` 상단 투명 가상요소(`::before`)를 배치하여, 마우스가 Works에서 알약 팝업으로 이동할 때 호버 상태가 끊기지 않도록 브리지 처리 완료.
   - 서브 네비 알약(`.blind-subnav ul`): `Works` 텍스트와 정확히 일치하는 가로 절대 중앙정렬(`left: 50%; transform: translateX(-50%)`). 내부 아이템(`Web Design`, `Web Publishing`)은 각 96px 균등 너비와 중앙정렬을 적용하여 두 단어 사이의 간격 중심과 알약 중심, `Works` 텍스트 중심이 0.0px 오차로 완벽히 일치하도록 대칭 설계. 좌우 패딩 각 21px 균등 배분 및 구형 `translateX(-8px)` 제거.
7. **무신사 스타일 쫀득한 플로팅 알약 네비게이션**:
   - 데스크톱(≥1025px)에서 스크롤(scrollY ≥ 90px) 시 상단 고정 플로팅 알약 캡슐(`nav.nav-floating`)로 자연스럽게 변환.
   - 레이아웃: 좌측 Logo(`h1`), 중앙 절대 정렬 메뉴(`nav > ul`: `left: 50%; transform: translateX(-50%)`), 우측 끝단 밀착 Contact 버튼(`margin-left: auto;`)
   - 스타일: `width: 880px; height: 56px; border-radius: 50px; background: rgba(250, 250, 252, 0.88); backdrop-filter: blur(20px); border: 1px solid rgba(220, 224, 230, 0.85); box-shadow: 0 12px 36px rgba(0,0,0,0.09);`
   - 변형 애니메이션: `animation: floatPillSpring 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;` 쫀득한 스프링 모션 적용.
   - 플로팅 전(상단 휴지 상태): `width: 940px; height: 80px; padding: 20px 10px 0 10px;`, Logo 좌측 / Profile·Works 메뉴 중앙 절대 정렬(`left: 50%; transform: translateX(-50%)`, gap 40px) / Contact 버튼 우측 밀착으로 플로팅 전후의 3단 레이아웃 일관성 100% 유지.
   - 컨텐츠 점프 방지: `.nav-placeholder` 요소가 80px 높이를 유지하여 스크롤 시 본문 덜컹거림 원천 차단.
   - 모바일(≤1024px): 네비 앞 `Jean` 로고 숨김(`display: none;`), 햄버거 버튼은 PC 플로팅 알약과 동일한 글래스모피즘 톤(`48×48px`, `border-radius: 50%`, 반투명 블러·그림자)으로 우측 상단(`top: 16px; right: 16px; fixed`)에 고정 플로팅. 드로어 메뉴(Profile, Works 아코디언, Contact) 완벽 유지.
8. **스킬 섹션 모던 카드형 및 공식 브랜드 컬러 통일 배지 (`.skill_wrapper`, `.skillset`)**:
   - 8개 스킬을 2열 4행 모던 스킬 카드 그리드로 개편.
   - 외곽선 전면 제거(`border: none !important;`): 답답한 회색 테두리 대신 부드러운 소프트 섀도우(`box-shadow: 0 4px 16px rgba(0, 0, 0, 0.035);`)로 미니멀하고 시원한 카드 표면 구현.
   - 각 스킬에 42×42px 통일 둥근 사각 배지(`skill_icon_badge`, `#F1F4F8` 바탕, 테두리 없음, `border-radius: 12px`) 적용.
   - 내부 벡터 아이콘: 공식 브랜드 컬러 벡터 SVG 적용 (HTML5 오렌지, CSS3 블루, JS 옐로우 스퀘어, jQuery 블루 스퀘어, Photoshop 다크네이비+시안, Illustrator 다크와인+앰버, Figma 5컬러, Communication 로열블루 협업 말풍선).
   - 각 카드 내부 타이포: 스킬명(`skill_name`, 14.5px Bold, `#222`) + 퍼센티지(`skill_percent`, 13px Bold, `#5383F6`) 상단 배치 및 하단 8px 슬림 트랙 게이지 바(`bar`) 일체화.
9. **AI & Creative Works 섹션 (`.Ai_section`, `#ai-works`)**:
   - 생성형 AI를 실무 파이프라인에 적극 도입한 프로젝트 2종을 2열 Bento 카드로 구성. 외곽선 전면 제거(`border: none;`).
   - 프리뷰 영역: 안쪽 복잡한 박스 및 긴 설명 텍스트를 전면 삭제하고, 시원한 대문자 영문 키워드(`E-COMMERCE DETAIL PAGE`, `ARG PROJECT · IN PROGRESS`)만 미니멀하고 세련되게 배치.
   - 카드 1: 커머스 상세페이지 AI 이미지 생성 파이프라인 (Higgsfield AI, Claude Code, VS Code 기반 이미지 생성 및 퍼블리싱 실무)
   - 카드 2: AI 기반 대체현실 게임(ARG) 기획 & 인터랙티브 웹 (Claude/ChatGPT 시나리오·암호 로직, 비주얼 단서 생성, 인터랙티브 웹 UI)
10. **히어로 섹션 및 3D 인터랙티브 캐릭터 마스코트 그래픽 (`.visualT`, `.blob_stage`, `.fluid_drop_svg`)**:
   - 좌측 텍스트 컬럼(`.visual_text_col`): `padding-left: 36px`을 부여하여 좌측 마진에서 오른쪽으로 여유 있게 당겨 시각적 무게감 균형 확보.
   - 우측 비주얼 그래픽(`.visual_graphic_col`): 예진 님의 요청(피클 비서 프로필 캐릭터 'ㅂ' 실루엣)을 그대로 본뜬 사랑스럽고 매끄러운 3D 블루 마스코트 SVG.
   - 클리핑 마스크(`<clipPath id="charClip">`): 반사광 및 하이라이트 글린트가 캐릭터 외곽선 밖으로 삐져나오지 않도록 본체 패스로 클리핑 마스크 적용.
   - 인터랙션(`js/blob-interactive.js`): 마우스 커서의 움직임에 따라 3D 틸트 및 귀여운 눈동자 시선 추적(eye-tracking) 인터랙션 구현. 보라색 완전 배제 및 클릭 왜곡 액션 제거.

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
