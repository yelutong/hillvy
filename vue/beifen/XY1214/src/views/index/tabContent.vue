<!-- 首页路由 -->
<template>
  <div id="tabContent" class="wrapper page-index">
    <div class="white">

     <grid :cols="4" :show-lr-borders="false">
      <grid-item  v-model="index3" class="vux-center" :label="item" v-for="(item,index3) in list3"  @on-item-click="onTabsClick(item)" :key="index3">
        <img slot="icon" :src="swiperPic">
      </grid-item>
    </grid>
    {{items}} Container


    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Grid, GridItem } from 'vux';
const list3 = () => ['精选', '美食', '电影', '酒店', '外卖']
import swiperPic from "@/assets/images/banner@2x.png";
export default {
  data() {
    return {
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
      brandList: [],
      activityData: null,
      noMeals: false,
      mealsList: []
    };
  },
  components: {
    Grid,
    GridItem,
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  beforeCreate() {
    
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
    onTabsClick(item){
      this.items = item;
      console.log(this.items);
    },
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