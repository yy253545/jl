<template>
	<div id="gamePage">
		<backTop v-show="back_top_show" v-on:back_top="back_top"></backTop>
		<!-- <headComponet></headComponet> -->
		<tabMd v-on:tab_num="tab_num" :item="game_tab_data"></tabMd>
		<div v-if="num == 0" class="containerBox">
			<div class="allGame_top_box posRel">
				<img :src="allGameTopBgImg" alt class="allGameTopBgImg posAbs">
				<div @click="into_gameDetail_fun(allGameTopData1.app_id)" v-if="allGameTopData1" class="one_box_item one_box_item1 posAbs cenMid flex flexEndColCen">
					<img :src="icon_top1" alt class="icon_top">
					<img :src="allGameTopData1.icon" alt class="icon">
					<span class="name">{{allGameTopData1.name}}</span>
				</div>
				<div @click="into_gameDetail_fun(allGameTopData2.app_id)" v-if="allGameTopData2" class="one_box_item one_box_item2 posAbs flex flexEndColCen">
					<img :src="icon_top2" alt class="icon_top">
					<img :src="allGameTopData2.icon" alt class="icon">
					<span class="name">{{allGameTopData2.name}}</span>
				</div>
				<div @click="into_gameDetail_fun(allGameTopData3.app_id)" v-if="allGameTopData3" class="one_box_item one_box_item3 posAbs flex flexEndColCen">
					<img :src="icon_top3" alt class="icon_top">
					<img :src="allGameTopData3.icon" alt class="icon">
					<span class="name">{{allGameTopData3.name}}</span>
				</div>
			</div>
			<div class="all_game_box">
				<hotGameMd v-for="(item,index) in all_game_data" :key="index" :item="item"></hotGameMd>
			</div>
			<span class="no_data" v-show="no_all_data">到底了，没有新数据了!</span>
		</div>
		<div v-else-if="num == 1" class="containerBox">
			<div class="openDataBox posRel">
				<img :src="openDataBgImg" alt class="bgImg posAbs">
				<div class="time_picker posAbs mid flex flexAro">
					<input type="text" @click="openByDrop($event)" v-model="calendar3.display" readonly>
				</div>
				<div class="gameList_picker posAbs mid flex flexAro">
					<select name id @change="selectVal">
						<option value>所有游戏</option>
						<option :value="item.key" v-for="(item,index) in game_picker_data" :key="index">{{item.value}}</option>
					</select>
				</div>
			</div>
			<div class="openData" v-if="open_data.length != 0 ">
				<openDataMd v-for="(item,index) in open_data" :key="index" :item="item"></openDataMd>
			</div>
			<span v-else class="no_openData">没有找到您需要找的数据请换个时间或者换个游戏再试？</span>
			<transition name="fade">
				<div class="calendar-dropdown cenMid" v-if="calendar3.show">
					<calendar :zero="calendar3.zero" :lunar="calendar3.lunar" :value="calendar3.value" :begin="calendar3.begin" :end="calendar3.end"
					 @select="calendar3.select"></calendar>
				</div>
			</transition>
		</div>
		<div v-else-if="num == 2" class="containerBox">
			<div class="hot_libao posRel">
				<img :src="url_back_img" alt class="bgImg posAbs wh">
				<div class="tit_box posAbs flex flexCen">
					<img :src="hot_libao_img" alt>
					<span>热门礼包</span>
				</div>
				<div class="game_box posAbs flex flexBet">
					<div class="game_box_item posRel" v-for="(item,index) in  game_box_item_data" :key="index" @click="into_gameDetail_fun(item.app_id)">
						<img v-if="item.smallimage" v-lazy="item.smallimage" alt class="posAbs bgImg">
						<img v-else v-lazy="hot_libao_img_bg" alt class="posAbs bgImg">
						<img v-lazy="item.icon" alt class="icon_gift posAbs cenMid">
						<span class="posAbs cen">{{item.game_name}}</span>
					</div>
				</div>
			</div>
			<div class="other_libao">
				<!-- <div class="tit_box flex flexCen">
          <i>
            <em></em>
          </i>
          <span>其他礼包</span>
        </div>-->
				<div class="other_libao_item_box" v-for="(item,index) in other_gift_data" :key="index">
					<div class="hotGameItem posRel" @click="into_gameDetail_fun(item.app_id)">
						<img v-lazy="item.icon" alt class="iconImg posAbs mid">
						<div class="descBox posAbs mid">
							<span class="name">{{item.game_name}}</span>
							<div class="midBox flex flexSta">
								<span class="type">{{item.type_txt}}</span>
								<span class="size">{{item.size}}</span>
							</div>
							<span class="desc">{{item.publicity}}</span>
						</div>
						<span class="intoSp posAbs mid">进入</span>
					</div>
					<div class="libao_content_box" v-for="(item1,index) in item.giftData" :key="index">
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
					<span class="see_more" v-if="item.show_more != false" @click="see_more_fun(item.app_id,item.id,index)">查看更多</span>
					<span class="see_more" v-else>没有更多了</span>
				</div>
			</div>
			<span class="no_data" v-show="no_gift_data">到底了，没有新数据了!</span>
		</div>
		<footNavComponent></footNavComponent>
		<maskMd v-show="show_mask" @clickMask="clickMask"></maskMd>
		<loginMd v-show="show_login" @regShow="regShow" @loginSuccess="loginSuccess" @findPassWord="findPassWord" @clickMask="clickMask"></loginMd>
		<regMd v-show="show_reg" @loginShow="loginShow" @regSuccess="regSuccess" @clickMask="clickMask"></regMd>
		<getGiftCopy v-show="show_getGiftCopy" :giftCode="giftCode" @clickMask="clickMask"></getGiftCopy>
		<findPassWord v-show="show_findPassWord" @loginShow="loginShow" @clickMask="clickMask" @findPassSuccess="findPassSuccess"></findPassWord>
	</div>
</template>

<script>
	import headComponet from "../../components/headComponet";
	import swiperComponent from "../../components/swiperComponent";
	import footNavComponent from "../../components/footNavComponent";
	import hotGameMd from "../../components/commons/hotGameMd";
	import openDataMd from "../../components/openDataMd";
	import backTop from "../../components/backTop";
	import tabMd from "../../components/commons/tabMd";
	import maskMd from "../../components/maskMd";
	import loginMd from "../../components/loginMd";
	import findPassWord from "../../components/findPassWord";
	import getGiftCopy from "../../components/getGiftCopy";
	import regMd from "../../components/regMd";
	import calendar from "../../components/calendar";
	import utils from "../../config/common.js";
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到

	export default {
		inject: ["reload"],
		name: "game",
		components: {
			headComponet,
			swiperComponent,
			footNavComponent,
			backTop,
			tabMd,
			hotGameMd,
			calendar,
			openDataMd,
			maskMd,
			loginMd,
			regMd,
			findPassWord,
			getGiftCopy
		},
		data() {
			return {
				calendar3: {
					display: "",
					show: false,
					zero: true,
					value: [], //默认日期
					lunar: true, //显示农历
					select: value => {
						this.calendar3.show = false;
						this.calendar3.value = value;
						this.calendar3.display = value.join(".");
						this.time_picker_data(value);
					}
				},
				baseUrl: "",
				allGameData: [], //所有游戏数据
				allGameTopData1: [], //游戏头部的数据;
				allGameTopData2: [], //游戏头部的数据;
				allGameTopData3: [], //游戏头部的数据;
				num: "0",
				allgame_p: 1, //请求所有游戏数据是第几页
				alllibao_p: 1, //请求所有游戏数据是第几页
				no_all_data: false, //所有游戏是否显示没有数据
				no_gift_data: false, //礼包是否显示没有数据
				allGameTopBgImg: require("../../imgs/allGameTopBgImg.png"),
				icon_top1: require("../../imgs/icon_top1.png"),
				icon_top2: require("../../imgs/icon_top2.png"),
				icon_top3: require("../../imgs/icon_top3.png"),
				hot_libao_img: require("../../imgs/hot_libao.png"),
				hot_libao_img_bg: require("../../imgs/giftDefaultImg.png"),
				openDataBgImg: require("../../imgs/opendataDefaultImg.png"),
				url_back_img: require("../../imgs/url_back_img.png"),
				game_box_item_data: [],
				other_gift_data: [],
				open_data: [],
				game_picker_data: [],
				todatDate: "",
				selectedVal: "", //选择游戏的val值;
				pick_date: "",
				game_tab_data: [{
						tab_tit: "全部游戏",
						class_name: "active_li"
					},
					{
						tab_tit: "游戏开服列表"
					},
					{
						tab_tit: "游戏礼包"
					}
				],
				show_login: false,
				show_reg: false,
				show_mask: false,
				show_findPassWord: false,
				show_getGiftCopy: false,
				giftCode: ""
			};
		},
		beforeCreate: function() {
			var that = this;
			var href = window.location.href;
			var page = href.split("?")[1];
			//          console.log(page);
			if (page != undefined) {
				that.num = 2;
			}
			var page = utils.navClassStyle();
			this.$store.dispatch("navActive", page);
			this.$store.dispatch("clearScrollType");
			// utils.is_PC();
		},
		created: function() {},
		beforeMount: function() {},
		mounted: function() {
			var that = this;
			that.baseUrl = that.$store.getters.baseUrl;
			var value = that.$store.getters.mdVal;
			var is_android = that.$store.getters.is_android;
			var device = is_android ? "android" : "ios";
			var game_tab_data = that.game_tab_data;
			if (device == "ios") {
				game_tab_data = game_tab_data.slice(0, game_tab_data.length - 1);
			}
			that.game_tab_data = game_tab_data;

			document
				.getElementById("gamePage")
				.addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件
			var date = new Date();
			var year = date.getFullYear(); //获取年
			var month = date.getMonth() + 1; //获取月
			var day = date.getDate(); //获取当日
			that.calendar3.display = year + "." + month + "." + day;
			that.calendar3.value.push(year);
			that.calendar3.value.push(month);
			that.calendar3.value.push(day);
			that.todatDate = year + "-" + month + "-" + day;
			// console.log(dataPickerVal);

			var dataPickerVal = year + "-" + month + "-" + day;
			// console.log(dataPickerVal);

			var openData_params = {
				device: device,
				time: Date.parse(new Date()) + "",
				app_id: "",
				dateTime: dataPickerVal + ""
			};

			var allGame_params = {
				device: device,
				time: Date.parse(new Date()) + "",
				p: that.allgame_p + ""
			};

			var game_picker_params = {
				device: device,
				time: Date.parse(new Date()) + ""
			};

			function mdjm_fun(params) {
				var access = that.$mdjm(JSON.stringify(params) + value);
				params["access"] = access;
				//   console.log(params);
				return params;
			}

			if (that.num != 2) {
				that
					.$axios({
						method: "post",
						url: "/Wap/api/OpenServer",
						data: QS.stringify(mdjm_fun(openData_params))
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
							if (res_data.length != 0) {
								var open_res_data = res_data;
								for (let i = 0; i < open_res_data.length; i++) {
									var typeTxt = open_res_data[i].type_txt;
									if (typeTxt.split("|")[1]) {
										//至少有2个类型只选第一个
										open_res_data[i].type_txt = typeTxt.split("|")[0];
									}
								}
								that.open_data = open_res_data;
							}
						}
					})
					.catch(function(error) {
						// console.log(error);
					});

				this.$axios({
						method: "post",
						url: "/Wap/api/gameList",
						data: QS.stringify(mdjm_fun(allGame_params))
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
							var allGameTopData = [];
							that.allGameData = res_data.gameList; //所有游戏数据
							for (let j = 0; j < res_data.ranking.length; j++) {
								allGameTopData.push(res_data.ranking[j]);
							}
							//   console.log(allGameTopData);
							that.allGameTopData1 = allGameTopData[0];
							that.allGameTopData2 = allGameTopData[1];
							that.allGameTopData3 = allGameTopData[2];
						}
					})
					.catch(function(error) {
						// console.log(error);
					});

				this.$axios({
						method: "post",
						url: "/Wap/api/getGame",
						data: QS.stringify(mdjm_fun(game_picker_params))
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
							var game_picker_res_data = [];
							for (var key in res_data) {
								var option_dataObj = {};
								option_dataObj.key = key;
								option_dataObj.value = res_data[key];
								game_picker_res_data.push(option_dataObj);
							}
							//   console.log(game_picker_res_data);
							that.game_picker_data = game_picker_res_data; //所有游戏数据
						}
					})
					.catch(function(error) {
						// console.log(error);
					});
			} else {
				that.allgame_p = 1;
				that.alllibao_p = 1;

				//请求游戏礼包接口数据
				// console.log("请求礼包的数据");
				that.no_all_data = false;
				that.no_gift_data = false;
				var value = that.$store.getters.mdVal;
				var is_android = that.$store.getters.is_android;
				var device = is_android ? "android" : "ios";
				var gift_params = {
					device: device,
					time: Date.parse(new Date()) + "",
					p: that.alllibao_p + ""
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
						url: "/Wap/api/giftList",
						data: QS.stringify(mdjm_fun(gift_params))
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
							var other_libao_data = res_data.giftList; //所有礼包数据

							var gift_data = [];
							var giftDataObjArr = [];
							for (let i = 0; i < other_libao_data.length; i++) {
								var giftDataObj = {};
								var typeTxt = other_libao_data[i].type_txt;
								if (typeTxt.split("|")[1]) {
									//至少有2个类型只选第一个
									other_libao_data[i].type_txt = typeTxt.split("|")[0];
								}

								giftDataObj.title = other_libao_data[i].title;
								giftDataObj.content = other_libao_data[i].content;
								giftDataObj.remain_bfb = other_libao_data[i].remain_bfb;
								giftDataObj.id = other_libao_data[i].id;
								giftDataObj.app_id = other_libao_data[i].app_id;

								// console.log(giftDataObj);
								giftDataObjArr.push(giftDataObj);
								other_libao_data[i]["giftData"] = [];
								other_libao_data[i]["giftData"].push(giftDataObjArr[i]);
								gift_data.push(other_libao_data[i]);
							}
							//   console.log(gift_data);
							that.other_gift_data = gift_data; //热门礼包数据
							that.game_box_item_data = res_data.giftTop; //热门礼包数据
						}
					})
					.catch(function(error) {
						// console.log(error);
					});
			}
		},
		beforeUpdate: function() {},
		updated: function() {},
		beforeDestroy: function() {},
		destroyed: function() {
			// document
			//   .getElementById("gamePage")
			//   .removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
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
			into_gameDetail_fun: function(id) {
				//点击进入内容详情页
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
			selectVal: function(ele) {
				var that = this;
				//   console.log(ele.target.value, that.todatDate);
				that.selectedVal = ele.target.value;
				var value = that.$store.getters.mdVal;
				var is_android = that.$store.getters.is_android;
				var device = is_android ? "android" : "ios";
				var pick_date = that.pick_date;
				var openData_params = {
					device: device,
					time: Date.parse(new Date()) + "",
					app_id: ele.target.value + "",
					dateTime: pick_date + ""
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
						url: "/Wap/api/OpenServer",
						data: QS.stringify(mdjm_fun(openData_params))
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
							if (res_data.length != 0) {
								var open_res_data = res_data;
								for (let i = 0; i < open_res_data.length; i++) {
									var typeTxt = open_res_data[i].type_txt;
									if (typeTxt.split("|")[1]) {
										//至少有2个类型只选第一个
										open_res_data[i].type_txt = typeTxt.split("|")[0];
									}
								}
								that.open_data = open_res_data;
							}
						}
					})
					.catch(function(error) {
						//   console.log(error);
					});
			},
			time_picker_data: function(date_picker) {
				var that = this;
				//   console.log(date_picker, that.selectedVal);
				var date_picker = date_picker;
				var dataPickerVal =
					date_picker[0] + "-" + date_picker[1] + "-" + date_picker[2];
				//   console.log(dataPickerVal);
				that.pick_date = dataPickerVal;
				var value = that.$store.getters.mdVal;
				var is_android = that.$store.getters.is_android;
				var device = is_android ? "android" : "ios";
				var selectedVal = that.selectedVal;
				var openData_params = {
					device: device,
					time: Date.parse(new Date()) + "",
					app_id: selectedVal + "",
					dateTime: dataPickerVal + ""
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
						url: "/Wap/api/OpenServer",
						data: QS.stringify(mdjm_fun(openData_params))
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
							var open_res_data = res_data;
							for (let i = 0; i < open_res_data.length; i++) {
								var typeTxt = open_res_data[i].type_txt;
								if (typeTxt.split("|")[1]) {
									//至少有2个类型只选第一个
									open_res_data[i].type_txt = typeTxt.split("|")[0];
								}
							}
							that.open_data = open_res_data;
						}
					})
					.catch(function(error) {
						//   console.log(error);
					});
			},
			openByDrop(e) {
				this.calendar3.show = true;
				e.stopPropagation();
				window.setTimeout(() => {
					document.addEventListener(
						"click",
						e => {
							this.calendar3.show = false;
							document.removeEventListener("click", () => {}, false);
						},
						false
					);
				}, 1000);
				//   console.log('选择好了日期')
			},
			see_more_fun: function(appid, id, index) {
				var that = this;
				//   console.log(appid, id, index);
				var value = that.$store.getters.mdVal;
				var is_android = that.$store.getters.is_android;
				var device = is_android ? "android" : "ios";
				var more_params = {
					device: device,
					time: Date.parse(new Date()) + "",
					app_id: appid + ""
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
						url: "/Wap/api/gameGift",
						data: QS.stringify(mdjm_fun(more_params))
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
							var moreGiftData = [];
							for (let i = 0; i < res_data.length; i++) {
								if (res_data[i].id == id) {
									//找到之前显示的第一个礼包信息
								} else {
									moreGiftData.push(res_data[i]);
								}
							}
							// console.log(moreGiftData, that.other_gift_data[index]);
							moreGiftData.unshift(that.other_gift_data[index]["giftData"][0]);
							that.other_gift_data[index]["giftData"] = moreGiftData;
							that.other_gift_data[index]["show_more"] = false;
							// console.log(that.other_gift_data);
						}
					})
					.catch(function(error) {
						//   console.log(error);
					});
			},
			tab_num: function(index) {
				var that = this;
				that.num = index;
				that.allgame_p = 1;
				that.alllibao_p = 1;
				if (index == 2) {
					//请求游戏礼包接口数据
					// console.log("请求礼包的数据");
					that.no_all_data = false;
					that.no_gift_data = false;
					var value = that.$store.getters.mdVal;
					var is_android = that.$store.getters.is_android;
					var device = is_android ? "android" : "ios";
					var gift_params = {
						device: device,
						time: Date.parse(new Date()) + "",
						p: that.alllibao_p + ""
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
							url: "/Wap/api/giftList",
							data: QS.stringify(mdjm_fun(gift_params))
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
								var other_libao_data = res_data.giftList; //所有礼包数据

								var gift_data = [];
								var giftDataObjArr = [];
								for (let i = 0; i < other_libao_data.length; i++) {
									var giftDataObj = {};
									var typeTxt = other_libao_data[i].type_txt;
									if (typeTxt.split("|")[1]) {
										//至少有2个类型只选第一个
										other_libao_data[i].type_txt = typeTxt.split("|")[0];
									}

									giftDataObj.title = other_libao_data[i].title;
									giftDataObj.content = other_libao_data[i].content;
									giftDataObj.remain_bfb = other_libao_data[i].remain_bfb;
									giftDataObj.id = other_libao_data[i].id;
									giftDataObj.app_id = other_libao_data[i].app_id;

									// console.log(giftDataObj);
									giftDataObjArr.push(giftDataObj);
									other_libao_data[i]["giftData"] = [];
									other_libao_data[i]["giftData"].push(giftDataObjArr[i]);
									gift_data.push(other_libao_data[i]);
								}
								//   console.log(gift_data);
								that.other_gift_data = gift_data; //热门礼包数据
								that.game_box_item_data = res_data.giftTop; //热门礼包数据
							}
						})
						.catch(function(error) {
							// console.log(error);
						});
				}
			},
			back_top: function() {
				//   console.log("返回顶部");
				let timer = null,
					_that = this;
				cancelAnimationFrame(timer);
				timer = requestAnimationFrame(function fn() {
					if (document.getElementById("gamePage").scrollTop > 0) {
						document.getElementById("gamePage").scrollTop -=
							_that.$store.getters.backTopNum;
						document.body.scrollTop = document.documentElement.scrollTop = document.getElementById(
							"gamePage"
						).scrollTop;
						timer = requestAnimationFrame(fn);
					} else {
						cancelAnimationFrame(timer);
					}
				});
			},
			handleScroll: function() {
				var that = this;
				var num = that.num;
				let clientHeight =
					document.documentElement.clientHeight || document.body.clientHeight;
				// 设备/屏幕高度
				let scrollObj = document.getElementById("gamePage"); // 滚动区域
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
					var value = this.$store.getters.mdVal;
					var is_android = this.$store.getters.is_android;
					var device = is_android ? "android" : "ios";

					function mdjm_fun(params) {
						var access = that.$mdjm(JSON.stringify(params) + value);
						params["access"] = access;
						//   console.log(params);
						return params;
					}
					if (num == 0) {
						//请求所有游戏数据
						//下啦请求所有游戏数据
						that.allgame_p += 1;
						var params_allGame = {
							device: device,
							time: Date.parse(new Date()) + "",
							p: that.allgame_p + ""
						};
						//   console.log("下啦请求所有游戏数据");
						this.$axios({
								method: "post",
								url: "/Wap/api/gameList",
								data: QS.stringify(mdjm_fun(params_allGame))
							})
							.then(function(response) {
								// console.log(response.data);
								if (response.data.status == 0) {
									//请求不成功
									// console.log("请求不成功");
								} else if (response.data.status == 1) {
									//请求成功
									var res_data = response.data.data;
									//   console.log(res_data);
									if (res_data.gameList.length == 0) {
										//没有新的数据了
										that.no_all_data = true;
									} else {
										that.allGameData = that.allGameData.concat(res_data.gameList); //所有游戏数据
									}
									//   console.log(that.allGameData);
								}
							})
							.catch(function(error) {
								//   console.log(error);
							});
					} else if (num == 2) {
						//下啦请求礼包数据
						that.alllibao_p += 1;
						var params_giftGame = {
							device: device,
							time: Date.parse(new Date()) + "",
							p: that.alllibao_p + ""
						};
						//   console.log("下啦请求礼包数据");
						this.$axios({
								method: "post",
								url: "/Wap/api/giftList",
								data: QS.stringify(mdjm_fun(params_giftGame))
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
									if (res_data.giftList.length == 0) {
										//没有新的数据了
										//   console.log("没有新的礼包数据了");
										that.no_gift_data = true;
									} else {
										var other_libao_data = res_data.giftList; //所有礼包数据

										var gift_data = [];
										var giftDataObjArr = [];
										for (let i = 0; i < other_libao_data.length; i++) {
											var giftDataObj = {};
											var typeTxt = other_libao_data[i].type_txt;
											if (typeTxt.split("|")[1]) {
												//至少有2个类型只选第一个
												other_libao_data[i].type_txt = typeTxt.split("|")[0];
											}

											giftDataObj.title = other_libao_data[i].title;
											giftDataObj.content = other_libao_data[i].content;
											giftDataObj.remain_bfb = other_libao_data[i].remain_bfb;
											giftDataObj.id = other_libao_data[i].id;
											giftDataObj.app_id = other_libao_data[i].app_id;

											// console.log(giftDataObj);
											giftDataObjArr.push(giftDataObj);
											other_libao_data[i]["giftData"] = [];
											other_libao_data[i]["giftData"].push(giftDataObjArr[i]);
											gift_data.push(other_libao_data[i]);
										}
										that.other_libao_data = that.other_libao_data.concat(
											gift_data
										); //所有游戏数据
									}
									//   console.log(that.allGameData);
								}
							})
							.catch(function(error) {
								//   console.log(error);
							});
					}
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
				//   console.log(backTopShowLen);
				if (scroll_Obj.scrollTop > 700) {
					return true;
				} else {
					return false;
				}
			},
			all_game_data: function() {
				var game_hot = [];
				var gameHot = this.allGameData;
				for (let i = 0; i < gameHot.length; i++) {
					var typeTxt = gameHot[i].type_txt;
					if (typeTxt.split("|")[1]) {
						//至少有2个类型只选第一个
						gameHot[i].type_txt = typeTxt.split("|")[0];
					}
					game_hot.push(gameHot[i]);
				}
				return game_hot;
			}
			// baseUrl() {
			//   return this.$store.getters.baseUrl;
			// },
			// other_gift_data: function() {
			//     var otherGiftData = this.other_gift_data
			// }
		}
	};
</script>

<style lang="less" scoped>
	#gamePage {
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

		.all_game_box {
			padding: 0 0.35rem;
		}

		.allGame_top_box {
			width: 100%;
			height: 3rem;
			overflow: hidden;

			.allGameTopBgImg {
				width: 100%;
				height: auto;
			}

			.one_box_item {
				height: 100%;

				.icon_top {
					width: auto;
					height: 0.72rem;
				}

				.icon {
					width: 1.42rem;
					height: 1.42rem;
					border-radius: 10px;
					margin-bottom: 0.1rem;
					-moz-box-shadow: 1px 1px 5px #ffffff;
					-webkit-box-shadow: 1px 1px 5px #ffffff;
					box-shadow: 1px 1px 5px #ffffff;
				}

				.name {
					font-size: 0.35rem;
					font-weight: 600;
					color: #fff;
					margin-bottom: 0.2rem;
					text-shadow: 0px 3px 1px #000000;
					-webkit-text-shadow: 0px 3px 1px #000000;
					-moz-text-shadow: 2px 2px 5px #333333;
				}
			}

			.one_box_item2 {
				height: 100%;
				left: 0.7rem;

				.icon_top {
					width: auto;
					height: 0.65rem;
				}

				.icon {
					width: 1.15rem;
					height: 1.15rem;
					border-radius: 5px;
				}

				.name {
					font-size: 0.28rem;
					font-weight: 600;
					color: #fff;
				}
			}

			.one_box_item3 {
				height: 100%;
				right: 0.7rem;

				.icon_top {
					width: auto;
					height: 0.5rem;
				}

				.icon {
					width: 1.05rem;
					height: 1.05rem;
					border-radius: 5px;
				}

				.name {
					font-size: 0.26rem;
					font-weight: 600;
					color: #fff;
				}
			}
		}

		.hot_libao {
			width: 100%;
			height: 3.6rem;

			.tit_box {
				width: 100%;
				height: 0.6rem;

				img {
					width: 0.5rem;
					height: auto;
				}

				span {
					font-size: 0.3rem;
					color: #fff;
					margin-left: 0.15rem;
				}
			}

			.game_box {
				width: 100%;
				height: 2.6rem;
				padding: 0 0.35rem;
				top: 0.6rem;

				.game_box_item {
					width: 1.95rem;
					height: 100%;
					background: #fff;

					.bgImg {
						width: 100%;
						height: 50%;
					}

					.icon_gift {
						width: 1.15rem;
						height: 1.15rem;
						-moz-box-shadow: 1px 4px 20px #000000;
						-webkit-box-shadow: 1px 4px 20px #000000;
						box-shadow: 1px 4px 20px #000000;
						border-radius: 10px;
					}

					span {
						width: 100%;
						font-size: 0.26rem;
						color: #6d6d6d;
						bottom: 0.25rem;
						text-align: center;
					}
				}
			}
		}

		.other_libao {
			.tit_box {
				width: 100%;
				height: 0.6rem;

				i {
					width: 0.25rem;
					height: 0.25rem;
					padding: 0.04rem;
					background: #fff;
					border-radius: 50%;
					border: solid 0.01rem #fd6500;

					em {
						width: 100%;
						height: 100%;
						background: #fd6500;
						border-radius: 50%;
					}
				}

				span {
					font-size: 0.3rem;
					color: #333;
					margin-left: 0.15rem;
				}
			}

			.other_libao_item_box {
				width: 100%;
				padding: 0 0.35rem;
				border-top: solid 0.01rem #e6e6e6;
				border-bottom: solid 0.2rem #e6e6e6;

				.hotGameItem {
					width: 100%;
					height: 1.95rem;

					.iconImg {
						width: 1.35rem;
						height: 1.35rem;
						border-radius: 10px;
						left: 0;
					}

					.descBox {
						width: 3.7rem;
						height: 1.35rem;
						left: 1.7rem;

						.name {
							font-size: 0.38rem;
							line-height: 0.5rem;
							color: #000;
						}

						.desc {
							width: 100%;
							height: 0.4rem;
							font-size: 0.24rem;
							line-height: 0.3rem;
							color: #a3a3a3;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.midBox {
							width: 100%;
							height: 0.55rem;

							span {
								display: inline;
								font-size: 0.24rem;
								line-height: 0.55rem;
								color: #a3a3a3;
							}

							.size {
								margin-left: 0.2rem;
								height: 0.24rem;
								line-height: 0.24rem;
								padding: 0 0.15rem;
								border-left: #a3a3a3 solid 0.02rem;
								border-right: #a3a3a3 solid 0.02rem;
							}
						}
					}

					.intoSp {
						width: 1.25rem;
						height: 0.5rem;
						border-radius: 3px;
						border: 0.02rem solid #c2c2c2;
						font-size: 0.25rem;
						color: #4d4d4d;
						text-align: center;
						line-height: 0.5rem;
						right: 0;
					}
				}

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
							border: 0.01rem solid #fb2200;
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

				.see_more {
					width: 100%;
					line-height: 0.75rem;
					font-size: 0.3rem;
					color: #333;
					text-align: center;
				}
			}

			.other_libao_item_box:last-child {
				border-bottom: none;
			}
		}

		.openDataBox {
			width: 100%;
			height: 2.7rem;
			overflow: hidden;

			.time_picker {
				width: 2.8rem;
				height: 0.65rem;
				background: #fff;
				left: 0.35rem;
				border-radius: 5px;

				input {
					width: 100%;
					height: 100%;
					text-align: center;
					font-size: 0.26rem;
					color: #000;
					border-radius: 5px;
				}
			}

			.gameList_picker {
				width: 2.8rem;
				height: 0.65rem;
				background: #fff;
				right: 0.35rem;
				border-radius: 5px;

				select {
					height: 100%;
					width: auto;
					// padding: 0 2%;
					text-align: center;
					text-align-last: center;
					margin: 0;
					background: transparent;
					border-radius: 5px;
					border: none;
					text-align: center;
					appearance: none;
					-moz-appearance: none;
					-webkit-appearance: none;
					// pointer-events: none;
					outline: none;
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

					option {
						width: 100%;
						height: 100%;
						text-align: center;
						appearance: none;
						-moz-appearance: none;
						-webkit-appearance: none;
					}
				}
			}
		}

		.openData {
			width: 100%;
			padding: 0 0.35rem;
		}

		.no_openData {
			font-size: 0.3rem;
			color: #5c5c5c;
			line-height: 0.5rem;
			width: 5rem;
			margin: 1rem auto;
			text-align: center;
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

	.no_data {
		width: 100%;
		line-height: 0.5rem;
		font-size: 0.24rem;
		color: #333;
		text-align: center;
	}

	.calendar-dropdown {
		background: #fff;
		position: fixed;
		padding: 20px;
		border: 1px solid #eee;
		border-radius: 2px;
		width: 90%;
	}

	.calendar-dropdown:before {
		position: absolute;
		left: 30px;
		top: -10px;
		content: "";
		border: 5px solid rgba(0, 0, 0, 0);
		border-bottom-color: #dedede;
	}

	.calendar-dropdown:after {
		position: absolute;
		left: 30px;
		top: -9px;
		content: "";
		border: 5px solid rgba(0, 0, 0, 0);
		border-bottom-color: #fff;
	}

	/*弹出框*/

	.calendar-dialog {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}

	.calendar-dialog-mask {
		background: rgba(255, 255, 255, 0.5);
		width: 100%;
		height: 100%;
	}

	.calendar-dialog-body {
		background: #fff;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		padding: 20px;
		border: 1px solid #eee;
		border-radius: 2px;
	}
</style>
