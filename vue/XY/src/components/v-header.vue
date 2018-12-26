<!-- 带横线标题组件 -->
<template>
   <mt-header fixed :title="title">
    <router-link :to="to" slot="left" v-if="to">
      <mt-button icon="back"></mt-button>
    </router-link>
    <mt-button v-else icon="back" slot="left" @click="goBack"></mt-button>
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
  },
  methods: {
    goBack() {
      this.$router.back(-1)
    }
  }
};
</script>
<style lang="stylus">
.mint-header{
  background-color:#FFF!important;
}
.mint-header-title{
  color:#141414!important;
  font-size: 16px;
}
.mintui{
  color:#5C5C5C!important;
}
</style>