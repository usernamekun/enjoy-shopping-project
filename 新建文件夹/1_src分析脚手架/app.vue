<template>
    <div>
        <img src="./assets/logo.png" alt="logo">
       <school> </school>
        <student></student>
    </div>
</template>

<script>
// 引入组件
import school from './components/schoole.vue'
import student from './components/student.vue'
export default {
    name:'App',
    components:{
        school,
        student
    }
}
</script>

<style>

</style>