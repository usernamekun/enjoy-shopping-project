import { reqGetCode, reqLogin, reqRegister, reqUserInfo,reqLogout } from "@/api";
import { getToken, setToken,removeToken } from '@/utils/token'
const actions = {
    async getCode1({commit},phone){
        // 获取验证码的这个接口，把验证码返回，但是正常情况下，后台吧验证码发到用户手机上（省钱）
        let result = await reqGetCode(phone)
        if(result.code === 200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 用户注册
    async userRegister({commit},data){
        let result = await reqRegister(data)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户登录
    async Login({commit},data){
        let result = await reqLogin(data)
        // 服务器下发的token，用户唯一标识符（uuid）
        // 将来经常通过戴token找服务器要用户信息进行展示
        if(result.code === 200){
            // 用户已经登陆成功并且获得到token
            commit('LOGIN',result.data.token)
            // 因为存在vuex中的state是非持久化的，一刷新就没了，所以我们需要将它存储到本地存储中
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        console.log(result);
        if(result.code === 200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 退出登录
    async Logout({commit}){
        // 只是向服务器发起一次请求，通知服务器清楚token
        let result = await reqLogout()
        if(result.code === 200 ){
            commit('CLEAR',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    LOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 清楚本地数据
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
const state={
    code:'',
    // 这里的token必须从本地存储获取，初始登录，本地存储没有token，token为null
    //  登陆成功就会有actions派发token给他，同时也要存一份token到本地存储中，所以一刷新
    //   即使state的数据不是持久化的，也会用最快的方式从本地存储中获取到token
    token:getToken(),
    userInfo:{}
}
const getters = {
}
export default {
    actions,
    mutations,
    state,
    getters
}