<template>
	<div id="serviceCenterPage">
		<div class="headBox posFix">
			<div class="wh">
				<img :src="backImg" class="backImg posAbs mid" @click="back" />
				<span class="posAbs cenMid">服务中心</span>
			</div>
		</div>

		<div class="serviceTypeBox posRel" v-for="(item,index) in serviceTypeData" :key="index" @click="intoPage(index)">
			<img :src="item.src" class="typeIcon posAbs mid" />
			<span class="typeTit posAbs">{{item.typeTit}}</span>
			<span class="typeDesc posAbs">{{item.typeDesc}}</span>
			<img :src="moreIconImg" class="moreIconImg posAbs mid" />
			<span class="posAbs tjSp" v-if="index == 0">
            	推荐
            </span>
			<img :src="tjIcon" class="tjIcon posAbs" v-if="index == 0" />
		</div>
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
		name: "serviceCenterPage",
		components: {

		},
		data() {
			return {
				show_mask: false,
				show_login: false,
				show_reg: false,
				show_findPassWord: false,
				isLoginShow: true,
				backImg: require("../../imgs/backImg1.png"),
				moreIconImg: require("../../imgs/moreIconImg.png"),
				tjIcon: require("../../imgs/tjIcon.png"),
				serviceTypeData: [{
					src: require("../../imgs/zzfuIcon.png"),
					typeTit: "自助服务",
					typeDesc: "自助提交您反映的问题，专业的客服团队将为你解决问题",
				}, {
					src: require("../../imgs/zxkfIcon.png"),
					typeTit: "在线客服",
					typeDesc: "了解常见问题解决办法，向专业客服发起1v1会话进行咨询"
				}, {
					src: require("../../imgs/kfrxIcon.png"),
					typeTit: "客服热线",
					typeDesc: "点击拨打客服热线进行咨询"
				}, {
					src: require("../../imgs/vipIcon.png"),
					typeTit: "VIP尊享特权",
					typeDesc: "成为明月VIP会员，畅享丰富专属特权"
				}, {
					src: require("../../imgs/vipCzIcon.png"),
					typeTit: "明月VIP成长体系",
					typeDesc: "了解详细成长规则，无忧升级更省心"
				}]

			};
		},
		beforeCreate: function() {},
		created: function() {

		},

		beforeMount: function() {},
		mounted: function() {
			var that = this;

			document
				.getElementById("serviceCenterPage")
				.addEventListener("scroll", that.handleScroll, true); // 监听（绑定）滚轮滚动事件
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
			intoPage: function(index) { //自助服务方法
				var that = this;
				//              console.log(index);
				switch(index) {
					case 0:
						if(window.localStorage.getItem("username") == "") {
							//                  console.log("没有用户名，没有登录，要去mine页面");
							that.$confirm("未登录，要先去登录么?", '提示', {
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
						} else {
							that.$router.push({
								name: "selfService"
							})
						}
						break;
					case 2:
						window.location.href =
							"tel:400-027-8002";
						break;
					case 1:
						window.location.href =
							"https://cschat.antcloud.com.cn/index.htm?tntInstId=FRAEWACN&scene=SCE00018884";
						break;
					case 3: //vip尊享特权
						if(window.localStorage.getItem("username") == "") {
							//                  console.log("没有用户名，没有登录，要去mine页面");
							that.$confirm("未登录，要先去登录么?", '提示', {
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
						} else {
							that.$router.push({
								name: "vipService"
							})
						}
						break;
					case 4: //vip成长体系
						that.$router.push({
							name: "vipGrow"
						})
						break;
					default:
						break;
				}
			},
			back: function() {
				var that = this;
				that.$router.push({
					name: "mine"
				})
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
	#serviceCenterPage {
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
		.serviceTypeBox {
			width: 100%;
			height: 1.8rem;
			padding: 0 0.5rem;
			border-bottom: 3px solid #f5f5f5;
			background: #ffffff;
			.tjSp {
				font-size: 0.24rem;
				color: #333333;
				top: 0.2rem;
				right: 0.5rem;
			}
			.typeIcon {
				width: 1.4rem;
				height: 1.4rem;
				left: 0.5rem;
			}
			.typeTit {
				font-size: 0.3rem;
				color: #333333;
				top: 0.2rem;
				left: 2.2rem;
				font-weight: 600;
			}
			.typeDesc {
				font-size: 0.26rem;
				color: #333333;
				bottom: 0.2rem;
				left: 2.2rem;
				width: 4rem;
				text-align: center;
				line-height: 0.3rem;
			}
			.moreIconImg {
				width: 0.34rem;
				height: auto;
				right: 0.5rem;
			}
			.tjIcon {
				height: 0.3rem;
				width: auto;
				top: 0.26rem;
				right: 0.15rem;
			}
		}
	}
</style>