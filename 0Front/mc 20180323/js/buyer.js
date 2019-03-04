$(function() {
	$(".upgrade").click(function() {
		showmessage("功能暂未开放，请到APP中升级")
	});
	$(".statistic").click(function() {
		if (!localStorage.getItem('token')) {
			window.location.href = "login.html"
		} else {
			$.ajax({
				url: statistics_rule,
				type: "get",
				dataType: "json",
				contentType: "application/json",
				beforeSend: function(request) {
					request.setRequestHeader("Authorization", window.localStorage.getItem("token"))
				},
				success: function(data) {
					console.log(data);
					if (data.code == 1) {
						window.location.href = 'data_menber.html'
					} else {
						showmessage("对不起，你暂无权限查看哦")
					}
				},
				error: function(jqXHR, textStatus) {}
			})
		}
	})
});
var vm = new Vue({
	el: '#app',
	data: {
		userWallet: {}
	},
	created: function() {
		this.walletInfo()
	},
	methods: {
		toBuyerOrder(orderStatus) {
			console.log(orderStatus);
			window.localStorage.setItem("userOrderStatus", orderStatus);
			window.location.href = "buyer_order.html"
		},
		walletInfo() {
			$.ajax({
				type: "get",
				url: userWalletInfo,
				dataType: "json",
				contentType: "application/json",
				beforeSend: function(request) {
					request.setRequestHeader("Authorization", window.localStorage.getItem("token"))
				},
				success: function(data) {
					console.log(1);
					console.log(data);
					if (data.code == 1) {
						vm.userWallet = data.content
					}
				}
			})
		},
		format: function(value) {
			var html, _val;
			if (value == undefined) {
				value = 0;
				return html = "0.00"
			}
			value = Number(value).toFixed(2);
			if (value == 0) {
				value = 0;
				return html = "0.00"
			} else if (value.split('.')[1] != null && value.split('.')[1].substring(1) == 0) {
				value = Number(value).toFixed(2)
			}
			_val = value.split('.');
			return html = _val[0] + '.' + _val[1]
		}
	}
})