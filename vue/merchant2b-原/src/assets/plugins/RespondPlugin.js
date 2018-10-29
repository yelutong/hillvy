/**
 * 响应式布局
 */
export default {
  install (Vue, options) {
    let doc = document
    let win = window
    let docEl = doc.documentElement
    let resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize'
    let recalc = function () {
      // docEl.clientWidth>750?750
      let clientWidth = docEl.clientWidth
      // >=750?750:docEl.clientWidth
      if (!clientWidth) return
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
    }
    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false);

    let b = document.documentElement;
    b.setAttribute('data-useragent',navigator.userAgent);
    b.setAttribute('data-platform',navigator.platform);
  }
}
