<template>
  <div id="newsDetail">
    <backTop v-show="back_top_show" v-on:back_top="back_top"></backTop>
    <!-- <headComponet></headComponet> -->
     <div class="updateTopBox flex flexSta posFix">
      <img :src="backImg" alt class="backImg" @click="backHistory">
      <h3 class>游戏资讯</h3>
    </div>
    <div class="newsDetail_containerBox">
      <div class="newsInfo_box">
        <h4 class="name">{{newsInfo.post_title}}</h4>
        <div class="time_box flex flexBet">
          <div class="left_box flex flexSta">
            <img :src="articalImg" alt class="icon">
            <span v-if="newsInfo.user_nicename">{{newsInfo.user_nicename}}</span>
            <span v-else>admin</span>
          </div>
          <div class="right_box flex flexEnd">
            <img :src="timeImg" alt class="icon">
            <span>{{newsInfo.post_date}}</span>
          </div>
        </div>
        <div class="content" style="font-size:0.34rem;" v-html="newsInfo.post_content"></div>
      </div>
      <div class="nameList_box">
        <topTit titspan="推荐资讯" style="padding:0;"></topTit>
        <div class="nameList_item posRel" v-for="(item,index) in nameList" :key="index">
          <div class="wh" @click="into_newsDetail_fun(item.id)">
            <span
              v-if="item.post_type == 1"
              class="typeName_news posAbs mid"
            >{{item.post_type_text}}</span>
            <span
              v-else-if="item.post_type == 2"
              class="typeName_hd posAbs mid"
            >{{item.post_type_text}}</span>
            <span
              v-else-if="item.post_type == 3"
              class="typeName_gn posAbs mid"
            >{{item.post_type_text}}</span>
            <span
              v-else-if="item.post_type == 5"
              class="typeName_test posAbs mid"
            >{{item.post_type_text}}</span>
            <span class="title posAbs mid ellipsis">{{item.post_title}}</span>
            <span class="time posAbs mid">{{item.post_date}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <footNavComponent></footNavComponent> -->
  </div>
</template>

<script>
import headComponet from "../../components/headComponet";
import footNavComponent from "../../components/footNavComponent";
import topTit from "../../components/commons/topTit2";
import backTop from "../../components/backTop";
import utils from "../../config/common.js";
import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到

export default {
  inject: ["reload"],
  name: "newsDetail",
  components: {
    headComponet,
    backTop,
    footNavComponent,
    topTit
  },
  data() {
    return {
      baseUrl: "",
      newsInfo: {}, //新闻的详细信息数据;
      nameList: [], //里面显示的其他的新闻数据列表数据
      id: "", //新闻的数据的请求Id
      store_id: "",
      articalImg: require("../../imgs/artical.png"),
      timeImg: require("../../imgs/time.png"),
      see_more_img: require("../../imgs/more.png"),
      backImg: require("../../imgs/backImg1.png")
    };
  },
  beforeCreate: function() {
    this.$store.dispatch("clearScrollType");
    // utils.is_PC();
  },
  created: function() {
    this.baseUrl = this.$store.getters.baseUrl;
    this.store_id = this.$store.getters.detail_id;
  },
  beforeMount: function() {},
  mounted: function() {
    var that = this;
    that.getParams();
    document
      .getElementById("newsDetail")
      .addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件

    var is_android = that.$store.getters.is_android;
    var device = is_android ? "android" : "ios";
    var value = that.$store.getters.mdVal;
    var store_id = that.store_id;
    var local_detail_id = window.localStorage.getItem("detail_id");
    var id = that.id;
    // console.log(
    //   "store里面的id===" + store_id,
    //   "传过来的id==" + id,
    //   "本地的Id==" + local_detail_id
    // );
    var note_params = {
      device: device,
      time: Date.parse(new Date()) + "",
      id: local_detail_id || store_id
    };
    function mdjm_fun(params) {
      var access = that.$mdjm(JSON.stringify(params) + value);
      params["access"] = access;
      //   console.log(params);
      return params;
    }
    // console.log("请求新闻内页数据");
    this.$axios({
      method: "post",
      url: "/Wap/api/newsDetails",
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

          var news_list_data = res_data.nameList;
          for (let i = 0; i < news_list_data.length; i++) {
            news_list_data[i].post_date = news_list_data[i].post_date.slice(5);
          }
          that.newsInfo = res_data.newsInfo;
          //   console.log(that.newsInfo);
          that.nameList = news_list_data;
        }
      })
      .catch(function(error) {
        // console.log(error);
      });
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
    backHistory: function() {
      var that = this;
      that.$router.go(-1);
    },
    intoMorePage: function() {
      var that = this;
      that.$router.push({ name: "news" });
    },
    into_newsDetail_fun: function(id) {
      //点击进入内容详情页
      var that = this;
      //   console.log("点击进图内容详情页");
      that.$store.dispatch("detail_id", id);
      window.localStorage.setItem("detail_id", id);
      that.reload();
    },
    getParams() {
      // 取到路由带过来的参数
      //   console.log(this.$route.params.id);
      let routerParams = this.$route.params.id; // 将数据放在当前组件的数据内
      //   console.log(routerParams);
      this.id = routerParams;
      //   console.log(this.id);
    },
    back_top: function() {
      //   console.log("返回顶部");
      let timer = null,
        _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (document.getElementById("newsDetail").scrollTop > 0) {
          document.getElementById("newsDetail").scrollTop -=
            _that.$store.getters.backTopNum;
          document.body.scrollTop = document.documentElement.scrollTop = document.getElementById(
            "newsDetail"
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
      let scrollObj = document.getElementById("newsDetail"); // 滚动区域
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
<style lang="less">
#newsDetail {
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  .updateTopBox {
    width: 100%;
    height: 0.8rem;
    top: 0;
    z-index: 9999;
    background: #fff;
    padding: 0 0.25rem;
    img {
      width: 0.35rem;
      height: auto;
    }
    h3 {
      font-size: 0.4rem;
      margin-left: 2.4rem;
    }
  }
  .newsDetail_containerBox {
    border-top: 0.8rem solid transparent;
    .newsInfo_box {
      width: 100%;
      padding: 0 0.35rem;
      h4 {
        font-size: 0.38rem;
        color: #000;
        line-height: 0.48rem;
        text-align: center;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .time_box {
        width: 100%;
        height: 0.4rem;
        border-bottom: 0.02rem solid #e6e6e6;
        .left_box,
        .right_box {
          .icon {
            width: 0.25rem;
            height: auto;
            margin-right: 0.1rem;
          }
          span {
            font-size: 0.26rem;
            color: #333;
          }
        }
      }
      .content {
        padding: 0.5rem 0;
        width: 100%;
        p {
          font-size: 0.34rem !important;
          width: 100%;
          word-wrap: break-word;
          word-break: break-all;
          overflow: hidden;
        }
        span {
          display: inline;
        }
      }
    }
    .nameList_box {
      width: 100%;
      // border-top: 0.2rem solid #f5f5f5;
      border-bottom: 0.2rem solid #f5f5f5;
      padding: 0 0.35rem;
      .top_box {
        width: 100%;
        height: 0.7rem;
        border-bottom: 0.02rem solid #f5f5f5;
        .tit {
          font-size: 0.3rem;
          color: #333;
          left: 0;
        }
        .see_more {
          font-size: 0.24rem;
          color: #b1b1b1;
          right: 0.35rem;
        }
        img {
          width: 0.24rem;
          height: 0.24rem;
          right: 0;
        }
      }
      .nameList_item {
        width: 100%;
        height: 0.75rem;
        border-bottom: 0.01rem solid #e6e6e6;
        .typeName_news {
          font-size: 0.2rem;
          line-height: 0.28rem;
          padding: 0 0.05rem;
          left: 0;
          color: #ea8630;
          border: 0.01rem solid #ea8630;
        }
        .typeName_hd {
          font-size: 0.2rem;
          line-height: 0.28rem;
          padding: 0 0.05rem;
          left: 0;
          color: #603eae;
          border: 0.01rem solid #603eae;
        }
        .typeName_gn {
          font-size: 0.2rem;
          line-height: 0.28rem;
          padding: 0 0.05rem;
          left: 0;
          color: #ea2c96;
          border: 0.01rem solid #ea2c96;
        }
        .typeName_test {
          font-size: 0.2rem;
          line-height: 0.28rem;
          padding: 0 0.05rem;
          left: 0;
          color: #e51b05;
          border: 0.01rem solid #e51b05;
        }
        .title {
          font-size: 0.28rem;
          color: #333;
          width: 5rem;
          left: 0.8rem;
        }
        .time {
          font-size: 0.2rem;
          color: #b3b3b3;
          right: 0;
        }
      }
    }
  }
}
</style>
