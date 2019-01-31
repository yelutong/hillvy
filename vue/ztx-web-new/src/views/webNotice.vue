<!-- 首页路由 -->
<template>
  <div class="webNotice bg-white" v-if="showIndexFront=='PC'">
    <v-nav />
    <p><img :src="web" class="w100" /></p>
    <div class="companyContent w1000">
      <p class="center fs-25 bold mtb30 txt-black-real" v-text='$t("message.web.head1")'></p>
        <div class="mt40 risk3">
        <div class="mb40 pdlr100"">
         <el-row :gutter="24" class="mt10" type="flex" justify="space-between">
         <el-col :span="18">
           <p class="fs-14 mb10 h60 txt-black-real" v-text='$t("message.web.content1")'></p>
           <p class="fs-14 mb10 h60 txt-black-real" v-text='$t("message.web.content3")'></p>
         </el-col>
         <el-col :span="6">
           <p class="fs-14 mb10 h60 txt-right txt-black-real" v-text='$t("message.web.content2")'></p>
           <p class="fs-14 mb10 h60 txt-right txt-black-real" v-text='$t("message.web.content4")'></p>
         </el-col>
        </el-row>
        </div>
       </div>
    </div>
    <v-footer />
  </div>

  <div v-else class="webNoticeH5 bg-white">
    <v-nav />
    <p><img :src="web" class="w100" /></p>
    <div class="companyContent w100 pdlr30">
      <p class="center fs-40 bold mtb30 txt-black-real" v-text='$t("message.web.head1")'></p>
        <div class="mt40 risk3">
        <div class="mb40">
         <el-row :gutter="24" class="mt10" type="flex" justify="space-between">
         <el-col :span="16">
           <p class="fs-14 mb10 lh-30 txt-black-real" v-text='$t("message.web.content1")'></p>
           <p class="fs-14 mb10 lh-30 txt-black-real" v-text='$t("message.web.content3")'></p>
         </el-col>
         <el-col :span="8">
           <p class="fs-14 mb10 h60 txt-right txt-black-real" v-text='$t("message.web.content2")'></p>
           <p class="fs-14 mb10 h60 txt-right txt-black-real" v-text='$t("message.web.content4")'></p>
         </el-col>
        </el-row>
        </div>
       </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import vNav from "@/components/v-nav";
import vFooter from "@/components/v-footer";

export default {
  data() {
    return {
      web: require("../assets/images/web.png"),
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
.webNoticeH5{
  margin-top:120px;
}
.webNotice{
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
