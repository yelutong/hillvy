<!-- 视频+标题 -->
<template>
  <div class="v-video-box">
    <video class="video" :id="'myVideo'+videoData.id" @play="playVideo($event)" :src="videoData.videoPath" :poster="poster" controls></video>
    <div class="title elips">{{ videoData.title }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      poster: "https://pic.xjjxsd.cn/static/poster.png"
    };
  },
  props: {
    videoData: Object
  },
  methods: {
    // 把正在播放的视频ID传上去
    playVideo(e) {
      const playingId = e.target.id;
      this.$emit("sendPlayData", playingId);
    }
  }
};
</script>

<style lang="stylus">
.v-video-box {

  .title {
    font-size: 13px;
    line-height: 30px;
    color: #444;
  }
}
</style>
