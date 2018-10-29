// /**
//  * Created by sf5 on 6/19/18.
//  */
// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex);

// export default initauthForm;
// const authFormStore = new Vuex.Store({
//   state: initauthForm,
//   mutations: {
//     epCertNoEnsure: function (state, epCertType) {
//       state.epCertType = epCertType;
//     },
//     epExpDateSet: (state, date) => {
//       state.epExpDate = date;
//     }
//   }
// });
import authFormInit from  '../../store/authentication/authFormInit';
const authFormStore = {
  state: Object.assign({},authFormInit),
  mutations: {
    update: function (state, obj) {
      // console.log("authFormStore update",obj);
      state[obj.name] = obj.value;

    },
    resetAuthForm: function (state,obj) {
      Object.keys(authFormInit).forEach(key => {
        state[key] = authFormInit[key]
      })
    },
    updateAuthFormAll: function (state, obj) {
      console.log('updateAuthFormAll');
      console.log(obj);
      Object.keys(authFormInit).forEach(key => {
        state[key] = obj[key]
      });
      // // state =obj;
      // for (let i  in authFormInit) {
      //   state[authFormInit[i]] = obj[i];
      // }
      // state.mobileNo = obj.mobileNo
    }

  },
  actions: {

  }
};
export default authFormStore;
