<template>
  <transition>
	<section class="searhChoiceBox near" v-if='boxShow'>
		<article class="cityChoice-top transit">
			<span class="mintui mintui-back" @click='goBack'></span> 
			<input type="text" v-model="storeName" placeholder="请输入搜索内容" class="search-input" />
			<i @click='searchBtn' class="searchBtn">搜索</i>
		</article>
		<scroller lock-x :scroll-bottom-offset="10" :scrollbar-y=false height="-1" use-pullup use-pulldown @on-scroll-bottom="loadMore" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
      <div class="white mgt50">
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
                <rater disabled :font-size="10" active-color="#ff4f00" :value="store.totalScore"></rater><i class="fs-12 ml5 txt-orange" v-text="dotFormat(store.totalScore)"></i>
                <p class="txt-gray1 fs-10 location mt5" v-text="store.merchantAddress"></p>
                </div>
                </div>
              </div>
              </div>
            </flexbox-item> 
          </flexbox>
        </div>

    </div>
    <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -20px; text-align: center;">
      <span v-show="status.pullupStatus === 'default'"></span>
      <span class="pullup-arrow" v-show="status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
      <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      <span v-show="status.pullupStatus === 'complete'">已加载完成</span>
    </div>
    </scroller>

	</section>
  </transition>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Rater, Scroller, Spinner, Flexbox, FlexboxItem } from 'vux';
const qs = require("qs");
export default {
   data() {
    return{
    	urlPic:this.api.urlPic,
		  boxShow:false,
		  storeName:'',
		  totalPage: 1,
	    currentPage: 0,
	    loadMoreVal: true, 
	    listData:[],
	    pullupEnabled: true,
      status: {
        pullupStatus: 'default'
      },
	  }
  },
  components: {
    Scroller,
    Spinner,
    Flexbox, 
    Rater,
    FlexboxItem
  },
  computed: {
    ...mapState(["token","city","location"]),
  },
  methods:{
		searchFun(){
			this.boxShow=!this.boxShow;
		},
		goBack(){
			this.searchFun();
		},
		searchBtn(){
		  this.listData = [];
		  this.totalPage = 1;
	    this.currentPage = 0;
      this.loadMore();
	  },
		loadMore () {
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
	      this.$axios.post(this.api.sellerstoreList,qs.parse({'merchantAlias':this.storeName,'latitude':this.location.lat,'longitude':this.location.lng,"page" : this.currentPage, "limit":8 }),{headers: {"content-type": "application/json"}})
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
	      },1000);
	      console.log('已加载完');
	    }
	    setTimeout(() => {
	    //  this.$refs.scroller.donePullup()
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
	    }
  }
};
</script>

	