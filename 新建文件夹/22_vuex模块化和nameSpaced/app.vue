<template>
  <div>
    <Count/>
    <hr>
    <person/>
  </div>
</template>

<script>
import Count from "./compontents/Count";
import person from './compontents/Person'
export default {
  name: "App",
  components: {
    Count,
    person
  },
};
</script>
