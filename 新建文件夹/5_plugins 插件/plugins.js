export default {
    install(Vue) {
        // 全局过滤器
        Vue.filter('myslice',val =>{
            return val.slice(0,4)
        })
        // 定义全局的自定义属性
        Vue.directive('fbind', {
            // 指令与元素绑定成功时（一上来）
            bind(element, binding) {
                element.value = binding.value
            },
            // 指令所在元素被插入元素时
            inserted(element, binding) {
                // 获取焦点
                element.focus()
            },
            // 指令元素所在模板被重新解析时
            update(element, binding) {
                element.value = binding.value
                element.focus()
            }
        })
        Vue.prototype.hello = ()=>{
            alert('你好啊')
        }
    }
}