<template>
  <div>
      <student name='张三' sex='男' :age='18' />
  </div>
</template>

<script>
import student from "./components/student";
export default {
  name: "App",
  components: {
    student
  }
};
</script>

<style>
</style>