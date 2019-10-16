<template>
  <div class="hotGameItem posRel">
    <span class="time posAbs mid">{{item.day}}</span>
    <img v-lazy="item.icon" alt class="iconImg posAbs mid">
    <div class="descBox posAbs mid flex flexAroCol">
      <span class="name">{{item.name}}</span>
      <div class="midBox flex flexSta">
        <span class="type">{{item.type_txt}}</span>
        <span class="size">{{item.size}}</span>
      </div>
      <span class="desc">{{item.publicity}}</span>
      <span class="ser_code">{{item.ser_code}}</span>
    </div>
    <span class="intoSp posAbs mid" @click="into_gameDetail_fun(item.app_id)">进入</span>
    <!-- <span class="line_time posAbs"></span> -->
  </div>
</template>

<script>
export default {
  name: "openDataMd",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
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
    into_gameDetail_fun: function(id) {
      //点击进入内容详情页
      var that = this;
    //   console.log("点击进游戏详情页");
      that.$router.push({ name: "gameDetail", params: { id: id } });
      that.$store.dispatch("game_detail_id", id);
      window.localStorage.setItem("game_detail_id", id);
      //   that.reload();
    }
  },
  computed: {
    baseUrl() {
      return this.$store.getters.baseUrl;
    }
  }
};
</script>
<style scoped lang="less">
.hotGameItem {
  width: 100%;
  height: 2.28rem;
  .line_time {
    height: 100%;
    width: 0.03rem;
    left: 0.32rem;
    background: #646464;
  }
  .iconImg {
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 10px;
    left: 0.9rem;
  }
  .time {
    font-size: 0.26rem;
    color: #000;
  }
  .descBox {
    width: 3rem;
    height: 1.5rem;
    left: 2.3rem;
    .name {
      font-size: 0.3rem;
      line-height: 0.4rem;
      color: #000;
    }
    .desc {
      width: 100%;
      height: 0.3rem;
      font-size: 0.2rem;
      line-height: 0.3rem;
      color: #a3a3a3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ser_code {
      font-size: 0.24rem;
      line-height: 0.3rem;
      color: #a3a3a3;
    }
    .midBox {
      width: 100%;
      height: 0.35rem;
      span {
        display: inline;
        font-size: 0.2rem;
        line-height: 0.35rem;
        color: #a3a3a3;
      }
      .size {
        margin-left: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        padding: 0 0.15rem;
        border-left: #a3a3a3 solid 0.02rem;
        border-right: #a3a3a3 solid 0.02rem;
      }
    }
  }
  .intoSp {
    width: 1.3rem;
    height: 0.5rem;
    border-radius: 3px;
    border: 0.02rem solid #c2c2c2;
    font-size: 0.25rem;
    color: #4d4d4d;
    text-align: center;
    line-height: 0.5rem;
    right: 0;
  }
}
</style>
