$(document).ready(function() {
       var bt = document.getElementsByClassName('bt');
       var sub_bt = document.getElementsByClassName('sub_bt');
       var position;

       $(bt[0]).click(function() {
         count = 0;
         wheel_count();
       });
       $(bt[1]).click(function() {
         count = 1;
         wheel_count();
       });
       $(bt[2]).click(function() {
         count = 2;
         wheel_count();
       });
       $(bt[3]).click(function() {
         count = 3;
         wheel_count();
       });


       $(sub_bt[0]).click(function() {
         count = 0;
         wheel_count();
       });
       $(sub_bt[1]).click(function() {
         count = 1;
         wheel_count();
       });
       $(sub_bt[2]).click(function() {
         count = 2;
         wheel_count();
       });
       $(sub_bt[3]).click(function() {
         count = 3;
         wheel_count();
       });

       var div_h = 0;
         var count = 0;
         var scrollEvent = false;
         var wheel_data;

         $("html").on('mousewheel', function(c) {
           wheel_data = c.originalEvent.wheelDelta;
           if (wheel_data > 0 && count > 0 && scrollEvent == false) {
            c.preventDefault();
            
             scrollEvent = true;
             count --;
             wheel_count();
             setTimeout(function(){
               scrollEvent = false;
             }, 500);
           }else if (wheel_data < 0 && count < 3 && scrollEvent == false) {
             c.preventDefault();

             scrollEvent = true;
             count ++;
             wheel_count();
             setTimeout(function(){
               scrollEvent = false;
             }, 500);
           }
         });


         function wheel_count() {
           if (count == 0) {
             position = $("header").offset();
             $("html").stop().animate({scrollTop:position.top},500);
           }else if (count == 1) {
             position = $("section").offset();
             $("html").stop().animate({scrollTop:position.top},500);
           }else if (count == 2) {
             position = $("article").offset();
             $("html").stop().animate({scrollTop:position.top},500);
           }else if (count == 3) {
             position = $("footer").offset();
             $("html").stop().animate({scrollTop:position.top},500);
           }
         }

     });

     //햄버거 메뉴로 추청
