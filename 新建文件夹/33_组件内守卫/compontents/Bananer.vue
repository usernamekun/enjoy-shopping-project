<template>
    <div>
        <button @click="back">后退</button>
        <button @click="forward">前进</button>
        <button @click="test">测试一些go</button>
    </div>
</template>

<script>
export default {
    name:'Bananer',
    methods:{
         back(){
             this.$router.back()
         },
         forward(){
             this.$router.forward()
         },
         test(){
             this.$router.go(3)
         }
     }
}
</script>

<style>

</style>