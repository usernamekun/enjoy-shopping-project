<template>
  <div class="bar">
    <h3>{{ title }}分类</h3>
    <!-- 定义一个挖槽（挖个坑，等组件的使用者进来填充 -->
    <slot :games='games'></slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title"],
  data() {
      return {
          games:['穿越火线','超级玛丽','王者荣耀','绝地求生'],
      }
  },
};
</script>

<style scoped>
.bar {
  width: 170px;
  height: 300px;
  background-color: aqua;
}
h3 {
  width: 100%;
  height: 30px;
  text-align: center;
  background-color: bisque;
}
</style>