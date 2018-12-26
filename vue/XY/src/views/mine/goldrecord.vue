<template>
  <div class="wrapper page-goldrecord">
    <div class="record-list">
      <div class="item" v-for="(item, index) in goldRecordData" :key="index" @click="pageToDetail(item)">
        <div class="info">
          <span class="status">{{ item.status }}</span>
          <span class="date">{{ item.date }}</span>
        </div>
        <span class="num">-{{ item.num }}</span>
      </div>
      <v-nodata v-if="noRecord" bgcolor="grey" text="- 您还没有提现 -" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import vNodata from "@/components/v-nodata";
export default {
  data() {
    return {
      noRecord: false,
      goldRecordData: []
    };
  },
  components: {
    "v-nodata": vNodata
  },
  computed: {
    ...mapState(["token"])
  },
  beforeCreate() {
    document.title = "提现记录";
  },
  created() {
    // 获取用户的提现记录
    this.getGoldRecord();
  },
  methods: {
    // 状态标识转换为文字
    getStatus(status) {
      let statusTxt = "提现申请已提交";
      switch (status) {
        case "applying":
          statusTxt = "提现申请已提交";
          break;
        case "applypass":
          statusTxt = "提现申请已到账";
          break;
        case "applyrefuse":
          statusTxt = "提现申请被拒绝";
          break;
      }
      return statusTxt;
    },
    // 获取用户的提现记录
    getGoldRecord() {
      this.$axios
        .get(this.api.getGoldRecord, { headers: { "Authorization": this.token } })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.message);
            this.noRecord = true;
            return;
          }
          const arrData = resData.content || [];
          if (arrData.length === 0) {
            this.noRecord = true;
            return;
          }
          // 重组下数据
          arrData.forEach(val => {
            this.goldRecordData.push({
              id: val.id,
              status: this.getStatus(val.applyStatus),
              date: this.dateFormat(val.createDate, "YYYY-MM-DD hh:mm"),
              num: val.takeCashAmount,
              myGold: val.user.shareReward
            });
          });
        })
        .catch(res => {
          this.showTip("获取提现记录失败");
          this.noRecord = true;
        });
    },
    // 跳转到明细
    pageToDetail(item) {
      // 把数据组合一下，存到缓存，然后带过去
      const goldDetail = [
        { tag: "出账金额", con: item.num },
        { tag: "时间", con: item.date },
        { tag: "状态", con: item.status },
        { tag: "剩余零钱", con: item.myGold }
      ];
      window.localStorage.setItem("goldDetail", JSON.stringify(goldDetail));
      setTimeout(() => {
        this.$router.push("/mine/golddetail");
      }, 0);
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/goldrecord';
</style>
