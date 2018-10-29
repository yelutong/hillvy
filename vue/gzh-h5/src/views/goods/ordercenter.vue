<template>
  <div class="wrapper page-ordercenter">
    <div class="lay-goods">
      <div class="item" v-for="(item, index) in centerList" :key="index">
        <router-link class="img-box" :to="{path:'/goods', query:{id:item.id}}">
          <img class="img" :src="item.img" />
        </router-link>
        <div class="detail">
          <router-link class="title" :to="{path:'/goods', query:{id:item.id}}">{{ item.name }}</router-link>
          <div class="action-date">
            <div class="date">
              <i class="ico i-date"></i>{{ item.date }}
            </div>
            <div class="action">
              <router-link class="btn-act" v-if="type==='exp'" :to="{path:'/goods/express', query:{'detail-id':item.detailId}}">查看物流</router-link>
              <router-link class="btn-act" v-if="type==='eva'" :to="{path:'/goods/evagoods', query:{id:item.id,'detail-id':item.detailId, from:'orders',index:index}}">评价晒单</router-link>
              <!-- <router-link class="btn-act" v-if="type==='eva'" :to="{path:'/goods/evaserve', query:{id:item.id,'detail-id':item.detailId, from:'orders',index:index}}">服务评价</router-link> -->
            </div>
          </div>
        </div>
      </div>
      <v-nodata v-if="noList" bgcolor="grey" text="- 暂无订单详情 -" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import vNodata from "@/components/v-nodata";
export default {
  data() {
    return {
      type: this.getUrlParam("type") || "",
      from: this.getUrlParam("from") || "",
      noList: false,
      centerList: []
    };
  },
  components: {
    "v-nodata": vNodata
  },
  computed: {
    ...mapState(["token"])
  },
  beforeCreate() {
    document.title = "订单中心";
  },
  created() {
    // 判断是否来自我的订单
    const from = this.from;
    const type = this.type;
    if (from === "orders") {
      this.getListFromOrders(type);
    }
  },
  methods: {
    getListFromOrders(type) {
      // 来自订单中心，并区分是物流还是评价
      let key = "";
      switch (type) {
        case "exp":
          key = "expList";
          break;
        case "eva":
          key = "evaList";
          break;
      }
      // 从缓存中拿数据
      let arrGood = JSON.parse(window.localStorage.getItem(key));
      if (arrGood.length === 0) {
        this.noList = true;
        this.centerList = [];
        return;
      }
      this.noList = false;
      // 转换下时间
      arrGood.forEach(val => {
        val.date = this.dateFormat(val.date, "YYYY-MM-DD hh:mm");
      });
      this.centerList = arrGood;
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/ordercenter';
</style>