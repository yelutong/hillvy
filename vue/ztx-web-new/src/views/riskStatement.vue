<!-- 首页路由 -->
<template>
  <div class="riskStatement bg-white" v-if="showIndexFront=='PC'">
    <v-nav />
    <p><img :src="risk1" class="w100" /></p>
    <div class="companyContent w1000 pdlr100">
      <p class="center fs-25 bold mtb30 txt-black-real" v-text='$t("message.risk.head1")'></p>
      <p class="fs-18 mb10 tips"><img :src="risk2" /></p>
      <p class="fs-18 mb5 txt-black-real" v-text='$t("message.risk.head2")' ></p>
      <div class="risk3">
      <p class="horizontal-view mt10"><span>1.</span><span>{{$t("message.risk.con1")}}</span></p>
      <p class="horizontal-view"><span>2.</span><span>{{$t("message.risk.con2")}}</span></p>
      <p class="horizontal-view"><span>3.</span><span>{{$t("message.risk.con3")}}</span></p>
      <p class="horizontal-view"><span>4.</span><span>{{$t("message.risk.con4")}}</span></p>
      <p class="horizontal-view"><span>5.</span><span>{{$t("message.risk.con5")}}</span></p>
      <p class="horizontal-view"><span>6.</span><span>{{$t("message.risk.con6")}}</span></p>
      <p class="horizontal-view"><span>7.</span><span>{{$t("message.risk.con7")}}</span></p>
      <p class="horizontal-view"><span>8.</span><span>{{$t("message.risk.con8")}}</span></p>
      <p class="horizontal-view"><span>9.</span><span>{{$t("message.risk.con9")}}</span></p>
      </div>
      <div class="mt40 risk3">
        <div class="mb40">
         <el-row :gutter="24" class="mt10" type="flex" justify="space-between">
         <el-col :span="12">
           <p class="fs-18 mb10 txt-black-real" v-text='$t("message.risk.head3")'></p>
           <p class="horizontal-view mt20"><span>1.</span><span>{{$t("message.risk.content10")}}</span></p>
           <p class="horizontal-view"><span>2.</span><span>{{$t("message.risk.content11")}}</span></p>
           <p class="horizontal-view"><span>3.</span><span>{{$t("message.risk.content12")}}</span></p>
           <p class="horizontal-view"><span>4.</span><span>{{$t("message.risk.content13")}}</span></p>
           <p class="horizontal-view"><span>5.</span><span>{{$t("message.risk.content14")}}</span></p>
           <p class="horizontal-view"><span>6.</span><span>{{$t("message.risk.content15")}}</span></p>
          </el-col>
          <el-col :span="12">
            <p class="fs-18 mb10 txt-black-real" v-text='$t("message.risk.head4")'></p>
             <p class="horizontal-view mt20"><span>1.</span><span>{{$t("message.risk.content16")}}</span></p>
             <p class="horizontal-view"><span>2.</span><span>{{$t("message.risk.content17")}}</span></p>
             <p class="horizontal-view"><span>3.</span><span>{{$t("message.risk.content18")}}</span></p>
             <p class="horizontal-view"><span>4.</span><span>{{$t("message.risk.content19")}}</span></p>
             <p class="horizontal-view"><span>5.</span><span>{{$t("message.risk.content20")}}</span></p>
             <p class="horizontal-view"><span>6.</span><span>{{$t("message.risk.content21")}}</span></p>
          </el-col>
        </el-row>
        </div>
      </div>
    </div>
    <v-footer />
  </div>

  <div v-else class="riskH5 bg-white">
    <v-nav />
    <p><img :src="risk1" class="w100" /></p>
    <div class="companyContent w100 pdlr30">
      <p class="center fs-40 bold mtb30 txt-black-real" v-text='$t("message.risk.head1")'></p>
      <p class="fs-28 mb10 tips"><img :src="risk2" /></p>
      <p class="fs-28 mb10 center txt-black-real" v-text='$t("message.risk.head2")' ></p>
      <div class="risk3">
      <p class="horizontal-view mt20"><span>1.</span><span>{{$t("message.risk.con1")}}</span></p>
      <p class="horizontal-view"><span>2.</span><span>{{$t("message.risk.con2")}}</span></p>
      <p class="horizontal-view"><span>3.</span><span>{{$t("message.risk.con3")}}</span></p>
      <p class="horizontal-view"><span>4.</span><span>{{$t("message.risk.con4")}}</span></p>
      <p class="horizontal-view"><span>5.</span><span>{{$t("message.risk.con5")}}</span></p>
      <p class="horizontal-view"><span>6.</span><span>{{$t("message.risk.con6")}}</span></p>
      <p class="horizontal-view"><span>7.</span><span>{{$t("message.risk.con7")}}</span></p>
      <p class="horizontal-view"><span>8.</span><span>{{$t("message.risk.con8")}}</span></p>
      <p class="horizontal-view"><span>9.</span><span>{{$t("message.risk.con9")}}</span></p>
      </div>
      <div class="mt40 risk3">
        <div class="mb40">
           <p class="fs-28 mb20 txt-black-real" v-text='$t("message.risk.head3")'></p>
           <p class="horizontal-view mt20"><span>1.</span><span>{{$t("message.risk.content10")}}</span></p>
           <p class="horizontal-view"><span>2.</span><span>{{$t("message.risk.content11")}}</span></p>
           <p class="horizontal-view"><span>3.</span><span>{{$t("message.risk.content12")}}</span></p>
           <p class="horizontal-view"><span>4.</span><span>{{$t("message.risk.content13")}}</span></p>
           <p class="horizontal-view"><span>5.</span><span>{{$t("message.risk.content14")}}</span></p>
           <p class="horizontal-view"><span>6.</span><span>{{$t("message.risk.content15")}}</span></p>
           
           <p class="fs-28 mb20 mt40 risk3 txt-black-real" v-text='$t("message.risk.head4")'></p>
             <p class="horizontal-view mt20"><span>1.</span><span>{{$t("message.risk.content16")}}</span></p>
             <p class="horizontal-view"><span>2.</span><span>{{$t("message.risk.content17")}}</span></p>
             <p class="horizontal-view"><span>3.</span><span>{{$t("message.risk.content18")}}</span></p>
             <p class="horizontal-view"><span>4.</span><span>{{$t("message.risk.content19")}}</span></p>
             <p class="horizontal-view"><span>5.</span><span>{{$t("message.risk.content20")}}</span></p>
             <p class="horizontal-view"><span>6.</span><span>{{$t("message.risk.content21")}}</span></p>
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
      risk1: require("../assets/images/riskStatement1.png"),
      risk2: require("../assets/images/ojbk2@2x.png"),
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
.riskH5{
  margin-top:120px;
  .tips img {
    height: 48px;
  }
  .risk3 p span:nth-child(1) {
    margin-right: 10px;
  }
  .risk3 p span {
    font-size: 24px;
    line-height: 36px;
  }
}
.riskStatement{
  .risk3 p{
    margin-bottom:5px;
  }
  .risk3 p span{
    font-size:14px;
    line-height:24px;
  }
  .risk3 p span:nth-child(1){
   margin-right: 0.05rem;
   width:20px;
  }
  .tips img{
    height:45px;
  }
}
</style>
