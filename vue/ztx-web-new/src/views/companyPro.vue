<!-- 首页路由 -->
<template>
  <div class="companyPro bg-white" v-if="showIndexFront=='PC'">
    <v-nav />
    <p><img :src="companyPic" class="w100" /></p>
    <div class="companyContent w1000">
      <p class="center fs-25 bold mtb30 txt-black-real" v-text='$t("message.companyPro.head1")'></p>
      <p class="indent2 fs-14 lh-24 txt-justify" v-text='$t("message.companyPro.content3")' ></p>
      <p class="center fs-25 bold mtb30 txt-black-real" v-text='$t("message.companyPro.head2")' ></p>
      <p class="indent2 fs-14 lh-24 txt-justify" v-text='$t("message.companyPro.content4")' ></p>
      <p class="indent2 fs-14 lh-24 txt-justify mt10" v-text='$t("message.companyPro.content5")' ></p>
      <p class="indent2 fs-14 lh-24 txt-justify mt10" v-text='$t("message.companyPro.content6")' ></p>
       <p class="center fs-25 bold mtb30 txt-black-real" v-text='$t("message.companyPro.head3")'></p>
       <div class="center pdb50">
        <video v-if="!myVideoShow" class="video pointer" :src="myVideo" controls :poster="poster"></video>
        <iframe v-else width="560" height="315" src="https://www.youtube.com/embed/0Xzi2G8Ji9Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       </div>
    </div>
    <div class="companyBottom relative">
    <p class="companyPic1"><img :src="companyPic1" class="w100" /></p>
    <div class="companyCon">
      <p class="center fs-25 h60 bold" v-text='$t("message.companyPro.content1")'></p>
      <p class="center fs-25 bold" v-text='$t("message.companyPro.content2")'></p>
      <p class="companyPic2 mt50 pointer" @click="download"><img :src="googleplay" /></p>
    </div>
    </div>
    <v-footer />
  </div>

  <div v-else class="bg-white companyProH5">
     <v-nav />
     <p class="pdlr30"><img :src="companyPicH5" class="w100" /></p>
    <div class="companyConH5 w100 pdlr30">
      <div class="companyContent w100">
      <p class="center fs-40 bold mtb30 txt-black-real" v-text='$t("message.companyPro.head1")'></p>
      <p class="indent2 fs-24 lh-36" v-text='$t("message.companyPro.content3")' ></p>
      <p class="center fs-40 bold mtb30 txt-black-real" v-text='$t("message.companyPro.head2")' ></p>
      <p class="indent2 fs-24 lh-36" v-text='$t("message.companyPro.content4")' ></p>
      <p class="indent2 fs-24 lh-36  mt10" v-text='$t("message.companyPro.content5")' ></p>
      <p class="indent2 fs-24 lh-36  mt10" v-text='$t("message.companyPro.content6")' ></p>
       <p class="center fs-40 bold mtb30 txt-black-real" v-text='$t("message.companyPro.head3")'></p>
       <div class="center pdb50">
         <video v-if="!myVideoShow" class="video-source video w100" style="object-fit:fill" webkit-playsinline="true" playsinline="true"  x5-video-player-type="h5" x5-video-orientation="h5" x5-video-player-fullscreen="true" preload="auto" :src="myVideo" controls :poster="poster"></video>
         <iframe v-else class="w100 video" height="315" src="https://www.youtube.com/embed/0Xzi2G8Ji9Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       </div>
    </div>
    </div>
    <div class="companyBottom relative">
      <p class="companyPic1 fs-0"><img :src="companyPic1" class="w100" /></p>
      <div class="companyCon">
        <p class="center fs-25 h45 bold" v-text='$t("message.companyPro.content1")'></p>
        <p class="center fs-25 bold" v-text='$t("message.companyPro.content2")'></p>
        <p class="companyPic2 mt30 center" @click="download"><img :src="googleplay" /></p>
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
      poster: require("../assets/images/video.png"),
      companyPic: require("../assets/images/companyPic.png"),
      companyPicH5: require("../assets/images/conpanyPicH5@2x.png"),
      companyPic1: require("../assets/images/dowmLoad@2x.png"),
      googleplay: require("../assets/images/googleplay@2x.png"),
      myVideo: require("../assets/images/company.mp4"),
      showIndexFront: this.getShowIndex(),
      myVideoShow:false
    };
  },
  components: {
    "v-nav": vNav,
    "v-footer": vFooter,
    
  },
  computed:{
    
  },
  beforeCreate() {
    document.title = "Pinjam Gampang - PT. Kredit Plus Teknologi";
  },
  created() {
    this.$axios.get(
      'https://ipapi.co/json/' 
      ).then(res => {
         console.log(res);
         if(res.status == 200 && res.data && res.data.country){
           if(res.data.country != 'CN'){
             this.myVideoShow = true;
           }
         }
      })
      .catch(res => {
       
      });
  },
  watch: {
    
  },
  methods: {
    download(){
      window.open('https://play.google.com/store/apps/details?id=com.kpt.android&hl=id-ID');
    }
  }
};
</script> 
<style lang="stylus">
.companyProH5{
  margin-top: 120px;
  .companyCon {
    position: absolute;
    top: 2px;
    width: 100%;
    left: 0;
 }
 .companyPic2 img {
    height: 46px;
    margin-left:-140px;
 }
 .indent2{
    text-align: justify;
 }
}
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
    width:560px;
  }
}
</style>
