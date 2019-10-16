<template>
  <div id="swiper-container" class="swiper-container" :style="{background:url_back_img}">
    <div class="swiper-wrapper wh">
      <swiper :options="swiperOption" ref="mySwiper" class="swiperBox">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in swiperdata" :key="index" class>
          <img class v-lazy="item.slide_pic" alt>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
        <!-- <div class="swiper-button-next" slot="button-next"></div> -->
        <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
      </swiper>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css"; ////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "swiperComponent",
  props: {
    swiperdata: {
      type: Array,
      required: true
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，
        // 也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，
        // 那么这个属性一定要是true
        notNextTick: false,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        loop: true,
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: {
          el: ".swiper-pagination"
        },
        paginationClickable: true,
        // scrollbar: ".swiper-scrollbar",
        mousewheelControl: true,
        observeParents: true,
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true,
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        onTransitionStart(swiper) {
        //   console.log(swiper);
        }
      },
      url_back_img: "url(" + require("../imgs/swiperBgImg.jpg") + ")"
    };
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {
    this.swiper.slideTo(0, 0, false);
    setInterval(() => {
      let swiperdata = this.swiperdata;
    //   console.log(swiperdata);
      if (swiperdata.length < 3) {
        swiperdata.push(swiperdata.length + 1);
      }
    }, 3000);
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {},
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    baseUrl() {
      return this.$store.getters.baseUrl;
    }
  }
};
</script>
<style scoped lang="less">
#swiper-container {
  width: 100%;
  height: 3.85rem;
  .swiperBox {
    width: 90%;
    height: 90%;
    margin: 5% auto;
    .swiper-wrapper {
      height: 100%;
    }
  }
}
</style>
