<template>
  <div class="shop-item">
    <div class="item-selector">
    <check-button :is-checked="itemInfo.checked" @click="checkClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ itemInfo.price }}</div>
        <div class="item-count right">x{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/context/checkButton/CheckButton.vue';

export default {
  components: { CheckButton },
  name: "CartListItem",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkClick(){
      this.itemInfo.checked = !this.itemInfo.checked
    }
  },
};
</script>

<style scoped>
.shop-item {
  width: 100%;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  /* 去掉元素之间的空隙或错位的方法 */
  font-size: 0;
}
.item-selector{
  width: 20px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 70px;
  height: 90px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 15px;
  color: #333;
  padding: 5px 8px;
  position: relative;
  overflow: hidden;
}
.item-info .item-desc{
  font-size: 12px;
  color: #666;
  margin-top: 12px;
}
.item-title,.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info-bottom{
  /* margin-top: 8px; */
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
}
.info-bottom .item-price{
  color: orange;
}
</style>