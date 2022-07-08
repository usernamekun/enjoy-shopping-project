<template>
  <div>
    <ToolbarWrap />
    <TypeNav />
    <Main />
  </div>
</template>

<script>
import ToolbarWrap from "./ToolbarWrap";
import Main from "./Main";
export default {
  name: "Search",
  components: {
    ToolbarWrap,
    Main,
  },
};
</script>

<style>
</style>