/**
 * gallery-slider.js
 * AI 상세 페이지의 화보 슬라이드(.ag_slider). 좌우 버튼 / 점 / 스와이프 / 키보드 ←→, 화면에 보일 때만 4.5초 자동 재생.
 * 마크업: .ag_slider > .ag_slides > img*N  + .ag_ctrl(버튼·점은 JS가 생성). 동작 줄이기 설정이면 자동 재생 없음.
 */
(function () {
	'use strict';

	function setup(root) {
		var slides = [].slice.call(root.querySelectorAll('.ag_slides img'));
		var n = slides.length;
		if (n < 2) return;
		var cur = 0, timer = null, paused = false, visible = false, startX = null;
		var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		var ctrl = document.createElement('div');
		ctrl.className = 'ag_ctrl';
		ctrl.innerHTML = '<button type="button" class="gs_btn ag_prev" aria-label="이전 화보"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
			'<div class="gs_dots ag_dots" role="tablist" aria-label="화보 위치"></div>' +
			'<button type="button" class="gs_btn ag_next" aria-label="다음 화보"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
		root.appendChild(ctrl);
		var dotsBox = ctrl.querySelector('.ag_dots'), dots = [];
		slides.forEach(function (_, i) {
			var b = document.createElement('button');
			b.type = 'button'; b.className = 'gs_dot'; b.setAttribute('aria-label', (i + 1) + '번째 화보');
			b.addEventListener('click', function () { go(i, true); });
			dotsBox.appendChild(b); dots.push(b);
		});

		function render() {
			slides.forEach(function (s, i) { s.classList.toggle('is-on', i === cur); s.setAttribute('aria-hidden', i === cur ? 'false' : 'true'); });
			dots.forEach(function (d, i) { d.classList.toggle('active', i === cur); });
		}
		function go(i, manual) { cur = (i + n) % n; render(); if (manual) { stop(); setTimeout(start, 9000); } }
		function stop() { clearInterval(timer); timer = null; }
		function start() { stop(); if (reduce || paused || !visible) return; timer = setInterval(function () { go(cur + 1); }, 4500); }

		ctrl.querySelector('.ag_prev').addEventListener('click', function () { go(cur - 1, true); });
		ctrl.querySelector('.ag_next').addEventListener('click', function () { go(cur + 1, true); });
		root.setAttribute('tabindex', '0');
		root.addEventListener('keydown', function (e) {
			if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1, true); }
			if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1, true); }
		});
		root.addEventListener('pointerdown', function (e) { startX = e.clientX; });
		root.addEventListener('pointerup', function (e) {
			if (startX === null) return;
			var dx = e.clientX - startX; startX = null;
			if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1), true);
		});
		root.addEventListener('mouseenter', function () { paused = true; stop(); });
		root.addEventListener('mouseleave', function () { paused = false; start(); });

		if ('IntersectionObserver' in window) {
			new IntersectionObserver(function (e) { visible = e[0].isIntersecting; if (visible) start(); else stop(); }, { threshold: 0.35 }).observe(root);
		} else { visible = true; start(); }
		render();
	}

	function init() { [].forEach.call(document.querySelectorAll('.ag_slider'), setup); }
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
