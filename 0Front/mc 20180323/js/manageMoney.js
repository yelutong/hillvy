var vm = new Vue({
	el: '#app',
	data: {
		financepackage: {}
	},
	created: function() {
		this.queryfinancepackageList();
	},
	methods: {
		//获取我的套餐
		queryfinancepackageList() {
			commonUtil.request({
				url: financepackageList,
				dataType: "json",
				type: "post",
				contentType: "application/json",
				success: function(data) {
					console.log(data);
					if(data.code == 1) {
						vm.financepackage = data.content;
					}
				}

			})
		},

		//去激活套餐页面
		toActive(package) {
			window.localStorage.setItem("packageactive", JSON.stringify(package));
			window.location.href = "activation.html";
		}
	}

})