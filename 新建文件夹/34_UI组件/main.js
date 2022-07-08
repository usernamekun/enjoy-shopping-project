import Vue from 'vue'
import App from './app.vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import {Button,Row} from 'element-ui'
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Row)
new Vue({
    el:'#app',
    render:h => h(App),
})