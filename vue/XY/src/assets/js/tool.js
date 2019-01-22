export default {
  install(Vue, options) {
    Vue.prototype.uniq = function (array) {//数组去重
      var temp = []; //一个新的临时数组
      for(var i = 0; i < array.length; i++){
          if(temp.indexOf(array[i]) == -1){
              temp.push(array[i]);
          }
      }
      return temp;
    };
    Vue.prototype.isAndroid = function () {
      const u = navigator.userAgent;
      return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    };
    Vue.prototype.isiOS = function () {
      const u = navigator.userAgent;
      return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    };
    Vue.prototype.isWeiXin = function () {
      const u = window.navigator.userAgent.toLowerCase();
      return (u.match(/MicroMessenger/i) == "micromessenger");
    };
    Vue.prototype.formatPhone = function (phone) {
      let str = phone.substr(0,3)+"****"+phone.substr(7);
      return str;
    }
    Vue.prototype.getUrlParam = function (name) {
      const after = window.location.hash.split("?")[1];
      if (after) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        const r = after.match(reg);
        if (r != null) {
          return decodeURIComponent(r[2]);
        } else {
          return null;
        }
      }
    };
    Vue.prototype.dateFormat = function (dateNum, format) {
      var isDate = dateNum,
        result = '';
      if (typeof dateNum === 'string') { //判断格式
        var reg = /\D/g;
        if (!reg.test(dateNum)) { //如果是纯数字的字符串
          isDate = parseInt(dateNum);
        } else { //将-换成/，并且去掉最后的毫秒，以支持IE8-9
          isDate = dateNum.replace(/\-/g, '/').split('.')[0];
        }
      }
      var date = new Date(isDate),
        isFormat = format ? format.toString() : 'YYYY-MM-DD hh:mm:ss', //判断是否存在并转成字符串
        dateObj = { //定义格式
          'YYYY': date.getFullYear(),
          'MM': (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
          'DD': date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
          'hh': date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
          'mm': date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
          'ss': date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        };
      result = isFormat.replace(/(YYYY|MM|DD|hh|mm|ss)/g, function (args) { //匹配转换格式
        return dateObj[args] || args;
      });
      return result; //返回结果
    };

    // rem自适应适配设置
    Vue.prototype.setAutoSize = function () {
      var deviceWidth = document.documentElement.clientWidth;
      if (deviceWidth > 640) {
        deviceWidth = 640;
      };
      document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    };

    // 缩略图点击放大滑动效果
    Vue.prototype.imgTouchSlide = function (target, index) {
      // 创建dom并加载进body
      var body = document.body,
        imgList = target.parentNode.querySelectorAll('.imgs'),
        width = body.offsetWidth,
        length = imgList.length,
        page = index + 1,
        popWrap = document.createElement('div'),
        showList = document.createElement('ul'),
        pageNum = '<p class="page-num"><span class="num">' + page + '</span>/' + length + '</p>',
        showLi = '';
      body.classList.add('overflow');
      popWrap.className = 'pop-wrap';
      showList.className = 'show-list';
      showList.style.cssText = 'left:' + -index * width + 'px; width:' + length * width + 'px;';
      for (let i = 0; i < length; i++) {
        showLi += '<li class="show-li" style="background-image:url(' + imgList[i].dataset.imgurl + ');"></li>';
      }
      showList.innerHTML = showLi;
      popWrap.innerHTML = pageNum;
      popWrap.appendChild(showList);
      body.appendChild(popWrap);
      setTimeout(() => {
        popWrap.style.opacity = 1;
      }, 0);
      body.addEventListener('touchmove', function (e) {
        e.returnValue = false;
      }, false);
      // 开始绑定滑动效果
      var startX = 0,
        endLeft = 0,
        maxLeft = -width * (length - 1),
        numDom = popWrap.querySelector('.num');
      showList.addEventListener('touchstart', function (event) {
        startX = event.targetTouches[0].pageX;
        endLeft = this.offsetLeft;
        this.classList.remove('no-touch');
        this.addEventListener('touchmove', function (ev) {
          var moveX = ev.targetTouches[0].pageX - startX,
            moving = endLeft + moveX;
          if (moving >= 0) {
            moving = 0;
          } else if (moving <= maxLeft) {
            moving = maxLeft;
          }
          this.style.left = moving + 'px';
        }, false);
      }, false);
      showList.addEventListener('touchend', function (event) {
        this.classList.add('no-touch');
        var endX = event.changedTouches[0].pageX;
        if (endX === startX) {
          body.classList.remove('overflow');
          popWrap.style.opacity = 0;
          body.addEventListener('touchmove', function (e) {
            e.returnValue = true;
          }, false);
          setTimeout(() => {
            body.removeChild(popWrap);
          }, 300);
          return;
        }
        // 如果是往右滑，且超过了10分之1的屏幕
        if (endX - startX >= width / 10) {
          endLeft = (endLeft + width >= 0 ? 0 : endLeft + width);
          page = (page <= 1 ? 1 : page - 1);
        }
        // 如果是往左滑，且超过了10分之1的屏幕
        if (endX - startX <= -width / 10) {
          endLeft = (endLeft - width <= maxLeft ? maxLeft : endLeft - width);
          page = (page >= length ? length : page + 1);
        }
        this.style.left = endLeft + 'px';
        numDom.innerHTML = page;
      });
    };
  }
}
