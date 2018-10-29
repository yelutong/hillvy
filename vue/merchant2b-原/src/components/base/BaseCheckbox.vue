<template>
  <div class="checkbox" :class="{checked: checked}"></div>
</template>

<script>
export default {
  props: [
    'checked'
  ]
}
</script>

<style scoped>
.checkbox{
  width:.36rem;
  height: .36rem;
  background: url("../../assets/images/check.png") no-repeat;
  background-size: .36rem .72rem;
  background-position-y: -.36rem;
}
.checkbox.checked{
  background-position-y: 0;
}
</style>
