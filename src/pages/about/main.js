import Vue from 'vue'
import App from './App.vue'
import i18n from '../../i18n'
import VueParticles from 'vue-particles'

Vue.config.productionTip = false

Vue.use(VueParticles)

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
