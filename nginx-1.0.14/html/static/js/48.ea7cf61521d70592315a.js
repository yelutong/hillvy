webpackJsonp([48],{Hd85:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var c=i("3cXf"),s=i.n(c),a=i("HzJ8"),r=i.n(a),o=i("4YfN"),n=i.n(o),l=i("9rMa"),h=(i("wSez"),i("NH3f")),d=i("9yBd"),u=(i("6iV/"),h.a,d.a,n()({},Object(l.c)(["token"]),{totalPrice:function(){this.payPrice=0;var t=!0,e=!1,i=void 0;try{for(var c,s=r()(this.goodsArr);!(t=(c=s.next()).done);t=!0){var a=c.value,o=!0,n=!1,l=void 0;try{for(var h,d=r()(a.goodsBuyInfo);!(o=(h=d.next()).done);o=!0){var u=h.value;if(this.checked.length>0){var v=!0,f=!1,y=void 0;try{for(var k,g=r()(this.checked);!(v=(k=g.next()).done);v=!0){k.value==u.id&&(this.payPrice+=Number(u.price)*Number(u.num))}}catch(t){f=!0,y=t}finally{try{!v&&g.return&&g.return()}finally{if(f)throw y}}}else this.payPrice=0}}catch(t){n=!0,l=t}finally{try{!o&&d.return&&d.return()}finally{if(n)throw l}}}}catch(t){e=!0,i=t}finally{try{!t&&s.return&&s.return()}finally{if(e)throw i}}return this.payPrice}}),i("6iV/"),{data:function(){return{canEdit:!0,list:[],allSelect:!1,checkallList:[],checked:[],price:0,count:0,isShowList:!1,goodsCarts:[],payPrice:0,userCouponIds:[],goodsChannel:1,isUseIntegral:0,num:"",id:this.getUrlParam("id"),showAddress:null,goodsArr:[],goodsTips:"",uuid:""}},components:{"v-footer":h.a,"v-nodata":d.a},computed:n()({},Object(l.c)(["token"]),{totalPrice:function(){this.payPrice=0;var t=!0,e=!1,i=void 0;try{for(var c,s=r()(this.goodsArr);!(t=(c=s.next()).done);t=!0){var a=c.value,o=!0,n=!1,l=void 0;try{for(var h,d=r()(a.goodsBuyInfo);!(o=(h=d.next()).done);o=!0){var u=h.value;if(this.checked.length>0){var v=!0,f=!1,y=void 0;try{for(var k,g=r()(this.checked);!(v=(k=g.next()).done);v=!0){k.value==u.id&&(this.payPrice+=Number(u.price)*Number(u.num))}}catch(t){f=!0,y=t}finally{try{!v&&g.return&&g.return()}finally{if(f)throw y}}}else this.payPrice=0}}catch(t){n=!0,l=t}finally{try{!o&&d.return&&d.return()}finally{if(n)throw l}}}}catch(t){e=!0,i=t}finally{try{!t&&s.return&&s.return()}finally{if(e)throw i}}return this.payPrice}}),beforeCreate:function(){document.title="购物车"},created:function(){this.getCartList()},watch:{checked:function(t,e){console.log(t,e),this.checkallList=this.uniq(this.checkallList);var i=!0,c=!1,s=void 0;try{for(var a,o=r()(this.goodsArr);!(i=(a=o.next()).done);i=!0){var n=a.value,l=0,h=!0,d=!1,u=void 0;try{for(var v,f=r()(n.goodsBuyInfo);!(h=(v=f.next()).done);h=!0){var y=v.value;t.indexOf(y.id)>-1?(console.log("包含:"+y.id),++l==n.goodsBuyInfo.length&&this.checkallList.push(n.storeId)):(console.log("不包含:"+y.id),e.indexOf(y.id)>-1&&this.checkallList.splice(this.checkallList.indexOf(n.storeId),1))}}catch(t){d=!0,u=t}finally{try{!h&&f.return&&f.return()}finally{if(d)throw u}}}}catch(t){c=!0,s=t}finally{try{!i&&o.return&&o.return()}finally{if(c)throw s}}this.uniq(this.checkallList).length==this.goodsArr.length?this.allSelect=!0:this.allSelect=!1}},methods:{deleteCart:function(){var t=this;0==this.checked.length?this.showTip("请选择商品"):(console.log(this.checked.join(",")),this.$axios.get(this.api.deleteGoods+this.checked.join(","),{headers:{Authorization:this.token,"content-type":"application/json"}}).then(function(e){1===e.data.code?(t.showTip("删除成功"),t.canEdit=!0,t.goodsArr=[],t.getCartList()):t.showTip("未获取到商品信息")}).catch(function(t){}))},changeStatus:function(t){console.log(0),this.canEdit="1"!=t},totalSelect:function(){if(console.log(this.allSelect),this.allSelect)this.checkallList=[],this.checked=[];else{this.checkallList=[],this.checked=[];var t=!0,e=!1,i=void 0;try{for(var c,s=r()(this.goodsArr);!(t=(c=s.next()).done);t=!0){var a=c.value;this.checkallList.push(a.storeId);var o=!0,n=!1,l=void 0;try{for(var h,d=r()(a.goodsBuyInfo);!(o=(h=d.next()).done);o=!0){var u=h.value;this.checked.push(u.id)}}catch(t){n=!0,l=t}finally{try{!o&&d.return&&d.return()}finally{if(n)throw l}}}}catch(t){e=!0,i=t}finally{try{!t&&s.return&&s.return()}finally{if(e)throw i}}}},checkAll:function(t){if(this.checkallList=this.uniq(this.checkallList),this.checkallList.indexOf(t.storeId)>-1){this.checkallList.splice(this.checkallList.indexOf(t.storeId),1);var e=!0,i=!1,c=void 0;try{for(var s,a=r()(t.goodsBuyInfo);!(e=(s=a.next()).done);e=!0){var o=s.value;this.checked.indexOf(o.id)>-1&&this.checked.splice(this.checked.indexOf(o.id),1)}}catch(t){i=!0,c=t}finally{try{!e&&a.return&&a.return()}finally{if(i)throw c}}}else{this.checkallList.push(t.storeId);var n=!0,l=!1,h=void 0;try{for(var d,u=r()(t.goodsBuyInfo);!(n=(d=u.next()).done);n=!0){var v=d.value;this.checked.push(v.id)}}catch(t){l=!0,h=t}finally{try{!n&&u.return&&u.return()}finally{if(l)throw h}}}this.checkallList.length==this.goodsArr.length?this.allSelect=!0:this.allSelect=!1},getCartList:function(){var t=this;this.$axios.get(this.api.getCartList,{headers:{Authorization:this.token,"content-type":"application/json"}}).then(function(e){var i=e.data;if(1===i.code)if(console.log(i),i.content.length>0){t.isShowList=!0;var c=i.content,s=!0,a=!1,o=void 0;try{for(var n,l=r()(c);!(s=(n=l.next()).done);s=!0){var h=n.value,d=[],u=!0,v=!1,f=void 0;try{for(var y,k=r()(h.goodsCarts);!(u=(y=k.next()).done);u=!0){var g=y.value,p={id:g.id,goodsId:g.goodsId,num:g.goodsCount,name:g.goodsName,price:g.price,img:t.api.urlPic+g.goodsPhoto.split(",")[0]};d.push(p)}}catch(t){v=!0,f=t}finally{try{!u&&k.return&&k.return()}finally{if(v)throw f}}var m={storeId:h.storeId,storeName:h.storeName,goodsBuyInfo:d};t.goodsArr.push(m)}}catch(t){a=!0,o=t}finally{try{!s&&l.return&&l.return()}finally{if(a)throw o}}console.log("21"),console.log(t.goodsArr)}else t.isShowList=!1}).catch(function(t){})},changeNum:function(t,e){var i=this,c=e.num;if("add"==t)c+=1;else{if(!(c>=2))return c=1,void this.showTip("亲，不能再减少了哦");c-=1}this.$axios.post(this.api.goodsCartUpdate,s()({goodsCount:c,goodsId:e.goodsId,id:e.id}),{headers:{"content-type":"application/json",Authorization:this.token}}).then(function(c){console.log(c),1===c.data.code?("add"==t?e.num+=1:e.num-=1,i.showTip("修改数量成功")):i.showTip("修改数量失败")}).catch(function(t){i.showTip("修改数量失败")})},makeOrder:function(){if(0!==this.checked.length){console.log(this.checked);var t=[],e=!0,i=!1,c=void 0;try{for(var s,a=r()(this.goodsArr);!(e=(s=a.next()).done);e=!0){var o=s.value,n=!0,l=!1,h=void 0;try{for(var d,u=r()(o.goodsBuyInfo);!(n=(d=u.next()).done);n=!0){var v=d.value;this.checked.indexOf(v.id)>-1&&t.push(v)}}catch(t){l=!0,h=t}finally{try{!n&&u.return&&u.return()}finally{if(l)throw h}}}}catch(t){i=!0,c=t}finally{try{!e&&a.return&&a.return()}finally{if(i)throw c}}this.$router.push({name:"cart",params:{selectArr:t}})}else this.showTip("请选择商品")}}}),v={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wrapper page-buy"},[i("mt-header",{staticClass:"txt-black bg-white",attrs:{title:"购物车",fixed:""}},[t.canEdit&&t.isShowList?i("mt-button",{staticClass:"txt-black fs-14 txt-edit",attrs:{slot:"right"},on:{click:function(e){t.changeStatus("1")}},slot:"right"},[t._v("编辑")]):t._e(),t._v(" "),t.canEdit?t._e():i("mt-button",{staticClass:"txt-black fs-14 txt-edit",attrs:{slot:"right"},on:{click:function(e){t.changeStatus("0")}},slot:"right"},[t._v("取消")])],1),t._v(" "),t.isShowList?i("div",{staticClass:"lay-goods pb42 mt50"},t._l(t.goodsArr,function(e,c){return i("div",{key:c,staticClass:"items mb10 white pd15"},[i("div",{staticClass:"relative h40 pdl25 fs-13"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.checkallList,expression:"checkallList"}],staticClass:"check goods-check shoreCheck",attrs:{type:"checkbox"},domProps:{value:e.storeId,checked:Array.isArray(t.checkallList)?t._i(t.checkallList,e.storeId)>-1:t.checkallList},on:{click:function(i){t.checkAll(e)},change:function(i){var c=t.checkallList,s=i.target,a=!!s.checked;if(Array.isArray(c)){var r=e.storeId,o=t._i(c,r);s.checked?o<0&&(t.checkallList=c.concat([r])):o>-1&&(t.checkallList=c.slice(0,o).concat(c.slice(o+1)))}else t.checkallList=a}}}),t._v(t._s(e.storeName)+"\n      ")]),t._v(" "),t._l(e.goodsBuyInfo,function(e,c){return i("div",{key:c,staticClass:"item pdl40"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.checked,expression:"checked"}],staticClass:"check goods-check goodsCheck",attrs:{type:"checkbox"},domProps:{value:e.id,checked:Array.isArray(t.checked)?t._i(t.checked,e.id)>-1:t.checked},on:{change:function(i){var c=t.checked,s=i.target,a=!!s.checked;if(Array.isArray(c)){var r=e.id,o=t._i(c,r);s.checked?o<0&&(t.checked=c.concat([r])):o>-1&&(t.checked=c.slice(0,o).concat(c.slice(o+1)))}else t.checked=a}}}),t._v(" "),i("div",{staticClass:"img-box"},[i("img",{staticClass:"img",attrs:{src:e.img}})]),t._v(" "),i("div",{staticClass:"info-box"},[i("div",{staticClass:"title fs-12"},[t._v("\n          "+t._s(e.name)+"\n        ")]),t._v(" "),i("div",{staticClass:"price-num"},[i("span",{staticClass:"price fs-15"},[t._v("￥"+t._s(e.price))]),t._v(" "),i("div",{staticClass:"change-num"},[i("span",{staticClass:"rdu",on:{click:function(i){t.changeNum("rdu",e)}}},[t._v("-")]),t._v(" "),i("span",{staticClass:"num"},[t._v(t._s(e.num))]),t._v(" "),i("span",{staticClass:"add",on:{click:function(i){t.changeNum("add",e)}}},[t._v("+")])])])])])})],2)}),0):t._e(),t._v(" "),t.isShowList?i("div",{staticClass:"lay-action fix-btom pay-act-btom fix-b50 justify-content-space-between"},[i("div",{staticClass:"relative h40 pdl40"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.allSelect,expression:"allSelect"}],staticClass:"ml15 check goods-check shopCheck",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.allSelect)?t._i(t.allSelect,null)>-1:t.allSelect},on:{click:t.totalSelect,change:function(e){var i=t.allSelect,c=e.target,s=!!c.checked;if(Array.isArray(i)){var a=t._i(i,null);c.checked?a<0&&(t.allSelect=i.concat([null])):a>-1&&(t.allSelect=i.slice(0,a).concat(i.slice(a+1)))}else t.allSelect=s}}}),t._v("全选\n      ")]),t._v(" "),t.canEdit?i("div",{staticClass:"price-info flex1"},[i("span",{staticClass:"tag"},[t._v("合计：")]),t._v(" "),i("span",{staticClass:"total",model:{value:t.num,callback:function(e){t.num=e},expression:"num"}},[t._v("￥"+t._s(t.totalPrice))])]):t._e(),t._v(" "),t.canEdit?i("button",{staticClass:"btn-submit per30",on:{click:t.makeOrder}},[t._v("去结算")]):t._e(),t._v(" "),t.canEdit?t._e():i("button",{staticClass:"btn-submit per30",on:{click:t.deleteCart}},[t._v("删除")])]):t._e(),t._v(" "),t.isShowList?t._e():i("v-nodata",{attrs:{bgcolor:"grey",text:"- 购物车空空如也 -"}}),t._v(" "),i("v-footer",{attrs:{active:"goodsCart"}})],1)},staticRenderFns:[]};var f=i("C7Lr")(u,v,!1,function(t){i("nyvv")},null,null);e.default=f.exports},nyvv:function(t,e){}});
//# sourceMappingURL=48.ea7cf61521d70592315a.js.map