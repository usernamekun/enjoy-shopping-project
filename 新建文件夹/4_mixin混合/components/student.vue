<template>
<div>
    <h3 v-text="msg" @click='show'></h3>
    <h3 @click='show'>学生姓名：{{name}}</h3>
    <h3 @click='show'>学生年龄：{{age}}</h3>
    <h3 @click='show'>学生性别：{{sex}}</h3>
</div>
</template>

<script>
import {hunhe} from '../minix'
export default {
    name:'student',
    data(){
        return {
            name:'张三',
            age:18,
            sex:'男',
            msg:'欢迎来到尚硅谷学校',
        }
    },
    mixins:[hunhe]
}
</script>
