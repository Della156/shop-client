/*
* 入口Js
*/

import Vue from 'vue';
import App from './App';
//引入路由
import router from './router';
import store from './store';
import {Button} from 'mint-ui';
import VueLazyload from 'vue-lazyload';
import './mock/mockServer';//加载mockServer
import loading from './common/imgs/loading.gif';
import './filters'; //加载过滤器

// 注册全局组件
Vue.component(Button.name, Button); //<mt-button>

Vue.use(VueLazyload, {//内部自定义一个指令lazy
  loading
})

new Vue({
  el: '#app',
  render: h => h(App),
  //映射路由
  router, //使用上Vue-Router
  store //使用上Vuex
})
