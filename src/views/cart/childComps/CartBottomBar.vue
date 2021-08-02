<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-botton"
        @click="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计:</span>
      {{ totalPrice }}
    </div>
    <div class="calculate" @click="calcClick">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/context/checkButton/CheckButton.vue";
export default {
  components: { CheckButton },
  name: "CartButtomBar",
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((perVlaue, item) => {
            return perVlaue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // if(this.$store.state.cartList.length === 0) return false
      // 第一种方案(filter)
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      // 第二种方案(find)
      // return !this.$store.state.cartList.find(item => !item.checked)
      // 第三种方案普通遍历
      // if (this.$store.state.cartList.length === 0) return false;
      // for (let item of this.$store.state.cartList) {
      //   if (!item.checked) {
      //     return false;
      //   }
      // }
      // return (isChecked = true);
      // every()如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
      if(this.$store.state.cartList.length === 0) return false
      return this.$store.state.cartList.every(item => item.checked)
    },
  },
  methods: {
    checkClick(){
      // console.log('点击了');
      if(this.isSelectAll){ // 全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{ // 部分或全部不选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        // this.$toast.show('请选择购买的商品',2000)
        this.$toast.success({
          message:'请选择购买的商品',
          duration:2000,
          overlay:true,
          closeOnClickOverlay:true
        });
      }else{
        this.$toast.loading({
          message:'请稍等',
          duration:2000,
          overlay:true,
          closeOnClickOverlay:false
        });
      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  background-color: #eee;
  /* justify-content: space-between; */
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-botton {
  width: 18px;
  height: 18px;
  line-height: 18px;

  margin-right: 5px;
}
.check-content span {
  font-size: 13px;
}
.total-price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  flex: 1;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>