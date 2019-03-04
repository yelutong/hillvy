var commonUtil = {

	getUuid: function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	stringToHex: function(str) {　　　　
		var val = "";　　　　
		for(var i = 0; i < str.length; i++) {　　　　　　
			if(val == "")　　　　　　　　 val = str.charCodeAt(i).toString(16);　　　　　　
			else　　　　　　　　 val += "," + str.charCodeAt(i).toString(16);　　　　
		}　　　　
		return val;　　
	},

	getMTime: function(time) {
		time = parseInt(time / 1024);
		time = parseInt(time * 31 / 32);
		return time;
	},
	//排序
	sortMap: function(map) {
		var length = Object.keys(map).length;
		var keyArr = new Array(length);
		var index = 0;
		for(var key in map) {
			keyArr[index] = key;
			index = index + 1;
		}

		keyArr.sort();
		var resultMap = {};

		for(var ka in keyArr) {
			for(var key in map) {
				if(keyArr[ka] == key) {
					resultMap[key] = map[key];
				}
			}
		}

		return resultMap;
	},
	//签名
	sign: function(obj) {
		//var	obj=JSON.parse(obj);
		var header = {};
		var token = window.localStorage.getItem("token");
		header["Authorization"] = token;
		var timestamp = new Date().getTime();
		obj["timestamp"] = timestamp;
		obj["token"] = token;
		var map = this.sortMap(obj);
		var md5Str = $.md5(JSON.stringify(map) + this.getMTime(timestamp));

		//header["tokenAuth"] = md5Hex + "," + timestamp;
		window.localStorage.setItem("tokenAuth", md5Str + "," + timestamp);
		delete map.token;
		delete map.timestamp;
		return map;

	},
	request: function(options) {
		var defaults = {
			url: "",
			type: "post",
			timeout: 60000,
			async: true,
			data: {},
			dataType: "json",
			jsonp: null,
			contentType: "application/json",
			before: function() {},
			success: function() {},
			error: function(res) {
				showmessage(res);
			},
			complete: function() {},
			timeouthandler: function() {}
		};
		options = $.extend({}, defaults, options);
		if(options.type == "get" || options.type == "GET") {
			delete options.data;
		} else {
			//console.log("签名前"+options.data)
			options.data = JSON.stringify(this.sign(options.data));
			//console.log("签名后"+options.data)
		}
		$.ajax({
			url: options.url,
			type: options.type,
			async: options.async,
			timeout: options.timeout,
			data: options.data,
			dataType: options.dataType,
			contentType: options.contentType,
			beforeSend: function(jqXHR, options) {
				jqXHR.setRequestHeader("tokenAuth", window.localStorage.getItem("tokenAuth"));
				jqXHR.setRequestHeader("Authorization", window.localStorage.getItem("token"));
			},
			success: function(res) {
				if(res.code == 403) {
					var useragent=navigator.userAgent; 
					if(navigator.userAgent.indexOf('ouyanghehe')>=0){
						 window.webkit.messageHandlers.h5Login.postMessage(null);//ios  
					}
					else if(navigator.userAgent.indexOf('mcyou')>=0){ 
						 window.jsBridge.h5Login();   
					}else{
						 showmessage(res.msg);
						 window.location.href = "login.html"; 
				     }    
					
				} else if(res.code == 0) {
					showmessage(res.msg);
				} else if(res.code == 1) {
					options.success && options.success(res);
				}
			},
			error: function(res) {
				//var res = JSON.parse(res);
				options.error && options.error(res);
			},
			complete: function(res) {
				//	var res = JSON.parse(res);
				//options.complete&&options.complete(res);
			}
		});
		$(document).ajaxComplete(function(event, xhr, options) {
			// console.log("ajaxComplete"+options.url);
		}).ajaxError(function(event, jqxhr, settings, exception) {
			//console.log("ajaxerror"+settings.url);
		}).ajaxSuccess(function(event, xhr, settings) {
			// console.log(settings.url);
		});
	}

}