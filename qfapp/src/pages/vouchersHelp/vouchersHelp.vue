<template>
	<div id="vouchersHelpPage">
		<div class="headBox posFix">
			<div class="wh">
				<img :src="backImg" class="backImg posAbs mid" @click="back" />
				<span class="posAbs cenMid">代金券说明</span>
			</div>
		</div>
		<div class="vouchersHelpItem">
			<span class="titBox">1.什么是代金券？</span>
			<span class="desc">代金券是清风游戏发行和认可的购物券，可以在清风游戏付款时抵扣相应面值的金额</span>
		</div>
		<div class="vouchersHelpItem">
			<span class="titBox">2.如何获取代金券？</span>
			<span class="desc">完成清风游戏下任意一款游戏的游戏任务、抽奖活动就会发放代金券或在清风游戏礼包不定期推出代金券</span>
		</div>
		<div class="vouchersHelpItem">
			<span class="titBox">3.如何使用代金券？</span>
			<span class="desc">在手机端官网中付款时，都可以使用代金券，抵扣相应的金额</span>
		</div>
		<div class="vouchersHelpItem">
			<span class="titBox">4.抵用代金券找零兑现吗？</span>
			<span class="desc">代金券不找零、不兑现。付款时代金券会被优先使用，不足支付时选择其他方式付款</span>
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
		name: "vouchersHelpPage",
		components: {},
		data() {
			return {
				backImg: require("../../imgs/backImg1.png"),
			};
		},
		beforeCreate: function() {},
		created: function() {

		},

		beforeMount: function() {},
		mounted: function() {
			var that = this;
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
				that.$router.go(-1);
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
	#vouchersHelpPage {
		width: 100%;
		padding-top: 1rem;

		.vouchersHelpItem {
			width: 100%;
			padding: 0.1rem 0.35rem 0.2rem;
			border-bottom: 0.05rem solid #e3e3e3;

			.titBox {
				width: 100%;
				line-height: 0.6rem;
				color: #000000;
				font-size: 0.35rem;
			}

			.desc {
				width: 100%;
				line-height: 0.4rem;
				color: #000000;
				font-size: 0.3rem;
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
	}
</style>
