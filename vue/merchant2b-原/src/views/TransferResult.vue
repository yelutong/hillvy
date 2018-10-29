<template>
  <article class="transferResult bg-light" style="overflow: hidden">
    <base-header :title="title"  :rightOptions="historyGo"/>
    <div class="transferResult-information bg-white vux-1px-b">
      <p class="information-icon icon-transfer-personal"></p>
      <p class="information-state fs-30 txt-black">转账成功</p>
      <p class="information-number "><span style="font-size: .56rem">¥</span> {{remainingMoney}}</p>
    </div>
    <div class="transferResult-content bg-white">
      <div class="content horizontal-view fs-30 txt-black vux-1px-b">
        <p class="flex1">收款方</p>
        <p >{{oppositeName}}</p>
      </div>
      <div class="content horizontal-view txt-black fs-30">
        <p class="flex1">收款账户</p>
        <p>{{IDhide}}</p>
      </div>
    </div>
    <div class="transferDetails-button">
      <x-button type="warn" class= "extractBtn fs-32"  @click.native="finishBtn">完成</x-button>
    </div>
  </article>
</template>
<script>
  export default{
    name: 'transferDetails',
    data () {
      return {
        title: '转账',
        moneyNum: null,
        amount: 0,
        oppositeName: '',
        loginName: '',
        resultCode: '',
        historyGo: {
          showMore: true
        }
      }
    },
    //计算属性
    computed: {
      remainingMoney () {
        return this.amount.toFixed(2)
      },
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
      document.title = '转账'
    },
//    页面渲染以后
    mounted () {
        let transferSession = sessionStorage.transferSession;
        let transferObj = JSON.parse(transferSession);
        console.log(transferObj);
        this.amount = transferObj.amount / 100;
        this.oppositeName = transferObj.oppositeName;
        this.loginName = transferObj.oppositeLoginName;
        this.resultCode =transferObj.resultCode;
    },

//    方法
    methods: {
      finishBtn () {
        console.log('完成转账');
        this.$router.push('/mine/property')
      }
    }
  }
</script>
<style scoped lang="scss">
  .transferResult{
    /*转账信息*/
    .transferResult-information{
      padding: 1rem 0rem .8rem;
      text-align: center;
      /*border-bottom: solid 1px #eee;*/
      .information-icon{
        height: 1.6rem;
        background: url("../assets/images/transfer-success.png") no-repeat;
        background-size: contain;
        background-position: center;
      }
      .information-state{
        margin-top: .2rem;
      }
      .information-number{
        margin-top: .2rem;
        font-size: .68rem;
        color: #000;
      }

    }
    /*内容*/
    .transferResult-content{
      padding: 0rem .3rem;
      .content{
        height: 1.1rem;
        line-height: 1.1rem;
        &:first-of-type{
          /*border-bottom: solid 1px #eee;*/
        }
      }

    }
    /*按钮*/
    .transferDetails-button{
      padding: 0rem .3rem;
      .extractBtn{
        margin-top: .6rem;
        height: .9rem!important;
      }
    }
  }
</style>
