const actions = {
  atnOpenId(context, val) {
    context.commit('mtnOpenId', val);
  },
  atnToken(context, val) {//存储token
    context.commit('mtnToken', val);
  },
  atnProUserId(context, val) {//存储ProUserId
    context.commit('mtnProUserId', val);
  },
  atnParentId(context, val) {
    context.commit('mtnParentId', val);
  },
  atnUserId(context, val) {
    context.commit('mtnUserId', val);
  },
  atnUserPhone(context, val) {
    context.commit('mtnUserPhone', val);
  },
  atnShareId(context, val) {
    context.commit('mtnShareId', val);
  },
  atnWeChatInfo(context, val) {
    context.commit('mtnWeChatInfo', val);
  },
  atnAutoAddress(context, val) {
    context.commit('mtnAutoAddress', val);
  },
  atnChoseAddress(context, val) {
    context.commit('mtnChoseAddress', val);
  }
};

export default actions;
