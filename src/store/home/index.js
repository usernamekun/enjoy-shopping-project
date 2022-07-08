    import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";
    // actions 可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 通过api里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categroyList({commit}){
        let result = await reqCategoryList()
        if(result.code === 200){
            commit('CATEFROYLIST',result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({commit}){
        // console.log("获取服务器")
        let result = await reqGetBannerList()
        // console.log(result);
        if(result.code===200){
            commit('GEtBANNERLIST',result.data)
        }
    },
    // 获取floor中的轮播图的数据
    async getFloorList({commit}){
        let result = await reqGetFloorList()
        if(result.code === 200){
            commit('GETFLOORLIST',result.data)
        }
    }
}
// mustations 修改state的唯一手段
const mutations = {
    CATEFROYLIST(state,categroyList){
        state.categroyList = categroyList.slice(0,16)//因为服务器更新了  本来我们只需要16个数组，现在更新到了19个，所以截取一下
    },
    GEtBANNERLIST(state,bannerList){
        // console.log("修改数据");
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const state = {
    categroyList:[],
    // 轮播图的数据
    bannerList:[],
    floorList:[]
}
const getters = {
    
}
export default{
    actions,
    mutations,
    state,
    getters
}