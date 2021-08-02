<template>
  <div class="user-info">
    <div class="user">
      <img src="~assets/img/user/use.svg" alt="">
    </div>
    <div class="info">
      <div class="login">登录/注册</div>
      <div class="phone">
        <img src="~assets/img/user/iphone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="arrow">
      <img src="~assets/img/user/right-arrow.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name:"UserInfo",

}
</script>

<style scoped>
.user-info{
  display: flex;
  padding:15px;
  background-color: var(--color-tint);
}
.user{
  display: flex;
  /* flex: 1; */
  width: 60px;
  height: 60px;
  background-color: #eee;
  padding: 10px;
  border-radius: 50%;
}
.user img{
  width: 100%;
}
.info{
  display: flex;
  flex: 1;
  font-size: 14px;
  margin-left: 10px;
  color: #fff;
  flex-direction: column;
  justify-content: center;
}
.info .phone{
  display: flex;
  margin-top: 5px;
}
.info .phone img{
  width: 15px;
  margin-right: 3px;
}
.arrow{
  display: flex;
  /* flex: 1; */
}
.arrow img{
  width: 20px;
}
</style>