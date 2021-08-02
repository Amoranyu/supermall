import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import bus from './bus'
import 'vant/lib/index.css';

import FastClick from 'fastclick'
import VueLazyLoad from 'vue3-lazy'

const app = createApp(App)
app.config.globalProperties.$bus = bus

// 解决移动端300ms延迟
FastClick.attach(document.body)

// Vue.prototype.$bus = new Vue()
app.use(store).use(router).use(Vant).use(VueLazyLoad,{
    error: require('@/assets/img/lazy/lll.gif'),//当加载图片失败的时候
    loading: require('@/assets/img/lazy/amor.png'),//当加载图片成功的时候
    preLoad:1  //设置图片显示比例
}).mount('#app')
    // new Vue({
    //   render:h=> h(App),
    //   router,
    //   store,
    //   router
    // }).$mount('#app')