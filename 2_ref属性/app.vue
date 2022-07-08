<template>
  <div>
    <h3 ref="title">今天天气真不错</h3>
    <button @click='showDOM' ref="btn">点我输出dom元素</button>
    <school ref='sch'/>
    <school />
  </div>
</template>

<script>
import school from "./components/school";
export default {
  name: "App",
  components: {
    school,
  },
  methods:{
      showDOM(){
          console.log(this.$refs.title)
          console.log(this.$refs.btn)
          console.log(this.$refs.sch)
      }
  }
};
</script>

<style>
</style>