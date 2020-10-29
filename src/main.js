import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  name: 'root',
  router, // 创建实例时,
  render: h => h(App)
}).$mount('#app')
