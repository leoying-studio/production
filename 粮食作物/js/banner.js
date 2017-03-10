// JavaScript Document
var index = 0;
var leftWidth = 0;
var dot = document.getElementsByClassName("dot");


function banner()
{
	setInterval(function(){
		index+=1;
		leftWidth =index*-1376;
		if(index>2)
		{
			index = 0;	
			$("#ul").css({"margin-left":0});
			dot[2].src ="images/dot_03.png";
			dot[index].src ="images/this.dot_03.png";
		}
		else
		{
			dot[index-1].src ="images/dot_03.png";
			dot[index].src ="images/this.dot_03.png";
			$("#ul").animate({"margin-left":leftWidth+'px',opacity:0.5},'swing')
			$("#ul").animate({opacity:8},500);
		}
	},3000)
	onMouseDot();
}


//触发onmouseover点事件

function onMouseDot()
{
	for(var i = 0;i<dot.length;i++)
	{
		dot[i].index = i;
		dot[i].onmouseover = function()
		{
			leftWidth=this.index*-1376;
			$("#ul").css({"margin-left":leftWidth+"px"});
			for(var j = 0;j<dot.length;j++)
			{
				dot[j].src ="images/dot_03.png";
			}
			dot[this.index].src ="images/this.dot_03.png";
			
		}	
	}
	
}
