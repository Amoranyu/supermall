import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // actions可以返回一个Promise
  addCart(context, payload) {
    // let oldProduct = null
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    // 如果你在vuex里面做了某个操作，你想让外面知道你完成了操作，就要用到primise
    return new Promise((reslove, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        //商品数量加一
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        reslove('当前商品数量+1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        // 添加新商品
        reslove('商品添加成功')
      }
    })
  }
}
