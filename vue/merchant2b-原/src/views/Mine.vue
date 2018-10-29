<template>
  <div class="mine">
    <base-header :title="title" :left-options="{showBack: false}"></base-header>
    <div class="content-index">
      <div class="vertical-view mineTop">
        <p class="txt-center fs-20"><img src="../assets/images/company.png"></p>
        <p class="txt-center fs-30 txt-black" v-text="memberName"></p>
        <p class="txt-center fs-26 lh-42 txt-dark" v-text="memberType"></p>
      </div>
      <div class="mine-content bg-white">
        <group>
          <cell title="企业账户" :value="accountMoney" is-link class="vux-1px-b fs-30 txt-black txt-black3" @click.native="showTips(1)"></cell>
          <cell title="企业实名认证" :value="certifiyStatus" is-link class="vux-1px-b fs-30 txt-black txt-c3" :class="{'colorRed':certifiyStatus=='未认证' || goToFlag == 1}" @click.native="showTips(2)"></cell>
          <cell title="银行账户" is-link class='fs-30 txt-black' @click.native="showTips(3)"></cell>
          <div class="full-screen h20"></div>
          <cell title="帮助中心" is-link class='fs-30 vux-1px-b txt-black' link=""></cell>
          <cell title="设置" is-link class='fs-30 set-no-1px txt-black' link="/mine/setting"></cell>
        </group>
      </div>
    </div>
    <base-footer active="mine"/>
    <div v-transfer-dom>
    <x-dialog v-model="showHideOnBlur" mask-transition="vux-mask" class="dialog-demo" hide-on-blur>
      <div class="img-box">
        <img src="../assets/images/ver.png" style="max-width:100%">
        <div class="pro-pd50">
          <p class="fs-32 txt-center pro-lh70 txt-black">企业实名认证</p>
          <p class="fs-28 lh-48 txt-left">您还未通过企业实名认证，认证成功后即可开启更多金融服务！</p>
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
    name: 'setting',
    components: { BaseFooter },
    data () {
      return {
        title: '企业中心',
        accountMoney: '钱包余额0.00元',
        certifiyStatus: '未认证',
        cashAmount: '',
        memberName: '',
        goToLink: 1,
        goToFlag: 0,
        memberType: '',
        goToStatus: '',
        btnVaule: '立即认证',
        showHideOnBlur: false,
        getGoback: {
          preventGoBack: true, backText: ''
        }
      }
    },
    beforeCreate () {
      document.title = '企业中心'
      this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-centerPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
      console.log(resp)
      }, resp => {
        console.log(resp)
      })
      if (!this.$getTOKEN() || !this.$getUserInfo()) {
        location.hash = '/login'
      }
    },
    created () {
      this.$nextTick(() => {
        this.$post('ACCT300001',{}, resp => {
          this.cashAmount = resp.respData.cashAmount ? Number(resp.respData.cashAmount/100).toFixed(2) : '0.00'
          this.accountMoney = '钱包余额'+this.cashAmount+'元'
        }, resp => {
          this.accountMoney = '钱包余额0.00元'
        })
        console.log(this.$getUserInfo())
        if (this.$getUserInfo().isRealName === 'N') {
          this.$post('AUTH100001',{}, resp => {
            if (resp.respData.isRealName === 'Y') {
                this.goToLink = 3
                this.certifiyStatus = '已认证'
            } else {
              this.$post('AUTH100003',{}, resp => {
                let obj = Object.assign({}, resp.respData);
                delete  obj.auditResult;
                delete  obj.remark;
                this.$setAuthDate(resp.respData);
                if (obj.agentName) {
                  obj.agentHas = 'Y';
                } else {
                  obj.agentHas = 'N';
                }
              if (resp.respData.auditResult === 'AUDIT') {
                      this.certifiyStatus = '审核中'
                      this.goToStatus = '/authentication/certificate/identity/audit/0'
                      this.goToFlag = 1
                      this.$store.commit('updateAuthFormAll', obj);
                    } else if (resp.respData.auditResult === 'NO_PASS') {
                      this.certifiyStatus = '审核未通过'
                      this.goToFlag = 1
                      this.goToStatus = '/authentication/not'
                      this.$store.commit('updateAuthFormAll', obj);
                    } else {
                      this.certifiyStatus = '未认证'
                    }
                  }, resp => {
                    this.certifiyStatus = '未认证'
                  })
              this.$post('PWD100001',{}, resp => {
                 if (resp.respData.hasTradePwd === 'Y') {
                  this.goToLink = 2
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
          this.certifiyStatus = '已认证'
          this.goToLink = 3
        }
        this.memberName = this.$getUserInfo().memberName ? this.$getUserInfo().memberName : this.$formatPhone(this.$getUserInfo().loginName)
        if (this.$getUserInfo().epMemberType === 'COMP') {
          this.memberType = '企业商户'
        } else if (this.$getUserInfo().epMemberType === 'PERSON') {
          this.memberType = '个体工商户'
        }
      })
    },
    methods: {
      toVer (obj) {
        this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-gotoAuthent','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
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
      showTips (obj) {
        if (obj === 1) {
         this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-accountPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
        }, resp => {
          console.log(resp)
        })
       } else if (obj === 2) {
         this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-RNAuthentPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
        }, resp => {
          console.log(resp)
        })
       } else if (obj === 3) {
         this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-bankListPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
          console.log(resp)
        }, resp => {
          console.log(resp)
        })
       }
        if (this.goToLink === 1) {
          if (obj === 2) {
            location.hash = '/mine/setting/accountSecurity/SetTransPwd/2'
          } else {
            this.showHideOnBlur = true
          }
        } else if (this.goToLink === 2 && this.goToFlag === 0) {
          if (obj === 2) {
            location.hash = '/authentication/new'
          } else {
            this.showHideOnBlur = true
          }
        } else if (this.goToLink === 2 && this.goToFlag === 1) {
          if (obj === 2) {
            location.hash = this.goToStatus
          } else {
            this.btnVaule = "查看审核进度"
            this.showHideOnBlur = true
          }
        } else {
          if (obj === 1) {
            location.hash = '/mine/property'
          } else if (obj === 2) {
            location.hash = '/authentication/authShow'
          } else if (obj === 3)  {
            location.hash = '/bankList'
          }
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .mineTop{
    height:2.5rem;
  p img{
    height:0.9rem;width:0.9rem;margin:.35rem 0 .15rem 0
  }
  }
  .mine-content .h20{height:0.2rem;background:#f2f2f2!important}
  .weui-cell{
    padding: 0!important;
    height: 1.1rem;
    padding: 0 .3rem!important
  }
.pro-pd50{padding:0 .3rem .3rem .3rem}
.pro-lh70{line-height:.7rem}
.img-box .weui-btn_mini{font-size:.32rem!important;width: 3.4rem!important;border-radius: .4rem!important;height: .8rem!important;margin: .3rem auto!important;}
</style>
