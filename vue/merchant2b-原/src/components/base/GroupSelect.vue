<template>
  <div>
    <div class='item-nav' @click='selectShow()'>
      <div class='item-label'>{{label}}</div>
      <div class='flex1'>{{finalName}}</div>
      <div class='forward-arrow'></div>
    </div>
    <picker v-model="show" :data-items="list" @change="onValuesChange">
      <div class="top-content" slot="top-content">
        <div class='pop-btn' @click='cancel()'>取消</div>
        <div>{{label}}</div>
        <div class='pop-btn' @click='ensure()'>确定</div>
      </div>
    </picker>
  </div>
</template>
<script>

  //  import Picker from 'better-picker'
  export default {
    name: 'group-select',
    components: {},
    created: function () {
      console.log("group-select this.value___" + this.option)
      console.log("this.value",this.value,!this.value,this.value)
      console.log(!this.value)
      let placeholder = "";
      let selectedIndex = 0;
      if (!this.value || this.value === "") {


        if (this.selected) {
          selectedIndex = this.selected;
        }
        this.list.forEach((item) => {
          if (typeof item.values[selectedIndex] === "object") {
            placeholder += item.values[selectedIndex].value;
          } else {
            placeholder += item.values[selectedIndex];
          }
        });
        this.finalName = placeholder || "请选择";

      } else {
        this.finalName = this.value || "请选择";
      }
      console.log('placeholder', placeholder)
    },
    data () {
      return {
        show: false,
        finalName: ''
      }
    },
    props: ['label', 'value', 'list', "selected", 'option', 'mutation'],
    computed: {
      name () {
        let placeholder = "";
        let selectedIndex = 0;
        if (this.selected) {
          selectedIndex = this.selected;
        }
        if (!this.value) {
          this.list.forEach((item) => {
            if (typeof item.values[selectedIndex] === "object") {
              placeholder += item.values[selectedIndex].value;
            } else {
              placeholder += item.values[selectedIndex];
            }
          });
          return placeholder;
        }

        return this.value;
      }
    },
    methods: {

      selectShow: function () {
        this.show = true;
      },
      cancel: function () {
        this.show = false;
      },
      ensure: function () {
        this.cancel();
      },
      onValuesChange(...args) {
        let placeholder = "";
        let temValue = '';
        args.forEach((item) => {
          if (typeof item === "object") {
            placeholder += item.value;
            temValue += item.name;
          } else if (item) {
            placeholder += item;
            temValue += item;

          }
        });
        console.log(temValue);
        if (this.mutation) {
          this.$store.commit(this.mutation, {name: this.option, value: temValue});
        } else {
          this.$store.commit('update', {name: this.option, value: temValue});
        }
//
        this.finalName = placeholder;


      }
    }
  }
</script>
<style  lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";
</style>
