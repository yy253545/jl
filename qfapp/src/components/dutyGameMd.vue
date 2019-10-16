<template>
    <div id="dutyGameMd">
        <gameBoxMd :gameData="gameData"></gameBoxMd>
        <div class="" v-for="(item,index) in typeList" :key="index">
            <dutyTypeMd :dutyType="item" :gameData="gameData"></dutyTypeMd>
        </div>
    </div>
</template>

<script>
    import gameBoxMd from './gameBoxMd'
    import dutyTypeMd from './dutyTypeMd'

    export default {
        inject: ["reload"],
        name: "dutyGameMd",
        props: {
            gameData: {

            }
        },
        components: {
            gameBoxMd,
            dutyTypeMd
        },
        data() {
            return {
                typeList: []
            };
        },
        beforeMount: function() {
            var that = this;
            that.$nextTick(function() {

            })
        },
        mounted: function() {
            var that = this;
            var gameData = that.gameData;
            var typeList = gameData.typeList;
            that.typeList = typeList;
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
    #dutyGameMd {
        width: 100%;
        height: auto;
        background: #f5f5f5;
        padding-bottom: 0.5rem;
    }
</style>