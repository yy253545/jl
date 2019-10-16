<template>
	<div id="gameDetail">
		<backTop v-show="back_top_show" v-on:back_top="back_top"></backTop>
		<!-- <headComponet></headComponet> -->

		<div class="containerBox">
			<div class="headBox posFix">
				<div class="wh">
					<img :src="backImg" class="backImg posAbs mid" @click="backHistory" />
					<span class="posAbs cenMid">游戏详情</span>
				</div>
			</div>
			<div class="newsInfo_box">
				<div claaa="posRel">
					<!-- <img :src="backImg" alt class="backImg posAbs" @click="backHistory"> -->
					<img v-if="newsInfo.bigimage && newsInfo.bigimage.length > 8" v-lazy="newsInfo.bigimage" alt class="bigImg">
					<img v-else :src="defaultBigImg" alt class="bigImg">
				</div>
				<div class="iconBox posRel">
					<img v-lazy="newsInfo.icon" alt class="iconImg posAbs mid">
					<span class="name posAbs ellipsis">{{newsInfo.name}}</span>
					<span class="publicity ellipsis posAbs">{{newsInfo.publicity}}</span>
					<div class="type_txt_box posAbs flex flexEnd">
						<span class="typeText" v-for="(item,index) in newsInfo.game_info_type_text_data" :key="index">{{item}}</span>
					</div>
				</div>
			</div>
			<div class="tab_scroll bscrollBox" ref="tab">
				<div class="tab_content flex flexBet" ref="tabcontent">
					<div class="tab_item" v-for="(item, index) in newsInfo.image" :key="index" ref="tabitem">
						<img v-lazy="item.url" alt>
					</div>
				</div>
			</div>
			<!-- <bscroll :lastGameList="newsInfo.image"></bscroll> -->
			<span class="description">{{newsInfo.description}}</span>
			<!-- <div class="top_box" v-if="nameList.length != 0">
        <div class="posRel wh">
          <span class="posAbs mid tit">游戏资讯</span>
          <span class="see_more posAbs mid" @click="seeMoreNews(newsInfo.app_id)">查看更多</span>
          <img v-lazy="see_more_img" alt class="moreImg posAbs mid">
        </div>
      </div>-->
			<topTitMoreNews v-if="nameList.length != 0" titspan="游戏资讯" :appid="newsInfo.app_id"></topTitMoreNews>
			<div class="nameList_box" v-if="nameList.length != 0">
				<div class="nameList_item posRel" v-for="(item,index) in nameList" :key="index">
					<div class="wh" @click="into_gameDetail_fun(item.id)">
						<span v-if="item.post_type == 1" class="typeName_news posAbs mid">{{item.post_type_text}}</span>
						<span v-else-if="item.post_type == 2" class="typeName_hd posAbs mid">{{item.post_type_text}}</span>
						<span v-else-if="item.post_type == 3" class="typeName_gn posAbs mid">{{item.post_type_text}}</span>
						<span v-else-if="item.post_type == 5" class="typeName_test posAbs mid">{{item.post_type_text}}</span>
						<span class="title posAbs mid ellipsis">{{item.post_title}}</span>
						<span class="time posAbs mid">{{item.post_date}}</span>
					</div>
				</div>
			</div>
			<topTitMoreGift v-if="giftList.length != 0" titspan="游戏礼包"></topTitMoreGift>
			<div class="nameList_box" v-if="giftList.length != 0">
				<div class="libao_content_box" v-for="(item1,index) in giftList" :key="index">
					<h5>{{item1.title}}</h5>
					<div class="progress_box flex flexBet">
						<div class="progress posRel">
							<span class="progress_line" :style="{width:item1.remain_bfb+'%'}"></span>
						</div>
						<span class="leftPer">剩余{{item1.remain_bfb}}%</span>
						<span style="border:0.03rem solid #fb2200" class="getBtn" @click="getGiftBtn(item1.id)">领取</span>
					</div>
					<span class="libao_desc">礼包内容:{{item1.content}}</span>
				</div>
			</div>
		</div>
		<!-- <footNavComponent></footNavComponent> -->
		<a class="downBtn cen" :href="newsInfo.downurl">下载</a>
		<maskMd v-show="show_mask" @clickMask="clickMask"></maskMd>
		<loginMd v-show="show_login" @regShow="regShow" @loginSuccess="loginSuccess" @findPassWord="findPassWord" @clickMask="clickMask"></loginMd>
		<regMd v-show="show_reg" @loginShow="loginShow" @regSuccess="regSuccess" @clickMask="clickMask"></regMd>
		<findPassWord v-show="show_findPassWord" @loginShow="loginShow" @clickMask="clickMask" @findPassSuccess="findPassSuccess"></findPassWord>
		<getGiftCopy v-show="show_getGiftCopy" :giftCode="giftCode" @clickMask="clickMask"></getGiftCopy>
	</div>
</template>

<script>
	import headComponet from "../../components/headComponet";
	import footNavComponent from "../../components/footNavComponent";
	import backTop from "../../components/backTop";
	import bscroll from "../../components/commons/Bscroll";
	import topTitMoreNews from "../../components/commons/topTit2";
	import topTitMoreGift from "../../components/commons/topTit1";
	import utils from "../../config/common.js";
	import maskMd from "../../components/maskMd";
	import loginMd from "../../components/loginMd";
	import findPassWord from "../../components/findPassWord";
	import regMd from "../../components/regMd";
	import getGiftCopy from "../../components/getGiftCopy";

	import BScroll from "better-scroll";

	// import BScroll from "better-scroll";
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到

	export default {
		inject: ["reload"],
		name: "gameDetail",
		components: {
			headComponet,
			backTop,
			footNavComponent,
			topTitMoreGift,
			bscroll,
			topTitMoreNews,
			maskMd,
			loginMd,
			regMd,
			findPassWord,
			getGiftCopy
		},
		data() {
			return {
				baseUrl: "",
				backImg: require("../../imgs/backImg1.png"),
				defaultBigImg: require("../../imgs/gameDetailDefault.jpg"),
				see_more_img: require("../../imgs/more.png"),
				newsInfo: {}, //新闻的详细信息数据;
				nameList: [], //里面显示的其他的新闻数据列表数据
				giftList: [], //礼包数据
				id: "", //新闻的数据的请求Id
				store_id: "",
				store_game_id: "",
				selected: "game",
				activeIndex: "game",
				show_login: false,
				show_reg: false,
				show_mask: false,
				show_findPassWord: false,
				show_getGiftCopy: false,
				giftCode: ""
			};
		},
		beforeCreate: function() {
			this.$store.dispatch("clearScrollType");
			// utils.is_PC();
		},
		created: function() {
			var that = this;
			this.baseUrl = this.$store.getters.baseUrl;
			this.store_game_id = this.$store.getters.game_detail_id;
		},
		beforeMount: function() {},
		mounted: function() {
			var that = this;
			that.$nextTick(() => {
				that.getParams();
				//   that.InitTabScroll();
				document
					.getElementById("gameDetail")
					.addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件
				var is_android = that.$store.getters.is_android;
				var device = is_android ? "android" : "ios";
				var value = that.$store.getters.mdVal;
				var store_game_id = that.store_game_id;
				var local_game_detail_id = window.localStorage.getItem("game_detail_id");
				var id = that.id;
				//   console.log(
				//     "store里面的id===" + store_game_id,
				//     "传过来的id==" + id,
				//     "本地的Id==" + local_game_detail_id
				//   );
				var note_params = {
					device: device,
					time: Date.parse(new Date()) + "",
					app_id: local_game_detail_id || store_game_id
				};

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + value);
					params["access"] = access;
					//   console.log(params);
					return params;
				}
				//   console.log("请求游戏内页数据");
				this.$axios({
						method: "post",
						url: "/Wap/api/gameDetails",
						data: QS.stringify(mdjm_fun(note_params))
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
							var news_list_data = res_data.newsList;
							for (let i = 0; i < news_list_data.length; i++) {
								news_list_data[i].post_date = news_list_data[i].post_date.slice(
									5
								);
							}

							var game_info_type_text = res_data.gameInfo;
							var game_info_type_text_Data = game_info_type_text.type_txt.split(
								"|"
							);
							// console.log(game_info_type_text_Data);
							var game_info_type_text_data = [];
							if (game_info_type_text_Data.length > 3) {
								for (let i = 0; i < 3; i++) {
									game_info_type_text_data.push(game_info_type_text_Data[i]);
								}
								game_info_type_text.game_info_type_text_data = game_info_type_text_data;
								that.newsInfo = game_info_type_text;
								that.nameList = news_list_data;
								that.giftList = res_data.gift;
								console.log(that.newsInfo);
								that.InitTabScroll();
							} else {
								for (let i = 0; i < game_info_type_text_Data.length; i++) {
									game_info_type_text_data.push(game_info_type_text_Data[i]);
								}
								game_info_type_text.game_info_type_text_data = game_info_type_text_data;
								that.newsInfo = game_info_type_text;
								that.nameList = news_list_data;
								that.giftList = res_data.gift;
								console.log(that.newsInfo);
								that.InitTabScroll();
							}
						}
					})
					.catch(function(error) {
						//   console.log(error);
					});
			}); //必须等dom元素挂载完下一帧才能渠道$refs
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
			findPassSuccess: function() {
				var that = this;
				that.show_login = true;
				that.show_reg = false;
				that.show_mask = true;
				that.show_findPassWord = false;
				that.reload();
			},
			regSuccess: function() {
				var that = this;
				that.show_login = false;
				that.show_reg = false;
				that.show_mask = false;
				that.reload();
			},
			loginSuccess: function() {
				var that = this;
				that.show_login = false;
				that.show_reg = false;
				that.show_mask = false;
				that.reload();
			},
			clickMask: function() {
				var that = this;
				that.show_login = false;
				that.show_reg = false;
				that.show_mask = false;
				that.show_findPassWord = false;
				that.show_getGiftCopy = false;
			},
			findPassWord: function() {
				var that = this;
				that.show_login = false;
				that.show_findPassWord = true;
			},
			loginShow: function() {
				var that = this;
				that.show_login = true;
				that.show_findPassWord = false;
				that.show_reg = false;
			},
			regShow: function() {
				var that = this;
				that.show_login = false;
				that.show_reg = true;
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
							//                          console.log(res_data);
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
			seeMoreNews: function(app_id) {
				//新闻页面点击查看更多进入查看更多新闻页面
				var that = this;
				console.log(app_id);
				that.$router.push({
					name: "moreNews",
					params: {
						app_id: app_id
					}
				});
			},
			InitTabScroll() {
				//   console.log(this.newsInfo.image.length);
				var len = this.newsInfo.image.length;
				//   let width =  this.$refs.tabitem.offsetHeight + 'px';
				//   console.log(width);
				this.$refs.tabcontent.style.width = len * 150 + "px";
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.tab, {
							startX: 0,
							click: true,
							scrollX: true,
							scrollY: false,
							eventPassthrough: "vertical",
							cancelable: false
						});
					} else {
						this.scroll.refresh();
					}
				});
			},
			into_gameDetail_fun: function(id) {
				//点击进入内容详情页
				var that = this;
				//   console.log("点击进新闻详情页");
				that.$store.dispatch("detail_id", id);
				window.localStorage.setItem("detail_id", id);
				that.$router.push({
					name: "newsDetail",
					params: {
						id: id
					}
				});
				//   that.reload();
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
					if (document.getElementById("gameDetail").scrollTop > 0) {
						document.getElementById("gameDetail").scrollTop -=
							_that.$store.getters.backTopNum;
						document.body.scrollTop = document.documentElement.scrollTop = document.getElementById(
							"gameDetail"
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
				let scrollObj = document.getElementById("gameDetail"); // 滚动区域
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
	#gameDetail {
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: auto;
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

		span {
			font-size: 0.34rem;
			color: #333333;
		}
	}

	.containerBox {
		border-top: 1rem solid transparent;
		border-bottom: 1rem solid transparent;

		.newsInfo_box {
			width: 100%;

			.bigImg {
				width: 100%;
				height: auto;
			}

			.iconBox {
				width: 100%;
				height: 1.35rem;
				margin: -0.2rem auto 0rem;
				padding: 0 0.35rem;

				.iconImg {
					width: 1.35rem;
					height: 1.35rem;
					border-radius: 20px;
					top: 35%;
				}

				.name {
					font-size: 0.35rem;
					font-weight: 600;
					color: #000;
					left: 1.8rem;
					top: 0.35rem;
					width: 2rem;
				}

				.publicity {
					font-size: 0.24rem;
					color: #000;
					width: 5rem;
					left: 1.8rem;
					bottom: 0.2rem;
				}

				.type_txt_box {
					overflow: hidden;
					right: 0.35rem;
					top: 0.4rem;

					.typeText:nth-of-type(1) {
						font-size: 0.22rem;
						color: #ff3565;
						line-height: 0.25rem;
						padding: 0.01rem 0.18rem;
						border: solid 0.02rem #ff3565;
						top: 0.4rem;
						right: 0.35rem;
						margin: 0 0.05rem;
					}

					.typeText:nth-of-type(2) {
						font-size: 0.22rem;
						color: #febf02;
						line-height: 0.25rem;
						padding: 0.01rem 0.18rem;
						border: solid 0.02rem #febf02;
						top: 0.4rem;
						right: 0.35rem;
						margin: 0 0.05rem;
					}

					.typeText:nth-of-type(3) {
						font-size: 0.22rem;
						color: #36ffed;
						line-height: 0.25rem;
						padding: 0.01rem 0.18rem;
						border: solid 0.02rem #36ffed;
						top: 0.4rem;
						right: 0.35rem;
						margin: 0 0.05rem;
					}
				}
			}
		}

		.bscrollBox {
			width: 100%;
			padding: 0.01rem 0.35rem 0.05rem;

			.tab_content {
				overflow: hidden;
				//   overflow-x: hidden;
				touch-action: none;

				.tab_item {
					float: left;
					width: 140px;
					margin: 0 5px;
					overflow: hidden;

					img {
						width: 100%;
						height: auto;
					}
				}
			}
		}

		.description {
			width: 100%;
			padding: 0 0.35rem;
			font-size: 0.3rem;
			line-height: 0.5rem;
			color: #343434;
		}

		.nameList_box {
			width: 100%;
			// border-top: 0.2rem solid #f5f5f5;
			border-bottom: 0.2rem solid #f5f5f5;
			padding: 0 0.35rem;

			.libao_content_box {
				width: 100%;
				border-top: solid 0.01rem #e6e6e6;
				border-bottom: solid 0.01rem #e6e6e6;
				padding-bottom: 0.3rem;

				h5 {
					font-size: 0.3rem;
					width: 100%;
					font-weight: normal;
					line-height: 0.65rem;
				}

				.progress_box {
					width: 100%;
					height: 1rem;

					.progress {
						width: 3.9rem;
						height: 0.15rem;
						background: #a3a3a3;

						.progress_line {
							height: 100%;
							background: #f92300;
							left: 0;
						}
					}

					.leftPer {
						font-size: 0.25rem;
						color: #333;
					}

					.getBtn {
						width: 1.2rem;
						height: 0.5rem;
						font-size: 0.28rem;
						line-height: 0.5rem;
						text-align: center;
						color: #fb2200;
						border: solid #fb2200 0.01rem;
						border-radius: 3px;
					}
				}

				.libao_desc {
					width: 100%;
					font-size: 0.25rem;
					line-height: 0.3rem;
					color: #5c5c5c;
				}
			}

			.nameList_item {
				width: 100%;
				height: 0.75rem;
				border-bottom: 0.01rem solid #e6e6e6;

				.typeName_news {
					font-size: 0.2rem;
					line-height: 0.28rem;
					padding: 0 0.05rem;
					left: 0;
					color: #ea8630;
					border: 0.01rem solid #ea8630;
				}

				.typeName_hd {
					font-size: 0.2rem;
					line-height: 0.28rem;
					padding: 0 0.05rem;
					left: 0;
					color: #603eae;
					border: 0.01rem solid #603eae;
				}

				.typeName_gn {
					font-size: 0.2rem;
					line-height: 0.28rem;
					padding: 0 0.05rem;
					left: 0;
					color: #ea2c96;
					border: 0.01rem solid #ea2c96;
				}

				.typeName_test {
					font-size: 0.2rem;
					line-height: 0.28rem;
					padding: 0 0.05rem;
					left: 0;
					color: #e51b05;
					border: 0.01rem solid #e51b05;
				}

				.title {
					font-size: 0.28rem;
					color: #333;
					width: 5rem;
					left: 0.8rem;
				}

				.time {
					font-size: 0.2rem;
					color: #b3b3b3;
					right: 0;
				}
			}
		}

		.top_box {
			width: 100%;
			height: 1rem;
			border-bottom: 0.02rem solid #f5f5f5;
			border-top: 0.2rem solid #f5f5f5;
			padding: 0 0.35rem;

			.tit {
				font-size: 0.3rem;
				color: #333;
				left: 0;
				font-weight: 600;
			}

			.see_more {
				font-size: 0.24rem;
				color: #b1b1b1;
				right: 0.35rem;
			}

			img {
				width: 0.24rem;
				height: 0.24rem;
				right: 0;
			}
		}
	}

	.downBtn {
		width: 100%;
		height: 1rem;
		font-size: 0.4rem;
		color: #fff;
		line-height: 1rem;
		text-align: center;
		position: fixed;
		bottom: 0rem;
		background: #fe8800;
		z-index: 9999;
	}

	// 	.backImg {
	// 		width: 0.35rem;
	// 		height: auto;
	// 		top: 0.25rem;
	// 		left: 0.25rem;
	// 	}
</style>
