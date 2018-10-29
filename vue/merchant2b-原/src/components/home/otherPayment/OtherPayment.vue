<template>
  <article class="bg-white">
    <section v-for="item in payments" :key="item.type" @click="$emit('changetype', item.type)" class="horizontal-view align-items-center border-bottom">
      <div class="logo">
        <div class="inner" :style="`background-position-y:${item.bgPos}`"></div>
      </div>
      <div class="info vertical-view flex1">
        <div class="fs-30 txt-black">{{item.name}}</div>
        <div class="fs-24 txt-gray">{{item.name}}安全支付</div>
      </div>
      <base-checkbox :checked="paytype === item.type"/>
    </section>
  </article>
</template>

<script>
import BaseCheckbox from '../../base/BaseCheckbox'
export default {
  data () {
    return {
      payments: [
        {
          name: '顺丰支付',
          type: 'sfpay',
          bgPos: '0'
        },
        {
          name: '微信支付',
          type: 'wechatpay',
          bgPos: '-.44rem'
        },
        {
          name: '支付宝',
          type: 'alipay',
          bgPos: '-.88rem'
        },
        {
          name: '龙支付',
          type: 'longpay',
          bgPos: '-1.32rem'
        }
      ]
    }
  },
  props: ['paytype'],
  name: 'other-pay',
  components: {BaseCheckbox}
}
</script>

<style scoped lang="scss">
  article{
    margin-top: .22rem;
    section{
      padding-right: .34rem;
      height: 1.22rem;
      .logo{
        padding:0 .34rem;
        .inner{
          width: .44rem;
          height: .44rem;
          background: url("../../../assets/images/44x44.png") no-repeat;
          background-size: 4.4rem;
        }
      }
    }
  }
</style>
