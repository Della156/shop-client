<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(sc,index) in starClasses" :key="index" :class="sc"></span>
  </div>
</template>

<script>
  //定义常量
  const CLASS_ON = 'on';
  const CLASS_HALF = 'half';
  const CLASS_OFF = 'off';
  export default {
    props:{
      //:score="shop.rating" :size="24"
      score:Number,
      size:Number
    },
    computed:{
      starClasses () {

        const scs = [];
        const {score} = this;
        const scoreInteger = Math.floor(score);
        for (let i = 0; i < scoreInteger; i++) {
          scs.push(CLASS_ON);
        }
        if(score*10-scoreInteger*10>=5){
           scs.push(CLASS_HALF);
        }
        while(scs.length<5){
            scs.push(CLASS_OFF);
        }

      return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48 // 48尺寸的星星
      .star-item // 每一个星星的基本css信息
        width 20px
        height 20px
        margin-right 22px // 每一个星星dom都有外边距
        background-size 20px 20px
        &:last-child // 最后一个的外边距就是0
          margin-right: 0
        &.on // 全星状态的class
          bg-image('./images/star48_on')
        &.half // 半星状态的class
          bg-image('./images/star48_half')
        &.off // 无星状态的class
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
