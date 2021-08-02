<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>我的档案</div>
      </template>
    </nav-bar>
    <user-info></user-info>
    <account-info></account-info>
    <normal-list-view :list-data="orderList"></normal-list-view>
    <normal-list-view :list-data="serviceList"></normal-list-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import UserInfo from './childComps/UserInfo.vue';
import AccountInfo from './childComps/AccountInfo.vue';
import NormalListView from './childComps/NormalListView.vue';

export default {
  name: "Profile",
  data() {
    return {
      orderList:[
        {icon:"message.svg",info:"我的消息"},
        {icon:"pointer.svg",info:"积分商城"},
        {icon:"vip.svg",info:"会员卡"},
      ],
      serviceList: [
        { icon: "cart.svg", info: "我的购物车" },
        { icon: "shopping.svg", info: "下载购物APP" }
      ]
    };
  },
  components: {
    NavBar,
    UserInfo,
    AccountInfo,
    NormalListView,
  },
  
};
</script>

<style scoped>
.profile{
   background: #f2f2f2;
}
.profile .nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>