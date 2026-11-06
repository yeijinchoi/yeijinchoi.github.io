/**
 * career-days.js
 * 메인 히어로의 "커리어 시작 n일째" 배지. 접속할 때마다 오늘 날짜 기준으로 자동 계산되고,
 * 숫자가 0에서 올라가는 카운트업 효과가 나옵니다.
 *
 * ▶ 커리어 시작일을 바꾸려면 아래 CAREER_START 만 수정하세요. (YYYY-MM-DD)
 *   현재: 2019.06 (KTN114 입사) — 정확한 입사일을 알면 그 날짜로 바꾸면 됩니다.
 * ▶ 시작일 당일을 1일째로 셉니다.
 */
(function () {
	'use strict';

	var CAREER_START = '2019-06-01';

	function daysSince(dateStr) {
		var p = dateStr.split('-');
		var start = new Date(+p[0], +p[1] - 1, +p[2]);        // 로컬 자정 기준(시간대 오차 방지)
		var now = new Date();
		var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		return Math.round((today - start) / 86400000) + 1;
	}

	function init() {
		var el = document.getElementById('careerDays');
		if (!el) return;
		var total = daysSince(CAREER_START);
		var label = total.toLocaleString('ko-KR');
		el.setAttribute('aria-label', label);

		var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce || !window.requestAnimationFrame) {
			el.textContent = label;
			return;
		}

		var duration = 1400, t0 = null;
		function step(ts) {
			if (t0 === null) t0 = ts;
			var k = Math.min((ts - t0) / duration, 1);
			var eased = 1 - Math.pow(1 - k, 3);                 // easeOutCubic
			el.textContent = Math.round(total * eased).toLocaleString('ko-KR');
			if (k < 1) requestAnimationFrame(step);
		}
		el.textContent = '0';
		requestAnimationFrame(step);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
