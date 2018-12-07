<template>
	<section class="comtainMain">
		<!--<Header-component v-bind:message="filters.time"></Header-component>-->
		<!--工具条-->
		<el-col :span="24">
			<el-button type="warning" size="small" plain @click="download">导出EXCEL</el-button>
		</el-col>
		<!--工具条-->
		<el-col :span="24" class="toolbar toolbarForm">
			<el-form ref="searchForm" :inline="true" :model="filters">
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="filters.phone"></el-input>
				</el-form-item>
				<el-form-item label="用户编码" prop="cusId">
					<el-input v-model="filters.cusId"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="search" icon="el-icon-search" size="small">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="empty('searchForm')" size="small" plain icon="el-icon-delete">清空</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;" border>
			<el-table-column type="index" width="60" label="序号">
			</el-table-column>
			<el-table-column prop="phone" label="手机号" width="120">
			</el-table-column>
			<el-table-column prop="adviceMsg" label="意见内容" min-width="300">
			</el-table-column>
			<el-table-column prop="android" label="操作系统" width="120" :formatter="formatSystem">
			</el-table-column>
			<el-table-column prop="appVersion" label="APP版本号" width="120">
			</el-table-column>
			<el-table-column prop="createTime" label="发表时间" min-width="120">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { listAdvice, listAdviceExcel } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					cusId: ''
				},
				list: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
			}
		},
		methods: {
			//性别显示转换
			formatSystem: function (row, column) {
				return 'android';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.search();
			},
			//获取用户列表
			search() {
				let para = {
					page: this.page-1,
					size: 10,
				};
				para = Object.assign(para,this.filters);
				this.listLoading = true;
				//NProgress.start();
				listAdvice(para).then((res) => {
					console.log(res);
					this.total = res.data.body.totalElements;
					this.list = res.data.body.content;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			empty(formName) {
				console.log(this.$refs[formName]);
				this.$refs[formName].resetFields();
			},
			selsChange: function (sels) {
				this.sels = sels;
				console.log(this.sels);//选中表格行
			},
			//下载EXCEL
			download() {
				console.log(listAdviceExcel+'?type=ADVICE');
				var downUrl = listAdviceExcel+'?type=ADVICE';
				window.open(downUrl);//直接打开下载地址
			}
			
		},
		mounted() {
			this.search();
		}
	}

</script>

<style scoped>

</style>