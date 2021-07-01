import Vue from 'vue'
import App from './App.vue'
import router from './router'
import service from './assets/js/request'
import Element from 'element-ui'

Vue.config.productionTip = false
Vue.use(Element)

Vue.prototype.$axios = service
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
