<template>
  <div class="contain">
    <Category title='美食'>
      <template scope="atguigu">
        <ul><li v-for="(item,index) in atguigu.games" :key="index">{{item}}</li></ul>
      </template>
      
    </Category>
    <Category title='游戏'>
      <template scope="atguigu">
        <ol><li v-for="(item,index) in atguigu.games" :key="index">{{item}}</li></ol>
      </template>
    </Category> 
    <Category title='电影'>
      <template slot-scope="atguigu">
        <h4 v-for="(item,index) in atguigu.games" :key="index">{{item}}</h4>
      </template>
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
  // data() {
  //   return {
  //     meishi:['烧烤','啤酒','辣椒炒肉','红烧肉'],
  //     games:['穿越火线','超级玛丽','王者荣耀','绝地求生'],
  //     fimls:['拆弹专家','谁是凶手','开端','你是我的荣耀']
  //   }
  // },
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