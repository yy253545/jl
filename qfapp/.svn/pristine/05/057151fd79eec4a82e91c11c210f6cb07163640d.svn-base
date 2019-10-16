<template>
  <div id="MyVouchersPage">
    <div class="headBox posFix">
      <div class="wh">
        <img :src="backImg" class="backImg posAbs mid" @click="back" />
        <span class="posAbs cenMid">代金券</span>
        <img :src="helpImg" class="helpImg posAbs mid" @click="vouchersHelpPage" />
      </div>
    </div>
    <maskMd v-show="show_mask" @clickMask="clickMask"></maskMd>

    <div class="tabBox" style="margin-bottom: 1rem;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的代金券" name="0">
          <el-collapse v-model="collapseActiveName" accordion>
            <el-collapse-item title="未使用代金券" name="0">
              <div
                v-for="(item,index) in unuseVouchersData"
                :key="index"
                class="vouchersBox posRel"
                @click="vouchersDescBtn(item)"
              >
                <img
                  v-if="item.status == '1'"
                  class="defaultVouchersBgImg posAbs wh"
                  :src="defaultVouchersBgImg"
                />
                <img
                  v-else-if="item.status == '3'"
                  class="defaultVouchersBgImg posAbs wh"
                  :src="beUnUserBgImg"
                />
                <span class="vouchers_price posAbs">
                  <em>{{item.money}}</em>
                  元
                </span>
                <span class="vouchersNeedPrice posAbs">满{{item.min_money}}可用</span>
                <div class="vouchersTitBox posAbs flex flexSta">
                  <i v-if="item.use_type == '1'" class="typeBox">全平台通用</i>
                  <i v-else-if="item.use_type == '2'" class="typeBox">限定</i>
                  <span v-if="item.use_type == '1'" class="vouchersTit">{{item.money}}元通用代金券</span>
                  <span v-else-if="item.use_type == '2'" class="vouchersTit">{{item.money}}元限定代金券</span>
                </div>
                <span class="userArea posAbs mid">适用范围:{{item.use_detail}}</span>
                <span class="userTime posAbs">有效期:{{item.term_of_validity}}</span>
              </div>
            </el-collapse-item>
            <el-collapse-item title="已过期代金券" name="1">
              <div
                v-for="(item,index) in timeoffVouchersData"
                :key="index"
                class="vouchersBox posRel"
                @click="vouchersDescBtn(item)"
              >
                <img class="unUseBgImg posAbs wh" :src="unUseBgImg" />
                <span class="vouchers_price posAbs">
                  <em>{{item.money}}</em>
                  元
                </span>
                <span class="vouchersNeedPrice posAbs">满{{item.min_money}}可用</span>
                <div class="vouchersTitBox posAbs flex flexSta">
                  <i v-if="item.use_type == '1'" class="typeBox">全平台通用</i>
                  <i v-else-if="item.use_type == '2'" class="typeBox">限定</i>
                  <span v-if="item.use_type == '1'" class="vouchersTit">{{item.money}}元通用代金券</span>
                  <span v-else-if="item.use_type == '2'" class="vouchersTit">{{item.money}}元限定代金券</span>
                </div>
                <span class="userArea posAbs mid">适用范围:{{item.use_detail}}</span>
                <span class="userTime posAbs">有效期:{{item.term_of_validity}}</span>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div class="backMinePage posFix">
            <span @click="changeVouchersBtn">兑换代金券</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="使用记录" name="1">
          <div
            v-for="(item,index) in useVouchersData"
            :key="index"
            class="vouchersBox posRel"
            @click="vouchersDescBtn(item)"
          >
            <img class="useBgImg posAbs wh" :src="useBgImg" />
            <span class="vouchers_price posAbs">
              <em>{{item.money}}</em>
              元
            </span>
            <span class="vouchersNeedPrice posAbs">满{{item.min_money}}可用</span>
            <div class="vouchersTitBox posAbs flex flexSta">
              <i v-if="item.use_type == '1'" class="typeBox">全平台通用</i>
              <i v-else-if="item.use_type == '2'" class="typeBox">限定</i>
              <span v-if="item.use_type == '1'" class="vouchersTit">{{item.money}}元通用代金券</span>
              <span v-else-if="item.use_type == '2'" class="vouchersTit">{{item.money}}元限定代金券</span>
            </div>
            <span class="userArea posAbs mid">适用范围:{{item.use_detail}}</span>
            <span class="userTime posAbs">有效期:{{item.term_of_validity}}</span>
          </div>
          <div class="backMinePage posFix">
            <span @click="changeVouchersBtn">兑换代金券</span>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import maskMd from "../../components/maskMd";
import closeMd from "../../components/closeMd";
import utils from "../../config/common.js";
import axios from "axios";
import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
import vueResource from "vue-resource";
import Vue from "vue";
Vue.use(vueResource);

export default {
  inject: ["reload"],
  name: "MyVouchersPage",
  components: {
    maskMd,
    closeMd
  },
  data() {
    return {
      backImg: require("../../imgs/backImg1.png"),
      helpImg: require("../../imgs/helpImg.png"),
      defaultVouchersBgImg: require("../../imgs/defaultVouchersBgImg.png"),
      beUnUserBgImg: require("../../imgs/beUnUserBgImg.png"),
      unUseBgImg: require("../../imgs/unUseBgImg.png"),
      useBgImg: require("../../imgs/useBgImg.png"),
      activeName: "0",
      collapseActiveName: "0",
      show_mask: false,
      allVouchersData: "",
      unuseVouchersData: "",
      useVouchersData: "",
      timeoffingVouchersData: "",
      timeoffVouchersData: ""
    };
  },
  beforeCreate: function() {},
  created: function() {},

  beforeMount: function() {},
  mounted: function() {
    var that = this;
    document
      .getElementById("MyVouchersPage")
      .addEventListener("scroll", that.handleScroll, true); // 监听（绑定）滚轮滚动事件

    var getAllVouchersParams = {
      device: that.$store.getters.is_android ? "android" : "ios",
      time: Date.parse(new Date()) + ""
    };

    function mdjm_fun(params) {
      var access = that.$mdjm(
        JSON.stringify(params) + that.$store.getters.mdVal
      );
      params["access"] = access;
      return params;
    }

    that
      .$axios({
        method: "post",
        url: "/Wap/api/getCouponAll",
        data: QS.stringify(mdjm_fun(getAllVouchersParams))
      })
      .then(function(response) {
        if (response.data.status == 0) {
          //请求不成功
          that
            .$confirm(response.data.msg, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              showCancelButton: false,
              showClose: false,
              closeOnClickModal: false,
              type: "warning"
            })
            .then(() => {
              that.$router.push({
                name: "mine"
              });
            })
            .catch(() => {});
        } else if (response.data.status == 1) {
          //请求成功
          // console.log(response.data.data);
          that.allVouchersData = response.data.data;
          var allVouchersData = that.allVouchersData;
          let unuseVouchersData = [];
          let useVouchersData = [];
          let timeoffingVouchersData = [];
          let timeoffVouchersData = [];
          for (let i = 0; i < allVouchersData.length; i++) {
            if (allVouchersData[i]["status"] == "1") {
              //未使用代金券
              unuseVouchersData.push(allVouchersData[i]);
            } else if (allVouchersData[i]["status"] == "2") {
              //已经使用代金券
              useVouchersData.push(allVouchersData[i]);
            } else if (allVouchersData[i]["status"] == "3") {
              //即将过期代金券
              timeoffingVouchersData.push(allVouchersData[i]);
              unuseVouchersData.push(allVouchersData[i]);
            } else if (allVouchersData[i]["status"] == "4") {
              //已经过期代金券
              timeoffVouchersData.push(allVouchersData[i]);
            }
          }
          that.unuseVouchersData = unuseVouchersData;
          that.useVouchersData = useVouchersData;
          that.timeoffingVouchersData = timeoffingVouchersData;
          that.timeoffVouchersData = timeoffVouchersData;
        }
      })
      .catch(function(error) {
        //   console.log(error);
      });
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {
    // document
    //   .getElementById("indexPage")
    //   .removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
  },
  methods: {
    vouchersDescBtn: function(item) {
      var that = this;
      // console.log(item);
      window.localStorage.setItem("vouchersData", JSON.stringify(item));
      that.$router.push({
        name: "vouchersDesc"
      });
    },
    changeVouchersBtn: function() {
      var that = this;
      that.$router.push({
        name: "changeVouchers"
      });
    },
    clickMask: function() {
      var that = this;
      that.show_mask = false;
    },
    back: function() {
      var that = this;
      that.$router.push({
        name: "myWallet"
      });
    },
    vouchersHelpPage: function() {
      var that = this;
      that.$router.push({
        name: "vouchersHelp"
      });
    },
    handleClick(tab, event) {
      var that = this;
      switch (tab.index) {
        case "0":
          break;
        case "1":
          break;
        default:
          break;
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
    baseUrl() {
      return this.$store.getters.baseUrl;
    },
    mdjmVal() {
      return this.$store.getters.mdVal;
    }
  }
};
</script>

<style lang="less">
#MyVouchersPage {
  width: 100%;
  padding-top: 1rem;

  .headBox {
    width: 100%;
    height: 1rem;
    background: #fff;
    top: 0;
    z-index: 1000;
    border-bottom: 1px solid #f5f5f5;

    .backImg {
      width: 0.35rem;
      height: auto;
      left: 0.4rem;
    }

    .helpImg {
      width: 0.5rem;
      height: auto;
      right: 0.4rem;
    }

    span {
      font-size: 0.34rem;
      color: #333333;
    }
  }

  .tabBox {
    .backMinePage {
      width: 100%;
      height: 1rem;
      background: #ffffff;
      bottom: 0rem;
      z-index: 400;

      span {
        font-size: 0.34rem;
        color: #ffffff;
        line-height: 0.6rem;
        border-radius: 5px;
        width: 5rem;
        background: #ffbf00;
        text-align: center;
        margin: 0.2rem auto;
      }
    }

    .vouchersBox {
      width: 100%;
      height: 2rem;
      margin-top: 0.15rem;

      .vouchersTitBox {
        top: 0.15rem;
        color: #000000;
        left: 2.4rem;

        .vouchersTit {
          color: #000000;
          font-size: 0.3rem;
          line-height: 0.4rem;
        }

        .typeBox {
          padding: 0rem 0.15rem;
          background: #ff8400;
          border-radius: 3px;
          color: #ffffff;
          font-size: 0.3rem;
          line-height: 0.4rem;
          margin-right: 0.15rem;
        }
      }

      .userArea {
        color: #000000;
        left: 2.4rem;
        font-size: 0.3rem;
        line-height: 0.35rem;
        width: 3.75rem;
      }

      .userTime {
        color: #000000;
        left: 2.4rem;
        bottom: 0.15rem;
        font-size: 0.3rem;
      }

      .vouchersNeedPrice {
        font-size: 0.3rem;
        color: #ffffff;
        bottom: 0.35rem;
        left: 0.45rem;
      }

      .vouchers_price {
        font-size: 0.3rem;
        color: #ffffff;
        top: 0.35rem;
        left: 0.45rem;
        line-height: 0.7rem;

        em {
          font-size: 0.7rem;
          color: #ffffff;
          display: inline-block;
        }
      }
    }

    .el-collapse-item__header {
      height: 0.8rem;
      background: #ffb02d;
      padding-left: 0.3rem;
      color: #ffffff;
    }

    .el-tabs__header {
      margin: 0;
    }

    .el-collapse-item__content {
      padding-bottom: 0.15rem;
    }
  }
}
</style>
