<template>
	<div id="bindEmail" class="posFix cenMid">
		<div class="wh posRel">
			<img :src="loginBgImg" alt class="loginBgImg posAbs wh">
			<span class="tit posAbs">绑定邮箱</span>
			<form action class="posAbs">
				<div class="iptBox userNameIpt flex flexSta">
					<img :src="userNameIptIcon" alt class="iptIcon">
					<input type="text" name="emailVal" placeholder="请输入邮箱地址" v-model="emailVal">
				</div>
				<div class="yzmBox flex flexBet">
					<input type="text" name="yzmVal" placeholder="请输入验证码" v-model="yzmVal">
					<div class="identifyBox flex flexAro" @click="refreshCode">
						<codecanvas :identifyCode="identifyCode"></codecanvas>
					</div>
				</div>
				<div class="btnBox posRel">
					<img :src="loginBtnBg" alt class="iptIcon posAbs wh">
					<span class="posAbs cenMid" @click="bindEmail">绑定</span>
				</div>
			</form>
			<closeMd @clickMask="clickMask"></closeMd>
		</div>
	</div>
</template>

<script>
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
	import utils from "../config/common.js";
	import codecanvas from "./commons/code";
	import closeMd from "./closeMd";

	export default {
		name: "bindEmail",
		components: {
			codecanvas,
			closeMd
		},
		data() {
			return {
				loginBgImg: require("../imgs/loginBg_img.png"),
				userNameIptIcon: require("../imgs/bindEmail.png"),
				loginBtnBg: require("../imgs/loginBtnBg.png"),
				emailVal: "",
				yzmVal: "",
				getYzm: "获取验证码",
				identifyCodes: "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
				identifyCode: ""
			};
		},
		beforeCreate: function() {},
		created: function() {},
		beforeMount: function() {},
		mounted: function() {
			this.identifyCode = "";
			this.makeCode(this.identifyCodes, 4);
		},
		beforeUpdate: function() {},
		updated: function() {},
		beforeDestroy: function() {},
		destroyed: function() {},
		methods: {
			clickMask: function() {
				var that = this;
				that.$emit("clickMask");
			},
			bindEmail: function() {
				var that = this;
				//   console.log(that.emailVal, that.yzmVal);
				if (that.emailVal == "" || that.yzmVal == "") {
					//有空的数据
					// console.log("有的数据是空的不能提交");
					that.$confirm("请填写您的所有信息", '提示', {
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
				} else if (utils.is_email(that.emailVal) == 0) {
					//邮箱格式不对
					// console.log("邮箱格式不对");
					that.$confirm("邮箱格式不对,请重新填写", '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						showCancelButton: false,
						showClose: false,
						closeOnClickModal: false,
						type: 'warning',
						center: true
					}).then(() => {}).catch(() => {

					});
				} else if (that.yzmVal.toLowerCase() != that.identifyCode.toLowerCase()) {
					//验证码不对
					// console.log("验证码不对");
					that.$confirm("验证码不对,请重新填写", '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						showCancelButton: false,
						showClose: false,
						closeOnClickModal: false,

						type: 'warning',
						center: true
					}).then(() => {
						that.refreshCode();
					}).catch(() => {

					});
				} else {
					var is_android = that.$store.getters.is_android;
					var device = is_android ? "android" : "ios";
					var value = that.$store.getters.mdVal;
					var bindEmail_params = {
						device: device,
						time: Date.parse(new Date()) + "",
						bindemail: that.emailVal + ""
					};

					function mdjm_fun(params) {
						var access = that.$mdjm(JSON.stringify(params) + value);
						params["access"] = access;
						//   console.log(params);
						return params;
					}
					this.$axios({
							method: "post",
							url: "/Wap/api/bindEmail",
							data: QS.stringify(mdjm_fun(bindEmail_params))
						})
						.then(function(response) {
							// console.log(response.data);
							if (response.data.status == 0) {
								//请求不成功
								//   console.log("请求不成功;邮箱或者验证码不正确");
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
							} else if (response.data.status == 1) {
								//请求成功
								//   console.log(res_data);
								window.localStorage.setItem("email", response.data.data);
								that.$emit("bindEmailSuccess");
							}
						})
						.catch(function(error) {
							// console.log(error);
						});
				}
			},
			getYzmBtn: function() {
				var that = this;
				//   console.log("获取验证码");
				var num = 60;
				var time = setInterval(function() {
					num -= 1;
					that.getYzm = num;
					if (num == 0) {
						clearInterval(time);
						that.getYzm = "点击获取验证码";
					}
				}, 1000);
			},
			randomNum: function(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			},
			refreshCode: function() {
				this.identifyCode = "";
				this.makeCode(this.identifyCodes, 4);
			},
			makeCode: function(o, l) {
				for (let i = 0; i < l; i++) {
					this.identifyCode += this.identifyCodes[
						this.randomNum(0, this.identifyCodes.length)
					];
				}
				//   console.log(this.identifyCode);
			}
		},
		computed: {}
	};
</script>
<style scoped lang="less">
	#bindEmail {
		width: 6rem;
		height: 4.65rem;
		z-index: 1500;

		.tit {
			width: 100%;
			font-size: 0.35rem;
			line-height: 0.75rem;
			text-align: center;
			border-bottom: 0.02rem solid #e6e6e6;
			color: #ffbf00;
			font-weight: 600;
			top: 0.25rem;
		}

		form {
			width: 100%;
			height: 4.55rem;
			top: 1rem;

			.btnBox {
				width: 4.88rem;
				height: 0.7rem;
				margin: 0.4rem auto 0rem;

				span {
					width: 100%;
					height: 100%;
					line-height: 0.7rem;
					font-size: 0.35rem;
					color: #fff;
					font-weight: 600;
					background: none;
					text-align: center;
				}
			}

			.sureBindTel {
				font-size: 0.24rem;
				line-height: 0.5rem;
				color: #000;
				width: 100%;
				text-align: center;
			}

			.yzmBox {
				width: 5.1rem;
				height: 0.7rem;
				margin: 0.4rem auto 0rem;

				input {
					width: 2.2rem;
					height: 0.65rem;
					outline: none;
					border: none;
					background: #f6f6f6;
					font-size: 0.28rem;
					border: 0.02rem solid #ffbf00;
					text-align: center;
				}

				.identifyBox {
					width: 2.2rem;
					height: 0.65rem;
					border: 0.02rem solid #bbbbbb;
				}
			}

			.iptBox {
				width: 5.1rem;
				height: 0.7rem;
				border: 0.02rem solid #ffbf00;
				margin: 0.45rem auto 0rem;
				background: #f6f6f6;

				.iptIcon {
					width: auto;
					height: 0.4rem;
					margin-left: 0.3rem;
				}

				input {
					width: 4.2rem;
					height: 100%;
					outline: none;
					border: none;
					background: #f6f6f6;
					font-size: 0.28rem;
					margin-left: 0.3rem;
				}
			}
		}
	}
</style>
