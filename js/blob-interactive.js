/**
 * 3D Interactive Slime Graphic (SVG Multi-layer Physics)
 * - Body: 3D perspective tilt + organic breathing float
 * - Eyes: Independent 2D parallax gaze tracking that moves with and reacts to the cursor
 * - Pure fluid SVG layers, zero raster dependency
 */
(function() {
	function initSlimePhysics() {
		var stage = document.getElementById('blobStage');
		var svg = document.getElementById('blobCore');
		var slimeBody = document.getElementById('slimeBody');
		var slimeEyes = document.getElementById('slimeEyes');
		if (!stage || !svg || !slimeEyes) return;

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

			// 3D Body Tilt
			tiltTargetY = dx * 15;
			tiltTargetX = -dy * 15;

			// Independent Eye Parallax Gaze
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

		var time = 0;
		function render() {
			time += 0.025;

			var idleY = Math.sin(time) * 5;
			var idleScale = 1 + Math.sin(time * 0.8) * 0.012;

			// Smooth damping physics
			tiltCurX += (tiltTargetX - tiltCurX) * 0.08;
			tiltCurY += (tiltTargetY - tiltCurY) * 0.08;

			eyeCurX += (eyeTargetX - eyeCurX) * 0.12;
			eyeCurY += (eyeTargetY - eyeCurY) * 0.12;

			// Apply 3D perspective to whole SVG
			svg.style.transform = 'perspective(900px) translateY(' + idleY.toFixed(2) + 'px) rotateX(' + tiltCurX.toFixed(2) + 'deg) rotateY(' + tiltCurY.toFixed(2) + 'deg) scale(' + idleScale.toFixed(3) + ')';

			// Eyes move independently on top of the 3D surface!
			slimeEyes.setAttribute('transform', 'translate(' + eyeCurX.toFixed(2) + ', ' + eyeCurY.toFixed(2) + ')');

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
