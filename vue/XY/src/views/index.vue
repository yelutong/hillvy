<!-- 首页路由 -->
<template>
  <div id="index" class="wrapper page-index">

    <tab :line-width=2 :scroll-threshold=5 active-color='#FF4F00' v-model="index">
      <tab-item class="vux-center" :selected="onTab === item" v-for="(item, index) in listFun" @on-item-click="onTabClick(item)" :key="index">{{item}}</tab-item>
    </tab>
    <swiper :duration="0" v-model="index" height="100%" :show-dots="false">
      <swiper-item v-for="(item, index) in listFun" :key="index">
        <div class="tab-swiper vux-center">
        {{index}} Container
        <component :is="currentView"></component>
        </div>
      </swiper-item>
    </swiper>
 
    <v-footer active="index" />
  </div>
</template>

<script>
import indexNew from "@/views/index/indexNew";
import tabContent from "@/views/index/tabContent";
import vFooter from "@/components/v-footer";
import { Tab, TabItem, Swiper, SwiperItem } from "vux";



const list = () => ['新品', '生鲜', '食品', '美妆', '男装', '女装', '护肤']

export default {
  data() {
    return {
      listFun: list(),
      index: 0,
      onTab: '美食'
    };
  },
  components: {
    "v-footer": vFooter,
    indexNew,
    tabContent,
    Tab,
    TabItem,
    Swiper, 
    SwiperItem
  },
  beforeCreate() {
    document.title = "新银众商";
  },
  created() {
    
  },
  computed:{
    currentView(){
      if(this.onTab=='新品'){
        return indexNew;
      }
      else if(this.onTab=='生鲜'){
        return tabContent;
      }else{
        return indexNew;
      }
    }
  },
  methods: {
    onTabClick(item){
      console.log(item);
      this.onTab = item;
    }
  }
};
</script>
<style lang="stylus">
@import '../assets/css/index';
#index {
  height: 100%;
  padding:44px 0 0 0!important;
  .vux-tab-wrap{
    position:fixed;
    height:44px;
    top:0;
    left:0;
    width:100%;
    z-index:9;
  }
  .vux-slider{
    height:100%;
    z-index:9;
  }
  .vux-slider > .vux-swiper{
    overflow-y: scroll;
  }
}
</style>
