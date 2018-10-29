<!-- 底部大导航 -->
<template>
  <div class="v-navbar vux-1px-t" :class="{'iphoneX-bottom':this.$UA().iphoneX}">
    <div class="item" :class="{active:item.type === active}" v-for="(item, index) in arrNav" :key="index" @click="changeToBar(item, index)">
      <i class="ico" :class="'i-'+item.type"></i>
      <div v-text="item.title"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-footer',
  data() {
    return {
      arrNav: [
        { title: "首页", type: "index" },
        { title: "服务", type: "service" },
        { title: "企业", type: "mine" }
      ]
    };
  },
  props: {
    active: {
      type: String,
      default: "index"
    }
  },
  methods: {
    // 跳转大导航
    changeToBar(item, index) {
      if (item.type !== this.actBar) {
        if (item.type === "index") {
          this.$router.push({
            path: "/index"
          });
        } else {
          this.$router.push("/" + item.type);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.iphoneX-bottom {height: 1.34rem!important;padding-bottom:.34rem}
.v-navbar {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  bottom: 0!important;
  background-color: #fff;
  display: flex;
  align-items: center;
  height: 1rem;
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: .24rem;
    .ico {
    width: .52rem;
    height: .52rem;
    display: inline-block;
    font-size: 0;
    line-height: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    }
    .i-index {
      background-image: url('../../assets/images/index.png');
    }
    .i-service {
      background-image: url('../../assets/images/service.png');
    }
    .i-mine {
      background-image: url('../../assets/images/mine.png');
    }
    &.active {
      color: #e71d32!important;
      .i-index {
        background-image: url('../../assets/images/index-act.png');
      }
      .i-service {
        background-image: url('../../assets/images/service-act.png');
      }
      .i-mine {
        background-image: url('../../assets/images/mine-act.png');
      }
    }
  }
}
</style>
