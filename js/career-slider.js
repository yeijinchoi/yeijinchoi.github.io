/* ==========================================================
   Career Section Card Slider (2026-11-05 시안 반영)
   - 데스크톱(1025px+): 뷰당 2개 카드, 모바일/태블릿: 뷰당 1개 카드
   - 좌/우 버튼 + 하단 인디케이터 + 터치 스와이프
   - 외부 의존성 없음 (jQuery 3.2.1 사용)
   ========================================================== */
$(function () {
	var $track = $('.career_track');
	if (!$track.length) { return; }

	var $cards = $track.children('.career_card');
	var $prev = $('.career_prev');
	var $next = $('.career_next');
	var $dotsWrap = $('.career_dots');
	var index = 0;
	var lastMax = null;

	function visibleCount() {
		return window.matchMedia('(min-width: 1025px)').matches ? 2 : 1;
	}

	function maxIndex() {
		return Math.max(0, $cards.length - visibleCount());
	}

	/* 카드 한 칸 이동 폭 = (카드 너비 + gap) */
	function step() {
		if ($cards.length < 2) {
			return $cards.outerWidth(true) || 0;
		}
		return $cards.eq(1).position().left - $cards.eq(0).position().left;
	}

	function buildDots() {
		$dotsWrap.empty();
		for (var i = 0; i <= maxIndex(); i++) {
			$('<button>', {
				type: 'button',
				'class': 'career_dot',
				'aria-label': (i + 1) + '번째 경력 위치'
			})
				.on('click', { i: i }, function (e) {
					index = e.data.i;
					update();
				})
				.appendTo($dotsWrap);
		}
	}

	function update(animate) {
		var m = maxIndex();
		index = Math.min(Math.max(index, 0), m);

		if (animate === false) {
			$track.css('transition', 'none');
		}
		$track.css('transform', 'translateX(' + (-(index * step())) + 'px)');
		if (animate === false) {
			$track[0].offsetHeight; /* reflow 후 transition 복원 */
			$track.css('transition', '');
		}

		$('.career_dot').removeClass('active').eq(index).addClass('active');
		$prev.prop('disabled', index === 0);
		$next.prop('disabled', index === m);
	}

	$prev.on('click', function () { index--; update(); });
	$next.on('click', function () { index++; update(); });

	/* 터치 스와이프 (모바일) */
	var startX = null;
	$track.on('touchstart', function (e) {
		startX = e.originalEvent.touches[0].clientX;
	});
	$track.on('touchend', function (e) {
		if (startX === null) { return; }
		var dx = e.originalEvent.changedTouches[0].clientX - startX;
		if (dx < -40) { index++; }
		else if (dx > 40) { index--; }
		startX = null;
		update();
	});

	/* 리사이즈: 브레이크포인트 전환 시 인디케이터 재구성 + 위치 보정 */
	$(window).on('resize', function () {
		if (maxIndex() !== lastMax) {
			lastMax = maxIndex();
			buildDots();
		}
		update(false);
	});

	lastMax = maxIndex();
	buildDots();
	update(false);
});
