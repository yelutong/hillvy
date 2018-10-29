<template>
  <article class="horizontal-view align-items-center border-bottom">
    <div class="logo">
      <div class="inner"></div>
    </div>
    <div class="info vertical-view flex1">
      <div class="fs-30 txt-black">钱包余额</div>
      <div class="fs-24 txt-gray">可用额度 200.00 元</div>
    </div>
    <base-checkbox :checked="checked" />
  </article>
</template>

<script>
import BaseCheckbox from '../../base/BaseCheckbox'

export default {
  props: [
    'paytype'
  ],
  components: {BaseCheckbox},
  computed: {
    checked () {
      return this.paytype === 'wallet-balance'
    }
  }
}
</script>

<style scoped lang="scss">
article{
  padding-right: .34rem;
  height: 1.22rem;
  .logo{
    padding:0 .34rem;
    .inner{
      width: .42rem;
      height: .42rem;
      background: url("../../../assets/images/42x42.png") no-repeat;
      background-size: 4.2rem;
      background-position-x: -.84rem;
    }
    .inner.disabled{
      background-position-x: -1.26rem;
    }
  }
}
</style>
