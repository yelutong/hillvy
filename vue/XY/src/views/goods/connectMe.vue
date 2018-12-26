<template>
  <div class="wrapper white page-bind">
    <vHeader title="客服"/>
    <div class="content kefu">
     <h3 class="h40 center">欢迎您</h3>
     <p class="center h40">任何疑问、建议投诉等，可通过以下方式咨询</p>
      <div class="kefu_pic0">
      	<i class="kef_left">
      	    <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=3317624116&amp;site=qq&amp;menu=yes" target="_blank">
      		<b class="kef_qq sprite"></b>
      		<b class="center qq_kefu">在线客服</b>
      		</a>
      	</i>
      	<i class="kef_right"> 
      	<a href="tel:075582777165">
      		<b class="kef_phone sprite"></b>
      		<b class="center phone_kefu">电话客服</b>
      	</a>	
      	</i>
      </div>
      <p class="center kef_gzh"><img src="https://m.mcyou.net/images/buyer/qrcode_share.png"></p> 
      <p class="center kef_gzh_ms">扫描关注公众号</p>
    </div>
  </div>
</template>
<script type="text/javascript">
import vHeader from "@/components/v-header";
export default {
 components: {
   vHeader
  }
}
</script>
<style lang="stylus">
.kefu{
  margin-top:44px;
  h3 {
    color: #333;
    font-size: 21px;
    font-weight: 500;
    margin-top: 10px;
  }
  .h40 {
    line-height: 40px!important;
  }
  .kefu_pic0 {
    width: 100%;
    float: left;
  }
  .kefu_pic0 i {
    width: 50%;
    float: left;
    text-align: center;
    height: 150px;
    margin: 30px auto;
  }
  .qq_kefu,.phone_kefu,.kef_gzh_ms {
    line-height: 40px;
    font-size: 16px;
    height: 40px;
    color: #333;
  }
  .kef_qq {
    width: 80px;
    height: 80px;
    background: url(../../assets/images/kef_qq.png) no-repeat;
    margin: 0 auto;
    display: block;
    background-position: 0 0;
    background-size: 80px auto; 
  }
  .kef_phone {
    width: 80px;
    height: 80px;
    background: url(../../assets/images/tel.png) no-repeat;
    margin: 0 auto;
    display: block;
    background-position: 0 0;
    background-size: 80px auto; 
  }
  .kef_gzh img {
    width: 160px;
    height: 160px;
    display: inline-block;
  }
}
</style>