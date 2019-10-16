<template>
	<transition>
		<footer id="footer">
			<!-- <transition name="down_box">
        <div id="downBox"></div>
      </transition>-->
			<transition name="bot_top" :duration="{ enter: 300, leave: 300 }">
				<div v-show="scroll_Obj.scrollTop > 100 || scroll_Obj.scrollHeight - scroll_Obj.clientHeight < 100 || scroll_Obj.scrollHeight - scroll_Obj.clientHeight == 0 " class="navBox flex flexBet">
					<router-link class="navItem flex flexAroColCen" tag="div" v-for="(item,index) in foot_NavData" :key="index" :class="item.className" v-on:click.native="select(item.href)" :to="item.href">
						<img :src="item.src" alt class="defaultImg">
						<img :src="item.srcSelect" alt class="selectImg">
						<span class="navTit">{{item.tit}}</span>
					</router-link>
				</div>
			</transition>
		</footer>
	</transition>
</template>

<script>
	export default {
		name: "footNavComponent",
		data() {
			return {};
		},
		beforeCreate: function() {},
		created: function() {},
		beforeMount: function() {},
		mounted: function() {},
		beforeUpdate: function() {},
		updated: function() {},
		beforeDestroy: function() {},
		destroyed: function() {},
		methods: {
			select(page) {
				//   console.log(page);
				this.$store.dispatch("navActive", page);
			}
		},
		computed: {
			scroll_Obj() {
				return this.$store.getters.scroll_Obj;
			},
			foot_NavData() {
				var is_android = this.$store.getters.is_android;
				var footNavData = this.$store.getters.footNavData;
				//   console.log("是否是安卓手机====" + is_android);
				var foot_NavData = footNavData;
				return foot_NavData;
				//    if (is_android) {
				//      //是安卓手机显示全部的数据
				//      var foot_NavData = footNavData;
				//      // console.log(foot_NavData);
				//      return foot_NavData;
				//    } else {
				//      //不是安卓手机是苹果手机不显示个人
				//      var foot_NavData = footNavData.slice(0, footNavData.length - 1);
				//      // console.log(foot_NavData);
				//      return foot_NavData;
				//    }
			}
		}
	};
</script>
<style scoped lang="less">
	#footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 1000;
		#downBox {
			width: 1rem;
			height: 1rem;
			background: #1296db;
		}
		.navBox {
			height: 1rem;
			width: 100%;
			background: #fff;
			border-top: 0.01rem solid #dedede;
			padding: 0 0.5rem;
			img {
				width: 0.5rem;
				height: auto;
			}
			.defaultImg {
				display: block;
			}
			.selectImg {
				display: none;
			}
			span {
				font-size: 0.2rem;
				color: #333;
			}
		}
		.active .defaultImg {
			display: none;
		}
		.active .selectImg {
			display: block;
		}
		.active span {
			color: #1296db;
		}
		.bot_top-enter-active {
			transition: all 0.3s linear;
		}
		.bot_top-leave-active {
			transition: all 0.3s linear;
		}
		.bot_top-enter,
		.bot_top-leave-to {
			transform: translateY(1rem);
		}
		.down_box-enter-active {
			transition: all 0.2s linear;
		}
		.down_box-leave-active {
			transition: all 0.2s linear;
		}
		.down_box-enter,
		.down_box-leave-to {
			opacity: 1;
		}
	}
</style>