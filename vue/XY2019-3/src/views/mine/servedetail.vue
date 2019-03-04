<template>
  <div class="wrapper page-servedetail">
    <div class="lay-detail" v-if="!!serveDetail">
      <v-tagcon title="订单号" :con="serveDetail.orderNo" />
      <div class="group" v-for="(item, index) in serveDetail.orderServiceDetailProducts" :key="index">
        <v-tagcon title="商品名称" :con="item.productName" />
        <v-tagcon title="数量" :con="item.countDesc" />
      </div>
      <v-tagcon title="总价" :con="'￥'+serveDetail.orderTotalAmount" :nobdr="true" :mb="true" />
      <v-tagcon title="姓名" :con="serveDetail.shipName" />
      <v-tagcon title="电话" :con="serveDetail.shipMobile" />
      <v-tagcon title="地址" :con="serveDetail.shipAddress" :more="true" />
      <v-tagcon title="下单时间" v-if="status === 'hassend'" :con="serveDetail.createDate" />
      <v-tagcon title="下单时间" v-if="status === 'nosend'" :con="serveDetail.createDate" :nobdr="true" :mb="true" />
      <v-tagcon title="发货时间" v-if="status === 'hassend'" :con="serveDetail.sendDate" :nobdr="true" :mb="true" />
      <v-tagcon title="备注" :con="serveDetail.orderRemark" :nobdr="true" :more="true" :mb="true" />
    </div>
    <div class="lay-action" v-if="status === 'nosend'">
      <button class="btn-submit" @click="pageToGrant">{{ type ==='senior' ? '分 配' : '接 单' }}</button>
      <button class="btn-submit grey" @click="orderToPlat">转 单</button>
    </div>
  </div>
</template>

<script>
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
        type: this.getUrlParam('type'),
        id: this.getUrlParam('id'),
        status: this.getUrlParam('status'),
        serveDetail: null
      };
    },
    components: {
      "v-tagcon": vTagcon
    },
    computed: {
      ...mapState(["token"])
    },
    beforeCreate() {
      document.title = "订单详情";
    },
    created() {
      // 获取服务订单明细
      this.getServeDetail();
    },
    methods: {
      // 获取服务订单详情
      getServeDetail() {
        this.$axios.get(this.type === 'senior' ? this.api.getSeniorDetail : this.api.getJuniorDetail, {
          headers: {
            "Authorization": this.token
          },
          params: {
            order_id: this.id
          }
        }).then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.message);
            return;
          }
          // 成功后改造下时间
          const objData = resData.content;
          objData.createDate = objData.createDate ? this.dateFormat(objData.createDate, 'YYYY-MM-DD hh:mm:ss') :
            '暂无';
          objData.sendDate = objData.logisticsSendDate ? this.dateFormat(objData.logisticsSendDate,
              'YYYY-MM-DD hh:mm:ss') :
            '暂无';
          this.serveDetail = objData;
        }).catch(res => {
          this.showTip("获取服务订单失败，请返回重试");
        });
      },
      // 转单给平台
      orderToPlat() {
        if (!this.serveDetail) {
          this.showTip('未获取到订单信息，暂不能操作');
          return;
        };
        const loading = Toast({
          message: "转单中...",
          iconClass: "loading",
          duration: 10000
        });
        this.$axios.get(this.type === 'senior' ? this.api.seniorToPlat : this.api.juniorToPlat, {
          headers: {
            "Authorization": this.token
          },
          params: {
            order_id: this.id
          }
        }).then(res => {
          loading.close();
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.message);
            return;
          }
          // 成功后返回
          this.showTip('转单成功！', 2000, 'ok');
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        }).catch(res => {
          loading.close();
          this.showTip("转单失败，请重试");
        });
      },
      // 跳转到分配||接单发货
      pageToGrant(item) {
        const serveDetail = this.serveDetail;
        let url = '';
        if (!serveDetail) {
          this.showTip('未获取到订单信息，暂不能操作');
          return;
        };
        window.localStorage.setItem('serveOrderInfo', JSON.stringify({
          'orderId': serveDetail.orderId,
          'orderNo': serveDetail.orderNo,
          'orderAddress': serveDetail.shipAddress
        }));
        setTimeout(() => {
          this.$router.push(this.type === 'senior' ? '/mine/seniorgrant' :
            '/mine/juniorgrant')
        }, 0);
      }
    }
  };

</script>

<style lang="stylus">
  @import '../../assets/css/media';
  @import '../../assets/css/servedetail';

</style>
