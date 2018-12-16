<!-- 带横线标题组件 -->
<template>
   <mt-header fixed :title="title">
  <router-link :to="to" slot="left">
    <mt-button icon="back" v-if="to"></mt-button>
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
    title: String,
    to: String
  }
};
</script>
<style lang="stylus">
.mint-header{
  background-color:#FFF!important;
}
.mint-header-title{
  color:#141414!important;
}
.mintui{
  color:#5C5C5C!important;
}
</style>