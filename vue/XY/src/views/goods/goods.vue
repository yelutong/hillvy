<template> 
  <div class="wrapper page-goods">
    <div class="lay-swiper white">
      <v-swiper :swiper-data="picSwipe" />
    </div>
    <div class="lay-goods white" v-if="goodsMainData">
      <div class="gd-name fs-15" v-text="goodsMainData.name"></div>
      <div class="price-weight pdtb15 vux-1px-b">
        <div>
          <span class="price mr5" v-text="'￥'+goodsMainData.price"></span>
          <span class="center-line fs-16 txt-gray1" v-text="'￥'+goodsMainData.marketPrice"></span>
        </div>
        <i class="txt-gray1" v-text="'销量'+goodsMainData.saleCount"></i>
      </div>
      <div class="salebuy norms h45"  v-if="!vGoods">
        <b class="fs-14">购买须知:</b>
        <div class="standards1">
          商品预计7个工作日到达
        </div>
      </div>
      <div class="salebuy norms h45"  v-if="!vGoods">
        <i class="fs-14">购买:</i>
        <div class="standards">
          <div class="minus" @click="changeNum('minus')">-</div>
          <input type="number" id="goodsNum" :value="num" class="num">
          <div class="plus" @click="changeNum('plus')">+</div>
        </div>
      </div>

      

    </div>
    <div class="lay-eva white">
      <v-cell :title="'评价（'+evasNum+'）'" :value="noEvas?'':'好评度100%'" align="right" ricon="blue" :link="'/goods/goodseva?id='+id" />
      <div class="eva-list">
        <div class="item" v-for="(item, index) in goodsEvaList" :key="index">
          <div class="eva-pro">
            <div class="pro">
              <div class="art-box">
                <img class="avatar" :src="item.avatar" />
              </div>
              <span class="name">{{ item.name }}</span>
            </div>
            <div class="date">
              <i class="ico i-date"></i>{{ item.date }}
            </div>
          </div>
          <div class="eva-text brk-wod">{{ item.content }}</div>
          <div class="eva-imgs">
            <v-imglist :image-data="item.imgList" size="80" touch="preview" />
          </div>
          <div class="eva-goods">{{ item.title }}</div>
        </div>
        <router-link class="eva-more" v-if="evasNum>=2" :to="{path:'/goods/goodseva',query:{id:id}}">查看全部评价</router-link>
        <v-nodata v-if="noEvas" hasimg="no" height="75" text="- 该商品还没有评价 -" />
      </div>
    </div>
    <div class="lay-img white">
      <img class="img" :src="item" v-for="(item, index) in detailPicList" :key="index" />
    </div>
    <div class="lay-action fix-btom pay-act-btom">

      <div class="service" v-if="!vGoods">
        <div class="per40 pd15 justify-content-space-around">
          <div class="item" @click="callHelp">
          <i class="ico i-call"></i>
          <p class="text">客服</p>
          </div>
          <div class="item cartNum relative" @click="toCart">
          <mt-badge size="normal" color="#FF4F00" v-text="cartNum" v-if="cartNum"></mt-badge>
          <i class="ico i-cart1"></i>
          <p class="text">购物车</p>
          </div>
        </div>
        <div class="item per30 bg-blue btn-submit" @click="pageToBuy(id)">
          立即购买
        </div>
        <div class="item per30 btn-submit" @click="addToCart(id)">
          加入购物车
        </div>
      </div>
      <div class="service" v-if="vGoods">
        <div class="per30 pd15 justify-content-space-around">
          <div class="item" @click="callHelp">
          <i class="ico i-call"></i>
          <p class="text">客服</p>
          </div>
        </div>
        <div class="item per70 btn-submit" @click="pageToBuy(id)">
          立即购买
        </div>
      </div>

    </div>
 
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { MessageBox, Badge } from "mint-ui";
import vSwiper from "@/components/v-swiper";
import vCell from "@/components/v-cell";
import vNodata from "@/components/v-nodata";
import vImglist from "@/components/v-imglist";
import vHeader from "@/components/v-header";
const wx = require("weixin-js-sdk");
export default {
  data() {
    return {
      id: this.getUrlParam("id"),
      vGoods:this.getUrlParam('vGoods')||'',
      urlPic:this.api.urlPic,
      avatar: require('../../assets/images/avatar.png'),
      num: 1,
      cartNum: '',
      sellerStoreId: '',
      photoUrl:'',//分享图片
      goodsMainData: {
        id: null,
        name: null,
        price: null,
        weight: null
      },
      isCollect: false,
      picSwipe: {
        speed: 800,
        auto: 3000,
        showIndicators: true,
        continuous: true,
        link: "",
        arrData: []
      },
      detailPicList: [],
      evasNum: 0,
      noEvas: false,
      goodsEvaList: []
    };
  },
  components: {
    "v-swiper": vSwiper,
    "v-cell": vCell,
    "v-nodata": vNodata,
    "v-imglist": vImglist,
    vHeader
  },
  computed: {
    ...mapState(["token", "openId", "userId"])
  },
  beforeCreate() {
    document.title = "商品详情";
  },
  created() {
    this.verToken();
    // 取得商品id
    const id = this.id;
    this.getGoodsMainData(id);
    this.getGoodsEva(id);
    this.getWeixinData();
    setTimeout(()=>{
     this.getUserData();
    },0)
  },
  methods: {
    ...mapActions(["atnUserId"]),
    verToken(){ 
     if(this.token){
      this.$axios
        .get(this.api.getCartNum, {
          headers: { "Authorization": this.token }
        })
        .then(res => {
          if(res.data.content){
            this.cartNum = res.data.content;
          }
        })
        .catch(res => {
          this.showTip("获取购物车数量失败");
        });
     }
    },
    // 获取商品主体信息
    getGoodsMainData(id) {
      this.$axios
        .get(this.api.getGoodsData+id)
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("获取商品信息失败");
            return;
          }
          const objData = resData.content;
          this.sellerStoreId = objData.sellerStoreId;
          console.log(objData);
          if(objData){
            document.title = objData.goodsName;
            // 成功后赋值商品对象
            this.goodsMainData = {
              id: objData.id,
              name: objData.goodsName,
              price: objData.salePrice,
              saleSpots: objData.saleSpots,
              marketPrice: objData.marketPrice,
              saleCount: objData.saleCount
            };
            // 再把轮播图片存进轮播对象
            const arrPic = objData.goodsMainPhoto.split(',');
            console.log(arrPic);
            arrPic.forEach(val => {
              this.picSwipe.arrData.push({
                id: objData.id,
                photoUrl: this.urlPic+val
              });
            });
            let detailPicList = objData.goodsDetailPhoto.split(',');
            this.photoUrl = this.picSwipe.arrData[0].photoUrl; 

            detailPicList.forEach(val => {
              val?this.detailPicList.push(this.urlPic+val):'';
            });
            console.log(this.detailPicList);
          }
        })
        .catch(res => {
          this.showTip("获取商品信息失败");
        });
    },
    // 获取商品评价列表
    getGoodsEva(id) {
      this.$axios.post(this.api.goodsCommentList, 
        JSON.stringify({
          goodsId: id,
          limit: 80,
          page: 1
        }), {
          headers: {"content-type": "application/json"}
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.goodsEvaList = [];
            this.noEvas = true;
            return;
          }
          const objData = resData.content;
          if (objData.totalCount == 0) {
            this.noEvas = true;
          } else {
            this.noEvas = false;
          }
          this.evasNum = objData.totalCount;
          console.log(objData);
          // 重组下数据
          let newArr = [];
          console.log(objData.list);
          objData.list.forEach(val => {
            newArr.push({
              avatar: val.photoAvatarUrl||this.avatar,
              name: this.formatPhone(val.userName) || "匿名",
              star: val.starNum,
              content: val.context,
              date: val.addTime,
              title: val.goodsName,
              imgList: val.photoURLs.split(',')
            });
          });
          this.goodsEvaList = newArr;
          console.log(this.goodsEvaList);
        })
        .catch(res => {
          //this.goodsEvaList = [];
          //this.noEvas = true;
        });
    }, 
    // 弹出电话
    callHelp() {
     // this.callService();
      this.$router.push({ path: "/goods/connectMe"});
    },
    toCart(){
     this.$router.push({ path: "/goodsCart"});
    },
    // 改变数量
    changeNum(type) {
      if (type === "plus") {
        this.num += 1;
      } else if (this.num >= 2) {
        this.num -= 1;
      }
    },
    // 加入购物车
    addToCart(id) {
      if(!this.token){
        MessageBox({
          title: "绑定提示",
          message:
            "您还没有绑定手机，无法进行下单和个人操作，建议您先绑定手机~",
          showCancelButton: true
        }).then(action => {
          if (action === "confirm") {
            this.$router.push("/mine/bind");
          }
        });
        return;
      }

      let ajaxData ={
        'goodsCount':this.num,
        'goodsId': id,
        'storeId': this.sellerStoreId
      };
      this.$axios
          .post(
            this.api.AddGoodsCart,
            JSON.stringify(ajaxData),
            {
               headers: {"Authorization": this.token , "content-type": "application/json"}
            }
          )
          .then(res => {
            const resData = res.data;
            if (resData.code !== 1) {
              if(resData.code == 403){
                this.showTip("登录超时，请重新登录");
                this.$router.push({name:'login', params: { url: window.location.href}});
              }else{
                this.showTip("网络错误，请重试");
              }
              return;
            }
            this.showTip("加入购物车成功");
            this.verToken();
            // this.$router.push({ path: "/cart", query: { id: id } });
          })
          .catch(res => {
            this.showTip("加入失败，请重试");
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
    // 立即购买
    pageToBuy(id) {
      // 判断是否绑定了手机号
     if (!this.token) {
        MessageBox({
          title: "绑定提示",
          message:
            "您还没有绑定手机，无法进行下单和个人操作，建议您先绑定手机~",
          showCancelButton: true
        }).then(action => {
          if (action === "confirm") {
            this.$router.push("/mine/bind");
          }
        });
      }
  
      let ajaxData ={
        'goodsCount':this.num,
        'goodsId': id,
        'storeId': this.sellerStoreId,
        'directBuy': 1
      };
      this.$axios
      .post(
        this.api.AddGoodsCart,
        JSON.stringify(ajaxData),
        {
           headers: {"Authorization": this.token , "content-type": "application/json"}
        }
      )
      .then(res => {
        const resData = res.data;
        if (resData.code !== 1) {
          if(resData.code == 403){
            this.showTip("登录超时，请重新登录");
            this.$router.push({name:'login', params: { url: window.location.href}});
          }else{
            this.showTip("网络错误，请重试");
          }
          return;
        }
        ajaxData.id = resData.content;
        ajaxData.img = this.detailPicList[0];
        ajaxData.name = this.goodsMainData.name;
        ajaxData.price = this.goodsMainData.price;
        ajaxData.num = this.num;
        
        let selectArr = [];
        selectArr.push(ajaxData);
        this.$router.push({name:'cart', params: { selectArr: selectArr}});
      })
      .catch(res => {
        this.showTip("网络错误，请重试");
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
