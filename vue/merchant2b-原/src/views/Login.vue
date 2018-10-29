<template>
  <div class="login loginBg">
  <base-header :title="title" :leftOptions="getGoback" @on-click-back="realGoback"></base-header>
    <div class="horizontal-view login-pic"><img src="../assets/images/login-pic.png"></div>
    <div class="login-content bg-white">
        <flexbox align="center" class="vux-1px-b display-flex">
          <span class="common-bg-icon user-phone"></span>
          <x-input type="text" name="userphone" placeholder="手机号/邮箱" autocomplete="off" v-on:input ="judgebtnView" v-model.trim="userphone" class="fs-30" @keyup.enter.native="LoginBtn"></x-input>
        </flexbox>
      <flexbox class="vux-1px-b display-flex" justify="space-between">
          <flexbox align="flex-start center">
            <span class="common-bg-icon user-pwd"></span>
            <x-input :type="phoneType" name="password" placeholder="密码" autocomplete="off" v-on:input ="judgebtnView" v-model.trim="password" class="fs-30" @keyup.enter.native="LoginBtn"></x-input>
          </flexbox>
        <span class="is-show-pwd common-bg-icon" @click="changeShow" :class="isShow"></span>
        <toast v-model="showSuccess" :type="tipsType" :text="showMsg"></toast>
      </flexbox>
    </div>
    <div class="login-button">
    <x-button type="warn" class="login-btn" :disabled="disabled" @click.native="LoginBtn">立即登录</x-button>
      <flexbox class="fs-26 login-bottom" justify="space-between">
        <router-link class='txt-blue' to='/index/register'>新用户注册</router-link>
        <router-link to='/index/findPwd' class='txt-blue'>找回密码</router-link>
      </flexbox>
    </div>
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
  name: 'login',
  data () {
    return {
      isShow: 'show-no',
      phoneType: 'password',
      disabled: true,
      showMsg: '',
      show: false,
      showSuccess: false,
      userphone: '',
      password: '',
      content: '',
      cancel:'找回密码',
      confirm:'重新输入',
      tipsType: 'text',
      title: '会员登录',
      msg: false,
      obj: false,
      getGoback: {
        preventGoBack: true, backText: ''
      }
    }
  },
  beforeCreate () {
    document.title = '会员登录'
    this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-loginPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
       console.log(resp)
    }, resp => {
       console.log(resp)
    })
    if (this.$getTOKEN() && this.$getUserInfo()) {
      location.hash = '/'
    }
  },
  methods: {
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
    changeShow () {
      if (this.isShow === 'show-no') {
        this.phoneType = 'text'
        this.isShow = 'show-ok'
      } else {
        this.phoneType = 'password'
        this.isShow = 'show-no'
      }
    },
    judgebtnView () {
      if (this.userphone && this.password) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    LoginBtn () {
      let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      let phoneReg = /^1[3-578]\d{9}$/
      if ((re.test(this.userphone) || phoneReg.test(this.userphone)) && this.password.length >= 6) {
        this.disabled = false
          if (!this.disabled) {
            this.$post('LGN100002',{'loginName': this.userphone, 'loginPwd': this.password, 'memberType': 'COMP'},resp => {
                this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-loginSucc','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
                   console.log(resp)
                }, resp => {
                   console.log(resp)
                })
                this.$setTOKEN('')
                this.$setUserInfo('')
                this.$setTOKEN(resp.respData.secretKey)
                this.$setUserInfo(resp.respData)
                let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
                if (re.test(this.userphone)) {
                   window.location.hash = '/login/bindPhone'
                } else {
                  location.hash = '/'
                }
              }, resp => {
                this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-loginFail','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
                   console.log(resp)
                }, resp => {
                   console.log(resp)
                })
                  if (resp.code === 'FINANCE_MEMBER_COMMON_2006' || resp.code === 'FINANCE_MEMBER_COMMON_2031') {
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
                  } else {
                    this.$vux.toast.text(resp.msg, 'default')
                  }
              })
        }
      } else {
        if (!(re.test(this.userphone) || phoneReg.test(this.userphone))) {
          this.$vux.toast.text('账号格式不正确', 'default')
        } else if (!(this.password.length >= 6)) {
          this.$vux.toast.text('密码必须由6~20位数字、字母或符号组成', 'default')
        }
      }
    },
    realGoback () {
      window.location.hash = '/'
    }
  }
}
</script>
<style scoped lang="scss">
@import '../assets/scss/login.scss';
</style>
