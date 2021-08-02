<template>
  <div id="category">
    <nav-bar class="goory-nav">
      <template v-slot:center>
        <div>
          商品分类
        </div>
      </template>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem" />
      <Scroll
        id="tab-content"
        ref="scroll"
        :probe-type="3"
        @scroll="contentScroll"
      >
        
          <tab-content-category
            :subcategories="showSubcategory"
            @imagesLoad="imagesLoad"
          />
          <tab-control :titles="['综合', '新品', '销量']"
            @tabClick="tabClick"
            class="tab-control"></tab-control>
          <goods-list :goods="showCategoryDetail"></goods-list>

      </Scroll>
    </div>
    <back-top @click="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/context/tabControl/TabControl.vue";
import GoodsList from 'components/context/goods/GoodsList.vue';

import { POP, NEW, SELL } from "common/const";
import { tabControlMixin, backTopMixin, itemListenerMixin } from "common/mixin";

import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory.vue";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category";


export default {
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    TabControl,
    GoodsList
  },
  name: "Category",
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1
    };
  },
  created() {
    this._getCategory();
  },
  updated() {
    this.$refs.scroll.refresh();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    }
  },
  mixins: [tabControlMixin, backTopMixin, itemListenerMixin],
  methods: {
    _getCategory() {
      getCategory().then(res => {
        console.log(res);
        this.categories = res.data.category.list;
        // 初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then(res => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },
    _getCategoryDetail(type) {
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then(res => {
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    selectItem(index) {
      this._getSubcategories(index);
    },
    contentScroll(position) {
      //1.判断BackTop是否出现
      this.isShowBackTop = -position.y > 1000;
    },
    imagesLoad() {
      this.$refs.scroll.refresh();
      
    }
  }
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.goory-nav {
  background: var(--color-tint);
  color: white;
  font-weight: bold;
  z-index: 99;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
  overflow: hidden;
}
#tab-content {
  height: 100%;
  flex: 1;
  overflow: hidden;
  line-height: 100%;
}
.tab-control {
  background: white;
  color: #000;
}
</style>

















