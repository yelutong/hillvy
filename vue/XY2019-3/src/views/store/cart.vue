<template>
  <div class="wrapper page-buy">
  <vHeader title="购物车"/>
    <div class="lay-goods mt50">
      <div class="items mb10 white pd15" v-for="(items,index) in goodsArr" :key="index">
        <div class="relative h40 justify-content-space-between">
          <span class="fs-13 txt-black storeName" v-text="items.storeName"></span>
          <span class="del" @click="deleteCart(items.ids)"><img :src="del" /></span>
        </div>
        <div class="item" v-for="(item, index) in items.goodsBuyInfo" :key="index">
        <div class="img-box">
          <img class="img" :src="item.img" />
        </div>
        <div class="info-box">
          <div class="title fs-12">
            {{ item.name }}
          </div>
          <div class="price-num">
            <span class="price fs-13">￥{{ item.price }}</span>
            <div class="change-num">
              <span class="rdu" @click="changeNum('rdu', item, items)">-</span>
              <span class="num">{{ item.num }}</span>
              <span class="add" @click="changeNum('add', item, items)">+</span>
            </div>
          </div>
        </div>
      </div>

      <div class="lay-action vux-1px-t pay-act-btom justify-content-space-between cartPrice">
        <div class="price-info flex1">
          <span class="tag fs-12">合计：</span>
          <span class="total fs-15" v-text="'￥'+dotFormat2(items.cartPrice)"></span>
        </div>
      <button class="btn-submit fs-14" @click="makeOrder(items.storeId)">去结算</button>
      </div>

      </div>
    </div>

    
    <v-nodata v-if="!isShowList" bgcolor="grey" text="- 购物车空空如也 -" />
    <v-footer active="goodsCart"/>
  </div>
</template>

<script>
// 购物车
import { mapState } from "vuex";
import { Toast, Header } from "mint-ui";
import vFooter from "@/components/v-footer";
import vNodata from "@/components/v-nodata";
import vHeader from "@/components/v-header";
import del from "@/assets/images/del2.png";
const qs = require("qs");
export default {
  data() {
    return {
      canEdit: true,
      list: [],
      del: del,
      allSelect: false,
      checkallList: [],
      checked: [],
      price:0,
      count:0,
      isShowList: false,
      goodsCarts:[],
      payPrice: 0,
      userCouponIds: [],
      goodsChannel: 1,
      isUseIntegral:0,
      num: '',
      id: this.getUrlParam("id"),
      showAddress: null,
      goodsArr: [],
      goodsTips: "",
      uuid:''
    };
  },
  components: { 
    'v-footer': vFooter,
    "v-nodata": vNodata,
    vHeader
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {//给window添加一个滚动滚动监听事件
    window.addEventListener('scroll', this.handleScroll, false);
  },
  beforeCreate(){
    document.title = '购物车';
  },
  created() {
    this.getCartList();
  },
  methods: {
    // 改变数量
    changeNum(type, item, items) {
      let num = item.num;
      if (type == "add") {//因为已进入方法就加减过了，现在把数量还原回去
        num += 1;
      }else{
        num -= 1;
      } 
      this.$axios
        .post(
          this.api.otoCartUpdate,
          JSON.stringify({
           'goodsCount': num,
           'id': item.id
          }),
          {
            headers: {
              "content-type": "application/json",
              "Authorization": this.token
            }
          }
        )
        .then(res => {
          console.log(res);
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("修改数量失败");
            return;
          }
          if (type == "add") {//因为已进入方法就加减过了，现在把数量还原回去
            item.num += 1;
            items.cartPrice += item.price;
          }else{
            item.num -= 1;
            items.cartPrice -= item.price;
          }
          if(num==0){
            this.goodsArr=[];
            this.getCartList();
          }else{
            this.showTip("修改数量成功");
          }
          
        })
        .catch(res => {
          this.showTip("修改数量失败");
        });
    },
    deleteCart(val){
        this.$axios
        .get(this.api.otoBatchDelete+val,{
          headers: {
            "Authorization": this.token,
            "content-type": "application/json"
          }
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.msg);
            return;
          }else{
            this.showTip("删除成功");
            this.goodsArr = [];
            this.getCartList();
          }
        })
        .catch(res => {
         // this.showTip("网络错误");
        });
    },
    getCartList(){
      this.$axios
        .post(
          this.api.otoGoodsCartList,
          JSON.stringify({}),
          {
            headers: {
              "content-type": "application/json",
              "Authorization": this.token
            }
          }
        )
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("未获取到商品信息");
            return;
          }else{
            console.log(resData);
            // 成功后赋值商品对象，并存进数组
            if(resData.content.length>0){
              this.isShowList = true;
              const objData = resData.content;
              for( let items of objData){
                let goodsBuyInfo = [];
                let ids = [];
                let cartPrice = 0;
                for( let item of items.list ){
                  let objGoodsData = {
                  'id':item.id,
                  'goodsId': item.goodsId,
                  'num': item.goodsCount,
                  'name': item.goodsName,
                  'price': item.goodsPrice,
                  'img': item.goodsImg?this.api.urlPic+item.goodsImg.split(',')[0]:''
                  }
                  cartPrice = cartPrice + item.goodsCount * item.goodsPrice;
                  goodsBuyInfo.push(objGoodsData);
                  ids.push(item.id);
                }
                let itemInfo = {
                  "cartPrice": cartPrice,
                  'storeName': items.storeName,
                  'storeId': items.list[0].storeId,
                  "goodsBuyInfo": goodsBuyInfo,
                  "ids": ids.join(",")
                }
               this.goodsArr.push(itemInfo)
              }
              console.log(this.goodsArr);
            }else{
              this.isShowList = false;
            }
          }
        })
        .catch(res => {
         // this.showTip("未获取到商品信息");
        });
    },
    // 结算下单
    makeOrder(id) {
      this.$router.push({//核心语句
        path:'/store/fillOrder',//跳转的路径
        query:{//路由传参时push和query搭配使用 ，作用时传递参数
          storeId: id
        }
      })
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/pay-act-btom';
@import '../../assets/css/media';
@import '../../assets/css/buy';
@import '../../assets/css/nearby';
</style>
