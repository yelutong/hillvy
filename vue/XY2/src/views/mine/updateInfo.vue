<template>
  <div class="wrapper updateInfo">
    <vHeader title="修改信息" to="/mine/set" />
    <div class="mt50">
      <vue-core-image-upload 
      class="up-load" 
      :crop="false" text="" inputAccept="image/*" 
      @imageuploaded="chooseImage" 
      :credentials="false"
      :max-file-size="10485760" 
      :multiple="false" inputOfFile="Filedata" 
      :url="this.api.uploadPhoto"   >
      <img width="150" v-if="license" :src="license" />
    </vue-core-image-upload>
       <v-cell class="share" title="头像" type="btn" />
       <mt-field label="昵称" placeholder="请输入昵称" v-model="nickName"></mt-field>
       <mt-field label="年龄" placeholder="请输入年龄" v-model="age"></mt-field>
        <group>
          <popup-radio title="性别" :options="options1" v-model="sex"></popup-radio>
        </group>
       <mt-field label="邮箱" placeholder="请输入邮箱地址" type="email" v-model="email"></mt-field>
        <div class="loginOutBtn">
        <button class="btn-submit mt50 full-screen" @click="infoUpdate">提交</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Field, Cell } from 'mint-ui';
import { Group, PopupRadio } from "vux";
import vCell from "@/components/v-cell";
import vHeader from "@/components/v-header";
import VueCoreImageUpload from "vue-core-image-upload";
export default {
  data() {
    return {
      license:'',
      nickName:'',
      headPhoto: '',
      age: '',
      email: '',
      sex: '男',
      options1: ['男', '女'],
    };
  },
  components: {
    "v-cell": vCell,
    vHeader,
    Group,
    PopupRadio,
    "vue-core-image-upload": VueCoreImageUpload
  },
  computed: {
    ...mapState(["token"])
  },
  created() {
    this.getUserData();
  },
  methods: {
    ...mapActions(["atnToken"]), 
    //获取个人中心信息
      getUserData(){
        this.$axios
        .get(this.api.getUserData,{
          headers: {"Authorization": this.token }
         })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            if(resData.code !== 403){
              this.showTip(resData.msg);
            }
            return;
          }else{
            let info = resData.content;
            this.age = info.age;
            this.email = info.email||'';
            this.license = info.headPhoto;
            this.nickName = info.nickName;
            this.sex = info.sex;
          }
        })
        .catch(res => {
          console.log(res);
        }); 
      },
    // 接收子组件传来的点击图片事件
    imageAction(index) {
        this.imgList.splice(index, 1);
        this.arrImgId.splice(index, 1);
    },
    // 上传之后的事件
    chooseImage(res) {
         console.log(res)
         if(res.code == 1){
           this.license = this.api.urlPic+res.content[0].path+'/'+res.content[0].name;
         }
    },
    infoUpdate(){
      console.log(this.age,this.email,this.license,this.nickName,this.sex);
      this.$axios
          .post(this.api.infoUpdate, 
            JSON.stringify({
              'age':this.age,
              'email':this.email,
              'headPhoto':this.license,
              'nickName':this.nickName,
              'sex':this.sex
            }),{
             headers: {"Authorization": this.token , "content-type": "application/json"}
          })
          .then(res => {
            const resData = res.data;
            if (resData.code !== 1) {
            this.showTip("提交信息失败");
            return;
            }
            this.showTip('提交成功', 1500, 'ok');
            setTimeout(() => {
              this.$router.go(-1);
            }, 1500);
          })
          .catch(res => {
            
          });
    }
  }
};
</script>

<style lang="stylus">
.updateInfo{
  .loginOutBtn {
   width:90%!important;
   margin: auto;
  }
  .up-load{
    height:40px;
    background: transparent;
    z-index: 99999;
    right: 0;
    position: absolute;
    width:80%;
    text-align: right;
  }
  .up-load img{
    width:40px;
    height:40px;
    margin-right:25px;
  }
}
</style>
