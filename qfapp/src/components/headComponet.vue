<template>
  <header class="flex flexAro">
    <img src="../imgs/logo.png" alt="logoImg" class="logoImg">
    <search></search>
    <router-link
      v-on:click.native="intoMinePage('/mine')"
      to="/mine"
      tag="span"
      v-show="is_android"
      class="userImg"
    >
      <img src="../imgs/user.png" alt class="wh">
    </router-link>
  </header>
</template>

<script>
import search from "./commons/search";
export default {
  name: "headComponet",
  components: { search },
  data() {
    return {};
  },
  beforeCreate: function() {
     
  },
  created: function() {},
  beforeMount: function() {},
  mounted: function() {},
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    intoMinePage: function(page) {
    //   console.log("进入个人中心页面==="+page);
      this.$store.dispatch("navActive", page);
    }
  },
  computed: {
    is_android: function() {
      return this.$store.getters.is_android;
    }
  },
  beforeRouteLeave(to, from, next) {
    // console.log(to);
  }
};
</script>

<style lang="less" scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 0.9rem;
  background: #fff;
  z-index: 1000;
  .logoImg {
    width: auto;
    height: 0.7rem;
  }
  .userImg {
    width: 0.6rem;
    height: 0.6rem;
  }
}
</style>


