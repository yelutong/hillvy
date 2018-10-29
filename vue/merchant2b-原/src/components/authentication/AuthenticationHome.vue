<template>
  <article>
    <!--<base-header title="实名认证" class="justify-content-space-around"/>-->
    <progress-nav :status='0'/>
    <div>
      <!--企业会员：COMP，个人会员：PERSON)-->
      <div @click="jumpPage('PERSON')" class='item-box space-top'>
        <div class='icon-gtgs'></div>
        <div class='auth-item-info-box'>
          <div class='auth-item-title'>个体工商户<span v-if='result.auditResult==="NO_PASS"&&result.memberType==="PERSON"'
                                                  class='auth-item-title-no'>（审核未通过）</span></div>
          <div class='auth-item-info'>营业执照、法人身份证</div>
          <div class='auth-correct' v-if='result.memberType==="PERSON"&&result.remark'>
            <div class='correct-icon'></div>
            <div>{{result.remark}}</div>
          </div>
        </div>
        <div class='forward-arrow'></div>
      </div>

      <div @click="jumpPage('COMP')" class='item-box'>
        <div class='icon-qysh'></div>
        <div class='auth-item-info-box'>
          <div class='auth-item-title'>企业商户<span v-if='result.auditResult==="NO_PASS"&&result.memberType==="COMP"'
                                                 class='auth-item-title-no'>（审核未通过）</span></div>
          <div class='auth-item-info'>
            <p>三证合一：营业执照、法人身份证</p>
            <p>三证未合一：营业执照、组织机构代码证、税务登记证、法人身份证</p>
          </div>
          <div class='auth-correct' v-if='result.memberType==="COMP"&&result.remark'>
            <div class='correct-icon'></div>
            <div>{{result.remark}}</div>
          </div>
        </div>
        <div class='forward-arrow'></div>
      </div>
    </div>
  </article>
</template>

<script>
  //  import authFormInit from  '../../store/authentication/authFormInit';
  import ProgressNav from '../authentication/ProgressNav';
  import router from './../../router/routers';
//  import {mapState} from 'vuex';
  export default {
    components: {ProgressNav},
    data () {
      return {
        result: {}
      }
    },
    created: function () {
      if (this.$route.params.type === "not") {
//        if (!this.$authDate.epAddress) {
          this.$post('AUTH100003', this.authForm, data => {
            console.log('AUTH100003 ___');
            this.result = data.respData;
            console.log(this.result);
            let obj = Object.assign({}, this.result);
            delete  obj.auditResult;
            delete  obj.remark;
            if (obj.agentName) {
              obj.agentHas = 'Y';
            } else {
              obj.agentHas = 'N';
            }
            console.log(JSON.stringify(obj));
            this.$store.commit('updateAuthFormAll', obj);
//          for (let i in authFormInit){
//            this.$store.commit('update', {name: i, value: obj[i]});
//          }

          }, resp => {
            this.$vux.toast.text(resp.msg, 'default')
          });

//        }
      } else if (this.$route.params.type === "new") {
        this.$store.commit('resetAuthForm', {});
        this.$store.commit('update', {name: 'mobileNo', value: this.$userInfo.loginName});
//        this.$store.commit('updateAuthFormAll', authFormInit);
//        for (let i in authFormInit){
//          this.$store.commit('update', {name: i, value: authFormInit[i]});
//        }
      }

    },
    computed: {
//      ...mapState({
//        authForm: state => state.authForm,
//      })
    },
    methods: {
      jumpPage: function (page) {
        if (this.$route.params.type === "not"&&this.result.auditResult==="NO_PASS") {
           if (page!==this.result.memberType){
             this.$store.commit('resetAuthForm', {});
             this.$store.commit('update', {name: 'mobileNo', value: this.$userInfo.loginName});
           }

        }
        router.push("/authentication/certificate/"+page);
//        if (this.result.auditResult === "PASS") {
//          router.push('/authentication/certificate/identity/audit/0')
//        } else {
//          router.push(page);
//        }

      }
    }
  }
</script>
<style lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
</style>
