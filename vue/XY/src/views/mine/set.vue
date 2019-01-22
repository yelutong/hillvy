<template>
  <div class="wrapper page-wallet">
    <vHeader title="设置" to="/mine" />
    <div class="mt50">
       <v-cell class="about" title="修改信息" link="/mine/updateInfo" />
       <v-cell class="about" title="修改密码" link="/mine/updatePwd" />
       <v-cell class="about" title="修改用户名" link="/mine/updatePhone" />
      <div class="loginOutBtn">
        <button class="btn-submit mt50 full-screen" @click="loginOut">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import vCell from "@/components/v-cell";
import vHeader from "@/components/v-header";
export default {
  data() {
    return {
      walletInfo: [],
      noWallet: false
    };
  },
  components: {
    "v-cell": vCell,
    vHeader
  },
  computed: {
    ...mapState(["token"])
  },
  created() {
    this.verToken();
  },
  methods: {
    ...mapActions(["atnToken"]),
    verToken(){
     if(!this.token){
      this.showTip("登录超时，请重新登录");
      this.$router.push({path: "/mine/login"});
     }
    },
    loginOut(){
      this.$axios
          .get(this.api.loginOut, {
            headers: {"Authorization": this.token }
          })
          .then(res => {
            const resData = res.data;
            if (resData.code !== 1) {
              this.showTip("退出登录失败");
              return;
            }
            this.atnToken('');
            localStorage.removeItem("openId");
            localStorage.removeItem("token");
            console.log(0);
            let _this = this;
            setTimeout(() => {
              _this.$router.push({path: "/mine/login"});
            }, 1000);
          })
          .catch(res => {
            this.showTip("退出登录失败");
            this.atnToken('');
            let _this = this;
            setTimeout(() => {
              _this.$router.push({path: "/mine/login"});
            }, 1000);
          });
    }
  }
};
</script>

<style lang="stylus">

</style>
