<template>
  <div>
    <Header/>
    <!-- 路由的出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import Header from './componments/Header.vue'
import Footer from './componments/Footer.vue'
export default {
  name: "App",
  components:{
    Header,
    Footer,
  },
  mounted(){
    this.$store.dispatch('categroyList')
  }
};
</script>
