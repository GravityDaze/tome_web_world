<template>
  <div>
    <mySearchs
      :sign="sign"
      :userTel="userTel"
      :userSerialNum="userSerialNum"
      :guideSerialNum="guideSerialNum"
      :sceneryState="sceneryState"
      :isEditor="isEditor"
      :isEnabled="isEnabled"
      :isDisabled="isDisabled"
      :isQualificationIdentification="isQualificationIdentification"
      :isCancelIdentification="isCancelIdentification"
      :isRelevanceGuide="isRelevanceGuide"
      :isCancelRelevanceGuide="isCancelRelevanceGuide"
      @queryInfos="queryInfos"
      @enableInfoSss="enableInfoSss"
      @disableInfoSss="disableInfoSss"
      @cancelRelationTravelAgency="cancelRelationTravelAgency"
    ></mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowIdentification="isShowIdentification"
      :isUserSerialNum="isUserSerialNum"
      @queryInfos="queryInfos"
      @chooseInfo="chooseInfo"
    ></myTables>


    <!--第一个编辑模态框-->
    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.guideManageSign" width="50%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="10">
              <el-form-item label="用户编号">
                <el-col>
                  <el-input v-model="ruleForm.no" disabled="disabled"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3">
              <el-form-item label="登录手机号">
                <el-col>
                  <el-input v-model="ruleForm.customerPhone" disabled="disabled"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="导游姓名">
                <el-col>
                  <el-input v-model="ruleForm.realName"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3">
              <el-form-item label="身份证号">
                <el-col>
                  <el-input v-model="ruleForm.credentialsNumber"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="导游证号">
                <el-col>
                  <el-input v-model="ruleForm.guideCard"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3">
              <el-form-item label="SOS紧急电话">
                <el-col>
                  <el-input v-model="ruleForm.sosPhone"></el-input>
                </el-col>

              </el-form-item>
            </el-col>


            <el-col :span="10">
              <el-form-item label="性别">
                <el-radio-group v-model="ruleForm.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3">
              <el-form-item label="email邮箱" prop="email">
                <el-col>
                  <el-input v-model="ruleForm.email"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="允许自建团">
                <el-radio-group v-model="ruleForm.isCreateTeam">
                  <el-radio label="允许"></el-radio>
                  <el-radio label="不允许"></el-radio>
                </el-radio-group>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3">
              <el-form-item label="预留团号">
                <el-col>
                  <el-input v-model="ruleForm.teamCode"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

          </el-row>
          <el-form-item>
            <!--<el-col :span="3">-->
            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
            <!--</el-col>-->
            <el-col :span="9" :offset="12">
              <el-button @click="cancelForm('ruleForm')">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!--第二个关联导游模态框-->
    <div id="userInfoForm">
      <el-dialog title="关联导游" :visible.sync="$store.state.guideRelevanceSign" width="30%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleFormGuideRelevance" ref="ruleFormGuideRelevance" label-width="100px" class="demo-ruleForm"
                 size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="16" :offset="3">
              <el-form-item label="导游证号">
                <el-col>
                  <el-input v-model="ruleFormGuideRelevance.guideCard" @focus="clearSearchTipsFn"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <template v-if="isGuideInfo">
              <el-col :span="16" :offset="3">
                <el-form-item label="用户编号">
                  <el-col>
                    <el-input v-model="ruleFormGuideRelevance.no" disabled="disabled"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="16" :offset="3">
                <el-form-item label="登录手机号">
                  <el-col>
                    <el-input v-model="ruleFormGuideRelevance.customerPhone" disabled="disabled"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>

              <el-col :span="16" :offset="3">
                <el-form-item label="导游姓名">
                  <el-col>
                    <el-input v-model="ruleFormGuideRelevance.realName" disabled="disabled"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="16" :offset="3">
                <el-form-item label="性别">
                  <el-col>
                    <el-input v-model="ruleFormGuideRelevance.sex" disabled="disabled"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="16" :offset="3">
                <el-form-item label="身份证号">
                  <el-col>
                    <el-input v-model="ruleFormGuideRelevance.credentialsNumber" disabled="disabled"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>

              <el-col :span="16" :offset="3">
                <el-form-item label="SOS紧急电话">
                  <el-col>
                    <el-input v-model="ruleFormGuideRelevance.sosPhone" disabled="disabled"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="16" :offset="3">
                <el-form-item label="email邮箱">
                  <el-col>
                    <el-input v-model="ruleFormGuideRelevance.email" disabled="disabled"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="16" :offset="3">
                <el-form-item label="预留团号">
                  <el-col>
                    <el-input v-model="ruleFormGuideRelevance.teamCode" disabled="disabled"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>

            </template>
            <template v-if="!isGuideInfo">
              <el-col :span="10" :offset="9" v-if="isShowTips">
                <span style="color: red">查无此导游信息!</span>
              </el-col>

            </template>

          </el-row>
          <el-form-item>
            <el-col :span="15" :offset="3">
              <el-button type="warning" @click="searchGuideInfo">查询</el-button>
              <el-button @click="cancelForm('ruleFormGuideRelevance')">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleFormGuideRelevance')">确认</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "guide-manage",
    data() {
      return {
        apiQuery: '/mis/guide/query',
        apiSearchGuideNum: '/mis/guide/getByGuideCard',//关联导游时，查询导游证号
        apiEditorGet: '/mis/guide/get',
        apiEditor: '/mis/guide/edit',
        apiEnable: '/mis/guide/auth',//一般代表启用接口，此处特例代表资格认证接口
        apiDisable: '/mis/guide/cancelAuth',//一般代表禁用接口，此处特例代表取消认证接口
        apiRelationTravelAgency: '/mis/guide/confirmRelationTravelAgency',//关联旅行社
        apiNoRelationTravelAgency: '/mis/guide/cancelRelationTravelAgency',//取消关联
        sign: 'guideManageSign',
        userTel: true,
        userSerialNum: true,
        guideSerialNum: true,
        sceneryState: true,
        isGuideInfo: false,//此参数用于判断在用导游证查询导游信息时候是否存在相关导游的信息数据
        isShowTips: false,//此参数用于是否要展示出‘查无此导游信息’字样
        relationId: '',//此参数用于在查询导游信息后，如果返回有信息则就保存当前信息的id，方便后面关联导游时传导游的id
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        isEditor: true,
        isEnabled: false,//显示启用按钮
        isDisabled: false,//显示禁用按钮
        isQualificationIdentification: true,//资格认证
        isCancelIdentification: true,//取消认证
        isShowIdentification: true,//在表格内部是否展示是否已认证一列
        isRelevanceGuide: true,//关联导游
        isCancelRelevanceGuide: true,//取消关联
        isUserSerialNum: true,
        tableTitle: [
          {
            prop: 'customerPhone',
            label: '手机号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'credentialsNumber',
            label: '身份证号',
            // width: '200',
            align: 'center'
          },
          {
            prop: 'realName',
            label: '导游姓名',
            width: '100',
            align: 'center'
          },
          {
            prop: 'guideCard',
            label: '导游证号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'sosPhone',
            label: '紧急呼救电话',
            width: '100',
            align: 'center'
          },
          {
            prop: 'sex',
            label: '性别',
            width: '100',
            align: 'center',
            formatter: function (row) {
              return row.sex == '1' ? '男' : '女'
            }
          },
          {
            prop: 'email',
            label: '邮箱',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'lastLoginDateTime',
            label: '更新时间',
            // width: '180',
            align: 'center'
          },
        ],
        tableData: [
          {

            userTel: '13708718279',
            userSerialNum: 'C000000002',
            identificationId: '513322199706246636',
            guideName: '八戒导游',
            guideSerialNum: 'VQ1234',
            sosTel: '15911112222',
            userSex: '女',
            userEmail: 'wxr@qq.com',
            updatePerson: '张大宝',
            updateDate: '2019-05-29 10:15:24',
            isIdentification: '未认证',
            isEnabled: true,//是否启用状态
          },
          {

            userTel: '13708718279',
            userSerialNum: 'C000000008',
            identificationId: '513322199706246636',
            guideName: '导游',
            guideSerialNum: 'VQ1234',
            sosTel: '15911112222',
            userSex: '男',
            userEmail: 'wxr@qq.com',
            updatePerson: '张大宝',
            updateDate: '2019-05-29 10:15:24',
            isIdentification: '已认证',
            isEnabled: false,//是否启用状态
          },


        ],

        ruleForm: {
          "no": "",
          "customerPhone": "",//登录手机号
          "id": "",
          "credentialsNumber": "",//身份证号
          "realName": "",
          "guideCard": "",
          "sosPhone": "",//紧急电话
          "sex": "",
          "email": "",
          "teamCode": "",//预留团号
          "isCreateTeam": 1,//是否允许自建团参数

        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
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
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        },
        ruleFormGuideRelevance: {
          "id": "",
          "no": "",
          "customerPhone": "",
          "credentialsNumber": "",
          "realName": "",
          "guideCard": "",//导游证号
          "sosPhone": "",
          "sex": "",
          "email": "",
          "authStatus": "",
          "status": "",
          "teamCode": "",//预留团号
          "isCreateTeam": "",//是否允许自建团参数
        },
      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.getDefaultInfo()
    },
    methods: {
      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "phone": "",//手机号
              "no": "",//用户编号
              "guideCard": "",//导游证号
              "status": "",//状态
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('返回的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.total
            // console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.list]

            // console.log('赋值的数据', this.tableData)
            that.$store.state.showLoading = false
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //编辑信息前先获取相关信息
      chooseInfo(n) {
        // console.log('到底会给我什么样的信息呢',n)
        this.commonId = n.id
        this.$axios(
          {
            method: 'post',
            url: this.apiEditorGet + '?id=' + n.id,
            data: {}
          }
        ).then(res => {
          console.log('导游点击编辑获取的是什么信息', res.data.value)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm = res.data.value
            this.ruleForm.sex = res.data.value.sex == '1' ? '男' : '女'
            this.ruleForm.isCreateTeam = res.data.value.isCreateTeam == '0' ? '不允许' : '允许'

            this.$message.success('获取信息成功，可进行信息编辑')
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },
      //编辑信息之后提交信息
      editorInfo() {
        console.log('开始提交编辑信息')
        this.ruleForm.sex = this.ruleForm.sex == '男' ? '1' : '2'
        this.ruleForm.isCreateTeam = this.ruleForm.isCreateTeam == '不允许' ? '0' : '1'
        this.$axios(
          {
            method: 'post',
            url: this.apiEditor,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('编辑接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.guideManageSign = false
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //输入导游证号是开始把之前的提示隐藏（影藏tips）
      clearSearchTipsFn() {
        this.isShowTips = false
      },

      //查询导游证号是否绑定了对应的导游信息
      searchGuideInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiSearchGuideNum + '?guideCard=' + this.ruleFormGuideRelevance.guideCard,
            data: {
              // "phone":"",//手机号
              // "no":"",//用户编号
              // "guideCard":this.ruleFormGuideRelevance.guideCard,//导游证号
              // "status":"",//状态
              // "pageNum": 1,
              // "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          // console.log('输入导游证号，开始查询导游信息，然后返回了什么资料：',res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            if (res.data.value) {
              this.isGuideInfo = true
              this.ruleFormGuideRelevance = res.data.value
              this.ruleFormGuideRelevance.sex = this.ruleFormGuideRelevance.sex == '1' ? '男' : '女'
              this.relationId = this.ruleFormGuideRelevance.id
            } else {
              this.isGuideInfo = false
              this.relationId = ''
            }
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
            this.isShowTips = true
          }

        }).catch(error => {

        })
      },
      //关联旅行社信息提交
      confirmRelationTravelAgency() {
        // console.log('点击确认关联并提交信息',this.relationId)

        this.$axios(
          {
            method: 'post',
            url: this.apiRelationTravelAgency + '?id=' + this.relationId,
            data: {}
          }
        ).then(res => {
          console.log(res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('提交关联成功后返回了什么', res.data)
            this.$store.state.guideRelevanceSign = false
            this.isGuideInfo = false
            for (var i in this.ruleFormGuideRelevance) {
              this.ruleFormGuideRelevance[i] = ''
            }
            this.$message.success('你已成功关联导游')

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
            this.isGuideInfo = false
            for (var i in this.ruleFormGuideRelevance) {
              this.ruleFormGuideRelevance[i] = ''
            }

          }

        }).catch(error => {

        })
      },
      //取消关联
      cancelRelationTravelAgency() {
        this.$axios(
          {
            method: 'post',
            url: this.apiNoRelationTravelAgency + '?id=' + this.commonId,
            data: {}
          }
        ).then(res => {
          console.log(res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$message.success('你已成功取消导游关联')
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },
      //资格认证（通用的地方为启用，加sss为资格认证）
      enableInfoSss() {
        // alert('你选择了继续操作哦')
        this.$axios(
          {
            method: 'post',
            url: this.apiEnable + '?id=' + this.commonId,
            data: {}
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

          // console.log(res.data,'前面是后台返回的启用之后的信息')
        }).catch(error => {

        })
      },
      //取消认证（通用的地方为禁用，加sss为取消认证）
      disableInfoSss() {
        // alert('你选择了继续操作哦')
        this.$axios(
          {
            method: 'post',
            url: this.apiDisable + '?id=' + this.commonId,
            data: {}
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },
      //查询按钮或者点击翻页按钮返回列表数据
      queryInfos(n) {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "phone": this.$store.state.userTelParam,//手机号
              "no": this.$store.state.userSerialNumParam,//用户编号
              "guideCard": this.$store.state.guideCardParam,//导游证号
              "status": this.$store.state.sceneryStateParam,//状态
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('返回的数据', res.data.value.list)
            this.tableData = [...res.data.value.list]
            this.$store.state.totalParam = res.data.value.total
            console.log('赋值的数据', this.tableData)

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
            if (formName === 'ruleForm') {
              // this.$store.state.guideManageSign = false

              if (this.$store.state.titleHeader === '新增') {

              } else if (this.$store.state.titleHeader === '编辑') {
                this.editorInfo()
              }

            } else if (formName === 'ruleFormGuideRelevance') {
              // this.isGuideInfo = false
              this.confirmRelationTravelAgency()
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
        if (formName === 'ruleForm') {
          this.$store.state.guideManageSign = false
        } else if (formName === 'ruleFormGuideRelevance') {
          this.$store.state.guideRelevanceSign = false
          this.relationId = ''
          this.isGuideInfo = false
          for (var i in this.ruleFormGuideRelevance) {
            this.ruleFormGuideRelevance[i] = ''
          }

        }

      },

    }
  }
</script>

<style scoped>

</style>
