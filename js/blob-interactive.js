/**
 * 3D Interactive Fluid Character / Art Graphic
 * - Smooth rounded dome head + chubby droplet body in signature blue (#5383F6)
 * - White stylized glints / eyes with subtle mouse tracking
 * - 3D perspective tilt tracking cursor
 * - Gentle organic breathing wave
 * - NO click distortion
 */
(function() {
	function initFluidOrb() {
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

			tiltTargetY = dx * 14;
			tiltTargetX = -dy * 14;

			eyeTargetX = dx * 7;
			eyeTargetY = dy * 5;
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

			var idleY = Math.sin(time) * 4;
			var idleScale = 1 + Math.sin(time * 0.8) * 0.012;

			tiltCurX += (tiltTargetX - tiltCurX) * 0.08;
			tiltCurY += (tiltTargetY - tiltCurY) * 0.08;

			eyeCurX += (eyeTargetX - eyeCurX) * 0.1;
			eyeCurY += (eyeTargetY - eyeCurY) * 0.1;

			svg.style.transform = 'perspective(900px) translateY(' + idleY.toFixed(2) + 'px) rotateX(' + tiltCurX.toFixed(2) + 'deg) rotateY(' + tiltCurY.toFixed(2) + 'deg) scale(' + idleScale.toFixed(3) + ')';

			if (leftEye && rightEye) {
				leftEye.style.transform = 'translate(' + eyeCurX.toFixed(2) + 'px, ' + eyeCurY.toFixed(2) + 'px)';
				rightEye.style.transform = 'translate(' + eyeCurX.toFixed(2) + 'px, ' + eyeCurY.toFixed(2) + 'px)';
			}

			requestAnimationFrame(render);
		}

		requestAnimationFrame(render);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initFluidOrb);
	} else {
		initFluidOrb();
	}
})();
