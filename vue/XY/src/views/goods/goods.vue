<template> 
  <div class="wrapper page-goods">
    <vHeader :title="goodsMainData.name" to="/55"/>
    <div class="lay-swiper white mt40">
      <v-swiper :swiper-data="imageSwiper" />
    </div>
    <div class="lay-goods white" v-if="!!goodsMainData">
      <div class="gd-name">{{ goodsMainData.name }}</div>
      <div class="price-weight">
        <span class="price">￥{{ goodsMainData.price }}</span>
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
      <img class="img" :src="item" v-for="(item, index) in arrDetailImg" :key="index" />
    </div>
    <div class="lay-action fix-btom pay-act-btom">
      <div class="service">

        <div class="item per40" @click="callHelp">
          <i class="ico i-call"></i>
          <p class="text">客服</p>
        </div>
        <div class="item per30 bg-blue btn-submit" @click="pageToBuy(id)">
          立即购买
        </div>
        <div class="item per30 btn-submit" @click="addToCart(id)">
          加入购物车
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox } from "mint-ui";
import vSwiper from "@/components/v-swiper";
import vCell from "@/components/v-cell";
import vNodata from "@/components/v-nodata";
import vImglist from "@/components/v-imglist";
import vHeader from "@/components/v-header";
const qs = require("qs");
export default {
  data() {
    return {
      id: this.getUrlParam("id"),
      goodsMainData: {
        id: null,
        name: null,
        price: null,
        weight: null
      },
      isCollect: false,
      imageSwiper: {
        speed: 800,
        auto: 3000,
        showIndicators: true,
        continuous: true,
        link: "/goods/goodsinfo",
        arrData: []
      },
      arrDetailImg: [],
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
    ...mapState(["token", "userId"])
  },
  beforeCreate() {
    document.title = "商品详情";
  },
  created() {
    // 取得商品id
    const id = this.id;
    this.getGoodsMainData(id);
    this.getGoodsDetailImg(id);
    this.getGoodsEva(id);
  },
  methods: {
    // 获取商品主体信息
    getGoodsMainData(id) {
      this.$axios
        .get(this.api.getGoodsMain, {
          params: {
            product_id: id
          }
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            this.showTip("获取商品信息失败");
            return;
          }
          const objData = resData.data;
          console.log(objData);
          if(objData){
            // 成功后赋值商品对象
            this.goodsMainData = {
              id: objData.id,
              name: objData.name,
              price: objData.salePrice,
              weight: objData.weight
            };
            // 再把轮播图片存进轮播对象
            const arrImg = objData.photoMainUrls || [];
            this.imageSwiper.arrData = [];
            arrImg.forEach(val => {
              this.imageSwiper.arrData.push({
                id: objData.id,
                photoUrl: val
              });
            });
            console.log(this.imageSwiper.arrData);
          }
        })
        .catch(res => {
          this.showTip("获取商品信息失败");
        });
    },
    // 获取商品图文详情的--“图”
    getGoodsDetailImg(id) {
      this.$axios
        .get(this.api.getGoodsDetail, { params: { product_id: id } })
        .then(res => {
          const resData = res.data;
          if (resData.code === 100) {
            this.arrDetailImg = resData.data.appPhotoMainUrls || [];
          }
        });
    },
    // 获取商品评价列表
    getGoodsEva(id) {
      this.$axios
        .get(this.api.getGoodsEva, qs.stringify({
          params: {
            product_id: id,
            page_no: 1,
            page_size: 2
          }
        }))
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            this.goodsEvaList = [];
            this.noEvas = true;
            return;
          }
          const objData = resData.data,
            arrData = objData.records || [];
          if (arrData.length === 0) {
            this.noEvas = true;
          } else {
            this.noEvas = false;
          }
          this.evasNum = objData.total;
          // 重组下数据
          let newArr = [];
          arrData.forEach(val => {
            newArr.push({
              avatar: val.user.photoAvatarUrl,
              name: val.user.fullName || val.user.nickName || "匿名",
              star: val.starNum,
              content: val.content,
              date: this.dateFormat(val.createDate, "YYYY-MM-DD hh:mm"),
              title: val.product.name,
              imgList: val.imagePath
            });
          });
          this.goodsEvaList = newArr;
        })
        .catch(res => {
          this.goodsEvaList = [];
          this.noEvas = true;
        });
    }, 
    // 弹出电话
    callHelp() {
      this.callService();
    },
    // 加入购物车
    addToCart(id) {
      this.$router.push({ path: "/cart", query: { id: id } });
    },
    // 立即购买
    pageToBuy(id) {
      // 判断是否绑定了手机号
      if (!this.userId) {
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
      } else {
        this.$router.push({ path: "/cart", query: { id: id } });
      }
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/pay-act-btom';
@import '../../assets/css/goods';
</style>
