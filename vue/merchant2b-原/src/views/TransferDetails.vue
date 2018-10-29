<template>
  <article class="transferDetails bg-light">
    <base-header :title="title"  :rightOptions="historyGo"/>
    <div class="transferDetails-information vux-1px-b bg-white">
      <p v-if="showCompany" class="information-icon icon-transfer-company"></p>
      <p class="information-icon icon-transfer-personal" v-else></p>
      <p class="information-name fs-32">{{memberName}}</p>
      <p class="information-phone fs-28 txt-dark">{{IDhide}}</p>
    </div>
    <div class="transferDetails-content bg-white">
      <account-money :title="titleText" :placeholder="placeholder" :cleanShow="!disabled" :borderBottomShow="true" :borderTopShow="false" v-bind:value="moneyNum"  v-on:input="moneyNum = $event" @clean-text="cleanText"></account-money>
      <div class="content-money fs-24">钱包余额：{{remainingMoney}}</div>
      <group class="group">
        <x-input class="content-text fs-24" max="15"  v-model="promptText" placeholder="转账附言(15个字以内)"  ></x-input>
      </group>
    </div>
    <div class="transferDetails-button">
      <p class="txt-black fs-26" v-if="!disabled">实时到账</p>
      <x-button type="warn" class="extractBtn fs-32" :disabled="disabled"  @click.native="transferBtn">确认转账</x-button>
    </div>
    <toast v-model="showToast" :type="tipsType" :text="showMsg" @on-hide="toastHide"></toast>
    <common-secure-keyboard :title="boardTitle"  v-model="showPasswordKeyboard" @close="passwordClose" @inputfinished="inputfinished"></common-secure-keyboard>
    <confirm v-model="showConfirm"
             :confirm-text="confirmText"
             :cancel-text="cancelText"
             :title="onfirmcTitle"
             @on-cancel="onCancel"
             hide-on-blur="true"
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
    name: 'transferDetails',
//    引用组件
    components: {AccountMoney,CommonSecureKeyboard,Confirm},
//    属性数据
    data () {
      return {
        title: '转账',
        titleText: '转账金额',
        placeholder: '0.00',
        loginName: '',
        promptText: '',
        moneyNum: '',
        memberName: '',
        payeeMemberNo: '',
        amount: 0,
        showCompany: true,
        showMsg: '',
        tipsType: 'success',
        showToast: false,
        boardTitle: '请输入交易密码',
        showPasswordKeyboard: false,
        showConfirm: false,
        confirmText: '重新输入',
        cancelText: '忘记密码',
        confirmMsg: '',
        onfirmcTitle: '',
        memberType: '',
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
        return !this.moneyNum
      },
      remainingMoney () {
        return this.amount.toFixed(2)
      },
//      账号隐藏
      IDhide () {
        let emailIndex = this.loginName.indexOf('@');
        let id = '';
        if (emailIndex > -1){
          let removeStr = this.loginName.substring(3,emailIndex);
          let replaceStr = '*';
          for (let i = 0; i < removeStr.length - 1; ++i) {
            replaceStr +=  '*'
          }
          id = this.loginName.replace(removeStr,replaceStr)
        } else {
          id = this.loginName.substring(0,3) + '****' + this.loginName.substring(this.loginName.length - 4,this.loginName.length);
        }
        return id
      }
    },
//    模块挂载前
    beforeCreate () {
      document.title = '转账';
    },
//    页面渲染后
    mounted () {
      let transferOppositeSession = sessionStorage.transferOppositeSession;
      let transferOppositeObj  = JSON.parse(transferOppositeSession) || {};
      console.log('transferOppositeObj:');
      console.log(transferOppositeObj);
      this.loginName =  this.$route.params.loginName || transferOppositeObj.loginName;
      this.memberType = this.$route.params.memberType || transferOppositeObj.memberType;
      this.payeeMemberNo = this.$route.params.memberNo || transferOppositeObj.memberNo;
      this.memberName = this.$route.params.memberName || transferOppositeObj.memberName;
      if (!this.memberType) {
        let param = {
          loginName : this.loginName.toString(),
          memberType : 'COMP'
        };
//      获取收款人信息
        this.$post('MEM100001',param,data => {
          console.log(data);
          if (data.respData.memberType === 'PERSON') {
            this.showCompany = false
          }
        }, data => {
          this.$vux.toast.text(data.msg, 'default');
          let _this = this;
          setTimeout(function () {
            _this.$router.push('/')
          },2400)
        });
      } else {
        if (this.memberType === 'PERSON') {
          this.showCompany = false
        }
      }
//      获取余额
      this.$post('ACCT300001',{},data => {
        console.log('调取余额');
        console.log(data);
        this.$vux.loading.hide();
        this.amount = data.respData.availableBalance / 100;
      }, data => {
        console.log('调取余额2');
        console.log(data);
        this.$vux.toast.text(data.msg, 'default')
      })
    },
//    方法
    methods: {
      transferBtn() {
          if (this.moneyNum * 100 > this.remainingMoney * 100) {
            this.$vux.toast.text('转账金额超过钱包余额', 'default');
            return
          }
          if (this.promptText.length >= 15){
            this.$vux.toast.text('备注需小于15个字符', 'default');
            return
          }
        this.showPasswordKeyboard = true;
      },
      cleanText () {
        this.moneyNum = '';
      },
      toastHide () {
        if (this.showMsg === '转账成功') {
          this.$router.push('/mine/property/transferHome/transferInputNum/transferDetails/transferResult')
        } else {
//      获取余额
          this.$post('ACCT300001',{},data => {
            console.log('转账失败重新调取余额');
            console.log(data);
            this.$vux.loading.hide();
            this.amount = data.respData.availableBalance / 100;
          }, data => {
            console.log('转账失败重新调取余额2');
            console.log(data);
            this.$vux.toast.text(data.msg, 'default')
          })
        }
      },
      passwordClose () {
        this.showPasswordKeyboard = !this.showPasswordKeyboard
      },
      inputfinished (pwd) {
//          pwd为交易密码
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
            mode: 'IMMD_TRANSFER',
            payeeName: this.memberName,
            payeeMemberNo: this.payeeMemberNo,
            remark: this.promptText
          };
          console.log(params);
          this.$post('ACCT200002',params,data => {
                this.$post('STAT100001',{
                  type: 'merchant2b',
                  trigId:'ms-toB-transferSuccess',
                  trigUid : this.$getUserInfo().wxOpenId,
                  trigBase : this.$getUserInfo().memberNo,
                  channel : 'MS-WEIXIN'
                });
                  console.log(data);
                let transferObj = {
                  amount: data.respData.amount,
                  oppositeName: data.respData.oppositeName,
                  oppositeLoginName: data.respData.oppositeLoginName,
                  resultCode: data.respData.resultCode,
                };
                let transferSession =  JSON.stringify(transferObj);
                sessionStorage.transferSession = transferSession;
                this.$vux.loading.hide();
                this.tipsType = 'success';
                this.showToast = true;
                this.showMsg = '转账成功';
          }, data => {
            this.$post('STAT100001',{
              type: 'merchant2b',
              trigId:'ms-toB-transferFail',
              trigUid : this.$getUserInfo().wxOpenId,
              trigBase : this.$getUserInfo().memberNo,
              channel : 'MS-WEIXIN'
            });
            this.tipsType = 'warn';
            this.showToast = true;
            this.showMsg = data.msg;
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
  .transferDetails{
    /*收款人信息*/
    .transferDetails-information{
      height: 2.8rem;
      padding-top: .6rem;
      text-align: center;
      color: #000!important;
      /*border-bottom: solid 1px #eee;*/
      .information-icon{
        height: 1.3rem;
        margin-bottom: .1rem;
      }
      .information-name{
        margin-bottom: .1rem;
      }
      .icon-transfer-company{
        background: url("../assets/images/transfer-company.png") no-repeat;
        background-position: center;
        background-size: contain;
      }
      .icon-transfer-personal{
        background: url("../assets/images/transfer-personal.png") no-repeat;
        background-position: center;
        background-size: contain;
      }
    }
    /*内容*/
    .transferDetails-content{
      padding: 0rem .3rem;
      .content-money{
        height: .8rem;
        line-height: .8rem;
      }
     .group{
       &>:after{
         display:none;
       }
       .content-text{
         height: .8rem;
         padding: 0rem;
       }
     }
    }
    /*按钮*/
    .transferDetails-button{
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
