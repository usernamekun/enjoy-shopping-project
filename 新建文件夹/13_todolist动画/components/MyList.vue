<template>
  <ul class="todo-main">
    <transition-group 
      name='animate__animated animate__bounce' 
      enter-active-class="animate__fadeInTopRight"
      leave-active-class="animate__fadeInTopLeft"
    >
      <MyItem v-for="todoobj in todos" :key="todoobj.id" :todo="todoobj" />
    </transition-group>
  </ul>
</template>
<script>
import 'animate.css'
import MyItem from "./MyItem.vue";
export default {
  name: "MyList",
  props: ["todos"],
  components: { MyItem },
};
</script>

<style scoped>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}
/* .todo-empty {height: 40px;line-height: 40px;border: 1px solid #ddd;
    border-radius: 2px;padding-left: 5px;margin-top: 10px;} */
</style>