<template>
  <x-header v-if="!this.$UA().weChat"  :title="title" :left-options="finalLeftOptions" :rightOptions="finalRightOptions" @on-click-more="clickMore" @on-click-back="clickBack" @on-click-title="clickTitle" class="vux-1px-b"></x-header>
</template>
<script>
export default {
  name: 'base-header',
  data () {
    return {
      defaultLeftOptions: {
        preventGoBack: false, backText: ''
      },
      defaultRightOptions: {
        showMore: false
      }
    }
  },
  props: ['title', 'leftOptions', 'rightOptions'],
  computed: {
    finalLeftOptions () {
      return this.leftOptions || this.defaultLeftOptions
    },
    finalRightOptions () {
      return this.rightOptions || this.defaultRightOptions
    }
  },
  methods: {
    clickMore () {
      this.$emit('on-click-more')
    },
    clickBack () {
      this.$emit('on-click-back')
    },
    clickTitle () {
      this.$emit('on-click-title')
    }
  }
}
</script>
<style lang="scss">
.vux-header {
    position: fixed!important;
    z-index: 99;
    left: 0;
    right: 0;
    top: 0;
    height:46px;
}
</style>
