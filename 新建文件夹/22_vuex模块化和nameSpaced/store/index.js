import Vue from 'vue'
import axios from 'axios'
import {nanoid} from 'nanoid'
// 引入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)
const Count = {
    namespaced:true,
    actions: {
        jiaOdd(contain, value) {
            if (contain.state.sum % 2) {
                contain.commit('JIA', value)
            }
        },
        jiaWait(contain, value) {
            setTimeout(() => { contain.commit('JIA', value) }, 500)
        }
    },
    mutations: {
        JIA(state, value) {
            state.sum += value
        },
        JIAN(state, value) {
            state.sum -= value
        },
    },
    state: {
        sum: 0,
        school: '尚硅谷',
        subject: '前端 ',
    },
    getters: {
        bigsum(state) {
            return state.sum * 10
        }
    }
}
const Person = {
    namespaced:true,
    actions:{
        wang(context,value){
            if(value.name.indexOf('王')===0){
                // context.state.person.unshift(value)
                context.commit('addPerson',value)
            }
        },
        addpersonServer(context){
            axios.get('http://api.uixsj.cn/hitokoto/get?type=social').then(
                response => {
                    context.commit('addPerson',{id:nanoid(),name:response.data})
                },
                error => {
                    alert("请求出错",error.message);
                }
            )
        }
    },
    mutations: {
        addPerson(state, value) {
            state.person.unshift(value)
        },
    },
    state:{
        person: [{ id: '001', name: '张三' }]
    },
    getters:{
        firstName(state){
            return state.person[0].name
        }
    }
}
// 创建store
export default new Vuex.Store({
    modules:{
       Count,
       Person
    }
})
