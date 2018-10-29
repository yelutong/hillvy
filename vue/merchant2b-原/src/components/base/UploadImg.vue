<!--<script src='../../../node_modules/vux/src/plugins/wechat/index.js'></script>-->
<template>
  <div class='bg-white rel img-box'>
    <div :class='setClass()'>
      <input v-if='!weChat' class='fileInput' ref='file' @change='upload' accept='image/png;image/jpg;' type='file'/>
      <div v-if='weChat' @click='upload' class='fileInput'></div>
      <img :src="src" class='upload-img' v-if='src'>
      <div class='upload-box-info' v-if='!src'>{{msg}}</div>
      <div>{{info}}</div>
    </div>
  </div>

</template>

<script>
  //  import Vue from 'vue';
  //  import {WechatPlugin} from 'vux';
  //  Vue.use(WechatPlugin); //  微信

  import {mapState} from 'vuex';
  export default {
    name: 'upload-img',
    components: {},
    data () {
      return {
        msg: "",
        weChat: this.$UA().weChat,
        show: false,
        finalName: '',
        btnNumU:1
      }
    },
    created: function () {
      this.msg = this.title;
    },
//    beforeUpdate: function () {
//      this.msg = this.title;
//    },
    props: ['title', 'info', 'img', 'icon', 'option'],
    computed: {
      src: function () {
//        console.log("this.authForm['option']")
//        console.log(this.authForm)
//        console.log(this.option)
//        console.log(this.authForm[this.option] ? window.location.origin + this.authForm[this.option] : "")
//        return this.authForm[this.option];
        return this.authForm[this.option] ? window.location.origin + "/syf-finance/" + this.authForm[this.option] : "";
      },
      ...mapState({
        authForm: state => state.authForm
      })
    },
    methods: {
      setClass: function () {
        return 'upload-box ' + this.icon;

      },
      upload: function (e) {
        let _this = this;
        console.log("wx___________upload");
        console.log(wx);
//        this.$debounce(500,function(){
//
//        })

//        if (this.btnNumU===0){
//          return;
//        }
        if (this.weChat) {
          this.btnNumU=0;
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
              let localIds = res.localIds[0].toString();
              wx.getLocalImgData({
                localId: localIds, // 图片的localID
                success: function (res) {
//                  _this.$vux.loading.show({
//                    text: '加载中...'
//                  });
                  let imgSrc;
                  if (_this.$UA().ios) {
                    imgSrc = res.localData;
                  } else {
                    imgSrc = 'data:image/jpeg/png;base64,' + res.localData; // localData是图片的base64数据，可以用img标签显示
                  }
                  _this.changeValue(imgSrc);
//                  _this.src = imgSrc;
                }
              });
//
            },
            fail: (err) => {
               this.btnNumU=1;
              console.log("err__________");
              console.log(err);
            }
          });
        } else {
          this.btnNumU=0;
          let input = e.target;
          let reader = new FileReader();
          reader.readAsDataURL(input.files[0]);

          reader.onload = function (e) {
            let image = new Image();          // 创建一个image对象，供canvas绘图使用
            image.src = this.result;          // this.result即base64的数据
            image.onload = function () {
              _this.changeValue(image.src);
//              _this.src = image.src;

            }
          }

        }
      },
      changeValue: function (imgBase64) {
        console.log("IMG100002 post data:");

//        console.log("IMG100002 post data:", JSON.stringify({imgBase64: imgBase64, scene: 'AUTH_LETTER'}));
//        console.log({imgBase64: imgBase64, scene: 'AUTH_LETTER'});
//        this.$store.commit('update', {name: this.option, value: imgBase64});
//        this.$post('WX100001', {url: window.location.href, memberType: type}, data => {
        this.$post('IMG100002', {imgBase64: imgBase64, scene: 'AUTH_LETTER'}, data => {
          console.log("IMG100002   data.imgPath");
          let imgPath = data.respData.imgPath;
          console.log('imgPath');
          console.log(window.location.origin + "/syf-finance/" + imgPath);
          this.$store.commit('update', {name: this.option, value: imgPath});
          this.$vux.loading.hide();
          let msg = this.title;
          let indexL = msg.indexOf("上传")
          if (indexL === 0) {
            msg = "已"+msg
          } else if (indexL<0) {
            msg = "已上传"+msg
          }
          let msgS = msg.replace('案例', '').replace("背景","");
          console.log("msg",msg,msgS)
          this.msg = msgS;
           this.btnNumU=1;
        }, resp => {
          this.$vux.toast.text('上传图片失败' + JSON.stringify(resp), 'default');
          this.$vux.loading.hide();
          this.btnNumU=1;
        });
      }


    }
  }


</script>
<style  lang="scss">
  @import "../../components/authentication/AuthenticationHome.scss";
  @import "../../components/authentication/AuthenticationCertificate.scss";

</style>
