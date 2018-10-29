<template>
  <article class="bg-white">
    <header class="border-bottom"></header>
    <bank-card @click.native="$emit('changetype', 'bank-card')" :paytype="paytype" />
    <wallet-balance @click.native="$emit('changetype', 'wallet-balance')" :paytype="paytype" />
    <shun-shou-zhuan @click.native="$emit('changetype', 'shun-shou-zhuan')" :paytype="paytype"  />
    <sf-money @click.native="$emit('changetype', 'sf-money')" :paytype="paytype"  />
    <section class="toggle border-bottom"></section>
  </article>
</template>

<script>
import BankCard from './BankCard'
import WalletBalance from './WalletBalance'
import ShunShouZhuan from './ShunShouZhuan'
import SfMoney from './SfMoney'
export default {
  props: [
    'paytype'
  ],
  components: {BankCard, WalletBalance, ShunShouZhuan, SfMoney}
}
</script>

<style scoped lang="scss">
  article{
    margin-top: .21rem;
    header{
      height: .91rem;
      padding:0 .34rem;
      background: url("../../../assets/images/logo.png") no-repeat .34rem center;
      background-size: 1.9rem .44rem;
    }
    .toggle{
      height: .73rem;
      background: url("../../../assets/images/arrow_down.png") center no-repeat;
      background-size: .23rem .13rem;
    }
  }
</style>
