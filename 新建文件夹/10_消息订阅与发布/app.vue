<template>
    <div>
        <img src="./assets/logo.png" alt="logo">
       <school ref="school" > </school>
        <student :getStudentName='getStudentName'></student>
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
    },
    methods:{
        getStudentName(name){
            console.log('app收到了学生的名字',name);
        },
        getSchoolName(name){
            console.log('app收到了学校的名字',name);
        },
        // show(){
        //     alert('123')
        // }
    },
    mounted(){
        // $on 当什什么时候
        this.$refs.school.$on('atguigu',this.getSchoolName)
    }
}
</script>

<style>

</style>