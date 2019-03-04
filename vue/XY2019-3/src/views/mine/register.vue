<template>
  <div class="wrapper white page-bind">
    <vHeader title="注册"/>
    <div class="item-bind">
      <i class="ico i-phone"></i> <input class="ipt" type="number" v-model.trim="promoterUserId" placeholder="推荐人手机号(选填)" maxlength="11" />
    </div>
    <div class="item-bind">
      <i class="ico i-person"></i> <input class="ipt" type="number" v-model.trim="phone" placeholder="请输入手机号" maxlength="11" />
    </div>
    <div class="item-bind">
      <i class="ico i-lock"></i> <input class="ipt" :type="typeSet" v-model.trim="pwd" placeholder="请输入密码" maxlength="20" />
      <span class="pwd_eyes close" @click='changeStatus' v-if="statusShow"></span>
      <span class="pwd_eyes" @click='changeStatus' v-else></span>
    </div>
    <div class="item-bind">
      <i class="ico i-ver"></i> <input class="ipt" type="number" v-model.trim="code" placeholder="请输入验证码" maxlength="11" />
      <button class="btn-submit btn-code" v-if="!hasSend" @click="getCode">获取验证码</button>
      <div class="cut-time" v-if="hasSend">剩余 {{ time }} s</div>
    </div>
    <button class="btn-submit btn-bind" @click="reg">注 册</button>
    <p class="links">
      <router-link to="/mine/login">登录</router-link> 
      <router-link to="/mine/findPwd">忘记密码？</router-link>
    </p>
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
      promoterUserId: '',
      phone: "",
      pwd: "",
      code: '',
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
    ...mapState(["token", "userId", "parentId"])
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
    //改变密码显示
    changeStatus(){
      if(this.statusShow){
        this.statusShow = false;
        this.typeSet = 'text';
      }else{
        this.statusShow = true;
        this.typeSet = 'password';
      }
    },
    // 获取验证码
    getCode() {
      if (this.phone.length !== 11) {
        this.showTip("手机号码格式不正确");
        return;
      }
      this.$axios
        .get(this.api.getRegCode+this.phone)
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
    reg() {
      if (this.phone.length !== 11) {
        this.showTip("手机号码格式不正确");
        return;
      }
      if (this.code === "") {
        this.showTip("请输入验证码");
        return;
      }
      const ajaxData = {
        userName: this.phone,
        password: this.pwd,
        smsCode: this.code
      };
      this.promoterUserId?ajaxData.promoterUserId=this.promoterUserId:'';
      this.$axios
        .post(this.api.register, JSON.stringify(ajaxData), {
          headers: {"content-type": "application/json"}
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.msg);
            return;
          }else{
            this.showTip('注册成功');
            let _this = this;
            setTimeout(function(){ 
              _this.$router.push('/mine/login'); 
            }, 1000);
          }
          console.log(resData);
        })
        .catch(res => {
          loading.close();
          this.showTip("注册失败，请稍后重试");
      });
    },
    // 存储userId和微信信息后返回
    setUserIdBack(objData) {
      this.atnUserId(objData.encryptionId);
      this.atnWeChatInfo({
        name: objData.nickName,
        avatar: objData.wechatHeadImageUrl
      });
      const bindOk = Toast({
        msg: "绑定成功！",
        iconClass: "ok",
        duration: 2000
      });
      setTimeout(() => {
        this.$router.go(-1);
      }, 2600);
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/bind';
</style>
