import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import userRegister from './userRegister'
import trade from './trade'
import pay from './pay'
// 对外暴露store类的一个实例
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopCart,
        userRegister,
        trade,
        pay
    }
})