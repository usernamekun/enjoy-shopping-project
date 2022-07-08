<template>
    <h2>About组件内容</h2>
</template>

<script>
export default {
  name:'About',
  // 通过路由规则，进入该组件时被调用
  beforeRouteEnter(to,from,next){
    console.log('beforeRouteEnter')
    if(to.meta.isAuth){
      if(localStorage.getItem('school')==='atguigu'){
        next()
      }else{
        alert("学校名不对，禁止查看")
      }
    }else{
      next()
    }
  },
  // 通过路由规则，离开组件时被调用
  beforeRouteLeave(to,from,next){
    next()
  }
}
</script>

<style>

</style>