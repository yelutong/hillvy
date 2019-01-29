<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      fullWidth: document.documentElement.clientWidth,
      isReload: (document.documentElement.clientWidth<1000)?'H5':'PC'
    };
  },
  computed: {
    
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        that.fullWidth = document.documentElement.clientWidth
      })()
    }
  },
  watch: {
    fullWidth (val) {
      this.fullWidth = val;
      console.log(val);
      let isReloadNew = (val<1000)?'H5':'PC';
      if(this.isReload != isReloadNew){
        window.location.reload()
      }
    }
  },
  beforeCreate() {
    if(document.documentElement.clientWidth<1000){
      this.setAutoSize();// 自适应rem设置
      this.setShowIndex('H5');
    }else{
      this.setAutoSizePc();
      this.setShowIndex('PC');
    }
  },
  created() {
    console.log(this.getShowIndex());
    //解决vue刷新时存储状态改变的问题
    //在页面加载时读取sessionStorage里的状态信息 把语言设置保存到sessionStorage
    if (sessionStorage.getItem("locale")){
        this.$i18n.locale = JSON.parse(sessionStorage.getItem("locale"));
    } 
    //在页面刷新时将需要保存的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("locale",JSON.stringify(this.$i18n.locale));
    })
  },
  methods: {
    
  }
};
</script>

<style lang="stylus">
@import 'assets/css/common.styl';
@import 'assets/css/writeAgain.styl';
</style>
