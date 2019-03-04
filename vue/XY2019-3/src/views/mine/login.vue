<template>
  <div class="wrapper white page-bind">
    <vHeader title="登录" to="/mine"/>
    <div class="item-bind">
      <i class="ico i-person"></i> <input class="ipt" type="number" v-model.trim="phone" placeholder="请输入手机号" maxlength="11" />
    </div>
    <div class="item-bind">
      <i class="ico i-lock"></i> <input class="ipt" :type="typeSet" v-model.trim="pwd" placeholder="请输入密码" maxlength="20" />
      <span class="pwd_eyes close" @click='changeStatus' v-if="statusShow"></span>
      <span class="pwd_eyes" @click='changeStatus' v-else></span>
    </div>
    <button class="btn-submit btn-bind" @click="login">登 录</button>
    <p class="links">
      <router-link to="/mine/register">注册账号</router-link> 
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
        phone: "",
        pwd: "",
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
    document.title = "登录";
  },
  created() {
  	document.body.classList.add('bg-white');
  },
  beforeDestroy(){
    document.body.classList.remove('bg-white');
  },
  methods: {
    ...mapActions(["atnToken"]),
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
    // 登录按钮
    login() {
      if (this.phone.length !== 11) {
        this.showTip("手机号码格式不正确");
        return;
      }
      this.$axios
        .post(this.api.login, JSON.stringify({ 'userName': this.phone, 'password': this.pwd }),{
        	headers: {"content-type": "application/json"}
        })
        .then(res => {
          const resData = res.data;
          if (resData.code === 1) {
          	console.log(resData.content);
          	this.atnToken(resData.content);
            localStorage.setItem("token",resData.content);
          	this.showTip('登录成功');
        
            if(this.$route.params.url){
              window.location.href=this.$route.params.url;
            }else{
              let _this = this;
              setTimeout(function(){ 
                _this.$router.push('/mine'); 
              }, 500);
            }
          }else{
          	this.showTip(resData.msg);
          }
          
        })
        .catch(res => {
          //this.showTip("获取验证码失败，请稍后重试");
        });
      }
    }
}
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/bind';
</style>
