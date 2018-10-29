<template>
  <article class="transferHome bg-white" style="overflow: hidden">
    <base-header :title="title" :rightOptions="historyGo"/>
    <div class="horizontal-view transfer-type vux-1px-b">
        <div class="flex1 "  @click="transferCompany">
            <p class="icon icon-transfer-company"></p>
            <p class="fs-28">转账给企业</p>
        </div>
        <div class="flex1 vux-1px-l" @click="transferPersonal">
          <p class="icon icon-transfer-personal"></p>
          <p class="fs-28">转账给个人</p>
        </div>
    </div>
    <div class="transfer-history fs-24 txt-blue" @click="transferHistory">查看转账记录</div>
    <div class="transfer-content">
      <p class="content-title txt-black fs-24">最近转账，一点即转</p>
          <div class="content-list"  v-for= "item in items" :key="item.id" @click="goTransfer(item)" v-if="noMessage">
            <span class="fs-30 ">{{item.memberName}}{{item.id}}</span>
            <span class="fs-30">{{item.loginName.slice(0,3)+'****'+item.loginName.slice(7,11)}}</span>
          </div>
          <div class="noMessage fs-30" v-if="!noMessage">
            暂无转账信息
          </div>
    </div>
  </article>
</template>

<script>
  export default{
      name: 'transferHome',
//    属性数据
      data () {
          return {
            title: '转账',
            onFetching: false,
            noMessage: true,
            historyGo: {
              showMore: true
            },
            items: []
          }
      },
//    模块挂载前
    beforeCreate () {
      document.title = '转账'
    },
//    页面渲染后
    mounted () {
//      获取近期转账记录
      this.$post('ACCT100003',{size : '6'},data => {
        console.log('调取近期转账记录数据1');
        console.log(data);
        if (data.respData.length > 0) {
          this.items.push.apply(this.items,data.respData);
        } else {
           this.noMessage = false
        }
        console.log(this.items);
      }, data => {
        console.log('调取近期转账记录数据2');
        console.log(data);
        this.$vux.toast.text(data.msg, 'default')
      });
    },
//    方法
    methods: {
      goTransfer (item) {
        let transferOppositeObj = {
          loginName: item.loginName,
          memberName: item.memberName,
          memberNo: item.memberNo
        };
        let transferOppositeSession =  JSON.stringify(transferOppositeObj);
        sessionStorage.transferOppositeSession = transferOppositeSession;
        this.$router.push({
          path: '/mine/property/transferHome/transferInputNum/transferDetails',
          name: 'transferDetails',
          params: {
            loginName: item.loginName,
            memberName: item.memberName,
            memberNo: item.memberNo
          }
        })
      },
      transferCompany () {
          console.log('对公转账');
          this.$post('STAT100001',{
            type: 'merchant2b',
            trigId:'ms-toB-transferCOMP',
            trigUid : this.$getUserInfo().wxOpenId,
            trigBase : this.$getUserInfo().memberNo,
            channel : 'MS-WEIXIN'
          });
        this.$router.push({
          path: '/mine/property/transferHome/transferInputNum',
          name: 'transferInputNum',
          params: {
            type: 'COMP',
          }
        })
      },
      transferPersonal () {
        console.log('对私转账');
        this.$post('STAT100001',{
          type: 'merchant2b',
          trigId:'ms-toB-transferPERSON',
          trigUid : this.$getUserInfo().wxOpenId,
          trigBase : this.$getUserInfo().memberNo,
          channel : 'MS-WEIXIN'
        });
        this.$router.push({
          path: '/mine/property/transferHome/transferInputNum',
          name: 'transferInputNum',
          params: {
            type: 'PERSON',
          }
        })
      },
      transferHistory () {
        this.$router.push({
          path: '/mine/property/billList',
          name: 'billList',
          params: {
            nowChangeTypeIndex: 3
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .transferHome{
    .transfer-type{
      height: 2.1rem;
      /*border-bottom: solid 1px #eee;*/
      text-align: center;
      div:first-of-type{
        /*border-right: solid 1px #eee;*/
      }
      .icon{
        height: .9rem;
        margin-top: .4rem;;
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
    .transfer-history{
      height: .8rem;
      text-align: center;
      line-height: .8rem;
    }
    .transfer-content{
      .content-title{
        height: .8rem;
        line-height: .8rem;
        background-color: #eee;
        padding-left: .3rem;
      }
      .content-list{
        height: .8rem;
        padding:.15rem 0rem;
        padding-left: .3rem;
        margin-right: .3rem;
        background: url('../assets/images/forward.png') no-repeat;
        background-position: right center;
        background-size: .15rem;
        border-bottom: solid 1px #eee;
        span{
          display: block;
        }
        span:first-of-type{
          color: #000;
        }
      }
    }
    .noMessage {
      margin-top: 44px;
      padding-top: 4rem;
      text-align: center;
      background: url("../assets/images/noMessage.png") no-repeat;
      background-position: center 1.3rem;
    }
  }
</style>
