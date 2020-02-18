<template>
  <div>
    <mySearchs
      :sign="sign"
      :sceneryState="sceneryState"
      :codeMachine="codeMachine"
      :groupPersonType="groupPersonType"
      :sexType="sexType"
      :isAdd="isAdd"
      :isImportDevice="isImportDevice"
      :isExportDevice="isExportDevice"
      :isImportParam="isImportParam"
      @queryInfos="queryInfos"
      @addBeforeClear="addBeforeClear"
      @getExcel="getExcel"
      @importf="importf"
      @exportInfo="exportInfo"
    >
    </mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowEnabled="isShowEnabled"
      :isShowEnabled222="isShowEnabled222"
      :isHandle="isHandle"
      @queryInfos="queryInfos"
      @delListInfo="delListInfo"
      @getEditorInfos="getEditorInfos"
    >
    </myTables>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.groupPersonInfo2" width="35%"
                 align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>



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
                  <el-input v-model="ruleForm.Phone" placeholder="请输入手机号" @blur="checkedPhoneFn"></el-input>
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
                  <el-input v-model="ruleForm.CertificateNumber" placeholder="请输入证件号码" @blur="checkedInfoFn"></el-input>
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
              <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
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
    name: "group-person-info",
    data() {
      return {
        sign: 'groupPersonInfo2',
        apiQuery2:'/a2guider/member/query',
        apiTouristGroupDropDown2:'/a2guider/touristTeam/dropDown',
        apiCodeMachineDropDown2:'/a2guider/terminal/unAllot',
        apiAdd2: '/a2guider/member/add',
        apiEditor2: '/a2guider/member/edit',
        apiGetEditorInfo2:'/a2guider/member/get',
        apiDel2: '/a2guider/member/delete',
        apiCheckPhoneFn:'/a2guider/member/phoneCheck',
        apiCheckInfoFn:'/a2guider/member/certificateCheck',
        apiImportUrl1:'/a2guider/member/templateUrl',//A2导入数据前先下载表格
        apiImportUrl2:'/a2guider/member/importMember',//A2导入数据
        sceneryState: true,
        codeMachine: true,
        groupPersonType: true,
        sexType: true,
        isAdd: true,
        isImportDevice: true,
        isExportDevice: true,
        isImportParam: true,
        isShowEnabled: true,
        isShowEnabled222:true,
        isHandle: true,
        tableTitle: [
          {
            prop: 'Num',
            label: '序号',
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
            align: 'center'
          },

          {
            prop: 'Type',
            label: '类型',
            // width: '120',
            align: 'center',
            formatter: function (row) {
              if (row.Type == '0') {
                return '游客'
              } else if (row.Type == '1') {
                return '导游'
              }
            }
          },

          {
            prop: 'CertificateType',
            label: '证件(类型/号码)',
            // width: '120',
            align: 'center'
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
        ],
        tableData: [
          // {
          //   "ID": 7181,
          //   "Name": "Q002485",
          //   "Type": 0,
          //   "Status": false,
          //   "CertificateType": null,
          //   "CertificateNumber": null,
          //   "TouristTeamID": 4,
          //   "Phone": "20786202768",
          //   "Sex": "男",
          //   "TerminalID": 4662,
          //   "UpdateTime": "2018-03-14 12:49:48",
          //   "CodeMachine": "Q002485",
          //   "Num": 1,
          //   "TouristTeamName": "赤水"
          //
          // }
        ],
        canChooseTouristGroupArr:[],//A2旅游团下拉列表数据
        canChooseCodeMachineArr:[],//A2机器码下拉列表数据
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
        statusArr:[
          {
            id:0,
            name:'禁用',
            value:0
          },
          {
            id:1,
            name:'启用',
            value:1
          }
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

      }
    },
    mounted(){
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.$store.state.isShowAlert = false
      this.$store.state.addparamsss = false
      this.getDefaultInfo()
    },
    methods: {
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
        console.log('formdata:',formdata)
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

        if(this.$store.state.sexTypeParam2 == 1){
          this.$store.state.sexTypeParam2 = '男'
        }else if(this.$store.state.sexTypeParam2 == 2){
          this.$store.state.sexTypeParam2 = '女'
        }else {
          this.$store.state.sexTypeParam2 = ''
        }

        var n = ''
        var k = ''
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "Sex":this.$store.state.sexTypeParam2,
              "Status":this.$store.state.sceneryStateParam,
              "Type": this.$store.state.groupPersonTypeParam2,
              "CodeMachine":this.$store.state.codeMachineParam,
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
            n= this.tableTitle
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



      //手机号校验
      checkedPhoneFn() {

        this.$axios(
          {
            method: 'post',
            url: this.apiCheckPhoneFn,
            data: {
              "ID":'',
              "Phone":this.ruleForm.Phone
            }
          }
        ).then(res => {
          console.log('旅游团名称校验结果', res.data)
          if (res.data.resultStatus.resultCode === '0000') {

            if (this.ruleForm.Phone && res.data.value.result) {
              this.$message.success('此手机号可用')
            } else if (this.ruleForm.Phone) {
              this.$message.warning('此手机号不可用')
              this.ruleForm.Phone = ''
            }

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
            this.ruleForm.Phone = ''
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //身份证号或导游证号校验
      checkedInfoFn() {
        this.$axios(
          {
            method: 'post',
            url: this.apiCheckInfoFn,
            data: {
              "ID":'',
              "CertificateType":this.ruleForm.CertificateType,
              "CertificateNumber":this.ruleForm.CertificateNumber

            }
          }
        ).then(res => {
          console.log('证件号校验结果', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            if (this.ruleForm.CertificateNumber && res.data.value.result) {
              this.$message.success('证件号可用')
            } else if (this.ruleForm.CertificateNumber) {
              this.$message.warning('证件号不可用')
              this.ruleForm.CertificateNumber = ''
            }

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
            this.ruleForm.CertificateNumber = ''
          }
        }).catch(error => {
          console.log(error)
        })
      },


      //获取旅游团下拉列表信息
      getTouristGroupDropDown() {
        this.$axios(
          {
            method: 'get',
            url: this.apiTouristGroupDropDown2,
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
            url: this.apiCodeMachineDropDown2,
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

      //新增之前清空表单数据函数
      addBeforeClear(){
        this.getTouristGroupDropDown()
        this.getCodeMachineDropDown()
        this.$store.state.groupPersonInfo2 = true
        for(var i in this.ruleForm){
          this.ruleForm[i] = ''
        }


      },

      //开始提交新增信息
      addInfo() {
        var that = this
        console.log('开始提交新增信息')
        alert(this.ruleForm.Status)
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


        // this.freeParam2 = this.ruleForm.TravelGencyName
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd2,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.groupPersonInfo2 = false
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
            this.$store.state.groupPersonInfo2 = true


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
            this.$store.state.groupPersonInfo2 = false
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },


      getDefaultInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "Sex":'',
              "Status":'',
              "Type": '',
              "CodeMachine": '',
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('A2设备返回+', res.data)
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

        // alert(this.$store.state.sexTypeParam2)

        if(this.$store.state.sexTypeParam2 == 1){
          this.$store.state.sexTypeParam2 = '男'
        }else if(this.$store.state.sexTypeParam2 == 2){
          this.$store.state.sexTypeParam2 = '女'
        }else {
          this.$store.state.sexTypeParam2 = ''
        }

        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "Sex":this.$store.state.sexTypeParam2,
              "Status":this.$store.state.sceneryStateParam,
              "Type": this.$store.state.groupPersonTypeParam2,
              "CodeMachine":this.$store.state.codeMachineParam,
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
        this.$store.state.groupPersonInfo2 = false
      },
    }
  }
</script>

<style scoped>

</style>
