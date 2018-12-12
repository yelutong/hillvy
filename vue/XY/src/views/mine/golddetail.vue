<template>
  <div class="wrapper page-golddetail">
    <div class="detail-list">
      <div class="item" v-for="(item, index) in goldDetailData" :key="index">
        <span class="tag">{{ item.tag}}</span>
        <span class="con">{{ item.con}}</span>
      </div>
    </div>
    <v-nodata v-if="noInfo" bgcolor="grey" text="- 未获取到提现明细 -" />
  </div>
</template>

<script>
import vNodata from "@/components/v-nodata";
export default {
  data() {
    return {
      noInfo: false,
      goldDetailData: []
    };
  },
  components: {
    "v-nodata": vNodata
  },
  beforeCreate() {
    document.title = "提现明细";
  },
  created() {
    // 从缓存中拿明细
    const goldDetail = window.localStorage.getItem('goldDetail');
    if (!!goldDetail) {
      this.goldDetailData = JSON.parse(goldDetail);
    } else {
      this.noInfo = true;
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/golddetail';
</style>
