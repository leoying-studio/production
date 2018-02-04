// JavaScript Document
window.onload =function()
{
	getList();
	bindList();
}

function getList()
{

		document.getElementById("divselctid").onclick=function(event)
		{
			event =window.event || event;
			if(event.stopPropagation)
			{
					event.stopPropagation();
			}
			else
			{
				event.cancelBubble=true;
			}
			list.style.display="block";
		}
		document.onclick=function()
		{
			
			list.style.display="none";
		}				
		
}

function bindList()
{
	var a = document.getElementsByTagName('a');
	for(var i = 0;i<a.length;i++)
	{
		a[i].onclick =function(event)
		{
			title.innerHTML =this.innerHTML;
			event =window.event || event;
			if(event.stopPropagation)
			{
					event.stopPropagation();
			}
			else
			{
				event.cancelBubble=true;
			}
			list.style.display="none";
		}
		
	}
	
}
