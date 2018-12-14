<!-- 图文套餐列表 -->
<template>
  <div class="v-meals-list">
    <router-link class="item mid-img" :to="{path:'/goods',query:{id:item.id}}" v-for="(item, index) in mealsData" :key="index">
      <img class="img" :src="item.img" />
      <div class="text">
        <div class="title elips">{{ item.title }}</div>
        <div class="intro elips">{{ item.intro }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    mealsData: Array
  }
};
</script>

<style lang="stylus">
.v-meals-list {
  .item {
    position: relative;
    width: 100%;
    height: 205px;
    margin-bottom: 12.5px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .text {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 0 13px;
    height: 40px;
    background-color: rgba(24, 63, 115, 0.3);

    .title, .intro {
      color: #fff;
      line-height: 1.2;
    }

    .intro {
      font-size: 12px;
    }
  }
}
</style>
