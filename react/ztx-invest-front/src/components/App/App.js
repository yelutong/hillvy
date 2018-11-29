import React, {Component} from 'react';
import getRouter from 'router/router';
import '../../style/main.css';//引入公共样式

class App extends Component {
	state = {viewTitle:''}

	componentWillMount() {
	    this.setFontSize();
	}

	componentWillReceiveProps() {
		
	}

	/*
	*@description 动态设置字体随屏幕的大小而变化
	*/
	setFontSize = () => {
	    (function (doc, win) {
	      var docEl = doc.documentElement,
	        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	        recalc = function () {
	          var clientWidth = docEl.clientWidth>640?640:docEl.clientWidth;
	          if (!clientWidth) return;
	          docEl.style.fontSize = 12 * (clientWidth / 320) + 'px';
	        };
	     
	      if (!doc.addEventListener) return;
	      win.addEventListener(resizeEvt, recalc, false);
	      doc.addEventListener('DOMContentLoaded', recalc, false);
	    })(document, window);
	}

    render() {
        return (
            <div className="app">
                {getRouter()}
            </div>
        )
    }
}

export default App;