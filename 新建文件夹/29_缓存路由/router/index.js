// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Messages from '../pages/Messages'
import Detail from '../pages/Detail'
// 创建一个路由器
export default new VueRouter({
    routes:[
        {
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home,
            children:[
                {
                    path:'home-news',
                    component:News
                },
                {
                    path:'home-message',
                    component:Messages,
                    children:[{
                        name:'xiangqing',
                        path:'detail/:id/:title',
                        component:Detail, 
                        // props的第一种写法，值为对象，该对象的所有key-value都会以props形式传给Detail组件，用得少
                        // props:{a:1,b:'heelo'}
                        // props的第二种写法，值为布尔值，若布尔值为真就会把该路由组件收到的所有params参数以props的形式传给Detail组件
                        // props:true
                        // props的第三种写法,值为函数
                        props($route){
                            return {
                                id:$route.params.id,title:$route.params.title
                            }
                        }
                    }]
                }
            ]
        },
        
        
    ],

})