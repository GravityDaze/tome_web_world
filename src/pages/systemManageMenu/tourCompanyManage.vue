<template>
  <div>
    <mySearchs
      :sign="sign"
      :tourCompanyName="tourCompanyName"
      :personName="personName"
      :sceneryState="sceneryState"

      :isAdd="isAdd"
      :isEditor="isEditor"
      :isEnabled="isEnabled"
      :isDisabled="isDisabled"
      @enableInfo="enableInfo"
      @disableInfo="disableInfo"
      @queryInfos="queryInfos"
    ></mySearchs>
    <myTables
      :tableTitle="tableTitle"
      :tableData="tableData"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
    ></myTables>
    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.tourCompanyManageSign" width="50%"
                 align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="10">
              <el-form-item label="旅行社名称">
                <el-col>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-form-item label="所属区域">
                <el-col>
                  <el-input v-model="ruleForm.area" @focus="openEditorAreaDialog"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="旅行社类型">
                <!--<el-col>-->
                <!--<el-input v-model="ruleForm.type"></el-input>-->
                <!--</el-col>-->
                <el-col class="select_style">
                  <el-select v-model="ruleForm.type" placeholder="请选择旅行社类型" class="select_style1">
                    <el-option
                      v-for="item in tourCompanyTypeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>


              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-form-item label="旅行社级别">
                <!--<el-col>-->
                <!--<el-input v-model="ruleForm.level"></el-input>-->
                <!--</el-col>-->
                <el-col class="select_style">
                  <el-select v-model="ruleForm.level" placeholder="请选择旅行社级别" class="select_style1">
                    <el-option
                      v-for="item in tourCompanyLevelArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="联系人">
                <el-col>
                  <el-input v-model="ruleForm.linkman"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="2">
              <el-form-item label="业务范围">
                <el-checkbox-group v-model="ruleForm.checkList">
                  <el-checkbox label="入境"></el-checkbox>
                  <el-checkbox label="出境"></el-checkbox>
                  <el-checkbox label="国内"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>

            </el-col>
            <el-col :span="10">
              <el-form-item label="联系人电话">
                <el-col>
                  <el-input v-model="ruleForm.linkmanPhone"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-form-item label="投诉电话">
                <el-col>
                  <el-input v-model="ruleForm.complainPhone"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="email邮箱">
                <el-col>
                  <el-input v-model="ruleForm.email"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-form-item label="旅行社网址">
                <el-col>
                  <el-input v-model="ruleForm.url"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="详细地址">
                <el-col>
                  <el-input v-model="ruleForm.address"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

          </el-row>
          <el-form-item>
            <!--<el-col :span="3">-->
            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
            <!--</el-col>-->
            <el-col :span="9" :offset="8">
              <el-button @click="cancelForm('ruleForm')">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
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
    name: "tour-company-manage",
    data() {
      return {
        apiQuery: '/mis/travelAgency/query',
        apiEditorGet: '/mis/travelAgency/get',
        apiAdd: '/mis/travelAgency/add',
        apiEditor: '/mis/travelAgency/edit',
        apiEnable: '/mis/travelAgency/enable',
        apiDisable: '/mis/travelAgency/disable',
        apiChooseArea: '/mis/area/queryDropDownAll',
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        sign: 'tourCompanyManageSign',
        tourCompanyName: true,
        personName: true,
        sceneryState: true,
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮
        tableTitle: [
          {
            prop: 'no',
            label: '旅行社编号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'area',
            label: '所属区域',
            // width: '180',
            align: 'center'
          },
          {
            prop: 'name',
            label: '旅行社名称',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'type',
            label: '旅行社类型',
            width: '120',
            align: 'center'
          },
          {
            prop: 'level',
            label: '旅行社级别',
            width: '120',
            align: 'center'
          },
          {
            prop: 'serviceScope',
            label: '业务范围',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'linkman',
            label: '联系人姓名',
            width: '90',
            align: 'center'
          },
          {
            prop: 'linkmanPhone',
            label: '联系人电话',
            width: '100',
            align: 'center'
          },


          {
            prop: 'updator',
            label: '最后更新者',
            width: '90',
            align: 'center'
          },
          {
            prop: 'updateDatetime',
            label: '更新时间',
            width: '180',
            align: 'center'
          },
        ],
        tableData: [],
        dataArea: [
          {
            id: 1,
            name: '全国',
            children: [
              {
                id: 2,
                name: '中国',
                children: [
                  {
                    id: 3,
                    name: '四川',
                    children: [
                      {
                        id: 4,
                        name: '成都'
                      },
                      {
                        id: 5,
                        name: '自贡'
                      },
                      {
                        id: 6,
                        name: '宜宾'
                      }
                    ]
                  },
                  {
                    id: 7,
                    name: '江苏',
                    children: [
                      {
                        id: 8,
                        name: '苏州'
                      },
                      {
                        id: 9,
                        name: '南京'
                      },
                      {
                        id: 10,
                        name: '昆山'
                      }
                    ]
                  }
                ]
              },
              {
                name: '澳大利亚',
                children: [
                  {
                    name: '澳大利亚城市一'
                  },
                  {
                    name: '澳大利亚城市二'
                  }
                ]
              },
              {
                name: '越南',
                children: [
                  {
                    name: '越南城市一'
                  },
                  {
                    name: '越南城市二'
                  },
                ]
              }
            ]
          }
        ],
        ruleForm: {
          "checkList": [],//业务范围复选框组
          "area": "",
          "areaId": '',//必须
          "name": "",//必须（编辑时名字不可更改）
          "type": "",
          "level": "",
          "serviceScope": "",
          "linkman": "彭超",//必须
          "linkmanPhone": "13345811137",//必须
          "complainPhone": "11011011022",//必须
          "url": "http://47.92.250.174:8081/tome/html/",
          "address": "四川省成都市麦田中心",//必须
          "email": "314301505@qq.com",
          "status": "",
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
        tourCompanyTypeArr: [
          {
            id: '1',
            name: '一类旅行社'
          },
          {
            id: '2',
            name: '二类旅行社'
          },
          {
            id: '3',
            name: '三类旅行社'
          },
        ],
        tourCompanyLevelArr: [
          {
            id: '1',
            name: '3A'
          },
          {
            id: '2',
            name: '4A'
          },
          {
            id: '3',
            name: '5A'
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
        console.log('到底会给我什么样的信息呢', n)
        this.commonId = n.id
        this.$axios(
          {
            method: 'post',
            url: this.apiEditorGet + '?id=' + n.id,
            data: {}
          }
        ).then(res => {
          console.log('嘻嘻获取的是什么信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm = res.data.value
            this.ruleForm.area = res.data.value.areaName
            if (res.data.value.type == '1') {
              this.ruleForm.type = '一类旅行社'
            } else if (res.data.value.type == '2') {
              this.ruleForm.type = '二类旅行社'
            } else if (res.data.value.type == '3') {
              this.ruleForm.type = '三类旅行社'
            }
            if (res.data.value.level == '1') {
              this.ruleForm.level = '3A'
            } else if (res.data.value.level == '2') {
              this.ruleForm.level = '4A'
            } else if (res.data.value.level == '3') {
              this.ruleForm.level = '5A'
            }
            if (res.data.value.serviceScope) {
              this.ruleForm.checkList=[]
              var n1= [...res.data.value.serviceScope.split(',')]
              for(let t=0;t<n1.length;t++){
                if(n1[t]=='1'){
                  this.ruleForm.checkList.push('入境')
                }else if(n1[t]=='2'){
                  this.ruleForm.checkList.push('出境')
                }else if(n1[t]=='3'){
                  this.ruleForm.checkList.push('国内')
                }
              }
            } else {
              this.ruleForm.checkList = []
            }
            console.log(this.ruleForm.checkList)

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
        var k1 = this.ruleForm.checkList
        var k2 = []
        if (k1.length == 0) {
          this.ruleForm.serviceScope = ''
        } else {
          for (let i = 0; i < k1.length; i++) {
            if (k1[i] == '入境') {
              k2.push('1')
            } else if (k1[i] == '出境') {
              k2.push('2')
            } else if (k1[i] == '国内') {
              k2.push('3')
            }
          }
          this.ruleForm.serviceScope = k2.join(',')
        }
        // console.log('++++k1:', k1, '++++k2:', k2, 'serviceScope:', this.ruleForm.serviceScope)

        this.$axios(
          {
            method: 'post',
            url: this.apiAdd,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.tourCompanyManageSign = false
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

        var k1 = this.ruleForm.checkList
        var k2 = []
        if (k1.length == 0) {
          this.ruleForm.serviceScope = ''
        } else {
          for (let i = 0; i < k1.length; i++) {
            if (k1[i] == '入境') {
              k2.push('1')
            } else if (k1[i] == '出境') {
              k2.push('2')
            } else if (k1[i] == '国内') {
              k2.push('3')
            }
          }
          this.ruleForm.serviceScope = k2.join(',')
        }

        console.log('开始提交编辑信息')
        if (this.ruleForm.type == '一类旅行社') {
          this.ruleForm.type = '1'
        } else if (this.ruleForm.type == '二类旅行社') {
          this.ruleForm.type = '2'
        } else if (this.ruleForm.type == '三类旅行社') {
          this.ruleForm.type = '3'
        }

        if (this.ruleForm.level == '3A') {
          this.ruleForm.level = '1'
        } else if (this.ruleForm.level == '4A') {
          this.ruleForm.level = '2'
        } else if (this.ruleForm.level == '5A') {
          this.ruleForm.level = '3'
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
            this.$store.state.tourCompanyManageSign = false
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },
      //服务商启用
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
      //服务商禁用
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
              "name": "",
              "linkMan": "",
              "status": "",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('旅行社管理管理返回的数据', res.data)
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

      //查询按钮返回列表数据
      queryInfos(n) {

        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "name": this.$store.state.tourcompanyParam,
              "linkMan": this.$store.state.tourcompanyLinkManParam,
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
        console.log(this.$store.state.editorOrSearch)
        this.openAreaDialog()
      },
      //所属区域input框获取焦点是打开区域选择模态框并返回所有区域信息
      openAreaDialog() {
        this.$axios(
          {
            method: 'post',
            url: this.apiChooseArea,
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
        if (this.$store.state.editorOrSearch == '编辑') {
          this.ruleForm.areaId = n.id
          this.ruleForm.area = n.name
        } else if (this.$store.state.editorOrSearch == '查询') {
          // this.areaSearchParam = n
          this.$refs['mysearchs'].intoInputAreaName(n)
        }

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            // this.$store.state.tourCompanyManageSign = false

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
        this.$store.state.tourCompanyManageSign = false

      },

    }
  }
</script>

<style scoped>

</style>
