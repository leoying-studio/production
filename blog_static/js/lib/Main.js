var demo = document.getElementsByClassName("demo");
var list = document.getElementsByClassName("me");
//原生JS版本
function Change()
{
		for(var i = 0;i<list.length;i++)
		{
				list[i].index = i;
				list[i].onclick = function()
				{
					for(var j = 0;j<demo.length;j++)
					{
						demo[j].style.display = "none";	
					}
					demo[this.index].style.display = "block";
				}
		}	
}
//jquery  版本
$(document).ready(function(e) {
	$(".me").each(function(i,value) {
		 value.onclick = function()
		 {
				$(".demo").each(function(index, element) {
					//$(this).animate({opacity:"toggle"},"slow");
					$(this).fadeOut(500);
				});
			demo[i].style.display ="block";
		 }
    });
});