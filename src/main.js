import Vue from 'vue'
import App from './app.vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// 引入路由器
import router from './router'
import TypeNav from './componments/TypeNav'
import Carouel from './componments/Carouel'
import  Pagination  from './componments/Pagination'
// 按需引入element组件
import {Button,MessageBox} from 'element-ui'
// 注册组件
Vue.use(Button)
// 这是另一种注册组件的方式
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 统一引入
import *as API from '@/api'
// 引进mockServe.js ---mock数据
import './mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'
// 将TypeNav注册为全局组件  第一个参数：全局组件的名字  第二个参数：那一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carouel.name,Carouel)
Vue.component(Pagination.name,Pagination)
import store from './store'
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload,{
    // 懒加载的图片

})
// 引入 自定义插件
// import myPlugins from '@/plugins'
// Vue.use(myPlugins,{
//     name:'upper'
// })
// 引入表单检验插件
import '@/plugins/validate'
Vue.config.productionTip = false
new Vue({
    el:'#app',
    render:h => h(App),
    router:router,
    // 注册仓库，组件实例身上会多一个属性$store属性
    store,
    // 配置全局事件总线
    beforeCreate(){
        Vue.prototype.$bus = this
        // 
        Vue.prototype.$API = API
    },
    
})