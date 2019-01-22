<template>
  <div class="wrapper white page-about">
    <vHeader title="关于我们"/>
    <img class="img" src="https://pic.xjjxsd.cn/static/applet/about/about.jpg" />
    <p class="text">介绍</p>
    
    <p class="text">友情提示：如果对我们的销售模式和分润细则需要了解可以致电400-8110851或者微信（15597762099）联系我们的客服。</p>
  </div>
</template>

<script>
import vHeader from "@/components/v-header";
export default {
  data() {
    return {};
  },
  components: {
    vHeader
  },
  beforeCreate() {
    document.title = "简介";
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/article';
</style>
