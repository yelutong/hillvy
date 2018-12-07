<template>
	<section class="comtainMain sms">

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;margin-top:10px;" border>
			<el-table-column prop="channel" label="渠道" width="80" :formatter="formatChannel">
			</el-table-column>
			<el-table-column prop="scene" label="流程节点" min-width="100">
			</el-table-column>
			<el-table-column prop="type" label="触发形式" width="90">
			</el-table-column>
			<el-table-column prop="remark" label="判断逻辑" width="140">
			</el-table-column>
			<!--<el-table-column prop="createName" label="创建人" min-width="120">
			</el-table-column>-->
			<el-table-column prop="createTime" label="创建时间" min-width="120">
			</el-table-column>
			<el-table-column prop="updateName" label="更新人" min-width="100">
			</el-table-column>
			<el-table-column prop="updateTime" label="更新时间" min-width="120">
			</el-table-column>
			<el-table-column prop="status" label="是否发送" min-width="80">
				<template slot-scope="scope">
					{{scope.row.status=='1'?'发送':'不发送'}}
				</template>
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button size="small" type="primary" @click="editMsm(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<el-dialog class="smsDialog"
		  title="编辑短信"
		  :visible.sync="dialogVisible"
		  width="40%">
		  	<el-form ref="msmform" :model="msmform" :rules="rules" label-width="80px">
			  <el-form-item label="名称">
			    <el-input v-model="msmform.templateName" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="渠道">
			    <el-input v-model="msmform.channel" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="流程节点">
			    <el-input v-model="msmform.scene" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="触发形式">
			    <el-input v-model="msmform.type" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="判断逻辑">
			    <el-input type="textarea" v-model="msmform.remark" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="是否发送" prop="status">
				  <el-switch
					  v-model="msmform.status"
					  active-value="1"
    				  inactive-value="0">
				  </el-switch>
			  </el-form-item>
			  <el-form-item label="短信内容" prop="template">
			    <el-input type="textarea" v-model="msmform.template" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
			  </el-form-item>
			  <div class="red tips">提示：短信内容中的%s、%%在发短信时，会替换成真实的用户信息，请勿随意改成类似XXX或者其他字符！</div>
			  <el-form-item>
			    <el-button type="primary" @click="saveMsm('msmform')">保存</el-button>
			    <el-button @click="dialogVisible = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { listSms, editSms } from '../../api/api';

	export default {
		data() {
			return {
				msmform: {
					templateName: '',
					scene:'',
					type:'',
					remark:'',
					template:'',
					status:''
				},
				rules:{
					template:{required: true, message: '请输入短信内容', trigger: 'blur'},
					status:{required: true, message: '请选择短信是否发送', trigger: 'blur'}
				},
				list: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				dialogVisible: false
			}
		},
		methods: {
			//数据转换-渠道
			formatChannel: function (row, column) {
				return 'app';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.search();
			},
			//打开编辑界面
			editMsm (index,row) {
				this.dialogVisible = true;
				this.msmform = Object.assign({
					channel:'app',
					id:row.id,
					template:row.template,
					templateName:row.templateName,
					scene:row.scene,
					type:row.type,
					remark:row.remark,
					status:row.status
				});
			},
			//保存编辑信息
			saveMsm (formName) {
				var para = {
					id:this.msmform.id,
					template:this.msmform.template,
					status:this.msmform.status
				};
				console.log(this.$refs[formName]);
				this.$refs[formName].validate((valid) => { //校验必填项
					if(valid){ //校验有效的话
						const loading = this.$loading({
				          lock: true,
				          text: 'Loading',
				          spinner: 'el-icon-loading',
				          background: 'rgba(0, 0, 0, 0.2)',
				          target:document.querySelector('.el-dialog')
				        });
						editSms(para).then((res) => {
							this.listLoading = false;
					        loading.close();//关闭loading
							if(res.data.code == '0000'){
								this.dialogVisible = false;
								this.search();
						        this.$message({
						          message: '恭喜您，短信编辑成功！',
						          type: 'success'
						        });
							}else{
								this.$message.error(res.data.msg);
							}
						},() => {
							loading.close();//关闭loading
						});
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
				this.listLoading = true;
				//NProgress.start();
				listSms(para).then((res) => {
					console.log(res);
					this.total = res.data.body.totalElements;
					this.list = res.data.body.content;
					this.listLoading = false;
					//NProgress.done();
				});
			},
		},
		mounted() {
			this.search();
		}
	}

</script>

<style scoped>
.tips{
	margin-bottom:14px;
}
</style>