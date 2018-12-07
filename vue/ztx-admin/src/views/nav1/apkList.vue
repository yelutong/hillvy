<template>
  <section class="comtainMain">
    <el-button type="warning" size="small" plain @click="editMsm(0,'','')">新增</el-button>
    </el-col>
    <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;">
     
      <el-table-column prop="appType" fixed label="app类型" min-width="80">
      </el-table-column>
      <el-table-column prop="appVersion" fixed label="app版本" width="100">
      </el-table-column>
      <el-table-column prop="version" label="版本号" width="80">
      </el-table-column>
      <el-table-column prop="forceUpdate" label="是否强制更新" width="120">
        <template slot-scope="scope">
          {{ scope.row.forceUpdate?'是':'否'}}
        </template>
      </el-table-column>
      <el-table-column prop="appFileUrl" label="app下载地址" width="200">
      </el-table-column>
       <el-table-column prop="createTime" label="创建时间" width="120">
        <template slot-scope="scope">
          {{scope.row.createTime?(scope.row.createTime.toString().indexOf('-')>=0?scope.row.createTime.split(' ')[0]:scope.row.createTime):''}}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="120">
        <template slot-scope="scope">
          {{scope.row.updateTime?(scope.row.updateTime.toString().indexOf('-')>=0?scope.row.updateTime.split(' ')[0]:scope.row.updateTime):''}}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="更新说明" width="500">
      </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="editMsm(1,scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--新增APK编辑-->
    <el-dialog
      :title="eTitle"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="40%">

        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
         <el-form-item prop="file" label="app上传" v-if="type==0" 
         :required="this.type==0?(this.file?false:true):false">
            <el-upload
          class="upload-demo"
          :action="uploadApkUrl21"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :http-request="uploadImg"
          multiple
          :limit="1"
          accept=".apk"
          :on-exceed="handleExceed"
          :file-list="form.fileList">
          <el-button size="small" type="primary">点击上传</el-button>
         </el-upload>
        </el-form-item>
        <el-form-item label="apk下载地址" prop="appType" v-if="type==1">
            <el-input style="width:58%" :value="form.url" :title="form.url" type="text"  disabled>
            </el-input>
        </el-form-item>
          <el-form-item label="app类型" prop="appType" required>
            <el-input style="width:58%" v-model="form.appType" type="text" placeholder="请输入app类型" >
            </el-input>
        </el-form-item>
        <el-form-item label="app版本" prop="appVersion" required>
            <el-input style="width:58%" v-model="form.appVersion" type="text" placeholder="请输入app版本" >
            </el-input>
        </el-form-item>
        <el-form-item label="更新说明" prop="remark" required>
            <el-input style="width:58%" v-model="form.remark" type="textarea" placeholder="请输入更新说明" >
            </el-input>
        </el-form-item>
        <el-form-item label="是否强制更新" prop="forceUpdate">
          <el-switch
            v-model="form.forceUpdate">
          </el-switch>
        </el-form-item>
        <el-form-item style="margin-top:30px">
          <el-button type="primary" @click="saveApk('form')">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import util from '../../common/js/util'
//import NProgress from 'nprogress'
import { getApkList , uploadApkUrl } from '../../api/api';
import axios from 'axios';
import config from '../../api/config';
let httpUrl = location.protocol+'//'+config.domain+'/'+config.path;
console.log(httpUrl);
var uploadLoading;
export default {
  data() {
    return {
      filters: {
        time: ''
      },
      type:0,
      file:'',
      eTitle:'',
      rules:{
        appType:{required: true, message: '请输入app类型', trigger: 'blur'},
        appVersion:{required: true, message: '请输入app版本', trigger: 'blur'},
        remark:{required: true, message: '请输入更新说明', trigger: 'blur'}
      },
      form: {
        appType:'',
        appVersion:'',
        remark:'',
        fileList: [],
        forceUpdate:false,
      },
      uploadApkUrl21:'abc',
      list: [],
      total: 0,
      page: 1, 
      dialogVisible:false,
      listLoading: false,
      sels: []//列表选中列 
    }
  }, 
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.search();
    },
    uploadImg (f) {
      console.log(f);
      this.file = f.file;
      console.log(this.file);
    },
    editMsm (type,index,row) {
      this.dialogVisible = true;
      if(type==0){
       this.type=0;
       this.eTitle="新增apk";
       var obj = {
          file : '',
          appType : '',
          appVersion : '',
          remark : '',
          forceUpdate : false
        };
      }else{
        this.type=1;
        this.eTitle="编辑apk";
        var obj = {
          id: row.id,
          url: row.appFileUrl,
          appType : row.appType,
          appVersion : row.appVersion,
          remark : row.remark,
          forceUpdate : row.forceUpdate
        };
      }
      this.form = Object.assign(obj);
      console.log(row);
    },
    //保存编辑信息
     saveApk (formName) {
        var formData = new FormData();
        if(this.type==0){
          console.log('file',this.file);
          formData.append("file", this.file);
          formData.append("appType", this.form.appType);
          formData.append("appVersion", this.form.appVersion);
          formData.append("remark", this.form.remark);
          formData.append("forceUpdate", this.form.forceUpdate?"true":"false");
        }else{
          formData.append("id", this.form.id);
          formData.append("appType", this.form.appType);
          formData.append("appVersion", this.form.appVersion);
          formData.append("remark", this.form.remark);
          formData.append("forceUpdate", this.form.forceUpdate?"true":"false");
        }
        console.log(formData);
        console.log(this.$refs[formName]);
        //校验输入框
        this.$refs[formName].validate((valid) => { //校验必填项
          if(valid){ //校验有效的话
            const loading = this.$loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.5)',
                  target:document.querySelector('.el-dialog__wrapper')
                });
            axios.post(httpUrl+'/admin/add-apk',formData, {headers: {'Content-Type': 'multipart/form-data'}}
            ).then((res) => {
              if(res.data.code == '0000'){
                loading.close();//关闭loading
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                this.search();
                this.dialogVisible = false;//关闭弹窗
                }else{
                  console.log('error submit!!');
                  return false;  
                }
            },() => {
             loading.close();//关闭loading
            })  
          }else{ //未校验通过
            console.log('error submit!!');
            return false;
          }
        })
      },
    //获取用户列表
    search() {
      let para = {
        page: this.page-1,
        size: 10
      };
      if(this.filters.time){
        para = Object.assign(para,{
          startTime : this.filters.time[0],
          endTime : this.filters.time[1]
        })
      }
      this.listLoading = true;
      //NProgress.start();
      getApkList(para).then((res) => {
        console.log(res);
        this.total= 1;
        this.total = res.data.body.totalElements;
        this.list = res.data.body.content;
        console.log(this.list);
        this.listLoading = false;
      });
    },
    /*
    清空
    */
    empty(formName) {
      console.log('2');
      this.$refs[formName].resetFields();
      console.log(this.$refs[formName]);
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePreview(file) {
        console.log(file);
    },
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },
    uploadLoading(){
      uploadLoading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)',
          target:document.querySelector('.content-container')
        });
    },
    importSuccess(response, file, fileList,type){
      console.log(response);
      uploadLoading.close();//关闭loading
      if(response.code == '0000'){
        this.$message.success(`导入成功`);
      }else{
        file.status = 'fail' //如果是success的话，会有成功的icon
        this.$message.warning(response.msg);
      }
      setTimeout(() => {
        this.FileList = []; //清空列表
      },1000)
    },
    importError(err, file, fileList){
      uploadLoading.close();//关闭loading
      this.$message.warning(`导入文件异常，请联系管理员`);
    },
    /*
    *选中表格行
    */
    selsChange: function (sels) {
      this.sels = sels;
      console.log(this.sels);//选中表格行
    }
  },
  mounted() {
    this.search();
  }
}

</script>

<style scoped>

</style>