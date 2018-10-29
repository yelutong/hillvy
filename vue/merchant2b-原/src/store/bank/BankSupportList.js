/**
 * Created by sf5 on 6/25/18.
 */

const bankSupportListStore = {
  state: {
    list:[]
  },
  mutations: {
    updateBankSupportList: function (state, list) {
      state.list = list;
    },

  }
};
export default bankSupportListStore;
