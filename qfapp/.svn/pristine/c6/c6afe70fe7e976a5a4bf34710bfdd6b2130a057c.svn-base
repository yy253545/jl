<template>
  <div class="hotGameItem posRel">
    <img v-if="item.icon" v-lazy="item.icon" alt class="iconImg posAbs mid">
    <img v-else v-lazy="defaultimg" alt class="iconImg posAbs mid">
    <div class="descBox posAbs mid" @click="into_gameDetail_fun(item.app_id)">
      <span class="name">{{item.name}}</span>
      <div class="midBox flex flexSta">
        <span class="type">{{item.type_txt}}</span>
        <span class="size">{{item.size}}</span>
      </div>
      <span class="desc">{{item.publicity}}</span>
    </div>
    <div class="intoSp posAbs mid">
      <a class="wh" :href="item.downurl">下载</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "hotGameMd",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      defaultimg: require("../../imgs/defaultImg.png")
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
  height: 1.75rem;
  .iconImg {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 10px;
    left: 0;
  }
  .descBox {
    width: 3.6rem;
    height: 1.25rem;
    left: 1.5rem;
    .name {
      font-size: 0.3rem;
      line-height: 0.5rem;
      color: #000;
    }
    .desc {
      width: 100%;
      height: 0.32rem;
      font-size: 0.24rem;
      line-height: 0.32rem;
      color: #a3a3a3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .midBox {
      width: 100%;
      height: 0.35rem;
      span {
        display: inline;
        font-size: 0.24rem;
        line-height: 0.35rem;
        color: #a3a3a3;
      }
      .size {
        margin-left: 0.2rem;
        height: 0.24rem;
        line-height: 0.24rem;
        padding: 0 0.15rem;
        border-left: #a3a3a3 solid 0.02rem;
        border-right: #a3a3a3 solid 0.02rem;
      }
    }
  }
  .intoSp {
    width: 1.35rem;
    height: 0.55rem;
    border-radius: 3px;
    border: 0.02rem solid #c2c2c2;
    right: 0;
    a {
      width: 1.35rem;
      height: 0.55rem;
      font-size: 0.25rem;
      color: #4d4d4d;
      text-align: center;
      line-height: 0.55rem;
      border:none;
      outline: none;
    }
  }
}
</style>
