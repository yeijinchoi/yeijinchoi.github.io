/**
 * 3D Interactive Liquid Water Droplet (Fluid Surface Tension Physics)
 * - Exact silhouette from Ye-jin's organic puddle droplet sketch
 * - Evades and morphs away from the cursor with surface tension spring physics
 * - Gentle organic breathing wave when idle
 * - NO click action (pure fluid hover physics)
 */
(function() {
	function initFluidDroplet() {
		var stage = document.getElementById('blobStage');
		var svg = document.getElementById('blobCore');
		var bodyPath = document.querySelector('.fluid_main_body');
		var sheenPath = document.querySelector('.fluid_sheen');
		if (!stage || !svg || !bodyPath) return;

		// 16 base vertices from Ye-jin's sketch (viewBox: 0 0 400 280)
		var basePoints = [
			{ x: 340.1, y: 26.7 },
			{ x: 297.3, y: 10.0 },
			{ x: 251.4, y: 12.6 },
			{ x: 226.0, y: 25.0 },
			{ x: 101.7, y: 132.5 },
			{ x: 24.3,  y: 168.6 },
			{ x: 10.0,  y: 198.6 },
			{ x: 23.2,  y: 250.6 },
			{ x: 53.8,  y: 269.1 },
			{ x: 72.1,  y: 269.1 },
			{ x: 172.0, y: 223.3 },
			{ x: 307.5, y: 228.6 },
			{ x: 365.5, y: 200.4 },
			{ x: 389.0, y: 163.4 },
			{ x: 388.0, y: 131.6 },
			{ x: 356.4, y: 91.1 }
		];

		// Dynamic particle points with spring velocity
		var points = basePoints.map(function(p) {
			return {
				ox: p.x,
				oy: p.y,
				x: p.x,
				y: p.y,
				vx: 0,
				vy: 0
			};
		});

		var mouseIn = false;
		var mouseSvgX = -1000;
		var mouseSvgY = -1000;
		var tiltTargetX = 0;
		var tiltTargetY = 0;
		var tiltCurX = 0;
		var tiltCurY = 0;
		var repelTargetX = 0;
		var repelTargetY = 0;
		var repelCurX = 0;
		var repelCurY = 0;

		var heroWrap = document.querySelector('.visualwrap') || stage;

		function updateMouse(e) {
			var rect = svg.getBoundingClientRect();
			var scaleX = 400 / rect.width;
			var scaleY = 280 / rect.height;

			mouseSvgX = (e.clientX - rect.left) * scaleX;
			mouseSvgY = (e.clientY - rect.top) * scaleY;

			// Normalized delta from center (-1 to 1)
			var centerX = rect.left + rect.width / 2;
			var centerY = rect.top + rect.height / 2;
			var dx = (e.clientX - centerX) / (rect.width / 2);
			var dy = (e.clientY - centerY) / (rect.height / 2);

			dx = Math.max(-1.2, Math.min(1.2, dx));
			dy = Math.max(-1.2, Math.min(1.2, dy));

			// Whole drop tilts and evades slightly away from cursor
			tiltTargetY = dx * 14;
			tiltTargetX = -dy * 14;
			repelTargetX = -dx * 18; // evades away
			repelTargetY = -dy * 18;
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
			mouseSvgX = -1000;
			mouseSvgY = -1000;
			tiltTargetX = 0;
			tiltTargetY = 0;
			repelTargetX = 0;
			repelTargetY = 0;
		});

		// Build smooth closed Catmull-Rom Bézier path
		function pointsToPath(pts) {
			var len = pts.length;
			var d = [];
			for (var i = 0; i < len; i++) {
				var p0 = pts[(i - 1 + len) % len];
				var p1 = pts[i];
				var p2 = pts[(i + 1) % len];
				var p3 = pts[(i + 2) % len];

				var c1x = p1.x + (p2.x - p0.x) / 6.0;
				var c1y = p1.y + (p2.y - p0.y) / 6.0;
				var c2x = p2.x - (p3.x - p1.x) / 6.0;
				var c2y = p2.y - (p3.y - p1.y) / 6.0;

				if (i === 0) {
					d.push('M ' + p1.x.toFixed(1) + ' ' + p1.y.toFixed(1));
				}
				d.push('C ' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ', ' + c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ', ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1));
			}
			d.push('Z');
			return d.join(' ');
		}

		var time = 0;
		var spring = 0.085;
		var damping = 0.82;
		var repelRadius = 130;
		var repelStrength = 42;

		function animate() {
			time += 0.025;

			// Update vertices with spring physics & cursor evasion
			for (var i = 0; i < points.length; i++) {
				var pt = points[i];

				// Gentle organic resting wave
				var idleWaveX = Math.sin(time + i * 0.45) * 3.5;
				var idleWaveY = Math.cos(time * 0.9 + i * 0.4) * 3.5;

				var tx = pt.ox + idleWaveX;
				var ty = pt.oy + idleWaveY;

				// Cursor evasion (surface tension repels away from mouse)
				if (mouseIn) {
					var distDx = pt.ox - mouseSvgX;
					var distDy = pt.oy - mouseSvgY;
					var dist = Math.sqrt(distDx * distDx + distDy * distDy);

					if (dist < repelRadius && dist > 0.01) {
						var factor = (1.0 - dist / repelRadius);
						// Push vertex away from cursor
						tx += (distDx / dist) * factor * repelStrength;
						ty += (distDy / dist) * factor * repelStrength;
					}
				}

				// Spring physics
				var ax = (tx - pt.x) * spring;
				var ay = (ty - pt.y) * spring;
				pt.vx = (pt.vx + ax) * damping;
				pt.vy = (pt.vy + ay) * damping;
				pt.x += pt.vx;
				pt.y += pt.vy;
			}

			// Render deformed SVG path
			var pathD = pointsToPath(points);
			bodyPath.setAttribute('d', pathD);

			// Lerp whole stage tilt & evasion
			tiltCurX += (tiltTargetX - tiltCurX) * 0.08;
			tiltCurY += (tiltTargetY - tiltCurY) * 0.08;
			repelCurX += (repelTargetX - repelCurX) * 0.08;
			repelCurY += (repelTargetY - repelCurY) * 0.08;

			svg.style.transform = 'perspective(900px) translate3d(' + repelCurX.toFixed(2) + 'px, ' + repelCurY.toFixed(2) + 'px, 0) rotateX(' + tiltCurX.toFixed(2) + 'deg) rotateY(' + tiltCurY.toFixed(2) + 'deg)';

			requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initFluidDroplet);
	} else {
		initFluidDroplet();
	}
})();
