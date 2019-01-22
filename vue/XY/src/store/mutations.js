const mutations = {
  mtnOpenId(sta, val) {
    sta.openId = val;
  },
  mtnToken(sta, val) {
    sta.token = val;
  },
  mtnProUserId(sta, val) {
    sta.proUserId = val;
  },
  mtnParentId(sta, val) {
    sta.parentId = val;
  },
  mtnUserId(sta, val) {
    sta.userId = val;
  },
  mtnUserPhone(sta, val) {
    sta.userPhone = val;
  },
  mtnShareId(sta, val) {
    sta.shareId = val;
  },
  mtnWeChatInfo(sta, val) {
    sta.weChatInfo = val;
  },
  mtnAutoAddress(sta, val) {
    sta.autoAddress = val;
  },
  mtnChoseAddress(sta, val) {
    sta.choseAddress = val;
  }
};

export default mutations;
