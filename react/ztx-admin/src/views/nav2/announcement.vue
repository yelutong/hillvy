<template>
	<section class="comtainMain">
		<el-col :span="24" style="margin-bottom:10px;">
			<el-button type="warning" size="small" plain @click="editMsm('', {})">新增公告</el-button>
		</el-col>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;margin-top:10px;" border>
			<!--<el-table-column prop="channel" label="渠道" width="60" :formatter="formatChannel">
			</el-table-column>-->
			<el-table-column prop="title" label="标题" min-width="140">
			</el-table-column>
			<el-table-column prop="createTime" label="新增时间" width="100">
			</el-table-column>
			<el-table-column prop="valid" label="目前状态" min-width="60">
				<template slot-scope="scope">
					{{scope.row.valid == true?'启动':'关闭'}}
				</template>
			</el-table-column>
			<el-table-column prop="validTime" label="关闭时间" width="100">
			</el-table-column>
			<el-table-column prop="needPush" label="是否推送" min-width="60">
				<template slot-scope="scope">
					{{scope.row.needPush == true?'是':'否'}}
				</template>
			</el-table-column>
			<el-table-column prop="pushTime" label="推送时间" min-width="100">
			</el-table-column>
			<el-table-column prop="updateName" label="更新人" min-width="100">
			</el-table-column>
			<el-table-column label="操作" width="280">
				<template slot-scope="scope">
					<el-button size="small" type="primary" plain @click="confirmNotic('valid',scope.$index, scope.row)">{{scope.row.valid == true?'关闭显示':'开启显示'}}</el-button>
					<el-button size="small" type="primary" plain @click="confirmNotic('push',scope.$index, scope.row)">{{scope.row.needPush == true?'关闭推送':'开启推送'}}</el-button>
					<el-button size="small" type="primary" @click="editMsm(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!--公告编辑-->
		<el-dialog
		  title="系统公告"
		  :visible.sync="dialogVisible"
		  :before-close="handleClose"
		  v-if="dialogVisible"
		  width="40%">
		  	<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			  <el-form-item label="标题" prop="title">
			    <el-input v-model="form.title"></el-input>
			  </el-form-item>
			  <el-form-item label="关闭时间" prop="validTime">
			  	<el-date-picker
			      v-model="form.validTime"
			      type="datetime"
			      format="yyyy-MM-dd HH:mm:ss"
			      value-format="yyyy-MM-dd HH:mm:ss"
			      placeholder="选择关闭时间">
			    </el-date-picker>
			  </el-form-item>
			  <div style="margin:10px 0px;">
			  	  <label class="el-form-item__label" style="width: 80px;"><span style="color:red">*</span>内容</label>
				  <textarea id="elm3" name="elm3" class="xheditor-simple" rows="10" cols="10" style="width: 100%">
				  </textarea>
			  </div>
			  <el-form-item>
			    <el-button type="primary" @click="saveMsm('form')">保存</el-button>
			    <el-button @click="handleClose('')">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>

		<!--确认是否关闭开启-->
		<el-dialog
		  title="提示"
		  :visible.sync="centerDialogVisible"
		  v-if="centerDialogVisible"
		  width="30%"
		  center>
		  <span>{{confirmText}}</span>
		  <div style="margin-top:10px;" v-if="operationType=='push' && form.needPush == false">
		  	  <label><span class="red">*</span>推送时间:</label>
			  <el-date-picker
			      v-model="pushTime"
			      type="datetime"
			      format="yyyy-MM-dd HH:mm:ss"
			      value-format="yyyy-MM-dd HH:mm:ss"
			      placeholder="选择推送时间">
			   </el-date-picker>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="centerDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="noticOperat()">确 定</el-button>
		  </span>
		</el-dialog>

	</section>
</template>

<script>
	import '../../common/js/xheditor-1.2.2.min';
	//import NProgress from 'nprogress';
	import { noticeInfo, editNotice } from '../../api/api';
	import config from '../../api/config';
	console.log(config);
	const envCode = config.envCode;

	export default {
		data() {
			return {
				form: {
					content: '',
					needPush:'',
					pushContent:'',
					valid:'',
					validTime:'',
				},
				rules:{
					title:{required: true, message: '请输入标题', trigger: 'blur'},
					validTime:{required: true, message: '请输入关闭时间', trigger: 'blur'}
				},
				httpUrl:(location.protocol+'//'+config.frontDomain),
				list: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				dialogVisible: false,
				centerDialogVisible:false,
				confirmText:'',
				operationType:'',
				pushTime:''
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
			/*
			*@关闭弹窗
			*/
			handleClose (done) {
				if(done){
			        console.log($('script'));
					//$('script[name="xheditor"]').remove();
					this.dialogVisible = false;
				}else{
					//$('script[name="xheditor"]').remove();
					this.dialogVisible = false;
				}
			},
			/*
			*@开启关闭公告确认框
			*/
			confirmNotic (type,index,row) {
				this.form = Object.assign(row, {channel:'app'});
				if(type == 'valid'){
					this.operationType = 'valid';
					this.confirmText = '确定'+(this.form.valid == true?'关闭':'启动')+'公告？'
				}else{
					this.operationType = 'push';
					this.confirmText = '确定'+(this.form.needPush == true?'取消推送':'开启推送')+'该公告？'
					if(this.form.needPush == false){
						this.pushTime = '';
					}
				}
				this.centerDialogVisible = true;
			},
			/*
			*@启动关闭以及推送接口
			*/
			noticOperat() {
				if(this.operationType=='push' && this.form.needPush == false){
					if(!this.pushTime){
						this.$message({
							message: '请选择推送时间',
							type: 'error'
						});
						return false;
					}
				}
				var para = {
					id:this.form.id,
					title:this.form.title,
					needPush:this.operationType == 'push'?!this.form.needPush:this.form.needPush,
					pushContent:this.form.pushContent,
					valid:this.operationType == 'valid'?!this.form.valid:this.form.valid,
					validTime:this.form.validTime,
					content:this.form.content,
					pushTime:(this.pushTime!='')?this.pushTime:this.form.pushTime
				};
				const loading = this.$loading({
		          lock: true,
		          text: 'Loading',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.2)',
		          target:document.querySelector('.el-dialog__wrapper')
		        });
				editNotice(para).then((res) => {
			        loading.close();//关闭loading
			        if(res.data.code == '0000'){
			        	this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.search();
			        	this.centerDialogVisible = false;//关闭弹窗
			        }
		        },() => {
		        	loading.close();//关闭loading
		        })
			},
			//打开编辑界面
			editMsm (index,row) {
				this.dialogVisible = true;
				this.form = Object.assign({
					channel:'app',
					content: row.content,
					needPush:row.needPush,
					pushContent:row.pushContent,
					valid:row.valid,
					validTime:row.validTime,
					title:row.title,
					id:row.id,
					pushTime:this.form.pushTime
				});
				/*
				*根据是否生产环境，判断加入的是什么环境的js。
				*别问为什么在这里加入js，我也不知道，因为要等dom加载完之后，加载js才有效，才可以渲染富文本**的样式
				*/
				//富文本赋值
				setTimeout(()=>{
					var editor=$('#elm3').xheditor({tools:'simple',skin:'default'});
					console.log('content',row.content);
					if(row.content){
						//截取body里面的内容赋值
						if(row.content.indexOf('<body>')>=0){
							editor.setSource(row.content.split('<body>')[1].split('</body>')[0]);
						}else{
							editor.setSource(row.content);
						}
					}else{
						//赋值为空
						editor.setSource('');
					}
				},200)
			},
			//保存编辑信息
			saveMsm (formName) {
				var para = {
					id:this.form.id,
					title:this.form.title,
					needPush:this.form.needPush || false,
					pushContent:this.form.pushContent,
					valid:this.form.valid || false,
					validTime:this.form.validTime,
					pushTime:this.form.pushTime
				};
				console.log(this.$refs[formName]);
				//初始化富文本
				var editor=$('#elm3').xheditor({tools:'simple',skin:'default'}); 
				//校验富文本是否有内容
				if(!editor.getSource()){
					this.$message({
						message: '请输入公告内容',
						type: 'error'
					});
				}
				//富文本编辑的html
				var element = '<html><head><style>p,body{padding:0px;margin:0px;}body{line-height:20px;color:#666666;width:90%;margin:auto;padding:4% 2% 2% 2%;font-size:14px;}</style></head><body>'+editor.getSource()+'</body></html>'
				console.log(element);
				//获取富文本的纯文字，因为有些公告要推送，推送的时候不可能推送代码，所以要把文本截取出来
				var text = element.replace(/<[^>]+>/g,"");
				text = text.split('font-size:14px;}')[1];
				text = text.replace(/&nbsp;/g,"");
				console.log('text',text);
				//校验输入框
				this.$refs[formName].validate((valid) => { //校验必填项
					if(valid){ //校验有效的话
						const loading = this.$loading({
				          lock: true,
				          text: 'Loading',
				          spinner: 'el-icon-loading',
				          background: 'rgba(0, 0, 0, 0.2)',
				          target:document.querySelector('.el-dialog__wrapper')
				        });
				        para = Object.assign(para,{
				        	pushContent:text,
				        	content:element
				        })
				        editNotice(para).then((res) => {
					        loading.close();//关闭loading
					        if(res.data.code == '0000'){
					        	this.$message({
									message: '公告编辑成功',
									type: 'success'
								});
								this.search();
					        	this.dialogVisible = false;//关闭弹窗
					        	$('script[name="xheditor"]').remove();//移除js
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
				this.listLoading = true;
				//NProgress.start();
				noticeInfo(para).then((res) => {
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
			//加载富文本js
			if(envCode != 'PRODUCT'){
				if(envCode == 'SIT-OUTSIDE'){
					setTimeout(()=>{
						$('body').append('<script name="xheditor" src='+this.httpUrl+'/xheditor-1.2.2.min.js></'+'script>'); //需要加载完DOM之后再引入一下xheditor.js
					},100)
					setTimeout(()=>{
						$('body').append('<script name="xheditor" src='+this.httpUrl+'/zh-cn.js></'+'script>'); 
					},300)
				}else{
					setTimeout(()=>{
						$('body').append('<script name="xheditor" src='+this.httpUrl+'/xheditor-1.2.2.min.js></'+'script>'); //需要加载完DOM之后再引入一下xheditor.js
					},100)
					setTimeout(()=>{
						$('body').append('<script name="xheditor" src='+this.httpUrl+'/zh-cn.js></'+'script>'); 
					},300)
				}
			}else{
				setTimeout(()=>{
					$('body').append('<script name="xheditor" src='+this.httpUrl+'/xheditor-1.2.2.min.js></'+'script>'); //需要加载完DOM之后再引入一下xheditor.js
				},100)
				setTimeout(()=>{
					$('body').append('<script name="xheditor" src='+this.httpUrl+'/zh-cn.js></'+'script>'); 
				},300)
			}
		}
	}

</script>

<style scoped>
.tips{
	margin-bottom:14px;
}

</style>