webpackJsonp([17],{"4ZwR":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("3cXf"),o=s.n(n),i=s("4YfN"),a=s.n(i),r=s("9rMa"),c=(s("wSez"),s("UzLt")),p=(s("6iV/"),c.a,a()({},Object(r.c)(["token","userId","parentId"])),a()({},Object(r.b)(["atnToken"]),{changeStatus:function(){this.statusShow?(this.statusShow=!1,this.typeSet="text"):(this.statusShow=!0,this.typeSet="password")},login:function(){var t=this;11===this.phone.length?this.$axios.post(this.api.login,o()({userName:this.phone,password:this.pwd}),{headers:{"content-type":"application/json"}}).then(function(e){var s=e.data;if(1===s.code)if(console.log(s.content),t.atnToken(s.content),localStorage.setItem("token",s.content),t.showTip("登录成功"),t.$route.params.url)window.location.href=t.$route.params.url;else{var n=t;setTimeout(function(){n.$router.push("/mine")},500)}else t.showTip(s.msg)}).catch(function(t){}):this.showTip("手机号码格式不正确")}}),s("6iV/"),{data:function(){return{phone:"",pwd:"",typeSet:"password",statusShow:!0}},components:{vHeader:c.a},computed:a()({},Object(r.c)(["token","userId","parentId"])),beforeCreate:function(){document.title="登录"},created:function(){document.body.classList.add("bg-white")},beforeDestroy:function(){document.body.classList.remove("bg-white")},methods:a()({},Object(r.b)(["atnToken"]),{changeStatus:function(){this.statusShow?(this.statusShow=!1,this.typeSet="text"):(this.statusShow=!0,this.typeSet="password")},login:function(){var t=this;11===this.phone.length?this.$axios.post(this.api.login,o()({userName:this.phone,password:this.pwd}),{headers:{"content-type":"application/json"}}).then(function(e){var s=e.data;if(1===s.code)if(console.log(s.content),t.atnToken(s.content),localStorage.setItem("token",s.content),t.showTip("登录成功"),t.$route.params.url)window.location.href=t.$route.params.url;else{var n=t;setTimeout(function(){n.$router.push("/mine")},500)}else t.showTip(s.msg)}).catch(function(t){}):this.showTip("手机号码格式不正确")}})}),u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper white page-bind"},[s("vHeader",{attrs:{title:"登录",to:"/mine"}}),t._v(" "),s("div",{staticClass:"item-bind"},[s("i",{staticClass:"ico i-person"}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.phone,expression:"phone",modifiers:{trim:!0}}],staticClass:"ipt",attrs:{type:"number",placeholder:"请输入手机号",maxlength:"11"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),s("div",{staticClass:"item-bind"},[s("i",{staticClass:"ico i-lock"}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.pwd,expression:"pwd",modifiers:{trim:!0}}],staticClass:"ipt",attrs:{type:t.typeSet,placeholder:"请输入密码",maxlength:"20"},domProps:{value:t.pwd},on:{input:function(e){e.target.composing||(t.pwd=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),t.statusShow?s("span",{staticClass:"pwd_eyes close",on:{click:t.changeStatus}}):s("span",{staticClass:"pwd_eyes",on:{click:t.changeStatus}})]),t._v(" "),s("button",{staticClass:"btn-submit btn-bind",on:{click:t.login}},[t._v("登 录")]),t._v(" "),s("p",{staticClass:"links"},[s("router-link",{attrs:{to:"/mine/register"}},[t._v("注册账号")]),t._v(" "),s("router-link",{attrs:{to:"/mine/findPwd"}},[t._v("忘记密码？")])],1)],1)},staticRenderFns:[]};var l=s("C7Lr")(p,u,!1,function(t){s("ZgIJ")},null,null);e.default=l.exports},ZgIJ:function(t,e){}});
//# sourceMappingURL=17.7e2f3c531406f29459fa.js.map