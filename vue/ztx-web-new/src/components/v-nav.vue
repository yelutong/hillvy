<template>
  <div v-if="showIndexFront=='PC'" :class="top==0?'w100 center vNav':'w100 bg-yellow center vNav'">
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
<div v-else class="bg-white justify-content-space-between w100 navH5">
  <div><img class="logoH5" :src="logo" /></div>
  <div class="pdt15">
    <div class="left">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link navDrop">
        <img class="left" :src="logoLangH5" />
        <i class="left el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="dropLi"><div @click="select('logoEnd')"><img class="selectPicH5" :src="logoEnd1" />Indonesian</div></el-dropdown-item>
        <el-dropdown-item class="dropLi"><div @click="select('logoEng')"><img class="selectPicH5" :src="logoEng1" />English</div></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
    <div class="left" @click="moreNav">
     <img class="selectNav pointer" :src="selectNav" />
    </div>
  </div>
  <div :class="showNavH5?'moreNav':'hide'">
  <div class="center title relative fs-32">PINJAM GAMPANG<img class="close pointer" :src="closeH5" @click="closeH5Btn" /></div>
  <ul>
    <li class="vux-1px-b fs-32"  @click="toLink('nav1')" v-text='$t("message.vnav.nav1")'></li>
    <li class="vux-1px-b">
      <span v-text='$t("message.vnav.nav2")' @click="moreMenu('two')" :class="pic2?'fs-32 open2 active':'fs-32 open2'"></span>
      <div :class="pic2?'fs-32':'fs-32 pointer hide'">
      <p class="indent2 h60 mt30 fs-28" v-text='$t("message.vnav.nav2To1")' @click="toLink('nav2To1')"></p>
      <p class="indent2 h60 fs-28" v-text='$t("message.vnav.nav2To2")' @click="toLink('nav2To2')"></p>
      <p class="indent2 h60 fs-28" v-text='$t("message.vnav.nav2To3")' @click="toLink('nav2To3')"></p>
      </div>
    </li>
    <li class="vux-1px-b fs-32 pointer" v-text='$t("message.vnav.nav3")'  @click="toLink('nav3')"></li>
    <li class="vux-1px-b">
      <span v-text='$t("message.vnav.nav2")' @click="moreMenu('four')" :class="pic4?'fs-32 open2 active':'fs-32 open2'"></span>
      <div :class="pic4?'fs-32':'fs-32 pointer hide'">
      <p class="indent2 h60 mt30 fs-28" v-text='$t("message.vnav.nav4To1")' @click="toLink('nav4To1')"></p>
      <p class="indent2 h60 fs-28" v-text='$t("message.vnav.nav4To2")' @click="toLink('nav4To2')"></p>
      </div>
    </li>
  </ul>
  </div>
</div>

</template>
<script>
import { Menu, Submenu, MenuItem } from 'element-ui';
import logoEng from '../assets/images/eng@2x.png';
import logoEnd from '../assets/images/end.png';
import logoEng1 from '../assets/images/eng1.png';
import logoEnd1 from '../assets/images/end1.png';
export default {
  data() {
    return {
      activeIndex: '',
      logo: require("../assets/images/logo@2x.png"),
      selectNav: require("../assets/images/navH5.png"),
      closeH5: require("../assets/images/close.png"), 
      logoLang: '',
      logoLangH5: '',
      logoEng: logoEng,
      logoEnd: logoEnd,
      logoEng1: logoEng1,
      logoEnd1: logoEnd1,
      top: 0,
      bgColor:'transparent',
      showIndexFront: this.getShowIndex(),
      showNavH5: false,
      pic2: false,
      pic4: false
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
    this.logoLangH5 = (this.$i18n.locale=='eng')?logoEng1:logoEnd1;
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
        this.logoLangH5 = logoEng1;
        this.$i18n.locale='eng';
      }else{
        this.logoLang = logoEnd;
        this.logoLangH5 = logoEnd1;
        this.$i18n.locale='end';
      }
    },
    moreNav(){
      this.showNavH5 = true;
    },
    closeH5Btn(){
      this.showNavH5 = false;
    },
    moreMenu(val){
      if(val=='two'){ 
        if(!this.pic2){
           this.pic2 = true;
        }else{
          this.pic2 = false;
        }
      }else if(val=='four'){
        if(!this.pic4){
           this.pic4 = true;
        }else{
          this.pic4 = false;
        }
      }
    },
    toLink(val){
     switch (val) {
      case 'nav1':
       this.$router.push("/index");
      break;
      case 'nav2To1':
       this.$router.push("/companyPro");
      break;
      case 'nav2To2':
       this.$router.push("/howItWork");
      break;
      case 'nav2To3':
       this.$router.push("/riskStatement");
      break;
      case 'nav3':
       this.$router.push("/webNotice");
      break;
      case 'nav4To1':
       this.$router.push("/faq");
      break;
      case 'nav4To2':
       this.$router.push("/complaintPro");
      break;
      default:
       this.$router.push("/index");
     }
    }
  }
}
</script>
<style lang="stylus">
.navH5{
  height:120px;
  padding:20px 30px;
  position:absolute;
  top:0;
  left:0;
  z-index:999;
  .logoH5{
    height:80px;
  }
  .navDrop{
    height:40px;
  }
  .navDrop img{
    height:40px;
    margin-right:10px;
  }
  .selectNav{
    margin-left:70px;
    height:42px;
  }
}
.moreNav{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:#cba617!important;
  color:#FFF;
  .title{
    height:88px;
    line-height:88px;
  }
  .close{
    position:absolute;
    right:30px;
    top:24px;
    height:40px;
  }
  ul{
    padding:10px 30px;
  }
  ul li{
    padding:30px 0;
  }
  .open2{
    width:100%;
    display:block;
  }
  .open2:after{
    content:'';
    width:32px;
    position:absolute;
    right:20px;
    height:32px;
    background-image:url('../assets/images/moreMenu.png');
    background-size:100% 100%;
    transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
  }
  .open2.active:after{
    transform:rotate(45deg);
    -ms-transform:rotate(45deg);
    -moz-transform:rotate(45deg);
    -webkit-transform:rotate(45deg);
    -o-transform:rotate(45deg);
  }
}
.selectPicH5{
  height:40px;
  margin-right:10px;
  float:left;
}
.dropLi{
  height:40px!important;
  line-height:40px!important;
  font-size:14px;
  margin:20px 0;
}
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