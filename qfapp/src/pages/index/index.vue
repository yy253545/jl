<template>
	<div id="indexPage">
		<backTop v-show="back_top_show" v-on:back_top="back_top"></backTop>
		<headComponet></headComponet>
		<div class="containerBox">
			<div class="swiper_box">
				<swiper :options="swiperOption" v-if="swiperdata.length!=0">
					<swiper-slide v-for="(item,index) in swiperdata" :key="index">
						<img @click="into_gameDetail_fun(item.app_id)" :src="item.slide_pic" alt v-if="index==0||index==(swiperdata.length-1)">
						<img v-lazy="item.slide_pic" v-else>
					</swiper-slide>
					<!-- Optional controls -->
					<div class="swiper-pagination" slot="pagination"></div>
					<!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
					<!-- <div class="swiper-button-next" slot="button-next"></div> -->
					<!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
				</swiper>
			</div>
			<!-- //推荐游戏 -->
			<div class="recommendGame">
				<topTit titspan="推荐游戏" routerHref="game"></topTit>
				<div class="recommendGame_items flex flexAro">
					<div class="recommendGameItem flex flexBetCol" v-for="(item,index) in recommendGameData" :key="index">
						<img @click="into_gameDetail_fun(item.app_id)" v-lazy="item.icon" alt class="iconImg">
						<span @click="into_gameDetail_fun(item.app_id)" class="iconSp elips">{{item.name}}</span>
					</div>
				</div>
			</div>
			<!-- //热门游戏 -->
			<div class="hotGame">
				<topTit titspan="热门游戏" routerHref="game"></topTit>
				<div class="hotGame_items">
					<hotGameMd v-for="(item,index) in gamehot" :key="index" :item="item"></hotGameMd>
				</div>
			</div>
			<!-- //游戏专题 -->
			<div class="projectGame">
				<topTit titspan="游戏专题" routerHref="news"></topTit>
				<div class="specialPj">
					<div class="wh posRel" @click="into_newsDetail_fun(specialPj_id)">
						<img v-if="specialPj_src" v-lazy="specialPj_src" alt class="bgImg posAbs wh">
						<img v-else :src="defaultImg" alt class="bgImg posAbs wh">
						<div class="botBox posAbs flex flexSta">
							<span class="line"></span>
							<span class="descSp">{{specialPj_desc}}</span>
						</div>
					</div>
				</div>
				<div class="projectGame_items">
					<projectGameMd v-for="(item,index) in projectGameData" :key="index" :item="item"></projectGameMd>
				</div>
			</div>
		</div>
		<footNavComponent></footNavComponent>
	</div>
</template>

<script>
	import headComponet from "../../components/headComponet";
	import swiperComponent from "../../components/swiperComponent";
	import footNavComponent from "../../components/footNavComponent";
	import backTop from "../../components/backTop";
	import topTit from "../../components/commons/topTit";
	import hotGameMd from "../../components/commons/hotGameMd";
	import projectGameMd from "../../components/commons/projectGameMd";
	import utils from "../../config/common.js";
	import axios from "axios";
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
	import vueResource from "vue-resource";
	import Vue from "vue";
	import {
		apiAddress
	} from "@/request/api"; // 导入我们的api接口
	import "swiper/dist/css/swiper.css";
	import VueAwesomeSwiper from "vue-awesome-swiper";
	import {
		swiper,
		swiperSlide
	} from "vue-awesome-swiper";

	Vue.use(vueResource);
	export default {
		name: "index",
		components: {
			headComponet,
			swiperComponent,
			footNavComponent,
			backTop,
			topTit,
			hotGameMd,
			projectGameMd,
			swiper,
			swiperSlide
		},
		data() {
			return {
				defaultImg: require("../../imgs/defaultImg.png"),
				swiperdata: [],
				gameremd: [], //推荐游戏
				gamehot: [], //热门游戏的数据
				newsList: [], //游戏专题
				swiperOption: {
					// notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，
					// 也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，
					// 那么这个属性一定要是true
					notNextTick: true,
					observer: false, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: false, //修改swiper的父元素时，自动初始化swiper
					loopAdditionalSlides: 0,
					// swiper configs 所有的配置同swiper官方api配置
					autoplay: {
						delay: 2000,
						stopOnLastSlide: false,
						disableOnInteraction: false
					},
					//滑动速度
					speed: 800,
					loop: true,
					prevButton: ".swiper-button-prev",
					nextButton: ".swiper-button-next",
					grabCursor: true,
					setWrapperSize: true,
					autoHeight: true,
					pagination: {
						el: ".swiper-pagination"
					},
					paginationClickable: true,
					// scrollbar: ".swiper-scrollbar",
					mousewheelControl: true,
					observeParents: true,
					// if you need use plugins in the swiper, you can config in here like this
					// 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
					debugger: true,
					// swiper callbacks
					// swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
					onTransitionStart(swiper) {
						console.log(swiper);
					},
					initialSlide: 0,
					onSlideChangeEnd: swiper => {
						//console.log('onSlideChangeEnd', swiper.realIndex)
					}
				}
			};
		},
		beforeCreate: function() {
			var page = utils.navClassStyle();
			this.$store.dispatch("navActive", page);
			this.$store.dispatch("clearScrollType");
		},
		created: function() {
			utils.is_PC();
		},
		beforeMount: function() {},
		mounted: function() {
			var that = this;

			// setInterval(() => {
			//   let swiperdata = that.swiperdata;
			// //   console.log(swiperdata);
			//   if (swiperdata.length < 4) {
			//     swiperdata.push(swiperdata.length + 1);
			//   }
			// }, 3000);
			// this.swiper.slideTo(0, 0, false);

			document
				.getElementById("indexPage")
				.addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件

			var is_android = this.$store.getters.is_android;
			var device = is_android ? "android" : "ios";
			var params = {
				device: device,
				time: Date.parse(new Date()) + ""
			};
			var value = this.$store.getters.mdVal;

			function mdjm_fun(params) {
				//   console.log(JSON.stringify(params) + value);
				var access = that.$mdjm(JSON.stringify(params) + value);
				params["access"] = access;
				//   console.log(params);
				return params;
			}

			this.$axios({
					method: "post",
					url: "/Wap/Api/index",
					data: QS.stringify(mdjm_fun(params))
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
						var game_hot = [];
						var gameHot = res_data.gameHot;
						//   console.log(gameHot);
						for (let i = 0; i < gameHot.length; i++) {
							var typeTxt = gameHot[i].type_txt;
							if (typeTxt.split("|")[1]) {
								//至少有2个类型只选第一个
								gameHot[i].type_txt = typeTxt.split("|")[0];
							}
							game_hot.push(gameHot[i]);
						}
						//   console.log(game_hot);
						if (game_hot.length > 7) {
							game_hot = game_hot.slice(0, 8);
						} else {
							game_hot = game_hot;
						}
						that.swiperdata = res_data.banner; //轮播图
						that.gamehot = game_hot; //热门游戏
						//   console.log(that.gamehot);
						that.gameremd = res_data.gameRemd; //推荐游戏
						that.newsList = res_data.newsList; //游戏专题
					}
				})
				.catch(function(error) {
					// console.log(error);
				});
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
			into_gameDetail_fun: function(id) {
				//点击进入游戏详情页
				var that = this;
				//   console.log("点击进游戏详情页");
				that.$router.push({
					name: "gameDetail",
					params: {
						id: id
					}
				});
				that.$store.dispatch("game_detail_id", id);
				window.localStorage.setItem("game_detail_id", id);
				//   that.reload();
			},
			into_newsDetail_fun: function(id) {
				//点击进入内容详情页
				var that = this;
				//   console.log("进入内容详情");
				that.$router.push({
					name: "newsDetail",
					params: {
						id: id
					}
				});
				that.$store.dispatch("detail_id", id);
				window.localStorage.setItem("detail_id", id);
			},
			back_top: function() {
				//   console.log("返回顶部");
				let timer = null,
					_that = this;
				cancelAnimationFrame(timer);
				timer = requestAnimationFrame(function fn() {
					if (document.getElementById("indexPage").scrollTop > 0) {
						document.getElementById("indexPage").scrollTop -=
							_that.$store.getters.backTopNum;
						document.body.scrollTop = document.documentElement.scrollTop = document.getElementById(
							"indexPage"
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
				let scrollObj = document.getElementById("indexPage"); // 滚动区域
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
			},
			recommendGameData: function() {
				if (this.gameremd.length > 3) {
					return this.gameremd.slice(0, 4);
				} else {
					return this.gameremd;
				}
			},
			// hotGameData: function() {
			//   var game_hot = [];
			//   var gameHot = this.gamehot;
			//   for (let i = 0; i < gameHot.length; i++) {
			//     var typeTxt = gameHot[i].type_txt;
			//     if (typeTxt.split("|")[1]) {
			//       //至少有2个类型只选第一个
			//       gameHot[i].type_txt = typeTxt.split("|")[0];
			//     }
			//     game_hot.push(gameHot[i]);
			//   }
			//   if (game_hot.length > 7) {
			//     return game_hot.slice(0, 8);
			//   } else {
			//     return game_hot;
			//   }
			// },
			projectGameData: function() {
				if (this.newsList.length > 5) {
					return this.newsList.slice(1, 6);
				} else {
					return this.newsList;
				}
			},
			specialPj_src: function() {
				var specialPj_data = this.newsList[0];
				if (specialPj_data) {
					return specialPj_data.thumb;
				}
			},
			specialPj_desc: function() {
				var specialPj_data = this.newsList[0];
				if (specialPj_data) {
					return this.newsList[0].post_title;
				}
			},
			specialPj_id: function() {
				var specialPj_data = this.newsList[0];
				if (specialPj_data) {
					return this.newsList[0].id;
				}
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
	#indexPage {
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: auto;
	}

	.containerBox {
		border-top: 0.9rem solid transparent;
		border-bottom: 1rem solid transparent;
	}

	.swiper_box {
		width: 100%;
		height: 3.85rem;

		.swiper-container {
			width: 100%;
			height: 100%;

			.swiper-wrapper {
				width: 100%;
				height: 100%;

				.swiper-slide {
					width: 100%;
					height: 100%;

					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}

	.recommendGame_items {
		width: 100%;
		height: 1.98rem;
		padding: 0 0.35rem;
		border-top: 0.02rem solid #e6e6e6;
		border-bottom: 0.02rem solid #e6e6e6;
		background: #fafafa;

		.recommendGameItem {
			width: 1.2rem;
			height: 100%;
			padding: 0.17rem 0;

			img {
				width: 1.2rem;
				height: 1.2rem;
				border-radius: 10px;
			}

			span {
				width: 100%;
				font-size: 0.24rem;
				color: #333;
				text-align: center;
			}
		}
	}

	.hotGame_items {
		width: 100%;
		padding: 0 0.35rem;
		border-top: 0.02rem solid #e6e6e6;
		border-bottom: 0.02rem solid #e6e6e6;
		background: #fafafa;
	}

	.specialPj {
		width: 100%;
		height: 3.4rem;
		border-radius: 0.2rem;
		padding: 0 0.35rem;
		background: #fafafa;

		.botBox {
			width: 100%;
			height: 0.48rem;
			padding: 0 0.2rem;
			background: rgba(0, 0, 0, 0.3);
			bottom: 0;
			z-index: 100;
			border-bottom-left-radius: 0.2rem;
			border-bottom-right-radius: 0.2rem;

			.line {
				width: 0.13rem;
				height: 0.29rem;
				border-radius: 0.03rem;
				background: #fe7e00;
				margin-right: 0.24rem;
			}

			.descSp {
				font-size: 0.28rem;
				color: #fff;
				font-weight: 600;
				letter-spacing: 0.025rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		img {
			border-radius: 0.2rem;
		}
	}

	.projectGame_items {
		width: 100%;
		padding: 0 0.35rem;
		background: #fafafa;
	}
</style>
