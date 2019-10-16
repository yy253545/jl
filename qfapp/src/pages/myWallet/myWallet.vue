<template>
  <div id="myWalletPage">
    <div class="headBox posFix">
      <div class="wh">
        <img :src="backImg" class="backImg posAbs mid" @click="back" />
        <span class="posAbs cenMid">我的钱包</span>
      </div>
    </div>
    <maskMd v-show="show_mask" @clickMask="clickMask"></maskMd>
    <div class="vouchers_box posRel" @click="intoMyVouchersPage">
      <img :src="vouchersIcon" class="vouchersIcon posAbs mid" />
      <span class="vouchersTit posAbs mid">代金券</span>
      <img :src="moreImg" class="moreImg posAbs mid" />
    </div>
    <div class="wallet_box posRel">
      <img :src="walletIcon" class="vouchersIcon posAbs mid" />
      <span class="vouchersTit posAbs mid">钱包余额:</span>
      <span class="walletNum posAbs mid">{{money}}币</span>
      <span class="fillBtn posAbs mid" @click="intoMyrecharge">立即充值</span>
    </div>
    <div class="tit_box flex flexCen">
      <img :src="mxIcon" class="titIcon" />
      <span>最近10笔平台充值明细</span>
    </div>
    <div class="t_head" v-for="(item,index) in detail" :key="index">
      <li class="t-head_tit flex">
        <span>订单号&nbsp;:</span>
        <span>{{item.order_id}}</span>
      </li>
      <li class="t-head_tit flex">
        <span>平台币&nbsp;:</span>
        <span class="red">{{item.ptb_cnt}}</span>
        <span class="left">充值币&nbsp;:</span>
        <span class="red">{{item.money}}</span>
      </li>
      <li class="t-head_tit flex">
        <span>充值说明&nbsp;:</span>
        <span>{{item.remark}}</span>
      </li>
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
  name: "myWalletPage",
  components: {
    maskMd,
    closeMd
  },
  data() {
    return {
      backImg: require("../../imgs/backImg1.png"),
      moreImg: require("../../imgs/more.png"),
      vouchersIcon: require("../../imgs/vouchersIcon.png"),
      walletIcon: require("../../imgs/walletIcon.png"),
      mxIcon: require("../../imgs/mxIcon.png"),
      show_mask: false,
      username: "",
      money: 0,
      detail: []
    };
  },
  beforeCreate: function() {},
  created: function() {
    this.username = window.localStorage.getItem("username");
  },

  beforeMount: function() {},
  mounted: function() {
    var that = this;
    if (window.localStorage.getItem("username") == "") {
					//                  console.log("没有用户名，没有登录，要去mine页面");

					that.$confirm("需要先登陆", '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						showCancelButton: false,
						showClose: false,
						closeOnClickModal: false,
						type: 'warning',
						center: true
					}).then(() => {
						that.$router.push({
							name: "mine"
						})
					}).catch(() => {

                    });
            }else{
    
    document
      .getElementById("myWalletPage")
      .addEventListener("scroll", that.handleScroll, true); // 监听（绑定）滚轮滚动事件

    var myWallet_params = {
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
        url: "/Wap/Api/myWallet",
        data: QS.stringify(mdjm_fun(myWallet_params))
      })
      .then(function(response) {
        console.log(response);
        if (response.data.status == 0) {
          //请求不成功
        } else if (response.data.status == 1) {
          that.detail=response.data.data.rechargeList
          that.money=response.data.data.ptb
          //请求成功
          // console.log(response.data.data);
        }
      })
      .catch(function(error) {
        //   console.log(error);
      });
    }
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {
    // document
    //   .getElementById("indexPage")
    //   .removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
  },
  // created: function() {
  // 	this.username = window.localStorage.getItem("username");
  // },
  methods: {
    clickMask: function() {
      var that = this;
      that.show_mask = false;
    },
    intoMyVouchersPage: function() {
      var that = this;
      that.$router.push({
        name: "MyVouchers"
      });
    },

    intoMyrecharge: function() {
      var that = this;
      that.$router.push({
        name: "Recharge"
      });
      // if (window.localStorage.getItem("username") == "") {
      // 	this.$confirm('请先登录？','提示',{
      // 				confirmButtonText: '确定',
      // 				cancelButtonText: '取消',
      // 				type: 'warning'
      // 			}).then(()=>{
      // 				that.$router.push({
      // 					name: "mine"
      // 				})
      // 			}).catch(()=>{

      // 			})
      // }else{
      // 	that.$router.push({
      // 		name: "Recharge"
      // 		})
      // }

      // var checkUserLogin_params = {
      // 	device: that.$store.getters.is_android ? "android" : "ios",
      // 	time: Date.parse(new Date()) + ""
      // };
      // function mdjm_fun(params) {
      // 	var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
      // 	params["access"] = access;
      // 	//   console.log(params);
      // 	return params;
      // }
      // that
      // 	.$axios({
      // 		method: "post",
      // 		url: "/Wap/api/checkUserLogin",
      // 		data: QS.stringify(mdjm_fun(checkUserLogin_params))
      // 	})
      // 	.then(function(response) {
      // 		console.log(response.data);
      // if(response.data.status == 0){
      // 	that.$confirm('请先登录？','提示',{
      // 		confirmButtonText: '确定',
      // 		cancelButtonText: '取消',
      // 		type: 'warning'
      // 	}).then(()=>{
      // 		that.$router.push({
      // 			name: "mine"
      // 		})
      // 	}).catch(()=>{

      // 	})
      // 		}else if(response.data.status == 1){
      // 			window.localStorage.setItem(
      // 				"username",
      // 				response.data.data.username
      // 			);
      // 			if(window.localStorage.getItem("username") !== "") {
      //
      // 			}

      // 		}
      // 	})
      // 	.catch(function(error) {
      // 		//   console.log(error);
      // 	});

      // that.$router.push({
      // 	name: "Recharge"
      // })
      // if(this.passwords.length==0||this.usernames.length==0||!(/^1[3456789]\d{9}$/.test(this.usernames))){
      // this.$alert('请输入正确的用户名或密码')
      // }else{
      // 	this.$confirm('是否确认登录？','提示',{
      // 		confirmButtonText: '确定',
      // 		cancelButtonText: '取消',
      // 		type: 'warning'
      // 	}).then(()=>{

      // 	}).catch(()=>{

      // 	})
      // }
      // })
    },
    // intoMinePage: function() {
    // 	var that = this;
    // 	that.$confirm('确定去登录么？', '提示', {
    // 		confirmButtonText: '确定',
    // 		cancelButtonText: '取消',
    // 		showCancelButton: true,
    // 		showClose: false,
    // 		closeOnClickModal: false,
    // 		type: 'warning',
    // 		center: true
    // 	}).then(() => {
    // 		that.$router.push({
    // 			name: "mine"
    // 		})
    // 	}).catch(() => {

    // 	});
    // },
    back: function() {
      var that = this;
      that.$router.push({
        name: "mine"
      });
    },
    backMinePage: function() {
      var that = this;
      that.$router.push({
        name: "mine"
      });
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

<style lang="less" scoped>
#myWalletPage {
  width: 100%;
  padding-top: 1rem;
  .t_head {
    border-bottom: 1px #ccc solid;
    border-top: 1px #ccc solid;
    font-size: 0.24rem;
    margin-top: 0.5rem;
    padding: 0.2rem;
    .t-head_tit {
      span {
        margin-left: 0.2rem;
      }
      .left {
        margin-left: 0.5rem;
      }
      .red {
        color: red;
      }
    }
  }

  .tit_box {
    width: 100%;
    height: 0.85rem;
    background: #f5f5f5;

    span {
      font-size: 0.3rem;
      color: #000000;
      margin-left: 0.2rem;
      display: inline-block;
    }

    img {
      width: 0.35rem;
      height: auto;
    }
  }

  .vouchers_box {
    width: 100%;
    height: 1.3rem;
    border-bottom: 2px solid #f5f5f5;

    .vouchersIcon {
      width: 1rem;
      height: auto;
      left: 0.35rem;
    }

    .vouchersTit {
      font-size: 0.3rem;
      color: #333333;
      font-weight: 600;
      left: 1.75rem;
    }

    .moreImg {
      width: 0.35rem;
      height: auto;
      right: 0.35rem;
    }
  }

  .wallet_box {
    width: 100%;
    height: 1.3rem;

    .vouchersIcon {
      width: 1rem;
      height: auto;
      left: 0.35rem;
    }

    .vouchersTit {
      font-size: 0.3rem;
      color: #333333;
      font-weight: 600;
      left: 1.75rem;
    }

    .walletNum {
      font-size: 0.3rem;
      color: #ffa800;
      left: 3.3rem;
    }

    .fillBtn {
      height: 0.45rem;
      border: 0.02rem solid #ffd8ac;
      background: #ff7707;
      border-radius: 3px;
      color: #ffffff;
      font-size: 0.28rem;
      text-align: center;
      display: inline-block;
      padding: 0 0.1rem;
      right: 0.35rem;
    }
  }

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

    span {
      font-size: 0.34rem;
      color: #333333;
    }
  }
}
</style>
<style>
.el-message-box {
  width: 5rem;
}
</style>

