<template>
  <div>
    <mySearchs
      :sign="sign"
      :loginName="loginName"
      :affiliatedAreaRRR="affiliatedAreaRRR"
      :isAdd="isAdd"
      :isAreaManage="isAreaManage"
      @queryInfos="queryInfos"
      @addBeforeClear="addBeforeClear"
      @getDefaultInfo4="getDefaultInfo4"
    >
    </mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowEnabled="isShowEnabled"
      :isHandle="isHandle"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
      @getEditorInfos="getEditorInfos"
      @delListInfo="delListInfo"
    >
    </myTables>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.areaManageListSign2" width="35%"
                 align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="23" v-if="$store.state.titleHeader=='新增'">
              <el-form-item label="片区名称">
                <el-col>
                  <el-input v-model="ruleForm.Name" placeholder="请输入片区名称"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23" v-if="$store.state.titleHeader!='新增'">
              <el-form-item label="片区名称">
                <el-col>
                  <el-input v-model="ruleForm.Name" placeholder="请输入片区名称" :disabled="true"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23" v-if="$store.state.titleHeader=='新增'">
              <el-form-item label="登录名">
                <el-col>
                  <el-input v-model="ruleForm.UserAccount" placeholder="请输入登录名"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23" v-if="$store.state.titleHeader!='新增'">
              <el-form-item label="登录名">
                <el-col>
                  <el-input v-model="ruleForm.UserAccount" placeholder="请输入登录名" :disabled="true"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="登录密码">
                <el-col>
                  <el-input v-model="ruleForm.UserPwd" placeholder="请输入登录密码"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

          </el-row>
          <el-form-item>
            <el-col :span="9" :offset="12">
              <el-button @click="cancelForm('ruleForm')">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <div id="userInfoForm">
      <el-dialog
        title="片区管理详情"
        :visible.sync="centerDialogVisible"
        width="70%"
        align="left">
        <mySearchs
          :sign="sign2"
          :isAddAdd2="isAddAdd2"
          :canChooseScenery="canChooseScenery"
          :canChooseSceneryArr="canChooseSceneryArr"
          @addSceneryIntoArea="addSceneryIntoArea"
        >
        </mySearchs>
        <myTables
          :sign="sign2"
          :tableTitle="tableTitle2"
          :tableData="tableData2"
          :isShowEnabled="isShowEnabled"
          :isHandle="isHandle"
          :isPagePageShow="isPagePageShow"
          @queryInfosX="queryInfosX"
          @delListInfo2222="delListInfo2222"
        >
        </myTables>


        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "area-manage-list",
    data() {
      return {
        centerDialogVisible: false,
        AreaID: '',//点击片区管理按钮前获取到相关id用于对应查询
        sign: 'areaManageList2',
        sign2: 'sign2222',
        apiQuery2: '/a2guider/areaTable/query',
        apiQuery4: '/a2guider/areaGencyID/query',
        apiAdd2: '/a2guider/areaTable/add',
        apiEditor2: '/a2guider/areaTable/edit',
        apiGetDropDownScenery: '/a2guider/travelGency/dropDown',
        apiAddSceneryToArea: '/a2guider/areaGencyID/add',
        apiDel2: '/a2guider/areaTable/delete',
        apiDel2222:'/a2guider/areaGencyID/delete',
        apiCheckedMore: '/a2guider/areaTable/existed',
        loginName: true,
        affiliatedAreaRRR: true,
        isAdd: true,
        isAddAdd2: true,
        canChooseScenery: true,
        canChooseSceneryArr: [],//A2片区管理按钮进入后，下拉内容数据组
        isAreaManage: true,
        isShowEnabled: true,
        isHandle: true,
        isPagePageShow: true,
        ruleForm: {
          "Name": "",
          "UserAccount": "",
          "UserPwd": "",
          'id': ''
        },
        tableTitle: [

          {
            prop: 'Name',
            label: '片区名称',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'User',
            label: '登录名',
            // width: '120',
            align: 'center'
          },

        ],
        tableData: [
          // {
          //   "ID": 15,
          //   "Name": "测试片区信息",
          //   "User": "ceshipianqu"
          // }
        ],

        tableTitle2: [

          {
            prop: 'areaName',
            label: '片区名称',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'gencyName',
            label: '景区名称',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'gencyAddress',
            label: '景区地址',
            // width: '120',
            align: 'center'
          },

        ],
        tableData2: [
          // {
          //   "ID": 1262,
          //   "areaName": "麦田中心",
          //   "gencyName": "新疆17",
          //   "gencyAddress": null
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

      //获取基础列表信息
      getDefaultInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "Name": "",
              "User": "",
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('A2片区返回+', res.data)
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

      //获取二次模态框里面的列表信息
      getDefaultInfo4() {

        //第一个请求是获取下拉信息数组
        this.$axios(
          {
            method: 'get',
            url: this.apiGetDropDownScenery,
            data: {}
          }
        ).then(res => {
          console.log('下拉有些什么东西', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.canChooseSceneryArr = [...res.data.value]

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

        //第二个请求是获取列表数据信息
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery4,
            data: {
              "AreaID": this.AreaID,
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParamX
            }
          }
        ).then(res => {
          console.log('A2片区返回+', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.totalParamX = res.data.value.total
            this.tableData2 = [...res.data.value.list]
            this.centerDialogVisible = true

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },

      //片区管理--向片区里面添加新的景区
      addSceneryIntoArea(n) {
        // console.log('我得到了杀',n)
        this.$axios(
          {
            method: 'post',
            url: this.apiAddSceneryToArea,
            data: {
              "AreaID": this.AreaID,
              "GencyID": n

            }
          }
        ).then(res => {
          console.log('添加功能是否可以成功哈哈哈；', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.getDefaultInfo4()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },

      //点击片区管理按钮事件前，先点击表格内部对应行，获取相关片区ID
      chooseInfo(n) {
        this.AreaID = n.ID
        console.log('小矮人', this.AreaID)
      },

      //查询按钮或者点击翻页按钮返回列表数据
      queryInfos(n) {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "Name": this.$store.state.affiliatedAreaParamRRR,
              "User": this.$store.state.loginNameParam,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('返回的数据', res.data.value.list)
            if (res.data.value.length == '0') {
              this.tableData = []
              this.$store.state.totalParam = 0
            } else {
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

      //模态框里面的点击翻页按钮返回的数据列表
      queryInfosX(){

        this.$axios(
          {
            method: 'post',
            url: this.apiQuery4,
            data: {
              "AreaID": this.AreaID,
              "pageNum": this.$store.state.pageNumParamX,
              "pageSize": this.$store.state.pageSizeParamX
            }
          }
        ).then(res => {
          console.log('A2片区返回+', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.totalParamX = res.data.value.total
            this.tableData2 = [...res.data.value.list]
            this.centerDialogVisible = true

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },

      //新增之前清空表单数据函数
      addBeforeClear() {

        this.$store.state.areaManageListSign2 = true
        for (var i in this.ruleForm) {
          this.ruleForm[i] = ''
        }

      },

      //点击编辑时获取默认的对应相关信息
      getEditorInfos(n) {
        console.log('点击编辑后', n)
        this.$store.state.titleHeader = '编辑'
        this.ruleForm.UserAccount = n.User
        this.ruleForm.UserPwd = ''
        this.ruleForm.Name = n.Name
        this.ruleForm.id = n.ID
        this.$store.state.areaManageListSign2 = true
      },


      //点击删除按钮事件
      delListInfo(n) {
        this.$axios(
          {
            method: 'get',
            url: this.apiDel2 + '?ID=' + n.ID,
            data: {}
          }
        ).then(res => {
          console.log('A2删除', res.data)
          if (res.data.resultStatus.resultCode === '0000') {

            this.getDefaultInfo()

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        })

      },

      //二级模态框内点击删除按钮事件
      delListInfo2222(n) {
        this.$axios(
          {
            method: 'get',
            url: this.apiDel2222 + '?ID=' + n.ID,
            data: {}
          }
        ).then(res => {
          console.log('A2删除', res.data)
          if (res.data.resultStatus.resultCode === '0000') {

            this.getDefaultInfo4()

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        })

      },


      //新增提交之前需要先对登录名进行查重
      checkedMore() {
        let that = this
        this.$axios(
          {
            method: 'get',
            url: this.apiCheckedMore + '?User=' + this.ruleForm.UserAccount,
            data: {}
          }
        ).then(res => {
          console.log('查询重复结果返回', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            if (!res.data.value.result) {
              that.addInfo()
            } else {
              alert('登录名已存在，请重新输入')
            }

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },

      //开始提交新增信息
      addInfo() {
        console.log('开始提交新增信息')

        this.$axios(
          {
            method: 'post',
            url: this.apiAdd2,
            data: {
              "User": this.ruleForm.UserAccount,
              "Pwd": this.ruleForm.UserPwd,
              "Name": this.ruleForm.Name
            }
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.areaManageListSign2 = false
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },
      //开始提交编辑修改信息
      editorInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiEditor2,
            data: {
              "ID": this.ruleForm.id,
              "Pwd": this.ruleForm.UserPwd
            }
          }
        ).then(res => {
          console.log('编辑的信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.areaManageListSign2 = false
            this.getDefaultInfo()

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // if (this.$store.state.titleHeader === '新增') {
            //   this.addInfo()
            // } else if (this.$store.state.titleHeader === '编辑') {
            //   this.editorInfo()
            // }

            if (formName === 'ruleForm') {

              if (this.$store.state.titleHeader === '新增') {
                // this.addInfo()
                this.checkedMore()
                //此处没有直接调用新增函数是在新增之前要做一个信息查重事件，

              } else if (this.$store.state.titleHeader === '编辑') {
                this.editorInfo()
              }

            }


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      cancelForm(formName) {
        this.$refs[formName].resetFields();
        this.$store.state.areaManageListSign2 = false
      },
    }
  }
</script>

<style scoped>

</style>
