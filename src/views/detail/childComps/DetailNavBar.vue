<template>
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div class="title-item" v-for="(item,index) in titles" :key="index" :class="{active: index === currentIndex1}" @click="titleClick(index)">{{item}}</div>
        </div>
      </template>
    </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "DetailNavBar",
  components: { NavBar },
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex1:0
    }
  },
  methods: {
    titleClick(index){
      this.currentIndex1 = index
      this.$emit('titleClick', index);
    },
    backClick(){
      this.$router.back()
    }
  },
};
</script>item
<style scoped>
.title{
  display: flex;
  font-size: 13px;
  text-align: center;
}
.title-item{
  flex: 1;
}
.active{
  color:var(--color-high-text)
}
.back img{
  vertical-align: middle;
}
</style>


// 4.getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      // this.$nextTick(() => { }); // 下一帧 就是等图片渲染完，确保$el里面有值
        this.themeTopYs = [];

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
     
    });