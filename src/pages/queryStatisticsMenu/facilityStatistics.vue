<template>
  <div>
    <mySearchs
      :affiliatedSceneryRRR="affiliatedSceneryRRR"
      :isOccupyPlace="isOccupyPlace"
      :isAmountStatistics="isAmountStatistics"
      @queryInfos="queryInfos"
    ></mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowEnabled="isShowEnabled"
      :isScenerySerialNumMore="isScenerySerialNumMore"
      :isSceneryFacilityAmount="isSceneryFacilityAmount"
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
    name: "facility-statistics",
    data() {
      return {
        apiQuery:'/mis/count/countTerminal',
        apiFacilityInfos:'/mis/count/countTerminalDetail',//具体景区对应设备详情信息，即通过点击列表内部的设备总数进入详情列表
        sign:'facilityStatistics',
        affiliatedSceneryRRR: true,
        isOccupyPlace: true,//是否需要占位input框
        isAmountStatistics: true,
        isShowEnabled:true,
        isScenerySerialNumMore: true,//table景区编码，此处的参数在对应tables组件中会对两个相同景区编码做出区分
        isSceneryFacilityAmount:true,//table景区设备总台数
        tableTitle: [
          {
            prop: 'sceneryName',
            label: '景区名称',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'sceneryServiceName',
            label: '所属服务商',
            // width: '90',
            align: 'center'
          },
          {
            prop: 'chargeName',
            label: '负责人姓名',
            // width: '90',
            align: 'center'
          },
          {
            prop: 'chargePhone',
            label: '负责人电话',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'onLineCount',
            label: '在线设备总数',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'offLineCount',
            label: '离线设备总数',
            // width: '100',
            align: 'center'
          },
        ],
        tableData: [],

        tableTitleDialog: [
          {
            prop: 'no',
            label: '设备编号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'imei',
            label: '设备IMEI',
            width: '150',
            align: 'center'
          },
          {
            prop: 'phone',
            label: '通讯号码',
            width: '120',
            align: 'center'
          },
          {
            prop: 'version',
            label: '系统版本',
            width: '120',
            align: 'center'
          },
          {
            prop: 'packVersion',
            label: '资源包版本',
            width: '120',
            align: 'center'
          },
          {
            prop: 'battery',
            label: '设备电量',
            // width: '300',
            align: 'center'
          },
          {
            prop: 'lonLat',
            label: '坐标',
            width: '160',
            align: 'center'
          }, {
            prop: 'seat',
            label: '最后位置',
            width: '120',
            align: 'center'
          }, {
            prop: 'touristTeamNo',
            label: '最后使用团',
            width: '120',
            align: 'center'
          }, {
            prop: 'customerNo',
            label: '最后使用者',
            width: '120',
            align: 'center'
          }, {
            prop: 'lastGatherDateTime',
            label: '最后采集时间',
            width: '140',
            align: 'center'
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
            title: '设备详情'
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
          console.log('设备统计返回的数据', res.data, res.data.value.countScenery.total)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.countScenery.total
            console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.countScenery.list]
            this.$store.state.allCountP = res.data.value.countTotal.allCount
            this.$store.state.onlineCountP = res.data.value.countTotal.onLineCount
            this.$store.state.offlineCountP = res.data.value.countTotal.offLineCount

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
            console.log('设备统计查询按钮返回的数据',res.data, res.data.value.countScenery.list)
            this.tableData = [...res.data.value.countScenery.list]
            this.$store.state.totalParam = res.data.value.countScenery.total
            console.log('赋值的数据', this.tableData)

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //默认第一初始化对应的详情数据获取事件（通过点击景区设备总数）
      getDefaultNewPageInfo(n) {
        console.log('触发了父级事件哦', n)

        this.$axios(
          {
            method: 'post',
            url: this.apiFacilityInfos,
            data: {
              "sceneryNo": n,
              "pageNum": 1,
              "pageSize": 1000000
            }
          }
        ).then(res => {
          console.log(res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('设备总数详情接口直接获取表格信息',res.data)
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
