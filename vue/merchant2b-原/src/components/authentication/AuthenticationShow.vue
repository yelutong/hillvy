<template>
  <wrapper-component :tag='tagName'>
    <!--<base-header title="实名认证"></base-header>-->
    <tab class="tab-class">
      <tab-item selected @on-item-click="onItemClick">企业信息</tab-item>
      <tab-item @on-item-click="onItemClick">身份信息</tab-item>
    </tab>
    <div v-if='index===0'>
      <div class='title-bar'>营业执照信息</div>
      <div class='item-list'>
        <div class='item-nav'>
          <div class='item-label'>证件类型</div>
          <div class='flex1'>{{authForm.epCertTypeName}}</div>
        </div>
        <div class='item-nav'>
          <div class='item-label'>公司名称</div>
          <div class='flex1'>{{authForm.epName}}</div>
        </div>
        <div class='item-nav' v-if='authForm.epCertType==="EP_SCCNO"'>
          <div class='item-label'>统一社会信息代码</div>
          <div class='flex1'>{{authForm.epCertNo}}</div>
        </div>
        <div class='item-nav' v-if='authForm.epCertType==="EP_BLICENSENO"'>
          <div class='item-label'>营业执照</div>
          <div class='flex1'>{{authForm.epCertNo}}</div>
        </div>
        <div v-if='authForm.epMemberType==="COMP"&&authForm.epCertType==="EP_BLICENSENO"'>
          <div class='item-nav' v-if='authForm.epOrgCode'>
            <div class='item-label'>组织机构代码</div>
            <div class='flex1'>{{authForm.epOrgCode}}</div>
          </div>
          <div class='item-nav' v-if='authForm.epTaxCode'>
            <div class='item-label'>税务登记号</div>
            <div class='flex1'>{{authForm.epTaxCode}}</div>
          </div>
        </div>
        <div class='item-nav'>
          <div class='item-label'>营业地址</div>
          <div class='flex1 txt-ellipsis'>{{authForm.epAddress}}</div>
        </div>
        <div class='item-nav'>
          <div class='item-label'>经营范围</div>
          <div class='flex1'>{{authForm.epBusinessScope}}</div>
        </div>
        <div class='item-nav border-none'>
          <div class='item-label'>营业期限(止)</div>
          <div class='flex1'>{{authForm.epExpDate}}</div>
        </div>
      </div>
    </div>
    <div v-if='index===1'>
      <div class='title-bar'>法人身份信息</div>

      <!--<div class='box-padding bg-white rel img-box'>-->
        <!--<div class='upload-box'>-->
          <!--<div class='upload-box-info'>{{legalCertNames.frontName}}</div>-->
          <!--<img-show :src="legalCertNames.legalCertFrontPath" class='upload-img'></img-show>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class='box-padding bg-white rel img-box' v-if='legalCertNames.backName'>-->
        <!--<div class='upload-box'>-->
          <!--<div class='upload-box-info'>{{legalCertNames.backName}}</div>-->
          <!--<img-show :src="legalCertNames.legalCertBackPath" class='upload-img'></img-show>-->
        <!--</div>-->
      <!--</div>-->
      <div class='item-list'>
        <div class='item-nav'>
          <div class='item-label'>证件类型</div>
          <div class='flex1'>{{legalCertNames.name}}</div>
        </div>
        <div class='item-nav'>
          <div class='item-label'>姓名</div>
          <div class='flex1'>{{authForm.legalName}}</div>
        </div>
        <div class='item-nav'>
          <div class='item-label'>证件号码</div>
          <div class='flex1'>{{authForm.legalCertNo}}</div>
        </div>
        <div class='item-nav border-none'>
          <div class='item-label'>有效期限(止)</div>
          <div class='flex1'>{{authForm.legalCertExpDate}}</div>

        </div>
      </div>
      <div v-if='authForm.agentName'>
        <div class='title-bar'>
          <div>被授权人身份信息</div>
        </div>


        <!--<div class='box-padding bg-white rel img-box'>-->
        <!--<div class='upload-box'>-->
        <!--<div class='upload-box-info'>上传身份证头像页</div>-->
        <!--<img-show :src="authForm.agentCertFrontPath" class='upload-img'></img-show>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class='box-padding bg-white rel img-box'>-->
        <!--<div class='upload-box'>-->
        <!--<div class='upload-box-info'>上传身份证国徽页</div>-->
        <!--<img-show :src="authForm.legalCertFrontPath" class='upload-img'></img-show>-->
        <!--</div>-->
        <!--</div>-->
        <div class='item-list'>
          <div class='item-nav'>
            <div class='item-label'>姓名</div>
            <div class='flex1'>{{authForm.agentName}}</div>
          </div>
          <div class='item-nav'>
            <div class='item-label'>证件号码</div>
            <div class='flex1'>{{authForm.agentCertNo}}</div>
          </div>
          <div class='item-nav'>
            <div class='item-label'>有效期限(止)</div>
            <div class='flex1'>{{authForm.agentCertExpDate}}</div>
          </div>
        </div>

        <!--<div class='box-padding bg-white rel img-box'>-->
        <!--<div class='upload-box'>-->
        <!--<div class='upload-box-info'>已上传委托授权书</div>-->
        <!--<img-show :src="authForm.authLetterPath" class='upload-img'></img-show>-->
        <!--</div>-->
        <!--</div>-->
      </div>
      <div class='title-bar'>
        <div>联系人手机号</div>
      </div>
      <div class='item-list'>
        <div class='item-nav border-none'>
          <div class='item-label'>手机号</div>
          <div class='flex1'>{{authForm.mobileNo}}</div>
        </div>
      </div>



    </div>

  </wrapper-component>
</template>

<script>

  //  import router from './../../router/routers';
  import {Tab, TabItem} from 'vux'
  import imgShow from '../../components/base/ImgShow.vue';
  export default {
    components: {Tab, TabItem, imgShow},
    created: function () {
      this.$post('AUTH100003', this.authForm, data => {
        console.log('AUTH100003 ___');
        console.log(data);
        this.authForm = data.respData;
        [
          {name: "EP_SCCNO", key: 1, value: "统一社会信用代码类"},
          {name: "EP_BLICENSENO", key: 1, value: this.authForm.memberType === 'PERSON' ? "普通营业执照类" : "普通五证类"}
        ].forEach((item) => {
          console.log(item.value)
          console.log(this.authForm)
          if (item.name === this.authForm.epCertType) {
            this.authForm.epCertTypeName = item.value;
          }
        });
      }, resp => {
        this.$vux.toast.text('' + resp.msg, 'default')
      });
    },
    data () {
      return {
        disabled: false,
        authForm: {},
        index: 0,
        tagName:this.$UA().android?"scroller":"article"
      }
    },
    computed: {

      legalCertNames: function () {
        switch (this.authForm.legalCertType) {
          case "I_CARD":
          default:
            return {
                name:'中华人民共和国居民身份证',
              frontName: '已上传身份证头像页',
              backName: '已上传身份证国徽页',
              frontTitle: "已上传身份证头像页",
              backTitle: '已上传身份证国徽页',
              frontIcon: 'sfz-zm',
              backIcon: 'sfz-fm'
            };
          //          case "O_CERT": return {frontName: '军官证正面', BackName: '军官证反面',frontTitle:"",backTitle:''};
          case "PASSPORT":
            return {
              name:'护照',
              frontName: '已上传护照',
              backName: '',
              frontTitle: "已上传护照",
              backTitle: '',
              frontIcon: 'hz-zm',
              backIcon: ''
            };
          case "HK_M_PASS":
            return {
              name:'香港居民来往内地通行证',
              frontName: '已上传香港居民来往内地通行证正面',
              backName: '已上传香港居民来往内地通行证反面',
              frontTitle: "通行证正面案例背景",
              backTitle: '通行证反面案例背景',
              frontIcon: 'ga-zm',
              backIcon: 'ga-fz'
            };
          case "MC_PASS":
            return {
              name:'澳门居民来往内地通行证',
              frontName: '已上传澳门居民来往内地通行证正面',
              backName: '已上传台湾居民来往大陆通行证反面',
              frontTitle: "通行证正面案例背景",
              backTitle: '通行证反面案例背景',
              frontIcon: 'ga-zm',
              backIcon: 'ga-fz'
            };
          case "TW_PASS":
            return {
              name:'台湾居民来往大陆通行证',
              frontName: '已上传台湾居民来往大陆通行证正面',
              backName: '已上传澳门居民来往内地通行证反面',
              frontTitle: "通行证正面案例背景",
              backTitle: '通行证反面案例背景',
              frontIcon: 'tw-zm',
              backIcon: 'tw-fz'
            };
        }
      },
      epCertNoNLabeName: function () {
        switch (this.epCertType) {
          case "EP_BLICENSENO":
            return "注册码";
          case "其他":
            return "注册码";
          case "EP_SCCNO":
          default:
            return "统一社会信息代码";
        }
      },
    },
    methods: {
      onItemClick (index) {
        console.log('on item click:', index);
        this.index = index;
      },
      upload: function () {

      }
    }
  }
</script>
<style lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";
</style>
