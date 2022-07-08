<template>
  <!-- 这个组件已经注册为全局组件所以不需要引入 -->
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list='floor'/>
    <Brand />
  </div>
</template>

<script>

import ListContainer from "./ListContainer";
import TodayRecommend from "./TodayRecommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import {mapState} from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("getFloorList");
    // 获取用户登录信息,用户信息会在首页展示
    // this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>