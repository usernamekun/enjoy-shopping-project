<template>
    <div>
        <img src="./assets/logo.png" alt="logo">
        <!-- 通过自定义事件给给子组件绑定一个自定义事件实现：子给父传递数据 -->
       <!-- <school v-on:atguigu='getSchoolName'> </school> -->
       <!-- 通过父组件给子组件绑定一个自定义事件实现  第二种写法 使用ref 
            click.native 代表的是原生的点击事件 就可以正常在school实现点击事件了
       -->
       <school ref="school" > </school>
       <!-- <school ref="school" @click.native="show"> </school> -->
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