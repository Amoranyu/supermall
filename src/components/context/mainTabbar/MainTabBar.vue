<template>
  <tab-bar>
    <tab-bar-one path="/home" activeColor="#fe5f7e">
      <template v-slot:one-icon>
        <img src="~assets/img/tabbar/home.png" alt />
      </template>
      <template v-slot:one-icon-active>
        <img src="~assets/img/tabbar/home_active.png" alt />
      </template>
      <template v-slot:one-text>
        <div>首页</div>
      </template>
    </tab-bar-one>
    <tab-bar-one path="/category">
      <template v-slot:one-icon>
        <img src="~assets/img/tabbar/category.png" alt />
      </template>
      <template v-slot:one-icon-active>
        <img src="~assets/img/tabbar/category_active.png" alt />
      </template>
      <template v-slot:one-text>
        <div>分类</div>
      </template>
    </tab-bar-one>
    <tab-bar-one path="/cart" activeColor="deepPink">
      <template v-slot:one-icon>
        <img src="@/assets/img/tabbar/cart.png" alt />
      </template>
      <template v-slot:one-icon-active>
        <img src="~assets/img/tabbar/cart_active.png" alt />
      </template>
      <template v-slot:one-text>
        <div>购物车</div>
      </template>
    </tab-bar-one>
    <tab-bar-one path="/profile">
      <template v-slot:one-icon>
        <img src="~assets/img/tabbar/profile.png" alt />
      </template>
      <template v-slot:one-icon-active>
        <img src="~assets/img/tabbar/profile_active.png" alt />
      </template>
      <template v-slot:one-text>
        <div>我的</div>
      </template>
    </tab-bar-one>
  </tab-bar>
</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar.vue";
import TabBarOne from "@/components/common/tabbar/TabBarOne.vue";
export default {
  components: {
    TabBar,
    TabBarOne,
  },
  name: "MainTabBar",
};
</script>

<style>
</style>
