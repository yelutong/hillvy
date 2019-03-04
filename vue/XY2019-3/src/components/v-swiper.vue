<!-- 轮播图组件 -->
<template>
  <swiper class="v-swiper" :style="swipeHeight" :showIndicators="swiperData.showIndicators" :continuous="swiperData.continuous" :auto="swiperData.auto" :speed="swiperData.speed">
    <swiper-item class="item" v-for="(item, index) in swiperData.arrData" :key="index">
      <a :href="item.h5LinkUrl" v-if="item.linkType&&item.linkType===1">
        <img class="img" ref="s" :src="item.photoUrl" />
      </a>
      <router-link v-else class="link" :to="{path:swiperData.link, query:{id:item.id}}">
        <img class="img" ref="s" :src="item.photoUrl" />
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
  },
  data(){
    return {
      swipeHeight:'height:100px'
    }
  },
  mounted(){
    setTimeout(()=>{
    console.log(this.$refs.s);
      if(this.$refs.s&&this.$refs.s.length>0){
        this.swipeHeight = 'height:'+(document.body.clientWidth/this.$refs.s[0].naturalWidth)*this.$refs.s[0].naturalHeight+'px';
        let height = (document.body.clientWidth/this.$refs.s[0].naturalWidth)*this.$refs.s[0].naturalHeight;
        console.log(height);
      }else{
        setTimeout(()=>{
           this.swipeHeight = 'height:'+(document.body.clientWidth/this.$refs.s[0].naturalWidth)*this.$refs.s[0].naturalHeight+'px';
        },500)
      }
    },1000)
  },
};
</script>

<style lang="stylus">
.v-swiper {
  width: 100%;
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
