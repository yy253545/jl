<template>
	<div id="minePage">
		<backTop v-show="back_top_show" v-on:back_top="back_top"></backTop>
		<div class="containerBox">
			<div class="userBox posRel">
				<img :src="bgImg" alt class="bgImg posAbs wh">
				<img v-if="userImg != null" :src="userImg" alt class="userImg posAbs cen">
				<img v-else :src="defaultUserImg" alt class="userImg posAbs cen">
				<img :src="portraitIcon" alt class="portraitIcon posAbs cen">
				<div v-if="userName" class="userNameBox posAbs flex flexCen">
					<img v-if="vip_level == '1'" :src="userVipIcon1" />
					<img v-if="vip_level == '2'" :src="userVipIcon2" />
					<img v-if="vip_level == '3'" :src="userVipIcon3" />
					<img v-if="vip_level == '4'" :src="userVipIcon4" />
					<img v-if="vip_level == '5'" :src="userVipIcon5" />
					<img v-if="vip_level == '6'" :src="userVipIcon6" />
					<img v-if="vip_level == '7'" :src="userVipIcon7" />
					<span class="userNameSp">
						{{userName}}
					</span>
				</div>
				<div v-if="score" class="scoreBox posAbs flex flexSta">
					<img :src="scoreIcon" />
					<span>积分:</span>
					<span>{{score}}</span>
				</div>
				<div v-if="vip_exp" class="expBox posAbs flex flexEnd">
					<img :src="expIcon" />
					<span>经验:</span>
					<span>{{vip_exp}}</span>
				</div>
				<span v-if="vip_level" class="vip_level posAbs cen">
                   Lv.{{vip_level}}
                </span>
				<div class="loginBox posAbs cen">
					<div class="wh posRel">
						<img :src="loginBgImg" alt class="posAbs cenMid wh">
					</div>
					<span v-if="isLoginShow" class="posAbs cenMid" @click="loginBtnFun">立即登录</span>
					<span v-else class="posAbs cenMid" @click="quiteLogin">退出登录</span>
				</div>
			</div>
			<div class="setting_item_box posRel" @click="update">
				<img :src="updateInfoImg" alt class="icon posAbs mid">
				<span class="tit posAbs mid">修改资料</span>
				<img :src="settingMoreImg" alt class="moreImg posAbs mid">
			</div>
			<div class="setting_item_box posRel" @click="myGiftData">
				<img :src="myGiftImg" alt class="icon posAbs mid">
				<span class="tit posAbs mid">我的礼包</span>
				<img :src="settingMoreImg" alt class="moreImg posAbs mid">
			</div>
			<div class="setting_item_box posRel" @click="myWalletData">
				<img :src="myWalletIcon" alt class="icon posAbs mid">
				<span class="tit posAbs mid">我的钱包</span>
				<img :src="settingMoreImg" alt class="moreImg posAbs mid">
			</div>
			<div class="setting_item_box posRel" @click="myDutyCenter">
				<img :src="dutyCenterIcon" alt class="icon posAbs mid">
				<span class="tit posAbs mid">任务中心</span>
				<img :src="settingMoreImg" alt class="moreImg posAbs mid">
			</div>
			<div class="setting_item_box posRel" @click="serviceCenter">
				<img :src="serviceIcon" alt class="icon posAbs mid">
				<span class="tit posAbs mid">服务中心</span>
				<img :src="settingMoreImg" alt class="moreImg posAbs mid">
			</div>
			<div class="setting_item_box posRel" @click="integralShop">
				<img :src="integralShopIcon" alt class="icon posAbs mid">
				<span class="tit posAbs mid">积分商城</span>
				<img :src="settingMoreImg" alt class="moreImg posAbs mid">
			</div>
			<!--<div v-if="!isLoginShow" class="setting_item_box posRel" @click="update">
        <img :src="updateInfoImg" alt class="icon posAbs mid">
        <span class="tit posAbs mid">修改资料</span>
        <img :src="settingMoreImg" alt class="moreImg posAbs mid">
      </div>
      <div v-if="!isLoginShow" class="setting_item_box posRel" @click="myGiftData">
        <img :src="myGiftImg" alt class="icon posAbs mid">
        <span class="tit posAbs mid">我的礼包</span>
        <img :src="settingMoreImg" alt class="moreImg posAbs mid">
      </div>-->
			<div class="setting_item_box posRel" @click="myH5Game">
				<img :src="H5GameImg" alt class="icon posAbs mid">
				<span class="tit posAbs mid">H5游戏</span>
				<img :src="settingMoreImg" alt class="moreImg posAbs mid">
			</div>
			<div class="setting_item_box posRel" @click="myConcat">
				<img :src="onlineConnectImg" alt class="icon posAbs mid">
				<span class="tit posAbs mid">在线客服</span>
				<img :src="settingMoreImg" alt class="moreImg posAbs mid">
			</div>
			<div class="setting_item_box posRel" @click="gzhBtn">
				<img :src="qfGzhImg" alt class="icon posAbs mid">
				<span class="tit posAbs mid">清风公众号</span>
				<img :src="settingMoreImg" alt class="moreImg posAbs mid">
			</div>
			<div class="setting_item_box posRel" v-clipboard:copy="contactTel" v-clipboard:success="onCopy" v-clipboard:error="onError">
				<img :src="contactIcon" alt class="icon posAbs mid">
				<span class="tit posAbs mid">联系我们</span>
				<!-- <img :src="settingMoreImg" alt class="moreImg posAbs mid"> -->
				<em class="posAbs contactTel mid" style="right: 0.4rem;color:#FE8800;">{{contactTel}}</em>
			</div>
		</div>
		<footNavComponent></footNavComponent>
		<maskMd v-show="show_mask" @clickMask="clickMask"></maskMd>
		<loginMd v-show="show_login" @regShow="regShow" @loginSuccess="loginSuccess" @findPassWord="findPassWord" @clickMask="clickMask"></loginMd>
		<regMd v-show="show_reg" @loginShow="loginShow" @regSuccess="regSuccess" @clickMask="clickMask"></regMd>
		<gzhMd v-show="show_gzh" @clickMask="clickMask"></gzhMd>
		<findPassWord v-show="show_findPassWord" @loginShow="loginShow" @clickMask="clickMask" @findPassSuccess="findPassSuccess"></findPassWord>
	</div>
</template>

<script>
	import headComponet from "../../components/headComponet";
	import footNavComponent from "../../components/footNavComponent";
	import backTop from "../../components/backTop";
	import maskMd from "../../components/maskMd";
	import loginMd from "../../components/loginMd";
	import regMd from "../../components/regMd";
	import gzhMd from "../../components/gzhMd";
	import findPassWord from "../../components/findPassWord";
	import utils from "../../config/common.js";
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到

	export default {
		inject: ["reload"],
		name: "mine",
		components: {
			footNavComponent,
			backTop,
			maskMd,
			loginMd,
			regMd,
			gzhMd,
			findPassWord
		},
		data() {
			return {
				score: "",
				vip_exp: "",
				vip_level: "",
				portrait: "",
				baseUrl: "",
				userInfo: {},
				userImg: null,
				userName: "",
				// bgImg: require("../../imgs/swiperBgImg.jpg"),
				// defaultUserImg: require("../../imgs/swiperBgImg.jpg"),
				portraitIcon: require("../../imgs/portraitIcon.png"),
				updateInfoImg: require("../../imgs/updateInfoImg.png"),
				myGiftImg: require("../../imgs/myGiftImg.png"),
				myWalletIcon: require("../../imgs/myWalletIcon.png"),
				dutyCenterIcon: require("../../imgs/dutyCenterIcon.png"),
				serviceIcon: require("../../imgs/serviceIcon.png"),
				integralShopIcon: require("../../imgs/integralShopIcon.png"),
				H5GameImg: require("../../imgs/H5GameImg.png"),
				onlineConnectImg: require("../../imgs/onlineConnectImg.png"),
				qfGzhImg: require("../../imgs/qfGzhImg.png"),
				settingMoreImg: require("../../imgs/settingMoreImg.png"),
				bgImg: require("../../imgs/bgImg.png"),
				loginBgImg: require("../../imgs/loginBgImg.png"),
				contactIcon: require("../../imgs/contactIcon.png"),
				defaultUserImg: require("../../imgs/defaultUserImg.png"),
				userVipIcon1: require("../../imgs/userVipIcon1.png"),
				userVipIcon2: require("../../imgs/userVipIcon2.png"),
				userVipIcon3: require("../../imgs/userVipIcon3.png"),
				userVipIcon4: require("../../imgs/userVipIcon4.png"),
				userVipIcon5: require("../../imgs/userVipIcon5.png"),
				userVipIcon6: require("../../imgs/userVipIcon6.png"),
				userVipIcon7: require("../../imgs/userVipIcon7.png"),
				scoreIcon: require("../../imgs/integralSpIcon.png"),
				expIcon: require("../../imgs/expressIcon.png"),
				show_mask: false,
				show_login: false,
				show_reg: false,
				show_gzh: false,
				show_findPassWord: false,
				isLoginShow: true,
				contactTel:"4000278002",
			};
		},
		beforeCreate: function() {
			var page = utils.navClassStyle();
			this.$store.dispatch("navActive", page);
			this.$store.dispatch("clearScrollType");
			// utils.is_PC();
		},
		created: function() {
			this.baseUrl = this.$store.getters.baseUrl;
		},
		beforeMount: function() {},
		mounted: function() {
			var that = this;
			that.$nextTick(() => {
				document
					.getElementById("minePage")
					.addEventListener("scroll", that.handleScroll, true); // 监听（绑定）滚轮滚动事件

				var checkUserLogin_params = {
					device: that.$store.getters.is_android ? "android" : "ios",
					time: Date.parse(new Date()) + ""
				};

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
					params["access"] = access;
					//   console.log(params);
					return params;
				}

				that
					.$axios({
						method: "post",
						url: "/Wap/api/checkUserLogin",
						data: QS.stringify(mdjm_fun(checkUserLogin_params))
					})
					.then(function(response) {
						console.log(response.data);
						if(response.data.status == 0) {
							//请求不成功
							// console.log("未登录");
							window.localStorage.setItem("isLoginShow", true);
							that.isLoginShow = true;
							window.localStorage.setItem("username", "");
							window.localStorage.setItem("mobile", "");
							window.localStorage.setItem("email", "");
							window.localStorage.setItem("portrait", "");
							that.userImg = null;
						} else if(response.data.status == 1) {
							//请求成功
							// console.log("已登录");
							window.localStorage.setItem("isLoginShow", false);
							window.localStorage.setItem(
								"username",
								response.data.data.username
							);
							window.localStorage.setItem("mobile", response.data.data.mobile);
							window.localStorage.setItem("email", response.data.data.email);
							window.localStorage.setItem("vip_exp", response.data.data.vip_exp);
							window.localStorage.setItem("vip_level", response.data.data.vip_level);
							window.localStorage.setItem("score", response.data.data.score);
							window.localStorage.setItem(
								"portrait",
								response.data.data.portrait
							);
							that.isLoginShow = false;
							if(window.localStorage.getItem("portrait") == "") {
								that.userImg = null;
							} else {
								that.userImg = window.localStorage.getItem("portrait");
							}

							that.score = response.data.data.score;
							that.vip_exp = response.data.data.vip_exp;
							that.vip_level = response.data.data.vip_level;
							that.userName = response.data.data.username;
						}
					})
					.catch(function(error) {
						//   console.log(error);
					});
			});
		},
		beforeUpdate: function() {},
		updated: function() {},
		beforeDestroy: function() {},
		destroyed: function() {
			// document
			//   .getElementById("minePage")
			//   .removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
		},
		methods: {
			onCopy: function(e) {
			    var that = this;
			    that.$confirm("复制成功", '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        showCancelButton: false,
					showClose: false,
					closeOnClickModal: false,
			        type: 'info',
			        center: true
			    }).then(() => {
			    }).catch(() => {
			
			    });
			},
			onError: function(e) {
			    //  console.log(e);
			},
			gzhBtn: function() {
				var that = this;
				var is_weixin = that.$store.getters.is_weixin;
				that.show_mask = true;
				that.show_gzh = true;
			},
			clickMask: function() {
				var that = this;
				that.show_login = false;
				that.show_reg = false;
				that.show_mask = false;
				that.show_findPassWord = false;
				that.show_gzh = false;
			},
			integralShop:function(){
				var that = this;
				that.$router.push({
					name: "integralShop"
				});
			},
			update: function() {
				var that = this;
				that.$router.push({
					name: "update"
				});
			},
			myGiftData: function() {
				var that = this;
				that.$router.push({
					name: "myGift"
				});
			},
			myWalletData:function(){
				var that = this;
				that.$router.push({
					name: "myWallet"
				});
			},
			myDutyCenter: function() {
				var that = this;
				that.$router.push({
					name: "myDutyCenter"
				});
			},
			serviceCenter: function() {
				var that = this;
				that.$router.push({
					name: "serviceCenter"
				});
			},
			myH5Game: function() {
				var that = this;
				window.location.href = "http://h5.520cai.com";
			},
			myConcat: function() {
				var that = this;
				window.location.href =
					"https://cschat.antcloud.com.cn/index.htm?tntInstId=FRAEWACN&scene=SCE00018884";
			},
			findPassSuccess: function() {
				var that = this;
				that.show_login = true;
				that.show_reg = false;
				that.show_mask = true;
				that.show_findPassWord = false;
				that.reload();
			},
			loginSuccess: function() {
				var that = this;
				that.show_login = false;
				that.show_reg = false;
				that.show_mask = false;
				that.reload();
			},
			regSuccess: function() {
				var that = this;
				that.show_login = false;
				that.show_reg = false;
				that.show_mask = false;
				that.reload();
			},
			findPassWord: function() {
				var that = this;
				that.show_login = false;
				that.show_findPassWord = true;
			},
			regShow: function() {
				var that = this;
				that.show_login = false;
				that.show_reg = true;
			},
			loginShow: function() {
				var that = this;
				that.show_login = true;
				that.show_reg = false;
				that.show_findPassWord = false;
			},
			loginBtnFun: function() {
				var that = this;
				that.show_mask = true;
				that.show_login = true;
			},
			quiteLogin: function() {
				var that = this;
				that.$confirm("确定要退出登录么?", '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showClose: false,
					closeOnClickModal: false,
					type: 'warning',
					center: true
				}).then(() => {

					var quiteLogin_params = {
						device: that.$store.getters.is_android ? "android" : "ios",
						time: Date.parse(new Date()) + ""
					};

					function mdjm_fun(params) {
						var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
						params["access"] = access;
						return params;
					}
					this.$axios({
							method: "post",
							url: "/Wap/api/logout",
							data: QS.stringify(mdjm_fun(quiteLogin_params))
						})
						.then(function(response) {
							//   console.log(response.data);
							if(response.data.status == 0) {
								//请求不成功
								that.$confirm(response.data.msg, '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									showCancelButton: false,
									showClose: false,
									closeOnClickModal: false,
									type: 'warning',
									center: true
								}).then(() => {

								}).catch(() => {

								});
							} else if(response.data.status == 1) {
								//请求成功
								that.reload();
								that.$store.dispatch("quiteLogin");
								window.localStorage.setItem("isLoginShow", true);
								that.isLoginShow = true;
							}
						})
						.catch(function(error) {
							//   console.log(error);
						});
				}).catch(() => {

				});
			},
			back_top: function() {
				//   console.log("返回顶部");
				let timer = null,
					_that = this;
				cancelAnimationFrame(timer);
				timer = requestAnimationFrame(function fn() {
					if(document.getElementById("minePage").scrollTop > 0) {
						document.getElementById("minePage").scrollTop -=
							_that.$store.getters.backTopNum;
						document.body.scrollTop = document.documentElement.scrollTop = document.getElementById(
							"minePage"
						).scrollTop;
						timer = requestAnimationFrame(fn);
					} else {
						cancelAnimationFrame(timer);
					}
				});
			},
			handleScroll: function() {
				let clientHeight =
					document.documentElement.clientHeight || document.body.clientHeight;
				// 设备/屏幕高度
				let scrollObj = document.getElementById("minePage"); // 滚动区域
				let scrollTop = scrollObj.scrollTop; // div 到头部的距离
				let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
				//   console.log(
				//     "滚动条到顶部距离===" + scrollTop,
				//     "滚动条总高度===" + scrollHeight,
				//     "设备高度===" + clientHeight
				//   );
				var scroll_Obj = {
					scrollTop: scrollTop,
					scrollHeight: scrollHeight,
					clientHeight: clientHeight
				};
				this.$store.dispatch("scroll_Obj", scroll_Obj);
				//滚动条到底部的条件
				if(scrollTop + clientHeight == scrollHeight) {
					// div 到头部的距离 + 屏幕高度 = 可滚动的总高度
					// console.log("滚动条到底了");
				}
			}
		},
		computed: {
			is_weixin() {
				return this.$store.getters.is_weixin;
			},
			is_android() {
				return this.$store.getters.is_android;
			},
			scroll_Obj() {
				return this.$store.getters.scroll_Obj;
			},
			back_top_show() {
				var scroll_Obj = this.$store.getters.scroll_Obj;
				var backTopShowLen =
					scroll_Obj.scrollHeight -
					scroll_Obj.scrollTop -
					scroll_Obj.clientHeight;
				if(scroll_Obj.scrollTop > 700) {
					return true;
				} else {
					return false;
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	#minePage {
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: auto;
		background: #f5f5f5;
	}
	
	.containerBox {
		border-bottom: 1rem solid transparent;
		.userBox {
			width: 100%;
			height: 4.55rem;
			.score {
				font-size: 0.3rem;
				color: #ffffff;
				top: 0.2rem;
				left: 0.2rem;
			}
			.vip_exp {
				font-size: 0.3rem;
				color: #ffffff;
				top: 0.7rem;
				left: 0.2rem;
			}
			.vip_level {
				font-size: 0.3rem;
				color: #ffffff;
				top: 2.8rem;
			}
			.userImg {
				width: 2.45rem;
				height: 2.45rem;
				border-radius: 50%;
				top: 0.55rem;
			}
			.portraitIcon {
				width: 2.59rem;
				height: auto;
				top: 0.12rem;
			}
			.expBox {
				width: 100%;
				height: 0.6rem;
				right: 0;
				bottom: 0.15rem;
				padding: 0 0.2rem 0 0;
				img {
					width: auto;
					height: 0.4rem;
				}
				span {
					color: #ffffff;
					font-size: 0.3rem;
					margin: 0 0.03rem;
				}
			}
			.scoreBox {
				width: 100%;
				height: 0.6rem;
				left: 0;
				bottom: 0.15rem;
				padding: 0 0 0 0.2rem;
				img {
					width: auto;
					height: 0.4rem;
				}
				span {
					color: #ffffff;
					font-size: 0.3rem;
					margin: 0 0.03rem;
				}
			}
			.userNameBox {
				width: 100%;
				height: 0.6rem;
				bottom: 0.75rem;
				img {
					height: 0.45rem;
					width: auto;
					margin-right: 0.2rem;
				}
				span {
					font-size: 0.3rem;
					color: #ffffff;
				}
			}
			.loginBox {
				width: 2.35rem;
				height: 0.8rem;
				bottom: 0.05rem;
				span {
					color: #fff;
					font-size: 0.28rem;
					line-height: 0.65rem;
					text-align: center;
				}
			}
		}
		.setting_item_box {
			width: 100%;
			height: 0.88rem;
			border-bottom: 0.01rem solid #e6e6e6;
			padding: 0 0.2rem;
			.icon {
				width: 0.6rem;
				height: auto;
			}
			.moreImg {
				width: 0.5rem;
				height: 0.5rem;
				right: 0.35rem;
			}
			.tit {
				font-size: 0.3rem;
				color: #000;
				left: 1.2rem;
			}
		}
	}
	
	.bot_top-enter-active {
		transition: all 0.3s linear;
	}
	
	.bot_top-leave-active {
		transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
	}
	
	.bot_top-enter,
	.bot_top-leave-to {
		transform: translateY(1rem);
		opacity: 1;
	}
</style>