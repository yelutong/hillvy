<template>
  <div class="wrapper white page-article">
    <div class="title">{{ dailyNewsData.title }}</div>
    <div class="date">{{ dailyNewsData.date }}</div>
    <img class="img" :src="dailyNewsData.img" />
    <v-nodata v-if="noInfo" text="- 未获取到详情内容 -" />
  </div>
</template>

<script>
import vNodata from "@/components/v-nodata";
export default {
  data() {
    return {
      type: this.getUrlParam("type"),
      id: this.getUrlParam("id"),
      noInfo: false,
      dailyNewsData: {}
    };
  },
  components: {
    "v-nodata": vNodata
  },
  created() {
    // 根据套餐类型加载套餐列表
    const type = this.type;
    const id = this.id;
    if (type === "daily") {
      document.title = "快报详情";
      this.getDailyInfo(id);
    } else {
      document.title = "资讯详情";
      this.getNewsInfo(id);
    }
  },
  methods: {
    // 获取快报详情
    getDailyInfo(id) {
      this.$axios
        .get(this.api.getDailyInfo, { params: { express_id: id } })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            this.noInfo = true;
            return;
          }
          const objData = resData.data;
          this.dailyNewsData = {
            title: objData.title,
            date: this.dateFormat(objData.createDate, "YYYY-MM-DD hh:mm"),
            content: objData.content,
            img: objData.contentPhotoPath
          };
        })
        .catch(res => {
          this.noInfo = true;
        });
    },
    // 获取资讯详情
    getNewsInfo(id) {
      this.$axios
        .get(this.api.getNewsInfo, { params: { news_id: id } })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            this.noInfo = true;
            return;
          }
          const objData = resData.data;
          this.dailyNewsData = {
            title: objData.title,
            date: this.dateFormat(objData.createDate, "YYYY-MM-DD hh:mm"),
            content: objData.content,
            img: objData.photoPath
          };
        })
        .catch(res => {
          this.noInfo = true;
        });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/article';
</style>
