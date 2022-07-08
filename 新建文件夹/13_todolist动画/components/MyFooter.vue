<template>
    <div class="todo-footer" v-show="todos.length">
    <label>
      <!-- <input type="checkbox" :checked='isAll' @click="checkedAll"/> -->
      <input type="checkbox" v-model="isAll"/>
    </label>
    <span>
      <span>已完成{{doneTotal}}</span> /全部{{todos.length}}
    </span>
    <button class="btn btn-danger" @click='clearAll'>清除已完成任务</button>
  </div>
</template>

<script>
export default {
    name:'MyFooter',
    props:['todos'],
    methods:{
    //   checkedAll(e){
    //     this.ischeckedAll(e.target.checked)
    //   }
      clearAll(){
        // this.cleardone()
        this.$emit('cleardone')
      }
    },
    computed:{
      //方式一：统计做完的数量
      // doneTotal(){
      //   let i = 0
      //   this.todos.forEach(todo => {
      //     if(todo.done === true) i++
      //   });
      //   return i
      // }
      // 方式二:利用reduce
      // Array.reduce((pre,current)=>{},i)   数组有几个就会遍历多少次
        //  函数中的参数pre的初始值是i 第二次遍历的pre的值是第一次返回的pre的值 
      doneTotal(){
        return this.todos.reduce((pre,current)=> pre+(current.done ? 1:0) ,0)
      } ,
      isAll:{
        get(){
          return this.doneTotal===this.todos.length&&this.todos.length >0
        },
        set(value){
          // this.ischeckedAll(value)
          this.$emit('ischeckedAll',value)
        }
      }
    }
}
</script>

<style scoped>
    /*footer*/
  .todo-footer {height: 40px;line-height: 40px;padding-left: 6px;margin-top: 5px;}
  .todo-footer label {display: inline-block;margin-right: 20px;cursor: pointer;}
  .todo-footer label input {position: relative;top: -1px;vertical-align: middle;
    margin-right: 5px;}
  .todo-footer button {float: right;margin-top: 5px;}
</style>