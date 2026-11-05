$(document).ready(function(){


		function fade() {
		      let animation_height = $(window).innerHeight() * 0.5;
		      let ratio = Math.round((1 / animation_height) * 10000) / 10000;
		      $(".fade").each(function () {
		        let objectTop = $(this).offset().top;
		        let windowBottom = $(window).scrollTop() + $(window).innerHeight();
		        if (objectTop < windowBottom) {
		          if (objectTop < windowBottom - animation_height) {
		            $(this).css({
		              transition: "opacity 0.1s linear",
		              transition: "left 0.1s linear",
		              opacity: 1,
		              left: "0px",
		            });
		          } else {
		            $(this).css({
		              transition: "opacity 0.5s linear",
		              opacity: (windowBottom - objectTop) * ratio
		            });
		          }
		        } else {
		          $(this).css({
		            opacity: 0,
		          });
		        }
		      });
		    }
		    $(".fade").css({
		      opacity: 0,
		    });
		    fade();

		    $(window).scroll(function () {
		      fade();
		    });

	 $(".top_btn").hide();
		$(function () {
                 
			$(window).scroll(function () {
				if ($(this).scrollTop() > 100) {
					$('.top_btn').fadeIn();
				} else {
					$('.top_btn').fadeOut();
				}
			});
                
        $('.top_btn').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);  
            return false;
        });
    });

		});