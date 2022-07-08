<template>
  <div class="contain">
    <Category title='美食' :list='meishi'>
      <img src="./assets/1.webp">
      
    </Category>
    <Category title='游戏' :list='games'></Category>
    <Category title='电影' :list='fimls'>
      <img src="./assets/2.webp" alt="">
    </Category>
  </div>
</template>

<script>
import Category from "./compontents/category.vue";
export default {
  name: "App",
  components: {
    Category,
  },
  data() {
    return {
      meishi:['烧烤','啤酒','辣椒炒肉','红烧肉'],
      games:['穿越火线','超级玛丽','王者荣耀','绝地求生'],
      fimls:['拆弹专家','谁是凶手','开端','你是我的荣耀']
    }
  },
};
</script>
   
<style>
  .contain{
    font-size: 17px;
    display: flex;
    justify-content: space-around;
  }
  img{
    width: 100%;
  }
</style>