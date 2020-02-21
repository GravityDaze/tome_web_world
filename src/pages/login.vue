<template>
  <div>
    <div class="login_bg">
      <div class="login_info_box">
        <div class="logo_title_box">
          <div class="logo_icon"></div>
          <div class="logo_title">
            <div>智慧全域</div>
            <div>SMART GUIDE</div>
          </div>

        </div>
        <div class="choose_version" v-show="chooseVersionParam">
          <span class="my_hover" @click="chooseVersionParam=false">A2</span>
          <span class="my_hover" @click="chooseVersionParam=true">A3</span>
        </div>
        <div class="choose_version1" v-show="!chooseVersionParam">
          <span class="my_hover" @click="chooseVersionParam=false">A2</span>
          <span class="my_hover" @click="chooseVersionParam=true">A3</span>
        </div>
        <div class="out_box">
          <div class="arr_box">
            <div class="acount_box">
              <span>账号：</span>
              <input type="text" v-model="username">
            </div>
            <div class="password_box">
              <span>密码：</span>
              <input type="password" v-model="password">
            </div>
            <div class="code_box" v-show="chooseVersionParam">
              <span>验证码：</span>
              <input type="text" v-model="inputCode">
            </div>
          </div>
          <div class="code_pg my_hover">
            <div v-show="chooseVersionParam">
              <!--<span>{{imgCode}}</span>-->
              <span :style="{backgroundImage:'url('+imgCodeUrl+')',backgroundSize:'cover'}" @click="refreshCode"></span>
            </div>

          </div>
        </div>

        <div class="logo_btn my_hover" @click="login" v-show="chooseVersionParam">
          <div>
            <span>登录--</span><span>A3</span>
          </div>
        </div>


        <div class="logo_btn my_hover" @click="loginA2" v-show="!chooseVersionParam">
          <div>
            <span>登录--</span><span>A2</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        chooseVersionParam:true,//用于切换A2A3登录按钮
        userToken: '',//用户token
        api: '/sys/systemLogin',
        api2:'/sys/twoLogin',//A2
        apiCode: '/sys/getIdentifyingCode',//获取验证码接口
        apiTest: '/pc/scenery/findSceneryInfo',//测试token接口
        apiAuthMenu:'/mis/menu/authMenu',//权限菜单接口
        apiAuthMenu2:'/a2guider/account/menuAuth',//A2权限菜单接口
        username: '',
        password: '',
        inputCode: '',//验证码输入框内容绑定参数
        imgCodeUrl: '',//后台返回图形验证码
        //前端自己实现图形验证码的相关参数
        // code: '',
        // inputCode: '',
        // imgCode: 'GOOD',
      }
    },
    methods: {
      //前端自己实现图形验证码

      // createCode() {
      //   this.code = ''
      //   this.inputCode = ''
      //   this.imgCode = ''
      //   //随机数的长度参数如下
      //   var codeLength = 4
      //   var k = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
      //   for (var i = 0; i < codeLength; i++) {
      //     var freeNum = Math.floor(Math.random() * 36)
      //     this.code += k[freeNum]
      //   }
      //   this.imgCode = this.code
      // },

      //刷新后台返回的验证码事件
      refreshCode() {
        var num = Math.ceil(Math.random() * 10);//生成一个随机数（防止缓存）
        console.log('点击刷新验证码')
        this.$axios.get(this.apiCode)
          .then(res => {
            console.log(res.config.url)
            this.imgCodeUrl = res.config.url + '?' + num
          }).catch(error => {

        })
      },

      //登录事件A3
      login() {
        var that = this
        console.log('点击登录A3')
        if(!this.username){
          this.$message.warning('用户名不能为空')
          return
        }
        if(!this.password){
          this.$message.warning('密码不能为空')
          return
        }
        if(!this.inputCode){
          this.$message.warning('验证码不能为空')
          return
        }

        this.$axios(
          {
            method: 'post',
            url: this.api,
            data: {
              name: this.username,
              password: this.password,
              identifyingCode: this.inputCode
            }
          }
        ).then(res => {
          console.log(res, '接口已经通了')
          if (res.data.resultStatus.resultCode === '0000') {
            // console.log('数据请求成功', res.data.value.access_token)
            this.userToken = res.data.value.access_token
            // this.$store.state.allScopeUserName = this.username
            // console.log('是否答应了token', this.userToken)
            this.$store.commit('getToken', {'token': this.userToken,'needName': this.username})
            // this.$router.push('/layout')


            this.$axios(
              //登录验证成功后，通过以下接口判断拥有哪些菜单权限
              {
                method:'GET',
                url:this.apiAuthMenu,
                data:{}
              }
            ).then(res => {
              console.log('获取到的权限接口数据：+++',res.data)
              if(res.data.resultStatus.resultCode === '0000'){
                var menuK = res.data.value
                console.log('this.$store.state.menuVarArr:',this.$store.state.menuVarArr,'menuK:+',menuK)
                this.$store.commit('getMenuVarArr',{'menuVarArr':menuK})
                this.$store.state.menuVarArr = [...menuK]

                that.$router.push('/layout')


              }else {
                this.$message.warning(res.data.resultStatus.resultMessage)
              }
            }).catch(error => {

            })




            // this.test()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(err => {
          console.log(err)
        })
      },

      //登录事件A2
      loginA2() {
        var that = this
        console.log('点击登录A2')
        if(!this.username){
          this.$message.warning('用户名不能为空')
          return
        }
        if(!this.password){
          this.$message.warning('密码不能为空')
          return
        }
        // if(!this.inputCode){
        //   this.$message.warning('验证码不能为空')
        //   return
        // }

        this.$axios(
          {
            method: 'post',
            url: this.api2,
            data: {
              Account: this.username,
              Pwd: this.password,
              identifyingCode: this.inputCode
            }
          }
        ).then(res => {

          console.log(res, 'A2登录接口已经通了',this.$store.state.roleStatusNum)

          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.roleStatusNum = res.data.value.status

            // console.log('数据请求成功', res.data.value.access_token)
            this.userToken = res.data.value.access_token
            // this.$store.state.allScopeUserName = this.username
            // console.log('是否答应了token', this.userToken)
            this.$store.commit('getToken', {'token': this.userToken,'needName': this.username})
            // this.$router.push('/layout')


            this.$axios(
              //登录验证成功后，通过以下接口判断拥有哪些菜单权限
              {
                method:'GET',
                url:this.apiAuthMenu2,
                data:{}
              }
            ).then(res => {
              console.log('获取到的权限接口数据：+++',res.data)
              if(res.data.resultStatus.resultCode === '0000'){
                var menuK = res.data.value
                console.log('this.$store.state.menuVarArr:',this.$store.state.menuVarArr,'menuK:+',menuK)
                this.$store.commit('getMenuVarArr',{'menuVarArr':menuK})
                this.$store.state.menuVarArr = [...menuK]

                that.$router.push('/layout2')


              }else {
                this.$message.warning(res.data.resultStatus.resultMessage)
              }
            }).catch(error => {

            })




            // this.test()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(err => {
          console.log(err)
        })
      },

      //test
      test() {
        console.log('开始测试token是否放到请求头了')
        this.$axios.get(this.apiTest)
          .then(res => {
            console.log(res)
          })

      }
    },
    mounted() {
      console.log('开始初始化了', this.$store)
      this.$axios.get(this.apiCode)
        .then(res => {
          console.log(res.config.url)
          this.imgCodeUrl = res.config.url
        }).catch(error => {
        console.log(error)
      })


    }
  }
</script>

<style scoped lang="scss">
  @import "../common_css/scss_style";

  .login_bg {
    width: calc(100% - 3rem);
    height: 937px;
    padding: 0 1.5rem;
    /*background-image: url("http://tomepicture.zhihuiquanyu.com/18.jpg");*/
    background-image: url("http://tomepicture.zhihuiquanyu.com/login_bg.png");
    /*background-image: url("../../static/login_bg.png");*/
    background-size: 100% 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .login_info_box {
    /*border: 3px solid rgba(109, 109, 109, 0.8);*/
    border: 3px solid rgba(255, 255, 255, 1);
    background-color: rgba(255, 255, 255, 0.5);
    width: 5rem;
    height: 4rem;
    padding: 0.2rem;
    /*
        background-color: $gray;
    */
  }

  .logo_title_box {
    /*
        border:1px solid $white;
    */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem 0;
  }

  .logo_icon {
    width: 40px;
    height: 40px;
    margin-right: 0.3rem;
    background-image: url("../../static/logo.png");
    background-size: cover;
  }

  .logo_title > div {
    font-size: $font24;
    color: $orange;
    /*padding: 0 10px;*/
  }

  .logo_title > div:first-child {
    letter-spacing: 1em;
    /*padding:0 0.2rem;*/
  }

  .logo_title > div:nth-child(2) {
    letter-spacing: 0.3em;
    font-size: $font18;
  }

  .choose_version,.choose_version1{
    /*padding: 10px 0;*/
    /*border:1px solid red;*/
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .choose_version span:last-child,.choose_version1 span:first-child{
    /*border:1px solid blue;*/
    border-radius: 10px;
    padding: 5px;
    background-color: $orange;
    margin-right: 15px;
    color: $white;
  }
  .choose_version1 span:last-child,.choose_version span:first-child{
    /*border:1px solid blue;*/
    border-radius: 10px;
    padding: 5px;
    background-color: $white;
    margin-right: 15px;
    color: $orange;
  }


  .out_box {
    /*border:1px solid red;*/
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    /*margin-top: 0.3rem;*/
    padding: 0 0.3rem;
  }

  .arr_box {
    width: 60%;
  }

  .acount_box, .password_box, .code_box {
    color: $orange;
    font-size: $font14;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    margin: 0.2rem 0;
  }

  .acount_box > span, .password_box > span, .code_box > span {
    width: 0.8rem;
    min-width: 80px;
    /*
        border: 1px solid red;
    */
    text-align: right;
    padding: 5px;
  }

  .acount_box > input, .password_box > input, .code_box > input {

    width: 2rem;
    min-width: 80px;
  }

  .code_pg {
    margin-bottom: 0.2rem;
  }

  .code_pg > div {
    display: flex;
    align-items: stretch;
  }

  .code_pg span {
    border: 1px solid rgba(109, 109, 109, 0.5);
    color: $white;
    width: 0.9rem;
    min-width: 90px;
    height: 20px;
  }

  .logo_btn {
    width: 100%;
    margin-top: 0.3rem;
  }

  .logo_btn > div {
    /*border:3px solid rgba(109,109,109,0.5);*/
    background-color: rgba(255, 255, 255, 1);
    /*border-radius: 5px;*/
    width: 1.2rem;
    margin: 0 auto;
    padding: 5px;
    font-size: $font24;
    color: $orange;
    /*
        background-color: $orange;
    */
  }

</style>
