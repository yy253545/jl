<template>
  <div id="moreNews">
    <backTop v-show="back_top_show" v-on:back_top="back_top"></backTop>
    <!-- <headComponet></headComponet> -->
    <div class="containerBox">
      <div class="selectBox flex flexBet">
        <div class="selectBox_item posRel">
          <select name id class="posAbs" @change="selectGame">
            <option value="0">全部游戏</option>
            <option
              :value="item.key"
              v-for="(item,index) in game_picker_data"
              :key="index"
              :selected="item.select"
            >{{item.value}}</option>
          </select>
          <span class="triangle_border_down posAbs mid"></span>
        </div>
        <div class="selectBox_item posRel">
          <select name id class="posAbs" @change="selectType">
            <option value="0">全部咨询</option>
            <option
              v-for="(item,index) in newsTypeData"
              :key="index"
              :value="item.type_value"
              :selected="item.select"
            >{{item.name}}</option>
          </select>
          <span class="triangle_border_down posAbs mid"></span>
        </div>
      </div>
      <div class="newsListMd" v-if="newsListData.length != 0">
        <newsListMd v-for="(item,index) in newsListData" :key="index" :item="item"></newsListMd>
        <span class="no_more_news" v-if="no_more_news">没有更多数据了</span>
      </div>
      <span v-else class="no_news_data">没有您要找的咨询新闻,请 换个游戏或者类型再试试？</span>
    </div>
    <footNavComponent></footNavComponent>
  </div>
</template>

<script>
import headComponet from "../../components/headComponet";
import footNavComponent from "../../components/footNavComponent";
import newsListMd from "../../components/commons/newsListMd";
import backTop from "../../components/backTop";
import utils from "../../config/common.js";
import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到

export default {
  inject: ["reload"],
  name: "moreNews",
  components: {
    headComponet,
    backTop,
    footNavComponent,
    newsListMd
  },
  data() {
    return {
      baseUrl: "",
      newsTypeData: [
        {
          type_value: "1",
          name: "新闻"
        },
        {
          type_value: "2",
          name: "活动"
        },
        {
          type_value: "3",
          name: "攻略"
        },
        {
          type_value: "5",
          name: "测评"
        }
      ],
      newsListData: [], //搜索到的数据列表
      newsListP: 1,
      selectGameVal: "", //选择的游戏数据;
      selectTypeVal: "", //选择咨询类型数据;
      app_id: "0",
      type: "0",
      game_picker_data: [],
      no_more_news: false
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
      that.getParams();
      document
        .getElementById("moreNews")
        .addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件

      var is_android = that.$store.getters.is_android;
      var device = is_android ? "android" : "ios";
      var value = that.$store.getters.mdVal;

      var note_params = {
        device: device,
        time: Date.parse(new Date()) + "",
        app_id: that.app_id + "",
        p: that.newsListP + "",
        type: that.type + ""
      };

      var game_picker_params = {
        device: device,
        time: Date.parse(new Date()) + ""
      };

      function mdjm_fun(params) {
        var access = that.$mdjm(JSON.stringify(params) + value);
        params["access"] = access;
        //   console.log(params);
        return params;
      }
      this.$axios({
        method: "post",
        url: "/Wap/api/newsAllList",
        data: QS.stringify(mdjm_fun(note_params))
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
            var newsList_Data = res_data;
            for (let i = 0; i < newsList_Data.length; i++) {
              newsList_Data[i].post_date = newsList_Data[i].post_date.slice(5);
            }
            that.newsListData = newsList_Data;
          }
        })
        .catch(function(error) {
        //   console.log(error);
        });

      this.$axios({
        method: "post",
        url: "/Wap/api/getGame",
        data: QS.stringify(mdjm_fun(game_picker_params))
      })
        .then(function(response) {
          // console.log(response.data);
          if (response.data.status == 0) {
            //请求不成功
            // console.log("请求不成功");
          } else if (response.data.status == 1) {
            //请求成功
            var res_data = response.data.data;
            //   console.log(res_data);
            var game_picker_res_data = [];
            for (var key in res_data) {
              var option_dataObj = {};
              option_dataObj.key = key;
              option_dataObj.value = res_data[key];
              option_dataObj.select = "";
              game_picker_res_data.push(option_dataObj);
            }
            //   console.log(game_picker_res_data);
            var app_id = that.app_id;

            if (app_id != "0") {
              //说明是从游戏详情来的;
              for (let j = 0; j < game_picker_res_data.length; j++) {
                if (game_picker_res_data[j].key == app_id) {
                //   console.log("select上面显示app_id游戏名字");
                  game_picker_res_data[j].select = "selected";
                } else {
                  game_picker_res_data[j].select = "";
                }
              }
            }
            // console.log(game_picker_res_data);
            that.game_picker_data = game_picker_res_data; //所有游戏数据
          }
        })
        .catch(function(error) {
        //   console.log(error);
        });
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
    getParams() {
      // 取到路由带过来的参数
      //   console.log(this.$route.params.id);
      let routerParams = this.$route.params.app_id; // 将数据放在当前组件的数据内
      console.log(routerParams);
      this.app_id = routerParams;
      //   console.log(this.id);
    },
    selectGame: function(ele) {
      //选择游戏
      var that = this;
      that.$store.dispatch("clearScrollType");
      //   console.log(ele.target.value, that.app_id, that.type);
      that.app_id = ele.target.value;
      //   console.log(ele.target.value, that.app_id, that.type);
      that.newsListP = 1;
      var value = that.$store.getters.mdVal;
      var is_android = that.$store.getters.is_android;
      var device = is_android ? "android" : "ios";
      var game_picker_data = that.game_picker_data;
      for (let j = 0; j < game_picker_data.length; j++) {
        if (game_picker_data[j].key == ele.target.value) {
          game_picker_data[j].select = "selected";
        } else {
          game_picker_data[j].select = "";
        }
      }
      that.game_picker_data = game_picker_data;
      var news_params = {
        device: device,
        time: Date.parse(new Date()) + "",
        app_id: that.app_id + "",
        p: that.newsListP + "",
        type: that.type + ""
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
          url: "/Wap/api/newsAllList",
          data: QS.stringify(mdjm_fun(news_params))
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
            if (res_data.length != 0) {
              var open_res_data = res_data;
              for (let i = 0; i < open_res_data.length; i++) {
                var time = open_res_data[i].post_date;
                time = time.slice(5);
                open_res_data[i].post_date = time;
              }
              that.newsListData = open_res_data;
            } else {
              that.newsListData = [];
            }
          }
        })
        .catch(function(error) {
        //   console.log(error);
        });
    },
    selectType: function(ele) {
      //选择咨询类型
      var that = this;
      that.$store.dispatch("clearScrollType");
      //   console.log(ele.target.value, that.app_id, that.type);
      that.type = ele.target.value;
      //   console.log(ele.target.value, that.app_id, that.type);
      that.newsListP = 1;
      var value = that.$store.getters.mdVal;
      var is_android = that.$store.getters.is_android;
      var device = is_android ? "android" : "ios";
      var newsTypeData = that.newsTypeData;
      for (let j = 0; j < newsTypeData.length; j++) {
        if (newsTypeData[j].type_value == ele.target.value) {
          newsTypeData[j].select = "selected";
        } else {
          newsTypeData[j].select = "";
        }
      }
      that.newsTypeData = newsTypeData;
      var news_params = {
        device: device,
        time: Date.parse(new Date()) + "",
        app_id: that.app_id + "",
        p: that.newsListP + "",
        type: that.type + ""
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
          url: "/Wap/api/newsAllList",
          data: QS.stringify(mdjm_fun(news_params))
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
            if (res_data.length != 0) {
              var open_res_data = res_data;
              for (let i = 0; i < open_res_data.length; i++) {
                var time = open_res_data[i].post_date;
                time = time.slice(5);
                open_res_data[i].post_date = time;
              }
              that.newsListData = open_res_data;
            } else {
              that.newsListData = [];
            }
          }
        })
        .catch(function(error) {
        //   console.log(error);
        });
    },
    back_top: function() {
    //   console.log("返回顶部");
      let timer = null,
        _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (document.getElementById("moreNews").scrollTop > 0) {
          document.getElementById("moreNews").scrollTop -=
            _that.$store.getters.backTopNum;
          document.body.scrollTop = document.documentElement.scrollTop = document.getElementById(
            "moreNews"
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
      let scrollObj = document.getElementById("moreNews"); // 滚动区域
      let scrollTop = scrollObj.scrollTop; // div 到头部的距离
      let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
        // console.log(
        //   "滚动条到顶部距离===" + scrollTop,
        //   "滚动条总高度===" + scrollHeight,
        //   "设备高度===" + clientHeight
        // );
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
        that.newsListP += 1;
        var value = this.$store.getters.mdVal;
        var is_android = this.$store.getters.is_android;
        var device = is_android ? "android" : "ios";

        function mdjm_fun(params) {
          var access = that.$mdjm(JSON.stringify(params) + value);
          params["access"] = access;
          //   console.log(params);
          return params;
        }

        var news_params = {
          device: device,
          time: Date.parse(new Date()) + "",
          app_id: that.app_id + "",
          p: that.newsListP + "",
          type: that.type + ""
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
            url: "/Wap/api/newsAllList",
            data: QS.stringify(mdjm_fun(news_params))
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
              var newsList_Data = res_data;
              if (newsList_Data.length != 0) {
                for (let i = 0; i < newsList_Data.length; i++) {
                  newsList_Data[i].post_date = newsList_Data[i].post_date.slice(
                    5
                  );
                }
                that.newsListData = that.newsListData.concat(newsList_Data);
              } else {
                that.no_more_news = true;
              }
            }
          })
          .catch(function(error) {
            // console.log(error);
          });
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
<style scoped lang="less">
#moreNews {
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
.containerBox {
//   border-top: 0.9rem solid transparent;
  border-bottom: 1rem solid transparent;
  padding: 0 0.35rem;
  .selectBox {
    width: 100%;
    height: 1rem;
    padding: 0 0.55rem;
    .selectBox_item {
      width: 1.95rem;
      height: 0.5rem;
      border: 0.02rem solid #ffbe00;
      border-radius: 5px;
      select {
        height: 100%;
        margin: 0;
        background: transparent;
        border-radius: 5px;
        border: none;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        color: #ffbe00;
        font-size: 0.25rem;
        width: 100%;
        padding: 0 0 0 0.2rem;
        outline: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
      .triangle_border_down {
        width: 0;
        height: 0;
        border-width: 8px 8px 0;
        border-style: solid;
        border-color: #ffbe00 transparent transparent;
        right: 0.2rem;
      }
    }
  }
  .newsListMd {
    width: 100%;
    .newsList {
      border: none;
    }
    .no_more_news {
      font-size: 0.3rem;
      text-align: center;
      color: #5a5959;
      width: 100%;
      line-height: 0.5rem;
    }
  }
  .no_news_data {
    font-size: 0.32rem;
    line-height: 0.45rem;
    color: #5a5959;
    text-align: center;
    width: 5rem;
    margin: 0.5rem auto;
  }
}
</style>
