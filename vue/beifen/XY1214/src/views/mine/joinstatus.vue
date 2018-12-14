<template>
  <div class="wrapper white page-joinstatus">
    <img class="img" :src="statusData.img" />
    <div class="title">{{ statusData.title }}</div>
    <div class="tag" v-if="statusData.tag">{{ statusData.tag }}</div>
    <router-link class="btn-submit" v-if="statusData.type === 'applyrefuse'" to="/mine/join">重新申请</router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      status: this.getUrlParam("status") || "",
      objStatus: {
        justapply: {
          title: "提交申请成功！",
          type: "justapply",
          tag: "我们会尽快审核并联系您",
          img: "https://pic.xjjxsd.cn/static/applet/apply.png"
        },
        applying: {
          title: "审核中，请耐心等待！",
          type: "applying",
          img: "https://pic.xjjxsd.cn/static/applet/applying.png"
        },
        applyrefuse: {
          title: "抱歉，您的申请未通过！",
          type: "applyrefuse",
          img: "https://pic.xjjxsd.cn/static/applet/unapply.png"
        },
        applypass: {
          title: "恭喜，您的申请通过啦~",
          type: "applypass",
          img: "https://pic.xjjxsd.cn/static/applet/applyok.png"
        }
      },
      statusData: {}
    };
  },
  computed: {
    ...mapState(["token"])
  },
  created() {
    const status = this.status;
    this.statusData = this.objStatus[status] || {};
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/pay-act-btom';
@import '../../assets/css/joinstatus';
</style>
