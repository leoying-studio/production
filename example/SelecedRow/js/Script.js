window.onload = function GetData()
{
	var row ="";
	for (var i = 0; i < User.length;i++)
	{
		row+="<div class='row'>"+"<div class='col'>"+User[i].name+"</div>"+"<div class='col'>"+User[i].py+"</div>"+"<div class='col'>"+User[i].wb+"</div>"+"</div>";
	}
	var content = document.getElementById("content");
	content.innerHTML =row;
	SelectRow();
}

//键盘事件
var keyDownIndex = -1;
var scrollTOP = 0;
var PageRows = document.getElementsByClassName("row");
document.onkeydown = function KeyDown(event)
{
	//非IE浏览器
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e&&e.keyCode==38)
	{
		e.preventDefault();
		e.stopPropagation();
		 if (keyDownIndex>0)
			{
				if(keyDownIndex<PageRows.length-5)
				{
					var scorllTop = document.getElementById("content").scrollTop - 46;
					document.getElementById("content").scrollTop = scorllTop;
				}
				PageRows[keyDownIndex].style.backgroundColor = "#FFFFFF";
                keyDownIndex--;
                PageRows[keyDownIndex].style.backgroundColor = "#c6dbdd";
			
			}
	}
	if (e && e.keyCode == 40)
	{
		e.preventDefault();
		e.stopPropagation();
		
	 if (keyDownIndex < PageRows.length-1)
		{
			if(keyDownIndex ==-1)
			{
				keyDownIndex++;
				PageRows[keyDownIndex].style.backgroundColor = "#c6dbdd";
			}
			else
			{	if(keyDownIndex>=5)
				{
					
					document.getElementById("content").scrollTop+=46;	
				}
				PageRows[keyDownIndex].style.backgroundColor = "#FFFFFF";
				keyDownIndex++;
				PageRows[keyDownIndex].style.backgroundColor = "#c6dbdd";	
			}
		}
	
	}
	if (e && e.keyCode == 13)
	{
		PageRows[keyDownIndex].style.backgroundColor = "green";
		var rowNum = keyDownIndex+1;
		alert("当前选择的是第"+rowNum+"行,"+"该行的姓名叫做:"+User[keyDownIndex].name+",索引是:"+keyDownIndex);
	}
	else
	{
		window.event.returnValue =false;
		return false;	
	}
}

//点击事件
function SelectRow()
{
	for(var i = 0;i<PageRows.length;i++)
	{
		PageRows[i].index = i;
		PageRows[i].onclick = function()
		{
			if(keyDownIndex==-1)
			{
					keyDownIndex++;
			}
			PageRows[keyDownIndex].style.backgroundColor = "#FFFFFF";
			keyDownIndex = this.index;
			PageRows[keyDownIndex].style.backgroundColor = "#c6dbdd";
		}
		
	}
	
}

 /*  text = 0,
            int = 1,
            float = 2,
            checked = 3,
            date = 4,
            time = 5,
            datetime = 6,
            namevalue = 7 */