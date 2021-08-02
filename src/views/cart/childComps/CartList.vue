<template>
  <div class="cart-list">
    <!-- 导航 -->
    <cart-list-item
      v-for="(item, index) in cartList"
      :key="index"
      :item-info="item"
    ></cart-list-item>

    
    <!-- 商品的列表 -->

    <!-- 底部汇总 -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CartListItem from "./CartListItem.vue";

export default {
  components: { CartListItem },
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style scoped>
</style>