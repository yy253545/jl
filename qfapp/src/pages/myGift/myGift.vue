<template>
	<div id="myGift">
		<backTop v-show="back_top_show" v-on:back_top="back_top"></backTop>
		<!-- <headComponet></headComponet> -->
		<div class="updateTopBox flex flexSta posFix">
			<img :src="backImg" alt class="backImg" @click="backHistory">
			<h4 class>我的礼包</h4>
		</div>
		<getGiftCopy v-show="show_getGiftCopy" :giftCode="giftCode" @clickMask="clickMask"></getGiftCopy>
		<maskMd v-show="show_mask" @clickMask="clickMask"></maskMd>

		<div class="containerBox">
			<div class="myGift" v-if="myGiftData.length != 0">
				<div class="myGiftItem posRel" v-for="(item ,index) in myGiftData" :key="index">
					<img v-lazy="item.game_icon" alt class="icon posAbs">
					<span class="name posAbs ellipsis">{{item.game_name}}</span>
					<span class="giftType posAbs">礼包类型:{{item.gift_title}}</span>
					<span class="giftContent posAbs mid" style="line-height: 0.28rem;-webkit-box-orient: vertical;">礼包内容:{{item.content}}</span>
					<div class="giftCode posAbs flex flexSta">
						专属礼包码:
						<span>{{item.gift_code}}</span>
					</div>
					<span class="posAbs mid copyCodeSp" @click="copyCodeBtnFun(item.gift_code)">
						复制
					</span>
				</div>
			</div>
			<span v-else class="no_myGift_data">还没有领取礼包，快去领取吧~</span>
			<span class="no_mygift">啊哦，您的礼包只有这些了呢</span>
			<h4 v-if="hotGiftData.length != 0" style="padding: 0 0 0 0.4rem;color: #ff6501;">热门游戏礼包</h4>
			<div class="myGift" v-if="hotGiftData.length != 0">
				<div class="myGiftItem hotGiftItem posRel" v-for="(item ,index) in hotGiftData" :key="index">
					<img v-lazy="item.icon" alt class="icon posAbs">
					<span class="name posAbs">{{item.game_name}}</span>
					<span class="giftType posAbs">礼包类型:{{item.gift_title}}</span>
					<span class="giftContent posAbs mid" style="line-height: 0.28rem;-webkit-box-orient: vertical;">礼包内容:{{item.content}}</span>
					<span class="getGiftCode posAbs mid" @click="getGiftBtn(item.id)">领取</span>
				</div>
			</div>
		</div>
		<footNavComponent></footNavComponent>
	</div>
</template>

<script>
	import getGiftCopy from "../../components/getGiftCopy";
	import maskMd from "../../components/maskMd";

	import headComponet from "../../components/headComponet";
	import footNavComponent from "../../components/footNavComponent";
	import newsListMd from "../../components/commons/newsListMd";
	import backTop from "../../components/backTop";
	import utils from "../../config/common.js";
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到

	export default {
		inject: ["reload"],
		name: "myGift",
		components: {
			headComponet,
			backTop,
			footNavComponent,
			newsListMd,
			getGiftCopy,
			maskMd
		},
		data() {
			return {
				baseUrl: "",
				newsListData: [], //搜索到的数据列表
				newsListP: 1,
				selectGameVal: "", //选择的游戏数据;
				selectTypeVal: "", //选择咨询类型数据;
				app_id: "0",
				type: "0",
				game_picker_data: [],
				no_more_news: false,
				myGiftData: [], //我的礼包数据
				hotGiftData: [], //热门游戏礼包
				username: "",
				backImg: require("../../imgs/backImg1.png"),
				show_mask: false,
				show_getGiftCopy: false,
				giftCode: "",
			};
		},
		beforeCreate: function() {
			this.$store.dispatch("clearScrollType");
		},
		created: function() {
			this.baseUrl = this.$store.getters.baseUrl;
			this.username = window.localStorage.getItem("username");
		},
		beforeMount: function() {},
		mounted: function() {
			var that = this;
			that.$nextTick(() => {
				document
					.getElementById("myGift")
					.addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件

				if (window.localStorage.getItem("username") == "") {
					//                  console.log("没有用户名，没有登录，要去mine页面");

					that.$confirm("需要先登陆", '提示', {
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
				} else {

					var is_android = that.$store.getters.is_android;
					var device = is_android ? "android" : "ios";
					var value = that.$store.getters.mdVal;

					var mygift_params = {
						device: device,
						time: Date.parse(new Date()) + ""
					};

					function mdjm_fun(params) {
						var access = that.$mdjm(JSON.stringify(params) + value);
						params["access"] = access;
						//   console.log(params);
						return params;
					}
					this.$axios({
							method: "post",
							url: "/Wap/api/userGift",
							data: QS.stringify(mdjm_fun(mygift_params))
						})
						.then(function(response) {
							// console.log(response.data);
							if (response.data.status == 0) {
								//请求不成功
								// console.log("请求不成功");
							} else if (response.data.status == 1) {
								//请求成功
								var res_data = response.data.data;
								// console.log(res_data);
								if (res_data.userGift.length != 0) {
									that.myGiftData = res_data.userGift;
								}
								if (res_data.hot.length != 0) {
									that.hotGiftData = res_data.hot;
								}
							}
						})
						.catch(function(error) {
							//   console.log(error);
						});
				}
			});
		},
		beforeUpdate: function() {},
		updated: function() {},
		beforeDestroy: function() {},
		destroyed: function() {},
		methods: {
			copyCodeBtnFun: function(code) {
				var that = this;
				that.giftCode = code;
				that.show_getGiftCopy = true;
				that.show_mask = true;
			},
			clickMask: function() {
				var that = this;
				that.show_mask = false;
				that.show_getGiftCopy = false;
			},
			getGiftBtn: function(gift_id) {
				var that = this;
				//   console.log("领取礼包===" + gift_id);
				var value = that.$store.getters.mdVal;
				var is_android = that.$store.getters.is_android;
				var device = is_android ? "android" : "ios";
				var getGift_params = {
					device: device,
					time: Date.parse(new Date()) + "",
					gift_id: gift_id
				};

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + value);
					params["access"] = access;
					//   console.log(params);
					return params;
				}
				that
					.$axios({
						method: "post",
						url: "/Wap/api/getGiftCode",
						data: QS.stringify(mdjm_fun(getGift_params))
					})
					.then(function(response) {
						// console.log(response.data);
						if (response.data.status == 0) {
							//请求不成功
							// console.log("请求不成功");
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
						} else if (response.data.status == 2) {
							//未登录
							that.$confirm("未登录，要先去登录么?", '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: true,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning',
								center: true
							}).then(() => {
								that.show_login = true;
								that.show_mask = true;
							}).catch(() => {

							});
						} else if (response.data.status == 1) {
							//请求成功
							var res_data = response.data.data;
							that.show_getGiftCopy = true;
							that.show_mask = true;
							that.giftCode = response.data.data;
						}
					})
					.catch(function(error) {
						//   console.log(error);
					});
			},
			backHistory: function() {
				var that = this;
				that.$router.go(-1);
			},
			back_top: function() {
				//   console.log("返回顶部");
				let timer = null,
					_that = this;
				cancelAnimationFrame(timer);
				timer = requestAnimationFrame(function fn() {
					if (document.getElementById("myGift").scrollTop > 0) {
						document.getElementById("myGift").scrollTop -=
							_that.$store.getters.backTopNum;
						document.body.scrollTop = document.documentElement.scrollTop = document.getElementById(
							"myGift"
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
				let scrollObj = document.getElementById("myGift"); // 滚动区域
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
				if (scrollTop == scrollHeight - clientHeight) {
					// div 到头部的距离 + 屏幕高度 = 可滚动的总高度
					// console.log("要做数据请求了");
					that.newsListP += 1;
					var value = this.$store.getters.mdVal;
					var is_android = this.$store.getters.is_android;
					var device = is_android ? "android" : "ios";

					function mdjm_fun(params) {
						var access = that.$mdjm(JSON.stringify(params) + value);
						params["access"] = access;
						//   console.log(params);
						return params;
					}

					var news_params = {
						device: device,
						time: Date.parse(new Date()) + "",
						app_id: that.app_id + "",
						p: that.newsListP + "",
						type: that.type + ""
					};

					function mdjm_fun(params) {
						var access = that.$mdjm(JSON.stringify(params) + value);
						params["access"] = access;
						//   console.log(params);
						return params;
					}
					that
						.$axios({
							method: "post",
							url: "/Wap/api/newsAllList",
							data: QS.stringify(mdjm_fun(news_params))
						})
						.then(function(response) {
							// console.log(response.data);
							if (response.data.status == 0) {
								//请求不成功
								//   console.log("请求不成功");
							} else if (response.data.status == 1) {
								//请求成功
								var res_data = response.data.data;
								//   console.log(res_data);
								var newsList_Data = res_data;
								if (newsList_Data.length != 0) {
									for (let i = 0; i < newsList_Data.length; i++) {
										newsList_Data[i].post_date = newsList_Data[i].post_date.slice(
											5
										);
									}
									that.newsListData = that.newsListData.concat(newsList_Data);
								} else {
									that.no_more_news = true;
								}
							}
						})
						.catch(function(error) {
							// console.log(error);
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
<style scoped lang="less">
	#myGift {
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: auto;
	}

	.usernameBozx {
		width: 100%;
		height: 1rem;
		font-size: 0.28rem;
		color: #434343;
		padding: 0 0.33rem;
		border-top: 0.3rem solid #f5f5f5;
		border-bottom: 0.3rem solid #f5f5f5;
		bottom: 1rem;
		z-index: 1000;
		background: #fff;

		span {
			color: #fe7e00;
			margin: 0 0.2rem;
		}
	}

	.updateTopBox {
		width: 100%;
		height: 0.9rem;
		background: #fff;
		z-index: 1000;
		padding: 0 0.25rem;

		.backImg {
			width: 0.35rem;
			height: auto;
			left: 0.25rem;
			z-index: 666;
		}

		h4 {
			font-size: 0.4rem;
			margin-left: 2.4rem;
		}
	}

	.containerBox {
		border-top: 0.9rem solid transparent;
		border-bottom: 1rem solid transparent;

		.no_myGift_data {
			width: 100%;
			height: 0.55rem;
			background: #f0f0f0;
			font-size: 0.22rem;
			color: #000;
			line-height: 0.55rem;
			text-align: center;
		}

		.no_mygift {
			width: 100%;
			height: 0.55rem;
			background: #f0f0f0;
			font-size: 0.22rem;
			color: #000;
			line-height: 0.55rem;
			text-align: center;
		}

		.myGift {
			width: 100%;

			.myGiftItem {
				padding: 0 0.4rem;
				width: 100%;
				height: 2rem;
				border-top: solid #f5f5f5 0.1rem;

				.icon {
					width: 1.2rem;
					height: 1.2rem;
					border-radius: 10px;
					top: 0.12rem;
					left: 0.4rem;
				}

				.name {
					width: 1.2rem;
					bottom: 0.1rem;
					font-size: 0.26rem;
					color: #000;
					line-height: 0.26rem;
					text-align: center;
					left: 0.4rem;
				}

				.giftType {
					font-size: 0.26rem;
					color: #000;
					left: 2.1rem;
					top: 0.18rem;
					width: 5.15rem;
				}

				.giftContent {
					font-size: 0.26rem;
					color: #000;
					line-height: 0.35rem;
					left: 2.1rem;
					max-width: 3.5rem;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.giftCode {
					font-size: 0.26rem;
					color: #000;
					left: 2.1rem;
					bottom: 0.18rem;
					width: 5rem;

					span {
						font-size: 0.26rem;
						color: #ff6501;
						text-decoration: underline;
					}
				}

				.copyCodeSp {
					font-size: 0.25rem;
					color: #FFFFFF;
					padding: 0rem 0.2rem;
					border-radius: 5px;
					background: #ff6501;
					right: 0.4rem;
				}
			}

			.hotGiftItem {
				.giftContent {
					font-size: 0.26rem;
					color: #000;
					line-height: 0.28rem;
					left: 2.1rem;
					width: 3.5rem;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.giftType {
					top: 0.26rem;
					width: 3.5rem;
				}

				.getGiftCode {
					width: 1.05rem;
					height: 0.43rem;
					border-radius: 3px;
					border: solid #f92300 2px;
					font-size: 0.26rem;
					color: #f92300;
					text-align: center;
					line-height: 0.43rem;
					right: 0.4rem;
				}
			}
		}
	}
</style>
