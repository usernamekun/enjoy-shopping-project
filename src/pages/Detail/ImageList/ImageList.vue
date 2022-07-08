<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(imgurl,index) in skuImageList" :key="imgurl.id">
        <img :src="imgurl.imgUrl" @click="showImg(index)" :class="{active:currentIndex === index}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
import { mapGetters } from 'vuex'
  export default {
    name: "ImageList",
    data() {
      return {
        currentIndex:-1,
      }
    },
    computed:{
      ...mapGetters(['skuInfo']),
      skuImageList(){
        return this.skuInfo.skuImageList||{}
      }
    },
    methods:{
      // 点击谁谁就有高亮
      showImg(index){
        this.currentIndex = index
        this.$bus.$emit('Zoom',this.currentIndex)
      }
    },
    watch:{
      skuInfo(){
        this.$nextTick(()=>{
          var mySwiper = new Swiper('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            // 如果需要前进后退按钮
            slidesPerView: 3,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })   
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>