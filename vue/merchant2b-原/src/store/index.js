import Vue from 'vue'
import Vuex from 'vuex'
// import agentFormStore from "../store/authentication/agentFormStore"
import authFormStore from "../store/authentication/authFormStore"
import BankAddFormStore from '../store/bank/addBank';
import BankSupportList from '../store/bank/BankSupportList';
import BankSelect from '../store/bank/BankSelect';


Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    authForm: authFormStore,
    bankAdd:BankAddFormStore,
    bankSelect:BankSelect,
    bankSupportList:BankSupportList,
    routerAni:{
      state: {
        transitionName: '',
        cvShow: true
      },
      mutations: {
        updateAni: function (state, obj) {
          state[obj.name] = obj.value;
        },
      }
    },
  }
});

