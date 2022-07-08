<template>
  <div>
    <h3>学生姓名：{{ name }}</h3>
    <h3>学生年龄：{{ age }}</h3>
    <button @click="sendStudentName">点我把姓名给学校</button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: "student",
  data() {
    return {
      name: "张三",
      age: 18,
    }
  },
  methods:{
    sendStudentName(){
      // this.$bus.$emit('hello',this.name)
      pubsub.publish('hello',666)
    }
  }
};
</script>

<style>
</style>