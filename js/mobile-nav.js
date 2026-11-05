/* +++++++++++++++++++ mobile-nav.js +++++++++++++++++++ */
/* 2026-11-05 : 모바일 햄버거 네비게이션 드로어 (≤1024px) */
(function () {
	'use strict';

	function init() {
		var btn = document.querySelector('.nav-hamburger');
		var overlay = document.querySelector('.mobile-nav-overlay');
		if (!btn || !overlay) { return; }

		var backdrop = overlay.querySelector('.mobile-nav-backdrop');
		var closeBtn = overlay.querySelector('.mobile-nav-close');
		var worksItem = overlay.querySelector('.mobile-nav-works');
		var worksToggle = overlay.querySelector('.mobile-nav-works-toggle');

		function isOpen() {
			return overlay.classList.contains('is-open');
		}

		function open() {
			overlay.classList.add('is-open');
			overlay.setAttribute('aria-hidden', 'false');
			btn.classList.add('is-active');
			btn.setAttribute('aria-expanded', 'true');
			btn.setAttribute('aria-label', '메뉴 닫기');
			document.body.classList.add('mobile-nav-open');
		}

		function close() {
			overlay.classList.remove('is-open');
			overlay.setAttribute('aria-hidden', 'true');
			btn.classList.remove('is-active');
			btn.setAttribute('aria-expanded', 'false');
			btn.setAttribute('aria-label', '메뉴 열기');
			document.body.classList.remove('mobile-nav-open');
		}

		btn.addEventListener('click', function () {
			if (isOpen()) { close(); } else { open(); }
		});

		if (backdrop) { backdrop.addEventListener('click', close); }
		if (closeBtn) { closeBtn.addEventListener('click', close); }

		// Works 탭 → 서브메뉴 아코디언 펼침/접힘
		if (worksToggle && worksItem) {
			worksToggle.addEventListener('click', function () {
				var expanded = worksToggle.getAttribute('aria-expanded') === 'true';
				worksToggle.setAttribute('aria-expanded', String(!expanded));
				worksItem.classList.toggle('is-expanded', !expanded);
			});
		}

		// 드로어 안 링크를 눌러 이동할 때는 닫아두기
		overlay.querySelectorAll('.mobile-nav-list a').forEach(function (link) {
			link.addEventListener('click', close);
		});

		// ESC 키로 닫기
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && isOpen()) { close(); }
		});

		// 데스크톱 폭으로 넓어지면 상태 초기화
		window.addEventListener('resize', function () {
			if (window.innerWidth >= 1025 && isOpen()) { close(); }
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
