<template>
  <article>
    <progress-nav :status='3' v-if='type===1'/>
    <div style='padding-top: .2rem;'></div>
    <div class='auth-nav'>
      <div class='auth-audit-nav'>
        <div class='auth-pro-box'>
          <div class='auth-icon'></div>
          <div class='auth-line'></div>
        </div>
        <div class='auth-nav-box-audit'>
          <h3>提交申请</h3>
          <time  v-if='type===0'>{{$authDate.createTime}}</time>
          <time  v-if='type===1'>{{getDate}}</time>
        </div>
      </div>
      <div class='auth-audit-nav'>
        <div class='auth-pro-box'>
          <div class='auth-audit-icon'></div>
          <div class='auth-line auth-line-gray'></div>
        </div>
        <div class='auth-nav-box-audit'>
          <h3>正在审核</h3>
          <time>预计2个工作日内完成审核</time>
        </div>
      </div>
      <div class='auth-audit-nav'>
        <div class='auth-pro-box '>
          <div class='auth-icon auth-line-gray'></div>
        </div>
        <div class='auth-nav-box-audit auth-nav-box-audit-finish'>
          <h3 class='txt-gray'>完成认证</h3>
        </div>
      </div>
    </div>
    <div v-if='type===0' class='audit-box'>
      <div class='boxcssc'></div>
      <div class='item-nav border-none item-nav-just'>
        <div class='item-label txt-gray'>审核状态</div>
        <div class='flex1 txt-right'>审核中</div>
      </div>
      <div class='item-nav border-none' v-if='getDate'>
        <div class='item-label txt-gray'>申请时间</div>
        <div class='flex1 txt-right'>{{$authDate.createTime}}</div>
      </div>
      <div class='item-nav border-none'>
        <div class='item-label txt-gray'>通过时间</div>
        <div class='flex1 txt-right'>--</div>
      </div>


    </div>

    <div class='box-padding sub-box-btn'>
      <x-button type="warn" class="login-btn" :disabled="disabled" @click.native="next()">返回</x-button>
    </div>
  </article>
</template>

<script>
  import router from './../../router/routers';
  import ProgressNav from '../authentication/ProgressNav';
  export default {
    data () {
      return {
        disabled: false,
        type: 0,
      }
    },
    components: {ProgressNav},

    created: function () {
      let type = this.$route.params.type;
      this.type = type && parseInt(type);
      console.log('this.$authDate')
      console.log(this.$authDate)
    },
    computed: {
      getDate: function () {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        return year + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day);
      }

    },
    methods: {
      next: function () {
        router.push("/mine");
//        if (this.$authBackUrl) {
//          router.push(this.$authBackUrl);
//          this.$setAuthBackUrl('')
//        } else {
//          router.push("/mine");
//        }


      }
    }
  }
</script>
<style lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";
  @import "../../components/authentication/AuthenticationAudit.scss";
</style>
