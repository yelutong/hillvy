<template>
  <div>
    <div class="flexBox">
      <div class="billDetails-bar bg-white horizontal-view ">
        <tab id="tab" line-width="0"   scroll-threshold = '3'  class="flex1" style="z-index: 1200;">
          <tab-item  @on-item-click="handler(0,'')">全部</tab-item>
          <tab-item  @on-item-click="handler(1,'RECHARGE')">充值</tab-item>
          <tab-item  @on-item-click="handler(2,'WITHDRAW')">提现</tab-item>
          <tab-item  @on-item-click="handler(3,'TRANSFER')">转账</tab-item>
          <tab-item  @on-item-click="handler(4,'PAY')">消费</tab-item>
          <tab-item  @on-item-click="handler(5,'REFUND')">退款</tab-item>
          <tab-item  @on-item-click="handler(6,'REPAYMENT')">还款</tab-item>
          <tab-item  @on-item-click="handler(7,'SHIFTTO,ROLLOUT,FUND')">理财</tab-item>
        </tab>
        <div class="bar-tabs" v-bind:class="{ active: alertFlag }"  @click="arrowClick"></div>
      </div>
      <!--蒙层+类型选择器-->
      <div class="mask" v-if="alertFlag" @click="cancel"></div>
      <div class="type-choice bg-white fs-28"  v-bind:class="{ select: alertFlag }">
        <div class="choice-line horizontal-view justify-content-space-around">
          <div class="option " @click="changeType(0)">全部</div>
          <div class="option " @click="changeType(1)">充值</div>
          <div class="option " @click="changeType(2)">提现</div>
          <div class="option " @click="changeType(3)">转账</div>
        </div>
        <div class="choice-line horizontal-view justify-content-space-around">
          <div class="option " @click="changeType(4)">消费</div>
          <div class="option " @click="changeType(5)">退款</div>
          <div class="option " @click="changeType(6)">还款</div>
          <div class="option " @click="changeType(7)">理财</div>
        </div>
      </div>
    </div>

    <scroller :on-infinite="infinite" style="margin-top: 44px;" class="scrollerClass" ref="my_scroller" v-if="haveMessage">
      <div style="height: 1px;"></div>
      <div class="content-ul bg-white" v-for= "(list, index) in listArror" :key='index'>
        <div class="content-month fs-24" v-if="showCreateTimeMonthFormat(index,listArror)" >{{list.createTimeMonthFormat}}</div>
        <div class="content-list vux-1px-b horizontal-view bg-white">
          <img v-if="list.businessType === '充值'" class="content-img" src="../assets/images/CZ.png">
          <img v-else-if="list.businessType === '转账'" class="content-img" src="../assets/images/ZZ.png">
          <img v-else-if="list.businessType === '提现'" class="content-img" src="../assets/images/TX.png">
          <img v-else-if="list.businessType.search('消费') != -1" class="content-img" src="../assets/images/XF.png">
          <img v-else-if="list.businessType.search('充值') != -1" class="content-img" src="../assets/images/ZZ.png">
          <img v-else-if="list.businessType.search('退款') != -1" class="content-img" src="../assets/images/TK.png">
          <img v-else-if="list.businessType" class="content-img" src="../assets/images/LC.png" >
          <div class="flex1 content-text horizontal-view" @click="goDetails(list)">
            <div class="text-left flex4">
              <p class="fs-28 txt-black">{{list.businessType}}<span v-if="list.opposite">-{{list.opposite}}</span></p>
              <p class="fs-24 txt-dark">{{list.createTimeMMddHHmm}}</p>
            </div>
            <div class="text-right flex2">
              <p class="fs-28 txt-black right-num">{{(list.amount/100).toFixed(2)}}</p>
              <p v-if="list.status!='成功'" class="fs-26 txt-red">{{list.status}}</p>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 1px;"></div>
    </scroller>
    <div class="noMessage fs-32" v-if="!haveMessage">
          <p>暂无交易信息</p>
    </div>
  </div>
</template>

<script>
  import {Tab,TabItem} from 'vux';
  export default {
    name: 'Shopping',
    components: {Tab,TabItem},
    data () {
      return {
        title: '账单',
        moneyNum: false,
        stateSuccess: true,
        alertFlag: false,
        nowChangeTypeIndex: 0,
        nowChangeType: '',
        listArror: [],
        pageIndex: 1,
        pullupEnabled: true,
        haveMessage :true,
        special1: false,
        special2: false,
        overflowHidden: false,
        onFetching: false,
        noMoreData: false,
        historyGo: {
          showMore: true
        }
      }
    },
    beforeCreate () {
      document.title = '账单';
    },
    mounted () {
        let nowChangeTypeIndex = (this.$route.params.nowChangeTypeIndex === 3)? this.$route.params.nowChangeTypeIndex: 0;
         this.changeType(nowChangeTypeIndex);
    },
    methods: {
//        处理年月份
      showCreateTimeMonthFormat (index,arror) {
        let show = true;
        if (index) {
          if (arror[index].createTimeMonthFormat === arror[index-1].createTimeMonthFormat) {
            show = false
          }
        }
        return show
      },
      handler (index,type) {
        console.log('------------------------------------------this.listArror-------------------------------------------');
          console.log(this.listArror);
        this.cancel();
        this.noMoreData = false;
        this.listArror = [];
        this.pageIndex =1;
        this.haveMessage = true;
        console.log(index);
//        this.$refs.scroller.enablePullup();
        this.nowChangeTypeIndex = index;
        this.nowChangeType = type;
        let length1 = this.listArror.length;
        if (this.special1) {
          this.changeType(7);
          return
        }
        if (this.special2) {
          this.changeType(0);
          return
        }
        let params = {
          types : type,
          pageSize : '15',
          pageIndex : this.pageIndex.toString()
        };
        this.$post('ACCT100001',params,data => {
          console.log(data);
          if (data.respData.billList.length > 0) {
            console.log()
            if (length1 === this.listArror.length) {
              this.pageIndex += 1;
              this.listArror.push.apply(this.listArror,data.respData.billList)
            }
          } else {
              this.haveMessage = false;
          }
        },data => {
          this.$vux.toast.text(data.msg, 'default')
        })
      },
      cancel () {
        this.alertFlag = false;
        this.overflowHidden = false
      },
      arrowClick () {
        this.alertFlag = !this.alertFlag;
        this.overflowHidden = !this.overflowHidden
      },
      changeType (index) {
        let a = document.getElementsByClassName('vux-tab-item');
          if (this.nowChangeTypeIndex - index === -7){
              this.special1 = true;
             a[4].click();
             console.log('极端情况1')
          } else if (this.nowChangeTypeIndex - index === 7) {
            this.special2 = true;
            a[3].click();
            console.log('极端情况2')
          } else {
            this.special1 = false;
            this.special2 = false;
          }
        this.cancel();
          a[index].click();
      },
//      去详情
      goDetails (list) {
        let bissMessageSession =  JSON.stringify(list);
        sessionStorage.bissMessageSession = bissMessageSession;
        this.$router.push({
          path: '/mine/property/billList/billDetails',
          name: 'billDetails',
          params: {
            list:list,
            nowChangeTypeIndex: this.nowChangeTypeIndex
          }
        })
      },
//      上拉加载
      infinite (done) {
          if (this.noMoreData) {
             done(true)
              return
          }
        console.log('上拉加载开始');
        let length1 = this.listArror.length;
        let params = {
          types : this.nowChangeType,
          pageSize : '15',
          pageIndex : this.pageIndex.toString()
        };
        console.log(params);
        this.$post('ACCT100001',params,data => {
          console.log(data);
          if (data.respData.billList.length > 0) {
            if (length1 === this.listArror.length) {
              this.pageIndex += 1;
              this.listArror.push.apply(this.listArror,data.respData.billList)
            }
            done()
          }
          if (data.respData.billList.length < 15){
            this.noMoreData = true
            done(true)
          }
        },data => {
          this.$vux.toast.text(data.msg, 'default')
        });
      },
    }
  }
</script>
<style scoped lang="scss">
/*  .vux-tab-selected{
    border-bottom: solid 1px #e71d32!important;
  }*/
  .overflowHidden {
    overflow: hidden;
  }
  .flexBox {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10000;
  }
  .billDetails-bar{
    height: 44px;
    .bar-tabs{
      width: .86rem;
      z-index: 1200;
      background-color: #fff!important;
      background: url("../assets/images/icon-arrow-down.png") no-repeat;
      background-position: center;
      background-size: .26rem;
      border-left:solid 1px #eee ;
      border-bottom: solid 1px #eee;
    }
    .active{
      background: url("../assets/images/icon-arrow-up.png") no-repeat;
      background-position: center;
      background-size: .26rem;
    }
    .vux-tab-item{
      flex: 0 0 25%!important;
    }
  }
  .content-month{
    height: .7rem;
    line-height: .7rem;
    padding: 0rem .3rem;
    color: #000;
    background-color: #eee;
  }
  .content-list{
    height: 1.1rem;
    margin: 0rem .3rem;
    /*border-bottom: solid 1px #eeeeee;*/
    .content-img{
      height: .6rem;
      width: .6rem;
      margin:.24rem .2rem .2rem 0rem;
    }
    .content-text{
      height: .7rem;
      padding: .2rem 0rem;
      .text-left{
      }
      .text-right{
        text-align: right;
        .right-num{
          font-weight: bold;
          &:only-child{
            height: .7rem;
            line-height: .7rem;
          }
        }
      }
    }
  }
  .mask{
    height: 100%;
    position: fixed;
    left: 0;
    top: 44px;
    width: 100%;
    z-index: 999;
    background: rgba(0, 0, 0, 0.3);
    opacity: 1;
  }
  .type-choice{
    position: absolute;
    left: 0;
    bottom: 0 ;
    z-index: 999;
    opacity: 1;
    width: 100%;
    padding-bottom: .3rem;
    .choice-line{
      height: .9rem;
      width: 100%;
      .option{
        height: .6rem;
        width: 1.6rem;
        margin-top: .3rem;
        border:solid 1px #eee;
        text-align: center;
        line-height: .6rem;
        &:active{
          color: #e71d32;
        }
      }
    }
  }
  .type-choice{
    -webkit-transition: bottom 0.2s ease-in-out;
    -moz-transition: bottom 0.2s ease-in-out ;
  }
  .select{
    bottom: -2.1rem!important;
  }
  .noMessage {
    height: 5rem;
    margin-top: 44px;
    padding-top:4rem;
    text-align: center;
    background: url("../assets/images/noMessage.png") no-repeat;
    background-position: center 3rem;
    p{
      margin-top: 1.64rem;
    }
  }
</style>
