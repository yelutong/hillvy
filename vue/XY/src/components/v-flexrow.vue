<!-- flex行等分布局 -->
<template>
  <div class="v-flex-list">
    <router-link class="item" v-for="(item, index) in flexrowData" :key="index" :to="item.link">
      <!--<img class="icon" :style="{width:item.size*0.02+'rem', height:item.size*0.02+'rem'}" :src="item.icon" />-->
      <p v-text="item.num" class="fs-15"></p>
      <p class="title">{{ item.title }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    flexrowData: Array
  }
};
</script>

<style lang="stylus">
.v-flex-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .item {
    flex: 1;
    text-align: center;
  }

  .icon {
    margin: 0 auto 7px;
  }

  .title {
    font-size: 12px;
    color: #090909;
  }
}
</style>
