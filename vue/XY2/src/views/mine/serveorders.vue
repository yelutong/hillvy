<template>
  <div class="wrapper page-serveorders">
    <div class="tab-nav white">
      <div class="item" v-for="(item, index) in statusNav" :key="index" @click="changeTab(index)">
        <span class="nav" :class="{active:index === choseDex}">{{ item }}</span>
      </div>
    </div>
    <div class="order-list">
      <div class="item" v-for="(item, index) in orderList" :key="index" @click="pageToDetail(item)">
        <div class="info">
          <div class="im">
            <span class="tag">订单号</span>
            <span class="con elips">{{ item.orderNo }}</span>
          </div>
          <div class="im">
            <span class="tag">价格</span>
            <span class="con elips">￥{{ item.orderTotalAmount }}</span>
          </div>
          <div class="im">
            <span class="tag">地址</span>
            <span class="con elips">{{ item.shipAddress }}</span>
          </div>
          <div class="im" v-if="choseDex === 1">
            <span class="tag">配送时间</span>
            <span class="con">{{ item.logisticsSendDate }}</span>
          </div>
        </div>
        <i class="ico i-arow i-black"></i>
      </div>
      <v-nodata v-if="noOrder" bgcolor="grey" text="- 暂无服务订单 -" />
    </div>
  </div>
</template>

<script>
  import vNodata from "@/components/v-nodata";
  import { mapState } from "vuex";
  import {
    Toast
  } from "mint-ui";
  export default {
    data() {
      return {
        type: this.getUrlParam('type'),
        choseDex: 0,
        statusNav: ['未送出', '已送出'],
        apiList: {
          senior: [this.api.getSeniorNosend, this.api.getSeniorHassend],
          junior: [this.api.getJuniorNosend, this.api.getJuniorHassend]
        },
        noOrder: false,
        orderList: []
      };
    },
    components: {
      "v-nodata": vNodata
    },
    computed: {
      ...mapState(["token"])
    },
    beforeCreate() {
      document.title = "服务订单";
    },
    created() {
      // 获取服务商/服务点的订单
      this.getSeniorOrders();
    },
    methods: {
      // 切换tab
      changeTab(index) {
        if (this.choseDex !== index) {
          this.choseDex = index;
          this.getSeniorOrders();
        }
      },
      // 获取服务商订单
      getSeniorOrders() {
        const url = this.apiList[this.type][this.choseDex];
        this.orderList = [];
        this.noOrder = false;
        const loading = Toast({
          message: "加载中...",
          iconClass: "loading",
          duration: 10000
        });
        this.$axios.get(url, {
          headers: {
            "Authorization": this.token
          },
        }).then(res => {
          loading.close();
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.message);
            this.noOrder = true;
            return;
          }
          const arrData = resData.content || [];
          if (arrData.length === 0) {
            this.noOrder = true;
            return;
          }
          // 处理下时间
          arrData.forEach(val => {
            val.logisticsSendDate = val.logisticsSendDate ? this.dateFormat(val.logisticsSendDate,
              'YYYY-MM-DD hh:mm:ss') : '暂无';
          });
          this.orderList = arrData;
        }).catch(res => {
          loading.close();
          this.showTip("获取订单列表失败");
          this.noOrder = true;
        });
      },
      // 跳转到订单明细
      pageToDetail(item) {
        let status = "";
        if (this.choseDex === 0) {
          status = "&status=nosend";
        } else {
          status = "&status=hassend";
        }
        this.$router.push("/mine/servedetail?id=" +
          item.orderId +
          "&type=" + this.type +
          status);
      }
    }
  };

</script>

<style lang="stylus">
  @import '../../assets/css/media';
  @import '../../assets/css/serveorders';

</style>
