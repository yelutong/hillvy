<template>
  <div class="login" :class="{'loginBg':(step!=1 && step!=2)}">
  <base-header :title="title"></base-header>
    <div class="login-content bg-white">
        <div v-if="step==1">
          <flexbox align="center" class="vux-1px-b display-flex">
          <span class="common-bg-icon user-phone"></span>
          <x-input type="text" name="userphone" autocomplete="off" :value="userphone" class="fs-30" disabled>></x-input>
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
      <flexbox align="center" class="display-flex" v-if="step==2">
          <span class="common-bg-icon user-ver"></span>
          <x-input type="text" name="enterpriseCode" placeholder="统一社会信用代码/注册号" autocomplete="off" v-on:input ="judgeeNterpriseCode" v-model.trim="enterpriseCode" class="fs-30"></x-input>
      </flexbox>
    </div>
     <flexbox class="display-flex" justify="space-between" v-if="step==3">
        <set-transaction-keyboard :title="boardTitle" v-model="showPasswordKeyboard" @close="showPasswordKeyboard = false" @inputfinished="inputfinished" />
      </flexbox>
      <flexbox class="display-flex" justify="space-between" v-if="step==4">
      <set-transaction-keyboard :title="boardTitle" v-model="showPasswordKeyboard" @close="showPasswordKeyboard = false" @inputfinished="inputfinishedTwo" />
     </flexbox>
    <div class="login-button" v-if="step==1 || step==2">
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
      password: '',
      passwordNew: '',
      verification: '',
      verificationPhone: '',
      verificationEmail: '',
      enterpriseCode: '',
      stepThree: {},
      tipsType: 'text',
      title: '验证手机号',
      boardTitle: '请设置新交易密码',
      step: 1,
      errTimes: 0,
      time: 60,
      start: false,
      showAnimate: false,
      verCodeShow: true
    }
  },
  beforeCreate () {
    document.title = '验证手机号'
    this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-findTansPwdPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
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
    judgeeNterpriseCode () {
      if (this.enterpriseCode) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    inputfinished (pwd) {
      this.password = pwd
      this.findPwdBtn(3)
    },
    inputfinishedTwo (pwd) {
      this.passwordNew = pwd
      this.findPwdBtn(4)
    },
    findPwdBtn (step) {
      this.disabled = true
      if (step === 1) {
        let verReg = /^\d{6}$/
        if (verReg.test(this.verificationPhone)) {
          this.$post('PWD200001',{'loginName': this.userphone,'scene': 'FIND_PAY_PWD', 'memberType':'COMP', 'verifyCode':this.verificationPhone},resp => {
             this.stepThree = resp.respData
             if (this.stepThree.isRealName === 'Y') {
                this.step = 2
                this.title = '验证营业执照'
                document.title = '验证营业执照信息'
              } else {
                this.step = 3
                this.title = '设置新交易密码'
                this.boardTitle = '请设置新交易密码'
                document.title = '设置新交易密码'
              }
          }, resp => {
              this.$vux.toast.text(resp.msg, 'default')
          })
        } else {
          this.$vux.toast.text('请输入6位短信验证码', 'default')
        }
      } else if (step === 2) {
        let patrn = /^[0-9A-Z]+$/
        let  codeReg = /^\d{15}$/
        if ((this.enterpriseCode.length === 18 && patrn.test(this.enterpriseCode) === true) || codeReg.test(this.enterpriseCode)) {
          this.$post('PWD200002',{'certNo': this.enterpriseCode, 'token': this.stepThree.token, 'memberNo':this.stepThree.memberNo, 'txCode':this.stepThree.txCode, 'memberType':'COMP'},resp => {
              this.stepThree = resp.respData
              this.step = 3
              this.boardTitle = '请设置新交易密码'
              document.title = '设置新交易密码'
          }, resp => {
            this.$vux.toast.text(resp.msg, 'default')
          })
        } else {
          this.$vux.toast.text('统一社会信用代码/注册号格式不正确', 'default')
        }
      } else if (step === 3) {
          this.step = 4
          this.boardTitle = '再次输入交易密码'
          this.showAnimate = true
      } else if (step === 4) {
        if (this.password === this.passwordNew) {
           this.$post('PWD200004',{'loginName': this.userphone, 'newPwd': this.passwordNew, 'token': this.stepThree.token, 'memberNo':this.stepThree.memberNo, 'memberType':'COMP', 'txCode':this.stepThree.txCode},resp => {
              this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-findTansPwdSucc','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
              console.log(resp)
              }, resp => {
                console.log(resp)
              })
              this.step = 3
              this.showSuccess = true
              this.showMsg = '密码设置成功'
              setTimeout(function () {
                location.hash = '/mine/setting/AccountSecurity'
              },1500)
            }, resp => {
              this.$vux.toast.text(resp.msg, 'default')
              this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-findTansPwdFail','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
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
    sndCodePhone () {
      this.$post('SMS100001',{'scene': 'FIND_PAY_PWD', 'dealerFlag': 'DEALER',  'memberType': 'COMP', 'mobileOrEmail': this.userphone},resp => {
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
