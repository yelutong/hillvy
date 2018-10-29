<template>
  <article>
    <progress-nav :status='1'/>
    <div class='title-bar'>填写营业执照信息</div>
    <group-select label='证件类型' option='epCertType' :value='ensureValue()' :list="epCertTypeOptions"></group-select>
    <upload-img title='营业执照案例背景' info='上传营业执照' icon='fuck' option='epLicenseImgPath'></upload-img>
    <!--<upload-img title='营业执照案例背景' info='微信上传营业执照测试' icon='fuck' option='epLicenseImgPath'></upload-img>-->
    <div class='item-list'>
      <div class=' auth-correct'>
        <div class='correct-icon'></div>
        <div>请核对营业执照信息，准确无误</div>
      </div>
      <group-input label='公司名称' placeholder='请输入' :value='authForm.epName' option='epName' maxlength='33'
                   minlength='1'></group-input>
      <group-input :label='epCertNoNLabeName' placeholder='请输入' :value='authForm.epCertNo' option='epCertNo' type='text'
                   :maxlength='epCertNoCao'></group-input>
      <group-input label='营业地址' :value='authForm.epAddress' placeholder='请输入' option='epAddress'></group-input>
      <group-input label='经营范围' :value='authForm.epBusinessScope' placeholder='请输入' type='textarea'
                   option='epBusinessScope' maxlength='160' minlength='1' v-if='memberType==="COMP"'></group-input>
      <group-select label='经营范围' :value='authForm.epBusinessScope||"请选择"' option='epBusinessScope'
                    :list="epBusinessScopeOptions" v-if='memberType==="PERSON"'></group-select>
      <div class='vux-1px-b'></div>
    </div>
    <group-date-picker label='营业期限(止)' :value='authForm.epExpDate' type='yyzz' option='epExpDate'></group-date-picker>
    <div v-if='memberType==="COMP"&&epCertType==="EP_BLICENSENO"'>
      <upload-img title='组织机构代码证案例背景' info='上传组织机构代码证' icon='zjjg' option='epOrgPath'></upload-img>
      <div class='item-list' title="">
        <div class=' auth-correct'>
          <div class='correct-icon'></div>
          <div>请核对组织机构代码证信息，准确无误</div>
        </div>
      </div>
      <group-input label='组织机构代码' :value='authForm.epOrgCode' option='epOrgCode'></group-input>
      <upload-img title='税务登记证案例背景' info='上传税务登记证' icon='swdj' option='epTaxPath'></upload-img>
      <div class='item-list'>
        <div class='auth-correct'>
          <div class='correct-icon'></div>
          <div>请核对税务登记证信息，准确无误</div>
        </div>
        <group-input label='税务登记证号' :value='authForm.epTaxCode' option='epTaxCode'></group-input>
      </div>
    </div>
    <div class='box-padding sub-box-btn'>
      <x-button type="warn" class="login-btn" :disabled="subDisabled" @click.native="next()">下一步</x-button>
    </div>


  </article>
</template>

<script>
  //  import 'vue-smooth-picker/dist/css/style.css'
  //  import { SmoothPicker } from 'vue-smooth-picker'


  import router from './../../router/routers';
  import {mapState} from 'vuex';
  import ProgressNav from '../authentication/ProgressNav';
  import GroupSelect from "../../components/base/GroupSelect.vue";
  import GroupInput from "../../components/base/GroupInput.vue";
  import GroupTextArea from "../../components/base/GroupTextArea.vue";
  import UploadImg from "../../components/base/UploadImg.vue";
  import GroupDatePicker from "../../components/base/GroupDatePicker.vue";
//  import  PTWZOptins from  "../../store/authentication/PTWZOptins";
  export default {
    components: {GroupSelect, ProgressNav, GroupInput, GroupTextArea, UploadImg, GroupDatePicker},
    data () {
      return {
        tagName:this.$UA().android?"scroller":"article",
        memberType: "",
        subDisabled: false,
        epBusinessScopeOptions: [{values: ["宾馆餐娱类", "珠宝工艺类", "日用百货类", "房产汽车类", "售票类", "家电装修类", "服务类", "批发类", "便民类", "超市加油类", "交通运输类", "其他类"]}],
      }
    },
    created () {
//        this.$refs.wrap=
      let memberType = this.$route.params.memberType;
      this.initWeChat(window.location.href, memberType);
      this.memberType = memberType;
      let epMemberType = "PERSON";
      if (memberType === "COMP") {
        epMemberType = 'COMP';
      }
      this.$store.commit('update', {name: 'epMemberType', value: epMemberType});
    },
    computed: {

      epCertTypeOptions: function () {
        return [{
          values: [
            {name: "EP_SCCNO", key: 1, value: "统一社会信用代码类"},
            {name: "EP_BLICENSENO", key: 1, value: this.memberType === 'PERSON' ? "普通营业执照类" : "普通五证类"}
          ]
        }];//	String	"企业证件类型(营业执照：EP_BLICENSENO，统一社会信用代码：EP_SCCNO)"
      },
      epCertNoCao: function () {
        switch (this.epCertType) {
          case "EP_BLICENSENO":
            return 15;
          case "其他":
            return 15;
          case "EP_SCCNO":
          default:
            return 18;
        }
      },
      epCertNoNLabeName: function () {
        switch (this.epCertType) {
          case "EP_BLICENSENO":
            return "注册号";
          case "其他":
            return "注册号";
          case "EP_SCCNO":
          default:
//            if (this.memberType === "COMP"){
//              Object.keys(PTWZOptins).forEach(key => {
//                this.$store.commit('update', {name: key, value: ""});
//              });
//            }
            return "统一社会信用代码";
        }
      },
      ...mapState({
        authForm: state => state.authForm,
        epCertType: state => state.authForm.epCertType
      })

    },
    methods: {
      next: function () {
        router.push('/authentication/certificate/identity/' + this.memberType)
      },
      upload: function () {

      },
      ensureValue: function (option) {
        let name = "请选择";
        this.epCertTypeOptions[0].values.filter(item => {
          if (item.name === this.authForm.epCertType) {
            name = item.value;
            return true;
          }
          return false;
        });
        console.log(name);
        return name;
      },
    }
  }
</script>
<style lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";
</style>

