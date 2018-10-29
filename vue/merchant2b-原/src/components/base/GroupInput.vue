<template>
  <div class='item-nav' :class='boxClass'>
    <div class='item-label'>{{label}}</div>
    <div class='flex1'>
      <input v-if='this.inputType!=="textarea"' class='full-input' :type='inputType' :placeholder='placeholder'
             :value='value' @input='update'
             :maxlength='this.maxlength' :minlength='this.minlength' v-bind:readonly="isReadOnly"/>
      <textarea v-if='this.inputType==="textarea"' class='full-input' :type='inputType' :placeholder='placeholder'
                :value='value' @input='update'
                :maxlength='this.maxlength' :minlength='this.minlength' v-bind:readonly="isReadOnly"></textarea>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'group-input',
    data () {
      return {}
    },
    props: ['label', 'value', 'placeholder', 'option', 'readonly', 'mutation', 'maxlength', 'minlength', 'type'],
    computed: {
      boxClass: function () {
       return this.inputType==="textarea"?"block-nav":""
      },
      isReadOnly: function () {
        return this.readonly === "readonly";
      },
      inputType: function () {
        if (this.type) {
          return this.type
        }
        return 'text'
      }

    },
    methods: {
      update(e) {
        if (this.maxlength && this.type === "number") {
          let len = (e.target.value + "").length;
          let maxLen = parseInt(this.maxlength);
          if (len > maxLen) {
            e.target.value = parseInt((e.target.value + "").substr(0, maxLen));
          }
        }
        if (this.mutation) {
          this.$store.commit(this.mutation, {name: this.option, value: e.target.value})
        } else {
          this.$store.commit('update', {name: this.option, value: e.target.value})
        }

      }
    }
  }
</script>
<style  lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";


</style>
