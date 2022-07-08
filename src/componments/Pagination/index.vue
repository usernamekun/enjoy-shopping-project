<template>
  <div class="pagination">
    <button :disabled='pageNo===1' @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="continuesPage.start>1"  @click="$emit('getPageNo',1)" :class="{active:pageNo===1}">1</button>
    <button v-if="continuesPage.start>2">···</button>

    <button v-for='(page,index) in continuesPage.end' :key='index' 
    v-show="page>=continuesPage.start"  @click="$emit('getPageNo',page)"
    :class="{active:pageNo===page}"
    >{{page}}</button>

    <button  v-if="continuesPage.end<totalPage-1">···</button>
    <button v-if="continuesPage.end<totalPage" @click="$emit('getPageNo',totalPage)">{{totalPage}}</button>
    <button :disabled='pageNo===totalPage'  @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
        // 计算一共有多少页
        totalPage(){
            // if(this.total%this.pageSize){
            //     return this.total/this.pageSize + 1
            // }else{
            //     return this.total/this.pageSize
            // }
            // 这样写太麻烦了
            // 向上取整
            return Math.ceil(this.total/this.pageSize)
        },
        continuesPage(){
            const {pageNo,pageSize,total,continues} = this
            // 定义连续分页的开头和结尾的页号
            let start = 0
            let end = 0
            // 获取到连续分页的首尾
            start = pageNo - parseInt(continues/2)
            end = pageNo + parseInt(continues/2)
            // 这里还存在一些问题，start可能小于零 end可能大于total
            if(start < 1){
                start = 1
                end = continues
            }
            if(end > this.totalPage){
                start = this.totalPage - continues + 1
                end = this.totalPage
            }
            return {start,end}
        }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }
    }
    .active{
          background-color: skyblue;
      }
  }
</style>
