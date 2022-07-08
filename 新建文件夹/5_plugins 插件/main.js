import Vue from 'vue'
import App from './app.vue'
import plugins from './plugins'
Vue.config.productionTip = false
// 
Vue.use(plugins)
new Vue({
    el:'#app',
    render:h => h(App)
})