/**
 * 3D Interactive Slime Graphic
 * - 3D Perspective Body Tilt tracking mouse
 * - Independent Eye Parallax Gaze
 * - Natural Eye Blinking on randomized timer
 * - Soft organic eye-closing into a gentle smile (^ ^) on hover / click
 */
(function() {
	function initSlimePhysics() {
		var stage = document.getElementById('blobStage');
		var svg = document.getElementById('blobCore');
		var slimeFace = document.getElementById('slimeFace');
		var faceNormal = document.getElementById('faceNormal');
		var faceSmile = document.getElementById('faceSmile');
		var leftEye = document.getElementById('leftEye');
		var rightEye = document.getElementById('rightEye');
		var leftSmile = document.getElementById('leftSmile');
		var rightSmile = document.getElementById('rightSmile');
		if (!stage || !svg || !slimeFace) return;

		var tiltTargetX = 0;
		var tiltTargetY = 0;
		var tiltCurX = 0;
		var tiltCurY = 0;

		var eyeTargetX = 0;
		var eyeTargetY = 0;
		var eyeCurX = 0;
		var eyeCurY = 0;

		var isSmiling = false;
		var smileTarget = 0;
		var smileProgress = 0;
		var smileTimer = null;

		var isBlinking = false;
		var blinkProgress = 1; // 1 = fully open, 0.08 = closed

		var heroWrap = document.querySelector('.visualwrap') || stage;

		// Mouse tracking for 3D tilt and eye gaze
		function updateMouse(e) {
			var rect = svg.getBoundingClientRect();
			var centerX = rect.left + rect.width / 2;
			var centerY = rect.top + rect.height / 2;
			var dx = (e.clientX - centerX) / (window.innerWidth / 2);
			var dy = (e.clientY - centerY) / (window.innerHeight / 2);

			dx = Math.max(-1.2, Math.min(1.2, dx));
			dy = Math.max(-1.2, Math.min(1.2, dy));

			tiltTargetY = dx * 14;
			tiltTargetX = -dy * 14;

			eyeTargetX = dx * 14;
			eyeTargetY = dy * 10;
		}

		window.addEventListener('mousemove', updateMouse);

		heroWrap.addEventListener('mouseleave', function() {
			tiltTargetX = 0;
			tiltTargetY = 0;
			eyeTargetX = 0;
			eyeTargetY = 0;
		});

		// Hover directly on slime -> 자연스럽게 눈 감으며 미소!
		stage.addEventListener('mouseenter', function() {
			setSmile(true);
		});

		stage.addEventListener('mouseleave', function() {
			setSmile(false);
		});

		// Click on slime -> 2.5초간 기분 좋게 웃기
		stage.addEventListener('click', function() {
			setSmile(true);
			if (smileTimer) clearTimeout(smileTimer);
			smileTimer = setTimeout(function() {
				setSmile(false);
			}, 2500);
		});

		function setSmile(val) {
			isSmiling = val;
			smileTarget = val ? 1 : 0;
		}

		// Natural Blinking Loop (평소 눈 깜빡임)
		function scheduleBlink() {
			var delay = 2600 + Math.random() * 3200;
			setTimeout(function() {
				if (!isSmiling && smileProgress < 0.1) {
					doBlink(function() {
						// 25% 확률로 귀여운 연속 깜빡임(더블 블링크)
						if (Math.random() < 0.25) {
							setTimeout(function() {
								if (!isSmiling && smileProgress < 0.1) doBlink(scheduleBlink);
								else scheduleBlink();
							}, 150);
						} else {
							scheduleBlink();
						}
					});
				} else {
					scheduleBlink();
				}
			}, delay);
		}

		function doBlink(callback) {
			isBlinking = true;
			var startTime = performance.now();
			var duration = 150; // ms

			function animateBlink(now) {
				if (isSmiling || smileProgress > 0.1) {
					isBlinking = false;
					blinkProgress = 1;
					if (callback) callback();
					return;
				}

				var elapsed = now - startTime;
				var p = elapsed / duration;
				if (p < 0.5) {
					blinkProgress = 1 - (p * 2) * 0.92;
				} else if (p < 1) {
					blinkProgress = 0.08 + ((p - 0.5) * 2) * 0.92;
				} else {
					blinkProgress = 1;
					isBlinking = false;
					if (callback) callback();
					return;
				}
				requestAnimationFrame(animateBlink);
			}

			requestAnimationFrame(animateBlink);
		}

		scheduleBlink();

		// Main Physics & Render Loop
		var time = 0;
		function render() {
			time += 0.025;

			var idleY = Math.sin(time) * 5;
			var idleScale = 1 + Math.sin(time * 0.8) * 0.012;

			tiltCurX += (tiltTargetX - tiltCurX) * 0.08;
			tiltCurY += (tiltTargetY - tiltCurY) * 0.08;

			eyeCurX += (eyeTargetX - eyeCurX) * 0.12;
			eyeCurY += (eyeTargetY - eyeCurY) * 0.12;

			// 자연스럽게 눈 감으며 웃는 스마일 모프 보간 (0 -> 1 또는 1 -> 0)
			smileProgress += (smileTarget - smileProgress) * 0.14;

			var normScaleY, normOpacity, smileScaleY, smileOpacity;
			var sp = smileProgress;

			if (sp <= 0.45) {
				// 1단계: 눈이 부드럽게 감기며 가늘어짐
				normScaleY = 1.0 - (sp / 0.45) * 0.92;
				normOpacity = 1.0;
				smileScaleY = 0.25;
				smileOpacity = 0.0;
			} else if (sp <= 0.55) {
				// 2단계: 완전히 감긴 찰나, 감긴 눈에서 반달눈으로 교체
				var mid = (sp - 0.45) / 0.10;
				normScaleY = 0.08;
				normOpacity = Math.max(0, 1.0 - mid);
				smileScaleY = 0.25 + mid * 0.25;
				smileOpacity = Math.min(1, mid);
			} else {
				// 3단계: 반달눈이 기분 좋게 둥글려지며 방긋 웃음
				var rest = (sp - 0.55) / 0.45;
				normScaleY = 0.08;
				normOpacity = 0.0;
				smileScaleY = 0.5 + rest * 0.5;
				smileOpacity = 1.0;
			}

			// 평소 깜빡임과 합성
			if (!isSmiling && sp < 0.1) {
				normScaleY *= blinkProgress;
			}

			// DOM 반영
			if (leftEye && rightEye) {
				leftEye.setAttribute('transform', 'scale(1, ' + normScaleY.toFixed(3) + ')');
				rightEye.setAttribute('transform', 'scale(1, ' + normScaleY.toFixed(3) + ')');
			}
			if (faceNormal) {
				faceNormal.setAttribute('opacity', normOpacity.toFixed(2));
			}

			if (leftSmile && rightSmile) {
				leftSmile.setAttribute('transform', 'scale(1, ' + smileScaleY.toFixed(3) + ')');
				rightSmile.setAttribute('transform', 'scale(1, ' + smileScaleY.toFixed(3) + ')');
			}
			if (faceSmile) {
				faceSmile.setAttribute('opacity', smileOpacity.toFixed(2));
			}

			// 슬라임 몸체: 웃을 때 볼이 살짝 퐁신하게 찌부되는 푸딩 리액션
			var bodyScaleY = 1 - (sp * 0.04);
			var bodyScaleX = 1 + (sp * 0.04);
			svg.style.transform = 'perspective(900px) translateY(' + idleY.toFixed(2) + 'px) rotateX(' + tiltCurX.toFixed(2) + 'deg) rotateY(' + tiltCurY.toFixed(2) + 'deg) scale(' + (idleScale * bodyScaleX).toFixed(3) + ', ' + (idleScale * bodyScaleY).toFixed(3) + ')';

			// 시선 패럴랙스
			slimeFace.setAttribute('transform', 'translate(' + eyeCurX.toFixed(2) + ', ' + eyeCurY.toFixed(2) + ')');

			requestAnimationFrame(render);
		}

		requestAnimationFrame(render);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initSlimePhysics);
	} else {
		initSlimePhysics();
	}
})();
