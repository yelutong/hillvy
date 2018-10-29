<template>
  <article class='bg-white'>
    <base-header title="结果页" class="justify-content-space-around"/>


    <div class='success-box'>
      <div class='icon-success'></div>
      <h3>银行卡信息提交成功 </h3>
      <h4>请等待打款进账后，再来填写收到的金额！</h4>
    </div>

    <div class='box-padding'>
      <x-button type="warn" class="login-btn" :disabled="disabled" @click.native="next()">完成</x-button>
    </div>


  </article>
</template>
<script>

  import router from './../../router/routers';

  export default {
    data () {
      return {
        disabled: false
      }
    },
    components: {},
    computed: {},
    methods: {
      next: function () {
        router.push("/bankList");
      }
    }
  }
</script>
<style  lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";
  @import "Bank.scss";
  @import "BankResult.scss";

</style>
