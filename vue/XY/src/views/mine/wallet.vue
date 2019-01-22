<template>
  <div class="wrapper page-wallet">
    <vHeader title="我的钱包" to="/mine" />
    <div class="lay-action white mt50 relative">
      <div class="walletImg"><img src="@/assets/images/walletBg.png" /></div>
      <div class="walletContent center"><p class="fs-12">总资产</p><p  class="fs-18 mt5" v-text="walletInfo.currentGoodsFee"></p></div>
    </div>
    <div class="lay-detail">
      <div class="row justify-content-space-around couponTitle white">
        <span class="tag vux-1px-r per50">
         <p class="fs-12">消费券</p>
         <p class="txt-black fs-15" v-text="walletInfo.currentEnableIntegral"></p>
        </span>
        <span class="tag per50">
         <p class="fs-12">兑换券</p>
         <p class="txt-black fs-15" v-text="walletInfo.currentLockIntegral"></p>
       </span>
      </div>
      <div class="mt10 white">
        <v-cell title="消费券记录" link="" />
        <v-cell title="兑换券记录" link="" />
      </div>
    </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import vHeader from "@/components/v-header";
import vCell from "@/components/v-cell";
export default {
  data() {
    return {
      walletInfo: '',
      noWallet: false
    };
  },
  components: {
    vHeader,
    "v-cell": vCell
  },
  computed: {
    ...mapState(["token"])
  },
  created() {
    this.verToken();
  },
  methods: {
    verToken(){
     if(!this.token){
      this.showTip("登录超时，请重新登录");
      this.$router.push({path: "/mine/login"});
     }else{
      // 获取我的钱包数据
      this.getWalletInfo();
     }
    },
    // 获取我的钱包数据
    getWalletInfo() {
      this.$axios
        .get(this.api.userWallet, { headers: { "Authorization": this.token } })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.noWallet = true;
            this.showTip(resData.message);
            return;
          }
          this.walletInfo = resData.content;
          console.log(this.walletInfo)
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
