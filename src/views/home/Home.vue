<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <!-- :probe-type="3"必须是冒号，如果不加就当作是字符串 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- click.native监听组件 -->
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/context/tabControl/TabControl";
import GoodsList from "components/context/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/context/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0,
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mixins:[itemListenerMixin], // 混入就是把相同的代码提取出来
  mounted() {
    // let refresh = debounce(this.$refs.scroll.refresh, 50);
    // 3.监听item中图片加载完成

    // this.itemImgListener = () => {refresh();}
    // this.$bus.$on("itemImageLoad", this.itemImgListener
      // console.log("--------aa");
      // this.$refs.scroll && this.$refs.scroll.refresh();
      
    // );
    // console.log(this.itemImgListener);
  },
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    // 进入的时候
    // console.log('activated');
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    
  },
  deactivated() {
    // 离开的时候
    // 1.保存Y值
    // console.log('deactivated');
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  // 方法每调用一次都会执行一次，而计算属性，在第一次调用时，会执行一次，之后再调用时，不会再执行，数据已经被放到了缓存里面
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    // 事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backClick() {
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      // this.$refs.scroll获取的是Scroll组件
      this.$refs.scroll.scrollTo(0, 0);
    },

    contentScroll(position) {
      // console.log(position);
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    loadMore() {
      // console.log('加载');
      this.getHomeGoods(this.currentType);
    },
    // debounce(func, delay){
    //   let timer = null
    //   return function(...args){
    //     if(timer) clearInterval(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this,args) // 用apply改变了谁来调func也就是this指向refresh
    //     }, delay);
    //   }
    // },

    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el：用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
/* scoped作用域，只在当前文件有用 */
#home {
  /* padding-top: 44px; */
  /* position: relative; */
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
  font-weight: 700;
  height: 44px;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1; */
}
/* .tab-control {
  position: sticky; sticky这个属性是一个吸顶操作
  top: 43px;
  z-index: 1;
} */
/* vh是视口的高度 */
/* .content{
  height: calc(100vh - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 1;
}
</style>