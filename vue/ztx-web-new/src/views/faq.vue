<!-- 首页路由 -->
<template>
  <div class="faq bg-white" v-if="showIndexFront=='PC'">
    <v-nav />
    <p><img :src="web" class="w100" /></p>
    <div class="companyContent w1000">
      <p class="center fs-25 bold mtb30 txt-black-real" v-text='$t("message.faq.head1")'></p>
        <div class="mt40 risk3">
        <div class="mb40 pdlr100">
         <el-row :gutter="24" class="mt10" type="flex" justify="space-between">
         <el-col :span="6">
           <p class="fs-16 mb10 h30 txt-blue" v-text='"1."+$t("message.faq.head2")'></p>
           <p class="fs-16 mb10 h30 txt-blue" v-text='"2."+$t("message.faq.head3")'></p>
         </el-col>
         <el-col :span="18">
           <p class="fs-16 mb20 txt-blue" v-text='$t("message.faq.head2")'></p>
           <el-collapse accordion>
            <el-collapse-item :title='$t("message.faq.content1")' name="1">
              <div v-text='$t("message.faq.cont1Detail1")'></div>
              <div v-text='$t("message.faq.cont1Detail2")'></div>
              <div v-text='$t("message.faq.cont1Detail3")'></div>
              <div v-text='$t("message.faq.cont1Detail4")'></div>
              <div v-text='$t("message.faq.cont1Detail5")'></div>
              <div v-text='$t("message.faq.cont1Detail6")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.content2")' name="2">
              <div v-text='$t("message.faq.cont2Detail1")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.content3")' name="3">
              <div v-text='$t("message.faq.cont3Detail1")'></div>
              <div v-text='$t("message.faq.cont3Detail2")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.content4")' name="4">
              <div v-text='$t("message.faq.cont4Detail1")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.content5")' name="5">
              <div v-text='$t("message.faq.cont5Detail1")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.content6")' name="6">
              <div v-text='$t("message.faq.cont6Detail1")'></div>
              <div v-text='$t("message.faq.cont6Detail2")'></div>
              <div v-text='$t("message.faq.cont6Detail3")'></div>
              <div v-text='$t("message.faq.cont6Detail4")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.content7")' name="7">
              <div v-text='$t("message.faq.cont7Detail1")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.content8")' name="8">
              <div v-text='$t("message.faq.cont8Detail1")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.content9")' name="9">
              <div v-text='$t("message.faq.cont9Detail1")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.content10")' name="10">
              <div v-text='$t("message.faq.cont10Detail1")'></div>
              <div v-text='$t("message.faq.cont10Detail2")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.content11")' name="11">
              <div v-text='$t("message.faq.cont11Detail1")'></div>
              <div v-text='$t("message.faq.cont11Detail2")'></div>
              <div v-text='$t("message.faq.cont11Detail3")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.content12")' name="12">
              <div v-text='$t("message.faq.cont12Detail1")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.content13")' name="13">
              <div v-text='$t("message.faq.cont13Detail1")'></div>
            </el-collapse-item>
          </el-collapse>

          <p class="fs-16 mb20 mt40 txt-blue" v-text='$t("message.faq.head3")'></p>
           <el-collapse accordion>
            <el-collapse-item :title='$t("message.faq.loan.con1")' name="c1">
              <div v-text='$t("message.faq.loan.con1Detail1")'></div>
              <div v-text='$t("message.faq.loan.con1Detail2")'></div>
              <div v-text='$t("message.faq.loan.con1Detail3")'></div>
              <div v-text='$t("message.faq.loan.con1Detail4")'></div>
              <div v-text='$t("message.faq.loan.con1Detail5")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.loan.con2")' name="c2">
              <div v-text='$t("message.faq.loan.con2Detail1")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.loan.con3")' name="c3">
              <div v-text='$t("message.faq.loan.con3Detail1")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.loan.con4")' name="c4">
              <div v-text='$t("message.faq.loan.con4Detail1")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.loan.con5")' name="c5">
              <div v-text='$t("message.faq.loan.con5Detail1")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.loan.con6")' name="c6">
              <div v-text='$t("message.faq.loan.con6Detail1")'></div>
            </el-collapse-item>
          </el-collapse>

         </el-col>
        </el-row>
        </div>
       </div>
    </div>
    <v-footer />
  </div>

  <div v-else class="faqH5 bg-white">
    <v-nav />
    <p><img :src="web" class="w100" /></p>
    <p class="center fs-40 bold mtb30 txt-black-real" v-text='$t("message.faq.head1")'></p>
    <div class="companyContent w100 pd30">
      <p class="fs-28 mb33 txt-blue" v-text='$t("message.faq.head2")'></p>
     <el-collapse accordion>
      <el-collapse-item :title='$t("message.faq.content1")' name="1">
        <div v-text='$t("message.faq.cont1Detail1")'></div>
        <div v-text='$t("message.faq.cont1Detail2")'></div>
        <div v-text='$t("message.faq.cont1Detail3")'></div>
        <div v-text='$t("message.faq.cont1Detail4")'></div>
        <div v-text='$t("message.faq.cont1Detail5")'></div>
        <div v-text='$t("message.faq.cont1Detail6")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.content2")' name="2">
        <div v-text='$t("message.faq.cont2Detail1")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.content3")' name="3">
        <div v-text='$t("message.faq.cont3Detail1")'></div>
        <div v-text='$t("message.faq.cont3Detail2")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.content4")' name="4">
        <div v-text='$t("message.faq.cont4Detail1")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.content5")' name="5">
        <div v-text='$t("message.faq.cont5Detail1")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.content6")' name="6">
        <div v-text='$t("message.faq.cont6Detail1")'></div>
        <div v-text='$t("message.faq.cont6Detail2")'></div>
        <div v-text='$t("message.faq.cont6Detail3")'></div>
        <div v-text='$t("message.faq.cont6Detail4")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.content7")' name="7">
        <div v-text='$t("message.faq.cont7Detail1")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.content8")' name="8">
        <div v-text='$t("message.faq.cont8Detail1")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.content9")' name="9">
        <div v-text='$t("message.faq.cont9Detail1")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.content10")' name="10">
        <div v-text='$t("message.faq.cont10Detail1")'></div>
        <div v-text='$t("message.faq.cont10Detail2")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.content11")' name="11">
        <div v-text='$t("message.faq.cont11Detail1")'></div>
        <div v-text='$t("message.faq.cont11Detail2")'></div>
        <div v-text='$t("message.faq.cont11Detail3")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.content12")' name="12">
        <div v-text='$t("message.faq.cont12Detail1")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.content13")' name="13">
        <div v-text='$t("message.faq.cont13Detail1")'></div>
      </el-collapse-item>
    </el-collapse>

    <p class="fs-28 mb33 mt40 txt-blue" v-text='$t("message.faq.head3")'></p>
     <el-collapse accordion>
      <el-collapse-item :title='$t("message.faq.loan.con1")' name="c1">
        <div v-text='$t("message.faq.loan.con1Detail1")'></div>
        <div v-text='$t("message.faq.loan.con1Detail2")'></div>
        <div v-text='$t("message.faq.loan.con1Detail3")'></div>
        <div v-text='$t("message.faq.loan.con1Detail4")'></div>
        <div v-text='$t("message.faq.loan.con1Detail5")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.loan.con2")' name="c2">
        <div v-text='$t("message.faq.loan.con2Detail1")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.loan.con3")' name="c3">
        <div v-text='$t("message.faq.loan.con3Detail1")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.loan.con4")' name="c4">
        <div v-text='$t("message.faq.loan.con4Detail1")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.loan.con5")' name="c5">
        <div v-text='$t("message.faq.loan.con5Detail1")'></div>
      </el-collapse-item>
      <el-collapse-item :title='$t("message.faq.loan.con6")' name="c6">
        <div v-text='$t("message.faq.loan.con6Detail1")'></div>
      </el-collapse-item>
    </el-collapse>
    </div>
    <v-footer />
  </div>
</template>

<script>
import { Collapse, CollapseItem } from 'element-ui';
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
    "el-collapse": Collapse,
    "el-collapse-item": CollapseItem
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
   handleChange(val) {
      console.log(val);
   }
  }
};
</script> 
<style lang="stylus">
.faqH5{
  margin-top:120px;
  .el-collapse-item__header{
    height: auto!important;
    line-height:36px!important;
    color: #528ab7!important;
    font-size: 24px!important;
    padding:16px 0;
  }
  .el-collapse-item__content div {
    font-size: 20px!important;
  }
}
.faq{
  .el-collapse-item__header{
    height: auto!important;
    line-height:24px!important;
    color: #528ab7!important;
    font-size: 14px!important;
    padding:10px 0;
  }
  .el-collapse-item__content div{
    font-size: 13px!important;
  }
}
</style>
