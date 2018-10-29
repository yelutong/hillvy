<template>
    <article>
      <base-header  title="顺丰收银台" class="border-bottom"/>
      <home-amount :amount="amount" />
      <sf-pay @changetype="changetype" :paytype="currentType" />
      <other-payment @changetype="changetype" :paytype="currentType" />
      <common-secure-keyboard v-model="showPasswordKeyboard" @close="showPasswordKeyboard = false" @inputfinished="inputfinished" />
      <common-verifycode-keyboard v-model="showVerifycodeKeyboard" @close="showVerifycodeKeyboard = false" @getverifycode="getverifycode" @sendcode="sendcode"/>
      <div class="fixed-bottom full-screen">
        <x-button  @click.native="showPasswordKeyboard = true">{{paytypeText}}支付 {{amount}} 元</x-button>
      </div>
    </article>
</template>

<script>
import BaseCheckbox from '../base/BaseCheckbox'
import HomeAmount from '../home/HomeAmount'
import SfPay from './sfpay/SfPay'
import OtherPayment from './otherPayment/OtherPayment'
import CommonSecureKeyboard from '../common/CommonSecureKeyboard'
import CommonVerifycodeKeyboard from '../common/CommonVerifycodeKeyboard'

const types = {
  'sfpay': '顺丰支付',
  'wechatpay': '微信支付',
  'alipay': '支付宝',
  'longpay': '龙支付',
  'bank-card': '银行卡',
  'wallet-balance': '钱包余额',
  'sf-money': '顺丰金',
  'shun-shou-zhuan': '顺手赚'
}

export default {
  data () {
    return {
      showPasswordKeyboard: false,
      showVerifycodeKeyboard: false,
      currentType: 'bank-card',
      amount: '100.00'
    }
  },
  components: {HomeAmount, SfPay, BaseCheckbox, CommonSecureKeyboard, OtherPayment, CommonVerifycodeKeyboard},
  name: 'home',
  computed: {
    paytypeText () {
      return types[this.currentType]
    }
  },
  methods: {
    inputfinished (pwd) {
      this.showVerifycodeKeyboard = true
    },
    getverifycode (code) {
      this.showVerifycodeKeyboard = false
      this.$vux.loading.show({
        text: '提交中'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.$vux.alert.show('提交成功！')
      }, 1500)
    },
    changetype (type) {
      this.currentType = type
    },
    sendcode () {
      this.$vux.toast.text('短信验证码已发送', 'middle')
    }
  }
}
</script>
