// gai文件用于创建Vuex中最为核心的store  
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 应用Vuex插件
Vue.use(Vuex)
// 准备actions  用于响应组件中的动作
const actions = {
    // jia(contain,value){
    //     // console.log(contain,value); //contain是迷你版的store  value是值
    //     contain.commit('JIA',value)
    // },
    // jian(contain,value){
    //     contain.commit('JIAN',value)
    // },
    jiaOdd(contain,value){
        // console.log(contain,value); //contain是迷你版的store  value是值
        if(contain.state.sum%2){
            contain.commit('JIA',value)
        }
        
    },
    jiaWait(contain,value){
        setTimeout(()=>{contain.commit('JIA',value)},500)
        
    }
}
// 准备mutations  用于操作数据
const mutations = {
    JIA(state,value){
        state.sum +=value
    },
    JIAN(state,value){
        state.sum -=value
    }
}
//准备state  用于存储数据
const state = {
    sum:0,
    school:'尚硅谷',
    subject:'前端 '
}
// 准备getters 用于将state中的数据进行加工
const getters = {
    bigsum(state){
        return state.sum*10
    }
}
// 创建store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
