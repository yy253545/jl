<template>
    <div id="selfServicePage">
        <div class="headBox posFix">
            <div class="wh">
                <img :src="backImg" class="backImg posAbs mid" @click="back" />
                <span class="posAbs cenMid">自助服务</span>
            </div>
        </div>
        <showMessage v-if="showMessage" @submitSuccess="submitSuccess" @clickMask="clickMask" :form_data="form_data" :allGame="allGame"></showMessage>
        <maskMd v-show="show_mask" @clickMask="clickMask"></maskMd>
        <div class="tabBox" style="margin-bottom: 1rem;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="自助提交" name="0">
                    <div class="selfServiceBox flex">
                        <div class="showMessageBox" @click="showMessageFun('1')">
                            <img :src="czIcon" />
                            <span>充值未到账</span>
                        </div>
                        <div class="showMessageBox" @click="showMessageFun('2')">
                            <img :src="bugIcon" />
                            <span>bug反馈</span>
                        </div>
                        <div class="showMessageBox" @click="showMessageFun('3')">
                            <img :src="jyIcon" />
                            <span>建议反馈</span>
                        </div>
                        <div class="showMessageBox" style="margin-left: 23%;" @click="showMessageFun('4')">
                            <img :src="ggjbIcon" />
                            <span>广告举报</span>
                        </div>
                        <div class="showMessageBox" style="margin-right: 23%;" @click="showMessageFun('8')">
                            <img :src="yzIcon" />
                            <span>官方验证</span>
                        </div>
                    </div>
                    <img :src="serviceBgImg" class="serviceBgImg" />
                    <div class="backMinePage posFix">
                        <span @click="backMinePage">
                    		返回个人中心
                    	</span>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="处理进度" name="1">
                    <div class="progressBox" v-for="(item,index) in progressData" :key="index">
                        <div class="top_box flex flexBet">
                            <div class="progressID" style="width: 50%;">
                                事件编号：<span>{{item.id}}</span>
                            </div>
                            <div class="progressType flex flexEnd" style="width: 50%;">
                                类型：<span v-if="item.type == '1'">充值不到账</span>
                                <span v-if="item.type == '2'">bug反馈</span>
                                <span v-if="item.type == '3'">游戏建议</span>
                                <span v-if="item.type == '4'">广告举报</span>
                            </div>
                        </div>
                        <div class="progressGameName">
                            所在游戏：<span>{{item.game_name}}</span>
                        </div>
                        <div class="progressDesc">
                            描述：<span>{{item.description}}</span>
                        </div>
                        <div class="bot_box flex flexBet">
                            <div class="progressStatus" style="width: 50%;">
                                处理进度：<span v-if="item.status == '0'">未处理</span>
                                <span v-if="item.status == '1'">已处理</span>
                            </div>
                            <div class="detailBtnBox flex flexEnd" style="width: 50%;">
                                <em @click="processDescFun(item.id)" v-if="item.status == '1'" style="font-size: 0.24rem;color: #FFFFFF;padding: 0rem 0.3rem;background: #ffbf00;border-radius: 5px;">详情</em>
                            </div>
                        </div>
                    </div>
                    <div class="backMinePage posFix">
                        <span @click="backMinePage">
                            返回个人中心
                        </span>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import showMessage from "../../components/showMessage"
    import maskMd from '../../components/maskMd'
    import utils from "../../config/common.js";
    import axios from "axios";
    import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
    import vueResource from "vue-resource";
    import Vue from "vue";
    Vue.use(vueResource);

    export default {
        inject: ["reload"],
        name: "selfServicePage",
        components: {
            showMessage,
            maskMd
        },
        data() {
            return {
                backImg: require("../../imgs/backImg1.png"),
                moreIconImg: require("../../imgs/more.png"),
                czIcon: require("../../imgs/czIcon.png"),
                bugIcon: require("../../imgs/bugIcon.png"),
                jyIcon: require("../../imgs/jyIcon.png"),
                ggjbIcon: require("../../imgs/ggjbIcon.png"),
                yzIcon: require("../../imgs/yzIcon.png"),
                serviceBgImg: require("../../imgs/serviceBgImg.png"),
                activeName: '0',
                showMessage: false,
                show_mask: false,
                allGame: [],
                progressData: [],
                form_data: {
                    title: "",
                    type: "1",
                    //                  user_name_tit: "游戏账号",
                    app_id_tit: "所在游戏",
                    app_id_show: false,

                    server_name_tit: "所在区服",
                    server_name_show: false,

                    role_name_tit: "角色名字",
                    role_name_show: false,

                    happen_time_tit: "充值时间",
                    happen_time_show: false,

                    device_tit: "游戏设备",
                    device_show: false,

                    report_name_tit: "举报角色名/ID",
                    report_name_show: false,

                    description_tit: "详细信息描述",
                    description_show: false,

                    mobile_tit: "联系电话",
                    mobile_show: false,

                    qq_tit: 'QQ号',
                    qq_show: false,

                    email_tit: "邮箱",
                    email_show: false,

                    checkNumber_tit: "验证类型",
                    checkNumber_show: false,

                    number_tit: '需要验证的信息',
                    number_show: false,

                    yzm_tit: "验证码",
                    yzm_show: false,

                    yzBtn_show: false,
                    image_show: false,
                    video_show: false,
                }
            };
        },
        beforeCreate: function() {},
        created: function() {

        },

        beforeMount: function() {},
        mounted: function() {
            var that = this;

            document
                .getElementById("selfServicePage")
                .addEventListener("scroll", that.handleScroll, true); // 监听（绑定）滚轮滚动事件
            var getGameParams = {
                device: that.$store.getters.is_android ? "android" : "ios",
                time: Date.parse(new Date()) + ""
            };

            function mdjm_fun(params) {
                var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
                params["access"] = access;
                return params;
            }

            that
                .$axios({
                    method: "post",
                    url: "/Wap/api/getGame",
                    data: QS.stringify(mdjm_fun(getGameParams))
                })
                .then(function(response) {
                    //                      console.log(response.data.data);
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
                        //                      console.log(response.data.data);
                        var res_data = response.data.data;

                        var game_picker_res_data = [];
                        for(var key in res_data) {
                            var option_dataObj = {};
                            option_dataObj.key = key;
                            option_dataObj.value = res_data[key];
                            game_picker_res_data.push(option_dataObj);
                        }
                        //                      console.log(game_picker_res_data);
                        that.allGame = game_picker_res_data;
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
            processDescFun: function(val) { //点击查看处理详情方法
                var that = this;

                var processDescParams = {
                    device: that.$store.getters.is_android ? "android" : "ios",
                    time: Date.parse(new Date()) + "",
                    id: val + ""
                };

                function mdjm_fun(params) {
                    var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
                    params["access"] = access;
                    return params;
                }
                that
                    .$axios({
                        method: "post",
                        url: "/Wap/api/processDesc",
                        data: QS.stringify(mdjm_fun(processDescParams))
                    })
                    .then(function(response) {
                        //                      console.log(response.data.data);
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
                            that.$confirm(response.data.data, '客服处理结果', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
                                type: 'info',
                                center: true
                            }).then(() => {

                            }).catch(() => {

                            });
                        }
                    })
                    .catch(function(error) {
                        //   console.log(error);
                    });
            },
            backMinePage: function() {
                var that = this;
                that.$router.push({
                    name: "mine"
                })
            },
            submitSuccess: function() {
                var that = this;
                that.showMessage = false;
                that.show_mask = false;
            },
            clickMask: function() { //点击mask影藏所有模块
                var that = this;
                that.showMessage = false;
                that.show_mask = false;
            },
            back: function() {
                var that = this;
                that.$router.push({
                    name: "serviceCenter"
                })
            },
            handleClick(tab, event) {
                var that = this;
                //              console.log(typeof tab.index, event);
                switch(tab.index) {
                    case '0':
                        break;
                    case '1':
                        console.log('点击查看进度查询');
                        var processListParams = {
                            device: that.$store.getters.is_android ? "android" : "ios",
                            time: Date.parse(new Date()) + ""
                        };

                        function mdjm_fun(params) {
                            var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
                            params["access"] = access;
                            return params;
                        }
                        that
                            .$axios({
                                method: "post",
                                url: "/Wap/api/processList",
                                data: QS.stringify(mdjm_fun(processListParams))
                            })
                            .then(function(response) {
                                //                      console.log(response.data.data);
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
                                        that.$router.push({
                                            name: "mine"
                                        })
                                    }).catch(() => {

                                    });
                                } else if(response.data.status == 1) {
                                    //请求成功
                                    console.log(response.data.data);
                                    that.progressData = response.data.data;
                                }
                            })
                            .catch(function(error) {
                                //   console.log(error);
                            });
                        break;
                    default:
                        break;
                }
            },
            showMessageFun: function(val) {
                var that = this;
                that.showMessage = true;
                that.show_mask = true;

                switch(val) {
                    case '1': //充值错误
                        var form_data = {
                            type: "1",
                            title: "游戏内充值未到账",
                            //                          user_name_tit: "游戏账号",
                            app_id_tit: "所在游戏",
                            app_id_show: true,

                            server_name_tit: "所在区服",
                            server_name_show: true,

                            role_name_tit: "角色名字",
                            role_name_show: true,

                            happen_time_tit: "充值时间",
                            happen_time_show: true,

                            device_tit: "游戏设备",
                            device_show: false,

                            report_name_tit: "举报角色名/ID",
                            report_name_show: false,

                            description_tit: "详细信息描述",
                            description_show: true,

                            mobile_tit: "联系电话",
                            mobile_show: true,

                            qq_tit: 'QQ号',
                            qq_show: true,

                            email_tit: "邮箱",
                            email_show: true,

                            checkNumber_tit: "验证类型",
                            checkNumber_show: false,

                            number_tit: '需要验证的信息',
                            number_show: false,

                            yzm_tit: "验证码",
                            yzm_show: false,

                            image_show: true,
                            video_show: true,
                            yzBtn_show: false,
                        }
                        that.form_data = form_data;
                        break;
                    case '2': //bug反馈
                        var form_data = {
                            type: "2",

                            title: "游戏BUG",
                            //                          user_name_tit: "游戏账号",
                            app_id_tit: "所在游戏",
                            app_id_show: true,

                            server_name_tit: "所在区服",
                            server_name_show: true,

                            role_name_tit: "角色名字",
                            role_name_show: true,

                            happen_time_tit: "充值时间",
                            happen_time_show: false,

                            device_tit: "游戏设备",
                            device_show: true,

                            report_name_tit: "举报角色名/ID",
                            report_name_show: false,

                            description_tit: "详细信息描述",
                            description_show: true,

                            mobile_tit: "联系电话",
                            mobile_show: true,

                            qq_tit: 'QQ号',
                            qq_show: true,

                            email_tit: "邮箱",
                            email_show: true,

                            checkNumber_tit: "验证类型",
                            checkNumber_show: false,

                            number_tit: '需要验证的信息',
                            number_show: false,

                            yzm_tit: "验证码",
                            yzm_show: false,

                            image_show: true,
                            video_show: true,
                            yzBtn_show: false,
                        }
                        that.form_data = form_data;
                        break;
                    case '3': //建议反馈
                        var form_data = {
                            type: "3",

                            title: "对游戏的建议反馈",
                            //                          user_name_tit: "游戏账号",
                            app_id_tit: "所在游戏",
                            app_id_show: true,

                            server_name_tit: "所在区服",
                            server_name_show: true,

                            role_name_tit: "角色名字",
                            role_name_show: true,

                            happen_time_tit: "充值时间",
                            happen_time_show: false,

                            device_tit: "游戏设备",
                            device_show: false,

                            report_name_tit: "举报角色名/ID",
                            report_name_show: false,

                            description_tit: "详细信息描述",
                            description_show: true,

                            mobile_tit: "联系电话",
                            mobile_show: true,

                            qq_tit: 'QQ号',
                            qq_show: true,

                            email_tit: "邮箱",
                            email_show: true,

                            checkNumber_tit: "验证类型",
                            checkNumber_show: false,

                            number_tit: '需要验证的信息',
                            number_show: false,

                            yzm_tit: "验证码",
                            yzm_show: false,

                            image_show: true,
                            video_show: true,
                            yzBtn_show: false,
                        }
                        that.form_data = form_data;
                        break;
                    case '4': //广告举报
                        var form_data = {
                            type: "4",

                            title: "游戏内打广告、拉人等行为举报",
                            //                          user_name_tit: "游戏账号",
                            app_id_tit: "所在游戏",
                            app_id_show: true,

                            server_name_tit: "所在区服",
                            server_name_show: true,

                            role_name_tit: "角色名字",
                            role_name_show: true,

                            happen_time_tit: "充值时间",
                            happen_time_show: false,

                            device_tit: "游戏设备",
                            device_show: false,

                            report_name_tit: "举报角色名/ID",
                            report_name_show: true,

                            description_tit: "详细信息描述",
                            description_show: true,

                            mobile_tit: "联系电话",
                            mobile_show: true,

                            qq_tit: 'QQ号',
                            qq_show: true,

                            email_tit: "邮箱",
                            email_show: true,

                            checkNumber_tit: "验证类型",
                            checkNumber_show: false,

                            number_tit: '需要验证的信息',
                            number_show: false,

                            yzm_tit: "验证码",
                            yzm_show: false,

                            image_show: true,
                            video_show: true,
                            yzBtn_show: false,
                        }
                        that.form_data = form_data;
                        break;
                    case '8': //官方验证
                        var form_data = {

                            title: "查询qq群、公众号，客服电话，客服qq",
                            //                          user_name_tit: "游戏账号",
                            app_id_tit: "所在游戏",
                            app_id_show: false,

                            server_name_tit: "所在区服",
                            server_name_show: false,

                            role_name_tit: "角色名字",
                            role_name_show: false,

                            happen_time_tit: "充值时间",
                            happen_time_show: false,

                            device_tit: "游戏设备",
                            device_show: false,

                            report_name_tit: "举报角色名/ID",
                            report_name_show: false,

                            description_tit: "详细信息描述",
                            description_show: false,

                            mobile_tit: "联系电话",
                            mobile_show: false,

                            qq_tit: 'QQ号',
                            qq_show: false,

                            email_tit: "邮箱",
                            email_show: false,

                            checkNumber_tit: "验证类型",
                            checkNumber_show: true,

                            number_tit: '需要验证的信息',
                            number_show: true,

                            yzm_tit: "验证码",
                            yzm_show: true,

                            image_show: false,
                            video_show: false,
                            yzBtn_show: true,
                        }
                        that.form_data = form_data;
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

<style lang="less" scoped>
    #selfServicePage {
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
            span {
                font-size: 0.34rem;
                color: #333333;
            }
        }
        .tabBox {
            .selfServiceBox {
                width: 100%;
                flex-wrap: wrap;
                justify-content: space-around;
                background: #f5f5f5;
                .showMessageBox {
                    width: 20%;
                    height: auto;
                    margin: 0.5rem;
                    img {
                        width: 100%;
                        height: auto;
                    }
                    span {
                        width: 100%;
                        font-size: 0.3rem;
                        font-weight: 600;
                        color: #333333;
                        line-height: 0.45rem;
                        text-align: center;
                    }
                }
            }
            .serviceBgImg {
                width: 90%;
                height: auto;
                margin: 1rem auto;
            }
            .backMinePage {
                width: 100%;
                height: 1rem;
                background: #ffffff;
                bottom: 0rem;
                z-index: 400;
                span {
                    font-size: 0.34rem;
                    color: #FFFFFF;
                    line-height: 0.6rem;
                    border-radius: 5px;
                    width: 5rem;
                    background: #ffbf00;
                    text-align: center;
                    margin: 0.2rem auto;
                }
            }
            .progressBox {
                width: 100%;
                height: auto;
                padding: 0.1rem 0.3rem;
                border-bottom: 3px solid #f3f3f3;
                div {
                    width: 100%;
                    height: 0.5rem;
                    line-height: 0.5rem;
                    color: #333333;
                    font-size: 0.26rem;
                    display: flex;
                    background: #FFFFFF;
                    span {
                        color: #EC971F;
                        margin: 0 0.2rem;
                    }
                }
            }
            .el-tabs {
                .el-tabs__nav {
                    width: 100%;
                    .el-tabs__item {
                        width: 50%;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>