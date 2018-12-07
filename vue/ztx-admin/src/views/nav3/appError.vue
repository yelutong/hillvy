<template>
	<section class="comtainMain">
		<!--<Header-component v-bind:message="filters.time"></Header-component>-->
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;" border>
			<el-table-column type="index" width="60" label="序号">
			</el-table-column>
			<el-table-column prop="appVersion" label="app版本号" width="110">
			</el-table-column>
			<el-table-column prop="deviceVersion" label="系统版本" min-width="100">
			</el-table-column>
			<el-table-column prop="deviceBrand" label="设备型号" width="120">
			</el-table-column>
			<el-table-column prop="phone" label="手机" width="120">
			</el-table-column>
			<el-table-column label="错误信息" width="200">
				<template slot-scope="scope">
					<a class="linkEle" @click="showDetailError((scope.row.errorMsg && scope.row.errorMsg.length>200)?scope.row.errorMsg:scope.row.exceptionMsg)">{{(scope.row.errorMsg && scope.row.errorMsg.length>200)?'未知错误':(!scope.row.errorMsg?'未知错误':scope.row.errorMsg)}}</a>
				</template>
			</el-table-column>
			<el-table-column prop="errorTime" label="错误时间" min-width="140" sortable>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--显示错误详情-->
		<el-dialog
		  title="错误详情"
		  :visible.sync="dialogVisible"
		  width="80%">
		  <span>{{exceptionMsg}}</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { listAppError } from '../../api/api';

	export default {
		data() {
			return {
				total: 0,
				page: 1,
				users:[],
				listLoading:false,
				dialogVisible: false,
				exceptionMsg:''
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.search();
			},
			showDetailError(exceptionMsg) {
				this.dialogVisible = true;
				this.exceptionMsg = exceptionMsg;
			},
			//获取用户列表
			search() {
				let para = {
					page: this.page-1,
					size: 10
					//name: this.filters.time
				};
				this.listLoading = true;
				//NProgress.start();
				listAppError(para).then((res) => {
					console.log(res);
					this.total = res.data.body.totalElements;
					this.users = res.data.body.content;
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
.linkEle{
	color:#409EFF;
	text-decoration: underline;
}
</style>