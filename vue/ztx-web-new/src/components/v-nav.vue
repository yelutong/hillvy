<template>
  <div :class="top==0?'w100 center vNav':'w100 bg-yellow center vNav'">
  <div class="w1000 horizontal-view nav-pc">
 <span><img class="logo" :src="logo" /></span>
 <el-menu
  :default-active="activeIndex"
  :class="top==0?'el-menu-demo allBorder1':'el-menu-demo allBorder'"
  mode="horizontal"
  @select="handleSelect"
  :background-color="bgColor"
  text-color="#555"
  active-text-color="#000">
  <el-menu-item index="1" v-text='$t("message.vnav.nav1")'></el-menu-item>
  <el-submenu index="2">
    <template slot="title">{{ $t("message.vnav.nav2") }}</template>
    <el-menu-item index="2-1" v-text='$t("message.vnav.nav2To1")'></el-menu-item>
    <el-menu-item index="2-2" v-text='$t("message.vnav.nav2To2")'></el-menu-item>
    <el-menu-item index="2-3" v-text='$t("message.vnav.nav2To3")'></el-menu-item>
  </el-submenu>
  <el-menu-item index="3" v-text='$t("message.vnav.nav3")'></el-menu-item>
  <el-submenu index="4">
    <template slot="title">{{ $t("message.vnav.nav4") }}</template>
    <el-menu-item index="4-1" v-text='$t("message.vnav.nav4To1")'></el-menu-item>
    <el-menu-item index="4-2" v-text='$t("message.vnav.nav4To2")'></el-menu-item>
  </el-submenu>
</el-menu>
<el-menu
  :default-active="activeIndex"
  :class="top==0?'el-menu-demo allBorder1 justify-content-end selectContent flex1':'el-menu-demo allBorder justify-content-end selectContent flex1'"
  mode="horizontal"
  @select="handleSelect"
  :background-color="bgColor"
  text-color="#555"
  active-text-color="#000">
  <li :class="top==0?'relative left selectLang1':'relative left selectLang'"><img :src="logoLang"/></li>
  <el-submenu index="5" class="selectLan left">
    <template slot="title">{{ $t("message.vnav.navLang") }}</template>
    <el-menu-item index="5-1" @click="select('logoEnd')"><img class="selectPic" :src="logoEnd" />Indonesian</el-menu-item>
    <el-menu-item index="5-2" @click="select('logoEng')"><img class="selectPic" :src="logoEng" />English</el-menu-item>
  </el-submenu>
</el-menu> 
  </div>
  </div>
</template>
<script>
import { Menu, Submenu, MenuItem } from 'element-ui';
import logoEng from '../assets/images/eng@2x.png';
import logoEnd from '../assets/images/end.png';
export default {
  data() {
    return {
      activeIndex: '',
      logo: require("../assets/images/logo@2x.png"),
      logoLang: '',
      logoEng: logoEng,
      logoEnd: logoEnd,
      top: 0,
      bgColor:'transparent'
    };
  },
  components: {
    "el-menu": Menu,
    "el-submenu": Submenu,
    "el-menu-item": MenuItem
  },
  mounted() {//给window添加一个滚动滚动监听事件
    window.addEventListener('scroll', this.handleScroll, true);
  },
  created() {
    this.logoLang = (this.$i18n.locale=='eng')?logoEng:logoEnd;
    this.activeIndex = (this.$route.path=='/index')?'1':(sessionStorage.getItem("activeIndex")||'1');
  },
  methods: {
    handleScroll() { //改变元素#searchBar的top值
      let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(top==0){
        this.bgColor = "transparent";
      }else{
        this.bgColor = "#fecf1d";
      }
      this.top = top;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if(key!='5-1'&&key!='5-2'&&this.top!=0){
       document.body.scrollTop = document.documentElement.scrollTop = 0;//回到顶部
      }
      sessionStorage.setItem("activeIndex", key);
      if(key=='1'){
        this.$router.push("/index");
      }else if(key=='2-1'){
        this.$router.push("/companyPro");
      }else if(key=='2-2'){
        this.$router.push("/howItWork");
      }else if(key=='2-3'){
        this.$router.push("/riskStatement");
      }else if(key=='3'){
        this.$router.push("/webNotice");
      }else if(key=='4-1'){
        this.$router.push("/faq");
      }else if(key=='4-2'){
        this.$router.push("/complaintPro");
      }else if(key=='5-1'){
       
      }else if(key=='5-2'){
        
      }else{
        this.$router.push("/index");
      }
    },
    select(obj){
      if(obj=='logoEng'){
        this.logoLang = logoEng;
        this.$i18n.locale='eng';
      }else{
        this.logoLang = logoEnd;
        this.$i18n.locale='end';
      }
    }
  }
}
</script>
<style lang="stylus">
.vNav{
  position:absolute;
  top:0;
  left:0;
  z-index:9999;
  .allBorder{
    border-bottom: 2px solid #fecf1d;
  }
  .allBorder1{
    border-bottom: 2px solid transparent;
  }
  .el-menu.el-menu--horizontal{
    height:60px;
  }
  .selectLan .el-submenu__title{
   padding-right:20px;
   height: 60px;
  }
  .nav-pc li{
    font-size:15px!important;
  }
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
    background-color: #cba617!important;
  }
  .el-menu--horizontal>.el-submenu:focus .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title{
    background-color: #cba617!important;
  }
  .el-menu-item{
    -webkit-transition: background-color 0s!important;
    transition: background-color 0s!important;
  }
}

.nav-pc{
  .logo{
    height:40px;
    margin-top:10px;
    margin-right:50px;
  }
  .selectContent{
    float:right;
    border: none;
    outline:none;
  }
  .selectLang{
    height: 60px;
    border-bottom: 2px solid #fecf1d!important;
  }
  .selectLang1{
    height: 60px;
    border-bottom: 2px solid transparent!important;
  }
  .selectLang img,.selectLang1 img{
    margin:15px 5px 0 0;
    width:30px;
    height:30px;
  }
}
</style>