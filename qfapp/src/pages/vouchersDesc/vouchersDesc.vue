<template>
	<div id="vouchersDescPage">
		<div class="headBox posFix">
			<div class="wh">
				<img :src="backImg" class="backImg posAbs mid" @click="back" />
				<span class="posAbs cenMid">代金券详情</span>
				<img :src="helpImg" class="helpImg posAbs mid" @click="vouchersHelpPage" />
			</div>
		</div>
		<div class="vouchersBox posRel">
			<img class="defaultVouchersBgImg posAbs wh" :src="defaultVouchersBgImg" />
			<span class="vouchers_price posAbs">
				<em>{{vouchersData.money}}</em>
				元
			</span>
			<span class="vouchersNeedPrice posAbs">满{{vouchersData.min_money}}可用</span>
			<div class="vouchersTitBox posAbs flex flexSta">
				<i v-if="vouchersData.use_type == '1'" class="typeBox">全平台通用</i>
				<i v-else-if="vouchersData.use_type == '2'" class="typeBox">限定</i>
				<span v-if="vouchersData.use_type == '1'" class="vouchersTit">{{vouchersData.money}}元通用代金券</span>
				<span v-else-if="vouchersData.use_type == '2'" class="vouchersTit">{{vouchersData.money}}元限定代金券</span>
			</div>
			<span class="userArea posAbs mid">适用范围:{{vouchersData.use_detail}}</span>
			<span class="userTime posAbs">有效期:{{vouchersData.term_of_validity}}</span>
		</div>
		<span class="useRule">适用规则:</span>
		<span class="useRule">1.消费满指定限额才可使用</span>
		<span class="useRule">2.符合适用范围的游戏方可使用</span>
		<span class="useRule">3.在手机端官网付款时代金券会优先使用</span>
		<span v-if="vouchersData.use_type == '1'" class="useRule">适用的游戏:所有清风游戏</span>
		<span v-if="vouchersData.use_type == '2'" class="useRule">适用的游戏:</span>
		<div v-if="vouchersData.use_type == '2'" class="gameBox clear flex flexSta">
			<div v-for="(item,index) in vouchersData.gameArray" :key="index" class="game_item_box">
				<img :src="item.img" />
				<span>{{item.name}}</span>
			</div>
		</div>
		<span class="interpretation posFix">
			最终解释版权归清风游戏所有
		</span>
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
		name: "vouchersDescPage",
		components: {},
		data() {
			return {
				backImg: require("../../imgs/backImg1.png"),
				helpImg: require("../../imgs/helpImg.png"),
				defaultVouchersBgImg: require("../../imgs/defaultVouchersBgImg.png"),
				vouchersData: "",
			};
		},
		beforeCreate: function() {},
		created: function() {

		},

		beforeMount: function() {},
		mounted: function() {
			var that = this;
			var vouchersData = JSON.parse(window.localStorage.getItem('vouchersData'));
			that.vouchersData = vouchersData;
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
			back: function() {
				var that = this;
				that.$router.push({
					name: "MyVouchers"
				})
			},
			vouchersHelpPage: function() {
				var that = this;
				that.$router.push({
					name: "vouchersHelp"
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
	#vouchersDescPage {
		width: 100%;
		padding-top: 1rem;

		.interpretation {
			width: 100%;
			text-align: center;
			color: #333333;
			font-size: 0.3rem;
			line-height: 1rem;
			bottom: 0;
		}

		.useRule {
			width: 100%;
			padding: 0 0.35rem;
			font-size: 0.3rem;
			color: #333333;
			line-height: 0.4rem;
		}
		
		.gameBox{
			width: 100%;
			padding: 0 0.35rem;
			flex-wrap: wrap;
			.game_item_box{
				width: 1.4rem;
				margin-top: 0.25rem;
				margin-right: 0.25rem;
				img{
					width: 1.4rem;
					height: 1.4rem;
				}
				span{
					width: 100%;
					height: 0.4rem;
					overflow: hidden;
					text-align: center;
					font-size: 0.3rem;
					color: #333333;
					line-height: 0.4rem;
				}
			}
		}

		.vouchersBox {
			width: 100%;
			height: 2rem;
			margin-top: 0.15rem;

			.vouchersTitBox {
				top: 0.15rem;
				color: #000000;
				left: 2.4rem;

				.vouchersTit {
					color: #000000;
					font-size: 0.3rem;
					line-height: 0.4rem;
				}

				.typeBox {
					padding: 0rem 0.15rem;
					background: #ff8400;
					border-radius: 3px;
					color: #ffffff;
					font-size: 0.3rem;
					line-height: 0.4rem;
					margin-right: 0.15rem;
				}
			}

			.userArea {
				color: #000000;
				left: 2.4rem;
				font-size: 0.3rem;
				line-height: 0.35rem;
				width: 3.75rem;
			}

			.userTime {
				color: #000000;
				left: 2.4rem;
				bottom: 0.15rem;
				font-size: 0.3rem;
			}

			.vouchersNeedPrice {
				font-size: 0.3rem;
				color: #ffffff;
				bottom: 0.35rem;
				left: 0.45rem;
			}

			.vouchers_price {
				font-size: 0.3rem;
				color: #ffffff;
				top: 0.35rem;
				left: 0.45rem;
				line-height: 0.7rem;

				em {
					font-size: 0.7rem;
					color: #ffffff;
					display: inline-block;
				}
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

			.helpImg {
				width: 0.5rem;
				height: auto;
				right: 0.4rem;
			}

			span {
				font-size: 0.34rem;
				color: #333333;
			}
		}
	}
</style>
