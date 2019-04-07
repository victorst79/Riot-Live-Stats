import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueSocketIO from 'vue-socket.io'

Vue.use(VueAxios, axios)

// CONEXION CON EXPRESS
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000/',
  // connection: window.location.hostname
}))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
