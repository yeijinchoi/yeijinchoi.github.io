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
		'웹디자인, 그래픽디자인, 편집디자인, BX디자인까지 폭넓게 해왔어요. 리플렛과 홍보물 제작, 브랜딩, 마케팅 기획도 자신 있어요.',
		'Photoshop, Illustrator, Figma는 능숙하게 다루고, HTML5/CSS와 JavaScript로 웹 환경을 구축한 경험도 있어요.',
		'인공지능 기업에 초기 멤버로 들어가 다수의 웹페이지 프로젝트를 진행하면서 퍼블리셔로서 꼭 필요한 스킬이 크게 성장했어요.',
		'단 10명이 3D 애셋 마켓 플랫폼을 기획부터 론칭까지 끌고 가면서 협업과 소통하는 법도 배웠어요.',
		'작은 회사에서 마케팅 업무를 병행하며 시작했어요. 마케팅 팀원들과 가까이 소통하면서 퍼포먼스 마케팅 기초도 실무에서 얻었죠.',
		'IT 초기 스타트업이라 지원사업·공모전 PPT를 짧은 기간에 최고의 퀄리티로 완성해야 했어요. 덕분에 제안서와 사업계획서 실력이 크게 늘었어요.',
		'프로젝트 초기 기획부터 최종 결과물 제작까지 전 과정을 주도해왔어요. UI/UX 설계와 브랜드 가치를 높이는 디자인 솔루션을 제안해요.',
		'지금은 (주)이고진에서 AI를 활용해 상세페이지 웹표준화와 제품 이미지를 만들고 있어요.',
		'평소에도 포토샵, 일러스트, 에프터 이펙트를 자주 다루고, 한글과 MS오피스로 문서 정리도 능숙하게 해내요.',
		'요즘은 AI 활용에 푹 빠져 있어요. Higgsfield AI로 이미지를 만들고, Claude Code로 이 포트폴리오도 직접 업데이트하고 있답니다.',
		'실무 중심의 역량과 트렌드에 맞춘 감각으로 새로운 도전과 성장에 최적화된 인재예요 ✨ 더 궁금하면 아래 작업물도 구경해 주세요!'
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
