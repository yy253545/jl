<template>
	<div id="integralShopPage">
		<div class="headBox posFix">
			<div class="wh">
				<img :src="backImg" class="backImg posAbs mid" @click="back" />
				<span class="posAbs cenMid">积分商城</span>
			</div>
		</div>
		<maskMd v-show="show_mask" @clickMask="clickMask"></maskMd>
		<getGiftCopy v-show="show_getGiftCopy" :giftCode="giftCode" @clickMask="clickMask"></getGiftCopy>
		<div class="orderDetailBox posFix cenMid" v-show="show_orderDetail" :style="{backgroundImage:'url('+require('../../imgs/loginBg_img.png')+')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: '100% 100%'}">
			<div class="top_box flex flexEnd">
				<span style="width:100%;text-align: center;font-weight: 600;font-size: 0.34rem;">订单详情</span>
				<closeMd @clickMask="clickMask"></closeMd>
			</div>
			<span class="orderID orderDescSp">订单编号: {{orderItemData.order_id}}</span>
			<span class="orderID orderDescSp">礼品: {{orderItemData.goodsname}}</span>
			<span class="orderID orderDescSp">订单时间: {{orderItemData.create_time}}</span>
			<span v-if="orderItemData.shipping_code" class="orderID orderDescSp">物流单号: {{orderItemData.shipping_code}}</span>
			<span v-else class="orderID orderDescSp">物流单号: 暂无</span>
			<span v-if="orderItemData.shipping_name" class="orderID orderDescSp">快递公司: {{orderItemData.shipping_name}}</span>
			<span v-else class="orderID orderDescSp">快递公司: 暂无</span>
			<span class="orderID">收货人: {{orderItemData.consignee}}</span>
			<span class="orderID">手机号: {{orderItemData.mobile}}</span>
			<span class="orderID">所在地: {{orderItemData.province}}{{orderItemData.city}}{{orderItemData.district}}</span>
			<span class="orderID">详细地址: {{orderItemData.address}}</span>
			<span class="changeBtnFun" @click="sureOrderBtnFun">确定</span>
		</div>
		<div class="addNewAddressBox posFix cenMid" v-show="show_addNewAddress" :style="{backgroundImage:'url('+require('../../imgs/loginBg_img.png')+')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: '100% 100%'}">
			<div class="top_box flex flexEnd">
				<span style="width:100%;text-align: center;font-weight: 600;font-size: 0.34rem;">添加地址</span>
				<closeMd @clickMask="clickMask"></closeMd>
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
			<span class="changeBtnFun" @click="addNewAddressBtnFun">确定</span>
		</div>
		<div class="myAddressBox posFix cenMid" v-show="show_myAddress">
			<div class="top_box flex flexEnd">
				<span style="width:100%;text-align: center;font-weight: 600;font-size: 0.34rem;">我的地址</span>
				<closeMd @clickMask="clickMask"></closeMd>
			</div>
			<div v-for="(item,index) in addressData" :key="index" class="area_item_box">
				<div class="flex flexBet">
					<span>收货人:{{item.consignee}}</span>
					<span v-show="item.is_default == '2'" style="color: #ff8a00;">您的默认地址</span>
				</div>
				<span>手机号:{{item.mobile}}</span>
				<span>所在地:{{item.province}}{{item.city}}{{item.district}}</span>
				<span>详细地址:{{item.address}}</span>
				<div class="setAreaBox flex flexBet">
					<span class="deleteArea" @click="deleteAreaFun(item)">删除</span>
					<span v-show="item.is_default != '2'" class="setDefaultArea" @click="setDefaultArea(item)">设为默认地址</span>
				</div>
			</div>
			<div class="addNewAddress" @click="addNewAddress">
				添加新地址
			</div>
		</div>
		<div class="changeBox posFix cenMid" v-show="show_changeBox" :style="{backgroundImage:'url('+require('../../imgs/loginBg_img.png')+')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: '100% 100%'}">
			<div class="top_box flex flexEnd">
				<span style="width:100%;text-align: center;font-weight: 600;font-size: 0.34rem;">{{changeDataObj.game_name}}</span>
				<closeMd @clickMask="clickMask"></closeMd>
			</div>
			<div class="mid_box posRel">
				<img :src="changeDataObj.icon" class="iconImg mid posAbs" />
				<div class="mid_top_box posAbs flex flexBet">
					<div class="">
						礼品: {{changeDataObj.title}}
					</div>
					<div class="" v-if="changeDataObj.condition == '0'">
						可兑换次数: 无限
					</div>
					<div class="" v-else>
						可兑换次数: {{parseInt(score/changeDataObj.condition)}}
					</div>
				</div>
				<div class="mid_mid_box posAbs mid flex flexSta">
					<div class="">
						所需积分: {{parseFloat(changeDataObj.condition)}}
					</div>
				</div>
				<div class="mid_bot_box posAbs flex flexSta">
					<div class="">
						有效期: {{changeDataObj.endTime}}
					</div>
				</div>
			</div>
			<div class="bot_box">
				{{changeDataObj.content}}
			</div>
			<span class="changeBtnFun" @click="sureChangeBtnFun(changeDataObj.id)">确认兑换</span>
		</div>
		<!--<div class="gwcBox posFix">
			<div class="posRel wh">
				<img :src="gwcIcon" class="gwcIcon posAbs cenMid wh" />
				<span class="gwcNum posAbs" :style="{backgroundImage:'url('+require('../../imgs/gwcBgIcon.png')+')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: '100% 100%'}">{{gwcNum}}</span>
			</div>
		</div>-->

		<div class="tabBox" style="margin-bottom: 1rem;">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="礼品兑换" name="0">
					<div v-if="!userName" class="noLoginBox flex flexSta">
						查询剩余积分并进行兑换操作，请先<span @click="intoMinePage">登录</span>！
					</div>
					<div v-else class="hasLoginBox flex flexBet">
						<div class="leftBox flex flexSta">
							您的剩余积分为:
							<span>{{score}}</span>
						</div>
						<div class="rightBox flex flexEnd" @click="intoDutyCenter">
							去做任务>
						</div>
					</div>
					<div class="integralShopBox">
						<div class="topBox flex flexCen">
							<img :src="lbIcon" />
							<span>礼品兑换</span>
						</div>
						<div class="integral_box flex flexBet">
							<img class="left_icon" :src="left_icon" @click="prevPageFun" />
							<div class="integral_box_content clear">
								<div v-for="(item,index) in getGiftPageListData" :key="index" class="integral_box_item flex">
									<img :src="item.icon" class="icon" />
									<div class="name_sp elips">{{item.game_name}}{{item.title}}</div>
									<div class="need_integral flex flexCen">
										<img :src="integralIcon" /> 积分: {{parseFloat(item.condition)}}
									</div>
									<span class="changeBtn" @click="changeBtnFun(item.id,index)">立即兑换</span>
								</div>
							</div>
							<img class="right_icon" :src="right_icon" @click="nextPageFun" />
						</div>
					</div>

					<div class="integralShopBox serviceTqBox">
						<div class="topBox flex flexCen">
							<img :src="tqIcon" />
							<span>人气周边</span>
						</div>
						<div class="integral_box flex flexBet" style="height: 3.5rem;">
							<img class="left_icon" :src="left_icon" @click="prevPageFun2" />
							<div class="integral_box_content clear">
								<div v-for="(item,index) in getGoodsPageListData" :key="index" class="integral_box_item flex" style="height: 100%;">
									<img @click="intoGoodsDetail(item.id)" :src="item.original_img" class="icon" />
									<div @click="intoGoodsDetail(item.id)" class="name_sp elips">{{item.name}}</div>
									<div @click="intoGoodsDetail(item.id)" class="need_integral flex flexCen">
										<img :src="integralIcon" />积分:{{parseFloat(item.integral)}}
									</div>
									<span @click="intoCheckPage(item.id)" class="gwcBtn">兑换</span>
								</div>

							</div>
							<img class="right_icon" :src="right_icon" @click="nextPageFun2" />
						</div>
					</div>
					<div class="backMinePage posFix">
						<span @click="backMinePage">
							返回个人中心
						</span>
					</div>
				</el-tab-pane>
				<el-tab-pane label="我的订单" name="1">
					<!--<div v-if="!userName" class="noLoginBox flex flexSta">
						查询剩余积分并进行兑换操作，请先<span @click="intoMinePage">登录</span>！
					</div>
					<div v-else class="hasLoginBox flex flexBet">
						<div class="leftBox flex flexSta">
							您的剩余积分为:
							<span>{{score}}</span>
						</div>
						<div class="rightBox flex flexEnd" @click="intoDutyCenter">
							去做任务>
						</div>
					</div>-->
					<div v-for="(item,index) in orderData" :key="index" class="order_item_box posRel">
						<img v-lazy="item.goodsimg" class="icon posAbs mid" />
						<span class="orderID posAbs elips">订单编号: {{item.order_id}}</span>
						<span class="orderDesc posAbs mid">礼品: {{item.goodsname}}</span>
						<span class="orderTime posAbs">订单时间: {{item.create_time}}</span>
						<div class="see_detail posAbs mid flex flexEnd" @click="orderDetailFun(index)">
							查看详情
							<img :src="see_detail_icon" />
						</div>
					</div>
					<div class="controlAddress" @click="myAddressFun">
						管理我的收货地址
					</div>
					<div class="backMinePage posFix">
						<span @click="backMinePage">
							返回个人中心
						</span>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import {
		provinceAndCityData,
		regionData,
		provinceAndCityDataPlus,
		regionDataPlus,
		CodeToText,
		TextToCode
	} from 'element-china-area-data'
	import areaJs from '../../../static/js/areaJson.js';
	import getGiftCopy from "../../components/getGiftCopy";
	import maskMd from '../../components/maskMd';
	import closeMd from "../../components/closeMd";
	import utils from "../../config/common.js";
	import axios from "axios";
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
	import vueResource from "vue-resource";
	import Vue from "vue";
	Vue.use(vueResource);

	export default {
		inject: ["reload"],
		name: "integralShopPage",
		components: {
			maskMd,
			closeMd,
			getGiftCopy
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
				lbIcon: require("../../imgs/lbIcon.png"),
				tqIcon: require("../../imgs/tqIcon.png"),
				left_icon: require("../../imgs/left_icon.png"),
				right_icon: require("../../imgs/right_icon.png"),
				integralIcon: require("../../imgs/integralIcon.png"),
				gwcIcon: require("../../imgs/gwcIcon.png"),
				see_detail_icon: require("../../imgs/see_more_detail.png"),
				activeName: "0",
				score: "",
				userName: "",
				gwcNum: "99",
				show_mask: false,
				show_changeBox: false,
				show_orderDetail: false,
				show_myAddress: false,
				show_addNewAddress: false,
				getGiftPageListData: [],
				getGiftPageListPage: 1,
				getGoodsPageListData: [],
				getGoodsPageListPage: 1,
				changeDataObj: "",
				show_getGiftCopy: false,
				giftCode: "",
				orderData: [],
				orderItemData: "",
				addressData: [],
			};
		},
		beforeCreate: function() {},
		created: function() {

		},

		beforeMount: function() {},
		mounted: function() {
			var that = this;
			document
				.getElementById("integralShopPage")
				.addEventListener("scroll", that.handleScroll, true); // 监听（绑定）滚轮滚动事件

			var getGiftPageListParams = {
				device: that.$store.getters.is_android ? "android" : "ios",
				time: Date.parse(new Date()) + "",
				p: that.getGiftPageListPage + "",
			};

			var checkUserLogin_params = {
				device: that.$store.getters.is_android ? "android" : "ios",
				time: Date.parse(new Date()) + ""
			};

			var getGoodsPageListParams = {
				device: that.$store.getters.is_android ? "android" : "ios",
				time: Date.parse(new Date()) + "",
				p: that.getGoodsPageListPage + "",
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
					if (response.data.status == 0) {
						//请求不成功
						window.localStorage.setItem("isLoginShow", true);
						window.localStorage.setItem("username", "");
						window.localStorage.setItem("mobile", "");
						window.localStorage.setItem("email", "");
						window.localStorage.setItem("portrait", "");
					} else if (response.data.status == 1) {
						//请求成功
						that.score = response.data.data.score;
						that.userName = response.data.data.username
					}
				})
				.catch(function(error) {
					//   console.log(error);
				});

			that
				.$axios({
					method: "post",
					url: "/Wap/api/getGiftPageList",
					data: QS.stringify(mdjm_fun(getGiftPageListParams))
				})
				.then(function(response) {
					//                      console.log(response.data.data);
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
							that.$router.push({
								name: "mine"
							})
						}).catch(() => {

						});
					} else if (response.data.status == 1) {
						//请求成功
						//						console.log(response.data.data);
						that.getGiftPageListData = response.data.data;
					}
				})
				.catch(function(error) {
					//   console.log(error);
				});

			that
				.$axios({
					method: "post",
					url: "/Wap/api/getGoodsPageList",
					data: QS.stringify(mdjm_fun(getGoodsPageListParams))
				})
				.then(function(response) {
					//                      console.log(response.data.data);
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
							that.$router.push({
								name: "mine"
							})
						}).catch(() => {

						});
					} else if (response.data.status == 1) {
						//请求成功
						//						console.log(response.data.data);
						that.getGoodsPageListData = response.data.data;
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
			handleChange(value) {
				var that = this;
				var areaObj = {};
				var options = that.options;
				for (let i = 0; i < options.length; i++) {
					if (value[0] == options[i].value) {
						areaObj.proviceName = options[i].label;
						var proviceChildren = options[i].children;
						for (let j = 0; j < proviceChildren.length; j++) {
							if (value[1] == proviceChildren[j].value) {
								areaObj.cityName = proviceChildren[j].label;
								var cityChildren = proviceChildren[j].children;
								for (let k = 0; k < cityChildren.length; k++) {
									if (value[2] == cityChildren[k].value) {
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
			addNewAddressBtnFun: function() {
				var that = this;
				var consignee = that.consignee;
				var tel = that.tel;
				var address = that.address;
				var areaObj = that.areaObj;
				var selectedOptions = that.selectedOptions;
				if (consignee == "" || tel == "" || address == "" || areaObj == "") {
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
				} else if (!utils.is_tel(tel)) {
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
							if (response.data.status == 0) {
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
							} else if (response.data.status == 1) {
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
									that.show_myAddress = true;
									that.show_addNewAddress = false;

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
											} else if (response.data.status == 1) {
												//请求成功
												//												console.log(response.data.data);
												var addressData = response.data.data;
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
			deleteAreaFun: function(item) {
				var that = this;
				console.log(item);
				var deleteArea_params = {
					device: that.$store.getters.is_android ? "android" : "ios",
					time: Date.parse(new Date()) + "",
					id: item.id + ""
				};

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
					params["access"] = access;
					return params;
				};
				that.$axios({
						method: "post",
						url: "/Wap/api/deleteMemAddress",
						data: QS.stringify(mdjm_fun(deleteArea_params))
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
						} else if (response.data.status == 1) {
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
										} else if (response.data.status == 1) {
											//请求成功
											//												console.log(response.data.data);
											var addressData = response.data.data;
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

			},
			setDefaultArea: function(item) {
				var that = this;
				console.log(item);
				var addNewArea_params = {
					device: that.$store.getters.is_android ? "android" : "ios",
					time: Date.parse(new Date()) + "",
					id: item.id + "",
				};

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
					params["access"] = access;
					return params;
				}

				that.$axios({
						method: "post",
						url: "/Wap/api/setMemAddressDefault",
						data: QS.stringify(mdjm_fun(addNewArea_params))
					})
					.then(function(response) {

						// console.log(response.data);
						if (response.data.status == 0) {
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
						} else if (response.data.status == 1) {
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
										} else if (response.data.status == 1) {
											//请求成功
											//												console.log(response.data.data);
											var addressData = response.data.data;
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
			},
			addNewAddress: function() {
				var that = this;
				that.show_addNewAddress = true;
				that.show_myAddress = false;
				that.show_mask = true;
			},
			myAddressFun: function() {
				var that = this;
				that.show_myAddress = true;
				that.show_mask = true;
				var getArea_params = {
					device: that.$store.getters.is_android ? "android" : "ios",
					time: Date.parse(new Date()) + "",
				};

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
					params["access"] = access;
					return params;
				};
				that.$axios({
						method: "post",
						url: "/Wap/api/getMemAddressList",
						data: QS.stringify(mdjm_fun(getArea_params))
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
								that.$router.push({
									name: "mine"
								})
							}).catch(() => {

							});
						} else if (response.data.status == 1) {
							//请求成功
							//												console.log(response.data.data);
							var addressData = response.data.data;
							that.addressData = addressData;
						}
					})
					.catch(function(error) {
						// console.log(error);
					});
			},
			sureOrderBtnFun: function() {
				var that = this;
				that.show_changeBox = false;
				that.show_mask = false;
				that.show_getGiftCopy = false;
				that.show_orderDetail = false;
				that.show_myAddress = false;
				that.show_addNewAddress = false;
			},
			orderDetailFun: function(index) {
				var that = this;
				console.log(index);
				console.log('查看订单详情');
				var orderData = that.orderData;
				that.orderItemData = orderData[index];
				that.show_orderDetail = true;
				that.show_mask = true;
			},
			sureChangeBtnFun: function(id) {
				var that = this;
				var id = id;

				var sureChangeGiftParams = {
					device: that.$store.getters.is_android ? "android" : "ios",
					time: Date.parse(new Date()) + "",
					gift_id: id + "",
				};

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
					params["access"] = access;
					return params;
				}
				that
					.$axios({
						method: "post",
						url: "/Wap/api/getGiftCode",
						data: QS.stringify(mdjm_fun(sureChangeGiftParams))
					})
					.then(function(response) {
						//                      console.log(response.data.data);
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
								that.show_changeBox = false;
								that.show_mask = false;
								that.show_orderDetail = false;
								that.show_addNewAddress = false;
							}).catch(() => {

							});
						} else if (response.data.status == 1) {
							//请求成功
							//							console.log(response.data.data);
							that.show_getGiftCopy = true;
							that.show_mask = true;
							that.show_changeBox = false;
							that.show_orderDetail = false;
							that.show_myAddress = false;
							that.show_addNewAddress = false;
							that.giftCode = response.data.data;

							var checkUserLogin_params = {
								device: that.$store.getters.is_android ? "android" : "ios",
								time: Date.parse(new Date()) + ""
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
									console.log(response.data);
									if (response.data.status == 0) {
										//请求不成功
										window.localStorage.setItem("isLoginShow", true);
										window.localStorage.setItem("username", "");
										window.localStorage.setItem("mobile", "");
										window.localStorage.setItem("email", "");
										window.localStorage.setItem("portrait", "");
									} else if (response.data.status == 1) {
										//请求成功
										that.score = response.data.data.score;
										that.userName = response.data.data.username
									}
								})
								.catch(function(error) {
									//   console.log(error);
								});
						}
					})
					.catch(function(error) {
						//   console.log(error);
					});
			},
			intoCheckPage: function(id) {
				var that = this;
				//				console.log(id);
				var userName = window.localStorage.getItem('username');
				if (userName) {
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
			intoGoodsDetail: function(id) {
				var that = this;
				//				console.log(id);
				that.$router.push({
					name: "goodsDetail",
					params: {
						id: id
					}
				});
				window.localStorage.setItem("goodsdetail_id", id);
			},
			nextPageFun: function() {
				var that = this;
				//				console.log('点击下一页数据');
				that.getGiftPageListPage = that.getGiftPageListPage + 1;
				var getGiftPageListParams = {
					device: that.$store.getters.is_android ? "android" : "ios",
					time: Date.parse(new Date()) + "",
					p: that.getGiftPageListPage + "",
				};

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
					params["access"] = access;
					return params;
				}
				that
					.$axios({
						method: "post",
						url: "/Wap/api/getGiftPageList",
						data: QS.stringify(mdjm_fun(getGiftPageListParams))
					})
					.then(function(response) {
						//                      console.log(response.data.data);
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
								that.$router.push({
									name: "mine"
								})
							}).catch(() => {

							});
						} else if (response.data.status == 1) {
							//请求成功
							//							console.log(response.data.data);
							if (response.data.data.length == 0) { //没有新的数据了;
								that.getGiftPageListPage = that.getGiftPageListPage - 1;
								that.$confirm('已经是最后一页了!', '提示', {
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
								that.getGiftPageListData = response.data.data;
							}
						}
					})
					.catch(function(error) {
						//   console.log(error);
					});
			},
			nextPageFun2: function() {
				var that = this;
				//				console.log('点击下一页数据');
				that.getGoodsPageListPage = that.getGoodsPageListPage + 1;
				var getGoodsPageListParams = {
					device: that.$store.getters.is_android ? "android" : "ios",
					time: Date.parse(new Date()) + "",
					p: that.getGoodsPageListPage + "",
				};

				function mdjm_fun(params) {
					var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
					params["access"] = access;
					return params;
				}
				that
					.$axios({
						method: "post",
						url: "/Wap/api/getGoodsPageList",
						data: QS.stringify(mdjm_fun(getGoodsPageListParams))
					})
					.then(function(response) {
						//                      console.log(response.data.data);
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
								that.$router.push({
									name: "mine"
								})
							}).catch(() => {

							});
						} else if (response.data.status == 1) {
							//请求成功
							//							console.log(response.data.data);
							if (response.data.data.length == 0) { //没有新的数据了;
								that.getGoodsPageListPage = that.getGoodsPageListPage - 1;
								that.$confirm('已经是最后一页了!', '提示', {
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
								that.getGoodsPageListData = response.data.data;
							}
						}
					})
					.catch(function(error) {
						//   console.log(error);
					});
			},
			prevPageFun: function() {
				var that = this;
				//				console.log('点击上一页数据');
				that.getGiftPageListPage = that.getGiftPageListPage - 1;
				if (that.getGiftPageListPage < 1) {
					that.getGiftPageListPage = 1;
					that.$confirm('已经是第一页了', '提示', {
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
					var getGiftPageListParams = {
						device: that.$store.getters.is_android ? "android" : "ios",
						time: Date.parse(new Date()) + "",
						p: that.getGiftPageListPage + "",
					};

					function mdjm_fun(params) {
						var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
						params["access"] = access;
						return params;
					}
					that
						.$axios({
							method: "post",
							url: "/Wap/api/getGiftPageList",
							data: QS.stringify(mdjm_fun(getGiftPageListParams))
						})
						.then(function(response) {
							//                      console.log(response.data.data);
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
									that.$router.push({
										name: "mine"
									})
								}).catch(() => {

								});
							} else if (response.data.status == 1) {
								//请求成功
								//								console.log(response.data.data);
								that.getGiftPageListData = response.data.data;
							}
						})
						.catch(function(error) {
							//   console.log(error);
						});
				}
			},
			prevPageFun2: function() {
				var that = this;
				//				console.log('点击上一页数据');
				that.getGoodsPageListPage = that.getGoodsPageListPage - 1;
				if (that.getGoodsPageListPage < 1) {
					that.getGoodsPageListPage = 1;
					that.$confirm('已经是第一页了', '提示', {
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
					var getGoodsPageListParams = {
						device: that.$store.getters.is_android ? "android" : "ios",
						time: Date.parse(new Date()) + "",
						p: that.getGoodsPageListPage + "",
					};

					function mdjm_fun(params) {
						var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
						params["access"] = access;
						return params;
					}
					that
						.$axios({
							method: "post",
							url: "/Wap/api/getGoodsPageList",
							data: QS.stringify(mdjm_fun(getGoodsPageListParams))
						})
						.then(function(response) {
							//                      console.log(response.data.data);
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
									that.$router.push({
										name: "mine"
									})
								}).catch(() => {

								});
							} else if (response.data.status == 1) {
								//请求成功
								//								console.log(response.data.data);
								that.getGoodsPageListData = response.data.data;
							}
						})
						.catch(function(error) {
							//   console.log(error);
						});
				}
			},
			clickMask: function() {
				var that = this;
				that.show_changeBox = false;
				that.show_mask = false;
				that.show_getGiftCopy = false;
				that.show_orderDetail = false;
				that.show_myAddress = false;
				that.show_addNewAddress = false;
			},
			changeBtnFun: function(id, index) {
				var that = this;

				function timestampToTime(timestamp) {
					var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
					var Y = date.getFullYear() + '-';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					var D = date.getDate() + ' ';
					var h = date.getHours() + ':';
					var m = date.getMinutes() + ':';
					var s = date.getSeconds();
					return Y + M + D + h + m + s;
				}
				that.show_mask = true;
				that.show_changeBox = true;
				var id = id;
				var index = index;
				var changeData = that.getGiftPageListData;
				var changeDataObj = changeData[index];
				var end_time = changeDataObj.end_time;
				var endTime = timestampToTime(end_time);
				//				var endTime = new Date(parseInt(end_time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
				//				console.log(endTime);
				changeDataObj['endTime'] = endTime;
				console.log(changeDataObj);
				that.changeDataObj = changeDataObj;
				console.log(that.changeDataObj);
			},
			intoDutyCenter: function() {
				var that = this;
				that.$confirm('确定去任务中心么？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showCancelButton: true,
					showClose: false,
					closeOnClickModal: false,
					type: 'warning',
					center: true
				}).then(() => {
					that.$router.push({
						name: "myDutyCenter"
					})
				}).catch(() => {

				});
			},
			intoMinePage: function() {
				var that = this;
				that.$confirm('确定去登录么？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showCancelButton: true,
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
			},
			back: function() {
				var that = this;
				that.$router.push({
					name: "mine"
				})
			},
			backMinePage: function() {
				var that = this;
				that.$router.push({
					name: "mine"
				})
			},
			handleClick(tab, event) {
				var that = this;
				//              console.log(typeof tab.index, event);
				switch (tab.index) {
					case '0':
						break;
					case '1':
						//						console.log('我的订单');
						var getIntegralOrderListParams = {
							device: that.$store.getters.is_android ? "android" : "ios",
							time: Date.parse(new Date()) + "",
						};

						function timestampToTime(timestamp) {
							var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
							var Y = date.getFullYear() + '-';
							var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
							var D = date.getDate() + ' ';
							var h = date.getHours() + ':';
							var m = date.getMinutes() + ':';
							var s = date.getSeconds();
							return Y + M + D + h + m + s;
						}

						function mdjm_fun(params) {
							var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
							params["access"] = access;
							return params;
						}
						that
							.$axios({
								method: "post",
								url: "/Wap/api/getIntegralOrderList",
								data: QS.stringify(mdjm_fun(getIntegralOrderListParams))
							})
							.then(function(response) {
								//                      console.log(response.data.data);
								if (response.data.status == 0) {
									//请求不成功
									that.$confirm('您还没有订单哦，要去兑换商品么?', '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										showCancelButton: true,
										showClose: false,
										closeOnClickModal: false,
										type: 'info',
										center: true
									}).then(() => {
										that.reload();
									}).catch(() => {

									});
								} else if (response.data.status == 1) {
									//请求成功
									console.log(response.data.data);
									var orderData = response.data.data;
									for (let i = 0; i < orderData.length; i++) {
										var creatTime = orderData[i]['create_time'];
										creatTime = timestampToTime(creatTime);
										//										creatTime = new Date(parseInt(creatTime) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
										orderData[i]['create_time'] = creatTime;
									};
									that.orderData = orderData;
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
	#integralShopPage {
		width: 100%;
		padding-top: 1rem;

		.addNewAddressBox {
			width: 90%;
			z-index: 1500;
			padding-top: 0.25rem;

			.top_box {
				width: 100%;
				height: 1rem;
			}

			.areaBox {
				width: 100%;
				padding: 0 0.4rem;
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

			.changeBtnFun {
				width: 2.55rem;
				height: 0.55rem;
				border-radius: 3px;
				background: #f39800;
				text-align: center;
				line-height: 0.55rem;
				color: #ffffff;
				font-size: 0.34rem;
				margin: 0.3rem auto;
			}
		}

		.myAddressBox {
			width: 90%;
			max-height: 80%;
			z-index: 1500;
			padding-top: 0.25rem;
			overflow: hidden;
			overflow-y: auto;
			background: #ffffff;

			.addNewAddress {
				width: 100%;
				text-align: right;
				font-size: 0.32rem;
				color: #ffbf00;
				padding: 0 0.4rem;
				height: 1rem;
				line-height: 1rem;
			}

			.top_box {
				width: 100%;
				height: 1rem;
			}

			.area_item_box {
				width: 100%;
				padding: .2rem 0.4rem;

				span {
					font-size: 0.3rem;
					color: #333333;
					line-height: 0.45rem;
				}

				div {
					width: 100%;
					height: 0.45rem;

					span {
						font-size: 0.3rem;
						color: #333333;
						line-height: 0.45rem;
					}
				}

				.setAreaBox {
					width: 100%;
					padding: 0.2rem 0rem;
					margin-top: 0.2rem;

					.setDefaultArea,
					.deleteArea {
						color: #ffffff;
						padding: 0rem 0.2rem;
						display: inline-block;
						background: #ffbf00;
						border-radius: 5px;
					}
				}
			}
		}

		.orderDetailBox {
			width: 90%;
			z-index: 1500;
			padding-top: 0.25rem;

			.top_box {
				width: 100%;
				height: 1rem;
			}

			.orderID {
				width: 100%;
				line-height: 0.45rem;
				font-size: 0.3rem;
				color: #333333;
				padding: 0 0.45rem;
			}

			.orderDescSp {
				color: #ff9b31;
			}

			.changeBtnFun {
				width: 2.55rem;
				height: 0.55rem;
				border-radius: 3px;
				background: #f39800;
				text-align: center;
				line-height: 0.55rem;
				color: #ffffff;
				font-size: 0.34rem;
				margin: 0.3rem auto;
			}
		}

		.changeBox {
			width: 90%;
			z-index: 1500;
			padding-top: 0.25rem;

			.top_box {
				width: 100%;
				height: 1rem;
			}

			.mid_box {
				width: 100%;
				height: 1.6rem;
				padding: 0 0.15rem;
				margin: 0.15rem 0;

				.iconImg {
					width: 1.2rem;
					height: 1.2rem;
				}

				.mid_top_box {
					width: 5rem;
					height: 0.45rem;
					right: 0.15rem;
					top: 0.15rem;
					font-size: 0.3rem;
					color: #333333;
				}

				.mid_bot_box {
					width: 5rem;
					height: 0.45rem;
					right: 0.15rem;
					bottom: 0.15rem;
					font-size: 0.3rem;
					color: #333333;
				}

				.mid_mid_box {
					width: 5rem;
					height: 0.45rem;
					right: 0.15rem;
					font-size: 0.3rem;
					color: #333333;
				}
			}

			.bot_box {
				width: 100%;
				padding: 0 0.45rem;
				line-height: 0.45rem;
				font-size: 0.3rem;
				color: #ffa800;
				text-align: center;
			}

			.changeBtnFun {
				width: 2.55rem;
				height: 0.55rem;
				border-radius: 3px;
				background: #f39800;
				text-align: center;
				line-height: 0.55rem;
				color: #ffffff;
				font-size: 0.34rem;
				margin: 0.3rem auto;
			}
		}

		.gwcBox {
			z-index: 1200;
			right: 0.25rem;
			bottom: 4rem;
			width: 1.2rem;
			height: 1.2rem;

			.gwcNum {
				width: 0.5rem;
				height: 0.5rem;
				text-align: center;
				line-height: 0.5rem;
				font-size: 0.24rem;
				color: #ff8e0f;
				right: 0;
				transform: translateX(30%);
			}
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

		.tabBox {
			.noLoginBox {
				width: 100%;
				height: 0.8rem;
				background: #ffffff;
				padding: 0 0.35rem;
				font-size: 0.3rem;
				color: #333333;

				span {
					font-size: 0.3rem;
					color: #ff8e0f;
				}
			}

			.hasLoginBox {
				width: 100%;
				height: 0.8rem;
				background: #ffffff;
				padding: 0 0.35rem;
				font-size: 0.3rem;
				color: #333333;

				.leftBox {
					span {
						color: #ff8e0f;
					}
				}

				.rightBox {
					color: #ff8e0f;
				}
			}

			.integralShopBox {
				width: 100%;
				background: #f5f5f5;
				padding: 0.3rem 0.15rem;
				border-bottom: 2px solid #ffffff;

				.topBox {
					width: 100%;
					height: 0.65rem;

					span {
						font-size: 0.32rem;
						font-weight: 600;
						color: #000000;
					}

					img {
						width: auto;
						height: 0.45rem;
						margin: 0 0.2rem;
					}
				}

				.integral_box {
					width: 100%;
					height: 7rem;

					.left_icon,
					.right_icon {
						width: 0.45rem;
						height: auto;
					}

					.integral_box_content {
						width: 6.28rem;
						height: 100%;

						.integral_box_item {
							float: left;
							width: 1.68rem;
							height: 50%;
							margin: 0 0.20666666rem;
							flex-direction: column;
							justify-content: space-around;
							align-items: center;

							.icon {
								width: 100%;
								height: 1.68rem;
							}

							.name_sp {
								width: 100%;
								font-size: 0.24rem;
								color: #333333;
								text-align: center;
							}

							.need_integral {
								width: 100%;
								font-size: 0.24rem;
								color: #ffa200;

								img {
									width: auto;
									height: 0.24rem;
									margin: 0 0.005rem;
								}
							}

							.changeBtn {
								width: 1.35rem;
								height: 0.4rem;
								border-radius: 30px;
								border: 1px solid #009cff;
								color: #009cff;
								font-size: 0.25rem;
								text-align: center;
								line-height: 0.4rem;
							}

							.gwcBtn {
								width: 1.7rem;
								height: 0.4rem;
								border-radius: 30px;
								border: 1px solid #009cff;
								color: #009cff;
								font-size: 0.25rem;
								text-align: center;
								line-height: 0.4rem;
							}
						}
					}
				}
			}

			.controlAddress {
				width: 100%;
				padding: 0 0.4rem;
				font-size: 0.34rem;
				color: #ffc73d;
				text-align: right;
				line-height: 1rem;
			}

			.order_item_box {
				width: 100%;
				height: 1.5rem;
				padding: 0 0.4rem;
				border-bottom: 2px solid #f5f5f5;

				.icon {
					width: 1.2rem;
					height: 1.2rem;
					left: 0.4rem;
				}

				.orderID {
					font-size: 0.28rem;
					color: #333333;
					top: 0.15rem;
					left: 1.7rem;
					width: 4rem;
				}

				.orderDesc {
					font-size: 0.28rem;
					color: #333333;
					left: 1.7rem;
				}

				.orderTime {
					font-size: 0.28rem;
					color: #333333;
					bottom: 0.15rem;
					left: 1.7rem;
				}

				.see_detail {
					font-size: 0.28rem;
					color: #333333;
					right: 0.2rem;

					img {
						width: 0.3rem;
						height: auto;
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
	}
</style>
