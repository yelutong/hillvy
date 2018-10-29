<template>
  <img :src="relSrc" class='upload-img'/>
</template>
<script>

  //  import Picker from 'better-picker'
  export default {
    name: 'img-show',
    components: {},
    props: ['src'],
    computed: {
      relSrc:function () {
          return window.location.origin + "/syf-finance/"+this.src;
      }
    }
  }
</script>
<style  lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";
</style>
