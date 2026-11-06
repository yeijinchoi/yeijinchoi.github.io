/**
 * chat-typing.js
 * 본문 채팅 말풍선(마음가짐 Q&A, 마지막 다짐)이 스크롤로 화면에 들어오면
 * 말풍선이 톡 떠오르고 글자가 한 글자씩 타이핑됩니다.
 *  - 마음가짐 영역: 질문(회색) 타이핑 -> 답변(파랑) 타이핑 순서로 이어짐
 *  - 한 번 재생되면 다시 반복하지 않음 / 동작 줄이기 설정이면 효과 없이 바로 표시
 * 말풍선 크기는 글자 전체(보이지 않는 ghost)로 미리 잡혀 있어서 타이핑 중 레이아웃이 흔들리지 않습니다.
 */
(function () {
	'use strict';

	var TYPE_MS = 34;

	function prepare(p) {
		var full = p.textContent.replace(/\s+/g, ' ').trim();
		p.setAttribute('aria-label', full);
		p.innerHTML = '<span class="ct_typed" aria-hidden="true"></span><span class="ct_ghost" aria-hidden="true">' + escapeHtml(full) + '</span>';
		return { p: p, full: full };
	}

	function escapeHtml(s) {
		return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function type(item, done) {
		var typed = item.p.querySelector('.ct_typed');
		var ghost = item.p.querySelector('.ct_ghost');
		var i = 0;
		(function tick() {
			i++;
			typed.textContent = item.full.slice(0, i);
			ghost.textContent = item.full.slice(i);
			if (i >= item.full.length) { if (done) done(); return; }
			var ch = item.full.charAt(i - 1);
			setTimeout(tick, TYPE_MS + (/[.,?]/.test(ch) ? 140 : 0));
		})();
	}

	function show(bubble) { bubble.classList.add('is-show'); }

	function play(steps) {
		// steps: [{bubble, item}, ...] 순서대로 말풍선 등장 -> 타이핑
		(function next(n) {
			if (n >= steps.length) return;
			show(steps[n].bubble);
			setTimeout(function () {
				type(steps[n].item, function () { setTimeout(function () { next(n + 1); }, 350); });
			}, 380);
		})(0);
	}

	function observeOnce(el, threshold, cb) {
		new IntersectionObserver(function (entries, io) {
			if (entries[0].isIntersecting) { io.disconnect(); cb(); }
		}, { threshold: threshold }).observe(el);
	}

	function init() {
		var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce || !('IntersectionObserver' in window)) return;

		var chat = document.querySelector('.chat_section');
		var last = document.querySelector('.last_wrapper');
		if (!chat && !last) return;

		document.documentElement.classList.add('typing-ready');

		if (chat) {
			var l = chat.querySelector('.chat_L'), r = chat.querySelector('.chat_R');
			var lp = chat.querySelector('.chat_L_p'), rp = chat.querySelector('.chat_R_p');
			if (l && r && lp && rp) {
				var steps = [{ bubble: l, item: prepare(lp) }, { bubble: r, item: prepare(rp) }];
				observeOnce(chat, 0.45, function () { play(steps); });
			}
		}
		if (last) {
			var b = last.querySelector('div'), p = last.querySelector('p');
			if (b && p) {
				var lastSteps = [{ bubble: b, item: prepare(p) }];
				observeOnce(last, 0.6, function () { play(lastSteps); });
			}
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
