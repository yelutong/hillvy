<template>
  <div class="wrapper page-bindcard">
    <div class="lay-bind white">
      <div class="tag">请绑定实名认证人的银行卡</div>
      <v-cell type="input" title="开户行" place="请输入开户行" pro="cardtype" :iptCon="bindCardData.cardtype" @iptChange="changeData" />
      <v-cell type="input" title="开卡人姓名" place="请输入姓名" pro="name" :iptCon="bindCardData.name" @iptChange="changeData" />
      <v-cell type="input" title="银行卡号" place="请输入银行卡号" pro="number" :iptCon="bindCardData.number" @iptChange="changeData" />
    </div>
    <div class="lay-action fix-btom">
      <button class="btn-submit nordu" @click="bindCard">确定绑定</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "mint-ui";
import vCell from "@/components/v-cell";
const qs = require("qs");
export default {
  data() {
    return {
      bindCardData: {
        cardtype: "",
        name: "",
        number: ""
      }
    };
  },
  components: {
    "v-cell": vCell
  },
  computed: {
    ...mapState(["token"])
  },
  methods: {
    // 父子通信
    changeData(data) {
      this.bindCardData[data.pro] = data.value;
    },
    // 绑定银行卡
    bindCard() {
      const bindCardData = this.bindCardData;
      // 检验数据先
      if (bindCardData.cardtype === "") {
        this.showTip("请输入开户行");
        return;
      }
      if (bindCardData.name === "") {
        this.showTip("请输入开户人姓名");
        return;
      }
      if (bindCardData.number === "") {
        this.showTip("请输入银行卡号");
        return;
      }
      // 校验通过后，开始绑定接口
      const loading = Toast({
        message: "绑定中...",
        iconClass: "loading",
        duration: 30000
      });
      this.$axios
        .post(
          this.api.bindBankCard,
          qs.stringify({
            bank_name: bindCardData.cardtype,
            holder_name: bindCardData.name,
            bank_card_no: bindCardData.number
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
          // 绑定成功后清空数据，返回
          this.bindCardData = {
            cardtype: "",
            name: "",
            number: ""
          };
          this.showTip("绑定成功！", 1500, "ok");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        })
        .catch(res => {
          loading.close();
          this.showTip("绑定失败，请重试！");
        });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/bindcard';
</style>
