/**
 * 3D Interactive Slime Graphic
 * - Real-time 3D tilt tracking mouse cursor
 * - Gentle organic breathing wave
 * - Pure fluid physics
 */
(function() {
	function initSlimeGraphic() {
		var stage = document.getElementById('blobStage');
		var core = document.getElementById('blobCore');
		if (!stage || !core) return;

		var tiltTargetX = 0;
		var tiltTargetY = 0;
		var tiltCurX = 0;
		var tiltCurY = 0;

		var heroWrap = document.querySelector('.visualwrap') || stage;

		function updateMouse(e) {
			var rect = core.getBoundingClientRect();
			var centerX = rect.left + rect.width / 2;
			var centerY = rect.top + rect.height / 2;
			var dx = (e.clientX - centerX) / (window.innerWidth / 2);
			var dy = (e.clientY - centerY) / (window.innerHeight / 2);

			dx = Math.max(-1.2, Math.min(1.2, dx));
			dy = Math.max(-1.2, Math.min(1.2, dy));

			tiltTargetY = dx * 14;
			tiltTargetX = -dy * 14;
		}

		window.addEventListener('mousemove', updateMouse);

		heroWrap.addEventListener('mouseleave', function() {
			tiltTargetX = 0;
			tiltTargetY = 0;
		});

		var time = 0;
		function render() {
			time += 0.025;

			var idleY = Math.sin(time) * 5;
			var idleScale = 1 + Math.sin(time * 0.8) * 0.012;

			tiltCurX += (tiltTargetX - tiltCurX) * 0.08;
			tiltCurY += (tiltTargetY - tiltCurY) * 0.08;

			core.style.transform = 'perspective(900px) translateY(' + idleY.toFixed(2) + 'px) rotateX(' + tiltCurX.toFixed(2) + 'deg) rotateY(' + tiltCurY.toFixed(2) + 'deg) scale(' + idleScale.toFixed(3) + ')';

			requestAnimationFrame(render);
		}

		requestAnimationFrame(render);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initSlimeGraphic);
	} else {
		initSlimeGraphic();
	}
})();
