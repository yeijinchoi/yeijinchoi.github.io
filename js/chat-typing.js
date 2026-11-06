/**
 * chat-typing.js
 * 본문 채팅 말풍선(마음가짐 Q&A, 마지막 다짐)이 스크롤로 화면에 들어오면
 *   1) 말풍선이 톡 떠오르며 "..." 입력 중 표시 ->
 *   2) 글자가 한 글자씩 타이핑되고, 말풍선이 글자 수에 맞춰 함께 커집니다 (가로 -> 최대 폭에서 줄바꿈되며 세로).
 *  - 마음가짐 영역: 질문(회색 유리) 타이핑 -> 답변(블루 유리) 타이핑 순서로 이어짐
 *  - 한 번 재생되면 반복하지 않음 / 동작 줄이기 설정이면 효과 없이 바로 표시
 * 말풍선이 커져도 아래 레이아웃이 밀리지 않도록, 완성된 크기를 미리 재서 줄(row)의 최소 높이로 잡아 둡니다.
 */
(function () {
	'use strict';

	var TYPE_MS = 34;
	var DOTS_MS = 650;

	function makeItem(row, bubble, p) {
		var full = p.textContent.replace(/\s+/g, ' ').trim();
		p.setAttribute('aria-label', full);
		p.textContent = '';
		return { row: row, bubble: bubble, p: p, full: full, state: 'idle', measure: bubble };
	}

	// 완성된 크기를 미리 측정해 줄 높이를 고정 (타이핑 중 아래 내용이 밀리지 않게)
	function fit(item) {
		if (item.state !== 'idle') return;
		item.row.style.minHeight = '';
		item.p.textContent = item.full;
		var h = item.measure.offsetHeight;
		item.p.textContent = '';
		item.row.style.minHeight = h + 'px';
	}

	function type(item, done) {
		var i = 0;
		item.state = 'typing';
		item.p.innerHTML = '';
		var node = document.createTextNode('');
		item.p.appendChild(node);
		(function tick() {
			i++;
			node.nodeValue = item.full.slice(0, i);
			if (i >= item.full.length) {
				item.state = 'done';
				item.row.style.minHeight = '';          // 이제 실제 크기가 곧 완성 크기
				if (done) done();
				return;
			}
			var ch = item.full.charAt(i - 1);
			setTimeout(tick, TYPE_MS + (/[.,?]/.test(ch) ? 140 : 0));
		})();
	}

	function play(items) {
		(function next(n) {
			if (n >= items.length) return;
			var it = items[n];
			it.bubble.classList.add('is-show');
			it.state = 'dots';
			it.p.innerHTML = '<span class="ct_dots" aria-hidden="true"><i></i><i></i><i></i></span>';
			setTimeout(function () {
				type(it, function () { setTimeout(function () { next(n + 1); }, 350); });
			}, DOTS_MS);
		})(0);
	}

	function observeOnce(el, threshold, cb) {
		new IntersectionObserver(function (entries, io) {
			if (entries[0].isIntersecting) { io.disconnect(); cb(); }
		}, { threshold: threshold }).observe(el);
	}

	function init() {
		var chat = document.querySelector('.chat_section');
		var last = document.querySelector('.last_wrapper');

		// 말칸 + 꼬리를 하나의 윤곽선으로 (glass-bubble.js) -- 애니메이션 설정과 무관하게 항상 적용
		if (window.GlassBubble) {
			if (chat) {
				GlassBubble.attach(chat.querySelector('.chat_L_p'), 'bl');
				GlassBubble.attach(chat.querySelector('.chat_R_p'), 'br');
			}
			if (last) GlassBubble.attach(last.querySelector(':scope > div'), 'bl');
		}

		var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce || !('IntersectionObserver' in window)) return;

		var groups = [];

		if (chat) {
			var l = chat.querySelector('.chat_L'), r = chat.querySelector('.chat_R');
			var lp = chat.querySelector('.chat_L_p'), rp = chat.querySelector('.chat_R_p');
			if (l && r && lp && rp) {
				var qa = [makeItem(l, l, lp), makeItem(r, r, rp)];
				groups.push({ el: chat, threshold: 0.45, items: qa });
			}
		}
		if (last) {
			var b = last.querySelector(':scope > div'), p = last.querySelector('p');
			if (b && p) {
				var lastItem = makeItem(last, b, p);
				lastItem.measure = b;
				groups.push({ el: last, threshold: 0.6, items: [lastItem] });
			}
		}
		if (!groups.length) return;

		document.documentElement.classList.add('typing-ready');

		function fitAll() { groups.forEach(function (g) { g.items.forEach(fit); }); }
		fitAll();
		if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);   // 웹폰트 로드 후 다시 측정

		var t = null;
		window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(fitAll, 150); });

		groups.forEach(function (g) { observeOnce(g.el, g.threshold, function () { play(g.items); }); });
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
