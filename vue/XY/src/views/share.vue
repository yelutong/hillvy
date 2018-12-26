<!-- 首页路由 -->
<template>
  <div id="shareRouter" class="wrapper page-share">
    <img class="qr-img" :src="qrImgUrl" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userId: this.getUrlParam('user_id') || '',
        qrImgUrl: ''
      };
    },
    beforeCreate() {
      document.title = "分享";
    },
    created() {
      // 读取用户的分享二维码
      this.getShareData();
    },
    methods: {
      // 读取用户的分享二维码
      getShareData() {
        this.$axios.get(this.api.getShareQr, {
          params: {
            user_id: this.userId
          }
        }).then(res => {
          const resData = res.data;
          if (resData.code === 1 && !!resData.content) {
            this.qrImgUrl = resData.content;
          } else {
            this.qrImgUrl = 'https://mg.xjjxsd.cn/wechat/qrcode/qrcode.jpg';
          }
        }).catch(res => {
          this.qrImgUrl = 'https://mg.xjjxsd.cn/wechat/qrcode/qrcode.jpg';
        });
      }
    }
  };

</script>
<style lang="stylus">
  @import '../assets/css/share';
</style>
