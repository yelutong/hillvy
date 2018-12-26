<template>
  <div class="wrapper page-wallet">
    <div class="lay-action white">
      <router-link class="btn-submit" to="/mine/mycard">我的银行卡</router-link>
      <router-link class="btn-submit" to="/mine/getgold">提现申请</router-link>
    </div>
    <div class="lay-detail white">
      <div class="row">
        <span class="tag tag-1">名称</span>
        <span class="tag tag-2">单位</span>
        <span class="tag tag-3">积分</span>
      </div>
      <div class="row" v-for="(item, index) in walletInfo " :key="index">
        <span class="tag tag-1">{{ item.typeName }}</span>
        <span class="tag tag-2">{{ item.unit }}</span>
        <span class="tag tag-3">{{ item.amount }}</span>
      </div>
    </div>
    <v-nodata v-if="noWallet" bgcolor="grey" text="- 暂无明细数据 -" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import vNodata from "@/components/v-nodata";
export default {
  data() {
    return {
      walletInfo: [],
      noWallet: false
    };
  },
  components: {
    "v-nodata": vNodata
  },
  computed: {
    ...mapState(["token"])
  },
  created() {
    // 获取我的钱包数据
    this.getWalletInfo();
  },
  methods: {
    // 获取我的钱包数据
    getWalletInfo() {
      this.$axios
        .get(this.api.getWalletInfo, { headers: { "Authorization": this.token } })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.noWallet = true;
            this.showTip(resData.message);
            return;
          }
          // 成功后对数据重组
          const arrData = resData.content || [];
          this.noWallet = arrData.length === 0 ? true : false;
          this.walletInfo = arrData;
        })
        .catch(res => {
          this.noWallet = true;
          this.showTip("获取我的钱包数据失败");
        });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/wallet';
</style>
