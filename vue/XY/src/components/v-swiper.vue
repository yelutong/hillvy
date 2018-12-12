<!-- 轮播图组件 -->
<template>
  <swiper class="v-swiper" :showIndicators="swiperData.showIndicators" :continuous="swiperData.continuous" :auto="swiperData.auto" :speed="swiperData.speed">
    <swiper-item class="item" v-for="(item, index) in swiperData.arrData" :key="index">
      <router-link class="link" :to="{path:swiperData.link, query:{id:item.id}}">
        <p class="text elips" v-if="swiperData.type === 'text'">{{ item.con }}</p>
        <img class="img" v-else :src="item.con" />
      </router-link>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swipe, SwipeItem } from "mint-ui";
export default {
  props: {
    swiperData: Object
  },
  components: {
    swiper: Swipe,
    "swiper-item": SwipeItem
  }
};
</script>

<style lang="stylus">
.v-swiper {
  width: 100%;
  min-height: 117px;
  background-color: #fff;
  .item, .link, .img {
    width: 100%;
    height: auto;
  }

  .link {
    display: flex;
    align-items: center;

    &:active {
      color: #FF4F00;
    }
  }

  .text {
    font-size: 12px;
    color: #000;
  }
}
</style>
