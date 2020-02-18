<template>
  <div>
    <mySearchs
      :affiliatedSceneryRRR="affiliatedSceneryRRR"
      :affiliatedScenery="affiliatedScenery"
      :codeMachine="codeMachine"
      :userTel="userTel"
      :rentTime="rentTime"
      @queryInfos="queryInfos"
    ></mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowRentTimesState="isShowRentTimesState"
      :isShowEnabled="isShowEnabled"
      :isTriggerResourceTimes="isTriggerResourceTimes"
      @queryInfos="queryInfos"
      @getDefaultNewPageInfo="getDefaultNewPageInfo"
    ></myTables>

    <myTablesDialog
      :tableTitleDialog="tableTitleDialog"
      :tableDataDialog="tableDataDialog"
      :titleList="titleList"
      :myTerminalInfo="myTerminalInfo"
      :sign="sign"
      ref="mytablesdialogsss"
    ></myTablesDialog>
  </div>
</template>

<script>
  export default {
    name: "facility-rent-statistics",
    data() {
      return {
        apiQuery: '/mis/count/countTerminalRent',
        apiFacilityRentInfos:'/mis/count/countTerminalTriggerDetail',
        sign: 'facilityrentstatistics',
        affiliatedScenery: false,
        affiliatedSceneryRRR: true,
        codeMachine: true,
        userTel: true,
        rentTime: true,//租用时间
        isShowEnabled: true,
        isShowRentTimesState: true,
        isTriggerResourceTimes: true,
        tableTitle: [
          {
            prop: 'id',
            label: '订单ID',
            width: '100',
            align: 'center'
          },
          {
            prop: 'terminalNo',
            label: '设备编号',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'terminalImei',
            label: '设备IMEI',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'sceneryName',
            label: '所属景区',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'touristTeamNo',
            label: '旅游团编号',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'customerType',
            label: '使用身份',
            width: '100',
            align: 'center'
          },
          {
            prop: 'startDatetime',
            label: '开始时间(租用)',
            width: '190',
            align: 'center'
          },
          {
            prop: 'endDatetime',
            label: '结束时间(租用)',
            width: '190',
            align: 'center'
          },
          {
            prop: 'timeSize',
            label: '租用时长',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'leaseWould',
            label: '租用计次',
            // width: '100',
            align: 'center'
          },

        ],
        tableData: [],

        tableTitleDialog: [
          {
            prop: 'launchSourceNo',
            label: '发射源编号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'launchSourceName',
            label: '发射源名称',
            width: '120',
            align: 'center'
          },
          {
            prop: 'scenerySpotsName',
            label: '所属景点',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'type',
            label: '发射源类型',
            width: '120',
            align: 'center',
            formatter:function (row) {
              return row.type == '1'?'RFID':'位置版'
            }
          },
          {
            prop: 'triggerDatetime',
            label: '触发时间',
            width: '150',
            align: 'center'
          },
          {
            prop: 'touristTeamNo',
            label: '游团编号',
            // width: '300',
            align: 'center'
          },
          {
            prop: 'customerNo',
            label: '用户编号',
            width: '160',
            align: 'center'
          }, {
            prop: 'customerType',
            label: '使用者身份',
            // width: '150',
            align: 'center',
            formatter:function (row) {
              return row.customerType == '1'?'游客':'导游'
            }
          },
          {
            prop: 'isReset',
            label: '复位点',
            // width: '140',
            align: 'center',
            formatter:function (row) {
              return row.isReset == '0'?'非复位点':'是复位点'
            }
          },
        ],
        tableDataDialog: [],
        titleList: [
          {
            id: 1,
            title: '设备租用详情'
          },
        ],
        myTerminalInfo:{
          battery: "",
          lastLocationDatetime: "",
          packVersion: "",
          sceneryName: "",
          status: "",
          terminalImei: "",
          terminalNo: "",
          terminalPhone: "",
          version: "",
        }
      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.getDefaultInfo()
    },
    methods: {
      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "sceneryName": "",
              "no": "",
              "customerPhone": "",
              "startDatetime": "",
              "endDatetime": "",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('设备租用统计返回的数据', res.data, res.data.value.total)
          if (res.data.resultStatus.resultCode === '0000') {

            console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.list]
            if(res.data.value.list.length == '0'){
              that.$store.state.totalParam = 0
            }else {
              that.$store.state.totalParam = res.data.value.total
            }


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
        // console.log('我要传值了哦', n)
        // if (n.sceneryGrade == 0) {
        //   n.sceneryGrade = ''
        // }
        // if (n.sceneryState == 2) {
        //   n.sceneryState = ''
        // }
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "sceneryName": this.$store.state.affiliatedSceneryRRRParam,
              "no": this.$store.state.codeMachineParam,
              "customerPhone": this.$store.state.userTelParam,
              "startDatetime": this.$store.state.myRentStartDatetimeParam,
              "endDatetime":  this.$store.state.myRentEndDatetimeParam,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('设备统计查询按钮返回的数据',res.data)
            this.tableData = [...res.data.value.list]

            if(res.data.value.list.length == '0'){
              that.$store.state.totalParam = 0
            }else {
              that.$store.state.totalParam = res.data.value.total
            }

            // console.log('赋值的数据', this.tableData)

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //默认第一初始化对应的详情数据获取事件（通过点击景区设备租用信息详情）
      getDefaultNewPageInfo(n) {
        // console.log('触发了父级事件哦', n)

        this.$axios(
          {
            method: 'post',
            url: this.apiFacilityRentInfos,
            data: {
              "id":n.id,
              "terminalId":n.terminalId,
              "pageNum": 1,
              "pageSize": 10000000
            }
          }
        ).then(res => {
          console.log(res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('设备租用详情详情接口直接获取表格信息',res.data)
            this.$refs['mytablesdialogsss'].onlyTablesInfos()
            this.tableDataDialog = [...res.data.value.triggerInfo.list]
            this.myTerminalInfo = res.data.value.terminalInfo
            // console.log('租用详情：',this.myTerminalInfo)
            this.$store.state.isShowTablesDialog = true

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      }
    }
  }
</script>

<style scoped>

</style>
