<template>
	<div id="vipServicePage">
		<div class="headBox posFix">
			<div class="wh">
				<img :src="backImg" class="backImg posAbs mid" @click="back" />
				<span class="posAbs cenMid">VIP尊享特权</span>
			</div>
		</div>
		<showMessage v-if="showMessage" @submitSuccess="submitSuccess" @clickMask="clickMask" :form_data="form_data" :allGame="allGame"></showMessage>
		<maskMd v-show="show_mask" @clickMask="clickMask"></maskMd>
		<div class="vipServiceBox">
			<div class="top_box">
				<div class="vip_level_box flex flexSta">
					<span>明月会员:</span>
					<img v-if="vip_level == '1'" :src="vipIcon1" />
					<img v-if="vip_level == '2'" :src="vipIcon2" />
					<img v-if="vip_level == '3'" :src="vipIcon3" />
					<img v-if="vip_level == '4'" :src="vipIcon4" />
					<img v-if="vip_level == '5'" :src="vipIcon5" />
					<img v-if="vip_level == '6'" :src="vipIcon6" />
					<img v-if="vip_level == '7'" :src="vipIcon7" />
				</div>
				<div class="grow_box flex flexSta">
					<span>成长值:</span>
					<div class="progressBox posRel">
						<span class="progressSp posAbs" :style="{'width':percent+'%'}"></span>
						<span v-if="vip_level == '0'" class="progress posAbs cenMid">{{vip_exp}}/10</span>
						<span v-if="vip_level == '1'" class="progress posAbs cenMid">{{vip_exp}}/4999</span>
						<span v-if="vip_level == '2'" class="progress posAbs cenMid">{{vip_exp}}/9999</span>
						<span v-if="vip_level == '3'" class="progress posAbs cenMid">{{vip_exp}}/49999</span>
						<span v-if="vip_level == '4'" class="progress posAbs cenMid">{{vip_exp}}/99999</span>
						<span v-if="vip_level == '5'" class="progress posAbs cenMid">{{vip_exp}}/499999</span>
						<span v-if="vip_level == '6'" class="progress posAbs cenMid">{{vip_exp}}/999999</span>
						<span v-if="vip_level == '7'" class="progress posAbs cenMid">{{vip_exp}}/99999999</span>
					</div>
				</div>
				<div class="refresh_time_box flex flexSta">
					<span style="margin-right: 0.3rem;">重新结算时间:</span>
					<span>{{year}}年1月1日</span>
				</div>
			</div>
			<div class="vip_service_box">
				<div class="tit_box flex flexCen">
					<img :src="vipServiceIcon" />
					<span>平台特权</span>
				</div>
				<div class="vipService_box flex flexAro" style="border-bottom: #ffffff solid 2px;">
					<div class="showMessageBox" @click="mfcjBtnFun">
						<img :src="mfcjIcon" />
						<span>免费抽奖</span>
					</div>
					<div class="showMessageBox" @click="srlbBtnFun">
						<img :src="srlbIcon" />
						<span>生日礼包(V3)</span>
					</div>
					<div class="showMessageBox" @click="hdtqBtnFun">
						<img :src="hdtqIcon" />
						<span>活动特权(V3)</span>
					</div>
				</div>
				<div class="tit_box flex flexCen" style="margin-top: 0.3rem;">
					<img :src="vipServiceIcon" />
					<span>服务特权</span>
				</div>
				<div class="vipService_box flex flexAro">
					<div class="showMessageBox" @click="xsclBtnFun">
						<img :src="xsclIcon" />
						<span>限时处理(V3)</span>
					</div>
					<div class="showMessageBox" @click="showMessageFun('5')">
						<img :src="zsgjIcon" />
						<span>专属管家(V5)</span>
					</div>
					<div class="showMessageBox" @click="xyyyBtnFun">
						<img :src="xyyyIcon" />
						<span>新游预约(V5)</span>
					</div>
					<div class="showMessageBox" @click="showMessageFun('6')">
						<img :src="czflIcon" />
						<span>充值返利(V5)</span>
					</div>
					<div class="showMessageBox" @click="showMessageFun('7')">
						<img :src="sjhfIcon" />
						<span>数据恢复(V5)</span>
					</div>
				</div>
			</div>
		</div>
		<div class="backMinePage posFix">
			<span @click="backMinePage">
                    		返回个人中心
                    	</span>
		</div>
	</div>
</template>

<script>
	import showMessage from "../../components/showMessage"
	import maskMd from '../../components/maskMd'
	import utils from "../../config/common.js";
	import axios from "axios";
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
	import vueResource from "vue-resource";
	import Vue from "vue";
	Vue.use(vueResource);

	export default {
		inject: ["reload"],
		name: "vipServicePage",
		components: {
			showMessage,
			maskMd
		},
		data() {
			return {
				backImg: require("../../imgs/backImg1.png"),
				moreIconImg: require("../../imgs/more.png"),
				mfcjIcon: require("../../imgs/mfcjIcon.png"),
				srlbIcon: require("../../imgs/srlbIcon.png"),
				hdtqIcon: require("../../imgs/hdtqIcon.png"),
				xsclIcon: require("../../imgs/xsclIcon.png"),
				zsgjIcon: require("../../imgs/zsgjIcon.png"),
				xyyyIcon: require("../../imgs/xyyyIcon.png"),
				czflIcon: require("../../imgs/czflIcon.png"),
				sjhfIcon: require("../../imgs/sjhfIcon.png"),

				serviceBgImg: require("../../imgs/serviceBgImg.png"),
				vipIcon1: require("../../imgs/userVipIcon1.png"),
				vipIcon2: require("../../imgs/userVipIcon2.png"),
				vipIcon3: require("../../imgs/userVipIcon3.png"),
				vipIcon4: require("../../imgs/userVipIcon4.png"),
				vipIcon5: require("../../imgs/userVipIcon5.png"),
				vipIcon6: require("../../imgs/userVipIcon6.png"),
				vipIcon7: require("../../imgs/userVipIcon7.png"),
				
				vipServiceIcon: require("../../imgs/vipServiceIcon.png"),
				score: "", //积分
				vip_exp: "", //经验值
				vip_level: "", //等级VIP
				percent: "",
				year: "",
				activeName: '0',
				showMessage: false,
				show_mask: false,
				allGame: [],
				progressData: [],
				form_data: {
					title: "",
					type: "1",
					//                  user_name_tit: "游戏账号",
					app_id_tit: "所在游戏",
					app_id_show: false,

					server_name_tit: "所在区服",
					server_name_show: false,

					role_name_tit: "角色名字",
					role_name_show: false,

					happen_time_tit: "充值时间",
					happen_time_show: false,

					device_tit: "游戏设备",
					device_show: false,

					report_name_tit: "举报角色名/ID",
					report_name_show: false,

					description_tit: "详细信息描述",
					description_show: false,

					mobile_tit: "联系电话",
					mobile_show: false,

					qq_tit: 'QQ号',
					qq_show: false,

					email_tit: "邮箱",
					email_show: false,

					checkNumber_tit: "验证类型",
					checkNumber_show: false,

					number_tit: '需要验证的信息',
					number_show: false,

					yzm_tit: "验证码",
					yzm_show: false,

					yzBtn_show: false,
					image_show: false,
					video_show: false,
				}
			};
		},
		beforeCreate: function() {},
		created: function() {

		},

		beforeMount: function() {},
		mounted: function() {
			var that = this;

			document
				.getElementById("vipServicePage")
				.addEventListener("scroll", that.handleScroll, true); // 监听（绑定）滚轮滚动事件

			var score = window.localStorage.getItem('score');
			var vip_exp = window.localStorage.getItem('vip_exp');
			var vip_level = window.localStorage.getItem('vip_level');
			var year = new Date().getFullYear() + 1;
			switch(vip_level) {
				case '0':
					var percent = vip_exp / 10 * 100;
					that.percent = percent;
					break;
				case '1':
					var percent = vip_exp / 4999 * 100;
					that.percent = percent;
					break;
				case '2':
					var percent = vip_exp / 9999 * 100;
					that.percent = percent;
					break;
				case '3':
					var percent = vip_exp / 49999 * 100;
					that.percent = percent;
					break;
				case '4':
					var percent = vip_exp / 99999 * 100;
					that.percent = percent;
					break;
				case '5':
					var percent = vip_exp / 499999 * 100;
					that.percent = percent;
					break;
				case '6':
					var percent = vip_exp / 1199999 * 100;
					that.percent = percent;
					break;
				case '7':
					var percent = vip_exp / 99999999 * 100;
					that.percent = percent;
					break;
				default:
					break;
			}

			that.score = score;
			that.vip_exp = vip_exp;
			that.vip_level = vip_level;
			that.year = year;

			console.log(score, vip_exp, vip_level, year);

			var getGameParams = {
				device: that.$store.getters.is_android ? "android" : "ios",
				time: Date.parse(new Date()) + ""
			};

			function mdjm_fun(params) {
				var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
				params["access"] = access;
				return params;
			}

			that
				.$axios({
					method: "post",
					url: "/Wap/api/getGame",
					data: QS.stringify(mdjm_fun(getGameParams))
				})
				.then(function(response) {
					//                      console.log(response.data.data);
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
						//                      console.log(response.data.data);
						var res_data = response.data.data;

						var game_picker_res_data = [];
						for(var key in res_data) {
							var option_dataObj = {};
							option_dataObj.key = key;
							option_dataObj.value = res_data[key];
							game_picker_res_data.push(option_dataObj);
						}
						//                      console.log(game_picker_res_data);
						that.allGame = game_picker_res_data;
					}
				})
				.catch(function(error) {
					//   console.log(error);
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
			mfcjBtnFun: function() { //免费抽奖方法
				var that = this;
				that.$confirm('敬请期待', '提示', {
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
			srlbBtnFun: function() { //生日礼包方法
				var that = this;
				that.$confirm('敬请期待', '提示', {
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
			hdtqBtnFun: function() { //活动特权方法
				var that = this;
				that.$confirm('敬请期待', '提示', {
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
			xsclBtnFun: function() { //限时处理方法
				var that = this;
				that.$confirm('V5及以上等级明月会员所提交的自助服务反馈，清风专业客服团队保证于24小时内为您解决问题', '提示', {
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
			xyyyBtnFun: function() { //新游预约方法
				var that = this;
				that.$confirm('敬请期待', '提示', {
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
			processDescFun: function(val) { //点击查看处理详情方法
				var that = this;

				var processDescParams = {
					device: that.$store.getters.is_android ? "android" : "ios",
					time: Date.parse(new Date()) + "",
					id: val + ""
				};

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
					params["access"] = access;
					return params;
				}
				that
					.$axios({
						method: "post",
						url: "/Wap/api/processDesc",
						data: QS.stringify(mdjm_fun(processDescParams))
					})
					.then(function(response) {
						//                      console.log(response.data.data);
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
							that.$confirm(response.data.data, '客服处理结果', {
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
						}
					})
					.catch(function(error) {
						//   console.log(error);
					});
			},
			backMinePage: function() {
				var that = this;
				that.$router.push({
					name: "mine"
				})
			},
			submitSuccess: function() {
				var that = this;
				that.showMessage = false;
				that.show_mask = false;
			},
			clickMask: function() { //点击mask影藏所有模块
				var that = this;
				that.showMessage = false;
				that.show_mask = false;
			},
			back: function() {
				var that = this;
				that.$router.push({
					name: "serviceCenter"
				})
			},
			handleClick(tab, event) {
				var that = this;
				//              console.log(typeof tab.index, event);
				switch(tab.index) {
					case '0':
						break;
					case '1':
						console.log('点击查看进度查询');
						var processListParams = {
							device: that.$store.getters.is_android ? "android" : "ios",
							time: Date.parse(new Date()) + ""
						};

						function mdjm_fun(params) {
							var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
							params["access"] = access;
							return params;
						}
						that
							.$axios({
								method: "post",
								url: "/Wap/api/processList",
								data: QS.stringify(mdjm_fun(processListParams))
							})
							.then(function(response) {
								//                      console.log(response.data.data);
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
										that.$router.push({
											name: "mine"
										})
									}).catch(() => {

									});
								} else if(response.data.status == 1) {
									//请求成功
									console.log(response.data.data);
									that.progressData = response.data.data;
								}
							})
							.catch(function(error) {
								//   console.log(error);
							});
						break;
					default:
						break;
				}
			},
			showMessageFun: function(val) {
				var that = this;
				that.showMessage = true;
				that.show_mask = true;

				var vip_level = window.localStorage.getItem('vip_level');
				console.log(vip_level);

				switch(val) {
					case '1': //充值错误
						var form_data = {
							type: "1",
							title: "游戏内充值未到账",
							//                          user_name_tit: "游戏账号",
							app_id_tit: "所在游戏",
							app_id_show: true,

							server_name_tit: "所在区服",
							server_name_show: true,

							role_name_tit: "角色名字",
							role_name_show: true,

							happen_time_tit: "充值时间",
							happen_time_show: true,

							device_tit: "游戏设备",
							device_show: false,

							report_name_tit: "举报角色名/ID",
							report_name_show: false,

							description_tit: "详细信息描述",
							description_show: true,

							mobile_tit: "联系电话",
							mobile_show: true,

							qq_tit: 'QQ号',
							qq_show: true,

							email_tit: "邮箱",
							email_show: true,

							checkNumber_tit: "验证类型",
							checkNumber_show: false,

							number_tit: '需要验证的信息',
							number_show: false,

							yzm_tit: "验证码",
							yzm_show: false,

							image_show: true,
							video_show: true,
							yzBtn_show: false,
						}
						that.form_data = form_data;
						break;
					case '2': //bug反馈
						var form_data = {
							type: "2",

							title: "游戏BUG",
							//                          user_name_tit: "游戏账号",
							app_id_tit: "所在游戏",
							app_id_show: true,

							server_name_tit: "所在区服",
							server_name_show: true,

							role_name_tit: "角色名字",
							role_name_show: true,

							happen_time_tit: "充值时间",
							happen_time_show: false,

							device_tit: "游戏设备",
							device_show: true,

							report_name_tit: "举报角色名/ID",
							report_name_show: false,

							description_tit: "详细信息描述",
							description_show: true,

							mobile_tit: "联系电话",
							mobile_show: true,

							qq_tit: 'QQ号',
							qq_show: true,

							email_tit: "邮箱",
							email_show: true,

							checkNumber_tit: "验证类型",
							checkNumber_show: false,

							number_tit: '需要验证的信息',
							number_show: false,

							yzm_tit: "验证码",
							yzm_show: false,

							image_show: true,
							video_show: true,
							yzBtn_show: false,
						}
						that.form_data = form_data;
						break;
					case '3': //建议反馈
						var form_data = {
							type: "3",

							title: "对游戏的建议反馈",
							//                          user_name_tit: "游戏账号",
							app_id_tit: "所在游戏",
							app_id_show: true,

							server_name_tit: "所在区服",
							server_name_show: true,

							role_name_tit: "角色名字",
							role_name_show: true,

							happen_time_tit: "充值时间",
							happen_time_show: false,

							device_tit: "游戏设备",
							device_show: false,

							report_name_tit: "举报角色名/ID",
							report_name_show: false,

							description_tit: "详细信息描述",
							description_show: true,

							mobile_tit: "联系电话",
							mobile_show: true,

							qq_tit: 'QQ号',
							qq_show: true,

							email_tit: "邮箱",
							email_show: true,

							checkNumber_tit: "验证类型",
							checkNumber_show: false,

							number_tit: '需要验证的信息',
							number_show: false,

							yzm_tit: "验证码",
							yzm_show: false,

							image_show: true,
							video_show: true,
							yzBtn_show: false,
						}
						that.form_data = form_data;
						break;
					case '4': //广告举报
						var form_data = {
							type: "4",

							title: "游戏内打广告、拉人等行为举报",
							//                          user_name_tit: "游戏账号",
							app_id_tit: "所在游戏",
							app_id_show: true,

							server_name_tit: "所在区服",
							server_name_show: true,

							role_name_tit: "角色名字",
							role_name_show: true,

							happen_time_tit: "充值时间",
							happen_time_show: false,

							device_tit: "游戏设备",
							device_show: false,

							report_name_tit: "举报角色名/ID",
							report_name_show: true,

							description_tit: "详细信息描述",
							description_show: true,

							mobile_tit: "联系电话",
							mobile_show: true,

							qq_tit: 'QQ号',
							qq_show: true,

							email_tit: "邮箱",
							email_show: true,

							checkNumber_tit: "验证类型",
							checkNumber_show: false,

							number_tit: '需要验证的信息',
							number_show: false,

							yzm_tit: "验证码",
							yzm_show: false,

							image_show: true,
							video_show: true,
							yzBtn_show: false,
						}
						that.form_data = form_data;
						break;
					case '5': //专属管家
						if(vip_level >= 5) {
							var form_data = {
								type: "5",

								title: "处理一切类型问题 给您无忧游戏体验您的专属管家 在此进行申请",
								//                          user_name_tit: "游戏账号",
								app_id_tit: "所在游戏",
								app_id_show: true,

								server_name_tit: "所在区服",
								server_name_show: true,

								role_name_tit: "角色名字",
								role_name_show: true,

								happen_time_tit: "充值时间",
								happen_time_show: false,

								device_tit: "游戏设备",
								device_show: false,

								report_name_tit: "举报角色名/ID",
								report_name_show: false,

								description_tit: "详细信息描述",
								description_show: false,

								mobile_tit: "联系电话",
								mobile_show: true,

								qq_tit: 'QQ号',
								qq_show: true,

								email_tit: "邮箱",
								email_show: true,

								checkNumber_tit: "验证类型",
								checkNumber_show: false,

								number_tit: '需要验证的信息',
								number_show: false,

								yzm_tit: "验证码",
								yzm_show: false,

								image_show: false,
								video_show: false,
								yzBtn_show: false,
							}
							that.form_data = form_data;
						} else {
							that.showMessage = false;
							that.show_mask = false;
							that.$confirm('去查看明月VIP成长体系?', '暂未达到该项特权所需明月VIP等级！', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: true,
								showClose: false,
								closeOnClickModal: false,
								type: 'info',
								center: true
							}).then(() => {
								that.$router.push({
									name: "vipGrow"
								})
							}).catch(() => {

							});
						}
						break;
					case '6': //充值返利
						if(vip_level >= 5) {
							var form_data = {
								type: "6",

								title: "想要了解更多充值返利、充值特惠等信息请在此申请",
								//                          user_name_tit: "游戏账号",
								app_id_tit: "所在游戏",
								app_id_show: true,

								server_name_tit: "所在区服",
								server_name_show: true,

								role_name_tit: "角色名字",
								role_name_show: true,

								happen_time_tit: "充值时间",
								happen_time_show: false,

								device_tit: "游戏设备",
								device_show: false,

								report_name_tit: "举报角色名/ID",
								report_name_show: false,

								description_tit: "详细信息描述",
								description_show: false,

								mobile_tit: "联系电话",
								mobile_show: true,

								qq_tit: 'QQ号',
								qq_show: true,

								email_tit: "邮箱",
								email_show: true,

								checkNumber_tit: "验证类型",
								checkNumber_show: false,

								number_tit: '需要验证的信息',
								number_show: false,

								yzm_tit: "验证码",
								yzm_show: false,

								image_show: false,
								video_show: false,
								yzBtn_show: false,
							}
							that.form_data = form_data;
						} else {
							that.showMessage = false;
							that.show_mask = false;
							that.$confirm('去查看明月VIP成长体系?', '暂未达到该项特权所需明月VIP等级！', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: true,
								showClose: false,
								closeOnClickModal: false,
								type: 'info',
								center: true
							}).then(() => {
								that.$router.push({
									name: "vipGrow"
								})
							}).catch(() => {

							});
						}
						break;
					case '7': //数据恢复
						if(vip_level >= 5) {
							var form_data = {
								type: "7",

								title: "进行游戏道具等数据恢复 请在此申请",
								//                          user_name_tit: "游戏账号",
								app_id_tit: "所在游戏",
								app_id_show: true,

								server_name_tit: "所在区服",
								server_name_show: true,

								role_name_tit: "角色名字",
								role_name_show: true,

								happen_time_tit: "充值时间",
								happen_time_show: false,

								device_tit: "游戏设备",
								device_show: false,

								report_name_tit: "举报角色名/ID",
								report_name_show: false,

								description_tit: "详细信息描述",
								description_show: false,

								mobile_tit: "联系电话",
								mobile_show: true,

								qq_tit: 'QQ号',
								qq_show: true,

								email_tit: "邮箱",
								email_show: true,

								checkNumber_tit: "验证类型",
								checkNumber_show: false,

								number_tit: '需要验证的信息',
								number_show: false,

								yzm_tit: "验证码",
								yzm_show: false,

								image_show: false,
								video_show: false,
								yzBtn_show: false,
							}
							that.form_data = form_data;
						} else {
							that.showMessage = false;
							that.show_mask = false;
							that.$confirm('去查看明月VIP成长体系?', '暂未达到该项特权所需明月VIP等级！', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showCancelButton: true,
								showClose: false,
								closeOnClickModal: false,
								type: 'info',
								center: true
							}).then(() => {
								that.$router.push({
									name: "vipGrow"
								})
							}).catch(() => {

							});
						}
						break;
					case '8': //官方验证
						var form_data = {

							title: "查询qq群、公众号，客服电话，客服qq",
							//                          user_name_tit: "游戏账号",
							app_id_tit: "所在游戏",
							app_id_show: false,

							server_name_tit: "所在区服",
							server_name_show: false,

							role_name_tit: "角色名字",
							role_name_show: false,

							happen_time_tit: "充值时间",
							happen_time_show: false,

							device_tit: "游戏设备",
							device_show: false,

							report_name_tit: "举报角色名/ID",
							report_name_show: false,

							description_tit: "详细信息描述",
							description_show: false,

							mobile_tit: "联系电话",
							mobile_show: false,

							qq_tit: 'QQ号',
							qq_show: false,

							email_tit: "邮箱",
							email_show: false,

							checkNumber_tit: "验证类型",
							checkNumber_show: true,

							number_tit: '需要验证的信息',
							number_show: true,

							yzm_tit: "验证码",
							yzm_show: true,

							image_show: false,
							video_show: false,
							yzBtn_show: true,
						}
						that.form_data = form_data;
						break;
					default:
						break;
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
	#vipServicePage {
		width: 100%;
		padding-top: 1rem;
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
		.vipServiceBox {
			width: 100%;
			height: 100%;
			background: #f5f5f5;
			padding-top: 0.25rem;
			padding-bottom: 1rem;
			.vip_service_box {
				width: 100%;
				height: auto;
				.tit_box {
					width: 100%;
					height: 0.6rem;
					img {
						width: auto;
						height: 0.4rem;
						margin-right: 0.15rem;
					}
					span {
						font-size: 0.34rem;
						color: #333333;
						font-weight: 600;
					}
				}
				.vipService_box {
					width: 100%;
					flex-wrap: wrap;
					justify-content: space-around;
					.showMessageBox {
						width: 27%;
						height: auto;
						margin: 0.5rem 0;
						img {
							width: 100%;
							height: auto;
						}
						span {
							width: 100%;
							font-size: 0.3rem;
							font-weight: 600;
							color: #333333;
							line-height: 0.45rem;
							text-align: center;
						}
					}
				}
			}
			.top_box {
				width: 6.7rem;
				height:2.1rem;
				border-radius: 10px;
				background: #ffffff;
				margin: 0rem auto 0.25rem;
				padding: 0.2rem 0;
				.vip_level_box {
					width: 100%;
					padding: 0 0.25rem;
					height: 0.45rem;
					span {
						font-size: 0.3rem;
						color: #333333;
					}
					img {
						width: auto;
						height: 0.4rem;
						margin-left: 0.2rem;
					}
				}
				.refresh_time_box {
					width: 100%;
					padding: 0 0.25rem;
					height: 0.8rem;
					span {
						font-size: 0.3rem;
						color: #333333;
					}
				}
				.grow_box {
					width: 100%;
					padding: 0 0.25rem;
					height: 0.45rem;
					span {
						font-size: 0.3rem;
						color: #333333;
					}
					.progressBox {
						width: 4.7rem;
						height: 0.3rem;
						background: #d2d2d2;
						margin-left: 0.3rem;
						border-radius: 3px;
						.progressSp {
							height: 100%;
							left: 0;
							top: 0;
							background: #ffae00;
						}
						.progress {
							font-size: 0.24rem;
							color: #333333;
						}
					}
				}
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
	}
</style>