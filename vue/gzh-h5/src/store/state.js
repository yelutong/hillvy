const state = {
  openId: '',
  token: '',
  parentId: '',
  userId: '',
  shareId:'',
  weChatInfo: {
    name: '习将军新时代',
    avatar: require("../assets/images/avatar.png")
  },
  autoAddress: null,
  choseAddress: null,
  // 微信分享信息
  weChatShare: {
    friend: {
      title: "习将军新时代",
      desc: "习将军新时代—好酒要同享，推荐有优惠！",
      link: "https://mg.xjjxsd.cn/wechat/index.html#/share",
      imgUrl: "https://pic.xjjxsd.cn/static/applet/about/about.jpg"
    },
    friends: {
      title: "习将军新时代",
      link: "https://mg.xjjxsd.cn/wechat/index.html#/share",
      imgUrl: "https://pic.xjjxsd.cn/static/applet/about/about.jpg"
    }
  }
};

export default state;
