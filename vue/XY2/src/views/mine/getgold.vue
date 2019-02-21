<template>
  <div class="wrapper page-getgold">
    <div class="lay-mycard white">
      <router-link class="item" :to="{path:'/mine/mycard', query:{from:'getgold'}}">
        <i class="ico i-card"></i>
        <div class="card-info" v-if="choseCardData">
          <span class="name">{{ choseCardData.cardName }}</span>
          <span class="info">尾号 {{ choseCardData.cardInfo }} 的银行卡</span>
        </div>
        <span class="text" v-else>请选择提现银行卡</span>
        <i class="ico i-arow i-black"></i>
      </router-link>
    </div>
    <div class="lay-input white">
      <div class="tag">提现金额</div>
      <div class="input-box">
        <span class="unit">￥</span>
        <input class="ipt" type="number" v-model.trim="applyGold" placeholder="请输入金额" />
      </div>
      <div class="info">
        <div class="balance">当前余额为
          <span class="num">{{ hasGold }}</span> 元
        </div>
        <div class="tip">注T+1天到账</div>
      </div>
    </div>
    <div class="lay-action white">
      <button class="btn-submit" @click="applyGetGold">申请提现</button>
      <div class="to-record">
        <router-link class="link" to="/mine/goldrecord">提现记录
          <i class="ico i-arow i-blue"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "mint-ui";
import vCell from "@/components/v-cell";
import vNodata from "@/components/v-nodata";
const qs = require("qs");
export default {
  data() {
    return {
      hasGold: 0,
      applyGold: "",
      choseCardData: null
    };
  },
  components: {
    "v-nodata": vNodata,
    "v-cell": vCell
  },
  computed: {
    ...mapState(["token"])
  },
  created() {
    // 判断是否有缓存记录已选择的银行卡
    this.ifChoseCard();
    // 获取用户的分红金额
    this.goldAmount();
  },
  methods: {
    // 判断是否有缓存记录已选择的银行卡
    ifChoseCard() {
      const choseCard = window.localStorage.getItem("choseCard");
      if (!!choseCard) {
        this.choseCardData = JSON.parse(choseCard);
      } else {
        this.choseCardData = null;
      }
    },
    // 申请提现
    applyGetGold() {
      const hasGold = this.hasGold;
      const applyGold = this.applyGold;
      const choseCardData = this.choseCardData;
      // 检验数据先
      if (hasGold == 0) {
        this.showTip("您的金额为0，不能提现");
        return;
      }
      if (applyGold === "") {
        this.showTip("请输入提现金额数");
        return;
      }
      if (applyGold > hasGold) {
        this.showTip("提现额度超过您现有的金额");
        return;
      }
      if (applyGold < 100) {
        this.showTip("每次提现金额至少100元");
        return;
      }
      if (!choseCardData) {
        this.showTip("请选择一张提现银行卡");
        return;
      }
      // 校验通过后，开始读取提交接口
      const loading = Toast({
        message: "提交中...",
        iconClass: "loading",
        duration: 30000
      });
      this.$axios
        .post(
          this.api.applyGetGold,
          qs.stringify({
            bank_card_id: choseCardData.cardId,
            take_cash_amount: applyGold
          }),
          {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "Authorization": this.token
            }
          }
        )
        .then(res => {
          loading.close();
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.message);
            return;
          }
          // 绑定成功后清空数据，刷新所剩金额
          this.showTip("提现申请成功！", 1500, "ok");
          this.applyGold = "";
          this.goldAmount();
        })
        .catch(res => {
          loading.close();
          this.showTip("提现失败，请重试！");
        });
    },
    // 获取用户的分红金额
    goldAmount() {
      this.$axios
        .get(this.api.goldAmount, { headers: { "Authorization": this.token } })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.message);
            this.hasGold = 0;
            return;
          }
          this.hasGold = resData.content;
        })
        .catch(res => {
          this.showTip("未能获取到您的分红金额");
          this.hasGold = 0;
        });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/getgold';
</style>
