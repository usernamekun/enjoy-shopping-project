import Vue from 'vue'
import App from './app.vue'
// import vuex from 'vuex'
// import store from './store'
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'
Vue.config.productionTip = false
// 使用插件
// Vue.use(vuex)
Vue.use(VueRouter)
new Vue({
    el:'#app',
    render:h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this //实现全局事件总线
    },
    router:router
})