<template>
	<section class="comtainMain">
		<!--<Header-component v-bind:message="filters.time"></Header-component>-->
		<!--工具条-->
		<el-col :span="24">
			<el-button type="warning" size="small" plain @click="search()">刷新数据</el-button>
			<el-button type="warning" size="small" plain @click="download()">导出EXCEL</el-button>
		</el-col>
		<!--工具条-->
		<el-col :span="24" class="toolbar toolbarForm">
			<el-form ref="searchForm" :inline="true" :model="filters">
				<el-form-item label="时间区间" prop="time">
					<el-date-picker prop="time"
				      v-model="filters.time"
				      type="datetimerange"
				      :picker-options="pickerOptions2"
				      format="yyyy-MM-dd HH:mm:ss"
				      value-format="yyyy-MM-dd HH:mm:ss"
				      placeholder="选择日期区间"
				      align="right">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="渠道" prop="channel">
				    <el-input v-model="filters.channel" placeholder="渠道"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="search" icon="el-icon-search" size="small">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" plain icon="el-icon-delete" @click="empty('searchForm')">清空</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;">
			<!--<el-table-column type="index" width="60">
			</el-table-column>-->
			<el-table-column prop="loadDate" fixed label="日期" width="120">
			</el-table-column>
			<el-table-column prop="loadChannel" fixed label="渠道标签" min-width="80">
			</el-table-column>
			<el-table-column prop="loadNum" label="下载量" width="100">
			</el-table-column>
			<el-table-column prop="activeNum" label="活跃量" width="100">
			</el-table-column>
			<el-table-column prop="registerNum" label="注册量" width="100">
			</el-table-column>
			<el-table-column prop="registerRate" label="注册率" width="80">
			</el-table-column>
			<el-table-column prop="applyAmt" label="发起金额" width="100">
			</el-table-column>
			<el-table-column prop="term7Num" label="7天借款期限量" width="100">
			</el-table-column>
			<el-table-column prop="term14Num" label="14天借款期限量" min-width="100">
			</el-table-column>
			<el-table-column prop="applyNum" label="发起申请量" min-width="100">
			</el-table-column>
			<el-table-column prop="applyRate" label="发起申请率" min-width="80">
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
	import { getDownloadData, listAdviceExcel } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					time: ''
				},
				list: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				pickerOptions2: {
		          shortcuts: [{
		            text: '最近一周',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近一个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近三个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
		              picker.$emit('pick', [start, end]);
		            }
		          }]
		        },
		        value5: ''
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.search();
			},
			//获取用户列表
			search() {
				let para = {
					page: this.page-1,
					size: 10,
					channel:this.filters.channel
				};
				console.log(this.filters.time);
				if(this.filters.time){
					para = Object.assign(para,{
						startTime : this.filters.time[0],
						endTime : this.filters.time[1]
					})
				}
				this.listLoading = true;
				//NProgress.start();
				getDownloadData(para).then((res) => {
					console.log(res);
					this.total = res.data.body.totalElements;
					this.list = res.data.body.content;
					this.listLoading = false;
					//NProgress.done();
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
			/*
			*选中表格行
			*/
			selsChange: function (sels) {
				this.sels = sels;
				console.log(this.sels);//选中表格行
			},
			/*导出EXCEL*/
			download() {
				console.log(listAdviceExcel+'?type=CHANNEL');
				var downUrl = listAdviceExcel+'?type=CHANNEL';
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