<template>
  <div class="login loginBg">
  <base-header :title="title" :leftOptions="getGoback" @on-click-back="realGoback"></base-header>
    <flexbox class="display-flex" justify="space-between" v-if="step==3">
      <set-transaction-keyboard :title="boardTitle" v-model="showPasswordKeyboard" @close="showPasswordKeyboard = false" @inputfinished="inputfinishedTwo" />
    </flexbox>
    <flexbox class="display-flex" justify="space-between" v-if="step==4">
    <set-transaction-keyboard :title="boardTitle" v-model="showPasswordKeyboard" @close="showPasswordKeyboard = false" @inputfinished="inputfinishedThree" />
    </flexbox>
    <div class="login-button" v-if="step==1">
    <x-button type="warn" class="login-btn" :disabled="disabled" @click.native="findPwdBtn(step)">确定</x-button>
    </div>
    <toast v-model="showSuccess" type="success" :text="showMsg"></toast>
  </div>
</template>
<script>
import SetTransactionKeyboard from '../components/common/SetTransactionKeyboard'
export default {
  name: 'changeLoginPwd',
  components: { SetTransactionKeyboard },
  data () {
    return {
      isShow: 'show-no',
      phoneType: 'password',
      disabled: true,
      showMsg: '',
      showSuccess: false,
      showPasswordKeyboard: true,
      userphone: '',
      passwordTwo: '',
      passwordNew: '',
      verificationPhone: '',
      enterpriseCode: '',
      tipsType: 'text',
      title: '设置交易密码',
      boardTitle: '请设置交易密码',
      step: 3,
      errTimes: 0,
      showAnimate: false,
      verCodeShow: true,
      getGoback: {
        preventGoBack: true, backText: ''
      }
    }
  },
  beforeCreate () {
    document.title = '设置交易密码'
    this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-setTansPwdPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
    console.log(resp)
    }, resp => {
      console.log(resp)
    })
  },
  created () {
     var userinfo = this.$getUserInfo()
     this.userphone = userinfo ? userinfo.loginName : '暂无关联账号'
  },
  methods: {
    judgebtnViewPhone () {
      if (this.verificationPhone) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    inputfinishedTwo (pwd) {
      this.passwordTwo = pwd
      this.findPwdBtn(3)
    },
    inputfinishedThree (pwd) {
      this.passwordNew = pwd
      this.findPwdBtn(4)
    },
    checkSeqChar (password) {
      if (password) {
        var pwd = password.toUpperCase()
        var len = pwd.length
        for (var i = 0; i < len; ++i) {
          if (i + 3 < len) {
            var u1 = pwd.charCodeAt(i)
            var u2 = pwd.charCodeAt(i + 1)
            var u3 = pwd.charCodeAt(i + 2)
            var u4 = pwd.charCodeAt(i + 3)
            var m = u2 - u1
            if(m === 1 || m === -1){
              if ((u3 - u2 === m) && (u4 - u3 === m)) {
                return true
              }
            }
          }
        }
      }
      return false
    },
    isRepeat4Times (password){
      if (password) {
        var pwd = password.toUpperCase()
        var len = pwd.length
        for (var i = 0; i < len; ++i) {
          if (i + 3 < len) {
            var u1 = pwd.charAt(i)
            var u2 = pwd.charAt(i + 1)
            var u3 = pwd.charAt(i + 2)
            var u4 = pwd.charAt(i + 3)
            if (u1 === u2 && u2 === u3 && u3 === u4){
              return true
            }
          }
        }
      }
      return false
    },
    findPwdBtn (step) {
      this.disabled = true
      if (step === 3) {
        if (this.checkSeqChar(this.passwordTwo)) {
          this.$vux.toast.text('密码中不能包含有连续四位及以上顺序(或逆序)数字', 'default')
        } else if (this.isRepeat4Times(this.passwordTwo)) {
          this.$vux.toast.text('密码中不能包含有连续四位及以上重复数字', 'default')
        } else {
          this.step = 4
          this.boardTitle = '再次输入交易密码'
          this.showAnimate = true
        }
      } else if (step === 4) {
        if (this.passwordTwo === this.passwordNew) {
          this.$post('PWD100002',{'tradePwd': this.passwordNew},resp => {
            this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-setTansPwdSucc','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
            console.log(resp)
            }, resp => {
              console.log(resp)
            })
            this.step = 3
            this.showSuccess = true
            this.showMsg = '设置成功'
            this.$getUserInfo().hasTradePwd = 'Y'
            let that = this
            setTimeout(function () {
              if (that.$route.params.numType === '2') {
                location.hash = '/authentication/new'
              } else if (that.$route.params.numType === '3') {
                location.hash = '/bankList'
              } else {
                location.hash = '/mine/setting/AccountSecurity'
              }
            },1500)
          }, resp => {
             this.$vux.toast.text(resp.msg, 'default')
             this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-setTansPwdFail','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
              console.log(resp)
              }, resp => {
                console.log(resp)
              })
          })
        } else {
            this.errTimes++
          if (this.errTimes === 3) {
            this.$vux.toast.text('两次交易密码不一致,请重新设置新交易密码', 'default')
            this.boardTitle = '请设置交易密码'
            this.errTimes = 0
            this.showAnimate = false
            this.step = 3
          } else {
            this.$vux.toast.text('两次交易密码不一致', 'default')
            this.boardTitle = '再次输入交易密码'
          }
        }
      }
    },
    realGoback () {
      window.location.hash = '/mine/setting/AccountSecurity'
    }
  }
}
</script>
<style scoped lang="scss">
@import '../assets/scss/login.scss';
</style>
