import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import i18n from '../../i18n'
import VueSweetalert2 from 'vue-sweetalert2'
import VueParticles from 'vue-particles'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.use(VueParticles)

/*vue-sweetalert2 configuration*/
const options = {
  confirmButtonColor: '#0069d9',
  cancelButtonColor: '#ff7674'
}

Vue.use(VueSweetalert2, options)

Vue.prototype.$http = axios

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
