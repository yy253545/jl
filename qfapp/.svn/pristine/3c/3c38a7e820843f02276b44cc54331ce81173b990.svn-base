<template>
	<div id="myDutyCenter">
		<div class="headBox posFix">
			<div class="wh">
				<img :src="backImg" class="backImg posAbs mid" @click="back" />
				<span class="posAbs cenMid">任务中心</span>
			</div>
		</div>
		<div id="" v-if="activeTabVal == '0'">
			<div class="topTabBox posFix clear">
				<div id="" class="flex flexCen" @click="activeTabFun('0')">
					<span :class="activeTabVal == '0' ? 'activeTab' : '' ">
						游戏任务
					</span>
				</div>
				<div id="" class="flex flexCen" @click="activeTabFun('1')">
					<span :class="activeTabVal == '1' ? 'activeTab' : '' " class="posRel">
						<em v-show="showWebPrompt" class="posAbs" style="width: 0.2rem;height: 0.2rem;border-radius: 50%;
							background: red;right: 0;transform: translate(80%,0%);"></em>
						平台任务
					</span>
				</div>
				<div id="" class="flex flexCen" @click="activeTabFun('2')">
					<span :class="activeTabVal == '2' ? 'activeTab' : '' ">
						领取记录
					</span>
				</div>
			</div>
			<div class="dutyGameMdBox">
				<dutyGameMd v-for="(item,index) in dutyGameData" :key="index" :gameData="item"></dutyGameMd>
			</div>
		</div>

		<div id="" v-if="activeTabVal == '1'">
			<div class="topTabBox posFix clear">
				<div id="" class="flex flexCen" @click="activeTabFun('0')">
					<span :class="activeTabVal == '0' ? 'activeTab' : '' ">
						游戏任务
					</span>
				</div>
				<div id="" class="flex flexCen" @click="activeTabFun('1')">
					<span :class="activeTabVal == '1' ? 'activeTab' : '' " class="posRel">
						<em v-show="showWebPrompt" class="posAbs" style="width: 0.2rem;height: 0.2rem;border-radius: 50%;
							background: red;right: 0;transform: translate(80%,0%);"></em>
						平台任务
					</span>
				</div>
				<div id="" class="flex flexCen" @click="activeTabFun('2')">
					<span :class="activeTabVal == '2' ? 'activeTab' : '' ">
						领取记录
					</span>
				</div>
			</div>
			<div class="dutyGameMdBox">
				<webDutyMd v-for="(item,index) in webDutyData" :key="index" :webDutyData="item" @getRewardSuccess="getRewardSuccess"></webDutyMd>
			</div>
		</div>

		<div id="" v-if="activeTabVal == '2'">
			<div class="topTabBox posFix clear">
				<div id="" class="flex flexCen" @click="activeTabFun('0')">
					<span :class="activeTabVal == '0' ? 'activeTab' : '' ">
						游戏任务
					</span>
				</div>
				<div id="" class="flex flexCen" @click="activeTabFun('1')">
					<span :class="activeTabVal == '1' ? 'activeTab' : '' " class="posRel">
						<em v-show="showWebPrompt" class="posAbs" style="width: 0.2rem;height: 0.2rem;border-radius: 50%;
							background: red;right: 0;transform: translate(80%,0%);"></em>
						平台任务
					</span>
				</div>
				<div id="" class="flex flexCen" @click="activeTabFun('2')">
					<span :class="activeTabVal == '2' ? 'activeTab' : '' ">
						领取记录
					</span>
				</div>
			</div>
			<div v-if="rewardData.length > 0 " class="dutyGameMdBox">
				<rewardMd v-for="(item,index) in rewardData" :key="index" :gameData="item"></rewardMd>
			</div>
			<div id="noRewradData" v-else>
				<span id="">
					您还没有领取过任何奖励呢~
				</span>
				<span id="">
					快去完成任务吧~
				</span>
			</div>
		</div>

		<maskMd v-show="show_mask" @clickMask="clickMask"></maskMd>
		<loginMd v-show="show_login" @regShow="regShow" @loginSuccess="loginSuccess" @findPassWord="findPassWord" @clickMask="clickMask"></loginMd>
		<regMd v-show="show_reg" @loginShow="loginShow" @regSuccess="regSuccess" @clickMask="clickMask"></regMd>
		<findPassWord v-show="show_findPassWord" @loginShow="loginShow" @clickMask="clickMask" @findPassSuccess="findPassSuccess"></findPassWord>
	</div>
</template>

<script>
	import loginMd from '../../components/loginMd'
	import regMd from '../../components/regMd'
	import maskMd from '../../components/maskMd'
	import findPassWord from '../../components/findPassWord'
	import dutyGameMd from '../../components/dutyGameMd'
	import rewardMd from '../../components/rewardMd'
	import webDutyMd from '../../components/webDutyMd'
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
	export default {
		inject: ["reload"],
		name: "myDutyCenter",
		components: {
			loginMd,
			regMd,
			maskMd,
			findPassWord,
			dutyGameMd,
			rewardMd,
			webDutyMd
		},
		data() {
			return {
				show_mask: false,
				show_login: false,
				show_reg: false,
				show_findPassWord: false,
				isLoginShow: true,
				activeTabVal: '0',
				noRewardImg: require("../../imgs/noRewardImg.png"),
				backImg: require("../../imgs/backImg1.png"),
				webDutyData: [],
				rewardData: [],
				dutyGameData: [],
				showWebPrompt: false,
			};
		},
		beforeMount: function() {
			var that = this;
			that.$nextTick(function() {
				window.addEventListener("scroll", that.handleScroll, true); // 监听（绑定）滚轮滚动事件
				document.documentElement.scrollTop = document.body.scrollTop = 0;

				var dutyCenterParams = {
					device: that.$store.getters.is_android ? "android" : "ios",
					time: Date.parse(new Date()) + ""
				};

				var webDutyParams = {
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
						url: "/Wap/api/gameTaskList",
						data: QS.stringify(mdjm_fun(dutyCenterParams))
					})
					.then(function(response) {
						//                      console.log(response.data.data);
						if (response.data.status == 0) {
							//请求不成功
						} else if (response.data.status == 1) {
							//请求成功
							var dutyGameData = response.data.data;
							for (let i = 0; i < dutyGameData.length; i++) {
								var type_text = dutyGameData[i].type_txt;
								if (type_text.split("|")[1]) {
									//至少有2个类型只选第一个
									dutyGameData[i].type_txt = type_text.split("|")[0];
								}
							}
							that.dutyGameData = dutyGameData;
						}
					})
					.catch(function(error) {
						//   console.log(error);
					});

				that
					.$axios({
						method: "post",
						url: "/Wap/api/platformTaskList",
						data: QS.stringify(mdjm_fun(webDutyParams))
					})
					.then(function(response) {
						//                      console.log(response.data.data);
						if (response.data.status == 0) {
							//请求不成功
							that.$confirm(response.data.msg, '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								showClose: false,
								closeOnClickModal: false,
								type: 'warning'
							}).then(() => {
								that.$router.push({
									name: "mine"
								})
							}).catch(() => {

							});
						} else if (response.data.status == 1) {
							//请求成功
							that.webDutyData = response.data.data;
							var webDutyData = that.webDutyData;
							for (let i = 0; i < webDutyData.length; i++) {
								if (webDutyData[i]['status'] == '1') {
									console.log('有领取的');
									that.showWebPrompt = true;
									return;
								} else {
									that.showWebPrompt = false;
								}
							}
						}
					})
					.catch(function(error) {
						//   console.log(error);
					});
				//				switch(that.activeTabVal) {
				//					case '0':
				//
				//						break;
				//					case '1':
				//						
				//						break;
				//					default:
				//						break;
				//				}
			})
		},
		mounted: function() {

		},
		beforeUpdate: function() {},
		updated: function() {},
		beforeDestroy: function() {},
		destroyed: function() {
			var that = this;
			window.removeEventListener('scroll', that.handleScroll);
		},
		methods: {
			getRewardSuccess: function(data) {
				var that = this;
				console.log(data);
				that.webDutyData = data;
				var webDutyData = that.webDutyData;
				for (let i = 0; i < webDutyData.length; i++) {
					if (webDutyData[i]['status'] == '1') {
						console.log('有领取的');
						that.showWebPrompt = true;
						return;
					} else {
						that.showWebPrompt = false;
					}
				}
			},
			back: function() {
				var that = this;
				that.$router.push({
					name: "mine"
				})
			},
			activeTabFun: function(val) { //tab栏的点击事件切换
				var that = this;
				//              console.log(val);
				that.activeTabVal = val;
				switch (that.activeTabVal) {
					case '0':
						//点击游戏任务tab;
						var dutyCenterParams = {
							device: that.$store.getters.is_android ? "android" : "ios",
							time: Date.parse(new Date()) + ""
						};

						function mdjm_fun(params) {
							var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
							params["access"] = access;
							//                          console.log(params);
							return params;
						}

						that
							.$axios({
								method: "post",
								url: "/Wap/api/gameTaskList",
								data: QS.stringify(mdjm_fun(dutyCenterParams))
							})
							.then(function(response) {
								//                      console.log(response.data.data);
								if (response.data.status == 0) {
									//请求不成功
									that.$confirm(response.data.msg, '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										showClose: false,
										closeOnClickModal: false,
										type: 'warning'
									}).then(() => {
										that.$router.push({
											name: "mine"
										})
									}).catch(() => {

									});
								} else if (response.data.status == 1) {
									//请求成功
									var dutyGameData = response.data.data;
									for (let i = 0; i < dutyGameData.length; i++) {
										var type_text = dutyGameData[i].type_txt;
										if (type_text.split("|")[1]) {
											//至少有2个类型只选第一个
											dutyGameData[i].type_txt = type_text.split("|")[0];
										}
									}
									that.dutyGameData = dutyGameData;
								}
							})
							.catch(function(error) {
								//   console.log(error);
							});
						break;
					case '1':
						//点击平台任务tab;
						var webDutyParams = {
							device: that.$store.getters.is_android ? "android" : "ios",
							time: Date.parse(new Date()) + ""
						};

						function mdjm_fun(params) {
							var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
							params["access"] = access;
							//                          console.log(params);
							return params;
						}

						that
							.$axios({
								method: "post",
								url: "/Wap/api/platformTaskList",
								data: QS.stringify(mdjm_fun(webDutyParams))
							})
							.then(function(response) {
								//                      console.log(response.data.data);
								if (response.data.status == 0) {
									//请求不成功
									that.$confirm(response.data.msg, '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
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
								} else if (response.data.status == 1) {
									//请求成功
									that.webDutyData = response.data.data;
									var webDutyData = that.webDutyData;
									for (let i = 0; i < webDutyData.length; i++) {
										if (webDutyData[i]['status'] == '1') {
											console.log('有领取的');
											that.showWebPrompt = true;
											return;
										} else {
											that.showWebPrompt = false;
										}
									}
								}
							})
							.catch(function(error) {
								//   console.log(error);
							});
						break;
					case '2':
						//点击领取记录tab;
						var getRecordParams = {
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
								url: "/Wap/api/receiveRecordList",
								data: QS.stringify(mdjm_fun(getRecordParams))
							})
							.then(function(response) {
								//                      console.log(response.data.data);
								if (response.data.status == 0) {
									//请求不成功
									that.$confirm(response.data.msg, '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
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
								} else if (response.data.status == 1) {
									//请求成功
									that.rewardData = response.data.data;
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
			backTabFun: function() {
				var that = this;

			},
			clickMask: function() { //点击mask影藏所有模块
				var that = this;
				that.show_login = false;
				that.show_reg = false;
				that.show_mask = false;
				that.show_findPassWord = false;
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
				that.show_reg = false;
				that.show_findPassWord = true;
			},
			regShow: function() {
				var that = this;
				that.show_login = false;
				that.show_reg = true;
				that.show_findPassWord = false;
			},
			loginShow: function() {
				var that = this;
				that.show_login = true;
				that.show_reg = false;
				that.show_findPassWord = false;
			}
		},
		computed: {
			baseUrl() {
				return this.$store.getters.baseUrl;
			},
			baseImgUrl() {
				return this.$store.getters.baseImgUrl;
			},
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	#myDutyCenter {
		width: 100%;
		padding-top: 2rem;

		#noRewradData {
			width: 100%;
			padding: 0.5rem 0;

			span {
				font-size: 0.3rem;
				color: #ff8a00;
				text-align: center;
				width: 100%;
				line-height: 1rem;
			}
		}

		.headBox {
			width: 100%;
			height: 1rem;
			background: #fff;
			top: 0;
			z-index: 1000;

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

		.backTabBox {
			width: 100%;
			height: 1rem;
			background: #fff;
			bottom: 0;
			left: 0;
			z-index: 1000;

			span {
				width: 4.9rem;
				height: 0.75rem;
				line-height: 0.75rem;
				color: #FFFFFF;
				font-size: 0.4rem;
				text-align: center;
			}
		}

		.rewardBox {
			.rewardMd {
				background: #ffffff;
				border-top: #f5f5f5 solid 0.03rem;
			}

			.rewardMd:last-child {
				border-bottom: #f5f5f5 solid 0.03rem;
			}
		}

		.topTabBox {
			width: 100%;
			height: 1rem;
			background: #fff;
			top: 1rem;
			left: 0;
			z-index: 1000;

			div {
				width: 33.333333%;
				height: 100%;
				float: left;

				span {
					font-size: 0.35rem;
					color: #333333;
					font-weight: 600;
					padding-bottom: 0.02rem;
					border-bottom: 2px solid #ffffff;
				}

				.activeTab {
					color: #ff8a00;
					border-bottom: 2px solid #ff8a00;
				}
			}
		}
	}
</style>
