/**
 * Created by sf5 on 6/25/18.
 */

const BankSelect = {
  state: {
    bank:{},
    type:''
  },
  mutations: {
    updateBankSelect: function (state, obj) {
      state.bank = obj.bank;
      state.type = obj.type;
    },

  }
};
export default BankSelect;
