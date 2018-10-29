<template >
  <article class="helpCenter bg-light" style="overflow: hidden" >
    <base-header :title="title"  :rightOptions="historyGo"/>
    <div class="helpCenter-title">
      <p class="fs-34 txt-white title-name">Hello，{{memberName}}</p>
      <p class="fs-26  title-text">很高兴为您服务</p>
    </div>
    <div class="helpCenter-content bg-white">
      <div class="horizontal-view justify-content-space-between maginBottom_15">
        <div class=" content-box bg-1 bg_img_login">
          <p class="fs-34 txt-black maginBottom_10">注册登录</p>
          <p class="fs-26 txt-gray ">登录注册问题等</p>
        </div>
        <div class=" content-box bg-1 bg_img2">
          <p class="fs-34 txt-black maginBottom_10">实名认证</p>
          <p class="fs-26 txt-gray ">实名认证问题等</p>
        </div>
      </div>
      <div class="horizontal-view justify-content-space-between maginBottom_15">
        <div class=" content-box bg-2 bg_img_card">
          <p class="fs-34 txt-black maginBottom_10">银行卡</p>
          <p class="fs-26 txt-gray ">银行卡问题等</p>
        </div>
        <div class=" content-box bg-2 bg_img2">
          <p class="fs-34 txt-black maginBottom_10">企业账户</p>
          <p class="fs-26 txt-gray ">企业账户问题等</p>
        </div>
      </div>
      <div class="horizontal-view justify-content-space-between maginBottom_15">
        <div class=" content-box bg-1 bg_img1">
          <p class="fs-34 txt-black maginBottom_10">企业中心</p>
          <p class="fs-26 txt-gray ">企业中心问题等</p>
        </div>
      </div>
    </div>
    <div class="helpCenter-footer bg-white">
      <a href="tel:9533833"  class="footer-box">
        <p class="fs-26">电话咨询</p>
        <p class="fs-22">8：30～22:00</p>
      </a>
    </div>
  </article>
</template>
<script>
  export default{
    name: 'helpCenter',
//    属性数据
    data () {
      return {
        title: '帮助中心',
        memberName: '',
        historyGo: {
          showMore: true
        }
      }
    },
//    计算属性
    computed: {
    },
//    模块挂载前
    beforeCreate () {
      document.title = '帮助中心'
      this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-helpCenterPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
      console.log(resp)
      }, resp => {
        console.log(resp)
      })
    },
//    页面渲染后
    mounted () {
      this.memberName = this.$getUserInfo().memberName
    },
//    方法
    methods: {}
  }
</script>
<style scoped lang="scss">
  .helpCenter{
    /*输入框*/
    .input-num{
      height: 1.1rem;
      padding: 0rem .3rem;
    }
    /*按钮*/
    .transferInputNum-button{
      padding: 0rem .3rem;
      .extractBtn{
        margin-top: .6rem;
      }
    }
    /*顶部banner*/
    .helpCenter-title{
      height: 2.2rem;
      padding-left: .6rem;
      background: url("../assets/images/help-banner.jpg") no-repeat;
      background-size: cover;
      .title-name{
        padding-top: .6rem;
      }
      .title-text {
        color: #dad8d6;
        padding-top: .2rem;
      }
    }
    .maginBottom_15{
      margin-bottom: .15rem;
    }
    .maginBottom_10{
      margin-bottom: .1rem;
    }
    .helpCenter-content{
        padding: .26rem .3rem;
      .content-box{
        height: 0.9rem;
        width: 3.1rem;
        padding: .3rem 0rem .3rem .3rem;
      }
      .bg-1{
        background-color: #fffbfa!important;
      }
      .bg-2{
        background-color: #fefdf4!important;
      }
      .bg_img_login{
        background: url("../assets/images/help_regist_login.png") no-repeat;
        background-size: 1.6rem;
        background-position: 1.9rem center;
      }
      .bg_img_card{
        background: url("../assets/images/help_bind_card.png") no-repeat;
        background-size: 1.6rem;
        background-position: 1.9rem center;
      }
    }
  }
  .helpCenter-footer{
    height: 1rem!important;
    width: 100%;
    position: fixed;
    bottom: 0;
    .footer-box{
      height: .84rem;
      width: 2rem;
      padding-top: .16rem;
      padding-left: .7rem;
      display: block;
      margin: auto;
      text-align: left;
      background: url("../assets/images/help_call.png") no-repeat;
      background-position: left center;
      background-size: .5rem;
    }
    a:active{text-decoration:none!important;/* 指正在点的链接*/
      background-color: #fff!important;
      border-radius: 0;
    }
  }
</style>
