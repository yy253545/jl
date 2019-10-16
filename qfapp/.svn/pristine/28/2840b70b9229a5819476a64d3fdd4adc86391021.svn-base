<template>
    <div class="rewardMd posRel">
        <div id="" class="topBox posAbs flex flexSta">
            <span id="" class="time">
            	{{gameData.create_time}}
            </span>
            <span id="">
            	完成
            </span>
            <span id="" class="gameName">
                {{gameData.game_name}}
            </span>
            <span id="" class="dutyName">
                {{gameData.description}}
            </span>
        </div>
        <div id="" class="botBox posAbs flex flexSta">
            <span id="">
                奖励:
            </span>
            <span id="" class="rewardType">
                {{gameData.reward}}积分
            </span>
            <!--<img v-if="gold" :src="goldIcon" class="rewardImg" />
            <img v-else :src="integralIcon" class="rewardImg" />-->
        </div>
    </div>
</template>

<script>
    export default {
        inject: ["reload"],
        name: "rewardMd",
        props: {
            gameData: {
                type: Object
            }
        },
        components: {},
        data() {
            return {
                goldIcon: require("../imgs/goldIcon.png"),
                integralIcon: require("../imgs/integralIcon.png"),
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

        },
        computed: {

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .rewardMd {
        width: 100%;
        height: 1.45rem;
        .botBox {
            bottom: 0.25rem;
            left: 0.35rem;
            span {
                font-size: 0.28rem;
                color: #333333;
                margin: 0 0.05rem 0 0;
            }
            .rewardType {
                font-size: 0.28rem;
                color: #ff8a00;
                margin: 0 0.15rem 0 0;
            }
            .rewardImg {
                width: auto;
                height: 0.3rem;
                margin: 0;
            }
        }
        .topBox {
            top: 0.25rem;
            left: 0.35rem;
            span {
                font-size: 0.28rem;
                color: #333333;
                margin: 0 0.05rem 0 0;
            }
            .time,
            .gameName,
            .dutyName {
                font-size: 0.28rem;
                color: #ff8a00;
                margin: 0 0.15rem 0 0;
            }
        }
    }
</style>