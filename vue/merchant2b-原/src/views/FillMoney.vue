<template>
  <article class="fillMoney">
    <base-header :title="title"/>
    <div class="bg-white txt-black">
      <div class="withdrawDeposit-title fs-28 vux-1px-b display-flex" justify="space-between">
        <span><img :src='bank.bankIcon' class="bankIcon"></span>
        <span v-text="bank.bankName"></span>
        <span class="txt-red">(尾号<span v-text="bank.shortNo"></span>)</span>
      </div>
      <div class="withdrawDeposit-content">
        <div class="account-money">
          <p class="content-text fs-28">收到金额</p>
          <p class="content-number horizontal-view">
            <span>¥</span>
            <input type='number' v-model.number="value" class="number-input" max='10000000' @input='input'/>
            <!--<x-input type="number" v-on:input="judgebtnView" class="number-input" placeholder="0.00" @change='inputMaxL()' v-model.trim="value"></x-input>-->
          </p>
        </div>
      </div>
    </div>
    <div class="withdrawDeposit-button">
      <x-button type="warn" class="extractBtn fs-30" :disabled="disabled" @click.native="fillMoneyBtn">确认</x-button>
    </div>
    <toast v-model="showToast" :type="tipsType" :text="showMsg" @on-show="showToast"></toast>
  </article>
</template>
<script>
  import router from './../router/routers';
  export default{
    created () {
      console.log(this.$route.params);
      let bank = this.$route.params.bank;
      if (bank) {
        this.bank = bank;
      } else {
//        router.push('/bankList')
      }
    },
    data () {
      return {
        bank: {},
        title: '回填金额',
        titleText: '',
        value: '',
        disabled: true,
        hasBankCard: true,
        moneyNum: null,
        boardTitle: '请输入交易密码',
        showToast: false,
        tipsType: 'success',
        showMsg: '',
        confirmText: '重新输入',
        cancelText: '忘记密码',
        confirmMsg: 'Are you sure?',
        amount: 0,
        bankName: 'XX银行储蓄卡',
        showConfirm: false,
        bankAcctNo: '',
        bankAcctType: '储蓄卡',
        onfirmcTitle: '错误提示',
        background: '',
        inputTime: 0
      }
    },
    computed: {
      cardLastNum () {
        return this.bankAcctNo.substring(this.bankAcctNo.length - 4, this.bankAcctNo.length)
      }
    },

    beforeCreate () {
      document.title = '回填金额';
    },
    methods: {
      input(){
        if (this.value) {
          this.disabled = false;

//          this.value = parseFloat(this.value+"".replace("e",""));
          this.value = this.value.toFixed(2);

        } else {
          this.disabled = true
        }

//        let value = this.value +"";
//        let i = value.indexOf(".");
//        console.log(i,value.substring(0,i+3));
//        if(i>0){
//          this.value = parseInt(value.substring(0,i+2))
//        }
//        this.value = value;
//        console.log(this.value,typeof this.value)
      },
      judgebtnView () {
        if (this.value) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      },

      fillMoneyBtn () {
        console.log(this.value, this.value * 100, typeof this.value);
        console.log({amount: parseInt(this.value * 100) + ""});

//        return  {amount: this.value * 100 + ""};
        this.$post('BANK200002', {'amount': parseInt(this.value * 100) + ""}, resp => {
//        this.$post('BANK200002', {amount: parseInt(this.value * 100) + ""}, resp=>{
          console.log("BANK200002   resp ");
          console.log(resp);

          switch (resp.code) {
            case "00":
              this.tipsType = 'success';
              this.showToast = true;
              this.showMsg = resp.msg;
              router.push('/bankList');
              break;
            default:
            case "90304":
              this.$vux.toast.text(resp.msg, 'default');
              router.push('/bankList');
              break;
            case "90305":
              this.$vux.toast.text(resp.msg, 'default');
              break;

          }
        }, resp => {
          console.log(resp)
          switch (resp.code) {
            case "00":
              this.tipsType = 'success';
              this.showToast = true;
              this.showMsg = resp.msg;
              router.push('/bankList');
              break;
            default:
            case "90304":
              this.$vux.toast.text(resp.msg, 'default');
              router.push('/bankList');
              break;

            case "90305":
              this.$vux.toast.text(resp.msg, 'default');
              break;
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "FillMoney.scss";
</style>

