<!-- 带横线标题组件 -->
<template>
   <mt-header fixed :title="title">
  <router-link :to="/21" slot="left">
    <mt-button icon="back"></mt-button>
  </router-link>
</mt-header>
</template>

<script>
import { Header } from 'mint-ui';
export default {
  components: {
    Header
  },
  props: {
    title:'新银众商',
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
