<template>
  <div class="container">
    <search/>
    <list/>
  </div>
</template>

<script>
import search from './compontents/search'
import list from './compontents/list'
export default {
  name:'App',
  components:{
    search,
    list
  }
}
</script>
   
<style>

</style>