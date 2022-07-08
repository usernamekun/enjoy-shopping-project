const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,  //关闭语法及检查
  // 开启代理服务器 (方式一)  解决跨域问题
  // devServer: {
  //   proxy: 'http://localhost:5000'
  // }
  // 开启代理服务器（方式二）
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // target: 'http://39.98.123.211',
        // pathRewrite:{'^/api':''},
        ws: true,//用于支持websocket
        changeOrigin: true //骗人的      
      },
      '/atguigu': {
        target: 'http://localhost:5001',   //请求的地址
        pathRewrite:{'^/atguigu':''},
        ws: true,//用于支持websocket
        changeOrigin: true //用于控制请求头中的host值  
      },
      // '/foo': {
      //   target: '<other_url>'
      // }
    }
  }
})  
