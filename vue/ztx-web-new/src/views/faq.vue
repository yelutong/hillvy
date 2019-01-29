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
         <el-col :span="8">
           <p class="fs-16 mb10 h30 txt-blue" v-text='"1."+$t("message.faq.head2")'></p>
           <p class="fs-16 mb10 h30 txt-blue" v-text='"2."+$t("message.faq.head3")'></p>
         </el-col>
         <el-col :span="16">
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
          </el-collapse>

          <p class="fs-16 mb20 mt40 txt-blue" v-text='$t("message.faq.head3")'></p>
           <el-collapse accordion>
            <el-collapse-item :title='$t("message.faq.content3")' name="3">
              <div v-text='$t("message.faq.cont3Detail1")'></div>
              <div v-text='$t("message.faq.cont3Detail2")'></div>
            </el-collapse-item>
            <el-collapse-item :title='$t("message.faq.content4")' name="4">
              <div v-text='$t("message.faq.cont4Detail1")'></div>
            </el-collapse-item>
          </el-collapse>

         </el-col>
        </el-row>
        </div>
       </div>
    </div>
    <v-footer />
  </div>

  <div v-else>
    H5正在开发中...
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
.faq{
  .el-collapse-item__header{
    color: #528ab7!important;
    font-size: 14px!important;
  }
  .el-collapse-item__content div{
    font-size: 13px!important;
  }
}
</style>
