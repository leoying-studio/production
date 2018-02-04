// JavaScript Document
	$(document).ready(function(e) {
      	var a = document.getElementsByClassName("a");
		for(var i = 0 ;i<a.length;i++)
		{
			a[i].onmouseover = function()
			{
				$(".a:eq(0)").removeClass("active");
			}
			a[i].onmouseout = function()
			{
				$(".a:eq(0)").addClass("active");	
			}
		}
		var txt = "";
		var info = $(".info:eq(0)").html().split("，");
		var p = info.slice(3,5);
		$(".info:eq(0)").html(p+"......");
		var more = document.getElementsByClassName("more")[0];
		more.onclick= (function(){
			txt ="";
			for(var i = 0 ;i<info.length;i++)
			{
				txt+=info[i];
			}
			$(".info:eq(0)").html(txt);
			})
		
		
    });
