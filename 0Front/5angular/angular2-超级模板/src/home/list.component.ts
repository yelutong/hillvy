import {Component} from "@angular/core"; 
@Component({   
  selector: "my-list",   
  // templateUrl: "../views/list.html"   
  template: `      
  <div>       
  <!-- 子路由连接 -->       
  <a routerLink="one">one</a> &nbsp; <a routerLink="two">two</a>       
  <!-- 路由内容显示标签 -->  
  <br/>  
  <br/>  
  <br/>       
  <router-outlet></router-outlet>      
  </div>    
  `}) 

export class ListComponent {   
  name = "list"; 
} 
