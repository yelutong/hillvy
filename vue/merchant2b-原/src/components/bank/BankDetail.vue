<template>
  <article>
    <base-header title="银行卡" class="justify-content-space-around"/>
    <div>
      <div class='bg-white'>
        <div class='bank-box-list'>
          <div :class='bank.bankClass'>
            <div class='bank-tips'>{{bank.memberTypeName}}</div>
            <div class='bank-icon'>
              <img :src='bank.bankIcon'/>
            </div>
            <div class='bank-info'>
              <h2>{{bank.bankName}}</h2>
              <h3>{{bank.cardNoShort}}</h3>
            </div>
            <div class='bank-mark'>储蓄卡</div>
          </div>
        </div>
        <div class='wrap'>
          <div class='title-bar'>银行卡信息</div>
          <div class='box-margin-top'></div>
          <div class='item-nav'>
            <div class='item-label'>证件类型</div>
            <div class='flex1'>{{bank.bankAccName}}</div>
          </div>
          <div class='item-nav'>
            <div class='item-label'>证件类型</div>
            <div class='flex1'>{{bank.bankName}}</div>
          </div>
          <div class='item-nav'>
            <div class='item-label'>证件类型</div>
            <div class='flex1'>{{bank.openBankName}}</div>
          </div>
          <div style='padding-top: .4rem'></div>
        </div>
      </div>
      <div @click='bankTK("/checkoutTransPwd/bank")'>
        <div class='box-padding '>
          <x-button type="warn" class="btn-white">更换银行卡</x-button>
        </div>
      </div>
    </div>

    <footer class='footer'>
      <div class='protect-icon'></div>
      <div>PICC人保财承保，为您的每一分钱保驾护航</div>
    </footer>


  </article>
</template>
<script>

  import router from './../../router/routers';
  import {Group, Cell} from 'vux'
  export default {
    created () {
      console.log(this.$route.params);
      let bank = this.$route.params.bank;
      if (bank) {
        this.bank = bank;
      } else {
        router.push('/bankList')
      }
    },
    data () {
      return {
        bank: {}
      }
    },
    components: {Group, Cell},
    computed: {},
    methods: {
      bankTK: function (page) {
        this.$store.commit('resetBankAddFrom',{});
        router.push(page);
      },
    }
  }
</script>
<style  lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";
  @import "Bank.scss";
  @import "BankList.scss";
</style>
