webpackJsonp([19],{"93k/":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("4YfN"),s=e.n(a),o=e("9rMa"),n=e("wSez"),r=e("Wf59"),c=e("0tvt"),d=(e("6iV/"),c.a,r.a,s()({},Object(o.c)(["token"])),e("6iV/")),l={data:function(){return{id:this.getUrlParam("id")||"",detailId:this.getUrlParam("detail-id")||"",evaContent:"",imgList:[],arrImgId:[]}},components:{"v-imglist":c.a,"vue-core-image-upload":r.a},computed:s()({},Object(o.c)(["token"])),beforeCreate:function(){document.title="评价商品"},methods:{imageAction:function(t){this.imgList.splice(t,1),this.arrImgId.splice(t,1)},chooseImage:function(t){if(this.imgList.length>=8)this.showTip("最多只能上传8张图片");else if(1===t.code&&t.data&&0!==t.data.length){var i=t.data;this.imgList.push(i[0].imagePath),this.arrImgId.push(i[0].imgId)}else this.showTip("上传失败，请重试")},evaGoods:function(){var t=this,i=this.evaContent,e=this.arrImgId,a="";if(""===i.length||i.length<5)this.showTip("请至少输入五个字的评价");else{e.length>0&&(a=e.join(","));var s=Object(n.Toast)({message:"保存评价中...",iconClass:"loading",duration:1e4});this.$axios.post(this.api.evaGoods,d.stringify({order_detail_id:this.detailId,product_id:this.id,content:i,image_ids:a||""}),{headers:{"content-type":"application/x-www-form-urlencoded",Authorization:this.token}}).then(function(i){s.close();var e=i.data;1===e.code?(t.showTip("评价成功，感谢您的支持！",1500,"ok"),setTimeout(function(){t.$router.go(-1)},1500)):t.showTip(e.msg)}).catch(function(i){s.close(),t.showTip("评价失败，请稍后重试")})}}}},m={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"wrapper white page-evagoods"},[e("div",{staticClass:"lay-imgs"},[e("v-imglist",{attrs:{"image-data":t.imgList,size:"75",touch:"delete"},on:{touchimg:t.imageAction}})],1),t._v(" "),e("div",{staticClass:"img-list"},t._l(t.imgList,function(t,i){return e("div",{key:i,staticClass:"img-box mid-img"},[e("img",{staticClass:"img",attrs:{src:t}})])}),0),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.evaContent,expression:"evaContent",modifiers:{trim:!0}}],staticClass:"txa",attrs:{placeholder:"感觉这件商品怎么样？来评价几句吧~",maxlength:"200"},domProps:{value:t.evaContent},on:{input:function(i){i.target.composing||(t.evaContent=i.target.value.trim())},blur:function(i){t.$forceUpdate()}}}),t._v(" "),t._v('":this.token}">\n  '),t._v(" "),e("button",{staticClass:"btn-submit",on:{click:t.evaGoods}},[t._v("发表评价")])])},staticRenderFns:[]};var g=e("C7Lr")(l,m,!1,function(t){e("yOMg")},null,null);i.default=g.exports},yOMg:function(t,i){}});
//# sourceMappingURL=19.b7cd469c616f4f02c441.js.map