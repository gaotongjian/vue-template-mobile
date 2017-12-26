import Vue from 'vue'
import FastClick from 'fastclick'

// v-charts
import VeLine from 'v-charts/lib/line'
import VeBar from 'v-charts/lib/bar'
import VeHistogram from 'v-charts/lib/histogram'
import VePie from 'v-charts/lib/pie'
import VeRing from 'v-charts/lib/ring'
// mint-ui
import { Popup, Toast, MessageBox, Tabbar, TabItem, Cell } from 'mint-ui'

// 组件
// import Icon from '@/components/Icon'
import Ripple from 'vue-ripple-directive'

// 设置rem
import './assets/js/flexible'

// css
import './assets/css/normalize.css'
// flex样式（gihub:https://github.com/lzxb/flex.css）
import './assets/css/flex.css'
import './assets/css/common.css'

Vue.component(VeLine.name, VeLine)
Vue.component(VeBar.name, VeBar)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VePie.name, VePie)
Vue.component(VeRing.name, VeRing)

Vue.component(Popup.name, Popup)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Cell.name, Cell)

// Vue.component(Icon.name, Icon)
// 指令
Vue.directive('ripple', Ripple)

Vue.prototype.$toast = Toast
Vue.prototype.$messageBox = MessageBox

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
