<template>
  <div class="login">
  <base-header :title="title" :leftOptions="getGoback" @on-click-back="realGoback"></base-header>
    <div class="login-content bg-white">

        <flexbox align="center" class="display-flex" v-if="step==1">
          <span class="common-bg-icon user-phoneor"></span>
          <x-input type="text" name="userphone" placeholder="手机号/邮箱" autocomplete="off" v-on:input ="judgebtnView" v-model.trim="userphone" class="fs-30"></x-input>
        </flexbox>

        <div v-if="step==2">
          <flexbox align="center" class="vux-1px-b display-flex">
          <span class="common-bg-icon user-phoneor"></span>
          <x-input type="text" name="useremail" autocomplete="off" :value="userphone" class="fs-30" disabled></x-input>
        </flexbox>
        <flexbox class="display-flex" justify="space-between">
          <flexbox align="flex-start center" class="verbtn">
            <span class="common-bg-icon user-code"></span>
            <x-input type="text" name="verification"  autocomplete="off" placeholder="邮箱验证码" v-on:input ="judgebtnViewEmail" v-model.trim="verificationEmail" class="fs-30">
              <x-button slot="right" type="primary" mini class='txt-blue' v-if="verCodeShow" @click.native="sndCodeEmail">获取邮箱验证码</x-button>
              <x-button v-else slot="right" type="primary" mini class='txt-gray'><countdown v-model="time" :start="start" @on-finish="finish"></countdown>s</x-button>
            </x-input>
          </flexbox>
        </flexbox>
        </div>

        <div v-if="step==3">
          <flexbox align="center" class="vux-1px-b display-flex">
          <span class="common-bg-icon user-phoneor"></span>
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
        <flexbox align="center" class="display-flex" v-if="step==4">
          <span class="common-bg-icon user-ver"></span>
          <x-input type="text" name="enterpriseCode" placeholder="统一社会信用代码/注册号" autocomplete="off" v-on:input ="judgeeNterpriseCode" v-model.trim="enterpriseCode" class="fs-30"></x-input>
        </flexbox>
        <flexbox class="display-flex" justify="space-between" v-if="step==5">
          <flexbox align="flex-start center">
            <span class="common-bg-icon user-pwd"></span>
            <x-input :type="phoneType" name="password" placeholder="密码6~20位，数字、字母或符号" autocomplete="off" v-on:input ="judgebtnPwd" v-model.trim="password" class="fs-30"></x-input>
          </flexbox>
        <span class="is-show-pwd common-bg-icon" @click="changeShow" :class="isShow"></span>
      </flexbox>

    </div>
    <div class="login-button">
    <x-button type="warn" class="login-btn" :disabled="disabled" @click.native="findPwdBtn(step)">确定</x-button>
    </div>
    <toast v-model="showSuccess" type="success" :text="showMsg"></toast>
  </div>
</template>
<script>
export default {
  name: 'findPwd',
  data () {
    return {
      isShow: 'show-ok',
      phoneType: 'text',
      disabled: true,
      showMsg: '',
      showSuccess: false,
      userphone: '',
      password: '',
      verification: '',
      verificationPhone: '',
      verificationEmail: '',
      enterpriseCode: '',
      title: '找回密码',
      step: 1,
      time: 60,
      stepThree: {},
      start: false,
      verCodeShow: true,
      getGoback: {
        preventGoBack: true, backText: ''
      }
    }
  },
  beforeCreate () {
    document.title = '找回密码'
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
    judgebtnPwd () {
      if (this.password) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    judgebtnView () {
      if (this.userphone) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    judgebtnViewPhone () {
      if (this.verificationPhone) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    judgebtnViewEmail () {
      if (this.verificationEmail) {
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
    isIncludeUsername (username, password) {
      if (password && username) {
        var idx = password.indexOf(username);
        if (idx >= 0) {
          return true
        }
      }
      return false
    },
    isIncludeBenWord (password) {
      var a = ['admin', 'pass']
      for (var i = 0; i < a.length; ++i) {
        if (this.isIncludeUsername(a[i], password)) {
          return true
        }
      }
      return false
    },
    findPwdBtn (step) {
      this.disabled = true
      let verReg = /^\d{6}$/
      switch (step) {
      case 1:
        const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        const phoneReg = /^1[3-578]\d{9}$/
        if (re.test(this.userphone)) {
          this.step = 2
        } else if (phoneReg.test(this.userphone)) {
          this.step = 3
        } else {
          this.$vux.toast.text('账号格式不正确', 'default')
        }
        break;
      case 2:
        if (verReg.test(this.verificationEmail)) {
            this.$post('PWD200001',{'loginName': this.userphone,'scene': 'FIND_PASSWORD', 'memberType':'COMP', 'verifyCode':this.verificationEmail},resp => {
              this.stepThree = resp.respData
              if (this.stepThree.isRealName === 'Y') {
                this.step = 4
                this.title = '验证营业执照信息'
                document.title = '验证营业执照信息'
              } else {
                this.step = 5
                this.title = '设置新密码'
                document.title = '设置新密码'
              }
            }, resp => {
              this.$vux.toast.text(resp.msg, 'default')
            })
          } else {
              this.$vux.toast.text('请输入6位邮箱验证码', 'default')
          }
        break;
      case 3:
          if (verReg.test(this.verificationPhone)) {
            this.$post('PWD200001',{'loginName': this.userphone, 'scene': 'FIND_PASSWORD',  'memberType': 'COMP', 'verifyCode': this.verificationPhone},resp => {
              this.stepThree = resp.respData
              if (this.stepThree.isRealName === 'Y') {
                this.step = 4
                this.title = '验证营业执照信息'
                document.title = '验证营业执照信息'
              } else {
                this.step = 5
                this.title = '设置新密码'
                document.title = '设置新密码'
              }
            }, resp => {
               this.$vux.toast.text(resp.msg, 'default')
            })
          } else {
            this.$vux.toast.text('请输入6位手机验证码', 'default')
          }
        break;
      case 4:
        const patrn = /^[0-9A-Z]+$/
        let  codeReg = /^\d{15}$/
        if ((this.enterpriseCode.length === 18 && patrn.test(this.enterpriseCode) === true) || codeReg.test(this.enterpriseCode)) {
           this.$post('PWD200002',{'certNo': this.enterpriseCode, 'token': this.stepThree.token, 'memberNo':this.stepThree.memberNo, 'txCode':this.stepThree.txCode},resp => {
              this.stepThree = resp.respData
              this.step = 5
              this.title = '设置新密码'
              document.title = '设置新密码'
            }, resp => {
              this.$vux.toast.text(resp.msg, 'default')
            })
        } else {
            this.$vux.toast.text('统一社会信用代码/注册号格式不正确', 'default')
        }
        break;
      case 5:
        let pwdReg = /^[\x21-\x7E]{6,20}$/
        if (pwdReg.test(this.password)) {
          if (this.checkSeqChar(this.password)) {
              this.$vux.toast.text('密码中不能包含有连续四位及以上顺序(或逆序)数字或字母', 'default')
            } else if (this.isRepeat4Times(this.password)) {
              this.$vux.toast.text('密码中不能包含有连续四位及以上重复字符', 'default')
            } else if (this.isIncludeUsername(this.userphone,this.password)) {
              this.$vux.toast.text('不能将帐号名作为密码的一部分存在于密码', 'default')
            } else if (this.isIncludeBenWord(this.password)) {
              this.$vux.toast.text('常用禁忌词不能作为密码的一部分存在于密码中', 'default')
            } else {
            this.$post('PWD200003',{'loginName': this.userphone, 'newPwd': this.password, 'token': this.stepThree.token, 'memberNo':this.stepThree.memberNo, 'memberType':'COMP', 'txCode':this.stepThree.txCode},resp => {
              this.showSuccess = true
              this.showMsg = '密码设置成功'
              setTimeout(function () {
                 location.hash = '/login'
              },1500)
            }, resp => {
              this.$vux.toast.text(resp.msg, 'default')
            })
          }
        } else {
            this.$vux.toast.text('登录密码必须由6~20位数字、字母或符号组成', 'default')
        }
        break;
      default:
        this.$vux.toast.text('网络错误', 'default')
      }
    },
    realGoback () {
      window.location.hash = '/login'
    },
    sndCodeEmail () {
      this.$post('SMS100001',{'scene': 'FIND_LOGIN_PWD', 'dealerFlag': 'DEALER',  'memberType': 'COMP', 'mobileOrEmail': this.userphone},resp => {
          this.verCodeShow = false
          this.start = true
          this.$vux.toast.text('邮箱验证码已发送', 'default')
          this.time = 300
        }, resp => {
          this.$vux.toast.text(resp.msg, 'default')
      })
    },
    sndCodePhone () {
      this.$post('SMS100001',{'scene': 'FIND_LOGIN_PWD', 'dealerFlag': 'DEALER',  'memberType': 'COMP', 'mobileOrEmail': this.userphone},resp => {
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
