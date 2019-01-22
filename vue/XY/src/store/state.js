const state = {
  openId: '',
  token: '',
  parentId: '',
  userId: '',
  userPhone: '',
  shareId:'',
  proUserId:'',
  weChatInfo: {
    name: '新银众商',
    avatar: require("../assets/images/favicon.png")
  },
  autoAddress: null,
  choseAddress: null,
  // 微信分享信息
  weChatShare: {
    friend: {// 微信分享朋友
      title: "新银众商优惠大放送，创造财富不是梦！",
      desc: "以消费者做代言人为己任，以品牌为生命之使命，以创新为发展之生产力，新银众商等你加入！",
      link: "http://www.xy268.com/m/#/index",
      imgUrl: "http://www.xy268.com/m/static/favicon.png"
    },
    friends: {// 微信分享朋友圈
      title: "新银众商优惠大放送，创造财富不是梦！",
      link: "http://www.xy268.com/m/#/index",
      desc: "以消费者做代言人为己任，以品牌为生命之使命，以创新为发展之生产力，新银众商等你加入！", // 分享描述
      imgUrl: "http://www.xy268.com/m/static/favicon.png"
    }
  }
};

export default state;
