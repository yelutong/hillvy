var vm = new Vue({
	el: '#app',
	data: {
		userLeader: {},
		indirectUser: {}
	},
	created: function() {
		this.queryDirectUser();
		this.queryIndirectUser()
	},
	methods: {
		//我的一级推广
		queryDirectUser() {
			commonUtil.request({
				url: directUser,
				dataType: "json",
				type: "post",
				contentType: "application/json",
				success: function(data) {
					console.log(data);
					if(data.code == 1) {
						vm.userLeader = data.content;
					}
				}

			})
		},
		//我的二级推广
		queryIndirectUser() {
			commonUtil.request({
				url: indirectUser,
				dataType: "json",
				type: "post",
				contentType: "application/json",
				success: function(data) {
					console.log("data");
					console.log(data);
					if(data.code == 1) {
						vm.indirectUser = data.content;
					}
				}

			})
		},
	}

})