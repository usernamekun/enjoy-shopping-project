import { reqAddressInfo, reqGetOrderInfo } from "@/api"
const actions = {
    // 获取订单信息
    async getOrderInfo({commit}){
        let result = await reqGetOrderInfo()
        if(result.code === 200){
            commit('GETORDERINFO',result.data)
        }
    },
    // 获取用户地址
    async addressInfo({commit}){
        let result = await reqAddressInfo()
        if(result.code === 200){
            commit('ADDRESSINFO',result.data)
        }
        
    }
}
const mutations = {
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    },
    ADDRESSINFO(state,address){
        state.address = address
    }
}
const state = {
    orderInfo:{},
    address:[]
}
const getters = {
    detailArrayList(state){
        return state.orderInfo.detailArrayList||[]
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}