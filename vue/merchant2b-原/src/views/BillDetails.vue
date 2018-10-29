<template>
  <article class="billDetails bg-light" style="overflow: hidden">
    <base-header :title="title"  :rightOptions="historyGo"/>
    <div class="billDetails-information vux-1px-b bg-white">
      <p class="information-number ">{{(bissMessage.amount/100).toFixed(2)}}</p>
      <p class="information-result fs-28 txt-gray">{{bissMessage.businessType}}<span v-if="bissMessage.remark">-{{bissMessage.remark}}</span></p>
      <p class="information-state ">
        <span v-if="bissMessage.status === '成功'" class="fs-28 information-icon flex1">交易成功</span>
        <span v-if="bissMessage.status === '失败' || bissMessage.status === '关闭' " class="fs-28  flex1  error-icon" >{{bissMessage.status}}</span>
        <span v-if="bissMessage.status === '处理中' || bissMessage.status === '待支付'" class="fs-28  flex1  holdon-icon"  >{{bissMessage.status}}</span>
      </p>
    </div>
    <div class="billDetails-content vux-1px-b bg-white">
      <div class="content horizontal-view vux-1px-b fs-28 " v-if="bissMessage.opposite">
        <p class="flex1 txt-black">收款方</p>
        <p >{{bissMessage.opposite}}</p>
      </div>
      <div class="content horizontal-view vux-1px-b  fs-28">
        <p class="flex1 txt-black">交易类型</p>
        <p >{{bissMessage.businessType}}</p>
      </div>
      <div class="content horizontal-view vux-1px-b  fs-28">
        <p class="flex1 txt-black">交易时间</p>
        <p >{{bissMessage.createTime}}</p>
      </div>
      <div class="content horizontal-view vux-1px-b  fs-28">
        <p class="flex1 txt-black">交易单号</p>
        <p >{{bissMessage.payBusinessNo}}</p>
      </div>
    </div>

    <div class="transferDetails-button">
      <x-button type="warn" class= "extractBtn fs-32"  @click.native="finishBtn">完成</x-button>
    </div>
  </article>
</template>
<script>
  export default{
    name: 'billDetails',
    data () {
      return {
        title: '账单详情',
        stateSuccess: true,
        bissMessage:{},
        historyGo: {
          showMore: true
        }
      }
    },
    beforeCreate () {
      document.title = '账单详情'
    },
    mounted () {
//      this.bissMessage = this.$route.params.list;
      let bissMessageSession = sessionStorage.bissMessageSession;
      this.bissMessage = JSON.parse(bissMessageSession);
      console.log(this.$route.params.nowChangeTypeIndex)
    },
    methods: {
      finishBtn () {
        this.$router.push({
          path: '/mine/property/billList',
          name: 'billList',
          params: {
            nowChangeTypeIndex : this.$route.params.nowChangeTypeIndex
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .billDetails{
    /*转账信息*/
    .billDetails-information{
      padding: 1rem 0rem .6rem;
      text-align: center;
      /*border-bottom: solid 1px #eee;*/
      .information-icon{
        height: .42rem;
        width: 1.6rem;
        display: block;
        line-height: .42rem;
        margin: auto;
        background: url("../assets/images/transfer-success.png") no-repeat;
        background-size: contain;
        background-position: left ;
      }
      .error-icon {
        height: .42rem;
        width: 1.2rem;
        display: block;
        line-height: .42rem;
        margin: auto;
        text-align: right;
        background: url("../assets/images/transfer-close.png") no-repeat;
        background-size: contain;
        background-position: left ;
      }
      .holdon-icon {
        height: .42rem;
        width: 1.5rem;
        display: block;
        line-height: .42rem;
        margin: auto;
        text-align: right;
        background: url("../assets/images/transfer-holdon.png") no-repeat;
        background-size: contain;
        background-position: left ;
      }
      .information-result{
        margin-top: .1rem;
      }
      .information-state{
        margin-top: .2rem;
        text-align: right;
      }
      .information-number{
        font-size: .68rem;
        color: #000;
      }

    }
    /*内容*/
    .billDetails-content{
      padding: 0rem .3rem;
      .content{
        height: 1.1rem;
        line-height: 1.1rem;
        color: #000;
        /*border-bottom: solid 1px #eee;*/
        &:last-of-type{
          border-bottom: none;
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
