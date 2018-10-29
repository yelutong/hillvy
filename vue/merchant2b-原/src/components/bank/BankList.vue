<template>
  <article>
    <base-header title="银行卡" class="justify-content-space-around"/>
    <div>
      <div class='bank-box-list'>
        <div @click='jump(bank)' v-bind:class='bank.bankClass' v-for='bank in bankList' :key="bank.id">
          <div class='bank-icon'>
            <img v-bind:src='bank.bankIcon'/>
          </div>
          <div class='bank-info'>
            <h2>{{bank.bankName}}</h2>
            <h3>{{bank.cardNoShort}}</h3>
          </div>
          <div class='bank-mark'>
            <div>储蓄卡</div>
            <div class='bank-bind'>{{bank.bundingFlagName}}</div>
          </div>
        </div>
      </div>
      <div @click='bankTK("/bankInfo/add")' class='item-bank' v-if='bankList.length===0'>
        <div class='horizontal-view justify-content-start align-items-center'>
          <div class='icon-add'></div>
          <div>添加银行卡</div>
        </div>
        <div class='forward-arrow'></div>
      </div>
      <div @click='bankTK("/checkoutTransPwd/bank")' v-if='showModBtn'>
        <div class='box-padding'>
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
  import  BankProperty  from '../../components/bank/BankProperty';
  let bandProperties = {
    BUNDING: '',
    APPLY_CHANGE: '更换审核中',
    APPLY_BACKFILL: '金额回填',
    APPLY_PAY: '打款验证中'
  };
  export default {
    created () {
      this.$post('BANK100001', {}, data => {
        console.log('BANK100001 data');
        console.log(data);
        this.bankList = data.respData.map((bank) => {
          bank.shortNo = bank.bankAcctNo.substr(bank.bankAcctNo.length - 4);
          bank.cardNoShort = "**** **** **** " + bank.shortNo;
          bank.memberTypeName = bank.memberType === 'COMP' ? '企业' : '个人'; //COMP 企业会员 PERSON 个人会员
          bank.bundingFlagName = bandProperties[bank.bundingFlag];
          BankProperty.some((item) => {
            if (item.bankCode === bank.bankCode) {
              bank.bankClass = "bank-box " + item.bankClass;
            }
          });
          return bank;
        });
        this.$store.commit('updateBankSelect', {type: 'add', bank: this.bankList[0]});
        this.bank = this.bankList[0];
        console.log(this.bankList);
      });
    },
    data () {
      return {
        bankList: [],
        bank: {}
      }
    },


    components: {},
    computed: {
      showModBtn: function () {
        return this.bankList.length > 0 && this.bank.bundingFlag !== "APPLY_CHANGE"
      }
    },
    methods: {
      bankTK: function (page) {
        this.$store.commit('resetBankAddFrom', {});
        router.push(page);
      },
      jump: function (bank) {
        switch (bank.bundingFlag) {
          case 'APPLY_BACKFILL':
            router.push({name: 'fillMoney', params: {bank: bank}});
            break;
          case 'APPLY_PAY':
          case 'APPLY_CHANGE':
            return;
          case 'BUNDING':
            router.push({name: 'bankDetail', params: {bank: bank}});
            break;
        }

//        router-link :to="{ name: 'bankDetail',params:{bank:bank}}"
      }
    }
  }
</script>
<style lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";
  @import "Bank.scss";
  @import "BankList.scss";
</style>
