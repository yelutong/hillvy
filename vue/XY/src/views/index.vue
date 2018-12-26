<!-- 首页路由 -->
<template>
  <div id="index21" class="wrapper page-index">

    <tab :line-width=2 :custom-bar-width="getBarWidth" :scroll-threshold=4 animated={false}  active-color='#FF4F00' v-model="index">
      <tab-item class="vux-center" :selected="onTab === item.id" v-for="(item, index) in listFun" @on-item-click="onTabClick(item)" :key="index">{{item.className}}</tab-item>
    </tab>
    <swiper v-model="index" height="100%" :show-dots="false">
      <!--<component :is="currentView"></component>-->
      <indexNew  v-if="onTab===0" />
      <tabContent v-else :parentId="onTab" />
    </swiper>
 
    <v-footer active="index" />
  </div>
</template>

<script>
import indexNew from "@/views/index/indexNew";
import tabContent from "@/views/index/tabContent";
import vFooter from "@/components/v-footer";
import { Tab, TabItem, Swiper, SwiperItem } from "vux";

export default {
  data() {
    return {
      listFun: [1,2,3,4,5,6],
      index: 0,
      onTab: 0,
      getBarWidth: function () {
        return 66 + 'px'
      }
    };
  },
  components: {
    "v-footer": vFooter,
    indexNew,
    tabContent,
    Tab,
    TabItem,
    Swiper, 
    SwiperItem,
    tabContent,
    indexNew
  },
  beforeCreate() {
    document.title = "新银众商";
  },
  created() {
    this.getAllClassTree();
    this.getClassBylevel();
  },
  computed:{

  },
  methods: {
    onTabClick(item){
      this.onTab = item.id;
      console.log(this.onTab);
    }
    ,
    getClassBylevel(){
      this.$axios.get(this.api.getClassBylevel+1)
      .then(res => {
        if(res.data.code === 1){
           this.listFun = [];
           res.data.content.unshift({'id':0,'className': "商城首页"});
           this.listFun = res.data.content;
        }
         console.log(res.data);
         
      })
      .catch(res => {
       //下单失败，请您稍后重试
      });
    },
    getAllClassTree(){
      this.$axios.get(this.api.getClassTree)
      .then(res => {
         console.log(res.data);
      })
      .catch(res => {
       //下单失败，请您稍后重试
      });
    }
  }
};
</script>
<style lang="stylus">
@import '../assets/css/index';
#index21 {
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
  }
  .vux-slider > .vux-swiper{
    overflow-y: scroll;
  }
}
</style>
