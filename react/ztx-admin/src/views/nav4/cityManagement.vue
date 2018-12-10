<template>
  <div class="simpleErea newAddCity">
      <div class="main">
        <div class="basic">
          <div class="mainBasic">
            <div class="title">新增城市</div>
            <el-form ref="searchForm" :inline="true" :model="filters">
            <el-form-item label="城市编码" prop="code">
              <el-input v-model="filters.code" size="large" v-on:input="codeInput" placeholder="请输入城市编码">
              </el-input>
              <div v-if="codeTips" class="error">请输入城市编码</div>
            </el-form-item>
            <el-form-item label="GPS位置" prop="gpsLocation">
              <el-input v-model="filters.gpsLocation" v-on:input="gpsInput" size="large" placeholder="请输入GPS经纬度">
              </el-input>
              <div v-if="gpsTips" class="error">请输入GPS经纬度</div>
            </el-form-item>
            <div class="center">
            <el-form-item>
              <el-button type="primary" v-on:click="newAddCity()" icon="el-icon-info" size="middle">确认新增</el-button>
            </el-form-item>
            </div>
          </el-form> 
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { newAddCity } from '../../api/api';

  export default {
    data() {
      return {
        filters:{
          code:'',
          gpsLocation:''
        },
        codeTips:false,//为true的时候，就显示error的提示
        gpsTips:false
      }
    },
    methods: {
      newAddCity() {
        if(this.filters.code!= '' && this.filters.gpsLocation!= ''){
          //调用清空验证码次数的接口
          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.2)',
                target:document.querySelector('.content-container')
              });
          newAddCity(this.filters).then((res) => {
            loading.close();//关闭loading
            if(res.data.code == '0000'){
              //成功的事件
              this.$message.success('操作成功');
            }else if(res.data.code == '1000'){
              this.$message.error('参数不合法');
            }else if(res.data.code == '9000'){
              this.$message.error('系统异常，操作失败');
            }else{
              this.$message.error('操作失败');
            }
          },() => {
            loading.close();//关闭loading
          })
        }else{
          //校验手机号不能为空
          this.$message.error('请输入完整信息');
        }
      },

      /*
      *校验code是否为空
      */
      codeInput(value) {
        //有值且为空值的时候打开error
        if(value && value.replace(/\s+/g,"") == ''){
          this.codeTips = true;
        }else{
          this.codeTips = false;
        }
      },
      /*
      *校验gps是否为空
      */
      gpsInput(value) {
        //有值且为空值的时候打开error
        if(value && value.replace(/\s+/g,"") == ''){
          this.gpsTips = true;
        }else{
          this.gpsTips = false;
        }
      },
    },
    mounted() {
      
    }
  }

</script>

<style lang="scss" scoped>
.center{
  text-align:center;
  margin-top:20px;
}
</style>