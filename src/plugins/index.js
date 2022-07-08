// Vue插件一定暴露一个对象
// 这些没什么大用，只是为了让我们了解全局指令
let myPlugins = {}

myPlugins.install = function(Vue,options){
    // 全局指令
     Vue.directive(options.name,(element,params)=>{
        element.innerHTML = params.value.toUpperCase()
     })
}

export default myPlugins