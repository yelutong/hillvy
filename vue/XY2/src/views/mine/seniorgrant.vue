<template>
  <div class="wrapper page-seniorgrant">
    <div class="lay-info" v-if="!!serveOrderInfo">
      <v-tagcon title="订单号" :con="serveOrderInfo.orderNo" />
      <v-tagcon title="订单地址" :con="serveOrderInfo.orderAddress" :nobdr="true" :more="true" />
    </div>
    <div class="lay-junior white" v-if="juniorList.length>0">
      <p class="tag">服务点</p>
      <div class="item" v-for="(item, index) in juniorList" :key="index" @click="choseJunior(item, index)">
        <i class="ico i-cks" :class="{checked:item.checked}"></i>
        <p class="address elips">{{ item.siteAddress }}</p>
        <p class="distance">
          距收货地址
          <span class="num">{{ item.distance || '--' }}km</span>
        </p>
      </div>
    </div>
    <v-nodata v-if="noJunior" bgcolor="grey" text="- 暂无服务点 -" />
    <div class="lay-action">
      <button class="btn-submit" @click="orderToJunior">确定分配</button>
    </div>
  </div>
</template>

<script>
  import vNodata from "@/components/v-nodata";
  import vTagcon from "@/components/v-tagcon";
  import {
    mapState
  } from "vuex";
  import {
    Toast
  } from "mint-ui";
  export default {
    data() {
      return {
        serveOrderInfo: null,
        noJunior: false,
        juniorList: []
      };
    },
    components: {
      "v-nodata": vNodata,
      "v-tagcon": vTagcon
    },
    computed: {
      ...mapState(["token"])
    },
    beforeCreate() {
      document.title = "分配";
    },
    created() {
      // 从缓存拿订单信息
      this.serveOrderInfo = JSON.parse(window.localStorage.getItem('serveOrderInfo'));
      // 获取服务点列表
      this.getJuniorList();
    },
    methods: {
      // 获取服务点列表
      getJuniorList() {
        this.$axios.get(this.api.getJuniors, {
          headers: {
            "Authorization": this.token
          },
          params: {
            order_id: this.serveOrderInfo.orderId
          }
        }).then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.message);
            this.noJunior = true;
            return;
          }
          const arrData = resData.content || [];
          if (arrData.length === 0) {
            this.noJunior = true;
            return;
          }
          // 重组下数据
          arrData.forEach((val, index) => {
            val.checked = index === 0 ? true : false;
          });
          this.juniorList = arrData;
        }).catch(res => {
          this.showTip('获取服务点失败');
          this.noJunior = true;
        });
      },
      // 切换选择的地址
      choseJunior(item, index) {
        const juniorList = this.juniorList;
        if (!item.checked) {
          juniorList.forEach(val => {
            val.checked = false;
          });
          item.checked = true;
        }
      },
      // 分配订单给服务点
      orderToJunior() {
        const loading = Toast({
          message: "分配中...",
          iconClass: "loading",
          duration: 10000
        });
        // 拿到订单id和选中的服务点id
        const orderId = this.serveOrderInfo.orderId;
        const siteId = this.juniorList.filter(val => {
          return val.checked === true;
        })[0].siteId;
        this.$axios.get(this.api.seniorToJunior, {
          headers: {
            "Authorization": this.token
          },
          params: {
            order_id: orderId,
            site_id: siteId
          }
        }).then(res => {
          loading.close();
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.message);
            return;
          }
          // 成功之后返回列表
          this.showTip('订单分配成功！', 2000, 'ok');
          setTimeout(() => {
            this.$router.go(-2);
          }, 2000);
        }).catch(res => {
          loading.close();
          this.showTip('分配失败，请重试');
        });
      }
    }
  };

</script>

<style lang="stylus">
  @import '../../assets/css/media';
  @import '../../assets/css/seniorgrant';

</style>
