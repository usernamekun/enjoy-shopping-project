import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routers'
import store from '@/store'
// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
// 重写push|replace
// 第一个参数：告诉push你要往哪里跳
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
// 创建一个路由器
let router =  new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        // 返回的这个y=0，代表滚动条在最上方
        return { y:0 }
    }
})
// 全局守卫：前置守卫（在路由跳转之前进行判断）
 router.beforeEach(async(to,from,next) => {
    // to：可以获取到你要跳转到那个路由的信息
    // from：可以获取到你从哪个路由来的信息
    // next:放行函数
    let token = store.state.userRegister.token
    // 用户的信息
    let name = store.state.userRegister.userInfo.name
    // 判断是否处于登录状态
    if(token){
        // 判断用户是否想去login
        if(to.path === '/login'){
            console.log(name);
            next('/home')
        }else{
            // 用户去的不是login 可以放行
            // 派发actions ，让跳转后的路由可以获得用户信息
            // 把这个派发actions写在这里的好处是就不用一个一个写在每一个路由上派发
            if(name){
                // next代表该去哪里就去哪里
                next()
            }else{
                try {
                    // 代表用户登录了,但是没有用户信息,发请求让仓库存储用户信息,在进行跳转
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    console.log('111');
                    // token失效了获取不到用户信息，重新登陆
                    // 清除token
                    await store.dispatch('Logout')
                    // 清除本地数据后,让用户会到登录页,重新登陆
                    next('/login')
                }
            }
        }
    }else{
        // 用户未登录：不能去交易相关的、不能去支付相关的【pay|paysuccess]、不能去个人中心
        // 未登录去上面这些路由 ---- 让其登录
        // 去的不是上面的这些路由---放行
        const toPath = to.path
        if(toPath.indexOf('trade')!==-1||toPath.indexOf('pay')!==-1||toPath.indexOf('center')!==-1||toPath.indexOf('shopcart')!==-1){
            // 给他带一个参数，将要去的path作为参数带给login路由，方便登录后可以直接跳转到刚刚想去的页面
            next('/login?redirect='+toPath)
        }else{
            next()
        }
        
    }
})

export default router