<template>
  <div>
    <h3>当前求和为{{sum}}</h3>
    <h3>当前求和为{{bigsum}}</h3>  
    <h3>我在{{school}},学习{{subject}}</h3>
    <h3 style="color:red">下方总人数为：{{person.length}}</h3>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click='JIA(n)'>+</button>
    <button @click='JIAN(n)'>-</button>
    <button @click='incrementOdd(n)'>当前求和为奇数再加</button>
    <button @click='incrementWait(n)'>等等再加</button> 
  </div>
</template>

<script>
import {mapMutations,mapState,mapActions, mapGetters} from 'vuex'
export default {
  name: "Count",
  data() {
    return {
      n:1
    }
  },
  computed:{
    // ...mapState(['sum','school','subject','person'])
    ...mapState('Count',['sum','school','subject']),
    ...mapState('Person',['person']),
    ...mapGetters('Count',['bigsum']),
  },
  methods: {
    ...mapMutations('Count',['JIA','JIAN']),
    ...mapActions('Count',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
  }
};
</script>
<style lang="css">
    button{
      margin-left: 7px;
    }
</style>