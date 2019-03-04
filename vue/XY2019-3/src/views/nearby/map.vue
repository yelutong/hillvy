<template>
  <div class='nearby' id="storePage">
    <vHeader :title="mapTitle"/>
    <div class="white mt40">
     <iframe width="100%" id="iframeid" :height="height" frameborder="0" v-if="url" :src="url"></iframe>
     <!-- iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载,最好动态给iframe添加src值-->
    </div>
  </div>
</template>

<script>
// 购物车
import { mapState } from "vuex";
import { Toast } from "mint-ui";
import { } from 'vux';
import vHeader from "@/components/v-header";
export default {
  data() {
    return {
      mapTitle: this.getUrlParam("title"),
      latitude: this.getUrlParam("latitude"),
      longitude: this.getUrlParam("longitude"),
      address: this.getUrlParam("address"),
      merchantName: this.getUrlParam("merchantName"),
      height: 0,
      url:''
    };
  },
  components: { 
    vHeader,
  },
  computed: {
    ...mapState(["token", "autoAddress", "choseAddress"]),
  },
  beforeCreate(){
    document.title = '地图';
  },
  created() {
    this.getMap();
    this.height = window.screen.height-43;
  },
  methods: {
    getMap(){
      if(this.mapTitle == '腾讯地图'){
        this.url='https://apis.map.qq.com/uri/v1/marker?marker=coord:'+this.latitude+','+this.longitude+';title:'+this.merchantName+';addr:'+this.address+'&referer=myapp';
      }else if(this.mapTitle == '百度地图'){
        this.url='http://api.map.baidu.com/marker?location='+this.latitude+','+this.longitude+'&title='+this.merchantName+'&content='+this.address+'&coord_type=bd09ll&output=html&src=webapp.baidu.openAPIdemo';
      }else if(this.mapTitle == '高德地图'){
        this.url='https://uri.amap.com/marker?position='+this.longitude+','+this.latitude+'&name='+this.merchantName+'&coordinate=gaode&callnative=1&src=webapp.amap.openAPIdemo';
      }
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/nearby';
</style>
