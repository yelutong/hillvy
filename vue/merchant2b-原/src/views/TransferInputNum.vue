<template>
  <article class="transferInputNum bg-light" style="overflow: hidden">
    <base-header :title="title"  :rightOptions="historyGo"/>
    <group>
      <x-input class="input-num fs-30 txt-black" title="对方账户" v-model="userNum" :placeholder="placeholder"></x-input>
    </group>
    <div class="transferInputNum-button">
      <x-button  type="warn" class="extractBtn fs-32" :disabled="disabled"  @click.native="nextBtn">下一步</x-button>
    </div>
  </article>
</template>
<script>
  export default{
      name: 'transferInputNum',
//    属性数据
      data () {
          return {
              title: '转账',
              userNum: null,
              placeholder: '',
              historyGo: {
                showMore: true
              }
          }
      },
//    计算属性
      computed: {
        disabled () {
          return !this.userNum
        }
      },
//    模块挂载前
    beforeCreate () {
      document.title = '转账';
    },
//    页面渲染后
    mounted () {
      console.log(this.$route.params.type);
      if (this.$route.params.type === 'COMP'){
        this.placeholder = '请输入手机号或邮箱'
      } else {
        this.placeholder = '请输入手机号'
      }
    },
//    方法
    methods: {
        getUserMessage () {
          this.$post('STAT100001',{
            type: 'merchant2b',
            trigId:'ms-toB-transferInput',
            trigUid : this.$getUserInfo().wxOpenId,
            trigBase : this.$getUserInfo().memberNo,
            channel : 'MS-WEIXIN'
          });
          let param = {
            loginName : this.userNum.toString(),
            memberType : this.$route.params.type
          };
          console.log(param);
//      获取收款人信息
          this.$post('MEM100001',param,data => {
            console.log(data)
            let transferOppositeObj = {
              loginName: this.userNum,
              memberType:  this.$route.params.type,
              memberNo: data.respData.memberNo,
              memberName: data.respData.memberName
            };
            let transferOppositeSession =  JSON.stringify(transferOppositeObj);
            sessionStorage.transferOppositeSession = transferOppositeSession;
            this.$router.push({
              path: '/transferDetails',
              name: 'transferDetails',
              params: {
                loginName: this.userNum,
                memberType: this.$route.params.type,
                memberNo: data.respData.memberNo,
                memberName: data.respData.memberName
              }
            })
          }, data => {
            this.$vux.toast.text(data.msg, 'default');
          });
        },
        nextBtn () {
          let emailRe = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
          let phoneReg = /^1[3-578]\d{9}$/;
          if (this.placeholder === '请输入手机号'){
            if (phoneReg.test(this.userNum)) {
              this.getUserMessage()
            } else {
              this.$vux.toast.text('账号格式不正确', 'default')
            }
          } else {
            if (emailRe.test(this.userNum) || phoneReg.test(this.userNum)) {
              this.getUserMessage()
            } else {
              this.$vux.toast.text('账号格式不正确', 'default')
            }
          }
        }
      }
  }
</script>
<style scoped lang="scss">
  .transferInputNum{
    /*输入框*/
    .input-num{
      height: 1.1rem;
      padding: 0rem .3rem;
    }
    /*按钮*/
    .transferInputNum-button{
      padding: 0rem .3rem;
      .extractBtn{
        height: .9rem!important;
        margin-top: .6rem;
      }
    }
  }
</style>
