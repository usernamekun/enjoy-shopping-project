<template>
  <div>
    <h3>学校姓名：{{ name }}</h3>
    <h3>学校地址:{{ address }}</h3>
    <button @click="death">点我销毁</button>
  </div>
</template>
<script>
export default {
  name: "school",
  data() {
    return {
      name: "尚硅谷",
      address: "北京昌平",
    };
  },
  methods:{
    death(){
      this.$destroy()//销毁当前school组件实例，销毁后 所有的school实例自定义的事件全部失效
    }
  },  
  mounted(){
    this.$bus.$on('hello',data=>{
      console.log("我是school组件，我到了数据:"+data);
    })
  },
  beforeDestroy(){
    this.$bus.$off('hello')
  }
};
</script>
<style>
/* 组件的样式 */
</style>