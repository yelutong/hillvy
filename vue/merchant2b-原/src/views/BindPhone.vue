<template>
  <div class="login">
  <base-header :title="title"></base-header>
   <div class="login-content bg-white">
        <flexbox align="center" class="vux-1px-b display-flex">
          <span class="common-bg-icon user-phone"></span>
          <x-input type="text" name="userphone" placeholder="请输入手机号" autocomplete="off" v-on:input ="judgebtnView" v-model.trim="userphone" class="fs-30"></x-input>
        </flexbox>
        <flexbox class="display-flex" justify="space-between">
          <flexbox align="flex-start center" class="verbtn">
            <span class="common-bg-icon user-code"></span>
            <x-input type="text" name="verification" placeholder="短信验证码" autocomplete="off" v-on:input ="judgebtnView" v-model.trim="verification" class="fs-30">
              <x-button slot="right" type="primary" mini class='txt-blue' v-if="verCodeShow" @click.native="sndCode">获取验证码</x-button>
              <x-button v-else slot="right" type="primary" mini class='txt-gray'><countdown v-model="time" :start="start" @on-finish="finish"></countdown>s</x-button>
            </x-input>
          </flexbox>
      </flexbox>
       <toast v-model="showSuccess" type="success" :text="showMsg"></toast>
    </div>
    <div class="fs-24 mt30">* 绑定手机号后，请下次用手机号为帐号进行登录</div>
    <div class="login-button">
    <x-button type="warn" class="login-btn" @click.native="bindSubmitBtn" :disabled="disabled">确认</x-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bindphone',
  data () {
    return {
      title: '绑定手机号',
      disabled: true,
      userphone: '',
      verification: '',
      showMsg: '',
      time: 60,
      start: false,
      verCodeShow: true,
      showSuccess: false
    }
  },
  beforeCreate () {
    document.title = '绑定手机号'
    this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-bindPhonePage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
       console.log(resp)
    }, resp => {
       console.log(resp)
    })
  },
  methods: {
    judgebtnView () {
      if (this.userphone && this.verification) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    sndCode () {
      let phoneReg = /^1[3-578]\d{9}$/
      if (phoneReg.test(this.userphone)) {
        this.$post('SMS100001',{'scene':'UPDATE_LOGIN_NAME', "dealerFlag":'DEALER', 'memberType':'COMP', 'mobileOrEmail':this.userphone},resp => {
            this.verCodeShow = false
            this.start = true
            this.$vux.toast.text('短信验证码已发送', 'default')
        }, resp => {
            this.$vux.toast.text(resp.msg, 'default')
        })
      } else {
        this.$vux.toast.text('手机号格式不正确', 'default')
      }
    },
    finish (index) {
      this.start = false
      this.verCodeShow = true
      this.time = 60
    },
    onConfirm (msg) {
      if (msg) {
        location.hash = '/index/findPwd'
      } else {
        this.password = ''
      }
    },
    bindSubmitBtn () {
      let phoneReg = /^1[3-578]\d{9}$/
      let verReg = /^\d{6}$/
      if (phoneReg.test(this.userphone) && verReg.test(this.verification)) {
        this.$post('LGN100003',{'mobileNo':this.userphone, "verifyCode":this.verification},resp => {
            this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-bindPhoneSucc','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
               console.log(resp)
            }, resp => {
               console.log(resp)
            })
            this.tipsType = 'success'
            this.showSuccess = true
            this.showMsg = '绑定成功'
            this.$setTOKEN(resp.respData.secretKey)
            this.$setUserInfo(resp.respData)
            setTimeout(function () {
              location.hash = '/mine'
            },1500)
        }, resp => {
            this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-bindPhoneFail','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
               console.log(resp)
            }, resp => {
               console.log(resp)
            })
            this.$vux.toast.text(resp.msg, 'default')
        })
      } else {
        if (!phoneReg.test(this.userphone)) {
          this.$vux.toast.text('手机号格式不正确', 'default')
        } else {
          this.$vux.toast.text('验证码格式不正确', 'default')
        }
      }
      
    }
  }
}
</script>
<style scoped lang="scss">
@import '../assets/scss/login.scss';
</style>
