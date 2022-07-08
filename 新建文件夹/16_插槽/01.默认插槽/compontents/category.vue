<template>
  <div class="bar">
    <h3>{{ title }}分类</h3>
    <!-- 定义一个挖槽（挖个坑，等组件的使用者进来填充 -->
    <slot>
      <ul>
        <li v-for="(item, index) in list" :key="index">{{ item }}</li>
      </ul>
      </slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["list", "title"],
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