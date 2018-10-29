<template>
  <article>
    <base-header title="银行卡" class="justify-content-space-around"/>
    <div>
      <div v-if='epMemberType==="PERSON"'>
        <div class='title-bar'>请选择银行账户类型</div>
        <div class='item-list'>
          <group-select label='银行账户类型' value='' option='accType' :list="accTypeOptions"
                        mutation='updateBankFrom'></group-select>
        </div>
      </div>
      <div class='title-bar'>请填写企业的银行卡信息</div>
      <div class='item-list'>
        <div class='item-nav'>
          <div class='item-label'>{{bankLabelName().label}}</div>
          <div class='flex1'>{{bankLabelName().name}}</div>
        </div>
        <!--<group-input :label='bankLabelName' :value='bankAdd.bankCardName' mutation='updateBankFrom'  readonly='readonly' placeholder='填写企业开户名称'-->
        <!--option='bankCardName'></group-input>-->
        <div class='item-nav' @click='suporttList()'>
          <div class='item-label'>开户银行</div>
          <div class='flex1'>{{openBankName}}</div>
          <div class='forward-arrow'></div>
        </div>
        <div v-if='addressList.length'>
          <group-address-pick :list='addressList' :placeholder='address'></group-address-pick>
        </div>
        <group-input label='开户支行' placeholder='如：深圳市科苑支行' :value='bankAdd.openBranchBankName' mutation='updateBankFrom'
                     option='openBranchBankName'></group-input>
        <group-input label='卡号' placeholder='请输入您的企业银行卡号' :value='bankAdd.bankCardNo' mutation='updateBankFrom'
                     option='bankCardNo'></group-input>
      </div>
      <div class='check-box vux-flexbox fs-26 lh-48 vux-flex-row'>
        <check-squarebox @updateValue="getSquareVal" :imAgree="sfAgreement"></check-squarebox>
        <span>阅读并同意</span><a @click='showAgreement()'> {{agreetmentName}}</a>
      </div>
      <div class='gray-box-txt' v-if='type === "add"'>
        稍后会打入一笔任意金额的款到该银行卡，验证您的卡正常使用，请收到后来回填金额确认。
      </div>
      <div class='box-padding sub-box-btn'>
        <x-button type="warn" class="login-btn" :disabled="btnSub" @click.native="next()">确认</x-button>
      </div>
    </div>
    <footer class='footer'>
      <div class='protect-icon'></div>
      <div>PICC人保财承保，为您的每一分钱保驾护航</div>
    </footer>

    <div v-transfer-dom>
      <popup v-model="showAgree" position="top" height='100%' should-scroll-top-on-show :show-mask='true'>
        <div value-align="left" class="content-box " v-if='type === "add"'>
          <div class='box-padding'>
            <p class="fs-24 txt-center bold txt-black lh-48">银行账户确认书</p>
            <p class="fs-24 txt-black lh-36  space-top indent">
              现确认以下银行账号信息为我司在贵公司办理相关业务的账户信息,如有变更,另向贵公司提交“银行账户信息确认变更函”。</p>
            <p class="fs-24 txt-black lh-36  space-top indent">银 行 户名: {{bankAdd.bankCardName}}</p>
            <p class="fs-24 txt-black lh-36  space-top indent">银 行 账号: {{bankAdd.bankCardNo}}</p>
            <p class="fs-24 txt-black lh-36  space-top indent">开 户 银行: {{openBankName}}</p>
            <p class="fs-24 txt-black lh-36  space-top indent">开户行行号: </p>
          </div>
          <div class=' sign-box'>
            <div>单位名称:</div>
            <div>(公章)</div>
            <div>法人签章:</div>
            <div>
              <pre>日   期:</pre>
            </div>
          </div>

        </div>
        <div value-align="left" class="content-box" v-if='type === "modify"'>
          <p class="fs-24 txt-center bold txt-black lh-48">顺丰恒通支付有限公司:</p>
          <p class="fs-24 txt-black lh-36  space-top txt-center">现对我司在贵公司办理相关业务的账户信息做以下变更:</p>
          <div style='padding:0 .2rem;'>
            <table class='table'>
              <tr>
                <td class='table-title'>会员号</td>
                <td>{{$getUserInfo().memberNo}}</td>
                <td class='table-title'>申请变更时间</td>
                <td>{{getDate}}</td>
              </tr>
              <tr>
                <td>注册手机号</td>
                <td>{{$getUserInfo().loginName}}</td>
                <td>会员名称</td>
                <td>{{$getUserInfo().memberName}}</td>
              </tr>
              <tr>
                <td class='table-title'>邮箱</td>
                <td colspan='3'></td>
              </tr>
              <tr>
                <td colspan='2' class='txt-center'>变更前</td>
                <td colspan='2' class='txt-center'>变更后</td>
              </tr>
              <tr>
                <td>账户名称</td>
                <td>{{bank.bankName}}</td>
                <td>账户名称</td>
                <td>{{bankAdd.bankCardName}}</td>
              </tr>
              <tr>
                <td>账户号</td>
                <td>{{bank.bankAcctNo}}</td>
                <td>账户号</td>
                <td>{{bankAdd.bankCardNo}}</td>
              </tr>
              <tr>
                <td>开户行</td>
                <td>{{bank.openBankName}}</td>
                <td>开户行</td>
                <td>{{openBankName}}</td>
              </tr>
              <tr>
                <td>开户行行号</td>
                <td></td>
                <td>开户行行号</td>
                <td></td>
              </tr>
              <tr>
                <td colspan='4'>
                  <div style='padding-top:.2rem;'></div>
                  以上变更是我司单方面提出的申请,贵司有权接受或拒绝。贵司 若接受我司以上变更申请并以系统设置变更方式予以体现,则视为我 司与贵司合作业务相关内容的补充或变更约定,若因以上变更事宜产
                  生的一切纠纷与损失,由我司承担全部责任!

                  <div class='box-padding'></div>


                  <div class='horizontal-view justify-content-end sign-box'>
                    <div>单位名称:</div>
                    <div>(公章)</div>
                    <div>法人签章:</div>
                    <div>
                      <pre>日   期:</pre>
                    </div>
                  </div>

                </td>
              </tr>
            </table>
          </div>

        </div>
        <div class="agreeBtn">
          <flexbox-item>
            <x-button @click.native="imAgreeVal" type="warn">我已阅读并同意</x-button>
          </flexbox-item>
        </div>
      </popup>
    </div>

  </article>
</template>
<script>

  import router from './../../router/routers';
  import GroupInput from  '../../components/base/GroupInput.vue';
  import GroupSelect from  '../../components/base/GroupSelect.vue';
  import GroupAddressPick from  '../../components/base/GroupAddressPick.vue';
  import {mapState} from 'vuex';
  let tips = {
    accType: "银行卡类型",
    openBankNo: "开户银行编号（银行代码）",
    openBankName: "开户银行名称",
    openBankProvinceCode: "开户银行省份编码",
    openBankProvinceName: "开户银行省份名称",
    openBankCityCode: "开户银行城市编码",
    openBankCityName: "开户银行城市名称",
    openBranchBankName: "开户行支行名称",
    bankCardNo: "卡号",
    bankCardName: "银行卡开户名称",
  };
  export default {
    components: {GroupInput, GroupSelect, GroupAddressPick},
    data () {
      return {
        epName: '',
        legalName: '',
        showAgree: false,
        disabled: false,
        addressList: [],
        sfAgreement: true,
//        bank: {},
        type: this.$route.params.type,
        agreetmentName: this.$route.params.type === 'add' ? '《银行账户确认书》' : "《银行卡变更确认书》"
      }
    },
    created () {
      if (this.$route.params.type === "modify"){
          document.title = "更换银行卡"
      } else {
        document.title = "添加银行"
      }

      this.$post('BANK100003', {}, data => {
//        console.log('BANK100003 data');
//        console.log(data);
        this.addressList = data.respData;
      });
      this.$post('AUTH100003', this.authForm, data => {
        this.epName = data.respData.epName;
        this.legalName = data.respData.legalName;
//            if(this.bankAdd.accType ==="0"){
//              this.$store.commit('updateBankFrom', {name: 'bankCardName', value:  this.epName});
//            }else{
//              this.$store.commit('updateBankFrom', {name: 'bankCardName', value: this.legalName});
//            }

      }, resp => {
        this.$vux.toast.text(resp.msg, 'default')
      });

      console.log("this.bank");
      console.log(this.bank);
    },
    computed: {
      getDate: function () {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        return year + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day);
      },
      epMemberType: function () {
        return this.$getUserInfo().epMemberType
      },

      address: function () {
//          console.log('this.bankAdd')
//          console.log(this.bankAdd)
        return this.bankAdd.address;
//        return this.bankAdd.openBankProvinceName||"" +  this.bankAdd.openBankCityName||"";
      },
      accTypeOptions: function () {
        return [{
          values: [
            {name: "0", value: "对公账户"},
            {name: "1", value: "对私账户"}
          ]
        }];//	String	"企业证件类型(营业执照：EP_BLICENSENO，统一社会信用代码：EP_SCCNO)"
      },
      openBankName: function () {
        return this.bankAdd.openBankName || "请选择"
      },
      btnSub: function () {
        if (!this.sfAgreement) {
          return true;
        }
        let showTexts = [];
        console.log(this.bankAdd)
        for (let i in this.bankAdd) {
          if (this.bankAdd[i] === "") {
            showTexts.push(tips[i]);
          }
        }
        if (showTexts.length) {
          return true;
        }
        return false;
      },

      ...mapState({
        bankAdd: state => state.bankAdd,
        bank: state => state.bankSelect.bank
      })
    },
    methods: {
      bankLabelName: function () {
        let obj = {};
        if (this.bankAdd.accType === "0") {
          obj.label = "企业开户名称";
          obj.name = this.epName;
        } else {
          obj.label = "法人姓名";
          obj.name = this.legalName;
        }
        this.$store.commit('updateBankFrom', {name: 'bankCardName', value: obj.name});
//        return this.bankAdd.accType === "0" ? "企业开户名称" : "法人姓名"
        return obj;
      },
      imAgreeVal: function () {
        this.showAgree = false;
      },
      showAgreement: function () {
        console.log('showAgreement');
        console.log(this.type);
        this.showAgree = true;
      },
      getSquareVal (val) {
        if (!val) {
          this.sfAgreement = false
        } else {
          this.sfAgreement = true
        }
      },
      suporttList: function () {
        router.push('/bank/bankInfo/bankSuport/' + this.type);
      },
      next: function () {
        if (!this.sfAgreement) {
          this.$vux.toast.text('请确认阅读并同意《银行账户确认书》');
        }
        let showTexts = [];
        for (let i in this.bankAdd) {
          if (this.bankAdd[i] === "") {
            showTexts.push(tips[i]);
          }
        }

        if (showTexts.length) {
          this.$vux.toast.text('请确定填写：' + showTexts.join(" "));
          return;
        }
        console.log(this.bankAdd);
        let txtCode = 'BANK200001';
        if (this.type === "modify") {
          txtCode = 'BANK200003';
        }
        this.$post(txtCode, this.bankAdd, data => {
          router.push('/bank/over/bankResult');
        }, resp => {
          this.$vux.toast.text('提交失败' + resp.msg, 'default')
        });

//        router.push('/')
      }
    }
  }
</script>
<style lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";
  @import "Bank.scss";
  @import "BankInfo.scss";

</style>
