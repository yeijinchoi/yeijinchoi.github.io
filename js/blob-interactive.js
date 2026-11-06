/**
 * 3D Interactive Slime Graphic
 * - 3D Perspective Body Tilt tracking mouse
 * - Independent Eye Parallax Gaze
 * - Natural Eye Blinking on randomized timer
 * - Happy Smiling Reaction (^ ^) on hover / click
 */
(function() {
	function initSlimePhysics() {
		var stage = document.getElementById('blobStage');
		var svg = document.getElementById('blobCore');
		var slimeBody = document.getElementById('slimeBody');
		var slimeFace = document.getElementById('slimeFace');
		var faceNormal = document.getElementById('faceNormal');
		var faceSmile = document.getElementById('faceSmile');
		var leftEye = document.getElementById('leftEye');
		var rightEye = document.getElementById('rightEye');
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
		var smileTimer = null;
		var isBlinking = false;
		var blinkScale = 1;

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

		// Hover directly on slime -> SMILE!
		stage.addEventListener('mouseenter', function() {
			triggerSmile(true);
		});

		stage.addEventListener('mouseleave', function() {
			triggerSmile(false);
		});

		// Click on slime -> Happy bounce & smile
		stage.addEventListener('click', function() {
			triggerSmile(true);
			if (smileTimer) clearTimeout(smileTimer);
			smileTimer = setTimeout(function() {
				triggerSmile(false);
			}, 2200);
		});

		function triggerSmile(smile) {
			isSmiling = smile;
			if (faceNormal && faceSmile) {
				faceNormal.style.transition = 'opacity 0.22s ease';
				faceSmile.style.transition = 'opacity 0.22s ease';
				if (smile) {
					faceNormal.style.opacity = '0';
					faceSmile.style.opacity = '1';
				} else {
					faceNormal.style.opacity = '1';
					faceSmile.style.opacity = '0';
				}
			}
		}

		// Natural Blinking Loop
		function scheduleBlink() {
			var delay = 2800 + Math.random() * 3200;
			setTimeout(function() {
				if (!isSmiling) {
					doBlink(function() {
						// 25% chance of an immediate double blink!
						if (Math.random() < 0.25) {
							setTimeout(function() {
								if (!isSmiling) doBlink(scheduleBlink);
								else scheduleBlink();
							}, 160);
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
				var elapsed = now - startTime;
				var progress = elapsed / duration;
				if (progress < 0.5) {
					blinkScale = 1 - (progress * 2) * 0.92;
				} else if (progress < 1) {
					blinkScale = 0.08 + ((progress - 0.5) * 2) * 0.92;
				} else {
					blinkScale = 1;
					isBlinking = false;
					if (leftEye && rightEye) {
						leftEye.setAttribute('transform', 'scale(1, 1)');
						rightEye.setAttribute('transform', 'scale(1, 1)');
					}
					if (callback) callback();
					return;
				}

				if (leftEye && rightEye) {
					leftEye.setAttribute('transform', 'scale(1, ' + blinkScale.toFixed(2) + ')');
					rightEye.setAttribute('transform', 'scale(1, ' + blinkScale.toFixed(2) + ')');
				}
				requestAnimationFrame(animateBlink);
			}

			requestAnimationFrame(animateBlink);
		}

		scheduleBlink();

		// Main Render Loop
		var time = 0;
		function render() {
			time += 0.025;

			var idleY = Math.sin(time) * 5;
			var idleScale = 1 + Math.sin(time * 0.8) * 0.012;

			tiltCurX += (tiltTargetX - tiltCurX) * 0.08;
			tiltCurY += (tiltTargetY - tiltCurY) * 0.08;

			eyeCurX += (eyeTargetX - eyeCurX) * 0.12;
			eyeCurY += (eyeTargetY - eyeCurY) * 0.12;

			// Slime body 3D perspective
			var bodyScaleY = isSmiling ? 0.96 : 1;
			var bodyScaleX = isSmiling ? 1.04 : 1;
			svg.style.transform = 'perspective(900px) translateY(' + idleY.toFixed(2) + 'px) rotateX(' + tiltCurX.toFixed(2) + 'deg) rotateY(' + tiltCurY.toFixed(2) + 'deg) scale(' + (idleScale * bodyScaleX).toFixed(3) + ', ' + (idleScale * bodyScaleY).toFixed(3) + ')';

			// Independent Face Parallax
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
