<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addtodo='addtodo'/>
        <MyList :todos='todos'/>
        <MyFooter :todos='todos' @ischeckedAll='ischeckedAll' @cleardone='cleardone'/>
    	</div>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
import MyList from './components/MyList.vue'
export default {
  components:{
      MyHeader,
      MyFooter,
      MyList
    },
    data() {
        return {
            todos:JSON.parse(localStorage.getItem('todos'))||[]
        }
    },
    watch:{
      // 因为要检测数组对象里面的数据 所以要开启深度监视
      todos:{
        deep:true,
        handler(value){
          localStorage.setItem('todos',JSON.stringify(value))
        }
      }
    },
    methods:{
      addtodo(todoobj){
        this.todos.unshift(todoobj)
      },
      // 勾选或取消
      checktodo(id){
        this.todos.forEach((todo) => {
          if(todo.id===id){
            todo.done = !todo.done
          }
        })
      },
      // 删除操作
      deletetodo(id){
        this.todos = this.todos.filter(h => h.id !== id)
      },
      // 全选或全部选
      ischeckedAll(done){
        this.todos.forEach(todo => {
          todo.done = done
        })
      },
      // 清除已完成
      cleardone(){
        this.todos = this.todos.filter(todo => !todo.done)
      }
    },
    mounted(){
      this.$bus.$on('checktodo',this.checktodo)
      this.$bus.$on('deletetodo',this.deletetodo)
    }
}
</script>
    
<style>
  body {background: #fff;}
  .btn {display: inline-block;padding: 4px 12px;margin-bottom: 0;font-size: 14px;
    line-height: 20px;text-align: center;vertical-align: middle;cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;}
  .btn-danger {color: #fff;background-color: #da4f49;border: 1px solid #bd362f;}
  .btn-danger:hover {color: #fff;background-color: #bd362f;}
  .btn:focus {outline: none;}
  .todo-container {width: 600px;margin: 0 auto;}
  .todo-container .todo-wrap {padding: 10px;border: 1px solid #ddd;border-radius: 5px;}
</style>