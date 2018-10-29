<template>
  <div>
    <div class='item-nav' @click='selectShow()'>
      <div class='item-label'>开户省市</div>
      <div class='flex1'>{{value}}</div>
      <div class='forward-arrow'></div>
    </div>
    <div class='popup-box' v-if='show'>
      <div class='mask'></div>
      <div class='popup'>
        <div class="top-content" slot="top-content">
          <div class='pop-btn' @click='cancel()'>取消</div>
          <div>开户省市</div>
          <div class='pop-btn' @click='ensure()'>确定</div>
        </div>
        <smooth-picker ref="smoothPicker" :data="data" :change="dataChange"/>
      </div>
    </div>

  </div>
</template>
<script>
//  import 'vue-smooth-picker/dist/css/style.css'

  export default {
    name: 'group-address-pick',
    components: {},
    data () {
      return {
        provinceNames: [],
        cityNames: [],
        value: this.placeholder || '请选择',
        show: false,
        firstSelect: 0,
        secondSelect: 0,
      }
    },
    created () {

      if (this.list.length) {
        this.provinceNames = this.list.map((item) => {
          return item.provinceName;
        });
        this.cityNames = this.setCityNames(this.firstSelect);
      }


//      console.log('____')
//      console.log(this.list)
//      console.log(this.provinceNameList)
    },
    props: ['list', 'placeholder'],
    computed: {

      data: function () {
        return [
          {
            currentIndex: this.firstSelect,
            flex: 1,
            list: this.provinceNames,
            textAlign: 'center',
            className: 'row-group'
          },
          {
            currentIndex: this.secondSelect,
            flex: 1,
            list: this.cityNames,
            textAlign: 'center',
            className: 'row-group'
          }
        ]
      }
    },
    methods: {
      setCityNames: function (index) {
        return this.list[index].citys.map((item) => item.cityName);
      },
      dataChange (gIndex, iIndex) {
//        console.log('list select', gIndex, iIndex)
        if (gIndex === 0) {
          this.cityNames = this.setCityNames(iIndex);
          this.firstSelect = iIndex;
          this.secondSelect = 0;
//          this.$refs.smoothPicker.setGroupData(1, Object.assign({}, this.data[], { currentIndex, list }))
        } else if (gIndex === 1) {
          this.secondSelect = iIndex;
        }
      },
      selectShow: function () {
        this.show = true;
      },
      cancel: function () {
        this.show = false;
      },
      ensure: function () {
        let province = this.list[this.firstSelect];
        let city = province.citys[this.secondSelect];
        if (province.citys.length > 1) {
          this.value = province.provinceName + city.cityName;
        } else {
          this.value = province.provinceName;
        }

        console.log(province);
        console.log(city);


        this.$store.commit('updateBankFrom', {name: 'openBankProvinceCode', value: province.provinceCode});
        this.$store.commit('updateBankFrom', {name: 'openBankProvinceName', value: province.provinceName});
        this.$store.commit('updateBankFrom', {name: 'openBankCityCode', value: city.cityCode});
        this.$store.commit('updateBankFrom', {name: 'openBankCityName', value: city.cityName});
        this.$store.commit('updateBankFrom', {name: 'address', value: this.value});
        this.cancel();
      }


    }
  }

</script>
<style  lang="scss">
  /*@import "../../assets/vue-smooth-picker/dist/css/style.css";*/
  /*@import "../../../node_modules/vue-smooth-picker/dist/css/style.css";*/
  @import "../../assets/scss/style.scss";
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";


</style>
