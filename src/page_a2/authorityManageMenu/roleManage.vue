<template>
  <div class="my_display_none_btn">
    <mySearchs
      :sign="sign"
      :isAdd="isAdd"
      :isFunctionImpower="isFunctionImpower"
      @queryInfos="queryInfos"
      @getChooseFunctionInfos="getChooseFunctionInfos"
    ></mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      @queryInfos="queryInfos"
      :isHandle="isHandle"
      :isShowEnabled="isShowEnabled"
      @getEditorInfos="getEditorInfos"
      @delListInfo="delListInfo"
    ></myTables>

    <!--第一个是角色新增编辑模态-->
    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.roleManageSign2" width="30%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="18" :offset="2">
              <el-form-item label="名称">
                <el-col>
                  <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
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

    <!--第二个是功能授权模态框-->
    <div id="sceneryAllInfo">
      <el-dialog title="功能授权" :visible.sync="$store.state.roleFunctionImpowerSign2" width="25%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleFormRoleFunctionImpower"
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
                    node-key="ID"
                    ref="tree"
                    :default-expanded-keys="[1]"
                    :default-checked-keys="defaultCheckedIds"
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

        apiQuery2: '/a2guider/role/query',
        apiAdd2: '/a2guider/role/add',
        apiEditor2: '/a2guider/role/roleAuth',
        apiDel2:'/a2guider/role/delete',
        apiCanChooseFunction2: '/a2guider/menu/menuAuth',//功能授权的选择获取
        apiSureImpowerFunction2: '',//功能授权
        sign: 'roleManage2',
        isAdd: true,//显示新增按钮
        isFunctionImpower: false,
        isHandle:true,
        isShowEnabled:true,
        flagParam:false,//此参数用于功能授权时，必须先点击确认勾选才可以提交，否则不能提交
        ruleForm: {
          "name": "",
        },
        defaultProps: {
          children: 'children',
          label: 'Name'
        },//功能树
        ruleFormRoleImpower: {
          name: '角色名',
          ImpowerRole: [],
        },
        ruleFormRoleFunctionImpower: {
          roleName: '角色名',
          ImpowerRole: [],
        },
        defaultCheckedIds:[],
        impowerFunctionIdsArr:[],
        commonId: '',
        dataTree: [],
        tableTitle: [
          {
            prop: 'Name',
            label: '角色名称',
            // width: '100',
            align: 'center'
          },


        ],
        tableData: [],

      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.$store.state.isShowAlert = false
      this.$store.state.addparamsss = false
      this.getDefaultInfo()
    },
    methods: {

      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'get',
            url: this.apiQuery2,
            data: {}
          }
        ).then(res => {
          console.log('角色管理返回的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.length
            this.tableData = [...res.data.value]

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },


      //功能授权之前先获取ID前先获取相关信息
      getEditorInfos(n){
        // alert('授权')
        // console.log('想要角色名',n)

        this.ruleFormRoleImpower.name = n.Name
        this.commonId = n.ID

        this.getChooseFunctionInfos()
      },

      //新增信息
      addInfo() {
        console.log('开始提交新增信息')
        this.$axios(
          {
            method: 'get',
            url: this.apiAdd2 + '?Name=' +this.ruleForm.name,
            data: {}
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.roleManageSign2 = false
            this.getDefaultInfo()
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },

      //删除
      delListInfo(n){
        // console.log('jjjjjjjjjj',n.ID)
        this.$axios(
          {
            method:'get',
            url:this.apiDel2 + '?ID=' + n.ID,
            data:{}
          }
        ).then(res => {
          console.log('开始删除角色了',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.getDefaultInfo()
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })
      },

      //编辑信息提交
      editorInfo(){

        if(!this.flagParam){
          this.$message.warning('请先确认勾选，再提交数据')
          return
        }


        this.$axios(
          {
            method:'post',
            url:this.apiEditor2,
            data:{
              "RoleID":this.commonId,
              "menuIds":this.impowerFunctionIdsArr,
            }
          }
        ).then(res => {

          this.flagParam = false

          console.log(res.data)
          if(res.data.resultStatus.resultCode === '0000'){
          this.$store.state.roleFunctionImpowerSign2 = false
            this.$message.success(res.data.resultStatus.resultMessage)

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
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

            } else if (formName === 'ruleFormRoleFunctionImpower') {

              // this.sureChooseFunctionInfos()
              this.editorInfo()
            }


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      cancelForm(formName) {
        this.$refs[formName].resetFields();
        if (formName === 'ruleForm') {
          this.$store.state.roleManageSign2 = false
        } else if (formName === 'ruleFormRoleImpower') {
          this.$store.state.roleImpowerSign = false
        } else if (formName === 'ruleFormRoleFunctionImpower') {
          this.$store.state.roleFunctionImpowerSign2 = false
        }

      },

      //功能授权的选择信息获取
      getChooseFunctionInfos() {
        this.$axios(
          {
            method: 'get',
            url: this.apiCanChooseFunction2 + '?RoleID=' + this.commonId,
            data: {}
          }
        ).then(res => {

          if (res.data.resultStatus.resultCode === '0000') {
            console.log('xxxxx功能授权获取相关信息', res.data)
            this.dataTree = [...res.data.value.canAuth]
            this.defaultCheckedIds = [...res.data.value.authed]
            this.$store.state.roleFunctionImpowerSign2 = true

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //提交功能授权信息
      sureChooseFunctionInfos() {
        var ids2 = []
        ids2 = [...this.impowerFunctionIdsArr]
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
          if(res.data.resultStatus.resultCode === '0000'){

            this.$store.state.roleFunctionImpowerSign2 = false
            this.$message.success(res.data.resultStatus.resultMessage)
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          this.$message.warning(res.data.resultStatus.resultMessage)
        })
      },

      //获取树形结构所选中项ID号
      getCheckedKeys() {
        this.impowerFunctionIdsArr = []

        // console.log(this.$refs.tree.getCheckedKeys());
        //以下参数用于传递数据给ids2，即用于功能授权上传id数组
        this.impowerFunctionIdsArr = [...this.$refs.tree.getHalfCheckedKeys(),...this.$refs.tree.getCheckedKeys()]

        // this.impowerFunctionIdsArr = [...this.$refs.tree.getCheckedKeys()]
        // var haha = [...this.$refs.tree.getHalfCheckedKeys()]

        // this.impowerFunctionIdsArr.shift()
        this.flagParam = true

        //解决对应bug

        console.log('赋值是否成功：++',this.impowerFunctionIdsArr)
      },

    }
  }
</script>

<style scoped>

</style>
