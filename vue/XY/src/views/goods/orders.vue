<template>
  <div class="wrapper page-orders">
    <div class="tab-nav">
      <div class="item" :class="{active:index === choseDex}" v-for="(item, index) in orderNav" :key="index" @click="tabOrderStatus(index)">
        {{ item.title }}
      </div>
    </div>
    <div class="tab-con" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <div class="order-item" v-for="(item, index) in orderList" :key="index">
        <div class="goods-status">
          <div class="date">
            <i class="ico i-date"></i>{{ item.date}}
          </div>
          <span class="status">{{ item.status }}</span>
        </div>
        <div class="goods-list" @click="pageToPay(item.orderId, item.orderNo)">
          <v-imglist :image-data="item.imgList" size="75" />
        </div>
        <div class="goods-info">
          <span>订单号：{{ item.orderNo }}</span>
          <div class="price-info">
            共{{ item.num }}件商品 合计：
            <span class="price">￥{{ item.totalPrice }}</span>
          </div>
        </div>
        <div class="goods-action">
          <button class="btn-act" @click="cancelOrder(item.orderId, index)" v-if="choseDex==0">取消订单</button>
          <button class="btn-act" @click="onPayOrder(item.orderNo, index)" v-if="choseDex==0">继续支付</button>
          <button class="btn-act" @click="refundOrder(item.orderId)" v-if="choseDex==1">退款</button>
          <button class="btn-act" @click="receiptOrder(item.orderId, index)" v-if="choseDex==2">确认收货</button>
          <button class="btn-act" @click="pageToCenter('exp',index)" v-if="choseDex==2">查看物流</button>
          <button class="btn-act" @click="pageToCenter('eva',index)" v-if="choseDex==3">立即评价</button>
          <button class="btn-act" @click="callHelp(item.orderId)" v-if="choseDex==4">申请售后</button>
        </div>
      </div>
      <v-nodata v-if="noOrders" bgcolor="grey" text="- 暂无相关订单 -" />
      <v-loadmore v-if="moreOrders" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox, Toast, InfiniteScroll } from "mint-ui";
import vLoadmore from "@/components/v-loadmore";
import vNodata from "@/components/v-nodata";
import vImglist from "@/components/v-imglist";
const qs = require("qs");
export default {
  data() {
    return {
      status: this.getUrlParam("status"),
      choseDex: 0,
      orderNav: [
        {
          title: "待付款",
          status: "nopay"
        },
        {
          title: "待发货",
          status: "dopay"
        },
        {
          title: "待收货",
          status: "daishou"
        },
        {
          title: "待评价",
          status: "yishou"
        },
        {
          title: "已完成",
          status: "completed"
        }
      ],
      orderList: [],
      ordersPageNo: 1,
      ordersPageSize: 10,
      moreOrders: false,
      noOrders: false,
      loading: true
    };
  },
  components: {
    "v-loadmore": vLoadmore,
    "v-nodata": vNodata,
    "v-imglist": vImglist
  },
  computed: {
    ...mapState(["token"])
  },
  beforeCreate() {
    document.title = "我的订单";
  },
  created() {
    // 读取订单状态
    this.choseDex = +this.status || 0;
    this.getOrdersList("first");
  },
  methods: {
    // 清空状态函数（本来想做成5组翻页数据的，但是考虑时间紧迫，就简化成切换从头加载吧）
    clearData() {
      this.ordersPageNo = 1;
      this.ordersPageSize = 10;
      this.moreOrders = false;
      this.noOrders = false;
      this.loading = true;
      this.orderList = [];
    },
    // 获取状态文字（想把数据整合进数组，就没用计算属性了）
    getStatusTxt() {
      const choseDex = this.choseDex;
      let text = "";
      switch (choseDex) {
        case 0:
          text = "等待买家付款";
          break;
        case 1:
          text = "买家已付款";
          break;
        case 2:
          text = "商家已发货";
          break;
        case 3:
          text = "交易成功";
          break;
        case 4:
          text = "交易成功";
          break;
      }
      return text;
    },
    // 获取图片的数组
    getArrImg(arr) {
      if (!arr) {
        return [];
      }
      const arrImg = [];
      arr.forEach(val => {
        arrImg.push(val.product.photoMainUrls[0] || "");
      });
      return arrImg;
    },
    // 切换tab
    tabOrderStatus(index) {
      if (this.choseDex !== index) {
        this.choseDex = index;
        this.clearData();
        this.getOrdersList("first");
      }
    },
    // 加载更多我的订单
    loadMore() {
      this.loading = true;
      this.ordersPageNo += 1;
      this.getOrdersList();
    },
    // 获取订单数据
    getOrdersList(first) {
      this.$axios
        .get(this.api.getOrders, {
          headers: { access_token: this.token },
          params: {
            order_status: this.orderNav[this.choseDex].status,
            page_no: this.ordersPageNo,
            page_size: this.ordersPageSize
          }
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            if (first) {
              this.noOrders = true;
            } else {
              this.moreOrders = true;
              this.loading = false;
            }
            return;
          }
          let objData = resData.data,
            pageCount = objData.page_count,
            arrData = objData.records || [];
          if (arrData.length === 0) {
            if (first) {
              this.noOrders = true;
            }
            this.loading = true;
            return;
          }
          // 重组下数据，需要把里面的商品循环出来
          arrData.forEach(val => {
            let obj = {
              date: this.dateFormat(val.createDate, "YYYY-MM-DD hh:mm"),
              num: val.buyCount,
              status: this.getStatusTxt(),
              totalPrice: val.totalAmount,
              imgList: this.getArrImg(val.orderDetails),
              orderNo: val.orderNo,
              orderId: val.id,
              arrGood: []
            };
            // 如果是待评价，把待评价的子商品循环出来
            if (this.choseDex === 2 || this.choseDex === 3) {
              val.orderDetails.forEach(vl => {
                obj.arrGood.push({
                  id: vl.productId,
                  detailId: vl.id,
                  name: vl.productName,
                  img: vl.product.photoMainUrls[0],
                  num: vl.productCount,
                  price: vl.productSalePrice,
                  weight: vl.product.weight,
                  date: vl.createDate
                });
              });
            }
            this.orderList.push(obj);
          });
          if (pageCount <= this.ordersPageNo) {
            this.loading = true;
            this.moreOrders = false;
          } else {
            this.loading = false;
            this.moreOrders = true;
          }
        })
        .catch(res => {
          if (first) {
            this.noOrders = true;
          } else {
            this.loading = false;
          }
        });
    },
    // 查看物流或是立即评价
    pageToCenter(type, index) {
      const orderList = this.orderList;
      let objType = {};
      switch (type) {
        case "exp":
          objType.tip = "没有查询到物流信息";
          objType.key = "expList";
          objType.url = "/goods/ordercenter?from=orders&type=exp";
          break;
        case "eva":
          objType.tip = "没有查询到可评价的商品";
          objType.key = "evaList";
          objType.url = "/goods/ordercenter?from=orders&type=eva";
          break;
      }
      // 判断跳转
      if (
        orderList.length === 0 ||
        !orderList[index].arrGood ||
        orderList[index].arrGood.length === 0
      ) {
        this.showTip(objType.tip);
        return;
      }
      // 存到本地存储（转换成字符串）
      window.localStorage.setItem(objType.key, JSON.stringify(orderList[index].arrGood));
      setTimeout(() => {
        this.$router.push(objType.url);
      }, 0);
    },
    // 确认收货
    receiptOrder(orderId, index) {
      MessageBox({
        title: "收货提示",
        message: "您确定收到货品了吗？",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          this.$axios
            .post(this.api.receiptGoods, qs.stringify({ order_id: orderId }), {
              headers: {
                "content-type": "application/x-www-form-urlencoded",
                access_token: this.token
              }
            })
            .then(res => {
              const resData = res.data;
              if (resData.code !== 100) {
                this.showTip(resData.message);
                return;
              }
              this.showTip("确认收货成功！", 2000, "ok");
              this.orderList.splice(index, 1);
              // 最后一个的话，重刷一遍
              if (this.orderList.length === 0) {
                this.ordersPageNo += 1;
                this.getOrdersList();
              }
            })
            .catch(res => {
              this.showTip("确认收货失败，请稍后重试");
            });
        }
      });
    },
    // 取消订单
    cancelOrder(orderId, index) {
      MessageBox({
        title: "取消提示",
        message: "您确定要取消此订单吗？",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          this.$axios
            .get(this.api.cancelOrder, {
              headers: { access_token: this.token },
              params: { order_id: orderId }
            })
            .then(res => {
              const resData = res.data;
              if (resData.code !== 100) {
                this.showTip("取消失败，请稍后重试");
                return;
              }
              this.showTip("取消订单成功");
              this.orderList.splice(index, 1);
              // 最后一个的话，重刷一遍
              if (this.orderList.length === 0) {
                this.ordersPageNo += 1;
                this.getOrdersList();
              }
            })
            .catch(res => {
              this.showTip("取消失败，请稍后重试");
            });
        }
      });
    },
    // 继续支付订单
    onPayOrder(orderNo, index) {
      // 调取支付接口，获取订单所需五个字段
      const loading = Toast({
        message: "支付中...",
        iconClass: "loading",
        duration: 30000
      });
      this.$axios
        .post(
          this.api.payOrder,
          qs.stringify({
            order_no: orderNo,
            pay_type: "wechat"
          }),
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
            this.showTip("支付失败，请稍后重试");
            return;
          }
          // 返回数据成功后，拿到参数唤起微信支付
          const objData = resData.data;
          const weiXinArg = {
            appId: objData.appid,
            timeStamp: objData.timestamp,
            nonceStr: objData.nonceStr,
            package: objData.packages,
            signType: "MD5",
            paySign: objData.paySign
          };
          this.weiXinPay(weiXinArg);
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
        WeixinJSBridge.invoke("getBrandWCPayRequest", weiXinArg, res => {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 支付成功时
            vue.showTip("支付成功", 2000, "ok");
            vue.orderList.splice(index, 1);
            // 最后一个的话，重刷一遍
            if (vue.orderList.length === 0) {
              vue.ordersPageNo += 1;
              vue.getOrdersList();
            }
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            // 取消支付时
            vue.showTip("您已取消支付");
          } else {
            // 支付失败时
            vue.showTip("支付失败，请重试");
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
    },
    // 点击跳转订单详情
    pageToPay(orderId, orderNo) {
      const choseDex = this.choseDex;
      let url = "/goods/pay?order-id=" + orderId + "&order-no=" + orderNo;
      // 点得不是未付款的话，全都显示已付款
      if (choseDex !== 0) {
        url =
          "/goods/pay?order-id=" +
          orderId +
          "&order-no=" +
          orderNo +
          "&has-pay=true";
      }
      this.$router.push(url);
    },
    // 退款
    refundOrder(orderId) {
      MessageBox({
        title: "退款提示",
        message: "目前还不支持退款，您可以拨打客服电话进行相关操作！",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          this.callService();
        }
      });
    },
    // 申请售后
    callHelp() {
      this.callService();
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/orders';
</style>