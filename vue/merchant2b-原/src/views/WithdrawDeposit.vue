<template>
  <article class="withdrawDeposit">
    <base-header :title="title" :rightOptions="historyGo"/>
    <div class="bg-white txt-black">
      <div v-if="hasBankCard" class="withdrawDeposit-title vux-1px-b fs-30" v-bind:style="{ background: background}" @click="changBank">
          {{bankName}}储蓄卡 <span class="txt-red">(尾号{{cardLastNum}})</span>
      </div>
      <div  class="withdrawDeposit-title addCard txt-black fs-30 horizontal-view" @click="addCard" v-else>
        <p class="flex1">&nbsp;添加银行卡</p>
        <p class="icon-right"></p>
      </div>
      <div class="withdrawDeposit-content">
        <account-money class="accontMoney" :title="titleText" :placeholder="placeholder"  :cleanShow="!disabled" :borderBottomShow="true" :borderTopShow="false" v-bind:value="moneyNum"  v-on:input="moneyNum = $event" @clean-text="cleanText"></account-money>
        <p class="content-function horizontal-view">
          <span class="flex1 txt-gray fs-24">余额 {{remainingMoney}}元</span>
          <span class="flex1 txt-blue fs-24" @click="takeMoneyAll">全部提现</span>
        </p>
      </div>
    </div>
    <div class="withdrawDeposit-button">
      <p class="txt-black fs-24" v-if="!disabled">预计当天24点前到账</p>
      <x-button type="warn" class="extractBtn fs-32" :disabled="disabled"  @click.native="extractBtn">提现</x-button>
    </div>
    <toast width="8em" v-model="showToast" :type="tipsType" :text="showMsg" @on-hide="toastHide"></toast>
    <common-secure-keyboard :title="boardTitle"  v-model="showPasswordKeyboard" @close="passwordClose" @inputfinished="inputfinished"></common-secure-keyboard>
    <confirm v-model="showConfirm"
             :confirm-text="confirmText"
             :cancel-text="cancelText"
             :title="onfirmcTitle"
             hide-on-blur="true"
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
             @on-show="onShow"
             @on-hide="onHide">
      <p style="text-align:center;">{{confirmMsg}}</p>
    </confirm>
    <div class="mask" v-if="showPasswordKeyboard"></div>
  </article>
</template>
<script>
  import AccountMoney from '../components/base/AccountMoney';
  import CommonSecureKeyboard from '../components/common/CommonSecureKeyboard';
  import { Confirm } from 'vux'
  export default{
    name: 'withdrawDeposit',
//    加载组件
    components: {AccountMoney,CommonSecureKeyboard,Confirm},
//    属性数据
    data () {
      return {
        title: '提现',
        titleText: '提现金额',
        placeholder: '0.00',
        showPasswordKeyboard: false,
        hasBankCard: true,
        moneyNum: '',
        boardTitle: '请输入交易密码',
        showToast: false,
        tipsType: 'success',
        showMsg: '',
        confirmText: '重新输入',
        cancelText: '忘记密码',
        confirmMsg: 'Are you sure?',
        amount: 0,
        bankName: '',
        showConfirm: false,
        bankAcctNo: '',
        bankAcctType: '储蓄卡',
        onfirmcTitle: '',
        background : '',
        historyGo: {
          showMore: true
        }
      }
    },
  //    计算属性
    computed: {
      disabled () {
          if (this.moneyNum === '0' || this.moneyNum === '0.0' || this.moneyNum === '0.00'){
              return true
          }
        if (this.moneyNum.indexOf('.') > 0) {
          if (this.moneyNum.split(".")[1].length > 2) {
            return true
          }
        }
        return !(this.moneyNum && this.hasBankCard)
      },
      remainingMoney () {
        return this.amount.toFixed(2)
      },
      cardLastNum () {
        return this.bankAcctNo.substring(this.bankAcctNo.length - 4,this.bankAcctNo.length)
      }
    },
//    模块挂载前
    beforeCreate () {
      document.title = '提现金额';
    },
//    页面渲染后
    mounted () {
      console.log('发起调取银行卡列表数据');
//      获取银行卡
      this.$post('BANK100004',{},data => {
          console.log('调取银行卡列表数据1');
          console.log(data);
          if (data.respData.length) {
            this.$vux.loading.hide();
            this.bankName = data.respData[0].bankName;
            this.bankAcctNo = data.respData[0].bankAcctNo;
            this.bankAcctType = data.respData[0].bankAcctType;
            this.background = "url('" + data.respData[0].bankIcon + "') no-repeat";
            console.log(this.bankIcon)
          } else {
              this.hasBankCard = false
          }
      }, data => {
        console.log('调取银行卡列表数据2');
        console.log(data);
        this.$vux.toast.text(data.msg, 'default')
      });
//      获取余额
      this.$post('ACCT300001',{},data => {
        console.log('调取余额');
        console.log(data);
        this.$vux.loading.hide();
        this.amount = data.respData.availableBalance / 100;
      }, data => {
        console.log('调取银行卡列表数据2');
        console.log(data);
        this.$vux.toast.text(data.msg, 'default')
      })
    },
//    方法
    methods: {
      extractBtn () {
        if (this.moneyNum * 100 > this.remainingMoney * 100) {
          this.$vux.toast.text('提现金额超过钱包余额', 'default');
          return
        }
        this.showPasswordKeyboard = true;
      },
      takeMoneyAll () {
          if (this.remainingMoney) {
            this.moneyNum = this.remainingMoney
          }
      },
      cleanText () {
          this.moneyNum = '';
      },
      changBank () {
          console.log('changBank')
      },
      addCard () {
        this.$router.push('/bankInfo/add')
      },
      toastHide () {
          if (this.showMsg === '提现成功') {
            this.$router.push('/mine/property')
          }
      },
      passwordClose () {
        this.showPasswordKeyboard = !this.showPasswordKeyboard
      },
      inputfinished (pwd) {
//          pwd为交易密码
        console.log(pwd);
        let _this = this;
        let param = {
          tradePwd: pwd
        };
        this.$post('PWD300003',param,data => {
          this.$vux.loading.hide();
          console.log('token:' + data.respData.token);
          let applyamt = this.moneyNum * 100;
          let params = {
            applyAmt: applyamt.toString(),
            passwordToken: data.respData.token,
            bankCardNo: this.bankAcctNo
          };
          this.$post('ACCT200001',params,data => {
              console.log(data);
              if (data.code === '00') {
                this.$post('STAT100001',{
                  type: 'merchant2b',
                  trigId:'ms-toB-withdrawDepositSuccess',
                  trigUid : this.$getUserInfo().wxOpenId,
                  trigBase : this.$getUserInfo().memberNo,
                  channel : 'MS-WEIXIN'
                });
                this.$vux.loading.hide();
                this.tipsType = 'success';
                this.showToast = true;
                this.showMsg = '提现成功';
              } else {
                this.$vux.toast.text(data.msg, 'default')
                this.$post('STAT100001',{
                  type: 'merchant2b',
                  trigId:'ms-toB-withdrawDepositFail',
                  trigUid : this.$getUserInfo().wxOpenId,
                  trigBase : this.$getUserInfo().memberNo,
                  channel : 'MS-WEIXIN'
                });
              }
          }, data => {
            this.$vux.toast.text(data.msg, 'default')
          /*  this.tipsType = 'warn';
            this.showToast = true;
            this.showMsg = data.msg;*/
          })
        }, data => {
          this.showConfirm = !this.showConfirm;
          this.confirmMsg = data.msg;
          console.log(data);
          if (data.code === 'FINANCE_MEMBER_COMMON_2032') {
              _this.confirmText = '找回密码';
              _this.cancelText = '取消'
          }
        });
//        this.$vux.loading.show();
      },
      onCancel () {
        if (this.cancelText === '取消') {
          this.showConfirm = !this.showConfirm;
        } else {
         this.$router.push('/mine/setting/accountSecurity/findTransPwd')
        }
        console.log('on cancel')
      },
      onConfirm (msg) {
        if (this.confirmText === '找回密码') {
          this.$router.push('/index/findPwd')
        } else {
          this.showPasswordKeyboard = !this.showPasswordKeyboard;
        }
        console.log('on confirm');
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      }
    }
  }
</script>

<style scoped lang="scss">
  .withdrawDeposit{
  .bg-white{
    padding: 0rem .3rem ;
    /*顶部*/
    .withdrawDeposit-title{
        height: 1.1rem;
        line-height: 1.1rem;
        padding-left: .86rem;
        background-position: left center !important;
        background-size: .56rem!important;
        /*border-bottom: solid 1px #eee;*/
      /*箭头*/
      .icon-right{
        width: .15rem;
        background: url("../assets/images/forward.png") no-repeat;
        background-size: contain;
        background-position: right center;
      }
    }
    .addCard{
      padding-left: .56rem;
      background: url("../assets/images/icon-add.png") no-repeat;
      background-size: .46rem!important;
      background-position: left center;
    }
    /*内容*/
    .withdrawDeposit-content{
      height:2.9rem;
      /*提现功能*/
      .content-function {
        height: .9rem;
        /*余额*/
        span:first-of-type {
          height: .9rem;
          line-height: .9rem;
        }
        /*提现*/
        span:last-of-type {
          height: .9rem;
          line-height: .9rem;
          text-align: right;
        }
      }
    }
  }
  /*按钮*/
  .withdrawDeposit-button{
    padding: 0rem .3rem;
    p{
      margin-top: .24rem;
    }
    .extractBtn{
      margin-top: .6rem;
      height: .9rem!important;
    }
  }
    .mask{
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 10;
      background: rgba(0, 0, 0, 0.2);
      opacity: 1;
    }
}
</style>

