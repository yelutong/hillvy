<template>
  <div :class="top==0?'nearby active storeIndex':'nearby storeIndex'" id="storePage" @scroll=handleScroll>
    <vHeader :title="storeTitle"/>
    <div class="white mt40 blueBg w100 relative">
      <p class="storeImgBox"><img v-if="storeData.imgLogo" :src="urlPic+storeData.imgLogo" class="storeImg" /></p>
    </div>
    <div class="">
      <div class="pd10 white">
        <p class="pdt40 lh-36 vux-1px-b center fs-14 txt-black-real" v-text="storeData.merchantName"></p>
        <p @click="toastMap" v-text="storeData.merchantAddress" class="addr w100 txt-black align-items-center"></p>
        <p class="vux-1px-t center pdt10">
          <i class="txt-gray1" v-text="'粉丝'+storeData.fansCount"></i>
          <i class="mg5 txt-gray1" v-text="'销量0'"></i><i class="txt-gray1">评分</i>
          <rater disabled :font-size="10" active-color="#ff4f00" :value="storeData.totalScore"></rater><i class="fs-12 ml5 txt-orange" v-text="dotFormat(storeData.totalScore)"></i>
        </p>
        <p class="salebuy relative txt-gray1 norms21 mgt10 pdb10">
          <b class="fs-14 lh-24">公告：</b>
          <span class="standards1 line2" v-if="storeData.o2oConfig && storeData.o2oConfig.noticeContext" v-text="storeData.o2oConfig.noticeContext"></span>
        </p>
      </div>
      <div :class="tabActive?'relative storeTab w100 mgt10':'w100 storeTab active'">
        <tab :line-width=2 active-color='#fc378c' v-model="index">
          <tab-item class="vux-center" :selected="demo2 == item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
        </tab>
      </div>
      <swiper v-model="index" :height="height" :show-dots="false">
        <swiper-item v-for="(item, index) in list2" :key="index">

          <div class="tab-swiper vux-center" v-if="index==0">
              <div class="box2 newListData relative">
                <div class="navLeft" v-if="listData">
                  <tab bar-position="top">
                    <tab-item :selected="item.index==0" @on-item-click="onItemClick(item.index)" v-for="(item,index) in listData" :key="index">{{ item.nav }}</tab-item>
                  </tab>
               </div>
                <div class="navRight white pdb10" v-if="classDataList">
                <flexbox class="pd10" orient="vertical"> 
                  <flexbox-item v-for="(goods, index5) in classDataList" :key="index5">
                    <div class="mgt10 justify-content-space-between">
                    <p @click="toDetail(goods)" ><img :src="goods.goodsImg?urlPic+goods.goodsImg.split(',')[0]:''"></p>
                    <div class="flexg2 listRight relative">
                      <p class="goodsName txt-black2 fs-14" v-text="goods.goodsName"></p> 
                      <div class="rightBtm justify-content-space-between">
                      <div>
                      <p class="fs-15 mb5 txt-orange" v-text="'¥'+goods.salePrice"></p>
                      <p class="txt-gray1 fs-10" v-text="'月销'+goods.currentMonthSaleCount"></p>
                      </div>
                      </div>
                      <div class="change-num cartNum">
                        <div class="left" v-if="goods.cartNum>0">
                        <span class="rdu left" @click="cartUpdate('rdu', goods)"></span>
                        <span class="num left center" v-text="goods.cartNum"></span>
                        <span class="add left" @click="cartUpdate('add', goods)"></span>
                       </div>
                        <span class="add left" v-else @click="addCart('add', goods)"></span>
                      </div>
                    </div>
                    </div>
                  </flexbox-item> 
                </flexbox>
                 </div>
                <v-nodata v-if="listData.length==0" bgcolor="grey" text="- 店家暂无商品 -" />
              </div>
          </div>

          <div class="tab-swiper white vux-center pdb10" v-if="index==1">
            <div class="pd10">
               <p class="fs-14 txt-black pdt10 h40">营业执照</p>
               <v-imglist :image-data="imgLicense" size="80" touch="preview" />
               <p class="fs-14 txt-black mgt10 h40">商家照片</p>
               <v-imglist :image-data="imgStore" size="80" touch="preview" />
               <div class="salebuy norms mgt10">
               <b class="fs-14 lh-20 txt-dark">商家名称:</b> 
               <div class="standards1 txt-black lh-20" v-text="storeData.merchantName"></div>
               </div>
               <div class="salebuy norms mgt10">
               <b class="fs-14 lh-20 txt-dark">商家类型:</b> 
               <div class="standards1 txt-black lh-20" v-text="storeData.sellerClassName"></div>
               </div>
               <div class="salebuy norms mgt10">
               <b class="fs-14 lh-20 txt-dark">商家地址:</b> 
               <div class="standards1 txt-black lh-20" v-text="storeData.merchantAddress"></div>
               </div>
               <div class="salebuy norms mgt10">
               <b class="fs-14 lh-20 txt-dark">商家电话:</b> 
               <div class="standards1 txt-black lh-20" v-text="storeData.merchantServicePhone"></div>
               </div>
           </div>
          </div>
          <div class="tab-swiper white vux-center page-goodseva" v-if="index==2">
            <div class="pd10">
              <div class="h45 fs-14 justify-content-space-between">
              <span>评价({{ totalCount }})</span>
              <span><rater disabled :font-size="10" active-color="#ff4f00" :value="storeData.totalScore"></rater><i class="fs-12 ml5 txt-orange" v-text="dotFormat(storeData.totalScore)"></i></span>
              </div>
             
            <scroller lock-x height="-140" :scrollbar-y=false use-pullup use-pulldown @on-scroll-bottom="loadMore" @on-pullup-loading="loadMore" v-model="status" ref="scroller">
              <div v-if="listDataEva" class="eva-list">
                  <div class="item" v-for="(item, index) in listDataEva" :key="index">
                    <div class="eva-pro">
                      <div class="pro">
                        <div class="art-box">
                          <img class="avatar" :src="item.headPhoto?urlPic+item.headPhoto:''" />
                        </div>
                        <span class="name">{{ item.nickName }}</span>
                      </div>
                      <div class="date">
                        <i class="ico i-date"></i>{{ item.addTime }}
                      </div>
                    </div>
                    <div class="eva-text brk-wod">{{ item.context }}</div>
                    <div class="eva-imgs" v-if="item.photoUrls">
                      <v-imglist :image-data="item.photoUrls.split(',')" size="80" touch="preview" />
                    </div>
                    <div v-if="item.replyContent" class="eva-text brk-wod bg-gray pda10" v-text="'商家回复：'+item.replyContent"></div>
                    <div class="eva-goods">{{ item.title }}</div>
                  </div>
              </div>
            <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -20px; text-align: center;">
                  <span v-show="status.pullupStatus === 'default'"></span>
                  <span class="pullup-arrow" v-show="status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
                  <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
                  <span v-show="status.pullupStatus === 'complete'">已加载完成</span>
             </div>
            </scroller>  

            </div>

          </div>
        </swiper-item>
      </swiper>
     
       <div class="lay-action fix-btom pay-act-btom vux-1px-t justify-content-space-between bg-white">
        <div class="justify-content-space-between per70 pdlr20">
        <i class="cartIcon relative" @click="goGoodsCart"><badge class="badge" :text="goodsCount"></badge></i>
        <div class="price-info flex1 vertical-view">
          <p class="total fs-14 w100 txt-right txt-orange" v-model="goodsCount" v-text="'￥'+dotFormat2(allPrice)"></p>
          <p class="txt-gray1 w100 txt-right">配送另需配送费/可自取</p>
        </div>
        </div>
        <button  class="btn-submit per30" @click="makeOrder">去结算</button>
      </div>

    </div>
    
    <div class="picker-new">
      <div :class="show ?'picker-mask show':'picker-mask'" @click="closePickerBox"></div>
       <div :class="show ?'picker-panel show':'picker-panel'">
        <div class="h45 vux-1px-b relative titleEx">选择地图<i class="txt-gray" @click="closePickerBox">×</i></div>
        <div class="groupEx mb10 pda15 vertical-view">
          <span class="fs-14 h40" @click="goMap('腾讯地图',storeData)">腾讯地图</a></span>
          <span class="fs-14 h40" @click="goMap('百度地图',storeData)">百度地图</a></span>
          <span class="fs-14 h40" @click="goMap('高德地图',storeData)">高德地图</a></span>
        </div>
      </div>
    </div> 
   
  </div>
</template>
        
<script>
// 购物车
import { mapState } from "vuex";
import { Toast } from "mint-ui";
import { Badge, Swiper, SwiperItem, Tab, TabItem, Rater, Scroller, Spinner,Flexbox, FlexboxItem
 } from 'vux';
import vNodata from "@/components/v-nodata";
import vHeader from "@/components/v-header";
import vImglist from "@/components/v-imglist";
const qs = require("qs");
const list = () => ['商品', '商铺', '评论'];
export default {
  data() {
    return {
      id: this.getUrlParam("id"),
      urlPic:this.api.urlPic,
      imgLicense:[],
      imgStore:[],
      carts:[],
      top:0,
      goodsCount:0,
      totalCount:0,
      height:'',
      show: false,
      index: 0,
      tabActive: false,
      storeTitle:'',
      list2: list(),
      demo2: '商品',
      storeData: '',
      allPrice:0,
      listData:[],
      cartList:[],
      classDataList:[],
      listData2:[],
      totalPage: 1,
      currentPage: 0,
      listDataEva:[],
      loadMoreVal:true,
      pullupEnabled: true,
      status: {
        pullupStatus: 'default'
      }
    }
  },
  components: { 
    vHeader,
    Tab,
    TabItem,
    Swiper, 
    SwiperItem,
    Rater,
    Scroller,
    Spinner,
    Flexbox, 
    FlexboxItem,
    Badge,
    "v-imglist": vImglist,
    "v-nodata": vNodata
  },
  computed: {
    ...mapState(["token", "autoAddress", "choseAddress"]),
  },
  mounted() {//给window添加一个滚动滚动监听事件
    window.addEventListener('scroll', this.handleScroll, true);
    /*window.addEventListener('scroll', () => {
    let scrollTop = document.documentElement.scrollTop ||
                       document.body.scrollTop ||
                       document.querySelector('.tab-swiper').scrollTop;
      console.log(scrollTop);
    }, true);*/
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll, true);
  },
  beforeCreate(){
    document.title = '店铺详情';
  },
  watch:{
    goodsCount(newVal,oldVal){//监控购物车数量变化 从而来重新计算总价格
        this.$axios
        .post(
          this.api.otoGoodsCartList,
          JSON.stringify({
           'storeId': this.id
          }),
          {
            headers: {
              "content-type": "application/json",
              "Authorization": this.token
            }
          }
        )
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.msg);
            return;
          }
          if(resData.content.length>0){
            this.allPrice = 0;
            this.carts = [];
            for(let k of resData.content){
              for(let item of k.list){
                this.carts.push(item.id);
                this.allPrice = this.allPrice + item.goodsCount*item.goodsPrice;
              }
            }
          }else{
            this.allPrice = 0;
          }
        })
        .catch(res => {
          //this.showTip("数据错误");
        });
    }
  },
  created() {
    this.sellerstoreData();
    this.getGoodsList();
    this.getGoodsCount();
    this.getGoodsCartList();
    this.loadMore();//获取店铺评论列表
    this.height = window.screen.height-43+'px';
  },
  methods: {
   goGoodsCart(){
     this.$router.push({//核心语句
        path:'/store/cart'
      })
   },
   goMap(title,item){
      this.$router.push({//核心语句
        path:'/map',//跳转的路径
        query:{//路由传参时push和query搭配使用 ，作用时传递参数
          title:title,
          latitude: item.latitude,
          longitude: item.longitude,
          address: item.merchantAddress,
          merchantName: item.merchantName
        }
      })
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
    console.log(this.location);
    if(this.currentPage< this.totalPage){
      this.currentPage= parseInt(this.currentPage) + 1;
      this.$axios.post(this.api.otoCommentList,qs.parse({'storeId':this.id,"page" : this.currentPage, "limit":8 }),{headers: {"content-type": "application/json"}})
      .then(res => {
         console.log(res.data);
         this.totalPage=res.data.content.totalPage; 
         this.totalCount = res.data.content.totalCount;
         this.listDataEva = [...this.listDataEva,...res.data.content.list];
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
   },
   getGoodsCartList(){
     this.$axios
        .post(
          this.api.otoGoodsCartList,
          JSON.stringify({
           'storeId': this.id
          }),
          {
            headers: {
              "content-type": "application/json",
              "Authorization": this.token
            }
          }
        )
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("数据错误");
            return;
          }
          if(resData.content.length>0){
            for(let k of resData.content){
              console.log(this.cartList);
              this.cartList = [...this.cartList,...k.list];
            }
            for(let item of this.cartList){
                for(let i of this.classDataList){
                   if(item.goodsId==i.id){
                      i.cartNum = item.goodsCount;
                      i.cartId = item.id;
                   }
                }
            }
          }
        })
        .catch(res => {
          this.showTip("数据错误");
        });
   },
   //获取购物车数量
    getGoodsCount() {
       this.$axios
        .post(
          this.api.otoGoodsCount,
          JSON.stringify({
           'storeId': this.id
          }),
          {
            headers: {
              "content-type": "application/json",
              "Authorization": this.token
            }
          }
        )
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("数据错误");
            return;
          }
          this.goodsCount = resData.content.goodsCount;
        })
        .catch(res => {
          this.showTip("数据错误");
        });
    },
    //更新商品对应的购物车数量
    cartUpdate(type, item){
      let num = item.cartNum;
      if (type == "add") {//因为已进入方法就加减过了，现在把数量还原回去
        num += 1;
      }else{
        num -= 1;
      } 
      this.$axios
        .post(
          this.api.otoCartUpdate,
          JSON.stringify({
           'goodsCount': num,
           'id': item.cartId
          }),
          {
            headers: {
              "content-type": "application/json",
              "Authorization": this.token
            }
          }
        )
        .then(res => {
          console.log(res.data);
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("修改数量失败");
            return;
          }
          if (type == "add") {
            item.cartNum += 1;
          }else{
            item.cartNum -= 1;
          }
          this.getGoodsCount();
          this.showTip("修改数量成功");
        })
        .catch(res => {
          this.showTip("修改数量失败");
        });
    }, 
   // 加入购物车
    addCart(type, item) {
      let num = item.cartNum;
      if (type == "add") {//因为已进入方法就加减过了，现在把数量还原回去
        num += 1;
      }
      this.$axios
        .post(
          this.api.otoAddCart,
          JSON.stringify({
           'goodsCount': num,
           'goodsId': item.id,
           'storeId': item.storeId,
           'storeName': this.storeData.merchantName
          }),
          {
            headers: {
              "content-type": "application/json",
              "Authorization": this.token
            }
          }
        )
        .then(res => {
          console.log(res.data);
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("加入购物车失败");
            return;
          }
          item.cartNum = resData.content.goodsCount;
          item.cartId = resData.content.id;
          this.getGoodsCount();
          this.showTip("加入购物车成功");
        })
        .catch(res => {
          this.showTip("加入购物车失败");
        });
    },
    onItemClick (index) {
      console.log('on item click:', index);
      this.classDataList = [];
      this.classDataList = this.listData2[index];
      console.log(this.cartList);
      for(let item of this.cartList){
          for(let i of this.classDataList){
             if(item.goodsId==i.id){
                i.cartNum = item.goodsCount;
                i.cartId = item.id;
             }
          }
      }
      console.log(this.classDataList);
   },
   getGoodsList () {
     this.$axios.post(this.api.otoStoreList,qs.parse({"storeId":this.id}),{headers: {"content-type": "application/json"}})
      .then(res => {
        //this.listData
         let data = res.data.content;
          for(let i in data){
            this.listData.push({'index':i,'nav':data[i].barcodeClass.name});
            let arr = data[i].barcodeStore;
            for(let item of arr){
              item.cartNum = 0;
              item.cartId = '';
            }
            this.listData2.push(arr);
          }
          this.classDataList = this.listData2[0];
          for(let item of this.cartList){
              for(let i of this.classDataList){
                 if(item.goodsId==i.id){
                    i.cartNum = item.goodsCount;
                    i.cartId = item.id;
                 }
              }
          }
          console.log(this.listData);
          console.log(this.listData2);
          console.log(this.classDataList);
      })
      .catch(res => {
       //下单失败，请您稍后重试
      });
    },
    handleScroll() { //改变元素#searchBar的top值
      let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
      //console.log(top);
      if(top==0){
        this.storeTitle = "";
        this.top = 0;
        this.tabActive = false;
      }else{
        this.storeTitle = this.storeData.merchantName;
        this.top = top;
        if(top>=200){
          this.tabActive = true;
          setTimeout(()=>{
            document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = 290;
          },3)
        }else{
           this.tabActive = false;
           setTimeout(()=>{
            document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = 0;
          },3)
        }
      }
    },
    toDetail (item) {
      this.$router.push({//核心语句
        path:'/store/goods',//跳转的路径
        query:{//路由传参时push和query搭配使用 ，作用时传递参数
          goodsName: item.goodsName,
          goodsImg: item.goodsImg,
          description: item.goodsDescription,
          monthSaleNum: item.currentMonthSaleCount,
          salePrice: item.salePrice,
          stock: item.stock,
          id: item.id 
        }
      })
    },
    // 加入购物车
    addToCart(id) {
      if(!this.token){
        MessageBox({
          title: "绑定提示",
          message:
            "您还没有绑定手机，无法进行下单和个人操作，建议您先绑定手机~",
          showCancelButton: true
        }).then(action => {
          if (action === "confirm") {
            this.$router.push("/mine/bind");
          }
        });
        return;
      }

      let ajaxData ={
        'goodsCount':this.num,
        'goodsId': id,
        'storeId': this.sellerStoreId
      };
      this.$axios
          .post(
            this.api.AddGoodsCart,
            JSON.stringify(ajaxData),
            {
               headers: {"Authorization": this.token , "content-type": "application/json"}
            }
          )
          .then(res => {
            const resData = res.data;
            if (resData.code !== 1) {
              if(resData.code == 403){
                this.showTip("登录超时，请重新登录");
                this.$router.push({name:'login', params: { url: window.location.href}});
              }else{
                this.showTip("网络错误，请重试");
              }
              return;
            }
            this.showTip("加入购物车成功");
            this.verToken();
            // this.$router.push({ path: "/cart", query: { id: id } });
          })
          .catch(res => {
            this.showTip("加入失败，请重试");
          });
    },
    closePickerBox(){
      this.show = false;
    },
    toastMap(){
      this.show = true;
    },
    sellerstoreData(){
      this.$axios.get(this.api.sellerstoreData+this.id)
      .then(res => {
        if(res.data.code === 1){
          let arrData = res.data.content;
          this.storeData = arrData;
          if(arrData.imgLicense){
            this.imgLicense.push(this.urlPic+arrData.imgLicense); 
          }
          if(arrData.imgIndoor){
            let imgIndoor = arrData.imgIndoor.split(',');
            for (let item of imgIndoor) {
              this.imgStore.push(this.urlPic+item); 
            }
          }
        }
      })
      .catch(res => {
       //下单失败，请您稍后重试
      });
    },
    exchangeData(){
      let orderPrice = {
        'goodsCarts': this.goodsCarts,
        'goodsChannel':  2,
        'isUseIntegral': 1,
        'userCouponIds': this.userCouponIds
      }
      this.$axios
        .post(this.api.orderPriceNew,
        JSON.stringify(orderPrice),
        {
          headers: {"Authorization": this.token , "content-type": "application/json"}
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("未获取到价格信息");
            return;
          }else{
              if(resData.content.exchange){
                this.exchangeObj = resData.content;
              }
          }
        })
        .catch(res => {
         // this.showTip("未获取到商品信息");
        });
    },
    getCartList(){
      let resData = [];
      if(this.$route.params.selectArr){
        resData = this.$route.params.selectArr;
        sessionStorage.setItem("selectArr",JSON.stringify(this.$route.params.selectArr));
      }else{
        resData = JSON.parse(sessionStorage.getItem("selectArr"));
      }
        // 成功后赋值商品对象，并存进数组
        if(resData && resData.length>0){
          this.isShowList = true;
          this.goodsBuyInfo=resData;
          for (let i of resData){
            this.goodsCarts.push({'id':i.id});
          }
        }else{
          this.isShowList = false;
        }
         
    },
    // 取用户默认地址
    getAutoAddress() {
      this.$axios
        .get(this.api.getDefAddrData, { headers: { "Authorization": this.token } })
        .then(res => {
          const resData = res.data;
          if (resData.content && resData.content.id) {
            this.showAddress = resData.content;
            this.areaId = this.showAddress.areaId;
            this.userAddressId = this.showAddress.id;
          }
        });
    },
    guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    },
    // 结算下单
    makeOrder() {
       this.$router.push({//核心语句
        path:'/store/fillOrder',//跳转的路径
        query:{//路由传参时push和query搭配使用 ，作用时传递参数
          storeId:this.id
        }
      })
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/nearby';
@import '../../assets/css/goodseva';
</style>
