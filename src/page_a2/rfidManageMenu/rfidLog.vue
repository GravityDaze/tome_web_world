<template>
  <div>
    <mySearchs
      :codeMachine="codeMachine"
      :rfidSerialNum="rfidSerialNum"
      :createGroupTime2="createGroupTime2"
      :a2ChooseServiceProvider="a2ChooseServiceProvider"
      :a2ChooseServiceProviderArr="a2ChooseServiceProviderArr"
      :isExportDevice="isExportDevice"
      @queryInfos="queryInfos"
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
    >
    </myTables>
  </div>
</template>

<script>
  import commonFn from '../../common_js/commonFn'



  export default {
    name: "rfid-log",
    data() {
      return {
        sign: 'rfidLog2',
        apiQuery2: '/a2guider/RFID/RFIDVisitStatisticsQuery',
        apiSceneryProviderDropDown:'/a2guider/travelGency/dropDown',
        codeMachine: true,
        rfidSerialNum: true,
        createGroupTime2: true,
        a2ChooseServiceProvider: true,//添加了一个查询条件，选择A2服务商名称
        a2ChooseServiceProviderArr:[],//A2查询条件里面选择服务商名称
        isExportDevice: true,
        isShowEnabled: true,
        isHandle: false,
        // tableTitle: [
        //   {
        //     prop: 'NO',
        //     label: this.$t('machineCodeInfo.no'),
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'Address',
        //     label: this.$t('machineCodeInfo.address'),
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'CodeMachine',
        //     label: this.$t('machineCodeInfo.codeMachine'),
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'TravelGencyName',
        //     label: this.$t('machineCodeInfo.sceneryProvider'),
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'ScenicName',
        //     label:  this.$t('machineCodeInfo.scenerySpotName'),
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'CreateTime',
        //     label: this.$t('machineCodeInfo.visitTime'),
        //     // width: '120',
        //     align: 'center'
        //   },
        // ],
        tableData:[
          // {
          //   "Address": "青城山停车场",
          //   "CodeMachine": "Q001740",
          //   "CreateTime": "2018-10-18 21:54:22",
          //   "NO": "00028098",
          //   "TravelGencyName": "都江堰青城山一代机",
          //   "ScenicName": "青城山停车场"
          //
          // }
        ]
      }
    },
    computed: {
      tableTitle:function () {
        return   [
          {
            prop: 'NO',
            label: this.$t('machineCodeInfo.no'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'Address',
            label: this.$t('machineCodeInfo.address'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'CodeMachine',
            label: this.$t('machineCodeInfo.codeMachine'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'TravelGencyName',
            label: this.$t('machineCodeInfo.sceneryProvider'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'ScenicName',
            label:  this.$t('machineCodeInfo.scenerySpotName'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'CreateTime',
            label: this.$t('machineCodeInfo.visitTime'),
            // width: '120',
            align: 'center'
          },
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
    },
    methods: {
      //获取景区服务商下拉列表信息
      getSceneryProviderDropDown(){
        this.$axios(
          {
            method:'get',
            url:this.apiSceneryProviderDropDown,
            data:{}
          }
        ).then(res => {
          console.log('嚯嚯嚯：',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.a2ChooseServiceProviderArr = [...res.data.value]
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
              "CodeMachine":"",
              "TravelGencyId":"",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('A2发射源访问日志返回+', res.data)
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
              "CodeMachine":this.$store.state.codeMachineParam,
              "TravelGencyId":this.$store.state.a2ChooseServiceProviderParam2,
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
              "CodeMachine":this.$store.state.codeMachineParam,
              "TravelGencyId":this.$store.state.a2ChooseServiceProviderParam2,
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

    }
  }
</script>

<style scoped>

</style>
