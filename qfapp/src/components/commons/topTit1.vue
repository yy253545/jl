<template>
  <div id="topTit" class="flex flexBet">
    <div class="leftBox posRel">
      <span class="titspan">{{titspan}}</span>
      <img :src="url_back_img" alt class="bgImg posAbs bgImg">
    </div>
    <!-- <div class="rightBox flex flexEnd" @click="seeMoreNews">
      <span class="morespan">查看更多</span>
      <img :src="url_more_img" alt class="moreImg">
    </div> -->
  </div>
</template>

<script>
export default {
  name: "topTit1",
  props: {
    titspan: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      url_back_img: require("../../imgs/underlineImg.png"),
      url_more_img: require("../../imgs/more.png")
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
    // seeMoreNews: function(app_id) {
    //   //新闻页面点击查看更多进入查看更多新闻页面
    //   var that = this;
    // //   console.log(app_id);
    //   that.$router.push({ name: "moreNews", params: { app_id: app_id } });
    // }
  },
  computed: {}
};
</script>
<style scoped lang="less">
#topTit {
  width: 100%;
  height: 0.78rem;
  padding: 0 0.35rem;
  background: #fafafa;
  .titspan {
    font-size: 0.34rem;
    color: #333;
    overflow: hidden;
    position: relative;
    z-index: 100;
    text-shadow: #fff;
  }
  .morespan {
    font-size: 0.24rem;
    color: #b2b2b2;
  }
  .bgImg {
    width: 100%;
    height: 0.2rem;
    bottom: 0;
  }
  .moreImg {
    width: 0.2rem;
    height: 0.2rem;
    margin-left: 0.15rem;
  }
}
</style>
