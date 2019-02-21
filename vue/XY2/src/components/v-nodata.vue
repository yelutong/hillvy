<!-- 没有数据-->
<template>
  <div class="v-no-data mt50" :class="bgcolor" :style="{height:height+'px'}">
    <div class="v-img" v-if="hasimg!=='no'"></div>
    <p class="v-txt">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    bgcolor: {
      type: String,
      default: "white"
    },
    hasimg: {
      type: String,
      default: "yes"
    },
    height: {
      type: String,
      default: "200"
    },
    text: {
      type: String,
      default: "暂无数据"
    }
  }
};
</script>

<style lang="stylus">
.v-no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .v-img {
    height: 85px;
    margin-bottom: 10px;
    background: url('../assets/images/nodata.png') no-repeat center / contain;
  }

  .v-txt {
    text-align: center;
    font-size: 14px;
    color: #777;
  }

  &.grey {
    background-color: #f5f5f5;
  }

  &.white {
    background-color: #fff;
  }
}
</style>
