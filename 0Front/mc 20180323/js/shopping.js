$(function() {
	// 数量减
	$(document).on("click", ".minus", function() {
		var t = $(this).parent().find('.num');
		//更新后台商品数量
		//class="goodsObj"  :goodsId="goods.id" :goodsName="goods.goodsName"  goodsSkuInfo="goods.goodsSkuInfo"
		if(Number(t.text()) > 1) {
			var goodsDom = $(this).parents(".shop-info").find(".goodsObj");
			var goods = {};
			goods.goodsId = Number($(goodsDom).attr("goodsId"));
			goods.storeId = Number($(goodsDom).attr("storeId"));
			goods.goodsSku = $(goodsDom).attr("goodsSku");
			goods.id = Number($(goodsDom).attr("carId")); //购物车Id
			goods.goodsCount = Number($(this).parent().find('.num').text())-1;
			vm.updateGoodCount(goods);
		} else {
			return false;
		}
		t.text(parseInt(t.text()) - 1);
		if(t.text() <= 1) {
			t.text(1);
		}
		TotalPrice();

	});
	// 数量加
	$(document).on("click", ".plus", function() {
		var t = $(this).parent().find('.num');
		t.text(parseInt(t.text()) + 1);
		if(t.text() <= 1) {
			t.text(1);
		}
		//更新后台商品数量
		////<input type="hidden" goodsid="75" goodsname="联想(Lenovo)拯救者R720 15.6英寸游戏笔记本电脑(i5-7300HQ 8G 1T+128G SSD GTX1050Ti 4G IPS 黑)" goodsskuinfo="颜色:白色,尺寸:15.5,包装:官方" goodssku="1:1,11:19,14:27" carid="105" storeid="1021" class="goodsObj">
		var goodsDom = $(this).parents(".shop-info").find(".goodsObj");
		var goods = {};
		goods.goodsId = Number($(goodsDom).attr("goodsId"));
		goods.storeId = Number($(goodsDom).attr("storeId"));
		goods.id = Number($(goodsDom).attr("carId")); //购物车Id
		goods.goodsSku = $(goodsDom).attr("goodsSku");
		goods.goodsCount = Number($(this).parent().find('.num').text());
		vm.updateGoodCount(goods);
		TotalPrice();
	});
	/******------------分割线-----------------******/
	// 点击商品按钮
	$(document).on("click", ".goodsCheck", function() {
		var goods = $(this).closest(".shop-group-item").find(".goodsCheck"); //获取本店铺的所有商品
		var goodsC = $(this).closest(".shop-group-item").find(".goodsCheck:checked"); //获取本店铺所有被选中的商品
		var Shops = $(this).closest(".shop-group-item").find(".shopCheck"); //获取本店铺的全选按钮
		if(goods.length == goodsC.length) { //如果选中的商品等于所有商品
			Shops.prop('checked', true); //店铺全选按钮被选中
			if($(".shopCheck").length == $(".shopCheck:checked").length) { //如果店铺被选中的数量等于所有店铺的数量
				$("#AllCheck").prop('checked', true); //全选按钮被选中
				TotalPrice();
			} else {
				$("#AllCheck").prop('checked', false); //else全选按钮不被选中 
				TotalPrice();
			}
		} else { //如果选中的商品不等于所有商品
			Shops.prop('checked', false); //店铺全选按钮不被选中
			$("#AllCheck").prop('checked', false); //全选按钮也不被选中
			// 计算
			TotalPrice();
			// 计算
		}
	});
	// 点击店铺按钮

	$(document).on("click", ".shopCheck", function() {
		if($(this).prop("checked") == true) { //如果店铺按钮被选中
			$(this).parents(".shop-group-item").find(".goods-check").prop('checked', true); //店铺内的所有商品按钮也被选中
			if($(".shopCheck").length == $(".shopCheck:checked").length) { //如果店铺被选中的数量等于所有店铺的数量
				$("#AllCheck").prop('checked', true); //全选按钮被选中
				TotalPrice();
			} else {
				$("#AllCheck").prop('checked', false); //else全选按钮不被选中
				TotalPrice();
			}
		} else { //如果店铺按钮不被选中
			$(this).parents(".shop-group-item").find(".goods-check").prop('checked', false); //店铺内的所有商品也不被全选
			$("#AllCheck").prop('checked', false); //全选按钮也不被选中
			TotalPrice();
		}
	});
	// 点击全选按钮
	$(document).on("click", "#AllCheck", function() { 
		if($(this).prop("checked") == true) { //如果全选按钮被选中
			$(".goods-check").prop('checked', true); //所有按钮都被选中
			TotalPrice();
		} else {
			$(".goods-check").prop('checked', false); //else所有按钮不全选
			TotalPrice();
		}
		$(".shopCheck").change(); //执行店铺全选的操作

	});
	//计算
	function TotalPrice() {
		var allprice = 0; //总价
		var storeList = []; //店铺数组
		var carIdList = []; //购物车ID
		$(".shop-group-item").each(function() { //循环每个店铺
			var oprice = 0; //店铺总价
			var newstore = {};
			newstore.goodsCarts = [];
			newstore.storeName = $(this).attr("storeName");
			newstore.storeId = $(this).attr("storeId");

			$(this).find(".goodsCheck").each(function() { //循环店铺里面的商品
				if($(this).is(":checked")) { //如果该商品被选中
					//class="goodsObj"  :goodsId="goods.id" :goodsName="goods.goodsName"  goodsSkuInfo="goods.goodsSkuInfo"
					var goodsDom = $(this).parents(".shop-info").find(".goodsObj");
					var goods = {};
					goods.goodsId = $(goodsDom).attr("goodsId");
					goods.goodsName = $(goodsDom).attr("goodsName");
					goods.goodsSkuInfo = $(goodsDom).attr("goodsSkuInfo");
					if($(goodsDom).attr("goodsPhoto")) {
						goods.goodsPhoto =$(goodsDom).attr("goodsPhoto").split(',')[0];
					}
					carIdList.push({
						"id": Number($(goodsDom).attr("carId"))
					})

					var num = parseInt($(this).parents(".shop-info").find(".num").text()); //得到商品的数量
					var price = parseFloat($(this).parents(".shop-info").find(".price").text()); //得到商品的单价
					var total = price * num; //计算单个商品的总价
					oprice += total; //计算该店铺的总价

					goods.price = price;
					goods.num = num;
					newstore.oprice = oprice.toFixed(2);
					newstore.goodsCarts.push(goods);
				}
				$(this).closest(".shop-group-item").find(".ShopTotal").text(oprice.toFixed(2)); //显示被选中商品的店铺总价
			});
			var oneprice = parseFloat($(this).find(".ShopTotal").text()); //得到每个店铺的总价
			allprice += oneprice; //计算所有店铺的总价
			if(newstore.goodsCarts.length > 0) {
				storeList.push(newstore);
			}

		});
		$("#AllTotal").text(allprice.toFixed(2)); //输出全部总价
		var oderInfo = {};
		oderInfo.allprice = allprice.toFixed(2);
		oderInfo.storeList = storeList;
		oderInfo.carIdList = carIdList;
		window.localStorage.setItem("oderInfo", JSON.stringify(oderInfo));
		vm.allprice = allprice;
	}
	// 使用事业委托，删除节点
/*	$(document).on("click", ".shop-info .close", function() {
		var goodsId = $(this).next(".goodsId").html();
		var _this = this;

		$.ajax({
			url: goodscartDelete + goodsId,
			type: "get",
			dataType: "json",
			contentType: "application/json",
			beforeSend: function(request) {
				request.setRequestHeader("Authorization", window.localStorage.getItem("token"));
			},
			success: function(data) {
				//var data = JSON.parse(data);
				showmessage(data.msg);
				if(data.code == 1) {
					showmessage(data.msg);
					window.location.reload();
					$(_this).parents(".shop-info").remove();
					
				}
			},
			error: function(jqXHR, textStatus) {

			}

		});

	})*/

});