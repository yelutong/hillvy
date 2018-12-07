<template>
<div class="simpleErea">
	<div class="main">
		<div class="basic" style="min-height:300px;width:400px;">
		    <div class="fileImport">
		    	<el-row :gutter="20">
		    		<el-col :span="12">
		    			<div class="upload" style="margin:auto;width:30%;text-align:center">
						  	<el-upload ref="upload"
							  class="upload-demo"
							  :headers="headers"
							  :action="strategyPackageUrl"
							  :on-progress="uploadLoading"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  accept=".ser"
							  :on-success="importSuccess"
							  :on-error="importError"
							  :before-remove="beforeRemove"
							  multiple
							  :limit="1"
							  :on-exceed="handleExceed"
							  :file-list="FileList">
							  <el-button size="small" type="warning" plain>导入策略包</el-button>
							</el-upload><!--accept 支持的文件格式 action 接口url-->
						</div>
		    		</el-col>
					<el-col :span="12">
						<el-button size="small" type="warning" plain @click="strategyReload">加载预授信策略包</el-button>
					</el-col>
				</el-row>
		    </div>
		    <div class="mainImg" style="margin-top:50px;">
				<img style="margin:auto;" src="../../common/images/upload.png">
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { strategyPackageUrl,strategyReload} from '../../api/api';
var uploadLoading;
export default {
	data() {
		return {
			 filters:{
			 	importDate:[],
			 	fileName:'',
			 	creatName:''
			 },
			 headers:{'X-Sso-Token':JSON.parse(sessionStorage.getItem('user')).accessToken||''},
			 FileList: [], //显示导入的文件
			 strategyPackageUrl:'',
			 hasLoad:false,
			 listLoading: false,
		}
	},
	methods: {
		handleRemove(file, fileList) {
	        console.log(file, fileList);
        },
	    handlePreview(file) {
	        console.log('file',file);
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
	    *@description 加载策略包
	    */
	    strategyReload() {
	    	const loading = this.$loading({
	          lock: true,
	          text: 'Loading',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.5)',
	          target:document.querySelector('.content-container')
	        });
	    	strategyReload("?alias=PRE").then((res) => {
	    		loading.close();//关闭loading
	    		if(res.data.code == '0000'){
	    			this.$message.success(`加载成功`);
	    		}
	    	},(res) => {
	    		loading.close();//关闭loading
	    	})
	    }

	},
	mounted() {
		this.strategyPackageUrl = strategyPackageUrl;
	}
}

</script>

<style lang="scss" scoped>
.fileImport{
	padding:20px;
}
.upload{
	padding:0px 20px;
}
</style>