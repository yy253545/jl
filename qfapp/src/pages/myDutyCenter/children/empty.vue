<template></template>

<script>
export default {
  name: "empty",
  data() {
    this.$router.replace({
      path: "../index.vue",
      name: "index"
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
