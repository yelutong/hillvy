<template>
  <div class="checkSquarebox align-items-center" :class="{'checked' : agreements}" :checked="agreements" @click="updateValue"></div>
</template>

<script>
export default {
  name: 'check-squarebox',
  data () {
    return {
      agreementVal: true
    }
  },
  props: ['imAgree'],
  computed: {
    agreements () {
      return this.imAgree || this.agreementVal
    }
  },
  methods: {
    updateValue () {
      if (this.agreementVal) {
        this.agreementVal = false
      } else {
        this.agreementVal = true
      }
      this.$emit('updateValue', this.agreementVal)
    }
  }
}
</script>

<style scoped>
.checkSquarebox{
  width:.36rem;
  height: .36rem;
  background: url("../../assets/images/check-squre.png") no-repeat;
  background-size: .36rem .72rem;
  background-position-y: -.36rem;
  display:inline-block;
  margin-right:0.18rem;
}
.checkSquarebox.checked{
  background-position-y: 0;
}
</style>
