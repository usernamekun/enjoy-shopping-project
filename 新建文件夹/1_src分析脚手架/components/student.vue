<template>
  <div>
    <h3>学校姓名：{{name}}</h3>
    <h3>学生年龄：{{age}}</h3>
  </div>
</template>

<script>
export default {
    name:'student',
    data() {
        return {
            name: '张三',
            age: 18
                }

            }
};
</script>

<style>
</style>