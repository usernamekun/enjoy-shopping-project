#笔记

## ref属性
    1.被用来给元素或子组件注册引用信息（id的替代者）
    2.应用在html标签上获取的是真实DOM元素，引用在组件标签上是组件实例对象（vc）
    3.使用方式：
        打标识：<h1 ref='xxx'> 或 《school ref-'xxx'>
        获取：this.$refs.xxx  这就是h1 vc实例对象

## prop属性
    props让组件接受外部传过来的数据
    传递数据<demo name='xxx' :age='18'/> 这里age前加：，通过v-bind是的里面的18是数字
    接收数据
        第一种方式（只接收） props:['name','age']
        第二种方式（限制类型）props：[name:String,age:Number]
        第三种方式（限制类型，限制必要性，指定默认值）
    1.props是只读的，vue底层会检测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据


## mixin(混合)
    功能：可以把多个组件公用的配置提取成一个混入对象
    使用方式：
        第一步定义混合，例如：
        {
            data(){....}
            methods:{...}
            ....
        }
        第二部使用混入，例如：
            1.全局混入：Vue.mixin(xxx)
            2.局部混入：micins:['xxx]

## plugins插件
    功能：用于增强vue
    本质：包含install方法的一个对象，install的第一个参数是vue，第二个以后的参数是插件使用者传递的数据
    定义插件：
        对象.install = function(vue,options){
            1.添加全局过滤器
            Vue.filter()
            Vue.prototype.$myProperty = xxx

        }
    使用参数：Vue.use()

## scoped样式

    作用：让央视在局部生效，防止冲突
    写法：<style scoped>

## 组件的自定义事件
    1.一种组件间通信的方式，适用于：子组件==>父组件
    2.使用场景：A是父组件，B是子组件，B想给A传数据，那么就要用A最终给B绑定自定义事件（事件的回调在A中）
    3.绑定自定义事件：若想只触发一次，可以使用once修饰符或$once方法
    4.触发自定义事件：this：$emit('atguigu',数据)
    5.解绑自定义事件this.$off('atguigu')
    6.组件上也可以绑定原生DOM事件，需要使用native修饰符
    7.注意：通过this.$refs.xxx.$on('atguigu',回调)绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题
## 全局事件总监
    1.一种组件间通信的方式，适用于任意组件间通信
    2.安装全局事件总线：
        new vue({
            ...
            beforeCreate(){
                Vue.prototype.$bus = this
            }
            ...
        })
        3.使用事件总线
            1.接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身
                mounted（）{
                    this.$bus.$on = ('xxxx',this.demo)
                }
            2.提供数据：this.$bus.$emit('xxx',数据)
        4.最好在beforeDestroy 钩子中，用$off去解绑当前组件所用到的事件

## 消息订阅与发布
    1.一种组件间通信的方式，适用于任意组件通信
    2.使用步骤：
        1.安装pubsub：npm i pubsub-js
        2.引入：import pubsub from pubsub-js
        3.接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身
            mounted（）{
                this.pid = pubsub.subscribe('xxx',this.demo)

            }
        4.提供数据 ：pubsub.publish('xxx",数据)
        5.最好在beforeDestroy中用pubsub.unsubscribe(pid)去取消订阅



## vue脚手架配置代理
    方式一:
        在vue.config.js 中添加如下配置
            derServe:{
                proxy:'http://localhost:5000'
            }
        说明：1.优点：配质检单，请求资源时直接发给前端即可
                2.缺点：不能配置多个代理，不能灵活地控制请求是否走代理
                3.工作方式：若按照上述配置代理，当请求了前端不存在的资源时，name该请求会转发给服务器（优先匹配前端资源）
    方式二：
        编写vue.config.js配置如下：
            derServe:{
                proxy:{
                    '/api1':{
                        target:'http://localhost:5000',
                        changeOrigin:true,
                        pathRewrite:{'^/api1':''}
                    }
                    '/api2':{
                        target:'http://localhost:5001',
                        changeOrigin:true,
                        pathRewrite:{'^/api2':''}
                    }
                }
            }
            说明：
                1.优点：可以配置多个代理，且可以灵活地控制请求是否走代理
                2.缺点：配置略微繁琐，请求资源时必须加前缀

## 插槽slot
    作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于
     父组件 ===> 子组件
    分类：默认插槽、具名插槽、作用域插槽

    3. 作用域插槽
    理解：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）