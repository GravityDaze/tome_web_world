<template>
  <div>
    <mySearchs
      :affiliatedSceneryRRR="affiliatedSceneryRRR"
      :affiliatedScenery="affiliatedScenery"
      :affiliatedSpot="affiliatedSpot"
      :spotName="spotName"
      :rfidSerialNum="rfidSerialNum"
      :rfidType="rfidType"
      :reset="reset"
      :sceneryState="sceneryState"
      @queryInfos="queryInfos"
    ></mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isTriggerAmount="isTriggerAmount"
      @queryInfos="queryInfos"
      @getDefaultNewPageInfo="getDefaultNewPageInfo"
    ></myTables>

    <myTablesDialog
      :tableTitleDialog="tableTitleDialog"
      :tableDataDialog="tableDataDialog"
      :titleList="titleList"
      :sign="sign"
      ref="mytablesdialogsss"
    ></myTablesDialog>
  </div>
</template>

<script>
  export default {
    name: "rfid-trigger-log",
    data() {
      return {
        apiQuery:'/mis/count/countLaunchSourceTrigger',
        apiRfidTriggerLogInfos:'/mis/count/countLaunchSourceTriggerDetail',//访问设备明细
        sign:'rfidtriggerlog',
        affiliatedScenery: false,
        affiliatedSceneryRRR: true,
        affiliatedSpot: false,//所属景点
        spotName: true,//景点名称
        rfidSerialNum: true,
        rfidType: true,
        reset:true,
        sceneryState:true,
        isTriggerAmount:true,

        tableTitle: [

          {
            prop: 'no',
            label: '发射源编号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'name',
            label: '发射源名称',
            width: '100',
            align: 'center'
          },
          {
            prop: 'sceneryName',
            label: '所属景区',
            width: '140',
            align: 'center'
          },

          {
            prop: 'scenerySpotsName',
            label: '所属景点',
            width: '140',
            align: 'center'
          },
          {
            prop: 'type',
            label: '发射源类型',
            width: '100',
            align: 'center',
            formatter:function (row) {
              return row.type == '1'?'RFID':'位置版'
            }
          },
          {
            prop: 'radius',
            label: '播报半径(米)',
            width: '90',
            align: 'center'
          },
          {
            prop: 'altitude',
            label: '海拔高度(米)',
            width: '90',
            align: 'center'
          },
          {
            prop: 'installLocation',
            label: '安装位置',
            width: '150',
            align: 'center'
          },
          {
            prop: 'lonLat',
            label: '坐标',
            width: '150',
            align: 'center'
          },
          {
            prop: 'audio',
            label: '播放音频',
            // width: '80',
            align: 'center'
          },
          {
            prop: 'video',
            label: '播放视频',
            // width: '80',
            align: 'center'
          },
          {
            prop: 'isReset',
            label: '复位点',
            width: '120',
            align: 'center',
            formatter:function (row) {
              return row.isReset == '0'?'非复位点':'是复位点'
            }
          },
        ],
        tableData: [],

        tableTitleDialog: [
          {
            prop: 'no',
            label: '设备编号',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'imei',
            label: '设备IMEI',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'phone',
            label: '通讯号码',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'travelAgencyName',
            label: '所属旅行社',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'touristTeamNo',
            label: '团编号',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'touristTeamCode',
            label: '团号',
            // width: '300',
            align: 'center'
          },
          {
            prop: 'customerNo',
            label: '用户编号',
            // width: '160',
            align: 'center'
          }, {
            prop: 'triggerDatetime',
            label: '触发时间',
            // width: '150',
            align: 'center'
          },
        ],
        tableDataDialog: [],
        titleList: [
          {
            id: 1,
            title: '设备访问明细'
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
      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "sceneryName": "",
              "no":"",
              "scenerySpotsName":"",
              "type":"",
              "isReset":"",
              "status":"",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('发射源访问日志统计返回的数据', res.data)
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
              "sceneryName": this.$store.state.affiliatedSceneryRRRParam,
              "no":this.$store.state.rfidSerialNumParam,
              "scenerySpotsName":this.$store.state.scenerySpotNameParam,
              "type":this.$store.state.rfidTypeParam,
              "isReset":this.$store.state.isResetParam,
              "status":this.$store.state.sceneryStateParam,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('发射源访问日志查询按钮返回的数据',res.data)
            this.tableData = [...res.data.value.list]
            if(res.data.value.total == ''||res.data.value.total == null){
              this.$store.state.totalParam = 0
            }else {
              this.$store.state.totalParam = res.data.value.total
            }


            // console.log('赋值的数据', this.tableData)

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //默认第一初始化对应的详情数据获取事件（通过点击rfid访问次数链接）
      getDefaultNewPageInfo(n) {
        console.log('触发了父级事件哦', n)

        this.$axios(
          {
            method: 'post',
            url: this.apiRfidTriggerLogInfos,
            data: {
              "launchSourceNo":n,//发射源编号
              "touristTeamCodeOrNo":"",
              "customerNo":"",
              "startDatetime":"",
              "endDatetime":"",
              "pageNum": 1,
              "pageSize": 10000000
            }
          }
        ).then(res => {
          console.log(res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('发射源访问日志统计详情接口直接获取表格信息',res.data)
            this.$refs['mytablesdialogsss'].onlyTablesInfos()
            this.tableDataDialog = [...res.data.value.list]
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
