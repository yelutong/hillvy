<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { MessageBox } from "mint-ui";
export default {
  name: "app",
  data() {
    return {
      parentId: this.getUrlParam("parent_id")
    };
  },
  computed: {
    ...mapState(["openId"])
  },
  beforeCreate() {
    // vue渲染成功，通知window不用刷新
    window.vueLoaded = true;
    // 自适应rem设置
    this.setAutoSize();
  },
  created() {
    // 通过openId拿到token
    this.getToken();
    // 是否有推荐人id，有就存起来
    this.hasParentId();
  },
  methods: {
    // 状态管理动作
    ...mapActions([
      "atnOpenId",
      "atnToken",
      "atnParentId",
      "atnUserId",
      "atnShareId",
      "atnWeChatInfo"
    ]),
    // 通过openId拿到token
    getToken() {
      // 地址栏没拿到openId，再从store里面拿，都没拿到提示他重进
      const openId = this.getUrlParam("open_id") || this.openId || "";
      if (!openId) {
        MessageBox.alert(
          "没有获取到您的微信openid信息，建议您返回重新进入！",
          "错误提示"
        );
        return;
      }
      // 存储openid
      this.atnOpenId(openId);
      // 调用接口拿token
      this.$axios
        .get(this.api.getToken, { params: { open_id: openId } })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            this.showTip("获取身份信息失败，建议您重新进入！", 4000);
            return;
          }
          // 拿到token就存储
          const token = resData.data.accessToken;
          this.atnToken(token);
          // 然后再判断是否绑定手机
          this.ifUserBind(token);
        })
        .catch(res => {
          this.showTip("获取身份信息失败，建议您重新进入！", 4000);
        });
    },
    // 是否有绑定手机
    ifUserBind(token) {
      this.$axios
        .get(this.api.getUserInfo, { headers: { access_token: token } })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            this.showTip(resData.message);
            return;
          }
          // 有数据的话，就证明绑定了，就把userId和微信信息存起来
          const objData = resData.data;
          if (objData) {
            this.atnUserId(objData.encryptionId);
            this.atnShareId(objData.id);
            this.atnWeChatInfo({
              name: objData.nickName,
              avatar: objData.wechatHeadImageUrl
            });
          }
        })
        .catch(res => {
          this.showTip("读取您的绑定信息失败");
        });
    },
    // 是否有推荐人id
    hasParentId() {
      const parentId = this.parentId;
      if (parentId) {
        this.atnParentId(parentId);
      }
    }
  }
};
</script>

<style lang="stylus">
@import 'assets/css/media.styl';
@import 'assets/css/common.styl';
</style>
