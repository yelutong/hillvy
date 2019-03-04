<!-- 标题箭头栏目 -->
<template>
  <div class="v-cell-box">
    <div class="lay-cell">
      <template v-if="type === 'input'">
        <span class="title">{{ title }}</span>
        <input class="ipt" v-if="pro==='phone'" type="number" :placeholder="place" v-model.trim="cptIptCon" @change="changeIptCon"
        />
        <input class="ipt" v-else type="text" :placeholder="place" v-model.trim="cptIptCon" @change="changeIptCon" />
      </template>
      <template v-else-if="type==='region'">
        <span class="title">{{ title }}</span>
        <p class="no-city" :class="{has:this.address.length !== 0}">{{ showAddress }}</p>
        <x-address title="" v-model="actAddress" :list="chinaAddress" @on-hide="actRegion" @on-shadow-change="changeRegion"></x-address>
        <i class="ico" :class="'i-'+ricon"></i>
      </template>
      <template v-else-if="type==='btn'">
        <div class="link">
          <span class="title">{{ title }}</span>
          <p class="text" :class="align">{{ value }}</p>
          <i class="ico" :class="'i-'+ricon"></i>
        </div>
      </template>
      <template v-else>
        <router-link class="link" :to="link">
          <span class="title">{{ title }}</span>
          <p class="text" :class="align">{{ value }}</p>
          <i class="ico" :class="'i-'+ricon"></i>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
  import {
    XAddress,
    Cell,
    ChinaAddressV4Data,
    Value2nameFilter as value2name
  } from "vux";
  export default {
    data() {
      return {
        cptIptCon: '',
        hideAddress: [],
        actAddress: [],
        arrId:[],
        chinaAddress: ChinaAddressV4Data
      };
    },
    props: {
      type: {
        type: String,
        default: "link"
      },
      title: String,
      value: String,
      iptCon: String || Number,
      pro: String,
      address: Array,
      align: {
        type: String,
        default: "left"
      },
      link: String,
      ricon: {
        type: String,
        default: "grey"
      },
      place: {
        type: String,
        default: "请输入关键字"
      }
    },
    components: {
      XAddress,Cell
    },
    computed: {
      showAddress() {
        const address = this.address;
        if (address.length === 0) {
          return "省 市 区";
        } else {
          return address[0] + " " + address[1] + " " + address[2];
        }
      }
    },
    watch: {
      iptCon(newVal, oldVal) {
        this.cptIptCon = newVal;
      }
    },
    methods: {
      // 输入框输入事件
      changeIptCon() {
        this.$emit("iptChange", {
          pro: this.pro,
          value: this.cptIptCon
        });
      },
      // 选择省市区
      changeRegion(arrId, arrTxt) {
        this.hideAddress = arrTxt;
        this.arrId = arrId;
      },
      // 确定选择省市区
      actRegion(act) {
        console.log(this.actAddress);
        console.log(value2name(this.actAddress, ChinaAddressV4Data));
        if (act) {
          // 如果点了确定
          this.actAddress = this.hideAddress;
          
          //console.log(document.getElementByclassName('weui-cell__ft'));
          
          this.$emit("iptChange", {
            pro: this.pro,
            value: this.actAddress,
            areaId: this.arrId.pop()
          });
        }
      }
    }
  };

</script>

<style lang="stylus">
  @import '../assets/css/media';

  .v-cell-box {
    height: 44px;
    padding-left: 15px;
    background-color: #fff;
    transition: background-color 0.2s;

    &:active {
      background-color: #f5f5f5;
    }

    .lay-cell {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
      height: 100%;
      padding-right: 15px;
      bd-line(bottom, 1px, #eaeaea);

    }

    .title {
      margin-right: 15px;
      font-size: 15px;
    }

    .ipt {
      flex: 1;
      font-size: 14px;
    }

    .link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
    }

    .text {
      flex: 1;
      text-align: left;
      font-size: 14px;
      color: #979797;

      &.center {
        text-align: center;
      }

      &.right {
        text-align: right;
      }
    }

    .vux-cell-box {
      flex: 1;
      height: 100%;
      z-index: 2;
      opacity: 0;

      &:before {
        display: none;
      }

      .weui-cell {
        display: flex;
        align-items: center;
        height: 100%;
      }

      .vux-cell-primary {
        flex: 1;
        height: 100%;
      }

      .vux-popup-picker-select {
        display: flex;
        height: 100%;
        align-items: center;
        text-align: left !important;
      }

      .vux-cell-value {
        font-size: 14px;
        color: #000;
      }
    }

    .no-city {
      position: absolute;
      top: 0;
      left: 45px;
      display: flex;
      align-items: center;
      padding-right: 20px;
      font-size: 14px;
      color: #828282;
      height: 44px;
      z-index: 1;

      &.has {
        color: #000;
      }
    }

    .ico {
      width: 10px;
      height: 10px;
      margin-left: 4px;
      border: solid #d9d9d9;
      border-radius: 2px;
      border-width: 2px 2px 0 0;
      background: none;
      -webkit-transform: rotateZ(45deg);
      transform: rotateZ(45deg);
    }

    .i-black {
      border-color: #4a4a4a;
    }

    .i-blue {
      border-color: #FF4F00;
    }
  }

</style>
