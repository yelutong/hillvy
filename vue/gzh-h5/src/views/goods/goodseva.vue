<template>
  <div class="wrapper white page-goodseva">
    <div class="eva-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <div class="item" v-for="(item, index) in evasList" :key="index">
        <div class="eva-pro">
          <div class="pro">
            <div class="art-box">
              <img class="avatar" :src="item.avatar" />
            </div>
            <span class="name">{{ item.name }}</span>
          </div>
          <div class="date">
            <i class="ico i-date"></i>{{ item.date }}
          </div>
          <!-- <div class="star">
            <i class="ico i-star" v-for="(im, dex) in item.star" :key="dex"></i>
          </div> -->
        </div>
        <div class="eva-text brk-wod">{{ item.content }}</div>
        <div class="eva-imgs">
          <v-imglist :image-data="item.imgList" size="80" touch="preview" />
        </div>
        <div class="eva-goods">{{ item.title }}</div>
      </div>
      <v-nodata v-if="noEvas" text="- 该商品还没有评价 -" />
      <v-loadmore v-if="moreEvas" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { InfiniteScroll } from "mint-ui";
import vLoadmore from "@/components/v-loadmore";
import vNodata from "@/components/v-nodata";
import vImglist from "@/components/v-imglist";
export default {
  data() {
    return {
      id: this.getUrlParam("id"),
      evasPageNo: 1,
      evasPageSize: 10,
      moreEvas: false,
      noEvas: false,
      loading: true,
      evasList: []
    };
  },
  components: {
    "v-loadmore": vLoadmore,
    "v-nodata": vNodata,
    "v-imglist": vImglist
  },
  computed: {
    ...mapState(["token"])
  },
  beforeCreate() {
    document.title = "商品评价";
  },
  created() {
    this.getEvasList(this.id, "first");
  },
  methods: {
    // 加载更多评价
    loadMore() {
      this.loading = true;
      this.evasPageNo += 1;
      this.getEvasList(this.id);
    },
    // 获取评价列表
    getEvasList(id, first) {
      this.$axios
        .get(this.api.getGoodsEva, {
          params: {
            product_id: id,
            page_no: this.evasPageNo,
            page_size: this.evasPageSize
          }
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            if (first) {
              this.noEvas = true;
            } else {
              this.moreEvas = true;
              this.loading = false;
            }
            return;
          }
          let objData = resData.data,
            pageCount = objData.page_count,
            arrData = objData.records || [];
          if (arrData.length === 0) {
            if (first) {
              this.noEvas = true;
            }
            this.loading = true;
            return;
          }
          // 重组下数据
          arrData.forEach(val => {
            this.evasList.push({
              avatar: val.user.photoAvatarUrl,
              name: val.user.fullName || val.user.nickName || "匿名",
              star: val.starNum,
              content: val.content,
              date: this.dateFormat(val.createDate, "YYYY-MM-DD hh:mm"),
              title: val.product.name,
              imgList: val.imagePath
            });
          });
          if (pageCount <= this.evasPageNo) {
            this.loading = true;
            this.moreEvas = false;
          } else {
            this.loading = false;
            this.moreEvas = true;
          }
        })
        .catch(res => {
          if (first) {
            this.noEvas = true;
          } else {
            this.loading = false;
          }
        });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/goodseva';
</style>