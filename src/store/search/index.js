import { reqGetSearchInfo } from "@/api"
// actions 可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getSearchList({commit},params={}){
        // 获取search模块数据
        let result = await reqGetSearchInfo(params)
        if(result.code === 200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
// mustations 修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const state = {
    searchList:{}
}
// 计算属性
// 项目当中getters主要作用是：简化仓库中的数据（简化数据而生）
// 可以把我们将来在组件中需要用的数据简化一下【将来组件使用数据的时候就方便了   】
const getters = {
    // 当前形参是当前仓库中的state，，并非大仓库的那个state
    goodsList(state){
        // 这样书写有问题, 
        // 假如网络不给力|没有网 state.searchList.goodsList应该是undefined
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    }
}
export default{
    actions,
    mutations,
    state,
    getters
}