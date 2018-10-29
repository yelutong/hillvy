<template>
  <popup v-model="value" :hide-on-blur="false">
    <article class="bg-white full-screen">
      <header class="fs-32 txt-black border-bottom border-top horizontal-view">
        <div class="close" @click="close"></div>
        <div class="title horizontal-view align-items-center justify-content-center flex1">{{title}}</div>
        <span class="button fs-30 txt-blue" @click="$emit('getverifycode', code)" v-show="code.length === 6">提交</span>
        <span class="button fs-30 txt-gray" v-show="code.length !== 6">提交</span>
      </header>
      <section class="password horizontal-view align-items-center border-bottom justify-content-space-between">
        <div class="flex1 fs-36">{{code}}</div>
        <div class="button txt-blue fs-30 txt-center" v-show="!got"><span @click="getCode">{{button}}</span></div>
        <div class="button txt-dark fs-30 txt-center" v-show="got">{{countdown}} s</div>
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
import padStart from 'lodash/padStart'
export default {
  data () {
    return {
      code: '',
      got: false,
      button: '获取验证码',
      gap: 60,
      clock: 0
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '短信验证码'
    }
  },
  computed: {
    codeArr () {
      return this.code.split('')
    },
    countdown () {
      return padStart(this.gap - this.clock, 2, '0')
    }
  },
  methods: {
    getCode () {
      this.got = true
      this.button = '重新获取'
      let fn = () => {
        if (++this.clock <= this.gap) {
          setTimeout(fn, 1000)
        } else {
          this.got = false
          this.clock = 0
        }
      }
      setTimeout(fn, 1000)
      this.$emit('sendcode')
    },
    inputing ($event) {
      let target = $event.target
      if (!/useless/.test(target.className)) {
        if (this.code.length < 6) {
          this.code += target.innerText
        }
      }
    },
    backspace () {
      if (this.code.length > 0) {
        this.code = this.code.substr(0, this.code.length - 1)
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
      padding-right:.3rem;
      .close{
        width:.66rem;
        height: .81rem;
        background: url("../../assets/images/close.png") no-repeat center;
        background-size: .22rem;
      }
      .button {
        height: .81rem;
        line-height: .81rem;
      }
      .title{
        height: .81rem;
      }
    }
    .password{
      height: 2.42rem;
      div{
        padding:0 .3rem;
      }
      .button{
        min-width: 1.5rem;
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
