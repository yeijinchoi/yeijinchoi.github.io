/**
 * 3D Interactive Morphing Fluid Blob
 * - Springy 3D tilt tracking cursor
 * - Dynamic specular light reflection
 * - Jelly bounce physics on click
 */
(function() {
	function initBlob() {
		var stage = document.getElementById('blobStage');
		var blob = document.getElementById('blobCore');
		if (!stage || !blob) return;

		var rect = stage.getBoundingClientRect();
		var targetRotateX = 0;
		var targetRotateY = 0;
		var currentRotateX = 0;
		var currentRotateY = 0;
		var targetScale = 1;
		var currentScale = 1;
		var isHovered = false;
		var isClicking = false;

		function updateRect() {
			rect = stage.getBoundingClientRect();
		}
		window.addEventListener('resize', updateRect);
		window.addEventListener('scroll', updateRect, { passive: true });

		var heroWrap = document.querySelector('.visualwrap') || stage;

		heroWrap.addEventListener('mousemove', function(e) {
			var centerX = rect.left + rect.width / 2;
			var centerY = rect.top + rect.height / 2;
			var deltaX = (e.clientX - centerX) / (rect.width * 1.2);
			var deltaY = (e.clientY - centerY) / (rect.height * 1.2);

			// Limit range
			deltaX = Math.max(-1, Math.min(1, deltaX));
			deltaY = Math.max(-1, Math.min(1, deltaY));

			targetRotateY = deltaX * 22; // rotate around Y axis
			targetRotateX = -deltaY * 22; // rotate around X axis

			// Update specular light position
			var specular = blob.querySelector('.blob_specular');
			if (specular) {
				var specX = 35 + deltaX * 25;
				var specY = 30 + deltaY * 25;
				specular.style.background = 'radial-gradient(circle at ' + specX + '% ' + specY + '%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 25%, transparent 60%)';
			}
		});

		heroWrap.addEventListener('mouseenter', function() {
			isHovered = true;
			targetScale = 1.05;
		});

		heroWrap.addEventListener('mouseleave', function() {
			isHovered = false;
			targetRotateX = 0;
			targetRotateY = 0;
			targetScale = 1;
		});

		stage.addEventListener('mousedown', function() {
			isClicking = true;
			targetScale = 0.94;
			blob.classList.add('is-jelly');
			setTimeout(function() {
				blob.classList.remove('is-jelly');
			}, 600);
		});

		window.addEventListener('mouseup', function() {
			if (isClicking) {
				isClicking = false;
				targetScale = isHovered ? 1.05 : 1;
			}
		});

		// Touch interaction for mobile
		stage.addEventListener('touchstart', function(e) {
			targetScale = 1.08;
			blob.classList.add('is-jelly');
		}, { passive: true });

		stage.addEventListener('touchend', function() {
			targetScale = 1;
			setTimeout(function() {
				blob.classList.remove('is-jelly');
			}, 400);
		}, { passive: true });

		// Animation render loop
		function render() {
			// Smooth lerp
			currentRotateX += (targetRotateX - currentRotateX) * 0.1;
			currentRotateY += (targetRotateY - currentRotateY) * 0.1;
			currentScale += (targetScale - currentScale) * 0.1;

			blob.style.transform = 'perspective(900px) rotateX(' + currentRotateX.toFixed(2) + 'deg) rotateY(' + currentRotateY.toFixed(2) + 'deg) scale(' + currentScale.toFixed(3) + ')';

			requestAnimationFrame(render);
		}
		render();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initBlob);
	} else {
		initBlob();
	}
})();
