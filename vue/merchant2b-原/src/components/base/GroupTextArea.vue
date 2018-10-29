<template>
  <div class='item-nav'>
    <div class='item-label'>{{label}}</div>
    <div class='flex1'><textarea class='full-input text-area' :placeholder='placeholder' :value='value' @input='update'/></div>
  </div>
</template>
<script>
  export default {
    name: 'group-input',
    data () {
      return {}
    },
    props: ['label', 'value','placeholder', 'option'],
    computed: {},
    methods: {
      update(e) {
        this.$store.commit('update', {name: this.option, value: e.target.value})
      }
    }
  }
</script>
<style  lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";
</style>
