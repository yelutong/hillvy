<!-- 首页路由 -->
<template>
  <div class="howItWork bg-white" v-if="showIndexFront=='PC'">
    <v-nav />
    <p><img :src="howItWork1" class="w100" /></p>
    <div class="companyContent w1000">
      <p class="center fs-25 bold mtb30 txt-black-real" v-text='$t("message.howItWork.head1")'></p>
      <p class="indent2 fs-14 lh-24 pdlr100" v-text='$t("message.howItWork.content1")' ></p>
      <p class="pdtb30"><img :src="showWhatPic" v-model="showWhatPic2" class="w100 pdlr100" /></p> 
      <div class="pdlr100 howItWork3">
      <p class="fs-18 mb5 bold txt-black-real" v-text='$t("message.howItWork.head2")' ></p>
      <p class="fs-14 lh-24" v-text='$t("message.howItWork.content2")' ></p>
      <p class="fs-14 lh-24  mt5" v-text='$t("message.howItWork.content3")' ></p>
      <p class="fs-18 mt10 mb5 bold txt-black-real" v-text='$t("message.howItWork.head3")' ></p>
      <p class="fs-14 lh-24" v-text='$t("message.howItWork.content4")' ></p>
      <p class="fs-18 mt10 mb5 bold txt-black-real" v-text='$t("message.howItWork.head4")'></p>
      <p class="fs-14 lh-24" v-text='$t("message.howItWork.content5")' ></p>
      <p class="fs-18 mt10 mb5 bold txt-black-real" v-text='$t("message.howItWork.head5")'></p>
      <p class="fs-14 lh-24" v-text='$t("message.howItWork.content6")' ></p>
      <p class="horizontal-view mt10"><span>1.</span><span>{{$t("message.howItWork.content7")}}</span></p>
      <p class="horizontal-view"><span>2.</span><span>{{$t("message.howItWork.content8")}}</span></p>
      <p class="horizontal-view"><span>3.</span><span>{{$t("message.howItWork.content9")}}</span></p>
      <p class="horizontal-view"><span>4.</span><span>{{$t("message.howItWork.content10")}}</span></p>
      <p class="fs-18 mt10 mb5 bold txt-black-real" v-text='$t("message.howItWork.head6")'></p>
      <p class="fs-14 lh-24 mb40" v-text='$t("message.howItWork.content11")' ></p>
      </div>
    </div>
    <v-footer />
  </div>

  <div v-else class="bg-white howItWorkH5">
    <v-nav />
    <p><img :src="howItWork1" class="w100" /></p>
    <div class="howH5 w100">
      <p class="center fs-40 bold mtb30 txt-black-real" v-text='$t("message.howItWork.head1")'></p>
      <p class="indent2 fs-24 lh-36" v-text='$t("message.howItWork.content1")' ></p>
      <p class="pdtb30"><img :src="showWhatPic" v-model="showWhatPic2" class="w100" /></p> 
      <div class="howItWork3">
      <p class="fs-28 mb20 bold txt-black-real" v-text='$t("message.howItWork.head2")' ></p>
      <p class="fs-24 lh-36" v-text='$t("message.howItWork.content2")' ></p>
      <p class="fs-24 lh-36 mt10" v-text='$t("message.howItWork.content3")' ></p>
      <p class="fs-28 mt20 mb20 bold txt-black-real" v-text='$t("message.howItWork.head3")' ></p>
      <p class="fs-24 lh-36" v-text='$t("message.howItWork.content4")' ></p>
      <p class="fs-28 mt20 mb20 bold txt-black-real" v-text='$t("message.howItWork.head4")'></p>
      <p class="fs-24 lh-36" v-text='$t("message.howItWork.content5")' ></p>
      <p class="fs-28 mt20 mb20 bold txt-black-real" v-text='$t("message.howItWork.head5")'></p>
      <p class="fs-24 lh-36" v-text='$t("message.howItWork.content6")' ></p>
      <p class="horizontal-view mt20"><span>1.</span><span>{{$t("message.howItWork.content7")}}</span></p>
      <p class="horizontal-view"><span>2.</span><span>{{$t("message.howItWork.content8")}}</span></p>
      <p class="horizontal-view"><span>3.</span><span>{{$t("message.howItWork.content9")}}</span></p>
      <p class="horizontal-view"><span>4.</span><span>{{$t("message.howItWork.content10")}}</span></p>
      <p class="fs-28 mt20 mb20 bold txt-black-real" v-text='$t("message.howItWork.head6")'></p>
      <p class="fs-24 lh-36 mb40" v-text='$t("message.howItWork.content11")' ></p>
      </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import vNav from "@/components/v-nav";
import vFooter from "@/components/v-footer";
import howItWork2 from "../assets/images/howItWork2.png";
import howItWork3 from "../assets/images/howItWork3.png";
export default {
  data() {
    return {
      howItWork1: require("../assets/images/howItWork1.png"),
      showIndexFront: this.getShowIndex(),
      showWhatPic: ''
    };
  },
  components: {
    "v-nav": vNav,
    "v-footer": vFooter,
  },
  computed:{
    showWhatPic2(){
      if(this.$i18n.locale=='end'){
        this.showWhatPic = howItWork2;
      }else{
        this.showWhatPic = howItWork3;
      }
    }
  },
  beforeCreate() {
    document.title = "PT. Kredit Plus Teknologi —— pinjam gampang";
  },
  created() {
    
  },
  watch: {
    
  },
  methods: {
    
  }
};
</script> 
<style lang="stylus">
.howItWorkH5{
  margin-top:120px;
  .howH5{
    padding:0 30px;
  }
  .howItWork3 p span {
    font-size: 24px;
    line-height: 36px;
  }
  .howItWork3 p span:nth-child(1) {
    margin-right:10px;
    padding-left:10px;
  }
}
.howItWork{
  .video{
    width:640px;
    width:480px;
  }
  .howItWork3 p span{
    font-size:14px;
    line-height:24px;
  }
  .howItWork3 p span:nth-child(1){
   margin-right: 0.05rem;
   width:20px;
   text-align:right;
  }
}
</style>
