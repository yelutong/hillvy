<template>
  <div class="wrapper white page-videos">
    <div class="video-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <v-video :video-data="item" v-for="(item, index) in videoList" :key="index" @sendPlayData="getPlayData" />
    </div>
    <v-nodata v-if="noVideos" text="- 暂无视频资源 -" />
    <v-loadmore v-if="moreVideos" />
  </div>
</template>

<script>
import vVideo from "@/components/v-video";
import vLoadmore from "@/components/v-loadmore";
import vNodata from "@/components/v-nodata";
import { InfiniteScroll } from "mint-ui";
export default {
  data() {
    return {
      playingDom: null,
      videosPageNo: 1,
      videosPageSize: 5,
      moreVideos: false,
      noVideos: false,
      loading: true,
      videoList: []
    };
  },
  components: {
    "v-video": vVideo,
    "v-loadmore": vLoadmore,
    "v-nodata": vNodata
  },
  beforeCreate() {
    document.title = "视频";
  },
  created() {
    this.getVideosList("first");
  },
  methods: {
    // 获取子组件传来的播放ID
    getPlayData(id) {
      const newDom = document.getElementById(id);
      if (!this.playingDom) {
        this.playingDom = newDom;
        return;
      }
      if (this.playingDom !== newDom) {
        this.playingDom.pause();
        this.playingDom.currentTime = 0;
        this.playingDom = newDom;
      }
    },
    // 加载更多视频
    loadMore() {
      this.loading = true;
      this.videosPageNo += 1;
      this.getVideosList();
    },
    // 获取视频列表
    getVideosList(first) {
      this.$axios
        .get(this.api.getVideos, {
          params: {
            page_no: this.videosPageNo,
            page_size: this.videosPageSize
          }
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100) {
            if (first) {
              this.noVideos = true;
            } else {
              this.moreVideos = true;
              this.loading = false;
            }
            return;
          }
          let objData = resData.data,
            pageCount = objData.page_count,
            arrData = objData.records || [];
          if (arrData.length === 0) {
            if (first) {
              this.noVideos = true;
            }
            this.loading = true;
            return;
          }
          arrData.forEach(val => {
            this.videoList.push(val);
          });
          if (pageCount <= this.videosPageNo) {
            this.loading = true;
            this.moreVideos = false;
          } else {
            this.loading = false;
            this.moreVideos = true;
          }
        })
        .catch(res => {
          if (first) {
            this.noVideos = true;
          } else {
            this.loading = false;
          }
        });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/videos';
</style>
