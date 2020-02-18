<template>
  <div id="userInfoForm">
    <el-dialog :title="titleParam" :visible.sync="$store.state.dialogFormVisible" width="30%" align="left"
               :close-on-click-modal="false">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
               :hide-required-asterisk='false'>
        <el-row>
          <el-col class="position_center">
            <div>
              <div class="upload_header"
                   :style="{backgroundImage:'url('+ruleForm.headPicPath+')',backgroundSize:'100% 100%'}"></div>
              <input class="upload_input my_hover" type="file" @change="chooseHeaderPicture">
            </div>

          </el-col>
          <!--<el-col class="position_center">-->
            <!--<span class="upload_btn my_hover">上传头像</span>-->
          <!--</el-col>-->
          <el-col class="position_center">
            <span class="tip_info">{{tipInfo}}</span>
          </el-col>
          <el-col :span="18" :offset="2">
            <el-form-item label="登录名" prop="loginName">
              <el-col>
                <el-input v-model="ruleForm.loginName" :disabled="true"></el-input>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="18" :offset="2">
            <el-form-item label="真实姓名" prop="reallyName">
              <el-col>
                <el-input v-model="ruleForm.reallyName"></el-input>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="18" :offset="2">
            <el-form-item label="所属机构" prop="affiliatedOrganization">
              <!--<el-col class="select_style">-->
                <!--<el-select v-model="ruleForm.affiliatedOrganization" placeholder="请选择所属机构" class="select_style1">-->
                  <!--<el-option label="未选择" value="none"></el-option>-->
                  <!--<el-option label="平台机构" value="pingtai"></el-option>-->
                  <!--<el-option label="景区机构" value="jingqu"></el-option>-->
                <!--</el-select>-->
              <!--</el-col>-->
              <el-col>
                <el-input v-model="ruleForm.affiliatedOrganization" @focus="openOrganizationDialog"></el-input>
              </el-col>

            </el-form-item>
          </el-col>

          <el-col :span="18" :offset="2">
            <el-form-item label="性别" prop="sureSex">
              <el-radio-group v-model="ruleForm.sureSex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="18" :offset="2">
            <el-form-item label="联系电话" prop="userTel">
              <el-col>
                <el-input v-model="ruleForm.userTel"></el-input>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="18" :offset="2">
            <el-form-item label="生日" prop="birthday">
              <el-col>
                <el-date-picker
                  v-model="ruleForm.birthday"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="18" :offset="2">
            <el-form-item label="E-MAIL" prop="email">
              <el-col>
                <el-input v-model="ruleForm.email"></el-input>
              </el-col>

            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-col :span="10" :offset="6" style="display: flex;flex-wrap: nowrap">
            <el-button @click="cancelForm('ruleForm')">关闭</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "editor-user-info-form",
    data() {
      return {
        apiUploadImg:'/mis/upload/uploadImage',
        headImgFiles:'',//头像文件资源
        titleParam: '编辑个人信息',
        // dialogFormVisible: true,
        // headPicPath
        headerUrl: '../../static/logo.png',
        tipInfo: '头像推荐尺寸为 280(宽) * 280(高)，大小不超过 500KB.',
        rules: {
          reallyName: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          affiliatedOrganization: [
            {required: true, message: '请选择所属机构', trigger: 'change'}
          ],
          sureSex: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          userTel: [
            {required: true, message: '请填写联系电话', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],

        }
      };
    },
    props: ['ruleForm'],
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('sureEditorInfo')
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
        this.$store.state.dialogFormVisible = false
      },
      chooseHeaderPicture(e) {
        console.log('选择需要上传的图片')
        // this.headerUrl = '../../static/bg1.png'
        this.headImgFiles = e.target.files[0]
        console.log(this.headImgFiles,'点击了上传图片',e.target.files[0])
        let formdata = new FormData()
        formdata.append('file', this.headImgFiles)
        this.$axios(
          {
            method:'post',
            url:this.apiUploadImg,
            data:formdata,
          }
        ).then(res => {
          console.log('上传图片后的返回信息',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.ruleForm.headPicPath = res.data.value.url
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },
      openOrganizationDialog(){
        this.$emit('getOrganizationChooseInfo')

      }
    }

  }
</script>

<style scoped>

</style>
