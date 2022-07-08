<template>
    <div>
        <img src="./assets/logo.png" alt="logo">
       <test/>
       <hr>
       <test2/>
       <test3/>
    </div>
</template>

<script>
// 引入组件
import test from './components/test.vue'
import test2 from './components/test2.vue'
import test3 from './components/test3.vue'
export default {
    name:'App',
    components:{
        test,
        test2,
        test3
    }
}
</script>

<style>

</style>