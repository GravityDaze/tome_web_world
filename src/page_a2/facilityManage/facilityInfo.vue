<template>
  <div>
    <mySearchs
      :sign="sign"
      :userTel="userTel"
      :imeiNum="imeiNum"
      :codeMachine="codeMachine"
      :sceneryState="sceneryState"
      :touristGroup2="touristGroup2"
      :touristGroup2DropDownList="touristGroup2DropDownList"
      :isAdd="isAdd"
      :isMoreDel="isMoreDel"
      :isImportDevice="isImportDevice"
      :isExportDevice="isExportDevice"
      :isImportParam="isImportParam"
      :isReturn="isReturn"
      @queryInfos="queryInfos"
      @addBeforeClear="addBeforeClear"
      @getExcel="getExcel"
      @importf="importf"
      @exportInfo="exportInfo"
      @returnFacilityFn="returnFacilityFn"
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
      @chooseInfo="chooseInfo"
    >
    </myTables>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.facilityInfo2" width="35%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="23">
              <el-form-item label="设备IMEI">
                <el-col>
                  <el-input v-model="ruleForm.IMEI" placeholder="请输入imei号" ></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="机器码">
                <el-col>
                  <el-input v-model="ruleForm.CodeMachine" placeholder="请输入机器码"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="手机号码">
                <el-col>
                  <el-input v-model="ruleForm.Tel" placeholder="请输入手机号码"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="状态">
                <el-col>
                  <el-select v-model="ruleForm.Status" class="change_select_style" size="small" placeholder="请选择状态"><el-option
                    v-for="item in statusArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>


            <el-col :span="23">
              <el-form-item label="景区服务商">
                <el-col>
                  <el-select v-model="ruleForm.TravelGencyName" class="change_select_style" size="small" placeholder="请输入景区服务商"><el-option
                      v-for="item in canChooseSceneryProviderArr"
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
    name: "facility-info",
    data() {
      return {
        returnFacilityId:'',//归还设备时需要传id
        apiReturnFacility:'/a2guider/terminal/returnTerminal',
        sign: 'facilityInfo2',
        apiQuery2: '/a2guider/terminal/query',
        apiAdd2:'/a2guider/terminal/add',
        apiEditor2:'/a2guider/terminal/update',
        apiDel2:'a2guider/terminal/delete',
        apiDropDownTouristTeam2: '/a2guider/touristTeam/dropDown',
        apiSceneryProviderDropDown:'/a2guider/travelGency/dropDown',
        apiImportUrl1:'/a2guider/terminal/templateDown',//A2导入数据前先下载表格
        apiImportUrl2:'/a2guider/terminal/importTerminal',//A2导入数据
        userTel: true,
        imeiNum: true,
        codeMachine: true,
        sceneryState: true,
        touristGroup2: true,
        isReturn:true,
        isAdd: true,
        isMoreDel: true,
        isImportDevice: true,
        isExportDevice: true,
        isImportParam: true,
        isShowEnabled: true,
        isHandle: true,
        touristGroup2DropDownList: [
          {
            ID: '0',
            Name: '全部',

          },
          {
            ID: '1',
            Name: '旅游团',

          },
          {
            ID: '2',
            Name: '测试团',

          },
        ],
        canChooseSceneryProviderArr:[],
        statusArr:[
          {
            id:0,
            name:'禁用'
          },
          {
            id:1,
            name:'启用'
          }
        ],
        ruleForm: {
          "ID":'',
          "Tel":'',
          "IMEI":'',
          "CodeMachine":'',
          "Status":'',
          "TravelGencyID":'',
          "TravelGencyName":'',
        },
        // tableTitle: [
        //   {
        //     prop: 'IMEI',
        //     label: '设备IMEI+++++',
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'CodeMachine',
        //     label: '机器码',
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'TouristTeamName',
        //     label: '旅游团',
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'IsOnline',
        //     label: '在线状态',
        //     // width: '120',
        //     align: 'center',
        //     formatter: function (row) {
        //       return row.IsOnline == '0' ? '离线' : '在线'
        //     }
        //   },
        //   {
        //     prop: 'Status',
        //     label: '状态',
        //     // width: '120',
        //     align: 'center',
        //     formatter: function (row) {
        //       return row.Status == '0' ? '禁用' : '启用'
        //     }
        //   },
        //   {
        //     prop: 'Tel',
        //     label: '手机号码',
        //     // width: '120',
        //     align: 'center'
        //   },
        // ],
        tableData: [
          // {
          //   "ID": 1,
          //   "Status": 1,
          //   "Tel": "17156657497",
          //   "CodeMachine": "0001698",
          //   "IMEI": "956680617111248",
          //   "TravelGencyName": "智慧全域技术部测试机",
          //   "TouristTeamName": "成都测试i附近的卡拉季来得及凯撒"
          // }
        ]
      }
    },
    computed: {
      tableTitle: function () {
        return   [
          {
            prop: 'IMEI',
            label: this.$t('adminFacilityInfo.imei'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'CodeMachine',
            label: this.$t('adminFacilityInfo.codeMachine'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'TouristTeamName',
            label: this.$t('adminFacilityInfo.travelGroup'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'IsOnline',
            label: this.$t('adminFacilityInfo.onlineState'),
            // width: '120',
            align: 'center',
            formatter: function (row) {
              return row.IsOnline == '0' ? '离线' : '在线'
            }
          },
          {
            prop: 'Status',
            label: this.$t('adminFacilityInfo.state'),
            // width: '120',
            align: 'center',
            formatter: function (row) {
              return row.Status == '0' ? '禁用' : '启用'
            }
          },
          {
            prop: 'Tel',
            label: this.$t('adminFacilityInfo.tel'),
            // width: '120',
            align: 'center'
          },
        ]
      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.$store.state.isShowAlert = false
      this.$store.state.addparamsss = false
      this.getDefaultInfo()
      this.getDropDownTouristTeamList()
      this.getSceneryProviderDropDown()
    },
    methods: {

      // 导入设备前先获取excel表格
      getExcel(){
        this.$axios(
          {
            method:'post',
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

        var n = ''
        var k = ''
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "Status": this.$store.state.sceneryStateParam,
              "TouristTeamID": this.$store.state.touristGroup2Param2,//暂时没有展示这栏
              "CodeMachine": this.$store.state.codeMachineParam,
              "Tel":  this.$store.state.userTelParam,
              "IMEI": this.$store.state.imeiNumParam,
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



      //获取景区服务商下拉列表信息
      getSceneryProviderDropDown(){
        this.$axios(
          {
            method:'get',
            url:this.apiSceneryProviderDropDown,
            data:{}
          }
        ).then(res => {
          if(res.data.resultStatus.resultCode === '0000'){
            this.canChooseSceneryProviderArr = [...res.data.value]
          }else {
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
              "Status": '',
              "TouristTeamID": '',
              "CodeMachine": "",
              "Tel": "",
              "IMEI": "",
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

      //获取旅游团下拉数据列表方法函数
      getDropDownTouristTeamList() {
        this.$axios(
          {
            method: 'get',
            url: this.apiDropDownTouristTeam2,
            data: {}
          }
        ).then(res => {
          console.log(res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.touristGroup2DropDownList = [...res.data.value]
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })

      },

      //查询按钮或者点击翻页按钮返回列表数据
      queryInfos(n) {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "Status": this.$store.state.sceneryStateParam,
              "TouristTeamID": this.$store.state.touristGroup2Param2,//暂时没有展示这栏
              "CodeMachine": this.$store.state.codeMachineParam,
              "Tel":  this.$store.state.userTelParam,
              "IMEI": this.$store.state.imeiNumParam,
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

      //新增之前清空表单数据函数
      addBeforeClear(){

        this.$store.state.facilityInfo2 = true
        for(var i in this.ruleForm){
          this.ruleForm[i] = ''
        }


      },

      //开始提交新增信息
      addInfo() {
        console.log('开始提交新增信息')
        this.ruleForm.TravelGencyID = this.ruleForm.TravelGencyName
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd2,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.facilityInfo2 = false
            this.getDefaultInfo()
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },

      //点击删除按钮事件
      delListInfo(n){
        console.log('此处删除n',n)
        // let ids=[]
        // ids.push(String(n.ID))
        this.$axios(
          {
            method:'post',
            url:this.apiDel2,
            data:{
              ids:n.ID
            }
          }
        ).then(res => {
          console.log('A2删除',res.data)
          if(res.data.resultStatus.resultCode === '0000'){

            this.getDefaultInfo()

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        })

      },

      //归还设备前先选中信息ID
      chooseInfo(n){
        this.$message.success('成功获取设备信息ID:'+n.ID)
        this.returnFacilityId = n.ID
      },

      //归还设备函数
      returnFacilityFn(){

        if(!this.returnFacilityId){
          this.$message.warning('请选择需要归还的设备信息')
          return
        }
        this.$axios(
          {
            method:'post',
            url:this.apiReturnFacility,
            data:{
              ids:this.returnFacilityId
            }
          }
        ).then(res => {
          console.log('发起归还请求',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.$store.state.pageNumParam = 1
            this.getDefaultInfo()
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },


      //编辑时默认先获取之前的信息
      getEditorInfos(n){
        console.log('点击编辑时能够获取到什么',n)
        this.ruleForm.ID = n.ID
        this.ruleForm.Tel = n.Tel
        this.ruleForm.IMEI = n.IMEI
        this.ruleForm.CodeMachine = n.CodeMachine
        this.ruleForm.Status = n.Status == '1'?'启用':'禁用'
        this.ruleForm.TravelGencyName = n.TravelGencyName
        this.ruleForm.TravelGencyID = n.TravelGencyID
        // alert(this.ruleForm.TravelGencyName)
        this.$store.state.facilityInfo2 = true
        this.$store.state.titleHeader = '编辑'

      },

      //提交编辑信息
      editorInfo(){
        // this.ruleForm.Status = this.ruleForm.Status == '启用'?'1':'0'
        this.$axios(
          {
            method:'post',
            url:this.apiEditor2,
            data:this.ruleForm
          }
        ).then(res => {
          console.log('提交编辑信息',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.$store.state.facilityInfo2 = false
            this.getDefaultInfo()
          }else {
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
        this.$store.state.facilityInfo2 = false
      },
    }
  }
</script>

<style scoped>

</style>
