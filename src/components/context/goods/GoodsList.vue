<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item" :goodsItem="item" />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  name:'GoodsList',
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      defult(){
        return []
      }
    }
  }
}
</script>

<style>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }


</style>