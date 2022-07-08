import { reqGetCartList,reqRemoveCartById,reqUpdateCartList } from "@/api"
import {getUUID} from '@/utils/uuid_token'
const actions = {
    // 获取购物车数据
    async getCartList({commit}){
        let result = await reqGetCartList()
        if(result.code === 200){
            commit("GETCARTLIST",result.data)
        }
    },
    // 删除购物车商品
    async removeCart({commit},skuId){
        let result = await reqRemoveCartById(skuId)  
        if(result.code === 200){
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除所有选中的商品
    removeAllChecked({dispatch,getters}){
        let PromiseAll = []
        getters.cartInfo.cartInfoList.forEach(item => {
            let promise = item.isChecked===1? dispatch("removeCart",item.skuId):''
            PromiseAll.push(promise)
        });
        // 只有全部都成功才返回成功
        // 只要有一个不成功就返回失败
        return Promise.all(PromiseAll)
    },
    // 修改商品选中状态
    async updateCartList({commit},{skuId,isChecked}){
        let result = await reqUpdateCartList(skuId,isChecked)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改所有商品的选中状态
    updateAllChecked({dispatch,getters},isChecked){
        let PromiseAll = []
        getters.cartInfo.cartInfoList.forEach(item=>{
            let promise = dispatch('updateCartList',{
                skuId:item.skuId,
                isChecked
            })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
        
    }
}
const mutations = {
    GETCARTLIST(state,cartInfo){
        state.cartInfo = cartInfo
    }
}
const state = {
    cartInfo:[],
    // 游客的临时身份
    uuid_token :getUUID()
}
const getters = {
    cartInfo(state){
        return state.cartInfo[0]||{}
    }
}
export default{
    actions,
    mutations,
    state,
    getters
}