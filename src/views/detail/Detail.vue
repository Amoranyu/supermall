<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="param"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addClick="addToCart"></detail-bottom-bar>
    <back-top @click="backTop" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from './childComps/DetailBottomBar.vue';

import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/context/goods/GoodsList.vue";
// import Toast from 'components/common/toast/Toast.vue';

import { itemListenerMixin,backTopMixin } from "common/mixin";
import { mapActions } from 'vuex'
import { debounce } from "common/utils";
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
import ToastVue from '../../components/common/toast/Toast.vue';


export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      navBar: [],
      currentIndex: 0,
      // message:'',
      // show:false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },
  created() {
    // 1.保存传入的id
    // console.log(this.$route.params);
    this.iid = this.$route.params.iid;

    // 2.根据id请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      // 1.获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.获取店铺信息
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取评论的信息
      // if (data.rate.CRate != 0) {
      //   this.commentInfo = data.rate.list[0];
      // }
      data.rate.cRate ? (this.commentInfo = data.rate.list[0]) : {};
      // 1.第一次获取值不对
      // offsetTop值不对，this.$refs.param.$el没有渲染
      // this.themeTopYs = [];

      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);

      // this.$nextTick(() => {
      //   // 2.第二次获取，值不对是因为图片没有计算在内
      //   // 根据最新的数据，对应的DOM是已经被渲染出来
      //   // 但是图片依然是没有加载完(目前获取到的offsetTop不包含图片的)
      //   // offsetTop值不对，都是因为图片的问题
      //   setTimeout(() => {
      //     this.navBar = this.$refs.bar.$el.offsetHeight;
      //     this.themeTopYs = [];

      //     this.themeTopYs.push(0);
      //     this.themeTopYs.push(this.$refs.param.$el.offsetTop - this.navBar);
      //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop - this.navBar);
      //     this.themeTopYs.push(
      //       this.$refs.recommend.$el.offsetTop - this.navBar
      //     );
      //     console.log(this.themeTopYs);
      //   }, 2000);
      // });
    });
    // 3.请求详情数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.navBar = this.$refs.nav.$el.offsetHeight;
      this.themeTopYs = [];

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - this.navBar);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - this.navBar);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - this.navBar);
      this.themeTopYs.push(Number.MAX_VALUE); // Number.MAX_VALUE ES6里定义的最大值
      // console.log(this.themeTopYs);
    });
  },
  mixins: [itemListenerMixin,backTopMixin],
  mounted() {
    // console.log(this.itemImgListener);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
      
    },
    titleClick(index) {
      // // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // mapActions得映射关系
    ...mapActions(['addCart']),
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
       
      // 2.将商品添加到购物车里
      // this.$store.cartList.push(product)
      // this.$store.commit('addToCart',product)
      this.addCart(product).then(res => {
        // console.log(res);
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        // this.message = '';
        // }, 1500);
        // this.$toast.show(res,2000)
         this.$toast.success({
          message:res,
          duration:2000,
          overlay:true,
          closeOnClickOverlay:true
        });
      })
      // this.$store.dispatch("addCart", product).then(res =>{
      //   console.log(res);
      // })
    },
    contentScroll(position) {
      // console.log(position);
      // 1.获取y值
      const positionY = -position.y;

      // 2.positionY和主题中值进行对比
      // [0,7938,9120,9452]

      // positionY 在 0 和 7938 之间, index = 0
      // positionY 在 7938 和 9120 之间, index = 1
      // positionY 在 9120 和 9452 之间, index = 2
      // positionY 大于9452, index = 3

      // for (let i in this.themeTopYs) {
      // console.log(i);
      // 如果直接使用i的话，他是一个str类型所以要用常用的for循环
      //   if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
      //     console.log(i);
      // }
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // this.currentIndex !== i 是不让他打印那么频繁
        // if ((this.currentIndex !== i) && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i;
        //   // console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }

        if (this.currentIndex !== i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          this.currentIndex = i;
          // console.log(i);
            this.$refs.nav.currentIndex1 = this.currentIndex;
          
        }
        // 3.是否返回顶部
        this.isShowBackTop = -position.y > 1000;
      }
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 11;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.van-toast{
  width: 100%;
}
</style>