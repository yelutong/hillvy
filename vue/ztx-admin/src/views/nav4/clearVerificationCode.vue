<template>
	<div class="simpleErea">
    	<div class="main">
    		<div class="basic">
    			<div class="mainBasic">
    				<div class="title">清空手机验证码次数</div>
    				<el-form ref="searchForm" :inline="true" :model="filters">
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="filters.phone" v-on:input="checkPhoneInput" placeholder="请输入要清空的手机号">
							</el-input>
							<div v-if="phoneTips" class="error">请输入要清空的手机号</div>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" v-on:click="emptyCode()" icon="el-icon-info" size="middle">确定</el-button>
						</el-form-item>
					</el-form>
					<div class="mainImg">
    					<img src="../../common/images/phone.png">
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
</template>

<script>
	import { emptyCode } from '../../api/api';

	export default {
		data() {
			return {
				filters:{
					phone:''
				},
				phoneTips:false//为true的时候，就显示error的提示
			}
		},
		methods: {
			/*
			*@description 清空手机验证码
			*/
			emptyCode() {
				if(this.filters.phone && this.filters.phone.replace(/\s+/g,"") != ''){
					//调用清空验证码次数的接口
					const loading = this.$loading({
			          lock: true,
			          text: 'Loading',
			          spinner: 'el-icon-loading',
			          background: 'rgba(0, 0, 0, 0.2)',
			          target:document.querySelector('.content-container')
			        });
					emptyCode(this.filters).then((res) => {
						loading.close();//关闭loading
						if(res.data.code == '0000'){
							//成功的事件
							this.$message.success('手机号'+this.filters.phone+'操作成功');
						}else if(res.data.code == '1004'){
							this.$message.error('未找到相关记录，请核对手机号是否正确');
						}else if(res.data.code == '9000'){
							this.$message.error('系统异常，删除失败');
						}
					},() => {
						loading.close();//关闭loading
					})
				}else{
					//校验手机号不能为空
					this.$message.error('请输入要清空验证码次数的手机号');
					this.phoneTips = true;
				}
			},

			/*
			*校验手机号是否为空
			*/
			checkPhoneInput(value) {
				//有值且为空值的时候打开error
				if(value && value.replace(/\s+/g,"") == ''){
					this.phoneTips = true;
				}else{
					this.phoneTips = false;
				}
			}
		},
		mounted() {
			
		}
	}

</script>

<style lang="scss" scoped>
</style>