<template>
	<div id="app">
		<transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
	}
}

</script>

<style lang="scss">
body {
	margin: 0px;
	padding: 0px;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	// background: #1F2D3D;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}.table{
	margin-bottom:10px;
	color:#333333;
	padding-left:10px;
}
.align-right{
	text-align:right;
}
.align-center{
	text-align:center;
}
.align-left{
	text-align:left;
}
.linkEle{
    color: #146c98;
    cursor:pointer;
}
.linkEle:hover{
	color:#042f44;
}
.topErea{
	text-align:right;
	padding:12px;
}
p{
	padding:0px;
	margin:0px;
}
.el-table th>.cell{
	word-wrap: break-word!important;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu{
    background-color: #545c64!important;
}
.el-submenu__title:hover{
	background-color: #474d52 !important;
}
.el-menu-item:hover{
	background-color: #474d52 !important;
	color:#ffffff;
}
.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #f2f2f2;
	padding: 10px;
	//border:1px solid #dfe6ec;
	margin: 10px 0px;
	.el-form-item {
		margin: 5px 0px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
.mainDesction{
	color:#303133;
}
.blue{
	color: #409EFF;	
}
.green{
	color: #67C23A;
}
.red{
	color: #F56C6C;
}

.el-submenu__title{
    height: 42px!important;
    line-height: 42px!important;
}
.el-menu-item.is-active{
	color:rgb(255, 208, 75) !important;
    background-color: #474d52 !important;
}
.el-menu-item{
	color:#d2d2d2!important;
	padding-left: 50px!important;
	height:42px !important;
	line-height:42px !important;
}

.el-form-item{
    margin-bottom: 14px;
}

.el-submenu__title{
	font-weight:bold;
}
.toolbarForm{
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    background-color:#ffffff;
    margin-bottom:16px;
    padding: 15px;
}
.el-table td, .el-table th{
	padding: 8px 0!important;
}
.el-table th{
	color: #409EFF;
    background: #ecf5ff!important;
    border-color: #dddee0!important;
    font-weight:bold;
    padding: 7px 0!important;
    font-weight:normal!important;
}
.el-table .cell{
    line-height: 16px!important;
    word-break: break-word!important;
	overflow: hidden;
    text-overflow: initial;
}
.comtainMain{
	padding:20px;
}
.container .main .content-container,.container .main .content-container .content-wrapper{
	background-color: #f5f5f5!important;
}
.el-input__inner,.el-textarea__inner,.el-range-editor .el-range-input{
	background-color:#ffffff!important;
}
.el-table--border{
	border:1px solid #dddee0!important;
}
.el-table--border td{
	border-right:1px solid #dddee0!important;
	border-bottom:1px solid #dddee0!important;
}
.el-pagination .btn-next, .el-pagination .btn-prev,.el-pager li{
	background: transparent!important;
}
.el-table__empty-block{
    position: static!important;
}
.simpleErea{
	.title{
		border-bottom:1px solid #f2f2f2;
		padding-bottom:20px;
		margin-bottom:20px;
	}
	.main{
		text-align:left;
		position:relative;
		z-index:1;
	}
	.mainImg{
		margin-bottom:20px;
		text-align:center;
		img{
			width:40%;
		}
	}
	.basic{
		background:rgba(255,255,255,1);
		box-shadow:0px 7px 35px 0px rgba(90,97,105,0.1),0px 15px 22px 0px rgba(90,97,105,0.1),0px 4px 8px 0px rgba(90,97,105,0.12),0px 2px 3px 0px rgba(90,97,105,0.11);
		border-radius:18px;
		width:380px;
		padding:30px 20px 20px 20px;
		box-sizing:boder-box;
		margin:auto;
		margin-top:50px;
		min-height:350px;
		position:relative;
	}
	.error{
		color:red;
	}
}
</style>