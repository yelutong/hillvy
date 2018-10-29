/**
 * Created by sf5 on 6/25/18.
 */
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
let initialState = {
  accType: "0",//	String	银行卡类型 0对公 1:对私
  openBankNo: "",//	String	开户银行编号（银行代码）
  openBankName: "",//	String	开户银行名称
  openBankProvinceCode: "",//	String	开户银行省份编码
  openBankProvinceName: "",//	String	开户银行省份名称
  openBankCityCode: "",//	String	开户银行城市编码
  openBankCityName: "",//	String	开户银行城市名称
  openBranchBankName: "",//	String	开户行支行名称
  bankCardNo: "",//	String	卡号
  bankCardName: "",//	String	银行卡开户名称
  address: ""
};
const BankAddFormStore = {
    state: Object.assign({},initialState),
    mutations: {
      resetBankAddFrom: function (state,obj) {
        // for (let key in initialState){
        //   state[key] = initialState[key];
        //   console.log('resetBankAddFrom ',key,initialState[key]);
        // }
        Object.keys(initialState).forEach(key => {
          state[key] = initialState[key]
          console.log('resetBankAddFrom ',key,initialState[key]);
        });
        console.log('resetBankAddFrom',state);
      },
      updateBankFrom: function (state, obj) {
        // console.log('updateBankFrom');
        // console.log(obj);
        state[obj.name] = obj.value;
      },

    }
  }
  ;
export default BankAddFormStore;
