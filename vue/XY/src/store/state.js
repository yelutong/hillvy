const state = {
  openId: '',
  token: '',
  parentId: '',
  userId: '',
  shareId:'',
  weChatInfo: {
    name: '新银众商',
    avatar: require("../assets/images/avatar.png")
  },
  autoAddress: null,
  choseAddress: null,
  // 微信分享信息
  weChatShare: {
    friend: {
      title: "新银众商",
      desc: "新银众商—好酒要同享，推荐有优惠！",
      link: "https://mg.xjjxsd.cn/wechat/index.html#/share",
      imgUrl: "https://pic.xjjxsd.cn/static/applet/about/about.jpg"
    },
    friends: {
      title: "新银众商",
      link: "https://mg.xjjxsd.cn/wechat/index.html#/share",
      imgUrl: "https://pic.xjjxsd.cn/static/applet/about/about.jpg"
    }
  }
};

export default state;
