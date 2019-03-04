<!-- 图片等分和预览布局 -->
<template>
  <div class="v-img-list">
    <div class="v-item" v-for="(vItem, vIndex) in imageList" :key="vIndex">
      <div class="v-imgbox" :style="{width:size+'px',height:size+'px'}">
        <img class="v-img" :src="vItem.src" @click="touchImage(vIndex)" />
      </div>
    </div>
    <template v-if="touch==='preview'">
      <div v-transfer-dom>
        <previewer :list="imageList" ref="previewer"></previewer>
      </div>
    </template>
  </div>
</template>

<script>
import { Previewer, TransferDom } from "vux";
export default {
  props: {
    size: {
      type: String,
      default: 85
    },
    touch: {
      type: String,
      default: "none"
    },
    imageData: Array
  },
  directives: {
    TransferDom
  },
  components: {
    Previewer
  },
  computed: {
    imageList() {
      // 重新组合下图片数组（迎合vux插件）
      const imageData = this.imageData;
      const imageList = [];
      imageData.forEach(val => {
        imageList.push({
          src: val
        });
      });
      return imageList;
    }
  },
  methods: {
    // 点击图片，是删除或者预览或者啥都不干
    touchImage(index) {
      if (this.touch === "delete") {
        this.$emit("touchimg", index);
      } else if (this.touch === "preview") {
        this.$refs.previewer.show(index);
      }
    }
  }
};
</script>

<style lang="stylus">
.v-img-list {
  display: flex;
  flex-wrap: wrap;
  font-size: 0;
  line-height: 0;

  .v-item {
    width: 25%;
    padding: 4px 0;
    text-align: center;
  }

  .v-imgbox {
    display: inline-block;
    overflow: hidden;

    .v-img {
      height: 100%;
    }
  }
}
</style>
