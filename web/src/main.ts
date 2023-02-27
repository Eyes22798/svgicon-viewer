import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import SvgIcon from '@eyes22798/svg-icon'

Vue.config.productionTip = false
Vue.use(SvgIcon)
Vue.use(Vuesax)

new Vue({
  render: h => h(App),
}).$mount('#app')
