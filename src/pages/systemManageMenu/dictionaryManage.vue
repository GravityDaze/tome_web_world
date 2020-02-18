<template>
  <div class="dictionary_manage_style">
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

      <div id="addEditorForm">
        <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.dictionaryManageSign" width="30%" align="left"
                   :close-on-click-modal="false">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                   :hide-required-asterisk='false'>
            <el-row>
              <el-col :span="18" :offset="2">
                <el-form-item label="父字典">
                  <el-col>
                    <el-input v-model="ruleForm.parentName"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="18" :offset="2">
                <el-form-item label="中文名称">
                  <el-col>
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="18" :offset="2">
                <el-form-item label="英文名称">
                  <el-col>
                    <el-input v-model="ruleForm.nameEn"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="18" :offset="2">
                <el-form-item label="键">
                  <el-col>
                    <el-input v-model="ruleForm.dictKey"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="18" :offset="2">
                <el-form-item label="值">
                  <el-col>
                    <el-input v-model="ruleForm.value"></el-input>
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
  </div>
</template>

<script>
    export default {
        name: "dictionary-manage",
      data(){
        return {
          apiQuery:'/mis/dict/query',
          apiTree:'/mis/dict/tree',
          apiEditorGet: '/mis/dict/get',
          apiAdd: '/mis/dict/add',
          apiEditor: '/mis/dict/edit',
          apiEnable: '/mis/dict/enable',
          apiDisable: '/mis/dict/disable',
          commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
          sign:'dictionaryManageSign',
          isAdd: true,//显示新增按钮
          isEditor: true,//显示编辑按钮
          isEnabled: true,//显示启用按钮
          isDisabled: true,//显示禁用按钮
          isToolBar:true,//这个属于树形视图页面独有的属性，重点注意，表示是否显示筛选按钮及查询按钮
          tableTitle: [
            {
              prop: 'name',
              label: '名称',
              // width: '100',
              align: 'center'
            },
            {
              prop: 'dictKey',
              label: '键',
              // width: '100',
              align: 'center'
            },
            {
              prop: 'value',
              label: '值',
              width: '220',
              align: 'center'
            },
            {
              prop: 'sort',
              label: '显示顺序',
              // width: '100',
              align: 'center'
            },

            {
              prop: 'edit',
              label: '可编辑',
              // width: '100',
              align: 'center',
              formatter:function (row) {
                if(row.edit=='0'){
                  return '不可以'
                }else if(row.edit=='1'){
                  return '可以'
                }
              }
            },
            {
              prop: 'description',
              label: '描述',
              width: '260',
              align: 'center'
            },
          ],
          tableData: [],
          data: [
            {
              id:1,
              name: '系统字典',
              children: [
                {
                  id:2,
                  name: '性别',
                  children: [
                    {
                      id:3,
                      name: '男',
                    },
                    {
                      id:4,
                      name: '女',

                    },
                  ]
                },
                {
                  id:5,
                  name: '信道',
                },
              ]
            }
          ],
          ruleForm: {
            "parentId":1,
            "parentName":'根',
            "name":"",
            "nameEn":"",
            "dictKey":"",
            "value":"",
            "sort":'',
            "edit":'',
            "description":""
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
            // console.log('嘻嘻获取的是什么信息+++', res.data.value)
            if (res.data.resultStatus.resultCode === '0000') {
              var nameParam = this.ruleForm.parentName
              this.ruleForm = res.data.value
              this.ruleForm.edit = this.ruleForm.edit=='1'?'可以':'不可以'
              if(this.ruleForm.parentId == '1'){
                this.ruleForm.parentName = '根'
              }else {
                this.ruleForm.parentName = nameParam
              }
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
              this.$store.state.dictionaryManageSign = false
              this.getDefaultInfo()
              this.getDefaultTrees()
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
              this.$store.state.dictionaryManageSign = false
              this.getDefaultInfo()
              this.getDefaultTrees()
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

        //默认获取树形结构数据
        getDefaultTrees() {
          this.$axios(
            {
              method: 'post',
              url: this.apiTree,
              data: {}
            }
          ).then(res => {
            // console.log('字典管理默认获取树形结构图数据', res.data)
            if(res.data.resultStatus.resultCode === '0000'){
              this.data = [...res.data.value]
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
                "parentId":this.ruleForm.parentId,
                "pageNum": 1,
                "pageSize": this.$store.state.pageSizeParam
              }
            }
          ).then(res => {
            console.log('字典管理返回的数据', res.data)
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
          this.$axios(
            {
              method: 'post',
              url: this.apiQuery,
              data: {
                "parentId": this.ruleForm.parentId,
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

        //选择左边菜单树对应节点后，将选择的对应值ID赋值给，parentId，用于查询此parentId下对应的列表
        chooseAreaGetListInfo(n){
          console.log('选择树结构，传值过来++',n)
          this.ruleForm.parentId = n.id
          this.ruleForm.parentName = n.name
          this.getDefaultInfo()

        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              // this.$store.state.dictionaryManageSign = false

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
          this.$store.state.dictionaryManageSign = false
        },

      }
    }
</script>

<style scoped>

</style>
