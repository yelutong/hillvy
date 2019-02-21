<template>
  <div class="wrapper white page-express">
    <div class="lay-info" v-if="!!expressData">
      <p class="info">运单号：{{ expressData.nu }}</p>
      <p class="info">承运公司：{{ expressData.com }}</p>
    </div>
    <div class="lay-detail" v-if="!!expressData">
      <div class="title">运单追踪</div>
      <div class="list">
        <div class="item" v-for="(item, index) in expressData.data" :key="index">
          <div class="context"> {{ item.context }}</div>
          <div class="date"> {{ item.time }}</div>
          <hr class="line" />
        </div>
      </div>
    </div>
    <v-nodata v-if="noExpress" text="- 未查询到相关物流信息 -" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "mint-ui";
import vNodata from "@/components/v-nodata";
export default {
  data() {
    return {
      detailId: this.getUrlParam("detail-id") || "",
      noExpress: false,
      expressData: null
    };
  },
  components: {
    "v-nodata": vNodata
  },
  computed: {
    ...mapState(["token"])
  },
  created() {
    // 获取物流信息
    this.getExpressData(this.detailId);
  },
  methods: {
    actionError() {
      // 失败的操作函数
      this.noExpress = true;
      this.expressData = null;
    },
    getExpressData(detailId) {
      // 查询物流信息
      const loading = Toast({
        message: "查询中...",
        iconClass: "loading",
        duration: 30000
      });
      this.$axios
        .get(this.api.getExpress, {
          headers: { "Authorization": this.token },
          params: { order_detail_id: detailId }
        })
        .then(res => {
          loading.close();
          const resData = res.data;
          if (resData.code !== 1) {
            this.actionError();
            this.showTip(resData.message);
            return;
          }
          // 成功后赋值数据
          let objData =
            typeof resData.content === "string"
              ? JSON.parse(resData.content)
              : resData.content;
          if (!objData.data) {
            this.showTip(objData.message || "还未生成物流信息，请稍后查询");
            this.actionError();
            return;
          }
          this.noExpress = false;
          this.expressData = objData;
        })
        .catch(res => {
          loading.close();
          this.actionError();
          this.showTip("查询物流信息失败");
        });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/express';
</style>