<template>
  <div>
    <div class="tab" ref="tab">
      <div class="tab_content" ref="tabcontent">
        <div
          class="tab_item"
          v-for="(item, index) in lastGameList"
          :key="index"
          ref="tabitem"
          :gameinfo="item"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import footGuide from "src/components/footGuide";
import BScroll from "better-scroll";
// import game_block from "src/components/gameBlock";
export default {
  name: "bscroll",
  data() {
    return {
      selected: "game",
      activeIndex: "game"
    };
  },
  components: {
    // footGuide,
    // game_block
  },
  created() {
    this.$nextTick(() => {
      this.InitTabScroll();
    }); //必须等dom元素挂载完下一帧才能渠道$refs
  },
  props: ["lastGameList"],
  methods: {
    goSpecial(index) {
      //   console.log("jump to index:" + index);
    },
    InitTabScroll() {
      console.log(this.lastGameList);
      var len = this.lastGameList.length;
      console.log(len);
      //   console.log(this.lastGameList);
      this.$refs.tabcontent.style.width = len * 150 + "px";

      //   console.log(width);
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.tab, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  }
};
</script>

<style scoped lang="less" >
.tab {
  display: inline-block;
  width: 100%;
  height: 130px;
  overflow: hidden;
}
.tab_content {
  text-align: "center";
  height: 130px;
}
.tab_item {
  display: inline-block;
}
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 10px;
}
span {
  font-size: 0.4rem;
}
</style>
