<template>
  <div id="vGoods" class="wrapper page-index">
  VVVV
  <v-footer active="vGoods"/>
  </div>
</template>
<script>
import vFooter from "@/components/v-footer";
export default {
  data() {
    return {
     
    }
  },
  components: { 
    "v-footer": vFooter
  },
  beforeCreate() {
    document.title = "新银众商";
  },
  created() {
  
  },
  methods: {
     
  }
};
</script>
<style lang="stylus">

</style>
