<template>
  <div class="login loginBg">
    <base-header :title="title" :leftOptions="getGoback" @on-click-back="realGoback"></base-header>
    <div v-transfer-dom>
      <flexbox class="display-flex" justify="space-between">
        <set-transaction-keyboard :title="boardTitle" v-model="showPasswordKeyboard"
                                  @close="showPasswordKeyboard = false" @inputfinished="inputfinishedTwo"/>
      </flexbox>
    </div>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="密码输入错误"
               :content='content'
               :confirm-text="confirmText"
               :cancel-text="cancelText"
               @on-cancel="onCancel(obj)"
               @on-confirm="onConfirm(msg)">
        <p style="text-align:center;" v-text="content"></p>
      </confirm>
    </div>
  </div>
</template>
<script>
  import router from './../router/routers';
  import SetTransactionKeyboard from '../components/common/SetTransactionKeyboard'
  export default {
    name: 'changeLoginPwd',
    components: {SetTransactionKeyboard},
    data () {
      return {
        show: false,
        showSuccess: false,
        userphone: '',
        password: '',
        content: '',
        cancelText: '忘记密码',
        confirmText: '重新输入',
        tipsType: 'text',
        isShow: 'show-no',
        phoneType: 'password',
        showPasswordKeyboard: true,
        title: '验证交易密码',
        boardTitle: '请输入交易密码，完成身份验证',
        errTimes: 0,
        jump: false,
        getGoback: {
          preventGoBack: true, backText: ''
        }
      }
    },
    beforeCreate () {
      document.title = '设置交易密码'
    },
    created () {

    },
    methods: {
      onCancel () {
        if (this.cancelText === "忘记密码") {
          this.show = false;
        } else {
          this.history.back();
        }
      },
      onConfirm () {
        if (this.confirmText === "重新输入") {
          this.show = false;
        } else if (this.confirmText === "找回密码") {
          router.push('/index/findPwd')
        } else {
          router.push('/bankList')
//          this.history.back();
        }
      },
      inputfinishedTwo (pwd) {
        this.errTimes++;
        console.log("inputfinishedTwo",this.errTimes)
        console.log(this.errTimes)
        this.$post('PWD300003', {pwdType: 'trade', tradePwd: pwd}, data => {
          console.log(data);
          if (data.code !== "00") {
            switch (this.errTimes) {
              case 1:
                this.content = "登录密码错误，请重新输入";
                this.cancelText = "忘记密码";
                this.confirmText = "重新输入";
                break;
              case 2:
                this.content = "登录密码错误，您还可以输入3次";
                this.cancelText = "忘记密码";
                this.confirmText = "重新输入";
                break;
              case 3:
                this.content = "登录密码错误，您还可以输入2次";
                this.cancelText = "忘记密码";
                this.confirmText = "重新输入";
                break;
              case 4:
                this.content = "登录密码错误，您还可以输入1次";
                this.cancelText = "忘记密码";
                this.confirmText = "重新输入";
                break;
              case 5:
                this.content = "登录密码已被锁定，60分钟后自动解锁";
                this.cancelText = "取消";
                this.confirmText = "找回密码";
                break;

            }
            return;
          }
          if (data.respData.token) {
            switch (this.$route.params.type) {
              default:
                this.$store.commit('updateBankFrom', {name: 'passwordToken', value: data.respData.token});
                router.replace('/bankInfo/modify');
                break;
            }
          } else {
            this.$vux.toast.text('获取token失败', 'default');
          }
        }, data => {
//
//          if (this.errTimes >= 5) {
//            this.$vux.toast.text('交易密码输入错误次数过多，请重新登录', 'default');
//            router.push("/login")
//          }
          this.$vux.toast.text(data.msg, 'default');

        });

      },
      realGoback () {
        window.history.back();
//        window.location.hash = '/mine/setting/AccountSecurity'
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../assets/scss/login.scss';
</style>
