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
 