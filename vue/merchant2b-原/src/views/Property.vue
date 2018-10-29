<template>
  <div class="login accountSe property">
  <base-header :title="title" ></base-header>
    <div class="vertical-view property-pic txt-white">
      <p class="txt-center fs-28 lh-48">钱包余额(元)</p>
      <p class="txt-center fs-44" v-text="cashAmount"></p>
    </div>
   <div class="bg-white">
    <group>
      <div class="cell-iocn">
      <cell title="提现" is-link class="vux-1px-b fs-28" link="/mine/property/withdrawDeposit"></cell>
      <div class="pro-icon"><img src="../assets/images/serve-deposit.png"></div>
      </div>
      <div class="cell-iocn">
      <cell title="转账" is-link class="vux-1px-b fs-28" link="/mine/property/transferHome"></cell><div class="pro-icon"><img src="../assets/images/serve-transfer.png"></div>
      </div>
      <div class="cell-iocn">
      <cell title="账单" is-link class='fs-28' link="/mine/property/billList"></cell>
      <div class="pro-icon"><img src="../assets/images/serve-account.png"></div>
      </div>
    </group>
   </div>
  </div>
</template>
<script>
export default {
  name: 'property',
  data () {
    return {
      title: '企业账户',
      cashAmount :'0.00',
      showHideOnBlur: false,
      goToLink: 1
    }
  },
  beforeCreate () {
    document.title = '企业账户'
    if (!this.$getTOKEN() && !this.$getUserInfo()) {
      location.hash = '/login'
    }
  },
  created () {
    this.$nextTick(() => {
      this.$post('ACCT300001',{}, resp => {
        this.cashAmount = resp.respData.cashAmount ? Number(resp.respData.cashAmount/100).toFixed(2) : '0.00'
      }, resp => {
        this.cashAmount = '0.00'
      })
    })
  }
}
</script>
<style scoped lang="scss">
@import '../assets/scss/login.scss';
.property{
  .property-pic{
    padding-top:.6rem;
    width: 100%;
    height: 2.5rem;
    background:url("../assets/images/zichan.png") no-repeat;
    background-size: cover;
  }
  .weui-cell{
    padding: 0 .3rem 0 .9rem!important;
    height: 1.1rem;
    position:relative
  }
  .pro-icon img{
    width: .4rem;
    height: .4rem;
    position:absolute;
    left:0
  }
  .pro-icon{
    position: absolute;
    top: 50%;
    left: .3rem;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: .4rem;
    height: .4rem;
  }
  .cell-iocn{position:relative}
}
</style>
