<template>
  <nav class='auth-nav-box'>
    <div v-for="(item, index) in items" :key="item.id">
      <div class='auth-status-labels'>
        <div class='auth-states-line flex1' v-bind:class="{ 'auth-states-border-active': setBorderF(status,index)}"></div>
        <div class='auth-states-icon' v-bind:class="{ 'auth-states-icon-active': status==index,'auth-states-border-active2': setBorderF(status,index)}"></div>
        <div class='auth-states-line flex1' v-bind:class="{ 'auth-states-border-active': setBorderB(status,index)}"></div>
      </div>
      <div class='auth-states-text' v-bind:class="{ 'auth-states-text-active': status>=index }">
        {{item}}
      </div>
    </div>
  </nav>

</template>

<script>
  const items = ['选择类型', '填写企业信息', '填写身份信息', '完成认证'];
  export default {
    data () {
      return {
        items: items,
      }
    },
    computed: {

    },
    name: 'progress-nav',
    props: {
      status: {
        type: Number
      }
    },
    methods:{
      setBorderF:function (stauts,index) {
        return index<=stauts;
      },
      setBorderB:function (stauts,index) {
        return index<stauts;
      }
    }
  }


</script>

<style lang="scss">
  @import "../../components/authentication/ProgressNav.scss";
</style>

