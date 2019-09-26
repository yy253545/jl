//保存到桌面
function toDesktop(sUrl, sName) {
	try {
		var WshShell = new ActiveXObject("WScript.Shell");
		var oUrlLink = WshShell.CreateShortcut(WshShell.SpecialFolders("Desktop") + "\\" + sName + ".url");
		oUrlLink.TargetPath = sUrl;
		oUrlLink.Save();
	} catch (e) {
		alert("当前IE安全级别不允许操作！");
	}
}

let snow = function() { //雪花的JS
	var width = window.innerWidth; //获取系统显示宽度;
	var height = window.innerHeight; //获取系统显示高度;
	var canvas = document.querySelector("#canvas");
	var context = canvas.getContext("2d");
	var snowArray = []; //声明一个数组，用于存放创建出来的雪花对象；

	canvas.width = width; //设置画布的宽度为系统显示宽度;
	canvas.height = height; //设置画布的高度为系统显示高度;

	cartoon(); //调用动画;

	/**
	 * 定义雪花类;
	 */
	class Snowflake {
		constructor() {
			this.init(); //构造函数，调用定义好的init()方法;
		}
		init() {
			this.position = { //雪花对象的位置;
				x: Math.random() * width, //x坐标随机;
				y: Math.random() * height, //y坐标随机;
			}
			this.speed = Math.random() * 20; //雪花下落速度为0-10以内的随机数;
			this.r = Math.random() * 6; //雪花的半径为0-6以内的随机数;
			this.transparency = Math.random(); //设置雪花的透明度为随机;
			// this.color = {
			// 	r1: Math.random() * 255, //雪花颜色随机;
			// 	g: Math.random() * 255,
			// 	b: Math.random() * 255,
			// };
			this.color = {
				r1: 255, //雪花颜色随机;
				g: 255,
				b: 255,
			}
		}
		draw() { //雪花绘制方法;
			this.position.y++; //y坐标每次递增1像素;
			this.position.x += 0.7; //X坐标每次递增1像素;
			this.transparency -= 0.01; //透明度每次递减0.01;
			if (this.transparency <= 0) { //透明度小于0，即雪花消失，重新绘制雪花;
				this.init();
			}
			context.beginPath(); //开始一个新的图形绘制;
			context.fillStyle = "rgba(" + this.color.r1 + "," + this.color.g + "," + this.color.b + "," + this.transparency +
				")"; //根据类模型绘制圆形雪花;
			context.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2); //填充雪花的颜色;
			context.fill();
		}
	}

	for (var i = 0; i < 300; i++) {
		var snow = new Snowflake(); //实例化100个雪花对象;
		snowArray.push(snow); //将雪花对象添加到数组中;
	}
	// var length=snowArray.length;

	/**
	 * 定义动画效果;
	 * @return {[type]} [description]
	 */
	function cartoon() {
		context.clearRect(0, 0, width, height);
		// 动画完成一次进行清屏操作;
		for (var j = 0; j < snowArray.length; j++) {
			snowArray[j].draw(); //将实例化好的每个雪花对象在画布上画出来;
		}
		requestAnimationFrame(cartoon); //递归调用动画效果;
	}
}

// snow();

//分享按钮
$('.share').mouseover(function() {
	$('#share_box').slideDown('1000');
	$('.share').hide('1000');
});
$('#share_box ul li').click(function() {
	$('#share_box').slideUp('1000');
	$('.share').show('1000');
})

//百度贴吧链接JS
$("#rightBox .baidutieba").on("click", function() {
	window.open('https://tieba.baidu.com/f?kw=%E5%B7%A8%E9%BE%99%E6%B3%95%E5%88%99', 'newwindow')
})
$(".jlfzTieBa").on("click", function() {
	window.open('https://tieba.baidu.com/f?kw=%E5%B7%A8%E9%BE%99%E6%B3%95%E5%88%99', 'newwindow')
})

//qq群链接JS
$("#rightBox .qqIcon").on("click", function() {
	window.open('https://jq.qq.com/?_wv=1027&k=5AJYkh9', 'newwindow')
})

$(".jlfzQQ").on("click", function() {
	window.open('https://jq.qq.com/?_wv=1027&k=5AJYkh9', 'newwindow')
})

//官方微博JS
$(".ljfzWeiBo").on("click", function() {
	window.open('https://weibo.com/u/7253974955', 'newwindow')
})

//鼠标移入微信分享按钮
$('.wechat_mouseover').mouseover(function() {
	$('.wechat').show();
})
$('.wechat').mouseout(function() {
	$('#share_box').slideUp('1000');
	$('.wechat').hide();
	$('.share').show('1000');
})

//点击除分享区域外的地方，隐藏分享区域
$(document).click(function() {
	$('#share_box').slideUp('1000');
	$('.share').show('1000');
	$('.wechat').hide();
});
$("#share_box").click(function(event) {
	event.stopPropagation();
});

// var locationHref = window.location.href;
// var locationPathname = window.location.pathname;
// var pathName = locationPathname.split('/')[1];
// console.log(locationHref, locationPathname, pathName);
// if (pathName == 'dypz') {
// 	//下载链接方法
// 	$(".iosAppDown").on("click", function() {
// 		window.open('https://apps.apple.com/cn/app/id1325971805', 'newwindow')
// 	});
// 	$(".androidAppDown").on("click", function() {
// 		window.open('https://down.520cai.net/sdkgame/jlfzgband_6227/jlfzgband_6227.apk', 'newwindow')
// 	})
// } else if (pathName == 'dydr') {
// 	
// } else if (pathName == 'dyld') {
// 	
// } else if (pathName == 'dysy') {
// 	
// } else if (pathName =='bd') { //百度大搜
// 
// } else if (pathName == 'sg') { //搜狗大搜
// 
// } else if (pathName == 'sm') { //神马大搜
// 
// } else if (pathName == 'sll') { //360大搜
// 
// } else {
// 	
// }



var platfrom = 'apple';

// 手机选择
$(".ios").click(function() {
	platfrom = $(this).attr('data-check');
	$(".android").removeClass("on");
	$(this).addClass("on");
})
$(".android").click(function() {
	platfrom = $(this).attr('data-check');
	$(".ios").removeClass("on");
	$(this).addClass("on");
})

timeoutId = 0;

$('.yzm').click(function(event) {

	if ($(this).hasClass("yzm-off")) {
		event.preventDefault();
		return false;
	}
	var phone = $('.phone-box').val();
	if (phone == '') {
		alert('请填写手机号');
		return false;
	}
	var reg = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
	if (reg.test(phone)) {
		var data = {
			phone: phone
		};
		$.get("https://qfxcx.520cai.cn/game/sms/sendSms", data, function(data, status) {
			console.log(data, status);
			if (status == 'success') {
				alert("验证码短信已发送");
				var s_countdown = 60;
				$(".yzm").addClass("yzm-off").html(s_countdown + 's后重发');
				timeoutId = setInterval(function() {
					s_countdown--;
					if (s_countdown <= 0) {
						clearInterval(timeoutId);
						$(".yzm").removeClass("yzm-off").html('重新发送');
					} else {
						$(".yzm").html(s_countdown + 's后重发');
					}
				}, 1000);
				return false;
			} else {
				alert(data);
			}
		});
	} else {
		alert('手机号有误,请重新输入!');
		return false;
	}
});


$('.submit-bit').click(function() {
	var phone = $('.phone-box').val();
	var vcode = parseInt($('.yzm-box').val());
	if (phone == '') {
		alert('请填写手机号');
		return false;
	}
	if (!vcode) {
		alert('请输入正确的验证码');
		return false;
	}
	var reg = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
	if (reg.test(phone)) {
		console.log(phone, vcode, platfrom);
		var data = {
			phone: phone,
			code: vcode,
			type: platfrom == 'android' ? '2' : '1'
		};
		$.get("https://qfxcx.520cai.cn/game/sms/preOrder", data, function(data, status) {
			console.log(data, status);
			if (status == 'success') {
				if (data == '2') {
					alert('验证码错误');
				} else if (data == '1') {
					alert('预约成功');
					$('#get').hide();
				} else if (data == '3') {
					alert('已经预约过了');
					$('#get').hide();
				}
				return false;
			} else {
				alert(data);
			}
		});
	} else {
		alert('手机号有误,请重新输入!');
		return false;
	}
});

//微博分享
function weiboShare() {
	var wb_shareBtn = document.getElementById("shareBtn"),
		wb_url = 'http://jl.52win.com/', //获取当前页面地址，也可自定义例：wb_url = "http://liuyanzhao.com"
		wb_appkey = "25612892", //你的app key
		wb_title =
		"西方魔幻巨龙MMO手游《巨龙法则》，【千名主播线上助阵】360度广阔无垠地域空间，全程高燃的战斗任务。 【软萌客服一对一定制化在线服务】遵从意志选择适合自己的职业，召唤灵魂的伙伴，集结更多的勇士，世界需要你的加入！", //默认输入框文字
		weibo_name = 'weibo',
		wb_ralateUid = "http://jl.52win.com/images_pc/icon.png", //微博id，获得你的用户名
		// wb_pic = "http%3A%2F%2Fjlfz.youchaogame.com%2FPublic%2Fimages%2Fpicture.png",
		wb_language = "zh_cn";
	wb_shareBtn.setAttribute("href", "http://service.weibo.com/share/share.php?url=" + wb_url + "&appkey=" +
		wb_appkey + "&title=" + wb_title + "&pic=" + wb_ralateUid + "&language=" + wb_language + "&sharesource=" + weibo_name);
}
weiboShare();

// 联系我们的方法
// window.onscroll = function() {
// 	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
// 	var mainHeight = document.body.offsetHeight;
// 	var per = scrollTop / mainHeight;
// 	// console.log(per);
// 	if (per > 0.20) {
// 		$("#contactBox").slideDown(1000);
// 	} else if (per < 0.19) {
// 		$("#contactBox").slideUp(1000);
// 	}
// }

//当点击跳转链接后，回到页面顶部位置
$(".backTopBox").click(function() {
	if ($('html').scrollTop()) {
		$('html').animate({
			scrollTop: 0
		}, 1000);
		return false;
	}
	$('body').animate({
		scrollTop: 0
	}, 1000);
	return false;
});

$(".contactItemBox").mouseover(function() {
	$(this).find(".ewmIcon").show();
	$(this).siblings().find(".ewmIcon").hide();
});
$(".ewmIcon").mouseleave(function() {
	$(this).hide();
});
