<template>
  <div class="wrapper page-buy">
    <vHeader title="填写订单"/>
    <router-link class="lay-address white mb10 mt50" :to="{path:'/mine/addresses', query:{from:'goods'}}" v-if="isShowList">
      <i class="ico i-map"></i>
      <div class="adress">
        <template v-if="showAddress">
          <span class="name-phone fs-14">{{ showAddress.userName }} {{ showAddress.phone }}</span>
          <span class="adres fs-12 txt-gray">{{ showAddress.areaInfo }} {{showAddress.address }}</span>
        </template>
        <span v-else class="chose">选择收货地址</span>
      </div>
      <i class="ico i-aow"></i>
    </router-link>
    <div class="lay-goods white mb10 pd15" v-if="isShowList">
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
    

    <group>
      <div @click="showTips">
      <cell :title="(exchangeObj&&exchangeObj.discountedPrice)?('可使用兑换积分'+exchangeObj.discountedPrice+'.00'):'可使用兑换积分0.00'" is-link>
        <img slot="icon" style="display:block;margin-right:5px;width:25px;height:25px" :src="exchangePic">
      </cell>
     </div>
    </group>
    
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


    <div class="lay-tips white" v-if="isShowList">
      <textarea class="txa" placeholder="请填写备注" v-model="goodsTips" maxlength="200"></textarea>
    </div>
    <div class="lay-action fix-btom pay-act-btom" v-if="isShowList">
      <div class="price-info flex1">
        <span class="tag">合计：</span>
        <span class="total" v-model="num">￥{{ totalPrice }}</span>
        <span class="tip"> (含运费)</span>
      </div>
      <button class="btn-submit per40" @click="makeOrder">支付订单</button>
    </div>
    <v-nodata v-if="!isShowList" bgcolor="grey" text="- 暂无待支付订单 -" />
  </div>
</template>

<script>
// 购物车
import { mapState } from "vuex";
import { Toast } from "mint-ui";
import { XSwitch, Group, Cell } from 'vux';
import vNodata from "@/components/v-nodata";
import vHeader from "@/components/v-header";
const qs = require("qs");
export default {
  data() {
    return {
      show: false,
      userAddressId:'',
      areaId:'',
      isShowList: false,
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
    "v-nodata": vNodata,
    vHeader
  },
  computed: {
    ...mapState(["token", "autoAddress", "choseAddress"]),
    // 总价计算
    totalPrice() {
      const orderPrice = {
        'goodsCarts': this.goodsCarts,
        'goodsChannel': this.isUseIntegral == true? 2: 1,
        'isUseIntegral': this.isUseIntegral,
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
            this.showTip(resData.msg);
            setTimeout(()=>{
              this.$router.push({path: "/index"})
            },1500)
            return;
          }else{
            if(orderPrice.goodsChannel == 2){
              if(resData.content.exchange){
                if(resData.content.exchange.userIntegral>=resData.content.exchange.goodsIntegral){
                this.payPrice = resData.content.payPrice;
                this.goodsIntegral = resData.content.exchange.goodsIntegral;
                }else{
                  this.showTip("兑换积分不足");
                  this.isUseIntegral = '0';
                  this.goodsIntegral = '';
                  this.payPrice = resData.content.payPrice;
                }
              }else{
                  this.showTip("该商品暂不支持积分兑换");
                  this.isUseIntegral = '0';
                  this.goodsIntegral = '';
                  this.payPrice = resData.content.payPrice;
              }
            }else{
              this.goodsIntegral = '';
              this.payPrice = resData.content.payPrice;
            }
          }
        })
        .catch(res => {
         // this.showTip("未获取到商品信息");
        });
        return this.payPrice
    }
  },
  beforeCreate(){
    document.title = '结算';
  },
  created() {
    this.getCartList();
    this.exchangeData();
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
    closePickerBox(){
      this.show = false;
    },
    showTips(){
      this.show = true;
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
            this.showTip(resData.msg);
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
      // 组合下单数据
      const arrItems = [];
      const goodsBuyInfo = this.goodsBuyInfo;
      const showAddress = this.showAddress;
      if (goodsBuyInfo.length === 0) {
        this.showTip("未获取到商品信息");
        return;
      }
      if (!showAddress) {
        this.showTip("请选择收货地址");
        return;
      }
      
      const orderArrData ={
        'areaId': this.areaId,
        'channel': 2,
        'goodsCarts': this.goodsCarts,
        'isUseIntegral': this.isUseIntegral,
        'remark': this.goodsTips,
        'userAddressId': this.userAddressId,
        'userCouponIds': this.userCouponIds,
        'uuid': this.guid()
      }
      this.$axios
        .post(
          this.api.getOrderForm,
          JSON.stringify(orderArrData),
          {
            headers: {"Authorization": this.token , "content-type": "application/json"}
          }
        )
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.msg);
            return;
          }
          const orderNumbers = resData.content;
          // 下单成功后跳转支付页
          this.$router.push({
            path: "/goods/pay",
            query: {
              "orderNumbers": orderNumbers,
              'payPrice': this.payPrice
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
</style>
