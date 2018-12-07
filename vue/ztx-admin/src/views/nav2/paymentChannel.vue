<template>
	<section class="comtainMain">
		<el-col :span="24" style="margin-bottom:10px;">
			<el-button type="warning" size="small" plain @click="editMsm('', {})">新增</el-button>
		</el-col>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;margin-top:10px;" border>
			</el-table-column>
			<el-table-column prop="orderNum" label="排序" width="80px">
			</el-table-column>
			<el-table-column prop="payBank" label="收款银行" >
			</el-table-column>
			<el-table-column prop="payWayDescs" label="付款方式">
				<template slot-scope="scope">
					{{scope.row.payWayDescs.join(' ')}}
				</template>
			</el-table-column>
			<el-table-column prop="payChannel" label="配置付款通道" >
			</el-table-column>
			<el-table-column prop="valid" label="是否开启">
				<template slot-scope="scope">
					{{scope.row.valid==true?'开启':'不开启'}}
				</template>
			</el-table-column>
			<el-table-column prop="createName" label="创建人" width="100px">
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="small" type="primary" @click="editMsm(scope.$index, scope.row)">编辑</el-button>
					<!-- <el-button size="small" type="primary" plain @click="deleteData(scope.row.id)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!--付款通道编辑-->
		<el-dialog
		  title="配置付款通道"
		  :visible.sync="dialogVisible"
		  v-if="dialogVisible"
		  width="40%">
		  	<el-form ref="form" :model="form" :rules="rules" label-width="120px">
			  <el-form-item label="收款银行展示：" prop="payBank" required>
				    <el-select v-model="form.payBank" placeholder="收款银行展示">
					    <el-option
					      v-for="item in bankList"
					      :key="item"
					      :label="item"
					      :value="item">
					    </el-option>
				    </el-select>
			  </el-form-item>
			  <el-form-item label="配置付款通道：" prop="payChannel" required>
				    <el-select v-model="form.payChannel" placeholder="配置付款通道" @change="changePayChannel">
					    <el-option
					      v-for="item in channelList"
					      :key="item"
					      :label="item"
					      :value="item">
					    </el-option>
				    </el-select>
			  </el-form-item>
			  <el-form-item label="付款方式展示：">    
				    <div>{{form.payWayDescs?form.payWayDescs.join(' '):''}}</div>
			  </el-form-item>
			  <el-form-item label="是否开启" prop="isValid">
				  <el-switch
					  v-model="form.valid">
				  </el-switch>
			  </el-form-item>
			  <el-form-item label="排序：" prop="orderNum" required>
				    <el-input style="width:58%" v-model.number="form.orderNum" type="age" placeholder="请输入排序序号" >
				    </el-input>
			  </el-form-item>
			  <el-form-item style="margin-top:30px">
			    <el-button type="primary" @click="saveMsm('form')">保存</el-button>
			    <el-button @click="dialogVisible = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>

	</section>
</template>

<script>
	import { peyamentChannelList, savePayWay , deletePayment, paymentChannel} from '../../api/api';
	import config from '../../api/config';

	export default {
		data() {
			return {
				form: {
					payBank:'',
					payChannel:'',
					orderNum:'',
					payWayDescs:'',
					valid:false
				},
				rules:{
					payBank:{required: true, message: '请选择付款银行', trigger: 'blur'},
					payChannel:{required: true, message: '请选择配置付款通道', trigger: 'blur'},
					orderNum:[{ required: true, message: '请输入排序序号'},
        					  { type: 'number', message: '序号必须为数字值'}]
				},
				dialogVisible:false,
				list: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				bankList:['BRI','CIMB','Mandiri','BCA','BNI','Danamon','Permata Bank','Bank Mega','Bank lain','Panin Bank','BTN'],
				channelList:[],
				channelObj:{}
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.search();
			},
			//打开编辑界面
			editMsm (index,row) {
				this.dialogVisible = true;
				var obj = {
					payBank:row.payBank,
					payChannel:row.payChannel,
					orderNum:row.orderNum,
					payWayDescs:row.payWayDescs,
					valid:row.valid
				};
				this.form = Object.assign(obj);
			},
			/*
			*@description 更改支付渠道的时候修改显示支付方式
			*/
			changePayChannel(value) {
				console.log(value);
				this.form.payWayDescs = this.channelObj[value];
				console.log(this.form.payWayDescs);
			},
			/*
			*@description 获取支付渠道列表
			*/
			getpaymentChannel(){
				paymentChannel({}).then((res) => {
	        		if(res.data.code == '0000'){
	        			this.channelObj = res.data.body;
	        			for(var key in res.data.body){
	        				this.channelList.push(key);
	        			}
	        		}
	        	})
			},

			//保存编辑信息
			saveMsm (formName) {
				var para = {
					payBank : this.form.payBank,
					payChannel : this.form.payChannel,
					orderNum:this.form.orderNum,
					valid: this.form.valid
				};
				console.log(para);
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
				        savePayWay(para).then((res) => {
					        loading.close();//关闭loading
					        if(res.data.code == '0000'){
					        	this.$message({
									message: '保存成功',
									type: 'success'
								});
								this.search();
					        	this.dialogVisible = false;//关闭弹窗
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
			//获取配置通道列表
			search() {
				let para = {
					page: this.page-1,
					size: 10
				};
				this.listLoading = true;
				//NProgress.start();
				peyamentChannelList(para).then((res) => {
					console.log(res);
					this.total = res.data.body.totalElements;
					this.list = res.data.body.content;
					this.listLoading = false;
					//NProgress.done();
					console.log(this.list)
				});
			},

			/*
			*@description 删除
			*/
			/*deleteData(id) {
				this.$confirm('确定要删除该数据吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	//确定删除的事件
		        	const loading = this.$loading({
			          lock: true,
			          text: 'Loading',
			          spinner: 'el-icon-loading',
			          background: 'rgba(0, 0, 0, 0.5)',
			          target:document.querySelector('.comtainMain')
			        });
		        	deletePayment(id).then((res) => {
		        		loading.close();//关闭loading
		        		if(res.data.code == '0000'){
		        			this.$message({
					            type: 'success',
					            message: '删除成功!'
					        });
					        this.search();
		        		}
		        	},() => {
		        		loading.close();//关闭loading
		        	})
		        }).catch(() => {
			        //点击取消时候的事件        
		        });
			}*/

		},
		mounted() {
			this.search();
			this.getpaymentChannel();//获取支付渠道列表
		}
	}

</script>

<style scoped>
.tips{
	margin-bottom:14px;
}

</style>