<template>
	<section class="comtainMain">

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;margin-top:10px;" border>
			<el-table-column prop="channel" label="渠道" width="90" :formatter="formatChannel">
			</el-table-column>
			<el-table-column prop="stage" label="流程节点" min-width="120">
			</el-table-column>
			<el-table-column prop="type" label="触发形式" width="110">
			</el-table-column>
			<el-table-column prop="remark" label="判断逻辑" width="140">
			</el-table-column>
			<!--<el-table-column prop="createName" label="创建人" min-width="120">
			</el-table-column>-->
			<el-table-column prop="createTime" label="创建时间" min-width="120">
			</el-table-column>
			<el-table-column prop="updateName" label="更新人" min-width="120">
			</el-table-column>
			<el-table-column prop="updateTime" label="更新时间" min-width="120">
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

		<el-dialog
		  title="编辑短信"
		  :visible.sync="dialogVisible"
		  width="40%">
		  	<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			  <el-form-item label="名称">
			    <el-input v-model="form.name" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="渠道">
			    <el-input v-model="form.channel" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="流程节点">
			    <el-input v-model="form.stage" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="触发形式">
			    <el-input v-model="form.type" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="判断逻辑">
			    <el-input type="textarea" v-model="form.remark" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="提醒内容" prop="content">
			    <el-input type="textarea" v-model="form.content" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="saveForm('form')">保存</el-button>
			    <el-button @click="dialogVisible = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { remindInfo, editRemindInfo } from '../../api/api';

	export default {
		data() {
			return {
				form: {
					templateName: '',
					scene:'',
					type:'',
					remark:'',
					template:''
				},
				rules:{
					template:{required: true, message: '请输入短信内容', trigger: 'blur'}
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
				this.form = Object.assign(row, {channel:'app'});
			},
			//保存编辑信息
			saveForm (formName) {
				var para = {id:this.form.id,content:this.form.content};
				console.log(this.$refs[formName]);
				this.$refs[formName].validate((valid) => { //校验必填项
					if(valid){ //校验有效的话
						const loading = this.$loading({
				          lock: true,
				          text: 'Loading',
				          spinner: 'el-icon-loading',
				          background: 'rgba(0, 0, 0, 0.2)',
				          target:document.querySelector('.el-dialog__wrapper')
				        });
						editRemindInfo(para).then((res) => {
							this.listLoading = false;
					        loading.close();//关闭loading
							if(res.data.code == '0000'){
								this.dialogVisible = false;
								this.search();
						        this.$message({
						          message: '恭喜您，消息提醒编辑成功！',
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
				remindInfo(para).then((res) => {
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