<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link class="list-group-item" active-class='active' to="/home/home-news">News</router-link>
        </li>
        <li>
          <router-link class="list-group-item" active-class='active' to="/home/home-message">Message</router-link>
        </li>
      </ul>
      <div>
        <keep-alive include="News">
          <router-view></router-view>
        </keep-alive>
        
      </div>
    </div>
  </div>
</template>

<script>
import News from './News.vue'
import Messages from './Messages.vue'
export default {
  name: "Home",
  components:{
    News,
    Messages
  }
};
</script>

<style>
</style>