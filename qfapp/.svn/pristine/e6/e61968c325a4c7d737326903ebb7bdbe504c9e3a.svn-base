<template>
    <div id="updateImg" class="posFix cenMid">
        <div class="wh posRel">
            <img :src="loginBgImg" alt class="loginBgImg posAbs wh">
            <span class="tit posAbs">修改头像</span>
            <span class="seeSp posAbs mid">预览:</span>
            <img :src="src" alt class="showImg posAbs cen">
            <div class="posAbs keepBtnBox cen" @click="keepBtn">
                <div class="wh posRel">
                    <img :src="loginBtnBg" alt class="loginBgImg posAbs wh" id="srcImg">
                    <span class="keep posAbs cenMid">保存</span>
                </div>
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
        name: "updateImg",
        components: {
            closeMd
        },
        props: {
            src: {
                type: String,
                require: true
            }
        },
        data() {
            return {
                loginBgImg: require("../imgs/loginBg_img.png"),
                userNameIptIcon: require("../imgs/bindEmail.png"),
                loginBtnBg: require("../imgs/loginBtnBg.png"),
                files: "",
                param: "",
                srcUp: ""
            };
        },
        beforeCreate: function() {},
        created: function() {},
        beforeMount: function() {},
        mounted: function() {
            var that = this;
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
            keepBtn: function() {
                var that = this;
                // 修改了头像
                //   function convertBase64UrlToBlob(urlData) {
                //     var bytes = window.atob(urlData.split(",")[1]);
                //     //去掉url的头，并转换为byte
                //     //处理异常,将ascii码小于0的转换为大于0
                //     var ab = new ArrayBuffer(bytes.length);
                //     console.log(ab);
                //     var ia = new Uint8Array(ab);
                //     console.log(ia);
                //     for (var i = 0; i < bytes.length; i++) {
                //       ia[i] = bytes.charCodeAt(i);
                //     }
                //     return new Blob([ab], { type: "image/png" });
                //   }

                function dataURItoBlob(base64Data) {
                    var byteString;
                    if(base64Data.split(",")[0].indexOf("base64") >= 0)
                        byteString = atob(base64Data.split(",")[1]);
                    else byteString = unescape(base64Data.split(",")[1]);
                    var mimeString = base64Data
                        .split(",")[0]
                        .split(":")[1]
                        .split(";")[0];
                    var ia = new Uint8Array(byteString.length);
                    for(var i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                    return new Blob([ia], {
                        type: mimeString
                    });
                }

                var blob = dataURItoBlob(that.src); // 上一步中的函数
                var canvas = document.createElement("canvas");
                var dataURL = canvas.toDataURL("image/jpeg", 0.5);
                var image = new FormData(document.forms[0]);
                console.log(blob);
                image.append("portrait", blob, "image.png");

                var value = that.$store.getters.mdVal;
                var is_android = that.$store.getters.is_android;
                var device = is_android ? "android" : "ios";

                var checkUserLogin_params = {
                    device: device,
                    time: Date.parse(new Date()) + ""
                };

                function mdjm_fun(params) {
                    // console.log(JSON.stringify(params));
                    var access = that.$mdjm(JSON.stringify(params) + value);
                    params["access"] = access;
                    // console.log(params);
                    return params;
                }

                var checkUserLogin_params_data = mdjm_fun(checkUserLogin_params);
                console.log(checkUserLogin_params_data);
                image.append("device", checkUserLogin_params_data.device);
                image.append("time", checkUserLogin_params.time);
                image.append("access", checkUserLogin_params.access);
                console.log(image);
                that.$axios
                    .post("/Wap/api/portrait", image, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(function(res) {
                        if(res.data.status == 0) {
                            that.$confirm(res.data.msg, '提示', {
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
                        } else if(res.data.status == "1") {
//                          console.log("成功了");
                            window.localStorage.setItem("portrait", res.data.data.portrait);
                            that.src = res.data.data.portrait;
                            that.$emit("updateImgSuccess");
                        }
                    })
                    .catch(function() {
                        // console.log("FAILURE!!");
                    });
            }
        },
        computed: {}
    };
</script>
<style scoped lang="less">
    #updateImg {
        width: 6rem;
        height: 5.5rem;
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
        .chooseImgBox {
            width: 4rem;
            height: 0.5rem;
            top: 1.4rem;
            .chooseImg {
                font-size: 0.3rem;
                color: #fff;
                text-align: center;
                line-height: 0.5rem;
            }
        }
        .keepBtnBox {
            width: 5rem;
            height: 0.65rem;
            bottom: 0.3rem;
            .keep {
                font-size: 0.35rem;
                color: #fff;
            }
        }
        .seeSp {
            font-size: 0.38rem;
            color: #ffbf00;
            font-weight: 600;
            left: 0.5rem;
        }
        .showImg {
            width: 1.8rem;
            height: 1.8rem;
            border-radius: 50%;
            background: #fff;
            border: 0.02rem solid #dedede;
            top: 2.5rem;
        }
    }
</style>