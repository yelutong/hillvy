<template>
  <div class="wrapper page-buy">
    <vHeader title="填写订单"/>
     <div class="mb10 mt50 fillTop">
       <tab :line-width=0 active-color='#fc378c' v-model="index">
          <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
        </tab>
        <swiper v-model="index" height="110px" :show-dots="false">
          <swiper-item v-for="(item, index) in list2" :key="index">
            <div class="tab-swiper vux-center" v-if="index==0">
             <div class="w100 white pSend mb10 justify-content-space-between">
                <div class="horizontal-view">
                  <span class="send left"><img :src="send" /></span>
                  <span class="fs-14 left">商家配送<i class="txt-orange fs-12 ml5">配送费0.00元</i></span>
                </div>
                <div><i class="ico i-cks checked"></i></div>
              </div>
            <router-link class="lay-address white " :to="{path:'/mine/addresses', query:{from:'goods'}}">
              <i class="ico i-map"></i>
              <div class="adress">
                <template v-if="showAddress">
                  <span class="name-phone lh-20 fs-14">{{ showAddress.userName }} {{ showAddress.phone }}</span>
                  <span class="adres fs-12 txt-gray">{{ showAddress.areaInfo }} {{showAddress.address }}</span>
                </template>
                <span v-else class="chose">选择收货地址</span>
              </div>
              <i class="ico i-aow"></i>
            </router-link>

            </div>
            <div class="tab-swiper vux-center" v-else>
             <div class="item local2 white local w100 justify-content-space-between" @click="showTips">
              <div class="img-box align-items-start">
               <div class="mr10"><img :src="storeData.imgLogo?urlPic+storeData.imgLogo:''" class="img"></div>
               <div class="info-box vertical-view">
                <i class="fs-14 txt-black-real" v-text="storeData.merchantName"></i>
                <i class="fs-12 txt-gray1 mt5" v-text="'联系电话：'+storeData.merchantServicePhone"></i>
                <i class="fs-12 txt-gray1" v-text="storeData.merchantAddress"></i>
               </div>
              </div> 
              <div class="locationOd"><img :src="location" /></div>
             </div>
            </div>
          </swiper-item>
        </swiper>
     </div>
    
    <div class="lay-goods white mb10 pd15">
      <div class="item" v-for="(item, index) in goodsBuyInfo" :key="index">
        <div class="img-box">
          <img class="img" :src="item.img" />
        </div>
        <div class="info-box">
          <div class="title">
            {{ item.name }}
          </div>
          <div class="price-num">
            <span class="price">￥{{ item.price }}</span>
            <span class="fs-12">x {{ item.num }}</span>
          </div>
        </div>
      </div>
    </div>
    

    <group v-if="exchangeObj">
      <div @click="showTips">
      <cell :title="(exchangeObj&&exchangeObj.discountedPrice)?('可使用兑换积分'+exchangeObj.discountedPrice+'.00'):'可使用兑换积分0.00'" is-link>
        <img slot="icon" style="display:block;margin-right:5px;width:25px;height:25px" :src="exchangePic">
      </cell>
     </div>
    </group>
      
      <div class="picker-new" v-if="storeData">
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


      <div class="picker-new" v-if="exchangeObj">
          <div :class="show ?'picker-mask show':'picker-mask'" @click="closePickerBox"></div>
           <div :class="show ?'picker-panel show':'picker-panel'">
            <div class="h45 vux-1px-b relative titleEx">兑换积分<i class="txt-gray" @click="closePickerBox">×</i></div>
            <div class="groupEx mb10 justify-content-space-between pda15">

            <!-- <x-switch :title="'可使用兑换积分'+exchangeObj.exchange.goodsIntegral*exchangeObj.goodsCount" :value-map="['0', '1']" v-model="isUseIntegral"></x-switch>-->
             <span class="left" v-text="'可使用兑换积分'+exchangeObj.exchange.goodsIntegral*exchangeObj.goodsCount"></span>
             <input type="checkbox" class="check goods-check goodsCheck" v-model="isUseIntegral"/>
            </div>
          </div>
        </div> 


    <div class="lay-tips white">
      <textarea class="txa" placeholder="请填写备注" v-model="goodsTips" maxlength="200"></textarea>
    </div>
    <div class="lay-action fix-btom pay-act-btom">
      <div class="price-info flex1">
        <span class="tag ml15">合计：</span>
        <span class="total" v-model="num">￥{{ totalPrice }}</span>
        <span class="tip"> (含运费)</span>
      </div>
      <button class="btn-submit per40" @click="makeOrder">支付订单</button>
    </div>
  </div>
</template>

<script>
// 购物车
import { mapState } from "vuex";
import { Toast } from "mint-ui";
import { Swiper, SwiperItem, Tab, TabItem, XSwitch, Group, Cell } from 'vux';
import vHeader from "@/components/v-header";
import send from "@/assets/images/send.png";
import location from "@/assets/images/location1.png";
const qs = require("qs");
const list = () => ['配送到家', '到店自取']
export default {
  data() {
    return {
      storeId: this.getUrlParam("storeId"),
      urlPic:this.api.urlPic,
      location: location,
      show: false,
      list2: list(),
      send: send,
      demo2: '配送到家',
      index: 0,
      storeData:'',
      userAddressId:'',
      areaId:'',
      goodsCarts:[],
      payPrice: 0,
      userCouponIds: [],
      goodsChannel: 1,
      goodsIntegral: '',
      isUseIntegral:false,
      exchangeObj: '',
      exchangePic: require("../../assets/images/dui@2x.png"),
      num: '',
      showAddress: null,
      goodsBuyInfo: [],
      goodsTips: "",
    };
  },
  components: { 
    "x-switch": XSwitch,
    "group": Group,
    "cell": Cell,
    vHeader,
    Swiper, 
    SwiperItem, 
    Tab, 
    TabItem
  },
  computed: {
    ...mapState(["token", "autoAddress", "choseAddress"]),
    // 总价计算
    totalPrice() {
      return this.dotFormat2(this.payPrice)
    }
  },
  beforeCreate(){
    document.title = '结算';
  },
  created() { 
    this.getCartList();
    this.getStoreData();
    // this.exchangeData();
    // 取要购买的商品信息
    //this.getBuyInfo(this.id);
    // 读取用户默认地址 和 手选的地址（从选择地址那边返回来）
    const autoAddress = this.autoAddress;
    const choseAddress = this.choseAddress;
    if (choseAddress) {
      this.showAddress = choseAddress;
      this.userAddressId = this.showAddress.id;
      this.areaId = this.showAddress.areaId;
    } else if (autoAddress) {
      this.showAddress = autoAddress;
      this.userAddressId = this.showAddress.id;
      this.areaId = this.showAddress.areaId;
    } else {
      this.getAutoAddress();
    }
  },
  methods: {
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
    getStoreData(){
      this.$axios.get(this.api.sellerstoreData+this.storeId)
      .then(res => {
        if(res.data.code === 1){
          let arrData = res.data.content;
          this.storeData = arrData;
        }
      })
      .catch(res => {
       //下单失败，请您稍后重试
      });
    },
    closePickerBox(){
      this.show = false;
    },
    showTips(){
      this.show = true;
    },
    exchangeData(){//获取兑换积分
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
      this.$axios
        .post(
          this.api.otoGoodsCartList,
          JSON.stringify({
           'storeId': this.storeId
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
          console.log(resData);
          if (resData.code !== 1) {
            this.showTip("数据错误");
            return;
          }
          if(resData.content&&resData.content.length>0){
            this.payPrice = 0;
            this.goodsCarts = [];
            for(let k of resData.content){
              console.log(2);
              for(let item of k.list){
                 let objGoodsData = {
                  'id':item.id,
                  'goodsId': item.goodsId,
                  'num': item.goodsCount,
                  'name': item.goodsName,
                  'price': item.goodsPrice,
                  'img': item.goodsImg?this.api.urlPic+item.goodsImg.split(',')[0]:''
                  }
                this.goodsBuyInfo.push(objGoodsData);
                this.goodsCarts.push(item.id);
                this.payPrice = this.payPrice + item.goodsCount*item.goodsPrice;
              }
            }
          }else{
            this.payPrice = 0;
          }
        })
        .catch(res => {
          //this.showTip("数据错误");
        });
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
    guid() {//网上查找生产 uuid 的方法
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    },
    // 结算下单
    makeOrder() {
      // 组合下单数据
      const arrItems = [];
      const goodsBuyInfo = this.goodsBuyInfo;
      const showAddress = this.showAddress;
      if (goodsBuyInfo.length === 0) {
        this.showTip("未获取到商品信息");
        return;
      }
      if(this.index==0){//如果切换到商家配送，就必须填地址
        if (!showAddress) {
         this.showTip("请选择收货地址");
         return;
        }
      }
      const orderArrData ={
        'areaId': this.areaId,
        'channel': 2,
        'carts': this.goodsCarts,
        'isUseIntegral': this.isUseIntegral,
        'remark': this.goodsTips,
        'userAddressId': this.userAddressId,
        'sendType': this.index==0?1:4,
        'uuid': this.guid()
      }
      this.$axios
        .post(
          this.api.otoOrderform,
          JSON.stringify(orderArrData),
          {
            headers: {
              "Authorization": this.token , 
              "content-type": "application/json"
            }
          }
        )
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.msg);
            return;
          }
          const orderNumbers = resData.content.orderNumber;
          // 下单成功后跳转支付页
           this.$router.push({
            path: "/store/otoPay",
            query: {
              "orderNumbers": orderNumbers,
              'payPrice': this.dotFormat2(this.payPrice)
            }
          });
        })
        .catch(res => {
          this.showTip("下单失败，请您稍后重试");
        });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/pay-act-btom';
@import '../../assets/css/media';
@import '../../assets/css/buy';
@import '../../assets/css/nearby';
</style>
