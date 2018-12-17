<!-- 首页路由 -->
<template>
  <div id="indexRouter" class="wrapper page-index">

    <scroller lock-x :scrollbar-y=false height="-60" use-pullup @on-scroll-bottom="loadMore" v-model="status" ref="scroller">
    
    <div>

    <div class="head white">
      <v-swiper :swiper-data="bannerSwipe" />
    </div>

    <div class="brand bg-gray1 pda15">
      <div class="vAreaContent pda15 bg-white">
      <div class="vArea justify-content-space-between">
        <span><img :src="vPic" /></span>
        <span class="fs-10 txt-right"><router-link to="/vGoods">更多商品 》</router-link></span>
      </div>
      <div class="brand-list">
        <router-link class="item" :to="{path:'/goods', query:{id:item.id}}" v-for="(item, index) in vAreaList" :key="index">
          <p class="vPicClass"><img class="img" :src="urlPic+item.goodsMainPhoto.split(',')[0]" /></p>
          <p class="pdlr5" v-text="item.goodsName"></p> 
          <div class="center txt-orange fs-13 pdb10" v-text="'¥'+item.salePrice"></div>
        </router-link>
      </div>
     </div>
    </div>

    <div class="newListData pd15 bg-white" v-if="newListData">
       <router-link class="relative item pdtb15 justify-content-space-between" :to="{path:'/goods', query:{id:item.id}}" v-for="(item, index) in newListData" :key="index">
          <div class="flexg1"><img class="img" :src="urlPic+item.goodsMainPhoto.split(',')[0]" /></div>
          <div class="flexg2 listRight">
            <p class="goodsName txt-black-real" v-text="item.goodsName"></p> 
            <div class="rightBtm justify-content-space-between">
            <div>
            <p class="fs-18 mb5 txt-orange" v-text="'¥'+item.salePrice"></p>
            <p class="txt-gray1 center-line fs-10" v-text="'原价：¥'+item.salePrice"></p>
            </div>
            <div><mt-button size="small" type="primary" class="goodsDetail">立即抢购</mt-button></div>
            </div>
          </div>
        </router-link>
    </div>

     </div> 
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <span v-show="status.pullupStatus === 'default'"></span>
          <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
          <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
          <span v-show="status.pullupStatus === 'complete'">已加载完成</span>
      </div>
     </scroller>
  </div>
</template>

<script>
import vSwiper from "@/components/v-swiper";
import vNodata from "@/components/v-nodata";
import swiperPic from "@/assets/images/banner@2x.png";
import { Button } from "mint-ui";
import { Scroller, Spinner, Flexbox, FlexboxItem } from 'vux';
const qs = require("qs");
export default { 
  components: {
    Button
  },
  data() {
    return {
      vPic:require("@/assets/images/v@2x.png"),
      urlPic:this.api.urlPic,
      totalPage: 1,
      currentPage: 0,
      listData:[],
      pullup:true,
      status: {
        pullupStatus: 'default'
      },
      bannerSwipe: {
        speed: 800,
        auto: 3000,
        showIndicators: true,
        continuous: true,
        link: "/goods",
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
    "v-nodata": vNodata,
    Scroller,
    Spinner,
    Flexbox, 
    FlexboxItem
  },
  beforeCreate() {
    
  },
  created() {
    // 读取用户其他数据
    this.getBannerData();
    this.getVdata();
    this.loadMore();
  },
  methods: {
    loadMore (index) {
        if(this.currentPage< this.totalPage){
          this.currentPage= parseInt(this.currentPage) + 1;
          this.$axios.post(this.api.getGoodsList,qs.parse({ "page" : this.currentPage, "limit":8 }),{headers: {"content-type": "application/json"}})
          .then(res => {
             // console.log(res.data);
             this.totalPage=res.data.content.totalPage; 
             this.newListData = [...this.newListData,...res.data.content.list];
             // console.log(this.newListData);
          })
          .catch(res => {
           //下单失败，请您稍后重试
          });
        }else{
          this.pullup = false;
          this.status.pullupStatus = 'complete';
          setTimeout(()=>{
            this.status.pullupStatus = 'default';
            this.pullup = false;
          },1000);
          // console.log('已加载完');
        }
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 10)
    },
    // 获取banner图数据
    getBannerData() {
      this.$axios.post(this.api.getBanners,qs.parse({ "advertType" : 1, "deviceType":1 }),{headers: {"content-type": "application/json"}})
      .then(res => {
        let resData = res.data;
        console.log(resData);
        if (resData.code === 1) {
         let arrData = resData.content;
         console.log(arrData);
         if(arrData.length>0){
           let arr = [];
           arrData.forEach(val => {
              let obj = {//重新组装数组
                h5LinkUrl: val.h5LinkUrl||'',
                linkType: val.linkType||'',
                id: val.id||'',
                photoUrl: this.api.urlPic+val.photoUrl,
              };
              arr.push(obj);
            });
            console.log(arr);
            this.bannerSwipe.arrData = arr;
         }
        }
      });
    },
    // 获取小V专区三个商品信息
    getVdata() {
      this.$axios.get(this.api.getFloorList).then(res => {
        const resData = res.data;
        if (resData.code === 1) {
          const arrData = resData.content[0].goodsLst;
          let new2Array=[];
          arrData.map((v,i)=>{
            if(i<=2){
              new2Array.push(v)
            }
          });
        this.vAreaList = new2Array;
        }
      });
    }
  }
};
</script>
<style lang="stylus">
#indexRouter{
  .vPicClass{
    position:relative;
    width:100%;
    height: 0;
    padding-bottom: 100%;
  }
  .vPicClass img {
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
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