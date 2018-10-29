<template>
  <section class="horizontal-view justify-content-space-between align-items-center border-bottom bg-white">
    <div class="countdown fs-28 txt-dark">
      请在
      <span>06</span>:<span>00</span>:<span>00</span>
      内完成支付
    </div>
    <div class="amount fs-34 txt-red">{{amount}}</div>
  </section>
</template>

<script>
export default {
  name: 'home-amount',
  props: {
    amount: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
  section{
    padding:0 .34rem;
    height: .91rem;
    .countdown{
      span{
        display: inline-block;
        color: #fff;
        background: #666;
        padding:0 .05rem;
        margin:0 .05rem;
      }
    }
  }
</style>
