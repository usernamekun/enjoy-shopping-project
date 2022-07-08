<template>
<div>
    <h3 style="color:red">count组件的求和为{{$store.state.sum}}</h3>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="add($event)">添加人员</button>
    <ul>
        <li v-for="(p,index) in personlist" :key="index">{{p.name}}</li>
    </ul>
</div>
  
</template>

<script>
import {nanoid} from 'nanoid'
export default {
    data(){
        return{
            name:''
        }
    },
    computed:{
        personlist(){
            return this.$store.state.person
        }
    },
    methods:{
        add(e){
            const personObj = {id:nanoid(),name:this.name}
            this.$store.commit('addPerson',personObj)
            // 清空输入框
            this.name = ''
        }
    }
}
</script>

<style>

</style>