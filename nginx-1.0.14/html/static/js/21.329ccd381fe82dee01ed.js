webpackJsonp([21],{"3bHE":function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=s("4YfN"),o=s.n(i),e=s("9rMa"),n=s("wSez"),l=s("kEOb"),c=s("9yBd"),d=(s("6iV/"),c.a,l.a,o()({},Object(e.c)(["token"])),s("6iV/")),r={data:function(){return{hasGold:0,applyGold:"",choseCardData:null}},components:{"v-nodata":c.a,"v-cell":l.a},computed:o()({},Object(e.c)(["token"])),created:function(){this.ifChoseCard(),this.goldAmount()},methods:{ifChoseCard:function(){var t=window.localStorage.getItem("choseCard");this.choseCardData=t?JSON.parse(t):null},applyGetGold:function(){var t=this,a=this.hasGold,s=this.applyGold,i=this.choseCardData;if(0!=a)if(""!==s)if(s>a)this.showTip("提现额度超过您现有的金额");else if(s<100)this.showTip("每次提现金额至少100元");else if(i){var o=Object(n.Toast)({message:"提交中...",iconClass:"loading",duration:3e4});this.$axios.post(this.api.applyGetGold,d.stringify({bank_card_id:i.cardId,take_cash_amount:s}),{headers:{"content-type":"application/x-www-form-urlencoded",Authorization:this.token}}).then(function(a){o.close();var s=a.data;1===s.code?(t.showTip("提现申请成功！",1500,"ok"),t.applyGold="",t.goldAmount()):t.showTip(s.message)}).catch(function(a){o.close(),t.showTip("提现失败，请重试！")})}else this.showTip("请选择一张提现银行卡");else this.showTip("请输入提现金额数");else this.showTip("您的金额为0，不能提现")},goldAmount:function(){var t=this;this.$axios.get(this.api.goldAmount,{headers:{Authorization:this.token}}).then(function(a){var s=a.data;if(1!==s.code)return t.showTip(s.message),void(t.hasGold=0);t.hasGold=s.content}).catch(function(a){t.showTip("未能获取到您的分红金额"),t.hasGold=0})}}},p={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"wrapper page-getgold"},[s("div",{staticClass:"lay-mycard white"},[s("router-link",{staticClass:"item",attrs:{to:{path:"/mine/mycard",query:{from:"getgold"}}}},[s("i",{staticClass:"ico i-card"}),t._v(" "),t.choseCardData?s("div",{staticClass:"card-info"},[s("span",{staticClass:"name"},[t._v(t._s(t.choseCardData.cardName))]),t._v(" "),s("span",{staticClass:"info"},[t._v("尾号 "+t._s(t.choseCardData.cardInfo)+" 的银行卡")])]):s("span",{staticClass:"text"},[t._v("请选择提现银行卡")]),t._v(" "),s("i",{staticClass:"ico i-arow i-black"})])],1),t._v(" "),s("div",{staticClass:"lay-input white"},[s("div",{staticClass:"tag"},[t._v("提现金额")]),t._v(" "),s("div",{staticClass:"input-box"},[s("span",{staticClass:"unit"},[t._v("￥")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.applyGold,expression:"applyGold",modifiers:{trim:!0}}],staticClass:"ipt",attrs:{type:"number",placeholder:"请输入金额"},domProps:{value:t.applyGold},on:{input:function(a){a.target.composing||(t.applyGold=a.target.value.trim())},blur:function(a){t.$forceUpdate()}}})]),t._v(" "),s("div",{staticClass:"info"},[s("div",{staticClass:"balance"},[t._v("当前余额为\n        "),s("span",{staticClass:"num"},[t._v(t._s(t.hasGold))]),t._v(" 元\n      ")]),t._v(" "),s("div",{staticClass:"tip"},[t._v("注T+1天到账")])])]),t._v(" "),s("div",{staticClass:"lay-action white"},[s("button",{staticClass:"btn-submit",on:{click:t.applyGetGold}},[t._v("申请提现")]),t._v(" "),s("div",{staticClass:"to-record"},[s("router-link",{staticClass:"link",attrs:{to:"/mine/goldrecord"}},[t._v("提现记录\n        "),s("i",{staticClass:"ico i-arow i-blue"})])],1)])])},staticRenderFns:[]};var h=s("C7Lr")(r,p,!1,function(t){s("YyMI")},null,null);a.default=h.exports},YyMI:function(t,a){}});
//# sourceMappingURL=21.329ccd381fe82dee01ed.js.map