<template>
  <!-- ref子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll, { PullDownRefresh } from "better-scroll";
import ObserveDOM from "@better-scroll/observe-dom";

BScroll.use(ObserveDOM);

export default {
  name: "Scroll",
  // props用来接收父组件传给子组件的数据
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1.创建BScroll对象
    // 如果ref绑定在组件中，那么this.$refs.name获取到的是一个组件对象   如果是在普通元素中，那么this.$refs.name获取到的是一个元素对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true, // 开启 observe-dom 插件  解决局部不能滚动
      observeImage: true, // 解决BSscroll的上拉拉不动的bug
      click: true, // button无论是否设置都可以点击 但是其他标签就要设置才可以点击
      probeType: this.probeType, // probeType是否派发 scll 事件
      pullUpLoad: this.pullUpLoad,
      // refresh()
    });

    // 2.监听滚动的位置
    // 这里要用箭头函数
    // 子组件可以使用 $emit 触发父组件的自定义事件。
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }

    // 3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // 上拉加载更多
        // console.log('上拉 加载更多');
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      // 这个判断是为了解决refresh找不到的问题
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    refresh() {
      // console.log("------");
      this.scroll && this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll ?  this.scroll.y : 0
    }
  },
};
</script>

<style>
</style>