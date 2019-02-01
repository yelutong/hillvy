<!-- 首页路由 -->
<template>
  <div class="webNotice bg-white" v-if="showIndexFront=='PC'">
    <v-nav />
    <p><img :src="web" class="w100" /></p>
    <div class="companyContent w1000">
      <p class="center fs-25 bold mtb30 txt-black-real" v-text='$t("message.web.head1")'></p>
        <div class="mt40 risk3">
        <div class="mb40 pdlr100"">
           <div class="vux-1px-b">
           <div @click="webOpen('webList1')" class="justify-content-space-between pointer">
            <p class="fs-14 mb10 h60 txt-blue" v-text='$t("message.web.content1")'></p>
            <p class="fs-14 mb10 h60 txt-right txt-blue1" v-text='$t("message.web.content2")'></p>
           </div>
             <div class="hide webList1 weblist">
               <p class="bold fs-16 txt-black-real">Pelanggan yang terhormat:</p>
               <p class="fs-14 mt5">Dengan ini kami sampaikan informasi tentang Libur Hari Raya Kemerdekaan Republik Indonesia yang ke 73 sebagai berikut:</p>
               <p class="fs-14 mt5 indent10 txt-black1">17 Agustus 2018 adalah libur nasional Hari Raya Kemerdekaan. Selama hari tersebut, proses persetujuan dan peminjaman serta hotline Layanan Pelanggan tidak beroperasi.</p>
               <p class="fs-14 mt5 indent10 txt-black1">Jika tanggal jatuh tempo pembayaran anda berada dalam periode ini, mohon siapkan dana lebih awal agar tidak menpengaruhi risiko pinjaman anda.</p>
             </div>
           </div>

           <div class="vux-1px-b">
           <div class="justify-content-space-between pointer" @click="webOpen('webList2')">
           <p class="fs-14 mb10 h60 txt-blue" v-text='$t("message.web.content3")'></p>
           <p class="fs-14 mb10 h60 txt-right txt-blue1" v-text='$t("message.web.content4")'></p>
           </div>
           <div class="hide webList2 weblist">
               <p class="bold fs-16 txt-black-real">Pelanggan yang terhormat:</p>
               <p class="fs-14 mt5">Idul Fitri akan segera tiba, dengan ini pengaturan jadwal libur kerja di perusahaan kami adalah sebagai berikut:</p>
               <p class="fs-14 mt5 indent10 txt-black1">11 Juni 2018 hingga 20 Juni 2018 adalah hari libur cuti bersama. Selama libur tersebut, proses persetujuan dan peminjaman serta hotline layanan pelanggan tidak beroperasi. Operasi normal akan dimulai pada tanggal 21 Juni 2018. Silakan mengatur jadwal pengajuan pinjaman dan komunikasi dengan sebaik mungkin.</p>
               <p class="fs-14 mt5 indent10 txt-black1">Jika tanggal jatuh tempo pembayaran pinjaman Anda berada dalam periode ini, harap mengatur pembayaran terlebih dahulu agar tidak mempengaruhi risiko pinjaman Anda</p>
             </div>
           </div>
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
      showIndexFront: this.getShowIndex()
    };
  },
  components: {
    "v-nav": vNav,
    "v-footer": vFooter,
    
  },
  computed:{
    
  },
  beforeCreate() {
    document.title = "Pinjam Gampang － PT. Kredit Plus Teknologi";
  },
  created() {
    
  },
  watch: {
    
  },
  methods: {
    webOpen(val){
      if(val=='webList1'){
       let arr1 = document.getElementsByClassName("webList1");
       arr1[0].classList.toggle('active');
      }else if(val=='webList2'){
       let arr2 = document.getElementsByClassName("webList2");
       arr2[0].classList.toggle('active');
      }
    }
  }
};
</script> 
<style lang="stylus">
.webNoticeH5{
  margin-top:120px;
}
.webNotice{
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
  .weblist.active{
    display:block!important;
  }
}
</style>
