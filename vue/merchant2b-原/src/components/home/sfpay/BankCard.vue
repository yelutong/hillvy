<template>
  <section class="bankcard horizontal-view border-bottom">
    <div class="logo vertical-view">
      <div class="inner horizontal-view align-items-center">
        <img src="../../../assets/images/example.png" />
      </div>
    </div>
    <div class="card vertical-view flex1">
      <div class="current-card horizontal-view border-bottom align-items-center">
        <div class="card-title vertical-view flex1">
          <h4 class="fs-30 txt-black">建设银行信用卡（1008）</h4>
          <span class="fs-24 txt-gray">单笔额度1万元，单日额度5万元</span>
        </div>
        <base-checkbox :checked="checked" />
      </div>
      <div @click="showList = true" class="other-cards horizontal-view align-items-center">
        <span class="title fs-24 txt-gray flex4">其他银行卡</span>
        <span class="forward"></span>
      </div>
    </div>
    <popup class="card-list" v-model="showList">
      <header class="horizontal-view">
        <div class="close" @click="showList = false"></div>
        <h4 class="fs-34 horizontal-view align-items-center justify-content-center flex1">选择银行卡</h4>
      </header>
      <section class="horizontal-view">
        <div class="logo vertical-view">
          <div class="inner horizontal-view align-items-center">
            <img src="../../../assets/images/example.png" />
          </div>
        </div>
        <div class="card vertical-view flex1">
          <div class="current-card horizontal-view border-bottom align-items-center">
            <div class="card-title vertical-view flex1">
              <h4 class="fs-30 txt-black">建设银行信用卡（1008）</h4>
              <span class="fs-24 txt-gray">单笔额度1万元，单日额度5万元</span>
            </div>
            <base-checkbox :checked="checked" />
          </div>
        </div>
      </section>
      <section class="horizontal-view">
        <div class="logo vertical-view">
          <div class="inner horizontal-view align-items-center">
            <div class="new-card"></div>
          </div>
        </div>
        <div class="card vertical-view flex1">
          <div class="current-card horizontal-view border-bottom align-items-center">
            <div class="card-title vertical-view flex1">
              <h4 class="fs-30 txt-black">使用新卡支付</h4>
              <span class="fs-24 txt-gray">无需网银，免手续费，安全绑卡</span>
            </div>
          </div>
        </div>
      </section>
    </popup>
  </section>
</template>

<script>
import BaseCheckbox from '../../base/BaseCheckbox'

const options2 = [{
  icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
  key: '001',
  value: 'radio001'
}, {
  icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
  key: '002',
  value: 'radio002'
}]

export default {
  data () {
    return {
      options: options2,
      showList: false
    }
  },
  props: [
    'paytype'
  ],
  components: {BaseCheckbox},
  computed: {
    checked () {
      return this.paytype === 'bank-card'
    }
  }
}
</script>

<style scoped lang="scss">
.bankcard{
  .logo{
    padding:0 .34rem;
    .inner{
      height: 1.24rem;
      img{
        width: .42rem;
        height: .42rem;
      }
      .new-card{
        width: .42rem;
        height: .42rem;
        background: url("../../../assets/images/42x42.png") no-repeat;
        background-size: 4.2rem;
        background-position-y: -.42rem;
      }
    }
  }
  .card{
    .current-card{
      padding-right:.34rem;
      height: 1.24rem;
    }
    .other-cards{
      padding-right:.34rem;
      height:.7rem;
      .forward{
        padding:0 .12rem;
        width: .13rem;
        height: .23rem;
        background: url("../../../assets/images/forward.png") no-repeat center;
        background-size: .13rem .23rem;
      }
    }
  }
  .card-list{
    padding-bottom: 1.24rem;
    header{
      .close{
        width:.66rem;
        height: .81rem;
        position: absolute;
        left:0;
        background: url("../../../assets/images/close.png") no-repeat center;
        background-size: .22rem;
      }
      h4{
        height: .81rem;
      }
    }
  }
}
</style>
