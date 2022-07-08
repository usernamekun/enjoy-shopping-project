<template>
  <div>
    <h3>当前求和为{{sum}}</h3>
    <h3>当前求和为{{$store.getters.bigsum}}</h3>  
    <h3>我在{{school}},学习{{subject}}</h3>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click='increment'>+</button>
    <button @click='decrement'>-</button>
    <button @click='incrementOdd'>当前求和为奇数再加</button>
    <button @click='incrementWait'>等等再加</button> 
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
  name: "Count",
  data() {
    return {
      n:1
    }
  },
  // mounted(){
  //   console.log(this.$store);
  // },
  computed:{
    // he(){
    //   return this.$store.state.sum
    // },
    // xuexiao(){
    //   return this.$store.state.school
    // },
    // xueke(){ 
    //   return this.$store.state.subject
    // },
    // 借助mapState生成计算属性。从state中读取数据（对象写法）
    // ...mapState({he:'sum',xuexiao:'scholl',xueke:'subject'}),
    // 借助mapState生成计算属性。从state中读取数据（数组写法）
    ...mapState(['sum','school','subject'])
  },
  methods: {
    increment(){
      this.$store.commit('JIA',this.n)
    },
    decrement(){
      this.$store.commit('JIAN',this.n)
    },
    incrementOdd(){
      this.$store.dispatch('jiaOdd',this.n)
    },
    incrementWait(){
      this.$store.dispatch('jiaWait',this.n)
    }
  }
};
</script>
<style lang="css">
    button{
      margin-left: 7px;
    }
</style>