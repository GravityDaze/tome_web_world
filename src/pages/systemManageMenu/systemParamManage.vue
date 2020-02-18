<template>
    <div>
      <mySearchs
        :sign="sign"
        :paramKey="paramKey"
        :paramValue="paramValue"
        :editorScope="editorScope"
        :isSynToRedis="isSynToRedis"
        :isAdd="isAdd"
        :isEditor="isEditor"
        @uploadRedis="uploadRedis"
        @queryInfos="queryInfos"
      ></mySearchs>
      <myTables
        :tableTitle="tableTitle"
        :tableData="tableData"
        :isShowIsEditor="isShowIsEditor"
        :isShowEnabled="isShowEnabled"
        @chooseInfo="chooseInfo"
        @queryInfos="queryInfos"
      ></myTables>
      <div id="addEditorForm">
        <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.systemParamSign" width="30%" align="left"
                   :close-on-click-modal="false">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                   :hide-required-asterisk='false'>
            <el-row>
              <el-col :span="18" :offset="2">
                <el-form-item label="参数键">
                  <el-col>
                    <el-input v-model="ruleForm.paramKey"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="18" :offset="2">
                <el-form-item label="参数值">
                  <el-col>
                    <el-input v-model="ruleForm.value"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="18" :offset="2">
                <el-form-item label="参数值规则">
                  <el-col>
                    <el-input v-model="ruleForm.regularExpression"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="18" :offset="2">
                <el-form-item label="可否编辑">
                  <el-radio-group v-model="ruleForm.edit">
                    <el-radio label="可以"></el-radio>
                    <el-radio label="不可以"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="18" :offset="2">
                <el-form-item label="描述">
                  <el-col>
                    <el-input type="textarea" :autosize="{minRows:4,maxRows:6}" v-model="ruleForm.description"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <!--<el-col :span="4" :offset="2">-->
              <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
              <!--</el-col>-->
              <el-col :span="10" :offset="6" style="display: flex;flex-wrap: nowrap">
                <el-button @click="cancelForm('ruleForm')">关闭</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
</template>

<script>
    export default {
        name: "system-param-manage",
      data(){
          return {
            apiQuery: '/mis/param/query',
            apiEditorGet: '/mis/param/get',
            apiAdd: '/mis/param/add',
            apiEditor: '/mis/param/edit',
            apiUploadRedis:'/mis/param/sycnRedis',//同步到redis的接口
            commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
            sign:'systemParamSign',
            paramKey:true,
            paramValue:true,
            editorScope:true,
            isSynToRedis:true,
            isAdd: true,//显示新增按钮
            isEditor: true,//显示编辑按钮
            isShowIsEditor:true,
            isShowEnabled:true,

            tableTitle: [
              {
                prop: 'paramKey',
                label: '参数键',
                // width: '100',
                align: 'center'
              },
              {
                prop: 'value',
                label: '参数值',
                // width: '100',
                align: 'center'
              },
              {
                prop: 'regularExpression',
                label: '参数值规则',
                // width: '100',
                align: 'center'
              },
              {
                prop: 'description',
                label: '描述',
                // width: '100',
                align: 'center'
              },
            ],
            tableData: [],
            ruleForm: {

              paramKey:'',
              value: '',
              regularExpression:'',
              edit:'不可以',
              description:''
            },
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
          }
      },
      mounted(){
        this.$store.state.pageNumParam=1
        this.$store.state.isShowHomeCountParam = false
        this.getDefaultInfo()
      },
      methods: {
        //编辑信息前先获取相关信息
        chooseInfo(n) {
          console.log('到底会给我什么样的信息呢', n)
          this.commonId = n.id
          this.$axios(
            {
              method: 'post',
              url: this.apiEditorGet + '?id=' + n.id,
              data: {}
            }
          ).then(res => {
            console.log('菜单管理点击获取的是什么信息', res.data.value)
            if (res.data.resultStatus.resultCode === '0000') {
              this.ruleForm = res.data.value
              if(this.ruleForm.edit == '0'){
                this.ruleForm.edit = '不可以'
              }else if(this.ruleForm.edit == '1'){
                this.ruleForm.edit = '可以'
              }

              this.$message.success('获取信息成功，可进行信息编辑')
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          }).catch(error => {

          })

        },

        //新增信息
        addInfo() {
          console.log('开始提交新增信息')
          this.ruleForm.edit = this.ruleForm.edit=='可以'?'1':'0'


          this.$axios(
            {
              method: 'post',
              url: this.apiAdd,
              data: this.ruleForm
            }
          ).then(res => {
            console.log('新增接口成功返回数据', res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              this.$store.state.systemParamSign = false
              this.getDefaultInfo()
            }else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          }).catch(error => {
            console.log(error)
          })
        },
        //编辑信息之后提交信息
        editorInfo() {
          console.log('开始提交编辑信息')
          this.ruleForm.edit = this.ruleForm.edit=='可以'?'1':'0'
          this.$axios(
            {
              method: 'post',
              url: this.apiEditor,
              data: this.ruleForm
            }
          ).then(res => {
            console.log('编辑接口成功返回数据', res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              this.$store.state.systemParamSign = false
              this.getDefaultInfo()
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }
          }).catch(error => {

          })
        },

        //同步到redis
        uploadRedis(){
          // alert('按钮触发了同步到redis事件')
          this.$axios(
            {
              method:'post',
              url:this.apiUploadRedis,
              data:{}
            }
          ).then(res => {
            if(res.data.resultStatus.resultCode === '0000'){
              this.$message.success('同步成功')
            }else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }
          }).catch(error => {

          })
        },

        //获取默认列表信息方法
        getDefaultInfo() {
          var that = this
          this.$axios(
            {
              method: 'post',
              url: this.apiQuery,
              data: {
                "paramKey":"",
                "value":"",
                "edit":"",
                "pageNum": 1,
                "pageSize": this.$store.state.pageSizeParam,
              }
            }
          ).then(res => {
            console.log('菜单管理返回的数据列表信息返回的数据', res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              that.$store.state.totalParam = res.data.value.total
              // console.log('返回的数据', that.$store.state.totalParam)
              this.tableData = [...res.data.value.list]

            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }
          }).catch(error => {
            console.log(error)
          })
        },

        //查询按钮返回列表数据
        queryInfos(n) {
            if(this.$store.state.editorScopeParam == '9'){
              this.$store.state.editorScopeParam = ''
            }
          this.$axios(
            {
              method: 'post',
              url: this.apiQuery,
              data: {
                "paramKey":this.$store.state.paramKeyParam,
                "value": this.$store.state.paramValueParam,
                "edit":this.$store.state.editorScopeParam,
                "pageNum": this.$store.state.pageNumParam,
                "pageSize": this.$store.state.pageSizeParam,
              }
            }
          ).then(res => {
            if (res.data.resultStatus.resultCode === '0000') {
              // console.log('返回的数据', res.data.value.list)
              this.tableData = [...res.data.value.list]
              this.$store.state.totalParam = res.data.value.total
              // console.log('赋值的数据', this.tableData)

            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }
          }).catch(error => {

          })
        },

        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              // this.$store.state.systemParamSign = false
              if (this.$store.state.titleHeader === '新增') {
                // alert('触发了')
                this.addInfo()
              } else if (this.$store.state.titleHeader === '编辑') {
                this.editorInfo()
              }
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
          this.$store.state.systemParamSign = false
        },

      }
    }
</script>

<style scoped>

</style>
