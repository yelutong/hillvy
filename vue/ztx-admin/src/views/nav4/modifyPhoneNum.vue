<template>
	<section class="comtainMain sms">
		<!--工具条-->
		<el-col :span="24" class="toolbar toolbarForm">
			<el-form ref="searchForm" :inline="true" :model="filters">
				<el-form-item label="旧手机号" prop="phone">
				    <el-input v-model="filters.phone" placeholder="旧手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="search" icon="el-icon-search" size="small">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" plain icon="el-icon-delete" @click="empty('searchForm')">清空</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;margin-top:10px;" border>
			<el-table-column prop="custName" label="姓名">
			</el-table-column>
			<el-table-column prop="applyId" label="申请号">
			</el-table-column>
			<el-table-column prop="idNum" label="身份证">
			</el-table-column>
			<el-table-column prop="phone" label="手机号">
			</el-table-column>
			<el-table-column prop="applyStage" label="当前状态">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="small" type="primary" :disabled="scope.row.applyStage=='REPAY'?false:true" @click="changePhone(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<el-dialog class="smsDialog"
		  title="修改客户手机号"
		  :visible.sync="dialogVisible"
		  width="40%">
		  	<el-form ref="phoneForm" :model="phoneForm" :rules="rules" label-width="85px">
			  <el-form-item label="旧手机号:">
			    {{phoneForm.phone}}
			  </el-form-item>
			  <el-form-item label="新手机号:" prop="newPhone">
			    <el-input v-model="phoneForm.newPhone"></el-input>
			  </el-form-item>
			  <div class="red tips">提示：请核对该客户对应的新旧手机号是否准确</div>
			  <el-form-item>
			    <el-button type="primary" @click="savePhone('phoneForm')">保存</el-button>
			    <el-button @click="dialogVisible = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { listPhone, updatePhone } from '../../api/api';

	export default {
		data() {
			return {
				filters:{
					newPhone:''
				},
				phoneForm: {
					newPhone:'',
					phone:''
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
			/*
			清空
			*/
			empty(formName) {
				console.log('2');
				this.$refs[formName].resetFields();
				console.log(this.$refs[formName]);
			},
			handleCurrentChange(val) {
				this.page = val;
				this.search();
			},
			//打开编辑界面
			changePhone (index,row) {
				this.dialogVisible = true;
				this.phoneForm = row;
			},
			//保存编辑信息
			savePhone (formName) {
				console.log('2222');
				var para = {
					id:this.phoneForm.id,
					applyId:this.phoneForm.applyId,
					oldPhone:this.phoneForm.phone,
					registId:this.phoneForm.registId,
					idNum:this.phoneForm.idNum,
					newPhone:this.phoneForm.newPhone
				};
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
						updatePhone(para).then((res) => {
							this.listLoading = false;
					        loading.close();//关闭loading
							if(res.data.code == '0000'){
								this.dialogVisible = false;
								this.filters.phone = this.phoneForm.newPhone;
								this.search();
						        this.$message({
						          message: '恭喜您，修改手机号成功！',
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
					}
				})
			},
			/*
			*@description 查询客户申请信息
			*/
			search() {
				if(!this.filters.phone){
					this.$message.error('请输入客户手机号');
				}else{
					let para = {
						page: this.page-1,
						size: 10,
					};
					this.listLoading = true;
					//NProgress.start();
					listPhone(Object.assign(para,this.filters)).then((res) => {
						console.log(res);
						this.total = res.data.body.totalElements;
						this.list = res.data.body.content;
						this.listLoading = false;
						//NProgress.done();
					});
				}
			},
		},
		mounted() {
			//this.search();
		}
	}

</script>

<style scoped>
.tips{
	margin-bottom:14px;
}
</style>