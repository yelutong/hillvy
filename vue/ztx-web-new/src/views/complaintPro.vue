<!-- 首页路由 -->
<template>
  <div class="complaintPro bg-white" v-if="showIndexFront=='PC'">
    <v-nav />
    <p><img :src="web" class="w100" /></p>
    <div class="complaintPro3 w1000 pdlr100">
      <p class="center fs-25 bold mtb30 txt-black-real" v-text='$t("message.complaintPro.head1")'></p>
      <p class="indent2 fs-14 lh-24" v-text='$t("message.complaintPro.con1")' ></p>
      <p class="center fs-25 bold mtb30 txt-black-real" v-text='$t("message.complaintPro.head2")'></p>
      <p class="horizontal-view mt10"><span>1.</span><span>{{$t("message.complaintPro.con2")}}</span></p>
      <p class="horizontal-view mt10"><span>2.</span><span>
      {{$t("message.complaintPro.con3")}}<br/>
      {{$t("message.complaintPro.con4")}}<br/>
      {{$t("message.complaintPro.con5")}}<br/>
      </span></p>
      <p class="horizontal-view mt10"><span>3.</span><span>{{$t("message.complaintPro.con6")}}</span></p>
      <p class="pdtb30"><img :src="showWhatPic" v-model="showWhatPic2" class="w100" /></p> 
    </div>
    <v-footer />
  </div>

  <div v-else class="compProH5 bg-white">
    <v-nav />
    <p><img :src="web" class="w100" /></p>
    <div class="complaintPro3 w100 pdlr30">
      <p class="center fs-40 bold mtb30 txt-black-real" v-text='$t("message.complaintPro.head1")'></p>
      <p class="indent2 fs-24 lh-36" v-text='$t("message.complaintPro.con1")' ></p>
      <p class="center fs-40 bold mtb30 txt-black-real" v-text='$t("message.complaintPro.head2")'></p>
      <p class="horizontal-view mt10"><span>1.</span><span>{{$t("message.complaintPro.con2")}}</span></p>
      <p class="horizontal-view mt10"><span>2.</span><span>
      {{$t("message.complaintPro.con3")}}<br/>
      {{$t("message.complaintPro.con4")}}<br/>
      {{$t("message.complaintPro.con5")}}<br/>
      </span></p>
      <p class="horizontal-view mt20"><span>3.</span><span>{{$t("message.complaintPro.con6")}}</span></p>
      <p class="pdtb30"><img :src="showWhatPic" v-model="showWhatPic2" class="w100" /></p> 
    </div>
    <v-footer />
  </div>
</template>

<script>
import vNav from "@/components/v-nav";
import vFooter from "@/components/v-footer";
import complaintPro2 from "../assets/images/pro1.png";
import complaintPro3 from "../assets/images/pro2.png";
import complaintPro4 from "../assets/images/pro4.png";
import complaintPro5 from "../assets/images/pro5.png";
export default {
  data() {
    return {
      web: require("../assets/images/web.png"),
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
        if(this.showIndexFront=='PC'){
          this.showWhatPic = complaintPro2;
        }else{
          this.showWhatPic = complaintPro4;
        }
      }else{
        if(this.showIndexFront=='PC'){
          this.showWhatPic = complaintPro3;
        }else{
          this.showWhatPic = complaintPro5;
        }
      }
    }
  },
  beforeCreate() {
    document.title = "Pinjam Gampang － PT. Kredit Plus Teknologi";
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
.compProH5{
  margin-top:120px;
  .complaintPro3 p span {
    font-size: 24px;
    line-height: 36px;
  }
  .complaintPro3 p span:nth-child(1) {
    margin-right: 10px;
  }
}
.complaintPro{
  .complaintPro3 p span{
    font-size:14px;
    line-height:24px;
  }
  .complaintPro3 p span:nth-child(1){
   margin-right: 5px;
   width:20px;
  }
}
</style>
