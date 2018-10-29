<template>
  <div class="login accountSe">
  <base-header :title="title" :leftOptions="getGoback" @on-click-back="realGoback"></base-header>
   <div class="login-content bg-white">
    <group>
      <cell title="安全账号" :value="phone" class="vux-1px-b fs-30"></cell>
      <cell title="修改登录密码" is-link class="vux-1px-b fs-30" link="/mine/setting/accountSecurity/changeLoginPwd" ></cell>
      <cell title="设置交易密码" v-if="isRealName=='N'" is-link class="fs-30" link="/mine/setting/accountSecurity/setTransPwd/1"></cell>
      <cell title="修改交易密码" v-if="isRealName=='Y'" is-link class="vux-1px-b fs-30" link="/mine/setting/accountSecurity/changeTransPwd"></cell>
      <cell title="找回交易密码" v-if="isRealName=='Y'" is-link class='fs-30' link="/mine/setting/accountSecurity/findTransPwd"></cell>
    </group>
   </div>
  </div>
</template>
<script>
export default {
  name: 'accountSecurity',
  data () {
    return {
      title: '账户安全',
      phone: '',
      isRealName: 'N',
      getGoback: {
        preventGoBack: true, backText: ''
      }
    }
  },
  beforeCreate () {
    document.title = '账户安全'
    this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-ACSecurityPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
    console.log(resp)
    }, resp => {
      console.log(resp)
    })
    if (!this.$getTOKEN() || !this.$getUserInfo()) {
      location.hash = '/login'
    }
  },
  created () {
    this.phone = this.$formatPhone(this.$getUserInfo().loginName)
    if (this.$getUserInfo().isRealName === 'Y' || this.$getUserInfo().hasTradePwd === 'Y') {
        this.isRealName = 'Y'
      } else {
        this.$nextTick(() => {
          this.$post('PWD100001',{}, resp => {
            this.isRealName = resp.respData.hasTradePwd === 'Y' ? 'Y' : 'N'
          }, resp => {
            this.isRealName = 'N'
          })
        })
      }
  },
  methods: {
    realGoback () {
      window.location.hash = '/mine/setting'
    }
  }
}
</script>
<style scoped lang="scss">
@import '../assets/scss/login.scss';
</style>
