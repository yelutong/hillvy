<template>
  <div class="account-money "  v-bind:class="{ 'border-top': borderTopShow,'vux-1px-b':'true'}">
    <p class="content-text fs-28">{{title}}</p>
    <p class="content-number horizontal-view " style="vertical-align:bottom">
      <span style="font-size: .56rem;vertical-align:bottom">¥</span>
      <input class="number-input flex1" type="number" v-bind:placeholder="placeholder" v-bind:disabled="disabled"  v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
      <span v-if="cleanShow" class="clean" @click="$emit('clean-text')"></span>
    </p>
  </div>
</template>
<script>
  export default {
    name: 'account-money',
    props: ['title','value','placeholder','borderBottomShow','borderTopShow','cleanShow','disabled']
  }
</script>
<style lang="scss" scoped>
  .account-money{
    padding-top: .3rem;
    /*金额输入框*/
    .content-number{
      height: .8rem;
      line-height: .8rem;
      padding: .25rem 0rem;
      font-size: .56rem;
      color:#000;
      .number-input{
        height: .8rem;
        width: 80%;
        line-height: .8rem;
        font-size: .68rem;
        margin-left:.20rem ;
      }
      .clean{
        width: .36rem;
        background:url("../../assets/images/icon-clean.png") no-repeat;
        background-position:center ;
        background-size: contain;
      }
    }
  }
  .border-top{
    /*border-top: solid 1px #eee;*/
  }
  .border-bottom{
    /*border-bottom: solid 1px #eee;*/
  }
  input[type="number" ]:disabled{
    background-color: #ffffff!important;
  }
</style>
