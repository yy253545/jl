<template>
    <div class="cropper_box wh" style="z-index:1500;">
        <div class="choose_box posAbs cenMid" style="z-index:1600;">
            <div class="wh posRel">
                <img :src="loginBgImg" alt class="loginBgImg posAbs wh">
                <span class="tit posAbs">修改头像</span>
                <div class="upload-container choose-gallery posAbs cen">
                    <div class="upload-pretty button-three-dimen">
                        <input type="file" id="targetImg">本地上传
                    </div>
                </div>
                <div class="upload-container choose-camera posAbs cen">
                    <div class="upload-pretty button-three-dimen">
                        <input type="file" id="targetImgCamera" capture="camera">手机拍摄
                    </div>
                </div>
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
        <div class="clip-content posFix cenMid hidden" style="z-index:1700;">
            <div class="img-clip"></div>
            <nav class="clip-action nav-bar nav-bar-tab hidden">
                <a class="tab-item" id="btn-reload">
                    <span class="iconfont icon-fanhui1 tab-icon"></span>
                    <span class="tab-label hidden">取消</span>
                </a>
                <a class="tab-item" id="btn-rotate-anticlockwise">
                    <span class="iconfont icon-nishizhenxuanzhuan tab-icon rotate90"></span>
                    <span class="tab-label hidden">逆时针旋转</span>
                </a>
                <a class="tab-item" id="btn-rotate-clockwise">
                    <span class="iconfont icon-shunshizhenxuanzhuan tab-icon"></span>
                    <span class="tab-label hidden">顺时针旋转</span>
                </a>
                <a class="tab-item" id="btn-verify">
                    <span class="iconfont icon-duigou tab-icon"></span>
                    <span class="tab-label hidden">确定</span>
                </a>
            </nav>
        </div>
        <div class="show-content posFix cenMid hidden" style="z-index:1700;width:100%;height:100%;">
            <div class="img-wrap">
                <img class="show-img" data-preview-src data-preview-group="2" style="margin:4rem auto;">
            </div>

            <nav class="nav-bar nav-bar-tab">
                <a class="tab-item" id="btn-back">
                    <span class="iconfont icon-fanhui1 tab-icon"></span>
                    <span class="tab-label hidden">取消</span>
                </a>
                <!-- <a class="tab-item" id="btn-detail">
          <span class="iconfont icon-zuixiaohua tab-icon"></span>
          <span class="tab-label hidden">详情</span>
        </a> -->
                <a class="tab-item" id="btn-save">
                    <span class="iconfont icon-duigou tab-icon"></span>
                    <span class="tab-label hidden">确定</span>
                </a>
            </nav>
        </div>
    </div>
</template>

<script>
    import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
    import utils from "../config/common.js";
    import closeMd from "./closeMd";
    // import {myfun} from '../js/test.js' //注意路径

    export default {
        name: "updateImg1",
        components: {
            closeMd
        },
        data() {
            return {
                loginBgImg: require("../imgs/loginBg_img.png"),
                userNameIptIcon: require("../imgs/bindEmail.png"),
                loginBtnBg: require("../imgs/loginBtnBg.png"),
                src: "",
                files: "",
                param: ""
            };
        },
        beforeCreate: function() {},
        created: function() {},
        beforeMount: function() {},
        mounted: function() {
            var that = this;
            var portrait = window.localStorage.getItem("portrait");
            that.src = portrait;
            var choose_box;
            var chooseGallery;
            var chooseCamera;
            var cropImage;
            var imgData;
            var clipContent;
            var clipAction;
            var showContent;
            var showImg;
            var targetImg;
            var targetImgCamera;

            initPage();

            function initPage() {
                initParams();
                initListeners();
                initImgClip();
            }

            function initParams() {
                targetImg = document.querySelector("#targetImg");
                targetImgCamera = document.querySelector("#targetImgCamera");
                chooseGallery = document.querySelector(".choose-gallery");
                choose_box = document.querySelector(".choose_box");
                chooseCamera = document.querySelector(".choose-camera");
                clipContent = document.querySelector(".clip-content");
                clipAction = document.querySelector(".clip-action");
                showContent = document.querySelector(".show-content");
                showImg = document.querySelector(".show-img");
            }

            function initImgClip() {
                new FileInput({
                    container: "#targetImg",
                    isMulti: false,
                    type: "Image_Camera",
                    success: function(b64, file, detail) {
                        // console.log("选择:" + b64);
                        console.log("fileName:" + file.name);
                        loadImg(b64);
                    },
                    error: function(error) {
                        console.error(error);
                    }
                });
                new FileInput({
                    container: "#targetImgCamera",
                    isMulti: false,
                    type: "Camera",
                    success: function(b64, file, detail) {
                        console.log("选择:" + b64);
                        console.log("fileName:" + file.name);
                        loadImg(b64);
                    },
                    error: function(error) {
                        console.error(error);
                    }
                });
            }

            function loadImg(b64) {
                changeImgClipShow(true);

                var img = new Image();
                img.src = b64;

                img.onload = function() {
                    EXIF.getData(img, function() {
                        var orientation = EXIF.getTag(this, "Orientation");

                        cropImage && cropImage.destroy();
                        cropImage = new ImageClip({
                            container: ".img-clip",
                            img,
                            // 0代表按下才显示，1恒显示，-1不显示
                            sizeTipsStyle: 0,
                            // 为1一般是屏幕像素x2这个宽高
                            // 最终的大小为：屏幕像素*屏幕像素比（手机中一般为2）*compressScaleRatio
                            compressScaleRatio: 1.1,
                            // iphone中是否继续放大：x*iphoneFixedRatio
                            // 最好compressScaleRatio*iphoneFixedRatio不要超过2
                            iphoneFixedRatio: 1.8,
                            // 减去顶部间距，底部bar,以及显示间距
                            maxCssHeight: window.innerHeight - 100 - 50 - 20,
                            // 放大镜捕获的图像半径
                            captureRadius: 30,
                            // 是否采用原图像素（不会压缩）
                            isUseOriginSize: false,
                            // 增加最大宽度，增加后最大不会超过这个宽度
                            maxWidth: 0,
                            // 是否固定框高，优先级最大，设置后其余所有系数都无用直接使用这个固定的宽，高度自适应
                            forceWidth: 0,
                            // 同上，但是一般不建议设置，因为很可能会改变宽高比导致拉升，特殊场景下使用
                            forceHeight: 0,
                            // 压缩质量
                            quality: 0.92,
                            mime: "image/jpeg"
                        });

                        // 6代表图片需要顺时针修复（默认逆时针处理了，所以需要顺过来修复）
                        switch(orientation) {
                            case 6:
                                cropImage.rotate(true);
                                break;
                            default:
                                break;
                        }
                    });
                };
            }

            function resizeShowImg(b64) {
                var img = new Image();

                img.src = b64;
                //   console.log(b64);
                img.onload = showImgOnload;
            }

            function showImgOnload() {
                // 必须用一个新的图片加载，否则如果只用showImg的话永远都是第1张
                // margin的话由于有样式，所以自动控制了
                var width = this.width;
                var height = this.height;
                var wPerH = width / height;
                var MAX_WIDTH = Math.min(window.innerWidth, width);
                var MAX_HEIGHT = Math.min(window.innerHeight - 50 - 100, height);
                var legalWidth = MAX_WIDTH;
                var legalHeight = legalWidth / wPerH;

                if(MAX_WIDTH && legalWidth > MAX_WIDTH) {
                    legalWidth = MAX_WIDTH;
                    legalHeight = legalWidth / wPerH;
                }
                if(MAX_HEIGHT && legalHeight > MAX_HEIGHT) {
                    legalHeight = MAX_HEIGHT;
                    legalWidth = legalHeight * wPerH;
                }

                var marginTop = (window.innerHeight - 50 - legalHeight) / 2;

                showImg.style.marginTop = marginTop / 100 + "rem";
                showImg.style.width = legalWidth / 100 + "rem";
                showImg.style.height = legalHeight / 100 + "rem";
            }

            function changeImgClipShow(isClip) {
                if(isClip) {
                    choose_box.classList.add("hidden");
                    clipContent.classList.remove("hidden");
                    clipAction.classList.remove("hidden");
                } else {
                    choose_box.classList.remove("hidden");
                    clipContent.classList.add("hidden");
                    clipAction.classList.add("hidden");
                    // 需要改变input，否则下一次无法change
                    targetImg.value = "";
                    targetImgCamera.value = "";
                }
            }

            function initListeners() {
                document
                    .querySelector("#btn-reload")
                    .addEventListener("click", function() {
                        cropImage && cropImage.destroy();
                        changeImgClipShow(false);
                    });
                document.querySelector("#btn-back").addEventListener("click", function() {
                    changeContent(false);
                });
                document.querySelector("#btn-save").addEventListener("click", function() {
                    // downloadFile(imgData);
                    upload(function() {
                        hideAll(true);
                        //   tips("裁剪成功");
                        //   that.$emit("getImg", that.src);
                    });
                });
                //   document
                //     .querySelector("#btn-detail")
                //     .addEventListener("click", function() {
                //       showImgDataLen(imgData);
                //     });

                document
                    .querySelector("#btn-rotate-anticlockwise")
                    .addEventListener("click", function() {
                        if(!cropImage) {
                            tips("请选择图片");
                            return;
                        }
                        cropImage.rotate(false);
                    });

                document
                    .querySelector("#btn-rotate-clockwise")
                    .addEventListener("click", function() {
                        if(!cropImage) {
                            tips("请选择图片");
                            return;
                        }
                        cropImage.rotate(true);
                    });

                document
                    .querySelector("#btn-verify")
                    .addEventListener("click", function() {
                        if(!cropImage) {
                            tips("请选择图片");
                            return;
                        }

                        //   var isConfirm = confirm("是否裁剪图片并处理？");

                        cropImage.clip(false);
                        imgData = cropImage.getClipImgData();
                        //   console.log(imgData);
                        that.src = imgData;
                        recognizeImg(
                            function() {
                                changeContent(true);
                            },
                            function(error) {
                                tips(JSON.stringify(error), true);
                            }
                        );
                    });
            }

            function showImgDataLen(imgData) {
                var len = imgData.length;
                var sizeStr = len + "B";

                if(len > 1024 * 1024) {
                    sizeStr = Math.round(len / (1024 * 1024)).toString() + "MB";
                } else if(len > 1024) {
                    sizeStr = Math.round(len / 1024).toString() + "KB";
                }

                tips("处理后大小：" + sizeStr);
            }

            function tips(msg, isAlert) {
                if(isAlert) {
                    that.$confirm(msg, '提示', {
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
                    that.$confirm(msg, '提示', {
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
            }

            function toast(message) {
                var CLASS_ACTIVE = "mui-active";
                var duration = 2000;
                var toastDiv = document.createElement("div");

                toastDiv.classList.add("mui-toast-container");
                toastDiv.innerHTML = `<div class="mui-toast-message">${message}</div>`;
                toastDiv.addEventListener("webkitTransitionEnd", () => {
                    if(!toastDiv.classList.contains(CLASS_ACTIVE)) {
                        toastDiv.parentNode.removeChild(toastDiv);
                        toastDiv = null;
                    }
                });
                // 点击则自动消失
                toastDiv.addEventListener("click", () => {
                    toastDiv.parentNode.removeChild(toastDiv);
                    toastDiv = null;
                });
                document.body.appendChild(toastDiv);
                toastDiv.classList.add(CLASS_ACTIVE);
                setTimeout(function() {
                    toastDiv && toastDiv.classList.remove(CLASS_ACTIVE);
                }, duration);
            }

            function changeContent(isShowContent) {
                if(isShowContent) {
                    showContent.classList.remove("hidden");
                    clipContent.classList.add("hidden");

                    resizeShowImg(imgData);
                    showImg.src = imgData;
                    console.log(imgData);
                    that.src = imgData;
                } else {
                    showContent.classList.add("hidden");
                    clipContent.classList.remove("hidden");
                }
            }

            function hideAll(isHideAll) {
                if(isHideAll) {
                    showContent.classList.add("hidden");
                    clipContent.classList.add("hidden");
                    choose_box.classList.remove("hidden");
                    resizeShowImg(imgData);
                    showImg.src = imgData;
                    console.log(imgData);
                    that.src = imgData;
                } else {}
            }

            function b64ToBlob(urlData) {
                console.log(urlData);
                var arr = urlData.split(",");
                var mime = arr[0].match(/:(.*?);/)[1] || "image/png";
                // 去掉url的头，并转化为byte
                var bytes = window.atob(arr[1]);

                // 处理异常,将ascii码小于0的转换为大于0
                var ab = new ArrayBuffer(bytes.length);
                // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
                var ia = new Uint8Array(ab);
                for(var i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }

                return new Blob([ab], {
                    type: mime
                });
            }

            function downloadFile(content) {
                // Convert image to 'octet-stream' (Just a download, really)
                var imageObj = content.replace("image/jpeg", "image/octet-stream");
                window.location.href = imageObj;
            }

            function recognizeImg(success, error) {
                // 里面正常有：裁边，摆正，梯形矫正，锐化等算法操作
                success();
            }

            function upload(success, error) {
                success();
            }
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
                var image = new FormData();
                console.log(that.src);
                image.append("portrait", that.src);

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
    .cropper_box {
        .choose_box {
            width: 6rem;
            height: 6rem;
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
            .choose-gallery {
                top: 1.3rem;
            }
            .choose-camera {
                top: 2rem;
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
                top: 2.9rem;
            }
        }
    }
</style>