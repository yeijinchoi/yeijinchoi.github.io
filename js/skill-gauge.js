/**
 * skill-gauge.js
 * 스킬 게이지(프로그레스 바)가 화면에 보이는 순간 0에서 목표치까지 차오릅니다. (스크롤 연동)
 * 목표치는 common.css 의 #html { --fill: 100%; } 같은 스킬별 변수에서 정합니다.
 * JS가 꺼져 있거나 동작 줄이기 설정이면 처음부터 채워진 상태로 보입니다.
 */
(function () {
	'use strict';

	function init() {
		var cards = [].slice.call(document.querySelectorAll('.skillset'));
		if (!cards.length) return;

		var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce || !('IntersectionObserver' in window)) return;   // 그대로 채워진 상태 유지

		document.documentElement.classList.add('gauge-ready');

		var order = 0;
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) {
				if (!e.isIntersecting) return;
				var el = e.target;
				io.unobserve(el);
				// 같은 줄에 동시에 들어와도 살짝 시차를 두고 차오르게
				var delay = (order++ % 3) * 120;
				setTimeout(function () { el.classList.add('is-in'); }, delay);
			});
		}, { threshold: 0.4 });

		cards.forEach(function (c) { io.observe(c); });
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
