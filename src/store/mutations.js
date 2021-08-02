import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'
export default {
  // addCart(state, payload) {
  //   // let oldProduct = null
  //   // for (let item of state.cartList) {
  //   //   if (item.iid === payload.iid) {
  //   //     oldProduct = item
  //   //   }
  //   // }
  //   let oldProduct = state.cartList.find(item => item.iid === payload.iid)
  //   if (oldProduct) {
  //     oldProduct.count += 1
  //   } else {
  //     payload.count = 1
  //     state.cartList.push(payload)
  //   }
  // }
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    // 一定是在模型的地方，模型该便界面才能该变
    // 修改模型对象，改变选中和不选中
    payload.checked = true
    state.cartList.push(payload)
  },

}
