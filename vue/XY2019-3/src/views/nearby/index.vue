<template>
  <div class="wrapper nearby">
    <header class="mint-header is-fixed">
        <div class="mint-header-button is-left" v-on:click='cityPatFun'>
          <button class="mint-button mint-button--default mint-button--normal left" v-text="limitStrFormat6(cityInputVal)"></button>
          <x-icon type="ios-arrow-down" class="arrowDown left" size="12"></x-icon>
      </div> 
      <h1 class="mint-header-title">附近商家</h1> 
      <div class="mint-header-button is-right" v-on:click='searchPatFun'><button class="mint-button mint-button--default mint-button--normal"><span class="mint-button-icon"><i class="mintui mintui-search"></i></span> <label class="mint-button-text"></label></button></div>
    </header>

    <scroller lock-x :scroll-bottom-offset="10" :scrollbar-y=false height="-50" use-pullup use-pulldown @on-scroll-bottom="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller" @on-pullup-loading="loadMore">
    <div class="mt50">
      <div class="white">
        <swiper height="210px" dots-position="center">
          <swiper-item class="black" v-if="listNav1">
            <grid :cols="5" :show-lr-borders="false">
              <grid-item  class="vux-center" :label="item.className" v-for="(item,index3) in listNav1"  @on-item-click="onTabsClick(item)" :key="index3">
                <img slot="icon" :src="urlPic+item.icon">
              </grid-item>
            </grid>
          </swiper-item>
          <swiper-item class="black" v-if="listNav2">
            <grid :cols="5" :show-lr-borders="false">
              <grid-item  class="vux-center" :label="item.className" v-for="(item,index2) in listNav2"  @on-item-click="onTabsClick(item)" :key="index2">
                <img slot="icon" :src="urlPic+item.icon">
              </grid-item>
            </grid>
          </swiper-item>
        </swiper>
      </div>
    
      <div class="white near pdt10 mt10">
         <div class="box2 newListData pd10">
           <flexbox orient="vertical">
            <flexbox-item v-for="(store, index) in listData" :key="index">
              <div @click="toDetail(store.id)" class="mgt10 justify-content-space-between">
              <p><img :src="urlPic+store.imgLogo"></p>
              <div class="flexg2 listRight">
                <p class="goodsName txt-black2 fs-14" v-text="store.merchantName"></p>
                <i v-if="store.distance" v-text="disFormat(store.distance)" class="distance txt-gray1"></i> 
                <div class="rightBtm justify-content-space-between">
                <div>
                <p class="fs-12 mb5 txt-blue" v-text="store.sellerClassName"></p>
                <rater disabled :font-size="10" active-color="#ff4f00" :value="store.totalScore"></rater><i class="fs-12 ml5 txt-orange" v-text="store.totalScore.toFixed(1)"></i>
                <p class="txt-gray1 fs-10 location mt5" v-text="store.merchantAddress"></p>
                </div>
                </div>
              </div>
              </div>
            </flexbox-item> 
          </flexbox>
        </div>
    </div>
    <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -50px; text-align: center;">
      <span v-show="status.pullupStatus === 'default'"></span>
      <span class="pullup-arrow" v-show="status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
      <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      <span v-show="status.pullupStatus === 'complete'">已加载完成</span>
    </div>

    </div>
    </scroller> 
   <com-citychoice ref="city" v-on:tochildevent='cityjs'></com-citychoice>
   <search ref="search" v-on:selectStore='storeSearch'></search> 
    <v-footer active="nearby" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Toast } from "mint-ui";
import {  Rater, Scroller, Spinner, Swiper, SwiperItem,  Grid, GridItem, Flexbox, FlexboxItem } from 'vux';
import vNodata from "@/components/v-nodata";
import vFooter from "@/components/v-footer";
import comCitychoice from "@/components/comCitychoice";
import search from "@/components/search";
const qs = require("qs");
export default {
  data() {
    return {
      urlPic:this.api.urlPic,
      cityInputVal:'',
      listNav1:[],
      listNav2:[],
      data3: '5',
      loadMoreVal: true,
      totalPage: 1,
      currentPage: 0,
      status: {
        pullupStatus: 'default'
      },
      listData:[]
    }
  },
  components: { 
    "v-footer": vFooter,
    "com-citychoice": comCitychoice,
    search,
    Scroller,
    Rater,
    Spinner,
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    Flexbox, 
    FlexboxItem
  },
  computed: {
    ...mapState(["token","city","location"]),
  },
  mounted(){
   console.log('城市:'+this.city,'经纬度：'+ this.location.lat,this.location.lng);
   if(!this.city || !this.location){
     let _this = this;
     this.getCurrentCityName().then(function(val){
       let data = val.name;
       if(data&&data.substr(data.length-1)=='市'){
          data = data.substr(0,data.length-1);
        }
        _this.cityInputVal = data;
        _this.atnCity(data);
        _this.atnLocation(val.center);
      })
   }else{
     this.cityInputVal = this.city||'城市';
   }
  },
  beforeCreate(){
    document.title = '附近商家';
  },
  created() {
    this.getstoreClass();
    this.loadMore();
  },
  methods: { 
    ...mapActions(["atnCity","atnLocation"]),
    loadMore() {
     if(this.loadMoreVal){
       this.loadMoreVal=false;
        setTimeout(()=>{
         this.loadMoreVal=true;
        },1000)
     }else{
       return;
     }
     if(this.currentPage< this.totalPage){
      this.currentPage= parseInt(this.currentPage) + 1;
      this.$axios.post(this.api.sellerstoreList,qs.parse({'latitude':this.location.lat,'longitude':this.location.lng, "page" : this.currentPage, "limit":8 }),{headers: {"content-type": "application/json"}})
      .then(res => {
         console.log(res.data);
         this.totalPage=res.data.content.totalPage; 
         this.listData = [...this.listData,...res.data.content.list];
         console.log(this.listData);
      })
      .catch(res => {
       //失败，请您稍后重试
      });
    }else{
      this.status.pullupStatus = 'complete';
      setTimeout(()=>{
        this.status.pullupStatus = 'default';
      },2000);
      console.log('已加载完');
    }
    setTimeout(() => {
     // this.$refs.scroller.donePullup()
    }, 10)
    },
    refresh () {
       console.log('刷新');
       this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
            this.pullupEnabled && this.$refs.scroller.enablePullup()
          }, 10)
        })
    },
    toDetail (id) {
      console.log(21);
      this.$router.push({//核心语句
        path:'/store',//跳转的路径
        query:{//路由传参时push和query搭配使用 ，作用时传递参数
          id: id  
        }
      })
    },
    onTabsClick(item){
      this.$router.push({//核心语句
        path:'/nearby/index',//跳转的路径
        query:{//路由传参时push和query搭配使用 ，作用时传递参数
          id: item.id,
          className: item.className
        }
      })
    },
    getstoreClass(){
      this.$axios.get(this.api.storeClassList)
      .then(res => {
        if(res.data.code === 1){
          let arrData = res.data.content;
            arrData.map((v,i)=>{
              if(i<=9){
                this.listNav1.push(v)
              }else if(i>9&&i<=18){
                this.listNav2.push(v)
              }
            });
        }
      })
      .catch(res => {
       //下单失败，请您稍后重试
      });
    },
    cityPatFun(){
        this.$refs.city.cityFun();
    },
    cityjs(data){
      this.cityInputVal=data;
      this.atnCity(data);
    },
    storeSearch(data){
      //this.cityInputVal=data;
      //this.atnCity(data);
    },
    searchPatFun(){
      this.$refs.search.searchFun();
    },
    getCurrentCityName() {
      return new Promise(function (resolve, reject) {
        let myCity = new BMap.LocalCity()
        myCity.get(function (result) {
          console.log(result);
          resolve(result)
        })
      })
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/nearby';
</style>
