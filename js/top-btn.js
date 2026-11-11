/**
 * top-btn.js
 * 메인 페이지 맨 위로 가기 버튼(TOP) : 조금 내려오면 나타나고, 누르면 부드럽게 맨 위로 이동합니다.
 * (상세 페이지의 TOP 버튼은 js/work.js 가 담당)
 */
(function () {
	'use strict';

	function init() {
		var btn = document.getElementById('topBtn');
		if (!btn) return;

		var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var SHOW_AFTER = 150; // px (짧은 상세 페이지에서도 나타나도록)

		function update() {
			var y = window.pageYOffset || document.documentElement.scrollTop || 0;
			btn.classList.toggle('is-show', y > SHOW_AFTER);
		}

		btn.addEventListener('click', function () {
			window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
		});

		window.addEventListener('scroll', update, { passive: true });
		update();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
