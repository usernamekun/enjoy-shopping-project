<template>
  <div>
    <h3 @click='show'>学校姓名：{{ name }}</h3>
    <h3>学校地址:{{ address }}</h3>
  </div>
  <!-- 组件的结构 -->
</template>
<script>
import {hunhe} from '../minix'
// 组件交互相关的代码
export default{
    name:'school',
    data() {
        return {
            name: '尚硅谷',
            address: '北京昌平'
                }
            },
            mixins:[hunhe]
}
</script>
<style>
/* 组件的样式 */
</style>