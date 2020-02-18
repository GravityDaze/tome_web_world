<template>
  <div>
    <mySearchs
      :sign="sign"
      :groupPersonType="groupPersonType"
      :sexType="sexType"
      :codeMachine="codeMachine"
      :sceneryState="sceneryState"
      :a2ChooseServiceProvider="a2ChooseServiceProvider"
      :a2ChooseServiceProviderArr="a2ChooseServiceProviderArr"
      :isAdd="isAdd"
      :isImportDevice="isImportDevice"
      :isExportDevice="isExportDevice"
      :isImportParam="isImportParam"
      @queryInfos="queryInfos"
      @addBeforeClear="addBeforeClear"
      @getExcel="getExcel"
      @importf="importf"
      @exportInfo="exportInfo"
      ref="myExcel"
    >
    </mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowEnabled="isShowEnabled"

      :isHandle="isHandle"
      @queryInfos="queryInfos"
      @delListInfo="delListInfo"
      @getEditorInfos="getEditorInfos"
    >
    </myTables>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.areaMemberInfo2" width="35%"
                 align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>


            <el-col :span="23">
              <el-form-item label="景区服务商">
                <el-col v-if="$store.state.titleHeader == '新增'">
                  <el-select v-model="ruleForm.TravelGencyName" class="change_select_style" size="small" placeholder="请输入景区服务商"
                             @change="chooseProviderFn2">
                    <el-option
                      v-for="item in canChooseSceneryProviderArr"
                      :key="item.ID"
                      :label="item.Name"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </el-col>

                <el-col v-if="$store.state.titleHeader == '编辑'">
                  <el-select v-model="ruleForm.TravelGencyName" class="change_select_style" size="small" placeholder="请输入景区服务商"
                             @change="chooseProviderFn2" :disabled="true">
                    <el-option
                      v-for="item in canChooseSceneryProviderArr"
                      :key="item.ID"
                      :label="item.Name"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="用户名">
                <el-col>
                  <el-input v-model="ruleForm.Name" placeholder="请输入用户名"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="手机号" v-show="ruleForm.Type == 1">
                <el-col>
                  <el-input v-model="ruleForm.Phone" placeholder="请输入手机号"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="证件类型" v-show="ruleForm.Type == 1">
                <el-col>
                  <el-select v-model="ruleForm.CertificateType" class="change_select_style" size="small" placeholder="请选择证件类型">
                    <el-option
                      v-for="item in idInfoArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="证件号码" v-show="ruleForm.Type == 1">
                <el-col>
                  <el-input v-model="ruleForm.CertificateNumber" placeholder="请输入证件号码"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="机器码" v-show="ruleForm.Type == 0">
                <el-col v-if="$store.state.titleHeader == '新增'">
                  <el-select v-model="ruleForm.CodeMachine" class="change_select_style" size="small" placeholder="请选择机器码">
                    <el-option
                      v-for="item in canChooseCodeMachineArr"
                      :key="item.ID"
                      :label="item.CodeMachine"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </el-col>


                <el-col v-if="$store.state.titleHeader == '编辑'">
                  <el-select v-model="ruleForm.CodeMachine" class="change_select_style" size="small" placeholder="请选择机器码" :disabled="true">
                    <el-option
                      v-for="item in canChooseCodeMachineArr"
                      :key="item.ID"
                      :label="item.CodeMachine"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>




            <el-col :span="23">
              <el-form-item label="性别">
                <el-col>
                  <el-select v-model="ruleForm.Sex" class="change_select_style" size="small" placeholder="请选择性别">
                    <el-option
                      v-for="item in sexArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="成员类型">
                <el-col v-if="$store.state.titleHeader == '新增'">
                  <el-select v-model="ruleForm.Type" class="change_select_style" size="small" placeholder="请选择成员类型">
                    <el-option
                      v-for="item in memberTypeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>

                <el-col v-if="$store.state.titleHeader == '编辑'">
                  <el-select v-model="ruleForm.Type" class="change_select_style" size="small" placeholder="请选择成员类型" :disabled="true">
                    <el-option
                      v-for="item in memberTypeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="旅游团">
                <el-col>
                  <el-select v-model="ruleForm.TouristTeamName" class="change_select_style" size="small" placeholder="请选择旅游团">
                    <el-option
                      v-for="item in canChooseTouristGroupArr"
                      :key="item.ID"
                      :label="item.Name"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="状态">
                <el-col>
                  <el-select v-model="ruleForm.Status" class="change_select_style" size="small" placeholder="请选择状态">
                    <el-option
                      v-for="item in statusArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>



          </el-row>
          <el-form-item>
            <el-col :span="9" :offset="12">
              <el-button @click="cancelForm('ruleForm')">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确!认</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import commonFn from '../../common_js/commonFn'


  export default {
    name: "area-member-info",
    data() {
      return {
        canChooseSceneryProviderArr: [],
        freeParam2: '',//新增团时，选择景区服务商以后记录此服务商的id,用于后面获取数据是的调用
        sign: 'areaMemberInfo2',
        apiQuery2: '/a2guider/member/areaQuery',
        apiSceneryProviderDropDown: '/a2guider/travelGency/dropDown',
        apiTouristGroupDropDown2:'/a2guider/touristTeam/areaDropDown',//获取旅游团下拉列表信息
        apiCodeMachineDropDown2:'/a2guider/terminal/areaUnAllot',//获取机器码下拉列表信息
        apiAdd2: '/a2guider/member/areaAdd',
        apiEditor2: '/a2guider/member/areaEdit',
        apiGetEditorInfo2:'/a2guider/member/areGet',
        apiDel2: '/a2guider/member/areaDelete',
        apiImportUrl1:'/a2guider/member/areaTemplateUrl',//A2导入数据前先下载表格
        apiImportUrl2:'/a2guider/member/areaImportMember',//A2导入数据
        apiExportUrl:'/a2guider/member/areaExportMember',//A3导出数据(导出的时候用了查询的接口进行操作)
        a2ChooseServiceProvider: true,//添加了一个查询条件，选择A2服务商名称
        a2ChooseServiceProviderArr: [],//A2查询条件里面选择服务商名称
        canChooseTouristGroupArr:[],//A2旅游团下拉列表数据
        canChooseCodeMachineArr:[],//A2机器码下拉列表数据

        groupPersonType: true,
        sexType: true,
        codeMachine: true,
        sceneryState: true,
        isAdd: true,
        isImportDevice: true,
        isExportDevice: true,
        isImportParam: true,
        isShowEnabled: true,
        idInfoArr: [
        {
          id: 1,
          name: '身份证',
          value:'身份证'
        },
        {
          id: 2,
          name: '导游证',
          value:'导游证'
        },
      ],
        sexArr: [
        {
          id: 1,
          name: '男',
          value:'男'
        },
        {
          id: 2,
          name: '女',
          value:'女'
        },
      ],

        memberTypeArr: [
        {
          id: 0,
          name: '游客'
        },
        {
          id: 1,
          name: '导游'
        },
      ],


        statusArr: [
        {
          id: 0,
          name: '禁用',
          value:0,
        },
        {
          id: 1,
          name: '启用',
          value:1,
        },
      ],

        ruleForm: {
          "TravelGencyID": '',
          "TravelGencyName": '',
          "TouristTeamID": '',
          "TouristTeamName": '',
          "TerminalID": '',
          "CodeMachine":'',
          "Name": '',//用户名
          "Sex": '',
          "CertificateNumber":'',//证件号码
          "CertificateType":'',//证件类型
          "Phone": '',
          "Status": '',
          "Type": 0,//成员类型
        },

        isHandle: true,
        tableTitle: [
          {
            prop: 'Num',
            label: '序号',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'TravelGencyName',
            label: '景区服务商',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'Name',
            label: '名称',
            // width: '120',
            align: 'center'
          },

          {
            prop: 'Phone',
            label: '手机号',
            // width: '120',
            align: 'center',
          },

          {
            prop: 'Type',
            label: '类型',
            // width: '120',
            align: 'center',
            formatter: function (row) {
              return row.Type == '0' ? '游客' : '导游'
            }
          },
          {
            prop: 'CertificateNumber',
            label: '证件（类型/号码）',
            // width: '120',
            align: 'center',
          },
          {
            prop: 'CodeMachine',
            label: '绑定终端',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'TouristTeamName',
            label: '旅游团',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'UpdateTime',
            label: '更新时间',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'Status',
            label: '状态',
            // width: '120',
            align: 'center',
            formatter: function (row) {
              return row.Status == 0 ? '禁用' : '启用'
            }
          },

        ],
        tableData: [
          // {
          //   "ID": 7181,
          //   "Name": "Q002485",
          //   "Type": 0,
          //   "Status": '',
          //   "CertificateType": null,
          //   "CertificateNumber": null,
          //   "TouristTeamID": 4,
          //   "Phone": "20786202768",
          //   "Sex": "男",
          //   "TerminalID": 4662,
          //   "UpdateTime": "2018-03-14 12:49:48",
          //   "CodeMachine": "Q002485",
          //   "Num": 1,
          //   "TouristTeamName": "赤水",
          //   "TravelGencyName": '',
          //   "TravelGencyID": '',
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
      this.getSceneryProviderDropDown()
    },
    methods: {


      //新增里面选择了服务商以后，其他对应的下拉数据就需要开始请求了
      chooseProviderFn2() {
        // alert('选择')
        this.freeParam2 = this.ruleForm.TravelGencyName
        this.getTouristGroupDropDown()
        this.getCodeMachineDropDown()
      },

      //获取旅游团下拉列表信息
      getTouristGroupDropDown() {
        this.$axios(
          {
            method: 'get',
            url: this.apiTouristGroupDropDown2 + '?TravelGencyID=' + this.freeParam2,
            data: {}
          }
        ).then(res => {
          console.log('嚯嚯嚯？？？：', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            // this.a2ChooseServiceProviderArr = [...res.data.value]
            this.canChooseTouristGroupArr = [...res.data.value]
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },


      //获取机器码下拉列表信息
      getCodeMachineDropDown() {
        this.$axios(
          {
            method: 'get',
            url: this.apiCodeMachineDropDown2 + '?TravelGencyID=' + this.freeParam2,
            data: {}
          }
        ).then(res => {
          console.log('嚯嚯嚯yes：', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            // this.a2ChooseServiceProviderArr = [...res.data.value]
            this.canChooseCodeMachineArr = [...res.data.value]
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },


      // 导入设备前先获取excel表格
      getExcel(){
        this.$axios(
          {
            method:'get',
            url:this.apiImportUrl1,
            data:{}
          }
        ).then(res => {
          console.log('获取表格',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.$store.state.downloadUrl = res.data.value.downUrl

            // this.$refs['myExcel'].clickBtnFn()

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })
      },


      importf(obj) {
        // console.log('ttttt',obj)
        let _this = this;
        this.file = event.currentTarget.files[0];


        //接下来的代码内容是直接将文档file传给后台保存，以便刷新后数据依旧存在
        //以下formdata的增加是调用后台接口是需要传入对应的参数用的
        // console.log('this.file:',this.file)
        var formdata = new FormData
        formdata.append('file',this.file)
        // console.log('formdata:',formdata)
        //以上formdata的增加是为了传给后台保存
        this.$axios(
          {
            method:'post',
            url:this.apiImportUrl2,
            data:formdata
          }
        ).then(res => {

          alert(res.data.value)

          this.getDefaultInfo()
          // console.log('到底传成功没有',res.data)
        }).catch(error => {

        })


      },
      //导入设备（上传excel）


      //导出信息为excel格式表
      exportInfo() {

        if (this.$store.state.sexTypeParam2 == 1) {
          this.$store.state.sexTypeParam2 = '男'
        } else if (this.$store.state.sexTypeParam2 == 2) {
          this.$store.state.sexTypeParam2 = '女'
        } else {
          this.$store.state.sexTypeParam2 = ''
        }
        var n = ''
        var k = ''
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "TravelGencyID": this.$store.state.a2ChooseServiceProviderParam2,
              "Sex": this.$store.state.sexTypeParam2,
              "Status": this.$store.state.sceneryStateParam,
              "Type": this.$store.state.groupPersonTypeParam2,
              "CodeMachine": this.$store.state.codeMachineParam,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('导出了什么玩意儿',res)

          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.totalParam = res.data.value.total
            // console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.list]
            // n = this.tableTitle
            n= [
              {
                prop: 'Name',
                label: '名称',
                // width: '120',
                align: 'center'
              },
              {
                prop: 'CodeMachine',
                label: '机器码',
                // width: '120',
                align: 'center'
              },
              {
                prop: 'TouristTeamID',
                label: '旅游团ID',
                // width: '120',
                align: 'center'
              },
              {
                prop: 'TouristTeamName',
                label: '旅游团',
                // width: '120',
                align: 'center'
              },
              {
                prop: 'Sex',
                label: '性别',
                // width: '120',
                align: 'center'
              },
              {
                prop: 'Status',
                label: '状态',
                // width: '120',
                align: 'center',
                formatter: function (row) {
                  return row.Status == 0 ? '禁用' : '启用'
                }
              },

            ]
            k = this.tableData
            commonFn.exportExcel(n, k)

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        })

        // var n = this.tableTitle
        // var k = this.tableData

        // commonFn.exportExcel(n, k)
      },


      //新增之前清空表单数据函数
      addBeforeClear() {

        this.$store.state.areaMemberInfo2 = true

        for (var i in this.ruleForm) {
          this.ruleForm[i] = ''
        }


      },

      //开始提交新增信息
      addInfo() {
        var that = this
        console.log('开始提交新增信息')
        this.ruleForm.TravelGencyID = this.ruleForm.TravelGencyName
        this.ruleForm.TouristTeamID = this.ruleForm.TouristTeamName
        this.ruleForm.TerminalID = this.ruleForm.CodeMachine

        if(this.ruleForm.Type == 0){
          this.ruleForm.Phone = ''
          this.ruleForm.CertificateType = ''
          this.ruleForm.CertificateNumber = ''
        }else if(this.ruleForm.Type == 1){
          this.ruleForm.CodeMachine = ''
          this.ruleForm.TerminalID = ''
        }


        this.freeParam2 = this.ruleForm.TravelGencyName
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd2,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.areaMemberInfo2 = false
            this.getDefaultInfo()
            // this.$message.success(res.data.resultStatus.resultMessage)

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },

      //删除成员信息
      delListInfo(n){

        this.$axios(
          {
            method:'get',
            url:this.apiDel2 + '?ID=' + n.ID,
            data:{}
          }
        ).then(res => {
          console.log('删除成员信息',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.getDefaultInfo()

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },

      //获取编辑前的相关信息
      getEditorInfos(n){

        this.$axios(
          {
            method:'get',
            url:this.apiGetEditorInfo2 + '?ID=' + n.ID,
            data:{}
          }
        ).then(res => {
          console.log('获取编辑前相关信息YYY',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.$store.state.titleHeader = '编辑'
            this.ruleForm = res.data.value
            this.$store.state.areaMemberInfo2 = true


          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },

      //提交编辑信息
      editorInfo() {

        this.$axios(
          {
            method: 'post',
            url: this.apiEditor2,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('提交编辑信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.areaMemberInfo2 = false
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },

      //获取景区服务商下拉列表信息
      getSceneryProviderDropDown() {
        this.$axios(
          {
            method: 'get',
            url: this.apiSceneryProviderDropDown,
            data: {}
          }
        ).then(res => {
          console.log('嚯嚯嚯+++++：', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.a2ChooseServiceProviderArr = [...res.data.value]
            this.canChooseSceneryProviderArr = [...res.data.value]

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
            url: this.apiQuery2,
            data: {
              "TravelGencyID": '',
              "Sex": '',
              "Status": '',
              "Type": '',
              "CodeMachine": '',
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('获取的默认member信息返回的数据', res.data)
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

      //添加条件查询或者翻页等获取列表信息方法
      queryInfos() {
        var that = this
        // alert('是否查询')
        if (this.$store.state.sexTypeParam2 == 1) {
          this.$store.state.sexTypeParam2 = '男'
        } else if (this.$store.state.sexTypeParam2 == 2) {
          this.$store.state.sexTypeParam2 = '女'
        } else {
          this.$store.state.sexTypeParam2 = ''
        }



        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "TravelGencyID": this.$store.state.a2ChooseServiceProviderParam2,
              "Sex": this.$store.state.sexTypeParam2,
              "Status": this.$store.state.sceneryStateParam,
              "Type": this.$store.state.groupPersonTypeParam2,
              "CodeMachine": this.$store.state.codeMachineParam,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('获取的默认member返回的数据', res.data)
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

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            if (formName === 'ruleForm') {

              if (this.$store.state.titleHeader === '新增') {
                this.addInfo()
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
        this.$store.state.areaMemberInfo2 = false
        this.$store.state.isSuccessGetEditInfo = false
      },

    }
  }
</script>

<style scoped>

</style>
