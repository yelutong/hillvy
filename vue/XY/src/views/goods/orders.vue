<template>
  <div class="wrapper page-orders">
    <vHeader title="我的订单"/>
    <div class="tab-nav">
      <div class="item" :class="{active:index === choseDex}" v-for="(item, index) in orderNav" :key="index" @click="tabOrderStatus(item, index)">
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
        <div class="goods-list" @click="pageToPay(item.totalPrice, item.orderNo, item.statusNum)">
          <v-imglist :image-data="item.imgList" size="75" />
        </div>
        <div class="goods-info">
          <span>订单号：{{ item.orderNo }}</span>
          <div class="price-info">
            共{{ item.num }}件商品
          </div>
        </div>
        <div class="goods-action">
          <div>合计：<span class="price">￥{{ item.totalPrice }}</span></div>
          <div>
          <button class="btn-act" @click="cancelOrder(item.orderNo, index)" v-if="choseDex==0">取消订单</button>
          <button class="btn-act" @click="onPayOrder(item.orderNo, index)" v-if="choseDex==0">继续支付</button>
          <button class="btn-act" @click="refundOrder(item.orderNo)" v-if="choseDex==1">退款</button>
          <button class="btn-act" @click="receiptOrder(item.orderNo, index)" v-if="choseDex==2">确认收货</button>
          <button class="btn-act" @click="pageToCenter('exp',index)" v-if="choseDex==2">查看物流</button>
          <button class="btn-act" @click="pageToCenter('eva',index)" v-if="choseDex==3">立即评价</button>
          <button class="btn-act" @click="callHelp(item.orderNo)" v-if="choseDex==4">申请售后</button>
          </div>
        </div>
      </div>
      <v-nodata v-if="noOrders" bgcolor="grey" text="- 暂无相关订单 -" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox, Toast, InfiniteScroll } from "mint-ui";
import vNodata from "@/components/v-nodata";
import vImglist from "@/components/v-imglist";
import vHeader from "@/components/v-header";
const qs = require("qs");
export default {
  data() {
    return {
      totalPage: 1,
      currentPage: 0,
      //status: [10],
      status: this.getUrlParam("status"),
      choseDex: 0,
      orderNav: [
        {
          title: "待付款",
          status: [10]
        },
        {
          title: "待发货",
          status: [20]
        },
        {
          title: "待收货",
          status: [30]
        },
        {
          title: "待评价",
          status: [40]
        },
        {
          title: "已完成",
          status: [50]
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
    "v-nodata": vNodata,
    "v-imglist": vImglist,
    vHeader
  },
  computed: {
    ...mapState(["token"])
  },
  beforeCreate() {
    document.title = "我的订单";
  },
  created() {
    // 读取订单状态
    this.choseDex = '';
    this.clearData();
    this.getOrdersList();
  },
  methods: {
    // 清空状态函数（本来想做成5组翻页数据的，但是考虑时间紧迫，就简化成切换从头加载吧）
    clearData() {
      this.currentPage = 0;
      this.totalPage = 1;
      this.noOrders = false;
      this.loading = true;
      this.orderList = [];
    },
    // 获取状态文字（想把数据整合进数组，就没用计算属性了）
    getStatusTxt(choseDex) {
      let text = "";
      switch (choseDex) {
        case 10:
          text = "等待买家付款";
          break;
        case 20:
          text = "买家已付款";
          break;
        case 30:
          text = "商家已发货";
          break;
        case 40:
          text = "交易成功";
          break;
        case 50:
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
        arrImg.push(this.api.urlPic + val.goodsPhoto.split(',')[0]);
      });
      return arrImg;
    },
    // 切换tab
    tabOrderStatus(item, index) {
      console.log(item)
      if (this.choseDex !== index) {
        this.choseDex = index;
        this.clearData();
        this.status = '['+item.status+']';
        this.getOrdersList();
      }
    },
    // 加载更多我的订单
    loadMore() {
      this.loading = true;
      this.ordersPageNo += 1;
      this.getOrdersList();
      console.log(' 加载');
    },
    // 获取订单数据
    getOrdersList(first) {
      this.$axios
        .post(this.api.payOrderList, 
        JSON.stringify({
            status: JSON.parse(this.status),
            page: this.currentPage,
            limit: 80
        }),
         {
          headers: {  
            "content-type": "application/json",
            "Authorization": this.token 
            }
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            if (first) {
              this.noOrders = true;
            } else {
              this.moreOrders = true;
              this.loading = false;
            }
            return;
          }
          let objData = resData.content,
            arrData = objData.list;
          if (arrData.length === 0) {
            this.orderList = [];
            this.noOrders = true;
            this.loading = true;
            return;
          }
          // 重组下数据，需要把里面的商品循环出来
          arrData.forEach(val => {
            let obj = {
              date: val.addTime,
              num: this.goodsCount(val.items),
              status: this.getStatusTxt(val.status),
              statusNum: val.status,
              totalPrice: val.totalPrice,
              imgList: this.getArrImg(val.items),
              orderNo: val.orderNumberStr,
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
    goodsCount(items){
      let count = 0;
      for( let i of items){
        count += i.goodsCount;
      }
      return count
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
                "Authorization": this.token
              }
            })
            .then(res => {
              const resData = res.data;
              if (resData.code !== 1) {
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
    cancelOrder(orderNumber, index) {
      console.log(orderNumber);
      MessageBox({
        title: "取消提示",
        message: "您确定要取消此订单吗？",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          this.$axios
            .get(this.api.cancelOrder+orderNumber, {
              headers: { "Authorization": this.token }
            })
            .then(res => {
              const resData = res.data;
              if (resData.code !== 1) {
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
          JSON.stringify({
           'channel': 2,
           'orderNumbers': orderNo,
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
            this.showTip("支付失败，请稍后重试");
            return;
          }
          // 返回数据成功后，拿到参数唤起微信支付
          const objData = resData.content;
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
    pageToPay(payPrice, orderNo, status) {
      // 点得不是未付款的话，全都显示已付款
      if (status === 10) {
        let url = "/goods/pay?orderNumbers=" + orderNo + "&payPrice=" + payPrice;
        this.$router.push(url);
      }else{
        vue.showTip("跳转商品详情");
      }
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