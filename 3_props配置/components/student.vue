<template>
<div>
    <h3 v-text="msg"></h3>
    <h3>学生姓名：{{name}}</h3>
    <h3>学生年龄：{{myAge+1}}</h3>
    <h3>学生性别：{{sex}}</h3>
    <button @click='addage'>点我增加年龄</button>
</div>
</template>

<script>
export default {
    name:'student',
    data(){
        return {
            myAge:this.age,
            msg:'欢迎来到尚硅谷学校',
        }
    },
    methods:{
        addage(){
            this.myAge++
        }
    },
    // 简单声明
    props:['name','age','sex']
    // 接受的同时对数据进行数据限制
    // props:{
    //     name:String,
    //     sex:String,
    //     age:Number
    // }
    // 接受的同时对数据进行限制+默认值的指定+必要性的限制
    // props:{
    //     name:{
    //         type:String, 
    //         required:true
    //     },
    //     sex:{
    //         type:String,
    //         required:true
    //     },
    //     age:{
    //         type:Number,
    //         default:99
    //     }
    // }
}
</script>
