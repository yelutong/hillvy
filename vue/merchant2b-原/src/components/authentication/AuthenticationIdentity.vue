<template>
  <article>
    <progress-nav :status='2'/>
    <div class='title-bar'>填写法人身份信息</div>
    <group-input v-if='memberType==="PERSON"' label='证件类型' value='中华人民共和国居民身份证' option='legalCertType'
                 readonly='readonly'></group-input>
    <group-select v-if='memberType==="COMP"' label='证件类型' :value='legalCertTypeName' option='legalCertType'
                  :list="legalCertTypeOptions"></group-select>
    <!-- legalCertNames return  {frontName: '上传香港居民来往内地通行证正面', backName: '上传香港居民来往内地通行证反面',frontTitle:"通行证正面案例背景",backTitle:'通行证反面案例背景'};-->
    <upload-img :title='legalCertNames.frontTitle' :info='legalCertNames.frontName' :icon='legalCertNames.frontIcon'
                class='padding-bottom-none'
                option='legalCertFrontPath'></upload-img>
    <upload-img :title='legalCertNames.backTitle' :info='legalCertNames.backName' :icon='legalCertNames.backIcon'
                option='legalCertBackPath' v-if='legalCertNames.backTitle'></upload-img>
    <div class='item-list'>
      <div class=' auth-correct'>
        <div class='correct-icon'></div>
        <div>请核对法人身份信息，准确无误</div>
      </div>
      <group-input label='姓名' placeholder='请输入' :value='authForm.legalName' option='legalName' maxlength='30'
                   minlength='1'></group-input>
      <group-input label='证件号码' placeholder='请输入' :value='authForm.legalCertNo' option='legalCertNo'></group-input>
      <group-date-picker class='border-none' label='有效期限(止)' :value='authForm.legalCertExpDate' type='id'
                         option='legalCertExpDate'></group-date-picker>
      <!--<group-input label='有效期限(止)' :value='authForm.legalCertExpDate' placeholder='yyyy-MM-dd' option='legalCertExpDate'></group-input>-->
    </div>
    <div class='title-bar'>
      <div>填写被授权人身份信息</div>
    </div>
    <div class='item-nav  switch'
         :class="{'switch-close':this.authForm.agentHas === 'Y','border-none':this.authForm.agentHas === 'N'}">
      <div class='item-label'>被授权人同法人</div>
      <div class='flex1'>&nbsp;</div>
      <div class='flex1' @click='showAgent()'>&nbsp;</div>
    </div>
    <div v-show="this.authForm.agentHas === 'Y'">
      <upload-img title='身份证头像页案例背景' info='上传身份证头像页' icon='sfz-zm' option='agentCertFrontPath'
                  class='padding-bottom-none'></upload-img>
      <upload-img title='身份证国徽页案例背景' info='上传身份证国徽页' icon='sfz-fm' option='agentCertBackPath'
                  class='padding-bottom-none'></upload-img>
      <div class='item-list'>
        <group-input label='姓名' placeholder='请输入' :value='authForm.agentName' option='agentName' maxlength='30'
                     minlength='1'></group-input>
        <group-input label='证件号码' placeholder='请输入' :value='authForm.agentCertNo' option='agentCertNo' maxlength='18'
                     minlength='18' type='number'></group-input>
        <group-date-picker label='有效期限(止)' :value='authForm.agentCertExpDate' type='id' option='agentCertExpDate'
                           class='border-none'></group-date-picker>
      </div>
      <div class='title-bar'>
        <div>上传委托授权书</div>
        <a class='auth-info-tips auth-download ' id='downFK' ref='downFK' @click="downFKU" style='display: none'
           href='/ywxqs.docx' target='_blank' download='委托授权书模板'>下载委托授权书模板</a>
        <span class='auth-info-tips auth-download'
              v-clipboard:copy="message"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError">下载委托授权书模板</span>
      </div>
      <upload-img title='委托授权书模板案例' info='上传委托授权书' icon='wtsqs' option='authLetterPath'></upload-img>
    </div>
    <div class='title-bar'>
      <div>填写联系人手机号</div>
      <!--<div class='auth-info-tips'>用于接收实名通过、未通过提醒</div>-->
    </div>
    <div class='item-list'>
      <group-input label='手机号' :value='authForm.mobileNo' placeholder='请输入联系人手机号码' option='mobileNo' maxlength='11'
                   minlength='11' type='number'></group-input>
    </div>
    <div class='box-padding sub-box-btn'>
      <x-button type="warn" class="login-btn" :disabled="!disableSub" @click.native="next()">提交</x-button>
    </div>

    <confirm v-model="show"
             title="下载委托授权书"
             :content='content'
             confirm-text="复制链接"
             cancel-text="关闭"
             @on-cancel="onCancel()"
             @on-confirm="onConfirm()">
      <p style="text-align:center;" v-text="content"></p>
    </confirm>
  </article>
</template>

<script>
  import router from './../../router/routers';
  import {mapState} from 'vuex';
  import ProgressNav from '../authentication/ProgressNav';
  import GroupInput from '../../components/base/GroupInput.vue';
  import GroupSelect from '../../components/base/GroupSelect.vue';
  import UploadImg from '../../components/base/UploadImg.vue';
  import GroupDatePicker from "../../components/base/GroupDatePicker.vue";
  import agentForm from "../../store/authentication/agentFormInit";
  import PTWZOptins from "../../store/authentication/PTWZOptins";

  let legalCertTypeOptionsArr = [
    {name: "I_CARD", value: "中华人民共和国居民身份证"},
//            {name: "O_CERT", value: "军官证"},
    {name: "PASSPORT", value: "护照"},
    {name: "HK_M_PASS", value: "香港居民来往内地通行证"},
    {name: "MC_PASS", value: "澳门居民来往内地通行证"},
    {name: "TW_PASS", value: "台湾居民来往大陆通行证"},
  ];

  let downloadUrl = "https://sfpay-sit.sf-pay.com/abc.docx";
  //  if (window.location.href.indexOf("index")) {
  //    downloadUrl = window.location.href.substring(0, window.location.href.indexOf("index.html")) + "ywxqs.docx";
  //  } else {
  //    downloadUrl = window.location.href.substring(0, window.location.href.indexOf("#")) + "ywxqs.docx";
  //  }

  export default {
    components: {GroupSelect, ProgressNav, GroupInput, UploadImg, GroupDatePicker},
    data () {
      return {
        tagName:this.$UA().android?"scroller":"article",
        showSwitch: true,
        show: false,
        message: downloadUrl,
        content: '请下载委托授权书模板，根据要求填写内容，加盖公章后拍照上传' + downloadUrl,
        result: {
          audit_result: ""//	string	实名审核结果（审核中：AUDITING,审核未通过：REJECT）
        },
        legalCertTypeOptions: [{
          values: legalCertTypeOptionsArr
        }],
      }
    },
    beforeCreate () {

//      let memberType = this.$route.params.memberType;
//      this.initWeChat(window.location.href, memberType);
    },
    mounted(){
    },
    computed: {
      legalCertTypeName: function () {
        return legalCertTypeOptionsArr.filter(item => {
          return item.name === this.authForm.legalCertType;
        })[0].value
      },
      disableSub: function () {
        return true;
      },
      legalCertNames: function () {

        switch (this.legalCertType) {
          case "I_CARD":
          default:
            return {
              frontName: '上传身份证头像页',
              backName: '上传身份证国徽页',
              frontTitle: "身份证头像页案例背景",
              backTitle: '身份证国徽页案例背景',
              frontIcon: 'sfz-zm',
              backIcon: 'sfz-fm'
            };
          //          case "O_CERT": return {frontName: '军官证正面', BackName: '军官证反面',frontTitle:"",backTitle:''};
          case "PASSPORT":
            return {
              frontName: '上传护照',
              backName: '',
              frontTitle: "护照案例背景",
              backTitle: '',
              frontIcon: 'hz-zm',
              backIcon: ''
            };
          case "HK_M_PASS":
            return {
              frontName: '上传香港居民来往内地通行证正面',
              backName: '上传香港居民来往内地通行证反面',
              frontTitle: "通行证正面案例背景",
              backTitle: '通行证反面案例背景',
              frontIcon: 'ga-zm',
              backIcon: 'ga-fm'
            };
          case "MC_PASS":
            return {
              frontName: '上传澳门居民来往内地通行证正面',
              backName: '上传澳门居民来往内地通行证反面',
              frontTitle: "通行证正面案例背景",
              backTitle: '通行证反面案例背景',
              frontIcon: 'ga-zm',
              backIcon: 'ga-fm'
            };
          case "TW_PASS":
            return {
              frontName: '上传台湾居民来往大陆通行证正面',
              backName: '上传台湾居民来往大陆通行证反面',
              frontTitle: "通行证正面案例背景",
              backTitle: '通行证反面案例背景',
              frontIcon: 'tw-zm',
              backIcon: 'tw-fm'
            };
        }
      },
      memberType: function () {
        let memberType = this.$route.params.memberType;
        this.initWeChat(window.location.href, memberType);
        return memberType;
      },
      agentHasFlag: function () {
        return this.agentHas === "Y";
      },
      ...mapState({
        authForm: state => state.authForm,
//        agentForm: state => state.agentForm,
        legalCertType: state => state.authForm.legalCertType,
        agentHas: state => state.authForm.agentHas
      })

    },
    methods: {
      onCopy: function (e) {
        this.show = true;
//        alert('You just copied: ' + e.text)
      },
      onError: function (e) {
//          this.$refs.downFK.click();
        this.$emit('downFKU');
      },
      downFKU: function () {

      },
      onCancel () {
        this.show = false;
      },
      onConfirm () {
        this.show = false;
      },
      showAgent: function () {
        if (this.authForm.agentHas === "Y") {
          this.$store.commit('update', {name: 'agentHas', value: "N"})
        } else {
          this.$store.commit('update', {name: 'agentHas', value: "Y"})
        }
      },
      next: function () {
        console.log('this.authForm');
        console.log(this.authForm);
//**************确定提交 提示语
        let formOptionName = {
          memberType: "会员类型",
          epMemberType: "商户类型",
          mobileNo: "联系人手机号",
          epCertType: "企业证件类型",
          epCertNo: "企业证件号",
          epAddress: "营业地址",
          epName: "企业名称",
          epBusinessScope: "经营范围",
          epExpDate: "营业期限",
          epOrgCode: "组织机构代码号",
          epTaxCode: "税务登记号",
          epOrgPath: "组织代码证图片",//  组织代码证图片
          epTaxPath: "税务登记证图片",//  税务登记证图片
          epLicenseImgPath: "营业执照内网存放路径",
          legalCertType: "法人证件类型",
          legalName: "法人姓名",
          legalCertNo: "法人身份证号",
          legalCertExpDate: "法人身份证有效期限",
          legalCertFrontPath: "法人身份证证明图片正面",
          legalCertBackPath: "法人身份证证明图片背面",
          agentCertType: "代理人证件类型",
          agentName: "代理人姓名",
          agentCertNo: "代理人身份证号",
          agentCertExpDate: "代理人身份证有效期限",
          agentCertFrontPath: "代理人身份证正面内网存放路径",
          agentCertBackPath: "代理人身份证背面内网存放路径",
          authLetterPath: "填完后的委托授权书",
        };


        let arrOptions = [];
        let showText = [];
        for (let i in this.authForm) {
          if (this.authForm[i] === "") {
            arrOptions.push(i);
          }
        }
        arrOptions.forEach((key) => {
          //企业用户 不为五证类时，不需填
          if (!(this.memberType === "COMP" && this.epCertType === "EP_BLICENSENO") && PTWZOptins.hasOwnProperty(key)) {
//          if (this.epCertType === "EP_SCCNO" && PTWZOptins.hasOwnProperty(key)) {
            return false;
          }
          //代理人开发没有开，代理人项目不需要
          if (this.authForm.agentHas === 'N' && agentForm.hasOwnProperty(key)) {
//            this.$store.commit('update', {name: key, value: agentForm[key]});
            return false;
          }
          //法人类型为护照时候，不需要法人证件背后图片
          if (this.authForm.legalCertType === "PASSPORT" && key === "legalCertBackPath") {
            return false;
          }
          showText.push(formOptionName[key]);
          return true;
        });
        if (showText.length) {
          this.$vux.toast.text('请确定填写：' + showText.join(" "));
          return;
        }
//**************再次确定清除填写数据
        //企业用户 不为五证类时，不需填
        if (this.epCertType === "EP_SCCNO" || (this.memberType==="PERSON" && this.epCertNo==="EP_BLICENSENO")) {
          Object.keys(PTWZOptins).forEach(key => {
            this.$store.commit('update', {name: key, value: ""});
          })
        }
        //代理人开发没有开，代理人项目不需要
        if (this.authForm.agentHas === 'N') {
          Object.keys(agentForm).forEach((key) => {
            this.$store.commit('update', {name: key, value: ""});
          })
        }
        //法人类型为护照时候，不需要法人证件背后图片
        if (this.authForm.legalCertType === "PASSPORT") {
          this.$store.commit('update', {name: "legalCertBackPath", value: ""})
        }
        this.$post('AUTH100002', this.authForm, data => {
          router.push('/authentication/certificate/identity/audit/1')
        }, resp => {
          this.$vux.toast.text(resp.msg, 'default');
        });
      }

    }
  }
</script>
<style lang="scss">
  /*@import '../../assets/scss/login.scss';*/
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";
  @import "../../components/authentication/AuthenticationIdentity.scss";
</style>
