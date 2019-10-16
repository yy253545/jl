<template>
	<div id="checkPage">
		<backTop v-show="back_top_show" v-on:back_top="back_top"></backTop>
		<div class="headBox posFix">
			<div class="wh">
				<img :src="backImg" class="backImg posAbs mid" @click="backHistory" />
				<span class="posAbs cenMid">兑换</span>
			</div>
		</div>
		<!--<div class="updateTopBox flex flexSta posFix">
			<img :src="backImg" alt class="backImg" @click="backHistory">
			<h3 class>兑换</h3>
		</div>-->
		<div class="newsDetail_containerBox">
			<div class="top_box posRel">
				<img :src="goodsDetailData.original_img" alt="" class="icon posAbs mid" />
				<span class="nameBox posAbs">{{goodsDetailData.name}}</span>
				<span class="remain_count posAbs">所需积分:{{parseFloat(goodsDetailData.integral)}}</span>
				<span class="checkBtn posAbs">X1</span>
			</div>
			<div class="needIntegralBox flex flexEnd">
				本次总消耗积分:
				<span>{{parseFloat(goodsDetailData.integral)}}</span>
			</div>
			<div class="leftIntegralBox flex flexEnd" style="margin-top: 0;border-bottom: 1px solid #f5f5f5;">
				剩余积分:
				<span>{{score}}</span>
			</div>
			<div class="tit_box flex flexCen">
				<img :src="shdzIcon" />
				<span id="">
					收货地址
				</span>
			</div>
			<div class="areaBox flex flexSta">
				收货人:
				<input type="text" name="" id="" value="" v-model="consignee" placeholder="请填写收货人" />
			</div>
			<div class="areaBox flex flexSta">
				手机号:
				<input type="number" name="" id="" value="" v-model="tel" placeholder="请填写手机号" />
			</div>
			<div class="areaBox flex flexSta">
				所在地:
				<el-cascader size="medium" :options="options" v-model="selectedOptions" @change="handleChange">

				</el-cascader>
			</div>
			<div class="areaBox flex flexSta">
				详细地址:
				<input type="text" name="" id="" value="" v-model="address" placeholder="请填写详细地址" />
			</div>
			<div class="setDefaultArea flex flexBet">
				<span @click="addNewArea">添加新地址</span>
				<span @click="addNewDefaultArea">添加并设为默认地址?</span>
			</div>
			<div class="getDefaultArea">
				选择收货地址
			</div>
			<div class="area_box">
				<div @click="checkAddressFun(item.id,index)" v-for="(item,index) in addressData" :key="index" class="area_item_box flex flexSta">
					<img v-if="item.isCheck" :src="checkAreaImg" class="checkAreaImg" />
					<img v-else :src="unCheckAreaImg" class="unCheckAreaImg" />
					<div class="address_box">
						<span v-show="item.is_default == '2'" style="color: #ff8a00;">默认地址</span>
						<span>收货人:{{item.consignee}}</span>
						<span>手机号:{{item.mobile}}</span>
						<span>所在地:{{item.province}}{{item.city}}{{item.district}}</span>
						<span>详细地址:{{item.address}}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="backMinePage posFix">
			<span @click="sureCheckBtnFun">
							确定结算
						</span>
		</div>
	</div>
</template>

<script>
	import backTop from "../../components/backTop";
	import utils from "../../config/common.js";
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
	import {
		provinceAndCityData,
		regionData,
		provinceAndCityDataPlus,
		regionDataPlus,
		CodeToText,
		TextToCode
	} from 'element-china-area-data'
	export default {
		inject: ["reload"],
		name: "checkPage",
		components: {
			backTop,
		},
		data() {
			return {
				options: regionDataPlus,
				selectedOptions: [], //省市
				consignee: "", //收货人
				tel: "", //联系电话
				areaObj: "",
				address: "", //详细地址
				backImg: require("../../imgs/backImg1.png"),
				shdzIcon: require("../../imgs/shdzIcon.png"),
				checkAreaImg: require("../../imgs/checkAreaImg.png"),
				unCheckAreaImg: require("../../imgs/unCheckAreaImg.png"),
				id: "",
				goodsDetailData: "",
				addressData: [], //地址列表;
				score: "",
				mem_address_id: "",
			};
		},

		beforeCreate: function() {
			this.$store.dispatch("clearScrollType");
			// utils.is_PC();
		},
		created: function() {
			var that = this;
			that.baseUrl = that.$store.getters.baseUrl;
			that.getParams();

			var goodsdetail_id = window.localStorage.getItem("goodsdetail_id") + '';
			var id = that.id + '';

			var checkUserLogin_params = {
				device: that.$store.getters.is_android ? "android" : "ios",
				time: Date.parse(new Date()) + ""
			};

			var goodsDetail_params = {
				device: that.$store.getters.is_android ? "android" : "ios",
				time: Date.parse(new Date()) + "",
				id: goodsdetail_id || id
			};

			var getArea_params = {
				device: that.$store.getters.is_android ? "android" : "ios",
				time: Date.parse(new Date()) + "",
			};

			function mdjm_fun(params) {
				var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
				params["access"] = access;
				return params;
			};

			that
				.$axios({
					method: "post",
					url: "/Wap/api/checkUserLogin",
					data: QS.stringify(mdjm_fun(checkUserLogin_params))
				})
				.then(function(response) {
					//					console.log(response.data);
					if(response.data.status == 0) {
						//请求不成功
						window.localStorage.setItem("isLoginShow", true);
						window.localStorage.setItem("username", "");
						window.localStorage.setItem("mobile", "");
						window.localStorage.setItem("email", "");
						window.localStorage.setItem("portrait", "");
					} else if(response.data.status == 1) {
						//请求成功
						that.score = response.data.data.score;
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
									that.goodsDetailData = res_data;

									if(Number(that.score) < Number(that.goodsDetailData.integral)) {
										that.$confirm('您的积分不够兑换哦！', '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											showCancelButton: false,
											showClose: false,
											closeOnClickModal: false,
											type: 'warning',
											center: true
										}).then(() => {
											that.$router.go(-1);
										}).catch(() => {

										});
									} else {
										that.$axios({
												method: "post",
												url: "/Wap/api/getMemAddressList",
												data: QS.stringify(mdjm_fun(getArea_params))
											})
											.then(function(response) {
												// console.log(response.data);
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
													var addressData = response.data.data;
													for(var i = 0; i < addressData.length; i++) {
														addressData[i]['isCheck'] = false;
														if(addressData[i]['is_default'] == '2') {
															addressData[i]['isCheck'] = true;
															that.mem_address_id = addressData[i]['id'];
														}
													}
													that.addressData = addressData;
												}
											})
											.catch(function(error) {
												// console.log(error);
											});
									}
								}
							})
							.catch(function(error) {
								// console.log(error);
							});
					}
				})
				.catch(function(error) {
					//   console.log(error);
				});

		},
		beforeMount: function() {},
		mounted: function() {
			var that = this;
			document
				.getElementById("checkPage")
				.addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件
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
			checkAddressFun: function(id, index) {
				var that = this;
				var addressID = id;
				var addressData = that.addressData;
				for(let i = 0; i < addressData.length; i++) {
					addressData[i]['isCheck'] = false;
				}
				addressData[index]['isCheck'] = true;
				that.addressData = addressData;
				that.mem_address_id = addressID;
			},
			sureCheckBtnFun: function() {
				var that = this;
				//				console.log('确定结算');
				var goods_id = that.goodsDetailData.id;
				var mem_address_id = that.mem_address_id;

				var addIntegralOrder_params = {
					device: that.$store.getters.is_android ? "android" : "ios",
					time: Date.parse(new Date()) + "",
					goods_id: goods_id + "",
					mem_address_id: mem_address_id + "",
				};

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
					params["access"] = access;
					return params;
				};

				if(mem_address_id == "") {
					that.$confirm('请选择您的收货地址!', '提示', {
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
				} else {
					that.$axios({
							method: "post",
							url: "/Wap/api/addIntegralOrder",
							data: QS.stringify(mdjm_fun(addIntegralOrder_params))
						})
						.then(function(response) {
							// console.log(response.data);
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
								//								console.log(response.data.data);
								that.$confirm(response.data.msg, '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									showCancelButton: false,
									showClose: false,
									closeOnClickModal: false,
									type: 'warning',
									center: true
								}).then(() => {
									that.$router.go(-1);
								}).catch(() => {

								});
							}
						})
						.catch(function(error) {
							// console.log(error);
						});
				}
			},
			addNewDefaultArea: function() {
				var that = this;
				//				console.log('添加新地址');
				var consignee = that.consignee;
				var tel = that.tel;
				var address = that.address;
				var areaObj = that.areaObj;
				var selectedOptions = that.selectedOptions;
				if(consignee == "" || tel == "" || address == "" || areaObj == "") {
					that.$confirm('请完整的填写您的新地址哦', '提示', {
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
				} else if(!utils.is_tel(tel)) {
					that.$confirm('请填写您的正确的手机号', '提示', {
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
				} else {
					var addNewArea_params = {
						device: that.$store.getters.is_android ? "android" : "ios",
						time: Date.parse(new Date()) + "",
						consignee: consignee,
						mobile: tel + "",
						province: areaObj[0] + '',
						city: areaObj[1] + '',
						district: areaObj[2] + '',
						address: address,
						is_default: '2'
					};

					function mdjm_fun(params) {
						var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
						params["access"] = access;
						return params;
					}

					that.$axios({
							method: "post",
							url: "/Wap/api/addMemAddress",
							data: QS.stringify(mdjm_fun(addNewArea_params))
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
								that.$confirm(response.data.msg, '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									showCancelButton: false,
									showClose: false,
									closeOnClickModal: false,
									type: 'info',
									center: true
								}).then(() => {

									var getArea_params = {
										device: that.$store.getters.is_android ? "android" : "ios",
										time: Date.parse(new Date()) + "",
									};

									that.$axios({
											method: "post",
											url: "/Wap/api/getMemAddressList",
											data: QS.stringify(mdjm_fun(getArea_params))
										})
										.then(function(response) {
											// console.log(response.data);
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
												//												console.log(response.data.data);
												var addressData = response.data.data;
												for(var i = 0; i < addressData.length; i++) {
													addressData[i]['isCheck'] = false;
													if(addressData[i]['is_default'] == '2') {
														addressData[i]['isCheck'] = true;
														that.mem_address_id = addressData[i]['id'];
													}
												}
												that.addressData = addressData;
											}
										})
										.catch(function(error) {
											// console.log(error);
										});
								}).catch(() => {

								});
							}
						})
						.catch(function(error) {
							// console.log(error);
						});
				}
			},
			addNewArea: function() {
				var that = this;
				//				console.log('添加新地址');
				var consignee = that.consignee;
				var tel = that.tel;
				var address = that.address;
				var areaObj = that.areaObj;
				var selectedOptions = that.selectedOptions;
				if(consignee == "" || tel == "" || address == "" || areaObj == "") {
					that.$confirm('请完整的填写您的新地址哦', '提示', {
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
				} else if(!utils.is_tel(tel)) {
					that.$confirm('请填写您的正确的手机号', '提示', {
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
				} else {
					var addNewArea_params = {
						device: that.$store.getters.is_android ? "android" : "ios",
						time: Date.parse(new Date()) + "",
						consignee: consignee,
						mobile: tel + "",
						province: areaObj[0] + '',
						city: areaObj[1] + '',
						district: areaObj[2] + '',
						address: address,
					};

					function mdjm_fun(params) {
						var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
						params["access"] = access;
						return params;
					}

					that.$axios({
							method: "post",
							url: "/Wap/api/addMemAddress",
							data: QS.stringify(mdjm_fun(addNewArea_params))
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
								that.$confirm(response.data.msg, '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									showCancelButton: false,
									showClose: false,
									closeOnClickModal: false,
									type: 'info',
									center: true
								}).then(() => {

									var getArea_params = {
										device: that.$store.getters.is_android ? "android" : "ios",
										time: Date.parse(new Date()) + "",
									};

									that.$axios({
											method: "post",
											url: "/Wap/api/getMemAddressList",
											data: QS.stringify(mdjm_fun(getArea_params))
										})
										.then(function(response) {
											// console.log(response.data);
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
												//												console.log(response.data.data);
												var addressData = response.data.data;
												for(var i = 0; i < addressData.length; i++) {
													addressData[i]['isCheck'] = false;
													if(addressData[i]['is_default'] == '2') {
														addressData[i]['isCheck'] = true;
														that.mem_address_id = addressData[i]['id'];
													}
												}
												that.addressData = addressData;
											}
										})
										.catch(function(error) {
											// console.log(error);
										});
								}).catch(() => {

								});
							}
						})
						.catch(function(error) {
							// console.log(error);
						});
				}
			},
			handleChange(value) {
				var that = this;
				var areaObj = {};
				var options = that.options;
				for(let i = 0; i < options.length; i++) {
					if(value[0] == options[i].value) {
						areaObj.proviceName = options[i].label;
						var proviceChildren = options[i].children;
						for(let j = 0; j < proviceChildren.length; j++) {
							if(value[1] == proviceChildren[j].value) {
								areaObj.cityName = proviceChildren[j].label;
								var cityChildren = proviceChildren[j].children;
								for(let k = 0; k < cityChildren.length; k++) {
									if(value[2] == cityChildren[k].value) {
										areaObj.areaName = cityChildren[k].label;
									}
								}
							}
						}
					}
				}
				//				console.log(areaObj);
				//				console.log(value);
				that.areaObj = value;
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
					if(document.getElementById("checkPage").scrollTop > 0) {
						document.getElementById("checkPage").scrollTop -=
							_that.$store.getters.backTopNum;
						document.body.scrollTop = document.documentElement.scrollTop = document.getElementById(
							"checkPage"
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
				let scrollObj = document.getElementById("checkPage"); // 滚动区域
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
	#checkPage {
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
			.area_box {
				width: 100%;
				padding: 0.3rem 0.4rem 0.3rem 0.95rem;
				.area_item_box {
					width: 100%;
					height: auto;
					margin: 0.3rem 0;
					img {
						width: 0.4rem;
						height: auto;
						margin-right: 0.5rem;
					}
					.address_box span {
						font-size: 0.28rem;
						color: #333333;
						line-height: 0.45rem;
					}
				}
			}
			.getDefaultArea {
				width: 100%;
				padding: 0.2rem 0.55rem;
				text-align: left;
				font-size: 0.3rem;
				color: #ff8a00;
			}
			.setDefaultArea {
				width: 100%;
				padding: 0.2rem 0.4rem 0.2rem 0.55rem;
				font-size: 0.3rem;
				span {
					color: #ff8a00;
				}
			}
			.areaBox {
				width: 100%;
				padding: 0 0.55rem;
				height: 0.8rem;
				border-bottom: solid 2px #f5f5f5;
				font-size: 0.3rem;
				input {
					width: 4.5rem;
					height: 100%;
					font-size: 0.3rem;
					color: #333333;
					margin-left: 0.15rem;
					border: none;
					outline: none;
				}
			}
			.needIntegralBox,
			.leftIntegralBox {
				width: 100%;
				height: 0.5rem;
				padding: 0 0.4rem 0 0;
				font-size: 0.3rem;
				color: #333333;
				margin-top: 0.2rem;
				span {
					font-size: 0.3rem;
					color: #ffa800;
					margin-left: 0.2rem;
				}
			}
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
					width: 1rem;
					height: 0.45rem;
					font-size: 0.3rem;
					color: #333333;
					text-align: center;
					line-height: 0.45rem;
					bottom: 0.25rem;
					right: 0.4rem;
				}
			}
		}
	}
</style>