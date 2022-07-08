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
    <button @click='JIA(n)'>+</button>
    <button @click='JIAN(n)'>-</button>
    <button @click='incrementOdd'>当前求和为奇数再加</button>
    <button @click='incrementWait'>等等再加</button> 
  </div>
</template>

<script>
import {mapMutations,mapState,mapActions} from 'vuex'
export default {
  name: "Count",
  data() {
    return {
      n:1
    }
  },
  computed:{
    ...mapState(['sum','school','subject'])
  },
  methods: {
    // increment(){
    //   this.$store.commit('JIA',this.n)
    // },
    // decrement(){
    //   this.$store.commit('JIAN',this.n)
    // },
    // 借助mapMutations生成对应的方法，方法中会调用commit去练习mutations（对象写法）
    // ...mapMutations({increment:'JIA',decrement:'JIAN'}),
    // 借助mapMutations生成对应的方法，方法中会调用commit去练习mutations（数组写法）
    ...mapMutations(['JIA','JIAN']),
    // incrementOdd(){
    //   this.$store.dispatch('jiaOdd',this.n)
    // },
    // incrementWait(){
    //   this.$store.dispatch('jiaWait',this.n)
    // }
    // 借助mapActions生成对应的方法，方法中会调用dispatch去练习actions（对象写法）
    ...mapActions({incrementsOdd:'jiaOdd',incrementWait:'jiaWait'})
  }
};
</script>
<style lang="css">
    button{
      margin-left: 7px;
    }
</style>