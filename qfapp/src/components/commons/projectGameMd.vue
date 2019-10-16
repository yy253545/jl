<template>
  <div class="projectGameItem posRel" @click="into_newsDetail_fun(item.id)">
    <div class="imgBox posAbs mid">
      <img v-if="item.thumb" v-lazy="item.thumb" alt class="iconImg">
      <img v-else v-lazy="defaultImg" alt class="iconImg posAbs mid">
    </div>
    <span class="descSp posAbs">{{item.post_title}}</span>
    <span class="timeSp posAbs">{{item.post_date}}</span>
  </div>
</template>

<script>
export default {
  name: "projectGameMd",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      defaultImg: require("../../imgs/defaultImg.png")
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
    into_newsDetail_fun: function(id) {
      //点击进入内容详情页
      var that = this;
    //   console.log("进入内容详情");
      that.$router.push({ name: "newsDetail", params: { id: id } });
      that.$store.dispatch("detail_id", id);
      window.localStorage.setItem("detail_id", id);
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
.projectGameItem {
  width: 100%;
  height: 1.72rem;
  .imgBox {
    width: 2.4rem;
    height: 1.25rem;
    overflow: hidden;
    border-radius: 0.1rem;
    img {
      width: 2.4rem;
      height: auto;
      border-radius: 0.1rem;
    }
  }
  .timeSp {
    font-size: 0.24rem;
    color: #adadad;
    bottom: 0.25rem;
    right: 0;
  }
  .descSp {
    width: 4.1rem;
    height: 0.8rem;
    top: 0.25rem;
    right: 0;
    font-size: 0.3rem;
    color: #000;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    // white-space: pre-wrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>
