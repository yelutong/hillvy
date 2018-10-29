<template>
  <div>
    <div class='item-nav' @click='selectShow()'>
      <div class='item-label'>{{label}}</div>
      <div class='flex1'>{{placeholder}}</div>
      <div class='forward-arrow'></div>
    </div>
    <div class='popup-box' v-if='show'>
      <div class='mask'></div>
      <div class='popup'>
        <div class="top-content" slot="top-content">
          <div class='pop-btn' @click='cancel()'>取消</div>
          <div>{{title}}</div>
          <div class='pop-btn' @click='ensure()'>确定</div>
        </div>
        <smooth-picker ref="smoothPicker" :data="data" :change="dataChange"/>
      </div>
    </div>
    <!--<picker v-model="show" data-items="list" @change="onValuesChange">-->
    <!--<div class="top-content" slot="top-content">-->
    <!--<div class='pop-btn' @click='cancel()'>取消</div>-->
    <!--<div>{{label}}</div>-->
    <!--<div class='pop-btn' @click='ensure()'>确定</div>-->
    <!--</div>-->
    <!--</picker>-->
  </div>
</template>
<script>
//  import 'vue-smooth-picker/dist/css/style.css'

  //import SmoothPicker from 'vue-smooth-picker'
  //  import {Popup} from 'vux'
  let now = new Date();
  let curentYear = now.getFullYear();

  export default {
//    components: {},
    data () {
      return {
        tips: '有效期在不能早于当前日期',
        show: false,
        selectYearIndex: 1,
        selectMonthIndex: 0,
        selectDayIndex: 0,
        years: [],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        days: [],
        selectYear: 2018,
        selectMonth: 1,
        selectDay: '1',
        placeholder: this.value || '请选择',
        title: '请选择'

      }
    },
    created () {
      this.setYearArr();
      this.setDays(this.years[this.selectYearIndex], 1);
    },
    props: ['label', 'value', 'option', 'type', 'startYear'],
    computed: {
      data: function () {
        return [
          {
            currentIndex: this.selectYearIndex,
            flex: 3,
            list: this.years,
            textAlign: 'center',
            className: 'row-group'
          },
          {
            currentIndex: this.selectMonthIndex,
            flex: 3,
            list: this.months,
            textAlign: 'center',
            className: 'row-group'
          },
          {
            currentIndex: this.selectDayIndex,
            flex: 3,
            list: this.days,
            textAlign: 'center',
            className: 'item-group'
          }
        ]
      }
    },
    methods: {

      dataChange (gIndex, iIndex) {
//        console.info('list', gIndex, iIndex);
        switch (gIndex) {
          case 0:
            this.selectYearIndex = iIndex;

            if (this.years[this.selectYearIndex] === '长期') {
              this.months = ["--"];
              this.days = ["--"];
              this.selectMonthIndex = 0;
              this.selectDayIndex = 0;
              let timer = setTimeout(function () {
                this.selectMonthIndex = 0;
                this.selectDayIndex = 0;
                clearTimeout(timer);
                timer = null;
              }.bind(this), 1000)
            } else {
              this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
              this.setDays(this.years[this.selectYearIndex], this.months[this.selectMonthIndex]);
            }
            break;
          case 1:
            this.selectMonthIndex = iIndex;

            if (this.months[this.selectMonthIndex] === '--') {
              this.days = ["--"];
              this.selectDayIndex = 0;
            } else {
              this.setDays(this.years[this.selectYearIndex], this.months[this.selectMonthIndex])
            }
            break;
          case 2:
            this.selectDayIndex = iIndex;
            break;
        }
//        console.log('select', this.selectYearIndex, this.selectMonthIndex, this.selectDayIndex)
//        console.log("date", this.years[this.selectYearIndex], this.months[this.selectMonthIndex], this.days[this.selectDayIndex])
      },
      selectShow: function () {
        this.show = true;
      },
      cancel: function () {
        this.show = false;
      },
      ensure: function () {
        let date;
        if (this.years[this.selectYearIndex] === "长期") {
          this.placeholder = '长期';
          date = '2999-12-12';
        } else {
          if (this.type === "yyzz" || this.type === "id") {
            let selectDay = new Date();
            selectDay.setYear(this.years[this.selectYearIndex]);
            selectDay.setMonth(parseInt(this.months[this.selectMonthIndex]-1));
            selectDay.setDate(parseInt(this.days[this.selectDayIndex]));
            console.log("selectDay",this.years[this.selectYearIndex],this.months[this.selectMonthIndex]-1,this.days[this.selectDayIndex]);
            console.log("selectDay",selectDay,selectDay.getTime() - new Date().getTime());
            if (selectDay.getTime() - new Date().getTime() < 0) {
              this.$vux.toast.text((this.type === "yyzz" ?"营业期限不能小于当前日期":"有效期限不能小于当前日期"));
              return;
            }
          }
          let years = [this.years[this.selectYearIndex], this.months[this.selectMonthIndex], this.days[this.selectDayIndex]];
          date = years.join("-");
          this.placeholder = date;
        }
        console.log("date", date, this.years[this.selectYearIndex], this.months[this.selectMonthIndex], this.days[this.selectDayIndex]);
        this.$store.commit('update', {name: this.option, value: date});
        this.cancel();
      },

      setYearArr: function () {
        this.years = [];
        let i = this.startYear || 1910;
        switch (this.type) {
          case 'id':
            this.tips = '有效期限不能小于当前日期';
            this.title = '有效期限（止）';
            i = curentYear;
            this.selectYearIndex = 1;
            this.years.push('长期');
//            i = 1910;
//            this.selectYearIndex = 70;
            break;
          case 'yyzz':
            this.tips = '营业期限不能小于当前日期';
            this.title = '营业期限（止）';
            i = curentYear;
            this.selectYearIndex = 1;
            this.years.push('长期');
            break;
          default:
            i = 1910;
            this.selectYearIndex = 70;
            break;
        }

        for (; i < 2100; i++) {
          this.years.push(i);
        }
      },
      setDays: function (year, month) {
//        console.log('setDays', year, month);
        let arr = [];
        let date = new Date();
        date.setYear(year);
        date.setMonth(month);
        date.setDate(0);
        let lastDay = date.getDate();
        for (let i = 1; i <= lastDay; i++) {
          arr.push(i);
        }
        this.days = arr;
//        console.log(this.days);
//        console.log('setDays');
      }
    }
  }

</script>
<style  lang="scss">
  /*@import "../../assets/vue-smooth-picker/dist/css/style.css";*/
  @import "../../assets/scss/style.scss";
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";


</style>
