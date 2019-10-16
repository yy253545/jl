<template>
  <div class="backTopBox" @click="backTop">
    <img src="../imgs/backTop.png" alt class="wh">
  </div>
</template>

<script>
export default {
  name: "backTop",
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
    backTop: function() {
      this.$emit("back_top");
    }
  },
  computed: {}
};
</script>
<style scoped lang="less">
.backTopBox {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  position: fixed;
  right: 0.5rem;
  bottom:2rem;
  z-index: 9999;
  img {
    border-radius: 50%;
  }
}
</style>
