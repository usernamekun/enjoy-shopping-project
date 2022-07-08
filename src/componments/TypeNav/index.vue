<template>
  <!-- 商品分类导航 -->
  <div class="typeNav">
    <!-- 事件的委派 -->
    <div class="container" @mouseleave="hiden">
      <h2 @mouseenter="isShow" class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div v-show="show" class="sort">
        <!-- 利用事件的委派+编程式导航实现路由的跳转 -->
        <div class="all-sort-list2" @click="goSearch">
          <div
            v-for="(c1, index) in categroyList"
            :key="c1.categoryId"
            class="item"
            :class="{ cur: currentIndex === index }"
          >
            <h3 @mouseenter="currentChange(index)">
              <!-- 声明试导航 router-link是一个组件 组件如果很多很大的话  会导致出现卡顿现象  所以这里我们不用 
                                        这里使用编程式导航
                                -->
              <!-- <router-link to="search">{{c1.categoryName}}</router-link> -->
              <a
                :data-categoryName="c1.categoryName"
                :data-category1id="c1.categoryId"
                >{{ c1.categoryName }}</a
              >
            </h3>
            <!-- 使用js的语法让其二三级动态显示与隐藏的操作 -->
            <div
              class="item-list clearfix"
              :style="{ display: currentIndex === index ? 'block' : 'none' }"
            >
              <div
                v-for="c2 in c1.categoryChild"
                :key="c2.categoryId"
                class="subitem"
              >
                <dl class="fore">
                  <dt>
                    <a
                      :data-categoryName="c2.categoryName"
                      :data-category2id="c2.categoryId"
                      >{{ c2.categoryName }}</a
                    >
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a
                        :data-categoryName="c3.categoryName"
                        :data-category3id="c3.categoryId"
                        >{{ c3.categoryName }}</a
                      >
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入方式是将lodash所有的功能引入进来
// import _ from 'lodash'
// 我们最好使用按需引入
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    // 鼠标移入修改响应式数据currentIndex的属性
    currentChange: throttle(function (index) {
      // throttle  节流回调函数  在50ms内只能触发一次
      // throttle回调函数别用箭头函数可能出现上下文this
      // 正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
      // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
      // 就是由于用户行为过快，导致浏览器反应不过来，如果当前回到函数中有一些大量业务，有可能出现卡顿现象
      this.currentIndex = index;
    }, 50),
    // 进行路由的跳转，使用编程式导航最好吧href的值设为#
    goSearch(event) {
      // 最好的解决方案是：编程式导航+事件的委派
      // 利用事件的委派存在一些问题：1.点击不能确保一定是a标签2.事件的委派是吧全部的子节点（h3,dt,dl,em)的事件都委派给父亲节点
      // 3.存在另一个问题,即使你确定点击的是a标签,如何区分是一级/二级/还是三级a标签
      // 第一个问题:把子节点当中的a标签,加上一个data-categoryName属性,其余的子节点没有这个属性
      let element = event.target;
      // 获取到当前触发这个事件的节点【h3,a,dt,dl]，需要带有data-categoryName这个节点
      // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset; //解构赋值 element.dataset 属性不止一个自定义属性
      // 如果标签上拥有categoryname 一定是a标签
      if (categoryname) {
        // 区分一级，二级，三级的a标签
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 如果有category1id一定是一级a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 合并query和params参数 input搜索框中的文字是params参数
        // 动态location添加query属性
        location.query = query;
        this.$router.push(location);
      }
    },
    isShow() {
      //鼠标移上去三级联动需要隐藏
      //下面代码只有在serach模块的时候，才会执行
      // if (this.$route.path != "/home") {
      //   this.show = true;
      // }
      this.show = true;
    },
    hiden() {
      // 鼠标移出后，让currentIndex重新等于-1，让其失去cur样式
    //   this.currentIndex = -1;
    //   if (this.$route.name === "search") {
    //     this.show = false;
    //   }
    //鼠标移出的时候，三级联动的一级菜单没有背景颜色
      this.currentIndex = -1;
      //需要把三级联动展示出来
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
  // 当页面挂载完毕 向服务器发起请求
  mounted() {
    // 在这里向服务器发请求 会存在一个问题，每当有组件使用到这个TypeNav这个组件的时候，都会向服务器发送一次请求
    //      比如从/home切换到/search /search切换到/home  都会向服务器发送请求，这种行为是不好的，所以我们可以将向
    //          服务器发起的请求的行为放在App.vue中，这样就可以无论怎么切换都只发一次请求,TypeNav想要数据直接去state中拿就可以
    // this.$store.dispatch('categroyList')
    // 当从home进入到search路径中 页面会重新挂载一次  这时候可以让show为false 让search中的三级联动隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    // ...mapState(['categroyList'])
    ...mapState({
      categroyList: (state) => state.home.categroyList,
    }),
  },
};
</script>
<style scoped lang=less>
.typeNav {
  border-bottom: 2px solid #e1251b;
  a {
    /* 鼠标移入箭头变为手 */
    cursor: pointer;
  }
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;
              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;
                &.fore {
                  border-top: 0;
                }
                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }
                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;
                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          /* &:hover{
                            .item-list{
                                display:block;
                            }
                        } */
        }
      }
    }
  }
  .cur {
    background-color: rgb(103, 184, 250);
  }
}
</style>