webpackJsonp([28],{RF10:function(t,e){},h1cS:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("3cXf"),o=s.n(i),n=s("4YfN"),a=s.n(n),r=s("9rMa"),c=s("wSez"),h=s("UzLt"),d=(s("6iV/"),h.a,a()({},Object(r.c)(["token","userId","parentId"])),a()({},Object(r.b)(["atnUserId","atnWeChatInfo"]),{changeStatus:function(){this.statusShow?(this.statusShow=!1,this.typeSet="text"):(this.statusShow=!0,this.typeSet="password")},getCode:function(){var t=this;11===this.phone.length?this.$axios.get(this.api.getRegCode+this.phone).then(function(e){var s=e.data;1==s.code?(t.hasSend=!0,t.showTip("验证码已发送到您的手机，请注意查收"),t.countDownTime()):t.showTip(s.msg)}).catch(function(e){t.showTip("获取验证码失败，请稍后重试")}):this.showTip("手机号码格式不正确")},countDownTime:function(){var t=this;!function e(){var s=setTimeout(function(){t.time<=0?(clearTimeout(s),t.hasSend=!1,t.time=60):(t.time-=1,e())},1e3)}()},reg:function(){var t=this;if(11===this.phone.length)if(""!==this.code){var e={userName:this.phone,password:this.pwd,smsCode:this.code};this.promoterUserId&&(e.promoterUserId=this.promoterUserId),this.$axios.post(this.api.register,o()(e),{headers:{"content-type":"application/json"}}).then(function(e){var s=e.data;if(1===s.code){t.showTip("注册成功");var i=t;setTimeout(function(){i.$router.push("/mine/login")},1e3),console.log(s)}else t.showTip(s.msg)}).catch(function(e){loading.close(),t.showTip("注册失败，请稍后重试")})}else this.showTip("请输入验证码");else this.showTip("手机号码格式不正确")},setUserIdBack:function(t){var e=this;this.atnUserId(t.encryptionId),this.atnWeChatInfo({name:t.nickName,avatar:t.wechatHeadImageUrl});Object(c.Toast)({msg:"绑定成功！",iconClass:"ok",duration:2e3});setTimeout(function(){e.$router.go(-1)},2600)}}),s("6iV/"),{data:function(){return{promoterUserId:"",phone:"",pwd:"",code:"",time:60,hasSend:!1,typeSet:"password",statusShow:!0}},components:{vHeader:h.a},computed:a()({},Object(r.c)(["token","userId","parentId"])),beforeCreate:function(){document.title="注册"},created:function(){document.body.classList.add("bg-white")},destroyed:function(){document.body.classList.remove("bg-white")},methods:a()({},Object(r.b)(["atnUserId","atnWeChatInfo"]),{changeStatus:function(){this.statusShow?(this.statusShow=!1,this.typeSet="text"):(this.statusShow=!0,this.typeSet="password")},getCode:function(){var t=this;11===this.phone.length?this.$axios.get(this.api.getRegCode+this.phone).then(function(e){var s=e.data;1==s.code?(t.hasSend=!0,t.showTip("验证码已发送到您的手机，请注意查收"),t.countDownTime()):t.showTip(s.msg)}).catch(function(e){t.showTip("获取验证码失败，请稍后重试")}):this.showTip("手机号码格式不正确")},countDownTime:function(){var t=this;!function e(){var s=setTimeout(function(){t.time<=0?(clearTimeout(s),t.hasSend=!1,t.time=60):(t.time-=1,e())},1e3)}()},reg:function(){var t=this;if(11===this.phone.length)if(""!==this.code){var e={userName:this.phone,password:this.pwd,smsCode:this.code};this.promoterUserId&&(e.promoterUserId=this.promoterUserId),this.$axios.post(this.api.register,o()(e),{headers:{"content-type":"application/json"}}).then(function(e){var s=e.data;if(1===s.code){t.showTip("注册成功");var i=t;setTimeout(function(){i.$router.push("/mine/login")},1e3),console.log(s)}else t.showTip(s.msg)}).catch(function(e){loading.close(),t.showTip("注册失败，请稍后重试")})}else this.showTip("请输入验证码");else this.showTip("手机号码格式不正确")},setUserIdBack:function(t){var e=this;this.atnUserId(t.encryptionId),this.atnWeChatInfo({name:t.nickName,avatar:t.wechatHeadImageUrl});Object(c.Toast)({msg:"绑定成功！",iconClass:"ok",duration:2e3});setTimeout(function(){e.$router.go(-1)},2600)}})}),p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper white page-bind"},[s("vHeader",{attrs:{title:"注册"}}),t._v(" "),s("div",{staticClass:"item-bind"},[s("i",{staticClass:"ico i-phone"}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.promoterUserId,expression:"promoterUserId",modifiers:{trim:!0}}],staticClass:"ipt",attrs:{type:"number",placeholder:"推荐人手机号(选填)",maxlength:"11"},domProps:{value:t.promoterUserId},on:{input:function(e){e.target.composing||(t.promoterUserId=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),s("div",{staticClass:"item-bind"},[s("i",{staticClass:"ico i-person"}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.phone,expression:"phone",modifiers:{trim:!0}}],staticClass:"ipt",attrs:{type:"number",placeholder:"请输入手机号",maxlength:"11"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),s("div",{staticClass:"item-bind"},[s("i",{staticClass:"ico i-lock"}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.pwd,expression:"pwd",modifiers:{trim:!0}}],staticClass:"ipt",attrs:{type:t.typeSet,placeholder:"请输入密码",maxlength:"20"},domProps:{value:t.pwd},on:{input:function(e){e.target.composing||(t.pwd=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),t.statusShow?s("span",{staticClass:"pwd_eyes close",on:{click:t.changeStatus}}):s("span",{staticClass:"pwd_eyes",on:{click:t.changeStatus}})]),t._v(" "),s("div",{staticClass:"item-bind"},[s("i",{staticClass:"ico i-ver"}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.code,expression:"code",modifiers:{trim:!0}}],staticClass:"ipt",attrs:{type:"number",placeholder:"请输入验证码",maxlength:"11"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),t.hasSend?t._e():s("button",{staticClass:"btn-submit btn-code",on:{click:t.getCode}},[t._v("获取验证码")]),t._v(" "),t.hasSend?s("div",{staticClass:"cut-time"},[t._v("剩余 "+t._s(t.time)+" s")]):t._e()]),t._v(" "),s("button",{staticClass:"btn-submit btn-bind",on:{click:t.reg}},[t._v("注 册")]),t._v(" "),s("p",{staticClass:"links"},[s("router-link",{attrs:{to:"/mine/login"}},[t._v("登录")]),t._v(" "),s("router-link",{attrs:{to:"/mine/findPwd"}},[t._v("忘记密码？")])],1)],1)},staticRenderFns:[]};var u=s("C7Lr")(d,p,!1,function(t){s("RF10")},null,null);e.default=u.exports}});
//# sourceMappingURL=28.6b8aa9f3b78e6ec942f7.js.map