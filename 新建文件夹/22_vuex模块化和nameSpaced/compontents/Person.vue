<template>
<div>
    <h3 style="color:red">count组件的求和为{{$store.state.Count.sum}}</h3>
    <h3 style="color:red">得到第一个人的名字:{{firstName}}</h3>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="add">添加人员</button>
    <button @click="addwang">添加姓王的人</button>
    <button @click="addany">添加一个人名字随机</button>
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
            return this.$store.state.Person.person
        },
        firstName(){
            // return this.$store.getters.Person/firstName
            return this.$store.getters['Person/firstName']
        }
    },
    methods:{
        add(){
            const personObj = {id:nanoid(),name:this.name}
            this.$store.commit('Person/addPerson',personObj)
            // 清空输入框
            this.name = ''
        },
        addwang(){
            const personObj1 = {id:nanoid(),name:this.name}
            this.$store.dispatch('Person/wang',personObj1)
            this.name = ''
        },
        addany(){
            this.$store.dispatch('Person/addpersonServer')
        }
        
    }
}
</script>

<style>

</style>