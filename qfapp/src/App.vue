<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import utils from "./config/common.js";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  beforeCreate: function() {
    //这里是判断是否是安卓手机和是否是微信内置浏览器
    var is_weixin = utils.is_weixin();
    var is_iosAndroid = utils.is_iosAndroid();
    // console.log(
    //   "是否是微信内置浏览器===" + is_weixin,
    //   "是否是安卓手机===" + is_iosAndroid
    // );
    this.$store.dispatch("is_weixin", is_weixin);
    this.$store.dispatch("is_android", is_iosAndroid);
  },
  created: function() {},
  beforeMount: function() {},
  mounted: function() {},
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    setDate() {
      this.$picker.show({
        type: "datePicker",
        onOk: date => {
          this.date = date;
        }
      });
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  computed: {}
};
</script>

<style>
@import "./style/common";
/* @import "./style/Mdate.css"; */
@import "css/mui.css";
@import "css/common.css";
@import "css/image-clip.css";
@import "css/clip.css";
</style>
