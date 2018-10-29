<template>
  <div class="wrapper page-address">
    <div class="lay-adres">
      <v-cell type="input" title="联系人" place="收货人姓名" pro="name" :iptCon="addressData.name" @iptChange="changeData"></v-cell>
      <v-cell type="input" title="电话" place="收货人手机号码" pro="phone" :iptCon="addressData.phone" @iptChange="changeData"></v-cell>
      <v-cell type="region" title="城市" pro="city" :address="addressData.city" @iptChange="changeData"></v-cell>
      <v-cell type="input" title="详细地址" place="街道/小区/楼栋/序号" pro="adres" :iptCon="addressData.adres" @iptChange="changeData"></v-cell>
    </div>
    <div class="lay-action fix-btom">
      <button class="btn-submit nordu" @click="saveAddress">保 存</button>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import vCell from "@/components/v-cell";
  const qs = require("qs");
  export default {
    data() {
      return {
        addressId: this.getUrlParam("address-id") || "",
        addressData: {
          name: "",
          phone: "",
          city: [],
          adres: ""
        }
      };
    },
    components: {
      "v-cell": vCell
    },
    computed: {
      ...mapState(["token"])
    },
    created() {
      // 来源id，有id就是编辑，没有就是新增
      const addressId = this.addressId;
      if (!!addressId) {
        // 延迟加载，以防cell组件没加载
        setTimeout(() => {
          this.getAddressData(addressId);
        }, 0);
      }
    },
    methods: {
      // 父子通信
      changeData(data) {
        this.addressData[data.pro] = data.value;
      },
      // 读取需要编辑的地址
      getAddressData(addressId) {
        this.$axios
          .get(this.api.getAddress, {
            headers: {
              access_token: this.token
            },
            params: {
              address_id: addressId
            }
          })
          .then(res => {
            const resData = res.data;
            if (resData.code !== 100) {
              this.showTip("读取来源地址失败");
              return;
            }
            // 成功后赋值
            const objData = resData.data;
            this.addressData.name = objData.shipName;
            this.addressData.phone = objData.shipPhone;
            this.addressData.city = [objData.provinceName, objData.cityName, objData.areaName];
            this.addressData.adres = objData.shipAddress;
          })
          .catch(res => {
            this.showTip("读取来源地址失败");
          });
      },
      // 保存我的地址
      saveAddress() {
        const addressId = this.addressId;
        const addressData = this.addressData;
        // 检验数据先
        if (addressData.name === "") {
          this.showTip("请填写收货人姓名");
          return;
        }
        if (addressData.phone.length !== 11) {
          this.showTip("请输入正确的手机号码格式");
          return;
        }
        if (addressData.city.length === 0) {
          this.showTip("请选择收货省市区");
          return;
        }
        if (addressData.adres === "") {
          this.showTip("请填写详细收货地址");
          return;
        }
        // 校验通过后：预设为新增地址
        let okTip = "新增收货地址成功";
        let errTip = "新增收货地址失败";
        let ajaxApi = this.api.addAddress;
        let ajaxData = {
          ship_name: addressData.name,
          ship_phone: addressData.phone,
          province_name: addressData.city[0],
          city_name: addressData.city[1] === '市辖区' ? addressData.city[0] : addressData.city[1],
          area_name: addressData.city[2],
          ship_address: addressData.adres
        };
        // 如果有ID，则改为编辑地址
        if (!!addressId) {
          okTip = "修改收货地址成功";
          errTip = "修改收货地址失败";
          ajaxApi = this.api.editAddress;
          ajaxData.address_id = addressId;
        }
        // 开始保存
        this.$axios
          .post(ajaxApi, qs.stringify(ajaxData), {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              access_token: this.token
            }
          })
          .then(res => {
            const resData = res.data;
            if (resData.code !== 100) {
              this.showTip(errTip);
              return;
            }
            // 成功后返回
            this.showTip(okTip, 1500, "ok");
            setTimeout(() => {
              this.$router.go(-1);
            }, 1600);
          })
          .catch(res => {
            this.showTip(errTip);
          });
      }
    }
  };

</script>

<style lang="stylus">
  @import '../../assets/css/address';

</style>
