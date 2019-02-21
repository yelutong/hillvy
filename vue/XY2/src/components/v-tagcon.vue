<!-- 标题+内容式横向布局 -->
<template>
  <div class="v-tag-con" :class="{nobdr:nobdr, more:more, mb:mb}">
    <span class="v-tag" :style="{width:titNum+'em'}">{{ title }}</span>
    <p class="v-con" :class="{elips:!more}">{{ con }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    titNum: {
      type: Number,
      default: 5
    },
    con: String,
    nobdr: {
      type: Boolean,
      default: false
    },
    more: {
      type: Boolean,
      default: false
    },
    mb: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="stylus">
@import '../assets/css/media';

.v-tag-con {
  position: relative;
  display: flex;
  padding: 0 15px;
  height: 44px;
  align-items: center;
  background-color: #fff;
  bd-line(bottom, 1px, #eaeaea);

  .v-tag {
    width: 5em;
    font-size: 14px;
    color: #828282;
  }

  .v-con {
    max-width: 272.5px;
    font-size: 14px;
    color: #484848;
    word-break: break-all;
  }

  &.nobdr {
    &:after {
      display: none;
    }
  }

  &.more {
    min-height: 44px;
    height: auto;
    padding-top: 12px;
    padding-bottom: 12px;
    align-items: flex-start;

    .v-tag, .v-con {
      line-height: 20px;
    }
  }

  &.mb {
    margin-bottom: 10px;
  }
}
</style>
