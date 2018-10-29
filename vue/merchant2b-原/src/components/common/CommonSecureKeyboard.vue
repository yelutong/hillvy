<template>
  <popup v-model="value" :hide-on-blur="false">
    <article class="bg-white full-screen">
      <header class="fs-32 txt-black border-bottom border-top">
        <div class="close" @click="close"></div>
        <div class="title horizontal-view align-items-center justify-content-center">{{title}}</div>
      </header>
      <section class="password horizontal-view align-items-center justify-content-space-between border-bottom">
        <span v-for="item in 6" :key="item" :class="{'active': password.length >= item}"></span>
      </section>
      <div class="keypad vertical-view" @click="inputing">
        <div class="horizontal-view border-bottom"><span>1</span><span class="border-left border-right">2</span><span>3</span></div>
        <div class="horizontal-view border-bottom"><span>4</span><span class="border-left border-right">5</span><span>6</span></div>
        <div class="horizontal-view border-bottom"><span>7</span><span class="border-left border-right">8</span><span>9</span></div>
        <div class="horizontal-view"><span class="useless"></span><span>0</span><span @click="backspace" class="backspace useless"></span></div>
      </div>
    </article>
  </popup>
</template>

<script>
export default {
  data () {
    return {
      password: ''
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '输入交易密码'
    }
  },
  methods: {
    inputing ($event) {
      let target = $event.target
      if (!/useless/.test(target.className)) {
        if (this.password.length < 6) {
          this.password += target.innerText
        }
        if (this.password.length >= 6) {
          let pwd = this.password
          this.password = ''
          this.$emit('inputfinished', pwd)
          this.$emit('close')
        }
      }
    },
    backspace () {
      if (this.password.length > 0) {
        this.password = this.password.substr(0, this.password.length - 1)
      }
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
  article{
    header{
      .close{
        width:.66rem;
        height: .81rem;
        position: absolute;
        left:0;
        background: url("../../assets/images/close.png") no-repeat center;
        background-size: .22rem;
      }
      .title{
        height: .81rem;
      }
    }
    .password{
      height: 2.42rem;
      padding:0 1.09rem;
      span{
        display: inline-block;
        width: .34rem;
        height: .34rem;
        background: url("../../assets/images/keyboard_value.png") no-repeat;
        background-size: .34rem .68rem;
      }
      span.active{
        background-position-y: -.34rem;
      }
    }
    .keypad:active{
      -webkit-tap-highlight-color:transparent;
    }
    .keypad{
      -webkit-tap-highlight-color:transparent;
      div:last-child{
        span:first-child{
          background:#dae1e6;
        }
      }
      span{
        display: inline-block;
        font-size: .42rem;
        flex: 1;
        text-align: center;
        height: 1.01rem;
        line-height: 1.01rem;
      }
      .backspace{
        background: #dae1e6 url("../../assets/images/keyboard_backspace.png") no-repeat center;
        background-size: .43rem .28rem;
      }
    }
  }
</style>
