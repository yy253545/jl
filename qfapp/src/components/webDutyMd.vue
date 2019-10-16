<template>
    <div id="webDutyMd">
        <div id="" class="wh posRel">
            <img v-if="webDutyData.id == '4'" :src="bindTelIcon" class="dutyIcon posAbs" />
            <img v-else-if="webDutyData.id == '5'" :src="bindEmailIcon" class="dutyIcon posAbs" />
            <img v-else-if="webDutyData.id == '6'" :src="userImgIcon" class="dutyIcon posAbs" />
            <span id="" class="dutyName posAbs">
            {{webDutyData.description}}
        </span>
            <div class="rewardBox posAbs flex flexSta">
                <span id="">
                奖励:
            </span>
                <span id="" class="rewardType">
                {{webDutyData.reward}}积分
            </span>
                <img :src="integralIcon" class="rewardImg" />
            </div>
            <div v-if="webDutyData.status == '0'" class="moreBox posAbs flex flexSta" @click="intoUpdatePage">
                <span id="">
                未完成
            </span>
                <img :src="moreImg" class="moreImg" />
            </div>
            <div v-if="webDutyData.status == '1'" class="moreBox posAbs flex flexSta" @click="getReward(webDutyData.id)">
                <img :src="getRewardImg" class="getRewardImg" />
            </div>
            <div v-if="webDutyData.status == '2'" class="moreBox posAbs flex flexSta">
                <span id="">
                已领取
            </span>
            </div>
        </div>
    </div>
</template>

<script>
    import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到

    export default {
        inject: ["reload"],
        name: "webDutyMd",
        props: {
            webDutyData: {

            }
        },
        components: {

        },
        data() {
            return {
                integralIcon: require("../imgs/integralIcon.png"),
                moreImg: require("../imgs/moreImg.png"),
                bindTelIcon: require("../imgs/telIcon.png"),
                bindEmailIcon: require("../imgs/emailIcon.png"),
                userImgIcon: require("../imgs/userImgIcon.png"),
                getRewardImg: require("../imgs/getRewardIcon.png"),
            };
        },
        beforeMount: function() {
            var that = this;
            that.$nextTick(function() {

            })
        },
        mounted: function() {
            var that = this;
            //          console.log(that.webDutyData);
        },
        beforeUpdate: function() {},
        updated: function() {},
        beforeDestroy: function() {},
        destroyed: function() {
            var that = this;

        },
        methods: {
            intoUpdatePage: function() {
                var that = this;
                that.$router.push({
                    name: "update",
                });
            },
            getReward: function(id) {
                var that = this;
                console.log(id);

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

                            var webDutyParams = {
                                device: that.$store.getters.is_android ? "android" : "ios",
                                time: Date.parse(new Date()) + ""
                            };

                            that
                                .$axios({
                                    method: "post",
                                    url: "/Wap/api/platformTaskList",
                                    data: QS.stringify(mdjm_fun(webDutyParams))
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
                                        var webDutyData = response.data.data;
                                        that.$emit("getRewardSuccess", webDutyData);
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
            }
        },
        computed: {

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    #webDutyMd {
        width: 100%;
        height: 1.2rem;
        background: #ffffff;
        border-top: 0.05rem solid #e9e9e9;
        .getRewardImg {
            width: 1.05rem;
            height: auto;
            cursor: pointer;
        }
        .dutyIcon {
            width: 0.35rem;
            height: auto;
            top: 0.25rem;
            left: 0.4rem;
        }
        .dutyName {
            font-size: 0.3rem;
            color: #333333;
            top: 0.2rem;
            left: 0.85rem;
            font-weight: 600;
        }
        .rewardBox {
            width: 5rem;
            height: 0.3rem;
            bottom: 0.2rem;
            left: 0.85rem;
            span {
                font-size: 0.24rem;
                color: #4c4c4c;
            }
            .rewardType {
                color: #ff8a00;
                margin: 0 0.2rem;
            }
            .rewardImg {
                width: auto;
                height: 0.3rem;
                margin: 0;
            }
        }
        .moreBox {
            top: 0.2rem;
            right: 0.4rem;
            height: 0.4rem;
            span {
                font-size: 0.3rem;
                color: #333333;
                margin: 0 0.05rem;
            }
            .moreImg {
                width: auto;
                height: 0.3rem;
                margin-top: 0.05rem;
            }
        }
    }
    
    #webDutyMd:last-child {
        border-bottom: 0.05rem solid #e9e9e9;
    }
</style>