<template>
    <div id="dutyTypeMd" class="posRel">
        <img :src="dutyIcon" class="dutyIcon posAbs" />
        <span id="" class="dutyName posAbs">
        	{{dutyType.name}}
        </span>
        <div class="rewardBox posAbs flex flexSta">
            <span id="">
            	可获得:
            </span>
            <span id="" class="rewardType">
                积分
            </span>
            <!--<img v-if="gold" :src="goldIcon" class="rewardImg" />-->
            <img :src="integralIcon" class="rewardImg" />
        </div>
        <div class="moreBox posAbs flex flexSta" @click="moreBtn(dutyType.id)">
            <span id="">
            	详情
            </span>
            <img :src="moreImg" class="moreImg" />
        </div>
    </div>
</template>

<script>
    export default {
        inject: ["reload"],
        name: "dutyTypeMd",
        props: {
            dutyType: {

            },
            gameData: {}
        },
        components: {

        },
        data() {
            return {
                dutyIcon: require("../imgs/dutyIcon.png"),
                goldIcon: require("../imgs/goldIcon.png"),
                integralIcon: require("../imgs/integralIcon.png"),
                moreImg: require("../imgs/moreImg.png"),
            };
        },
        beforeMount: function() {
            var that = this;
            that.$nextTick(function() {

            })
        },
        mounted: function() {

        },
        beforeUpdate: function() {},
        updated: function() {},
        beforeDestroy: function() {},
        destroyed: function() {
            var that = this;

        },
        methods: {
            moreBtn: function(val) {
                var that = this;
                that.$router.push({
                    name: "duty",
                    params: {
                        dutyName: that.dutyType.name,
                        gameData: that.gameData,
                        t_type: val
                    }
                });
            }
        },
        computed: {

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    #dutyTypeMd {
        width: 100%;
        height: 1.2rem;
        background: #ffffff;
        border-bottom: 0.05rem solid #e9e9e9;
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
</style>