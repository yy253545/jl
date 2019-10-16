<template>
	<div id="goodsDetail">
		<backTop v-show="back_top_show" v-on:back_top="back_top"></backTop>
		<div class="headBox posFix">
			<div class="wh">
				<img :src="backImg" class="backImg posAbs mid" @click="backHistory" />
				<span class="posAbs cenMid">周边详情</span>
			</div>
		</div>
		<!--<div class="updateTopBox flex flexSta posFix">
			<img :src="backImg" alt class="backImg" @click="backHistory">
			<h3 class>周边详情</h3>
		</div>-->
		<div class="newsDetail_containerBox">
			<div class="top_box posRel">
				<img :src="goodsDetailData.original_img" alt="" class="icon posAbs mid" />
				<span class="nameBox posAbs">{{goodsDetailData.name}}</span>
				<span class="remain_count posAbs">所需积分:{{parseFloat(goodsDetailData.integral)}}</span>
				<!--<span class="addGwcBtn posAbs">加入购物车</span>-->
				<span class="checkBtn posAbs" @click="checkBtnFun(goodsDetailData.id)">兑换</span>
			</div>
			<div class="tit_box flex flexCen">
				<img :src="lpmsIcon" />
				<span id="">
					礼品描述
				</span>
			</div>
			<div id="" v-html="goodsDetailData.goods_content" style="padding:0.5rem;">

			</div>
		</div>
		<div class="backMinePage posFix">
			<span @click="backMinePage">
							返回积分商城
						</span>
		</div>
	</div>
</template>

<script>
	import backTop from "../../components/backTop";
	import utils from "../../config/common.js";
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到

	export default {
		inject: ["reload"],
		name: "goodsDetail",
		components: {
			backTop,
		},
		data() {
			return {
				backImg: require("../../imgs/backImg1.png"),
				lpmsIcon: require("../../imgs/lpmsIcon.png"),
				id: "",
				goodsDetailData: "",
			};
		},
		beforeCreate: function() {
			this.$store.dispatch("clearScrollType");
			// utils.is_PC();
		},
		created: function() {
			this.baseUrl = this.$store.getters.baseUrl;
		},
		beforeMount: function() {},
		mounted: function() {
			var that = this;
			that.getParams();
			document
				.getElementById("goodsDetail")
				.addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件

			var is_android = that.$store.getters.is_android;
			var device = is_android ? "android" : "ios";
			var value = that.$store.getters.mdVal;
			var goodsdetail_id = window.localStorage.getItem("goodsdetail_id") + '';
			var id = that.id + '';

			var goodsDetail_params = {
				device: device,
				time: Date.parse(new Date()) + "",
				id: goodsdetail_id || id
			};

			function mdjm_fun(params) {
				var access = that.$mdjm(JSON.stringify(params) + value);
				params["access"] = access;
				return params;
			}

			that.$axios({
					method: "post",
					url: "/Wap/api/getGoodsDetail",
					data: QS.stringify(mdjm_fun(goodsDetail_params))
				})
				.then(function(response) {
					// console.log(response.data);
					if(response.data.status == 0) {
						//请求不成功
						//   console.log("请求不成功");
						that.$confirm(response.data.msg, '提示', {
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
					} else if(response.data.status == 1) {
						//请求成功
						var res_data = response.data.data;
						//						console.log(res_data);
						that.goodsDetailData = res_data;
					}
				})
				.catch(function(error) {
					// console.log(error);
				});
		},
		beforeUpdate: function() {},
		updated: function() {},
		beforeDestroy: function() {},
		destroyed: function() {},
		watch: {
			// 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
			$route: "getParams"
		},
		methods: {
			checkBtnFun: function(id) {
				var that = this;
				var userName = window.localStorage.getItem('username');
				if(userName) {
					that.$router.push({
						name: "check",
						params: {
							id: id
						}
					});
					window.localStorage.setItem("goodsdetail_id", id);
				} else {
					that.$confirm('需要先登录', '提示', {
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
				}
			},
			backMinePage: function() {
				var that = this;
				that.$router.push({
					name: "integralShop"
				})
			},
			backHistory: function() {
				var that = this;
				that.$router.go(-1);
			},
			getParams() {
				// 取到路由带过来的参数
				//   console.log(this.$route.params.id);
				let routerParams = this.$route.params.id; // 将数据放在当前组件的数据内
				//   console.log(routerParams);
				this.id = routerParams;
				//   console.log(this.id);
			},
			back_top: function() {
				//   console.log("返回顶部");
				let timer = null,
					_that = this;
				cancelAnimationFrame(timer);
				timer = requestAnimationFrame(function fn() {
					if(document.getElementById("goodsDetail").scrollTop > 0) {
						document.getElementById("goodsDetail").scrollTop -=
							_that.$store.getters.backTopNum;
						document.body.scrollTop = document.documentElement.scrollTop = document.getElementById(
							"goodsDetail"
						).scrollTop;
						timer = requestAnimationFrame(fn);
					} else {
						cancelAnimationFrame(timer);
					}
				});
			},
			handleScroll: function() {
				var that = this;
				let clientHeight =
					document.documentElement.clientHeight || document.body.clientHeight;
				// 设备/屏幕高度
				let scrollObj = document.getElementById("goodsDetail"); // 滚动区域
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
	#goodsDetail {
		height: 100%;
// 		position: absolute;
// 		top: 0;
// 		bottom: 0;
// 		left: 0;
// 		right: 0;
// 		overflow: auto;
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
			span {
				font-size: 0.34rem;
				color: #333333;
			}
		}
		.updateTopBox {
			width: 100%;
			height: 0.8rem;
			top: 0;
			z-index: 9999;
			background: #fff;
			padding: 0 0.25rem;
			img {
				width: 0.35rem;
				height: auto;
			}
			h3 {
				font-size: 0.4rem;
				margin-left: 2.4rem;
			}
		}
		.backMinePage {
			width: 100%;
			height: 1rem;
			background: #ffffff;
			bottom: 0rem;
			z-index: 400;
			span {
				font-size: 0.34rem;
				color: #FFFFFF;
				line-height: 0.6rem;
				border-radius: 5px;
				width: 5rem;
				background: #ffbf00;
				text-align: center;
				margin: 0.2rem auto;
			}
		}
		.newsDetail_containerBox {
			border-top: 1rem solid transparent;
			border-bottom: 1rem solid transparent;
			.tit_box {
				width: 100%;
				height: 1rem;
				img {
					width: auto;
					height: 0.45rem;
					margin-right: 0.2rem;
				}
				span {
					font-size: 0.3rem;
					color: #333333;
				}
			}
			.top_box {
				width: 100%;
				height: 1.55rem;
				background: #f5f5f5;
				padding: 0 0.4rem 0 0.55rem;
				.icon {
					width: 1.2rem;
					height: 1.2rem;
					left: 0.55rem;
				}
				.nameBox {
					font-size: 0.3rem;
					color: #333333;
					top: 0.25rem;
					left: 1.88rem;
				}
				.remain_count {
					font-size: 0.3rem;
					color: #333333;
					bottom: 0.25rem;
					left: 1.88rem;
				}
				.addGwcBtn {
					width: 1.8rem;
					height: 0.45rem;
					font-size: 0.3rem;
					border-radius: 3px;
					color: #ffffff;
					text-align: center;
					line-height: 0.45rem;
					top: 0.25rem;
					right: 0.4rem;
					background: -webkit-linear-gradient(#ffcc00, #ffb900, #ff9c00);
					/* Safari 5.1 - 6.0 */
					background: -o-linear-gradient(#ffcc00, #ffb900, #ff9c00);
					/* Opera 11.1 - 12.0 */
					background: -moz-linear-gradient(#ffcc00, #ffb900, #ff9c00);
					/* Firefox 3.6 - 15 */
					background: linear-gradient(#ffcc00, #ffb900, #ff9c00);
					/* 标准的语法 */
				}
				.checkBtn {
					width: 1.8rem;
					height: 0.45rem;
					font-size: 0.3rem;
					color: #ffffff;
					text-align: center;
					line-height: 0.45rem;
					bottom: 0.25rem;
					right: 0.4rem;
					border-radius: 3px;
					background: -webkit-linear-gradient(#ff8300, #ff5b00, #ff3700);
					/* Safari 5.1 - 6.0 */
					background: -o-linear-gradient(#ff8300, #ff5b00, #ff3700);
					/* Opera 11.1 - 12.0 */
					background: -moz-linear-gradient(#ff8300, #ff5b00, #ff3700);
					/* Firefox 3.6 - 15 */
					background: linear-gradient(#ff8300, #ff5b00, #ff3700);
					/* 标准的语法 */
				}
			}
		}
	}
</style>