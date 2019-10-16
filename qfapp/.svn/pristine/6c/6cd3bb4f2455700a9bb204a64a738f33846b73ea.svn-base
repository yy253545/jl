<template>
    <div id="mask" class="posFix wh" @click="clickMask"></div>
</template>

<script>
    export default {
        name: "maskMd",
        data() {
            return {};
        },
        beforeCreate: function() {},
        created: function() {},
        beforeMount: function() {},
        mounted: function() {},
        beforeUpdate: function() {},
        updated: function() {},
        beforeDestroy: function() {},
        destroyed: function() {},
        methods: {
            clickMask: function() {
                var that = this;
                that.$confirm("确定要退出当前操作么?", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
					showClose: false,
					closeOnClickModal: false,
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$emit("clickMask");
                }).catch(() => {

                });
            }
        },
        computed: {}
    };
</script>
<style scoped lang="less">
    #mask {
        background: rgba(0, 0, 0, 0.4);
        z-index: 1300;
        top: 0;
    }
</style>