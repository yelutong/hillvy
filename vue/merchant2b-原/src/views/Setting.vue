<template>
  <div class="login accountSe">
  <base-header :title="title" :leftOptions="getGoback" @on-click-back="realGoback"></base-header>
    <div class="login-content bg-white">
     <group>
     <cell title="账户安全" is-link class='fs-30 txt-black' link="/mine/setting/accountSecurity"></cell>
     </group>
    </div>
    <div class="loginout-button">
    <x-button type="warn" class="loginout-btn" :disabled="disabled" @click.native="loginOut">安全退出</x-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'setting',
  data () {
    return {
      title: '设置',
      disabled: false,
      getGoback: {
        preventGoBack: true, backText: ''
      }
    }
  },
  beforeCreate () {
    document.title = '设置'
    this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-setingPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
      console.log(resp)
    }, resp => {
      console.log(resp)
    })
    if (!this.$getTOKEN() || !this.$getUserInfo()) {
      location.hash = '/login'
    }
  },
  methods: {
    realGoback () {
      window.location.hash = '/mine'
    },
    loginOut () {
      this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-loginOut','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
      }, resp => {
        console.log(resp)
      })
      this.$post('LGN100004',{}, resp => {
        this.disabled = true
        this.$setTOKEN('')
        this.$setUserInfo('')
        this.$vux.toast.text('安全退出', 'default')
        setTimeout(function () {
          location.hash = '/'
        },1500)
      }, resp => {
        this.$vux.toast.text(resp.msg, 'default')
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import '../assets/scss/login.scss';
</style>
