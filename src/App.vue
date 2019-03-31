<template>
  <div id="app">
    <router-view />
    <!--控制FooterGuide组件的显隐 rouer/index.js-->
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import FooterGuide from './components/FooterGuide/FooterGuide';

  export default {
    mounted () {
     this.getAddress();
     this.getUserInfo();
    },
    methods: {
      ...mapActions(['getAddress','getUserInfo'])//读数据
    },
    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
