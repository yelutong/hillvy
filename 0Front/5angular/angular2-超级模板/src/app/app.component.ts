import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
   
// })
@Component({  
  selector: "app-root",  
  // templateUrl: "../views/one.html" 
  styleUrls: ['./app.component.css'], 
  template: `
  <div>       
  <!--使用了bootstrap样式的导航，routerLinkActive，表示路由激活的时候，谈价active类样式-->        
  <ul class="nav navbar-nav">         
  <li routerLinkActive="active">
  <a routerLink="home">首页</a>
  </li>         
  <li routerLinkActive="active">
  <a routerLink="list">list</a>
  </li>         
  <li routerLinkActive="active">
  <a routerLink="list/two">list2</a>
  </li>        
  </ul>        
  <!--路由内容显示区域-->        
  <router-outlet></router-outlet>       
  </div>
`}) 

export class AppComponent {
  title = 'My First Angular App!';
}
