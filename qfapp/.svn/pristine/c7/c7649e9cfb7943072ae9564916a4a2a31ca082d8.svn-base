<template>
  <div id="newsPage">
    <backTop v-show="back_top_show" v-on:back_top="back_top"></backTop>
    <!-- <headComponet></headComponet> -->
    <tabMd v-on:tab_num="tab_num" :item="news_tab_data"></tabMd>
    <div class="containerBox" v-if="num == 0">
      <div class="specialPj" @click="into_newsDetail_fun(special_note_Data['id'])">
        <div class="wh posRel">
          <img v-lazy="special_note_Data['thumb']" alt class="bgImg posAbs wh">
          <div class="botBox posAbs flex flexSta">
            <span class="line"></span>
            <span class="descSp">{{special_note_Data['post_title']}}</span>
          </div>
        </div>
      </div>
      <div class="projectGame_items">
        <projectGameMd v-for="(item,index) in noteData" :key="index" :item="item"></projectGameMd>
      </div>
      <div class="news_lists">
        <newsListMd v-for="(item,index) in strategyData" :key="index" :item="item"></newsListMd>
        <span class="see_more" @click="seeMoreNews">查看更多</span>
      </div>
    </div>
    <div class="containerBox" v-if="num == 1">
      <div class="specialPj" @click="into_newsDetail_fun(special_note_Data['id'])">
        <div class="wh posRel">
          <img
            v-if="special_strategy_Data"
            v-lazy="special_strategy_Data['thumb']"
            alt
            class="bgImg posAbs wh"
          >
          <div class="botBox posAbs flex flexSta">
            <span class="line"></span>
            <span
              v-if="special_strategy_Data"
              class="descSp"
            >{{special_strategy_Data['post_title']}}</span>
          </div>
        </div>
      </div>
      <div class="projectGame_items">
        <projectGameMd v-for="(item,index) in noteData1" :key="index" :item="item"></projectGameMd>
      </div>
      <div class="news_lists">
        <newsListMd v-for="(item,index) in strategyData1" :key="index" :item="item"></newsListMd>
        <span class="see_more" @click="seeMoreNews">查看更多</span>
      </div>
    </div>
    <footNavComponent></footNavComponent>
  </div>
</template>

<script>
import headComponet from "../../components/headComponet";
import swiperComponent from "../../components/swiperComponent";
import footNavComponent from "../../components/footNavComponent";
import backTop from "../../components/backTop";
import utils from "../../config/common.js";
import tabMd from "../../components/commons/tabMd";
import projectGameMd from "../../components/commons/projectGameMd";
import newsListMd from "../../components/commons/newsListMd";
import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到

export default {
  name: "news",
  components: {
    headComponet,
    swiperComponent,
    footNavComponent,
    backTop,
    tabMd,
    projectGameMd,
    newsListMd
  },
  data() {
    return {
      baseUrl: "",
      num: "0",
      note_p: 1,
      strategy_p: 1,
      no_note_data: false,
      no_strategy_data: false,
      news_tab_data: [
        {
          tab_tit: "活动公告",
          class_name: "active_li"
        },
        {
          tab_tit: "情报攻略"
        }
      ],
      noteData: [], //公告数据
      strategyData: [], //公告数据列表
      noteData1: [], //攻略数据
      strategyData1: [], //攻略数据列表
      special_note_Data: {}, //公告数据的特殊数据
      special_strategy_Data: {} //攻略数据的特殊数据
    };
  },
  beforeCreate: function() {
    var page = utils.navClassStyle();
    this.$store.dispatch("navActive", page);
    this.$store.dispatch("clearScrollType");
    // utils.is_PC();
    
  },
  created: function() {
    this.baseUrl = this.$store.getters.baseUrl;
  },
  beforeMount: function() {},
  mounted: function() {
    var that = this;
    document
      .getElementById("newsPage")
      .addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件

    var is_android = this.$store.getters.is_android;
    var device = is_android ? "android" : "ios";
    var value = this.$store.getters.mdVal;
    var note_params = {
      device: device,
      time: Date.parse(new Date()) + "",
      p: that.note_p + "",
      type: "news"
    };
    function mdjm_fun(params) {
      var access = that.$mdjm(JSON.stringify(params) + value);
      params["access"] = access;
      //   console.log(params);
      return params;
    }
    this.$axios({
      method: "post",
      url: "/Wap/api/newsList",
      data: QS.stringify(mdjm_fun(note_params))
    })
      .then(function(response) {
        // console.log(response.data);
        if (response.data.status == 0) {
          //请求不成功
        //   console.log("请求不成功");
        } else if (response.data.status == 1) {
          //请求成功
          var res_data = response.data.data;
        //   console.log(res_data);
          var note_data = res_data.newsList;
          for (let i = 0; i < note_data.length; i++) {
            var time = note_data[i].post_date;
            time = time.slice(5);
            // console.log(time);
            note_data[i].post_date = time;
          }
          //   console.log(note_data);
          that.noteData = res_data.Newest; //有图的公告数据
          that.strategyData = note_data; //没图的公告数据
          that.special_note_Data = res_data.newsTop[0]; //特殊的公告数据
        }
      })
      .catch(function(error) {
        // console.log(error);
      });
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {
    // document
    //   .getElementById("newsPage")
    //   .removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
  },
  methods: {
    seeMoreNews: function() {
      //新闻页面点击查看更多进入查看更多新闻页面
      var that = this;
      that.$router.push({ name: "moreNews" });
    },
    into_newsDetail_fun: function(id) {
      //点击进入内容详情页
      var that = this;
      that.$router.push({ name: "newsDetail", params: { id: id } });
      that.$store.dispatch("detail_id", id);
      window.localStorage.setItem("detail_id", id);
    },
    tab_num: function(index) {
      var that = this;
      that.num = index;
      that.note_p = 1;
      that.strategy_p = 1;

      if (index == 0) {
        //
      } else if (index == 1) {
        //请求攻略接口数据
        that.no_note_data = false;
        that.no_strategy_data = false;
        var value = that.$store.getters.mdVal;
        var is_android = that.$store.getters.is_android;
        var device = is_android ? "android" : "ios";
        var strategy_params = {
          device: device,
          time: Date.parse(new Date()) + "",
          p: that.strategy_p + "",
          type: "strategy"
        };
        function mdjm_fun(params) {
          var access = that.$mdjm(JSON.stringify(params) + value);
          params["access"] = access;
          //   console.log(params);
          return params;
        }
        that
          .$axios({
            method: "post",
            url: "/Wap/api/newsList",
            data: QS.stringify(mdjm_fun(strategy_params))
          })
          .then(function(response) {
            // console.log(response.data);
            if (response.data.status == 0) {
              //请求不成功
            //   console.log("请求不成功");
            } else if (response.data.status == 1) {
              //请求成功
              var res_data = response.data.data;
            //   console.log(res_data);
              var note_data = res_data.newsList;
              for (let i = 0; i < note_data.length; i++) {
                var time = note_data[i].post_date;
                time = time.slice(5);
                // console.log(time);
                note_data[i].post_date = time;
              }
              //   console.log(note_data);
              that.noteData1 = res_data.Newest; //所有游戏数据
              that.strategyData1 = note_data; //所有游戏数据
              that.special_strategy_Data = res_data.newsTop[0]; //所有游戏数据
            }
          })
          .catch(function(error) {
            // console.log(error);
          });
      }
    },
    back_top: function() {
    //   console.log("返回顶部");
      let timer = null,
        _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (document.getElementById("newsPage").scrollTop > 0) {
          document.getElementById("newsPage").scrollTop -=
            _that.$store.getters.backTopNum;
          document.body.scrollTop = document.documentElement.scrollTop = document.getElementById(
            "newsPage"
          ).scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    },
    handleScroll: function() {
      var that = this;
      var num = that.num;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 设备/屏幕高度
      let scrollObj = document.getElementById("newsPage"); // 滚动区域
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
      if (scrollTop == scrollHeight - clientHeight) {
        // div 到头部的距离 + 屏幕高度 = 可滚动的总高度
        // console.log("要做数据请求了");
        var value = this.$store.getters.mdVal;
        var is_android = this.$store.getters.is_android;
        var device = is_android ? "android" : "ios";

        function mdjm_fun(params) {
          var access = that.$mdjm(JSON.stringify(params) + value);
          params["access"] = access;
          //   console.log(params);
          return params;
        }
      }
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

<style lang="less" scoped>
#newsPage {
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
  .specialPj {
    width: 100%;
    height: 3.4rem;
    background: #fafafa;
    .botBox {
      width: 100%;
      height: 0.48rem;
      padding: 0 0.2rem;
      background: rgba(0, 0, 0, 0.3);
      bottom: 0;
      z-index: 100;
      .line {
        width: 0.13rem;
        height: 0.29rem;
        border-radius: 0.03rem;
        background: #fe7e00;
        margin-right: 0.24rem;
      }
      .descSp {
        font-size: 0.28rem;
        color: #fff;
        font-weight: 600;
        letter-spacing: 0.025rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    img {
    }
  }
  .projectGame_items {
    width: 100%;
    padding: 0 0.35rem;
    background: #fafafa;
  }
  .news_lists {
    width: 100%;
    padding: 0 0.35rem;
    background: #fafafa;
    border-top: 0.02rem solid #e6e6e6;
    .see_more {
      width: 100%;
      height: 0.75rem;
      line-height: 0.75rem;
      font-size: 0.3rem;
      color: #333;
      text-align: center;
    }
  }
}

.bot_top-enter-active {
  transition: all 0.3s linear;
}
.bot_top-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.bot_top-enter,
.bot_top-leave-to {
  transform: translateY(1rem);
  opacity: 1;
}
</style>

