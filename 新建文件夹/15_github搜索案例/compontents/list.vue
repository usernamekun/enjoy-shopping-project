<template>
  <div class="row">
    <div
      v-show="info.users.length"
      v-for="user in info.users"
      :key="user.login"
      class="card"
    >
      <a :href="user.html_url" target="_blank">
        <!-- : 动态绑定 -->
        <img :src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{ user.login }}</p>
    </div>
    <!-- 展示初次页面 -->
    <h1 v-show="info.isFirst">欢迎来到这里!</h1>
    <!-- 展示加载中页面 -->
    <h1 v-show="info.isLoading">Loading...</h1>
    <!-- 展示错误信息 -->
    <h1 v-show="info.errmsg">{{ info.errmsg }}</h1>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      info: {
        isFirst: true,
        isLoading: false,
        errmsg: "",
        users: [],
      },
    };
  },
  //接收数据
  mounted() {
    this.$bus.$on("getUsers", (usersObj) => {
      // console.log(usersObj)
    //   合并useronj和info中的属性
      this.info = {...this.info,...usersObj}
    });
  },
};
</script>

<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>