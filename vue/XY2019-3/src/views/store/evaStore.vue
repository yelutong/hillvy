<template>
  <div class="wrapper page-ordercenter">
    <vHeader :title="evaTitle"/>
    <div class="lay-goods mt50">
      <div class="item vertical-view"  v-if="type=='eva'&&centerList">
        <div class="horizontal-view">
        <router-link class="img-box" :to="{path:'/goods', query:{id:centerList.conList.goodsId}}">
          <img class="img" :src="centerList.conList[0].goodsPhoto" />
        </router-link>
        <div>
          <p v-text="limitStrFormat(centerList.conList[0].goodsName)+' 等'+centerList.num+'件商品的评价'"></p>
          <div>
          <group>
            <cell class="eva2 left">
              <Rater v-model="data3" :font-size="30" active-color="#ff4f00" ></Rater>
            </cell>
          </group>
         </div>
        </div>
      </div>
       <div class="page-evagoods">
        <div class="lay-imgs">
          <v-imglist :image-data="imgList" size="75" touch="delete" @touchimg="imageAction" />
        </div>
        <textarea class="txa" v-model.trim="evaContent" placeholder="本次订单服务怎么样？来评价几句吧~" maxlength="200">
        </textarea>
        <vue-core-image-upload class="up-load" :crop="false" text="" inputAccept="image/*" @imageuploaded="chooseImage" :credentials="false"
          :max-file-size="10485760" :multiple="false" inputOfFile="Filedata" :url="this.api.uploadGoodsPic">
        </vue-core-image-upload>
        <button class="btn-submit" @click="evaGoods">发表评价</button>
       </div>

      </div>

      <v-nodata v-else bgcolor="grey" text="- 暂无订单详情 -" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "mint-ui";
import { Rater, Group, Cell } from 'vux';
import vNodata from "@/components/v-nodata";
import vHeader from "@/components/v-header";
import VueCoreImageUpload from "vue-core-image-upload";
import vImglist from "@/components/v-imglist";
export default {
  data() {
    return {
      data3: '3',
      evaTitle:'',
      type: this.getUrlParam("type") || "",
      from: this.getUrlParam("from") || "",
      noList: false,
      centerList: [],
      evaContent: "",
      imgList: []
    };
  },
  components: {
    "v-nodata": vNodata,
    vHeader,
    Rater,
    Group,
    Cell,
    "v-imglist": vImglist,
    "vue-core-image-upload": VueCoreImageUpload
  },
  computed: {
    ...mapState(["token"])
  },
  beforeCreate() {
    document.title = "订单中心";
  },
  created() {
    // 判断是否来自我的订单
    const from = this.from;
    const type = this.type;
    if (from == "orders") {
      this.getListFromOrders(type);
    }
  },
  watch:{
    data3(val,old){
       console.log(val);
    }
  },
  methods: {
    getListFromOrders(type) {
      // 来自订单中心，并区分是物流还是评价
      let key = "";
      switch (type) {
        case "exp":
          key = "expList";
          this.evaTitle = '物流查询';
          document.title = "物流查询";
          break;
        case "eva":
          key = "evaList";
          this.evaTitle = '订单评价';
          document.title = "订单评价";
          break;
      }
      // 从缓存中拿数据
      let arrGood = JSON.parse(sessionStorage.getItem(key));
      if (arrGood.length == 0) {
        this.noList = true;
        this.centerList = [];
        return;
      }
      this.noList = false;
      this.centerList = arrGood;
      console.log(arrGood)
    },
    // 接收子组件传来的点击图片事件
      imageAction(index) {
        this.imgList.splice(index, 1);
      },
      // 上传之后的事件
      chooseImage(data) {
        console.log(data);
        const imgList = this.imgList;
        if (imgList.length >= 3) {
          this.showTip("最多只能上传3张图片");
          return;
        }
        if (data.code !== 1 || !data.content || data.content.length === 0) {
          this.showTip("上传失败，请重试");
          return;
        }
        const arrData = data.content;
        this.imgList.push(this.api.urlPic+arrData[0].path+'/'+arrData[0].name);
      },
      // 点击发表评价
      evaGoods() {
        const evaContent = this.evaContent;
        let lastImgIds = '';
        // 先检验和整合数据
        if (evaContent.length === "" || evaContent.length < 5) {
          this.showTip("请至少输入五个字的评价");
          return;
        }
        // 通过后开始保存评价
        const loading = Toast({
          message: "保存评价中...",
          iconClass: "loading",
          duration: 10000
        });
        this.$axios.post(this.api.otoOrderEva, 
         JSON.stringify({
          context: evaContent,
          orderNumber: this.centerList.orderNo,
          itemId: this.centerList.conList.id,
          photoUrls: this.imgList.join(','),
          //storeId: this.centerList.storeId,
          score: this.data3>0?this.data3:1
        }), {
          headers: {"Authorization": this.token , "content-type": "application/json"}
        }).then(res => {
          loading.close();
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.msg);
            return;
          }
          // 成功后返回
          this.showTip('评价成功，感谢您的支持！', 1500, 'ok');
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        }).catch(res => {
          loading.close();
          this.showTip("评价失败，请稍后重试");
        });
      }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/ordercenter';
@import '../../assets/css/evagoods';
.page-ordercenter .vux-rater-inner span{
  font-size:30px!important; 
}
.page-ordercenter .eva2.weui-cell{
 padding:5px 0!important;
}
</style>