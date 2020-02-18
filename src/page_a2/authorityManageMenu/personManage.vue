<template>
  <div>
    <mySearchs
      :searchIfInfo="searchIfInfo"
      @queryInfos="queryInfos"
    >

    </mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowEnabled="isShowEnabled"
      :isHandle="isHandle"
      @queryInfos="queryInfos"
      @getEditorInfos="getEditorInfos"
    >
    </myTables>

    <!--第一个是角色新增编辑模态-->
    <div id="addEditorForm">
      <el-dialog title="编辑" :visible.sync="$store.state.personManageSign2" width="30%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="18" :offset="2">
              <el-form-item label="角色名称">
                <el-col>
                  <el-select v-model="ruleForm.roleName" class="change_select_style" size="small" placeholder="请选择角色名称">
                    <el-option
                      v-for="item in roleNameArr"
                      :key="item.ID"
                      :label="item.Name"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
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

  </div>
</template>

<script>
  export default {
    name: "person-manage",
    data() {
      return {
        sign: 'personManage2',
        apiQuery2: '/a2guider/account/query',
        apiRoleDropDown:'/a2guider/role/dropDown',
        apiEditor2:'/a2guider/account/roleChang',
        searchIfInfo: true,
        isShowEnabled: true,
        commonId:'',
        isHandle: true,
        ruleForm: {
          "roleName": "",
          "roleId":""

        },
        roleNameArr:[
          {
            ID: '0',
            Name: '超级权限'
          },
          {
            ID: '1',
            Name: '景区权限'
          },
        ],
        tableTitle: [
          {
            prop: 'Name',
            label: '景区名称',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'UserAccount',
            label: '登录账号',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'Address',
            label: '地址',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'RoleName',
            label: '角色名称',
            // width: '120',
            align: 'center'
          },

        ],
        tableData: [
          // {
          //   "ID": 1262,
          //   "Address": "麦田中心",
          //   "Name": "新疆17",
          //   "RoleID": null,
          //   "UserAccount": "xki17",
          //   "RoleName": null
          //
          // }
        ]
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
      getDefaultInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "search": '',
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('A2人员管理页面返回+', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.totalParam = res.data.value.total
            this.tableData = [...res.data.value.list]
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },

      //查询按钮或者点击翻页按钮返回列表数据
      queryInfos(n) {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "search":this.$store.state.searchIfInfoParam2,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('返回的数据', res.data.value.list)
            if(res.data.value.length=='0'){
              this.tableData = []
              this.$store.state.totalParam = 0
            }else {
              this.tableData = [...res.data.value.list]
              this.$store.state.totalParam = res.data.value.total
            }

            console.log('赋值的数据', this.tableData)

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //权限管理--人员管理列表内部编辑按钮触发事件
      getEditorInfos(n){
        // alert('授权')
        this.commonId = n.ID

        this.getRoleDropDown()

      },

      //获取角色下拉信息方法函数
      getRoleDropDown(){
        this.$axios(
          {
            method:'get',
            url:this.apiRoleDropDown,
            data:{}
          }
        ).then(res => {

          console.log('人员管理编辑：',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
                this.$store.state.personManageSign2 = true
                this.roleNameArr = [...res.data.value]

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //编辑修改角色名称后信息提交
      editorInfo(){
        this.$axios(
          {
            method:'post',
            url:this.apiEditor2,
            data:{
              "ID":this.commonId,
              "RoleID":this.ruleForm.roleName

            }
          }
        ).then(res => {
          console.log('修改角色名称是否成功',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.$store.state.personManageSign2 = false
            this.getDefaultInfo()

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })
      },


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            if (formName === 'ruleForm') {
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
          this.$store.state.personManageSign2 = false
        }

      },
    }
  }
</script>

<style scoped>

</style>
