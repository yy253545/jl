<template>
  <div class="newsList posRel" @click="into_newsDetail_fun(item.id)">
    <span v-if="item.post_type == 1" class="typeName_news posAbs mid">{{item.post_type_text}}</span>
    <span v-else-if="item.post_type == 2" class="typeName_hd posAbs mid">{{item.post_type_text}}</span>
    <span v-else-if="item.post_type == 3" class="typeName_gn posAbs mid">{{item.post_type_text}}</span>
    <span v-else-if="item.post_type == 5" class="typeName_test posAbs mid">{{item.post_type_text}}</span>
    <span class="title posAbs mid ellipsis">{{item.post_title}}</span>
    <span class="time posAbs mid">{{item.post_date}}</span>
  </div>
</template>

<script>
export default {
  name: "newsListMd",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      defaultImg: require("../../imgs/defaultImg.png")
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
    into_newsDetail_fun: function(id) {
      //点击进入内容详情页
      var that = this;
      that.$router.push({ name: "newsDetail", params: { id: id } });
      that.$store.dispatch("detail_id", id);
      window.localStorage.setItem("detail_id", id);
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
.newsList {
  width: 100%;
  height: 0.75rem;
  border-bottom: 0.01rem solid #e6e6e6;
  .typeName_news {
    font-size: 0.2rem;
    line-height: 0.28rem;
    padding: 0 0.05rem;
    left: 0;
    color: #ea8630;
    border: 0.01rem solid #ea8630;
  }
  .typeName_hd {
    font-size: 0.2rem;
    line-height: 0.28rem;
    padding: 0 0.05rem;
    left: 0;
    color: #603eae;
    border: 0.01rem solid #603eae;
  }
  .typeName_gn {
    font-size: 0.2rem;
    line-height: 0.28rem;
    padding: 0 0.05rem;
    left: 0;
    color: #ea2c96;
    border: 0.01rem solid #ea2c96;
  }
  .typeName_test {
    font-size: 0.2rem;
    line-height: 0.28rem;
    padding: 0 0.05rem;
    left: 0;
    color: #e51b05;
    border: 0.01rem solid #e51b05;
  }
  .title {
    font-size: 0.28rem;
    color: #333;
    width: 5rem;
    left: 0.8rem;
  }
  .time {
    font-size: 0.2rem;
    color: #b3b3b3;
    right: 0;
  }
}
</style>
