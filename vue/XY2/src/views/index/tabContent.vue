<!-- 首页路由 -->
<template>
  <div id="tabContent" class="wrapper page-index">
    <div class="white mgt10 pd10">
        <scroller lock-x :scrollbar-y=false height="-60" use-pullup use-pulldown @on-scroll-bottom="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
          <div>
            <div class="white">
             <grid :cols="4" :show-lr-borders="false">
              <grid-item  v-model="index3" class="vux-center" :label="item.className" v-for="(item,index3) in list3"  @on-item-click="onTabsClick(item)" :key="index3">
                <img slot="icon" :src="swiperPic">
              </grid-item>
            </grid> 
            </div> 
          <vTitle :title="items" />
        <div class="box2 newListData">
           <flexbox orient="vertical">
            <flexbox-item v-for="(goods, index) in listData" :key="index">
              <div @click="toDetail(goods.id)" class="mgt10 justify-content-space-between">
              <p><img :src="urlPic+goods.goodsMainPhoto.split(',')[0]"></p>
              <div class="flexg2 listRight">
                <p class="goodsName txt-black2 fs-14" v-text="goods.goodsName"></p> 
                <div class="rightBtm justify-content-space-between">
                <div>
                <p class="fs-18 mb5 txt-orange bold" v-text="'¥'+goods.salePrice"></p>
                <p class="txt-gray1 fs-10" v-text="'销量'+goods.saleCount"></p>
                </div>
                <div><mt-button size="small" type="primary" class="goodsDetail">立即抢购</mt-button></div>
                </div>
              </div>
              </div>
            </flexbox-item> 
          </flexbox>
        </div>
        </div>
        
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <span v-show="status.pullupStatus === 'default'"></span>
          <span class="pullup-arrow" v-show="status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
          <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
          <span v-show="status.pullupStatus === 'complete'">已加载完成</span>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Grid, GridItem, Scroller, Spinner, Flexbox, FlexboxItem } from 'vux';
import vTitle from "@/components/v-title";
import swiperPic from "@/assets/images/banner@2x.png";
const qs = require("qs");
export default {
  props : ['parentId'],// 接收父组件传过来的值
  data() {
    return {
      urlPic:this.api.urlPic,
      parentIds: this.parentId,
      totalPage: 1,
      currentPage: 0,
      listData:[],
      classId: 0,
      pullupEnabled: true,
      status: {
        pullupStatus: 'default'
      },
      swiperPic,
      list3: [],
      items:'',
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
    this.getTab(this.parentId);
    this.loadMore(this.classId);
    console.log(this.parentId);
  },
  computed:{
    
  },
  watch:{// 监听值的变化
    parentId (val, oldVal) {
      console.log(val, oldVal);
      this.getTab(val);
    }
  },
  methods: {
    getTab (id){
      this.$axios.get(this.api.getChildsList+id)
       .then(res => {
        if(res.data.code === 1){
           console.log(res.data);
           if(res.data.content.length>0){
             this.list3 = res.data.content;
             this.items = res.data.content[0].className;
             this.classId = res.data.content[0].id;
             this.onTabsClick(res.data.content[0]);
           }
        }
      })
      .catch(res => {
       //下单失败，请您稍后重试
      });
    },
    loadMore (classId) {
        if(this.currentPage< this.totalPage){
          this.currentPage= parseInt(this.currentPage) + 1;
          this.$axios.post(this.api.getClassList,qs.parse({'goodsParentClassId':classId, "page" : this.currentPage, "limit":8 }),{headers: {"content-type": "application/json"}})
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
        //  this.$refs.scroller.donePullup()
        }, 10)
    },
    onTabsClick(item){
      this.items = item.className;
      console.log(this.items);
      this.listData = [];
      this.totalPage = 1;
      this.currentPage = 0;
      this.loadMore(item.id);
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
        path:'/goods',//跳转的路径
        query:{//路由传参时push和query搭配使用 ，作用时传递参数
          id: id  
        }
      })
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