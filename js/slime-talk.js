/**
 * slime-talk.js
 * 히어로 슬라임을 클릭할 때마다 아래 빈 공간에 게임 대화창처럼 말풍선이 뜨고,
 * 타이핑 효과로 경력/일하는 방식을 한 줄씩 이야기해 줍니다.
 *
 * ▶ 대사를 고치고 싶으면 아래 SLIME_LINES 배열만 수정하세요. (마지막 줄 다음엔 처음으로 돌아갑니다)
 * ▶ 타이핑 중 클릭 = 현재 대사를 한 번에 보여주기 / 다 나온 뒤 클릭 = 다음 대사
 */
(function () {
	'use strict';

	var SLIME_LINES = [
		'안녕하세요! 저는 {years}년 차 웹 디자이너 · 퍼블리셔 예진이에요 👋',
		'2019년 KTN114에서 첫 커리어를 시작했어요. 전화번호부 편집, 고객사 홈페이지 제작을 하면서 고객과 직접 소통하는 법을 배웠죠.',
		'2021년엔 한국딥러닝으로 옮겨 3D 애셋 마켓 ‘POLYGROUND’ UI 디자인을 맡았어요.',
		'딥러닝 OCR, 3D DX 발표자료(PPT)를 30여 건 만들고, 자사 홈페이지 v.2 ~ v.3는 디자인부터 개발, 유지보수까지 직접 했어요.',
		'ChatGPT 3.5 기반 애플리케이션 UI/UX 디자인도 해봤답니다.',
		'지금은 (주)이고진에서 AI를 활용해 상세페이지 웹표준화와 제품 이미지를 만들고 있어요.',
		'Figma로 다른 부서와 협업하고, 상세페이지 디자인부터 웹퍼블리싱, 배너 같은 마케팅 콘텐츠까지 한 번에 해요.',
		'일할 때는 소통과 배려, 책임감이 제일 큰 무기예요. 디자이너와 웹개발자 사이의 유연한 연결고리가 되려고 해요 🤝',
		'더 궁금하다면 아래 경력 카드와 Works도 구경해 주세요. 제안은 언제든 환영이에요 ✨'
	];

	var TYPE_SPEED = 32; // ms / 글자

	// 대사 안의 {years} 는 js/career-years.js 가 계산한 경력 연차로 자동 치환됩니다
	function lineAt(i) {
		return SLIME_LINES[i].replace('{years}', window.CAREER_YEARS || 6);
	}

	function init() {
		var stage = document.getElementById('blobStage');
		var box = document.getElementById('slimeTalk');
		if (!stage || !box) return;

		var hint = box.querySelector('.slime_talk_hint');
		var bubble = box.querySelector('.slime_talk_bubble');
		var typed = box.querySelector('.slime_talk_typed');
		var ghost = box.querySelector('.slime_talk_ghost');
		var count = box.querySelector('.slime_talk_count');
		var next = box.querySelector('.slime_talk_next');

		var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var index = -1;
		var charPos = 0;
		var timer = null;
		var typing = false;

		function render() {
			var line = lineAt(index);
			// typed(보이는 글자) + ghost(아직 안 나온 글자, 투명) -> 말풍선 크기가 타이핑 중에도 변하지 않음
			typed.textContent = line.slice(0, charPos);
			ghost.textContent = line.slice(charPos);
		}

		function finish() {
			clearTimeout(timer);
			typing = false;
			charPos = lineAt(index).length;
			render();
			bubble.classList.add('is-done');
		}

		function tick() {
			charPos++;
			render();
			if (charPos >= lineAt(index).length) {
				finish();
				return;
			}
			var ch = lineAt(index).charAt(charPos - 1);
			var pause = /[.,!?]/.test(ch) ? 160 : 0;
			timer = setTimeout(tick, TYPE_SPEED + pause);
		}

		function showLine(i) {
			clearTimeout(timer);
			index = i;
			charPos = 0;
			typing = true;
			count.textContent = (index + 1) + ' / ' + SLIME_LINES.length;
			bubble.classList.remove('is-done');

			// 말풍선 팝 애니메이션 재시작
			bubble.classList.remove('is-pop');
			void bubble.offsetWidth;
			bubble.classList.add('is-pop');

			if (reduceMotion) {
				finish();
			} else {
				render();
				timer = setTimeout(tick, 220);
			}
		}

		// 가장 긴 대사 기준으로 말풍선 높이를 고정 -> 대사가 바뀌어도 아래 레이아웃이 출렁이지 않음
		function fitHeight() {
			var keepTyped = typed.textContent, keepGhost = ghost.textContent, max = 0, i;
			bubble.style.minHeight = '';
			typed.textContent = '';
			for (i = 0; i < SLIME_LINES.length; i++) {
				ghost.textContent = lineAt(i);
				max = Math.max(max, bubble.offsetHeight);
			}
			typed.textContent = keepTyped;
			ghost.textContent = keepGhost;
			bubble.style.minHeight = max + 'px';
		}

		var resizeTimer = null;
		window.addEventListener('resize', function () {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () {
				if (!bubble.hidden) fitHeight();
			}, 150);
		});

		function onTalk() {
			if (hint && !hint.hidden) {
				hint.hidden = true;
				bubble.hidden = false;
				fitHeight();
			}
			if (index >= 0 && typing) {
				finish();
				return;
			}
			showLine((index + 1) % SLIME_LINES.length);
		}

		// 슬라임 접근성: 키보드로도 대화 가능
		stage.setAttribute('role', 'button');
		stage.setAttribute('tabindex', '0');
		stage.setAttribute('aria-label', '저를 눌러서 인사해 주세요');

		// 마우스·터치로 누를 땐 포커스 링 숨김, 키보드를 쓰면 다시 표시
		stage.addEventListener('pointerdown', function () { stage.classList.add('no-ring'); });
		stage.addEventListener('keydown', function () { stage.classList.remove('no-ring'); });
		stage.addEventListener('click', onTalk);
		stage.addEventListener('keydown', function (e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				onTalk();
			}
		});
		stage.style.cursor = 'pointer';
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
