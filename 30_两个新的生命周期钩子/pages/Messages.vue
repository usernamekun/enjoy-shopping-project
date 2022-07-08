<template>
  <ul>
    <li v-for="n in messageList" :key="n.id">
        <!-- 跳转路由并携带query参数，to的字符串写法 -->
        <!-- <router-link :to="`/home/home-message/detail/${n.id}/${n.title}`">{{n.title}}</router-link> -->
        <!-- 跳转路由并携带query参数，to的对象写法 -->
        <router-link :to="{
            //使用params传递参数  只能用name匹配路由，如果使用path他就会报错
            name:'xiangqing',
            params:{
                id:n.id,
                title:n.title
            }
            }">{{n.title}}</router-link>&nbsp;&nbsp;
            <button @click="pushshow(n)">push</button>&nbsp;&nbsp;<button @click="showreplace(n)">replace</button>
        &nbsp;&nbsp;</li>
    <hr>
    <router-view></router-view>
  </ul>
</template>

<script>
import Detail from './Detail.vue'
export default {
    name:'Messages',
    components:{
        Detail
    },
    methods:{
        pushshow(n){
            this.$router.push({
                name:'xiangqing',
                params:{id:n.id,title:n.title}
            })
        },
        showreplace(n){
            this.$router.replace({
                name:'xiangqing',
                params:{id:n.id,title:n.title}
            })
        }
    },
    data() {
        return {
            messageList:[
                {id:'001',title:'消息一'},
                {id:'002',title:'消息二'},
                {id:'003',title:'消息三'}
            ]
        }
    },
};
</script>

<style>
</style>