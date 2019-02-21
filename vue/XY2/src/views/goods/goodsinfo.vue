<template>
  <div class="wrapper white page-goodsinfo">
    <div class="tab-nav white">
      <div class="item" :class="{active:index === choseDex}" v-for="(item, index) in infoNav" :key="index" @click="choseDex=index">
        {{ item }}
      </div>
    </div>
    <div class="tab-con">
      <div class="goods-intro" v-if="choseDex===0">
        <img class="img" :src="item" v-for="(item, index) in goodsDetailData.intro" :key="index" />
        <v-nodata v-if="noIntro" text="- 暂无数据 -" />
      </div>
      <div class="goods-param" v-if="choseDex===1">
        <div class="item" v-for="(item, index) in goodsDetailData.param" :key="index">
          <span class="name">{{ item.specName }}</span>
          <span class="value">{{ item.specVal }}</span>
        </div>
        <v-nodata v-if="noParam" text="- 暂无数据 -" />
      </div>
      <div class="goods-serve" v-if="choseDex===2">
        <div class="item" v-for="(item, index) in goodsDetailData.serve" :key="index">
          <v-title :title="item.specName" level="second"></v-title>
          <div class="intro">{{ item.specVal }}</div>
        </div>
        <v-nodata v-if="noServe" text="- 暂无数据 -" />
      </div>
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
import vTitle from "@/components/v-title";
import vNodata from "@/components/v-nodata";
export default {
  data() {
    return {
      id: this.getUrlParam("id"),
      isCollect: false,
      choseDex: 0,
      infoNav: ["商品介绍", "规格参数", "包装售后"],
      goodsDetailData: {
        intro: [],
        param: [],
        serve: []
      },
      noIntro: false,
      noParam: false,
      noServe: false
    };
  },
  components: {
    "v-title": vTitle,
    "v-nodata": vNodata
  },
  computed: {
    ...mapState(["token"])
  },
  created() {
    // 商品id和是否已收藏状态
    const id = this.id;
    this.getGoodsDetailData(id);
    this.getIfCollect(id);
  },
  methods: {
    // 获取商品图文详情
    getGoodsDetailData(id) {
      this.$axios
        .get(this.api.getGoodsDetail, { params: { product_id: id } })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("获取商品图文信息失败");
            return;
          }
          const objData = resData.content;
          const introData = objData.appPhotoMainUrls || [];
          const paramData = objData.listDetailMainBody || [];
          const serveData = objData.listDetailMainSale || [];
          // 没有数据就显示无
          if (introData.length === 0) {
            this.noIntro = true;
          } else {
            this.goodsDetailData.intro = introData;
          }
          if (paramData.length == 0) {
            this.noParam = true;
          } else {
            this.goodsDetailData.param = paramData;
          }
          if (serveData.length === 0) {
            this.noServe = true;
          } else {
            this.goodsDetailData.serve = serveData;
          }
        })
        .catch(res => {
          this.showTip("获取商品图文信息失败");
        });
    },
    // 设置收藏状态
    getIfCollect(id) {
      this.$axios
        .get(this.api.ifGoodsCollect, {
          headers: { "Authorization": this.token },
          params: { product_id: id }
        })
        .then(res => {
          const resData = res.data;
          if (resData.code === 1) {
            this.isCollect = resData.content;
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
            headers: { "Authorization": this.token },
            params: { product_id: this.id }
          })
          .then(res => {
            const resData = res.data;
            if (resData.code !== 1) {
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
            headers: { "Authorization": this.token },
            params: { product_id: this.id }
          })
          .then(res => {
            const resData = res.data;
            if (resData.code !== 1) {
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
      const userId = wx.getStorageSync("userId");
      if (!userId) {
        wx.showModal({
          content:
            "您还没有绑定手机，无法进行下单和个人操作，建议您先绑定手机~",
          success: res => {
            if (res.confirm) {
              wx.navigateTo({
                url: "/pages/bind/bind"
              });
            }
          }
        });
      } else {
        wx.navigateTo({
          url: "/pages/buy/buy?id=" + id
        });
      }
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/pay-act-btom';
@import '../../assets/css/goodsinfo';
</style>
