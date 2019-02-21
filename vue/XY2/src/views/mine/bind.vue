<template>
  <div class="wrapper white page-bind">
    <vHeader title="绑定"/>
    <div class="item-bind">
      <i class="ico i-phone"></i> <input class="ipt" type="number" v-model.trim="bindInfo.phone" placeholder="请输入手机号" maxlength="11" />
    </div>
    <div class="item-bind">
      <i class="ico i-lock"></i> <input class="ipt" type="number" v-model.trim="bindInfo.code" placeholder="请输入验证码" maxlength="11" />
      <button class="btn-submit btn-code" v-if="!bindInfo.hasSend" @click="getCode">获取验证码</button>
      <div class="cut-time" v-if="bindInfo.hasSend">剩余 {{ bindInfo.time }} s</div>
    </div>
    <button class="btn-submit btn-bind flex1" @click="bindPhone">绑 定</button>
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
      bindInfo: {
        phone: "",
        code: "",
        time: 60,
        hasSend: false
      },
      headimgurl:'',//微信头像地址
      nickname:'',//微信昵称
      proUserId:'',//推荐人id
      sex:'',//微信性别
    };
  },
  components: {
   vHeader
  },
  computed: {
    ...mapState(["token", "userId", "parentId"])
  },
  beforeCreate() {
    document.title = "手机登录";
  },
  created() {},
  methods: {
    ...mapActions(["atnOpenId","atnToken","atnProUserId"]),
    // 获取验证码
    getCode() {
      const bindInfo = this.bindInfo;
      if (bindInfo.hasSend) {
        return;
      }
      if (bindInfo.phone.length !== 11) {
        this.showTip("手机号码格式不正确");
        return;
      }
      this.$axios
        .get(this.api.getVerifyCode+bindInfo.phone)
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.message);
            return;
          }
          // 成功之后改变颜色，60秒后可再次发送
          this.bindInfo.hasSend = true;
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
          if (this.bindInfo.time <= 0) {
            clearTimeout(count);
            this.bindInfo.hasSend = false;
            this.bindInfo.time = 120;
          } else {
            this.bindInfo.time -= 1;
            fnCount();
          }
        }, 1000);
      };
      fnCount();
    },
    // 注册绑定手机号
    bindPhone() {
      const bindInfo = this.bindInfo;
      if (bindInfo.phone.length !== 11) {
        this.showTip("手机号码格式不正确");
        return;
      }
      if (bindInfo.code === "") {
        this.showTip("请输入验证码");
        return;
      }
      const loading = Toast({
        message: "绑定中...",
        iconClass: "loading",
        duration: 30000
      });
     
      let ajaxData = localStorage.getItem('bindInfo');
      ajaxData = JSON.parse(ajaxData);
      ajaxData.username = bindInfo.phone;
      ajaxData.smsCode = bindInfo.code;
      ajaxData.proUserId = localStorage.getItem('proUserId');
      
      this.$axios
        .post(this.api.wxBind, JSON.stringify(ajaxData),{
          headers: {"content-type": "application/json"}
        })
        .then(res => {
          loading.close();
          const resData = res.data;
          if (resData.code === 1) {
             // 绑定成功后
            this.setUserIdBack(resData.content)
          }else{
            this.showTip(resData.message);
            return;
          }
         
        })
        .catch(res => {
          loading.close();
          this.showTip("绑定失败，请稍后重试");
        });
    },
    // 存储userId和微信信息后返回
    setUserIdBack(objData) {
      this.atnToken(objData);
      localStorage.setItem('token', objData)
      const bindOk = Toast({
        message: "绑定成功！",
        iconClass: "ok",
        duration: 2000
      });
      
      this.$router.push("/mine");
    },
    // 查询是否存在userId
    ifUserBind(token) {
      this.$axios
        .get(this.api.getUserInfo, { headers: { "Authorization": token } })
        .then(res => {
          const resData = res.data;
          // 如果接口成功且有数据，则已经绑定了，就存储再跳
          if (resData.code === 1 && !!resData.content) {
            this.setUserIdBack(resData.content);
          }
        });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/bind';
</style>
