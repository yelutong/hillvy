<!-- 首页路由 -->
<template>
  <div class="index bg-white" v-if="showIndexFront=='PC'">
    <v-nav />
    <div class="headContent relative center">
      <img :src="headPic" class="headPic visi-no w100" />
      <div class="headTips auto">
        <p class="tips1">PT Kredit Plus Teknologi</p>
        <p class="tips2 mgt45"><span class="mr10 pointer" @click="download"><img :src="headNav1" /></span><span class="pointer" @click="download"><img :src="headNav2" /></span></p>
      </div>
    </div>
    <p class="center fs-25 bold mt20 txt-black-real" v-text='$t("message.index.head1")'></p>
    <div class="w1000 auto indexContent mt40">
      <el-row :gutter="24" type="flex" justify="space-between">
        <el-col :span="7">
          <div class="grid-content bg-purple">
          <p><img :src="headcon1" /></p>
          <p class="fs-18 txt-black3" v-text='$t("message.index.con1to1")'></p>
          <p class="fs-14 txt-black-real" v-text='$t("message.index.con1to2")'></p>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
          <p><img :src="headcon2" /></p>
          <p class="fs-18 txt-black3" v-text='$t("message.index.con2to1")'></p>
          <p class="fs-14 txt-black-real" v-text='$t("message.index.con2to2")'></p>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
          <p><img :src="headcon3" /></p>
          <p class="fs-18 txt-black3" v-text='$t("message.index.con3to1")'></p>
          <p class="fs-14 txt-black-real" v-text='$t("message.index.con3to2")'></p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24" class="mt100" type="flex" justify="space-between">
        <el-col :span="11">
          <div class="bg-purple">
          <p class="center fs-18 mb40" v-text='$t("message.index.con4to1")'></p>
          <div class="contentBox pd15">
            <p class="center fs-18 mt20"  v-text='$t("message.index.con4to2")'></p>
            <p class="fs-18 mt30" v-text='$t("message.index.con4to21")'></p>
            <p class="fs-18 center mt20" v-text="'Rp'+this.addDot(valueRp)"></p>
            <div class="pdtb15">
            <el-slider v-model="value3" :change="getVal()" :show-tooltip="false"></el-slider>
            </div>
            <p class="line1 justify-content-space-between h60">
              <span class="fs-18">Rp600.000</span>
              <span class="fs-18">Rp5.000.000</span>
            </p>
            <div class="pdtb10 line-gray">
              <div class="justify-content-space-between h60 mt10">
                <span class="fs-18" v-text='$t("message.index.con4to3")'></span>
                <span>
                  <!--<el-button type="primary" plain @click="select('7h')" :class="selectActive=='7h'?'active':''">{{ $t("message.index.con4to4")}}</el-button>
                  <el-button type="primary" plain @click="select('14h')" :class="selectActive=='14h'?'active':''">{{ $t("message.index.con4to5")}}</el-button>
                  -->
                  <el-button type="primary" plain @click="select('7h')" class="active">{{ $t("message.index.con4to30")}}</el-button>
                </span>
              </div>
              <div class="justify-content-space-between h60">
                <span class="fs-18" v-text='$t("message.index.con4to6")'></span>
                <span class="fs-18" v-text='"Rp"+this.addDot(Interest)'></span>
              </div>
            </div>
           <p class="fs-18 center pdtb30 lh-24" v-text='$t("message.index.con4to7")'></p>
           <div class="center mt10" @click="download">
            <el-button type="success" plain class="lh-20">Download<br>Pinjam Gampang</el-button>
           </div>
          </div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="bg-purple">
          <p class="center fs-18 mb40" v-text='$t("message.index.con5to1")'></p>
          <div class="contentBox pd15">
            <div class="justify-content-space-between rightBar mtb15">
              <div class="left flex1 center">
                <p class="fs-18 h40" v-text='$t("message.index.con5to2")'></p>
                <p class="fs-18 h40">Rp 5.000.000</p>
              </div>
              <div class="right flex1 center">
                <p class="fs-18 h40" v-text='$t("message.index.con4to3")'></p>
                <p class="fs-18 h40" v-text='$t("message.index.con5to3")'></p>
              </div>
            </div>
           <p class="fs-18 list h40 mt20 mb5"><i><img class="indexPic2 mr10" :src="indexPic1" /></i>{{$t("message.index.con5to4")}}</p>
           <p class="fs-15 list h40"><i><img class="indexPic1 mr10" :src="indexPic2" /></i>{{$t("message.index.con5to5")}}</p>
           <p class="fs-15 list h40"><i><img class="indexPic1 mr10" :src="indexPic3" /></i>{{$t("message.index.con5to6")}}</p>
           <p class="fs-15 list h40"><i><img class="indexPic1 mr10" :src="indexPic4" /></i>{{$t("message.index.con5to7")}}</p>
           <p class="fs-18 list h40 mb5 mt10"><i><img class="indexPic2 mr10" :src="indexPic1" /></i>{{$t("message.index.con5to8")}}</p>
           <p class="fs-15 list h40"><i><img class="indexPic1 mr10" :src="indexPic6" /></i>{{$t("message.index.con5to9")}}</p>
           <p class="fs-15 list h40"><i><img class="indexPic1 mr10" :src="indexPic7" /></i>{{$t("message.index.con5to10")}}</p>
           <p class="fs-18 list h40 mb5 mt11"><i><img class="indexPic2 mr10" :src="indexPic1" /></i>{{$t("message.index.con5to10")}}</p>
           <p class="fs-15 list h40"><i><img class="indexPic1 mr10" :src="indexPic8" /></i>{{$t("message.index.con5to12")}}</p>
           <p class="fs-15 list h40"><i><img class="indexPic1 mr10" :src="indexPic9" /></i>{{$t("message.index.con5to13")}}</p>
           <p class="fs-15 list h40 mb1"><i><img class="indexPic1 mr10" :src="indexPic9" /></i>{{$t("message.index.con5to14")}}</p>
          </div>
          </div>
        </el-col>
      </el-row>
      <p class="center fs-25 bold mt80 txt-black-real" v-text='$t("message.index.head2")'></p>
    </div>
     <el-carousel :loop="true" :interval="5000" :height="elememtHeight+'px'">
        <el-carousel-item v-for="item in bannerItem" :key="item.index">
          <h3><img class="w100" ref="elememtPic" :src="item.img" /></h3>
        </el-carousel-item>
      </el-carousel>    
      <p class="center fs-25 bold mt50 txt-black-real" v-text='$t("message.index.head3")'></p>
      <div class="w1000 auto mt20">
        <p><img class="w100" :src="picBottom" /></p>
        <div class="contentBottom">
         <p><img class="tips3" :src="picBottomTips" /></p>
         <p class="mt20 fs-18">{{$t("message.index.con6to1")}}</p>
           <el-row :gutter="24" class="mt10" type="flex" justify="space-between">
           <el-col :span="11">
             <p class="horizontal-view"><span>1.</span><span>{{$t("message.index.con6to2")}}</span></p>
             <p class="horizontal-view"><span>2.</span><span>{{$t("message.index.con6to3")}}</span></p>
             <p class="horizontal-view"><span>3.</span><span>{{$t("message.index.con6to4")}}</span></p>
             <p class="horizontal-view"><span>4.</span><span>{{$t("message.index.con6to5")}}</span></p>
             <p class="horizontal-view"><span>5.</span><span>{{$t("message.index.con6to6")}}</span></p>
             <p class="horizontal-view"><span>6.</span><span>{{$t("message.index.con6to7")}}</span></p>
            </el-col>
            <el-col :span="11">
               <p class="horizontal-view"><span>7.</span><span>{{$t("message.index.con6to8")}}</span></p>
               <p class="horizontal-view"><span>8.</span><span>{{$t("message.index.con6to9")}}</span></p>
               <p class="horizontal-view"><span>9.</span><span>{{$t("message.index.con6to10")}}</span></p>
            </el-col>
          </el-row>
        </div>
      </div>
     <v-footer />
  </div>

  <div v-else class="indexH5 bg-white">
    <v-nav />
    <div class="headContentH5 relative">
      <img :src="headPicH5" class="headPic w100" />
      <div class="headTips auto">
        <p class="tips2"><img :src="picBottomTips" /></p>
      </div>
      <p class="center h60 fs-40 bold mtb40 txt-black-real" v-text='$t("message.index.head1")'></p>

      <div class="swiperH5 mt20">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item>
          <div class="swiperH5p center"><img :src="headcon1" /></div>
          <p class="fs-32 txt-black3 center" v-text='$t("message.index.con1to1")'></p>
          <p class="fs-32 txt-black-real center" v-text='$t("message.index.con1to2")'></p>
        </el-carousel-item>
        <el-carousel-item>
          <div class="swiperH5p center"><img :src="headcon2" /></div>
          <p class="fs-32 txt-black3 center" v-text='$t("message.index.con1to1")'></p>
          <p class="fs-32 txt-black-real center" v-text='$t("message.index.con1to2")'></p>
        </el-carousel-item>
        <el-carousel-item>
          <div class="swiperH5p center"><img :src="headcon3" /></div>
          <p class="fs-32 txt-black3 center" v-text='$t("message.index.con1to1")'></p>
          <p class="fs-32 txt-black-real center" v-text='$t("message.index.con1to2")'></p>
        </el-carousel-item>
      </el-carousel>
      </div>

      <div class="indexConH5 relative">
          <div class="justify-content-space-between swithBtn">
           <p :class="btnActive=='left'?'center fs-18 active':'center fs-18'" @click="swithBtn('left')"><i v-text='$t("message.index.con4to1")'></i></p>
           <p :class="btnActive=='right'?'center fs-18 active':'center fs-18'" @click="swithBtn('right')"><i v-text='$t("message.index.con5to1")'></i></p>
          </div>
          <div class="contentBox pd30 bg-white" v-if="btnActive=='left'">
            <p class="center bold fs-28 mt10"  v-text='$t("message.index.con4to2")'></p>
            <p class="fs-28 mt60 txt-left" v-text='$t("message.index.con4to21")'></p>
            <p class="fs-28 center mt60" v-text="'Rp'+this.addDot(valueRp)"></p>
            <div class="pdtb30">
            <el-slider v-model="value3" :change="getVal()" :show-tooltip="false"></el-slider>
            </div>
            <p class="line1 justify-content-space-between h100">
              <span class="fs-28">Rp600.000</span>
              <span class="fs-28">Rp5.000.000</span>
            </p>
            <div class="pdtb10 line-gray">
              <div class="justify-content-space-between h100 mt10">
                <span class="fs-28" v-text='$t("message.index.con4to3")'></span>
                <span>
                  <!--<el-button type="primary" plain @click="select('7h')" :class="selectActive=='7h'?'active':''">{{ $t("message.index.con4to4")}}</el-button>
                  <el-button type="primary" plain @click="select('14h')" :class="selectActive=='14h'?'active':''">{{ $t("message.index.con4to5")}}</el-button>
                  -->
                  <el-button type="primary" plain @click="select('7h')" class="active">{{ $t("message.index.con4to30")}}</el-button>
                </span>
              </div>
              <div class="justify-content-space-between h60">
                <span class="fs-28" v-text='$t("message.index.con4to6")'></span>
                <span class="fs-28" v-text='"Rp"+this.addDot(Interest)'></span>
              </div>
            </div>
           <p class="fs-28 center pdtb48 lh-36" v-text='$t("message.index.con4to7")'></p>
           <div class="center mt10" @click="download">
            <el-button type="success" plain class="lh-28">Download<br>Pinjam Gampang</el-button>
           </div>
          </div>
          
          <div class="contentBox pd30 bg-white" v-else>
            <div class="justify-content-space-between rightBar mtb15">
              <div class="left flex1 center">
                <p class="fs-28 h60" v-text='$t("message.index.con5to2")'></p>
                <p class="fs-28 h60">Rp 5.000.000</p>
              </div>
              <div class="right flex1 center">
                <p class="fs-28 h60" v-text='$t("message.index.con4to3")'></p>
                <p class="fs-28 h60" v-text='$t("message.index.con5to3")'></p>
              </div>
            </div>
           <p class="fs-28 list h60 mt20 mb5"><i><img class="indexPic2 mr10" :src="indexPic1" /></i>{{$t("message.index.con5to4")}}</p>
           <p class="fs-24 list h60"><i><img class="indexPic1 mr10" :src="indexPic2" /></i>{{$t("message.index.con5to5")}}</p>
           <p class="fs-24 list h60"><i><img class="indexPic1 mr10" :src="indexPic3" /></i>{{$t("message.index.con5to6")}}</p>
           <p class="fs-24 list h60"><i><img class="indexPic1 mr10" :src="indexPic4" /></i>{{$t("message.index.con5to7")}}</p>
           <p class="fs-28 list h60 mb5 mt10"><i><img class="indexPic2 mr10" :src="indexPic1" /></i>{{$t("message.index.con5to8")}}</p>
           <p class="fs-24 list h60"><i><img class="indexPic1 mr10" :src="indexPic6" /></i>{{$t("message.index.con5to9")}}</p>
           <p class="fs-24 list h60"><i><img class="indexPic1 mr10" :src="indexPic7" /></i>{{$t("message.index.con5to10")}}</p>
           <p class="fs-28 list h60 mb5 mt11"><i><img class="indexPic2 mr10" :src="indexPic1" /></i>{{$t("message.index.con5to10")}}</p>
           <p class="fs-24 list h60"><i><img class="indexPic1 mr10" :src="indexPic8" /></i>{{$t("message.index.con5to12")}}</p>
           <p class="fs-24 list h60"><i><img class="indexPic1 mr10" :src="indexPic9" /></i>{{$t("message.index.con5to13")}}</p>
           <p class="fs-24 list h60 mb1"><i><img class="indexPic1 mr10" :src="indexPic9" /></i>{{$t("message.index.con5to14")}}</p>
          </div>

          </div>
          <p class="center h60 fs-40 bold mtb40 txt-black-real" v-text='$t("message.index.head2")'></p>
          <el-carousel :loop="true" arrow="always" :interval="5000" :height="elememtHeight+'px'">
            <el-carousel-item v-for="item in bannerItem" :key="item.index">
              <h3><img class="w100" ref="elememtPic" :src="item.img" /></h3>
            </el-carousel-item>
          </el-carousel>  
          <p class="center h60 fs-40 bold mtb40 txt-black-real" v-text='$t("message.index.head3")'></p>
          <p><img class="w100" :src="picBottom2" /></p>
          <div class="contentBottom">
           <p><img class="tips3" :src="picBottomTips" /></p>
           <p class="mt30 fs-28 h40">{{$t("message.index.con6to1")}}</p>
           <p class="horizontal-view"><span>1.</span><span>{{$t("message.index.con6to2")}}</span></p>
           <p class="horizontal-view"><span>2.</span><span>{{$t("message.index.con6to3")}}</span></p>
           <p class="horizontal-view"><span>3.</span><span>{{$t("message.index.con6to4")}}</span></p>
           <p class="horizontal-view"><span>4.</span><span>{{$t("message.index.con6to5")}}</span></p>
           <p class="horizontal-view"><span>5.</span><span>{{$t("message.index.con6to6")}}</span></p>
           <p class="horizontal-view"><span>6.</span><span>{{$t("message.index.con6to7")}}</span></p>
           <p class="horizontal-view"><span>7.</span><span>{{$t("message.index.con6to8")}}</span></p>
           <p class="horizontal-view"><span>8.</span><span>{{$t("message.index.con6to9")}}</span></p>
           <p class="horizontal-view"><span>9.</span><span>{{$t("message.index.con6to10")}}</span></p>
        </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import vNav from "@/components/v-nav";
import vFooter from "@/components/v-footer";
import { Row, Slider, Col, CarouselItem, Carousel } from 'element-ui';
export default {
  data() {
    return {
      headPic: require("../assets/images/head@2x.png"),
      headPicH5: require("../assets/images/h5Index1.png"),
      headNav1: require("../assets/images/googleplay@2x.png"),
      headNav2: require("../assets/images/ojbk@2x.png"),
      headcon1: require("../assets/images/1@2x.png"),
      headcon2: require("../assets/images/2@2x.png"),
      headcon3: require("../assets/images/3@2x.png"),
      indexPic1: require("../assets/images/index1@2x.png"),
      indexPic2: require("../assets/images/index2@2x.png"),
      indexPic3: require("../assets/images/index3@2x.png"),
      indexPic4: require("../assets/images/index4@2x.png"),
      indexPic6: require("../assets/images/index6@2x.png"),
      indexPic7: require("../assets/images/index7@2x.png"),
      indexPic8: require("../assets/images/index8@2x.png"),
      indexPic9: require("../assets/images/index9@2x.png"),
      bannerItem: [],
      banner1: require("../assets/images/banner@2x.png"),
      banner2: require("../assets/images/banner@2x.png"),
      banner3: require("../assets/images/banner3@2x.png"),
      banner4: require("../assets/images/banner3@2x.png"),
      picBottom: require("../assets/images/pic@2x.png"),
      picBottom2: require("../assets/images/picBottom2.png"),
      picBottomTips: require("../assets/images/ojbk2@2x.png"),
      selectActive: '7h',
      value3: 50,
      valueRp: 0,
      elememtHeight: 300,
      valueTotal: 4400000,
      Interest: 0,
      btnActive: 'left',
      showIndexFront: this.getShowIndex()
    };
  },
  components: {
    "v-nav": vNav,
    "v-footer": vFooter,
    "el-row": Row,
    "el-col": Col,
    "el-slider": Slider,
    "el-carousel": Carousel,
    "el-carousel-item": CarouselItem
  },
  computed:{
    
  },
  beforeCreate() {
    document.title = "PT. Kredit Plus Teknologi —— pinjam gampang";
  },
  created() {
    let type = window.location.search.split('?downloadUrl=')[1];
    if(type){
      location.href=type;//跳转下载app页面
    }
    this.valueRp = 600000+this.valueTotal*(this.value3/100);
    this.Interest = this.valueRp*30*0.004;
    let banner1 = [{'index':1,'img':this.banner1}];
    let banner2 = [{'index':2,'img':this.banner2}];
    let banner3 = [{'index':1,'img':this.banner3}];
    let banner4 = [{'index':2,'img':this.banner4}];
    if(this.showIndexFront=='PC'){
      this.bannerItem = [...banner1,...banner2];//合并数组
    }else{
      this.bannerItem = [...banner3,...banner4];//合并数组
    }
    setTimeout(()=>{
      if(this.$refs.elememtPic[0].height==0){
        setTimeout(()=>{
         this.elememtHeight = this.$refs.elememtPic[0].height;
        },1000)
      }else{
         this.elememtHeight = this.$refs.elememtPic[0].height;
      }
    },1000)
  },
  watch: {
    value3(){
      let val=600000+this.valueTotal*(this.value3/100);
      if(val%100000==0){
        this.valueRp = val;
      }else{
        this.valueRp = parseInt(val/100000)*100000;
      }
      this.Interest = this.valueRp*30*0.004;
    }
  },
  methods: {
    select(val){
      if(val=='7h'){
        this.selectActive = '7h'
      }else{
        this.selectActive = '14h'
      }
    },
    swithBtn(val){
      if(val=='left'){
        this.btnActive = 'left'
      }else{
        this.btnActive = 'right'
      }
    },
    getVal(){
      console.log(this.value3)
    },
    download(){
      window.open('https://play.google.com/store/apps/details?id=com.kpt.android&hl=id-ID');
    }
  }
};
</script> 
<style lang="stylus">
@import '../assets/css/index';
</style>
