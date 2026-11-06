/**
 * career-years.js
 * 메인 히어로의 "경력 n년 차" 배지. 경력 카드의 실제 근무 기간을 합산해 자동 계산되고,
 * 접속 시점 기준으로 해가 바뀌면 알아서 올라갑니다. (숫자는 0에서 올라가는 카운트업 효과)
 *
 * ▶ 경력이 바뀌면 아래 CAREER_PERIODS 만 수정하세요. (YYYY-MM, 재직 중이면 끝을 null)
 * ▶ 계산 방식: 근무 개월 수를 모두 더해(시작·종료 달 포함) 12로 나눈 몫 = n년 차
 *   (공백 기간은 제외 -> 현재 약 75개월 = 6년 차)
 * ▶ 슬라임 말풍선 등 다른 곳에서도 window.CAREER_YEARS 로 같은 값을 씁니다.
 */
(function () {
	'use strict';

	var CAREER_PERIODS = [
		['2019-06', '2020-12'],   // KTN114(OK114)
		['2021-10', '2024-03'],   // 한국딥러닝
		['2024-10', null]         // (주)이고진 (재직중)
	];

	function ym(str) {
		var p = str.split('-');
		return +p[0] * 12 + (+p[1] - 1);
	}

	function careerYears() {
		var now = new Date();
		var nowYm = now.getFullYear() * 12 + now.getMonth();
		var months = 0;
		for (var i = 0; i < CAREER_PERIODS.length; i++) {
			var s = ym(CAREER_PERIODS[i][0]);
			var e = CAREER_PERIODS[i][1] ? ym(CAREER_PERIODS[i][1]) : nowYm;
			months += Math.max(0, e - s + 1);
		}
		return Math.max(1, Math.floor(months / 12));
	}

	var years = careerYears();
	window.CAREER_YEARS = years;

	function init() {
		var el = document.getElementById('careerYears');
		if (!el) return;
		el.setAttribute('aria-label', String(years));

		var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce || !window.requestAnimationFrame) {
			el.textContent = years;
			return;
		}

		var duration = 900, t0 = null;
		function step(ts) {
			if (t0 === null) t0 = ts;
			var k = Math.min((ts - t0) / duration, 1);
			var eased = 1 - Math.pow(1 - k, 3);                 // easeOutCubic
			el.textContent = Math.max(1, Math.round(years * eased));
			if (k < 1) requestAnimationFrame(step);
		}
		el.textContent = '1';
		requestAnimationFrame(step);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
