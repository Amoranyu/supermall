import Vue from 'vue'
import Toast from './Toast'

const obj = {}

obj.install = function(Vue){
  // console.log('执行了obj得install函数',app);
  // document.body.appendChild(Toast.$el)
  // app.prototype.$toast = Toast;
  // const toastConstructor = appconst
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()
  // 3.将组件对象，手动挂载到某个元素上
  toast.$mount(document.createElement("div"));
  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)
}

export default obj