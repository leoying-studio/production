// JavaScript Document
var timerPro = null;
var x = 0;
function ProductList()
{
	var proList = document.getElementById("productList");
	timerPro = setInterval(function(){
		x+=-1;
		if(x<-4260)
		{
			x = 0;
		}
		else
		{
			$("#productList").css("margin-left",x+"px");
		}
		},10)
}

function productOnmouse()
{
		var product = document.getElementsByClassName("gift");
		for(var i = 0 ;i<product.length;i++)
		{
				product[i].onmouseover = function()
				{
						clearInterval(timerPro);
				}
				product[i].onmouseout = function()
				{
						ProductList();
				}
		}
}

function changProduct()
{
	var backImg = document.getElementsByClassName("backImg")[0];
	backImg.onclick = function()
	{
		clearInterval(timerPro);
		x+=-192;
		$("#productList").css("margin-left",x+"px");
	}
	backImg.onmouseout = function()
	{
		clearInterval(timerPro);
		ProductList();
	}		
}
function changProductNext()
{
	var nextImg = document.getElementsByClassName("nextImg")[0];
	nextImg.onclick = function()
	{
		clearInterval(timerPro);
		x+=192;
		$("#productList").css("margin-left",x+"px");
	}
	nextImg.onmouseout = function()
	{
		clearInterval(timerPro);
		ProductList();
	}		
}
