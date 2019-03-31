<!--模板页面-->
<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id?'/userinfo':'/login'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <!--难点：我们要通过一维数组生成二维数组-->
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination 分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<!--逻辑代码-->
<script>
  import {mapState} from 'vuex';
  //引入滑动插件
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  import HeaderTop from '../../components/HeaderTop/HeaderTop';
  import ShopList from '../../components/ShopList/ShopList';
  export default {
    data () {
      return {
        baseImgUrl:'https://fuss10.elemecdn.com'
      }
    },
    mounted () {
      //分发一个请求
      this.$store.dispatch('getCategorys');
      this.$store.dispatch('getShops')
    },
    computed: {//计算属性
      ...mapState(['address','categorys','userInfo']),//读取数据

      categorysArr () {
        const {categorys} = this;
        //准备一个二维数组
        let arr = [];
        //准备一个存放分类数据的数组
        let minArr = [];
        //遍历categorys
        categorys.forEach(c => {
          //判断如果minArr===8则重新准备一个minArr
          if(minArr.length === 8){
              minArr = [];
          }
          //如果minArr.length为0，则添加到大数组中去
          if(minArr.length === 0){
              arr.push(minArr);
          }
          minArr.push(c);
        })
        return arr;
      }

    },
    watch: {
      //监视 categorys数据的变化
      categorys (value) {//category中有数据了
      //使用Swiper显示轮播, 在延迟到界面更新之后创建Swiper对象
        this.$nextTick(() =>{
          //创建一个Swiper 实例对象，来实现轮播
          new Swiper('.swiper-container',{
            loop:true,//可以循环轮播
            autoplay: true, //自动播放
            effect : 'slide',//切换效果--方块
            pagination: {
              //如果需要分页器
              el:'.swiper-pagination'
            }
          })
        })


      }

    },
    //映射成标签
    components: {
      HeaderTop,
      ShopList
    }
  }
</script>

<!--样式文件-->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #b74747
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
