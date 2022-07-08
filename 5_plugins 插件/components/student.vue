<template>
  <div>
    <h3 v-text="msg"></h3>
    <h3>学生姓名：{{ name }}</h3>
    <h3>学生年龄：{{ age }}</h3>
    <h3>学生性别：{{ sex }}</h3>
    <input type="text" v-fbind="name" />
    <button @click="test">点我hello</button>
  </div>
</template>

<script>
export default {
  name: "student",
  data() {
    return {
      name: "张三",
      age: 18,
      sex: "男",
      msg: "欢迎来到尚硅谷学校",
    };
  },
  methods: {
    test() {
      this.hello();
    },
  },
};
</script>
