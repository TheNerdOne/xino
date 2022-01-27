import Vue from 'vue'
import App from './App.vue'
import './components/design/main.css'
import Shuffle from './utils/Shuffle'

Vue.config.productionTip = false
Vue.mixin(Shuffle)

new Vue({
  render: h => h(App),
}).$mount('#app')
