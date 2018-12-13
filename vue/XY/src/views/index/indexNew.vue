<!-- 首页路由 -->
<template>
  <div id="indexRouter" class="wrapper page-index">

    <div class="head white">
      <v-swiper :swiper-data="bannerSwiper" />
    </div>

    <div class="brand bg-gray1 pda15">
      <div class="vAreaContent pda15 bg-white">
      <div class="vArea justify-content-space-between">
        <span><img :src="vPic" /></span>
        <span class="fs-10 txt-right"><router-link to="/vGoods">更多商品 》</router-link></span>
      </div>
      <div class="brand-list">
        <router-link class="item" :to="{path:'/goods', query:{id:item.productId}}" v-for="(item, index) in vAreaList" :key="index">
          <img class="img" :src="item.photoUrl" />
          <p class="pdlr5" v-text="item.name"></p> 
          <div class="center txt-orange fs-13 pdb10" v-text="'¥'+item.price"></div>
        </router-link>
      </div>
     </div>
    </div>

    <div class="newListData pd15 bg-white" v-if="newListData">
       <router-link class="relative item pdtb15 justify-content-space-between" :to="{path:'/goods', query:{id:item.productId}}" v-for="(item, index) in newListData" :key="index">
          <div class="flexg1"><img class="img" :src="item.photoUrl" /></div>
          <div class="flexg2 listRight">
            <p class="goodsName txt-black-real" v-text="item.name"></p> 
            <div class="rightBtm justify-content-space-between">
            <div>
            <p class="fs-18 mb5 txt-orange" v-text="'¥'+item.price"></p>
            <p class="txt-gray1 center-line fs-10" v-text="'原价：¥'+item.cprice"></p>
            </div>
            <div><mt-button size="small" type="primary" class="goodsDetail">立即抢购</mt-button></div>
            </div>
          </div>
        </router-link>
    </div>
  </div>
</template>

<script>
import vSwiper from "@/components/v-swiper";
import vNodata from "@/components/v-nodata";

import swiperPic from "@/assets/images/banner@2x.png";
import { Button } from "mint-ui";
export default { 
  components: {
    Button
  },
  data() {
    return {
      vPic:require("@/assets/images/v@2x.png"),
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
      vAreaList: [],
      newListData: []
    };
  },
  components: {
    "v-swiper": vSwiper,
    "v-nodata": vNodata
  },
  beforeCreate() {
    
  },
  created() {
    // 读取用户其他数据
    this.getBannerData();
    this.getDailyData();
    this.getBrandData();
    this.getnewListData();
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
    // 获取小V专区三个商品信息
    getBrandData() {
      this.$axios.get(this.api.getBrand).then(res => {
        const resData = res.data;
        if (resData.code === 100) {
          //const arrData = resData.data;
          const arrData =[
          {
            appletPhotoId: 926,
            appletPhotoUrl: "http://img12.360buyimg.com//n0/jfs/t1/24895/21/1419/407172/5c1202a0Eb5c66789/011f2bb92f58f087.png",
            createDate: 1523413928000,
            id: 5,
            name: "艾戈勒（agelocer）布达佩斯系列瑞士原装进口手表男 三针多功能商务男表 全自动机械表防水带日历 银壳黑皮带 动能指示 4101A1【爆款】",
            photoId: 194,
            photoUrl: "http://img12.360buyimg.com//n0/jfs/t1/24895/21/1419/407172/5c1202a0Eb5c66789/011f2bb92f58f087.png",
            product: 360,
            productId: 8,
            price: 360,
            showIndex: 1,
            state: "1"
          },{
            appletPhotoId: 926,
            appletPhotoUrl: "http://img12.360buyimg.com//n0/jfs/t1/24895/21/1419/407172/5c1202a0Eb5c66789/011f2bb92f58f087.png",
            createDate: 1523413928000,
            id: 5,
            name: "艾戈勒（agelocer）布达佩斯系列瑞士原装进口手表男 三针多功能商务男表 全自动机械表防水带日历 银壳黑皮带 动能指示 4101A1【爆款】",
            photoId: 194,
            photoUrl: "http://img12.360buyimg.com//n0/jfs/t1/24895/21/1419/407172/5c1202a0Eb5c66789/011f2bb92f58f087.png",
            product: 360,
            productId: 8,
            price: 360,
            showIndex: 1,
            state: "1"
          },{
            appletPhotoId: 926,
            appletPhotoUrl: "http://img12.360buyimg.com//n0/jfs/t1/24895/21/1419/407172/5c1202a0Eb5c66789/011f2bb92f58f087.png",
            createDate: 1523413928000,
            id: 5,
            name: "艾戈勒（agelocer）布达佩斯系列瑞士原装进口手表男 三针多功能商务男表 全自动机械表防水带日历 银壳黑皮带 动能指示 4101A1【爆款】",
            photoId: 194,
            photoUrl: "http://img12.360buyimg.com//n0/jfs/t1/24895/21/1419/407172/5c1202a0Eb5c66789/011f2bb92f58f087.png",
            product: 360,
            productId: 8,
            price: 360,
            showIndex: 1,
            state: "1"
          }];



          this.vAreaList = arrData || [];
        }
      });
    },
    // 获取活动banner数据
    getnewListData() {
      this.$axios
        .get(this.api.getActivity)
        .then(res => {
          const resData = res.data;
          if (resData.code == 100) {
            //const arrData = resData.data || [];
            const arrData =[
          {
            appletPhotoId: 926,
            appletPhotoUrl: "http://img12.360buyimg.com//n0/jfs/t1/24895/21/1419/407172/5c1202a0Eb5c66789/011f2bb92f58f087.png",
            createDate: 1523413928000,
            id: 5,
            name: "艾戈勒（agelocer）布达佩斯系列瑞士原装进口手表男 三针多功能商务男表 全自动机械表防水带日历 银壳黑皮带 动能指示 4101A1【爆款】",
            photoId: 194,
            photoUrl: "http://img12.360buyimg.com//n0/jfs/t1/24895/21/1419/407172/5c1202a0Eb5c66789/011f2bb92f58f087.png",
            product: 360,
            productId: 8,
            price: 360,
            cprice: 480,
            showIndex: 1,
            state: "1"
          },{
            appletPhotoId: 926,
            appletPhotoUrl: "http://img12.360buyimg.com//n0/jfs/t1/24895/21/1419/407172/5c1202a0Eb5c66789/011f2bb92f58f087.png",
            createDate: 1523413928000,
            id: 5,
            name: "艾戈勒（agelocer）布达佩斯系列瑞士原装进口手表男 三针多功能商务男表 全自动机械表防水带日历 银壳黑皮带 动能指示 4101A1【爆款】",
            photoId: 194,
            photoUrl: "http://img12.360buyimg.com//n0/jfs/t1/24895/21/1419/407172/5c1202a0Eb5c66789/011f2bb92f58f087.png",
            product: 360,
            cprice: 480,
            productId: 8,
            price: 360,
            showIndex: 1,
            state: "1"
          },{
            appletPhotoId: 926,
            appletPhotoUrl: "http://img12.360buyimg.com//n0/jfs/t1/24895/21/1419/407172/5c1202a0Eb5c66789/011f2bb92f58f087.png",
            createDate: 1523413928000,
            id: 5,
            name: "艾戈勒（agelocer）布达佩斯系列瑞士原装进口手表男 三针多功能商务男表 全自动机械表防水带日历 银壳黑皮带 动能指示 4101A1【爆款】",
            photoId: 194,
            photoUrl: "http://img12.360buyimg.com//n0/jfs/t1/24895/21/1419/407172/5c1202a0Eb5c66789/011f2bb92f58f087.png",
            product: 360,
            cprice: 480,
            productId: 8,
            price: 360,
            showIndex: 1,
            state: "1"
          }];

            this.newListData = arrData;
            console.log(this.newListData)
          }
          
        })
        .catch(res => {
          this.newListData = 360;
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
#indexRouter{
  .vArea img{
    width:86px;
  }
  .vAreaContent{
    border-radius:5px;
  }
  .brand-list p {
    text-align: center;
    font-size: 12px;
    margin: 5px 0 5px 0;
    overflow: hidden;
    color: #8C8C8C;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .newListData img{
    width:115px;
    height:115px;
    margin-right:15px;
  }
  .listRight p.goodsName{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .mint-button--small{
    width:78px;
    height:24px;
    border-radius:3px;
    font-size:10px;
  }
  .rightBtm div:nth-child(1){
    margin-top:30px;
  }
  .rightBtm div:nth-child(2){
    margin-top:48px;
  }
  .mint-button--primary{
    background: #FF4F00!important;
  }
}

</style>