<!-- 首页路由 -->
<template>
  <div id="indexRouter" class="wrapper page-index">
    <div class="head white">
      <v-swiper :swiper-data="bannerSwiper" />
    </div>
    <div class="news">
      <div class="tit">
        <img class="img" :src="newsTag" />
        <hr class="line" />
        <marquee :duration="dailySwiper.duration" :interval="dailySwiper.interval" :direction="dailySwiper.direction" :item-height="dailySwiper.height">
          <marquee-item class="item" v-for="(item, index) in dailySwiper.arrData" :key="index" @click.native="pageToDaily(item.id)">
            {{ item.con }}
          </marquee-item>
        </marquee>
      </div>
      <div class="con mid-img" v-if="dailySwiper.arrData.length > 0" @click="pageToDaily(dailySwiper.arrData[0].id)">
        <img class="img" :src="dailySwiper.arrData[0].img" />
      </div>
    </div>
    <div class="brand white">
      <v-title title="两大品牌"></v-title>
      <div class="brand-list">
        <router-link class="item" :to="{path:'/goods', query:{id:item.productId}}" v-for="(item, index) in brandList" :key="index">
          <img class="img" :src="item.photoUrl" />
        </router-link>
      </div>
    </div>
    <div class="activity" v-if="!!activityData" @click="pageToActivity">
      <div class="tit">
        <img class="img" :src="activityTag" />
        <hr class="line" />
        <span class="act-txt elips">{{ activityData.desciption }}</span>
      </div>
      <div class="con mid-img">
        <img class="img" :src="activityData.photoUrl" />
      </div>
    </div>
    <div class="meals white">
      <v-title title="习将军全系列"></v-title>
      <v-meals :meals-data="mealsList" />
      <v-nodata v-if="noMeals" hasimg="no" height="75" text="- 没有套餐信息 -" />
    </div>
    <v-footer active="index" />
  </div>
</template>

<script>
import vSwiper from "@/components/v-swiper";
import vTitle from "@/components/v-title";
import vMeals from "@/components/v-meals";
import vNodata from "@/components/v-nodata";
import vFooter from "@/components/v-footer";
import { Marquee, MarqueeItem } from "vux";

import swiperPic from "@/assets/images/banner@2x.png";

export default {
  data() {
    return {
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
      newsTag: require("../assets/images/news-tag.png"),
      activityTag: require("../assets/images/act-tag.png"),
      brandList: [],
      activityData: null,
      noMeals: false,
      mealsList: []
    };
  },
  components: {
    "v-swiper": vSwiper,
    "v-title": vTitle,
    "v-meals": vMeals,
    "v-nodata": vNodata,
    "v-footer": vFooter,
    Marquee,
    MarqueeItem
  },
  beforeCreate() {
    document.title = "新银众商";
  },
  created() {
    // 读取用户其他数据
    this.getBannerData();
    this.getDailyData();
    this.getBrandData();
    this.getActivityData();
    this.getMealsData();
  },
  methods: {
    // 获取banner图数据
    getBannerData() {
      this.$axios.get(this.api.getBanner).then(res => {
        let resData = res.data;
        console.log(resData);
        if (resData.code === 100) {
          // let arrData = resData.data;
          let arrData = [
           {createDate: 1523429636000,id: 4,path: "7",photoId: 287,photoUrl: swiperPic,sort: 1,state: "1",type: "product"},
           {createDate: 1523429636000,id: 4,path: "7",photoId: 287,photoUrl: swiperPic,sort: 1,state: "1",type: "product"},
           {createDate: 1523429636000,id: 4,path: "7",photoId: 287,photoUrl: swiperPic,sort: 1,state: "1",type: "product"}
          ];
         console.log(resData);
         let arr = [];
         arrData.forEach(val => {
            let obj = {
              id: val.path,
              con: val.photoUrl
            };
            arr.push(obj);
          });
          console.log(arr);
          this.bannerSwiper.arrData = arr;
        }
      });
    },
    // 获取每日快报数据
    getDailyData() {
      this.$axios
        .get(this.api.getDaily, {
          params: {
            page_no: 1,
            page_size: 5
          }
        })
        .then(res => {
          let resData = res.data;
          if (resData.code === 100) {
            let arrData = resData.data.records;
            let arr = [];
            arrData.forEach(val => {
              let obj = {
                id: val.id,
                con: val.title + "：" + val.summary,
                img: val.photoPath
              };
              arr.push(obj);
            });
            this.dailySwiper.arrData = arr;
          }
        });
    },
    // 跳转快报页面
    pageToDaily(id) {
      this.$router.push({
        path: "/news/article",
        query: { type: "daily", id: id }
      });
    },
    // 获取两大品牌信息
    getBrandData() {
      this.$axios.get(this.api.getBrand).then(res => {
        const resData = res.data;
        if (resData.code === 100) {
          const arrData = resData.data;
          this.brandList = arrData || [];
        }
      });
    },
    // 获取活动banner数据
    getActivityData() {
      this.$axios
        .get(this.api.getActivity)
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            this.activityData = null;
            return;
          }
          const arrData = resData.data || [];
          this.activityData = arrData.length === 0 ? null : arrData[0];
        })
        .catch(res => {
          this.activityData = null;
        });
    },
    // 跳转活动
    pageToActivity() {
      this.showTip("活动正在策划中，敬请期待...");
    },
    // 获取套餐信息
    getMealsData() {
      this.$axios
        .get(this.api.getMeals)
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            this.noMeals = true;
            return;
          }
          const arrData = resData.data || [];
          if (arrData.length === 0) {
            this.noMeals = true;
            return;
          }
          arrData.forEach(val => {
            let obj = {
              id: val.id,
              title: val.name,
              intro: val.sellingPoint,
              img: val.indexPhotoUrl
            };
            this.mealsList.push(obj);
          });
        })
        .catch(res => {
          this.noMeals = true;
        });
    }
  }
};
</script>
<style lang="stylus">
@import '../assets/css/index';
</style>
