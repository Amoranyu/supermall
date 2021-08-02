<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{ length }})</div>
      </template>
    </nav-bar>
    
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue';
import NavBar from "components/common/navbar/NavBar.vue";

import CartList from "./childComps/CartList.vue";
import CartBottomBar from './childComps/CartBottomBar.vue';

import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  name: "Cart",
  activated() {
    this.$refs.scroll.refresh();
  },
  computed: {
    // cartLength(){
    //   return this.$store.getters.cartList.length
    // }
    // 两种语法
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
.cart {
  /* position: relative; */
  /* z-index: 9; */
  background: #fff;
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.content {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>