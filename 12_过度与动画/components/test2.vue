<template>
<div>
    <button @click='isshow = !isshow'>显示/隐藏</button>
    <transition-group name='hello' appear>
        <h1 v-show="!isshow" key="1">你好呀{{name}}</h1>
        <h1 v-show="isshow" key="2">你好呀{{name}}</h1>
    </transition-group>
    
</div>
    
</template>

<script>
export default {
    data() {
        return {
            name:'尚硅谷',
            isshow:true
        }
    },
}
</script>

<style>
    h1{
        width: 600px;
        height: 60px;
        background-color: aqua;
    }   
    .hello-enter-active{
        animation: atguigu 0.5s linear;
    }
    .hello-leave-active{
        animation: atguigu 0.5s linear reverse;
    }
    @keyframes atguigu{
        from{
            transform:translateX(-100%);
        }
        to{
            transform: translateX(0); 
        }
    }
</style>