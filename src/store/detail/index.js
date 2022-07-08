import {reqGetGoodsInfo,retAddOrUpdateShopCart} from '@/api'
// 封装游客身份模块uuid--->生成一个随机的字符串（不能再变了）
const actions = {
    async getGoodsList({commit},skuId){
        let result =await reqGetGoodsInfo(skuId)
        // console.log(result.data);
        if(result.code === 200){
            commit('GETGOODSLIST',result.data)
        }   
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
        // 因为服务器没有返回其余数据，因此咱们不需要三连环存储数据
        let result = await retAddOrUpdateShopCart(skuId,skuNum)
        if(result.code===200){
            return '加入成功了'
        }else{
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETGOODSLIST(state,goodsInfo){
        state.goodsInfo = goodsInfo
    }
}
const state = {
    goodsInfo:{},
    // 游客的临时身份
    // uuid_token :getUUID()
}
const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||{}
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}