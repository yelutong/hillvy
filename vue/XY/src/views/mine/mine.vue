<template>
  <div class="wrapper page-mine">
    <div class="lay-avatar" @click="isLogin">
      <div class="avatar">
        <img class="img" :src="weChatInfo.avatar" />
      </div>
      <div class="name">{{ userPhone?userPhone:weChatInfo.name}}</div>
    </div>
    <div class="lay-order">
      <div class="head">
        <v-cell title="订单详情" value="查看全部订单" align="right" ricon="blue" link="/goods/orders?status=[10,20,30,40,50]"></v-cell>
      </div>
      <div class="list">
        <v-flexrow :flexrow-data="orderNav"></v-flexrow>
      </div>
    </div>
    <div class="lay-action">
      <v-cell v-if="!!serveLink" title="服务订单" :link="serveLink" />
      <v-cell title="钱包" link="/mine/wallet" />
      <v-cell title="我的粉丝" link="/mine/fans" />
      <v-cell title="我的收藏" link="/mine/collects" />
      <div @click="shareToOther">
        <v-cell class="share" title="转发推荐" type="btn" />
      </div>
      <v-cell title="地址管理" link="/mine/addresses" />
      <v-cell class="join" v-if="!serveLink" title="入驻" :link="joinLink" />
      <v-cell class="about" title="关于我们" link="/mine/about" />
      <div @click="callHelp">
        <v-cell class="help" title="帮助中心" type="btn" />
      </div>
    </div>
    <v-footer active="mine" />
    <v-wechatshare :friendShare="weChatShare" />
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import { MessageBox } from "mint-ui";
  import vFlexrow from "@/components/v-flexrow";
  import vCell from "@/components/v-cell";
  import vFooter from "@/components/v-footer";
  export default {
    data() {
      return {
        userPhone:'',
        orderNav: [{
            title: "待付款",
            size: 19.5,
            icon: require("../../assets/images/order-pay.png"),
            link: "/goods/orders?status=0"
          },
          {
            title: "待发货",
            size: 19.5,
            icon: require("../../assets/images/order-send.png"),
            link: "/goods/orders?status=1"
          },
          {
            title: "待收货",
            size: 19.5,
            icon: require("../../assets/images/order-receive.png"),
            link: "/goods/orders?status=2"
          },
          {
            title: "待评价",
            size: 19.5,
            icon: require("../../assets/images/order-eva.png"),
            link: "/goods/orders?status=3"
          },
          {
            title: "已完成",
            size: 19.5,
            icon: require("../../assets/images/order-done.png"),
            link: "/goods/orders?status=4"
          }
        ],
        joinLink: "/mine/join",
        serveLink: ""
      };
    },
    components: {
      "v-flexrow": vFlexrow,
      "v-cell": vCell,
      "v-footer": vFooter
    },
    computed: {
      ...mapState(["token", "userId", "weChatInfo", "weChatShare",'shareId'])
    },
    beforeCreate() {
      document.title = "个人中心";
    },
    created() {
      this.getUserData();
      console.log(this.token);
    },
    methods: {
      ...mapActions(["atnUserId"]),
      isLogin() {
        if(!this.token){
          this.$router.push('/mine/login');
        }
      },
      //获取个人中心信息
      getUserData(){
        this.$axios
        .get(this.api.getUserData,{
          headers: {"Authorization": this.token }
         })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip(resData.msg);
            return;
          }else{
            this.userPhone = this.formatPhone(resData.content.userName);
            this.atnUserId(resData.content.id);
            console.log(this.userId);
          }
          console.log(resData);
          // this.ifUserBind();// 进来判断是否绑定了手机号
        })
        .catch(res => {
          console.log(res);
          //this.showTip("获取信息失败，请稍后重试");
        }); 
      },
      // 判断是否绑定了手机号
      ifUserBind() {
        console.log('判断是否绑定了手机号');
        if (!this.userId) {
          MessageBox({
            title: "绑定提示",
            message: "您还没有绑定手机，无法进行下单和个人操作，建议您先绑定手机~",
            showCancelButton: true
          }).then(action => {
            if (action === "confirm") {
              this.$router.push("/mine/bind");
            }else{
              this.$router.push("/mine/login");
            }
          });
        } else {
          // 获取申请入驻审核状态
          this.getJoinStatus();
          // 取个人信息里的服务点状态
          this.getUserInfo();
        }
      },
      // 获取申请入驻审核状态
      getJoinStatus() {
        this.$axios
          .get(this.api.getJoinStatus, {
            headers: {
              "Authorization": this.token
            }
          })
          .then(res => {
            const resData = res.data;
            if (resData.code !== 1) {
              this.joinLink = "/pages/join/join";
              return;
            }
            // 成功后根据状态跳转不同页面
            this.joinLink = resData.content ?
              "/mine/joinstatus?status=" + resData.content :
              "/mine/join";
          })
          .catch(res => {
            this.joinLink = "/pages/join/join";
          });
      },
      // 取个人信息里的服务点状态
      getUserInfo() {
        this.$axios
          .get(this.api.getUserInfo, {
            headers: {
              "Authorization": this.token
            }
          })
          .then(res => {
            const resData = res.data;
            // 有数据的话，就证明已绑定了
            if (resData.code === 1 && !!resData.content) {
              const serverType = resData.content.roleTypeDsid;
              if (serverType === 2) {
                this.serveLink = "/mine/serveorders?type=junior";
              } else if (serverType === 3) {
                this.serveLink = "/mine/serveorders?type=senior";
              } else {
                this.serveLink = "";
              }
            }
          })
          .catch(res => {
            this.serveLink = "";
          });
      },
      // 弹出客服电话
      callHelp() {
        this.callService();
      },
      // 转发推荐弹窗
      shareToOther() {
        MessageBox({
          title: '转发提示',
          message: '点击页面右上角的白色三点，在弹出的菜单中选择转发微信朋友或者朋友圈，就可以推荐好友加入啦~',
          confirmButtonText: '知道了'
        });
      }
    }
  };

</script>

<style lang="stylus">
  @import '../../assets/css/mine';

</style>
