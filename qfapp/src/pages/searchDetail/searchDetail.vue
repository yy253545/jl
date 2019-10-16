<template>
  <div id="searchDetail">
    <backTop v-show="back_top_show" v-on:back_top="back_top"></backTop>
    <headComponet></headComponet>
    <div class="containerBox">
      <span v-if="no_data" class="no_data">没有找到您所搜索的结果，换几个游戏试试？</span>
      <div class="hotGame_items">
        <hotGameMd v-for="(item,index) in game_list_data" :key="index" :item="item"></hotGameMd>
      </div>
      <div class="hotGame_items">
        <hotGameMd v-for="(item,index) in game_list_data2" :key="index" :item="item"></hotGameMd>
      </div>
    </div>
    <footNavComponent></footNavComponent>
  </div>
</template>

<script>
import headComponet from "../../components/headComponet";
import footNavComponent from "../../components/footNavComponent";
import hotGameMd from "../../components/commons/hotGameMd";
import backTop from "../../components/backTop";
import utils from "../../config/common.js";
import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到

export default {
  inject: ["reload"],
  name: "searchDetail",
  components: {
    headComponet,
    backTop,
    footNavComponent,
    hotGameMd
  },
  data() {
    return {
      baseUrl: "",
      no_data: false,
      searchIptVal: "",
      game_list_data: [],
      game_list_data2: []
    };
  },
  beforeCreate: function() {
    this.$store.dispatch("clearScrollType");
  },
  created: function() {
    this.baseUrl = this.$store.getters.baseUrl;
  },
  beforeMount: function() {},

  mounted: function() {
    var that = this;
    that.$nextTick(() => {
      document
        .getElementById("searchDetail")
        .addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件
      var is_android = that.$store.getters.is_android;
      var device = is_android ? "android" : "ios";
      var value = that.$store.getters.mdVal;
      var local_searchIptVal = window.localStorage.getItem("searchIptVal");
    //   console.log("本地的searchIptVal==" + local_searchIptVal);
      var search_params = {
        device: device,
        time: Date.parse(new Date()) + "",
        keyword: local_searchIptVal + ""
      };
      function mdjm_fun(params) {
        var access = that.$mdjm(JSON.stringify(params) + value);
        params["access"] = access;
        //   console.log(params);
        return params;
      }
    //   console.log("请求新闻内页数据");
      this.$axios({
        method: "post",
        url: "/Wap/api/search",
        data: QS.stringify(mdjm_fun(search_params))
      })
        .then(function(response) {
          // console.log(response.data);
          if (response.data.status == 0) {
            //请求不成功
            // console.log("请求不成功");
          } else if (response.data.status == 1) {
            //请求成功
            var res_data = response.data.data;
            // console.log(res_data);
            if (res_data.search.length == 0) {
              //没有搜索到数据
              that.no_data = true;
              var searchData2 = res_data.remd;
              for (let i = 0; i < searchData2.length; i++) {
                var typeTxt = searchData2[i].type_txt;
                if (typeTxt.split("|")[1]) {
                  //至少有2个类型只选第一个
                  searchData2[i].type_txt = typeTxt.split("|")[0];
                }
              }
              that.game_list_data2 = searchData2;
            } else {
              var searchData = res_data.search;
              for (let i = 0; i < searchData.length; i++) {
                var typeTxt = searchData[i].type_txt;
                if (typeTxt.split("|")[1]) {
                  //至少有2个类型只选第一个
                  searchData[i].type_txt = typeTxt.split("|")[0];
                }
              }
              that.game_list_data = searchData;
            }
          }
        })
        .catch(function(error) {
        //   console.log(error);
        });
      that.getParams();
    }); //必须等dom元素挂载完下一帧才能渠道$refs
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "getParams"
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数
      //   console.log(this.$route.params.id);
      let routerParams = this.$route.params.searchIptVal; // 将数据放在当前组件的数据内
    //   console.log(routerParams);
      this.searchIptVal = routerParams;
      //   console.log(this.id);
    },
    back_top: function() {
    //   console.log("返回顶部");
      let timer = null,
        _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (document.getElementById("searchDetail").scrollTop > 0) {
          document.getElementById("searchDetail").scrollTop -=
            _that.$store.getters.backTopNum;
          document.body.scrollTop = document.documentElement.scrollTop = document.getElementById(
            "searchDetail"
          ).scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    },
    handleScroll: function() {
      var that = this;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 设备/屏幕高度
      let scrollObj = document.getElementById("searchDetail"); // 滚动区域
      let scrollTop = scrollObj.scrollTop; // div 到头部的距离
      let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
      //   console.log(
      //     "滚动条到顶部距离===" + scrollTop,
      //     "滚动条总高度===" + scrollHeight,
      //     "设备高度===" + clientHeight
      //   );
      var scroll_Obj = {
        scrollTop: scrollTop,
        scrollHeight: scrollHeight,
        clientHeight: clientHeight
      };
      this.$store.dispatch("scroll_Obj", scroll_Obj);
      //滚动条到底部的条件
    }
  },
  computed: {
    is_weixin() {
      return this.$store.getters.is_weixin;
    },
    is_android() {
      return this.$store.getters.is_android;
    },
    scroll_Obj() {
      return this.$store.getters.scroll_Obj;
    },
    back_top_show() {
      var scroll_Obj = this.$store.getters.scroll_Obj;
      var backTopShowLen =
        scroll_Obj.scrollHeight -
        scroll_Obj.scrollTop -
        scroll_Obj.clientHeight;
      if (scroll_Obj.scrollTop > 700) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style scoped lang="less">
#searchDetail {
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
.containerBox {
  border-top: 0.9rem solid transparent;
  border-bottom: 1rem solid transparent;
  padding: 0 0.35rem;
  .no_data {
    width: 3rem;
    margin: 0.5rem auto;
    font-size: 0.3rem;
    color: #7f7f7f;
    line-height: 0.35rem;
  }
  .hotGame_items {
    width: 100%;
  }
}
</style>
