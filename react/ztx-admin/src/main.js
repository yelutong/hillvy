import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
//import ElementUI from 'element-ui'
import 'jquery/jquery.min'
//import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
//import Vuex from 'vuex'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import { 
  Button,
  Select,
  Menu,
  Dialog,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Aside,
  Loading,
  Form,
  FormItem,
  Checkbox,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Option,
  Upload,
  Message,
  MessageBox,
  Switch
} from 'element-ui';

Vue.use(Button)
Vue.use(Select)
Vue.use(Menu)
Vue.use(Dialog)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Aside)
Vue.use(Loading)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Checkbox)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Pagination)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Switch)
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;

//Vue.use(ElementUI)全局引入
Vue.use(VueRouter)
//Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  
  /*
  *如果想要直接取本地的菜单显示，则把改段代码注释掉
  */
  if(user){
    let localMenu = routes.filter((item) => item.children); //获取本地路由菜单
    let loginMenu = user.menu.filter((item) => item.perms == 'admin'); //获取权限系统筛选出admin的菜单菜单
    let parentMenu = loginMenu.filter((item) => item.parentId == 0);//获取父菜单
    localMenu.map((item) => {
      item.hidden = true;//先把菜单隐藏掉
      parentMenu.map((i) => { //遍历一级菜单，获取名称和是否隐藏菜单
        if(item.path == i.url){
          item.name = i.name;//修改菜单的名称
          item.hidden = false;//再显示菜单
          item.children.map((childrenItem) => { //遍历二级菜单，获取名称和是否隐藏菜单
            childrenItem.hidden = true;//先把菜单隐藏掉
            var parent = loginMenu.filter((a) => a.parentId == i.menuId);
            parent.map((it) => {
              if(childrenItem.path == it.url){
                childrenItem.name = it.name;//修改菜单的名称
                childrenItem.hidden = false;//再显示菜单
              }
            })
          })
        }
      })
    })
  }//如果想要直接取本地的菜单显示，则以上这段代码注释掉
  


  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

