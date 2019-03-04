<template>
  <div class="wrapper page-orders">
    <vHeader title="我的订单"/>
    <div class="tab-nav vux-1px-b">
      <div class="item" :class="{active:index == choseDex}" v-for="(item, index) in orderNav" :key="index" @click="tabOrderStatus(item, index)">
        {{ item.title }}
      </div>
    </div>
    <div class="tab-con mt43 page-buy odBoxTop">
      <scroller lock-x height="-140" :scrollbar-y=false use-pullup @on-scroll-bottom="loadMore" @on-pullup-loading="loadMore" v-model="statusLoad" ref="scroller" v-if="orderList">
      <div class="white pda15">
      <div class="order-item odBox" v-for="(item, index) in orderList" :key="index" v-if="orderList">
        
        <router-link class="lay-address white justify-content-space-between vux-1px-b"  :to="{path:'/store/orderDetail', query:{orderNo:item.orderNo,status:item.statusNum}}">
             <div class="horizontal-view">
              <i class="ico storeHead"><img :src="item.storeLogo?item.storeLogo:''"/></i>
              <div class="adress storeTip vertical-view">
                  <span class="name-phone lh-20 fs-14 bold txt-black storeTitle">{{ item.storeName }}</span>
                  <span class="adres fs-12 txt-gray">{{ item.date }}</span>
              </div>
            </div>
            <div>
            <span class="txt-gray1 fs-12" v-if="item.statusNum==0">订单已取消</span>
            <span class="txt-orange fs-12" v-if="item.statusNum==10">订单未付款</span>
            <span class="txt-blue1 fs-12" v-if="item.statusNum==20">等待商家接单</span>
            <span class="txt-blue1 fs-12" v-if="item.sendType==4&&item.statusNum==30">到店自取</span>
            <span class="txt-blue1 fs-12" v-if="item.sendType==1&&item.statusNum==30">等待商家配送</span>
            <span class="txt-blue1 fs-12" v-if="item.statusNum==40">正在配送中</span>
            <span class="txt-blue1 fs-12" v-if="item.statusNum==50">配送已完成</span>
            <span class="txt-gray1 fs-12" v-if="item.statusNum==60">订单已完成</span>
            <i class="ico i-aow"></i>
            </div>
            </router-link>

         <div class="flexg2 listRight pda15 justify-content-space-between">
            <p class="txt-black-real" v-if="item.conList[0].goodsName"><span v-text="limitStrFormat(item.conList[0].goodsName)+' '"></span>等 {{ item.num }}件商品</p> 
            <p class="fs-12 txt-black-real">￥{{ dotFormat2(item.totalPrice) }}</p>
          </div>

        <div class="goods-action pdb10 justify-content-space-between">
          <div @click="deleteOrder()"><i class="ico i-del2 hide"></i></div>
          <div class="txt-right">

          <button @click="cancelOrder(item)" class="btn-act active" v-if="item.statusNum==10">取消订单</button>
          <button class="btn-act" @click="pageToPay(item.totalPrice, item.orderNo, item.statusNum)" v-if="item.statusNum==10">继续支付</button>
          <button class="btn-act connectStore relative" @click="callService(item.storePhone)" v-if="item.statusNum==30">联系商家</button>
          <button class="btn-act odLocation relative" @click="toastMap(item.storeId)" v-if="item.sendType==4&&item.statusNum==30">导航</button>
          <button class="btn-act" @click="pageToCenter('eva',index)" v-if="item.statusNum==50">评论订单</button>
         </div>
        </div>
      </div>
      
      
    </div>
    <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -20px; text-align: center;">
          <span v-show="statusLoad.pullupStatus === 'default'"></span>
          <span class="pullup-arrow" v-show="statusLoad.pullupStatus === 'up'" :class="{'rotate': statusLoad.pullupStatus === 'up'}">↑</span>
          <span v-show="statusLoad.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
          <span v-show="statusLoad.pullupStatus === 'complete'">已加载完成</span>
     </div>
    </scroller> 

      <v-nodata v-if="orderList==null" bgcolor="grey" text="- 暂无相关订单 -" />
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

     <v-footer active="orders" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox, Toast, InfiniteScroll } from "mint-ui";
import { Scroller, Spinner} from 'vux';
import vNodata from "@/components/v-nodata";
import vHeader from "@/components/v-header";
import vFooter from "@/components/v-footer";
const qs = require("qs");
export default {
  data() {
    return {
      totalPage: 1,
      currentPage: 1,
      urlPic:this.api.urlPic,
      show: false,
      storeData: '',
      pullupEnabled: true,
      statusLoad:{
        pullupStatus: 'default'
      },
      status: this.getUrlParam("status"),
      choseDex: this.getUrlParam("choseDex")||null,
      orderNav: [
        {
          title: "全部",
          status:''
        },
        {
          title: "待付款",
          status: 10
        },
        {
          title: "待发货",
          status: 30
        },
        {
          title: "待收货",
          status: 40
        },
        {
          title: "待评价",
          status: 50
        }
      ],
      orderList: [],
      ordersPageNo: 1,
      ordersPageSize: 10,
      moreOrders: false,
      noOrders: false,
      loadMoreVal:true,
      loading: true
    };
  },
  components: {
    "v-nodata": vNodata,
    vHeader,
    "v-footer": vFooter,
    Scroller,
    Spinner
  },
  computed: {
    ...mapState(["token"])
  },
  beforeCreate() {
    document.title = "我的订单";
  },
  created() {
    this.verToken();
    // 读取订单状态
    this.clearData();
    this.getOrdersList();
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
    callService(phone){
      window.location.href = 'tel:'+phone;
    },
    toastMap(shoreId){
      this.storeData = '';
      this.$axios.get(this.api.sellerstoreData+shoreId)
      .then(res => {
        if(res.data.code === 1){
          let arrData = res.data.content;
          this.storeData = arrData;
          this.show = true;
        }
      })
      .catch(res => {
       this.showTip("网络错误");
      });
    },
    closePickerBox(){
      this.show = false;
    },
    verToken(){
     if(!this.token){
      this.showTip("登录超时，请重新登录");
      this.$router.push({path: "/mine/login"});
     }
    },
    pageToDtail(orderNo,status){
      this.$router.push('/store/orderDetail?orderNo='+orderNo+'&status='+status);
    },
    // 清空状态函数（本来想做成5组翻页数据的，但是考虑时间紧迫，就简化成切换从头加载吧）
    clearData() {
      this.currentPage = 1;
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
          text = "下单未支付";
          break;
        case 20:
          text = "下单已支付";
          break;
        case 30:
          text = "商户接单";
          break;
        case 40:
          text = "配送订单";
          break;
        case 50:
          text = "配送完成";
          break;
        case 60:
          text = "订单已完成";
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
        val.goodsPhoto = this.api.urlPic + val.goodsPhoto.split(',')[0];
      });
      return arr;
    },
    // 切换tab
    tabOrderStatus(item, index) {
      if (this.choseDex !== index) {
        this.orderList = [];
        this.totalPage=1;
        this.currentPage=1;
        this.choseDex = index;
        this.clearData();
        this.status = item.status;
        this.getOrdersList();
        //重置scroller插件滚回顶部  xs-container 这个class的样式
        setTimeout(()=>{
          if(this.orderList){
            this.$refs.scroller.$el.children[0].style.cssText='transform-origin: 0px 0px 0px; transform: translateX(0px) translateY(0px) translateZ(0px) scale(1, 1); transition: none 0s ease 0s;';
          }
        },0)
        
      }
    },
    // 加载更多我的订单
    loadMore() {
      if(this.loadMoreVal){
       this.loadMoreVal=false;
        setTimeout(()=>{
         this.loadMoreVal=true;
        },1000);
        this.loading = true;
        this.ordersPageNo += 1;
        this.getOrdersList();
        console.log(' 加载');
       }else{
         return;
       }
    },
    // 获取订单数据
    getOrdersList(first) {
      let obj={};
        if(this.status){
           obj={
            status: this.status,
            page: this.currentPage,
            limit: 8
           }
        }else{
           obj={
            page: this.currentPage,
            limit: 8
           }
        }
      if(this.currentPage<=this.totalPage){
         this.$axios
        .post(this.api.otoOrderformList, 
        JSON.stringify(obj),
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

          this.currentPage = objData.currPage+1;
          this.totalPage = objData.totalPage;

          if (arrData.length === 0) {
            this.orderList = null;
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
              storeName: val.storeName,
              sendType: val.sendType,
              storeLogo: this.urlPic+val.storeLogo,
              storePhone: val.storePhone,
              storeId: val.storeId,
              totalPrice: val.totalPrice,
              deductedPrice: val.deductedPrice||null,
              conList: this.getArrImg(val.items),
              orderNo: val.orderNumber
            };
            // 如果是待评价，把待评价的子商品循环出来
            /*if (this.choseDex == 40) {
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
            }*/
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
      }else{
        this.statusLoad.pullupStatus = 'complete';
        setTimeout(()=>{
          this.statusLoad.pullupStatus = 'default';
        },1000);
        console.log('已加载完');
      }
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
          objType.url = "/store/evaStore?from=orders&type=exp";
          break;
        case "eva":
          objType.tip = "没有查询到可评价的商品";
          objType.key = "evaList";
          objType.url = "/store/evaStore?from=orders&type=eva";
          break;
      }
      // 判断跳转
      if (orderList.length == 0) {
        this.showTip(objType.tip);
        return;
      }
      // 存到本地存储（转换成字符串）
      sessionStorage.setItem(objType.key, JSON.stringify(orderList[index]));
      console.log(orderList[index]);
      setTimeout(() => {
        this.$router.push(objType.url);
      }, 0);
    },
    // 确认收货
    receiptOrder(orderNo, index) {
      MessageBox({
        title: "收货提示",
        message: "您确定收到货品了吗？",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          this.$axios
            .get(this.api.receptGoods+orderNo,{
              headers: { "Authorization": this.token }
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
    cancelOrder(item) {
      MessageBox({
        title: "取消提示",
        message: "您确定要取消此订单吗？",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          this.$axios
            .get(this.api.otoCancelOrder+item.orderNo, {
              headers: { "Authorization": this.token }
            })
            .then(res => {
              const resData = res.data;
              if (resData.code !== 1) {
                this.showTip(resData.msg);
                return;
              }
              item.statusNum=0;

              this.showTip("取消订单成功");
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
    // 点击去支付
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
@import '../../assets/css/buy';
@import '../../assets/css/nearby';
</style>