<template> 
  <div class="wrapper page-goods">
    <vHeader title="商品详情"/>
    <div class="lay-swiper white">
      <v-swiper :swiper-data="picSwipe" />
    </div>
    <div class="lay-goods white" v-if="goodsMainData">
      <div class="gd-name mtb10 fs-15" v-text="goodsMainData.goodsName"></div>
      <div class="price-weight pdtb15 vux-1px-b">
        <div>
          <span class="price mr5 fs-16" v-text="'￥'+goodsMainData.salePrice"></span>
        </div>
        <i class="txt-gray1 fs-14" v-text="'月销'+goodsMainData.monthSaleNum"></i>
      </div>
    </div>

    <div class="h40 white fs-16 mt10 vux-1px-b center">商品描述</div>
    <div class="pda15 white fs-14" v-text="goodsMainData.description">
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import vSwiper from "@/components/v-swiper";
import vCell from "@/components/v-cell";
import vNodata from "@/components/v-nodata";
import vImglist from "@/components/v-imglist";
import vHeader from "@/components/v-header";
//const wx = require("weixin-js-sdk");
export default {
  data() {
    return {
      urlPic:this.api.urlPic,
      photoUrl:'',//分享图片
      goodsMainData: {
        goodsName: this.getUrlParam("goodsName"),
        goodsImg: this.getUrlParam("goodsImg"),
        description: this.getUrlParam("description"),
        monthSaleNum: this.getUrlParam("monthSaleNum"),
        salePrice: this.getUrlParam("salePrice"),
        stock: this.getUrlParam("stock"),
        id: this.getUrlParam("id")
      },
      picSwipe: {
        speed: 800,
        auto: 3000,
        showIndicators: true,
        continuous: true,
        link: "",
        arrData: []
      }
    };
  },
  components: {
    "v-swiper": vSwiper,
    vHeader
  },
  computed: {
    ...mapState(["token", "openId", "userId"])
  },
  beforeCreate() {
    document.title = "商品详情";
  },
  created() {
    this.getGoodsMainData();
    //this.getWeixinData();
    //this.getUserData();
  },
  methods: {
    ...mapActions(["atnUserId"]),
    // 获取商品主体信息
    getGoodsMainData(id) {
      this.picSwipe.arrData.push({
        id: this.goodsMainData.id,
        photoUrl: this.urlPic+this.goodsMainData.goodsImg
      });
    },
    getUserData(){    
        this.$axios
        .get(this.api.getUserData,{
          headers: {"Authorization": this.token }
         })
        .then(res => {
          const resData = res.data;
          console.log(resData);
          if (resData.code !== 1) {
            if(resData.code !== 403){
              this.showTip(resData.msg);
            }
            return;
          }else{
            this.atnUserId(resData.content.id);
          }
      
        })
        .catch(res => {
          
        }); 
      },
    // 从后台拿到微信签名等数据
      getWeixinData() {
        this.$axios
          .post(this.api.wxShareSign,
           JSON.stringify({
            'url': window.location.href
           }),
           {
               headers: { "content-type": "application/json"}
            })
          .then(res => {
            const resData = res.data;
            if (resData.code !== 1 || !resData.content) {
              this.showTip('获取微信分享参数失败');
              return;
            }
            this.wakeWeiXin(resData.content);
          })
          .catch(res => {
           // this.showTip('获取微信分享参数失败');
          });
      },
      // 拿到数据后执行唤醒微信分享更改函数
      wakeWeiXin(objData) {
        const _this = this;
        let link = '';
        if(!_this.userId && localStorage.getItem("userId")){
          _this.atnUserId(localStorage.getItem("userId"));
        }
        if(objData.url.indexOf('&proUserId=')<0){
          if(_this.userId){
            link = objData.url + '&proUserId=' + _this.userId;
          }else{
            link = objData.url;
          }
        }else{
          if(_this.userId){
            link = objData.url.split('&proUserId=')[0]+'&proUserId='+_this.userId;
          }else{
            link = objData.url.split('&proUserId=')[0];
          }
        }
        console.log('link:'+link);
        wx.config({
          debug: false, 
          appId: objData.appId,
          timestamp: objData.timestamp,
          nonceStr: objData.nonceStr,
          signature: objData.signature,
          jsApiList: [
            "hideMenuItems",
            "onMenuShareTimeline",
            "onMenuShareAppMessage"
          ]
        });
        wx.ready(function () {
          // 隐藏一些功能
          wx.hideMenuItems({
            menuList: [
              "menuItem:share:qq",
              "menuItem:share:QZone",
              "menuItem:share:weiboApp",
              "menuItem:share:facebook",
              "menuItem:originPage",
              "menuItem:openWithQQBrowser",
              "menuItem:openWithSafari",
              "menuItem:share:email"
            ]
          });
          // 分享到朋友圈
          wx.onMenuShareTimeline({
            title: _this.goodsMainData.name,
            link: link,
            imgUrl: _this.photoUrl,
            success: function () {
              vue.showTip("分享成功");
            },
            cancel: function () {
              vue.showTip("取消分享");
            }
          });
          // 分享到朋友
          wx.onMenuShareAppMessage({
            title: _this.goodsMainData.name,
            desc: _this.goodsMainData.saleSpots,
            link: link,
            imgUrl: _this.photoUrl,
            success: function () {
              vue.showTip("分享成功");
            },
            cancel: function () {
              vue.showTip("取消分享");
            }
          });
          // 检查微信接口是否调用成功
          wx.checkJsApi({
            jsApiList: [
              "hideMenuItems",
              "onMenuShareTimeline",
              "onMenuShareAppMessage"
            ],
            success: function (res) {
              console.log("微信接口调用成功");
            }
          });
        });
      }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/pay-act-btom';
@import '../../assets/css/goods';
</style>
