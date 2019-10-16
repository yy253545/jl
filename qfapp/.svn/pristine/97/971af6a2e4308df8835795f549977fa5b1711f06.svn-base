<template>
    <div id="loginMd" class="posFix cenMid">
        <div class="wh posRel">
            <img :src="loginBgImg" alt class="loginBgImg posAbs wh">
            <span class="tit posAbs">登录</span>
            <form action class="posAbs">
                <div class="iptBox userNameIpt flex flexSta">
                    <img :src="userNameIptIcon" alt class="iptIcon">
                    <input type="text" name="userVal" placeholder="请输入手机号或账号" v-model="userVal">
                </div>
                <div class="iptBox passwordIpt flex flexSta">
                    <img :src="passwordIptIcon" alt class="iptIcon">
                    <input type="password" name="passwordVal" placeholder="请输入密码" v-model="passwordVal">
                </div>
                <div class="yzmBox flex flexBet">
                    <input type="text" name="yzmVal" placeholder="请输入验证码" v-model="yzmVal">
                    <!-- <input
            type="button"
            id="code"
            @click="createCode"
            class="identifyBox"
            v-model="checkCode"
          >-->
                    <div class="identifyBox flex flexAro" @click="refreshCode">
                        <!-- <code :identifyCode="identifyCode" :contentWidth="contentWidth" :contentHeight="contentHeight" :dotColorMax="dotColorMax" :dotColorMin="dotColorMin" :lineColorMin="lineColorMin" :lineColorMax="lineColorMax" :colorMin="colorMin" :colorMax="colorMax" :backgroundColorMin="backgroundColorMin" :backgroundColorMax="backgroundColorMax" :colorMin="colorMin" :fontSizeMax="fontSizeMax" :fontSizeMin="fontSizeMin" :fontSizeMax="fontSizeMax" :backgroundColorMin="backgroundColorMin" :backgroundColorMax="backgroundColorMax"></code> -->
                        <codecanvas :identifyCode="identifyCode"></codecanvas>
                    </div>
                </div>
                <div class="btnBox posRel">
                    <img :src="loginBtnBg" alt class="iptIcon posAbs wh">
                    <span class="posAbs cenMid" @click="loginBtn">登录</span>
                </div>
            </form>
            <div class="botBox flex flexBet posAbs">
                <div class="flex flexSta" @click="findPassWord">
                    <span>忘记密码?</span>
                </div>
                <div class="flex flexEnd" @click="intoReg">
                    <span>还没有账号?</span>
                    <span class="triangle_border_right"></span>
                    <span class="intoReg">立即注册</span>
                </div>
            </div>
            <closeMd @clickMask="clickMask"></closeMd>
        </div>
    </div>
</template>

<script>
    import codecanvas from "./commons/code";
    import closeMd from "./closeMd";
    import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
    import utils from "../config/common.js";
    export default {
        name: "loginMd",
        components: {
            codecanvas,
            closeMd
        },
        data() {
            return {
                loginBgImg: require("../imgs/loginBg_img.png"),
                userNameIptIcon: require("../imgs/userNameIptIcon.png"),
                passwordIptIcon: require("../imgs/passwordIptIcon.png"),
                loginBtnBg: require("../imgs/loginBtnBg.png"),
                userVal: "",
                passwordVal: "",
                yzmVal: "",
                checkCode: "QFYX",
                identifyCodes: "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                identifyCode: ""
                //   fontSizeMin: "",
                //   fontSizeMax: "",
                //   backgroundColorMin: "",
                //   backgroundColorMax: "",
                //   colorMin: "",
                //   fontSizeMax: "",
                //   backgroundColorMin: "",
                //   backgroundColorMax: "",
                //   colorMin: "",
                //   colorMax: "",
                //   lineColorMin: "",
                //   lineColorMax: "",
                //   dotColorMin: "",
                //   dotColorMax: "",
                //   contentWidth: "",
                //   contentHeight: "",
            };
        },
        beforeCreate: function() {},
        created: function() {},
        beforeMount: function() {},
        mounted: function() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        beforeUpdate: function() {},
        updated: function() {},
        beforeDestroy: function() {},
        destroyed: function() {},
        methods: {
            clickMask: function() {
                var that = this;
                that.$emit("clickMask");
            },
            findPassWord: function() {
                var that = this;
                that.$emit("findPassWord");
            },
            loginBtn: function() {
                var that = this;
                console.log(that.userVal, that.passwordVal, that.yzmVal);
                if(that.userVal == "" || that.passwordVal == "" || that.yzmVal == "") {
                    //有空的数据
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
                } else if(that.yzmVal.toLowerCase() != that.identifyCode.toLowerCase()) {
                    //没有空的数据;但是验证码错误了;
                    that.$confirm("验证码错误，请重新填写", '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        showCancelButton: false,
						showClose: false,
						closeOnClickModal: false,
                        type: 'warning',
                        center: true
                    }).then(() => {
						that.refreshCode();
                    }).catch(() => {

                    });
                } else {
                    //都是正确的
                    // console.log("都是正确的");
                    var is_android = that.$store.getters.is_android;
                    var device = is_android ? "android" : "ios";
                    var value = that.$store.getters.mdVal;
                    var login_params = {
                        device: device,
                        time: Date.parse(new Date()) + "",
                        username: that.userVal + "",
                        password: that.passwordVal + ""
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
                            url: "/Wap/api/login",
                            data: QS.stringify(mdjm_fun(login_params))
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
                                var res_data = response.data.data;
                                console.log(res_data);
                                window.localStorage.setItem("username", res_data.username);
                                window.localStorage.setItem("isLoginShow", false);
                                that.$emit("loginSuccess");
                                that.$store.dispatch("loginSuccess");
                            }
                        })
                        .catch(function(error) {
                            // console.log(error);
                        });
                }

                //              window.localStorage.setItem("username", '测试账号');
                //              window.localStorage.setItem("isLoginShow", false);
                //              console.log(window.localStorage.getItem('username'));
                //              that.$emit("loginSuccess");
                //              that.$store.dispatch("loginSuccess");
            },
            randomNum: function(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            intoReg: function() {
                var that = this;
                that.$emit("regShow");
            },
            refreshCode: function() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode: function(o, l) {
                for(let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                    ];
                }
                //   console.log(this.identifyCode);
            }
        },
        computed: {}
    };
</script>
<style scoped lang="less">
    #loginMd {
        width: 6rem;
        height: 6.32rem;
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
                margin: 0.4rem auto 0rem;
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
            .yzmBox {
                width: 5.1rem;
                height: 0.7rem;
                margin: 0.4rem auto 0rem;
                input {
                    width: 2.2rem;
                    height: 0.65rem;
                    outline: none;
                    border: none;
                    background: #f6f6f6;
                    font-size: 0.28rem;
                    border: 0.02rem solid #ffbf00;
                    text-align: center;
                }
                .identifyBox {
                    width: 2.2rem;
                    height: 0.65rem;
                    border: 0.02rem solid #bbbbbb;
                }
            }
            .iptBox {
                width: 5.1rem;
                height: 0.7rem;
                border: 0.02rem solid #ffbf00;
                margin: 0.45rem auto 0rem;
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
            height: 0.8rem;
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