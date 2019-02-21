<template>
  <div class="wrapper white kefu">
    <vHeader title="帮助中心"/>
    <div class="content">
     <group>
      <cell title="在线客服">
        <img slot="icon" style="display:block;margin-right:5px;width:18px;height:18px" :src="phonePic">
      </cell>
       <grid :cols="4" :show-lr-borders="false" class="pd15">
          <grid-item  class="vux-center" label="新银客服01" >
            <img slot="icon" :src="codePic">
          </grid-item>
          <grid-item  class="vux-center" label="新银客服02" >
            <img slot="icon" :src="codePic">
          </grid-item>
          <grid-item  class="vux-center" label="新银客服03" >
            <img slot="icon" :src="codePic">
          </grid-item>
          <grid-item  class="vux-center" label="新银客服04" >
            <img slot="icon" :src="codePic">
          </grid-item>
       </grid> 
    </group>

    <cell title="客服电话">
        <img slot="icon" style="display:block;margin-right:5px;width:18px;height:18px" :src="phonePic">
    </cell>
     <div class="pd15 weui-grids">
      <p class="h40 txt-gray1" @click="callLine1()">客服服务热线:<i class="lt5 txt-black-real">0755–28885609</i></p>
      <p class="h40 txt-gray1" @click="callLine2()">客服服务热线:<i class="lt5 txt-black-real">0755–28886165</i></p>
     </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import vHeader from "@/components/v-header";
import { Group, Cell, Grid, GridItem, } from 'vux';
export default {
 data(){
  return{
    phonePic: require("../../assets/images/phone@3x.png"),
    wechatPic: require("../../assets/images/wechat@3x.png"),
    codePic: require("../../assets/images/qrcode_share.png")
  }
 },
 components: {
   vHeader,
   "group": Group,
   "cell": Cell,
   Grid,
   GridItem
  },
 beforeCreate() {
  document.title = "帮助中心";
 },
 methods: {
  callLine1(){
    window.location.href="tel:075528885609";
  },
  callLine2(){
    window.location.href="tel:075528886165";
  }
 }
}
</script>
<style lang="stylus">
.kefu{
  margin-top:44px;
  .vux-label{
    color:#FF4F00;
  }
  .weui-grid:before{
    width:0!important;
    border: none!important;
  }
  .weui-grid:after{
    height:0!important;
    border: none!important;
  }
  .weui-grid{
    padding:10px 0!important;
  }
  .weui-grid__icon{
    width: 70px!important;
    height: 70px!important;
  }
  .weui-cells:after,.weui-cell:before{
    height:0!important;
    border-bottom: none!important;
    border-top: none!important;
  }
}
</style>