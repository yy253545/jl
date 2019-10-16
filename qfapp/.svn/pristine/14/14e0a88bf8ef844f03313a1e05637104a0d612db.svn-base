<template>
    <div id="updatePassWord" class="posFix cenMid">
        <div class="wh posRel">
            <img :src="loginBgImg" alt class="loginBgImg posAbs wh">
            <span class="tit posAbs">修改密码</span>
            <form action class="posAbs">
                <div class="iptBox userNameIpt flex flexSta">
                    <img :src="userNameIptIcon" alt class="iptIcon">
                    <input type="password" name="oldPassWord" placeholder="请输入原始密码" v-model="oldPassWord">
                </div>
                <div class="iptBox userNameIpt flex flexSta">
                    <img :src="userNameIptIcon" alt class="iptIcon">
                    <input type="password" name="newPassWord" placeholder="请输入新密码" v-model="newPassWord">
                </div>
                <div class="iptBox userNameIpt flex flexSta">
                    <img :src="userNameIptIcon" alt class="iptIcon">
                    <input type="password" name="renewPassWord" placeholder="请确认新密码" v-model="renewPassWord">
                </div>
                <span class="sureBindTel" @click="intoFindPassWord">忘记密码？</span>
                <div class="btnBox posRel">
                    <img :src="loginBtnBg" alt class="iptIcon posAbs wh">
                    <span class="posAbs cenMid" @click="updatePassWord">提交</span>
                </div>
            </form>
            <closeMd @clickMask="clickMask"></closeMd>
        </div>
    </div>
</template>

<script>
    import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
    import utils from "../config/common.js";
    import closeMd from "./closeMd";

    export default {
        name: "updatePassWord",
        components: {
            closeMd
        },
        data() {
            return {
                loginBgImg: require("../imgs/loginBg_img.png"),
                userNameIptIcon: require("../imgs/passwordIptIcon.png"),
                loginBtnBg: require("../imgs/loginBtnBg.png"),
                oldPassWord: "",
                newPassWord: "",
                renewPassWord: ""
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
            intoFindPassWord: function() {
                var that = this;
                // console.log('转到找回密码页面;');
                that.$emit("intoFindPassWord");
            },
            updatePassWord: function() {
                var that = this;
                //   console.log(that.oldPassWord, that.newPassWord, that.renewPassWord);
                if(
                    that.oldPassWord == "" ||
                    that.newPassWord == "" ||
                    that.renewPassWord == ""
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
                    var updatePass_params = {
                        device: device,
                        time: Date.parse(new Date()) + "",
                        oldpass: that.oldPassWord + "",
                        password: that.newPassWord + "",
                        repass: that.renewPassWord + ""
                    };

                    function mdjm_fun(params) {
                        var access = that.$mdjm(JSON.stringify(params) + value);
                        params["access"] = access;
                        //   console.log(params);
                        return params;
                    }
                    this.$axios({
                            method: "post",
                            url: "/Wap/api/updatePass",
                            data: QS.stringify(mdjm_fun(updatePass_params))
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
                                that.$emit("updatePassSuccess");
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
    #updatePassWord {
        width: 6rem;
        height: 5.65rem;
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
                margin: 0.1rem auto 0rem;
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
                width: 2rem;
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
    }
</style>