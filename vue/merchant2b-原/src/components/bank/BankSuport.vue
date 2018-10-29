<template>
  <article>
    <base-header title="银行卡" class="justify-content-space-around"/>
    <div class='vertical-view justify-content-space-between full-h'>
      <div class='content-box txt-left'>
        <search
          @on-change="getResult"
          :results="results"
          v-model="value"
          placeholder='您可以输入关键字搜索银行'
          position="absolute"
          top="0"
          v-bind:auto-fixed='false'
          @on-cancel="onCancel"
          ref="search"></search>

      </div>
      <div class='content-box'>
        <scroller lock-x scrollbar-y ref="scroller">
          <group>
            <cell v-bind:title="bank.bankName" value='' class='vux-1px-b' @click.native="onClick(bank)" v-for='bank in bankList' :key="bank.bankCode"></cell>
          </group>
        </scroller>

      </div>
    </div>


  </article>
</template>
<script>

  import router from './../../router/routers';
  import {mapState} from 'vuex';
  import {Search, Cell, Group, Scroller} from 'vux'
  //  let bankListBak = [];
  export default {
    created () {
      if (!this.bankSupportList.length) {
        this.$post('BANK100002', {}, data => {
          console.log('BANK100002 data');
          console.log(data);
          this.bankList = data.respData;
          this.$store.commit('updateBankSupportList', data.respData);
        }, resp => {
          this.$vux.toast.text('获取银行卡列表失败' + resp.respData.msg, 'default');

        });
      } else {
        this.bankList = this.bankSupportList;
      }

    },

    data () {
      return {
        type:this.$route.params.type,
        bankList: [],
        results: [],
        value: ''
      }
    },
    components: {Search, Cell, Group, Scroller},
    computed: {
      ...mapState({
        bankSupportList: state => state.bankSupportList.list,
      })
    },
    methods: {
      onClick: function (bank) {
        console.log(bank);
        this.$store.commit('updateBankFrom', {name: 'openBankNo', value: bank.bankCode});
        this.$store.commit('updateBankFrom', {name: 'openBankName', value: bank.bankName});
        router.push('/bankInfo/'+this.type);
      },
      getResult (val) {
        this.bankList = this.bankSupportList.filter((item) => {
          if (item.bankName.indexOf(val)>=0) {
            return true;
          }
          return false;
        });

        console.log('on-change', val)
      },
      onCancel () {
        this.bankList = this.bankSupportList;
        console.log('on cancel')
      }
    }
  }
</script>
<style  lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";
  @import "Bank.scss";
  @import "BankList.scss";
</style>
