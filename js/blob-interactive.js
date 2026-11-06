/**
 * 3D Interactive Liquid Water Droplet (Fluid Surface Tension Physics)
 * - Exact silhouette from Ye-jin's organic puddle droplet sketch (smooth C2 curve)
 * - Evades and morphs away from cursor with fluid surface tension spring physics
 * - Gentle organic breathing wave when idle
 * - NO click action (pure fluid hover physics)
 */
(function() {
	function initFluidDroplet() {
		var stage = document.getElementById('blobStage');
		var svg = document.getElementById('blobCore');
		if (!stage || !svg) return;

		var mouseIn = false;
		var tiltTargetX = 0;
		var tiltTargetY = 0;
		var tiltCurX = 0;
		var tiltCurY = 0;

		var repelTargetX = 0;
		var repelTargetY = 0;
		var repelCurX = 0;
		var repelCurY = 0;

		var squishTargetX = 1;
		var squishTargetY = 1;
		var squishCurX = 1;
		var squishCurY = 1;

		var heroWrap = document.querySelector('.visualwrap') || stage;

		function updateMouse(e) {
			var rect = svg.getBoundingClientRect();
			var centerX = rect.left + rect.width / 2;
			var centerY = rect.top + rect.height / 2;
			var dx = (e.clientX - centerX) / (rect.width / 2);
			var dy = (e.clientY - centerY) / (rect.height / 2);

			dx = Math.max(-1.3, Math.min(1.3, dx));
			dy = Math.max(-1.3, Math.min(1.3, dy));

			// Whole drop tilts and evades away from cursor
			tiltTargetY = dx * 12;
			tiltTargetX = -dy * 12;
			repelTargetX = -dx * 22; // smooth fluid evasion
			repelTargetY = -dy * 20;

			// Surface tension elastic squish (volume preservation)
			squishTargetX = 1 - Math.abs(dx) * 0.08 + Math.abs(dy) * 0.04;
			squishTargetY = 1 + Math.abs(dx) * 0.05 - Math.abs(dy) * 0.06;
		}

		heroWrap.addEventListener('mousemove', function(e) {
			mouseIn = true;
			updateMouse(e);
		});

		heroWrap.addEventListener('mouseenter', function(e) {
			mouseIn = true;
			updateMouse(e);
		});

		heroWrap.addEventListener('mouseleave', function() {
			mouseIn = false;
			tiltTargetX = 0;
			tiltTargetY = 0;
			repelTargetX = 0;
			repelTargetY = 0;
			squishTargetX = 1;
			squishTargetY = 1;
		});

		// Render animation loop with spring lerp
		var time = 0;
		function render() {
			time += 0.02;

			// Gentle idle wave
			var idleFloatY = Math.sin(time) * 4;
			var idleBreath = Math.sin(time * 0.8) * 0.012;

			// Smooth lerp physics
			tiltCurX += (tiltTargetX - tiltCurX) * 0.08;
			tiltCurY += (tiltTargetY - tiltCurY) * 0.08;
			repelCurX += (repelTargetX - repelCurX) * 0.08;
			repelCurY += (repelTargetY - repelCurY) * 0.08;
			squishCurX += (squishTargetX - squishCurX) * 0.08;
			squishCurY += (squishTargetY - squishCurY) * 0.08;

			var finalY = repelCurY + idleFloatY;
			var finalSx = (squishCurX + idleBreath).toFixed(3);
			var finalSy = (squishCurY - idleBreath).toFixed(3);

			svg.style.transform = 'perspective(900px) translate3d(' + repelCurX.toFixed(2) + 'px, ' + finalY.toFixed(2) + 'px, 0) rotateX(' + tiltCurX.toFixed(2) + 'deg) rotateY(' + tiltCurY.toFixed(2) + 'deg) scale3d(' + finalSx + ', ' + finalSy + ', 1)';

			requestAnimationFrame(render);
		}

		requestAnimationFrame(render);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initFluidDroplet);
	} else {
		initFluidDroplet();
	}
})();
