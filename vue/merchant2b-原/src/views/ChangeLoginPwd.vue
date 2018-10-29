<template>
  <div class="login">
  <base-header :title="title" :leftOptions="getGoback" @on-click-back="realGoback"></base-header>
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
        <flexbox class="display-flex" justify="space-between" v-if="step==2">
          <flexbox align="flex-start center">
            <span class="common-bg-icon user-pwd"></span>
            <x-input :type="phoneType" name="password" placeholder="请输入原密码" autocomplete="off" v-on:input ="judgebtnPwd" v-model.trim="password" class="fs-30"></x-input>
          </flexbox>
        <span class="is-show-pwd common-bg-icon" @click="changeShow" :class="isShow"></span>
      </flexbox>
      <flexbox class="display-flex" justify="space-between" v-if="step==3">
          <flexbox align="flex-start center">
            <span class="common-bg-icon user-pwd"></span>
            <x-input :type="phoneType" name="passwordNew" placeholder="密码6~20位，数字、字母或符号" autocomplete="off" v-on:input ="judgebtnPwdNew" v-model.trim="passwordNew" class="fs-30"></x-input>
          </flexbox>
        <span class="is-show-pwd common-bg-icon" @click="changeShow" :class="isShow"></span>
      </flexbox>
    </div>
    <div class="login-button">
    <x-button type="warn" class="login-btn" :disabled="disabled" @click.native="findPwdBtn(step)">确定</x-button>
    </div>
    <toast v-model="showSuccess" :type="tipsType" :text="showMsg"></toast>
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
export default {
  name: 'changeLoginPwd',
  data () {
    return {
      isShow: 'show-no',
      phoneType: 'password',
      disabled: true,
      showMsg: '',
      showSuccess: false,
      userphone: '',
      password: '',
      passwordNew: '',
      verification: '',
      verificationPhone: '',
      verificationEmail: '',
      enterpriseCode: '',
      tipsType: 'text',
      stepThree: {},
      title: '验证手机号',
      step: 1,
      time: 60,
      start: false,
      verCodeShow: true,
      show: false,
      content: '',
      cancel:'找回密码',
      confirm:'重新输入',
      msg: false,
      obj: false,
      getGoback: {
        preventGoBack: true, backText: ''
      }
    }
  },
  beforeCreate () {
    document.title = '验证手机号'
    this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-changeLGPwdPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
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
    judgebtnPwd () {
      if (this.password) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    judgebtnPwdNew () {
      if (this.passwordNew) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    judgebtnView () {
      let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      let phoneReg = /^1[3-578]\d{9}$/
      if (re.test(this.userphone) || phoneReg.test(this.userphone)) {
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
    judgeeNterpriseCode () {
      let patrn = /^[0-9A-Z]+$/
      if (this.enterpriseCode.length === 18 && patrn.test(this.enterpriseCode) === true) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    showPosition (position) {
      this.position = position
      this.showPositionValue = true
    },
    onCancel (obj) {
      if (!obj) {
        location.hash = '/index/findPwd'
      }
    },
    onConfirm (msg) {
      if (msg) {
        location.hash = '/index/findPwd'
      } else {
        this.password = ''
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
      if (step === 1) {
        let verReg = /^\d{6}$/
        if (verReg.test(this.verificationPhone)) {
        this.$post('PWD200001',{'loginName': this.userphone, 'scene': 'MODIFY_LOGIN_PWD', 'memberType': 'COMP', 'verifyCode': this.verificationPhone},resp => {
              this.stepThree = resp.respData
              this.step = 2
              this.title = '验证原密码'
              document.title = '验证原密码'
            }, resp => {
              this.$vux.toast.text(resp.msg, 'default')
          })
        } else {
          this.$vux.toast.text('请输入6位短信验证码', 'default')
        }
      } else if (step === 2) {
          this.$post('PWD300001',{'pwdType': 'LOGIN', 'oldPwd': this.password, 'txCode':this.stepThree.txCode, 'token':this.stepThree.token},resp => {
              this.$vux.toast.text('验证成功', 'default')
              let that = this
              setTimeout(function () {
                that.stepThree = resp.respData
                that.step = 3
                that.phoneType = 'text'
                that.isShow = 'show-ok'
                that.title = '设置新密码'
                document.title = '设置新密码'
              }, 1500)
            }, resp => {
              this.show = true
              this.content = resp.msg
              if (resp.code === 'FINANCE_MEMBER_COMMON_2031') {
                this.obj = true
                this.msg = true
                this.cancel = '取消'
                this.confirm = '找回密码'
              } else {
                this.obj = false
                this.msg = false
                this.cancel = '找回密码'
                this.confirm = '重新输入'
              }
          })
      } else if (step === 3) {
        let pwdReg = /^[\x21-\x7E]{6,20}$/
        if (pwdReg.test(this.passwordNew)) {
          if (this.checkSeqChar(this.password)) {
              this.$vux.toast.text('密码中不能包含有连续四位及以上顺序(或逆序)数字或字母', 'default')
            } else if (this.isRepeat4Times(this.password)) {
              this.$vux.toast.text('密码中不能包含有连续四位及以上重复字符', 'default')
            } else if (this.isIncludeUsername(this.userphone,this.password)) {
              this.$vux.toast.text('不能将帐号名作为密码的一部分存在于密码', 'default')
            } else if (this.isIncludeBenWord(this.password)) {
              this.$vux.toast.text('常用禁忌词不能作为密码的一部分存在于密码中', 'default')
            } else {
              this.$post('PWD300002',{'token': this.stepThree.token, 'txCode':this.stepThree.txCode, 'newPwd':this.passwordNew},resp => {
                this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-changeLGPwdSucc','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
                console.log(resp)
                }, resp => {
                  console.log(resp)
                })
                this.showSuccess = true
                this.tipsType = 'success'
                this.showMsg = '密码设置成功'
                setTimeout(function () {
                   location.hash = '/mine/setting/AccountSecurity'
                },1500)
              }, resp => {
                this.$vux.toast.text(resp.msg, 'default')
                this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-changeLGPwdFail','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
                console.log(resp)
                }, resp => {
                  console.log(resp)
                })
              })
            }
        } else {
            this.$vux.toast.text('登录密码必须由6~20位数字、字母或符号', 'default')
        }
      }
    },
    realGoback () {
      window.location.hash = '/mine/setting/AccountSecurity'
    },
    sndCodePhone () {
      this.$post('SMS100001',{'scene': 'MODIFY_LOGIN_PWD', 'dealerFlag': 'DEALER',  'memberType': 'COMP', 'mobileOrEmail': this.userphone},resp => {
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
