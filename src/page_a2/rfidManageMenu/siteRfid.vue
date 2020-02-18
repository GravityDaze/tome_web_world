<template>
  <div>
    <mySearchs
      :sign="sign"
      :rfidSerialNum="rfidSerialNum"
      :createGroupTime2="createGroupTime2"
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
      :isHandle="isHandle"
      @queryInfos="queryInfos"
      @delListInfo="delListInfo"
      @getEditorInfos="getEditorInfos"
    >
    </myTables>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.siteRfid2" width="35%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="23">
              <el-form-item label="编号">
                <el-col>
                  <el-input v-model="ruleForm.NO" placeholder="请输入编号" ></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="地址">
                <el-col>
                  <el-input v-model="ruleForm.Address" placeholder="请输入地址"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="播报半径">
                <el-col>
                  <el-input v-model="ruleForm.distance" placeholder="请输入播报半径"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="经纬度">
                <el-col :span="20">
                  <el-input v-model="ruleForm.lngLat" placeholder="例如:104.313456,33.269869"></el-input>
                </el-col>
                <el-col :span="3">
                  <el-button type="warning" @click="getLonLatInfo">拾取坐标</el-button>
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

            <el-col :span="23">
              <el-form-item label="旅游景点">
                <el-col>
                  <el-select v-model="ruleForm.TravelSpotName" class="change_select_style" size="small" placeholder="请输入旅游景点"><el-option
                    v-for="item in canChooseScenerySpotArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
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
    name: "site-rfid",
    data() {
      return {
        isChange1:'',//编辑时去检测是否重新选择了服务商
        isChange2:'',//编辑时去检测是否重新选择了景点
        sign: 'siteRfid2',
        apiQuery2:'/a2guider/position/query',
        apiSceneryProviderDropDown:'/a2guider/travelGency/dropDown',
        apiScenerySpotDropDown:'/a2guider/scenic/queryScenicList',
        apiAdd2:'/a2guider/position/add',
        apiEditor2:'/a2guider/position/update',
        apiDel2:'/a2guider/position/delete',
        // apiExport2:'/a2guider/position/export',
        apiImportUrl1:'/a2guider/position/templateDown',//A2导入数据前先下载表格
        apiImportUrl2:'/a2guider/position/importTerminal',//A2导入数据
        rfidSerialNum: true,
        createGroupTime2: true,
        isAdd: true,
        isImportDevice: true,
        isExportDevice: true,
        isImportParam: true,
        isShowEnabled: true,
        isHandle: true,
        canChooseSceneryProviderArr:[],
        canChooseScenerySpotArr:[],
        ruleForm: {
          "ID":'',
          "NO":'',
          "Address":'',
          "lngLat":'',
          "distance":'',//播报半径
          "TravelGencyID":'',
          "TravelGencyName":'',
          "ScenicID":'',
          "TravelSpotName":'',
        },
        tableTitle: [
          {
            prop: 'NO',
            label: '编号',
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
            prop: 'VisitCount',
            label: '播报次数',
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
            prop: 'ScenicName',
            label: '旅游景点',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'distance',
            label: '播报半径',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'CreateTime',
            label: '添加时间',
            // width: '120',
            align: 'center'
          },
        ],
        tableData: [
          // {
          //   "distance": 5,
          //   "Address": "阳明文化园知行合一广场",
          //   "ID": 1,
          //   "Lng": 106.61491394042969,
          //   "TravelGencyID": 57,
          //   "Lat": 26.850547790527344,
          //   "CreateTime": "2018-04-25 19:17:05",
          //   "NO": "56001002",
          //   "TravelGencyName": "贵州阳明文化园",
          //   "ScenicName": "知行合一广场",
          //   "VisitCount": 0,
          //   "ScenicID": 372
          //
          //
          // }
        ]
      }
    },
    mounted(){
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.$store.state.isShowAlert = false
      this.$store.state.addparamsss = false
      this.getDefaultInfo()
      this.getSceneryProviderDropDown()
      this.getScenerySpotDropDown()
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
              "startDate": this.$store.state.startDatetimeParam2,
              "endDate": this.$store.state.endDatetimeParam2,
              "No": this.$store.state.rfidSerialNumParam,
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



      //获取坐标点
      getLonLatInfo() {
        window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html')
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

      //获取景点下拉列表信息
      getScenerySpotDropDown(){
        this.$axios(
          {
            method:'post',
            url:this.apiScenerySpotDropDown,
            data:{}
          }
        ).then(res => {
          console.log('景点下拉列表信息',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.canChooseScenerySpotArr = [...res.data.value]
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },

      //新增之前清空表单数据函数
      addBeforeClear(){

        this.$store.state.siteRfid2 = true
        for(var i in this.ruleForm){
          this.ruleForm[i] = ''
        }


      },

      //开始提交新增信息
      addInfo() {
        console.log('开始提交新增信息')
        this.ruleForm.TravelGencyID = this.ruleForm.TravelGencyName
        this.ruleForm.ScenicID = this.ruleForm.TravelSpotName
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd2,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('siteRfid2新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.siteRfid2 = false
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
        console.log('删除N信息是：',n)
        this.$axios(
          {
            method:'post',
            url:this.apiDel2 + '?positionId=' + n.ID,
            data:{}
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

      //编辑时默认先获取之前的信息
      getEditorInfos(n){
        console.log('点击编辑时能够获取到什么',n)
        this.ruleForm.ID = n.ID
        this.ruleForm.NO = n.NO
        this.ruleForm.Address = n.Address
        this.ruleForm.distance = n.distance
        this.ruleForm.lngLat = n.Lng + ',' + n.Lat
        this.ruleForm.ScenicID = n.ScenicID
        this.ruleForm.TravelSpotName = n.ScenicName
        this.isChange2 = n.ScenicName
        this.ruleForm.TravelGencyID = n.TravelGencyID
        this.ruleForm.TravelGencyName = n.TravelGencyName
        this.isChange1 = n.TravelGencyName

        this.$store.state.siteRfid2 = true
        this.$store.state.titleHeader = '编辑'

      },

      //提交编辑信息
      editorInfo(){
        if( this.ruleForm.TravelGencyName != this.isChange1){
          this.ruleForm.TravelGencyID = this.ruleForm.TravelGencyName
        }
        if(this.ruleForm.TravelSpotName != this.isChange2){
          this.ruleForm.ScenicID =  this.ruleForm.TravelSpotName
        }

        this.$axios(
          {
            method:'post',
            url:this.apiEditor2,
            data:this.ruleForm
          }
        ).then(res => {
          console.log('提交编辑信息',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.$store.state.siteRfid2 = false
            this.getDefaultInfo()
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
              "startDate": "",
              "endDate": "",
              "No": "",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('A2siteRfid2返回+', res.data)
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
              "startDate": this.$store.state.startDatetimeParam2,
              "endDate": this.$store.state.endDatetimeParam2,
              "No": this.$store.state.rfidSerialNumParam,
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
        this.$store.state.siteRfid2 = false
      },

    }
  }
</script>

<style scoped>

</style>
