<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked === 1"
              @click="changeisChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.cartPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="remove(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked&&cartInfoList.length>0"
          @click="changeAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） :</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" target="_blank" @click="order">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapGetters } from 'vuex'
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData()
    },
    computed:{
      ...mapGetters(['cartInfo']),
      cartInfoList(){
        return this.cartInfo.cartInfoList ||[]
      },
      totalPrice(){
        let sum = 0
        this.cartInfoList.forEach(cart => {
          // 判断商品是否被勾选
          if(cart.isChecked){
            sum += cart.cartPrice * cart.skuNum
          }
        });
        return sum
      },
      // 判断底部复选框是否勾选
      isAllChecked(){
        // 如果item中所有的isChecked都是1就返回true 有一个不是就返回FALSE
        return this.cartInfoList.every(item => item.isChecked===1)
    },
    },
    methods:{
      getData(){
        this.$store.dispatch("getCartList")
      },
      // 每次勾选或取消购物车商品都需要派发actions，告诉服务器你的修改
      //  勾选或者不勾选不只是让我们自己知道他有没有勾选，还需要告诉服务器
      // 这里我们只需要将skuId，isChecked传给服务器就好，后台已帮我们修改完了
     async changeisChecked(cart,event){
        let isChecked = event.target.checked ? "1":"0"
        try {
          await this.$store.dispatch('updateCartList',{skuId:cart.skuId,isChecked})
          this.getData()
        } catch (error) {
          alert(error.message)
        }
        
      },
      // 全选或全不选 需要告诉服务器，让服务器改
     async changeAll(event){
        try {
          let isChecked = event.target.checked?'1':'0'
          console.log(isChecked);
          await this.$store.dispatch('updateAllChecked',isChecked)
          this.getData()
        } catch (error) {
            alert(error.message)
        }
      },
      // 每次修改商品的数量是都会派发一次actions请求数据(节流)
      // 根据type的不同，就可以判断点击的是哪个，disNum的形参是什么
      handler: throttle(async function (type,disNum,cart) {
        // disNum形参：变化量（+1）  变化量（-1）  imput最终的个数（并不是变化量）
        // cart：哪一个产品
        if(type==='change'){
          // 判断disNum是否合法
          if(isNaN(disNum * 1)||disNum<1){
            disNum = 0
          }else{
            // 因为我们输入框输入的数字都算字符串，所以我们应该转换为数字
            disNum = parseInt(disNum) - cart.skuNum
          }
          // 向服务发请求修改数据 要注意这里的skuNum参数，他和之前加入购物车的参数有点不一样呢，
          // 后台是根据变化量来计算商品的个数的
          //  后台会根据这个输入的得到的skuNum的值，加上原先的skuNum，所以我们为了得到我们输入多少借给我们呈现多少
          //    我们还应该在这基础上减掉原先的skuNum 这里我们用num保存了一下
          
        }else if(type ==='minus'){
          disNum = cart.skuNum > 1 ? -1 : 0
        }
        try {
            // 代表修改成功
            await this.$store.dispatch('addOrUpdateShopCart',{skuId:cart.skuId,skuNum:disNum})
             // 必须要有下面的  不然你要刷新页面才会有更改后的数据
            this.getData()
          } catch (error) {
            
          }
      },500),
      
      // 删除 派发actions 
      async remove(cart){
        try {
           await this.$store.dispatch("removeCart",cart.skuId)
           this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 删除选中的商品
      async deleteChecked(){
        // this.cartInfoList.forEach(item=>{
        //   if(item.isChecked === 1){
        //     this.$store.dispatch('removeCart',item.skuId)
        //     this.getData()
        //   }
        // })
        // 这是老师的处理方法，老师是通过在actions派发removeCart的，我感觉我的方法也可以，
        try {
          await this.$store.dispatch('removeAllChecked')
          this.getData()
        } catch (error) {
          alert(error.message)
        }
        
      },
      // 结算订单
      // order(){
      //   this.$router.push({name:'trade'})
      // }
    }
  }
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>