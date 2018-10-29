<!-- 底部大导航 -->
<template>
  <div class="v-navbar">
    <div class="item" :class="{active:item.type === active}" v-for="(item, index) in arrNav" :key="index" @click="pageToBar(item, index)">
      <i class="ico" :class="'i-'+item.type"></i>
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      arrNav: [
        { title: "首页", type: "index" },
        { title: "资讯", type: "news" },
        { title: "我的", type: "mine" }
      ]
    };
  },
  props: {
    active: {
      type: String,
      default: "index"
    }
  },
  computed: {
    ...mapState(["openId"])
  },
  methods: {
    // 跳转大导航
    pageToBar(item, index) {
      if (item.type !== this.actBar) {
        if (item.type === "index") {
          this.$router.push({
            path: "/index",
            query: { open_id: this.openId }
          });
        } else {
          this.$router.push("/" + item.type);
        }
      }
    }
  }
};
</script>

<style lang="stylus">
.v-navbar {
  position: fixed;
  z-index: 20;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  height: 50px;
  border-top: 1px solid #DCDCDC;

  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 12px;

    .ico {
      width: 26px;
      height: 26px;
    }

    .i-index {
      background-image: url('../assets/images/index.png');
    }

    .i-news {
      background-image: url('../assets/images/new.png');
    }

    .i-mine {
      background-image: url('../assets/images/mine.png');
    }

    &.active {
      color: #184075;

      .i-index {
        background-image: url('../assets/images/index-act.png');
      }

      .i-news {
        background-image: url('../assets/images/new-act.png');
      }

      .i-mine {
        background-image: url('../assets/images/mine-act.png');
      }
    }
  }
}
</style>
