<template>
  <div>
    <mySearchs
      :sign="sign"
      :sceneryName="sceneryName"
      :deptName="deptName"
      :loginName="loginName"
      :userTel="userTel"
      :sceneryState="sceneryState"

      :isAdd="isAdd"
      :isEditor="isEditor"
      :isEnabled="isEnabled"
      :isDisabled="isDisabled"
      :isAbandon="isAbandon"
      :isImpower="isImpower"
      :isImpowerScenery="isImpowerScenery"
      :isResetPassword="isResetPassword"
      @enableInfo="enableInfo"
      @disableInfo="disableInfo"
      @abandonInfo="abandonInfo"
      @resetPasswordInfo="resetPasswordInfo"
      @impowerInfo="impowerInfo"
      @getChooseImpowerScenery="getChooseImpowerScenery"
      @queryInfos="queryInfos"
    ></mySearchs>
    <myTables
      :tableTitle="tableTitle"
      :tableData="tableData"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
    ></myTables>
    <!--第一个是操作员管理的新增编辑模态框-->
    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.operatorManageSign" width="30%"
                 align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col class="position_center">
              <div>
                <div class="upload_header"
                     :style="{backgroundImage:'url('+headerUrl+')',backgroundSize:'100% 100%'}"></div>
                <input class="upload_input my_hover" type="file" @change="chooseHeaderPicture">
              </div>

            </el-col>
            <el-col class="position_center">
              <span class="upload_btn my_hover">上传头像</span>
            </el-col>
            <el-col class="position_center">
              <span class="tip_info">{{tipInfo}}</span>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="登录名">
                <el-col>
                  <el-input v-model="ruleForm.userName"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="真实姓名">
                <el-col>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="所属机构">
                <el-col>
                  <el-input v-model="ruleForm.deptName" @focus="openEditorAreaDialog"></el-input>
                </el-col>
              </el-form-item>
            </el-col>

            <el-col :span="18" :offset="2">
              <el-form-item label="性别">
                <el-radio-group v-model="ruleForm.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="联系电话">
                <el-col>
                  <el-input v-model="ruleForm.phone"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="生日">
                <el-col>
                  <el-input v-model="ruleForm.birthday"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="E-MAIL">
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
    <!--第二个是授权模态框-->
    <div id="userInfoForm">
      <el-dialog title="授权" :visible.sync="$store.state.operatorImpowerSign" width="35%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleFormOperatorImpower" :rules="rulesOperatorImpower" ref="ruleFormOperatorImpower"
                 label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="18" :offset="2">
              <el-form-item label="操作员">
                <el-col>
                  <!--<el-input v-model="ruleFormOperatorImpower.operatorMan"></el-input>-->
                  <span style="color: red">{{ruleFormOperatorImpower.name}}</span>
                  <span>{{ruleFormOperatorImpower.username}}</span>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="已有角色">
                <el-col>
                  <!--<el-checkbox-group v-model="ruleFormOperatorImpower.ownRole">-->

                  <!--<template v-for="item in roleArr">-->
                  <!--<el-checkbox :label="item.name"></el-checkbox>-->
                  <!--</template>-->
                  <!--</el-checkbox-group>-->
                  <span v-for="item in roleArr">
                    <el-button type="success" style="margin: 0 5px;">{{item.name}}</el-button>
                  </span>

                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="可授角色">
                <el-col>
                  <el-checkbox-group v-model="ruleFormOperatorImpower.ImpowerRole">
                    <!--<el-checkbox label="ADMIN"></el-checkbox>-->
                    <!--<el-checkbox label="技术支撑"></el-checkbox>-->
                    <!--<el-checkbox label="片区管理员"></el-checkbox>-->
                    <!--<el-checkbox label="景区管理员"></el-checkbox>-->

                    <template v-for="item in canChooseRoleArr">
                      <el-checkbox :label="item.name"></el-checkbox>
                    </template>
                  </el-checkbox-group>
                </el-col>

              </el-form-item>
            </el-col>


          </el-row>
          <el-form-item>
            <el-col :span="10" :offset="6" style="display: flex;flex-wrap: nowrap">
              <el-button @click="cancelForm('ruleFormOperatorImpower')">关闭</el-button>
              <el-button type="primary" @click="submitForm('ruleFormOperatorImpower')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!--第三个是授权景区模态框-->
    <div id="sceneryAllInfo">
      <el-dialog title="授权景区" :visible.sync="$store.state.impowerScenerySign" width="40%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleFormImpowerScenery" ref="ruleFormImpowerScenery"
                 label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="10">
              <span style="color: red">{{ruleFormOperatorImpower.name}}</span>
              <span>{{ruleFormOperatorImpower.username}}</span>
            </el-col>

            <el-col :span="18" :offset="4">
              <el-col>
                <el-transfer v-model="valueS" :data="dataS"></el-transfer>
              </el-col>

            </el-col>


          </el-row>
          <el-form-item>
            <el-col :span="10" :offset="8" style="display: flex;flex-wrap: nowrap">
              <el-button @click="cancelForm('ruleFormImpowerScenery')">关闭</el-button>
              <el-button type="primary" @click="submitForm('ruleFormImpowerScenery')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <chooseOrganizationDialog
      :dataOrganization="dataOrganization"
      @transferOrganizationId="transferOrganizationId"
    >
    </chooseOrganizationDialog>
  </div>
</template>

<script>
  export default {
    name: "operator-manage",
    data() {
      // const generateData = _ => {
      //   const data = [];
      //   for (let i = 0; i <this.$store.state.tntArr.length; i++) {
      //     data.push({
      //       key: this.$store.state.tntArr[i].id,
      //       // label: `备选项 ${ this.$store.state.tntArr[i].name }`,
      //       label: `${ this.$store.state.tntArr[i].name }`,
      //       // disabled: i % 4 === 0
      //     });
      //   }
      //   return data;
      // };
      return {
        apiQuery: '/uc/operator/query',
        apiEditorGet: '/uc/operator/get',
        apiAdd: '/uc/operator/add',
        apiEditor: '/uc/operator/edit',
        apiEnable: '/uc/operator/enable',
        apiDisable: '/uc/operator/disable',
        apiAbandon: '/uc/operator/close',
        apiResetPassword: '/uc/operator/resetPassword',
        apiCanChooseRole: '/uc/operator/getRoleAuth',
        apiCanChooseScenery: '/mis/operator/getSceneryAuth',
        apiSureImpower: '/uc/operator/addOrEditRoleAuth',//角色授权接口
        apiSureImpowerScenery: '/mis/operator/addOrEditSceneryAuth',//景区授权接口
        apiDropDownOrganization: '/uc/dept/tree',
        sign: 'operatorManageSign',
        headerUrl: '../../static/logo.png',
        tipInfo: '头像推荐尺寸为 280(宽) * 280(高)，大小不超过 500KB.',
        sceneryName: false,
        deptName: true,
        loginName: true,
        userTel: true,
        sceneryState: true,
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮
        isAbandon: true,
        isImpower: true,
        isImpowerScenery: true,
        isResetPassword: true,
        // dataS: generateData(),
        dataS: [],
        valueS: [],
        tableTitle: [
          {
            prop: 'userName',
            label: '登录名',
            width: '100',
            align: 'center'
          },
          {
            prop: 'name',
            label: '真实姓名',
            width: '100',
            align: 'center'
          },
          {
            prop: 'deptName',
            label: '部门名称',
            // width: '90',
            align: 'center'
          },
          {
            prop: 'phone',
            label: '联系电话',
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
            label: 'E-MAIL',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'createDateTime',
            label: '创建时间',
            // width: '90',
            align: 'center'
          },
          {
            prop: 'loginDateTime',
            label: '最后登录时间',
            // width: '180',
            align: 'center'
          },
          {
            prop: 'editPassDateTime',
            label: '最后修改时间',
            // width: '180',
            align: 'center'
          },
        ],
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        tableData: [],
        ruleForm: {
          //个人信息参数
          "userName": "",
          "name": "",
          "phone": "13345811127",
          "deptId": "",
          "deptName": "",
          "sex": "",
          "email": "314301505@qq.com",
          "birthday": "2017-09-02",
          "headPicPath": ""
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

        },
        ruleFormOperatorImpower: {
          name: '操作员一号',
          username: 'admin',
          ownRole: [],
          ImpowerRole: [],
        },
        //已有角色数组
        roleArr: [
          {
            description: '',
            id: '1',
            mark: '',
            name: '技术支持',
            sort: '',
            status: '',
          },
        ],
        //可以选择角色的数组
        canChooseRoleArr: [
          {
            description: '',
            id: '1',
            mark: '',
            name: '技术支持',
            sort: '',
            status: '',
          },
        ],
        rulesOperatorImpower: {
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

        },
        ruleFormImpowerScenery: {
          operatorMan: '操作员一号',
          ownRole: ['ADMIN'],
          ImpowerRole: ['ADMIN', '片区管理员', '景区管理员'],
        },
        dataOrganization: [],//此数据为新增编辑里面选择区域的展示数据

      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.getDefaultInfo()
    },
    methods: {

      //编辑信息前先获取相关信息
      chooseInfo(n) {
        console.log('到底会给我什么样的信息呢', n)
        this.ruleFormOperatorImpower.name = n.name
        this.ruleFormOperatorImpower.username = n.userName
        this.commonId = n.id
        this.$axios(
          {
            method: 'post',
            url: this.apiEditorGet + '?id=' + n.id,
            data: {}
          }
        ).then(res => {
          console.log('操作员管理点击获取的是什么信息', res.data.value)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm = res.data.value
            this.ruleForm.userName = res.data.value.name
            this.ruleForm.sex = res.data.value.sex == '1' ? '男' : '女'


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
        this.ruleForm.sex = this.ruleForm.sex == '男' ? '1' : '2'
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.operatorManageSign = false
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
        this.ruleForm.sex = this.ruleForm.sex == '男' ? '1' : '2'
        this.$axios(
          {
            method: 'post',
            url: this.apiEditor,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('编辑接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.operatorManageSign = false
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },
      //操作员管理启用
      enableInfo() {
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
      //操作员管理禁用
      disableInfo() {
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
      //操作员管理弃用
      abandonInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiAbandon + '?id=' + this.commonId,
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
      //授权操作(获取已经有哪些权利角色，和有哪些角色可以选择授权)
      impowerInfo() {
        this.ruleFormOperatorImpower.ImpowerRole = []
        this.$axios(
          {
            method: 'post',
            url: this.apiCanChooseRole + '?id=' + this.commonId,
            data: {}
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            this.roleArr = [...res.data.value.authed]
            this.canChooseRoleArr = [...res.data.value.canAuth]
            this.$store.state.operatorImpowerSign = true
            console.log('有哪些角色可以授权：', res.data)
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },
      //确认提交授权
      sureImpowerInfo() {
        console.log('canChooseRoleArr:', this.canChooseRoleArr)
        var skt = []
        console.log('选了哪些+++++，',this.ruleFormOperatorImpower.ImpowerRole)
        let myChooseRole = this.ruleFormOperatorImpower.ImpowerRole

        for(let s=0;s<myChooseRole.length;s++){
          for(let r=0;r<this.canChooseRoleArr.length;r++){
            // console.log(myChooseRole[s],'?????',this.canChooseRoleArr[r].name)
            if(myChooseRole[s] == this.canChooseRoleArr[r].name){
              skt.push(this.canChooseRoleArr[r].id)
            }
          }
        }




        // for (let k = 0; k < this.canChooseRoleArr.length; k++) {
        //   skt.push(this.canChooseRoleArr[k].id)
        // }

        this.$axios(
          {
            method: 'post',
            url: this.apiSureImpower,
            data: {
              "id": this.commonId,
              "ids": skt
            }
          }
        ).then(res => {
          console.log('授权结果反馈：', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.operatorImpowerSign = false
            // this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },
      //通过id获取可授全景区的数组数据
      getChooseImpowerScenery() {
        this.$axios(
          {
            method: 'post',
            url: this.apiCanChooseScenery + '?id=' + this.commonId,
            data: {}
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {

            this.valueS = []
            this.$store.state.tntArr = [...res.data.value.canAuth, ...res.data.value.authed]
           for(let n=0;n<res.data.value.authed.length;n++){
              this.valueS.push(res.data.value.authed[n].id)
           }

            console.log('返回了哪些可以选择授权的景区啊啊啊啊++：', res.data, this.valueS)
            this.getDataImpowerSceneryInfo()
            this.$store.state.impowerScenerySign = true


          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },

      //默认获取授权景区的相关信息之后将信息呈现到穿梭框中的方法
      getDataImpowerSceneryInfo() {
        this.dataS = []
        for (let i = 0; i < this.$store.state.tntArr.length; i++) {
          this.dataS.push({
            key: this.$store.state.tntArr[i].id,
            label: `${ this.$store.state.tntArr[i].name }`,
          });
        }
      },

      //确认提交景区授权
      sureImpowerSceneryInfo() {
        alert('注意看哈')
        console.log(this.valueS)
        this.$axios(
          {
            method: 'post',
            url: this.apiSureImpowerScenery,
            data: {
              "id": this.commonId,
              "ids": this.valueS
            }
          }
        ).then(res => {
          console.log('授权结果反馈：', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.impowerScenerySign = false
            // this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },
      //重置密码
      resetPasswordInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiResetPassword + '?id=' + this.commonId,
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
      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "userName": "",
              "phone": "",
              "deptName": "",
              "name": "",
              "status": "",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('操作员管理返回的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.total
            // console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.list]

            // console.log('赋值的数据', this.tableData)
            // that.$store.state.showLoading = false
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },

      //查询按钮返回列表数据
      queryInfos(n) {

        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "userName": this.$store.state.loginNameParam,
              "phone": this.$store.state.userTelParam,
              "deptName": this.$store.state.deptNameParam,
              "name": "",
              "status": this.$store.state.sceneryStateParam,
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

      //所属区域：获取焦点打开编辑状态下的选择区域模态框
      openEditorAreaDialog() {
        this.$store.state.editorOrSearch = '编辑'
        // console.log(this.$store.state.editorOrSearch)
        this.openAreaDialog()
      },

      //所属区域input框获取焦点是打开区域选择模态框并返回所有区域信息
      openAreaDialog() {
        this.$axios(
          {
            method: 'post',
            url: this.apiDropDownOrganization,
            data: {}
          }
        ).then(res => {
          console.log('注意查看区域信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.dataOrganization = [...res.data.value]
            this.$store.state.chooseOrganizationDialog = true
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },

      //选择了具体区域信息以后，返回针对性的id和name
      transferOrganizationId(n) {
        console.log('猜我收到了什么哦', n)
        this.ruleForm.deptId = n.id
        this.ruleForm.deptName = n.name

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');

            if (formName === 'ruleForm') {
              // this.$store.state.operatorManageSign = false
              if (this.$store.state.titleHeader === '新增') {
                alert('触发了')
                this.addInfo()
              } else if (this.$store.state.titleHeader === '编辑') {
                this.editorInfo()
              }

            } else if (formName === 'ruleFormOperatorImpower') {
              // this.$store.state.operatorImpowerSign = false

              this.sureImpowerInfo()
            } else if (formName === 'ruleFormImpowerScenery') {

              this.sureImpowerSceneryInfo()
              // this.$store.state.impowerScenerySign = false
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
          this.$store.state.operatorManageSign = false
        } else if (formName === 'ruleFormOperatorImpower') {
          this.$store.state.operatorImpowerSign = false
        } else if (formName === 'ruleFormImpowerScenery') {
          this.$store.state.impowerScenerySign = false
        }
      },
      chooseHeaderPicture() {
        console.log('选择需要上传的图片')
        this.headerUrl = '../../static/bg1.png'
      }

    }
  }
</script>

<style scoped>

</style>
