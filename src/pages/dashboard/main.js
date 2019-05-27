import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import i18n from '../../i18n'
import VueParticles from 'vue-particles'
import VueGoogleCharts from 'vue-google-charts'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.use(VueParticles)
Vue.use(VueGoogleCharts)

Vue.prototype.$http = axios

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
