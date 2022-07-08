// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Messages from '../pages/Messages'
import Detail from '../pages/Detail'
// 创建一个路由器
const router = new VueRouter({
    routes: [
        {
            name: 'guanyu',
            path: '/about',
            component: About,
            meta: { title: '关于' ,isAuth:true}
        },
        {
            name: 'zhuye',
            path: '/home',
            component: Home,
            meta: { title: '主页' },
            children: [
                {
                    name: 'xinwen',
                    path: 'home-news',
                    component: News,
                    meta: { isAuth: true, title: '新闻' },
                },
                {
                    name: 'xiaoxi',
                    path: 'home-message',
                    component: Messages,
                    meta: { isAuth: true, title: '消息' },
                    children: [{
                        name: 'xiangqing',
                        path: 'detail/:id/:title',
                        component: Detail,
                        props($route) {
                            return {
                                id: $route.params.id, title: $route.params.title
                            }
                        }
                    }]
                }
            ]
        },


    ],

})
export default router