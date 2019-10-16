<template>
    <div class="recharge">
        <div class="head">
            <img :src="after" alt="" @click="back">
            <div class="title">充值</div>
            <div class="right"></div>
        </div>
        <ul class="pay">
            <li>账号&nbsp;:&nbsp;<span class="user" @click="win">{{username}}</span></li>
            <li>清风币&nbsp;:&nbsp;<span class="view_money">{{moneys}}></span></li>
            <li>选择充值金额&nbsp;:<span class="unit">&nbsp;充值金额&nbsp;(单位:&nbsp;元)</span>
                <ul class="money">
                    <div :class="activeClass == index ? 'active':''" @click="getItem(index)" v-for="(item,index) in money" :key="index">{{item.price}}</div>
                    <input type="text" class="other" placeholder="自定义:1~50000" v-model="custom" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d]/g,'') ">
                </ul>
                <div class="sum">可获得&nbsp;:&nbsp;<span class="num">{{number}}</span><span class="name">清风币</span></div>
            </li>
            <li>
                <div>选择支付方式&nbsp;:</div>
                <div class="alipay" @click="alipays"><div><img :src="alipay" alt="">支付宝&nbsp;(推荐)</div><img :src="into" alt="" class="into"></div>
            </li>
            <li>
                <div class="wx" @click="wxpays"><div><img :src="wx" alt="" >微信支付</div><img :src="into" alt="" class="into"></div>
            </li>
        </ul>
    </div>
</template>
<script>
import maskMd from '../../components/maskMd';
	import closeMd from "../../components/closeMd";
	import utils from "../../config/common.js";
	import axios from "axios";
	import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
	import vueResource from "vue-resource";
	import Vue from "vue";
export default {
    
    name: "Recharge",
    data(){
        return {
            after:require("../../imgs/after.png"),
            alipay:require("../../imgs/alipay.png"),
            wx:require("../../imgs/wx.png"),
            into:require("../../imgs/into.png"),
            number:0,
            activeClass:-1,
            custom:"",
            money:[
                {price:50},
                {price:100},
                {price:500},
                {price:1000},
                {price:2000},
                {price:5000}
            ],
            username:"",
            moneys:1
        }
    },
    created: function() {
        this.username = window.localStorage.getItem("username");
    },
    mounted(){
         var that = this;
         var recharge_params = {
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
        data: QS.stringify(mdjm_fun(recharge_params))
      })
      .then(function(response) {
        console.log(response);
        if (response.data.status == 0) {
          //请求不成功
        } else if (response.data.status == 1) {
          that.moneys=response.data.data.ptb
          //请求成功
          // console.log(response.data.data);
        }
      })
      .catch(function(error) {
        //   console.log(error);
      });
    },
    methods:{
        back() {
            window.history.length>1?this.$router.go(-1):this.$router.push("/")
        },
        getItem(index){
            this.activeClass=index
            this.number=this.money[index].price
        },
        
        alipays(){
            var that = this;
                var getGiftPageListParams = {
				device: that.$store.getters.is_android ? "android" : "ios",
				time: Date.parse(new Date()) + "",
                amount:that.number + "",
                paytype:"alipay"
                
			};
            console.log(getGiftPageListParams)
                    // console.log(that.paytype)
			function mdjm_fun(params) {
				var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
				params["access"] = access;
				return params;
            };
          
                that
				.$axios({
					method: "post",
					url: "/Wap/Api/pay",
					data: QS.stringify(mdjm_fun(getGiftPageListParams))
                })
                
				.then(function(response) {
                    if(response.data.status==0){
                         that.$confirm(response.data.msg, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						showCancelButton: false,
						showClose: false,
						closeOnClickModal: false,
						type: 'warning',
						center: true
                        }).then(() => {
                            
                        }).catch(() => {

                        });
                    }else if(response.data.status==1){
                        console.log(response.data.data)
                        console.log(response.data.status)
                        document.write(response.data.data);
                        document.forms['alipaysubmit'].submit();
                        
                        return;
                    }
				})
				.catch(function(error) {
					  console.log(error);
				});
        },
        wxpays(){
            var that = this
           
           var getGiftPageListParams = {
				device: that.$store.getters.is_android ? "android" : "ios",
				time: Date.parse(new Date()) + "",
                amount:that.number+"",
                paytype:"wxpay"
			};
            console.log(getGiftPageListParams)
                    // console.log(that.paytype)
			function mdjm_fun(params) {
				var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
				params["access"] = access;
				return params;
			};
			that
				.$axios({
					method: "post",
					url: "/Wap/Api/pay",
					data: QS.stringify(mdjm_fun(getGiftPageListParams))
				})
				.then(function(response) {
                    if(response.data.status==0){
                         that.$confirm(response.data.msg, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						showCancelButton: false,
						showClose: false,
						closeOnClickModal: false,
						type: 'warning',
						center: true
                        }).then(() => {
                            
                        }).catch(() => {

                        });
                    }else if(response.data.status==1){
                         console.log(response.data.data)
                        window.location.href =response.data.data;
                        return;
                    }
                })
				.catch(function(error) {
                    
					  console.log(error);
				});
        },
        
    },
   
    watch:{
           custom(newval){
               if(isNaN(this.custom)){
                   this.number=0
               }else if(this.custom>=0&&this.custom<=50000){
                   this.number=this.custom
               }else{
                   this.custom=50000
                   this.number=50000
               }
           } 
        }
        
}
</script>
<style lang="less" scoped>
    .recharge{
        .head{
            height:0.88rem;
            background: #ffa000;
            display: flex;
            justify-content:space-between;
            align-items: center;
            img{
                width:0.88rem;
                height:0.88rem;
            }
            .title{
                color:#fff;
                font-size: 0.36rem;
            }
            .right{
                width:0.88rem;
            }
        }
        .pay{
            background: #fff;
            li{
                border-bottom: 0.01rem #d6d6d6 solid;
                padding: 0.3rem 0 0.3rem 0.24rem;
                color:#1a1a1a;
                font-size: 0.3rem;
                .money{
                    display: flex;
                    justify-content:space-around;
                    flex-wrap:wrap;
                    align-items: center;
                    margin-top: 0.3rem;
                    div{
                        width: 2rem;
                        height:0.8rem;
                        border: 2px #ffa000 solid;
                        border-radius: 0.1rem;
                        justify-content:center;
                        display: flex;
                        align-items: center;
                        font-size: 0.36rem;
                        color:#ffa000;
                        margin-bottom: 0.3rem;
                    }
                    .active{
                        background: #ffa000;
                        color:#fff;
                    }
                     input::-webkit-input-placeholder {
                        text-align: center;
                        font-size: 0.24rem;
                        color:#999999;
                    }
                    .other{
                        width: 6.8rem;
                        height: 0.8rem;
                        border:2px #ffa000 solid;
                        font-size: 0.24rem;
                    }
                }
                .sum{
                    margin-top: 0.6rem;
                    margin-bottom: 0.3rem;
                    display: flex;
                    color: #1a1a1a;
                    font-size: 0.3rem;
                    .num{
                        font-size: 0.36rem;
                        color:#ffa000;
                    }
                    .name{
                        font-size: 0.28rem;
                        color:#333333;
                    }
                }
                .unit{
                    color: #ff0000;
                    font-size: 0.22rem;
                    display: inline;
                }
                .user{
                    font-size: 0.28rem;
                    display: inline;
                }
                .view_money{
                     font-size: 0.36rem;
                     color:#ffa000;
                     display: inline;
                }
                .view_name{
                   font-size: 0.28rem;
                   display: inline;
                }
                .alipay,.wx{
                    font-size: 0.3rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #333333;
                    margin-top: 0.6rem;
                    img{
                        width: 0.46rem;
                        height:0.46rem;
                        margin-right: 0.14rem;
                    }
                    .into{
                        width: 0.65rem;
                        height:0.9rem;

                    }
                    div{
                        display: flex;
                    }
                }
                .wx{
                    margin-top:0;
                    .into{
                        width: 0.65rem;
                        height:0.9rem;
                    }
                }
            }
        }
    }
    
</style>
<style>
.el-message-box {
  width: 5rem;
}
</style>


