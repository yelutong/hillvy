<template>
  <div class="wrapper white page-bind">
    <vHeader title="修改用户名" to="/mine/set" />

    <div class="item-bind" v-if="firstStep">
      <i class="ico i-ver"></i> <input class="ipt" type="number" v-model.trim="oldSmsCode" placeholder="请输入验证码" maxlength="11" />
      <button class="btn-submit btn-code" v-if="!hasSend" @click="getOldCode">获取验证码</button>
      <div class="cut-time" v-if="hasSend">剩余 {{ time }} s</div>
    </div>

    <div class="item-bind" v-if="!firstStep">
      <i class="ico i-person"></i> <input class="ipt" type="number" v-model.trim="newUsername" placeholder="请输入新手机号" maxlength="11" />
    </div>
   
    <div class="item-bind" v-if="!firstStep">
      <i class="ico i-ver"></i> <input class="ipt" type="number" v-model.trim="newSmsCode" placeholder="请输入验证码" maxlength="11" />
      <button class="btn-submit btn-code" v-if="!hasSend" @click="getCode">获取验证码</button>
      <div class="cut-time" v-if="hasSend">剩余 {{ time }} s</div>
    </div>
    
    <button v-if="firstStep" class="btn-submit btn-bind" @click="next">下一步</button>
    <button v-if="!firstStep" class="btn-submit btn-bind" @click="updatePhone">确 认</button>
   
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Toast } from "mint-ui";
import vHeader from "@/components/v-header";
const qs = require("qs");
export default {
  data() {
    return {
      newUsername: "",
      oldSmsCode: "",
      newSmsCode: '',
      firstStep: true,
      time: 60,
      hasSend: false,
      typeSet: 'password',
      statusShow: true
    };
  },
  components: {
   vHeader
  },
  computed: {
    ...mapState(["token", "userId", "userPhone", "parentId"])
  },
  beforeCreate() {
    document.title = "注册";
  },
  created() {
    document.body.classList.add('bg-white');
  },
  destroyed(){
    document.body.classList.remove('bg-white');
  },
  methods: {
    ...mapActions(["atnUserId", "atnWeChatInfo"]),
    next(){
      if(this.oldSmsCode&&this.oldSmsCode.length==4){
        this.firstStep = false;
        this.hasSend = false;
        this.time = 60;
      }else{
        this.showTip("请输入验证码");
      }
    },
    // 获取验证码
    getCode() {
      if (this.newUsername == '' || this.newUsername.length !== 11) {
        this.showTip("手机号码格式不正确");
        return;
      }
      this.$axios
        .get(this.api.getFindPwdCode+this.newUsername)
        .then(res => {
          const resData = res.data;
          if (resData.code != 1) {
            this.showTip(resData.msg);
            return;
          }
          // 成功之后改变颜色，60秒后可再次发送
          this.hasSend = true;
          this.showTip("验证码已发送到您的手机，请注意查收");
          this.countDownTime();
        })
        .catch(res => {
          this.showTip("获取验证码失败，请稍后重试");
        });
    },
     // 获取验证码
    getOldCode() {
      this.$axios
        .get(this.api.getFindPwdCode+this.userPhone)
        .then(res => {
          const resData = res.data;
          if (resData.code != 1) {
            this.showTip(resData.msg);
            return;
          }
          // 成功之后改变颜色，60秒后可再次发送
          this.hasSend = true;
          this.showTip("验证码已发送到您的手机，请注意查收");
          this.countDownTime();
        })
        .catch(res => {
          this.showTip("获取验证码失败，请稍后重试");
        });
    },
    // 验证码倒计时
    countDownTime() {
      let fnCount = () => {
        let count = setTimeout(() => {
          if (this.time <= 0) {
            clearTimeout(count);
            this.hasSend = false;
            this.time = 60;
          } else {
            this.time -= 1;
            fnCount();
          }
        }, 1000);
      };
      fnCount();
    },
    // 注册绑定手机号
    updatePhone() {
      if (this.newUsername.length !== 11) {
        this.showTip("手机号码格式不正确");
        return;
      }
      if (this.newSmsCode === "") {
        this.showTip("请输入验证码");
        return;
      }
      const ajaxData = {
        newSmsCode: this.newSmsCode,
        newUsername: this.newUsername,
        oldSmsCode: this.oldSmsCode
      };
      this.$axios
        .post(this.api.phoneUpdate, JSON.stringify(ajaxData), {
          headers: {"content-type": "application/json"}
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            if(resData.code == 403){
              this.showTip("登录超时，请重新登录");
              this.$router.push({name:'login', params: { url: window.location.href}});
           }else{
              this.showTip(resData.msg);
            }
            return;
          }else{
            this.showTip('修改成功');
            let _this = this;
            setTimeout(function(){ 
              _this.$router.push('/mine'); 
            }, 1000);
          }
          console.log(resData);
        })
        .catch(res => {
          loading.close();
          this.showTip("修改失败，请稍后重试");
      });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/bind';
</style>
