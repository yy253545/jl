//滚动图片构造函数
//UI&UE Dept. mengjia
//090625
var sina = {
	$: function(a) {
		if (document.getElementById) {
			return eval('document.getElementById("' + a + '")')
		} else {
			return eval('document.all.' + a)
		}
	},
	isIE: navigator.appVersion.indexOf("MSIE") != -1 ? true : false,
	addEvent: function(a, b, c) {
		if (a.attachEvent) {
			a.attachEvent("on" + b, c)
		} else {
			a.addEventListener(b, c, false)
		}
	},
	delEvent: function(a, b, c) {
		if (a.detachEvent) {
			a.detachEvent("on" + b, c)
		} else {
			a.removeEventListener(b, c, false)
		}
	},
	readCookie: function(l) {
		var i = "",
			I = l + "=";
		if (document.cookie.length > 0) {
			var a = document.cookie.indexOf(I);
			if (a != -1) {
				a += I.length;
				var b = document.cookie.indexOf(";", a);
				if (b == -1) b = document.cookie.length;
				i = unescape(document.cookie.substring(a, b))
			}
		};
		return i
	},
	writeCookie: function(O, o, l, I) {
		var i = "",
			c = "";
		if (l != null) {
			i = new Date((new Date).getTime() + l * 3600000);
			i = "; expires=" + i.toGMTString()
		};
		if (I != null) {
			c = ";domain=" + I
		};
		document.cookie = O + "=" + escape(o) + i + c
	},
	readStyle: function(i, I) {
		if (i.style[I]) {
			return i.style[I]
		} else if (i.currentStyle) {
			return i.currentStyle[I]
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			var l = document.defaultView.getComputedStyle(i, null);
			return l.getPropertyValue(I)
		} else {
			return null
		}
	}
};

function ScrollPic(a, b, c, d, e) {
	this.scrollContId = a;
	this.arrLeftId = b;
	this.arrRightId = c;
	this.dotListId = d;
	this.listType = e;
	this.dotClassName = "dotItem";
	this.dotOnClassName = "dotItemOn";
	this.dotObjArr = [];
	this.listEvent = "onclick";
	this.circularly = true;
	this.pageWidth = 0;
	this.frameWidth = 0;
	this.speed = 10;
	this.space = 10;
	this.upright = false;
	this.pageIndex = 0;
	this.autoPlay = true;
	this.autoPlayTime = 5;
	this._autoTimeObj;
	this._scrollTimeObj;
	this._state = "ready";
	this.stripDiv = document.createElement("DIV");
	this.listDiv01 = document.createElement("DIV");
	this.listDiv02 = document.createElement("DIV")
};
ScrollPic.prototype.version = "1.20";
ScrollPic.prototype.author = "mengjia";
ScrollPic.prototype.initialize = function() {
	var a = this;
	if (!this.scrollContId) {
		throw new Error("必须指定scrollContId.");
		return
	};
	this.scrollContDiv = sina.$(this.scrollContId);
	if (!this.scrollContDiv) {
		throw new Error("scrollContId不是正确的对象.(scrollContId = \"" + this.scrollContId + "\")");
		return
	};
	this.scrollContDiv.style[this.upright ? 'height' : 'width'] = this.frameWidth + "px";
	this.scrollContDiv.style.overflow = "hidden";
	this.listDiv01.innerHTML = this.scrollContDiv.innerHTML;
	this.scrollContDiv.innerHTML = "";
	this.scrollContDiv.appendChild(this.stripDiv);
	this.stripDiv.appendChild(this.listDiv01);
	if (this.circularly) {
		this.stripDiv.appendChild(this.listDiv02);
		this.listDiv02.innerHTML = this.listDiv01.innerHTML
	};
	this.stripDiv.style.overflow = "hidden";
	this.stripDiv.style.zoom = "1";
	this.stripDiv.style[this.upright ? 'height' : 'width'] = "32766px";
	if (!this.upright) {
		this.listDiv01.style.cssFloat = "left";
		this.listDiv01.style.styleFloat = "left";
		this.listDiv01.style.overflow = "hidden"
	};
	this.listDiv01.style.zoom = "1";
	if (this.circularly && !this.upright) {
		this.listDiv02.style.cssFloat = "left";
		this.listDiv02.style.styleFloat = "left";
		this.listDiv02.style.overflow = "hidden"
	};
	this.listDiv02.style.zoom = "1";
	sina.addEvent(this.scrollContDiv, "mouseover", function() {
		a.stop()
	});
	sina.addEvent(this.scrollContDiv, "mouseout", function() {
		a.play()
	});
	if (this.arrLeftId) {
		this.arrLeftObj = sina.$(this.arrLeftId);
		if (this.arrLeftObj) {
			sina.addEvent(this.arrLeftObj, "mousedown", function() {
				a.rightMouseDown()
			});
			sina.addEvent(this.arrLeftObj, "mouseup", function() {
				a.rightEnd()
			});
			sina.addEvent(this.arrLeftObj, "mouseout", function() {
				a.rightEnd()
			})
		}
	};
	if (this.arrRightId) {
		this.arrRightObj = sina.$(this.arrRightId);
		if (this.arrRightObj) {
			sina.addEvent(this.arrRightObj, "mousedown", function() {
				a.leftMouseDown()
			});
			sina.addEvent(this.arrRightObj, "mouseup", function() {
				a.leftEnd()
			});
			sina.addEvent(this.arrRightObj, "mouseout", function() {
				a.leftEnd()
			})
		}
	};
	if (this.dotListId) {
		this.dotListObj = sina.$(this.dotListId);
		this.dotListObj.innerHTML = "";
		if (this.dotListObj) {
			var b = Math.round(this.listDiv01[this.upright ? 'offsetHeight' : 'offsetWidth'] / this.frameWidth + 0.4),
				i, tempObj;
			for (i = 0; i < b; i++) {
				tempObj = document.createElement("span");
				this.dotListObj.appendChild(tempObj);
				this.dotObjArr.push(tempObj);
				if (i == this.pageIndex) {
					tempObj.className = this.dotOnClassName
				} else {
					tempObj.className = this.dotClassName
				};
				if (this.listType == 'number') {
					tempObj.innerHTML = i + 1
				};
				tempObj.title = "第" + (i + 1) + "页";
				tempObj.num = i;
				tempObj[this.listEvent] = function() {
					a.pageTo(this.num)
				}
			}
		}
	};
	this.scrollContDiv[this.upright ? 'scrollTop' : 'scrollLeft'] = 0;
	if (this.autoPlay) {
		this.play()
	}
};
ScrollPic.prototype.leftMouseDown = function() {
	if (this._state != "ready") {
		return
	};
	var a = this;
	this._state = "floating";
	this._scrollTimeObj = setInterval(function() {
		a.moveLeft()
	}, this.speed)
};
ScrollPic.prototype.rightMouseDown = function() {
	if (this._state != "ready") {
		return
	};
	var a = this;
	this._state = "floating";
	this._scrollTimeObj = setInterval(function() {
		a.moveRight()
	}, this.speed)
};
ScrollPic.prototype.moveLeft = function() {
	if (this.circularly) {
		if (this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] + this.space >= this.listDiv01[(this.upright ?
				'scrollHeight' : 'scrollWidth')]) {
			this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] = this.scrollContDiv[(this.upright ? 'scrollTop' :
				'scrollLeft')] + this.space - this.listDiv01[(this.upright ? 'scrollHeight' : 'scrollWidth')]
		} else {
			this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] += this.space
		}
	} else {
		if (this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] + this.space >= this.listDiv01[(this.upright ?
				'scrollHeight' : 'scrollWidth')] - this.frameWidth) {
			this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] = this.listDiv01[(this.upright ? 'scrollHeight' :
				'scrollWidth')] - this.frameWidth;
			this.leftEnd()
		} else {
			this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] += this.space
		}
	};
	this.accountPageIndex()
};
ScrollPic.prototype.moveRight = function() {
	if (this.circularly) {
		if (this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] - this.space <= 0) {
			this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] = this.listDiv01[(this.upright ? 'scrollHeight' :
				'scrollWidth')] + this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] - this.space
		} else {
			this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] -= this.space
		}
	} else {
		if (this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] - this.space <= 0) {
			this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] = 0;
			this.rightEnd()
		} else {
			this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] -= this.space
		}
	};
	this.accountPageIndex()
};
ScrollPic.prototype.leftEnd = function() {
	if (this._state != "floating") {
		return
	};
	this._state = "stoping";
	clearInterval(this._scrollTimeObj);
	var a = this.pageWidth - this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] % this.pageWidth;
	this.move(a)
};
ScrollPic.prototype.rightEnd = function() {
	if (this._state != "floating") {
		return
	};
	this._state = "stoping";
	clearInterval(this._scrollTimeObj);
	var a = -this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] % this.pageWidth;
	this.move(a)
};
ScrollPic.prototype.move = function(a, b) {
	var c = this;
	var d = a / 5;
	if (!b) {
		if (d > this.space) {
			d = this.space
		};
		if (d < -this.space) {
			d = -this.space
		}
	};
	if (Math.abs(d) < 1 && d != 0) {
		d = d >= 0 ? 1 : -1
	} else {
		d = Math.round(d)
	};
	var e = this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] + d;
	if (d > 0) {
		if (this.circularly) {
			if (this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] + d >= this.listDiv01[(this.upright ?
					'scrollHeight' : 'scrollWidth')]) {
				this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] = this.scrollContDiv[(this.upright ? 'scrollTop' :
					'scrollLeft')] + d - this.listDiv01[(this.upright ? 'scrollHeight' : 'scrollWidth')]
			} else {
				this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] += d
			}
		} else {
			if (this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] + d >= this.listDiv01[(this.upright ?
					'scrollHeight' : 'scrollWidth')] - this.frameWidth) {
				this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] = this.listDiv01[(this.upright ? 'scrollHeight' :
					'scrollWidth')] - this.frameWidth;
				this._state = "ready";
				return
			} else {
				this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] += d
			}
		}
	} else {
		if (this.circularly) {
			if (this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] + d < 0) {
				this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] = this.listDiv01[(this.upright ? 'scrollHeight' :
					'scrollWidth')] + this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] + d
			} else {
				this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] += d
			}
		} else {
			if (this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] - d < 0) {
				this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] = 0;
				this._state = "ready";
				return
			} else {
				this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] += d
			}
		}
	};
	a -= d;
	if (Math.abs(a) == 0) {
		this._state = "ready";
		if (this.autoPlay) {
			this.play()
		};
		this.accountPageIndex();
		return
	} else {
		this.accountPageIndex();
		this._scrollTimeObj = setTimeout(function() {
			c.move(a, b)
		}, this.speed)
	}
};
ScrollPic.prototype.pre = function() {
	console.log('上一页');
	if (this._state != "ready") {
		return
	};
	this._state = "stoping";
	this.move(-this.pageWidth, true)
};
ScrollPic.prototype.next = function(a) {
	console.log('下一页');
	if (this._state != "ready") {
		return
	};
	this._state = "stoping";
	if (this.circularly) {
		this.move(this.pageWidth, true)
	} else {
		if (this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] >= this.listDiv01[(this.upright ? 'scrollHeight' :
				'scrollWidth')] - this.frameWidth) {
			this._state = "ready";
			if (a) {
				this.pageTo(0)
			}
		} else {
			this.move(this.pageWidth, true)
		}
	}
};
ScrollPic.prototype.play = function() {
	var a = this;
	if (!this.autoPlay) {
		return
	};
	clearInterval(this._autoTimeObj);
	this._autoTimeObj = setInterval(function() {
		a.next(true)
	}, this.autoPlayTime * 1000)
};
ScrollPic.prototype.stop = function() {
	clearInterval(this._autoTimeObj)
};
ScrollPic.prototype.pageTo = function(a) {
	if (this.pageIndex == a) {
		return
	};
	clearTimeout(this._scrollTimeObj);
	this._state = "stoping";
	var b = a * this.frameWidth - this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')];
	this.move(b, true)
};
ScrollPic.prototype.accountPageIndex = function() {
	var a = Math.round(this.scrollContDiv[(this.upright ? 'scrollTop' : 'scrollLeft')] / this.frameWidth);
	if (a == this.pageIndex) {
		return
	};
	this.pageIndex = a;
	if (this.pageIndex > Math.round(this.listDiv01[this.upright ? 'offsetHeight' : 'offsetWidth'] / this.frameWidth + 0.4) -
		1) {
		this.pageIndex = 0
	};
	var i;
	for (i = 0; i < this.dotObjArr.length; i++) {
		if (i == this.pageIndex) {
			this.dotObjArr[i].className = this.dotOnClassName
		} else {
			this.dotObjArr[i].className = this.dotClassName
		}
	}
};

//焦点图构造函数 071221 mengjia
//FocusPic(BigPicID,SmallPicsID,TitleID,MemoID) 大图容器ID，小图列表容器ID，标题容器ID ,说明容器ID
//	add(BigPic,SmallPic,Url,Title) 大图地址，小图地址，链接地址，标题，说明文字
//	begin() 开始执行
//	TimeOut = 5000 默认切换时间
function FocusPic(BigPicID, SmallPicsID, TitleID, MemoID, width, height) {
	this.Data = [];
	this.ImgLoad = [];
	this.TimeOut = 5000;
	var isIE = navigator.appVersion.indexOf("MSIE") != -1 ? true : false;
	this.width = width;
	this.height = height;
	this.adNum = 0;
	var TimeOutObj;
	if (!FocusPic.childs) {
		FocusPic.childs = []
	};
	this.showTime = null;
	this.showSum = 10;
	this.ID = FocusPic.childs.push(this) - 1;
	//this.listCode='<span onmouseover="alert(\'a\' + [$num]);FocusPic.childs[[$thisId]].select([$num]);alert(\'b\'+[$num]);"><a target="_blank" href="[$url]"><img alt="[$title]" src="[$pic]"></a><h3 id="gif_simg_h"><a target="_blank" href="[$url]">[$title]</a></h3><p id="gif_simg_t">[$text]</p></span>';
	//this.listCode='<span onmouseover="FocusPic.childs[[$thisId]].select([$num]);"><a target="_blank" href="[$url]"><img alt="[$title]" src="[$pic]"></a></span>';
	this.listCode =
		'<span onmouseover="FocusPic.childs[[$thisId]].select([$num]);"><img alt="[$title]" src="[$pic]"></span>';
	this.Add = function(BigPic, SmallPic, Title, Url, Memo) {
		var ls;
		this.Data.push([BigPic, SmallPic, Title, Url, Memo]);
		ls = this.ImgLoad.length;
		this.ImgLoad.push(new Image);
		this.ImgLoad[ls].src = BigPic
	};
	this.TimeOutBegin = function() {
		clearInterval(TimeOutObj);
		TimeOutObj = setInterval("FocusPic.childs[" + this.ID + "].next()", this.TimeOut)
	};
	this.TimeOutEnd = function() {
		clearInterval(TimeOutObj)
	};
	this.select = function(num, noAction) {
		if (num > this.Data.length - 1) {
			return
		};
		if (num == this.adNum) {
			return
		};
		this.TimeOutBegin();
		if (BigPicID) {
			if (this.$(BigPicID)) {
				var aObj = this.$(BigPicID).getElementsByTagName("a")[0];
				aObj.href = "javascript:void(0)";
				if (this.aImgY) {
					this.aImgY.style.display = 'none';
					this.aImg.style.zIndex = 0
				};
				this.aImgY = this.$('F' + this.ID + 'BF' + this.adNum);
				this.aImg = this.$('F' + this.ID + 'BF' + num);
				clearTimeout(this.showTime);
				this.showSum = 10;
				if (!noAction) {
					this.showTime = setTimeout("FocusPic.childs[" + this.ID + "].show()", 50)
				} else {
					if (isIE) {
						this.aImg.style.filter = "alpha(opacity=100)"
					} else {
						this.aImg.style.opacity = 1
					}
				}
			}
		};
		if (TitleID) {
			if (this.$(TitleID)) {
				//this.$(TitleID).innerHTML="<a href=\""+this.Data[num][2]+"\" target=\"_blank\">"+this.Data[num][3]+"</a>"
			}
		};
		if (MemoID) {
			if (this.$(MemoID)) {
				//this.$(MemoID).innerHTML=this.Data[num][4]
			}
		};
		if (SmallPicsID) {
			if (this.$(SmallPicsID)) {
				var sImg = this.$(SmallPicsID).getElementsByTagName("span"),
					i;
				for (i = 0; i < sImg.length; i++) {
					if (i == num || num == (i - this.Data.length)) {
						sImg[i].className = "selected"
					} else {
						sImg[i].className = ""
					}
				}
			}
		};
		if (this.onselect) {
			this.onselect()
		};
		this.adNum = num
	};
	var absPosition = function(obj, parentObj) {
		var left = obj.offsetLeft,
			top = obj.offsetTop,
			tempObj = obj;
		while (tempObj.id != document.body & tempObj.id != document.documentElement & tempObj != parentObj) {
			tempObj = tempObj.offsetParent;
			left += tempObj.offsetLeft;
			top += tempObj.offsetTop
		};
		return {
			left: left,
			top: top
		}
	};
	this.show = function() {

		this.showSum--;
		if (this.aImgY) {
			this.aImgY.style.display = 'block'
		};
		this.aImg.style.display = 'block';
		/*if(isIE){
			this.aImg.style.filter="alpha(opacity=0)";
			this.aImg.style.filter="alpha(opacity="+(10-this.showSum)*10+")"
		}
		else{
			this.aImg.style.opacity=0;
			this.aImg.style.opacity=(10-this.showSum)*0.1
		};*/
		//if(this.showSum<=0){
		if (this.aImgY) {
			this.aImgY.style.display = 'none'
		};
		this.aImg.style.zIndex = 0;
		this.aImgY = null
		/*}
		else{
			this.aImg.style.zIndex=2;
			this.showTime=setTimeout("FocusPic.childs["+this.ID+"].show()",50)
		}*/
	};
	this.next = function() {
		var temp = this.adNum;
		temp++;
		if (temp >= this.Data.length) {
			temp = 0
		};
		this.select(temp)
	};
	this.pre = function() {
		var temp = this.adNum;
		temp--;
		if (temp < 0) {
			temp = this.Data.length - 1
		};
		this.select(temp)
	};
	this.MInStopEvent = function(ObjID) {
		if (ObjID) {
			if (this.$(ObjID)) {
				if (this.$(ObjID).attachEvent) {
					this.$(ObjID).attachEvent("onmouseover", Function("FocusPic.childs[" + this.ID + "].TimeOutEnd()"));
					this.$(ObjID).attachEvent("onmouseout", Function("FocusPic.childs[" + this.ID + "].TimeOutBegin()"))
				} else {
					this.$(ObjID).addEventListener("mouseover", Function("FocusPic.childs[" + this.ID + "].TimeOutEnd()"), false);
					this.$(ObjID).addEventListener("mouseout", Function("FocusPic.childs[" + this.ID + "].TimeOutBegin()"), false)
				}
			}
		}
	};
	this.begin = function() {
		this.MInStopEvent(TitleID);
		this.MInStopEvent(SmallPicsID);
		this.MInStopEvent(BigPicID);
		this.adNum = -1;
		var i, temp = "";
		if (BigPicID) {
			if (this.$(BigPicID)) {
				var aObj = this.$(BigPicID).getElementsByTagName("a")[0];
				aObj.style.zoom = 1;
				this.$(BigPicID).style.position = "relative";
				this.$(BigPicID).style.zoom = 1;
				this.$(BigPicID).style.overflow = "hidden";
				for (i = 0; i < this.Data.length; i++) {
					temp += '<img src="' + this.Data[i][0] + '" id="F' + this.ID + 'BF' + i + '" style="display:' + (i == 0 ? 'block' :
						'none') + '" galleryimg="no"' + (this.width ? ' width="' + this.width + '"' : '') + (this.height ? ' height="' +
						this.height + '"' : '') + ' alt="' + this.Data[i][3] + '" />'
				};
				aObj.innerHTML = temp;
				var imgObjs = aObj.getElementsByTagName("img"),
					XY = absPosition(imgObjs[0], this.$(BigPicID));
				for (i = 0; i < imgObjs.length; i++) {
					imgObjs[i].style.position = "absolute";
					imgObjs[i].style.top = XY.top + "px";
					imgObjs[i].style.left = XY.left + "px"
				}
			}
		};
		if (SmallPicsID) {
			if (this.$(SmallPicsID)) {
				tempHTML = "";
				for (i = 0; i < this.Data.length; i++) {
					temp = this.listCode;
					temp = temp.replace(/\[\$url\]/ig, this.Data[i][2]);
					temp = temp.replace(/\[\$pic\]/ig, this.Data[i][1]);
					temp = temp.replace(/\[\$thisId\]/ig, this.ID);
					temp = temp.replace(/\[\$num\]/ig, i);
					temp = temp.replace(/\[\$num\+1\]/ig, i + 1);
					temp = temp.replace(/\[\$title\]/ig, this.Data[i][3]);
					temp = temp.replace(/\[\$text\]/ig, this.Data[i][4]);
					tempHTML += temp
				};
				this.$(SmallPicsID).innerHTML = tempHTML
			}
		};
		this.TimeOutBegin();
		this.select(0, true)
	};
	this.$ = function(objName) {
		if (document.getElementById) {
			return eval('document.getElementById("' + objName + '")')
		} else {
			return eval('document.all.' + objName)
		}
	}
};

var FocusPic_si = new ScrollPic();
FocusPic_si.scrollContId = "gif_simg_g";
FocusPic_si.dotListId = "";
FocusPic_si.arrLeftId = 'gif_simg_bl'
FocusPic_si.arrRightId = 'gif_simg_br'
FocusPic_si.dotClassName = "";
FocusPic_si.dotOnClassName = "";
FocusPic_si.listType = "";
FocusPic_si.listEvent = "onclick";
FocusPic_si.frameWidth = 752;
FocusPic_si.pageWidth = 188;
FocusPic_si.upright = false;
FocusPic_si.speed = 10;
FocusPic_si.space = 20;
FocusPic_si.autoPlay = true;
FocusPic_si.autoPlayTime = 20;
FocusPic_si.initialize();
// document.getElementById('gif_simg_bl').onclick = function() {
// 	console.log("点击下一页");
// 	FocusPic_si.pre();
// };
// document.getElementById('gif_simg_br').onclick = function() {
// 	console.log('点击上一页');
// 	FocusPic_si.next();
// };
