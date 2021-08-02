import {debounce} from './utils';
import BackTop from 'components/context/backTop/BackTop.vue';
import {POP, NEW, SELL} from './const'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener:null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 50);

    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    // console.log('lqq');
  },
}
// 混入在methods只能整个方法抽离，不能抽某一个语句，但是在生命周期函数里可以
export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop:false
    }
  },
  methods: {
    backTop(){
      this.$refs.scroll.scrollTo(0,0)
    },
  },
}

export const tabControlMixin = {
	data: function () {
		return {
			currentType: POP
		}
	},
	methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP
					break
				case 1:
					this.currentType = NEW
					break
				case 2:
					this.currentType = SELL
					break
			}
		}
	}
}