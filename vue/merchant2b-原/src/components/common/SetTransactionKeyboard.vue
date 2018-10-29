<template>
    <div class="bg-white full-screen setKeyboard">
      <div class="password horizontal-view align-items-center justify-content-space-between">
      <span v-for="item in 6" :key="item" :class="{'active': password.length >= item}"></span>
      </div>
        <div class="title horizontal-view align-items-center justify-content-center fs-32 txt-black mtitle vux-1px-t" :class="{'fadeInRight':fadeInRight}" v-text="title"></div>
      <div class="keypad vertical-view " @click="inputing">
        <div class="horizontal-view vux-1px-tb">
        <span>1</span>
        <span class="vux-1px-l vux-1px-r">2</span>
        <span>3</span>
        </div>
        <div class="horizontal-view">
        <span>4</span>
        <span class="vux-1px-l vux-1px-r">5</span>
        <span>6</span>
        </div>
        <div class="horizontal-view vux-1px-tb">
        <span>7</span>
        <span class="vux-1px-l vux-1px-r">8</span>
        <span>9</span>
        </div>
        <div class="horizontal-view">
        <span class="useless"></span>
        <span class="vux-1px-l vux-1px-r">0</span>
        <span @click="backspace" class="backspace useless"></span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      fadeInRight: false
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
    }
  },
  watch: {
    title: function () {
      console.log("title数据改变了")
      this.fadeInRight = true
      let that = this
      setTimeout(function () {
        that.fadeInRight = false
      },1000)
    }
  }
}
</script>

<style scoped lang="scss">
  .setKeyboard{
    header{
      .title{
        height: .81rem;
      }
    }
    .password{
      padding:.1rem 1.09rem;
      margin-top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
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
  .setKeyboard{
    .keypad{
      bottom:0;position:fixed;width:100%;left:0;
    }
    .mtitle{
      margin:0 .75rem;padding-top:.4rem
     }
  }
@-webkit-keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.fadeInRight{
  transition: all .5s;
  animation:fadeInRight .5s ease 1 normal;
  -webkit-animation: fadeInRight .5s ease  1 normal;
}
</style>
