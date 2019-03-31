<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">深夜食堂</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone"><!--rightPhone是一个布尔值-->
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">
                {{computeTime > 0 ? `已发送(${computeTime}s)`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" @click="showPwd = !showPwd" :class="showPwd ? 'on':'off'">
                  <div class="switch_circle" :class="{right:showPwd}" ></div>
                  <span class="switch_text">{{showPwd ? 'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                  @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-aui-icon-back"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText"  v-show="showAlert" @closeTip="closeTip"/>
  </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip';
  import {reqPwdLogin,reqSendCode,reqCodeLogin} from '../../api'
  export default {
    data () {
      return {
        loginWay:false,  //登录方式：true表示短信登录，false表示密码登录
        phone:'',       //手机号码
        code:'',        //短信验证码
        computeTime: 0, //计时剩余时间
        showPwd:false,  //是否显示密码
        name:'',        //用户名
        pwd:'',         //密码
        captcha:'',     //图形验证码
        alertText:'',    //警告框提示文字
        showAlert:false  //是否显示警告框
      }
    },
    computed: {
      rightPhone () {
        return /^1\d{10}$/.test(this.phone) //返回一个布尔值
      }
    },
    methods: {
      //异步获取短信
      async getCode () {
        //到计时
        if(this.computeTime === 0){
          this.computeTime = 30;
          this.intervalId = setInterval(() =>{
            this.computeTime--;
            if(this.computeTime<=0){
              clearInterval(this.intervalId)
            }
          },1000);
        }
        //发送ajax请求(向指定手机号码发送验证码)
        const result = await reqSendCode(this.phone);
        if(result.code === 1){
           //显示提示
          this.AlertShow(result.msg);
          //停止计时
          if(this.computeTime>0){
            this.computeTime = 0;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
          }
        }

      },
      //异步登录
      AlertShow (alertText) {
        this.showAlert = true;
        this.alertText = alertText;
      },

      async login () {
        let result;
        //判断是哪种登录方式
        if(this.loginWay){ //短信登录
          const {rightPhone,code,phone} = this;
            if(!rightPhone){
                //手机号输入不正确
              this.AlertShow('手机号输入不正确');
              return
            } else if(!code) {
                //短信验证码不正确
              this.AlertShow('短信验证码不正确');
              return
            }
            //手机号短信登录
             result = await reqCodeLogin(phone,code);

        } else {//用户名密码登录
            const {name,pwd,captcha} = this;
            if(!name){
                //用户名必须指定
              this.AlertShow('用户名必须指定');
              return
            } else if(!/^\d{6}$/.test(pwd)) {
                //密码必须指定
              this.AlertShow('密码为6位数字');
              return
            } else if(!captcha){
              //验证码必须指定
              this.AlertShow('验证码必须指定');
              return
            }
          result = await reqPwdLogin({name,pwd,captcha});
        }
          //根据结果数据处理
        if(result.code === 0){
           const user = result.data;
           //将 user保存到 vuex的state中
            this.$store.dispatch('recordUser',user)
           //登录成功后跳转到个人中心阶段
           this.$router.replace('/profile');
        } else {
           const msg = result.msg;
           console.log(msg);
           this.getCaptcha();
        }

      },
      //关闭警告框
      closeTip () {
        this.showAlert = false;
        this.alertText = '';
      },
      getCaptcha () {//及时更新验证码
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now();
      }
    },
    components: {
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #ef4f4f
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #ef4f4f
              font-weight 700
              border-bottom 2px solid #ef4f4f
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #ef4f4f
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #ef4f4f
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #ef4f4f
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #ef4f4f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 35px
          color #ef4f4f
</style>
