// import Home from '../pages/Home'
// import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
// 引入二级路由组件
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，
// 这样就会更加高效。
export default [
    {
        path: '/home',
        component: ()=>import('../pages/Home'),
        meta: { showFooter: true }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        name: 'search',
        // ? 可以指定参数可传可不穿
        path: '/search/:keyword?',
        component: ()=>import('../pages/Search'),
        meta: { showFooter: true },
    },
    {
        name: 'detail',
        path: '/detail/:skuid?',
        component: Detail
    },
    {
        name:'addCartSuccess',
        path:'/addcartsuccess',
        component:AddCartSuccess,
        meta: { showFooter:true}
    },
    {
        name:'ShopCart',
        path:'/shopcart',
        component:ShopCart,
        meta: { showFooter:true}
    },
    {
        name:'trade',
        path:'/trade',
        component:Trade,
        meta: { showFooter:true},
        beforeEnter: (to, from, next) => {
            if(from.path == '/shopcart'){
                next()
            }else if(from.path == '/'){
                next()
            }else{
                // 这代表哪里也不去，留在当前的路由中
                next(false)
            }
        }
    },
    {
        name:'pay',
        path:'/pay',
        component:Pay,
        meta: { showFooter:true},
        beforeEnter:(to,from,next)=>{
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name:'paysuccess',
        path:'/paysuccess',
        component:PaySuccess,
        meta: { showFooter:true}
    },
    {   
        name:'center',
        path:'/center',
        component:Center,
        meta: { showFooter:true},
        // 二级路由组件
        children:[
            {
                path:'myorder',
                component:myOrder
            },
            {
                path:'grouporder',
                component:groupOrder
            },
            // 重定向
            {
                path:'/center',
                redirect:'/center/myorder'
            }
            
        ]
    },
    {
        // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
        path: '*',
        redirect: '/home'
    },
]