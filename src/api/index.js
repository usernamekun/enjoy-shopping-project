// 当前这个模块：API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'
// 三级联动接口
//  api/product.getBaseCategortList  get  无参数
// 发请求：axios发请求返回结果Promise对象
export const reqCategoryList = ()=>requests({
    url:'/product/getBaseCategoryList',method:'get'
})
// 获取搜索模块数据 地址：/api/list  请求方式：post  参数：需要参数
// 当前这个接口，给服务器传递参数默认参数params，（至少是一个空对象）
export const reqGetSearchInfo = (params)=>requests({
    url:'/list',
    method:'post',
    data:params
})
// 获取商品详情的信息
    export const reqGetGoodsInfo = (skuId)=>requests({  
        url:`/item/${ skuId }`,
        method:'get',
    })
// 添加到购物车（对已有物品进行数量变动）
export const retAddOrUpdateShopCart = (skuId,skuNum)=>requests({
    url:`/cart/addToCart/${ skuId }/${ skuNum }`,
    method:'post'
})
//  删除购物车商品
export const reqRemoveCartById = (skuId)=>requests({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
})
// 获取购物车列表
export const reqGetCartList = ()=>requests({
    url:'/cart/cartList',
    method:'get'
})
// 修改商品的选中状态
export const reqUpdateCartList = (skuId,isChecked) => requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})
// 获取验证码
export const reqGetCode = (phone)=>requests({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
})
// 注册信息接口
export const reqRegister = (data) => requests({
    url:'/user/passport/register',
    method:'post',
    data
})
// 登录的接口
export const reqLogin = (data) => requests({
    url:'/user/passport/login',
    method:'post',
    data
})
// 获取用户信息(需要带token向服务器要用户信息)
export const reqUserInfo = () => requests({
    url:`/user/passport/auth/getUserInfo`,
    method:'get',
})
//退出登录
export const reqLogout = ()=>requests({
    url:'/user/passport/logout',
    method:'get'
}) 
// 获取用户地址信息
export const reqAddressInfo = () => requests({
    url:"/user/userAddress/auth/findUserAddressList",
    method:'get'
})
// 获取订单交易页信息
export const reqGetOrderInfo = () => requests({
    url:'/order/auth/trade',
    method:'get'
})
// 提交订单
export const reqSubmitOrder = (tradeNo,data) => requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data
})
// 获取订单支付信息
export const reqPayInfo = (orderId) => requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})
// 查询支付状态
export const reqPayStatus = (orderId) => requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})
// 获取我的订单接口
// /order/auth/{page}/{limit}
export const reqMyOrderList = (page,limit) => requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})
// 获取bannde（Home首页轮播图接口）
export const reqGetBannerList = ()=>mockRequests.get('/banner')
// 获取floor
export const reqGetFloorList = ()=>mockRequests.get('/floor')