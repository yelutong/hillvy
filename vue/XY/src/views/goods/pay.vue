<template>
  <div class="wrapper page-pay">
    <vHeader title="支付订单"/>
    <div class="pay-item nobd vertical-view mt50">
      
      <div class="lay-address white pda15">
        <div class="adress vertical-view">
          <div class="full-screen fs-14 mgb5">应支付金额：<i class="txt-orange fs-18">￥{{ price }}</i></div>
        </div>
      </div>

      <div class="white payMethod mt10">
      <div class="full-screen h40 mgb5 fs-14">支付方式</div>
       <div class="full-screen justify-content-space-between">
        <div class="horizontal-view orderPay">
          <span><img :src="wx" /></span>
          <span>
            <p class="fs-13">微信支付</p>
            <p class="mt5 fs-12 txt-gray">亿万用户的选择，更快更安全</p>
          </span>
        </div>
        <div><i class="ico i-cks checked mt10"></i></div>
      </div>
     </div>
    </div>
    <div class="lay-action fix-btom pay-act-btom">
     
     <!-- <div class="price-info">
        <span class="tag">实付：</span>
        <span class="total">￥{{ price }}</span>
      </div>
      
        <span class="btn-submit nordu cancel" @click="cancelOrder">取 消</span>
      -->
        <button class="btn-submit nordu full-screen" @click="payOrder">微信支付 <i class="fs-14">￥{{ price }}</i></button>
      
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox, Toast } from "mint-ui";
import vHeader from "@/components/v-header";
import wx from "@/assets/images/wx@2x.png";
const qs = require("qs");
export default {
  data() {
    return {
      wx: wx,
      price: this.getUrlParam("payPrice") || "",
      orderNo: this.getUrlParam("orderNumbers") || ""
    };
  },
  components: {
    vHeader
  },
  computed: {
    ...mapState(["token"])
  },
  beforeCreate() {
    document.title = "确认支付";
  },
  created() {
   
  },
  methods: {
    // 计算出订单总价（不包含运费）
    getAllPrice(arrItem) {
      let price = 0;
      if (!arrItem || arrItem.length === 0) {
        return price;
      }
      arrItem.forEach(val => {
        price += val.product.salePrice * val.productCount;
      });
      return price;
    },
    // 取消订单
    cancelOrder() {
      MessageBox({
        title: "取消提示",
        message: "您确定要取消此订单吗？",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          this.$axios
            .get(this.api.cancelOrder+this.orderNo, {
              headers: { "Authorization": this.token }
            })
            .then(res => {
              const resData = res.data;
              if (resData.code !== 1) {
                this.showTip("取消失败，请稍后重试");
                return;
              }
              this.showTip("取消订单成功");
              setTimeout(() => {
                this.$router.go(-1);
              }, 2000);
            })
            .catch(res => {
              this.showTip("取消失败，请稍后重试");
            });
        }
      });
    },
    // 点击支付按钮拿支付参数
    payOrder() {
      // 调取支付接口，获取订单所需五个字段
      const loading = Toast({
        message: "支付中...",
        iconClass: "loading",
        duration: 30000
      });
      this.$axios
        .post(
          this.api.payOrder,
          JSON.stringify({
           'channel': 2,
           'orderNumbers': this.orderNo.split(','),
           'payType': 'wxpublicpay'
          }),
          {
            headers: {
              "content-type": "application/json",
              "Authorization": this.token
            }
          }
        )
        .then(res => {
          loading.close();
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.msg);
            setTimeout(()=>{
              this.$router.push({path: "/mine"});
            },2000)
            return;
          }
          // 返回数据成功后，拿到参数唤起微信支付
          this.weiXinPay(resData.content);
        })
        .catch(res => {
          loading.close();
          this.showTip("支付失败，请稍后重试");
        });
    },
    // 唤起微信支付
    weiXinPay(weiXinArg) {
      let vue = this;
      // 支付函数先声明
      function onBridgeReady() {
        WeixinJSBridge.invoke("getBrandWCPayRequest", JSON.parse(weiXinArg), res => {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 支付成功时
            vue.showTip("支付成功", 2000, "ok");
            setTimeout(() => {
              vue.$router.replace({
                path: "/goods/orders",
                query: { status: 1 }
              });
            }, 2000);
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            // 取消支付时
            vue.showTip("您已取消支付");
          } else {
            // 支付失败时
            vue.showTip(res);
          }
        });
      }
      // 判断无误后开始支付
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/pay-act-btom';
@import '../../assets/css/media';
@import '../../assets/css/pay';
</style>