var vm = new Vue({
		el: '#app',
		data: {
			prov: {},
			provList: [],
			city: {},
			cityList: [],
			prov: {},
			city: {},
			area: {},
			areaInfo:{},
			areaList: [],
			orderAddress: {
				areaId: "",
				userName: "",
				phone: "",
				address: "",
				isChecked: 0
			}

		},
		mounted: function() {
			this.$nextTick(function() {
				/*获取省列表*/
				commonUtil.request({
					url: listAreaByParentId + 0,
					type: "get",
					contentType: "application/json",
					success: function(data) {
						if(data.code == 1) {
							vm.provList = data.content;
						}
					}
				});

			})
		},
		methods: {
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
				var prov=$(".prov").val();
				var city=$(".city").val();
				var dist=$(".dist").val();
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
				if(prov==""||prov==undefined||city==""||city==undefined||dist==""||dist==undefined) {
					showmessageTop("请选择收货区域");
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
					vm.orderAddress.areaInfo =vm.prov.areaname+" "+vm.city.areaname+" "+vm.area.areaname;
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
						console.log(data);
						if(data.code == 1) {
							var addr_id=getQueryString("id");
							if(addr_id==1163){ 
							   window.location.href= "shopcar_acounts.html";
							}
							else if(addr_id==21){ 
							   window.location.href= "awardAcounts.html";
							}
							else{ 
							   window.location.href = "address.html"
							} 
							
							
						}
					}
				});

			}

		}
	})