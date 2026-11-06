/**
 * graphic-slider.js
 * Graphic Design Works : 한 줄 코버플로우 슬라이드. 가운데 작업물이 가장 크게, 좌우 한 장씩은 작게 + 블러.
 * 조작: 좌우 버튼 / 점 / 옆 이미지 클릭 / 터치 스와이프(마우스 드래그) / 키보드 ←→
 * 자동 재생: 화면에 보일 때만 4.5초마다 넘어가고, 마우스를 올리거나 직접 조작하면 멈춥니다.
 * (이미지 추가는 main.html .gs_viewport 안에 .gs_item 을 복제하면 됩니다. 순환 슬라이드)
 */
(function () {
	'use strict';

	function init() {
		var root = document.getElementById('graphicSlider');
		if (!root) return;

		var viewport = root.querySelector('.gs_viewport');
		var items = [].slice.call(root.querySelectorAll('.gs_item'));
		var dotsBox = root.querySelector('.gs_dots');
		var prevBtn = root.querySelector('.gs_prev');
		var nextBtn = root.querySelector('.gs_next');
		var n = items.length;
		if (!n) return;

		var current = 0;
		var dots = [];
		var timer = null;
		var paused = false;
		var visible = false;
		var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var AUTO_MS = 4500;

		for (var d = 0; d < n; d++) {
			(function (i) {
				var b = document.createElement('button');
				b.type = 'button';
				b.className = 'gs_dot';
				b.setAttribute('role', 'tab');
				b.setAttribute('aria-label', (i + 1) + '번째 작업물');
				b.addEventListener('click', function () { go(i, true); });
				dotsBox.appendChild(b);
				dots.push(b);
			})(d);
		}

		// 원형 순환 기준 상대 위치 (-4 ~ +4)
		function relPos(i) {
			var p = (i - current) % n;
			if (p > n / 2) p -= n;
			if (p < -n / 2) p += n;
			return p;
		}

		function render() {
			items.forEach(function (el, i) {
				var p = relPos(i);
				var cls = 'gs_item';
				if (p === 0) cls += ' is-active';
				else if (p === -1) cls += ' is-prev';
				else if (p === 1) cls += ' is-next';
				else cls += p < 0 ? ' is-far-left' : ' is-far-right';
				el.className = cls;
				el.setAttribute('aria-hidden', p === 0 ? 'false' : 'true');
			});
			dots.forEach(function (b, i) {
				b.classList.toggle('active', i === current);
				b.setAttribute('aria-selected', i === current ? 'true' : 'false');
			});
		}

		function go(i, manual) {
			current = ((i % n) + n) % n;
			render();
			if (manual) restart(true);
		}

		function stop() { clearInterval(timer); timer = null; }
		function start() {
			stop();
			if (reduce || paused || !visible) return;
			timer = setInterval(function () { go(current + 1, false); }, AUTO_MS);
		}
		function restart(afterManual) {
			stop();
			if (afterManual) {
				// 직접 조작한 뒤에는 잠시 멈췄다가 다시 재생
				clearTimeout(restart._t);
				restart._t = setTimeout(start, AUTO_MS * 2);
			} else {
				start();
			}
		}

		prevBtn.addEventListener('click', function () { go(current - 1, true); });
		nextBtn.addEventListener('click', function () { go(current + 1, true); });

		// 옆 이미지를 누르면 그 이미지가 가운데로
		items.forEach(function (el, i) {
			el.addEventListener('click', function () {
				if (swiped) return;
				var p = relPos(i);
				if (p !== 0) go(i, true);
			});
		});

		// 키보드
		viewport.addEventListener('keydown', function (e) {
			if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1, true); }
			else if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1, true); }
		});

		// 스와이프 / 드래그
		var startX = null, swiped = false;
		viewport.addEventListener('pointerdown', function (e) {
			startX = e.clientX;
			swiped = false;
		});
		viewport.addEventListener('pointerup', function (e) {
			if (startX === null) return;
			var dx = e.clientX - startX;
			startX = null;
			if (Math.abs(dx) > 40) {
				swiped = true;
				go(current + (dx < 0 ? 1 : -1), true);
				setTimeout(function () { swiped = false; }, 50);
			}
		});
		viewport.addEventListener('pointercancel', function () { startX = null; });

		// 마우스를 올리면 자동 재생 일시정지
		root.addEventListener('mouseenter', function () { paused = true; stop(); });
		root.addEventListener('mouseleave', function () { paused = false; start(); });
		root.addEventListener('focusin', function () { paused = true; stop(); });
		root.addEventListener('focusout', function () { paused = false; start(); });

		// 화면에 보일 때만 자동 재생
		if ('IntersectionObserver' in window) {
			new IntersectionObserver(function (entries) {
				visible = entries[0].isIntersecting;
				if (visible) start(); else stop();
			}, { threshold: 0.35 }).observe(root);
		} else {
			visible = true;
			start();
		}

		render();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
