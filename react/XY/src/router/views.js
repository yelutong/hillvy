'use strict';
/*
*@description 设置所有页面的title
* isShow 是否展示顶部Nav，
* titleText 是否展示title的名称，
* backUrl 返回按钮跳转，不添加url表示一般的返回
*/
const views = [
	//投标状态页
	{pathName:'/',title:'商城首页',isShow:true,titleText:true,backUrl:'/'},
];

/*
*@description 筛选url相应的title
*/
const viewTitle = () => {
	const href = window.location.pathname;
    const titles = views.filter((item) => window.location.pathname == item.pathName);
    const viewTitle = titles.length>0?titles[0]:{}; 
	document.title = viewTitle.title;//设置浏览器title
	return viewTitle;
}

export default viewTitle
