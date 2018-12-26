<template>
  <div class="wrapper white page-evagoods">
    <div class="lay-imgs">
      <v-imglist :image-data="imgList" size="75" touch="delete" @touchimg="imageAction" />
    </div>
    <div class="img-list">
      <div class="img-box mid-img" v-for="(item, index) in imgList" :key="index">
        <img class="img" :src="item" />
      </div>
    </div>
    <textarea class="txa" v-model.trim="evaContent" placeholder="感觉这件商品怎么样？来评价几句吧~" maxlength="200"></textarea>
    <vue-core-image-upload class="up-load" :crop="false" text="" inputAccept="image/*" @imageuploaded="chooseImage" :credentials="false"
      :max-file-size="10485760" :multiple="false" inputOfFile="Filedata" :url="this.api.uploadImages" :headers="{"Authorization":this.token}">
    </vue-core-image-upload>
    <button class="btn-submit" @click="evaGoods">发表评价</button>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import {
    Toast
  } from "mint-ui";
  import VueCoreImageUpload from "vue-core-image-upload";
  import vImglist from "@/components/v-imglist";
  const qs = require("qs");
  export default {
    data() {
      return {
        id: this.getUrlParam("id") || "",
        detailId: this.getUrlParam("detail-id") || "",
        evaContent: "",
        imgList: [],
        arrImgId: []
      };
    },
    components: {
      "v-imglist": vImglist,
      "vue-core-image-upload": VueCoreImageUpload
    },
    computed: {
      ...mapState(["token"])
    },
    beforeCreate() {
      document.title = "评价商品";
    },
    methods: {
      // 接收子组件传来的点击图片事件
      imageAction(index) {
        this.imgList.splice(index, 1);
        this.arrImgId.splice(index, 1);
      },
      // 上传之后的事件
      chooseImage(data) {
        const imgList = this.imgList;
        if (imgList.length >= 8) {
          this.showTip("最多只能上传8张图片");
          return;
        }
        if (data.code !== 1 || !data.data || data.data.length === 0) {
          this.showTip("上传失败，请重试");
          return;
        }
        const arrData = data.data;
        this.imgList.push(arrData[0].imagePath);
        this.arrImgId.push(arrData[0].imgId);
      },
      // 点击发表评价
      evaGoods() {
        const evaContent = this.evaContent;
        const arrImgId = this.arrImgId;
        let lastImgIds = '';
        // 先检验和整合数据
        if (evaContent.length === "" || evaContent.length < 5) {
          this.showTip("请至少输入五个字的评价");
          return;
        }
        if (arrImgId.length > 0) {
          lastImgIds = arrImgId.join(",");
        }
        // 通过后开始保存评价
        const loading = Toast({
          message: "保存评价中...",
          iconClass: "loading",
          duration: 10000
        });
        this.$axios.post(this.api.evaGoods, qs.stringify({
          order_detail_id: this.detailId,
          product_id: this.id,
          content: evaContent,
          image_ids: lastImgIds || ""
        }), {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": this.token
          },
        }).then(res => {
          loading.close();
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("评价失败，请稍后重试");
            return;
          }
          // 成功后返回
          this.showTip('评价成功，感谢您的支持！', 1500, 'ok');
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        }).catch(res => {
          loading.close();
          this.showTip("评价失败，请稍后重试");
        });
      }
    }
  };

</script>

<style lang="stylus">
  @import '../../assets/css/evagoods';

</style>
