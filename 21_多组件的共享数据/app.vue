<template>
  <div>
    <Count/>
    <hr>
    <person/>
  </div>
</template>

<script>
import Count from "./compontents/Count.vue";
import person from './compontents/Person.vue'
export default {
  name: "App",
  components: {
    Count,person
  },
};
</script>
