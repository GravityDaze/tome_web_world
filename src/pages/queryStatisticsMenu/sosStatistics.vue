<template>
  <div>
    <mySearchs
    :sosDateShow="sosDateShow"
    :affiliatedSceneryRRR="affiliatedSceneryRRR"
    :isOccupyPlace="isOccupyPlace"
    @queryInfos="queryInfos"
    ></mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isIntradaySosAmount="isIntradaySosAmount"
      :isScenerySerialNum="isScenerySerialNum"
      :isShowEnabled="isShowEnabled"
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
    name: "sos-statistics",
    data() {
      return {
        apiQuery:'/mis/count/countSos',
        apiSosInfos:'/mis/count/countSosDetail',
        sign:'sosstatistics',
        sosDateShow:true,
        isShowEnabled:true,
        affiliatedSceneryRRR: true,
        affiliatedScenery:false,
        isOccupyPlace:true,
        isIntradaySosAmount:true,
        isScenerySerialNum:false,
        tableTitle: [
          {
            prop: 'sceneryNo',
            label: '景区编号',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'sceneryName',
            label: '景区名称',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'sosDatetime',
            label: '日期',
            // width: '100',
            align: 'center'
          },
        ],
        tableData: [],

        tableTitleDialog: [
          {
            prop: 'customerPhone',
            label: '游客手机',
            width: '100',
            align: 'center'
          },
          {
            prop: 'imei',
            label: '设备IMEI',
            width: '140',
            align: 'center'
          },
          {
            prop: 'sosType',
            label: '求救方式',
            // width: '120',
            align: 'center',
            formatter:function (row) {
              if(row.sosType == '0'){
                return '紧急语音'
              }else if(row.sosType == '1'){
                return '网络视频'
              }else if(row.sosType == '2'){
                return '导游电话'
              }else if(row.sosType == '3'){
                return '景区电话'
              }
            }
          },
          {
            prop: 'sosDatetime',
            label: '求救时间',
            width: '160',
            align: 'center'
          },
          {
            prop: 'touristTeamNo',
            label: '游团编码',
            width: '120',
            align: 'center'
          },
          {
            prop: 'guidePhone',
            label: '导游手机',
            // width: '300',
            align: 'center'
          },
          {
            prop: 'isConfirm',
            label: '是否确认',
            // width: '160',
            align: 'center',
            formatter:function (row) {
              return row.isConfirm == '0'?'未确认':'已确认'
            }
          }, {
            prop: 'confirmDateTime',
            label: '确认时间',
            width: '150',
            align: 'center'
          }, {
            prop: 'result',
            label: '处理结果',
            width: '120',
            align: 'center'
          },
        ],
        tableDataDialog: [],
        titleList: [
          {
            id: 1,
            title: 'SOS详情'
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
              "sceneryName":"",
              "startDatetime":"",
              "endDatetime":"",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('sos统计返回的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.total
            console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.list]

            // console.log('赋值的数据', this.tableData)
            // that.$store.state.showLoading = false
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
              "startDatetime":this.$store.state.mySosStartDatetimeParam,
              "endDatetime":this.$store.state.mySosEndDatetimeParam,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('sos统计查询按钮返回的数据',res.data)
            this.tableData = [...res.data.value.list]
            this.$store.state.totalParam = res.data.value.total
            console.log('赋值的数据', this.tableData)

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //默认第一初始化对应的详情数据获取事件（通过点击景区rfid发射源数据）
      getDefaultNewPageInfo(n) {
        console.log('触发了父级事件哦', n)

        this.$axios(
          {
            method: 'post',
            url: this.apiSosInfos,
            data: {
              "sosIds":n,
              "pageNum": 1,
              "pageSize": 1000000
            }
          }
        ).then(res => {
          console.log(res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            // console.log('sos统计详情接口直接获取表格信息',res.data)
            this.$refs['mytablesdialogsss'].onlyTablesInfos()
            this.tableDataDialog = [...res.data.value]
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
