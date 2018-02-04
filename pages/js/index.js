$(function(){
	var bgContainer = $("#bg-img,#bg-img1,#bg-img2");
	bgContainer.eq(0).fadeIn(500);
	bgContainer.eq(1).fadeOut(500);
	bgContainer.eq(2).fadeOut(500);
	$("button").click(function() {
		 var index = $("button").index($(this));
		 // if (index == 0) {
		 // 	$("#bg-img").css('background-image', 'url(images/bg-01.jpg)');
		 // }

		 // if(index == 1){
		 // 	$("#bg-img").css("background-image","url(images/bg-02.jpg)");
		 // }

		 // if(index == 2){
		 // 	$("#bg-img").css("background-image","url(images/bg-03.jpg)");
		 // }
		
		 if(index == 0)
		 {
			bgContainer.eq(0).fadeIn(800).animate({width:"100%"}, 800);
		 	//bgContainer.eq(0).fadeIn(800);
		 	//bgContainer.eq(1).fadeOut(800);
		 	//bgContainer.eq(2).fadeOut(800);
		 }
		 if(index == 1)
		 {
		 	bgContainer.eq(1).fadeIn(800);
		 	bgContainer.eq(0).fadeOut(800);
		 	bgContainer.eq(2).fadeOut(800);
		 }
		 if(index == 2)
		 {
		 	bgContainer.eq(2).fadeIn(800);
		 	bgContainer.eq(0).fadeOut(800);
		 	bgContainer.eq(1).fadeOut(800);
		 }
	});
	
	//页面载入的时候除了第一个容器显示，其他的都隐藏
	$(".content-box").eq(0).show().siblings().hide();
	$(".options-box div").click(function(){
		 var i = $(".options-box div").index($(this));
		 $(".content-box").eq(i).show(800).siblings().hide();
	})

})