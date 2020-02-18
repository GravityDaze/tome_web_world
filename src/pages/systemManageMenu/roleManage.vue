<template>
  <div>
    <mySearchs
      :sign="sign"
      :jurisdictionTag="jurisdictionTag"
      :roleName="roleName"
      :sceneryState="sceneryState"

      :isAdd="isAdd"
      :isEditor="isEditor"
      :isEnabled="isEnabled"
      :isDisabled="isDisabled"
      :isRoleImpower="isRoleImpower"
      :isFunctionImpower="isFunctionImpower"
      :isReloadImpower="isReloadImpower"
      @enableInfo="enableInfo"
      @disableInfo="disableInfo"
      @queryInfos="queryInfos"
      @getChooseRoleInfos="getChooseRoleInfos"
      @getChooseFunctionInfos="getChooseFunctionInfos"
    ></mySearchs>
    <myTables
      :tableTitle="tableTitle"
      :tableData="tableData"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
    ></myTables>
    <!--第一个是角色新增编辑模态-->
    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.roleManageSign" width="30%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="18" :offset="2">
              <el-form-item label="角色名">
                <el-col>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="权限标识">
                <el-col :span="6">
                  <el-button type="primary">ROLE_</el-button>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="ruleForm.mark"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="显示顺序">
                <el-col>
                  <el-input v-model="ruleForm.sort"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="角色描述">
                <el-col>
                  <el-input type="textarea" :autosize="{minRows:3,maxRows:6}"
                            v-model="ruleForm.description"></el-input>
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
    <!--第二个是角色授权模态框-->
    <div id="userInfoForm">
      <el-dialog title="角色授权" :visible.sync="$store.state.roleImpowerSign" width="25%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleFormRoleImpower" :rules="rulesRoleImpower" ref="ruleFormRoleImpower" label-width="100px"
                 class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="18" :offset="2">
              <el-form-item label="角色名">
                <el-col>
                  <!--<el-input v-model="ruleFormRoleImpower.roleName"></el-input>-->
                  <span>{{ruleFormRoleImpower.name}}</span>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="可授角色">
                <el-col>

                  <el-checkbox-group v-model="ruleFormRoleImpower.ImpowerRole">

                    <template v-for="item in canChooseRoleArr">
                      <el-checkbox :label="item.name" style="border:1px solid lightgrey;min-width:150px;width:1.5rem"></el-checkbox>
                    </template>
                  </el-checkbox-group>
                </el-col>

              </el-form-item>
            </el-col>


          </el-row>
          <el-form-item>
            <el-col :span="10" :offset="6" style="display: flex;flex-wrap: nowrap">
              <el-button @click="cancelForm('ruleFormRoleImpower')">关闭</el-button>
              <el-button type="primary" @click="submitForm('ruleFormRoleImpower')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!--第三个是功能授权模态框-->
    <div id="sceneryAllInfo">
      <el-dialog title="功能授权" :visible.sync="$store.state.roleFunctionImpowerSign" width="25%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleFormRoleFunctionImpower" :rules="rulesRoleFunctionImpower"
                 ref="ruleFormRoleFunctionImpower" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="18" :offset="2">
              <el-form-item label="角色名">
                <el-col>
                  <!--<el-input v-model="ruleFormRoleImpower.roleName"></el-input>-->
                  <span>{{ruleFormRoleImpower.name}}</span>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="功能权限">
                <el-col>
                  <!--<el-tree-->
                  <!--:data="dataTree"-->
                  <!--:props="defaultProps"-->
                  <!--node-key="id"-->
                  <!--:default-expanded-keys="[3]"-->
                  <!--@node-click="handleNodeClick"-->
                  <!--&gt;</el-tree>-->
                  <el-tree
                    :data="dataTree"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :default-expanded-keys="[1]"
                    :default-checked-keys="impowerFunctionIdsShowArr"
                    :props="defaultProps"
                  >
                  </el-tree>
                </el-col>

              </el-form-item>
            </el-col>


          </el-row>
          <el-form-item>
            <el-col :span="10" style="display: flex;flex-wrap: nowrap">
              <el-button @click="getCheckedKeys">确认勾选</el-button>
            </el-col>
            <el-col :span="10" :offset="2" style="display: flex;flex-wrap: nowrap">
              <el-button @click="cancelForm('ruleFormRoleFunctionImpower')">关闭</el-button>
              <el-button type="primary" @click="submitForm('ruleFormRoleFunctionImpower')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "role-manage",
    data() {
      return {
        apiQuery: '/uc/role/query',
        apiEditorGet: '/uc/role/get',
        apiAdd: '/uc/role/add',
        apiEditor: '/uc/role/edit',
        apiEnable: '/uc/role/enable',
        apiDisable: '/uc/role/disable',
        apiCanChooseRole: '/uc/role/getRoleAuth',//角色授权的选择信息获取
        apiSureImpowerRole: '/uc/role/addOrEditRoleAuth',//角色授权
        apiCanChooseFunction: '/mis/role/getFunctionAuth',//功能授权的选择获取
        apiSureImpowerFunction: '/mis/role/addOrEditFunctionAuth',//功能授权
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        sign: 'roleManageSign',
        jurisdictionTag: true,
        roleName: true,
        sceneryState: true,
        defaultProps: {
          children: 'children',
          label: 'name'
        },//功能树
        dataTree: [
          // {
          //   children: [
          //     {
          //       children: [],
          //       iconStyle: '',
          //       id: 2,
          //       method: 1,
          //       name: "首页",
          //       no: "M00002",
          //       parentId: 1,
          //       refreshable: 0,
          //       sort: 0,
          //       type: 0,
          //       url: "/home"
          //     }
          //   ],
          //   iconStyle: '',
          //   id: 1,
          //   method: 0,
          //   name: "系统根",
          //   no: "M00000",
          //   parentId: 0,
          //   refreshable: 0,
          //   sort: 0,
          //   type: 0,
          //   url: '',
          // }
        ],
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮
        isRoleImpower: true,
        isFunctionImpower: true,
        isReloadImpower: false,
        tableTitle: [
          {
            prop: 'name',
            label: '角色名称',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'mark',
            label: '权限标识',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'sort',
            label: '显示顺序',
            width: '100',
            align: 'center'
          },
          {
            prop: 'description',
            label: '角色描述',
            // width: '100',
            align: 'center'
          },

        ],
        tableData: [],
        impowerFunctionIdsShowArr:[],
        flagParam:false,//此参数用于功能授权时，必须先点击确认勾选才可以提交，否则不能提交
        impowerFunctionIdsArr:[],
        ruleForm: {
          "name": "",
          "mark": "",
          "sort": '1',
          "description": "",
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
        ruleFormRoleImpower: {
          name: '猪头角色',
          ImpowerRole: [],
        },
        rulesRoleImpower: {
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
        ruleFormRoleFunctionImpower: {
          roleName: '猪头角色',
          ImpowerRole: [],
        },
        rulesRoleFunctionImpower: {
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
        // console.log('到底会给我什么样的信息呢',n)
        this.commonId = n.id
        this.ruleFormRoleImpower.name = n.name
        this.$axios(
          {
            method: 'post',
            url: this.apiEditorGet + '?id=' + n.id,
            data: {}
          }
        ).then(res => {
          console.log('嘻嘻获取的是什么信息+++', res.data.value)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm = res.data.value
            // this.ruleForm.superiorOrganization = res.data.value.parentName
            // this.ruleForm.parentId = res.data.value.parentId


            // this.$message.success('获取信息成功，可进行信息编辑')
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },

      //新增信息
      addInfo() {
        console.log('开始提交新增信息')
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.roleManageSign = false
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
        this.$axios(
          {
            method: 'post',
            url: this.apiEditor,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('编辑接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.roleManageSign = false
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //启用
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
      //禁用
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
      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "name": '',
              "status": '',
              "mark": '',
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('角色管理返回的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.total
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
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "name": this.$store.state.roleNameParam,//角色名称
              "status": this.$store.state.sceneryStateParam,
              "mark": this.$store.state.jurisdictionTagParam,//权限标识
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

      //角色授权的选择信息获取
      getChooseRoleInfos() {
        this.$axios(
          {
            method: 'post',
            url: this.apiCanChooseRole + '?id=' + this.commonId,
            data: {}
          }
        ).then(res => {

          if (res.data.resultStatus.resultCode === '0000') {
            console.log('获取角色授权选择信息数组', res.data)
            //以下赋值是将已经有的角色权利和可选的合并，方便选择之后上传完整的角色权利

            // this.canChooseRoleArr = [...res.data.value.canAuth, ...res.data.value.authed]
            // this.ruleFormRoleImpower.ImpowerRole = []

            this.canChooseRoleArr = [...res.data.value.canAuth]
            this.ruleFormRoleImpower.ImpowerRole = [] //此数组控制已选择框
            let midArr = [...res.data.value.authed]

            //hahah

            for(let i=0;i<midArr.length;i++){
              this.ruleFormRoleImpower.ImpowerRole.push(midArr[i].name)
            }


            this.$store.state.roleImpowerSign = true
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },
      //提交角色授权信息
      sureChooseRoleInfos() {
        // alert('注意了，注意了')
        console.log('选择了的++', this.ruleFormRoleImpower.ImpowerRole, '全部的++', this.canChooseRoleArr)
        var ids = []
        var arr1 = this.canChooseRoleArr
        var arr2 = this.ruleFormRoleImpower.ImpowerRole
        for (let i = 0; i < arr2.length; i++) {
          for (let t = 0; t < arr1.length; t++) {
            if (arr2[i] == arr1[t].name) {
              ids.push(arr1[t].id)
            }
          }
        }

        console.log('ids:++++', ids)
        this.$axios(
          {
            method: 'post',
            url: this.apiSureImpowerRole,
            data: {
              "id": this.commonId,
              "ids": ids
            }
          }
        ).then(res => {
          console.log(res.data)
          if (res.data.resultStatus.resultCode === '0000') {

            this.$store.state.roleImpowerSign = false
            this.$message.success(res.data.resultStatus.resultMessage)
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          this.$message.warning(res.data.resultStatus.resultMessage)
        })
      },
      //功能授权的选择信息获取
      getChooseFunctionInfos() {
        this.$axios(
          {
            method: 'post',
            url: this.apiCanChooseFunction + '?id=' + this.commonId,
            data: {}
          }
        ).then(res => {

          if (res.data.resultStatus.resultCode === '0000') {
            console.log('LLL功能授权获取相关信息', res.data)
            this.dataTree = [...res.data.value.canAuth]

            this.impowerFunctionIdsShowArr =[]
            let midArr2 = [...res.data.value.authed]
            for(let t=0;t<midArr2.length;t++){
              this.impowerFunctionIdsShowArr.push(midArr2[t].id)
            }



            this.$store.state.roleFunctionImpowerSign = true

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },
      //提交功能授权信息
      sureChooseFunctionInfos() {

        if(!this.flagParam){
          this.$message.warning('请先确认勾选，再提交数据')
          return
        }


        var ids2 = []
         ids2 = [...this.impowerFunctionIdsArr]
         // ids2 = [...this.impowerFunctionIdsShowArr]

        console.log(ids2)
        this.$axios(
          {
            method: 'post',
            url: this.apiSureImpowerFunction,
            data: {
              "id": this.commonId,
              "ids": ids2
            }
          }
        ).then(res => {
          // console.log(res.data)

          this.flagParam = false

          if(res.data.resultStatus.resultCode === '0000'){

            this.$store.state.roleFunctionImpowerSign = false
            this.$message.success(res.data.resultStatus.resultMessage)
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          this.$message.warning(res.data.resultStatus.resultMessage)
        })
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            if (formName === 'ruleForm') {

              if (this.$store.state.titleHeader === '新增') {
                this.addInfo()
              } else if (this.$store.state.titleHeader === '编辑') {
                this.editorInfo()
              }

              // this.$store.state.roleManageSign = false
            } else if (formName === 'ruleFormRoleImpower') {

              this.sureChooseRoleInfos()
              // this.$store.state.roleImpowerSign = false
            } else if (formName === 'ruleFormRoleFunctionImpower') {
              // this.$store.state.roleFunctionImpowerSign = false
              this.sureChooseFunctionInfos()
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
          this.$store.state.roleManageSign = false
        } else if (formName === 'ruleFormRoleImpower') {
          this.$store.state.roleImpowerSign = false
        } else if (formName === 'ruleFormRoleFunctionImpower') {
          this.$store.state.roleFunctionImpowerSign = false
        }

      },
      //获取树形结构所选中项ID号
      getCheckedKeys() {
        this.impowerFunctionIdsArr = []

        // console.log(this.$refs.tree.getCheckedKeys());
        //以下参数用于传递数据给ids2，即用于功能授权上传id数组
        this.impowerFunctionIdsArr = [...this.$refs.tree.getHalfCheckedKeys(),...this.$refs.tree.getCheckedKeys()]
        // var haha = [...this.$refs.tree.getHalfCheckedKeys()]

        this.impowerFunctionIdsArr.shift()
        this.flagParam = true

        //解决对应bug

        console.log('赋值是否成功：++',this.impowerFunctionIdsArr)
      },

    }
  }
</script>

<style scoped>

</style>
