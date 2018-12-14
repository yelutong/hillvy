<!-- 首页路由 -->
<template>
  <div id="tabContent" class="wrapper page-index">
    <div class="white">
     <grid :cols="4" :show-lr-borders="false">
      <grid-item  v-model="index3" class="vux-center" :label="item" v-for="(item,index3) in list3"  @on-item-click="onTabsClick(item)" :key="index3">
        <img slot="icon" :src="swiperPic">
      </grid-item>
    </grid> 
    </div>
    <div class="white mgt10">
        {{items}} Container 

        <scroller lock-x scrollbar-y use-pullup use-pulldown height="200px" @on-pullup-loading="loadMore" @on-scroll-bottom="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
        <div class="box2">
          <p v-for="i in n">placeholder {{i}}</p>
        </div>
        <!--pullup slot-->
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <span v-show="status.pullupStatus === 'default'"></span>
          <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
          <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
      </scroller>
      
    </div>



  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Grid, GridItem, Scroller, Spinner } from 'vux';
const list3 = () => ['新鲜水果', '精选肉类', '海鲜水产', '新鲜蔬菜', '蛋类产品']

import swiperPic from "@/assets/images/banner@2x.png";
export default {
  data() {
    return {
      n: 10,
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      swiperPic,
      list3: list3(),
      demo2: '精选',
      items:'精选',
      index3: 0,
      bannerSwiper: {
        speed: 800,
        auto: 3000,
        showIndicators: true,
        continuous: true,
        link: "/goods",
        arrData: []
      }, 
      dailySwiper: {
        interval: 3000,
        duration: 800,
        direction: "up",
        height: document.body.offsetWidth/7.5*0.77,
        arrData: []
      },
      newsTag: require("@/assets/images/news-tag.png"),
      activityTag: require("@/assets/images/act-tag.png"),
    };
  },
  components: {
    Grid,
    GridItem,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Scroller,
    Spinner
  },
  beforeCreate() {
    
  },
  created() {
    // 读取用户其他数据
    this.getBannerData();
  },
  methods: {
    loadMore () {
      setTimeout(() => {
        this.n += 10
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 10)
      }, 2000)
    },
    refresh () {
      setTimeout(() => {
        this.n = 10
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
            this.pullupEnabled && this.$refs.scroller.enablePullup()
          }, 10)
        })
      }, 2000)
    },
    onTabsClick(item){
      this.items = item;
      console.log(this.items);
    },
    // 获取banner图数据
    getBannerData() {
      this.$axios.get(this.api.getBanner).then(res => {
        let resData = res.data;
        if (resData.code === 100) {
        
        }
      });
    }
  }
};
</script>
<style lang="stylus">
#tabContent{
  .weui-grids:before,.weui-grid:before,.weui-grid:after{
    height: 0px!important;
    width: 0px!important;
  }
  .weui-grid__icon{
    height: 55px!important;
    width: 55px!important;
  }
  .weui-grid__icon img{
    border-radius:50%;
  }
}
</style>