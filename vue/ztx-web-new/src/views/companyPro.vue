<!-- 首页路由 -->
<template>
  <div class="companyPro bg-white" v-if="showIndexFront=='PC'">
    <v-nav />
    <p><img :src="companyPic" class="w100" /></p>
    <div class="companyContent w1000">
      <p class="center fs-25 bold mtb30 txt-black-real" v-text='$t("message.companyPro.head1")'></p>
      <p class="indent2 fs-14 lh24" v-text='$t("message.companyPro.content3")' ></p>
      <p class="center fs-25 bold mtb30 txt-black-real" v-text='$t("message.companyPro.head2")' ></p>
      <p class="indent2 fs-14 lh24" v-text='$t("message.companyPro.content4")' ></p>
      <p class="indent2 fs-14 lh24  mt10" v-text='$t("message.companyPro.content5")' ></p>
      <p class="indent2 fs-14 lh24  mt10" v-text='$t("message.companyPro.content6")' ></p>
       <p class="center fs-25 bold mtb30 txt-black-real" v-text='$t("message.companyPro.head3")'></p>
       <div class="center pdb50">
         <video class="video"  @play="playVideo($event)" :src="videoData" controls></video>
       </div>
    </div>
    <div class="companyBottom relative">
    <p class="companyPic1"><img :src="companyPic1" class="w100" /></p>
    <div class="companyCon">
      <p class="center fs-25 h60 bold" v-text='$t("message.companyPro.content1")'></p>
      <p class="center fs-25 bold" v-text='$t("message.companyPro.content2")'></p>
      <p class="companyPic2 mt50"><img :src="googleplay" /></p>
    </div>
    </div>
    <v-footer />
  </div>

  <div v-else>
    H5正在开发中...
  </div>
</template>

<script>
import vNav from "@/components/v-nav";
import vFooter from "@/components/v-footer";

export default {
  data() {
    return {
      companyPic: require("../assets/images/companyPic.png"),
      companyPic1: require("../assets/images/dowmLoad@2x.png"),
      googleplay: require("../assets/images/googleplay@2x.png"),
      showIndexFront: this.getShowIndex(),
      videoData: require("../assets/images/company.mp4")
    };
  },
  components: {
    "v-nav": vNav,
    "v-footer": vFooter,
    
  },
  computed:{
    
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
.companyPro{
  .companyPic1{
    font-size:0!important;
    line-height:0!important;
    margin-bottom:-2px;
  }
  .companyCon{
    position:absolute;
    top:20px;
    width:400px;
    left:50%;
    margin-left:-200px;
  }
  .companyPic2 img{
    height:54px;
  }
  .video{
    width:640px;
    width:480px;
  }
}
</style>
