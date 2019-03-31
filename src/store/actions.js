/*
 * 通过mutations间接更新state状态对象
 */

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

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqlogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqSearchShops
} from '../api'

export default {
  // 1. 异步获取地址
  async getAddress ({commit,state}) {
    const geoshash = state.latitude +','+ state.longitude; //有顺序，--->纬度,经度
    const result = await reqAddress(geoshash);
    if(result.code === 0){
      const address = result.data;
      //commit(RECEIVE_ADDRESS,{address:result.data});
      commit(RECEIVE_ADDRESS,{address});
    }
  },

  // 2. 异步获取分类列表
  async getCategorys ({commit}) {
    const result = await reqFoodCategorys();
    if(result.code === 0){
      const categorys = result.data;
      commit(RECEIVE_CATEGORYS,{categorys});
    }
  },

  // 3. 异步获取分类列表
  async getShops({commit,state}) {
    const {longitude,latitude} = state;
    const result = await reqShops(longitude,latitude);
    if(result.code === 0){
      const shops = result.data;
      commit(RECEIVE_SHOPS,{shops});
    }
  },

  //同步记录用户信息
  recordUser ({commit},userInfo) {
    commit(RECEIVE_USER_INFO,{userInfo});
  },
  //异步会话(保证自动登录)
  async getUserInfo ({commit}) {
    const result = await reqUserInfo();
    if(result.code === 0){
        const userInfo = result.data;
        commit(RECEIVE_USER_INFO,{userInfo});
    }
  },
  //异步登出
  async logout ({commit}) {
    const result = await reqlogout();
    if(result.code === 0){
      commit(RESET_USER_INFO);
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit},callback) {
    const result = await reqShopGoods();
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods});
      //数据更新了通知一下组件
      callback && callback();
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit},callback) {
    const result = await reqShopRatings();
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings});
      //数据更新了通知一下组件
      callback && callback();
    }
  },

  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if(result.code===0) {
      const info = result.data;
      commit(RECEIVE_INFO, {info});
    }
  },

  //同步更新数量count
  updateFoodCount ({commit},{isAdd,food}) {
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT, {food});
    } else {
      commit(DECREMENT_FOOD_COUNT, {food});
    }

  },

  //同步清空购物车
  clearCart ({commit}) {
    commit(CLEAR_CART)

  },

  // 异步获取搜索的商品信息
  async searchShops ({commit,state},keyword) {
    const geoshash = state.latitude +','+ state.longitude; //有顺序，--->纬度,经度
    const result = await reqSearchShops(geoshash,keyword)
    if(result.code===0) {
      const searchShops = result.data;
      commit(RECEIVE_SEARCH_SHOPS, {searchShops});
    }
  },

}

