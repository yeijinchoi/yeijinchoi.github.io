/**
 * glass-bubble.js
 * 말풍선의 "말칸"과 "꼬리"를 하나의 윤곽선(clip-path)으로 이어서 그립니다.
 *  - 꼬리를 따로 붙이면 반투명 유리 면이 겹쳐 이음새가 생기므로, 말풍선 하나를 통째로 오려내는 방식
 *  - 말풍선이 타이핑으로 커지거나 화면 폭이 바뀌어도(ResizeObserver) 윤곽선이 자동으로 다시 계산됨
 *
 * 사용: GlassBubble.attach(요소, 'bl' | 'br' | 'top')
 *   bl  : 왼쪽 아래 꼬리 (왼쪽 꼬리 영역만큼 요소의 padding-left 를 늘려 둘 것)
 *   br  : 오른쪽 아래 꼬리 (padding-right)
 *   top : 위쪽 가운데 꼬리 (padding-top)
 * CSS 변수: --gb-r (모서리 반지름), --gb-t (꼬리 영역 크기)
 */
(function () {
	'use strict';

	function num(el, name, fallback) {
		var v = parseFloat(getComputedStyle(el).getPropertyValue(name));
		return isNaN(v) ? fallback : v;
	}

	function f(n) { return Math.round(n * 100) / 100; }

	// 아래쪽 꼬리 (좌: 'bl' / 우: 'br') -- 'br' 은 x 를 좌우로 뒤집어서 그림
	function pathBottom(W, H, r, T, mirror) {
		var mx = function (x) { return f(mirror ? W - x : x); };
		var sweep = mirror ? 0 : 1;
		r = Math.min(r, (H - 0) / 2, (W - T) / 2);
		var tailTop = Math.max(r, H - 18);
		return [
			'M', mx(T + r), 0,
			'L', mx(W - r), 0,
			'A', r, r, 0, 0, sweep, mx(W), r,
			'L', mx(W), f(H - r),
			'A', r, r, 0, 0, sweep, mx(W - r), H,
			'L', mx(T + 14), H,
			'Q', mx(T + 3), H, mx(0), H,                 // 꼬리 끝(바깥쪽 아래 모서리)
			'Q', mx(T + 1), f(H - 3), mx(T), f(tailTop),  // 꼬리에서 말칸 왼쪽 벽으로 부드럽게 이어짐
			'L', mx(T), r,
			'A', r, r, 0, 0, sweep, mx(T + r), 0,
			'Z'
		].join(' ');
	}

	// 위쪽 가운데 꼬리
	function pathTop(W, H, r, T) {
		var bodyH = H - T;
		r = Math.min(r, bodyH / 2, W / 2);
		var cx = W / 2;
		return [
			'M', r, T,
			'L', f(cx - 12), T,
			'Q', f(cx - 3), T, f(cx), 0,
			'Q', f(cx + 3), T, f(cx + 12), T,
			'L', f(W - r), T,
			'A', r, r, 0, 0, 1, W, f(T + r),
			'L', W, f(H - r),
			'A', r, r, 0, 0, 1, f(W - r), H,
			'L', r, H,
			'A', r, r, 0, 0, 1, 0, f(H - r),
			'L', 0, f(T + r),
			'A', r, r, 0, 0, 1, r, T,
			'Z'
		].join(' ');
	}

	function apply(el, kind) {
		var W = el.offsetWidth, H = el.offsetHeight;
		if (!W || !H) return;
		var r = num(el, '--gb-r', 26), T = num(el, '--gb-t', 10);
		var d = kind === 'top' ? pathTop(W, H, r, T) : pathBottom(W, H, r, T, kind === 'br');
		var v = "path('" + d + "')";
		el.style.clipPath = v;
		el.style.webkitClipPath = v;
	}

	function attach(el, kind) {
		if (!el) return;
		el.classList.add('gb-shaped');
		apply(el, kind);
		if ('ResizeObserver' in window) {
			new ResizeObserver(function () { apply(el, kind); }).observe(el);
		} else {
			window.addEventListener('resize', function () { apply(el, kind); });
		}
	}

	window.GlassBubble = { attach: attach };
})();
