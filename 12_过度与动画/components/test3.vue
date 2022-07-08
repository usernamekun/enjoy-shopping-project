<template>
  <div>
    <button @click="isshow = !isshow">显示/隐藏</button>
    <transition-group
     appear 
     name="animate__animated animate__bounce" 
     enter-active-class='animate__jello'
     leave-active-class="animate__flipOutX"
     >
      <h1 v-show="!isshow" key="1">你好呀{{ name }}</h1>
    </transition-group>
  </div>
</template>

<script>
import "animate.css";
export default {
  data() {
    return {
      name: "尚硅谷",
      isshow: true,
    };
  },
};
</script>

<style>
h1 {
  width: 600px;
  height: 60px;
  background-color: aqua;
}
</style>