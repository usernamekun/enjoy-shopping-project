<template>
  <div>
      <student />
      <hr>
      <school/>
  </div>
</template>

<script>
import student from "./components/student";
import school from './components/schoole.vue'
export default {
  name: "App",
  components: {
    student,
    school
  }
};
</script>

<style>
</style>