<template>
  <div class="container">
    <transition :name="transitionName">
      <router-view class="child-view"
                   :class="{'pdb46':!this.$UA().weChat, 'child-view-show':cvShow,'iphoneX':this.$UA().iphoneX}"></router-view>
    </transition>
  </div>
</template>
<script>
//    import router from 'router/routers';
import {mapState} from 'vuex';
  export default {
    name: 'App',
//    data () {
//      return {
////        transitionName: '',
////        cvShow: true
//      }
//    },

    computed:{
      ...mapState({
        transitionName: state => state.routerAni.transitionName,
        cvShow: state => state.routerAni.cvShow,
      })
    },
//    watch: {
//      $route(to, from) {
//        console.log("this.$route.path___",this.$route.path)
//      }
//    }
  }

</script>

<style lang="scss">
  @import 'assets/scss/base.scss';
</style>
<style lang='less'>
  @import '~vux/src/styles/1px.less';
</style>
