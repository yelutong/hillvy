<!-- 带横线标题组件 -->
<template>
  <div class="v-title" :class="'v-title-'+level">
    <div class="line"></div>
    <div class="dot"></div>
    <span class="text">{{ title }}</span>
    <div class="dot"></div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: String,
      default: "first"
    },
    title: String
  }
};
</script>

<style lang="stylus">
.v-title {
  display: flex;
  align-items: center;

  .text {
    width: auto;
  }
}

.v-title-first {
  height: 50px;
  justify-content: center;

  .text {
    font-size: 16px;
  }

  .line {
    width: 33px;
    height: 1px;
    background-color: #000;
  }

  .dot {
    width: 4px;
    height: 4px;
    margin: 0 15px;
    background-color: #000;
    transform: rotateZ(45deg);
  }
}

.v-title-second {
  height: 30px;

  .text {
    padding: 0 18px;
    font-size: 12px;
    color: #7f7c81;
  }

  .line {
    flex: 1;
    height: 1px;
    background-color: rgba(233, 233, 233, 0.5);
  }

  .dot {
    display: none;
  }
}
</style>
