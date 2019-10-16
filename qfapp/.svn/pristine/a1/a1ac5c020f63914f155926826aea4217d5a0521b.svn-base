<template>
  <div class="searchBox flex flexSta">
    <img src="../../imgs/search.png" alt="searchImg" class="searchImg">
    <form action>
      <input
        class="wh"
        id="searchIpt"
        ref="searchIpt"
        type="text"
         :placeholder=searchVal
        @keyup.enter="enterFun"
      >
    </form>
  </div>
</template>

<script>
import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
export default {
  inject: ["reload"],
  name: "search",
  data() {
    return {
      searchVal: "清风游戏"
    };
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {
    var that = this;
    var local_searchIptVal = window.localStorage.getItem("searchIptVal");
    // console.log(local_searchIptVal);
    if (local_searchIptVal) {
      that.searchVal = local_searchIptVal;
    }
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    enterFun: function() {
      var that = this;
      var searchIptVal = that.$refs.searchIpt.value;
    //   console.log(searchIptVal);
      that.$store.dispatch("searchIptVal", searchIptVal);
      var locationHref = window.location.href.split("#")[1].split("/")[1];
    //   console.log(locationHref);
      if (locationHref != "searchDetail") {
        //不是在搜索页面搜索的
        // console.log("不是在搜索页面搜索的");
        window.localStorage.setItem("searchIptVal", searchIptVal);
        that.$router.push({
          name: "searchDetail",
          params: { searchIptVal: searchIptVal }
        });
      } else {
        //在搜索页面搜索的
        // console.log("在搜索页面搜索的");
        window.localStorage.setItem("searchIptVal", searchIptVal);
        that.reload();
      }
    }
  },
  computed: {}
};
</script>
<style scoped lang="less">
.searchBox {
  width: 4rem;
  height: 0.6rem;
  background: #e6e6e6;
  border-radius: 3px;
  padding: 0 0.2rem;
  .searchImg {
    width: 0.3rem;
    height: auto;
  }
  form {
    width: 3.15rem;
    height: 100%;
    margin-left: 0.15rem;
    input {
      background: #e6e6e6;
      color: #333;
      border:none;
    }
  }
}
</style>
