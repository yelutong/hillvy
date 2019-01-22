<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { MessageBox } from "mint-ui";
export default {
  name: "app",
  data() {
    return {
      parentId: this.getUrlParam("parent_id")
    };
  },
  computed: {
    ...mapState(["token", "openId", "userId"])
  },
  beforeCreate() {
    // vue渲染成功，通知window不用刷新
    window.vueLoaded = true;
    // 自适应rem设置
    this.setAutoSize();
  },
  created() {
    // 通过openId拿到token
    setTimeout(()=>{
      this.getOpenid()
    },0);
   /*解决刷新页面时数据丢失的问题*/
   //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")){
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))));
    } 
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state));
    })
  },
  methods: {
    // 状态管理动作
    ...mapActions([
      "atnOpenId",
      "atnToken",
      "atnProUserId",
      "atnUserId",
    ]),
    getOpenid() {
        let openId = this.openId||localStorage.getItem('openId');
        let token = this.token||localStorage.getItem('token');
        if(token){
            this.atnToken(token);
            this.$axios.get(this.api.getUserData,{
              headers: {"Authorization": token }
             })
            .then(res => {
              const resData = res.data;
              if (resData.code !== 1) {
                if(resData.code !== 403){
                  // this.showTip(resData.msg);
                }
                return;
              }else{ 
                this.atnUserId(resData.content.id);
                localStorage.setItem('userId',resData.content.id); 
              }
            })
            .catch(res => {
              console.log(res);
              //this.showTip("获取信息失败，请稍后重试");
            }); 
        }
        if(openId){
          this.atnOpenId(openId);
        }
        let code = this.getUrlParam("code")||sessionStorage.getItem('code');
        //推荐用户id，这个每次分享都必有的
        let proUserId = this.getUrlParam('proUserId')||localStorage.getItem('proUserId');
        if(proUserId){
          this.atnProUserId(proUserId);
        }
      
        if(code){
          this.$axios.get(this.api.getOpenid+code).then(res => {
            const resData = res.data;
            //如果返回了token，则表示改用户是已经绑定过的用户，此操作相当于已经登录了
            //如果没有返回token，那么保存返回的openid和相关信息，在需要验证token的地址走绑定流程，绑定成功后，返回登录后的token
            if(resData.code == 1){
              let openId = resData.content.openId;
              //alert('获得openid数据');
              this.atnOpenId(openId);
              localStorage.setItem("openId",openId);
              localStorage.setItem("bindInfo",JSON.stringify(resData.content));
              sessionStorage.removeItem('code');
              if(resData.content.token){
               // alert('获得token数据');
                this.atnToken(resData.content.token);
                localStorage.setItem("token",resData.content.token);
              }
            }
           
          });
        }
    },
  }
};
</script>

<style lang="stylus">
@import 'assets/css/media.styl';
@import 'assets/css/common.styl';
</style>
