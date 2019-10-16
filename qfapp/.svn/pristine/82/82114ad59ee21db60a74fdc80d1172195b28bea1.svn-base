<template>
    <div id="gameBoxMd" class="posRel">
        <img v-if="gameData.icon" v-lazy="gameData.icon" alt class="gameIcon posAbs mid">
        <img v-else v-lazy="defaultimg" alt class="gameIcon posAbs mid">
        <span id="" class="gameName posAbs elips">
        	{{gameData.name}}
        </span>
        <div class="typeSizeBox posAbs flex flexSta">
            <span id="" class="gameType">
    	   {{gameData.type_txt}}
            </span>
            <span id="" class="gameSize">
           {{gameData.size}}
            </span>
        </div>
        <span id="" class="gameDesc posAbs elips">
            {{gameData.description}}
        </span>
        <a :href="gameData.downurl" class="downLoad posAbs mid" :style="{backgroundImage:'url('+require('../imgs/downLoadImg.png')+')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}">
            下载
        </a>
    </div>
</template>

<script>
    export default {
        inject: ["reload"],
        name: "gameBoxMd",
        props: {
            gameData: {

            }
        },
        components: {

        },
        data() {
            return {
                defaultimg: require("../imgs/defaultImg.png")
            };
        },
        beforeMount: function() {
            var that = this;
            that.$nextTick(function() {
//              console.log(that.gameData);
            })
        },
        mounted: function() {
            var that = this;

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
    #gameBoxMd {
        width: 100%;
        height: 1.75rem;
        background: #eeeeee;
        .gameIcon {
            width: 1.25rem;
            height: 1.25rem;
            left: 0.4rem;
        }
        .gameName {
            width: 3.5rem;
            font-size: 0.32rem;
            color: #333333;
            top: 0.25rem;
            left: 1.95rem;
            font-weight: 600;
        }
        .gameDesc {
            width: 3.5rem;
            font-size: 0.26rem;
            color: #a8a8a8;
            bottom: 0.25rem;
            left: 1.95rem;
        }
        .typeSizeBox {
            width: 3.5rem;
            left: 1.95rem;
            top: 0.8rem;
            span {
                display: inline;
                line-height: 0.26rem;
            }
            .gameType {
                font-size: 0.26rem;
                color: #A8A8A8;
            }
            .gameSize {
                margin-left: 0.3rem;
                font-size: 0.26rem;
                color: #A8A8A8;
                padding: 0 0.15rem;
                border-left: 0.03rem solid #A8A8A8;
                border-right: 0.03rem solid #A8A8A8;
            }
        }
        .downLoad {
            width: 1.3rem;
            height: 0.5rem;
            font-size: 0.28rem;
            color: #FFFFFF;
            line-height: 0.5rem;
            text-align: center;
            right: 0.4rem;
        }
    }
</style>