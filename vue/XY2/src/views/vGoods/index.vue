<template>
  <div id="vGoods" class="wrapper page-index">
    <mt-header fixed title="小V专区" class="txt-black bg-white"></mt-header>
   <div class="white vGoods">
        <scroller lock-x :scrollbar-y=false height="-60" use-pullup use-pulldown @on-scroll-bottom="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
        <div class="box2">
           <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/2" v-for="(goods, index) in listData" :key="index">
              <div @click="toDetail(goods.id)" class="mgt10 vuxItem">
              <p class="boxPic"><img :src="urlPic+goods.goodsMainPhoto.split(',')[0]"></p>
              <p v-text="goods.goodsName" class="vGoodsName fs-12"></p>
              <p><b class="fs-15 txt-orange rt5" v-text="'¥'+goods.salePrice"></b></p>
              <p><i class="txt-gray" v-text="'销量'+goods.saleCount"></i></p>
             </div>
            </flexbox-item> 
          </flexbox>
        </div>
        
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <span v-show="status.pullupStatus === 'default'"></span>
          <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
          <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
          <span v-show="status.pullupStatus === 'complete'">已加载完成</span>
        </div>
      </scroller>
    </div>
  <v-footer active="vGoods"/>
  </div>
</template>
<script>
import { Scroller, Spinner,Flexbox, FlexboxItem  } from 'vux';
import vFooter from "@/components/v-footer";
const qs = require("qs");
import { Header } from "mint-ui";
export default {
  data() {
    return {
      urlPic:this.api.urlPic,
      totalPage: 1,
      currentPage: 0,
      listData:[],
      isLevelPackage: this.getUrlParam("isLevelPackage")||1,
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
  },
  components: { 
    "v-footer": vFooter,
    Scroller,
    Spinner,
    Flexbox, 
    FlexboxItem
  },
  beforeCreate() {
    document.title = "新银众商";
  },
  created() {
    this.loadMore();
  },
  methods: {
    loadMore (index) {
      if(index==1){
        this.currentPage = 0;this.totalPage = 1;this.listData=[];
        if(this.currentPage< this.totalPage){
            this.currentPage= parseInt(this.currentPage) + 1;
            this.$axios.post(this.api.getGoodsList,qs.parse({ "page" : this.currentPage, "limit":8 ,"isLevelPackage":this.isLevelPackage }),{headers: {"content-type": "application/json"}})
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
          this.$axios.post(this.api.getGoodsList,qs.parse({ "page" : this.currentPage, "limit": 8,"isLevelPackage":this.isLevelPackage  }),{headers: {"content-type": "application/json"}})
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
    toDetail (id) {
      console.log(21);
      this.$router.push({//核心语句
        path:'/goods',//跳转的路径
        query:{//路由传参时push和query搭配使用 ，作用时传递参数
          id: id,
          vGoods:'1' 
        }
      })
    }
  }
};
</script>
<style lang="stylus">
#vGoods{
  background:#e9edf0;
  .vGoods{
    margin:50px 0;
    padding:0 5px;
  }
  .vux-flexbox-item{
    padding:0 5px;
  }
  .vuxItem{
    padding:10px;
    border-radius:5px;
    background:#F6F5F5;
  }
}

</style>
