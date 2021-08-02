<template>
  <div class="account">
    <div class="account-item">
      <div class="number">
        <span class="balance">0.00</span>元
      </div>
      <div class="account-info">
        我的余额
      </div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">0</span>个
      </div>
      <div class="account-info">
        我的优惠
      </div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">0</span>分
      </div>
      <div class="account-info">
        我的积分
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AccountInfo",
};
</script>

<style scoped>
.account{
  height: 100px;
  display: flex;
  background-color: white;
}
.account-item{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #f2f2f2;
  font-size: 16px;
}
.balance{
  color: #ff603e;
  font-weight: 700;
  font-size: 20px;
}
</style>