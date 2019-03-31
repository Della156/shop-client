<!--模板页面-->
<template>
  <section class="order">
    <HeaderTop title="订单列表"/>
    <section class="order_no_login" v-if="!userInfo._id">
      <img src="./images/person.png">
      <h3>登录后查看外卖订单</h3>
      <router-link class="button" :to="'/login'">
        立即登录
      </router-link>
    </section>
    <section v-else-if="cartFoods" class="order_login">
      <ul class="cartFood_list">
        <li class="cartFood_li border-1px" v-for="(cartFood,index) in cartFoods" :key="index"
            @click="$router.push('/cartFood')">
          <a>
            <div class="cartFood_left">
              <img class="cartFood_img" v-lazy="cartFood.image">
            </div>
            <div class="cartFood_right">
              <section class="cartFood_detail_header">
                <h4 class="cartFood_title ellipsis">{{cartFood.name}}</h4>
              </section>
              <section class="cartFood_rating_order">
                <section class="cartFood_rating_order_right">
                  <div class="rating_section">
                    ￥ {{cartFood.price}}
                  </div>
                  <div class="order_section">
                    数量 {{cartFood.count}}份
                  </div>
                </section>
              </section>

            </div>

          </a>
        </li>
      </ul>

    </section>
  </section>
</template>

/<!--逻辑代码-->
<script>
  import {mapState} from 'vuex';
  import BScroll from 'better-scroll';
  import HeaderTop from '../../components/HeaderTop/HeaderTop';
  import CartControl from '../../components/CartControl/CartControl';
  export default {
    computed:{
      ...mapState(['userInfo','cartFoods'])
    },
    watch: {
      //监视 cartFoods数据的变化
      cartFoods (value) {//cartFoods中有数据了
        this.$nextTick(() =>{
          this.$store.dispatch('getcartFoods');
        })
         new BScroll('.cartFood_list')
      }

    },
    //映射成标签
    components: {
      HeaderTop,CartControl
    },

  }
</script>

<!--样式文件-->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .order  //订单
    width 100%
    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >img
        display block
        width 100%
        height 30%
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
      >.button
        display inline-block
        background #02a774
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px
    .order_login
      padding-top 45px
      .cartFood_list
        .cartFood_li
          bottom-border-1px(#f1f1f1)
          width 100%
          >a
            clearFix()
            display block
            box-sizing border-box
            padding 15px 8px
            width 100%
            .cartFood_left
              float left
              box-sizing border-box
              width 23%
              height 75px
              padding-right 10px
              .cartFood_img
                display block
                width 100%
                height 100%
            .cartFood_right
              float right
              width 77%
              .cartFood_detail_header
                clearFix()
                width 100%
                .cartFood_title
                  float left
                  width 200px
                  color #333
                  font-size 16px
                  line-height 16px
                  font-weight 700
                  &::before
                    content '品牌'
                    display inline-block
                    font-size 11px
                    line-height 11px
                    color #333
                    background-color #ffd930
                    padding 2px 2px
                    border-radius 2px
                    margin-right 5px
                .cartFood_detail_ul
                  float right
                  margin-top 3px
              .cartFood_rating_order
                clearFix()
                width 100%
                margin-top 18px
                margin-bottom 8px
                .cartFood_rating_order_right
                  float right
                  font-size 23px
                  color #ff9a0d
                  .rating_section
                    float left
                    color #ff6000
                    margin-left 4px
                  .order_section
                    float left
                    color #666
                    transform scale(.8)



</style>
