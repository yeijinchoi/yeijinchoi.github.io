/**
 * 3D Interactive Mascot Character (Park Park 'ㅂ' Silhouette)
 * - Exact silhouette and cute character eyes from Ye-jin's Pickle assistant
 * - Eyes follow the cursor with smooth dampening
 * - Whole character 3D tilts and breathes gently
 * - Pure signature blue (#5383F6), ZERO purple, ZERO click distortion
 */
(function() {
	function initCharacterMascot() {
		var stage = document.getElementById('blobStage');
		var svg = document.getElementById('blobCore');
		var leftEye = document.getElementById('leftEye');
		var rightEye = document.getElementById('rightEye');
		if (!stage || !svg) return;

		var tiltTargetX = 0;
		var tiltTargetY = 0;
		var tiltCurX = 0;
		var tiltCurY = 0;

		var eyeTargetX = 0;
		var eyeTargetY = 0;
		var eyeCurX = 0;
		var eyeCurY = 0;

		var heroWrap = document.querySelector('.visualwrap') || stage;

		function updateMouse(e) {
			var rect = svg.getBoundingClientRect();
			var centerX = rect.left + rect.width / 2;
			var centerY = rect.top + rect.height / 2;
			var dx = (e.clientX - centerX) / (window.innerWidth / 2);
			var dy = (e.clientY - centerY) / (window.innerHeight / 2);

			dx = Math.max(-1.2, Math.min(1.2, dx));
			dy = Math.max(-1.2, Math.min(1.2, dy));

			// 3D tilt
			tiltTargetY = dx * 14;
			tiltTargetX = -dy * 14;

			// Eyes track cursor
			eyeTargetX = dx * 8;
			eyeTargetY = dy * 7;
		}

		window.addEventListener('mousemove', updateMouse);

		heroWrap.addEventListener('mouseleave', function() {
			tiltTargetX = 0;
			tiltTargetY = 0;
			eyeTargetX = 0;
			eyeTargetY = 0;
		});

		var time = 0;
		function render() {
			time += 0.025;

			// Gentle breathing float
			var idleY = Math.sin(time) * 4;
			var idleScale = 1 + Math.sin(time * 0.8) * 0.01;

			// Lerp physics
			tiltCurX += (tiltTargetX - tiltCurX) * 0.08;
			tiltCurY += (tiltTargetY - tiltCurY) * 0.08;
			eyeCurX += (eyeTargetX - eyeCurX) * 0.12;
			eyeCurY += (eyeTargetY - eyeCurY) * 0.12;

			svg.style.transform = 'perspective(900px) translateY(' + idleY.toFixed(2) + 'px) rotateX(' + tiltCurX.toFixed(2) + 'deg) rotateY(' + tiltCurY.toFixed(2) + 'deg) scale(' + idleScale.toFixed(3) + ')';

			if (leftEye && rightEye) {
				var eyeTransform = 'translate3d(' + eyeCurX.toFixed(1) + 'px, ' + eyeCurY.toFixed(1) + 'px, 0)';
				leftEye.style.transform = eyeTransform;
				rightEye.style.transform = eyeTransform;
			}

			requestAnimationFrame(render);
		}

		requestAnimationFrame(render);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initCharacterMascot);
	} else {
		initCharacterMascot();
	}
})();
