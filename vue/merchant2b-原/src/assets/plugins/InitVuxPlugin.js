
import { Flexbox, FlexboxItem, XHeader, XButton, AlertPlugin, Popup, XDialog, PopupRadio, ToastPlugin, LoadingPlugin, Toast, XInput, Countdown, CheckIcon, Group, Cell, TransferDom, Divider, Confirm } from 'vux'
export default {
  install (Vue, options) {
    // 注册全局指令
    Vue.directive('transfer-dom', TransferDom)
    // vux components
    Vue.component('flexbox', Flexbox)
    Vue.component('flexbox-item', FlexboxItem)
    Vue.component('x-header', XHeader)
    Vue.component('x-button', XButton)
    Vue.component('popup', Popup)
    Vue.component('popup-radio', PopupRadio)
    Vue.component('toast', Toast)
    Vue.component('x-input', XInput)
    Vue.component('countdown', Countdown)
    Vue.component('check-icon', CheckIcon)
    Vue.component('group', Group)
    Vue.component('cell', Cell)
    Vue.component('divider', Divider)
    Vue.component('confirm', Confirm)
    Vue.component('xDialog', XDialog)
    // plugins
    Vue.use(AlertPlugin)
    Vue.use(ToastPlugin)
    Vue.use(LoadingPlugin)
  }
}
