<template>
  <div class="wrapper page-buy">
    <router-link class="lay-address white mb10" :to="{path:'/mine/addresses', query:{from:'goods'}}" v-if="isShowList">
      <i class="ico i-map"></i>
      <div class="adress">
        <template v-if="showAddress">
          <span class="name-phone">{{ showAddress.userName }} {{ showAddress.phone }}</span>
          <span class="adres">{{ showAddress.areaInfo }} {{showAddress.address }}</span>
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
    <div class="lay-tips white" v-if="isShowList">
      <textarea class="txa" placeholder="请填写备注" v-model="goodsTips" maxlength="200"></textarea>
    </div>
    <div class="lay-action fix-btom pay-act-btom fix-b50" v-if="isShowList">
      <div class="price-info flex1">
        <span class="tag">合计：</span>
        <span class="total" v-model="num">￥{{ totalPrice }}</span>
        <span class="tip"> (不含运费)</span>
      </div>
      <button class="btn-submit per40" @click="makeOrder">支付订单</button>
    </div>
    <v-nodata v-if="!isShowList" bgcolor="grey" text="- 暂无待支付订单 -" />
    <v-footer active="cart"/>
  </div>
</template>

<script>
// 购物车
import { mapState } from "vuex";
import { Toast } from "mint-ui";
import vFooter from "@/components/v-footer";
import vNodata from "@/components/v-nodata";
const qs = require("qs");
export default {
  data() {
    return {
      userAddressId:'',
      areaId:'',
      isShowList: false,
      goodsCarts:[],
      payPrice: 0,
      userCouponIds: [],
      goodsChannel: 1,
      isUseIntegral:0,
      num: '',
      showAddress: null,
      goodsBuyInfo: [],
      goodsTips: "",
      uuid:''
    };
  },
  components: { 
    'v-footer': vFooter,
    "v-nodata": vNodata
  },
  computed: {
    ...mapState(["token", "autoAddress", "choseAddress"]),
    // 总价计算
    totalPrice() {
      const orderPrice = {
        'goodsCarts': this.goodsCarts,
        'goodsChannel': this.goodsChannel,
        'isUseIntegral': this.isUseIntegral,
        'userCouponIds': this.userCouponIds
      }
      console.log(orderPrice);
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
            console.log(resData);
            this.payPrice = resData.content.payPrice;
          }
        })
        .catch(res => {
         // this.showTip("未获取到商品信息");
        });
        return this.payPrice
    }
  },
  beforeCreate(){
    document.title = '填写订单';
  },
  created() {
    this.getCartList();
    // 取要购买的商品信息
    //this.getBuyInfo(this.id);
    // 读取用户默认地址 和 手选的地址（从选择地址那边返回来）
    const autoAddress = this.autoAddress;
    const choseAddress = this.choseAddress;
    if (choseAddress) {
      this.showAddress = choseAddress;
    } else if (autoAddress) {
      this.showAddress = autoAddress;
    } else {
      this.getAutoAddress();
    }
    this.userAddressId = this.showAddress.id;
    this.areaId = this.showAddress.areaId;
  },
  methods: {
    getCartList(){
      let resData = [];
      if(this.$route.params.selectArr){
        resData = this.$route.params.selectArr;
        sessionStorage.setItem("selectArr",JSON.stringify(this.$route.params.selectArr));
      }else{
        resData = JSON.parse(sessionStorage.getItem("selectArr"));
      }
      console.log(resData)
        // 成功后赋值商品对象，并存进数组
        if(resData.length>0){
          this.isShowList = true;
          this.goodsBuyInfo=resData;
          for (let i of resData){
            this.uuid=this.uuid+""+i.id;
            this.goodsCarts.push({'id':i.id});
          }
          console.log(this.uuid);
          console.log(this.goodsBuyInfo);
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
          if (resData.code === 1) {
            this.showAddress = resData.content;
            this.areaId = this.showAddress.areaId;
            this.userAddressId = this.showAddress.id;
          }
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
        'uuid': 'h5'+this.uuid+""+this.areaId+""+this.userAddressId+""+this.isUseIntegral
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
            this.showTip("下单失败，请您稍后重试");
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
