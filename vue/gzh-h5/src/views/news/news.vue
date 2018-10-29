<template>
  <div class="wrapper page-news">
    <div class="lay-video white" v-if="videoData">
      <v-video :video-data="videoData" />
    </div>
    <div class="lay-daily white">
      <v-title title="每日快报" />
      <div class="daily-list">
        <router-link class="item" v-for="(item, index) in dailyList" :key="index" :to="'/news/article?type=daily&id='+item.id">
          <div class="context elips">
            <span class="title">{{ item.title }}：</span>{{ item.summary }}
          </div>
        </router-link>
        <v-nodata v-if="noDaily" text="- 今日暂无快报 -" />
      </div>
    </div>
    <div class="lay-news white">
      <v-title title="新闻资讯"></v-title>
      <div class="news-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
        <div class="item" v-for="(item, index) in newsList" :key="index">
          <div class="im-lt">
            <router-link class="title" :to="'/news/article?type=news&id='+item.id">{{ item.title }}</router-link>
            <p class="intro">{{ item.summary }}</p>
            <p class="date">{{ item.date }}</p>
          </div>
          <router-link class="im-rt" :to="'/news/article?type=news&id='+item.id">
            <img class="img" :src="item.photoPath" />
          </router-link>
        </div>
        <v-nodata v-if="noNews" text="- 今日暂无资讯 -" />
        <v-loadmore v-if="moreNews" />
      </div>
    </div>
    <v-navbar active="news" />
  </div>
</template>

<script>
import vTitle from "@/components/v-title";
import vVideo from "@/components/v-video";
import vLoadmore from "@/components/v-loadmore";
import vNodata from "@/components/v-nodata";
import vNavBar from "@/components/v-navbar";
import { InfiniteScroll } from "mint-ui";

export default {
  data() {
    return {
      videoData: null,
      dailyList: [],
      noDaily: false,
      newsPageNo: 1,
      newsPageSize: 5,
      moreNews: false,
      noNews: false,
      loading: true,
      newsList: []
    };
  },
  components: {
    "v-title": vTitle,
    "v-video": vVideo,
    "v-loadmore": vLoadmore,
    "v-nodata": vNodata,
    "v-navbar": vNavBar
  },
  beforeCreate() {
    document.title = "资讯";
  },
  created() {
    this.getNewsVideo();
    this.getNewsDaily();
    this.getNewsInfo("first");
  },
  methods: {
    // 获取资讯页视频
    getNewsVideo() {
      this.$axios.get(this.api.getNewsVideo).then(res => {
        const resData = res.data;
        if (resData.code === 100) {
          const arrData = resData.data || [];
          if (arrData.length > 0) {
            this.videoData = arrData[0];
          }
        }
      });
    },
    // 获取资讯页快报
    getNewsDaily() {
      this.$axios
        .get(this.api.getDaily, {
          params: {
            page_no: 1,
            page_size: 5
          }
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            this.noDaily = true;
            return;
          }
          const arrData = resData.data.records || [];
          if (arrData.length === 0) {
            this.noDaily = true;
            return;
          }
          this.dailyList = arrData;
        })
        .catch(res => {
          this.noDaily = true;
        });
    },
    // 加载更多新闻资讯
    loadMore() {
      this.loading = true;
      this.newsPageNo += 1;
      this.getNewsInfo();
    },
    // 获取新闻资讯列表
    getNewsInfo(first) {
      this.$axios
        .get(this.api.getNews, {
          params: {
            page_no: this.newsPageNo,
            page_size: this.newsPageSize
          }
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            if (first) {
              this.noNews = true;
            } else {
              this.moreNews = true;
              this.loading = false;
            }
            return;
          }
          let objData = resData.data,
            pageCount = objData.page_count,
            arrData = objData.records || [];
          if (arrData.length === 0) {
            if (first) {
              this.noNews = true;
            }
            this.loading = true;
            return;
          }
          arrData.forEach(val => {
            val.date = this.dateFormat(val.createDate, "YYYY-MM-DD hh:mm");
            this.newsList.push(val);
          });
          if (pageCount <= this.newsPageNo) {
            this.loading = true;
            this.moreNews = false;
          } else {
            this.loading = false;
            this.moreNews = true;
          }
        })
        .catch(res => {
          if (first) {
            this.noNews = true;
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
@import '../../assets/css/news';
</style>
