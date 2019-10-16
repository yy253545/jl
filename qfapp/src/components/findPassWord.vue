<template>
    <div id="findPassWord" class="posFix cenMid">
        <div class="wh posRel">
            <img :src="loginBgImg" alt class="loginBgImg posAbs wh">
            <span class="tit posAbs">找回密码</span>
            <form action class="posAbs">
                <div class="iptBox userNameIpt flex flexSta">
                    <img :src="userNameIptIcon" alt class="iptIcon">
                    <input type="text" name="telVal" placeholder="请输入手机号" v-model="telVal">
                </div>
                <div class="yzmBox flex flexBet">
                    <input type="text" class="yzmVal" name="yzmVal" placeholder="请输入验证码" v-model="yzmVal">
                    <input class="getYzm" ref="getYzm" @click="getYzmBtn" v-model="getYzm">
                </div>
                <div class="iptBox userNameIpt flex flexSta">
                    <img :src="passwordIptIcon" alt class="iptIcon">
                    <input type="password" name="newPassWord" placeholder="请输入密码" v-model="newPassWord">
                </div>
                <div class="iptBox userNameIpt flex flexSta">
                    <img :src="passwordIptIcon" alt class="iptIcon">
                    <input type="password" name="renewPassWord" placeholder="请确认密码" v-model="renewPassWord">
                </div>
                <div class="btnBox posRel">
                    <img :src="loginBtnBg" alt class="iptIcon posAbs wh">
                    <span class="posAbs cenMid" @click="findPassWord">提交</span>
                </div>
            </form>
            <div class="botBox flex flexEnd posAbs">
                <span>记得密码?</span>
                <span class="triangle_border_right"></span>
                <span class="intoReg" @click="loginShow">立即登录</span>
            </div>
            <closeMd @clickMask="clickMask"></closeMd>
        </div>
    </div>
</template>

<script>
    import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
    import utils from "../config/common.js";
    import closeMd from "./closeMd";

    export default {
        name: "findPassWord",
        components: {
            closeMd
        },

        data() {
            return {
                loginBgImg: require("../imgs/loginBg_img.png"),
                userNameIptIcon: require("../imgs/userNameIptIcon.png"),
                passwordIptIcon: require("../imgs/passwordIptIcon.png"),
                loginBtnBg: require("../imgs/loginBtnBg.png"),
                telVal: "",
                newPassWord: "",
                renewPassWord: "",
                getYzm: "获取验证码",
                yzmVal: ""
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
            clickMask: function() {
                var that = this;
                that.$emit("clickMask");
            },
            getYzmBtn: function() {
                var that = this;
                //   console.log("获取验证码");
                var username = that.telVal;
                if(username && utils.is_tel(username) == 1) {
                    var is_android = that.$store.getters.is_android;
                    var device = is_android ? "android" : "ios";
                    var value = that.$store.getters.mdVal;

                    var getYzm_params = {
                        device: device,
                        time: Date.parse(new Date()) + "",
                        mobile: that.telVal + "",
                        retrieve: "1"
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
                            url: "/Wap/api/sendPhone",
                            data: QS.stringify(mdjm_fun(getYzm_params))
                        })
                        .then(function(response) {
                            // console.log(response.data);
                            if(response.data.status == 0) {
                                //请求不成功
                                //   console.log("请求不成功");
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
                            } else if(response.data.status == 1) {
                                //请求成功
                                that.$confirm(response.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    showCancelButton: false,
									showClose: false,
									closeOnClickModal: false,
                                    type: 'info',
                                    center: true
                                }).then(() => {
                                    that.$refs.getYzm.disabled = true;
                                    that.$refs.getYzm.style.backgroundColor = "#f5f5f5";
                                    that.$refs.getYzm.style.color = "#000000";
                                    var num = 120;
                                    var time = setInterval(function() {
                                        num -= 1;
                                        that.getYzm = num;
                                        if(num == 0) {
                                            clearInterval(time);
                                            that.getYzm = "点击获取验证码";
                                            that.$refs.getYzm.disabled = false;
                                            that.$refs.getYzm.style.backgroundColor = "#ffbf00";
                                            that.$refs.getYzm.style.color = "#ffffff";
                                        }
                                    }, 1000);
                                }).catch(() => {

                                });
                            }
                        })
                        .catch(function(error) {
                            // console.log(error);
                        });
                } else {
                    that.$confirm("请准确填写您的手机号", '提示', {
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
                }
            },
            loginShow: function() {
                var that = this;
                that.$emit("loginShow");
            },
            findPassWord: function() {
                var that = this;
                //   console.log(that.telVal, that.newPassWord, that.renewPassWord,that.yzmVal);
                if(
                    that.telVal == "" ||
                    that.newPassWord == "" ||
                    that.renewPassWord == "" ||
                    that.yzmVal == ""
                ) {
                    //有空的数据
                    // console.log("有的数据是空的不能提交");
                    that.$confirm("请填写您的所有信息", '提示', {
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
                } else if(that.newPassWord !== that.renewPassWord) {
                    //手机号格式不对
                    // console.log("两次密码不一致");
                    that.$confirm("两次密码不一致,请重新填写", '提示', {
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
                } else {
                    //都是正确的
                    // console.log("都是正确的");
                    var is_android = that.$store.getters.is_android;
                    var device = is_android ? "android" : "ios";
                    var value = that.$store.getters.mdVal;
                    var findPass_params = {
                        device: device,
                        time: Date.parse(new Date()) + "",
                        phone: that.telVal + "",
                        password: that.newPassWord + "",
                        repass: that.renewPassWord + "",
                        mobileCode: that.yzmVal + "",
                    };

                    function mdjm_fun(params) {
                        var access = that.$mdjm(JSON.stringify(params) + value);
                        params["access"] = access;
                        //   console.log(params);
                        return params;
                    }
                    this.$axios({
                            method: "post",
                            url: "/Wap/api/retPass",
                            data: QS.stringify(mdjm_fun(findPass_params))
                        })
                        .then(function(response) {
                            console.log(response.data);
                            if(response.data.status == 0) {
                                //请求不成功
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
                            } else if(response.data.status == 1) {
                                //请求成功
                                var res_data = response.data.data;
                                //   console.log(res_data);
                                that.$emit("findPassSuccess");
                            }
                        })
                        .catch(function(error) {
                            // console.log(error);
                        });
                }
            }
        },
        computed: {}
    };
</script>
<style scoped lang="less">
    #findPassWord {
        width: 6rem;
        height: 6.65rem;
        z-index: 1500;
        .tit {
            width: 100%;
            font-size: 0.35rem;
            line-height: 0.75rem;
            text-align: center;
            border-bottom: 0.02rem solid #e6e6e6;
            color: #ffbf00;
            font-weight: 600;
            top: 0.25rem;
        }
        form {
            width: 100%;
            height: 4.55rem;
            top: 1rem;
            .btnBox {
                width: 4.88rem;
                height: 0.7rem;
                margin: 0.3rem auto 0rem;
                span {
                    width: 100%;
                    height: 100%;
                    line-height: 0.7rem;
                    font-size: 0.35rem;
                    color: #fff;
                    font-weight: 600;
                    background: none;
                    text-align: center;
                }
            }
            .sureBindTel {
                font-size: 0.24rem;
                line-height: 0.5rem;
                color: #000;
                width: 100%;
                text-align: right;
                padding: 0 0.4rem;
            }
            .yzmBox {
                width: 5.1rem;
                height: 0.7rem;
                margin: 0.28rem auto 0rem;
                .yzmVal {
                    width: 2.45rem;
                    height: 0.65rem;
                    outline: none;
                    border: none;
                    background: #f6f6f6;
                    font-size: 0.28rem;
                    border: 0.02rem solid #ffbf00;
                    text-align: center;
                }
                .getYzm {
                    width: 2rem;
                    height: 0.65rem;
                    border: 0.02rem solid #ffbf00;
                    background: #ffbf00;
                    font-size: 0.28rem;
                    text-align: center;
                    color: #fff;
                    line-height: 0.65rem;
                }
            }
            .iptBox {
                width: 5.1rem;
                height: 0.7rem;
                border: 0.02rem solid #ffbf00;
                margin: 0.3rem auto 0rem;
                background: #f6f6f6;
                .iptIcon {
                    width: auto;
                    height: 0.4rem;
                    margin-left: 0.3rem;
                }
                input {
                    width: 4.2rem;
                    height: 100%;
                    outline: none;
                    border: none;
                    background: #f6f6f6;
                    font-size: 0.28rem;
                    margin-left: 0.3rem;
                }
            }
        }
        .botBox {
            width: 100%;
            height: 0.6rem;
            bottom: 0rem;
            padding: 0 0.4rem;
            span {
                font-size: 0.26rem;
                color: #000;
                margin: 0 0.02rem;
            }
            .triangle_border_right {
                width: 0;
                height: 0;
                border-width: 6px 0 6px 6px;
                border-style: solid;
                border-color: transparent transparent transparent #ffbf00;
                /*透明 透明 透明 灰*/
                position: relative;
            }
            .intoReg {
                color: #ffbf00;
            }
        }
    }
</style>