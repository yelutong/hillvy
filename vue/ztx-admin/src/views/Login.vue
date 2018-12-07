<template>
  <div class="loginBg">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title"><img src="../common/images/icon.png" style="width:150px;"/></h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.userName" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleSubmit2('ruleForm2')"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { requestLogin } from '../api/api';
  const forge = require('node-forge');
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          userName: '',
          password: ''
        },
        rules2: {
          userName: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var password = '';
            var md = forge.md.md5.create();
            md.update(this.ruleForm2.password);
            password = md.digest().toHex();
            var loginParams = { userName: this.ruleForm2.userName, password: password };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              //NProgress.done();
              let { msg, code, body } = data;
              if (code !== '0000') {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user', JSON.stringify(body));
                this.$router.push({ path: '/A' });
              }
            },() => {
              //网络异常、接口没调通、没反应等
              this.logining = false;
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .loginBg{
    background-image:url('../common/images/loginBg.jpg');
    background-size:100% auto;
    width:100%;
    height:100%;
    min-height:300px;
    background-repeat:no-repeat;
    position:fixed;
    z-index:0;
    background-size: cover;
    background-position: center center;
  }
  .login-container {
    box-shadow: 0px 2px 38px 0px rgba(0,0,0,0.15);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    position: relative;
    left: 50%;
    margin-left: -195px;
    top: 50%;
    margin-top: -205px;
    width: 320px;
    height: 340px;
    padding: 35px 35px 35px 35px;
    background: rgba(0, 0, 0, 0.25);
    border: 0.8px solid rgba(0, 0, 0, 0.25);
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>