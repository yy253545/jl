<template>
	<div id="changeVouchersPage">
		<div class="headBox posFix">
			<div class="wh">
				<img :src="backImg" class="backImg posAbs mid" @click="back" />
				<span class="posAbs cenMid">兑换代金券</span>
				<img :src="helpImg" class="helpImg posAbs mid" @click="vouchersHelpPage" />
			</div>
		</div>
		<span class="titBox">
			请输入代金券兑换码:
		</span>
		<input type="text" class="vouchersCode" v-model="vouchersCode">
		<span class="changeBtn" @click="changeBtn">立即兑换</span>
	</div>
</template>

<script>
	import utils from "../../config/common.js";
	import axios from "axios";
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
	import vueResource from "vue-resource";
	import Vue from "vue";
	Vue.use(vueResource);

	export default {
		inject: ["reload"],
		name: "changeVouchersPage",
		components: {},
		data() {
			return {
				backImg: require("../../imgs/backImg1.png"),
				helpImg: require("../../imgs/helpImg.png"),
				vouchersCode: "",
			};
		},
		beforeCreate: function() {},
		created: function() {

		},

		beforeMount: function() {},
		mounted: function() {
			var that = this;
		},
		beforeUpdate: function() {},
		updated: function() {},
		beforeDestroy: function() {},
		destroyed: function() {
			// document
			//   .getElementById("indexPage")
			//   .removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
		},
		methods: {
			back: function() {
				var that = this;
				that.$router.push({
					name: "MyVouchers"
				})
			},
			vouchersHelpPage: function() {
				var that = this;
				that.$router.push({
					name: "vouchersHelp"
				})
			},
			changeBtn: function() {
				var that = this;
				var changeVouchersParams = {
					device: that.$store.getters.is_android ? "android" : "ios",
					time: Date.parse(new Date()) + "",
					couponCode: that.vouchersCode + "",
				};

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
					params["access"] = access;
					return params;
				};
				if (that.vouchersCode == '') {
					that.$confirm('请输入您的代金券兑换码', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						showCancelButton: false,
						showClose: false,
						closeOnClickModal: false,
						type: 'warning'
					}).then(() => {

					}).catch(() => {

					});
				} else {
					that
						.$axios({
							method: "post",
							url: "/Wap/api/couponExchange",
							data: QS.stringify(mdjm_fun(changeVouchersParams))
						})
						.then(function(response) {
							if (response.data.status == 0) {
								//请求不成功
								that.$confirm(response.data.msg, '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									showCancelButton: false,
									showClose: false,
									closeOnClickModal: false,
									type: 'warning'
								}).then(() => {
									
								}).catch(() => {

								});
							} else if (response.data.status == 1) {
								//请求成功
								that.$confirm(response.data.msg, '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									showCancelButton: false,
									showClose: false,
									closeOnClickModal: false,
									type: 'warning'
								}).then(() => {

								}).catch(() => {

								});
							}
						})
						.catch(function(error) {
							//   console.log(error);
						});
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
			baseUrl() {
				return this.$store.getters.baseUrl;
			},
			mdjmVal() {
				return this.$store.getters.mdVal;
			}
		}
	};
</script>

<style lang="less" scoped>
	#changeVouchersPage {
		width: 100%;
		padding-top: 1rem;

		.changeBtn {
			line-height: 0.75rem;
			color: #ffffff;
			font-size: 0.34rem;
			padding: 0rem 0.3rem;
			margin: 0.35rem auto;
			background: #ffb74c;
			display: table;
			border-radius: 5px;
		}

		.vouchersCode {
			width: 6.75rem;
			height: 0.7rem;
			border: 1px solid #ffb74c;
			margin: 0.25rem auto;
			border-radius: 0rem;
			color: #ffb74c;
			font-size: 0.34rem;
			text-indent: 0.25rem;
		}

		.titBox {
			width: 100%;
			padding: 0 0.35rem;
			font-size: 0.36rem;
			color: #000000;
			line-height: 0.65rem;
			margin-top: 0.3rem;
		}

		.headBox {
			width: 100%;
			height: 1rem;
			background: #fff;
			top: 0;
			z-index: 1000;
			border-bottom: 1px solid #f5f5f5;

			.backImg {
				width: 0.35rem;
				height: auto;
				left: 0.4rem;
			}

			.helpImg {
				width: 0.5rem;
				height: auto;
				right: 0.4rem;
			}

			span {
				font-size: 0.34rem;
				color: #333333;
			}
		}
	}
</style>
