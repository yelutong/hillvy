<template>
  <div class="wrapper page-collects">
    <div class="lay-collects" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <div class="item" v-for="(item, index) in collectsList" :key="index">
        <div class="chose" v-if="canEdit" @click="checkAction(item, index)">
          <i class="ico i-cks" :class="{checked:item.checked}" />
        </div>
        <router-link class="detail" :to="{path:'/goods', query:{id:item.id}}">
          <div class="img-box">
            <img class="img" :src="item.img" />
          </div>
          <div class="info-box">
            <p class="title">{{ item.title }}</p>
            <span class="price">￥{{ item.price }}</span>
          </div>
        </router-link>
      </div>
      <v-nodata v-if="noCollects" bgcolor="grey" text="- 收藏夹空空如也 -" />
      <v-loadmore v-if="moreCollects" />
    </div>
    <div class="lay-action fix-btom" v-if="collectsList.length > 0">
      <button class="btn-submit nordu" v-if="!canEdit" @click="canEdit=true">编辑</button>
      <button class="btn-submit nordu" v-if="canEdit" @click="delCollect">移除</button>
      <button class="btn-submit nordu done" v-if="canEdit" @click="canEdit=false">完成</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { InfiniteScroll } from "mint-ui";
import vLoadmore from "@/components/v-loadmore";
import vNodata from "@/components/v-nodata";
export default {
  data() {
    return {
      checkedData: {},
      canEdit: false,
      collectsPageNo: 1,
      collectsPageSize: 10,
      moreCollects: false,
      noCollects: false,
      loading: true,
      collectsList: []
    };
  },
  components: {
    "v-loadmore": vLoadmore,
    "v-nodata": vNodata
  },
  computed: {
    ...mapState(["token"])
  },
  beforeCreate() {
    document.title = "我的收藏";
  },
  created() {
    this.getCollectsData("first");
  },
  methods: {
    // 图片改一下格式
    getImgUrl(argImg) {
      if (!argImg) {
        return "";
      }
      if (typeof argImg === "string") {
        return argImg.split(",")[0];
      }
      return argImg[0];
    },
    // 加载更多我的收藏
    loadMore() {
      this.loading = true;
      this.collectsPageNo += 1;
      this.getCollectsData();
    },
    // 获取我的收藏列表
    getCollectsData(first) {
      this.$axios
        .get(this.api.getCollects, {
          headers: {
            "Authorization": this.token
          },
          params: {
            page_no: this.collectsPageNo,
            page_size: this.collectsPageSize
          }
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            if (first) {
              this.noCollects = true;
            } else {
              this.moreCollects = true;
              this.loading = false;
            }
            return;
          }
          let objData = resData.content,
            pageCount = objData.page_count,
            arrData = objData.records || [];
          if (arrData.length === 0) {
            this.noCollects = true;
            this.loading = true;
            return;
          }
          arrData.forEach(val => {
            let obj = {
              id: val.productId,
              checked: false,
              img: this.getImgUrl(val.product.photoMainUrl),
              title: val.product.name,
              price: val.product.salePrice
            };
            this.collectsList.push(obj);
          });
          if (pageCount <= this.collectsPageNo) {
            this.loading = true;
            this.moreCollects = false;
          } else {
            this.loading = false;
            this.moreCollects = true;
          }
        })
        .catch(res => {
          if (first) {
            this.noCollects = true;
          } else {
            this.loading = false;
          }
        });
    },
    // 单选收藏操作
    checkAction(item, index) {
      // 选择一个新的收藏
      if (!item.checked) {
        this.collectsList.forEach(val => {
          val.checked = false;
        });
        item.checked = true;
        this.checkedData.id = item.id;
        this.checkedData.index = index;
      }
    },
    // 删除收藏
    delCollect() {
      const checkedData = this.checkedData;
      if (!checkedData.id) {
        this.showTip("请先选择一个商品");
        return;
      }
      this.$axios
        .get(this.api.removeCollect, {
          headers: { "Authorization": this.token },
          params: { product_id: checkedData.id }
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("删除收藏失败");
            return;
          }
          // 删除后去掉数组，删到没有后再去读数据
          this.collectsList.splice(checkedData.index, 1);
          if (this.collectsList.length === 0) {
            this.collectsPageNo += 1;
            this.getCollectsData();
          }
          this.showTip("删除收藏成功");
        })
        .catch(res => {
          this.showTip("删除收藏失败");
        });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/collects';
</style>