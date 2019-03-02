var vm = new Vue({
	el: '#app',
	data: {
		prov: {},
		provList: [],
		city: {},
		cityList: [],
		area: {},
		areaList: [],
		isAgree: false,
		activatedCount: "",
		financepackage: {
			remainCount:0
		}

	},
	created: function() {
		var package = window.localStorage.getItem("packageactive");
		if(package) {
			this.financepackage = JSON.parse(package);
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			/*获取省列表*/
			$.ajax({
				url: listAreaByParentId + 0,
				type: "get",
				contentType: "application/json",
				success: function(data) {
					var data = JSON.parse(data);
					console.log(data);
					if(data.code == 1) {
						vm.provList = data.content;
					}
				},
				beforeSend: function(request) {
					request.setRequestHeader("Authorization", window.localStorage.getItem("token"));
				}
			});
		})
	},
	methods: {
		//激活套餐
		active() {
			var package = window.localStorage.getItem("packageactive");
			var req = {};
			if(package) {
				package = JSON.parse(package);
				if(!vm.area.id) {
					showmessageTop("请选择区域");
					return;
				}
				if(vm.activatedCount == 0) {
					showmessageTop("请输入积分");
					return;
				}
				if(vm.activatedCount > package.remainCount || package.remainCount == 0) {
					showmessageTop("积分不够");
					return;
				}
				req.activatedCount = Number(vm.activatedCount);
				req.packageId = Number(package.packageId);
				req.areaId = Number(vm.area.id);
			}
			if(!vm.isAgree) {
				showmessageTop("请阅读并同意");
				return;
			}
			commonUtil.request({
				url: financepackageactive,
				dataType: "json",
				type: "post",
				data: req,
				contentType: "application/json",
				success: function(data) {
					if(data.code == 1) {
						//vm.financepackage.remainCount=vm.financepackage.remainCount-vm.activatedCount;
						showmessageTop("激活成功");
						window.location.href = "manageMoney.html";
					}
				}

			})

		},

		/*获取城市列表*/
		getCityList: function() {
			commonUtil.request({
				url: listAreaByParentId + vm.prov.id,
				type: "get",
				contentType: "application/json",
				success: function(data) {
					if(data.code == 1) {
						$("#citySelect").attr("disabled", false);
						$("#areaSelect").hide();
						vm.cityList = data.content;
					}
				}
			});
		},
		/*获取地区列表*/
		getAreaList: function() {
			commonUtil.request({
				url: listAreaByParentId + vm.city.id,
				type: "get",
				contentType: "application/json",
				success: function(data) {
					if(data.code == 1) {
						$("#areaSelect").attr("disabled", false);
						vm.areaList = data.content;
						if(vm.areaList.length <= 0) {
							$("#areaSelect").hide();
						} else {
							$("#areaSelect").show();
						}
					}
				},
				beforeSend: function(request) {
					request.setRequestHeader("Authorization", window.localStorage.getItem("token"));
				}
			})
		},

		//保存地址信息
		addAddress: function(id) {
			var userName = $("#userName").val().trim(); //	showmessageTop("密码过短");
			var phone = $("#txtPhone").val().trim();
			var address = $("#txtarea").val().trim();
			if(!userName) {
				showmessageTop("联系姓名不能空");
				return false;
			}
			if(!phone) {
				showmessageTop("联系电话不能空");
				return false;
			}

			if(!/^1[34587]\d{9}$/.test(phone)) {
				showmessageTop("联系电话格式不对");
				return false;
			}
			if(!address) {
				showmessageTop("详细地址不能空");
				return false;
			}
			if(!vm.area.id) {
				vm.orderAddress.areaId = vm.city.id;
				vm.orderAddress.areaInfo = vm.city.areaname;
			} else {
				vm.orderAddress.areaId = vm.area.id;
				vm.orderAddress.areaInfo = vm.area.areaname;
			}
			vm.orderAddress.userName = userName;
			vm.orderAddress.phone = phone;
			vm.orderAddress.address = address;

			commonUtil.request({
				url: useraddressSave,
				type: "POST",
				contentType: "application/json",
				data: vm.orderAddress,
				success: function(data) {
					if(data.code == 1) {
						window.location.href = "address.html"
					}
				}
			});

		}

	}

})