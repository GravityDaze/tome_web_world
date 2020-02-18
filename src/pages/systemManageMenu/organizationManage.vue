<template>
  <div class="organization_manage_style">
    <div>
      <treeviewComponent
      :data="data"
      @chooseAreaGetListInfo="chooseAreaGetListInfo"
      ></treeviewComponent>
    </div>
    <div class="my_scroll_x">
      <mySearchs
        :sign="sign"
        :isAdd="isAdd"
        :isEditor="isEditor"
        :isEnabled="isEnabled"
        :isDisabled="isDisabled"
        :isToolBar="isToolBar"
        @enableInfo="enableInfo"
        @disableInfo="disableInfo"
        @sureAddOrEditor="sureAddOrEditor"
      ></mySearchs>
      <myTables
        :tableTitle="tableTitle"
        :tableData="tableData"
        @chooseInfo="chooseInfo"
        @queryInfos="queryInfos"
      ></myTables>
    </div>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.organizationManageSign" width="30%" align="left" :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="18" :offset="2">
              <el-form-item label="上级机构">
                <el-col>
                  <el-input v-model="ruleForm.superiorOrganization" @focus="openEditorAreaDialog" v-if="addOrEditor"></el-input>

                  <el-input v-model="ruleForm.superiorOrganization" @focus="openEditorAreaDialog" v-if="!addOrEditor" :disabled="true"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="机构名称">
                <el-col>
                  <el-input v-model="ruleForm.name"></el-input>
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

    <chooseOrganizationDialog
      :dataOrganization="dataOrganization"
      @transferOrganizationId="transferOrganizationId"
    >
    </chooseOrganizationDialog>
  </div>
</template>

<script>
    export default {
        name: "organization-manage",
      data(){
        return {
          addOrEditor:true,//此页面的新增编辑模态框有所区别，新增可以选择上一级，编辑上一级默认获取的是什么就是什么不可以在选择
          apiQuery:'/uc/dept/queryByParent',
          apiDropDownOrganization:'/uc/dept/tree',

          apiEditorGet: '/uc/dept/get',
          apiAdd: '/uc/dept/add',
          apiEditor: '/uc/dept/edit',
          apiEnable: '/uc/dept/enable',
          apiDisable: '/uc/dept/disable',
          commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
          sign:'organizationManageSign',
          isAdd: true,//显示新增按钮
          isEditor: true,//显示编辑按钮
          isEnabled: true,//显示启用按钮
          isDisabled: true,//显示禁用按钮
          isToolBar:true,//这个属于树形视图页面独有的属性，重点注意，表示是否显示筛选按钮及查询按钮
          tableTitle: [
            {
              prop: 'name',
              label: '机构名称',
              // width: '100',
              align: 'center'
            },
            {
              prop: 'parentName',
              label: '上级机构',
              // width: '100',
              align: 'center'
            },
            {
              prop: 'sort',
              label: '显示顺序',
              // width: '100',
              align: 'center'
            },
            {
              prop: 'updator',
              label: '最后更新者',
              // width: '90',
              align: 'center'
            },
            {
              prop: 'updateDatetime',
              label: '更新时间',
              // width: '180',
              align: 'center'
            },
          ],
          tableData: [],
          dataOrganization:[],//此数据为新增编辑里面选择区域的展示数据
          data: [
            {
              id:1,
              name: '平台机构',
              children: [
                {
                  id:2,
                  name: '运营部',
                  children: [
                    {
                      id:3,
                      name: '运营一部',
                    },
                    {
                      id:4,
                      name: '运营二部',

                    }
                  ]
                },
                {
                  id:5,
                  name: '技术部',
                  children: [
                    {
                      id:6,
                      name: '技术一部'
                    },
                    {
                      id:7,
                      name: '技术二部'
                    }
                  ]
                },
                {
                  id:8,
                  name: '研发部',
                  children: [
                    {
                      id:9,
                      name: '研发一部'
                    },
                    {
                      id:10,
                      name: '研发二部'
                    },
                  ]
                }
              ]
            }
            ],
          ruleForm: {
            "parentId": '',//上级机构Id
            'superiorOrganization':'',//上级机构名称
            "name": '',//本机构名称
            "sort": '',//显示顺序
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
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
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
        this.getDefaultTrees()
      },
      methods: {
        //这个函数用于确认是新增还是编辑，以控制模态框中的上一级机构是否可以选择
        sureAddOrEditor(n){
          if(n == '新增'){
            this.addOrEditor = true
          }else if(n == '编辑'){
            this.addOrEditor = false
          }
          this.$store.state.organizationManageSign = true
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
            console.log('嘻嘻获取的是什么信息+++', res.data.value)
            if (res.data.resultStatus.resultCode === '0000') {
              this.ruleForm = res.data.value
              this.ruleForm.superiorOrganization = res.data.value.parentName
              this.ruleForm.parentId = res.data.value.parentId


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
              this.$store.state.organizationManageSign = false
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
              this.$store.state.organizationManageSign = false
              this.getDefaultInfo()
            }else {
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
                "parentId":  this.$store.state.organizationParentIdParam,
                "pageNum": 1,
                "pageSize": this.$store.state.pageSizeParam
              }
            }
          ).then(res => {
            console.log('组织机构返回的数据', res.data)
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

        //选择左边树形区域结构时，自动触发列表具体对应数据请求接口
        chooseAreaGetListInfo(n) {
          var that = this
          console.log('哇哈哈哈传了什么：',n.id)
          this.$store.state.organizationParentIdParam = n.id
          this.$store.state.pageNumParam = 1
          this.$axios(
            {
              method: 'post',
              url: this.apiQuery,
              data: {
                "parentId": this.$store.state.organizationParentIdParam,
                "pageNum": this.$store.state.pageNumParam,
                "pageSize": this.$store.state.pageSizeParam
              }
            }
          ).then(res => {
            console.log('组织机构返回的数据+++++', res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              that.$store.state.totalParam = res.data.value.total
              // console.log('返回的数据', that.$store.state.totalParam)
              this.tableData = [...res.data.value.list]
              if(this.tableData.length == '0'){
                this.$message.success('此区域下没有更多数据')
              }
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }
          }).catch(error => {
            console.log(error)
          })
        },

        //默认获取树形结构数据
        getDefaultTrees() {
          this.$axios(
            {
              method: 'post',
              url: this.apiDropDownOrganization,
              data: {}
            }
          ).then(res => {
            // console.log('组织机构默认获取树形结构图数据', res.data)
            if(res.data.resultStatus.resultCode === '0000'){
              this.data = [...res.data.value]
            }else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          }).catch(error => {

          })
        },

        //查询按钮返回列表数据
        queryInfos(n) {
          this.$axios(
            {
              method: 'post',
              url: this.apiQuery,
              data: {
                "parentId": this.$store.state.organizationParentIdParam,
                "pageNum": this.$store.state.pageNumParam,
                "pageSize": this.$store.state.pageSizeParam
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
          console.log('猜我收到了什么哦',n)
          this.ruleForm.parentId = n.id
          this.ruleForm.superiorOrganization = n.name

        },

        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              // this.$store.state.organizationManageSign = false

              if (this.$store.state.titleHeader === '新增') {
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
          this.$store.state.organizationManageSign = false
        },

      }
    }
</script>

<style scoped>
</style>
