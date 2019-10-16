<template>
    <div id="getGiftCopy" class="posFix cenMid">
        <div class="wh posRel">
            <img :src="loginBgImg" alt class="loginBgImg posAbs wh">
            <span class="tit posAbs">领取礼包码</span>
            <div class="posAbs chooseImgBox cen flex flexCen">
                <span>礼包码:</span>
                <span class="giftCodeSp">{{giftCode}}</span>
            </div>
            <div class="posAbs keepBtnBox cen" v-clipboard:copy="giftCode" v-clipboard:success="onCopy" v-clipboard:error="onError">
                <div class="wh posRel">
                    <img :src="loginBtnBg" alt class="loginBgImg posAbs wh">
                    <span class="keep posAbs cenMid">领取</span>
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
        name: "getGiftCopy",
        components: {
            closeMd
        },
        props: {
            giftCode: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                loginBgImg: require("../imgs/loginBg_img.png"),
                userNameIptIcon: require("../imgs/bindEmail.png"),
                loginBtnBg: require("../imgs/loginBtnBg.png")
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
            onCopy: function(e) {
                var that = this;
                that.$confirm("复制成功", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: false,
					showClose: false,
					closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    this.$emit("clickMask");
                }).catch(() => {

                });
            },
            onError: function(e) {
                //  console.log(e);
            }
        },
        computed: {}
    };
</script>
<style scoped lang="less">
    #getGiftCopy {
        width: 6rem;
        height: 3.5rem;
        z-index: 1510;
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
            width: 100%;
            height: 0.5rem;
            top: 1.4rem;
            span {
                font-size: 0.3rem;
                color: #000;
            }
            .giftCodeSp {
                color: #ff6501;
                text-decoration: underline;
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