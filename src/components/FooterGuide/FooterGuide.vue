
<!--
  1.通过编程式导航实现路由的切换显示($router 路由器对象) 跳转
  2.通过 动态class 和 $route.path($route 当前路由对象，包含当前路由信息) 来实现tab样式切换
  3.通过阿里图标库，显示导航图标
-->

<template>
  <div class="footer_guide">
                                        <!--动态获取 on 来改变你选中图标的颜色-->
    <span class="guide_item" :class="{on: '/msite'===$route.path}" @click="goTo('/msite')">
      <span class="item_icon">
        <i class="iconfont icon-WholeFoods"></i>
      </span>
      <span>外卖</span>
    </span>
    <span class="guide_item" :class="{on: '/search'===$route.path}" @click="goTo('/search')">
      <span class="item_icon">
        <i class="iconfont icon-search1"></i>
      </span>
      <span>搜索</span>
    </span>
    <span class="guide_item" :class="{on: '/order'===$route.path}" @click="goTo('/order')">
      <span class="item_icon">
        <i class="iconfont icon-dingdan1"></i>
      </span>
      <span>订单</span>
    </span>
    <span class="guide_item" :class="{on: '/profile'===$route.path}" @click="goTo('/profile')">
      <span class="item_icon">
        <i class="iconfont icon-ren"></i>
      </span>
      <span>我的</span>
    </span>
  </div>
</template>

<script type="text/es-6">
  export default {
    methods: {
      goTo (path) {
        //$router 有很多功能函数去实现路由之间的跳转
        this.$router.replace(path);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #ef4f4f
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
