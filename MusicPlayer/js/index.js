(function() {
	var audio = document.querySelector("audio");
	var musicList = document.querySelectorAll(".article li");
	var audioInfo = document.querySelector(".audio-info");
	var play = document.querySelector(".play");
	var title = document.querySelector(".music-title");
	var progress = document.querySelector(".progress");
	var controlWrapper = document.querySelector(".progress-wrapper");
	var previousTime = "";
	var lrcFile = document.getElementById("sxtpy").innerText;;
	var lrcContainer = document.getElementsByClassName("lrc-container")[0];
	var LrcList = [];
    var lrcLen = lrcContainer.offsetWidth;
    var next = document.querySelector(".next");
    var previous = document.querySelector(".previous");
    var playing = 0;
	//检测播放错误
	audio.addEventListener("erro", function(event) {
		var event = event || window.event;
		var code = event.target.error.code;
		switch(code) {
			case 1:
				audioInfo.innerText = "错误终止!";
				break;
			case 2:
				audioInfo.innerText = "网络故障!";
				break;
			case 3:
				audioInfo.innerText = "解码失败!";
				break;
	
			case 4:
				audioInfo.innerText = "格式不支持!";
				break;
		}
	}, false);
	
	//检测播放的网络状态
	audio.addEventListener("progress", function(e) {
		e = e || window.event;
		var obj = e.target;
		var state = obj.networkState;
		if(state == 2) {
			audioInfo.innerText = "加载完毕";
		} else if(state == 3) {
			audioInfo.innerText = "加载失败";
		}
	});
	
	
	//播放上一首
	previous.onclick = function() {
		if(playing === 0) {
			playing = musicList.length -1;
		}else {
			playing--;
		}
		var song = musicList[playing];
		audio.src = song.dataset.source;
		switchSong.call(song);
	}
	
	//播放下一首
	next.onclick = function() {
		if(playing >= musicList.length-1) {
			playing = 0;
		}else {
			playing++;
		}
		var song = musicList[playing];
		audio.src = song.dataset.source;
		switchSong.call(song);
	}
	
	function parseTime(currentTime) {
		var currentS = currentTime % 60;
		var currentM = (currentTime - currentS) / 60;
			currentS = String(currentS).length > 1 ? currentS : "0" + currentS;
			currentM = String(currentM).length > 1 ? currentM : "0" + currentM;
		return {m:currentM,s:currentS};

	}
	
	//监听窗口大小
	window.addEventListener("resize", function() {
		lrcLen = lrcContainer.offsetWidth;
	});
	
	// 点击触发进度条
	controlWrapper.addEventListener('click', function(event) {
		var event = event || window.event;
		// var w = event.target.offsetWidth;
		var x = event.offsetX;
		//点击的百分比
		var ratio = x / lrcLen;
		//播放的百分比
		var duration = Math.floor(audio.duration);
		var ms = parseTime(currenTime);
		playLRC(ms.m+":"+ms.s);
		var currenTime = duration * ratio;
		audio.currentTime = currenTime;
		//设置进度条的宽度
		progress.style.width = ratio * 100 + "%";
	});

	// 监听歌曲播放进度
	audio.addEventListener("timeupdate", function() {
		var currentTime = Math.floor(audio.currentTime);
		var duration = Math.floor(audio.duration);
		var ratio = currentTime / duration;
		progress.style.width = (ratio) * 100 + "%";
		//计算时间
		var s = duration % 60;
		var m = (duration - s) / 60;
		if(duration) {
			var ms = parseTime(currentTime);
			m = String(m).length > 1 ? m : "0" + m;
			s = String(s).length > 1 ? s : "0" + s;
			audioInfo.innerText = ms.m + ":" + ms.s + "/" + m + ":" + s;
			// 同一时刻会触发三次
			if((ms.m + ":" + ms.s) != previousTime) {
				playLRC(ms.m + ":" + ms.s);
			}
			previousTime = ms.m + ":" + ms.s;
		}
	
		//判断是否播放完毕
		if(audio.paused) {
			play.innerText = "播放";
	
		} else {
			play.innerText = "暂停";
		}
	});

	// 注册播放暂停
	play.onclick = function() {
		if(audio.paused) {
			parseLrc();
			audio.play();
		} else {
			audio.pause();
		}
	}
	
	//切换歌曲
	function switchSong() {
		audio.src = this.dataset.source;
		title.innerText = this.innerText;
		document.querySelector(".active-player").classList.remove('active-player');
		this.classList.add('active-player');
		lrcContainer.innerHTML = "";
		lrcFile = "";
		if (document.getElementById(this.dataset.lrc)) {
			lrcFile = document.getElementById(this.dataset.lrc).innerText;
		} else {
			lrcFile = "";
		}
		parseLrc();
		progress.style.width = "0%";
		audio.play();
	}
	
	// 点击切换歌曲
	musicList.forEach(function(song,index) {
		song.index = index;
		song.onclick = function() {
			playing = this.index;
			switchSong.call(this);
		}
	});
	
	// 解析歌词
	function parseLrc() {
		LrcList = [];
		if(!lrcFile) {
			lrcContainer.innerHTML = "<p>没有歌词</p>"
			return;
		}
		var list = lrcFile.split("\n");
		var collectTime = /\[\d{2}:\d{2}\.\d{2,3}\]/;
		for(var i = 0;i<list.length;i++) {
			var line = list[i].replace(/\s+/,"");
			if(!line) 
				 continue;
			var time = line.match(collectTime)[0];
			var lrc = line.split(time)[1];
			time = time.match(/\d+:\d+.\d+/)[0];
			LrcList.push({
				time:time.split(".")[0],
				lrc:lrc
			}); 
		}
	}
	
	// 播放歌词
	function playLRC(currentTime) {
		var previous = 4,
		next = 4;
		for (var k = 0;k<LrcList.length;k++) {
			var currentLine = LrcList[k];
			if(currentTime == currentLine.time) {
				if(k<previous+1) {
					renderLrc(0,9,currentTime);
				}else {
					var start = k - previous;
					var end = k + next;
					renderLrc(start,end,currentTime);
				}
			}
		}
	}
	
	// 渲染列表
	function renderLrc(start,end,currentTime) {
		lrcContainer.innerHTML = "";
		var list = LrcList.slice(start,end);
		for(var j = 0;j<list.length;j++) {
			var p =document.createElement("p");
			p.innerText = list[j].lrc;
			if(list[j].time == currentTime) {
				p.classList.add("lrc-active");
			}
			lrcContainer.appendChild(p);
		}
	}
	

})();
















