import Vue from 'vue'
import App from './app.vue'
// import vuex from 'vuex'
import store from './store'
Vue.config.productionTip = false
// 使用插件
// Vue.use(vuex)
new Vue({
    el:'#app',
    render:h => h(App),
    store,
    beforeCreate() {
        Vue.prototype.$bus = this //实现全局事件总线
    },
})