<template>
  <div class="district_manage_style">
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
      ></mySearchs>
      <myTables
        :tableTitle="tableTitle"
        :tableData="tableData"
        @chooseInfo="chooseInfo"
        @queryInfos="queryInfos"
      ></myTables>
    </div>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.districtManageSign" width="30%"
                 align="left" :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="18" :offset="2">
              <el-form-item label="上级区域">
                <el-col>
                  <el-input v-model="ruleForm.areaName" @focus="openEditorAreaDialog"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="区域码">
                <el-col>
                  <el-input v-model="ruleForm.code"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="国际电话区码">
                <el-col>
                  <el-input v-model="ruleForm.phoneCode"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="区域名称">
                <el-col>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="首字母">
                <el-col>
                  <el-input v-model="ruleForm.initial"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="简拼">
                <el-col>
                  <el-input v-model="ruleForm.simpleSpell"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="全拼">
                <el-col>
                  <el-input v-model="ruleForm.fullSpell"></el-input>
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

    <chooseAreaDialog
      :dataArea="dataArea"
      @transferAreaId="transferAreaId"
    ></chooseAreaDialog>
  </div>
</template>

<script>
  export default {
    name: "district-manage",
    data() {
      return {
        apiQuery: '/mis/area/query',
        apiDropDownArea: '/mis/area/queryDropDownTotal',//此接口为此页面唯一性，和其他页面下拉区域选择时有区别的哦
        apiEditorGet: '/mis/area/get',
        apiAdd: '/mis/area/add',
        apiEditor: '/mis/area/edit',
        apiEnable: '/mis/area/enable',
        apiDisable: '/mis/area/disable',
        sign: 'districtManageSign',
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮
        isToolBar: true,//这个属于树形视图页面独有的属性，重点注意，表示是否显示筛选按钮及查询按钮
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        tableTitle: [
          {
            prop: 'code',
            label: '标准区域码',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'phoneCode',
            label: '国际电话区码',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'name',
            label: '标准区域名称',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'parentName',
            label: '父级区域',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'fullName',
            label: '区域全名称',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'simpleSpell',
            label: '简拼',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'fullSpell',
            label: '全拼',
            // width: '100',
            align: 'center'
          },
        ],
        tableData: [],
        // data: [
        //   {
        //     id:1,
        //     label: '全国',
        //     children: [
        //       {
        //         id:2,
        //         label: '中国',
        //         children: [
        //           {
        //             id:3,
        //             label: '四川',
        //             children: [
        //               {
        //                 id:4,
        //                 label: '成都'
        //               },
        //               {
        //                 id:5,
        //                 label: '自贡'
        //               },
        //               {
        //                 id:6,
        //                 label: '宜宾'
        //               }
        //             ]
        //           },
        //           {
        //             id:7,
        //             label: '江苏',
        //             children: [
        //               {
        //                 id:8,
        //                 label: '苏州'
        //               },
        //               {
        //                 id:9,
        //                 label: '南京'
        //               },
        //               {
        //                 id:10,
        //                 label: '昆山'
        //               }
        //             ]
        //           }
        //         ]
        //       },
        //       {
        //         label: '澳大利亚',
        //         children: [
        //           {
        //             label: '澳大利亚城市一'
        //           },
        //           {
        //             label: '澳大利亚城市二'
        //           }
        //         ]
        //       },
        //       {
        //         label: '越南',
        //         children: [
        //           {
        //             label: '越南城市一'
        //           },
        //           {
        //             label: '越南城市二'
        //           },
        //         ]
        //       }
        //     ]
        //   }
        // ],
        dataArea:[],//此数据为新增编辑里面选择区域的展示数据
        //以下为左边默认的区域树形结构数据
        data: [
          {
            id: 1,
            name: "中国",
            parentId: 0,
            children: null,
          },
          {
            id: 8,
            name: "美国",
            parentId: 0,
            children: null,
          },
        ],
        ruleForm: {
          "parentId":1,//上级区域id
          "areaName":'',//上级区域名称
          "code":"510100",
          "phoneCode":"+86",
          "name":"成都市",
          "initial":"C",
          "simpleSpell":"CDS",
          "fullSpell":"CHENGDUSHI"
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
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.getDefaultInfo()
      this.getDefaultTrees()
    },
    methods: {
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
          console.log('嘻嘻获取的是什么信息', res.data.value)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm = res.data.value
            this.ruleForm.areaName = res.data.value.parentName


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
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.districtManageSign = false
            this.getDefaultInfo()
          }else{
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
            this.$store.state.districtManageSign = false
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
              "areaId": this.$store.state.areaManageIdParam,
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('区域管理返回的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.total
            console.log('返回的数据', that.$store.state.totalParam)
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
        this.$store.state.areaManageIdParam = n.id
        this.$store.state.pageNumParam = 1
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "areaId": this.$store.state.areaManageIdParam,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('区域管理返回的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.total
            console.log('返回的数据', that.$store.state.totalParam)
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
            url: this.apiDropDownArea,
            data: {}
          }
        ).then(res => {
          // console.log('获取树形结构图数据', res.data)
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
        // console.log('我要传值了哦', n)
        // if (n.sceneryGrade == 0) {
        //   n.sceneryGrade = ''
        // }
        // if (n.sceneryState == 2) {
        //   n.sceneryState = ''
        // }
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "areaId": this.$store.state.areaManageIdParam,
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
        console.log(this.$store.state.editorOrSearch)
        this.openAreaDialog()
      },

      //所属区域input框获取焦点是打开区域选择模态框并返回所有区域信息
      openAreaDialog() {
        this.$axios(
          {
            method: 'post',
            url: this.apiDropDownArea,
            data: {}
          }
        ).then(res => {
          console.log('注意查看区域信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.dataArea = [...res.data.value]
            this.$store.state.chooseAreaDialog = true
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },

      //选择了具体区域信息以后，返回针对性的id和name
      transferAreaId(n) {
        // console.log('猜我收到了什么哦',n)
        this.ruleForm.parentId = n.id
        this.ruleForm.areaName = n.name

      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            if (this.$store.state.titleHeader === '新增') {
              this.addInfo()
            } else if (this.$store.state.titleHeader === '编辑') {
              this.editorInfo()
            }

            // this.$store.state.districtManageSign = false
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
        this.$store.state.districtManageSign = false
      },

    }

  }
</script>

<style scoped>

</style>
