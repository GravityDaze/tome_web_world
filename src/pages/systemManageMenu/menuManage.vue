<template>
  <div class="menu_manage_style">
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
        <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.menuManageSign" width="30%" align="left"
                   :close-on-click-modal="false">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                   :hide-required-asterisk='false'>
            <el-row>
              <el-col :span="18" :offset="2">
                <el-form-item label="父菜单">
                  <el-col>
                    <el-input v-model="ruleForm.parentName"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="18" :offset="2">
                <el-form-item label="菜单类型" prop="menuType">
                  <el-col class="select_style">
                    <el-select v-model="ruleForm.type" placeholder="请选择菜单类型" class="select_style1">
                      <el-option
                        v-for="item in typeArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="18" :offset="2">
                <el-form-item label="HTTP方法" prop="httpType">
                  <el-col class="select_style">
                    <el-select v-model="ruleForm.method" placeholder="请选择HTTP方法" class="select_style1">
                      <el-option
                        v-for="item in methodArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
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
                <el-form-item label="URL">
                  <el-col>
                    <el-input v-model="ruleForm.url"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="18" :offset="2">
                <el-form-item label="图标样式">
                  <el-col>
                    <el-input v-model="ruleForm.iconStyle"></el-input>
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
                <el-form-item label="可否刷新">
                  <el-radio-group v-model="ruleForm.refreshable">
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
        name: "menu-manage",
      data(){
          return {
            apiQuery: '/mis/menu/getByParent',
            apiEditorGet: '/mis/menu/get',
            apiAdd: '/mis/menu/add',
            apiEditor: '/mis/menu/edit',
            apiEnable: '/mis/menu/enable',
            apiDisable: '/mis/menu/disable',
            apiMenuTree:'/mis/menu/tree',
            commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
            sign:'menuManageSign',
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
                prop: 'no',
                label: '编号',
                // width: '100',
                align: 'center'
              },
              {
                prop: 'url',
                label: 'URL',
                width: '220',
                align: 'center'
              },
              {
                prop: 'iconStyle',
                label: '图标样式',
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
                prop: 'type',
                label: '类型',
                // width: '100',
                align: 'center',
                formatter:function (row) {
                  if(row.type=='0'){
                    return '菜单'
                  }else if(row.type=='1'){
                    return '按钮'
                  }else if(row.type=='2'){
                    return '资源'
                  }else if(row.type=='3'){
                    return '查询按钮'
                  }else if(row.type=='4'){
                    return '导出按钮'
                  }
                }
              },
              {
                prop: 'method',
                label: 'HTTP方法',
                // width: '100',
                align: 'center',
                formatter:function (row) {
                  if(row.method=='0'){
                    return 'GET'
                  }else if(row.method=='1'){
                    return 'POST'
                  }else if(row.method=='2'){
                    return 'PUT'
                  }else if(row.method=='3'){
                    return 'DELETE'
                  }
                }
              },
              {
                prop: 'refreshable',
                label: '可刷新',
                // width: '100',
                align: 'center',
                formatter:function (row) {
                  if(row.refreshable=='0'){
                    return '不可刷新'
                  }else if(row.refreshable=='1'){
                    return '可刷新'
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
                name: '系统根',
                children: [
                  {
                    id:2,
                    name: '后台根',
                    children: [
                      {
                        id:3,
                        name: '工作台',
                        children: [
                          {
                            id:12,
                            name: '监控'
                          },
                        ]
                      },
                      {
                        id:4,
                        name: '景区管理',

                      },
                      {
                        id:11,
                        name: '设备管理',
                        children: [
                          {
                            id:13,
                            name: '终端机'
                          },
                        ]
                      },
                    ]
                  },
                  {
                    id:5,
                    name: '查询统计',
                  },
                  {
                    id:8,
                    name: '系统管理',
                  }
                ]
              }
            ],
            ruleForm: {

              "parentId": 1,
              "parentName": "系统根",
              "type": "",
              "method": "",
              "name": "",
              "nameEn": "",
              "url": "",
              "iconStyle": "",
              "sort": 1,
              "refreshable": "",
              "description": ""
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
            typeArr: [

              {
                id: '1',
                name: '菜单',
                value: '1'
              },
              {
                id: '2',
                name: '按钮',
                value: '2'
              },
              {
                id: '3',
                name: '查询按钮',
                value: '3'
              },
              {
                id: '4',
                name: '导出按钮',
                value: '4'
              },
              {
                id: '5',
                name: '资源',
                value: '5'
              },
            ],
            methodArr: [

              {
                id: '0',
                name: 'GET',
                value: '0'
              },
              {
                id: '1',
                name: 'POST',
                value: '1'
              },
              {
                id: '2',
                name: 'PUT',
                value: '2'
              },
              {
                id: '3',
                name: 'DELETE',
                value: '3'
              },
            ],
          }
      },
      mounted(){
        this.$store.state.pageNumParam=1
        this.$store.state.isShowHomeCountParam = false
        this.getDefaultInfo()
        this.getDefaultMenuTree()
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
              var nameParam = this.ruleForm.parentName
              this.ruleForm = res.data.value
              if(this.ruleForm.parentId == '1'){
                this.ruleForm.parentName = '系统根'
              }else {
                this.ruleForm.parentName = nameParam
              }
              this.ruleForm.refreshable = this.ruleForm.refreshable=='0'?'不可以':'可以'
              if(this.ruleForm.type=='0'){
                this.ruleForm.type = '菜单'
              }else if(this.ruleForm.type=='1'){
                this.ruleForm.type = '按钮'
              }else if(this.ruleForm.type=='2'){
                this.ruleForm.type = '资源'
              }else if(this.ruleForm.type=='3'){
                this.ruleForm.type = '查询按钮'
              }else if(this.ruleForm.type=='4'){
                this.ruleForm.type = '导出按钮'
              }

              if(this.ruleForm.method=='0'){
                this.ruleForm.method = 'GET'
              }else if(this.ruleForm.method=='1'){
                this.ruleForm.method = 'POST'
              }else if(this.ruleForm.method=='2'){
                this.ruleForm.method = 'PUT'
              }else if(this.ruleForm.method=='3'){
                this.ruleForm.method = 'DELETE'
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
          this.ruleForm.refreshable = this.ruleForm.refreshable=='可以'?'1':'0'
          if(this.ruleForm.type=='菜单'){
            this.ruleForm.type = '0'
          }else if(this.ruleForm.type=='按钮'){
            this.ruleForm.type = '1'
          }else if(this.ruleForm.type=='资源'){
            this.ruleForm.type = '2'
          }else if(this.ruleForm.type=='查询按钮'){
            this.ruleForm.type = '3'
          }else if(this.ruleForm.type=='导出按钮'){
            this.ruleForm.type = '4'
          }

          if(this.ruleForm.method=='GET'){
            this.ruleForm.method = '0'
          }else if(this.ruleForm.method=='POST'){
            this.ruleForm.method = '1'
          }else if(this.ruleForm.method=='PUT'){
            this.ruleForm.method = '2'
          }else if(this.ruleForm.method=='DELETE'){
            this.ruleForm.method = '3'
          }
          this.$axios(
            {
              method: 'post',
              url: this.apiAdd,
              data: this.ruleForm
            }
          ).then(res => {
            console.log('新增接口成功返回数据', res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              this.$store.state.menuManageSign = false
              this.getDefaultInfo()
              this.getDefaultMenuTree()
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
          this.ruleForm.refreshable = this.ruleForm.refreshable=='可以'?'1':'0'
          if(this.ruleForm.type=='菜单'){
            this.ruleForm.type = '0'
          }else if(this.ruleForm.type=='按钮'){
            this.ruleForm.type = '1'
          }else if(this.ruleForm.type=='资源'){
            this.ruleForm.type = '2'
          }else if(this.ruleForm.type=='查询按钮'){
            this.ruleForm.type = '3'
          }else if(this.ruleForm.type=='导出按钮'){
            this.ruleForm.type = '4'
          }

          if(this.ruleForm.method=='GET'){
            this.ruleForm.method = '0'
          }else if(this.ruleForm.method=='POST'){
            this.ruleForm.method = '1'
          }else if(this.ruleForm.method=='PUT'){
            this.ruleForm.method = '2'
          }else if(this.ruleForm.method=='DELETE'){
            this.ruleForm.method = '3'
          }

          this.$axios(
            {
              method: 'post',
              url: this.apiEditor,
              data: this.ruleForm
            }
          ).then(res => {
            console.log('编辑接口成功返回数据', res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              this.$store.state.menuManageSign = false
              this.getDefaultInfo()
              this.getDefaultMenuTree()
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


          //获取默认菜单树信息
        getDefaultMenuTree(){
          this.$axios(
            {
              method:'post',
              url:this.apiMenuTree,
              data:{
                "parentId": '',
                "status": ''
              }
            }
          ).then(res => {
            if(res.data.resultStatus.resultCode === '0000'){
              // console.log('菜单树返回了哪些信息',res.data)
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
                "parentId": this.ruleForm.parentId,
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

          this.$axios(
            {
              method: 'post',
              url: this.apiQuery,
              data: {
                "parentId": this.ruleForm.parentId,
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
              // this.$store.state.menuManageSign = false
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
          this.$store.state.menuManageSign = false
        },

      }
    }
</script>

<style scoped>

</style>
