<template>
	<div id="vipGrowPage">
		<div class="headBox posFix">
			<div class="wh">
				<img :src="backImg" class="backImg posAbs mid" @click="back" />
				<span class="posAbs cenMid">明月VIP成长体系</span>
			</div>
		</div>
		<div class="vipServiceBox">
			<img :src="vipGrowBgImg" />
		</div>
		<div class="backMinePage posFix">
			<span @click="backMinePage">
                    		返回个人中心
                    	</span>
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
		name: "vipGrowPage",
		components: {

		},
		data() {
			return {
				backImg: require("../../imgs/backImg1.png"),
				vipGrowBgImg: require("../../imgs/vipGrowBgImg.png"),
			};
		},
		beforeCreate: function() {},
		created: function() {

		},

		beforeMount: function() {},
		mounted: function() {
			var that = this;

			document
				.getElementById("vipGrowPage")
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
			backMinePage: function() {
				var that = this;
				that.$router.push({
					name: "mine"
				})
			},
			back: function() {
				var that = this;
				that.$router.push({
					name: "serviceCenter"
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
	#vipGrowPage {
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