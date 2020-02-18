<template>
  <div>
    <mySearchs
      :affiliatedSceneryRRR="affiliatedSceneryRRR"
      :isOccupyPlace="isOccupyPlace"
      :isRfidAmountStatistics="isRfidAmountStatistics"
      :rfidCountInfoShowData="rfidCountInfoShowData"
      @queryInfos="queryInfos"
    ></mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isScenerySerialNum="isScenerySerialNum"
      :isRfidAmount="isRfidAmount"
      :isShowEnabled="isShowEnabled"
      :isRfidEnabledAmount="isRfidEnabledAmount"
      :isRfidDisabledAmount="isRfidDisabledAmount"
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
    name: "rfid-statistics",
    data() {
      return {
        apiQuery:'/mis/count/countLaunchSource',
        apiRfidInfos:'/mis/count/countLaunchSourceDetail',
        sign:'rfidstatistics',
        // affiliatedScenery: true,
        affiliatedSceneryRRR: true,
        isOccupyPlace: true,
        isRfidAmountStatistics: true,
        isRfidAmount: true,//tables内是否显示发射源数--列
        isScenerySerialNum: false,
        isShowEnabled:true,
        isRfidEnabledAmount:true,
        isRfidDisabledAmount:true,

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
        ],
        tableData: [],
        rfidCountInfoShowData:{
          //发射源统计页面文字展示列对应数据
          allCount: '100',
          allRfidCount: '30',
          allSiteCount: '70',
          disableCount: '20',
          disableRfidCount: '3',
          disableSiteCount: '17',
          enableCount: '80',
          enableRfidCount: '33',
          enableSiteCount: '47',
        },

        tableTitleDialog: [
          {
            prop: 'no',
            label: '发射源编号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'name',
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
            align: 'center'
          },
          {
            prop: 'radius',
            label: '播报半径',
            width: '120',
            align: 'center'
          },
          {
            prop: 'altitude',
            label: '海拔',
            // width: '300',
            align: 'center'
          },
          {
            prop: 'installLocation',
            label: '安装位置',
            width: '160',
            align: 'center'
          }, {
            prop: 'lonLat',
            label: '坐标',
            width: '150',
            align: 'center'
          }, {
            prop: 'audio',
            label: '播放音频',
            width: '120',
            align: 'center'
          }, {
            prop: 'video',
            label: '播放视频',
            width: '120',
            align: 'center'
          }, {
            prop: 'isReset',
            label: '复位点',
            // width: '140',
            align: 'center',
            formatter:function (row) {
              return row.isReset == '0'?'非复位点':'是复位点'
            }
          }, {
            prop: 'status',
            label: '状态',
            // width: '300',
            align: 'center',
            formatter:function (row) {
              return row.status == '0'?'离线':'在线'
            }
          },
        ],
        tableDataDialog: [],
        titleList: [
          {
            id: 1,
            title: '发射源详情'
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
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('发射源统计返回的数据', res.data, res.data.value.countScenery.total)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.countScenery.total
            console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.countScenery.list]
            // this.$store.state.allCountP = res.data.value.countTotal.allCount
            // this.$store.state.onlineCountP = res.data.value.countTotal.onLineCount
            // this.$store.state.offlineCountP = res.data.value.countTotal.offLineCount
            this.rfidCountInfoShowData = res.data.value.countTotal

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
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('设备统计查询按钮返回的数据',res.data)
            this.tableData = [...res.data.value.countScenery.list]
            this.$store.state.totalParam = res.data.value.countScenery.total
            this.rfidCountInfoShowData = res.data.value.countTotal
            // console.log('赋值的数据', this.tableData)

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
            url: this.apiRfidInfos,
            data: {
              "sceneryId": n,
              "pageNum": 1,
              "pageSize": 1000000
            }
          }
        ).then(res => {
          console.log(res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('发射源统计详情接口直接获取表格信息',res.data)
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
