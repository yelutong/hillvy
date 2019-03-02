	var vm = new Vue({
		el: '#app',
		data: {
			add_num: 0,
			orderAddressList: []
		},
		mounted: function() {
			this.$nextTick(function() {
				//获取订单地址列表
				commonUtil.request({
					url: useraddressList,
					type: "get",
					contentType: "application/json",
					success: function(data) {
						if(data.code == 1) {
							vm.orderAddressList = data.content;
						}
					}
				})

			})
		},
		beforeUpdate: function() {
			this.$nextTick(function() {
				vm.adr_num();
			})
		},
		methods: {
			adr_num: function() {
				this.add_num = $(".add_num li").length;
			},
			//选择地址订单地址
			chooseAddress: function(id) {
				//选择订单地址
				commonUtil.request({
					url: useraddressInfo + id,//根据主键获取地址详情
					type: "get",
					contentType: "application/json",
					success: function(data) {
						if(data.code == 1) {
							console.log(data);
							window.localStorage.removeItem("chooseAddress");
							window.localStorage.setItem("chooseAddress", JSON.stringify(data.content));
							//window.location.href="shopcar_acounts.html"
							if(getQueryString("id")==1163){
								window.location.href="shopcar_acounts.html";
							}
							else if(getQueryString("id")==21){
								window.location.href="awardAcounts.html";
							}
							else{ 
							   window.location.href="buyer_setting.html";
							} 
							return false;
						}
					}
				});

			},
			//编辑订单地址
			toEdite: function(id) {
				window.localStorage.setItem("edite:addressId", id); 
				var addr_id=getQueryString("id");
				if(addr_id==1163){ 
				   window.location.href = "address_edit.html?id=1163";
				}
				else if(addr_id==21){ 
				   window.location.href = "address_edit.html?id=21";
				}
				else{ 
				   window.location.href = "address_edit.html";
				}  
			},
			//删除订单地址
			deleteAddress: function(orderAddress) {
				commonUtil.request({
					url: useraddressDelete + orderAddress.id,
					type: "get",
					contentType: "application/json",
					success: function(data) {
						if(data.code == 1) {
						//	vm.orderAddressList.splice(orderAddress, 1);
                    	location.reload(); 
						}
					}
				});
			}
		}
	})