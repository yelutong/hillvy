<template>
  <div class="wrapper updateInfo">
    <vHeader title="修改密码" to="/mine/set" />
    <div class="mt50">
       <mt-field label="旧密码" type="password" placeholder="请输入旧密码" v-model="password"></mt-field>
       <mt-field label="新密码" type="password" placeholder="请输入新密码" v-model="newPassword"></mt-field>
       
        <div class="loginOutBtn">
        <button class="btn-submit mt50 full-screen" @click="pwdUpdate">提交</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Field, Cell } from 'mint-ui';
import vHeader from "@/components/v-header";
export default {
  data() {
    return {
      password:'',
      newPassword:'',
    };
  },
  components: {
    vHeader
  },
  computed: {
    ...mapState(["token"])
  },
  created() {
    
  },
  methods: {
    ...mapActions(["atnToken"]),
    pwdUpdate(){
      this.$axios
          .post(this.api.pwdUpdate,
           JSON.stringify({
              'password':this.password,
              'newPassword':this.newPassword
            }),{
             headers: {"Authorization": this.token , "content-type": "application/json"}
          })
          .then(res => {
            const resData = res.data;
            if (resData.code !== 1) {
              this.showTip("修改失败");
              return;
            }
              this.showTip("修改成功");
              setTimeout(()=>{
                 this.$router.push('/mine');
              },1500)
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
    position:relative;
    height:40px;
  }
}
</style>
