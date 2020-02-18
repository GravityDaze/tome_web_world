<template>
  <div class="carousel_box">
    <div class="top1">
      <!--<a :href="downLoadUrl" download="">点我下载</a>-->
      <!--<div @click="confirmEvent">confirm框</div>-->
      <div></div>
    </div>

    <div class="top2">
      <el-carousel trigger="click" height="96px" indicator-position="none">
        <el-carousel-item v-for="(item,index) in scenic" :key="index">
          <span class="small">{{ item.name }}{{item.guest}}</span>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="top3">
      <div class="top3_1 my_hover" style="background-image: url('../../static/logo.png')" @click="goNewPage"></div>
      <div class="top3_2" @click="goNewPage">
        <span class="my_hover">{{$store.state.allScopeUserName}}</span>
      </div>
      <div class="top3_3"></div>
      <div class="select_info_box">
        <div class="select_title">
          <div class="header_img" style="background-image: url('../../static/logo.png')"></div>
          <div class="user_name"><span>{{$store.state.allScopeUserName}}</span></div>
        </div>
        <div class="select_comment">
          <div class="my_hover" @click="editorUserInfo"><span>编辑个人信息</span></div>
          <div class="my_hover" @click="alterPassword"><span>修改密码</span></div>
          <div class="my_hover" @click="loginOut"><span>退出登录</span></div>
        </div>

      </div>

    </div>
    <!--编辑个人信息模态框-->
    <editorUserInfoForm
      :ruleForm="ruleForm"
      @getOrganizationChooseInfo="getOrganizationChooseInfo"
      @sureEditorInfo="sureEditorInfo"
    ></editorUserInfoForm>

    <!--编辑模态框中出现所属机构模态框-->
    <chooseOrganizationDialog
      :dataOrganization="dataOrganization"
      @transferOrganizationId="transferOrganizationId"
    ></chooseOrganizationDialog>

    <!--修改密码模态框-->
    <div id="alterPasswordForm">
      <el-dialog title="修改密码" :visible.sync="$store.state.dialogFormVisibleAlterPassword" width="30%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleFormPassword" :rules="rulesPassword" ref="ruleFormPassword" label-width="100px"
                 class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="18" :offset="2">
              <el-form-item label="登录名" prop="loginName" :disabled="true">
                <el-col>
                  <el-input v-model="ruleFormPassword.loginName" :disabled="true"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="原密码" prop="oldPassword">
                <el-col>
                  <el-input type="password" v-model="ruleFormPassword.oldPassword"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="新密码" prop="newPassword">
                <el-col>
                  <el-input type="password" v-model="ruleFormPassword.newPassword"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-col>
                  <el-input type="password" v-model="ruleFormPassword.confirmPassword"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-col :span="10" :offset="6" style="display: flex;flex-wrap: nowrap">
              <el-button @click="cancelForm('ruleFormPassword')">关闭</el-button>
              <el-button type="primary" @click="submitForm('ruleFormPassword')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>


  </div>
</template>

<script>
  import common from '../common_js/commonFn'

  export default {
    //轮播
    name: "carousel",
    data() {
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleFormPassword.surePassword !== '') {
            this.$refs.ruleFormPassword.validateField('surePassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleFormPassword.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        apiLoginOut: '/sys/logout',
        apiLoginUserInfo: '/uc/user/getLoginUserInfo',
        apiChooseOrganizationInfo:'/uc/dept/tree',
        apiSureEditorInfo:'/uc/user/editLoginUserInfo',
        apiAlterPassword:'/uc/user/editLoginUserPassword',
        isShowInfoSelectBox: false,//点击用户名切换隐藏信息框
        dataOrganization:[],
        scenic: [
          {name: '青城山设备使用量：', guest: '1230 '},
          {name: '武当山设备使用量：', guest: '183 '},
          {name: '圆明园设备使用量：', guest: '356 '},
          {name: '阳明文化园设备使用量：', guest: '230 '},
          {name: '龙宫设备使用量：', guest: '180 '},
          {name: '九皇山设备使用量：', guest: '128 '},
          {name: '华山设备使用量：', guest: '690 '},
          {name: '熊猫基地设备使用量：', guest: '868 '},
          {name: '阆中古城设备使用量：', guest: '236 '},
          {name: '乐山大佛设备使用量：', guest: '285 '},
          {name: '都江堰熊猫乐园设备使用量：', guest: '450 '},
          {name: '雁荡山设备使用量：', guest: '68 '},
          {name: '慕田峪长城设备使用量：', guest: '245 '},
          {name: '刘氏庄园设备使用量：', guest: '180 '},
          {name: '桂林象山设备使用量：', guest: '265 '},
          {name: '火焰山设备使用量：', guest: '128 '},
          {name: '交河故城设备使用量：', guest: '320 '},
        ],
        downLoadUrl: 'https://ai.baidu.com/file/1E2B947A8E1B4CFE8EC6465F4B0CC6BC',
        ruleForm: {
          //个人信息参数
          loginName: '月落归来lalalala',
          reallyName: '',
          affiliatedOrganization: '平台机构',//所属机构
          affiliatedOrganizationId:'',
          sureSex: '',//最终展示出来的性别
          userTel: '13345811137',//用户联系电话
          birthday: '2018-12-12',//生日
          email: '314301505@qq.com',
          headPicPath:'',//头像地址
        },
        ruleFormPassword: {
          loginName: '',
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
        rulesPassword: {
          oldPassword: [
            {validator: validateOldPass, trigger: 'blur'}
          ],
          newPassword: [
            {validator: validatePass, trigger: 'blur'}
          ],
          confirmPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        }

      }
    },
    methods: {
      //编辑用户信息
      editorUserInfo() {
        var dom = document.getElementsByClassName('select_info_box')[0]
        dom.style.display = 'none'
        // alert('要编辑需要先获取信息')
        this.$axios(
          {
            method: 'get',
            url: this.apiLoginUserInfo,
            data: {}
          }
        ).then(res => {
          console.log('获取的个人信息sssss', res.data.value)
          if (res.data.resultStatus.resultCode === '0000') {

            this.ruleForm.loginName = res.data.value.loginName
            this.ruleForm.reallyName = res.data.value.realName
            this.ruleForm.affiliatedOrganizationId = res.data.value.deptId
            this.ruleForm.affiliatedOrganization = res.data.value.deptName
            this.ruleForm.sureSex = res.data.value.sex == '1'?'男':'女'
            this.ruleForm.userTel = res.data.value.phone
            this.ruleForm.birthday = res.data.value.birthday
            this.ruleForm.email = res.data.value.email
            this.ruleForm.headPicPath = res.data.value.headPicPath
          }

        }).catch(error => {

        })
        this.isShowInfoSelectBox = false
        this.$store.state.dialogFormVisible = true
      },
      //编辑信息里面选择所属机构是需要先获取可以选择的机构信息
      getOrganizationChooseInfo(){
        this.$axios(
          {
            method:'post',
            url:this.apiChooseOrganizationInfo,
            data:{}
          }
        ).then(res => {
            console.log('获取的机构数信息',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.dataOrganization = [...res.data.value]
            this.$store.state.chooseOrganizationDialog = true
          }

        }).catch(error => {

        })
      },
      //选择了具体所属机构信息以后，返回针对性的id和name
      transferOrganizationId(n) {
        console.log('猜我所属机构收到了什么哦', n)
        this.ruleForm.affiliatedOrganizationId = n.id
        this.ruleForm.affiliatedOrganization = n.name
      },
      //信息编辑完成后提交保存
      sureEditorInfo(){
      this.$axios(
        {
          method:'post',
          url:this.apiSureEditorInfo,
          data:{
            "headPicPath": this.ruleForm.headPicPath,
            "realName": this.ruleForm.reallyName,
            "sex": this.ruleForm.sureSex == '男'? 1:2,
            "phone": this.ruleForm.userTel,
            "email":  this.ruleForm.email,
            "birthday": this.ruleForm.birthday,
            "deptId": this.ruleForm.affiliatedOrganizationId
          }
        }
      ).then(res => {
        if(res.data.resultStatus.resultCode === '0000'){
          console.log(res.data)
          this.$store.state.dialogFormVisible = false
        }
      }).catch(error => {

      })
      },
      alterPassword() {
        var dom = document.getElementsByClassName('select_info_box')[0]
        dom.style.display = 'none'
        this.isShowInfoSelectBox = false

        this.ruleFormPassword.loginName = this.$store.state.allScopeUserName

        this.$store.state.dialogFormVisibleAlterPassword = true

      },
      goNewPage() {
        // this.$emit('giveInfo')
        var dom = document.getElementsByClassName('select_info_box')[0]
        if (this.isShowInfoSelectBox) {
          dom.style.display = 'none'
          this.isShowInfoSelectBox = false
        } else {
          dom.style.display = 'block'
          this.isShowInfoSelectBox = true
        }

      },
      confirmEvent() {
        console.log('开始测试confirm弹框')
        common.myConfirm('测试需求')

      },

      //以下是修改密码模态框里的一些对应事件
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$axios(
              {
                method:'post',
                url:this.apiAlterPassword,
                data:{
                  "oldPassword": this.ruleFormPassword.oldPassword,
                  "newPassword": this.ruleFormPassword.newPassword,
                  "confirmPassword": this.ruleFormPassword.confirmPassword
                }
              }
            ).then(res => {
              console.log(res.data)
              if(res.data.resultStatus.resultCode === '0000'){
                this.$store.state.dialogFormVisibleAlterPassword = false
              }
            }).catch(error => {
              console.log(error)
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cancelForm(formName) {
        this.$refs[formName].resetFields();
        this.$store.state.dialogFormVisibleAlterPassword = false
      },

      //退出登录
      loginOut() {
        console.log('点击退出')
        this.$axios(
          {
            method:'post',
            url:this.apiLoginOut,
            data:{
              name:this.$store.state.allScopeUserName
            }
          }
        ).then(res => {
          console.log(res.data)
          if (res.data.resultStatus.resultCode === '0000') {
                  this.$store.commit('loginOut')
                  this.$router.push('/')
                } else {
                  this.$message.warning(res.data.resultStatus.resultMessage)
                  return
                }
        }).catch(error => {

        })


        // this.$axios.get(this.apiLoginOut)
        //   .then(res => {
        //     console.log(res.data, '退出成功')
        //     if (res.data.resultStatus.resultCode === '0000') {
        //       this.$store.commit('loginOut')
        //       this.$router.push('/')
        //     } else {
        //       this.$message.warning(res.data.resultStatus.resultMessage)
        //       return
        //     }
        //   }).catch(error => {
        //
        // })
      }
    }
  }
</script>

<style scoped lang="scss">
  /* 用来放置变量的 scss 文件 */
  @import '../common_css/scss_style.scss';

  .carousel_box {
    /*border:1px solid red;*/
    height: 0.96rem;
    min-height: 96px;
    /*background-image: url("http://tomepicture.zhihuiquanyu.com/bg1.png");*/
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .top1 {
    /*border:1px solid red;*/
    font-size: $font18;
    color: $white;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 15%;
  }

  .top1 > div:first-child {
    /*
        border:1px solid $blue;
    */
    width: 1.76rem;
    min-width: 90px;
    height: 0.5rem;
    min-height: 25px;
    background-image: url("../../static/logos.png");
    background-size: cover;
  }

  .top2 {
    width: 60%;
    /*visibility: hidden;*/
    font-size: $font24;
    color: $orange;
    line-height: 96px;
    opacity:0;
  }

  .top3 {
    /*border: 1px solid red;*/
    width: calc(20% - 1.6rem);
    font-size: $font14;
    color: $orange;
    padding: 0 0.8rem;
    /*border:1px solid $blue;*/
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }

  .top3_1 {
    /*border: 1px solid green;*/
    width: 30px;
    height: 30px;
    background-size: 100% 100%;
    border-radius: 15px;
  }

  .top3_2 {
    /*border:1px solid red;*/
    padding-left: 10px;
    padding-right: 30px;
  }

  .top3_2 > span {
    font-size: $font16;
    color: #999999;
  }

  .top3_2:after {
    content: '▼';
    color: #999999;
    font-size: 8px;
  }

  .select_info_box {
    border: 1px solid $orange;
    background-color: white;
    display: none;
    width: 99%;
    /*height: 2rem;*/
    min-height: 100px;
    position: absolute;
    z-index: 99;
    top: 95px;
    left: 0;
  }

  .select_title {
    /*border:1px solid red;*/
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
  }

  .header_img {
    border: 1px solid #ececec;
    width: 40px;
    height: 40px;
    background-size: 100% 100%;
    border-radius: 20px;
  }

  .user_name {
    /*border:1px solid green;*/
    font-size: 0.2rem;
    padding: 5px 20px;
    margin-left: 20px;
  }

  .select_comment > div {
    border: 1px solid #ececec;
    background-color: $white;
    padding: 5px 0;
    color: #999;
  }

  .select_comment > div:hover {
    background-color: $orange;
    color: white;
  }

  .top3_3 {
    padding-left: 16px;
    background-image: url("../../static/language.png");
    width: 6px;
    height: 22px;
    background-size: 100% 100%;
    border-radius: 15px;
  }

  .el-carousel__item h3 {
    color: $white;
    font-size: $font18;
    opacity: 1;
    line-height: 96px;
    margin: 0;
  }

  .el-carousel__item {
    /*
        background-color: $gray;
    */
  }


</style>
