<template>
  <div class="back-top" @click="backClick">
    <img src="~assets/img/common/top.png" alt="返回顶部">
  </div>
</template>

<script>
export default {
  name:'BackTop',
}
</script>

<style>
  .back-top{
    position: fixed;
    right: 8px;
    bottom: 55px;
  }
  .back-top img{
    width: 43px;
    height: 43px;
  }
</style>