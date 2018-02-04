/**
 * author:liuying  
 * version:v1.5
 * description: founded in 2017
 */
(function (window, undefined) {
	var global_variable = {
		prop: []
	}
	function Own() {
		this.width = "200px";
		this.height = "100px";
		return this;
	}
	Own.prototype = {
		constructor: Own,
		deepCopy: function (child, parent) {
			var _this = this;
			for (var p in parent) {
				if (parent.hasOwnProperty(p)) {
					if (!child[p]) {
						if (typeof parent[p] === 'object') {
							child[p] = Array.isArray(parent[p]) ? [] : {};
							_this.deepCopy(child[p], parent[p]);
						} else {
							child[p] = parent[p];
						}
					}
				}
			}
		},
		judgment: function (el) {
			if (typeof el != "object") {
				el = document.getElementsByClassName(el)[0];
				if (!el) { throw '没有找到创建组件的支撑节点!' }
			}
			return el;
		},
		hideSelf: function (el) {
			el.style.display = "none";
			return this;
		},
		showSelf: function (el) {
			el.style.display = "block";
			return this;
		},
		setProp: function (option) {
			global_variable.prop.push(option);
		},
		getProp: function () {
			return global_variable.prop;
		}
	}
	Own.rightMenu = function (option) {
		var own = new Own();
		own.deepCopy(option, own);
		own.moveSelf = false;
		own.moveTarget = false;
		own.init = function () {
			option.el = this.judgment("own-rightMenu");
			if (!option.el) { throw '没有找到支撑[rightMenu]组件的class元素' };
			option.el.style.width = option.width;
			this.option = option;
			this.event().mousedown();
			this.setProp(option);
		}
		own.create = function (curentOption) {
			var rightMenuHTML = this.render(curentOption);
			curentOption.el.innerHTML = "<ul>" + rightMenuHTML + "</ul>";
			this.style(curentOption.el.children[0].children, curentOption);
			this.event().click(curentOption.el.children[0], curentOption);
			this.event().mouseover();
		}
		own.render = function (currentNode) {
			var menuStr = "", _this = this;
			for (var i = 0; i < currentNode.menuList.length; i++) {
				menuStr += "<li>" + currentNode.menuList[i].menuName;
				if (currentNode.menuList[i].menuList) {
					menuStr += "<ul class='hide-childmenu'>" + _this.render(currentNode.menuList[i]) + "</ul>";
				}
				menuStr += "</li>";
			}
			return menuStr;
		}
		own.targetElement = function () {
			if (option.target) {
				option.targetElement = document.getElementsByClassName(option.target)[0];
				if (option.targetElement) {
					return option.targetElement;
				}
				return document;
			}
		}
		own.style = function (els) {
			var width = parseInt(option.width) - 15 + "px", _this = this;
			var rightMenu = {
				width: "100%",
				position: "absolute",
				border: "solid #ccc 1px",
				borderBottom: "none",
				top: "-1px",
				left: width,
			}
			for (var i = 0; i < els.length; i++) {
				var currentNode = els[i];
				if (currentNode.nodeName != "UL") {
					currentNode.setAttribute("class", "toggle-rightMenu");
				}
				else {
					for (var key in rightMenu) {
						currentNode.style[key] = rightMenu[key];
					}
				}
				if (currentNode.children.length > 0) {
					_this.style(currentNode.children);
				}
			}
		}
		own.setPosition = function (event) {
			this.showSelf(this.option.el);
			var cw = document.documentElement.clientWidth;
			var ch = document.documentElement.clientHeight;
			var sw = parseInt(this.option.width);
			var sh = this.option.el.offsetHeight;
			var clientX = event.clientX, clientY = event.clientY;
			clientX = clientX < 0 ? 0 : clientX + sw > cw ? cw - sw - 2 : clientX;
			clientY = clientY < 0 ? 0 : (clientY + sh + 1) > ch ? ch - sh - 1 : clientY;
			this.option.el.style.position = "absolute";
			this.option.el.style.left = clientX + "px";
			this.option.el.style.top = clientY + "px";
			return this;
		}
		own.event = function () {
			var _this = this, RIGHT_KEY = 2, LEFT_KEY = 0;
			return {
				mousedown: function () {
					_this.targetElement().addEventListener("mousedown", function (event) {
						var event = event || window.event;
					    if (event.button == RIGHT_KEY) {
							hoverSelf = true;
							var prop = _this.getProp(), className = this.className;
							for (var i = 0; i < prop.length; i++) {
								if (prop[i].target == className) {
									_this.create(prop[i]);
									_this.setPosition(event);
								}
							}
						}
					});
					document.addEventListener("contextmenu", function (e) {
						var e = e || window.e;
						e.preventDefault();
					});
					document.addEventListener("click",function(e){
						if(_this.moveSelf==false){
							_this.hideSelf(_this.option.el);
						}
					});
				},
				mouseover: function () {
					option.el.addEventListener("mouseover", function () {
						_this.moveSelf = true;
					});
					option.el.addEventListener("mouseout", function (event) {
						/* Act on the event */
						_this.moveSelf = false;
					});
				},
				click: function (el, event) {
					for (var i = 0; i < el.children.length; i++) {
						var currentNode = el.children[i];
						var currentEvent = event.menuList ? event.menuList[i] : event;
						if (currentNode.nodeName == "LI") {
							currentNode.ownEvent = currentEvent.event;
							currentNode.addEventListener('click', function (e) {
								e = e || window.event;
								if (e.stopPropagation) { //W3C阻止冒泡方法  
									e.stopPropagation();
								} else {
									e.cancelBubble = true; //IE阻止冒泡方法  
								}
								this.ownEvent();
							});
						}
						if (currentNode.children.length > 0) {
							if (currentNode.nodeName == "UL") {
								this.click(currentNode, event);
							} else {
								this.click(currentNode, currentEvent);
							}

						}
					}
				}
			}
		}
		return own;
	}

	window.Own = Own;
})(window);


