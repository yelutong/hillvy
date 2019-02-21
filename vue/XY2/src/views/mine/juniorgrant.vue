<template>
  <div class="wrapper page-juniorgrant">
    <div class="lay-info">
      <v-cell type="btn" title="订单号" :value="serveOrderInfo.orderNo || ''" />
    </div>
    <div class="lay-chose">
      <v-cell type="input" title="运单号" place="请填写运单号" pro="num" :iptCon="expressData.num" @iptChange="changeData" />
      <div class="v-cell-box">
        <div class="lay-cell">
          <span class="title">物流公司</span>
          <select class="select" :class="{chose:expressData.name!=='请选择物流公司'}" @change="choseExpress">
            <option :value="-1">请选择物流公司</option>
            <option v-for="(item, index) in expressList" :key="index" :value="index">{{ item.logisticsName }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="lay-action">
      <button class="btn-submit" @click="juniorSend">确定发货</button>
    </div>
  </div>
</template>

<script>
  import vCell from "@/components/v-cell";
  import vTagcon from "@/components/v-tagcon";
  import {
    mapState
  } from "vuex";
  import {
    Toast
  } from "mint-ui";
  const qs = require("qs");
  export default {
    data() {
      return {
        serveOrderInfo: {},
        expressData: {
          num: '',
          id: '',
          name: '请选择物流公司'
        },
        expressList: []
      };
    },
    components: {
      "v-cell": vCell,
      "v-tagcon": vTagcon
    },
    computed: {
      ...mapState(["token"])
    },
    beforeCreate() {
      document.title = "发货";
    },
    created() {
      // 从缓存拿订单信息
      this.serveOrderInfo = JSON.parse(window.localStorage.getItem('serveOrderInfo'));
      // 获取物流列表
      this.getExpressList();
    },
    methods: {
      // 父子通信
      changeData(data) {
        this.expressData.num = data.value;
      },
      // 选择物流
      choseExpress(data) {
        const index = +data.target.value;
        if (index === -1) {
          this.expressData.name = '请选择物流公司';
          this.expressData.id = '';
        } else {
          this.expressData.name = this.expressList[index].logisticsName;
          this.expressData.id = this.expressList[index].id;
        }
      },
      // 获取物流列表
      getExpressList() {
        this.$axios.get(this.api.getJuniorExpress, {
          headers: {
            "Authorization": this.token
          },
        }).then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.message);
            return;
          }
          this.expressList = resData.content || [];
        }).catch(res => {
          this.showTip('获取物流公司失败');
        });
      },
      // 服务点接单发货
      juniorSend() {
        const orderNo = this.serveOrderInfo.orderNo
        const expressNum = this.expressData.num;
        const expressId = this.expressData.id;
        if (!orderNo) {
          this.showTip('没有获取到订单号');
          return;
        }
        if (expressNum === '') {
          this.showTip('请输入运单号');
          return;
        }
        if (expressId === '') {
          this.showTip('请选择发货的物流公司');
          return;
        }
        // 拿到所需参数
        const loading = Toast({
          message: "发货中...",
          iconClass: "loading",
          duration: 10000
        });
        this.$axios.post(this.api.juniorSend, qs.stringify({
          order_no: orderNo,
          logistics_no: expressNum,
          logistic_id: expressId
        }), {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": this.token
          }
        }).then(res => {
          loading.close();
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.message);
            return;
          }
          // 成功之后返回列表
          this.showTip('订单发货成功！', 2000, 'ok');
          setTimeout(() => {
            this.$router.go(-2);
          }, 2000);
        }).catch(res => {
          loading.close();
          this.showTip('发货失败，请重试');
        });
      }
    }
  };

</script>

<style lang="stylus">
  @import '../../assets/css/media';
  @import '../../assets/css/juniorgrant';

</style>
