<template>
  <div class="wrapper white page-evaserve">
    <div class="lay-eva">
      <header class="title">给商家评分（满意请给5分哦~）</header>
      <div class="item" v-for="(item, index) in serveData" :key="index">
        <span class="type">{{ item.type }}</span>
        <div class="star">
          <i class="ico i-star" :class="{active:isActive[index][dex]}" v-for="(im, dex) in totalStar" :key="dex" @click="setStar(item, dex)"></i>
        </div>
      </div>
    </div>
    <div class="lay-action">
      <button class="btn-submit" @click="evaService">发表评价</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const qs = require("qs");
export default {
  data() {
    return {
      id: this.getUrlParam("id") || "",
      totalStar: 5,
      serveData: [
        { type: "描述相符", star: 0 },
        { type: "服务态度", star: 0 },
        { type: "物流服务", star: 0 }
      ]
    };
  },
  computed: {
    ...mapState(["token"]),
    isActive() {
      const serveData = this.serveData;
      let arrType = [];
      serveData.forEach((val, index) => {
        let arrStar = [];
        for (var i = 0; i < this.totalStar; i++) {
          arrStar.push(i < val.star ? true : false);
        }
        arrType.push(arrStar);
      });
      return arrType;
    }
  },
  beforeCreate() {
    document.title = "评价服务";
  },
  methods: {
    // 打星评价
    setStar(item, dex) {
      item.star = dex + 1;
    },
    // 点击评价服务
    evaService() {
      const serveData = this.serveData;
      // 三个都打分才能评价
      const canSubmit = serveData.filter(val => {
        if (val.star === 0) {
          return val.type;
        }
      });
      if (canSubmit.length > 0) {
        this.showTip("请给 “" + canSubmit[0].type + "” 评分");
        return;
      }
      // 打完分后读取接口
      this.$axios
        .post(
          this.api.evaService,
          qs.stringify({
            store_id: 1,
            describe_star_num: serveData[0].star,
            service_star_num: serveData[1].star,
            logistics_star_num: serveData[2].star
          }),
          {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "Authorization": this.token
            }
          }
        )
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("评价失败，请稍后重试");
            return;
          }
          // 成功后返回
          this.showTip("评价成功，感谢您的评分！", 2000, "ok");
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        })
        .catch(res => {
          this.showTip("评价失败，请稍后重试");
        });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/evaserve';
</style>