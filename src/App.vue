<template>
  <div id="nav">
    <!-- <router-view v-slot="{ Component }">
      <keep-alive>
      <router-view></router-view>
    </keep-alive>
    </router-view> -->
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail Category">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/context/mainTabbar/MainTabBar.vue";

export default {
  name: "app",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
