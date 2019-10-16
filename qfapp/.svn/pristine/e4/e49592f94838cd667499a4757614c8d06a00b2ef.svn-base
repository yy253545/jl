<template>
	<div id="update">
		<backTop v-show="back_top_show" v-on:back_top="back_top"></backTop>
		<div class="containerBox">
			<div class="updateTopBox">
				<div class="wh posRel">
					<img :src="backImg" alt class="backImg posAbs mid" @click="backHistory">
					<h4 class="posAbs cenMid">修改资料</h4>
				</div>
			</div>
			<div class="itemBox userImg flex flexBet" @click="updateImgBtn">
				<span class="tit">头像</span>
				<div class="right flex flexEnd">
					<img v-if="portrait != null" v-lazy="portrait" alt class="user_img">
					<img v-else :src="defaultImg" alt class="user_img defaultImg">
					<img :src="morenImg" alt class="more">
				</div>
			</div>
			<div class="itemBox password flex flexBet" @click="updatePassWord">
				<span class="tit">修改密码</span>
				<div class="right flex flexEnd">
					<img :src="morenImg" alt class="more">
				</div>
			</div>
			<div v-if="telVal != '未绑定'" class="itemBox bindTel flex flexBet">
				<span class="tit">绑定手机号</span>
				<div class="right flex flexEnd">
					<span class="telVal">{{telVal}}</span>
					<img :src="morenImg" alt class="more">
				</div>
			</div>
			<div v-else class="itemBox bindTel flex flexBet" @click="bindTel">
				<span class="tit">绑定手机号</span>
				<div class="right flex flexEnd">
					<span class="telVal">{{telVal}}</span>
					<img :src="morenImg" alt class="more">
				</div>
			</div>
			<div v-if="emailVal != '未绑定'" class="itemBox bindEmail flex flexBet">
				<span class="tit">绑定邮箱</span>
				<div class="right flex flexEnd">
					<span class="emailVal">{{emailVal}}</span>
					<img :src="morenImg" alt class="more">
				</div>
			</div>
			<div v-else class="itemBox bindEmail flex flexBet" @click="bindEmail">
				<span class="tit">绑定邮箱</span>
				<div class="right flex flexEnd">
					<span class="emailVal">{{emailVal}}</span>
					<img :src="morenImg" alt class="more">
				</div>
			</div>
		</div>
		<footNavComponent></footNavComponent>
		<maskMd v-show="show_mask" @clickMask="clickMask"></maskMd>
		<bindTel v-show="show_bindTel" @bindTelSuccess="bindTelSuccess" @clickMask="clickMask"></bindTel>
		<bindEmail v-show="show_bindEmail" @bindEmailSuccess="bindEmailSuccess" @clickMask="clickMask"></bindEmail>
		<updatePassWord v-show="show_updatePassWord" @updatePassSuccess="updatePassSuccess" @intoFindPassWord="intoFindPassWord"
		 @clickMask="clickMask"></updatePassWord>
		<findPassWord v-show="show_findPassWord" @updatePassSuccess="updatePassSuccess" @loginShow="loginShow"
		 @findPassSuccess="findPassSuccess" @clickMask="clickMask"></findPassWord>
		<loginMd v-show="show_login" @regShow="regShow" @clickMask="clickMask" @findPassWord="findPassWord"></loginMd>
		<regMd v-show="show_reg" @loginShow="loginShow" @clickMask="clickMask"></regMd>
		<updateImg v-show="show_updateImg" @clickMask="clickMask" @updateImgSuccess="updateImgSuccess" v-lazy="src"></updateImg>
		<updateImgDemo v-show="show_updateImgDemo" @clickMask="clickMask" @updateImgSuccess="updateImgSuccess" @getImg="getImg"></updateImgDemo>
	</div>
</template>

<script>
	import headComponet from "../../components/headComponet";
	import footNavComponent from "../../components/footNavComponent";
	import backTop from "../../components/backTop";
	import maskMd from "../../components/maskMd";
	import bindTel from "../../components/bindTel";
	import bindEmail from "../../components/bindEmail";
	import updatePassWord from "../../components/updatePassWord";
	import findPassWord from "../../components/findPassWord";
	import loginMd from "../../components/loginMd";
	import regMd from "../../components/regMd";
	import updateImg from "../../components/updateImg";
	import updateImgDemo from "../../components/updateImg1";
	import utils from "../../config/common.js";

	export default {
		inject: ["reload"],
		name: "update",
		components: {
			footNavComponent,
			backTop,
			maskMd,
			bindTel,
			bindEmail,
			updatePassWord,
			findPassWord,
			loginMd,
			regMd,
			updateImg,
			updateImgDemo
		},
		data() {
			return {
				baseUrl: "",
				userInfo: {},
				userImg: false,
				show_mask: false,
				show_bindTel: false,
				show_bindEmail: false,
				show_updatePassWord: false,
				show_findPassWord: false,
				show_login: false,
				show_reg: false,
				show_updateImg: false,
				show_updateImgDemo: false,
				isLoginShow: "",
				morenImg: require("../../imgs/more.png"),
				defaultImg: require("../../imgs/defaultUserImg.png"),
				backImg: require("../../imgs/backImg1.png"),
				emailVal: "未绑定",
				telVal: "未绑定",
				portrait: null,
				src: ""
			};
		},
		beforeCreate: function() {
			this.$store.dispatch("clearScrollType");
		},
		created: function() {
			this.baseUrl = this.$store.getters.baseUrl;
		},
		beforeMount: function() {},
		mounted: function() {
			var that = this;
			this.$nextTick(() => {
				document
					.getElementById("update")
					.addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件

				if (window.localStorage.getItem("mobile") == "") {
					this.telVal = "未绑定";
				} else {
					this.telVal = utils.telPhoneHide(window.localStorage.getItem("mobile"));
				}
				if (window.localStorage.getItem("email") == "") {
					this.emailVal = "未绑定";
				} else {
					this.emailVal = window.localStorage.getItem("email");
				}
				if (window.localStorage.getItem("portrait") == "") {
					this.portrait = null;
				} else {
					this.portrait = window.localStorage.getItem("portrait");
				}
				if (window.localStorage.getItem("username") == "") {
					//                  console.log("没有用户名，没有登录，要去mine页面");
					that.$confirm("未登录，要先去登录么?", '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						showCancelButton: false,
						showClose: false,
						closeOnClickModal: false,
						type: 'warning',
						center: true
					}).then(() => {
						that.$router.push({
							name: "mine"
						})
					}).catch(() => {

					});
				} else {}
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
			getImg: function(getImg) {
				var that = this;
				that.show_updateImg = true;
				that.show_updateImgDemo = false;
				that.show_mask = true;
				console.log(getImg);
				that.src = getImg;
			},
			updateImgBtn: function() {
				var that = this;
				that.show_updateImgDemo = true;
				that.show_mask = true;
			},
			backHistory: function() {
				var that = this;
				that.$router.go(-1);
			},
			findPassWord: function() {
				var that = this;
				that.show_login = false;
				that.show_findPassWord = true;
			},
			clickMask: function() {
				var that = this;
				that.show_mask = false;
				that.show_bindTel = false;
				that.show_bindEmail = false;
				that.show_updatePassWord = false;
				that.show_findPassWord = false;
				that.show_login = false;
				that.show_reg = false;
				that.show_updateImg = false;
				that.show_updateImgDemo = false;
				that.reload();
			},
			updateImgSuccess: function() {
				var that = this;
				//              console.log("是否过来了");
				that.show_mask = false;
				that.show_updateImg = false;
				that.$confirm("头像更改成功", '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showCancelButton: false,
					showClose: false,
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					that.reload();
				}).catch(() => {

				});
			},
			findPassSuccess: function() {
				var that = this;
				that.show_mask = false;
				that.show_findPassWord = false;
				that.$confirm("找回密码成功", '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showCancelButton: false,
					showClose: false,
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					that.reload();
				}).catch(() => {

				});
			},
			regShow: function() {
				var that = this;
				that.show_login = false;
				that.show_reg = true;
			},
			loginShow: function() {
				var that = this;
				that.show_login = true;
				that.show_findPassWord = false;
				that.show_reg = false;
			},
			intoFindPassWord: function() {
				var that = this;
				that.show_updatePassWord = false;
				that.show_findPassWord = true;
			},
			updatePassSuccess: function() {
				var that = this;
				//   console.log("修改密码成功");
				that.show_mask = false;
				that.show_updatePassWord = false;
				that.$confirm("密码修改成功", '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showCancelButton: false,
					showClose: false,
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					that.reload();
				}).catch(() => {

				});
			},
			updatePassWord: function() {
				var that = this;
				//   console.log("更改密码;");
				that.show_updatePassWord = true;
				that.show_mask = true;
			},
			bindTelSuccess: function() {
				var that = this;
				//   console.log("绑定手机号成功");
				that.show_mask = false;
				that.show_bindTel = false;
				that.$confirm("绑定手机号成功", '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showCancelButton: false,
					showClose: false,
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					that.reload();
				}).catch(() => {

				});
			},
			bindEmailSuccess: function() {
				var that = this;
				//   console.log("绑定邮箱成功");
				that.show_mask = false;
				that.show_bindEmail = false;
				that.$confirm("绑定邮箱成功", '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showCancelButton: false,
					showClose: false,
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					that.reload();
				}).catch(() => {

				});
			},
			bindTel: function() {
				var that = this;
				//   console.log("绑定手机号");
				that.show_mask = true;
				that.show_bindTel = true;
			},
			bindEmail: function() {
				var that = this;
				//   console.log("绑定邮箱");
				that.show_mask = true;
				that.show_bindEmail = true;
			},
			back_top: function() {
				//   console.log("返回顶部");
				let timer = null,
					_that = this;
				cancelAnimationFrame(timer);
				timer = requestAnimationFrame(function fn() {
					if (document.getElementById("update").scrollTop > 0) {
						document.getElementById("update").scrollTop -=
							_that.$store.getters.backTopNum;
						document.body.scrollTop = document.documentElement.scrollTop = document.getElementById(
							"update"
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
				let scrollObj = document.getElementById("update"); // 滚动区域
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
				if (scrollTop + clientHeight == scrollHeight) {
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
				if (scroll_Obj.scrollTop > 700) {
					return true;
				} else {
					return false;
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	#update {
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
		background: #f5f5f5;

		.updateTopBox {
			width: 100%;
			height: 0.9rem;
			background: #fff;

			.backImg {
				width: 0.35rem;
				height: auto;
				left: 0.25rem;
				z-index: 666;
			}

			h4 {
				width: 100%;
				height: 0.9rem;
				font-size: 0.3rem;
				font-weight: 600;
				color: #000;
				line-height: 0.9rem;
				text-align: center;
				background: #fff;
			}
		}

		.itemBox {
			width: 100%;
			height: 0.86rem;
			padding: 0 0.25rem;
			border-top: solid #f5f5f5 0.1rem;
			background: #fff;

			.tit {
				font-size: 0.28rem;
				color: #000;
			}

			.more {
				width: 0.32rem;
				height: auto;
				margin-left: 0.15rem;
			}

			.telVal,
			.emailVal {
				font-size: 0.28rem;
				color: #cccccc;
			}
		}

		.userImg {
			height: 1.18rem;

			.user_img {
				width: 1rem;
				height: 1rem;
				border-radius: 10px;
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
