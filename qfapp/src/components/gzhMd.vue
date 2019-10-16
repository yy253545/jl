<template>
  <div id="gzhMd" class="posFix cenMid">
    <div class="wh posRel">
      <img :src="loginBgImg" alt class="loginBgImg posAbs wh">
      <span class="tit posAbs">关注我们</span>
      <img :src="ewmImg" alt class="ewmImg posAbs cen">
      <span class="gzh posAbs">微信公众号直接搜索"qfgame"</span>
      <span class="botSp posAbs">关注既有游戏礼包可领，更有不定期福利活动等您参与~</span>
      <closeMd @clickMask="clickMask"></closeMd>
    </div>
  </div>
</template>

<script>
import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
import utils from "../config/common.js";
import closeMd from "./closeMd";

export default {
  name: "gzhMd",
  components: { closeMd },
  data() {
    return {
      ewmImg: require("../imgs/ewm.jpg"),
      loginBgImg: require("../imgs/loginBg_img.png")
    };
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
    clickMask: function() {
      var that = this;
      that.$emit("clickMask");
    }
  },
  computed: {}
};
</script>
<style scoped lang="less">
#gzhMd {
  width: 6rem;
  height: 6.32rem;
  z-index: 1500;
  .tit {
    width: 100%;
    font-size: 0.35rem;
    line-height: 0.75rem;
    text-align: center;
    border-bottom: 0.02rem solid #e6e6e6;
    color: #ffbf00;
    font-weight: 600;
    top: 0.25rem;
  }
  .ewmImg {
    width: 3rem;
    height: 3rem;
    top: 1.3rem;
  }
  .gzh {
    font-size: 0.34rem;
    color: #000;
    width: 100%;
    text-align: center;
    top: 4.6rem;
  }
  .botSp {
    font-size: 0.3rem;
    color: orange;
    width: 100%;
    text-align: center;
    bottom: 0.3rem;
    padding: 0 0.25rem;
  }
}
</style>
