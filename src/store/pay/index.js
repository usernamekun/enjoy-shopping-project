import { reqSubmitOrder } from "@/api"

const actions = {
    submitOrder({commit},tradeNo){
        let result = reqSubmitOrder()
        // console.log(result);
    }
}
const mutations = {
}
const state = {}
const getters = {}
export default {
    actions,
    mutations,
    state,
    getters
}