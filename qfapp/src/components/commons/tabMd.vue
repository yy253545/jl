<template>
  <div class="tabMd posFix">
    <ul class="wh flex flexAro">
      <li
        v-for="(item,index) in item"
        :key="index"
        :class="index == num ? 'active_li':''"
        v-on:click="tab_active(index)"
      >{{item.tab_tit}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "tabMd",
  props: {
    item: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
     
      num: "0"
    };
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
    tab_active: function(index) {
      //   console.log(index);
      this.num = index;
      this.$emit("tab_num", index);
    }
  },
  computed: {
    baseUrl() {
      return this.$store.getters.baseUrl;
    }
  }
};
</script>
<style scoped lang="less">
.tabMd {
  width: 100%;
  height: 0.9rem;
  padding: 0 0.35rem;
  background: #fff;
  z-index:1000;
  top: 0rem;
  li {
    font-size: 0.36rem;
    color: #000;
    height: 0.48rem;
    line-height: 0.48rem;
  }
  .active_li {
    color: #fe8800;
    border-bottom: #fe8800 solid 0.02rem;
  }
}
</style>
