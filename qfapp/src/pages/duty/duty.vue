<template>
    <div id="dutyPage">
        <h2>{{dutyName}}</h2>
        <gameBoxMd :gameData="gameData"></gameBoxMd>
        <div class="backTabBox posFix flex flexCen">
            <span @click="backTabFun" id="" :style="{backgroundImage:'url('+require('../../imgs/backTabBg.png')+')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}">
                    返回任务列表
                </span>
        </div>

        <div v-for="(item,index) in dutyData" :key="index" class="dutyTypesBox posRel">
            <img :src="dutyTypesIcon" alt="" class="dutyTypesIcon posAbs" />
            <div class="dutyNeedSp posAbs">{{item.description}}</div>
            <div class="rewardBox posAbs flex flexSta">
                奖励:
                <span id="">
                	{{item.reward}}积分
                </span>
                <img :src="integralIcon" />
            </div>
            <span v-if="item.status == '0'" id="" class="getRewardDone posAbs">
                未完成
            </span>
            <img v-if="item.status == '1'" :src="getRewardImg" class="posAbs getRewardImg" @click="getReward(item.id)" />
            <span v-if="item.status == '2'" id="" class="getRewardDone posAbs">
                已领取
            </span>
        </div>

        <maskMd v-show="show_mask" @clickMask="clickMask"></maskMd>
        <loginMd v-show="show_login" @regShow="regShow" @loginSuccess="loginSuccess" @findPassWord="findPassWord" @clickMask="clickMask"></loginMd>
        <regMd v-show="show_reg" @loginShow="loginShow" @regSuccess="regSuccess" @clickMask="clickMask"></regMd>
        <findPassWord v-show="show_findPassWord" @loginShow="loginShow" @clickMask="clickMask" @findPassSuccess="findPassSuccess"></findPassWord>
    </div>
</template>

<script>
    import loginMd from '../../components/loginMd'
    import regMd from '../../components/regMd'
    import maskMd from '../../components/maskMd'
    import findPassWord from '../../components/findPassWord'
    import gameBoxMd from '../../components/gameBoxMd'
    import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
    export default {
        inject: ["reload"],
        name: "dutyPage",
        components: {
            loginMd,
            regMd,
            maskMd,
            findPassWord,
            gameBoxMd
        },
        data() {
            return {
                show_mask: false,
                show_login: false,
                show_reg: false,
                show_findPassWord: false,
                isLoginShow: false,
                noRewardImg: require("../../imgs/noRewardImg.png"),
                dutyTypesIcon: require("../../imgs/dutyTypesIcon.png"),
                goldIcon: require("../../imgs/goldIcon.png"),
                integralIcon: require("../../imgs/integralIcon.png"),
                getRewardImg: require("../../imgs/getRewardIcon.png"),
                gameData: "",
                dutyName: "",
                t_type: "",
                dutyData: [],
            };
        },
        beforeMount: function() {

        },
        mounted: function() {
            var that = this;
            that.$nextTick(function() {
                window.addEventListener("scroll", that.handleScroll, true); // 监听（绑定）滚轮滚动事件
                document.documentElement.scrollTop = document.body.scrollTop = 0;

                function mdjm_fun(params) {
                    var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
                    params["access"] = access;
                    return params;
                }

                var dutyName = that.$route.params.dutyName;
                var gameData = that.$route.params.gameData;
                var t_type = that.$route.params.t_type;

                //              console.log(gameData);

                that.dutyName = dutyName;
                that.gameData = gameData;
                that.t_type = t_type;

                var dutyParams = {
                    device: that.$store.getters.is_android ? "android" : "ios",
                    time: Date.parse(new Date()) + "",
                    app_id: that.gameData.app_id + "",
                    t_type: that.t_type + ""
                }

                that
                    .$axios({
                        method: "post",
                        url: "/Wap/api/gameTaskinfo",
                        data: QS.stringify(mdjm_fun(dutyParams))
                    })
                    .then(function(response) {
                        console.log(response.data);
                        if(response.data.status == 0) {
                            //请求不成功
                            that.$confirm(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
								showCancelButton: true,
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
                            that.dutyData = response.data.data;
                        }
                    })
                    .catch(function(error) {
                        // console.log(error);
                    });

            })
        },
        beforeUpdate: function() {},
        updated: function() {},
        beforeDestroy: function() {},
        destroyed: function() {
            var that = this;
            window.removeEventListener('scroll', that.handleScroll);
        },
        methods: {
            getReward: function(id) {
                var that = this;

                function mdjm_fun(params) {
                    var access = that.$mdjm(JSON.stringify(params) + that.$store.getters.mdVal);
                    params["access"] = access;
                    return params;
                }

                var getRewardParams = {
                    device: that.$store.getters.is_android ? "android" : "ios",
                    time: Date.parse(new Date()) + "",
                    task_id: id + ""
                }

                that
                    .$axios({
                        method: "post",
                        url: "/Wap/api/receiveReward",
                        data: QS.stringify(mdjm_fun(getRewardParams))
                    })
                    .then(function(response) {
                        console.log(response.data);
                        if(response.data.status == 0) {
                            //请求不成功
                            that.$confirm(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
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

                            var dutyParams = {
                                device: that.$store.getters.is_android ? "android" : "ios",
                                time: Date.parse(new Date()) + "",
                                app_id: that.gameData.app_id + "",
                                t_type: that.t_type + ""
                            }

                            that
                                .$axios({
                                    method: "post",
                                    url: "/Wap/api/gameTaskinfo",
                                    data: QS.stringify(mdjm_fun(dutyParams))
                                })
                                .then(function(response) {
                                    //                      console.log(response.data.data);
                                    if(response.data.status == 0) {
                                        //请求不成功
                                        that.$confirm(response.data.msg, '提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
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
                                        that.dutyData = response.data.data;
                                        that.$confirm('领取成功', '提示', {
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
                        }
                    })
                    .catch(function(error) {
                        // console.log(error);
                    });
            },
            backTabFun: function() {
                var that = this;
                that.$router.go(-1);
            },
            clickMask: function() { //点击mask影藏所有模块
                var that = this;
                that.show_login = false;
                that.show_reg = false;
                that.show_mask = false;
                that.show_findPassWord = false;
            },
            findPassSuccess: function() {
                var that = this;
                that.show_login = true;
                that.show_reg = false;
                that.show_mask = true;
                that.show_findPassWord = false;
                that.reload();
            },
            loginSuccess: function() {
                var that = this;
                that.show_login = false;
                that.show_reg = false;
                that.show_mask = false;
                that.reload();
            },
            regSuccess: function() {
                var that = this;
                that.show_login = false;
                that.show_reg = false;
                that.show_mask = false;
                that.reload();
            },
            findPassWord: function() {
                var that = this;
                that.show_login = false;
                that.show_reg = false;
                that.show_findPassWord = true;
            },
            regShow: function() {
                var that = this;
                that.show_login = false;
                that.show_reg = true;
                that.show_findPassWord = false;
            },
            loginShow: function() {
                var that = this;
                that.show_login = true;
                that.show_reg = false;
                that.show_findPassWord = false;
            }
        },
        computed: {
            baseUrl() {
                return this.$store.getters.baseUrl;
            },
            baseImgUrl() {
                return this.$store.getters.baseImgUrl;
            },
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    #dutyPage {
        width: 100%;
        padding-bottom: 1rem;
        h2 {
            width: 100%;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align: center;
            font-size: 0.35rem;
            color: #333333;
            background: #ffffff;
        }
        .dutyTypesBox {
            width: 100%;
            height: 1.5rem;
            background: #ffffff;
            border-bottom: #f5f5f5 solid 0.05rem;
            .dutyTypesIcon {
                width: 0.35rem;
                height: auto;
                top: 0.2rem;
                left: 0.4rem;
            }
            .dutyNeedSp {
                top: 0.2rem;
                left: 0.85rem;
                width: 6.5rem;
                font-size: 0.28rem;
                color: #333333;
                span {
                    color: #ff8a00;
                    display: inline;
                }
            }
            .rewardBox {
                left: 0.85rem;
                bottom: 0.2rem;
                font-size: 0.28rem;
                color: #333333;
                span {
                    color: #ff8a00;
                    font-size: 0.28rem;
                    margin: 0 0.2rem;
                }
                img {
                    width: auto;
                    height: 0.3rem;
                    margin: 0;
                }
            }
            .getRewardImg {
                width: 1.05rem;
                height: auto;
                bottom: 0.2rem;
                right: 0.4rem;
                cursor: pointer;
            }
            .getRewardDone,
            .noGetReward {
                font-size: 0.3rem;
                color: #b2b2b2;
                bottom: 0.2rem;
                right: 0.4rem;
            }
        }
        .backTabBox {
            width: 100%;
            height: 1rem;
            background: #fff;
            bottom: 0;
            left: 0;
            z-index: 1000;
            span {
                width: 4.9rem;
                height: 0.75rem;
                line-height: 0.75rem;
                color: #FFFFFF;
                font-size: 0.4rem;
                text-align: center;
            }
        }
    }
</style>