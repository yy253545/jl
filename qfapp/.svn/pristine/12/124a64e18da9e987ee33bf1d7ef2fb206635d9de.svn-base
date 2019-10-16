<template>
    <div id="regMd" class="posFix cenMid">
        <div class="wh posRel">
            <img :src="loginBgImg" alt class="loginBgImg posAbs wh">
            <span class="tit posAbs">注册账号</span>
            <form action class="posAbs">
                <div class="iptBox userNameIpt flex flexSta">
                    <img :src="userNameIptIcon" alt class="iptIcon">
                    <input type="number" name="userVal" placeholder="请输入手机号" v-model="userVal">
                </div>
                <div class="iptBox passwordIpt flex flexSta">
                    <img :src="passwordIptIcon" alt class="iptIcon">
                    <input type="password" name="passwordVal" placeholder="请输入密码" v-model="passwordVal">
                </div>
                <div class="iptBox passwordIpt flex flexSta">
                    <img :src="passwordIptIcon" alt class="iptIcon">
                    <input type="password" name="passwordTwiceVal" placeholder="请再次输入密码" v-model="passwordTwiceVal">
                </div>
                <div class="yzmBox flex flexBet">
                    <input type="text" class="yzmVal" name="yzmVal" placeholder="请输入验证码" v-model="yzmVal">
                    <input class="getYzm" ref="getYzm" @click="getYzmBtn" v-model="getYzm">
                </div>
                <div class="messageBox flex flexSta" @click="agreement">
                    <img :src="mesIcon" alt>
                    <div class="flex flexSta">
                        阅读并同意
                        <span>《用户协议》</span>及
                        <span>《隐私协议》</span>
                    </div>
                </div>
                <div class="btnBox posRel">
                    <img :src="loginBtnBg" alt class="iptIcon posAbs wh">
                    <span class="posAbs cenMid" @click="regBtn">注册</span>
                </div>
            </form>
            <div class="botBox flex flexEnd posAbs" @click="loginShow">
                <span>已拥有账号？</span>
                <span class="triangle_border_right"></span>
                <span class="intoReg">立即登录</span>
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
        name: "regMd",
        components: {
            closeMd
        },
        data() {
            return {
                loginBgImg: require("../imgs/loginBg_img.png"),
                userNameIptIcon: require("../imgs/userNameIptIcon.png"),
                passwordIptIcon: require("../imgs/passwordIptIcon.png"),
                loginBtnBg: require("../imgs/loginBtnBg.png"),
                mesIcon: require("../imgs/messageIcon.png"),
                getYzm: "获取验证码",
                userVal: "",
                passwordVal: "",
                passwordTwiceVal: "",
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
            regBtn: function() {
                var that = this;
                //   console.log(
                //     that.userVal,
                //     that.passwordVal,
                //     that.passwordTwiceVal,
                //     that.yzmVal
                //   );

                if(
                    that.userVal == "" ||
                    that.passwordVal == "" ||
                    that.passwordTwiceVal == "" ||
                    that.yzmVal == "" ||
                    !utils.is_tel(that.userVal)
                ) {
                    //有空的数据
                    that.$confirm("请准确填写您的所有信息", '提示', {
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
                    //没有空的数据,做请求
                    var is_android = that.$store.getters.is_android;
                    var device = is_android ? "android" : "ios";
                    var value = that.$store.getters.mdVal;

                    var reg_params = {
                        device: device,
                        time: Date.parse(new Date()) + "",
                        userName: that.userVal + "",
                        password: that.passwordVal + "",
                        repass: that.passwordTwiceVal + "",
                        mobileCode: that.yzmVal + ""
                    };

                    function mdjm_fun(params) {
                        var access = that.$mdjm(JSON.stringify(params) + value);
                        params["access"] = access;
                        //   console.log(params);
                        return params;
                    }
                    that.$axios({
                            method: "post",
                            url: "/Wap/api/register",
                            data: QS.stringify(mdjm_fun(reg_params))
                        })
                        .then(function(response) {
                            // console.log(response.data);
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

                                that.$confirm('注册成功', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    showCancelButton: false,
									showClose: false,
									closeOnClickModal: false,
                                    type: 'info',
                                    center: true
                                }).then(() => {
                                    window.localStorage.setItem("isLoginShow", false);
                                    that.$emit("regSuccess");
                                }).catch(() => {

                                });
                            }
                        })
                        .catch(function(error) {
                            // console.log(error);
                        });
                }
            },
            loginShow: function() {
                var that = this;
                that.$emit("loginShow");
            },
            getYzmBtn: function() {
                var that = this;
                //   console.log("获取验证码");
                var username = that.userVal;
                if(username && utils.is_tel(username) == 1) {
                    var is_android = that.$store.getters.is_android;
                    var device = is_android ? "android" : "ios";
                    var value = that.$store.getters.mdVal;

                    var getYzm_params = {
                        device: device,
                        time: Date.parse(new Date()) + "",
                        mobile: that.userVal + "",
                        retrieve: "0"
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
                    that.$confirm("请填写您的手机号", '提示', {
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
            agreement: function() {
                var that = this;
                window.location.href = "http://www.520cai.com/public/agreement.html";
            }
        },
        computed: {}
    };
</script>
<style scoped lang="less">
    #regMd {
        width: 6rem;
        height: 6.82rem;
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
            .messageBox {
                width: 100%;
                height: 0.6rem;
                margin: 0 auto;
				padding: 0 0.1rem;
                img {
                    width: 0.3rem;
                    height: auto;
                    margin-right: 0.15rem;
                }
                div {
                    font-size: 0.28rem;
                    color: #000;
                    span {
                        color: #ffbf00;
						font-size: 0.28rem;
                    }
                }
            }
            .btnBox {
                width: 4.88rem;
                height: 0.7rem;
                margin: 0rem auto 0rem;
                span {
                    width: 100%;
                    height: 100%;
                    font-size: 0.35rem;
                    line-height: 0.7rem;
                    text-align: center;
                    color: #fff;
                    font-weight: 600;
                    background: none;
                }
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
                margin: 0.28rem auto 0rem;
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