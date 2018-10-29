<template>
  <div class="fs-30 service">
  <base-header :title="title" :left-options="{showBack: false}"></base-header>
  <div class="content-index">
    <flexbox :gutter="0" orient="vertical" class="bg-white fs-30 pd20">
      <divider class="serve-mt20 fs-32"><div class="show-pic txt-black bold">资产管理</div></divider>
      <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/3" @click.native="goLink(1)">
        <div class="flex-demo txt-center">
        <p><img src="../assets/images/serve-deposit.png"></p>
        <p class="fs-30 nav-title txt-black"> 提现 </p>
        </div>
      </flexbox-item>
      <flexbox-item :span="1/3" @click.native="goLink(2)">
        <div class="flex-demo txt-center">
        <p><img src="../assets/images/serve-transfer.png"></p>
        <p class="fs-30 nav-title txt-black"> 转账 </p>
        </div>
      </flexbox-item>
      <flexbox-item :span="1/3" @click.native="goLink(3)">
        <div class="flex-demo txt-center">
        <p><img src="../assets/images/serve-account.png"></p>
        <p class="fs-30 nav-title txt-black"> 账单 </p>
        </div>
      </flexbox-item>
      <flexbox-item :span="1/3" @click.native="goLink(4)">
        <div class="flex-demo txt-center">
        <p><img src="../assets/images/serve-cards.png"></p>
        <p class="fs-30 nav-title txt-black">银行卡</p>
        </div>
      </flexbox-item>
      </flexbox>
    </flexbox>
    <div class="mb1">
    <flexbox orient="vertical" :gutter="0" @click.native="nav(2)">
      <divider class="fs-32 mt20 bg-white"><div class="show-pic txt-black bold">企业融资</div></divider>
    </flexbox>
    <flexbox orient="vertical" :gutter="0" @click.native="nav(1)">
      <divider class="fs-32 mt20 bg-white"><div class="show-pic txt-black bold">企业理财</div></divider>
    </flexbox>
    <flexbox orient="vertical" :gutter="0" @click.native="nav(3)">
      <divider class="fs-32 bg-white mt20"><div class="show-pic txt-black bold">收付款</div></divider>
    </flexbox>
    </div>
  </div>
  <base-footer active="service"/>
  <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <img src="../assets/images/ver.png" style="max-width:100%">
          <div class="pro-pd50">
            <p class="fs-32 txt-center pro-lh70 txt-black">企业实名认证</p>
            <p class="fs-30 lh-48 txt-left">您还未通过企业实名认证，认证成功后即可开启更多金融服务！</p>
            <x-button type="warn" mini class="ver-btn" @click.native="toVer(goToLink)" v-text="btnVaule"></x-button>
          </div>
        </div>
        <div @click="showHideOnBlur=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import BaseFooter from "../components/base/BaseFooter";
export default {
  name: 'service',
  components: { BaseFooter },
  data () {
    return {
      title: '服务',
      showHideOnBlur: false,
      goToLink: 1,
      certifiyStatus: '',
      goToFlag: 0,
      btnVaule: '立即认证',
      goToStatus:''
    }
  },
  beforeCreate () {
    document.title = '服务'
    this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-servicePage','trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
      console.log(resp)
    }, resp => {
      console.log(resp)
    })
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$getUserInfo().isRealName === 'N') {
        this.$post('AUTH100001',{}, resp => {
          if (resp.respData.isRealName === 'Y') {
              this.goToLink = 3
          } else {
              this.$post('PWD100001',{}, resp => {
               if (resp.respData.hasTradePwd === 'Y') {
                this.goToLink = 2
                this.$post('AUTH100003',{}, resp => {
                    if (resp.respData.auditResult === 'AUDIT') {
                      this.certifiyStatus = '审核中'
                      this.goToStatus = '/authentication/certificate/identity/audit/0'
                      this.goToFlag = 1
                    } else if (resp.respData.auditResult === 'NO_PASS') {
                      this.certifiyStatus = '审核未通过'
                      this.goToFlag = 1
                      this.goToStatus = '/authentication/not'
                    }
                  }, resp => {
                    this.certifiyStatus = '未认证'
                  })
               } else {
                this.goToLink = 1
               }
            }, resp => {
              this.$vux.toast.text(resp.msg, 'default')
            })
          }
        }, resp => {
           this.$vux.toast.text(resp.msg, 'default')
        })
      } else {
         this.goToLink = 3
      }
    })
  },
  methods: {
    nav (obj) {
       if (obj === 2) {
         this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-financialPage','trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
        }, resp => {
          console.log(resp)
        })
       } else if (obj === 2) {
         this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-financingPage','trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
        }, resp => {
          console.log(resp)
        })
       } else if (obj === 3) {
         this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-paymentPage','trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
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
    },
    toVer (obj) {
      this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-gotoAuthent','trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
      }, resp => {
        console.log(resp)
      })
      if (this.goToFlag === 1) {
          location.hash = this.goToStatus
      } else {
        if (obj === 1) {
          location.hash = '/mine/setting/accountSecurity/SetTransPwd/2'
        } else {
          location.hash = '/authentication/new'
        }
      }
    },
    goLink (obj) {
      if (obj === 1) {
         this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-WDDepositPage','trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
        }, resp => {
          console.log(resp)
        })
       } else if (obj === 2) {
         this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-tansAccountPage','trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
        }, resp => {
          console.log(resp)
        })
       } else if (obj === 3) {
         this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-billPage','trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
        }, resp => {
          console.log(resp)
        })
       } else if (obj === 4) {
         this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-bankListPage','trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
        }, resp => {
          console.log(resp)
        })
       }
      if (!this.$getTOKEN() || !this.$getUserInfo()) {
        location.hash = '/login'
      } else {
        if (this.goToLink === 1 || (this.goToLink === 2 && this.goToFlag === 0)){
          this.showHideOnBlur = true
        } else if (this.goToLink === 2 && this.goToFlag === 1) {
          this.btnVaule = "查看审核进度"
          this.showHideOnBlur = true
        } else {
          if (obj === 1) {
            location.hash = '/mine/property/withdrawDeposit'
          } else if (obj === 2) {
            location.hash = '/mine/property/transferHome'
          } else if (obj === 3) {
            location.hash = '/mine/property/billList'
          } else {
            location.hash = '/bankList'
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
.service{
  .index-pic img{
    width: 100%;
    height: 3.56rem
  }
  .pd20{padding:0 0 .15rem 0}
  .flex-demo img{width:.5rem;height:.5rem}
  .nav-title{margin-top:.1rem}
  .fs-44{font-size:.44rem!important}
  .mt20{margin-top:.2rem}
  .serve-mt20{padding:.5rem .4rem!important;width: 100%;box-sizing: border-box}
  .mb1{margin-bottom:.15rem}
  .mb1 .mt20{padding:.5rem .4rem;width: 100%;box-sizing: border-box;background: #FFF;}
  .bold{font-weight:bold}
  .lh-70{line-height:.7rem}
  .border-40{width:3.4rem;border-radius:.4rem;height:.8rem;margin:.3rem auto;border: 1px solid #e71d32;line-height:.8rem}
  .vux-flexbox .vux-flexbox-item {padding:0.25rem 0}
  .fs-32{position:relative}
  .show-pic{padding:0 .3rem}
  .show-pic:before {
    content: '';
    position:absolute;
    top:.4rem;
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
    top:.4rem;
    margin-left:.1rem;
    height:.4rem;
    width:.4rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(../assets/images/serve-title-right.png);
  }
}
.pro-pd50{padding:0 .3rem .3rem .3rem}
.pro-lh70{line-height:.7rem}
.img-box .weui-btn_mini{font-size:.32rem!important;width: 3.4rem!important;border-radius: .4rem!important;height: .8rem!important;margin: .3rem auto!important;}
</style>
