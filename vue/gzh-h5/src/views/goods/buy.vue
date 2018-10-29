<template>
  <div class="wrapper page-buy">
    <router-link class="lay-address white mb10" :to="{path:'/mine/addresses', query:{from:'goods'}}">
      <i class="ico i-map"></i>
      <div class="adress">
        <template v-if="!!showAddress">
          <span class="name-phone">{{ showAddress.shipName }} {{ showAddress.shipPhone }}</span>
          <span class="adres">{{ showAddress.provinceName }} {{ showAddress.cityName }} {{ showAddress.areaName }} {{showAddress.shipAddress }}</span>
        </template>
        <span v-else class="chose">选择收货地址</span>
      </div>
      <i class="ico i-aow"></i>
    </router-link>
    <div class="lay-goods white mb10">
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
            <div class="change-num">
              <span class="rdu" @click="changeNum('rdu', item)">-</span>
              <span class="num">{{ item.num }}</span>
              <span class="add" @click="changeNum('add', item)">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lay-tips white">
      <textarea class="txa" placeholder="请填写备注" v-model="goodsTips" maxlength="200"></textarea>
    </div>
    <div class="lay-action fix-btom pay-act-btom">
      <div class="price-info">
        <span class="tag">合计：</span>
        <span class="total">￥{{ totalPrice }}</span>
        <span class="tip"> (不含运费)</span>
      </div>
      <button class="btn-submit nordu" @click="makeOrder">结 算</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "mint-ui";
const qs = require("qs");
export default {
  data() {
    return {
      id: this.getUrlParam("id"),
      showAddress: null,
      goodsBuyInfo: [],
      goodsTips: ""
    };
  },
  computed: {
    ...mapState(["token", "autoAddress", "choseAddress"]),
    // 总价计算
    totalPrice() {
      const goodsBuyInfo = this.goodsBuyInfo;
      if (goodsBuyInfo.length === 0) {
        return 0;
      }
      let totalPrice = 0;
      goodsBuyInfo.forEach(val => {
        totalPrice += val.num * val.price;
      });
      return totalPrice;
    }
  },
  beforeCreate(){
    document.title = '填写订单';
  },
  created() {
    // 取要购买的商品信息
    this.getBuyInfo(this.id);
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
  },
  methods: {
    // 取要购买的商品信息
    getBuyInfo(id) {
      this.$axios
        .get(this.api.getGoodsMain, { params: { product_id: id } })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            this.showTip("未获取到商品信息");
            return;
          }
          // 成功后赋值商品对象，并存进数组
          const objData = resData.data;
          const arrData = [];
          this.goodsBuyInfo = [
            {
              id: objData.id,
              num: 1,
              name: objData.name,
              price: objData.salePrice,
              weight: objData.weight,
              img: objData.photoMainUrls[0]
            }
          ];
        })
        .catch(res => {
          this.showTip("未获取到商品信息");
        });
    },
    // 改变数量
    changeNum(type, item) {
      if (type === "add") {
        item.num += 1;
      } else if (item.num >= 2) {
        item.num -= 1;
      }
    },
    // 取用户默认地址
    getAutoAddress() {
      this.$axios
        .get(this.api.getAutoAddress, { headers: { access_token: this.token } })
        .then(res => {
          const resData = res.data;
          if (resData.code === 100) {
            this.showAddress = resData.data;
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
      // 组合items数组
      goodsBuyInfo.forEach(val => {
        arrItems.push({
          id: val.id,
          product_name: val.name,
          count: val.num
        });
      });
      const address = {
        ship_name: showAddress.shipName,
        ship_phone: showAddress.shipPhone,
        area_name:
          showAddress.provinceName +
          " " +
          showAddress.cityName +
          " " +
          showAddress.areaName,
        ship_address: showAddress.shipAddress
      };
      // 组合地址和请求数据
      const orderData = {
        items: arrItems,
        order_remark: this.goodsTips,
        add_id: JSON.stringify(address)
      };
      // 然后发起下单请求
      const loading = Toast({
        message: "结算中...",
        iconClass: "loading",
        duration: 30000
      });
      this.$axios
        .post(
          this.api.makeOrder,
          qs.stringify({ order_info: JSON.stringify(orderData) }),
          {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              access_token: this.token
            }
          }
        )
        .then(res => {
          loading.close();
          const resData = res.data;
          if (resData.code !== 100) {
            this.showTip("下单失败，请您稍后重试");
            return;
          }
          const objData = resData.data;
          // 下单成功后跳转支付页
          this.$router.replace({
            path: "/goods/pay",
            query: {
              "order-id": objData.orderId,
              "order-no": objData.orderNo
            }
          });
        })
        .catch(res => {
          loading.close();
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
