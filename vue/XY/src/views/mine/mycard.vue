<template>
  <div class="wrapper page-mycard">
    <div class="card-list">
      <div class="item" v-for="(item, index) in cardList" :key="index">
        <i class="ico i-card" @click="choseCard(item)"></i>
        <div class="card-info" @click="choseCard(item)">
          <span class="name">{{ item.bankName }}</span>
          <span class="info">尾号 {{ item.bankCardNo }} 的银行卡</span>
        </div>
        <div class="act" @click="deleteCard(item, index)">
          <i class="ico i-del"></i>
        </div>
      </div>
      <v-nodata v-if="noCard" bgcolor="grey" text="- 您还没有绑定银行卡 -" />
    </div>
    <div class="lay-action fix-btom">
      <router-link class="btn-submit nordu" to="/mine/bindcard">+ 绑定银行卡</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox } from "mint-ui";
import vNodata from "@/components/v-nodata";
export default {
  data() {
    return {
      from: this.getUrlParam("from") || "",
      cardList: [],
      noCard: false
    };
  },
  components: {
    "v-nodata": vNodata
  },
  computed: {
    ...mapState(["token"])
  },
  created(opn) {
    // 加载已绑定的银行卡
    this.getCardList();
  },
  methods: {
    // 银行卡截断处理
    subCard(str) {
      str = str.toString();
      if (str.length <= 4) {
        return str;
      }
      return str.substring(str.length - 4, str.length);
    },
    // 获取已绑定的银行卡
    getCardList() {
      this.$axios
        .get(this.api.getBankCard, { headers: { "Authorization": this.token } })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.message);
            this.noCard = true;
            return;
          }
          const arrData = resData.content || [];
          this.noCard = arrData.length === 0 ? true : false;
          // 做下截断处理
          arrData.forEach(val => {
            val.bankCardNo = this.subCard(val.bankCardNo);
          });
          this.cardList = arrData;
        })
        .catch(res => {
          this.showTip("获取绑定的银行卡失败");
          this.noCard = true;
        });
    },
    // 选择这张银行卡
    choseCard(item) {
      const from = this.from;
      // 如果来自提现页面，把选择的银行卡存一下
      if (from === "getgold") {
        window.localStorage.setItem(
          "choseCard",
          JSON.stringify({
            cardId: item.id,
            cardName: item.bankName,
            cardInfo: item.bankCardNo
          })
        );
        setTimeout(() => {
          this.$router.go(-1);
        }, 0);
      }
    },
    // 删除这张银行卡
    deleteCard(item, index) {
      MessageBox({
        title: "删除提示",
        message: "确定要删除这张银行卡吗？",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          this.$axios
            .get(this.api.delBankCard, {
              headers: { "Authorization": this.token },
              params: { bank_card_id: item.id }
            })
            .then(res => {
              const resData = res.data;
              if (resData.code !== 1) {
                this.showTip(resData.message);
                return;
              }
              // 删除之后重读一下获取接口
              this.showTip("删除成功！");
              this.getCardList();
              // 判断是否把缓存的默认银行卡删掉了
              const choseCard = JSON.parse(
                window.localStorage.getItem("choseCard")
              );
              if (!!choseCard && choseCard.cardId === item.id) {
                window.localStorage.removeItem("choseCard");
              }
            })
            .catch(res => {
              this.showTip("删除失败，请重试！");
            });
        }
      });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/mycard';
</style>
