<template></template>

<script>
export default {
  name: "empty",
  data() {
    this.$router.replace({
      path: "../newsDetail.vue",
      name: "newsDetail"
    });
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
  methods: {},
  computed: {}
};
</script>
<style scoped lang="less">
</style>
