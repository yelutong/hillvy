<template>
  <div class="index fs-28">
  <base-header :title="title" :left-options="{showBack: false}"></base-header>
    <div class="content-index">
    <div class="horizontal-view index-pic"><img src="../assets/images/banner.jpg"></div>
      <flexbox :gutter="0" class="bg-white fs-28 pd40">
      <flexbox-item @click.native="nav(1)">
        <div class="flex-demo txt-center">
        <p><img src="../assets/images/nav1.png"></p>
        <p class="fs-32 nav-title txt-black">企业理财</p>
        <p>说明说明说明</p>
        </div>
      </flexbox-item>
      <flexbox-item @click.native="nav(2)">
        <div class="flex-demo txt-center">
        <p><img src="../assets/images/nav2.png"></p>
        <p class="fs-32 nav-title txt-black">企业融资</p>
        <p>说明说明说明</p>
        </div>
      </flexbox-item>
      <flexbox-item @click.native="nav(3)">
        <div class="flex-demo txt-center">
        <p><img src="../assets/images/nav3.png"></p>
        <p class="fs-32 nav-title txt-black">收付款</p>
        <p>说明说明说明</p>
        </div>
      </flexbox-item>
    </flexbox>
    <div class="mb1">
    <flexbox orient="vertical" :gutter="0" class="bg-white mt15">
      <divider class="fs-32"><div class="show-pic txt-black bold">企业融资</div></divider>
      <flexbox-item><div class="flex-demo txt-center fs-32 lh-70">南方基金贷款</div></flexbox-item>
      <flexbox-item><div class="flex-demo txt-center fs-44 txt-red lh-70 bold">最高额度500万</div></flexbox-item>
      <flexbox-item><div class="flex-demo txt-center fs-32 txt-red  border-40">敬请期待</div></flexbox-item>
    </flexbox>
    <flexbox orient="vertical" :gutter="0" class="bg-white mt15">
      <divider class="fs-32"><div class="show-pic txt-black bold">企业理财</div></divider>
      <flexbox-item><div class="flex-demo txt-center fs-32 lh-70">顺手赚七日年化收益</div></flexbox-item>
      <flexbox-item><div class="flex-demo txt-center fs-44 txt-red lh-70 bold">4.1056%</div></flexbox-item>
      <flexbox-item><div class="flex-demo txt-center fs-32 txt-red border-40">敬请期待</div></flexbox-item>
    </flexbox>
    </div>
    </div>
  <base-footer  active="index"/>
  </div>
</template>
<script>
import BaseFooter from "../components/base/BaseFooter";
export default {
  name: 'index',
  components: { BaseFooter },
  data () {
    return {
      title: '顺丰企业金融'
    }
  },
  beforeCreate () {
    document.title = '顺丰企业金融'
      if (this.$getBindWxInfo() === 'N') {
        this.$post('LGN100001',{'memberType': 'COMP'},resp => {
          this.$setTOKEN('')
          this.$setUserInfo('')
          if (resp.respData.isBind === 'Y') {
            this.$setTOKEN(resp.respData.secretKey)
          }
          this.$setUserInfo(resp.respData)
        }, resp => {
          console.log(resp)
        })
      }
      this.$setBindWxInfo('Y')
  },
  created () {
      this.$nextTick(() => {
        this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-indexPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
        }, resp => {
          console.log(resp)
        })
    })
  },
  methods: {
    nav (obj) {
       if (obj === 1) {
         this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-financialPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
        }, resp => {
          console.log(resp)
        })
       } else if (obj === 2) {
         this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-financingPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
        }, resp => {
          console.log(resp)
        })
       } else if (obj === 3) {
         this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-paymentPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
        }, resp => {
          console.log(resp)
        })
       }
       if (!this.$getTOKEN() || !this.$getUserInfo()) {
          location.hash = '/login'
       } else {
          this.$vux.toast.text('敬请期待', 'default')
       }
    }
  }
}
</script>
<style lang="scss">
.index{
  .index-pic img{
  width: 100%;
  height: 3.56rem
  }
  .pd40{padding:.4rem 0}
  .flex-demo img{width:1.3rem;height:1.3rem}
  .nav-title{margin-top:.1rem}
  .fs-44{font-size:.44rem!important}
  .mt15{margin-top:.15rem}
  .mb1 {padding-bottom:.15rem}
  .mb1 .mt15{padding:.3rem .4rem;width: 100%;box-sizing: border-box;background: #FFF;}
  .bold{font-weight:bold}
  .lh-70{line-height:.7rem}
  .border-40{width:3.4rem;border-radius:.4rem;height:.8rem;margin:.3rem auto;border: 1px solid #e71d32;line-height:.8rem}
  .fs-32{position:relative}
  .show-pic{padding:0 .3rem}
  .show-pic:before {
  content: '';
  position:absolute;
  top:.1rem;
  margin-left:-.48rem;
  height:.4rem;
  width:.4rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(../assets/images/serve-title-left.png);
  }
  .show-pic:after {
  content: '';
  position:absolute;
  top:.1rem;
  margin-left:.1rem;
  height:.4rem;
  width:.4rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(../assets/images/serve-title-right.png);
  }
}
</style>

