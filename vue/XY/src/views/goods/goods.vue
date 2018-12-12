<template>
  <div class="wrapper page-goods">
    <div class="lay-swiper white">
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
        <div class="item" @click="callHelp">
          <i class="ico i-call"></i>
          <p class="text">联系卖家</p>
        </div>
        <div class="item" @click="collectAction">
          <i class="ico i-colet" :class="{active:isCollect}"></i>
          <p class="text">收藏</p>
        </div>
      </div>
      <button class="btn-submit nordu" @click="pageToBuy(id)">立即购买</button>
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
export default {
  data() {
    return {
      id: this.getUrlParam("id"),
      goodsMainData: null,
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
    "v-imglist": vImglist
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
    this.getIfCollect(id);
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
              con: val
            });
          });
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
        .get(this.api.getGoodsEva, {
          params: {
            product_id: id,
            page_no: 1,
            page_size: 2
          }
        })
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
    // 设置收藏状态
    getIfCollect(id) {
      this.$axios
        .get(this.api.ifGoodsCollect, {
          headers: { access_token: this.token },
          params: { product_id: id }
        })
        .then(res => {
          const resData = res.data;
          if (resData.code === 100) {
            this.isCollect = resData.data;
          } else {
            this.isCollect = false;
          }
        });
    },
    // 收藏或者取消收藏
    collectAction() {
      if (this.isCollect) {
        // 如果已收藏，则取消收藏
        this.$axios
          .get(this.api.removeCollect, {
            headers: { access_token: this.token },
            params: { product_id: this.id }
          })
          .then(res => {
            const resData = res.data;
            if (resData.code !== 100) {
              this.showTip("取消收藏失败");
              return;
            }
            this.showTip("取消收藏成功");
            this.isCollect = false;
          })
          .catch(res => {
            this.showTip("取消收藏失败");
          });
      } else {
        // 未收藏则增加收藏
        this.$axios
          .get(this.api.addCollect, {
            headers: { access_token: this.token },
            params: { product_id: this.id }
          })
          .then(res => {
            const resData = res.data;
            if (resData.code !== 100) {
              this.showTip("收藏失败");
              return;
            }
            this.showTip("收藏成功");
            this.isCollect = true;
          })
          .catch(res => {
            this.showTip("收藏失败");
          });
      }
    },
    // 弹出电话
    callHelp() {
      this.callService();
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
