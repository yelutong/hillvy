<template>
  <div class="login" :class="{'loginBg':step!=1}">
  <base-header :title="title" :leftOptions="getGoback" @on-click-back="realGoback"></base-header>
    <div class="login-content bg-white">
        <div v-if="step==1">
          <flexbox align="center" class="vux-1px-b display-flex">
          <span class="common-bg-icon user-phone"></span>
          <x-input type="text" name="userphone" autocomplete="off" :value="userphone" class="fs-30" disabled></x-input>
        </flexbox>
        <flexbox class="display-flex" justify="space-between">
          <flexbox align="flex-start center" class="verbtn">
            <span class="common-bg-icon user-code"></span>
            <x-input type="text" name="verificationPhone" placeholder="短信验证码" autocomplete="off" v-on:input ="judgebtnViewPhone" v-model.trim="verificationPhone" class="fs-30">
              <x-button slot="right" type="primary" mini class='txt-blue' v-if="verCodeShow" @click.native="sndCodePhone">获取验证码</x-button>
              <x-button v-else slot="right" type="primary" mini class='txt-gray'><countdown v-model="time" :start="start" @on-finish="finish"></countdown>s</x-button>
            </x-input>
          </flexbox>
        </flexbox>
        </div>
    </div>
   <flexbox class="display-flex" justify="space-between" v-if="step==2">
      <set-transaction-keyboard :title="boardTitle" v-model="showPasswordKeyboard" @close="showPasswordKeyboard = false" @inputfinished="inputfinished" />
    </flexbox>
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
    <div v-transfer-dom>
      <confirm v-model="show"
      title=""
      :confirm-text="confirm"
      :cancel-text="cancel"
      @on-cancel="onCancel(obj)"
      @on-confirm="onConfirm(msg)">
        <p style="text-align:center;" v-text="content"></p>
      </confirm>
    </div>
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
      password: '',
      passwordTwo: '',
      passwordNew: '',
      verificationPhone: '',
      enterpriseCode: '',
      stepThree: {},
      tipsType: 'text',
      title: '验证手机号',
      boardTitle: '请输入原交易密码',
      content: '',
      cancel:'忘记密码',
      confirm:'重新输入',
      show: false,
      step: 1,
      time: 60,
      msg: false,
      obj: false,
      errTimes: 0,
      start: false,
      verCodeShow: true,
      showAnimate: false,
      getGoback: {
        preventGoBack: true, backText: ''
      }
    }
  },
  beforeCreate () {
    document.title = '验证手机号'
    this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-changeTansPwdPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
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
    onCancel (obj) {
      if (!obj) {
        location.hash = '/mine/setting/accountSecurity/findTransPwd'
      }
    },
    onConfirm (msg) {
      if (msg) {
        location.hash = '/mine/setting/accountSecurity/findTransPwd'
      }
    },
    changeShow () {
      if (this.isShow === 'show-no') {
        this.phoneType = 'text'
        this.isShow = 'show-ok'
      } else {
        this.phoneType = 'password'
        this.isShow = 'show-no'
      }
    },
    judgebtnViewPhone () {
      if (this.verificationPhone) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    inputfinished (pwd) {
      this.password = pwd
      this.findPwdBtn(2)
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
      if (step === 1) {
        let verReg = /^\d{6}$/
        if (verReg.test(this.verificationPhone)) {
         this.$post('PWD200001',{'loginName': this.userphone, 'scene': 'MODIFY_PAY_PWD', 'memberType': 'COMP', 'verifyCode': this.verificationPhone}, resp => {
          this.stepThree = resp.respData
          this.step = 2
          this.title = '验证交易密码'
          document.title = '验证交易密码'
          }, resp => {
              this.$vux.toast.text(resp.msg, 'default')
          })
        } else {
          this.$vux.toast.text('请输入6位短信验证码', 'default')
        }
      } else if (step === 2) {
          this.$post('PWD300001',{'pwdType': 'TRADE', 'oldPwd': this.password, 'txCode':this.stepThree.txCode, 'token':this.stepThree.token},resp => {
              this.stepThree = resp.respData
              this.step = 3
              this.phoneType = 'text'
              this.isShow = 'show-ok'
              this.showAnimate = true
              this.boardTitle = '请设置新交易密码'
              document.title = '设置新交易密码'
              this.title = '设置新交易密码'
            }, resp => {
              this.show = true
              this.content = resp.msg
              if (resp.code === 'FINANCE_MEMBER_COMMON_2032') {
                this.obj = true
                this.msg = true
                this.cancel = '取消'
                this.confirm = '找回密码'
              } else {
                this.obj = false
                this.msg = false
                this.cancel = '忘记密码'
                this.confirm = '重新输入'
              }
          })
      } else if (step === 3) {
        if (this.checkSeqChar(this.passwordTwo)) {
          this.$vux.toast.text('密码中不能包含有连续四位及以上顺序(或逆序)数字', 'default')
        } else if (this.isRepeat4Times(this.passwordTwo)) {
          this.$vux.toast.text('密码中不能包含有连续四位及以上重复数字', 'default')
        } else {
          this.step = 4
          this.phoneType = 'text'
          this.isShow = 'show-ok'
          this.boardTitle = '再次输入交易密码'
        }
      } else if (step === 4) {
        if (this.passwordTwo === this.passwordNew) {
          this.$post('PWD300004',{'oldPwd': this.password, 'txCode':this.stepThree.txCode, 'token':this.stepThree.token, 'newPwd':this.passwordNew},resp => {
              this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-changeTansPwdSucc','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
              console.log(resp)
              }, resp => {
                console.log(resp)
              })
              this.showSuccess = true
              this.showMsg = '修改成功'
              setTimeout(function () {
                location.hash = '/mine/setting/AccountSecurity'
              },1500)
            }, resp => {
              this.$vux.toast.text(resp.msg, 'default')
              this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-changeTansPwdFail','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
              console.log(resp)
              }, resp => {
                console.log(resp)
              })
          })
        } else {
            this.errTimes++
          if (this.errTimes === 3) {
            this.$vux.toast.text('两次交易密码不一致,请重新设置新交易密码', 'default')
           this.boardTitle = '请设置新交易密码'
            document.title = '设置新交易密码'
            this.errTimes = 0
            this.step = 3
          } else {
            this.$vux.toast.text('两次交易密码不一致', 'default')
          }
        }
      }
    },
    realGoback () {
      window.location.hash = '/mine/setting/AccountSecurity'
    },
    sndCodeEmail () {
      this.verCodeShow = false
      this.start = true
      this.time = 300
      this.$vux.toast.text('邮箱验证码已发送', 'default')
    },
    sndCodePhone () {
      this.$post('SMS100001',{'scene': 'MODIFY_PAY_PWD', 'dealerFlag': 'DEALER',  'memberType': 'COMP', 'mobileOrEmail': this.userphone},resp => {
          this.verCodeShow = false
          this.start = true
          this.$vux.toast.text('短信验证码已发送', 'default')
        }, resp => {
          this.$vux.toast.text(resp.msg, 'default')
      })
    },
    finish (index) {
      this.start = false
      this.verCodeShow = true
      this.time = 60
    }
  }
}
</script>
<style scoped lang="scss">
@import '../assets/scss/login.scss';
</style>
