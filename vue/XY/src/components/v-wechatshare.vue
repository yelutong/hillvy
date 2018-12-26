<!-- 微信分享 -->
<template>
  <div class="wechat-share"></div>
</template>
<script>
  import {
    mapState
  } from "vuex";
  const wx = require("weixin-js-sdk");
  export default {
    props: {
      friendShare: {
        type: Object
      }
    },
    data() {
      return {};
    },
    created() {
      this.getWeixinData();
    },
    computed: {
      // 从state里拿到用户分享id
      ...mapState(['shareId'])
    },
    methods: {
      // 从后台拿到微信签名等数据
      getWeixinData() {
        this.$axios
          .get(this.api.getShareArgs)
          .then(res => {
            const resData = res.data;
            if (resData.code !== 1 || !resData.content) {
              this.showTip('获取微信分享参数失败');
              return;
            }
            this.wakeWeiXin(resData.content);
          })
          .catch(res => {
            this.showTip('获取微信分享参数失败');
          });
      },
      // 拿到数据后执行唤醒微信分享更改函数
      wakeWeiXin(objData) {
        const vue = this;
        const friendShare = this.friendShare;
        wx.config({
          debug: false, 
          appId: objData.appid,
          timestamp: objData.timestamp,
          nonceStr: objData.noncestr,
          signature: objData.signature,
          jsApiList: [
            "hideMenuItems",
            "onMenuShareTimeline",
            "onMenuShareAppMessage"
          ]
        });
        wx.ready(function () {
          // 隐藏一些功能
          wx.hideMenuItems({
            menuList: [
              "menuItem:share:qq",
              "menuItem:share:QZone",
              "menuItem:share:weiboApp",
              "menuItem:share:facebook",
              "menuItem:originPage",
              "menuItem:copyUrl",
              "menuItem:openWithQQBrowser",
              "menuItem:openWithSafari",
              "menuItem:share:email"
            ]
          });
          // 分享到朋友圈
          wx.onMenuShareTimeline({
            title: friendShare.friends.title,
            link: friendShare.friends.link + '?user_id=' + vue.shareId,
            imgUrl: friendShare.friends.imgUrl,
            success: function () {
              vue.showTip("分享成功");
            },
            cancel: function () {
              vue.showTip("取消分享");
            }
          });
          // 分享到朋友
          wx.onMenuShareAppMessage({
            title: friendShare.friend.title,
            desc: friendShare.friend.desc,
            link: friendShare.friend.link + '?user_id=' + vue.shareId,
            imgUrl: friendShare.friend.imgUrl,
            success: function () {
              vue.showTip("分享成功");
            },
            cancel: function () {
              vue.showTip("取消分享");
            }
          });
          // 检查微信接口是否调用成功
          wx.checkJsApi({
            jsApiList: [
              "hideMenuItems",
              "onMenuShareTimeline",
              "onMenuShareAppMessage"
            ],
            success: function (res) {
              console.log("微信接口调用成功");
            }
          });
        });
      }
    }
  };

</script>
