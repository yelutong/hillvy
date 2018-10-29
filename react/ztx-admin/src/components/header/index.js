import Vue from 'vue'
// 我们的数据对象
var helloData = {
  test:'goods',
}
// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
  data: helloData
})


export default {
  name: 'HelloWorld',
  
  //储存页面的数据
  data () {
    return helloData
  },

  //创建前执行，只执行一次
  beforeCreate () {
  	//console.log('创建前执行')
  },

  //mounted是页面加载后
  mounted () {
  	/*console.log('12111122');
  	console.log(localStorage.getItem('msg'));
  	vm.msg = localStorage.getItem('msg'); //动态设置数据*/
  },
  methods: {
    activeNav: (nav) => {
      console.log(nav)
      vm.navActive = nav;
      console.log(vm.navActive);
    }
  }
}