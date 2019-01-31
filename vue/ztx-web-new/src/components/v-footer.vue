<template>
  <div class="footer relative" v-if="showIndexFront=='PC'">
   <p class="bottomBg"><img class="w100" :src="bottomBg" /></p>
   <div class="footerContent">
     <el-row :gutter="24" class="mt10" type="flex" justify="space-between">
       <el-col :span="8">
        <p><img class="logo" :src="footerLogo" /></p>
        <p class="fs-14 mt10 txt-black-real">{{$t("message.index.con7to1")}}</p>
        <p class="fs-12 mt10 txt-black-real">Unit A&F, 1st Floor, </p>
        <p class="fs-12 txt-black-real">The Prominence Office Tower </p>
        <p class="fs-12 txt-black-real">Jl. Jalur Sutera Barat </p>
        <p class="fs-12 txt-black-real">No.15, Alam Sutera</p>
       </el-col>
        <el-col :span="8">
         <p class="fs-18 mt10 txt-black-real">{{$t("message.index.con7to2")}}</p>
         <p class="fs-14 mt30 txt-black-real">{{$t("message.index.con7to3")}}</p>
         <p class="fs-12 txt-black-real">marketing@kreditplusteknologi.id</p>
       </el-col>
        <el-col :span="8">
          <p class="fs-14 mt50 txt-black-real">Customer Service</p>
          <p class="fs-12 mt10 txt-black-real">Tel: (021) 3003 3358 </p>
          <p class="fs-12 txt-black-real">Email: kpt@kreditplusteknologi.id</p>
          <p class="fs-12 txt-black-real">{{$t("message.index.con7to4")}}</p>
          <p class="fs-12 txt-black-real">{{$t("message.index.con7to5")}}</p>
        </el-col>
    </el-row>
   </div>
   <div class="center bottomPhoto">
       <span @click="goLink('fb')" class="pointer"><img :src="footerNav1" /></span>
       <span @click="goLink('ins')" class="pointer"><img :src="footerNav2" /></span>
       <span @click="goLink('link')" class="pointer"><img :src="footerNav3" /></span>
       <span @click="goLink('google')" class="pointer"><img :src="footerNav4" /></span>
   </div>
   <p class="footerTips center fs-14 lh-24">©Copyright©2017 All Right Reserved by PT Kredit Plus Teknologi</p>
  </div>

  <div class="footerH5 relative" v-else>
    <p class="bottomBgH5"><img class="w100" :src="bottomBgH5" /></p>
    <div class="contentH5">
      <div class="justify-content-space-between w100 footerH5Logo">
        <span><img class="logo" :src="footerLogo" /></span>
        <span @click="goLink('google')"><img :src="footerNav4" /></span>
      </div>
      <div class="contentH5List">
        <p class="fs-32 mt30 txt-black-real">{{$t("message.index.con7to2")}}</p>
        <p class="fs-28 mt30 txt-black-real">{{$t("message.index.con7to1")}}</p>
        <p class="fs-24 mt30 txt-black-real">Unit A&F, 1st Floor, The Prominence Office Tower </p>
        <p class="fs-12 mt10 txt-black-real">Jl. Jalur Sutera Barat No.15, Alam Sutera</p>
        
        <p class="fs-28 mt30 txt-black-real">{{$t("message.index.con7to3")}}</p>
        <p class="fs-24 mt30 txt-black-real">marketing@kreditplusteknologi.id</p>

        <p class="fs-28 mt30 txt-black-real">Customer Service</p>
        <p class="fs-24 mt30 txt-black-real">Tel: (021) 3003 3358 </p>
        <p class="fs-24 mt10 txt-black-real">Email: kpt@kreditplusteknologi.id</p>
        <p class="fs-24 mt10 txt-black-real">{{$t("message.index.con7to4")}} {{$t("message.index.con7to5")}}</p>
        <div class="center bottomPhoto mt20">
         <span @click="goLink('fb')" class="pointer"><img :src="footerNav1" /></span>
         <span @click="goLink('ins')" class="pointer"><img :src="footerNav2" /></span>
         <span @click="goLink('link')" class="pointer"><img :src="footerNav3" /></span>
        </div>
      </div>
      <div class="footerTips center lh-40"><p>©Copyright©2017 All Right Reserved by PT Kredit Plus Teknologi</p></div>
   </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showIndexFront: this.getShowIndex(),
      bottomBg: require("../assets/images/bottomBg@2x.png"),
      bottomBgH5: require("../assets/images/bottomBgH5.png"),
      footerLogo: require("../assets/images/logo@2x.png"),
      footerNav1: require("../assets/images/fb@2x.png"),
      footerNav2: require("../assets/images/ig@2x.png"),
      footerNav3: require("../assets/images/in@2x.png"),
      footerNav4: require("../assets/images/googleplay@2x.png"),
    };
  },
  components: {
    
  },
  methods: {
    goLink(val){
     switch (val) {
      case 'fb':
      window.open('https://www.facebook.com/Pinjam-Gampang-171945557005609/');
      break;
      case 'ins':
      window.open('https://www.instagram.com/pinjamgampang/');
      break;
      case 'link':
      window.open('https://www.linkedin.com/company/pt-kredit-plus-teknologi/');
      break;
      default:
      window.open('https://play.google.com/store/apps/details?id=com.kpt.android&hl=id-ID');
     }
    }
  }
}
</script>
<style lang="stylus">
.footerH5{
  .contentH5{
    position:absolute;
    top:30px;
    width:100%;
  }
  .footerH5Logo{
    padding:0 60px;
  }
  .contentH5List{
    padding:0 60px;
  }
  .footerH5Logo span:nth-child(1) img{
   height:60px;
  }
  .footerH5Logo span:nth-child(2) img{
   height:46px;
   margin-top:7px;
  }
  .bottomPhoto span img {
    height: 50px;
    margin: 10px;
  }
  .footerTips{
    background: #231f20;
    height: 50px;
    margin-top: -1px;
  }
  .footerTips p{
    color: #ccc;
    width:200%;
    line-height: 50px;
    font-size:40px;
    display: inline-block;
    -webkit-transform-origin-x:0%;
    -webkit-transform: scale(0.50);
    transform: scale(0.50);
  }
}
.footer {
  .footerTips{
    background:#231f20;
    height:25px;
    color:#ccc;
    margin-top:-1px;
  }
  .bottomBg{
    font-size:0!important;
    line-height:0!important;
  }
  .footerContent{
    padding:10px 120px;
    position:absolute;
    top:0;
    left:50%;
    width:1000px;
    margin-left:-500px;
  }
  .logo{
    height:40px;
  }
  .bottomPhoto{
    position:absolute;
    bottom:45px;
    left:50%;
    margin-left:-125px;
  }
  .bottomPhoto span img{
    height:30px;
    margin:0 6px;
  }
}
</style>