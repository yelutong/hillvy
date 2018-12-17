<!-- 首页路由 -->
<template>
  <div id="tabContent" class="wrapper page-index">
    <div class="white mgt10 pd10">
        <scroller lock-x :scrollbar-y=false height="-60" use-pullup @on-scroll-bottom="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
          <div>
            <div class="white">
             <grid :cols="4" :show-lr-borders="false">
              <grid-item  v-model="index3" class="vux-center" :label="item" v-for="(item,index3) in list3"  @on-item-click="onTabsClick(item)" :key="index3">
                <img slot="icon" :src="swiperPic">
              </grid-item>
            </grid> 
            </div> 
          <vTitle :title="items" />
        <div class="box2">
           <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/2" v-for="(goods, index) in listData" :key="index" class="mgt10">
              <p><img :src="urlPic+goods.goodsMainPhoto.split(',')[0]"></p>
              <p v-text="goods.goodsName" class="tabGoodsName center fs-12"></p>
              <p class="center"><b class="fs-15 txt-orange rt5" v-text="'¥'+goods.salePrice"></b><i class="center-line" v-text="'¥'+goods.marketPrice"></i></p>
            </flexbox-item> 
          </flexbox>
        </div>
        
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <span v-show="status.pullupStatus === 'default'"></span>
          <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
          <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
          <span v-show="status.pullupStatus === 'complete'">已加载完成</span>
        </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Grid, GridItem, Scroller, Spinner, Flexbox, FlexboxItem } from 'vux';
const list3 = () => ['新鲜水果', '精选肉类', '海鲜水产', '新鲜蔬菜', '蛋类产品']
import vTitle from "@/components/v-title";
import swiperPic from "@/assets/images/banner@2x.png";
const qs = require("qs");
export default {
  data() {
    return {
      urlPic:this.api.urlPic,
      totalPage: 1,
      currentPage: 0,
      listData:[],
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      swiperPic,
      list3: list3(),
      items:'新鲜水果',
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
    Spinner,
    vTitle,
    Flexbox, 
    FlexboxItem
  },
  beforeCreate() {
    
  },
  created() {
    // 读取用户其他数据
    this.getBannerData();
    this.loadMore();
  },
  methods: {
    loadMore (index) {
      if(index==1){
        this.currentPage = 0;this.totalPage = 1;this.listData=[];
        if(this.currentPage< this.totalPage){
            this.currentPage= parseInt(this.currentPage) + 1;
            this.$axios.post(this.api.getGoodsList,qs.parse({ "page" : this.currentPage, "limit":8 }),{headers: {"content-type": "application/json"}})
            .then(res => {
               console.log(res.data);
               this.totalPage=res.data.content.totalPage; 
               this.listData = [...this.listData,...res.data.content.list];
               console.log(this.listData);
            })
            .catch(res => {
             //下单失败，请您稍后重试
            });
        }else{
            this.status.pullupStatus = 'complete';
            setTimeout(()=>{
              this.status.pullupStatus = 'default';
            },1000);
            console.log('已加载完');
          }
          setTimeout(() => {
            this.$refs.scroller.donePullup()
          }, 10) 
      }else{
        if(this.currentPage< this.totalPage){
          this.currentPage= parseInt(this.currentPage) + 1;
          this.$axios.post(this.api.getGoodsList,qs.parse({ "page" : this.currentPage, "limit":8 }),{headers: {"content-type": "application/json"}})
          .then(res => {
             console.log(res.data);
             this.totalPage=res.data.content.totalPage; 
             this.listData = [...this.listData,...res.data.content.list];
             console.log(this.listData);
          })
          .catch(res => {
           //下单失败，请您稍后重试
          });
        }else{
          this.status.pullupStatus = 'complete';
          setTimeout(()=>{
            this.status.pullupStatus = 'default';
          },1000);
          console.log('已加载完');
        }
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 10)
      }
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
    onTabsClick(item){
      this.items = item;
      console.log(this.items);
      this.loadMore(1);
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
  .tabGoodsName{
    padding: 0 5px;
    margin: 10px 0 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .vux-flexbox-item {
    padding:5px;
  }
}
</style>