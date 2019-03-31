/*
 * 直接更新state各个状态
 */
import Vue from 'vue';
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'


export default {
  //踩坑：显示的名字注意不要写错 -- categorys
  [RECEIVE_ADDRESS] (state,{address}) {
      state.address = address
  },
  [RECEIVE_CATEGORYS] (state,{categorys}) {
      state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state,{shops}) {
      state.shops = shops
  },
  [RECEIVE_USER_INFO] (state,{userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },


  [RECEIVE_GOODS] (state,{goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state,{ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_INFO] (state,{info}) {
    state.info = info
  },

  [INCREMENT_FOOD_COUNT] (state,{food}) {
      if(!food.count){ // 第一次增加时 , 没有 count
      // food.count = 1 // 添加 count 属性 , 并指定为 1
      // 问题 : 新添加的属性没有数据劫持 ==> 数据绑定 ==> 更新了数据但界面不变
      //  this.count = 1;
        Vue.set(food, 'count', 1) // 给有数据绑定的对象添加指定属性名和值的属性 ( 有绑定 )
        //将food添加进cartFoods (只做一次，其他地方都能看见)
        state.cartFoods.push(food);
      } else {
        food.count++;
      }

  },
  [DECREMENT_FOOD_COUNT] (state,{food}) {
      if(food.count){
        food.count--;
        //将food从cartFoods中移除
        if(food.count===0) {
          // 将food从cartFoods中移除
          state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
        }
      }
  },
  [CLEAR_CART] (state) {
    //将所有的food中的count置为0
    state.cartFoods.forEach(food => food.count = 0);
    //清空购物车里面的food()购物项
    state.cartFoods = []
  },

  //searchShops
  [RECEIVE_SEARCH_SHOPS] (state,{searchShops}) {
    state.searchShops = searchShops
  },
}
