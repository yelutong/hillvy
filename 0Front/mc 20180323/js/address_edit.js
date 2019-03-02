var vm = new Vue({
		el: '#app',
		data: {
			prov: {},
			provList: [],
			city: {},
			cityList: [],
			area: {},
			areaInfo:{},
			areaList: [],
			orderAddress: {
				userName: "",
				phone: "",
				address: "",
				isChecked: ""
			}

		},
		mounted: function() {
			this.$nextTick(function() {
				var addressId = window.localStorage.getItem("edite:addressId");
				commonUtil.request({
					url: useraddressInfo + addressId, //根据主键获取地址详情
					type: "get",
					contentType: "application/json",
					success: function(data) { //客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数 
						if(data.code == 1) { 
							var areaMap = data.content.areaMap;
							vm.provList = areaMap.provList;
							vm.cityList = areaMap.cityList;
							vm.areaList = areaMap.areaList;
							vm.prov = areaMap.prov;
							vm.city = areaMap.city;
							vm.area = areaMap.area;
							vm.areaInfo=areaMap.prov.areaname+" "+areaMap.city.areaname+" "+areaMap.area.areaname;  
							vm.orderAddress = data.content;
						}

					}
				});
			})
		},
		methods: {
			getCityList: function() {
				commonUtil.request({
					url: listAreaByParentId + vm.prov.id,
					type: "get",
					contentType: "application/json",
					success: function(data) { //客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数 
						if(data.code == 1) {
							$("#citySelect").attr("disabled", false);
							$("#areaSelect").hide();
							vm.cityList = data.content;
						}

					}
				});

			},

			getAreaList: function() {
				commonUtil.request({
					url: listAreaByParentId + vm.city.id,
					type: "get",
					contentType: "application/json",
					success: function(data) { //客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数 
						if(data.code == 1) {
							$("#areaSelect").attr("disabled", false);
							vm.areaList = data.content;
							if(vm.areaList.length > 0) {
								$("#areaSelect").show();
							}
						}
					}
				});
			},

			//保存地址信息
			editAddress: function(id) {
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
					vm.orderAddress.areaInfo =vm.areaInfo;
				}  
				
				vm.orderAddress.userName = userName;
				vm.orderAddress.phone = phone;
				vm.orderAddress.address = address;

				commonUtil.request({
					url: useraddressUpdate, //修改地址
					type: "POST",
					contentType: "application/json",
					data: vm.orderAddress,
					success: function(data) {
						if(data.code == 1) {
							var addr_id=getQueryString("id");
							if(addr_id==1163){ 
							   window.location.href= "address.html?id=1163";
							}
							else if(addr_id==21){ 
							   window.location.href= "address.html?id=21";
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