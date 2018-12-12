<!-- 加载更多 -->
<template>
  <div class="v-load-more" :class="bgcolor">加载更多... </div>
</template>

<script>
export default {
  props: {
    bgcolor: {
      type: String,
      default: "grey"
    }
  }
};
</script>

<style lang="stylus">
.v-load-more {
  line-height: 32.5px;
  text-align: center;
  font-size: 14px;
  color: #333;

  &.grey {
    background-color: #f5f5f5;
  }

  &.white {
    background-color: #fff;
  }
}
</style>
