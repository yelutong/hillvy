import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router"; 
// 表单 双向数据绑定 
import {FormsModule} from "@angular/forms"; 
import {AppComponent} from "./app.component"; 

// List中包含两个tab子组件 
import { HomeComponent } from '../home/home.component';
import { ListComponent } from "../home/list.component";
import { ListOneComponent } from '../home/list-one.component';
import { ListTwoComponent } from '../home/list-two.component';

// 定义路由, bootstrap默认加载组件就是AppComponent,所以他就是主页导航页,然后添加的路由都在他的模板中。  
// 可以所有代码写在NgModule中, 也可以这样自定义常量,然后使用。

// 定义常量 嵌套自路由 
const appChildRoutes: Routes = [  
  {
    path: "one", 
    component: ListOneComponent
  },  
  {
    path: "two", 
    component: ListTwoComponent
  },  
// 如果地址栏中输入没有定义的路由就跳转到one路由界面  
  {   
    path: '**', 
    redirectTo: "one" 
  } 
]; 

// 定义常量 路由 

const appRoutes:Routes = [  
  {
    path: 'home', 
    component: HomeComponent
  },  
  {   
    path: 'list',   
    component: ListComponent,   
    children: appChildRoutes 
  }
]; 

// 引用定义的路由 
@NgModule({
  imports: [   
  BrowserModule,   
  FormsModule,   
  RouterModule.forRoot(appRoutes)  
  ],
  declarations: [
    AppComponent,   
    ListComponent,   
    HomeComponent,   
    ListOneComponent,   
    ListTwoComponent 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
