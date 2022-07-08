import Vue from 'vue'
import App from './app.vue'
Vue.config.productionTip = false
new Vue({
    el:'#app',
    render:h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this //实现全局事件总线
    },
})