'use strict';
/*
*@description 设置所有页面的title
* isShow 是否展示顶部Nav，
* titleText 是否展示title的名称，
* backUrl 返回按钮跳转，不添加url表示一般的返回
*/
const views = [
	{pathName:'/TenderStatus',title:'Status Pendanaan',isShow:true,titleText:true,backUrl:''},
	{pathName:'/Tender',title:'Tender',isShow:true,titleText:false,backUrl:''},
  {pathName:'/CommonTabs',title:'CommonTabs',isShow:true,titleText:false,backUrl:''},
];

/*
*@description 筛选url相应的title
*/
const viewTitle = () => {
	const href = location.href;
    const titles = views.filter((item) => href.indexOf(item.pathName)>=0);
    const viewTitle = titles.length>0?titles[0]:{}; 
	document.title = viewTitle.title;//设置浏览器title
	return viewTitle;
}

export default viewTitle
