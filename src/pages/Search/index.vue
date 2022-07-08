<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-show="SearchParams.categoryName">
              {{ SearchParams.categoryName }}<i @click="removeCategroy">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-show="SearchParams.keyword">
              {{ SearchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-show="SearchParams.trademark">
              {{ SearchParams.trademark.split(":")[1]
              }}<i @click="removetrade">×</i>
            </li>
            <!-- 平台售卖属性的面包屑 -->
            <li
              class="with-x"
              v-for="(props, index) in SearchParams.props"
              :key="props.id"
            >
              {{ props.split(":")[1] }}<i @click="removeprops(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademark="trademark" @attrmark="attrmark" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isone }" @click="changeOrder('1')">
                  <a
                    >综合
                    <span v-show="isone" class="iconfont"  
                    :class="{'icon-long-arrow-up':isAsc,'icon-long-arrow-down':isDesc}"></span>
                    </a>
                </li>
                <li :class="{ active: istow }" @click="changeOrder('2')">
                  <a>价格 <span v-show="istow" class='iconfont' :class="{'icon-long-arrow-up':isAsc,'icon-long-arrow-down':isDesc}">
                    </span> </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to='`/detail/${goods.id}`'
                      ><img :src="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a 
                      target="_blank"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <Pagination @getPageNo='getPageNo' :pageNo='SearchParams.pageNo' :pageSize='SearchParams.pageSize' :total='total' :continues='5'/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      SearchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序
        // 1:desc
        order: "1:desc",
        // 分页器用的：代表的是当前是第几页
        pageNo: 1,
        // 每一页展示数据的个数
        pageSize: 10,
        // 平台售卖的属性
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  // 组件挂载完毕执行一次【仅仅执行一次】
  mounted() {
    // 再发请求之前带给服务器参数【searchParams参数发生变化】
    this.getData();
    this.$on("trademark", (data) => {});
  },
  // 当组件挂载完毕之前执行一次（先于mouted之前）
  beforeMount() {
    // 复杂的写法
    // this.SearchParams.category1Id = this.$route.query.category1Id
    // this.SearchParams.category2Id = this.$route.query.category2Id
    // this.SearchParams.category3Id = this$.route.query.category3Id
    // this.SearchParams.categoryName = this.$route.query.categoryName
    // this.SearchParams.keyword = this.$route.params.keyword
    // Object.assign:ES6新增语法，合并对象
    Object.assign(this.SearchParams, this.$route.query, this.$route.params);
  },
  computed: {
    // mapGetters里面的写法，传递数组，因为getters计算是没有划分模块的【home，search】
    ...mapGetters(["goodsList"]),
    isone() {
      return this.SearchParams.order.indexOf("1") !== -1;
    },
    istow() {
      return this.SearchParams.order.indexOf("2") !== -1;
    },
    isAsc(){
      return this.SearchParams.order.indexOf("asc")!==-1;
    },
    isDesc(){
      return this.SearchParams.order.indexOf("desc")!==-1;
    },
    ...mapState({
      // pageNo:state=>state.search.searchList.pageNo,
      // pageSize:state=>state.search.searchList.pageSize,
      totalPages:state=>state.search.searchList.totalPages,
      total:state=>state.search.searchList.total,
    })
  },
  methods: {
    // 向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    // 把这次请求封装为一个函数：当你需要在调用的时候调用即可
    getData() {
      this.$store.dispatch("getSearchList", this.SearchParams);
    },
    // 去除query参数
    removeCategroy() {
      // 带给服务器参数可有可无的：如果属性值为空的字符串还是会吧相应的字段带给服务器
      // 但是你把相应的字段变为undefined，当前这个字段不会带给服务器，这样就减少服务器的压力
      // this.SearchParams.categoryName = ''
      this.SearchParams.categoryName = undefined;
      this.SearchParams.category1Id = undefined;
      this.SearchParams.category2Id = undefined;
      this.SearchParams.category3Id = undefined;
      // 把带给服务器的参数置空了，还需要向服务器发请求
      this.getData();
      // 地址栏的也需要更改，将参数去掉，可以使用自己跳自己的路由的方法 也就是由有参数的search跳转到无参数的search下
      //    这也就相当于去除了query参数,但是不能删除了params参数
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      } else {
        this.$router.push({ name: "search" });
      }
      // 老师用的是上面的方式，我感觉下面的方法也是可以的
      // this.$router.push({name:'search',params:this.$route.params})
    },
    // 去除params参数
    removeKeyword() {
      this.SearchParams.keyword = undefined;
      this.getData();
      // 删除完后，input中的文本框应该清空，因为input文本框在componments的Header组件中
      //    我们可以用全局总线来让input清空
      // 通知Hearder置空keyword
      thisb.$us.$emit("clear");
      this.$router.push({ name: "search", query: this.$route.query });
    },
    // 去除品牌
    removetrade() {
      this.SearchParams.trademark = "";
      this.getData();
      this.$router.push({ name: "search", query: this.$route.query });
    },
    // 去除平台售卖属性的面包屑
    removeprops(index) {
      this.SearchParams.props.splice(index, 1);
      this.getData()
    },
    // 重点：为什么这里和下面用自定义事件最好呢，因为自定义事件可以传递props，和全局事件总线传递不了的参数
    //    因为这里要传递DOM元素内的数据就是v-for 遍历出来的数据，通过自定义事件可以再事件中带参数指定v-for遍历的出来的数据
    //    这是props和全局事件总线做不到的
    // 自定义事件
    trademark(trade) {
      // 整理品牌字段的参数 ID：品牌名称
      this.SearchParams.trademark = `${trade.tmId}:${trade.tmName}`;
      this.getData();
    },
    // 自定义事件
    attrmark(attr, attrv) {
      // ['属性ID：属性值：属性名']
      // 不能这么直接设置props的参数，因为这样就会使数组props一直是一个数据，我们应该知道每个事件的属性都不只一个
      //  这里我们按照品牌的属性搜索的东西肯定不止一个，就比如我想搜索运行内存8G + 机身内存128G + 颜色
      //    所以这里我们应该使用追加属性的方法
      // this.SearchParams.props = [`${attr.attrId}:${attrv}:${attr.attrName}`]
      let props = `${attr.attrId}:${attrv}:${attr.attrName}`;
      // 这里需要判断一下如果点的是统一属性中的属性值就应该是替代之前点击了属性值的props，而不是继续追加
      // 这里可以使用数组去重的方法
      if (this.SearchParams.props.indexOf(props) === -1) {
        this.SearchParams.props.push(props);
      }
      this.getData();
    },
    // 自定义事件---分页
    getPageNo(pageNo){
      this.SearchParams.pageNo = pageNo
      // 再次发请求
      this.getData()
    },
    // 改变order的数据，实现升序降序，升序降序逻辑，交给后端就好了，我们前端只负责传参数就好了
    changeOrder(flag){
      // flag形参：他是一个标记，代表用户电机的是综合（1） 价格（2） 【用户点击传进来的】
      let originFlag = this.SearchParams.order.split(':')[0]
      let originSort = this.SearchParams.order.split(':')[1]
      let newOrder = ''
      // 判断点击是综合还是价格
      if(originFlag === flag){
        newOrder = `${originFlag}:${originSort==='asc'?'desc':'asc'}`
      }else{
        // 因为默认是降序所以直接赋值desc
        newOrder = `${flag}:${'desc'}`
      }
      this.SearchParams.order = newOrder
      this.getData()
    },
  },
  watch: {
    // 用watch监听route属性，只要route的参数发生就会执行一次
    $route() {
      // 再次请求前整理带个服务器的参数
      Object.assign(this.SearchParams, this.$route.query, this.$route.params);
      this.getData();
      // 每一次请求完毕，应该把相应的1,2,3级分类的id置空，让他接受下一次相应的1,2,3级id
      // 分类名字与关键字不用清理，因为每一次路由变化的时候，都会给他赋予新的数据
      this.SearchParams.category1Id = "";
      this.SearchParams.category2Id = "";
      this.SearchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>