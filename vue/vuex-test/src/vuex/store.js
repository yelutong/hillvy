import Vue from 'vue'
import Vuex from 'vuex'  

Vue.use(Vuex)   

const store = new Vuex.Store({  
  // 定义状态  
  state: {  
    author: '[我是可以替换的额]' 
  } 
})   

export default store 
