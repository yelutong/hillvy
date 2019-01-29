<template>
  <div class="footer relative">
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
       <span><img :src="footerNav1" /></span>
       <span><img :src="footerNav2" /></span>
       <span><img :src="footerNav3" /></span>
       <span><img :src="footerNav4" /></span>
   </div>
   <p class="footerTips center fs-14 lh-24">©Copyright©2017 All Right Reserved by PT Kredit Plus Teknologi</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bottomBg: require("../assets/images/bottomBg@2x.png"),
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
   
  }
}
</script>
<style lang="stylus">
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