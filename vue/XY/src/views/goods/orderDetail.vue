<template>
  <div class="wrapper page-buy orderDetail">
    <vHeader title="订单详情"/>
    <div class="lay-goods white mb10 pd15 mt50" v-if="goodsBuyInfo">
      <p class="h40" v-text="goodsBuyInfo.storeName"></p>
      <div class="item" v-for="(item, index) in goodsBuyInfo.items" :key="index">
        <div class="img-box">
          <img class="img" :src="item.goodsPhoto" />
        </div>
        <div class="info-box">
          <div class="title">
            {{ item.goodsName }}
          </div>
          <div class="price-num">
            <span class="price fs-14">￥{{ item.totalPrice }}</span>
            <span class="fs-12">x {{ item.goodsCount }}</span>
          </div>
        </div>
      </div>
      <mt-cell title="免运费" value="￥0.00"></mt-cell>
      <mt-cell v-if="goodsBuyInfo.deductedPrice" title="使用兑换积分" :value="goodsBuyInfo.deductedPrice"></mt-cell>
    </div>
      
    <div class="white pd15 mt10" v-if="goodsBuyInfo">
      <p class="h40">订单信息</p>
      <mt-cell title="订单号码" :value="goodsBuyInfo.orderNumber"></mt-cell>
      <mt-cell title="下单时间" :value="goodsBuyInfo.addTime"></mt-cell>
      <mt-cell title="订单号码" :value="goodsBuyInfo.orderNumber"></mt-cell>
      <mt-cell title="收件地址" :value='goodsBuyInfo.orderformAddress.userName+goodsBuyInfo.orderformAddress.phone'></mt-cell>
      <p class="txt-right txt-gray" v-text='goodsBuyInfo.orderformAddress.areaInfo+goodsBuyInfo.orderformAddress.address'></p>
    </div>

    <div class="lay-action fix-btom pay-act-btom" v-if="status">
      <div class="price-info flex1">
        <span class="tag">合计：</span>
        <span class="total">￥{{ goodsBuyInfo.totalPrice }}</span>
        <span class="tip"> (含运费)</span>
      </div>
      <button class="btn-submit per40" @click="makeOrder">支付订单</button>
    </div>
    <v-nodata v-if="!goodsBuyInfo" bgcolor="grey" text="- 暂无待支付订单 -" />
  </div>
</template>

<script>
// 购物车
import { mapState } from "vuex";
import { Toast, Cell } from "mint-ui";
import { XSwitch, Group } from 'vux';
import vNodata from "@/components/v-nodata";
import vHeader from "@/components/v-header";
const qs = require("qs");
export default {
  data() {
    return {
      orderNo:this.getUrlParam("orderNo")||'',
      status:this.getUrlParam("status")==10?true:false,
      goodsBuyInfo:""
    }
  },
  components: { 
    "group": Group,
    "v-nodata": vNodata,
    vHeader
  },
  computed: {
    ...mapState(["token"])
  },
  beforeCreate(){
    document.title = '填写订单';
  },
  created() {
    this.getOrderData();
  },
  methods: {
    makeOrder(){
      // 下单成功后跳转支付页
          this.$router.push({
            path: "/goods/pay",
            query: {
              "orderNumbers": this.goodsBuyInfo.orderNumber,
              'payPrice': this.goodsBuyInfo.totalPrice
            }
          });
    },
    getOrderData(){
      this.$axios
        .get(this.api.orderformInfo+this.orderNo,{ 
          headers: {"Authorization": this.token } 
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("获取商品信息失败");
            return;
          }
          const objData = resData.content;
          for(let item of objData.items){
            item.goodsPhoto = this.api.urlPic + item.goodsPhoto.split(',')[0];
          }
          this.goodsBuyInfo = objData;
        })
        .catch(res => {
          this.showTip("获取商品信息失败");
        })
      }
    }
}
</script>
<style lang="stylus">
@import '../../assets/css/pay-act-btom';
@import '../../assets/css/buy';
.orderDetail .mint-cell-wrapper{
 padding:0!important;
}
</style>
